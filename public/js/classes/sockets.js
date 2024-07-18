import { tplBoxMessage } from "../templates/chat-messages.js"
import { messageURL } from "../../scripts/socket-client/chat-url.js"
import { createAlert, ALERT_TYPE, MESSAGE_TYPE } from "../components/alert-modal.js"
import { CLASSNAME } from "../types/objects.js"

// definiciones
const zonaActual = Intl.DateTimeFormat().resolvedOptions().timeZone

export class SocketsMessage {
    constructor(io, obj){
        this.socket = io()
        this.socket.on('connect', ()=> {
            this.socketID = this.socket.id.slice(0, 6)
        })
        this.socket.on('disconnect', ()=> console.log(this.socket.id))
        this.container = obj.container
        this.actionUser = obj.actUser
        this.actionValue = obj.actState
        this.username = null //lo establece la clase chatmesage
        this.userMessage = null //lo establece la clase chatmesage
    }
    // PRIVATE
    #dataUser(){
        const data = {
            userID: this.socketID,
            user: this.username,
            message: this.userMessage,
            zonaHoraria: zonaActual
        }
        return data
    }
    // ENVIAR EVENTOS
    eRegister(){
        this.socket.emit('chat:register', this.#dataUser())
    }
    eMessages(){
        this.socket.emit('chat:message', this.#dataUser())
    }
    eInputOn(){
        const { user }= this.#dataUser()
        console.log(user);
        this.socket.emit('chat:typing:on', user)
    }
    eInputOff(){
        const { message }= this.#dataUser()
        this.socket.emit('chat:typing:off', message)
        console.log('emitir llego aki');
    }
    //RECIBIR EVENTOS
    onMessage(){
        this.socket.on('chat:message', (data)=>{
            const userSocket = data.from === this.socketID ? 'Me' : data.user
            const classMsg = data.from === this.socketID ? 'chat-me' : 'chat-other'
            const clearMsg = data.message.trim()
            const formatMsg = messageURL(clearMsg)
            const objMessage = {
                classMsg:classMsg, 
                user:userSocket,
                message:formatMsg
            }
            this.actionUser.innerHTML = '3'
            this.actionValue.innerHTML = 'conectados'
            this.container.innerHTML += tplBoxMessage(objMessage, data)
            this.container.scrollTop = this.container.scrollHeight
        })
    }
    onTypingOn(){
        this.socket.on('chat:typing:on', (data)=>{
            this.actionUser.textContent = data
            this.actionValue.textContent = 'esta escribiendo...'
        })
    }
    onTypingOff(){
        this.socket.on('chat:typing:off', ()=>{
            console.log('recibir llego aki');
            this.actionUser.value = '3'
            this.actionValue.value = 'usuarios conectados...'
        })
    }
    init(){
        this.onMessage()
        this.eInputOn()
        this.eInputOff()
        this.onTypingOn()
        this.onTypingOff()
    }
}
export class DisabledElements {
    constructor(elements, alert){
        this.elements = elements; //array de elementos HTML
        this.alert = alert; // container de la alerta
    }
    #alertDisabled(){
        createAlert(this.alert, 'EN DESARROLLO', MESSAGE_TYPE.NO_DISPONIBLE,ALERT_TYPE.TEMP.info,[], 3000)
        return
    }
    #eClicked(btn){
        btn.addEventListener('click', ()=> this.#alertDisabled());
    }
    init(){
        this.elements.forEach(btn => this.#eClicked(btn))
    }
}
export class ChatDataStorage{
    constructor(item){
        this.item = item
        this.prevItem = localStorage.getItem(item)
    }
    getLocalStorage(){
        return localStorage.getItem(this.item)
    }
    setLocalStorage(value){
        return localStorage.setItem(this.item, value)
    }
}
export class ChatMessage extends ChatDataStorage{
    constructor(itemStorage, io, objSocket){
        super(itemStorage)
        this.username = null //nombre de usuario
        this.userID = null //ID del servidor de usuario
        this.userMsg = null //mensaje del usuario
        this.roomName = null //nombre de la sala activa
        this.roomID = null // ID de la sala activa
        this.formMsg = null // Formulario del chat que envia el mensaje
        this.alert = null
        this.microphone = null // boton del microfono del chat
        this.btnMessage = null // boton de enviar mensajes del chat
        this.boxBtnChat = null // Contenedor de: [btnMicro y btnChat]
        this.rename = false // Estado del Modal para renombrar usuario
        this.countError = 0 //Contador de errores en las alertas
        this.socket = new SocketsMessage(io, objSocket) // Instaciar la clase Sockets
    }
    timeOutClass(element, classname, isCount){
        element.value = ''
        element.classList.add(classname)
        if(this.countError >= 3){
            createAlert(this.alert, 
                '? OE ESPECIAL.. ', 
                'ESCRIBE UN MENSAJE',
                ALERT_TYPE.INFO,
                [this.btnMessage, this.userMsg, this.microphone])
            this.countError = 0
            element.classList.remove(classname)
            return
        }
        if(!isCount || this.countError < 3) {
            isCount ? this.countError += 1 : null
            setTimeout(()=>{
                element.classList.remove(classname)
            }, 1000)
            return
        }
    }
    validateMessage(){
        const isHTML = this.userMsg instanceof HTMLElement
        if(!isHTML) return console.log('No definido -> ',this.userMsg)
        const userMsg = this.userMsg.value.trim()
        if(userMsg === ''){
            this.timeOutClass(this.userMsg, CLASSNAME.invalid, true)
            return null
        }
        this.userMsg.value = this.userMsg.value.replace(/\s+/g, ' ').trim()
        return this.userMsg.value
    }
    toggleBtnChat(){
        if(this.userMsg.value === ''){
            this.boxBtnChat.classList.remove(CLASSNAME.show)
            this.socket.eInputOff()
            return
        }
        if(this.userMsg.value.length > 0){
            this.boxBtnChat.classList.add(CLASSNAME.show)
            this.socket.username = this.username.textContent
            this.socket.eInputOn()
            return
        }
    }
    #controllerSendMessage(e,type){
        // KeyCode de ENTER = 13
        // KeyCode de SHIFT = 16
        const isKeyShift = e.shiftKey
        const isKeyEnter = e.key === 'Enter'
        if(type==='down' && !isKeyShift && isKeyEnter){ //cuando viene del evento keydown
            e.preventDefault();
            this.#eFormMessage(e);
        }
        if(type === 'down' && isKeyEnter && isKeyShift){
            e.preventDefault();
            e.target.value += '\n';
            return
        }
    }
    #eDocContentLoaded(){
        this.username = this.getLocalStorage()
        this.username.value === null ? this.username.value = 'User random' : null
    }
    #eFormMessage(e){
        e.preventDefault()
        const newMessage = this.validateMessage()
        if(!newMessage)return //ninguna accion con los sockets
        this.userMsg.value = ''
        this.countError = 0;
        this.toggleBtnChat()
        // EMITIR EVENTO SOCKET
        this.socket.username = this.username.textContent
        this.socket.userMessage = newMessage
        this.socket.eMessages()
        // console.log(newMessage);
    }
    init(){
        // document.addEventListener('DOMContentLoaded', this.#eDocContentLoaded)
        this.formMsg.addEventListener('submit', (e)=> this.#eFormMessage(e))
        this.userMsg.addEventListener('input', ()=> this.toggleBtnChat())
        this.userMsg.addEventListener('keydown', (e)=> this.#controllerSendMessage(e, 'down'))
        this.userMsg.addEventListener('keyup', (e)=>this.#controllerSendMessage(e, 'up'))
        // escuchar eventos
        this.socket.init()
    }
}
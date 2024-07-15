import { createAlert, MESSAGE_TYPE, ALERT_TYPE } from "./components/alert-modal.js" 
import { createEmojiShow } from "./components/elements-html.js"
import { messageURL } from "../scripts/socket-client/chat-url.js"
import { tplBoxMessage } from "./templates/chat-messages.js"

const zonaActual = Intl.DateTimeFormat().resolvedOptions().timeZone
const divAlert = document.querySelector('.alert')
const insertEmojis = document.querySelector('.form-insert--emoji')
insertEmojis.appendChild(createEmojiShow())
const formData = document.querySelectorAll('.form-data textarea, .form-data button, .form-data [type="button"]');

// SERVER
const serverBtnAddRoom = document.querySelector('#app-addRoom')
const serverBtnFAQ = document.querySelector('#app-faq')
const serverFormSearchRoom = document.querySelector('.search-room-form')
const serverInputSearch = document.querySelector('#search-room')
//obtener aqui el click en el boton de configuracion de la sala
// obtener aqui el click en la sala para entrar a chatear
const serverRoomContainer = document.querySelector('.chat-server--rooms')
// USER
const userName = document.querySelector('#server-user-name');
const userRename = document.querySelector('#server-user-rename')
const userID = document.querySelector('#server-user-id');
const btnUserConfig = document.querySelector('#server-user-config-btn')
const btnEmoji = document.querySelector('#btn-emoji')
const btnFile = document.querySelector('#btn-file')
const userMessage = document.querySelector('#chat-message')
const boxUserSend = document.querySelector('.chat-form-send')
const btnMicro = document.querySelector('#btn-chat-micro')
const btnSend = document.querySelector('#btn-chat-send')
const userFormChat = document.querySelector('#room-chat-form')
// ROOM
const chatRoomState = document.querySelector('#room-state')
const chatRoomName = document.querySelector('#server-room-name')
const chatRoomUserActive = document.querySelector('#server-room-users')
const chatRoomUserState = document.querySelector('#server-room-active')
const chatRoomShareID = document.querySelector('#room-action-share')
const btnRoomCall = document.querySelector('#btn-room-action-call')
const btnRoomConfig = document.querySelector('#btn-room-action-config')
const ulRoomConfig = document.querySelector('#room-action-config-list')
const chatContentMessages = document.querySelector('#chat-global')

const CLASSNAME = {
    active: '--active',
    disabled: '--disabled',
    invalid: '--invalid',
    show: '--show',
}
class DisabledElements {
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
let arrElements = [btnMicro,serverBtnAddRoom, serverBtnFAQ,btnRoomCall, btnRoomConfig, btnUserConfig]
const INVALID_ELEMENTS = new DisabledElements()
INVALID_ELEMENTS.alert=divAlert
INVALID_ELEMENTS.elements = arrElements
INVALID_ELEMENTS.init();

class ChatDataStorage{
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
class ChatMessage extends ChatDataStorage{
    constructor(itemStorage){
        super(itemStorage)
        this.username = userName //nombre de usuario
        this.userID = userID //ID del servidor de usuario
        this.userMsg = userMessage //mensaje del usuario
        this.roonName = chatRoomName //nombre de la sala activa
        this.roomID = chatRoomShareID // ID de la sala activa
        this.formMsg = userFormChat // Formulario del chat que envia el mensaje
        this.alert = divAlert
        this.microphone = btnMicro // boton del microfono del chat
        this.btnMessage = btnSend // boton de enviar mensajes del chat
        this.boxBtnChat = boxUserSend // Contenedor de: [btnMicro y btnChat]
        this.rename = false // Estado del Modal para renombrar usuario
        this.countError = 0
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
            return
        }
        if(this.userMsg.value.length > 0){
            this.boxBtnChat.classList.add(CLASSNAME.show)
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
        console.log(newMessage);
    }
    init(){
        // document.addEventListener('DOMContentLoaded', this.#eDocContentLoaded)
        this.formMsg.addEventListener('submit', (e)=> this.#eFormMessage(e))
        this.userMsg.addEventListener('input', ()=> this.toggleBtnChat())
        this.userMsg.addEventListener('keydown', (e)=> this.#controllerSendMessage(e, 'down'))
        this.userMsg.addEventListener('keyup', (e)=>this.#controllerSendMessage(e, 'up'))
    }
}
const USER_CHAT = new ChatMessage()
USER_CHAT.init()

class SocketsMessage {
    constructor(io, container, actionState, actionValue, username){
        this.socket = io()
        this.socket.on('connect', (data)=> console.log(data))
        this.socket.on('disconnect', (data)=> console.log(data))
        this.socketID = this.socket.id.slice(0,6)
        this.container = container
        this.actionUser = actionState
        this.actionValue = actionValue
        this.username = username
    }
    // PRIVATE
    #dataUser(){
        return {
            userID: this.socketID,
            userName: this.username,
            zonaHoraria: zonaActual
        }
    }
    // ENVIAR EVENTOS
    eRegister(){
        this.socket.emit('chat:register', this.#dataUser())
    }
    eMessages(){
        this.socket.emit('chat:message', this.#dataUser)
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
            this.actions.innerHTML = ''
            this.container.innerHTML += tplBoxMessage(objMessage, data)
            this.container.scrollTop = this.container.scrollHeight
        })
    }
    onTypingOn(){
        this.socket.on('chat:typing:on', (data)=>{
            this.actionUser.value = data
            this.actionValue = 'esta escribiendo...'
        })
    }
    onTypingOff(){
        this.socket.on('chat:typing:off', (data)=>{
            this.actionUser.value = ''
            this.actionValue.value = ''
        })
    }
}
// new SocketsMessage(io)


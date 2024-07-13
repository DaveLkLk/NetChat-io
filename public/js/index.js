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
        this.microphone = btnMicro // boton del microfono del chat
        this.btnMessage = btnSend // boton de enviar mensajes del chat
        this.boxBtnChat = boxUserSend // Contenedor de: [btnMicro y btnChat]
        this.rename = false // Estado del Modal para renombrar usuario
    }
    timeOutClass(element, classname){
        element.value = ''
        setTimeout(()=>{
            element.classList.add(classname)
        }, 1000)
    }
    validateMessage(){
        const isHTML = this.userMsg instanceof HTMLElement
        if(!isHTML) return console.log('No definido -> ',this.userMsg)
        const userMsg = this.userMsg.value.trim()
        if(userMsg === ''){
            let classname = `${this.userMsg.id}${CLASSNAME.invalid}`
            this.userMsg.classList.add(classname)
            this.timeOutClass(this.userMsg, classname)
            return
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
    #eDocContentLoaded(){
        this.username = this.getLocalStorage()
        this.username.value === null ? this.username.value = 'User random' : null
    }
    #eFormMessage(e){
        e.preventDefault()
        const newMessage = this.validateMessage()
        // EMITIR EVENTO SOCKET
        console.log(newMessage);
    }
    init(){
        // document.addEventListener('DOMContentLoaded', this.#eDocContentLoaded)
        this.formMsg.addEventListener('submit', (e)=> this.#eFormMessage(e))
        this.userMsg.addEventListener('input', ()=> this.toggleBtnChat())
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


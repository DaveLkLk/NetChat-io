import { createEmojiShow } from "./components/elements-html.js"
import { ChatMessage, DisabledElements } from "./classes/sockets.js"


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

// OBTENER VALORES DEL LOCALSTORAGE --USERNAME
const userLocalName = localStorage.getItem('chat-username')
userLocalName !== null ? userName.textContent = userLocalName : userName.textContent = 'User random'

let arrElements = [btnMicro,serverBtnAddRoom, serverBtnFAQ,btnRoomCall, btnRoomConfig, btnUserConfig]
const INVALID_ELEMENTS = new DisabledElements(arrElements, divAlert)
INVALID_ELEMENTS.init();


const objSocket = {
    container: chatContentMessages,
    actUser: chatRoomUserActive,
    actState: chatRoomUserState
}
const USER_CHAT = new ChatMessage('data', io, objSocket)
USER_CHAT.username = userName
USER_CHAT.userMsg = userMessage
USER_CHAT.userID = userID
USER_CHAT.roomName = chatRoomName
USER_CHAT.roomID = chatRoomShareID
USER_CHAT.formMsg = userFormChat
USER_CHAT.microphone = btnMicro
USER_CHAT.btnMessage = btnSend
USER_CHAT.boxBtnChat = boxUserSend
USER_CHAT.alert = divAlert
USER_CHAT.init()


// new SocketsMessage(io)


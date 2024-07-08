import { createAlert, MESSAGE_TYPE, ALERT_TYPE } from "./components/alert-modal.js" 
import { createEmojiShow } from "./components/elements-html.js"

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
// ROOM
const chatRoomState = document.querySelector('#room-state')
const chatRoomName = document.querySelector('#server-room-name')
const chatRoomUserActive = document.querySelector('#server-room-users')
const chatRoomUserState = document.querySelector('#server-room-active')
const btnRoomCall = document.querySelector('#btn-room-action-call')
const btnRoomConfig = document.querySelector('#btn-room-action-config')
const ulRoomConfig = document.querySelector('#room-action-config-list')
const chatContentMessages = document.querySelector('#chat-global')



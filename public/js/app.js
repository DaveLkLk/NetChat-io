import { Chat, chatActions, chatEmoji, FileActions } from "../scripts/classes/Chat-actions.js"
import { createChatMessage, createBtnMicro, createBtnChat, createLoader, createBtnEmoji, createEmojiShow } from "./components/elements-html.js"
import { messageURL } from "../scripts/socket-client/chat-url.js"

import { createAlert, MESSAGE_TYPE, ALERT_TYPE } from "./components/alert-modal.js" 
import { queryScreenPage } from "./validators/screen-page.js"
import { createPreviewContent, typesFile, createiconImgType } from "../scripts/socket-client/chat-types.js"

const zonaActual = Intl.DateTimeFormat().resolvedOptions().timeZone

const insertEmoji = document.querySelector('.form-insert--emoji')
    // insertEmoji.appendChild(createBtnEmoji())
    insertEmoji.appendChild(createEmojiShow())
// const FGactionMessage = document.querySelector('.fg__action--message')
//     FGactionMessage.appendChild(createChatMessage())
// const switchSend = document.querySelector('.switch__send')
//     switchSend.appendChild(createBtnChat())
// const switchMicro = document.querySelector('.switch__microphone')
//     switchMicro.appendChild(createBtnMicro())


const divAlert = document.querySelector('.alert')
const formData = document.querySelectorAll('.form-data textarea, .form-data button, .form-data .file__btn, .form-data btn-emoji')

window.addEventListener('resize', function(){
    const objectAlert = {
        container: divAlert,
        message: MESSAGE_TYPE.MIN_SCREEN,
        class: ALERT_TYPE.FATAL,
        arr: formData
    }
    queryScreenPage(450, objectAlert, 'min')
})
window.addEventListener('DOMContentLoaded', function(){
    const objectAlert = {
        container: divAlert,
        message: MESSAGE_TYPE.MIN_SCREEN,
        class: ALERT_TYPE.FATAL,
        arr: formData
    }
    queryScreenPage(450, objectAlert, 'min')
})




const emojiActions = document.getElementById('emoji--show')
const emojiList = document.getElementById('emoji-list')
const emojiSearch = document.getElementById('emoji-search')


const containerChat = document.querySelector('.container-chat')
const containerUser = document.querySelector('.container-user')
const userModal = document.getElementById('user-modal')
const addUsername = document.getElementById('addUsername')
// terminos-acept -> no requerido
// const userTerminos = document.getElementById('terminos-acept')
const formUser = document.getElementById('form-user')
const btnClose = document.getElementById('btn-close')
// ********************
const chatGlobal = document.getElementById('chat-global')
const chatAction = document.getElementById('chat-action')
const chatUsername = document.getElementById('chat-username')
const changeUsername = document.getElementById('change-username')
const chatMessage = document.querySelector('.chat-message')
const chatAudio = document.querySelector('.switch__microphone')
const chatSend = document.querySelector('.switch__send')
const btnChat = document.getElementById('btn-chat')
const btnAudio = document.getElementById('btn-audio')

const chat = new Chat(
    addUsername,
    chatUsername,
    userModal,
    containerUser,
    containerChat,
    'chat-username',
    btnClose,
    formUser,
    changeUsername
)
chat.init()

// interactividad en el chat

const compare = new chatActions()
compare.toggle1 = chatAudio
compare.toggle2 = chatSend
compare.validator = chatMessage
compare.init()

// **********************************************************************
// **********************************************************************
// **********************************************************************

const roomFormChat = document.querySelector('#room-chat-form')
const emojiDefault = new chatEmoji(roomFormChat)
emojiDefault.init()
// *****************************************
// *****************************************
// *****************************************
// *****************************************
// *****************************************

// ******************************************************************************
// INICIAN LOS SOCKETS
const socket = io();


const fileBtn = document.querySelector('.file__btn button')
const fileDivBtn = document.querySelector('.file__btn')
const fileShow = document.querySelector('.file__show')
const filesInputs = Array.from(document.querySelectorAll('.file__actions input[type="file"]'))
const fileTypes = document.querySelectorAll('.file__type')

function fileBtnToggle(){
    fileDivBtn.classList.toggle('file__btn--active')
    fileShow.classList.toggle('file__show--active')
}
fileBtn.addEventListener('click', function(){
    fileBtnToggle()
})
fileTypes.forEach((element, i) => {
    if(element instanceof HTMLElement){
        const dataTypes = element.getAttribute('data-type')
        const actionFileAudio = new FileActions(
            filesInputs[i],
            element,
            dataTypes,
            fileBtnToggle)
        actionFileAudio.init()
        actionFileAudio.getDateObject()
    }
});


export class ChatSendMessage {
    constructor (textarea, emjshow, btnSendMsg){
        this.dataUrl = null
        this.data = null
        this.toggleClose = null
        this.preview = null
        this.message = textarea
        this.emjshow = emjshow
        this.btnsend = btnSendMsg
        this.actions = document.getElementById('chat-action')
        this.username = document.getElementById('chat-username')
        this.min = 40
        this.max = 160
        this.isPreview = false
        this.scrollHidden = (element)=> element.style.overflowY = 'hidden'
        this.scrollAuto = (element)=> element.style.overflowY = 'auto'
        this.minHeight = (element)=> element.style.height = '40px'
    }
    inputHeight(){
        if(!(this.message instanceof HTMLTextAreaElement)){
            return console.log("this.message no definido");
        }
        if(this.message.scrollHeight < this.max){
            this.message.classList.remove('chat-message--scroll')
        }
        if(this.message.scrollHeight >= this.max){
            this.message.classList.add('chat-message--scroll')
        }
    }
    inputChatMessage(){
        if(this.message.value === ''){
            socket.emit('chat:typing:off', this.message.value)
            this.actions.innerHTML = ''
            return
        }
        socket.emit('chat:typing:on', this.username.value)
        this.inputHeight()
    }
    chatMessageSize(){
        this.inputChatMessage()
        this.message.style.height = 'auto'
        this.message.style.height = `${Math.min(this.message.scrollHeight, 160)}px`
        this.message.style.overflowY = this.message.scrollHeight > 160 ? 'scroll' : 'hidden'
        this.message.scrollTop = this.message.scrollHeight - this.message.clientHeight
    }
    chatMessageOnKeyDown(e){
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault()
            // EN MODO MOBILE LA TECLA ENTER NO ENVIA MENSAJES
            if(window.innerWidth <= 450){
                e.target.value += '\n'
                this.chatMessageSize()
            }else{
                this.formdataSubmit(e, this.isPreview)
            }
        }
    }
    backSpaceOnKeydown(e){
        if(e.key === 'Backspace' && this-this.message.value === ''){
            e.preventDefault()
            this.deleteLine()
        }
    }
    deleteLine(){
        const lines = this.message.value.split('\n')
        lines.pop()
        this.message.value = lines.join('\n')
        this.chatMessageSize()
    }
    chatMessageEventsListener(){
        this.message.addEventListener('input', ()=> this.chatMessageSize())
        this.message.addEventListener('keydown', (e)=> this.chatMessageOnKeyDown(e))
        this.message.addEventListener('keydown', (e)=> this.backSpaceOnKeydown(e))
    }
    formdataSubmit(e, isPreview){
        e.preventDefault()
        if(isPreview === false){
            if(this.message instanceof HTMLElement){
                // ACCION SI EL MENSAJE ES VACIO
                this.minHeight(this.message)
                if(this.message.value.trim() === ''){
                    this.scrollHidden(this.message)
                    this.message.value = ''
                    this.message.classList.add('chat-message--null')
                    setTimeout(()=>{
                        this.message.classList.remove('chat-message--null')
                    }, 1000);
                    // ...
                    return
                }
                // SE ENVIA EL MENSAJE A TODOS
                this.emjshow.classList.remove('emoji--show--active')
                socket.emit('chat:message',{
                    user: this.username.value,
                    message: this.message.value,
                    zonaHoraria: zonaActual
                })
                this.message.value = ''
                this.scrollHidden(this.message)
                // esconder el boton de enviar mensaje:
                compare.toggleClass()
            }
            return
        }
        if(isPreview === true){
            // ENVIAR CONTENIDO DE VISTA PREVIA ...
            this.emjshow.classList.remove('emoji--show--active')
            // socket.emit('chat:sendFile', this.data)
            const msg = this.message.value
            const dataSocket = {...this.data, msg}
            console.log(dataSocket);
            this.toggleClose(this.preview, 'hidden', this.message)
            socket.emit('chat:sendFile', dataSocket)
            return
        }
    }
    init(){
        this.chatMessageEventsListener()
        this.btnsend.addEventListener('click', (e)=> this.formdataSubmit(e, this.isPreview))
    }
}
const sendMessageIni = new ChatSendMessage(chatMessage, emojiActions, btnChat)
sendMessageIni.init()


//   Boton audio deshabilitado 

btnAudio.addEventListener('click', ()=>{
    const message = MESSAGE_TYPE.NO_DISPONIBLE
    const typeAlert = ALERT_TYPE.INFO
    createAlert(divAlert, '',message, typeAlert, formData)
});
// *************************************************************
// btnChat.addEventListener('click', (e)=>{
//     formdataSubmit(e, chatMessage)
// })
class ChatDownload {
    constructor(ancla, btnArea){
        this.strClass = 'files-link'
        this.donwload = ancla
        this.btnArea = btnArea
    }
    donwloadHandler(){
        this.donwload.click();
    }
    init(){
        this.btnArea.addEventListener('click', ()=>this.donwloadHandler())
    }
}

// Escuchar eventos del servidor
socket.on('chat:message', (data)=>{
    const sendMe = (data.from === socket.id.slice(0, 6)) ? 'Yo' : data.user
    const messageClass = (sendMe === 'Yo') ? 'chat-me' : 'chat-other'
    const clearMsg = data.message.trim()
    const formatMSG = messageURL(clearMsg)
    chatAction.innerHTML = ''
    chatGlobal.innerHTML += `
        <div class="${messageClass} chat-users">
            <strong>~${sendMe}~</strong>
            <div class="chat-msg">
                <span class="chat-mensaje">${formatMSG}</span>
                <span class="chat-time">${data.fecha} - ${data.time}</span>
            </div>
        </div>
    `;
    chatGlobal.scrollTop = chatGlobal.scrollHeight
})
socket.on('chat:sendFile', (data) =>{
    const sendMe = (data.from === socket.id.slice(0, 6)) ? 'Yo' : data.user
    const msgClass = (sendMe === 'Yo') ? 'chat-me' : 'chat-other'
    
    // const blob = new Blob([data.bin], {type: data.type})
    // const url = URL.createObjectURL(blob)
    // const urlFile = url
    chatAction.innerHTML = ''
    chatGlobal.innerHTML += `
        <div class="${msgClass} chat-users">
            <strong>~${sendMe}~</strong>
            <div class="chat-files" role="button">
                <a class="files-link" href="#" target="_blank" download="${data.name}"></a>
                <div class="files--img">
                    <img src="${data.icon}" alt="Netchat-IO/image-${data.strtype}}">
                </div>
                <div class="files-data">
                    <h4 class="files-name">${data.name}</h4>
                    <p class="files-types">
                        <span>${String(data.strtype).toUpperCase()}</span>
                        <span>${data.size}</span>
                    </p>
                </div>
            </div>
            <div class="chat-msg">
                <span class="chat-mensaje">${data.msg.trim()}</span>
                <span class="chat-time">${data.fecha} - ${data.hora}</span>
            </div>
        </div>
    `;
    const ancla = chatGlobal.querySelector('.chat-files .files-link')
    console.log(ancla);
    const ariaBtn = chatGlobal.querySelector('.chat-files')
    const donwloadActions = new ChatDownload(ancla, ariaBtn)
    donwloadActions.init()
    console.log(data);
})
socket.on('chat:sendfiles:off', data=>{
    chatAction.innerHTML = `
        <p>${data.info}
            <span>•</span>
            <span>•</span>
            <span>•</span>
        </p>
    `;
})
// ***********************
socket.on('chat:typing:on', (data)=>{
    chatAction.innerHTML = `
        <p>${data} esta escribiendo
            <span>•</span>
            <span>•</span>
            <span>•</span>
        </p>
    `;
})
socket.on('chat:typing:off', ()=>{
    chatAction.innerHTML = ''
})
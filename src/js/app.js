// clave API - OPEN EMOJI API
// 93466aec4d6b52c2ac784009561974d49b0a87a9


// const EMOJI_LIST = 'https://emoji-api.com/emojis?access_key=93466aec4d6b52c2ac784009561974d49b0a87a9';
const EMOJI_LIST = './db/emojis.json';

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
const chatMessage = document.getElementById('chat-message')
const chatAudio = document.querySelector('.switch__microphone')
const chatSend = document.querySelector('.switch__send')
const btnChat = document.getElementById('btn-chat')

async function getData(urlParam){
    try{
        const response = await fetch(urlParam)
        if(!response.ok){
            throw new Error("Falló respuesta del servidor")
        }
        const data = await response.json()
        return data
    }
    catch(error){
        console.log(error);
    }
}


class Chat {
    constructor(getUser, username, modal, containerUser, containerChat, item){
        this.getUser = getUser
        this.username = username
        this.modal = modal
        this.containerUser = containerUser
        this.containerChat = containerChat
        this.item = item
        this.localUsername = localStorage.getItem(item)
        this.update = false
    }
    getLocalStorage(){
        return localStorage.getItem(this.item)
    }
    setLocalStorage(value){
        return localStorage.setItem(this.item, value)
    }
    showModal(boolean){
        if(!(typeof boolean === 'boolean')){
            return console.log("no definido", boolean);
        }
        if(boolean === true){
            this.changeClassModal(false)
            // esperar evento click-> btnClose y formUser
        }
        if(boolean === false){
            this.changeClassModal(false)
            this.localUsername = this.getLocalStorage()
            this.getUser.value = this.localUsername
            // esperar evento click-> btnClose y formUser
        }
    }
    isElementNull(){
        if(!(this.getUser instanceof HTMLElement)){
            return console.log("no definido", this.getUser);
        }
        if(this.getUser.value === ''){
            this.getUser.classList.add(`${this.getUser.id}--active`)
            console.log(this.getUser);
            setTimeout(()=>{
                this.getUser.classList.remove(`${this.getUser.id}--active`)
            }, 1000)
            return
        }
        this.username.value = this.getUser.value
        this.hiddenModal(true)
    }
    changeClassModal(boolean){
        if(!(typeof boolean === 'boolean')){
            return console.log("no definido", boolean);
        }
        if(boolean === true){
            this.modal.classList.remove('user-modal--active')
            this.containerUser.classList.add('container-user--hide')
            this.containerChat.classList.add('container-chat--active')
            return
        }
        if(boolean === false){
            this.modal.classList.add('user-modal--active')
            this.containerUser.classList.remove('container-user--hide')
            this.containerChat.classList.remove('container-chat--active')
            return
        }
    }
    hiddenModal(boolean){
        if(!(typeof boolean === 'boolean')){
            return console.log("no definido", boolean);
        }
        if(boolean === true){
            const item = this.getLocalStorage()
            if(item === null){
                this.setLocalStorage(this.getUser.value)
            }
            if(item !== null){
                this.username.value = item
            }
            if(this.update === true){
                this.setLocalStorage(this.getUser.value)
                this.username.value = this.getUser.value

            }
            this.changeClassModal(true)
        }
        if(boolean === false){
            this.changeClassModal(false)
        }
    }

    init(){
        document.addEventListener('DOMContentLoaded', ()=>{
            this.localUsername = this.getLocalStorage()
            if(this.localUsername === null){
                return this.showModal(true)
            }
            return this.hiddenModal(true)
        })
        btnClose.addEventListener('click', ()=>{
            this.isElementNull()
        })
        formUser.addEventListener('submit', (e)=>{
            e.preventDefault()
            this.isElementNull()
        })
        changeUsername.addEventListener('click', ()=>{
            this.update = true
            this.showModal(false)
        })
    }
}
const chat = new Chat(
    addUsername,
    chatUsername,
    userModal,
    containerUser,
    containerChat,
    'chat-username'
)
chat.init()

// interactividad en el chat

class chatActions {
    constructor(element1, element2, elementValidator) {
        this.toggle1 = element1
        this.toggle2 = element2
        this.validator = elementValidator
        this.saveStorage = false
    }
    toggleClass(){
        const dataName1 = this.toggle1.getAttribute('data-toggle')
        const dataName2 = this.toggle2.getAttribute('data-toggle')

        if(this.validator.value.length === 0){
            this.toggle1.classList.remove(`${dataName1}--disabled`)
            this.toggle2.classList.add(`${dataName2}--disabled`)
        }
        if(this.validator.value.length > 0){
            this.toggle1.classList.add(`${dataName1}--disabled`)
            this.toggle2.classList.remove(`${dataName2}--disabled`)
        }
    }
    init(){
        if(!(
            this.toggle1 instanceof HTMLElement
            && this.toggle2 instanceof HTMLElement
            && this.validator instanceof HTMLElement
            )){
            return console.log("no definido", this.toggle1,this.toggle2, this.validator);
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            this.toggleClass()
        })
        this.validator.addEventListener('input', ()=>{
            this.toggleClass()
        })
    }
}
const compare = new chatActions()
compare.toggle1 = chatAudio
compare.toggle2 = chatSend
compare.validator = chatMessage
compare.init()





// **********************************************************************
// **********************************************************************
// **********************************************************************
function addEmojiMessage(){
    if(!(this instanceof HTMLLIElement)){
        return console.log("ocurrio un problema al localizar el elemento", this);
    }
    chatMessage.value += this.textContent
    compare.toggleClass()
}
function setEmojiMessage(){
    const emojiList = ObjectEmoji.list
    if(!(emojiList instanceof HTMLElement)){
        return console.log("object.list no definido");
    }
    const listEmojis = document.querySelectorAll('.emoji-list li')
    listEmojis.forEach(li =>{
        li.addEventListener('click', addEmojiMessage)
    })
}
async function nameGroupsEmoji(){
    const response = await getData(EMOJI_LIST)
    const nameGroups = response.reduce((acc, emoji)=>{
        if(!(acc.includes(emoji.group))){
            acc.push(emoji.group)
        }
        return acc
    }, [])
    return nameGroups
}
async function setDataBtn(){
    const nameGroups = await nameGroupsEmoji()
    buttonsEmoji.forEach((btn, i)=>{
        btn.setAttribute('data-group', nameGroups[i])
    })
}
const btnEmojiContainer = document.getElementById('emoji-group')
const buttonsEmoji = document.querySelectorAll('.emoji-group button')
const btnEmoji = document.getElementById('btn-emoji')

const newStorage = new Chat()
newStorage.item = "btn-position"
const ObjectEmoji = {
    toggle: emojiActions,
    list: emojiList,
    item: newStorage.item,
    local: newStorage.getLocalStorage(),
    position: 0
}
async function showGroupEmoji(){
    try {
        const response = await fetch(EMOJI_LIST)
        const data = await response.json()
        
        const nameGroups = await nameGroupsEmoji()
        const ObjectGroupsEmoji = data.reduce((acc, obj)=>{
            const EmojiGroup = obj.group
            if(!acc[EmojiGroup]){
                acc[EmojiGroup] = []
            }
            acc[EmojiGroup].push(obj)
            return acc
        })
        let listGroups = []
        nameGroups.map((element)=>{
            let cadaObjeto = ObjectGroupsEmoji[element]
            if(cadaObjeto){
                listGroups.push(cadaObjeto)
            }
        })
        return listGroups;
    } catch (error) {
        console.log(error);
    }
}
async function setListEmoji(object){
    if(!(object instanceof Object)){
        return console.log("no definido", object);
    }
    const ArrayGroupsEmoji = await showGroupEmoji()
    object.list.innerHTML = ''
    let position = Number(object.position)
    ArrayGroupsEmoji[position].forEach(emoji => {
        const li = document.createElement('li')
        li.setAttribute('emoji-name', emoji.slug)
        li.setAttribute('emoji-group', emoji.group)
        li.setAttribute('emoji-code', emoji.codePoint)
        li.setAttribute('emoji-subgroup', emoji.subGroup)
        li.textContent = emoji.character
        object.list.appendChild(li)
    });
    setEmojiMessage();
}


btnEmoji.addEventListener('click', async(e)=>{
    // CODE EMOJI
    let isClassActive = ObjectEmoji.toggle.classList.contains('emoji--show--active')
    if(isClassActive === true){
        ObjectEmoji.toggle.classList.remove(`${ObjectEmoji.toggle.id}--active`)
        return
    }
    if(isClassActive === false){
        ObjectEmoji.toggle.classList.add(`${ObjectEmoji.toggle.id}--active`)
        await setListEmoji(ObjectEmoji)
        return
    }
})
document.addEventListener('DOMContentLoaded', async()=>{
    const getLocalStorage = ObjectEmoji.local
    if(getLocalStorage === null || getLocalStorage === undefined){
        newStorage.setLocalStorage(ObjectEmoji.position)
        buttonsEmoji[ObjectEmoji.position].classList.add('btn__group--active')
        await setListEmoji(ObjectEmoji)
        return
    }
    ObjectEmoji.position = ObjectEmoji.local
    let position = Number(newStorage.getLocalStorage())
    buttonsEmoji[position].classList.add('btn__group--active')
    await setListEmoji(ObjectEmoji)
})

emojiSearch.addEventListener('input', async()=> {
    if(emojiSearch.value === ''){
        await setListEmoji(ObjectEmoji)
        return
    }
    let value = emojiSearch.value.toLowerCase()
    const listEmojis = await getData(EMOJI_LIST)
    
    emojiList.classList.add('emoji-list--search')
    emojiList.innerHTML = ''
    listEmojis.forEach((emoji) =>{
        if(emoji.slug.toLowerCase().includes(value)){
            const li = document.createElement('li')
            li.setAttribute('emoji-name', emoji.slug)
            li.setAttribute('emoji-group', emoji.group)
            li.setAttribute('emoji-subgroup', emoji.subGroup)
            li.textContent = emoji.character
            emojiList.appendChild(li)
        }
    })
})

btnEmojiContainer.addEventListener('click', async(e)=>{
    if(e.target && e.target.tagName === 'BUTTON'){
        const isActive = e.target.classList.contains('btn__group--active')
        if(!isActive){
            buttonsEmoji.forEach((btn)=>{
                btn.classList.remove('btn__group--active')
            })
            e.target.classList.add('btn__group--active')
            const position = Array.from(buttonsEmoji).indexOf(e.target)
            newStorage.setLocalStorage(position)
            ObjectEmoji.position = position
            await setListEmoji(ObjectEmoji)
        }
    }
})
// *****************************************
// *****************************************
// *****************************************
// *****************************************
// *****************************************

// ******************************************************************************










const btnFile = document.querySelector('label[for="chat-file"]')
const inpFile = document.getElementById('chat-file')
inpFile.addEventListener('click', function(){
    this.addEventListener('change', function(){
        const year = this.files[0].lastModifiedDate.getFullYear()
        const month = this.files[0].lastModifiedDate.getMonth()
        const date = this.files[0].lastModifiedDate.getDate()
        console.log(this.files);
        console.log(this.files[0].name);
        console.log(this.files[0].size);
        console.log(this.files[0].type);
        console.log(year, month, date);
        // console.log(this);
    })
    // console.log(inpFile.files);
})
btnFile.addEventListener('click', ()=>{
    // console.log("hiciste click bro");
})

function inputHeight(element){
    // console.log(element.scrollTop);
    if(!(element instanceof HTMLElement)){
        return console.log("elemento no definido", element);
    }
    // console.log(element.scrollHeight);
    if(element.scrollHeight < 150){
      element.classList.remove('chat-message--scroll')
      element.style.setProperty('overflow-y', 'hidden')
    //   console.log("menor a 150px");
      return
    }
    if(element.scrollHeight >= 150){
      element.classList.add('chat-message--scroll')
      element.style.setProperty('overflow-y', 'auto')
      element.style.height = `auto`;

      console.log("mayor a 150");
      return
    }
  }


const socket = io();
// Eventos y manejo del textarea del formulario
function inputChatMessage(){
    if(chatMessage.value === ''){
        socket.emit('chat:typing:off', chatMessage.value)
        chatAction.innerHTML = ''
        chatMessage.style.height = `20px`;
        return
    }
    socket.emit('chat:typing:on', chatUsername.value)
    chatMessage.style.height = `${chatMessage.scrollHeight}px`;
    chatMessage.scrollTop = chatMessage.scrollHeight
    
    // console.log(chatMessage.scrollTop);
    inputHeight(chatMessage)
}
chatMessage.addEventListener('input', inputChatMessage);

chatMessage.addEventListener('keydown', function(e){
    if(e.code === 'ShiftRight'){
      this.style.height = `${this.scrollHeight}px`;
      this.scrollTop = this.scrollHeight
    }
    if(e.code === 'Backspace' || e.code === 'Delete' || this.value.length === 0){
        if(this.value === ''){
            this.style.height = `20px`;
            return
        }
        this.style.height = `auto`;
    }
    if(e.code === 'Enter'){
        e.preventDefault()
        formdataSubmit(e, this)
    }
})
chatMessage.addEventListener('keyup', function(e){
    if(e.code === 'ShiftRight'){
        this.value += '\n'
        this.style.height = `${this.scrollHeight}px`;
    }
  })

btnChat.addEventListener('click', (e)=>{
    formdataSubmit(e, chatMessage)
})
function formdataSubmit(e, element){
    e.preventDefault()
    if(element instanceof HTMLElement){
        if(element.value.trim() === ''){
            element.classList.add('chat-message--null')
            setTimeout(()=>{
                element.classList.remove('chat-message--null')
            }, 1000)
            return
        }
        else{
            emojiActions.classList.remove('emoji-actions--active')
            socket.emit('chat:message',{
                user: chatUsername.value,
                message: element.value
            })
            element.value = ''
            element.style.height = 'auto';
            element.scrollTop = element.scrollHeight
            // esconder el boton de enviar mensaje:
            compare.toggleClass()
        }
    }
}
// Escuchar eventos del servidor
// problemas aqui
socket.on('chat:message', (data)=>{
    console.log(data.from);
    const sendMe = (data.from === socket.id.slice(0, 6)) ? 'Yo' : data.user
    const messageClass = (sendMe === 'Yo') ? 'chat-me' : 'chat-other'
    chatAction.innerHTML = ''
    chatGlobal.innerHTML += `
        <div class="${messageClass} chat-users">
            <strong>~${sendMe}~</strong>
            <span class="chat-mensaje">${data.message.trim()}</span>
            <span class="chat-time">${data.fecha} - ${data.time}</span>
        </div>
    `;
    chatGlobal.scrollTop = chatGlobal.scrollHeight
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
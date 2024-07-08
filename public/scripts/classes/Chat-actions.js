import { getData } from "../socket-client/chat-request.js";
import { createLoader } from "../../js/components/elements-html.js";
import { ChatSendMessage } from "../../js/app.js";
import { typesFile } from "../socket-client/chat-types.js";
import { createPreviewContent } from "../socket-client/chat-types.js";
// const EMOJI_LIST = 'https://emoji-api.com/emojis?access_key=93466aec4d6b52c2ac784009561974d49b0a87a9';
const EMOJI_LIST = './db/emojis.json';
const previewContent = document.querySelector('.chat-preview')


export class Chat {
    constructor(getUser, username, modal, containerUser, containerChat, item, btnclose, formuser, changeusername){
        this.getUser = getUser
        this.username = username
        this.modal = modal
        this.containerUser = containerUser
        this.containerChat = containerChat
        this.item = item
        this.localUsername = localStorage.getItem(item)
        this.update = false
        this.btnClose = btnclose
        this.formUser = formuser
        this.changeUsername = changeusername
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
        if(this.getUser.value.trim() === ''){
            this.getUser.classList.add(`${this.getUser.id}--active`)
            this.getUser.value = ''
            setTimeout(()=>{
                this.getUser.classList.remove(`${this.getUser.id}--active`)
            }, 1000)
            return
        }
        const formatGetUser = this.getUser.value.replace(/\s+/g, ' ').trim()
        this.getUser.value = formatGetUser
        this.username.value = formatGetUser
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
        this.btnClose.addEventListener('click', ()=>{
            this.isElementNull()
        })
        this.formUser.addEventListener('submit', (e)=>{
            e.preventDefault()
            this.isElementNull()
        })
        this.changeUsername.addEventListener('click', ()=>{
            this.update = true
            this.showModal(false)
        })
    }
}
export class chatActions {
    constructor(element1, element2, elementValidator) {
        this.toggle1 = element1
        this.toggle2 = element2
        this.validator = elementValidator
        this.saveStorage = false
    }
    toggleClass(){
        const dataName1 = this.toggle1.getAttribute('data-toggle')
        const dataName2 = this.toggle2.getAttribute('data-toggle')

        if(this.validator.value.trim().length === 0){
            this.toggle1.classList.remove(`${dataName1}--disabled`)
            this.toggle2.classList.add(`${dataName2}--disabled`)
        }
        if(this.validator.value.trim().length > 0){
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
export class chatEmoji {
    constructor(containerActions){
        this.textArea = containerActions.querySelector('.chat-message')
        this.btn = containerActions.querySelector('#btn-emoji')
        this.toggle = containerActions.querySelector('#emoji--show')
        this.search = containerActions.querySelector('.emoji-search input#emoji-search')
        this.emojilist = containerActions.querySelector('.emoji-list')
        this.btngroups = containerActions.querySelectorAll('.emoji-group button')
        this.emgroup = containerActions.querySelector('.emoji-group')
        this.item = 'btn-position'
        this.position = this.getLocalStorage() || 0
    }
    getLocalStorage(){
        return localStorage.getItem(this.item)
    }
    setLocalStorage(value){
        return localStorage.setItem(this.item, value)
    }
    addEmojiMessage(e){
        if(e.target.tagName === 'LI'){
            this.textArea.value += e.target.textContent
            this.textArea.focus()
            // mostrar u ocultar el boton de enviar
            compare.toggleClass()
        }
    }
    async nameGroupsEmoji(){
        const response = await getData(EMOJI_LIST)
        const nameGroups = response.reduce((acc, emoji)=>{
            if(!(acc.includes(emoji.group))){
                acc.push(emoji.group)
            }
            return acc
        }, [])
        return nameGroups
    }
    async showGroupEmoji(){
        try {
            const response = await fetch(EMOJI_LIST)
            const data = await response.json()
            
            const nameGroups = await this.nameGroupsEmoji()
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
    async setListEmoji(){
        try {
            const ArrayGroupsEmoji = await this.showGroupEmoji()
            this.emojilist.innerHTML = ''
            let position = Number(this.position)
            ArrayGroupsEmoji[position].forEach(emoji => {
                const li = document.createElement('li')
                li.setAttribute('emoji-name', emoji.slug)
                li.setAttribute('emoji-group', emoji.group)
                li.setAttribute('emoji-code', emoji.codePoint)
                li.setAttribute('emoji-subgroup', emoji.subGroup)
                li.textContent = emoji.character
                this.emojilist.appendChild(li)
            })
        } catch (error) {
            console.log(error);
        }
    }
    init(){
        const load = async()=>{
            this.position = this.getLocalStorage()
            let position = Number(this.getLocalStorage())
            this.btngroups[position].classList.add('btn__group--active')
            await this.setListEmoji(this)
        }
        const localItem = this.getLocalStorage()
        if(localItem) load()

        this.btn.addEventListener('click', async()=>{
            // CODE EMOJI
            load()
            this.btn.classList.toggle(`${this.btn.id}--active`)
            let isClassActive = this.toggle.classList.contains('emoji--show--active')
            if(isClassActive){
                this.toggle.classList.remove(`${this.toggle.id}--active`)
                return
            }
            if(isClassActive === false){
                this.toggle.classList.add(`${this.toggle.id}--active`)
                await this.setListEmoji()
                return
            }
        });
        document.addEventListener('DOMContentLoaded', async()=>{
            if(localItem === null || localItem === undefined){
                this.setLocalStorage(this.position)
                this.btngroups[this.position].classList.add('btn__group--active')
                await this.setListEmoji()
                return
            }
            this.position = this.getLocalStorage()
            let position = Number(this.getLocalStorage())
            this.btngroups[position].classList.add('btn__group--active')
            await this.setListEmoji(this)
        })
        this.emgroup.addEventListener('click', async(e)=>{
            if(e.target && e.target.tagName === 'BUTTON'){
                const isActive = e.target.classList.contains('btn__group--active')
                if(!isActive){
                    this.btngroups.forEach((btn)=>{
                        btn.classList.remove('btn__group--active')
                    })
                    e.target.classList.add('btn__group--active')
                    const position = Array.from(this.btngroups).indexOf(e.target)
                    this.setLocalStorage(position)
                    this.position = position
                    await this.setListEmoji()
                }
            }
        })
        this.search.addEventListener('input', async()=> {
            if(this.search.value === ''){
                await this.setListEmoji()
                return
            }
            let value = this.search.value.toLowerCase()
            const listEmojis = await getData(EMOJI_LIST)
            
            this.emojilist.classList.add('emoji-list--search')
            this.emojilist.innerHTML = ''
            listEmojis.forEach(emoji =>{
                if(emoji.slug.toLowerCase().includes(value)){
                    const li = document.createElement('li')
                    li.setAttribute('emoji-name', emoji.slug)
                    li.setAttribute('emoji-group', emoji.group)
                    li.setAttribute('emoji-subgroup', emoji.subGroup)
                    li.textContent = emoji.character
                    this.emojilist.appendChild(li)
                }
            })
        })
        this.emojilist.addEventListener('click', this.addEmojiMessage.bind(this))
    }
}
export class FileActions {
    constructor(input, element, dataName, filetoggle){
        this.input = input instanceof HTMLElement ? input : null;
        this.element = element instanceof HTMLElement ? element : null;
        this.dataName = typeof dataName === "string" ? dataName : undefined;
        this.filetoggle = typeof filetoggle === 'function' ? filetoggle : undefined;
        this.date = new Date();

        if(!this.input || !this.element){
            throw new Error("Parámetros invalidos: input y element deben ser instancias de HTMLElement.")
        }
    }

    togglePreviewButton(element, hide, txtarea){
        if(hide === false){
            element.classList.add(`${element.id}--active`)
            return
        }
        if(hide === true){
            const previewBtn = document.querySelector('.preview__btn')
            function previewBtnHandler(txtarea){
                element.classList.remove(`${element.id}--active`)
                element.innerHTML = ''
                txtarea.value = ''
                return
            }
            previewBtn.addEventListener('click', ()=>previewBtnHandler(this.input))
        }
        if(hide === 'hidden'){
            element.classList.remove(`${element.id}--active`)
            element.innerHTML = ''
            txtarea.value = ''
            return
        }
        if(element === undefined || hide === undefined){
            console.log("parámetros no definidos-> element || hide");
        }
    }
    getDateObject(){
        const dias = {
            0: 'domingo',
            1: 'lunes',
            2: 'martes',
            3: 'miercoles',
            4: 'jueves',
            5: 'viernes',
            6: 'sabado'
        };
        const meses = {
            0: 'enero',
            1: 'febrero',
            2: 'marzo',
            3: 'abril',
            4: 'mayo',
            5: 'junio',
            6: 'julio',
            7: 'agosto',
            8: 'septiembre',
            9: 'octubre',
            10: 'noviembre',
            11: 'diciembre',
        }
        const year = this.date.getFullYear()
        const month = this.date.getMonth()
        const dayMonth = this.date.getDate()
        const dayWeek = this.date.getDay()
        const timeHour = String(this.date.getHours()).padStart(2, '0')
        const timeMinute = String(this.date.getMinutes()).padStart(2, '0')
        const timeSeconds = String(this.date.getSeconds()).padStart(2, '0')
        const stringMonth = String(month + 1).padStart(2, '0')
        const stringDayMonth = String(dayMonth).padStart(2, '0')
        const nameMonth = String(meses[month])
        const nameDayWeek = String(dias[dayWeek])
        const shortDayWeek = nameDayWeek.toUpperCase().slice(0, 3)
        const shortNameMonth = nameMonth.toUpperCase().slice(0, 3)
        const fechaLocal = `${stringDayMonth}-${stringMonth}-${year}`
        const diaMes = `${stringDayMonth}-${shortNameMonth}`
        const formatFullTime = `${timeHour}:${timeMinute}:${timeSeconds}`
        const formatTime = `${timeHour}:${timeMinute}`

        const objectDate = {
            year,
            mes: stringMonth,
            day: stringDayMonth,
            dayweek: nameDayWeek,
            shortmonth: shortNameMonth,
            shortdayweek: shortDayWeek,
            fecha: fechaLocal,
            daymonth: diaMes,
            time: formatTime,
            fulltime: formatFullTime
        }
        return objectDate
    }
    getFileTypeIcon(fileName){
        const fileTypeIcons = {
            'mp4': 'video-mp4.png',
            'jpg': 'image-jpg.png',
            'png': 'image-png.png',
            'aix': 'app-aix.png',
            'apk': 'app-apk.png',
            'doc': 'document-docx.png',
            'docx': 'document-docx.png',
            'xls': 'document-xlsx.png',
            'xlsx': 'document-xlsx.png',
            'ppt': 'document-ppt.png',
            'pptx': 'document-ppt.png',
            'exe': 'application-x-msdownload.png',
            'msi': 'application-x-msdownload.png',
            'zip': 'app-zip.png',
            'aia': 'app-aia.webp',
            'pdf': 'document-pdf.png',
            'psd': 'app-psd.png',
            'fla': 'app-fla.png',
            'txt': 'document-txt.png',
            'html': 'document-html.png',
            'css': 'document-css.png',
            'json': 'app-json.png',
            'js': 'document-js.png',
            'py': 'app-python.png',
            'dart': 'app-dart.png',
            'ts': 'code-ts.png',
            'php': 'document-php.png',
            'sql': 'document-sql.png',
        }
        const extension = fileName.split('.').pop().toLowerCase()
        const currentIcon = fileTypeIcons[extension]
        const defaultIcon = './assets/document-other.png'
        return currentIcon ? `./assets/${currentIcon}` : defaultIcon
    }
    setContentMultimedia(objectFile){
        const thisClass = this
        const reader = new FileReader()
        reader.onload = function(e){
            const contenido = e.target.result
            objectFile.content = contenido
            if(thisClass.dataName === typesFile.multimedia){
                try {
                    if(objectFile.response.multimedia === null){
                        createAlert(divAlert, MESSAGE_TYPE.ERROR_TYPE_FILE, ALERT_TYPE.INFO, formData)
                        return
                    }
                    if(objectFile.response.media instanceof HTMLImageElement){
                        const imgFile = objectFile.response.media
                        imgFile.src = objectFile.content
                        imgFile.alt = `Netchat-IO -> img multimedia`
                        imgFile.addEventListener('load', ()=>{
                            objectFile.loader.classList.add('loader--hide')
                            objectFile.response.divmedia.classList.remove('multimedia__container--loading')
                        })
                    }
                    if(objectFile.response.media instanceof HTMLVideoElement){
                        const videoFile = objectFile.response.media
                        function errorMediaFile(){
                            const objectErrorMedia = {
                                isError: false,
                                message: ''
                            }
                            videoFile.addEventListener('error', ()=>{
                                const mediaError = videoFile.error
                                if(mediaError.MEDIA_ERR_DECODE){
                                    objectErrorMedia.isError = true
                                    objectErrorMedia.message = "Error al decodificar el video"
                                }else if(mediaError.MEDIA_ERR_NETWORK){
                                    objectErrorMedia.isError = true
                                    objectErrorMedia.message = 'Error de descarga del video'
                                }else if(mediaError.MEDIA_ERR_SRC_NOT_SUPPORTED){
                                    objectErrorMedia.isError = true
                                    objectErrorMedia.message = "Formato de archivo no compatible"
                                }
                                if(objectErrorMedia.isError){
                                    createAlert(divAlert, objectErrorMedia.message, ALERT_TYPE.ERROR, [])
                                    const sizeFormat = thisClass.getFileSize(objectFile.size)
                                    const responseFileIcon = createiconImgType()
                                    responseFileIcon.estado.textContent = 'No se pudo mostrar la vista previa'
                                    const formatFile = objectFile.nombre.split('.').pop().toUpperCase()
                                    responseFileIcon.span.textContent = `${formatFile} • ${sizeFormat.strSize}`
                                    responseFileIcon.img.src = thisClass.getFileTypeIcon(objectFile.nombre)
                                    responseFileIcon.img.alt = `Netchat-IO / ${objectFile.tipo}`
                                    objectFile.response.multimedia.innerHTML = ''
                                    objectFile.response.multimedia.appendChild(responseFileIcon.div)
                                }
                            })
                        }
                        errorMediaFile()
                        videoFile.src = objectFile.content
                        videoFile.controls = true
                        videoFile.addEventListener('loadeddata', ()=>{
                            objectFile.loader.classList.add('loader--hide')
                            objectFile.response.divmedia.classList.remove('multimedia__container--loading')
                        })
                    }
                } catch (error) {
                    console.log(error.message);
                    createAlert(divAlert, error.message, ALERT_TYPE.ERROR, formData)
                    return
                }
            }
        }
        reader.readAsDataURL(objectFile.archivo)
    }
    setContentAudio(objectFile){
        const thisClass = this
        const reader = new FileReader()
        reader.onload = function(e){
            const contenido = e.target.result
            const audioBlob = new Blob([contenido], {type: objectFile.tipo})
            const audioUrl = URL.createObjectURL(audioBlob)
            objectFile.content = audioUrl

            if(thisClass.dataName === typesFile.audio){
                try {
                    if(objectFile.response.multimedia === null){
                        createAlert(divAlert, MESSAGE_TYPE.ERROR_TYPE_FILE, ALERT_TYPE.INFO, formData)
                        return
                    }
                    if(objectFile.response.media instanceof HTMLAudioElement){
                        const audioFile = objectFile.response.media
                        audioFile.src = objectFile.content
                        audioFile.controls = true
                        // MANEJAR POSIBLES ERRORES
                        audioFile.addEventListener('error', (err)=>{
                            createAlert(divAlert, err.message, ALERT_TYPE.ERROR, formData)
                        })
                        // OCULTAR EL LOADER AL CARGAR LOS DATOS
                        audioFile.addEventListener('loadeddata', ()=>{
                            objectFile.loader.classList.add('loader--hide')
                            objectFile.response.divmedia.classList.remove('multimedia__container--loading')
                        })
                    }
                } catch (error) {
                    console.log(error.message);
                    createAlert(divAlert, error.message, ALERT_TYPE.ERROR, formData)
                    return
                }
            }
        }
        reader.readAsArrayBuffer(objectFile.archivo)
    }
    setContentDocument(objectFile){
        const thisClass = this
        const {archivo, tipo, size, response, loader, nombre} = objectFile
        console.log(archivo);
        const reader = new FileReader()
        reader.onload = function(e){
            const content = e.target.result
            const documentBlob = new Blob([content], {type: tipo})
            console.log(documentBlob);
            // URL DEL DOCUMENTO PARA LOS WEBSOCKETS
            const documentUrl = URL.createObjectURL(documentBlob)
            objectFile.content = documentUrl
            // VALIDACIONES ...
            if(thisClass.dataName === typesFile.document){
                try {
                    if(response.multimedia === null){
                        createAlert(divAlert, MESSAGE_TYPE.ERROR_TYPE_FILE, ALERT_TYPE.INFO, formData)
                        return
                    }
                    response.multimedia.innerHTML = ''
                    const iconDocument = thisClass.getFileTypeIcon(objectFile.nombre)

                    response.media.addEventListener('error', (err)=>{
                        createAlert(divAlert, err.message, ALERT_TYPE.ERROR, formData)
                        console.log(err.message);
                    })
                    const formatSize = thisClass.getFileSize(size)
                    const documentImgFile = createiconImgType()
                    documentImgFile.img.src = iconDocument
                    documentImgFile.img.alt = objectFile.info
                    const arrNameDoc = nombre.split('.')
                    documentImgFile.estado.textContent = arrNameDoc[0]
                    documentImgFile.span.textContent = `${arrNameDoc[1].toUpperCase()} • ${formatSize.strSize}`
                    // SE AGREGA AL HTML EL DIV-CONTAINER
                    documentImgFile.img.addEventListener('load', ()=>{
                        loader.classList.add('loader--hide')
                        response.divmedia.classList.remove('multimedia__container--loading')
                    })
                    // SE AGREGA A LA VISTA PREVIA EL HTML - IMAGEN 
                    response.multimedia.appendChild(documentImgFile.div)
                    // let ancla = document.createElement('a')
                    // ancla.href = documentUrl
                    // ancla.download
                    // ancla.click()
                    // console.log(ancla);

                } catch (error) {
                    console.log(error);
                    createAlert(divAlert, error.message, ALERT_TYPE.ERROR, formData)
                    return
                }
            }
        }
        reader.readAsArrayBuffer(archivo)
    }
    setContentApps(objectFile){
        const thisClass = this
        const {size, tipo, nombre, archivo, loader, response} = objectFile
        // LLAMAR A LA INSTANCIA PARA ENVIAR MENSAJES
        const chatSendMsg = new ChatSendMessage()
        const reader = new FileReader()
        reader.onload = function(e){
            try {
                const content = e.target.result
                // const fileBlob = new Blob([content], {type: tipo})
                // const url = URL.createObjectURL(fileBlob)

                

                response.multimedia.innerHTML = ''
                const previewAppImg = createiconImgType()
                const formatSize = thisClass.getFileSize(size)
                const imgSrc = thisClass.getFileTypeIcon(nombre)
                previewAppImg.img.src = imgSrc
                previewAppImg.img.alt = objectFile.info
                const arrNameDoc = nombre.split('.')
                const nameFile = arrNameDoc.slice(0, -1).join(' ')
                const strTypeFile = arrNameDoc.pop()
                previewAppImg.estado.textContent = nameFile
                previewAppImg.span.textContent = `${strTypeFile.toUpperCase()} • ${formatSize.strSize}`

                // SE AGREGA AL HTML EL DIV-CONTAINER
                previewAppImg.img.addEventListener('load', ()=>{
                    loader.classList.add('loader--hide')
                    response.divmedia.classList.remove('multimedia__container--loading')
                })
                // SE AGREGA A LA VISTA PREVIA EL HTML - IMAGEN 
                response.multimedia.appendChild(previewAppImg.div)

                // PROBLEMAS AQUI, FALTA RESOLVER EL ASUNTO DE ENVIAR EN BINARIO AL SERVIDOR?
                // SE QUITO EN bin: content - PARA EVITAR PROBLEMAS
                const dataFileSockets = {
                    size: formatSize.strSize,
                    name: nameFile,
                    strtype: strTypeFile,
                    type: tipo,
                    zona: zonaActual,
                    user: chatSendMsg.username.value,
                    icon: thisClass.getFileTypeIcon(nombre)
                }
                chatSendMsg.isPreview = true
                chatSendMsg.preview = previewContent
                chatSendMsg.message = response.textArea
                chatSendMsg.emjshow = response.emojishow
                chatSendMsg.btnsend = response.btnsend
                chatSendMsg.data = dataFileSockets
                chatSendMsg.toggleClose = thisClass.togglePreviewButton
                chatSendMsg.init()
                // ESPERAR A QUE LA CLASE ENVIE LOS DATOS ...
            } catch (error) {
                console.log(error);
                createAlert(divAlert, error.message, ALERT_TYPE.ERROR, formData)
                return
            }
        }
        reader.onerror = function(e){
            const message = e.target.error.message
            createAlert(divAlert, message, ALERT_TYPE.ERROR, [])
            console.log(message);
        }
        reader.readAsArrayBuffer(archivo)
    }
    setFileReader(archivo){
        const thisClass = this
        const size = archivo.size
        const nombre = archivo.name
        const objectDate = this.getDateObject()
        // HACER TERNARIA PARA OBTENER SI O SI LA EXTENSION DEL FILE
        const tipo = String(archivo.type)
        // CREACION DEL LOADING ANTES DE MOSTRAR EL CONTENIDO
        const loader = createLoader()
        // INSTANCIA DE LOS EVENTOS DEL TEXTAREA
        const eventsChatMessage = new ChatSendMessage()
        
        if(this.dataName === typesFile.multimedia){
            if(!(tipo.startsWith('image/')) && !(tipo.startsWith('video/'))){
                createAlert(divAlert, MESSAGE_TYPE.ERROR_TYPE_FILE, ALERT_TYPE.INFO, formData)
                return
            }
            const responsePreview = createPreviewContent(tipo)
            const isNullKeys = Object.keys(responsePreview).filter(key => responsePreview[key] === null)
            if(isNullKeys.length > 0){
                createAlert(divAlert, MESSAGE_TYPE.ERROR_PREVIEW,ALERT_TYPE.ERROR, formData)
                return
            }
            previewContent.appendChild(responsePreview.container)
            thisClass.togglePreviewButton(previewContent, false)

            // LLAMAR A LA INSTANCIA DE LA CLASE EMOJI
            const previewActions = new chatEmoji(previewContent)
            previewActions.init()
            
            eventsChatMessage.message = responsePreview.textArea
            thisClass.togglePreviewButton(previewContent, true)

            loader.classList.remove('loader--hide')
            responsePreview.divmedia.classList.add('multimedia__container--loading')
            responsePreview.multimedia.appendChild(loader)
            if(responsePreview.media instanceof HTMLImageElement){
                console.log("procesando imagen");
            }
            if(responsePreview.media instanceof HTMLVideoElement ){
                // si supera el tamaño de 100MB -> bytes
                if(size > 100000000){
                    createAlert(divAlert, MESSAGE_TYPE.PROCESS_MAXMEDIA, ALERT_TYPE.TEMP, [])
                }
            }
            const objectMultimedia = {
                info: `Netchat io - ${objectDate.fecha} / ${objectDate.time}`,
                archivo,
                loader,
                size,
                tipo,
                nombre,
                response: responsePreview,
                content: null
            }
            this.setContentMultimedia(objectMultimedia)
        }
        else if(this.dataName === typesFile.audio){
            if(!(tipo.startsWith('audio/'))){
                createAlert(divAlert, MESSAGE_TYPE.ERROR_TYPE_FILE, ALERT_TYPE.INFO, formData)
                return
            }
            const responsePreview = createPreviewContent(tipo)
            // COMPROBAR NO NULOS EN LA RESPUESTA DE LA PLANTILLA
            const isNullKeys = Object.keys(responsePreview).filter(key => responsePreview[key] === null)
            if(isNullKeys.length > 0){
                createAlert(divAlert, MESSAGE_TYPE.ERROR_PREVIEW,ALERT_TYPE.ERROR, formData)
                return
            }

            previewContent.appendChild(responsePreview.container)
            thisClass.togglePreviewButton(previewContent, false)
            // LLAMAR A LA INSTANCIA DE LA CLASE EMOJI
            const previewActions = new chatEmoji(previewContent)
            previewActions.init()
            // OTORGAR EVENTOS AL CHAT-MESSAGE
            eventsChatMessage.message = responsePreview.textArea
            thisClass.togglePreviewButton(previewContent, true)
            // MOSTRAR EL LOADER INICIALMENTE
            loader.classList.remove('loader--hide')
            responsePreview.divmedia.classList.add('multimedia__container--loading')
            responsePreview.multimedia.appendChild(loader)
            if(responsePreview.media instanceof HTMLAudioElement ){
                // si supera el tamaño de 100MB -> bytes
                if(size > 100000000){
                    createAlert(divAlert, MESSAGE_TYPE.PROCESS_MAXMEDIA, ALERT_TYPE.TEMP, [])
                }
            }
            const objectMultimedia = {
                info: `Netchat io - ${objectDate.fecha} / ${objectDate.time}`,
                archivo,
                loader,
                size,
                tipo,
                nombre,
                response: responsePreview,
                content: null
            }
            this.setContentAudio(objectMultimedia)
        }
        else if(this.dataName === typesFile.document){
            if(!(tipo.startsWith('application/')) && !(tipo.startsWith('text/'))){
                createAlert(divAlert, MESSAGE_TYPE.ERROR_TYPE_FILE, ALERT_TYPE.INFO, formData)
                return
            }
            const responsePreview = createPreviewContent(tipo)
            // COMPROBAR NO NULOS EN LA RESPUESTA DE LA PLANTILLA
            const isNullKeys = Object.keys(responsePreview).filter(key => responsePreview[key] === null)
            if(isNullKeys.length > 0){
                createAlert(divAlert, MESSAGE_TYPE.ERROR_PREVIEW,ALERT_TYPE.ERROR, formData)
                return
            }
            // AGREGAR AL HTML LA PLANTILLA HTML PREVIEW
            previewContent.appendChild(responsePreview.container)
            thisClass.togglePreviewButton(previewContent, false)
            // LLAMAR A LA INSTANCIA DE LA CLASE EMOJI
            const previewActions = new chatEmoji(previewContent)
            previewActions.init()
            // OTORGAR EVENTOS AL CHAT-MESSAGE
            eventsChatMessage.message = responsePreview.textArea
            thisClass.togglePreviewButton(previewContent, true)
            // MOSTRAR EL LOADER INICIALMENTE
            loader.classList.remove('loader--hide')
            responsePreview.divmedia.classList.add('multimedia__container--loading')
            responsePreview.multimedia.appendChild(loader)
            // si supera el tamaño de 100MB -> bytes
            if(size > 100000000){
                createAlert(divAlert, MESSAGE_TYPE.PROCESS_MAXMEDIA, ALERT_TYPE.TEMP, [])
            }
            const objectMultimedia = {
                info: `Netchat io - ${objectDate.fecha} / ${objectDate.time}`,
                archivo,
                loader,
                size,
                tipo,
                nombre,
                response: responsePreview,
                content: null
            }
            this.setContentDocument(objectMultimedia)
        }
        else if(this.dataName === typesFile.apps){
            const responsePreview = createPreviewContent('all')
            // COMPROBAR NO NULOS EN LA RESPUESTA DE LA PLANTILLA
            const isNullKeys = Object.keys(responsePreview).filter(key => responsePreview[key] === null)
            if(isNullKeys.length > 0){
                createAlert(divAlert, MESSAGE_TYPE.ERROR_PREVIEW,ALERT_TYPE.ERROR, formData)
                return
            }
            try {
                // AGREGAR AL HTML LA PLANTILLA HTML PREVIEW
                previewContent.appendChild(responsePreview.container)
                thisClass.togglePreviewButton(previewContent, false)
                // LLAMAR A LA INSTANCIA DE LA CLASE EMOJI
                const previewActions = new chatEmoji(previewContent)
                previewActions.init()
                // OTORGAR EVENTOS AL CHAT-MESSAGE
                eventsChatMessage.message = responsePreview.textArea
                thisClass.togglePreviewButton(previewContent, true)
                // MOSTRAR EL LOADER INICIALMENTE
                loader.classList.remove('loader--hide')
                responsePreview.divmedia.classList.add('multimedia__container--loading')
                responsePreview.multimedia.appendChild(loader)
                // si supera el tamaño de 100MB -> bytes
                if(size > 100000000){
                    createAlert(divAlert, MESSAGE_TYPE.PROCESS_MAXMEDIA, ALERT_TYPE.TEMP, [])
                }
                const objectMultimedia = {
                    info: `Netchat io - ${objectDate.fecha} / ${objectDate.time}`,
                    archivo,
                    loader,
                    size,
                    tipo,
                    nombre,
                    response: responsePreview,
                    content: null
                }
                this.setContentApps(objectMultimedia)
            } catch (error) {
                console.log(error);
                createAlert(divAlert, error.message, ALERT_TYPE.ERROR, formData)
                return
            }
        }
    }
    getFileSize(size){
        const kb = 1024
        const mb = kb * 1024
        const gb = mb * 1024
        const limitFile = 100
        
        if(size >= gb){
            const gbSize = size / gb
            const strSize = `${gbSize.toFixed(1)}GB`
            return {gbSize, strSize, limitFile}
        }
        else if(size >= mb){
            const mbSize = Math.round(size / mb)
            const strSize = `${mbSize}MB`
            return {mbSize, strSize, limitFile}
        }
        else{
            const kbSize = Math.ceil(size / kb)
            const strSize = `${kbSize}KB` 
            return {kbSize, strSize, limitFile}
        }
    }
    change(newFiles){
        const archivo = newFiles.files[0]
        this.filetoggle()
        if(!(archivo instanceof File && newFiles.files.length > 0)){
            const message = MESSAGE_TYPE.ERROR_FILES
            const typeAlert = ALERT_TYPE.ERROR
            createAlert(divAlert, message, typeAlert, formData)
            return console.log(message);
        }
        this.setFileReader(archivo)
    }
    init(){
        this.element.addEventListener('click', ()=> this.input.click())
        this.input.addEventListener('change', ()=> this.change(this.input));
    }
}
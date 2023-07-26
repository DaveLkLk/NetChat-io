export function createBtnEmoji(){
    const emojiDiv = document.createElement('div')
    emojiDiv.classList.add('emoji--btn')
    const btnEmoji = document.createElement('button')
    btnEmoji.classList.add('btn-emoji')
    btnEmoji.id = 'btn-emoji'
    btnEmoji.type = 'button'
    btnEmoji.title = 'Lista de emoticons'
    btnEmoji.innerHTML = `
        <svg class="emoji-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"/>
        </svg>
    `;
    emojiDiv.appendChild(btnEmoji)
    return emojiDiv
}
export function createEmojiShow(){
    const emojiShow = document.createElement('div')
    emojiShow.classList.add('emoji--show')
    emojiShow.id = 'emoji--show'
    emojiShow.innerHTML = `
        <div class="emoji-search">
            <input type="search" id="emoji-search" placeholder="search...">
        </div>
        <ul class="emoji-list" id="emoji-list"></ul>
        <div class="emoji-group" id="emoji-group">
            <button type="button" class="btn__group">
                <img src="assets/icon-emotion.png" alt="">
            </button>
            <button type="button" class="btn__group">
                <img src="assets/icon-people.png" alt="">
            </button>
            <button type="button" class="btn__group">
                <img src="assets/icon-animal.png" alt="">
            </button>
            <button type="button" class="btn__group">
                <img src="assets/icon-food.png" alt="">
            </button>
            <button type="button" class="btn__group">
                <img src="assets/icon-travel.png" alt="">
            </button>
            <button type="button" class="btn__group">
                <img src="assets/icon-activity.png" alt="">
            </button>
            <button type="button" class="btn__group">
                <img src="assets/icon-objects.png" alt="">
            </button>
            <button type="button" class="btn__group">
                <img src="assets/icon-symbol.png" alt="">
            </button>
            <button type="button" class="btn__group">
                <img src="assets/icon-flag.png" alt="">
            </button>
        </div>
    `;
    return emojiShow
}
export function createChatMessage(){
    const textArea = document.createElement('textarea')
    textArea.classList.add('chat-message')
    textArea.id = 'chat-message'
    textArea.placeholder = 'tu mensaje'
    textArea.rows = 1
    return textArea
}
export function createBtnChat(){
    const chatBtn = document.createElement('button')
    chatBtn.type = 'submit'
    chatBtn.title = 'enviar mensaje'
    chatBtn.id = 'btn-chat'
    chatBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
        </svg>
    `;
    return chatBtn;
}
export function createBtnMicro(){
    const btnMicro = document.createElement('button')
    btnMicro.type = 'button'
    btnMicro.title = 'grabar audio'
    btnMicro.id = 'btn-audio'
    btnMicro.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
        </svg>
    `;
    return btnMicro
}

// CSS ALERT
export const ALERT_TYPE = {
    INFO: "alert--info",
    ERROR: "alert--error",
    WAIT: "alert--wait",
    SUCCESS: "alert--success",
    FATAL: "alert--fatal",
    ACTIVE: "alert--active"
}
export const MESSAGE_TYPE = {
    // server message
    ERROR_SERVER: "Error en la respuesta del servidor",
    ERROR_DATA: "Error en el envio de los datos",
    INFO_LIMIT: "Se alcanzó el limite de caracteres",
    INFO_VACIO: "Complete los campos requeridos",
    SUCCESS_DATA: "Datos enviados satisfactoriamente",
    SUCCESS_SERVER: "Nuevo registro guardado",
    WAIT_POST: "Enviando datos al servidor..",
    WAIT_GET: "Esperando respuesta del servidor..",
    // client message
    ALERT: 'Complete todos los campos',
    ERROR: 'Ocurrió un error',
    NO_DISPONIBLE: 'Feature coming soon..',
    INVALIDO: 'El resgistro ingresado no es válido',
    DUPLICADO: 'Este registro ya existe!',
    SUCCESS: 'Datos guardados satisfactoriamente!',
    NO_SELECT: 'Seleccione una opción!',
    ESPERANDO: 'Procesando solicitud...',
    LOADING: 'Cargando datos...',
    CLAVE_INVALID: 'Contraseña inválida',
    CLAVE_VALID: 'ContraseÑa correcta',
    NO_EXISTE: 'No se encontró ningún registro'
};
export function borrarContenido(arr){
    arr.forEach(item => {
        if(item instanceof HTMLInputElement){
            return item.value = ''
        }else{
            return item.textContent = ''
        }
    })
};
export function inputDisabled(items){
    items.forEach(item =>{
        item.disabled = true
    })
};
export function inputEnabled(items){
    items.forEach(item =>{
        item.disabled = false
    })
};
export function createAlert(container, message, classAlert, elementsForm){
    inputDisabled(elementsForm)
    const alert = container
    
    const buttonExiste = document.querySelector('.alert button')
    const messageExiste = document.querySelector('.alert p')
    if(buttonExiste && messageExiste){
        alert.innerHTML = ''
    }
    alert.classList.add(ALERT_TYPE.ACTIVE)
    alert.classList.add(classAlert)

    const buttonAlert = document.createElement('button')
    buttonAlert.textContent = 'X'
    buttonAlert.type = 'button'
    const messageAlert = document.createElement('p')
    messageAlert.textContent = message
    alert.appendChild(messageAlert)
    alert.appendChild(buttonAlert)
    
    buttonAlert.addEventListener('click', ()=>{
        inputEnabled(elementsForm)
        alert.classList.remove(ALERT_TYPE.ACTIVE)
        setTimeout(()=>{
            alert.classList.remove(classAlert)
        }, 310)
        console.log("mostrarAlerta -> success");
    })
};
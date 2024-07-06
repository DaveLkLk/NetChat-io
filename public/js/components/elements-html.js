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
    chatBtn.classList.add('chat-btnSwitch')
    chatBtn.classList.add('chat-btnSend')
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
    btnMicro.classList.add('chat-btnSwitch')
    btnMicro.classList.add('chat-btnMicro')
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
export const createLoader = ()=> {
    const loader = document.createElement('div')
    loader.classList.add('loader')
    loader.id = 'loader'
    loader.innerHTML = `
    <div class="circle"></div>
    <div class="circle"></div>
    `;
    return loader
}
export const createBtnClose = ()=> {
    const button = document.createElement('button')
    button.type = 'button'
    button.classList.add('preview__btn')
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg>
    `;
    return button;
}
export const iconDonwload = ()=>{
    const div = document.createElement('div')
    div.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg-donwload" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>
    `;
    return div
}
export const iconInfo = ()=> {
    const div = document.createElement('div');
    div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
  </svg>
    `;
    return div.innerHTML
}
export const iconSuccess = ()=> {
    const div = document.createElement('div');
    div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
  </svg>
    `;
    return div.innerHTML;
}
export const iconErrorServer = ()=>{
    const div = document.createElement('div');
    div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug-fill" viewBox="0 0 16 16">
    <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A5 5 0 0 0 3 6h10a5 5 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A5 5 0 0 0 8 1a5 5 0 0 0-2.731.811l-.29-.956z"/>
    <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975"/>
  </svg>
    `;
    return div.innerHTML;
}
export const iconClose = ()=>{
    const div = document.createElement('div');
    div.innerHTML= `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
  </svg>
    `;
    return div.innerHTML;
}
export const iconError = ()=>{
    const div = document.createElement('div');
    div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ban" viewBox="0 0 16 16">
    <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
  </svg>
    `;
    return div.innerHTML;
}
export const iconWaiting = ()=>{
    const div = document.createElement('div');
    div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
    <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
  </svg>
    `;
    return div.innerHTML;
}
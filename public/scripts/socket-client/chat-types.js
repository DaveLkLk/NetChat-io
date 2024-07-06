import { createBtnClose, createBtnEmoji, createEmojiShow, createChatMessage, createBtnChat } from "../../js/components/elements-html.js"

export function createPreviewContent(typeFile){
    const type = String(typeFile)
    const previewContent = document.createElement('div')
    previewContent.classList.add('preview-content')
    const objectPreview = {
        container: previewContent,
        media: null,
        multimedia: null,
        divmedia: null,
        textArea: null,
        btnsend: null,
        btnemoji: null,
        emojisearch: null,
        emojigroups: null,
        emojilist: null,
        emojishow: null
    }

    const previewButton = document.createElement('div')
    previewButton.classList.add('preview__button')
    previewButton.appendChild(createBtnClose())

    const previewMultimedia = document.createElement('div')
    previewMultimedia.classList.add('preview__multimedia')
    const multimediaContainer = document.createElement('div')
    multimediaContainer.classList.add('multimedia__container')
    if(type.startsWith('image/')){
        const imgFile = document.createElement('img')
        multimediaContainer.appendChild(imgFile)
        objectPreview.media = imgFile
    }
    if(type.startsWith('video/')){
        const videoFile = document.createElement('video')
        objectPreview.media = videoFile
        multimediaContainer.appendChild(videoFile)
    }
    if(type.startsWith('audio/')){
        const audioFile = document.createElement('audio')
        objectPreview.media = audioFile
        multimediaContainer.appendChild(audioFile)
    }
    if(type.startsWith('application/') || type.startsWith('text/')){
        const imgDocument = document.createElement('img')
        objectPreview.media = imgDocument
        multimediaContainer.appendChild(imgDocument)
    }
    if(type.startsWith('all')){
        const imgApps = document.createElement('img')
        objectPreview.media = imgApps
        multimediaContainer.appendChild(imgApps)        
    }
    objectPreview.divmedia = multimediaContainer
    previewMultimedia.appendChild(multimediaContainer)

    const previewActions = document.createElement('div')
    previewActions.classList.add('preview__actions')
    previewActions.innerHTML = `
        <div class="preview__emoji">
            ${createBtnEmoji().outerHTML}
            ${createEmojiShow().outerHTML}
        </div>
        <div class="preview__message">
            ${createChatMessage().outerHTML}
        </div>
        <div class="preview__send">
            ${createBtnChat().outerHTML}
        </div>
    `;
    previewContent.appendChild(previewButton)
    previewContent.appendChild(previewMultimedia)
    previewContent.appendChild(previewActions)
    
    objectPreview.container = previewContent
    objectPreview.multimedia = previewMultimedia
    objectPreview.textArea = previewActions.querySelector('.chat-message')
    objectPreview.btnemoji = previewActions.querySelector('.btn-emoji')
    objectPreview.emojilist = previewActions.querySelector('.emoji-list')
    objectPreview.emojisearch = previewActions.querySelector('.emoji-search input')
    objectPreview.emojigroups = previewActions.querySelectorAll('.emoji-group button')
    objectPreview.emojishow = previewActions.querySelector('.emoji--show')
    objectPreview.btnsend = previewActions.querySelector('.chat-btnSend')
    return objectPreview
}
export const typesFile = {
    multimedia: 'file-multimedia',
    audio: 'file-audio',
    document: 'file-document',
    apps: 'file-apps'
};
export function createiconImgType(){
    const divImgContainer = document.createElement('div')
    divImgContainer.classList.add('file__icon')
    const divEstado = document.createElement('div')
    divEstado.classList.add('file__estado')
    const spanEstado = document.createElement('span')
    divEstado.appendChild(spanEstado)
    const divImgInfo = document.createElement('div')
    divImgInfo.classList.add('file__info')
    const info = document.createElement('span')
    divImgInfo.appendChild(info)
    const imgIcon = document.createElement('img')
    divImgContainer.appendChild(divEstado)
    divImgContainer.appendChild(imgIcon)
    divImgContainer.appendChild(divImgInfo)

    const objectIcon = {
        div: divImgContainer,
        img: imgIcon,
        span: info,
        estado: spanEstado
    }
    return objectIcon
};
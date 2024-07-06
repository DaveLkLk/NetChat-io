export function messageURL(message){
    let urlRgx = /(\bhttps?:\/\/\S+)/gi;
    let partsMessage = Array.from(message.split(urlRgx))
    let msgURL = ''

    partsMessage.forEach((item, i) =>{
        if(i % 2 === 1){
            msgURL += `<a class="chat-url" href="${partsMessage[i]}" target="_blank">${partsMessage[i]}</a>`;
        }else{
            msgURL += partsMessage[i]
        }
    })
    return msgURL
}
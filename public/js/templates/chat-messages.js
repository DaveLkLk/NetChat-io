export function tplBoxMessage(obj, data){
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="${obj.classMsg} chat-users">
        <strong>~${obj.user}~</strong>
        <div class="chat-msg">
            <span class="chat-mensaje">${obj.message}</span>
            <span class="chat-time">${data.fecha} - ${data.time}</span>
        </div>
    </div>
    `;
    return div.innerHTML
}
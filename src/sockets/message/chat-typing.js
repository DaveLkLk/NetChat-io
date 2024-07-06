function ChatTypingOn(socket, data){
    socket.broadcast.emit('chat:typing:on', data)
}
function ChatTypingOff(socket, data){
    socket.broadcast.emit('chat:typing:off', data)
}
module.exports = {
    ChatTypingOn,
    ChatTypingOff
};
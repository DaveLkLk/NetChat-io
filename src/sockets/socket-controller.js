const ChatMessage = require('./message/chat-message.js')
const {ChatSendFiles, ChatFilesOn, ChatFilesOff} = require('./message/chat-files')
const {ChatTypingOn, ChatTypingOff} = require('./message/chat-typing')

function ControllerSocketsChat(io, socket){
    socket.on('chat:message', (data) => {ChatMessage(io, socket, data)})
    socket.on('chat:sendFile', (data) => ChatSendFiles(io, socket, data))
    socket.on('chat:sendFiles:on', (data) => ChatFilesOn(socket, data))
    socket.on('chat:sendFiles:off', (data) => ChatFilesOff(socket, data))
    socket.on('chat:typing:on', (data) => ChatTypingOn(socket, data))
    socket.on('chat:typing:off', (data) => ChatTypingOff(socket, data))
}
module.exports =  ControllerSocketsChat
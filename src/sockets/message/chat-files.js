const getTimeZoneClient = require('../datetime/time-zone')
function ChatSendFiles(io, socket, data){
    const {fecha, hora} = getTimeZoneClient(data.zona)
        const from = socket.id.slice(0, 6)
        console.log(data);
        io.sockets.emit('chat:sendFile', {...data, fecha, hora, from})
}
function ChatFilesOn(socket, data){
    console.log(data)
        const objectData = {
            info: data.info,
            from: socket.id.slice(0, 6)
        }
        socket.broadcast.emit('chat:sendfiles', objectData)
}
function ChatFilesOff(socket, data){
    console.log(data)
        const objectData = {
            info: data.info,
            from: socket.id.slice(0, 6)
        }
        socket.broadcast.emit('chat:sendfiles', objectData)
}
module.exports = {
    ChatSendFiles,
    ChatFilesOn,
    ChatFilesOff
} 
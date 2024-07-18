const getTimeZoneClient = require('../datetime/time-zone')
function ChatMessage(io, socket, data){
    const { fecha, hora } = getTimeZoneClient(data.zonaHoraria)
    console.log(socket)
    const userData = {
        user: data.user,
        message: data.message,
        from: socket.id.slice(0, 6),
        time: hora,
        fecha: fecha
    }
    console.log(userData);
    io.sockets.emit('chat:message', userData)
}
module.exports = ChatMessage
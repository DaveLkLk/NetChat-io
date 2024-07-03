const getTimeZoneClient = require('../datetime/time-zone')
function ChatMessage(io, socket, data){
    console.log(data)
    const { fecha, hora } = getTimeZoneClient(data.zonaHoraria)
    io.sockets.emit('chat:message', {
        user: data.user,
        message: data.message,
        from: socket.id.slice(0, 6),
        time: hora,
        fecha: fecha
    })
}
module.exports = ChatMessage
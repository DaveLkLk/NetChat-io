import { io } from "../server.config.js";
import getTimeZoneClient from "../server.timezone.js";

io.on('connection', (socket)=>{
    console.log("usuario conectado", socket.id);

    socket.on('chat:message', (data)=>{
        console.log(data);
        const { fecha, hora } = getTimeZoneClient(data.zonaHoraria)
        io.sockets.emit('chat:message', {
            user: data.user,
            message: data.message,
            from: socket.id.slice(0, 6),
            time: hora,
            fecha: fecha
        })
    });
    socket.on('chat:sendFile', data => {
        const {fecha, hora} = getTimeZoneClient(data.zona)
        const from = socket.id.slice(0, 6)
        console.log(data);
        io.sockets.emit('chat:sendFile', {...data, fecha, hora, from})
    })
    
    socket.on('chat:sendfiles:on', (data)=>{
        console.log(data)
        const objectData = {
            info: data.info,
            from: socket.id.slice(0, 6)
        }
        socket.broadcast.emit('chat:sendfiles', objectData)
    });
    socket.on('chat:sendfiles:off', (data)=>{
        console.log(data)
        const objectData = {
            info: data.info,
            from: socket.id.slice(0, 6)
        }
        socket.broadcast.emit('chat:sendfiles', objectData)
    });

    socket.on('chat:typing:on', (data)=>{
        socket.broadcast.emit('chat:typing:on', data)
    });
    socket.on('chat:typing:off', (data)=>{
        socket.broadcast.emit('chat:typing:off', data)
    });
});
export default io;
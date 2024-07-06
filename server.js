const {server, io} = require('./src/server-config/server.config.js')
const ControllerSocketsChat = require('./src/sockets/socket-controller.js')
const port = process.env.PORT || 3000


io.on('connection', (socket)=>{
    console.log("usuario conectado", socket.id);
    ControllerSocketsChat(io, socket)
});

server.listen(port, ()=>{
    console.log("server is running in port: ", port);
})
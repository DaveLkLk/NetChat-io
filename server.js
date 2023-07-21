const express = require('express')
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const app = express()
const server = require('http').Server(app)
const socketIO = require('socket.io')
const port = process.env.PORT || 3000

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '/src')))

app.get('/', (req, res)=>{
    const pathIni = path.join(__dirname, 'src', 'index.html')
    res.status(200).sendFile(pathIni)
})
app.get('/home', (req, res)=>{
    const pathHome = path.join(__dirname, 'src', 'pages', 'home.html')
    res.sendFile(pathHome)
})
app.put('/home', async(req, res)=>{
    try{
        const pathPut = path.join(__dirname, 'src', 'db', 'semana.json')
        const newData = req.body;
        const oldData = require(pathPut)
        const sendData = {...oldData, ...newData}
        
        await fs.promises.writeFile(pathPut, JSON.stringify(sendData, null, 2))
        res.json(sendData)
        // res.send(JSON.stringify("Horario Semanal actualizado"))
    }catch(error){
        console.log("Error actualizar el JSON", error);
        res.status(500).send('Error al actualizar los datos')
    }
});

function getTimeZoneClient(timeZone){
    const current = new Date()
    const clientDateTime = new Date(current.toLocaleString('en-US', {timeZone: timeZone}))
    const fechaOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour2: false
    }
    const fecha = clientDateTime.toLocaleDateString('es-PE', fechaOptions)
    const hora = clientDateTime.toLocaleTimeString('es-PE', timeOptions)

    return { fecha, hora }
}

const io = socketIO(server)
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

server.listen(port, ()=>{
    console.log("server is running in port: ", port);
})
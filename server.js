const express = require('express')
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const app = express()
const server = require('http').Server(app)
const socketIO = require('socket.io')
const port = process.env.PORT || 3000
const ControllerSocketsChat = require('./src/sockets/socket-controller.js')

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res)=>{
    const pathIni = path.join(__dirname, 'public', 'index.html')
    res.status(200).sendFile(pathIni)
})
app.get('/home', (req, res)=>{
    const pathHome = path.join(__dirname, 'public', 'pages', 'home.html')
    res.sendFile(pathHome)
})
app.put('/home', async(req, res)=>{
    try{
        const pathPut = path.join(__dirname, 'public', 'db', 'semana.json')
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
app.post('/chat-upload', (req, res) => {
    // 
})


const io = socketIO(server)
io.on('connection', (socket)=>{
    console.log("usuario conectado", socket.id);
    ControllerSocketsChat(io, socket)
});

server.listen(port, ()=>{
    console.log("server is running in port: ", port);
})
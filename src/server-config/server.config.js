const express = require('express');
const cors = require('cors');
const path = require('path')
const { createServer } = require('http');
const { Server } = require('socket.io')
const router = require('./server.routes.js')

const app = express();
const server = createServer(app)
const io = new Server(server)

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../../public')))
app.use(router)

module.exports = {server, io}
import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http'
import {Server as socketIO} from 'socket.io';
import router from './server.routes.js';

const app = express();
const server = createServer(app)
const io = new socketIO(server)

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(process.cwd(), '/src')))
app.use(router)

export {server, io, path}
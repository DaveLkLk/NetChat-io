import { server } from "./src/server-config/server.config.js";
import './src/server-config/server.routes.js';
import './src/server-config/sockets/events.js';

const port = process.env.PORT || 3000
server.listen(port, ()=>{
    console.log("server is running in port: ", port);
})
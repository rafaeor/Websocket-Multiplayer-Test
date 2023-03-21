import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';

const app = express(); 
const server = createServer(app); 
export const socketio = new Server(server);

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/client/index.html");

});

app.use("/client", express.static(__dirname + "/client"));

server.listen(2000);

console.log("Server started http://localhost:2000");


import mainGameLoop from './server/mainGameLoop.js';
import Player from './server/physics/Player.js';

export const SOCKET_LIST = {};

socketio.sockets.on('connection',(socket) => {
    console.log("client connected");
    SOCKET_LIST[socket.id] = socket;
    Player.onConnect(socket);
    //let Playervar = new Player(socket.id);
    /*socket.on('signIn',() = > {});
    socket.on('signUp',() = > {});
    socket.on('evalServer',() = > {});
    socket.on('sendMessageToServer',() = > {});
    socket.on('keyPress',() = > {});*/
    socket.on('disconnect', () => {
        console.log("client disconnected");
        delete SOCKET_LIST[socket.id];
        Player.onDisconnect(socket);
        //delete PLAYER_LIST[socket.id];
    })
})
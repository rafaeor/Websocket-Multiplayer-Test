import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';

const app = express(); 
const server = createServer(app); 
const socketio = new Server(server);

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

export const SOCKET_LIST = {};

socketio.sockets.on('connection',(socket) => {
    console.log("client connected");
    /*socket.on('signIn',() = > {});
    socket.on('signUp',() = > {});
    socket.on('evalServer',() = > {});
    socket.on('sendMessageToServer',() = > {});
    socket.on('keyPress',() = > {});*/
    socket.on('disconnect', () => {
        console.log("client disconnected");
        delete SOCKET_LIST[socket.id];
    })
})

/*
static onConnect(socket) {

    let player = new Player(socket.id);

    socket.on("keyPress", function(data) {

      if (data.inputId === "left") player.pressingLeft = data.state;

      else if (data.inputId === "right") player.pressingRight = data.state;

      else if (data.inputId === "up") player.pressingUp = data.state;

      else if (data.inputId === "down") player.pressingDown = data.state;

    });

  }

  static onDisconnect(socket) {

    delete Player.list[socket.id];

  }

  */
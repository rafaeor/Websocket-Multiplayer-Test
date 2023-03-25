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
import chatmessageListener from './server/networking/chat.js';
import database from './server/networking/database.js';
import register, { addUser, isUsernameTaken, isValidPassword } from './server/networking/register.js';

export const SOCKET_LIST = {};

socketio.sockets.on('connection',(socket) => {
    console.log("client connected");
    SOCKET_LIST[socket.id] = socket;
    socket.on('signIn',(data) => {
      //let databaseSearch = database.find("mygame","accouht",data);
      //if(databaseSearch.username==data.username,databaseSearch.password==data.password){ //if valid password and username
      if(register.isValidPassword(data)){
        Player.onConnect(socket);
        socket.emit('signInResponse',{success:true});
      }
      else{socket.emit('signInResponse',{success:false});};
      
    });
    socket.on('signUp',(data) => {
      if(register.isUsernameTaken(data)){
        socket.emit('signUpResponse',{success:false});
      }
      else{
        register.addUser(data);
        socket.emit('signUpResponse',{success:true});
      };
    });
    chatmessageListener(socket);//all chat operations
    socket.on('disconnect', () => {
        console.log("client disconnected");
        delete SOCKET_LIST[socket.id];
        Player.onDisconnect(socket);
    })
})
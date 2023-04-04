import Player from "./physics/Player.js";
import Bullet from "./physics/Projectile.js";

import { SOCKET_LIST } from "../app.js";

export let initPack = {player:[],bullet:[]};
export let removePack = {player:[],bullet:[]};

export default setInterval(function(){
    let pack ={
        player:Player.update(),
        bullet:Bullet.update(),
    };
    /*        if(initPack.player.length>0){
            socket.emit('initPack',{player:initPack.player}); // could have optimization
        }
        if(initPack.bullet.length>0){
            socket.emit('initPack',{bullet:initPack.bullet}); // could have optimization
        }
        if(removePack.player.length>0){
            socket.emit('removePack',{player:removePack.player}); // could have optimization
        }
        if(removePack.bullet.length>0){
            socket.emit('removePack',{bullet:removePack.bullet}); // could have optimization
            */
    for(var i in SOCKET_LIST){
        let socket = SOCKET_LIST[i];
        socket.emit('initPack',initPack); // could have optimization
        socket.emit('update',pack);
        socket.emit('removePack',removePack);// could have optimization
    };
    initPack.player = [];
    initPack.bullet = [];
    removePack.player = [];
    removePack.bullet = []
},1000/25);
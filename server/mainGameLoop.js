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
    for(var i in SOCKET_LIST){
        let socket = SOCKET_LIST[i];
        if(initPack.player.length>0 || initPack.bullet.length>0){socket.emit('initPack',initPack);}
        socket.emit('update',pack);
        if(removePack.player.length>0 || removePack.player.length>0){socket.emit('removePack',removePack);}
    };
    initPack.player = [];
    initPack.bullet = [];
    removePack.player = [];
    removePack.bullet = []
},1000/25);
import Player from "./physics/Player.js";
import Bullet from "./physics/Projectile.js";

import { SOCKET_LIST } from "../app.js";

export default setInterval(function(){
    let pack ={
        player:Player.update(),
        bullet:Bullet.update(),
    };
    for(var i in SOCKET_LIST){
        let socket = SOCKET_LIST[i];
        socket.emit('newPosition',pack);
    };

},1000/25);
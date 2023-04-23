import Entity from "./Entity.js";
import Bullet from "./Projectile.js";
import { initPack,removePack } from "../mainGameLoop.js";
import {getInitPack, getUpdatePack} from "../networking/helpers/packages.js";
import { SOCKET_LIST } from "../../app.js";
export default class Player extends Entity{
    static list = {};
    constructor(id,username,map){
        super();
        this.id = id;
        this.username = username;
        this.number = ""+Math.floor(10 * Math.random());
        this.pressingRight = false;
        this.pressingLeft = false;
        this.pressingUp = false;
        this.pressingdDown = false;
        this.pressingAttack = false;
        this.mouseAngle = 0,
        this.maxSpeed = 10;
        //RPG variables
        this.hp = 10;
        this.hpMax = 10;
        this.score = 0;

        this.map = map;
        
    //Overwrite the update
    //let super_update = self.update;
    this.update = () => {
        this.updateSpeed();
        super.update() //call the regular update
        if(this.pressingAttack){
            this.shootBullet(this.mouseAngle);
        }
    };
    Player.list[id] = this;
	initPack.player.push(getInitPack(this));
    };
    shootBullet(angle){
        var b = new Bullet(this.id,angle,this.x,this.y,this.map);
    }
    updateSpeed(){
        if(this.pressingRight){this.spdX=this.maxSpeed;}
        else if(this.pressingLeft){this.spdX=-this.maxSpeed;}
        else this.spdX=0;

        if(this.pressingUp){this.spdY=-this.maxSpeed;}
        else if(this.pressingDown){this.spdY=this.maxSpeed;}
        else this.spdY=0;
    };
    //return self;
}
import chatmessageListener from '../networking/chat.js';

Player.list = {};
Player.onConnect = function(socket,username){
    //for debbug
    let map = 'forest';
    if(Math.random()<0.5){map = 'field'};
    let player = new Player(socket.id,username,map);
    console.log("Connected/created Player");
    //Creates a listener at any keyPress package


    //chatmessageListener(socket);//all chat operations
    socket.on('sendMessageToServer', (data) => {
        let playerName = player.username;
        for(let i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat',playerName+': '+data);}
        });
    socket.on('sendPrivateMessageToServer', (data) => {
        let recipientSocket = null;
        let playerName = username;
        for(let i in Player.list){
            if(Player.list[i] === data.username){
                recipientSocket = SOCKET_LIST[i];
            }
            }
        if(recipientSocket===null){
            socket.emit('addToChat','Player not found: '+data.username);
        }
        else{
            recipientSocket.emit('addToChat',"Private message from "+player.username+': '+data.message);
            socket.emit('addToChat',"Private message to "+ data.username+': '+data.message);
        }
        });
    socket.on('evalServer', (data) => {
        let res = eval(data);
        //eval can make player cheat and make the server crash
        let playerName = socket.id;
        socket.emit('evalAnswer',res);
    });
//

    socket.on('keyPress',function(data){
        if(data.inputId=='left'){player.pressingLeft = data.state;}
        else if(data.inputId=='right'){player.pressingRight = data.state;}
        else if(data.inputId=='up'){player.pressingUp = data.state;}
        else if(data.inputId=='down'){player.pressingDown = data.state;}
        else if(data.inputId=='attack'){player.pressingAttack = data.state;}
        else if(data.inputId=='mouseAngle'){player.mouseAngle = data.state;}
    });
    socket.on('changeMap',function(data){
        if(player.map==='field'){player.map = 'forest';}
        else{player.map = 'field';}
    })
    socket.emit('initPack',{
        selfId:socket.id,
        player:Player.getAllInitPack(),
        bullet:Bullet.getAllInitPack(),
    });
};
Player.getAllInitPack = function(){
    let players = [];
    for(let i in Player.list){players.push(getInitPack(Player.list[i]));}
    return players;
}
Player.onDisconnect = function(socket){
    if(Player.list[socket.id]){
        console.log("Removed from Player.list");
        delete Player.list[socket.id];
        removePack.player.push({id:socket.id});
    }
}

Player.update = function() {
    var pack = [];
    for(var i in Player.list){
        let player = Player.list[i];
        player.update();
        pack.push(getUpdatePack(player));
    }
    return pack;
}
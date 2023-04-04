import Entity from "./Entity.js";
import Bullet from "./Projectile.js";
import { initPack,removePack } from "../mainGameLoop.js";
export default class Player extends Entity{
    static list = {};
    constructor(id){
        super();
        this.id = id;
        this.number = ""+Math.floor(10 * Math.random());
        this.pressingRight = false;
        this.pressingLeft = false;
        this.pressingUp = false;
        this.pressingdDown = false;
        this.pressingAttack = false;
        this.mouseAngle = 0,
        this.maxSpeed = 10;
     
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
	initPack.player.push({
		id:this.id,
		x:this.x,
		y:this.y,	
		number:this.number,	
	});
    };
    shootBullet(angle){
        var b = new Bullet(this.id,angle);
        b.x = this.x;
        b.y = this.y;
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
Player.list = {};
Player.onConnect = function(socket){
    let player = new Player(socket.id);
    console.log("Connected/created Player");
    //Creates a listener at any keyPress package
    socket.on('keyPress',function(data){
        if(data.inputId=='left'){player.pressingLeft = data.state;}
        else if(data.inputId=='right'){player.pressingRight = data.state;}
        else if(data.inputId=='up'){player.pressingUp = data.state;}
        else if(data.inputId=='down'){player.pressingDown = data.state;}
        else if(data.inputId=='attack'){player.pressingAttack = data.state;}
        else if(data.inputId=='mouseAngle'){player.mouseAngle = data.state;}
    });
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
        pack.push({
            id:player.id,
            x:player.x,
            y:player.y,
        })
        // pack.push should be a diferent function
    }
    return pack;
}
import Entity from "./Entity.js";
import Player from "./Player.js";
import { initPack,removePack } from "../mainGameLoop.js";
import { getInitPack, getUpdatePack } from "../networking/helpers/packages.js";

export default class Bullet extends Entity{
    static list = {};
    constructor(parent,angle,x,y,map){
        super();
        this.angle = angle;
        this.parent = parent;
        this.id = Math.random();
        this.spdX = Math.cos(angle/180*Math.PI)*10;
        this.spdY = Math.sin(angle/180*Math.PI)*10;
        this.timer = 0;
        this.toRemove = false;
        this.x = x;
        this.y = y;
        this.map = map;
        Bullet.list[this.id] = this;
        initPack.bullet.push(getInitPack(this));
};
    update(){
        super.update();
        if(this.timer++ > 100){
            this.toRemove = true;
        }
        this.collisionCheck();
    }
    collisionCheck(){
        for(var i in Player.list){
            let p = Player.list[i];
            if(this.map===p.map){
                if(this.getDistance(p) < 32 && this.parent !== p.id){
                    p.hp -= 1;
                    //console.log(p +" has been damaged by "+ this.parent);
                    if(p.hp <= 0){
                        let shooter = Player.list[this.parent];
                        if(shooter){
                            shooter.score += 1;
                        }
                        p.hp = p.hpMax;
                        p.x = Math.random() * 500;
                        p.y = Math.random() * 500;
                        //console.log(p +" has been killed by "+ shooter);
                        //console.log(shooter+" score is "+ shooter.score);
                }
                this.toRemove = true;
            };
            };
            };
    }
};
export const bullet_list = Bullet.list = {};
export let bullet_update = Bullet.update = function() {
    var pack = [];
    for(var i in Bullet.list){
        var bullet = Bullet.list[i];
        bullet.update();
        if (bullet.toRemove){
            removePack.bullet.push({id:bullet.id});
            delete Bullet.list[i];
        }
        else pack.push(getUpdatePack(bullet));
        // pack.push should be a diferent function
    }
    return pack;
};

Bullet.getAllInitPack = function(){
    let bullets = [];
    for(let i in Bullet.list){bullets.push(getInitPack(Bullet.list[i]));}
    return bullets;
};
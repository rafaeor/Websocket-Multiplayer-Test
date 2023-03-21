import Entity from "./Entity.js";
import Player from "./Player.js";

export default class Bullet extends Entity{
    static list = {};
    constructor(parent,angle){
        super();
        this.angle = angle;
        this.parent = parent;
        this.id = Math.random();
        this.spdX = Math.cos(angle/180*Math.PI)*10;
        this.spdY = Math.sin(angle/180*Math.PI)*10;
        this.timer = 0;
        this.toRemove = false;
        Bullet.list[this.id] = this;
};
    update(){
        super.update();
        if(this.timer++ > 100){
            this.toRemove = true;
        }
        for(var i in Player.list){
            let p = Player.list[i];
            if(this.getDistance(p) < 32 && this.parent !== p.id){
                // handle collision. ex: hp--;
                this.toRemove = true;};};
        //after_update();
            }
}
export const bullet_list = Bullet.list = {};
export let bullet_update = Bullet.update = function() {
    var pack = [];
    for(var i in Bullet.list){
        var bullet = Bullet.list[i];
        bullet.update();
        if (bullet.toRemove){
            delete Bullet.list[i];
        }
        else pack.push({
            x:bullet.x,
            y:bullet.y,
        });
        // pack.push should be a diferent function
    }
    return pack;
}

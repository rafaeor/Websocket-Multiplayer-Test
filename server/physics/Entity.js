export default class Entity{
    x = 250;
    y = 250;
    spdX = 0;
    spdY = 0;
    id = "";
    
    update(){
        this.updatePosition();
    }
    updatePosition(){
        this.x += this.spdX;
        this.y += this.spdY;
    }
    getDistance(pt){
        return Math.sqrt(Math.pow(this.x - pt.x ,  2) + Math.pow(this.y - pt.y , 2));
    }
    //return self;
}

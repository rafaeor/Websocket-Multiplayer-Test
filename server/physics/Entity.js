export default class Entity{
    constructor(/*id,x,y,map*/){
        this.x = 250;
        this.y = 250;
        this.spdX = 0;
        this.spdY = 0;
        this.id = "";
        this.map='forest';
    }
    
    
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

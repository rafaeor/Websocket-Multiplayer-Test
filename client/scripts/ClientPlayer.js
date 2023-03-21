
export default class Player{
    constructor(initPack){
        let self = {}
        this.id = initPack.id;
        this.number = initPack.number;
        this.x = initPack.x;
        this.y = initPack.y;
        Player.list[this.id] = this;
        return this;
    }
}

Player.list = {};
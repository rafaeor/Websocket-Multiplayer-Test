
export default class Bullet{
    constructor(initPack){
        let self = {}
        this.id = initPack.id;
        this.x = initPack.x;
        this.y = initPack.y;
        Bullet.list[this.id] = this;
        return this;
    }
}

Bullet.list = {};
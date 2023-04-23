

export function getInitPack(obj){
    return{
        id:obj.id,
        x:obj.x,
        y:obj.y,
        number:obj.number,
        hp:obj.hp,
        hpMax:obj.hpMax,
        score:obj.score,
        map:obj.map,
    };
};

export function getUpdatePack(obj){
    return{
        id:obj.id,
        x:obj.x,
        y:obj.y,
        hp:obj.hp,
        hpMax:obj.hpMax,
        score:obj.score,
        map:obj.map,
    };
};//update compression To be Made

export default {getInitPack, getUpdatePack};
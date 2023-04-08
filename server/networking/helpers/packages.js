

export function getInitPack(obj){
    return{
        id:obj.id,
        x:obj.x,
        y:obj.y,
        number:obj.number,
    };
};

export function getUpdatePack(obj){
    return{
        id:obj.id,
        x:obj.x,
        y:obj.y,
    };
};

export default {getInitPack, getUpdatePack};
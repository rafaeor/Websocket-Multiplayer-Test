import { SOCKET_LIST } from "../../app.js";

export default function messageListener(socket){
    socket.on('sendMsgToServer', (data) => {
        let playerName = socket.id;
        for(let i in SOCKET_LIST){SOCKET_LIST[i].emit('addToChat',playerName+': '+data);}})
    socket.on('evalServer', (data) => {
        let res = eval(data);
        let playerName = socket.id;
        socket.emit('evalAnswer',res);
    })
};
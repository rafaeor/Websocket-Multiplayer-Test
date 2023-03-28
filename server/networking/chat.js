import { SOCKET_LIST } from "../../app.js";

export default function chatmessageListener(socket){
    socket.on('sendMessageToServer', (data) => {
        console.log("sendMsgToServer")
        let playerName = socket.id;
        for(let i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat',playerName+': '+data);
        }
        }
            )
    socket.on('evalServer', (data) => {
        let res = eval(data);
        //eval can make player cheat and make the server crash
        let playerName = socket.id;
        socket.emit('evalAnswer',res);
    })
};
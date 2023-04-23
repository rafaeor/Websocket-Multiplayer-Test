import { SOCKET_LIST } from "../../app.js";

export default function chatmessageListener(socket,player){
    socket.on('sendMessageToServer', (data) => {
        let playerName = player.username;
        console.log(playerName)
        for(let i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat',playerName+': '+data);}
        })
    socket.on('sendPrivateMessageToServer', (data) => {
        let recipientSocket = null;
        let playerName = username;
        for(let i in Player.list){
            if(Player.list[i] === data.username){
                recipientSocket = SOCKET_LIST[i];
            }
            }
        if(recipientSocket===null){
            socket.emit('addToChat','Player not found: '+data.username);
        }
        else{
            recipientSocket.emit('addToChat',"Private message from "+player.username+': '+data.message);
            socket.emit('addToChat',"Private message to "+ data.username+': '+data.message);
        }
        })
    socket.on('evalServer', (data) => {
        let res = eval(data);
        //eval can make player cheat and make the server crash
        let playerName = socket.id;
        socket.emit('evalAnswer',res);
    })
};
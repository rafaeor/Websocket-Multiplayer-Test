const WIDTH = innerWidth;
const HEIGHT = innerHeight;

let socket = io();

//
//Text input
//
let global = document.getElementById("global");
let signDiv = document.getElementById("signDiv");
let signDivUsername = document.getElementById("signDiv-username");
let signDivSignIn = document.getElementById("signDiv-signIn");

let ctxid = document.getElementById("ctx");
ctxid.width = innerWidth - 25;
ctxid.height = innerHeight - 25;
//let signDivSignUp = document.getElementById("signDiv-signUp");
//let signPassword = document.getElementById("signDiv-password");

signDivSignIn.onclick = function () {
  //socket.emit('signIn',{username:signDivUsername.value,password:signPassword.value});
  socket.emit("signIn", { username: signDivUsername.value, password: " " });
};
/*signDivSignUp.onclick = function(){
        socket.emit('signUp',{username:signDivUsername.value,password:signPassword.value});
    }*/
socket.on("signInResponse", function (data) {
  if (data.success) {
    signDiv.style.display = "none";
    global.style.display = "none";
    gameDiv.style.display = "inline-block";
  } else {
    alert("Sign in unsuccessul");
  }
});
socket.on("signUpResponse", function (data) {
  if (data.success) {
    alert("Sign up successul");
  } else {
    alert("Sign up unsuccessul");
  }
});
// chat
let chatText = document.getElementById("chat-text");
let chatInput = document.getElementById("chat-input");
let chatForm = document.getElementById("chat-form");

//UI
let changeMap = function () {
  socket.emit("changeMap");
};

//game
let Img = {};
Img.player = new Image();
Img.player.src = "/client/img/player.png";
Img.bullet = new Image();
Img.bullet.src = "/client/img/bullet.png";
Img.map = {};
Img.map["field"] = new Image();
Img.map["field"].src = "/client/img/map2.jpg";
Img.map["forest"] = new Image();
Img.map["forest"].src = "/client/img/map.jpg";

let ctx = document.getElementById("ctx").getContext("2d");
let ctxUi = document.getElementById("ctx-ui").getContext("2d");
ctxUi.font = "30px Arial";

//import Init from './scripts/Init.js';
// init
var Player = function (initPack) {
  var self = {};
  self.id = initPack.id;
  self.number = initPack.number;
  self.x = initPack.x;
  self.y = initPack.y;
  self.hp = initPack.hp;
  self.hpMax = initPack.hpMax;
  self.score = initPack.score;

  self.map = initPack.map;

  Player.list[self.id] = self;

  self.draw = function () {
    if (Player.list[selfId].map !== self.map) {
      return;
    } //temporary
    // relative x and relative y
    let x = this.x - Player.list[selfId].x + WIDTH / 2;
    let y = this.y - Player.list[selfId].y + HEIGHT / 2;

    let hpWidth = (30 * self.hp) / self.hpMax;
    ctx.fillStyle = "red";
    ctx.fillRect(x - hpWidth / 2, y - 40, hpWidth, 4);

    //ctx.fillText(self.number,self.x,self.y); // letters
    let width = Img.player.width * 2;
    let height = Img.player.height * 2;

    ctx.drawImage(
      Img.player,
      0,
      0,
      Img.player.width,
      Img.player.height,
      x - width / 2,
      y - height / 2,
      width,
      height
    );
    // center of the image is this.x-width
    // the image is bigger from the original

    //ctx.fillText(self.score,self.x,self.y-60); // score
  };
  return self;
};
Player.list = {};
/*Player.onDisconnect = function(PlayerX){
        Player.list[PlayerX.id] = 0;
    }*/

var Bullet = function (initPack) {
  var self = {};
  self.id = initPack.id;
  self.x = initPack.x;
  self.y = initPack.y;

  self.map = initPack.map;

  Bullet.list[self.id] = self;
  self.draw = function () {
    if (Player.list[selfId].map !== self.map) {
      return;
    } //temporary
    let width = Img.bullet.width / 2;
    let height = Img.bullet.height / 2;

    let x = this.x - Player.list[selfId].x + WIDTH / 2;
    let y = this.y - Player.list[selfId].y + HEIGHT / 2;

    ctx.drawImage(
      Img.bullet,
      0,
      0,
      Img.bullet.width,
      Img.bullet.height,
      x - width / 2,
      y - height / 2,
      width,
      height
    );
    //ctx.fillRect(self.x-5,self.y-5,10,10);//rect
    //top left -5 and bottom right -5 for the rect being at center.
  };
  return self;
};
Bullet.list = {};

var selfId = null;
socket.on("initPack", function (data) {
  if (data.selfId) {
    selfId = data.selfId;
  }
  //{ player : [{id:123,number:'1',x:0,y:0},{id:1,number:'2',x:0,y:0}], bullet: []}
  for (var i = 0; i < data.player.length; i++) {
    new Player(data.player[i]);
  }
  for (var i = 0; i < data.bullet.length; i++) {
    new Bullet(data.bullet[i]);
  }
});
//when new stuff created, contains all the data
// update
//difference
socket.on("update", function (data) {
  //{ player : [{id:123,x:0,y:0},{id:1,x:0,y:0}], bullet: []}
  for (var i = 0; i < data.player.length; i++) {
    var pack = data.player[i];
    var p = Player.list[pack.id];
    if (p) {
      if (pack.x !== undefined) p.x = pack.x;
      if (pack.y !== undefined) p.y = pack.y;
      if (pack.hp !== undefined) p.hp = pack.hp;
      if (pack.hpMax !== undefined) p.hpMax = pack.hpMax;
      if (pack.score !== undefined) p.score = pack.score;
      if (pack.map !== undefined) p.map = pack.map;
    } //this will handle decompression later
  }
  for (var i = 0; i < data.bullet.length; i++) {
    var pack = data.bullet[i];
    var b = Bullet.list[data.bullet[i].id];
    if (b) {
      if (pack.x !== undefined) b.x = pack.x;
      if (pack.y !== undefined) b.y = pack.y;
    }
  }
});
// remove
//when player/bullet get removed
socket.on("removePack", function (data) {
  for (let i = 0; i < data.player.length; i++) {
    let x = data.player[i].id;
    delete Player.list[x];
  }
  for (let i = 0; i < data.bullet.length; i++) {
    let x = data.bullet[i].id;
    delete Bullet.list[x];
  }
});

setInterval(function () {
  if (!selfId) {
    return;
  }
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawMap();
  drawScore();
  for (let i in Player.list) {
    Player.list[i].draw();
  }
  for (let i in Bullet.list) {
    Bullet.list[i].draw();
  }
}, 40); //24 fps

let drawMap = function () {
  let player = Player.list[selfId];
  // caso nao tenha isso o mapa ficara centralizado
  // sem mover na tela do player
  let x = WIDTH / 2 - player.x;
  let y = HEIGHT / 2 - player.y;

  let mapImage = player.map;

  ctx.drawImage(Img.map[mapImage], x, y);
};
let drawScore = function () {
  if (lastScore === Player.list[selfId].score) {
    return;
  }
  lastScore = Player.list[selfId].score;
  ctxUi.fillStyle = "white";
  ctxUi.clearRect(0, 0, WIDTH, HEIGHT);
  ctxUi.fillText(Player.list[selfId].score, 0, 30);
};
var lastScore = null;

socket.on("addToChat", function (data) {
  chatText.innerHTML += "<div>" + data + "</div>";
  chatText.scrollTop = chatText.scrollHeight;
});

socket.on("evalAnswer", function (data) {
  console.log(data);
});
chatForm.onsubmit = function (e) {
  e.preventDefault(); //prevent page from reloading
  if (chatInput.value[0] === "/") {
    socket.emit("evalServer", chatInput.value.slice(1));
  }
  if (chatInput.value[0] === "@") {
    socket.emit("sendPrivateMessageToServer", {
      username: chatInput.value.slice(1, chatInput.value.indexOf(",")),
      message: chatInput.value.slice(chatInput.value.indexOf(",") + 1),
    });
  } else {
    socket.emit("sendMessageToServer", chatInput.value);
  }
  chatInput.value = "";
};

document.onkeydown = function (event) {
  if (event.keyCode == 68) {
    // d
    socket.emit("keyPress", { inputId: "right", state: true });
  }
  if (event.keyCode == 83) {
    socket.emit("keyPress", { inputId: "down", state: true });
  }
  if (event.keyCode == 65) {
    // a
    socket.emit("keyPress", { inputId: "left", state: true });
  }
  if (event.keyCode == 87) {
    // w
    socket.emit("keyPress", { inputId: "up", state: true });
  }
};

document.onkeyup = function (event) {
  if (event.keyCode == 68) {
    // d
    socket.emit("keyPress", { inputId: "right", state: false });
  }
  if (event.keyCode == 83) {
    // s
    socket.emit("keyPress", { inputId: "down", state: false });
  }
  if (event.keyCode == 65) {
    // a
    socket.emit("keyPress", { inputId: "left", state: false });
  }
  if (event.keyCode == 87) {
    // w
    socket.emit("keyPress", { inputId: "up", state: false });
  }
};

document.onmousedown = function (event) {
  socket.emit("keyPress", { inputId: "attack", state: true });
};
document.onmouseup = function (event) {
  socket.emit("keyPress", { inputId: "attack", state: false });
};
document.onmousemove = function (event) {
  let x = -250 + event.clientX - 8;
  let y = -250 + event.clientY - 8;
  let angle = (Math.atan2(y, x) / Math.PI) * 180;
  socket.emit("keyPress", { inputId: "mouseAngle", state: angle });
};

document.oncontextmenu = function (event) {
  event.preventDefault();
};

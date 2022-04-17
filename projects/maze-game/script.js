const connection = io("https://maze-game-online.herokuapp.com/");
const canvas = document.getElementById('canvas');
const display = canvas.getContext('2d');

let serverMaze;
let id;
let players;
let chat = [];
let subscribed = false;
let ps = [];

let client;

let u = 700/20;

document.onkeydown = function(e) {
    if (e.key == "ArrowUp") {
        connection.emit("dir", "up")
    }
    if (e.key == "ArrowDown") {
        connection.emit("dir", "down")
    }
    if (e.key == "ArrowLeft") {
        connection.emit("dir", "left")
    }
    if (e.key == "ArrowRight") {
        connection.emit("dir", "right")
    }
}

document.onkeyup = function(e) {
    if (e.key == "Enter" && document.getElementById("text").value.trim() != "") {
        connection.emit("message", document.getElementById("text").value);
        document.getElementById("text").value = "";
    }
}

connection.on("connect", function() {
    id = connection.id;
})

connection.on("map-update", data => {
    serverMaze = data
})

connection.on("chat-update", data => {
    chat = data
    if (subscribed) {
        if (chat.length != ps.length) {
            let p = document.createElement("p");
            p.innerText = chat[chat.length - 1].from + ": " + chat[chat.length - 1].content;
            document.getElementById("messages").appendChild(p);
            let div = document.getElementById("messages");
            div.scrollTop = div.scrollHeight;
            ps.push(p);            
        }
    } else if (!subscribed) {
        subscribed = true;
        chat.forEach((message) => {
            let p = document.createElement("p");
            p.innerText = message.from + ": " + message.content;
            document.getElementById("messages").appendChild(p);
            ps.push(p);
        })
    }
})

connection.on("player-update", data => {
    players = data;
    client = players[id];
})


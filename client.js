const canvas = document.getElementById("canvas");
const display = canvas.getContext("2d");
let players = [];

document.onkeydown = function(event){
    if (event.keyCode == 37) {
        socketConnection.emit("dir", "left");
    } else if (event.keyCode == 38) {
        socketConnection.emit("dir", "up");
    } else if (event.keyCode == 39) {
        socketConnection.emit("dir", "right");
    } else if (event.keyCode == 40) {
        socketConnection.emit("dir", "down");
    }
}

function drawPlayer(object) {
    display.fillStyle = "white";
    display.font = "15px Arial";
    display.textAlign = "center";
    if (object.id != client.id) {
        display.fillText(object.id, object.x + 25, object.y - 10);
    } else {
        display.fillText("You", object.x + 25, object.y - 10);
    }
    display.fillStyle = object.color;
    display.fillRect(object.x, object.y, 50, 50);
}

function draw() {
    display.fillStyle = "black";
    display.fillRect(0, 0, canvas.width, canvas.height);
    if (players != undefined) {
        players.forEach((player) => {
            drawPlayer(player);
        })
    }
}

setInterval(draw, 1000/60);
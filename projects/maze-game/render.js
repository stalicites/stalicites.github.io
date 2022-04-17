function drawPlayer(player) {
    display.fillStyle = player.color;
    display.fillRect(player.x, player.y, u, u);
    display.font = "15px Arial";
    display.fillStyle = "red";
    display.textAlign = "center";
    display.fillText(player.name, player.x + u/2, player.y - 10);
}

function line(x1, y1, x2, y2) {
    display.strokeStyle = "black";
    display.lineWidth = 1;
    display.beginPath();
    display.moveTo(x1, y1);
    display.lineTo(x2, y2);
    display.stroke();
}

function draw() {
    display.fillStyle = "white";
    display.fillRect(0, 0, 700, 700);
    if (serverMaze != null) {
        for (let i = 0; i < serverMaze.length; i++) {
            let child = serverMaze[i];
            for (let j = 0; j < child.length; j++) {
                if (child[j].bottom) {
                    line((child[j].x) * u, (child[j].y * u) + u, (child[j].x * u) + u, (child[j].y * u) + u)
                }
                if (child[j].left) {
                    line((child[j].x) * u, (child[j].y * u), (child[j].x * u), (child[j].y * u) + u)
                }
                if (child[j].right) {
                    line((child[j].x * u) + u, (child[j].y * u), (child[j].x * u) + u, (child[j].y * u) + u)
                }
                if (child[j].top) {
                    line((child[j].x) * u, (child[j].y * u), (child[j].x * u) + u, (child[j].y * u))
                }
            }
        }
        let p = Object.values(players);
        p.forEach((player) => {
            drawPlayer(player);
        })
    }
    drawPlayer({color: "yellow", x: 665, y: 665, name: ""});
}

setInterval(draw, 1000/60)
const canvas = document.getElementById("bg");
const display = canvas.getContext("2d");


class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = cell.color;
        this.wave = true;
        nodes.push(this);
    }
}

const cell = {
    speed: 0.1,
    rngOfSwitch: [1, 16],
    row: 9,
    col: 10,
    rot: 10,
    offsetX: 100,
    offsetY: 50,
    nodeDist: 150,
    color: "skyblue"
}

let nodes = [];

function spawn() {
    nodes = [];
    cell.offsetX = canvas.width/38.4;
    cell.offsetX = canvas.width/19.2;
    cell.nodeDist = canvas.width/10;
    cell.speed = canvas.width/19200;
    for (let i = 0; i < cell.row; i++) {
        for (let j = 0; j < cell.col; j++) {
            new Node((j * cell.nodeDist) + cell.offsetX, (i * cell.nodeDist) + cell.offsetY);
        }
    }
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
spawn();

function line(x1, y1, x2, y2) {
    display.strokeStyle = cell.color;
    display.lineWidth = 0.75;
    display.beginPath();
    display.moveTo(x1, y1);
    display.lineTo(x2, y2);
    display.stroke();
}

function rect(x, y, width, height, color) {
    display.fillStyle = color;
    display.fillRect(x, y, width, height);
}

function circle(x, y, r) {
    display.beginPath();
    display.lineWidth = 3;
    display.fillStyle = cell.color;
    display.arc(x, y, r, 0, 2 * Math.PI);
    display.fill();
}

function randomNumber(min, max) { // random number function
    return Math.round(Math.random() * (max - min) + min);
}

const mouse = {
    x: 0,
    y: 0
}



document.onmousemove = function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    display.rotate(Math.PI/cell.rot);
    spawn();
}



display.rotate(Math.PI/cell.rot);

function draw() {
    rect(0, 0, window.innerWidth, window.innerHeight, "#2e2e2e");
    for (let i = 0; i < nodes.length; i++) {
        if (i != nodes.length - 1 && i % cell.col != cell.col - 1) {
            line(nodes[i].x, nodes[i].y, nodes[i + 1].x, nodes[i + 1].y)
            if (i < nodes.length - cell.col) {
                line(nodes[i].x, nodes[i].y, nodes[i + cell.col].x, nodes[i + cell.col].y)
            }
        }
        if (i < nodes.length - cell.col) {
            line(nodes[i].x, nodes[i].y, nodes[i + cell.col].x, nodes[i + cell.col].y)
        }
        circle(nodes[i].x, nodes[i].y, 5)
        if (nodes[i].wave) {
            nodes[i].y -= cell.speed;
        } else {
            nodes[i].y += cell.speed;
        }
        if (randomNumber(cell.rngOfSwitch[0], cell.rngOfSwitch[1]) == (cell.rngOfSwitch[1])/2) {
            nodes[i].wave = !nodes[i].wave
        }
    }
}

setInterval(draw, 1000/60);
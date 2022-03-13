const canvas = document.getElementById("bg");
const display = canvas.getContext('2d');

let nodes = [];

// for display resize and stuff
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function randomNumber(min, max) { // random number function
    return Math.round(Math.random() * (max - min) + min);
}

function rect(x, y, width, height, color) { // rect function
    display.fillStyle = color;
    display.fillRect(x, y, width, height);
}

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = randomNumber(-1, 1);
        this.vy = randomNumber(-1, 1);
        nodes.push(this);
    }
}

for (let i = 0; i < Math.round(canvas.width/25); i++) {
    new Node(randomNumber(0, canvas.width), randomNumber(0, canvas.height));
}

function dist(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

function line(x1, y1, x2, y2) {
    display.strokeStyle = "rgba(64, 118, 255, 0.9)";
    display.lineWidth = 3;
    display.beginPath();
    display.moveTo(x1, y1);
    display.lineTo(x2, y2);
    display.stroke();
}

function draw() {   
    display.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach((node) => {
        rect(node.x, node.y, 10, 10, "rgba(255, 255, 255)");
        node.x += node.vx;
        node.y += node.vy;
        if (node.x > canvas.width || node.x < 0 || node.y > canvas.height || node.y < 0) {
            node.vx *= -1;
            node.vy *= -1;
        }
        nodes.forEach((childNode) => {
            if (dist(node.x, node.y, childNode.x, childNode.y) < 100) {
                line(node.x, node.y, childNode.x, childNode.y);
            }
        })
    })
}

setInterval(draw, 1000/60); // 60 fps
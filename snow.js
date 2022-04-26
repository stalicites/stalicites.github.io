const canvas = document.getElementById('bg');
const display = canvas.getContext('2d');

window.onresize = function(e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let shapes = ["triangle", "circle", "square", "trapezoid"];
let particles = []; 

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function hsl(color) {
    return `hsl(${color}, 100%, 50%)`;
}

function Particle(x, y, type, scale, vx, vy) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.scale = scale;
    this.vx = vx;
    this.vy = vy;
    this.color = hsl(randomNumber(180, 225));
    this.f = randomNumber(1, 4);
    particles.push(this);
}

function rect(particle) {
    display.fillStyle = particle.color;
    display.fillRect(particle.x, particle.y, particle.scale, particle.scale);
}

function trapezoid(particle) {
    display.lineWidth = 0.01;
    display.moveTo(particle.x, particle.y);
    display.lineTo(particle.x + (particle.scale), particle.y);
    display.lineTo(particle.x + (particle.scale) * particle.f, particle.y + particle.scale);
    display.lineTo(particle.x + (particle.scale), particle.y + (particle.scale * particle.f));
    display.stroke();
    display.fillStyle = particle.color;
    display.fill();
}

function triangle(particle) {
    display.lineWidth = 0.01;
    display.moveTo(particle.x, particle.y);
    display.lineTo(particle.x + (particle.scale * particle.f), particle.y);
    display.lineTo(particle.x + (particle.scale) * particle.f, particle.y + particle.scale);
    display.lineTo(particle.x + (particle.scale  * particle.f), particle.y + (particle.scale * particle.f));
    display.stroke();
    display.fillStyle = particle.color;
    display.fill();
}

function circle(particle) {
    display.beginPath();
    display.lineWidth = 0.01;
    display.fillStyle = particle.color;
    display.strokeStyle = particle.color;
    display.arc(particle.x, particle.y, particle.scale, 0, 2 * Math.PI);
    display.stroke();
    display.fill();
}

// 180, 225

for (let i = 0; i < Math.round(canvas.width/40); i++) {
    let type = shapes[randomNumber(0, shapes.length - 1)];
    new Particle(randomNumber(30, canvas.width - 30), randomNumber(-200, -30), type, randomNumber(20, 40), randomNumber(-1, 1), randomNumber(-3, 3));
}

function draw() {

    if (randomNumber(1, 15) == 5) {
            let type = shapes[randomNumber(0, shapes.length - 1)];
            new Particle(randomNumber(30, canvas.width - 30), randomNumber(-200, -30), type, randomNumber(20, 40), randomNumber(-1, 1), randomNumber(-3, 3));
    }

    display.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        if (particle.y > (canvas.height + 40)) {
            particles.splice(i, 1);
        }
        if (particle.type === "square") {
            rect(particle);
        } else if (particle.type === "circle") {
            circle(particle);
        } else if (particle.type === "trapezoid") {
            trapezoid(particle);
        } else if (particle.type === "triangle") {
            triangle(particle);
        }
        particle.x += particle.vx;
        particle.y += particle.vy;
    }
    requestAnimationFrame(draw)
}

draw();
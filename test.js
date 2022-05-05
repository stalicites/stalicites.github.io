VANTA.GLOBE({
    el: "#background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: "#00ff00",
    color2: "white",
    size: 1.6,
    backgroundColor: "#171717"
})

let today = new Date();

let frameCount = 0;

let time = today.toLocaleTimeString('en-US');

let textSpeed = 14;

const terminal = document.getElementById("terminal");
const line1 = document.getElementById("line1");
const lastLogin = localStorage.getItem("last-visited") || `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()} at ${time}`;

let line1D = {
    text: `> Last login: ${lastLogin} on ttys000\n> Welcome to stalicites system(s). Run "stalicites help" to get started.`,
    index: 0
}

localStorage.setItem("last-visited", `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()} at ${time}`);

document.getElementById("input").onkeyup = function(event) {
    if (event.key == "Enter") {
        line1D.text += `\n > ${document.getElementById("input").value}`
        if (document.getElementById("input").value.trim() === "stalicites help") {
            line1D.text += `
            Here are a list of commands you can run:
            stalicites github
            stalicites chess.com
            stalicites discord
            whois
            stalicites work
            `
        } else {
            line1D.text += `\nCommand "${document.getElementById("input").value}" not found! Run "stalicites help" for more info.`;
        }
        document.getElementById("input").value = "";
    }
};

function animateText() {
    frameCount++;
    if (line1D.index < line1D.text.length && frameCount % textSpeed == 0) {
        line1.innerHTML += line1D.text[line1D.index];
        line1D.index++;
    } 
    if (line1D.index == 122) {
        textSpeed = 6;
    }
}

setInterval(animateText, 1000/1000);
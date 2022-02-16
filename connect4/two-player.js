const game = document.getElementById("gameFrame");
const display = game.getContext("2d");

let developerMode = false;

game.style.border = "2px solid black"

let htmlEl = document.getElementById("foo");
htmlEl.style.textAlign = "center"
htmlEl.style.display = "block";

const redTime = document.getElementById("red");
const yellowTime = document.getElementById("yellow");

let scale = 0.7;

function drawRect(x, y, width, height, color) {
    display.fillStyle = color;
    display.fillRect(x, y, width * scale, height * scale);
}

function circle(x, y, radius, color) {
    display.beginPath();
    display.fillStyle = color;
    display.arc(x * scale, y * scale, radius * scale, 0, 2 * Math.PI);
    display.stroke();
    display.fill();
}

const audio = new Audio("drop.mp3");

let spaces = [];
let columns = [];

let count = 0;

let team1 = {
    color: "red",
    going: false,
    time: 0,
}

let team2 = {
    color: "yellow",
    going: false,
    time: 0,
}

let won = false;
let currentColor = "red";

let boardColor = "blue";

let pieceX = 0;

let winner = null;

for (var o = 210; o < 700; o+= 500/6) {
    for (var i = 80; i < 700; i += 90) {
        circle(i, o, 40, "white");
        let newCircle = {
            x: i,
            y: o,
            filled: false,
            value: null,
            color: "white"
        }
        spaces.push(newCircle);
    }
}

function reverse(team) {
    if (team == "red") {
        return "Yellow"
    }
    if (team == "yellow") {
        return "Red"
    }
}

let q = 300;

var computerIndex = 0;



function checkWin() {
    board = spaces;
    for (let n = 0; n < spaces.length; n++) {
        // Vertical
        if ((n >= 0 && n <= 3) || (n >= 7 && n <= 10) || (n >= 14 && n <= 17) || (n >= 21 && n <= 24) || (n >= 28 && n <= 31 || (n >= 35 && n <= 38))) {
            if (spaces[n].color == spaces[n+1].color && spaces[n].color == spaces[n + 2].color && spaces[n].color == spaces[n + 3].color) {
                if (spaces[n].color != "white") {
                    if (board[n].color == "red") {
                        circle(board[n].x, board[n].y, 40, "#ff726f");
                        circle(board[n+1].x, board[n+1].y, 40, "#ff726f");
                        circle(board[n+2].x, board[n+2].y, 40, "#ff726f");
                        circle(board[n+3].x, board[n+3].y, 40, "#ff726f");
                    }
                    if (board[n].color == "yellow") {
                        circle(board[n].x, board[n].y, 40, "#ffffa1");
                        circle(board[n+1].x, board[n+1].y, 40, "#ffffa1");
                        circle(board[n+2].x, board[n+2].y, 40, "#ffffa1");
                        circle(board[n+3].x, board[n+3].y, 40, "#ffffa1");
                    }
                    return true;
                }
            }
        }
        if (n >= 21) {
            if (spaces[n].color == spaces[n - 7].color && spaces[n].color == spaces[n - 14].color && spaces[n].color == spaces[n - 21].color) {
                if (spaces[n].color != "white") {
                    if (board[n].color == "red") {
                        circle(board[n].x, board[n].y, 40, "#ff726f");
                        circle(board[n-7].x, board[n-7].y, 40, "#ff726f");
                        circle(board[n-14].x, board[n-14].y, 40, "#ff726f");
                        circle(board[n-21].x, board[n-21].y, 40, "#ff726f");
                    }
                    if (board[n].color == "yellow") {
                        circle(board[n].x, board[n].y, 40, "#ffffa1");
                        circle(board[n-7].x, board[n-7].y, 40, "#ffffa1");
                        circle(board[n-14].x, board[n-14].y, 40, "#ffffa1");
                        circle(board[n-21].x, board[n-21].y, 40, "#ffffa1");
                    }
                    return true;
                }
            }
        }
        if (n >=0 && n <= 3 || n >=7 && n <= 10 || n >=14 && n <= 17) {
            // Diagonal
            if (spaces[n].color == spaces[n+8].color && spaces[n].color == spaces[n + 16].color && spaces[n].color == spaces[n + 24].color) {
                if (spaces[n].color != "white") {
                    if (board[n].color == "red") {
                        circle(board[n].x, board[n].y, 40, "#ff726f");
                        circle(board[n+8].x, board[n+8].y, 40, "#ff726f");
                        circle(board[n+16].x, board[n+16].y, 40, "#ff726f");
                        circle(board[n+24].x, board[n+24].y, 40, "#ff726f");
                    }
                    if (board[n].color == "yellow") {
                        circle(board[n].x, board[n].y, 40, "#ffffa1");
                        circle(board[n+8].x, board[n+8].y, 40, "#ffffa1");
                        circle(board[n+16].x, board[n+16].y, 40, "#ffffa1");
                        circle(board[n+24].x, board[n+24].y, 40, "#ffffa1");
                    }
                    return true;
                }
            }
        }
            // Left Diagonal
        if (n >=3 && n <= 6 || n >=10 && n <= 13 || n >=17 && n <= 20) {
            if (spaces[n].color == spaces[n+6].color && spaces[n].color == spaces[n + 12].color && spaces[n].color == spaces[n + 18].color) {
                if (spaces[n].color != "white") {
                    if (board[n].color == "red") {
                        circle(board[n].x, board[n].y, 40, "#ff726f");
                        circle(board[n + 6].x, board[n + 6].y, 40, "#ff726f");
                        circle(board[n + 12].x, board[n + 12].y, 40, "#ff726f");
                        circle(board[n + 18].x, board[n + 18].y, 40, "#ff726f");
                    }
                    if (board[n].color == "yellow") {
                        circle(board[n].x, board[n].y, 40, "#ffffa1");
                        circle(board[n + 6].x, board[n + 6].y, 40, "#ffffa1");
                        circle(board[n + 12].x, board[n + 12].y, 40, "#ffffa1");
                        circle(board[n + 18].x, board[n + 18].y, 40, "#ffffa1");
                    }
                    return true;
                }
            }
        }
    }
    return false;
}

document.addEventListener('keydown', (e)=> {
    switch (e.key) {
        case 'ArrowRight':
            currentIndex++;
            break;
        case 'ArrowLeft':
            currentIndex--;
            break;
        case 'a':
            currentIndex--;
            break;
        case 'd':
            currentIndex++;
            break;
        case 'r':
            location.reload();
    }
});

for (let x = 0; x < 7; x++) {
    let newCol = {
        x: spaces[x].x,
        y: spaces[x].y,
        spacesLeft: 7
    }
    columns.push(newCol);
}

function drawSprites() {
    display.clearRect(0, 0, 800, 800);
    drawRect(0, 100, 700, 600, boardColor);
    for (let p = 0; p < spaces.length; p++) {
        circle(spaces[p].x, spaces[p].y, 40, spaces[p].color);
        if (developerMode) {
            display.font = "10px arial";
            display.fillStyle = "black";
            display.fillText(p, spaces[p].x * scale, spaces[p].y * scale);
        }
    }
    circle(pieceX, 90, 40, currentColor);
    if (won) {
        if (count != 42) {
            display.fillStyle = reverse(currentColor);
            console.log(winner);
            display.font = 30 * scale + "px Comfortaa";
            let winningStatement = winner + " wins!"
            display.textAlign = "center"
            display.fillStyle = "black"
            display.fillText(winningStatement, game.width/2, game.height/2 - 190); 
            if (winner == "red") {
                q = 270;
            }
            if (winner == "yellow") {
                q = 240;
            }
        } else {
            display.font = 30 * scale + "px Comfortaa";
            display.textAlign = "center"
            display.fillStyle = "black"
            display.fillText("It\'s a draw", game.width/2, game.height/2 - 190); 
        }
    }
}



let currentIndex = 0;

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        if (!won) {
            if (columns[currentIndex].spacesLeft != 0) {
                columns[currentIndex].spacesLeft--;
            }
            if (columns[currentIndex].spacesLeft == 0) {
        
            } else {
                // success
                count++;
                if (count % 2 == 0) {
                    htmlEl.innerHTML = "It\'s red\'s turn"
                } else {
                    htmlEl.innerHTML = "It\'s yellow\'s turn"
                }
                audio.play();
            }
            if (columns[currentIndex].spacesLeft == 6) {
                spaces[currentIndex + 35].color = currentColor;
            }
            if (columns[currentIndex].spacesLeft == 5) {
                spaces[currentIndex + 28].color = currentColor;
            }
            if (columns[currentIndex].spacesLeft == 4) {
                spaces[currentIndex + 21].color = currentColor;
            }
            if (columns[currentIndex].spacesLeft == 3) {
                spaces[currentIndex + 14].color = currentColor;
            }
            if (columns[currentIndex].spacesLeft == 2) {
                spaces[currentIndex + 7].color = currentColor;
            }
            if (columns[currentIndex].spacesLeft == 1) {
                spaces[currentIndex].color = currentColor;
            }
        }
    }
}

function par(num) {
    // takes input in ms;

}

function inter() {
    if (count % 2 == 0) {
        if (!won) {
            team1.time++;
        }
    }
    if (count % 2 == 1) {
        if (!won) {
            team2.time++;   
        }
    }
}

setInterval(inter, 1000)

function draw() {
    drawSprites();
    if (count % 2 == 0) {
        team1.going = true;
        team2.going = true;
        currentColor = "red";
    }
    if (count % 2 == 1) {
        team2.going = true;
        team1.going = false;
        currentColor = "yellow";
    }
    switch (currentIndex) {
        case 0:
            pieceX = columns[0].x;
            break;
        case 1:
            pieceX = columns[1].x;
            break;
        case 2:
            pieceX = columns[2].x;
            break;
        case 3:
            pieceX = columns[3].x;
            break;
        case 4:
            pieceX = columns[4].x;
            break;
        case 5:
            pieceX = columns[5].x;
            break;
        case 6:
            pieceX = columns[6].x;
            break;
    }
    if (currentIndex > 6) {
        currentIndex = 6;
    }
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    if (checkWin()) {
        won = true;
        pieceX = 10000;
        winner = reverse(currentColor);
    }
    if (count >= 42) {
        won = true;
    }
}

setInterval(draw, 1);
let playing = false;

const thinking = document.getElementById("thinking");

let difficulty = document.getElementById('difficulty');

let botStarts = document.getElementById('starts');

const rematch = document.createElement("a");
rematch.innerHTML = "Rematch?";
rematch.href = "";

let turn = 0;

let isCreated = false;

const game = document.getElementById("gameFrame");
const display = game.getContext("2d");

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let difficulties = ["Beginner", "Intermediate", "Advanced", "Unbeatable"];

const audio = new Audio("drop.mp3");

let diffHTML = document.getElementById("re");

let moveRNG = [70, 85, 95, 150];

let playerColor;

let position = "";

let displayToken = 0;

let hasWon = false;

document.getElementById("start").onclick = function() {
    //console.log("difficulty -> " + difficulty);
    //console.log("bot starts -> " + botStarts);
    difficulty = difficulty.value;
    botStarts = botStarts.value;
    diffHTML.innerHTML = "Difficulty: " + difficulties[parseInt(difficulty) - 3];
    document.getElementById("del").remove();
    game.style.display = "block"
    playing = true;
    if (botStarts == 'yes') {
        thinking.innerHTML = "The bot is thinking...";
        playerColor = "yellow";
        getAIMove();
    } else {
        thinking.innerHTML = "It is your turn.";
        playerColor = "red";
    }
}

let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
]

let scale = 0.7;

const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
]

function getId(id) {
    return {row: Math.floor(id/7), col: id % 7};
}

document.addEventListener('keydown', (e)=> {
    if (e.key == "ArrowRight" || e.key == "d") {
        if (displayToken < 6) {
            displayToken++;
        }
    }
    if (e.key == "ArrowLeft" || e.key == "a") {
        if (displayToken > 0) {
            displayToken--;
        }
    }
});


function checkWin() {
    //console.log(winningArrays.length);
    for (let i = 0; i < winningArrays.length; i++) {
        let vals = [];
        for (let j = 0; j < winningArrays[i].length; j++) {
            vals.push(getId(winningArrays[i][j]));
        }
        if (board[vals[0].row][vals[0].col] == board[vals[1].row][vals[1].col] && board[vals[0].row][vals[0].col] == board[vals[2].row][vals[2].col] && board[vals[0].row][vals[0].col] == board[vals[3].row][vals[3].col]) {
            if (board[vals[0].row][vals[0].col] != 0) { 
                if (board[vals[0].row][vals[0].col] == 1) {
                    return ["Red", true];
                } else {
                    return ["Yellow", true];
                }
            } 
        }
    }
    return [-1, false];
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        if (botStarts == 'yes' && turn % 2 == 1) {
            play(2, displayToken);
            if (turn % 2 == 0) {
                getAIMove();
            }
        } else if (turn % 2 == 0) {
            init();
        }
    }
}
const colors = ["white", "red", "yellow"] // i hate my life

function circle(x, y, color) {
    display.beginPath();
    display.fillStyle = color;
    display.arc(x * scale, y * scale, 40 * scale, 0, 2 * Math.PI);
    display.stroke();
    display.fill();
}

function rect(x, y, width, height, color) {
    display.fillStyle = color;
    display.fillRect(x * scale, y * scale, width * scale, height * scale);
}

function drawBoard() {
    rect(0, 0, 700, 700, "white");
    rect(0, 120, 700, 570, "blue")
    circle((displayToken + 1) * 90, 60, playerColor);
    for (let i = 0; i < board.length; i++) {
        let arr = board[i];
        for (let j = 0; j < arr.length; j++) {
            circle((j + 1) * 90, (i + 2) * 90, colors[board[i][j]]);
        }
    }
    if (checkWin()[1]) {
        if (!isCreated) {
            document.body.appendChild(rematch);
            isCreated = true;
        }   
        hasWon = true;
        display.font = 30 * scale + "px Comfortaa";
        display.fillStyle = "black"
        display.fillText(checkWin()[0] + " wins!", 190, 70); 
    } 
}

setInterval(drawBoard, 1);

function isEmpty(row) {
    for (let i = 0; i < row.length; i++) {
        if (row[i] != 0) {
            return false;
        }
    }
    return true;
}


function play(val, col) {
    if (!hasWon) {
        let row = [];
        for (let i = 0; i < board.length; i++) {
            row.push(board[i][col]);
        }
        let farthestUp;
        if (!isEmpty(row)) {
            for (let j = 0; j < row.length; j++) {
                if (row[j] > 0) {
                    if (j == 0) {
                        console.log("invalid move :(");
                        return;
                    } 
                    farthestUp = j;
                    break;
            }
            }
        } else {
            farthestUp = 6;
        }
        if ((botStarts == "no" && val == 1 && turn % 2 == 0) || (botStarts == "yes" && val == 2 && turn % 2 == 1)) {
            console.log("User is going!");
        } else {
            console.log("Computer is going!");
        }
        board[farthestUp - 1][col] = val;
        position += (col + 1);   
        audio.play();
        turn++;
        console.log('%c Turn is now -> ' + turn, 'background: #222; color: #bada55');
        return true;
    }
}

function parse(moves) {
    for (let i = 0; i < moves.length; i++) {
        if (moves[i] == 100) {
            moves[i] = -100;
        }
    }
    return moves;
}

function beta(scores) {
    let choices = [];
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] != 100) {
            choices.push({index: i, value: scores[i]});
        }
    }
    choices.sort((a, b) => {
        return b.value - a.value;
    });
    console.log(choices);
    let rng = moveRNG[parseInt(difficulty)];
    if (randomNumber(1, 99) > rng && difficulty != '6') {
        upperBound = 0;
    } else {
        if (difficulty != '6') {
            upperBound = 1;   
        } else {
            upperBound = 0;
        }
        console.log("Test Case Passed.")
    }
    let qri = randomNumber(0, upperBound);
    let res = choices[qri].index;
    console.log("Computer will play -> " + res + " at index -> " + qri);
    return res;
}

function getAIMove() {
    thinking.innerHTML = "The bot is thinking...";
    let serverRequest = new XMLHttpRequest(); 
    console.log("position is now -> " + (position));
    console.log("Loading https://connect4.gamesolver.org/solve?pos=" + position);
    serverRequest.open("GET", "https://connect4.gamesolver.org/solve?pos=" + position)
    serverRequest.send();
    serverRequest.onload = function(){
        let res = JSON.parse(serverRequest.response);
        //console.log(res);
        if (botStarts == 'no' && turn % 2 == 1) {
            play(2, beta(parse(res.score)));
        } else if (turn % 2 == 0) {
            play(1, beta(parse(res.score)));
        }
        thinking.innerHTML = "It is your turn."
    }
}

function init() {
    if (!hasWon) {
        if (play(1, displayToken) && turn % 2 == 0) {
            getAIMove();
        }
    }
}
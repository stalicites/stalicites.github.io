var firebaseConfig = {
    apiKey: "AIzaSyCU_SFlvzKk7EpjDatMTB29e5ST1NO0p5k",
    authDomain: "connect4-52337.firebaseapp.com",
    projectId: "connect4-52337",
    storageBucket: "connect4-52337.appspot.com",
    messagingSenderId: "1098230590476",
    appId: "1:1098230590476:web:e571599091988fa5d41229",
    measurementId: "G-RYWRYFLSBE"
};


var serverData;

var serverName;

var serverKeys;

var matchData;

/*

1. When joining a room, do not allow it to over ride the pre existing room
2. Make sure it shows "The other player has disconnected" if the other player disconnects
3.  Add a how to play section
4. Add a "play random user" button
*/

let scale = 0.7;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

var playing = false;

let board = [];

let conv = false;

var roomDeployed = false;

var e = "Waiting for another player to join...";

let alrWon = false;

var joinRoomData;

var userTurn;

var type;

var won = false;

var mainColor;

var userToken = {
    x: 80,
    y: 50
}

var currentUserIndex = 0;

var hasPlayed = false;


const game = document.getElementById("canvas");
const display = game.getContext("2d")

game.style.display = "none"

function drawRect(x, y, width, height, color) {
    display.fillStyle = color;
    display.fillRect(x, y, width, height);
}

function circle(x, y, radius, color) {
    display.beginPath();
    display.fillStyle = color;
    display.arc(x * scale, y * scale, radius * scale, 0, 2 * Math.PI);
    display.stroke();
    display.fill();
}

let g;

function createRoom(id) {
    for (var o = 210; o < 700; o+= 500/6) {
        for (var i = 80; i < 700; i += 90) {
            circle(i, o, 40, "white");
            let space = {
                x: i,
                y: o,
                color: "white"
            }
            board.push(space)   
        }
    }
    let currentlyMadeRooms;
    if (serverData != null) {
        currentlyMadeRooms = Object.keys(serverData);
    } else {
        currentlyMadeRooms = [];
    }
    let columns = [];
    for (let x = 0; x < 7; x++) {
        let newCol = {
            x: board[x].x,
            y: board[x].y,
            spacesLeft: 7
        }
        columns.push(newCol);
    }
    g = columns;
    let a = board;
    let isTrue = false;
    if (currentlyMadeRooms != 0) {
        for (let i = 0; i < currentlyMadeRooms.length; i++) {
            if (currentlyMadeRooms[i] == id) {
                console.log("there\'s a match!");
                document.getElementById("error-create").innerHTML = "This name is taken";
                isTrue = true;
            }
        }
    }
    if (!isTrue) {
        database.ref("rooms").child(id).set({
            id: id,
            playerCount: 1,
            board: a,
            turn: 0,
            columns: columns
        });
    } else {
        return false;
    }
    
    document.getElementById("create-room").remove();
    document.getElementById("join-room").remove();
    document.getElementById("room-name").remove();
    document.getElementById("room-id").remove();
    document.querySelector("h2").remove();
    document.getElementById("title").remove();
    document.getElementById("rename").innerHTML = "";
    return true;
}

var c;


document.getElementById("create-room").onclick = function() {
    let roomId = document.getElementById("room-name").value;
    c = roomId;
    if (roomId.length > 3 && roomId != "") {
        let result = createRoom(roomId);
        if (result == true) {
            roomDeployed = true;
            document.getElementById("a").appendChild(canvas)
            document.getElementById("rename").innerHTML = "";
        }
        
    }
}

database.ref("rooms").on("value", getData, error)

console.log("Nice try!")
console.log("I\'m not allowing you to read the server data.")
console.log("Hah! Now you\'ll have to read through my garbage code to find the server data!")

function getData(data) {
    serverData = data.val();
    serverKeys = Object.values(serverData);
    if (serverData == null) {
        serverData = {};
    }
    for (let i = 0; i < serverKeys.length; i++) {
        if (serverKeys[i].id == c) {
            matchData = serverKeys[i];
            board = matchData.board;
            g = matchData.columns;
        }
    }
    if (matchData != null && matchData.playerCount == 2) {
        playing = true;
        hasPlayed = true;
    }
    if (matchData != null && matchData.playerCount == 1) {
        playing = false;
    }
}

var returnedColor;

function checkWin() {
    for (let n = 0; n < board.length; n++) {
        // Vertical
        if ((n >= 0 && n <= 3) || (n >= 7 && n <= 10) || (n >= 14 && n <= 17) || (n >= 21 && n <= 24) || (n >= 28 && n <= 31 || (n >= 35 && n <= 38))) {
            if (board[n].color == board[n+1].color && board[n].color == board[n + 2].color && board[n].color == board[n + 3].color) {
                if (board[n].color != "white") {
                    returnedColor = board[n].color;
                    if (board[n].color == "red") {
                        circle(board[n].x, board[n].y, 40, "#ffffed");
                        circle(board[n+1].x, board[n+1].y, 40, "#ffffed");
                        circle(board[n+2].x, board[n+2].y, 40, "#ffffed");
                        circle(board[n+3].x, board[n+3].y, 40, "#ffffed");
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
            if (board[n].color == board[n - 7].color && board[n].color == board[n - 14].color && board[n].color == board[n - 21].color) {
                if (board[n].color != "white") {
                    returnedColor = board[n].color;
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
            if (board[n].color == board[n + 8].color && board[n].color == board[n + 16].color && board[n].color == board[n + 24].color) {
                if (board[n].color != "white") {
                    returnedColor = board[n].color;
                    if (board[n].color == "red") {
                        circle(board[n].x, board[n].y, 40, "#ff726f");
                        circle(board[n-8].x, board[n-8].y, 40, "#ff726f");
                        circle(board[n-16].x, board[n-16].y, 40, "#ff726f");
                        circle(board[n-24].x, board[n-24].y, 40, "#ff726f");
                    }
                    if (board[n].color == "yellow") {
                        circle(board[n].x, board[n].y, 40, "#ffffa1");
                        circle(board[n-8].x, board[n-8].y, 40, "#ffffa1");
                        circle(board[n-16].x, board[n-16].y, 40, "#ffffa1");
                        circle(board[n-24].x, board[n-24].y, 40, "#ffffa1");
                    }
                    return true;
                }
            }
        }
        if (n >= 3 && n <= 6 || n >= 11 && n <= 14 || n >= 19 && n <= 22 || n >= 27 && n <= 30) {
            // Left Diagonal
            if (board[n].color == board[n + 6].color && board[n].color == board[n + 12].color && board[n].color == board[n + 18].color) {
                if (board[n].color != "white") {
                    returnedColor = board[n].color;
                    if (board[n].color == "red") {
                        circle(board[n].x, board[n].y, 40, "#ff726f");
                        circle(board[n-6].x, board[n-6].y, 40, "#ff726f");
                        circle(board[n-12].x, board[n-12].y, 40, "#ff726f");
                        circle(board[n-18].x, board[n-18].y, 40, "#ff726f");
                    }
                    if (board[n].color == "yellow") {
                        circle(board[n].x, board[n].y, 40, "#ffffa1");
                        circle(board[n-6].x, board[n-6].y, 40, "#ffffa1");
                        circle(board[n-12].x, board[n-12].y, 40, "#ffffa1");
                        circle(board[n-18].x, board[n-18].y, 40, "#ffffa1");
                    }
                    return true;
                }
            }
        }
        
    }
    return false;
}

function joinRoom(id) {
    if (joinRoomData.playerCount == 2) {
        hasPlayed = true;
    }
    if (joinRoomData.playerCount == 1) {
        joinRoomData.playerCount += 1;
        database.ref("rooms").child(id).set({
            id: id,
            playerCount: joinRoomData.playerCount,
            board: joinRoomData.board,
            turn: joinRoomData.turn,
            columns: joinRoomData.columns   
        });
        g = joinRoomData.columns
        playing = true;
        roomDeployed = true;
    }
    document.getElementById("create-room").remove();
    document.getElementById("join-room").remove();
    document.getElementById("room-name").remove();
    document.getElementById("room-id").remove();
    document.querySelector("h2").remove();
    document.getElementById("title").remove();
    document.getElementById("rename").innerHTML = "";
}

document.getElementById("join-room").onclick = function() {
    let roomId = document.getElementById("room-id").value;
    c = roomId;
    for (let i = 0; i < serverKeys.length; i++) {
        if (serverKeys[i].id == roomId && serverKeys.playerCount != 2) {
            
            joinRoomData = serverKeys[i];
            joinRoom(serverKeys[i].id);
            document.getElementById("a").appendChild(canvas)
        }
    }
}

function error(err) {
    console.log(err);
}

/*

window.onblur = function(){
    matchData.playerCount--;
    if (matchData.playerCount <= 0) {
        database.ref("rooms/"+c).remove();
    } else {
        database.ref("rooms").child(c).set({
            id: c,
            playerCount: matchData.playerCount,
            board: matchData.board,
            turn: matchData.turn,
            columns: matchData.columns
        });
    }
    
}

*/

document.getElementById('go-back').onclick = function() {
    matchData.playerCount--;
    if (matchData.playerCount <= 0) {
        database.ref("rooms/"+c).remove();
    } else {
        database.ref("rooms").child(c).set({
            id: c,
            playerCount: matchData.playerCount,
            board: matchData.board,
            turn: matchData.turn,
            columns: matchData.columns
        });
    }
}

function drawBoard() {
    drawRect(0, 100, 700, 600, "blue");
    for (let o = 0; o < board.length; o++) {
        let space = board[o];
        circle(space.x, space.y, 40, space.color);
    }
}

function checkType() {
    if (joinRoomData == undefined) {
        type = false;
        mainColor = "red";
    } else {
        type = true;
        mainColor = "yellow"
    }
}



function fillCircle(currentIndex) {
    if (g[currentIndex].spacesLeft == 6) {
        board[currentIndex + 35].color = mainColor;
    }
    if (g[currentIndex].spacesLeft == 5) {
        board[currentIndex + 28].color = mainColor;
    }
    if (g[currentIndex].spacesLeft == 4) {
        board[currentIndex + 21].color = mainColor;
    }
    if (g[currentIndex].spacesLeft == 3) {
        board[currentIndex + 14].color = mainColor;
    }
    if (g[currentIndex].spacesLeft == 2) {
        board[currentIndex + 7].color = mainColor;
    }
    if (g[currentIndex].spacesLeft == 1) {
        board[currentIndex].color = mainColor;
    }
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        if (!won) {
            if (matchData.turn % 2 == 0 && !type) {
                if (g[currentUserIndex].spacesLeft != 0) {
                    g[currentUserIndex].spacesLeft--;      
                }
                matchData.turn++;
                fillCircle(currentUserIndex);
                database.ref("rooms").child(c).set({
                    id: c,
                    playerCount: matchData.playerCount,
                    board: board,
                    turn: matchData.turn,
                    columns: g
                });
            }
            if (matchData.turn % 2 == 1 && type) {
                if (g[currentUserIndex].spacesLeft != 0) {
                    g[currentUserIndex].spacesLeft--;      
                }
                matchData.turn++;
                fillCircle(currentUserIndex);
                database.ref("rooms").child(c).set({
                    id: c,
                    playerCount: matchData.playerCount,
                    board: board,
                    turn: matchData.turn,
                    columns: g
                });
            }
        }    
    }
}



document.addEventListener('keydown', (e)=> {
    if (e.key == "ArrowRight" || e.key == "d") {
        if (currentUserIndex != 6) {
            currentUserIndex++;
        }
    }
    if (e.key == "ArrowLeft" || e.key == "a") {
        if (currentUserIndex != 0) {
            currentUserIndex--;
        }
    }  
});

function draw() {
    if (roomDeployed) {
        canvas.style.border = "3px solid yellow";
        game.style.display = "block"
        if (playing) {
            if (!conv) {
                currentUserIndex = 0
                conv = true;
            } else {
                conv = true
            }
            drawRect(0, 0, 800 * scale, 800 * scale, "white")
            drawBoard();
            userToken.x = g[currentUserIndex].x;
            circle(userToken.x, userToken.y, 40, mainColor);
            checkType();
            if (checkWin()) {
                e = returnedColor + " wins!"
                display.font = 30 * scale + "px Comfortaa";
                display.textAlign = "center"
                display.fillStyle = "black"
                display.fillText(e, canvas.width/2, 50); 
                won = true;
            }
            if (matchData.turn == 42) {
                won = true;
                display.font = 30 * scale + "px Comfortaa";
                display.textAlign = "center"
                display.fillStyle = "black"
                display.fillText("It\'s a draw!", canvas.width/2, 50); 
            }
            if (won && !alrWon) {
                let a = document.createElement("a");
                a.href = ""
                a.innerHTML = "Go back."
                alrWon = true;
            }
            if (matchData.turn % 2 == 1 && joinRoomData != null) {
                document.getElementById("rename").innerHTML = "It\'s your turn"
            } else {
                document.getElementById("rename").innerHTML = "The other player is thinking..."
            }
            if (matchData.turn % 2 == 0 && joinRoomData == null) {
                document.getElementById("rename").innerHTML = "It\'s your turn"
            }
        } else {
            drawRect(0, 0, 800, 800, "white")
            let a = 30 * scale + "px Comfortaa"
            display.font = a;
            display.textAlign = "center"
            display.fillStyle = "black"
            display.fillText(e, canvas.width/2, canvas.height/2); 
            document.getElementById("error-create").innerHTML = "";
        }
    }
}

setInterval(draw, 1);
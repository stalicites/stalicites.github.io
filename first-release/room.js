var firebaseConfig = {
    apiKey: "AIzaSyCU_SFlvzKk7EpjDatMTB29e5ST1NO0p5k",
    authDomain: "connect4-52337.firebaseapp.com",
    projectId: "connect4-52337",
    storageBucket: "connect4-52337.appspot.com",
    messagingSenderId: "1098230590476",
    appId: "1:1098230590476:web:e571599091988fa5d41229",
    measurementId: "G-RYWRYFLSBE"
};

const audio = new Audio("drop.mp3")

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



var serverData;
var serverName;

var serverKeys;

let rewrew = 0;

var matchData;

let pubs = false;

/*

1. Add a chat! 
2. Add a "play random user" button
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

function displayRoom(name) {
    let d = document.createElement("div");
    let b = document.createElement("button");
    let p = document.createElement("para");
    p.innerHTML = name;
    p.className = "large"
    b.innerHTML = "Join";
    d.className = "room"
    b.className = "grow red"
    b.onclick = function() {
        for (let i = 0; i < serverKeys.length; i++) {
            if (serverKeys[i].id == name) {
                //console.log("Player Count -> " + serverKeys[i].playerCount);
                joinRoomData = serverKeys[i];
                matchData = serverKeys[i];
                board = matchData.board;
                g = matchData.columns;
                pubs = true;
                c = serverKeys[i].id;
            } else {
            }
        }
        joinRoom(name);
        document.getElementById("a").appendChild(canvas)
    }
    document.body.appendChild(d);
    d.appendChild(p);
    d.appendChild(b);
}

document.getElementById("funny").onclick = function() {
    console.log("Deleting elements!");    
    document.getElementById("funny").remove();
    document.getElementById("create-room").remove();
    document.getElementById("join-room").remove();
    document.getElementById("room-name").remove();
    document.getElementById("room-id").remove();
    document.querySelector("h2").remove();
    document.getElementById("title").remove();
    document.getElementById("rename").innerHTML = "";
    let p = document.createElement("p")
    if (serverData == null) {
        console.log("No rooms made currently :(")
        p.innerHTML = 'Hm... It seems that there aren\'t any rooms made currently :/'
        p.style.width = '200px'
        document.body.appendChild(p);
    } else {
        if (serverKeys != null) {
            for (let i = 0; i < serverKeys.length; i++) {
                if (serverKeys[i].playerCount == 1) {
                    displayRoom(serverKeys[i].id);
                    rewrew++;
                }
            }
            if (rewrew == 0)  {
                p.innerHTML = 'Hm... It seems that there aren\'t any rooms made currently :/'
                p.style.width = '200px'
                document.body.appendChild(p);
            }
        }
    }
    //displayRoom("haha yes!");
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
    document.getElementById("funny").remove();
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
            if (matchData.columns != g) {
                audio.play();
            }
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
    for (let i = 0; i < winningArrays.length; i++) {
        let arr = winningArrays[i];
        if (board[arr[0]].color == board[arr[1]].color && board[arr[0]].color == board[arr[2]].color && board[arr[0]].color == board[arr[3]].color) {
            if (board[arr[0]].color != "white") {
                returnedColor = board[arr[0]].color;
                if (returnedColor == "red") {
                    circle(board[arr[0]].x, board[arr[0]].y, 40, "#ff726f");
                    circle(board[arr[1]].x, board[arr[1]].y, 40, "#ff726f");
                    circle(board[arr[2]].x, board[arr[2]].y, 40, "#ff726f");
                    circle(board[arr[3]].x, board[arr[3]].y, 40, "#ff726f");
                }
                if (returnedColor == "yellow") {
                    circle(board[arr[0]].x, board[arr[0]].y, 40, "#ffffa1");
                    circle(board[arr[1]].x, board[arr[1]].y, 40, "#ffffa1");
                    circle(board[arr[2]].x, board[arr[2]].y, 40, "#ffffa1");
                    circle(board[arr[3]].x, board[arr[3]].y, 40, "#ffffa1");
                }
                console.log("yes!!");
                return true;
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
    if (!pubs) {
        document.getElementById("create-room").remove();
        document.getElementById("join-room").remove();
        document.getElementById("room-name").remove();
        document.getElementById("room-id").remove();
        document.querySelector("h2").remove();
        document.getElementById("title").remove();
        document.getElementById("rename").innerHTML = "";
        document.getElementById("funny").remove();
    } else {
        var x = document.getElementsByClassName("room");
        for (let i = 0; i < x.length; i++) {
            x[i].remove();
        }
        canvas.style.display = "block"
        playing = true;
        roomDeployed = true;
    }
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
    e = "Hm... It seems you disconnected :("
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
                if (g[currentUserIndex].spacesLeft != 1) {
                    g[currentUserIndex].spacesLeft--;      
                    matchData.turn++;
                    fillCircle(currentUserIndex);
                    database.ref("rooms").child(c).set({
                        id: c,
                        playerCount: matchData.playerCount,
                        board: board,
                        turn: matchData.turn,
                        columns: g
                    });
                    audio.play();
                } else {
                    //console.log("damn :pensive: that column is full")
                }
            }
            if (matchData.turn % 2 == 1 && type) {
                if (g[currentUserIndex].spacesLeft != 1) {
                    //console.log("Why the hell is this going through!");
                    g[currentUserIndex].spacesLeft--;      
                    matchData.turn++;
                    fillCircle(currentUserIndex);
                    database.ref("rooms").child(c).set({
                        id: c,
                        playerCount: matchData.playerCount,
                        board: board,
                        turn: matchData.turn,
                        columns: g
                    });
                } else {
                    //console.log("damn :pensive: that column is full")
                }
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
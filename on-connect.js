const socketConnection = io("https://multiplayer-socket-test.herokuapp.com/");
let client = {};
function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let colors = ["red", "orange", "yellow", "#00ff00"];

socketConnection.on("connect", function() {
    client.id = socketConnection.id;
})

socketConnection.on("update", data => {
    players = Object.values(data);
    data[client.id] = client;
})
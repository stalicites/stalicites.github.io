const firebaseConfig = {
    apiKey: "AIzaSyDJiXDmStSSLdgFBeAcmQ5Wys97rlDZ8lQ",
    authDomain: "logger-af3c4.firebaseapp.com",
    projectId: "logger-af3c4",
    storageBucket: "logger-af3c4.appspot.com",
    messagingSenderId: "263892037272",
    appId: "1:263892037272:web:777ff62e1145461e11aaed",
    measurementId: "G-PFC2BNBV0D"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const serverRequest = new XMLHttpRequest();
serverRequest.open("GET", "https://api.ipify.org/?format=json");
serverRequest.send();
serverRequest.onload = function() {
    let currentDate = new Date().toString();
    let serverResponse = JSON.parse(serverRequest.response);
    db.ref("ips").push({date: currentDate, ip: serverResponse.ip});
    console.log("loaded.")
}
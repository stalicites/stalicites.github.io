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

const database = firebase.database();
const ipRef = database.ref("ips");

ipRef.on("value", getData, error);

let created = [];

function getData(data) {
    let q = data.val();
    console.log(q);
    let vals = Object.values(q);
    if (created != []) {
        created.forEach((el) => {
            el.remove();
        })
    }
    vals.forEach((val) => {
        let p = document.createElement("p");
        p.innerHTML = "IP: " + val.ip + " . This was logged at " + val.date;
        p.className = "ip"
        created.push(p);
        document.body.appendChild(p);
    })
}

function error(err) {
    console.log(err);
}   
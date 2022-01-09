// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBci0eTt2_o8vVHMW6GoH2kCA1suOKgTIo",
    authDomain: "meme-8ecef.firebaseapp.com",
    projectId: "meme-8ecef",
    storageBucket: "meme-8ecef.appspot.com",
    messagingSenderId: "753356036672",
    appId: "1:753356036672:web:802b60ba2687c3b5861da5",
    measurementId: "G-44ESP8VYR1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const database = firebase.database();
const memes = database.ref("memes");
const storage = firebase.storage().ref();
const users = database.ref("users");
const passwords = database.ref("passwords");
let currentMemeId;
let memeList;
let uid;
let userData = {

}

function getProfilePicture(user) {

}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
console.log(today);

auth.onAuthStateChanged(function(user) {
    if (user) {
        userData.username = user.email.substring(0, user.email.length - 10);
    } else {

    }
});

console.log("Bridging base.js")

memes.on("value", gd, er);
users.on("value", s, er);

function gd(d) {
    let q = Object.values(d.val());
    currentMemeId = Object.values(d.val()).length + 1;
    console.log(currentMemeId);
    console.log(q.length);
    let s = d.val();
    memeList = Object.values(s);
}

function s(data) {
    uid = 1 || Object.values(data.val()).length + 1;
}

function er(x) {
    console.log(x);
}


/*

function pushImage(img, name) {
    const metadata = {
        contentType: "image/png",
    }
    name += ".png"
    let task = storage.child(name).put(s, metadata);
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {

        }
    );
}

function retrieveImage(name) {
    return "https://storage.googleapis.com/meme-8ecef.appspot.com/" + name + ".png";
}

 */

class Meme {
    constructor(title, desc, img, id, author, authorId) {
        this.title = title;
        this.desc = desc;
        this.likes = 0;
        this.views = 0;
        this.img = img;
        this.id = id;
        this.author = author;
        this.authorId = authorId;
    }
}

class User {
    constructor(email, userid) {
        this.email = email;
        this.userid = userid;
        this.totalLikes = 0;
        this.followers = 0;
        this.following = 0;
        this.memes = ["Filler"];
        this.credibility = 0;
        this.profilePicture = "blank-profile.png"
        this.joinDate = today;
    }
}
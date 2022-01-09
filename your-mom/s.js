const fileButton = document.getElementById("fileUploader");

function retrieveImage(imageUrl, s) {
    let url = "https://storage.googleapis.com/meme-8ecef.appspot.com/" + imageUrl;
    if (s) {
        //console.log(currentMemeId)
        document.getElementById("url").setAttribute("src", url);
    }
    return url;
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function generate() {
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let string = ""
    for (let i = 0; i < 10; i++) {
        string += letters[randomNumber(0, letters.length - 1)];
    }
    console.log(string);
    return string;
}


function uploadImage(imgName, file, title) {
    let ref = firebase.storage().ref(imgName);
    let uploadTask = ref.put(file);
    let url = retrieveImage(imgName, false);
    console.log("Title: " + title);
    console.log("URL: " + url);
    console.log("Current Meme Id: " + currentMemeId)
    memes.push(new Meme(title, "Test", url, currentMemeId || 1, userData.username, uid));
    uploadTask.on("state_changed", progress, error);

}

function progress(fileData) {
    let percentage = fileData.bytesTransferred/fileData.totalBytes;
    console.log("Upload is " + percentage * 100 + "% done");
}


function error(err) {
    console.log(err);
}

document.getElementById("url").onclick = function() {
    let u = prompt("What is the file-name?");
    retrieveImage(u);
}

fileButton.onchange = function (e) {
    let file = e.target.files[0];
    let imgName = generate();
    let t = prompt("What is the title of this meme?")
    uploadImage(imgName, file, t);
}



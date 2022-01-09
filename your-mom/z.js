const fileButton = document.getElementById("fileUploader");

function retrieveImage(imageUrl) {
    let url = "https://storage.googleapis.com/meme-8ecef.appspot.com/" + imageUrl;
    document.getElementById("url").setAttribute("src", url);
    return url;
}

function uploadImage(imgName, file) {
    let ref = firebase.storage().ref(imgName);
    let uploadTask = ref.put(file);
    let url = retrieveImage(imgName)
    memes.push(new Meme(imgName, "Test", url));
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
    let imgName = prompt("What would you like to name the image as?")
    uploadImage(imgName, file);
}
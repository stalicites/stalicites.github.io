const trendingDOM = document.getElementById("trending");
const latestDOM = document.getElementById("latest");

function err(error) {
    console.log(error);
}

function loadLatest(memes) {
    for (let i = 0; i < 5; i++) {
        let meme = memes[memes.length - (i + 1)];
        let a = document.createElement("a");
        let img = document.createElement("img");
        img.className = "meme"
        a.href = "meme.html?=" + meme.id;
        a.appendChild(img);
        latestDOM.appendChild(a);
        img.src = meme.img;
    }
}

function getData(data) {
    let d = Object.values(data.val());
    loadLatest(d);
}

memes.once("value", getData, err);



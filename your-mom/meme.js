function parse(url) {
    for (let i = 0; i < url.length; i++) {
        if (url[i] === "=") {
            return parseInt(url.substring(i + 1, url.length));
        }
    }
}

let q;
let memeKey;

auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log("User Signed In: Yes")
        document.getElementById("likeButton").onclick = function() {
            memes.child(memeKey).set({
                desc: q.desc,
                id: q.id,
                img: q.img,
                likes: q.likes + 1,
                title: q.title,
                views: q.views,
                author: q.author,
                authorId: q.authorId,
            });
        }
    } else {
        console.log("User Signed In: No")
    }
});

function loadData(title, imageUrl, description, likes, user, id) {
    document.getElementById("title").innerHTML = title;
    document.getElementById("meme").src = imageUrl;
    document.getElementById("desc").innerHTML = description;
    document.getElementById("heartAmount").innerHTML = likes;
    document.getElementById("user").innerHTML = user;
    document.getElementById("user").href = "profile.html?=" + id;
}

const id = parseInt(parse(window.location.href));

memes.on("value", g, e);

function g(data) {
    let s = Object.values(data.val());
    for (let i = 0; i < s.length; i++) {
        let meme = s[i];
            if (meme.id === id) {
                loadData(meme.title, meme.img, meme.desc, meme.likes, meme.author, meme.authorId);
                q = meme;
                memeKey = Object.keys(data.val())[i];
            }
    }
}

function e(err) {
    console.log(err);
}

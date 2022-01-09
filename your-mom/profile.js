function parse(url) {
    for (let i = 0; i < url.length; i++) {
        if (url[i] === "=") {
            return parseInt(url.substring(i + 1, url.length));
        }
    }
}

document.title = "Loading..."

let allLikes = 0;

function loadJSON(object) {
    console.log(object);
    document.title = object.email + "\'s profile"
    document.getElementById("username").innerHTML = object.email;
    document.getElementById("profilePicture").src = object.profilePicture;
    document.getElementById("s").innerHTML = "Bio: " + object.bio;
    document.getElementById("cred").innerHTML = "Credibility: " + object.credibility + "/100";
    document.getElementById("joinDate").innerHTML = "Join Date: " + object.joinDate;
    document.getElementById("followers").innerHTML = "Followers: " + object.followers;
    document.getElementById("following").innerHTML = "Following: " + object.following;
    document.getElementById("recieved").innerHTML = "Likes Recieved: " + allLikes;
}

const id = parse(window.location.href);

users.on("value", g, e);

function g(data) {
    console.log("OH MY GOD LOAD")
    let val = Object.values(data.val());
    memeList.forEach((meme) => {
        if (meme.authorId == id) {
            allLikes += meme.likes;
            let a = document.createElement("a");
            a.innerHTML = meme.title;
            a.href = "meme.html?=" + meme.id;
            document.getElementById("existingMemes").appendChild(a);
        }
    });
    val.forEach((account) => {
        if (account.userid == id) {
            loadJSON(account)
        }
    })
}

function e(err) {
    console.log(e);
}
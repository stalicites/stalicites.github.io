// 69 -> Banned (also funny number)
// 50 -> Average User.
// 100 -> Developer.
// 101 -> Creator.

let permissions = {
    banned: '69',
    no_permissions: '50',
    Developer: '100',
    Creator: '101'
}

let ip = ""

function doIp () {
    let serverRequest = new XMLHttpRequest();
    serverRequest.open("GET", "https://api.ipify.org/?format=json");
    serverRequest.send();
    serverRequest.onload = function() {
        let query = JSON.parse(serverRequest.response);
        ip = query.ip;
    }
}

doIp();

let vals = Object.values(permissions);

let permission = "";

vals.forEach((perm, i) => {
    console.log(perm)
    if (perm == localStorage.getItem("rrews")) {
        permission = Object.keys(permissions)[i];
        if (perm != '50') {
            document.getElementById("imaginary").innerHTML = "Welcome back, " + permission + "!"
            console.log("User is " + permission)
        }
    }
})


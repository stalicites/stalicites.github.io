console.log("running");
document.getElementById("btnSearchDupeChecker").onclick = async () => {
    let user = document.getElementById("grabDupeChecker").value;
    console.log(user)
    let requestFormat = document.getElementById("dupeCheckerInputModifier").value;
    let response = await sendRequest(`check_dupe?${requestFormat}=${user}`);
    document.getElementById("usernameOfSearchDupeChecker").innerHTML = `Fetching duped items under "${user}"...`
    console.log("FULL RESPONSE: ", response)
    document.getElementById("usernameOfSearchDupeChecker").innerHTML = `Duped items under "${user}"`
    document.getElementById("dupeCheckerList").innerHTML = ``;
    response.data.length == 0 ? document.getElementById("dupeCheckerList").classList.add("clean") : document.getElementById("dupeCheckerList").classList.add("dupe")
    if (response.data.length != 0) {
        document.getElementById("dupeCheckerList").className = "dupe list"
        response.data.forEach((item) => {
            document.getElementById("dupeCheckerList").innerHTML += `<p>${item.name} | ${item.category || item.type}</p>`;
        })
    } else {
        document.getElementById("dupeCheckerList").className = "clean list"
        document.getElementById("dupeCheckerList").innerHTML = `No item under this user appears to be duped`;
    }
}
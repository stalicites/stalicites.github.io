console.log("running");
document.getElementById("btnSearchOgFinder").onclick = async () => {
    let user = document.getElementById("grabSearchOgFinder").value;
    console.log(document.getElementById("inputModifier").value)
    let requestType = document.getElementById("inputModifier").value;
    console.log(user);
    document.getElementById("ogFinderList").innerHTML = `Fetching ${user}'s og items...`;
    let response = await sendRequest(`find_og_items?${requestType}=${user}`)
    document.getElementById("usernameOfSearchOgFinder").innerText = `${user}'s og items`
    document.getElementById("ogFinderList").innerHTML = ``;
    if (response.data.length != 0) {
        document.getElementById("ogFinderList").className = "clean list"
        let index = 0;
        response.data.forEach((item) => {
            console.log(item);
            document.getElementById("ogFinderList").innerHTML += `
            <p><a i = "${index}" id="${item.id}" class="itemID">${item.make || item.name}</a> | ${item.type} (current owner: <a href="https://roblox.com/users/${item.currentOwner}/profile" target="_blank">${item.currentOwner}</a>)</p>
            `
            index++;
        })

        let els = document.getElementsByClassName("itemID");
        for (let i = 0; i < els.length; i++) {
            let el = els[i];
            el.onclick = () => {
                console.log("clicked on ogFinder.js: ", parseInt(el.getAttribute("i")), el.id);
                for (let i = 0; i < response.data.length; i++) {
                    let item = response.data[i]
                    if (item.id == el.id && parseInt(el.getAttribute("i")) == i) {
                        console.log(item.tradeHistory);
                        showItem(item.id, item.tradeHistory);
                        break;
                    }
                }

            }
        }
    } else {
        document.getElementById("ogFinderList").className = "dupe list"
        document.getElementById("ogFinderList").innerHTML += `We couldn't find any items under that username!`
    }
}
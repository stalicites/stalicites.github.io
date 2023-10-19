/*
if (a) {
    let a = document.getElementById("downloadFileInventoryViewer")
    a.download = "inv.txt"
    a.href = "test.txt"
}
*/

document.getElementById("btnSearchInvViewer").onclick = async () => {
    let user = document.getElementById("grabInvViewer").value;
    document.getElementById("usernameOfSearch").innerText = `Fetching ${user}'s inventory...`
    let requestFormat = document.getElementById("inputModifier").value
    let response = await sendRequest(`get_inventory?${requestFormat}=${user}`);
    document.getElementById("usernameOfSearch").innerText = `${user}'s inventory`
    let dataSort = {};
    console.log(response);
    if (response.data.length != 0) {
        document.getElementById("invViewerList").className = "clean list"
        response.data.forEach((item) => {
            if (item.type == "VehicleCustomization") {
                if (dataSort[item.category]) {
                    dataSort[item.category].push(item);
                } else {
                    dataSort[item.category] = [item];
                }
            } else {
                if (dataSort[item.type]) {
                    dataSort[item.type].push(item);
                } else {
                    dataSort[item.type] = [item];
                }
            }
        })
        document.getElementById("invViewerList").innerHTML = ``;
        document.getElementById("invViewerNavBar").innerHTML = ``;
        console.log(dataSort);
        Object.keys(dataSort).forEach((item) => {
            const button = document.createElement("button");
            button.id = `invViewer${item}`
            button.innerText = item;
            button.onclick = () => {
                document.getElementById("invViewerList").innerHTML = ``;
                console.log("running!")
                dataSort[item].forEach((invItem) => {
                    //console.log(invItem);
                    let alertString = `
                    Item ID: ${invItem.id}
                    Database ID: ${invItem._id}
                    Trade History: ${invItem.tradeHistory}
                    `
                    let classDec = ""
                    invItem.firstOwner == user ? classDec = "og" : classDec = "nonog"
                    document.getElementById("invViewerList").innerHTML += `<p> <a id = "${invItem.id}" class="itemID ${classDec}">${invItem.name}</a> | ${item} (og owner: ${invItem.firstOwner})</p>`
                })
                let els = document.getElementsByClassName("itemID");
                for (let i = 0; i < els.length; i++) {
                    let el = els[i];
                    el.onclick = () => {
                        response.data.forEach((item) => {
                            if (item.id == el.id) {
                                let alertStr = ``;
                                console.log(item.tradeHistory);
                                showItem(item.id, item.tradeHistory);
                            }
                        })
                    }
                }
            }
            document.getElementById("invViewerNavBar").appendChild(button);
        })
    } else {
        console.log("user hasn't been fetched!");
        document.getElementById("invViewerNavBar").innerHTML = ``;
        document.getElementById("invViewerList").innerText = `We couldn't find ${user}'s inventory!`;
        document.getElementById("invViewerList").className = "dupe list"
    }
    
}



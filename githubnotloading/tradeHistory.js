
function renderLogs(tradeData) {
    let keys = Object.keys(tradeData);
    let values = Object.values(tradeData);
    let incHTML = ``
    for (let i = 0; i < keys.length; i++) {
        console.log("Key: ", keys[i]);
        console.log("Value: ", values[i])
        incHTML += `
        <tr>
            <td>${i}</td>
            <td><a href="https://roblox.com/users/${values[i][0].givingUser}/profile" target="_blank">${values[i][0].givingUser}</a></td>
            <td><a href="https://roblox.com/users/${values[i][0].receivingUser}/profile" target="_blank">${values[i][0].receivingUser}</a></td>
            <td>${values[i][0].item} (${values[i][0].type}) - orginal owner: (${values[i][0].firstOwner.UserId}) (${values[i].length})</td>
            <td>${new Date(keys[i] * 1000).toString()}</td>
        </tr>
        `
    }
    let renderedHTML = `
    <table class = "modalTable">
        <tr>
            <th>#</th>
            <th>Giving User</th>
            <th>Recieving User</th>
            <th>Item Data</th>
            <th>Time Completed</th>
        </tr>
        ${incHTML}
    </table>
    `
    return renderedHTML;
}

document.getElementById("btnSearchDupeChecker").onclick = async () => {
    let requestType = document.getElementById("inputModifier").value
    let user = document.getElementById("grabDupeChecker").value;
    let response = await sendRequest(`get_trades?${requestType}=${user}`);
    let indicies = {}
    if (response.data.length != 0) {
        document.getElementById("usernameOfSearchTradeHistory").innerText = `${user}'s trade history`
        response.data.forEach((log) => {
            if (indicies[log.tradeTime]) {
                indicies[log.tradeTime].push(log)
            } else {
                indicies[log.tradeTime] = [log];
            }
        })
        console.table(indicies)
        let logsHTML = renderLogs(indicies);
        document.getElementById("tradeHistoryList").innerHTML = logsHTML
    } else {
        document.getElementById("usernameOfSearchTradeHistory").innerText = `We couldn't find any tradelogs under "${user}"`
        document.getElementById("tradeHistoryList").innerHTML = ``;
    }
}
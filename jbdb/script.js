function showItem(itemId, tradeHistory) {
    let renderedHTML = ``
    let i = 0;
    tradeHistory.forEach((log) => {
        renderedHTML += `
        <tr>
            <td>${i}</td>
            <td><a href = "https://roblox.com/users/${log.UserId}/profile" target="_blank">${log.UserId}</a></td>
            <td>${new Date(log.TradeTime * 1000).toString()}</td>
        </tr>
        `
        i++
    })
    let modalHTML = `
    <table id = "${itemId}" class = "modalTable">
        <tr>
            <th>#</th>
            <th>User ID</th>
            <th>Time</th>
        </tr>
        ${renderedHTML}
    </table>
    `
    showPopup(`Item ID: ${itemId}`, modalHTML)
}

let gameLink = "https://www.roblox.com/games/15088245851/Jailbreak-Database-Panel";
const switchTokenEl = document.getElementById("switchToken");

async function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms));
}

function sanitizeHTML(html) {
    let div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
}

function showPopup(title, content) {

    // kill all other modals:
    let els = document.getElementsByClassName("modal");
    for (let i = 0; i < els.length; i++) {
        els[i].remove();
        console.log("modal killed!");
    }

    let modalElement = document.createElement("div");
    document.body.appendChild(modalElement);
    let modalHTML = `
    <div id = "${title}Modal" class = "modal">
        <div class="modalTitle">
            ${sanitizeHTML(title)}
        </div>
        ${content}
        <div class="modalNavbar" id = "${title}navbar">
            
        </div>
    </div>
    `
    modalElement.innerHTML = modalHTML;
    let button = document.createElement("button");
    button.innerText = "Close";
    document.getElementById(`${title}navbar`).appendChild(button);
    button.onclick = () => {
        document.getElementById(`${title}Modal`).remove();
    }
}

let api = "https://anyas.me/api/jbdb/";

function setTitle(txt) {
    document.title = `JBDB | ${txt}`
}

showPopup(`Our first stable release!`,

    `
    <p class = "modalParagraph">Hey! Thanks for using and supporting <i class = "orange">J</i><i class = "blue">B</i><i class = "orange">D</i><i class = "blue">B</i></p>
    <br>
    <p class = "modalParagraph">This project is currently still under development. This is a beta release!</p>
    <br>
    <div class = "neutral list">
        <p class = "modalParagraph">Fixed random bug where formatting would change when viewing logs (stuff would get bolded)</p>
        <p class = "modalParagraph">Made inventories downloadable</p>
        <p class = "modalParagraph">Made trade histories downloadable</p>
        <p class = "modalParagraph">Shows token balance, token data, and automatically signs you in</p>
    </div>
    <br>
    <p class = "modalParagraph">You can use this tool for now, but expect bugs to occur.</p>
    <p class = "modalParagraph">To obtain access, you can pay for a token and buy credits <a href = "${gameLink}" target="_blank">here.</a></p>
    <br>
    <p class = "modalParagraph">Join the discord: <a href = "https://anyas.me/discord">anyas.me/discord</a></p>  
    `)

let tokenUsed = true;
let token = "";
let defaultHTML = `<h5>select anything to begin</h5>
<p class = "disclaimer">by continuing, you agree to the <a id="tos">tos</a></p>`
let defaultScript = "script.js"

if (tokenUsed) {
    defaultHTML = `
    <div class="navbar">
        <input placeholder = "enter your token to begin" id = "tokenInput"></input>
        <button id = "registerToken" class="fetching">accept</button>
    </div>
    <p class = "disclaimer">by continuing, you agree to the <a id="tos">tos</a></p>
    `
    defaultScript = "requireToken.js"
}

let pricing = [];

async function go() {
    const header = document.getElementById("header");
    let response = await sendRequest("services");
    let parsedResponse = Object.values(response);
    console.log(parsedResponse)
    pricing = parsedResponse
    for (let i = 0; i < parsedResponse.length; i++) {
        let c = parsedResponse[i];
        console.log(i, c)
        header.children[i].innerText = `${c.userFacingName} (${c.price} credits)`
    }
}

go();   

async function sendRequest(location) {
    console.log(location);
    if (token != "" || location.includes("tokens/") || location.includes("services")) {
        console.log(`Sending request to ${location}...`);
        return fetch(`${api}${location}`, {
            method: 'GET',
            headers: {
                "x-api-token": token
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("Success!", responseData);
          if (responseData.message) {
            if (responseData.message.includes("balance")) {
                showPopup("Error!", responseData.message)
            }
          }
          if (responseData.balanceRemaining) {
            document.getElementById("tokenBalance").innerText = `Balance: ${responseData.balanceRemaining}`
          }
          return responseData;
        })
      .catch(error => {
        console.error(error)
      });
    }
}

// ui code
let wireframe = {
    "default": {
        "html": `
        <h2>select anything to begin</h2>
        <p class = "disclaimer">by continuing, you agree to the <a id="tos">tos</a></p>
        `,
        "script": "default.js",
        "pageTitle": "Main Page"
    },
    "requireToken": {
        "html": `
        <div class="navbar">
            <input placeholder = "enter your token to begin" id = "tokenInput" autocomplete="off"></input>
            <button id = "registerToken">accept</button>
        </div>
        <p class = "disclaimer">by continuing, you agree to the <a id="tos">tos</a></p>`,
        "script": `requireToken.js`,
        "pageTitle": "Enter your token"
    },
    "dupeChecker": {
        "html": `
        <div style="display: flex;">
            <input type="text" placeholder="username or id (eg: logixism/2947401001)" id = "grabDupeChecker">
            <button id="btnSearchDupeChecker">search</button>
            <select id="dupeCheckerInputModifier" name="id" class="inputQ">
                <option value="username">username</option>
                <option value="userId">id</option>
            </select>
        </div>
        <div>
            <h3 id = "usernameOfSearchDupeChecker"></h3>
            <div class="list" id="dupeCheckerList">
            </div>                
        </div>
        `,
        "script": "dupeChecker.js",
        "pageTitle": "Dupe Checker"
    },
    "inventoryViewer": {
        "html": `
        <div style="display: flex;">
            <input type="text" placeholder="username or id (eg: logixism/2947401001)" id = "grabInvViewer">
            <button id="btnSearchInvViewer">search</button>
            <select id="inputModifier" name="id" class="inputQ">
                <option value="username">username</option>
                <option value="userId">id</option>
            </select>
        </div>
        <div>
            <h3 id = "usernameOfSearch"></h3>
            <a id = "downloadFileInventoryViewer">download file</a>
            <div class = "navbar" id = "invViewerNavBar">
                
            </div>
            <div class="list neutral" id = "invViewerList">
                
            </div>                
        </div>
        `,
        "script": "inventoryViewer.js",
        "pageTitle": "Inventory Viewer"
    },
    "ogFinder": {
        "html": `
        <div style="display: flex;">
            <input type="text" placeholder="username or id (eg: logixism/2947401001)" id = "grabSearchOgFinder">
            <button id="btnSearchOgFinder">search</button>
            <select id="inputModifier" name="id" class="inputQ">
                <option value="username">username</option>
                <option value="userId">id</option>
            </select>
        </div>
        <h3 id = "usernameOfSearchOgFinder"></h3>
        <div class="clean list" id = "ogFinderList">
            
        </div>   
        `,
        "script": "ogFinder.js",
        "pageTitle": "OG Finder"
    },
    "tos": {
        "html": `we have the right to take away your api key at any time :)`
    },
    "tradeHistory": {
        "html": `
        <div style="display: flex;">
            <input type="text" placeholder="username or id (eg: logixism/2947401001)" id = "grabDupeChecker">
            <button id="btnSearchDupeChecker">search</button>
            <select id="inputModifier" name="id" class="inputQ">
                <option value="username">username</option>
                <option value="userId">id</option>
            </select>
        </div>
        <h3 id = "usernameOfSearchTradeHistory"></h3>
        <a id = "downloadFileTradeHistory">download file</a>\
        <br>
        <div class="clean list" id = "tradeHistoryList">
            
        </div> 
        `,
        "script": "tradeHistory.js",
        "pageTitle": "Trade History"
    }
}


function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

function updateRipple() {
    const buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener("click", createRipple);
    }
}

updateRipple();

document.onclick = () => {
    updateRipple();
}


function setPage(page) {
    if (wireframe[page] && token != "" || page == "requireToken") {
        setTitle(wireframe[page].pageTitle)
        document.getElementById("wireframe").innerHTML = `
        ${wireframe[page].html} 
        `
        let script = document.createElement('script');
        script.src = wireframe[page].script;
        document.getElementById("scriptContainer").innerHTML = "";
        document.getElementById("scriptContainer").appendChild(script);
    }
}

setPage("requireToken")  
document.getElementById("tos").onclick = () => {
    setPage("tos");
}


function usernameToId(usernames) {
    return fetch('https://users.roblox.com/v1/usernames/users', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "usernames": usernames,
          "excludeBannedUsers": false
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Success!", usernames, data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
}

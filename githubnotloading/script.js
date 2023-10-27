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
            ${title}
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

let api = "https://anyas.me/api/";

showPopup(`Our first stable release!`,

    `
    <p class = "modalParagraph">Hey! Thanks for using and supporting JBDB</p>
    <br>
    <p class = "modalParagraph">This project is currently still under development. This is a beta release!</p>
    <br>
    <p class = "modalParagraph">You can use this tool for now, but expect bugs to occur.</p>
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

async function sendRequest(location) {
    console.log(location);
    if (token != "" || location.includes("tokenInfo?token=")) {
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
        "script": "default.js"
    },
    "requireToken": {
        "html": `
        <div class="navbar">
            <input placeholder = "enter your token to begin" id = "tokenInput" autocomplete="off"></input>
            <button id = "registerToken">accept</button>
        </div>
        <p class = "disclaimer">by continuing, you agree to the <a id="tos">tos</a></p>`,
        "script": `requireToken.js`
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
        "script": "dupeChecker.js"
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
            <a id = "downloadFileInventoryViewer">Download File</a>
            <div class = "navbar" id = "invViewerNavBar">
                
            </div>
            <div class="list neutral" id = "invViewerList">
                
            </div>                
        </div>
        `,
        "script": "inventoryViewer.js"
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
        "script": "ogFinder.js" 
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
        <div class="clean list" id = "tradeHistoryList">
            
        </div> 
        `,
        "script": "tradeHistory.js"
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

async function validateToken(token) {
    console.log(token);
    let response = await sendRequest(`tokens/${token}`);
    console.log("Token validity ran!: ", response);
    if (response.status == 404) {
        return false;
    } else {
        return response;
    }
}

function censorHalfOfString(inputString) {
    if (inputString.length < 2) {
      return inputString;
    }
  
    const halfLength = Math.ceil(inputString.length / 2);
    const censoredPart = '*'.repeat(halfLength);
    const uncensoredPart = inputString.slice(halfLength);
  
    return inputString.substring(0, halfLength) + censoredPart;
}

function setBack() {
    localStorage.clear();
    switchTokenEl.style.display="none"
    document.getElementById("tokenDisplay").innerHTML = ``;
    document.getElementById("tokenBalance").innerHTML = ``;
    setPage("requireToken");
}

function handleToken(response, suggestedToken) {
    console.log(response);
    if (response && Date.now()/1000 < response.data.expiresAt && response.data.balance > 1) {
        localStorage.setItem("token", suggestedToken)
        token = suggestedToken;
        console.log("test")
        switchTokenEl.style.display="block"
        defaultHTML = `<h4>select anything to begin</h4>
        <p class = "disclaimer">by continuing, you agree to the <a id="tos" onclick="setPage("tos")">tos</a></p>`
        defaultScript = "script.js"
        document.getElementById("tokenDisplay").innerText = `Token: ${censorHalfOfString(token)}`;
        document.getElementById("tokenBalance").innerText = `Balance: ${response.data.balance}`;
        setPage("default");
        localStorage.setItem("token", token);
    } else if (response == false) {
        showPopup("Token Error!", `
        <p>Please provide a valid token!</p>
        <p>Is there an error in the token "${suggestedToken}"?</p>
        <p>If you believe this is an error, contact us! <a href = "https://anyas.me/discord" target="_blank">anyas.me/discord</a></p>
        `)
    } else if (Date.now()/1000 >= response.data.expiresAt) {
        showPopup("Token Error!", 
        
        `
        <p>The token ${suggestedToken} has <b>expired</b></p>
        <p></p>
        `
        )
        localStorage.clear();
    } else if (response.data.balance <= 1) {
        showPopup("Insufficient Balance!",
        
        `
        <p>Your token ${suggestedToken} seems to have insufficient balance.</p>
        <a href="${gameLink}" target="_blank">Would you like to buy more?</a>
        `
        )
        localStorage.clear();
    }
}

async function checkIfExistingToken() {
    if (localStorage.getItem("token")) {
        console.log(localStorage.getItem("token"));
        let response = await validateToken(localStorage.getItem("token"));
        handleToken(response, localStorage.getItem("token"));
    }
}


checkIfExistingToken();

document.getElementById("registerToken").onclick = async () => {
    let suggestedToken = document.getElementById("tokenInput").value
    console.log(suggestedToken);
    // insert some code to validate token
    let response = await validateToken(suggestedToken);
    console.log(response);
    handleToken(response, suggestedToken);
}


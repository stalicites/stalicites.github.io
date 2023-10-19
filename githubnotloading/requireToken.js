async function validateToken(token) {
    /*
    let response = await sendRequest(`validate_token?token=${token}`)
    return response;
    */
   return true;
}

document.getElementById("registerToken").onclick = () => {
    console.log(document.getElementById("tokenInput").value);
    // insert some code to validate token
    if (validateToken(document.getElementById("tokenInput").value)) {
        token = document.getElementById("tokenInput").value;
        defaultHTML = `<h4>select anything to begin</h4>
        <p class = "disclaimer">by continuing, you agree to the <a id="tos">tos</a></p>`
        defaultScript = "script.js"
        setPage("default");
    }
}
async function validateToken(token) {
    console.log(token);
    let response = await sendRequest(`tokenInfo?token=${token}`);
    console.log("Token validity ran!: ", response);
    return [response.status == 200 && response.message == "OK", response.data.expiresAt];
}
document.getElementById("registerToken").onclick = async () => {
    let suggestedToken = document.getElementById("tokenInput").value
    console.log(suggestedToken);
    // insert some code to validate token
    let response = await validateToken(suggestedToken);
    console.log(response);
    if (response[0] && Date.now()/1000 < response[1]) {
        localStorage.setItem("token", suggestedToken)
        token = suggestedToken;
        defaultHTML = `<h4>select anything to begin</h4>
        <p class = "disclaimer">by continuing, you agree to the <a id="tos">tos</a></p>`
        defaultScript = "script.js"
        setPage("default");
    } else {

        showPopup("Token Error!", `
        <p>Please provide a valid token!</p>
        <p>Is there an error in the token "${suggestedToken}"?</p>
        <p>If you believe this is an error, contact us! <a href = "https://anyas.me/discord">anyas.me/discord</a></p>
        `)
    }
}
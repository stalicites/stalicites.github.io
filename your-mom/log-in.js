const userInput = document.getElementById("eml");
const passInput = document.getElementById("pwd");
const error = document.getElementById("error");

function parseErrorMessage(str) {
    switch (str) {
        case "The email address is badly formatted.":
            return "The username is badly formatted";
        case "The password is invalid or the user does not have a password.":
            return "Invalid Password";
        default:
            return str;
    }
}

function logIn() {
    const promise = auth.signInWithEmailAndPassword(userInput.value + "@gmail.com", passInput.value);
    promise.catch(e => error.innerHTML = parseErrorMessage(e.message));
}

auth.onAuthStateChanged(function(user) {
    if (user) {
        window.location = "main.html";
    } else {

    }
});
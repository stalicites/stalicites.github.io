const userInput = document.getElementById("eml");
const passInput = document.getElementById("pwd");
const error = document.getElementById("error");

function parseErrorMessage(str) {
    switch (str) {
        case "":
            return "Please put in at least one character!"
        case "The email address is already in use by another account.":
            return "This username is taken. Try another!";
        case "The email address is badly formatted.":
            return "This username has a special character. Only use numbers and letters!";
        default:
            return str;
    }
}

function createAccount() {
    const promise = auth.createUserWithEmailAndPassword(userInput.value + "@gmail.com", passInput.value);
    promise.catch(e => error.innerHTML = parseErrorMessage(e.message));
    console.log("Pushing new user to database.")
    users.push(new User(userInput.value, uid))
    passwords.push(passInput.value)
}


auth.onAuthStateChanged(function(user) {
    if (user) {
        window.location = "main.html";
    } else {

    }
});
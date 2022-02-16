const testEl = document.getElementById("word");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const w = urlParams.get("words");
const requestURL = "https://random-word-api.herokuapp.com/word?number=" + w + "&swear=0";
const req = new XMLHttpRequest();
req.open("GET", requestURL);
req.send();
let spans = [];
let allWords = [];
let wordsPassed = 0;    

let timepassed = 0;

let current =  {
    word: "",
    index: 0,
}

function formatResponse(arr) {
    let returnedStr = ""
    for (let i = 0; i < arr.length; i++) {
        returnedStr += (arr[i] + " ")
    }
    return returnedStr;
}

document.onkeypress = function(evt) {
    evt = evt || window.event;
    let charCode = evt.keyCode || evt.which;
    let charStr = String.fromCharCode(charCode);
    if (charStr == current.word[current.index]) {
        spans[current.index].className = "filled";
        current.index++;
        if (current.index == current.word.length) { 
            console.log("Help me.")
            wordsPassed++;
            if (wordsPassed == allWords.length) {
                alert("You finished with time: " + timepassed);
            }
            document.getElementById("percent").value = 100 * wordsPassed/allWords.length;
            document.getElementById("words-passed").innerHTML = "Words Passed: " + wordsPassed;
            current.word = allWords[wordsPassed];
            current.index = 0; 
            update(current.word, true);
        }
    } else {
        spans[current.index].className = "wrong"
    }
};

function update(str, yes) {
    console.log("Updating DOM usage..")
    if (!yes) {
        for (let i = 0; i < str.length; i++) {
            let s = document.createElement("span");
            s.innerHTML = str[i];
            s.className = "not-filled"
            testEl.appendChild(s);
            spans.push(s);
        }
        console.log("Help me.")
    } else {
        for (let i = 0; i < spans.length; i++) {
            spans[i].remove();
        }
        spans = [];
        for (let i = 0; i < str.length; i++) {
            let s = document.createElement("span");
            s.innerHTML = str[i];
            s.className = "not-filled"
            testEl.appendChild(s);
            spans.push(s);
        }
    }
    
}

req.onload = function() {
    document.getElementById("load").remove();
    console.log("Server responded successfully with a 200")
    let response = formatResponse(JSON.parse(req.responseText));
    allWords = JSON.parse(req.responseText);
    console.log(response);
    console.log("Help me.")
    current.word = JSON.parse(req.responseText)[wordsPassed];
    for (let i = 0; i < JSON.parse(req.responseText)[wordsPassed].length; i++) {
        let s = document.createElement("span");
        s.innerHTML = response[i];
        s.className = "not-filled"
        testEl.appendChild(s);
        spans.push(s);
    }
}

function time() {
    timepassed++;
    document.getElementById("time-passed").innerHTML = "Time Passed: " + timepassed;
}

setInterval(time, 1000);
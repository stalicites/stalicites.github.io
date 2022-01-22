/*

1. You look around to see where you are
2. It\'s a dark endless void
3. It seems you\'ve reached a 404

*/


let index = 0;
const text = "* You look around to see where you are.\n * It\'s a dark, endless void.\n * It seems you\'ve reached a 404."

function interval() {
    if (index < text.length) {
        document.getElementById("line1").innerHTML = document.getElementById("line1").innerHTML += text[index]; 
    }
    index++;
}

setInterval(interval, 70);
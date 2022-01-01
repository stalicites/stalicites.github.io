const finalText = "talicites";
let index = 0;
const headerClass = document.querySelectorAll(".header")[0];

function interval() {
    if (index < finalText.length) {
        headerClass.innerHTML = headerClass.innerHTML + finalText[index];
        index++;
    }   
}

setInterval(interval, 150/1.5);
document.getElementById("save").onclick = function() {
    console.log("Saving Changes...");
    localStorage.setItem("p1", document.getElementById("p1").value);
    localStorage.setItem("p2", document.getElementById("p2").value);
    localStorage.setItem("board", document.getElementById("board").value);
    window.location = "index.html"
}
document.getElementById("go").onclick = function() {
    window.location = "test.html?words=" + document.getElementById("word-count").value;
}

function update(val)
{
    document.getElementById("wc").innerHTML = "Word Count: " + val;
} 
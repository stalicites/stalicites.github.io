const game = document.getElementById("game");
    const display = game.getContext("2d");
    
    game.addEventListener('contextmenu', event => event.preventDefault()); // Prevents the annoying context menu from showing up when right clicking.
  
    let songSwitcher = {
      list: ["fallendown", "sunflower", "bruh", "resonance", "backtotime", "stop", "motivation", "moment", "megalovania", "freaks"],
      index: 0
    }
    
    function drawRect(x, y, width, height, color, stroke="rgb(0, 0, 0, 0)") {
      display.fillStyle = color;
      display.strokeStyle = stroke;
      display.fillRect(x, y, width, height);
      display.stroke();
    }
    
    game.width = window.innerWidth;
    game.height = window.innerHeight;
    
    const mouse = {
      x: null,
      y: null,
      down: false,
      prevent: [false, "Right"]
    }
    
    game.onmousemove = function(e) {
      mouse.x = e.x;
      mouse.y = e.y;
    }

    game.onmousedown = function() {
      mouse.down = true;
      console.log("Mouse is down")
    }
    
    game.onmouseup = function() {
      mouse.down = false;
      console.log("Mouse is up")
    }
    
    window.addEventListener("resize", function() {
      game.width = window.innerWidth;
      game.height = window.innerHeight;
    })
    
    //37 is ArrowLeft, 39 is ArrowRight
    
    const serverRequest = new XMLHttpRequest();
    serverRequest.open("GET", "https://stalicites.tech/osu/" + songSwitcher.list[songSwitcher.index] + ".json");
    serverRequest.send();
    
    let gameData;
    
    let audio = new Audio();
    
    const main = {
      content: "Loading...",
      font: "50px Verdana",
      textColor: "white"
    }
    
    function update(objectStr) {
      let res = JSON.parse(objectStr);
      console.log("Server responded with a 200! Loading song & map data!");
      console.log(res);
      gameData = res.gameSettings;
      game.style.background = gameData.bg;
      main.content = gameData.songName;
      main.textColor = gameData.textColor;
    }
    
    serverRequest.onload = function() {
      update(serverRequest.responseText);
    }
    
    document.body.onkeyup = function(e){
      if(e.keyCode == 37){
        if (songSwitcher.index > 0) {
          songSwitcher.index--;
          console.log("User pressed the left arrow key. The index was switched from " + (songSwitcher.index + 1) + " to " + songSwitcher.index);
          let q = new XMLHttpRequest();
          q.open("GET", "https://stalicites.tech/osu/" + songSwitcher.list[songSwitcher.index] + ".json");
          q.send();
          q.onload = function() {
            update(q.responseText);
          }
        }
      }
      if (e.keyCode == 39) {
        if (songSwitcher.index < songSwitcher.list.length - 1) {
          songSwitcher.index++;
          console.log("User pressed the left arrow key. The index was switched from " + (songSwitcher.index - 1) + " to " + songSwitcher.index);
          let q = new XMLHttpRequest();
          q.open("GET", "https://stalicites.tech/osu/" + songSwitcher.list[songSwitcher.index] + ".json");
          q.send();
          
          q.onload = function() {
            update(q.responseText);
          }
          
        }
      }
    }
    
    function text(t, x, y, color, maxwidth) {
      //text, x cord, y cord, color of text
      display.fillStyle = color;
      display.fillText(t, x, y, maxwidth);
    }
    
    function hover(btn) {
      if (mouse.x > btn.x - btn.width && mouse.x < btn.x + btn.width && mouse.y > btn.y - btn.height && mouse.y < btn.y + btn.height) {
        return true;
      }
    }
    
  function draw() {
    if (mouse.prevent[0] && mouse.down) {
      if (mouse.prevent[1] == "right") {
          if (songSwitcher.index < songSwitcher.list.length - 1) {
   		    songSwitcher.index++;
   		    console.log("User pressed the left arrow key. The index was switched from " + (songSwitcher.index - 1) + " to " + songSwitcher.index);
   		    let q = new XMLHttpRequest();
   		    q.open("GET", "https://stalicites.tech/osu/" + songSwitcher.list[songSwitcher.index] + ".json");
   		    q.send();
   		    q.onload = function() {
   			    update(q.responseText);
   		    }
   		  }
      } else if (mouse.prevent[1] == "left") {
        if (songSwitcher.index > 0) {
       		songSwitcher.index--;
       		console.log("User pressed the left arrow key.The index was switched from " + (songSwitcher.index + 1) + " to " + songSwitcher.index);
       		let q = new XMLHttpRequest();
       		q.open("GET", "https://stalicites.tech/osu/" + songSwitcher.list[songSwitcher.index] + ".json");
       		q.send();
       		q.onload = function() {
       			update(q.responseText);
       		}
       	}
      }
    }
    let textSize = (game.width * 0.5)/main.content.length
 	  if (!mouse.prevent[0] && mouse.down) {
 		  console.log("hm")
 		  sessionStorage.setItem("song", songSwitcher.list[songSwitcher.index]);
 		  window.location = "play";
 	  }
 	  if (mouse.down) {
 		  mouse.down = false;
 	  }
 	  display.font = textSize + "px Verdana";
 	  display.clearRect(0, 0, game.width, game.height);
 	  display.textAlign = "center";
 	  text(main.content, game.width / 2, game.height / 2, main.textColor, game.width / 1.5);
 	  text("Click to play.", game.width / 2, game.height / 2 + 80, main.textColor, game.width);
 	  display.font = "40px Verdana"
    drawRect(game.width / 2 - game.width / 1.5, game.height / 2, 40, 40, gameData.beatColor2);
    drawRect(game.width / 2 + game.width / 1.5, game.height / 2, 40, 40, gameData.beatColor2);
    display.font = "60px Verdana"
    drawRect(game.width / 2 - 445, game.height / 2 - 40, 100, 100, "rgb(0, 0, 0, 0)", gameData.beatColor2);
    drawRect(game.width / 2 + 350, game.height / 2 - 40, 100, 100, "rgb(0, 0, 0, 0)", gameData.beatColor2);
    text("<", game.width / 2 - 400, game.height / 2 + 30, main.textColor, game.width / 2);
    text(">", game.width / 2 + 400, game.height / 2 + 30, main.textColor, game.width / 2);
    
    
    if (hover({x: game.width / 2 - 445, y: game.height / 2 - 40, width: 100, height: 100})) {
      mouse.prevent[0] = true;
      mouse.prevent[1] = "left"
 	    console.log("Left button is being hovered over!")
     	
    }
    if (hover({x: game.width / 2 + 350, y: game.height / 2 - 40, width: 100,height: 100})) {
      mouse.prevent[0] = true;
      mouse.prevent[1] = "right"
 	    console.log("Right button is being hovered over!");
 	  }
 	  
 	  if (!hover({x: game.width / 2 + 350, y: game.height / 2 - 40, width: 100,height: 100}) && !hover({x: game.width / 2 - 445, y: game.height / 2 - 40, width: 100, height: 100})) {
 	    mouse.prevent[0] = false;
 	  }
 	
 	let sn = gameData.songName;
 	display.font = "20px Verdana";
 	display.textAlign = "left"
 	if (localStorage[sn] === undefined) {
 		console.log("It\'s null!")
 		text("No highscore found :(", 20, 40, main.textColor, game.width);
 	} else {
 		let score = localStorage.getItem(sn);
 		text("High Score: " + score, 30, 40, main.textColor, game.width);
 	}
 }
    
    setInterval(draw, 1);
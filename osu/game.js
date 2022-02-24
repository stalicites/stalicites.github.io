
    // WARNING: The code you're about to read is VERY VERY BAD. I'm not responsible for brain damage.
  
    let ended = false;
    
    let recording = false;
    
    let song = sessionStorage.getItem("song");
    
    if (song == undefined) {
      song = "freaks";
    }
    
    const ref = "https://stalicites.tech/osu/" + song + ".json"
    const game = document.getElementById("game");
    const display = game.getContext("2d");
    
    game.addEventListener('contextmenu', event => event.preventDefault()); // Prevents the annoying context menu from showing up when right clicking.
    
    game.width = window.innerWidth;
    game.height = window.innerHeight;
    
    window.addEventListener("resize", function() {
      game.width = window.innerWidth;
      game.height = window.innerHeight;
    })
    
    
    function drawTriangle(context, x, y, triangleWidth, triangleHeight, fillStyle){
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + triangleWidth / 2, y + triangleHeight);
      context.lineTo(x - triangleWidth / 2, y + triangleHeight);
      context.closePath();
      context.fillStyle = fillStyle;
      context.fill();
    }
    
    const mouse = {
      x: null,
      y: null,
      down: false,
      hover: false
    }
    
    let paused = false;
    
    game.onmousemove = function(e) {
      mouse.x = e.x;
      mouse.y = e.y;
      handleparticles();
    }

    game.onmousedown = function() {
      mouse.down = true;
      console.log("Mouse is down")
    }
    
    game.onmouseup = function() {
      mouse.down = false;
      console.log("Mouse is up")
    }
    
    let beats = [];
    
    let frame = 0;
    
    let isLoaded = false;
    
    const serverRequest = new XMLHttpRequest();
    serverRequest.open("GET", ref);
    serverRequest.send();
    
    let audio;
    
    let score = 0
    
    let particles = [];
    
    let gameSettings;
    
    let songData;
    
    serverRequest.onload = function() {
      console.log("Loaded map data successfully with a 200 response.")
      songData = JSON.parse(serverRequest.responseText);
      console.log(songData.gameSettings);
      gameSettings = songData.gameSettings;
      beats = songData.beats;
      document.title = gameSettings.songName + " | osu!";
      
      audio = new Audio();
      audio.src = "https://stalicites.tech/osu/" + gameSettings.songLocation;
      
      gameSettings.beatSpeed = 1;
      gameSettings.beatSize = 150;
      game.style.background = gameSettings.bg;
      audio.onended = function() {
        ended = true;
        currentText = "Game Over! You finished with " + score + " points!";
        let sn = gameSettings.songName
        if (localStorage[sn] == null) {
          localStorage[sn] = score;
          console.log("No high score found! Setting highscore to current score!")
        } else {
          if (parseInt(localStorage[sn]) < score) {
            localStorage[sn] = score;
            console.log("Setting new highscore!")
          }
        }
      }
      isLoaded = true
    }
    
    let init = false;
    
    function randomNumber(i) {
        return Math.random() * i;
    }
    
    function drawRect(x, y, width, height, color) {
        display.fillStyle = color;
        display.fillRect(x, y, width, height);
    }
    
    function drawCircle(x, y, r, color, ring) {
      display.beginPath();
      display.lineWidth = 3;
      display.fillStyle = color;
      display.strokeStyle = ring;
      display.arc(x, y, r, 0, 2 * Math.PI);
      display.stroke();
      display.fill();
    }
    
    let beatObjects = [];
    let beatMap = [];
    
    let currentText = "Click to start!"; // Current text displayed on the canvas.

    game.onclick = function() {
      if (!ended) {
        audio.play();
        init = true;
        paused = false;
        currentText = gameSettings.songName;
      }
    }
    
    document.body.onkeyup = function(e){
      //alert("Screen width is: " + window.innerWidth);
      if(e.keyCode == 32 && recording){
        // Check if spacebar is pressed. This is used to create a beat map.
        beatMap.push(frame);
        console.log("new beat created")
        beatObjects.push({x: randomNumber(window.innerWidth), y: randomNumber(window.innerHeight), lifetime: 100, clicked: false});
      }
      if (e.keyCode == 81) {
        if (paused || ended) {
          window.location = ".";
        }
      }
    }
    
    // used for pausing purposes
    
    game.oncontextmenu = function() {
      
      if (!ended) {
        audio.pause();
        currentText = "Game Paused. Left click to unpause.";
      }
      if (paused) {
        frame = 0;
        beatObjects = [];
        score = 0;
        console.log("Resetting round data!");
        init = true;
        currentText = gameSettings.songName;
        drawRect(0, 0, 500, 500, gameSettings.bg);
        audio.currentTime = 0;
        audio.play();
        paused = false;
        return;
      }
      if (!ended) {
        paused = true;
      }
    }
    
    //Random Number function
    
    function random(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
    
    //Create particles that follow the users cursor
    
    function handleparticles() {
      particles.push({x: mouse.x, y: mouse.y, lifetime: random(100, 200), vx: random(-1, 1)/2, vy: random(-1, 1)/2});
    }
    
    let scale = 0.5;
    
    let textSize = (game.width * scale)/currentText.length;
    
    function draw() {
      if (recording) {
        beats = [];
      }
      if (score < 0) {
        score = 0;
      }
      game.width = window.innerWidth;
      game.height = window.innerHeight;
      drawCircle(mouse.x, mouse.y, 10, "rgb(0, 0, 0, 0)", "white");
      display.font = textSize + "px Verdana";
      if (paused) {
        let r = (game.width * scale)/currentText.length;
        display.font = (r * 2) + "px Verdana";
        console.log("Font size is -> " + textSize);
        console.log("Game width is " + game.width * scale + ". Text length is " + currentText.length + ".")
        display.fillStyle = gameSettings.textColor;
        display.textAlign = "center";
        display.fillText("Game Paused.", (game.width/2), game.height/2);
        display.fillText("Right Click to retry. Left Click to unpause.", game.width/2, game.height/2 + 70)
        display.fillText("Press \"q\" to go home.", game.width/2, game.height/2 + 140)
        //console.log("Paused Game!");
      }
      if (init && !paused && !ended) {
        frame++;
      }
      
      if (ended) {
        let r = (game.width * scale)/currentText.length;
        display.font = (r * 2) + "px Verdana";
        display.fillStyle = gameSettings.textColor;
        display.textAlign = "center";
        display.fillText(currentText, game.width/2, game.height/2);
        display.fillText("Press \"q\" to go home.", game.width/2, game.height/2 + 50)
      }
      
      for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        drawRect(particle.x, particle.y, 15, 15, "rgb(255, 255, 255, 0.5)");
        particle.lifetime--;
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.lifetime <= 0) {
          particles.splice(i, 1);
        }
      }
      
      if (isLoaded && !paused && !ended ) {
      display.fillStyle = gameSettings.textColor;
      display.textAlign = "center";
      display.fillText(currentText, game.width/2, game.height/2);
      display.textAlign = 'left'
      display.fillText("Score: " + score, 30, 80)
      display.font = "20px Verdana"
      display.fillText("Right click to pause.", 10, game.height - 20);
      for (let i = 0; i < beats.length; i++) {
        if (frame == beats[i]) {
          beatObjects.push({x: randomNumber(window.innerWidth), y: randomNumber(window.innerHeight), lifetime: 100});
          console.log("Beat at index " + i + " was created!");
        }
      }
      
      beatObjects.forEach((beat, i) => {
        let beatSize = Math.abs(gameSettings.beatSize * (beat.lifetime/100));
      if (mouse.x > beat.x - beatSize && mouse.x < beat.x + beatSize && mouse.y > beat.y - beatSize && mouse.y < beat.y + beatSize && beat.lifetime > 0 && beat.lifetime < 60 && !beat.clicked) {
        mouse.hover = true;
        if (mouse.down) {
          score += 500;
          beat.clicked = true;
          beat.x = -1000;
          console.log("Beat at index " + i + " was clicked!");
          mouse.down = false;
        }
        mouse.hover = false;
      }
        if (beat.lifetime > 0) {
           beat.lifetime -= 0.25;
        } else {
          beat.lifetime = 0;
          if (!beat.clicked) {
            console.log("Removing 500 points because the beat at index " + i + " was not clicked.");
            score -= 500;
            beat.clicked = true;
          }
        }
        if (beat.lifetime > 60) {
          drawCircle(beat.x, beat.y, Math.abs(gameSettings.beatSize * (beat.lifetime/100)), gameSettings.beatColor1, gameSettings.ringColor)
        } else {
          drawCircle(beat.x, beat.y, Math.abs(gameSettings.beatSize * (beat.lifetime/100)), gameSettings.beatColor2, gameSettings.ringColor);
        }
      })
      }
      
      if (!mouse.hover && init && !paused && mouse.down) {
        score -= 500;
      }
      if (mouse.down) {
        mouse.down = false;
      }
    }
    
    setInterval(draw, 1);

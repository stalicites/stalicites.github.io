VANTA.GLOBE({
    el: "#background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: "#00ff00",
    color2: "white",
    size: 1.6,
    backgroundColor: "#171717"
  })
  
  const header = document.getElementById("header");
  const headerText = "TALICITES";
  let index = 0;
  
  setInterval(function() {
    if (index < headerText.length) {
      header.innerHTML = header.innerHTML + headerText[index];
      index++;
    } 
  }, 1000/10);  

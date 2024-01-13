var numCircles       = 9,
    colors           = [],
    hexDigit         = ["a","b","c","d","e","f",0,1,2,3,4,5,6,7,8,9],
    pickedColor,
    circles          = document.querySelectorAll(".circle"), 
    colorDisplay     = document.getElementById("colorDisplay"),
    messageDisplay   = document.querySelector("#message"),
    h1               = document.querySelector("h1"),
    resetButton      = document.querySelector("#reset"),
    modeButtons      = document.querySelectorAll(".mode");

initiate();

function initiate (){
  setupModeButton();
  setupCircles();
  reset();
}

function setupModeButton (){
  for (var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function (){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      this.classList.add("selected");
      if(this.textContent === "Easy") {
        numCircles = 3;
      } else if (this.textContent === "Medium"){
        numCircles = 6;
      } else {
        numCircles = 9;
      }
      reset ();
    });
  }
}

function reset (){
  colors = generateRandomColors(numCircles);
  
  pickedColor = pickRandomColor();
  
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  
  for (var i = 0; i < circles.length; i++){
    if (colors[i]){
      circles[i].style.display = "block";
      circles[i].style.background = colors[i];
    } else {
      circles[i].style.display = "none";
    }
  }
  
  h1.style.background = "white";
}

resetButton.addEventListener("click", function() {
  reset();
})


function setupCircles (){
  for (var i = 0; i < circles.length; i++) {
    
    circles[i].addEventListener("click", function(){
       
      var rgb = this.style.background;
      function rgb2hex(rgb) {
        if (rgb.search("rgb") == -1) {
          return rgb;
        } else {
          rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
          function hex(x) {
               return ("0" + parseInt(x).toString(16)).slice(-2);
            }
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
          }
        }
      var clickedColor = rgb2hex(rgb);
       
      console.log(clickedColor, pickedColor);
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function changeColors (color){
  
  for (var i = 0; i < circles.length; i++) {
   
    circles[i].style.background = color;
    
  }
}

function pickRandomColor (){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors (num){
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  var hex1 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  var hex2 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  var hex3 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  var hex4 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  var hex5 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  var hex6 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  return "#" + hex1 + hex2 + hex3 + hex4 + hex5 + hex6;
}
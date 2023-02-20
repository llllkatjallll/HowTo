var gameCanvas = document.getElementById("game-wrapper");
var restartButton = document.getElementById("button-neu");

//funtions UI zum ein/ausblenden
var buttonGrid = document.getElementById("button-grid");
var buttonCount = document.getElementById("button-count");
var buttonDensity = document.getElementById("button-density");
var buttonRandom = document.getElementById("button-random");
var containerFunctions = document.getElementById("functions-container");

var colorToggle = document.getElementById("colorToggle");
var rotationToggle = document.getElementById("rotationToggle");
var exceptionSlider = document.getElementById("exceptionSlider");
var strokeToggle = document.getElementById("strokeToggle");
var sliderSize = document.getElementById("gridSize");
var sliderDensity = document.getElementById("densitySize");
var sliderSpacing = document.getElementById("spacingDensity");
var gameButtons = document.getElementById("game-buttons");
let svgButton = document.getElementById("button-speichern");
var canvas;
let quads = [];
let amount = 2;
let length = undefined;
let midLength = undefined;
let spacing = 6;
let density = 4;
let exeption = 10;
let quadSpacing = 12;
let currentGameId = "desordres";
let exceptionAmount = 0;
let versatzAmount = 0;
let sketch = function (p) {
  let canvasSize = 0;
  // p.preload = function () {

  // }

  p.setup = function () {

    gameWidth = gameCanvas.clientWidth;
    gameHeight = gameCanvas.clientHeight;

    if (gameWidth >= gameHeight) {
      canvas = p.createCanvas(gameHeight, gameHeight, p.SVG);
    
      canvasSize = gameHeight;
    } else {
      canvas = p.createCanvas(gameWidth, gameWidth, p.SVG);
      
      canvasSize = gameWidth;
    }
    gameCanvas.setAttribute("style", "height:100px!important");
    p.background(	242,236,231);
    p.noFill();

   

     p.drawGrid();
    // colorToggle.addEventListener('change', (event) => { p.inputEvent() });
   // rotationToggle.addEventListener('change', (event) => { p.inputEvent() });
    //strokeToggle.addEventListener('change', (event) => { p.inputEvent() });



    //add listeners for showing/hiding sliders and other ui
    buttonGrid.addEventListener('click', (event) => { p.showSelectedFunction(buttonGrid) });
    buttonGrid.addEventListener('click', (event) => { p.showSelectedFunction(buttonGrid) });
    buttonCount.addEventListener('click', (event) => { p.showSelectedFunction(buttonCount) });
    buttonDensity.addEventListener('click', (event) => { p.showSelectedFunction(buttonDensity) });
    buttonRandom.addEventListener('click', (event) => { p.showSelectedFunction(buttonRandom) });
    restartButton.addEventListener('click', (event) => { p.restart() });
    svgButton.addEventListener('click', (event) => {  p.saveMySVG() });
    
    //p.restart();
  }


  p.draw = function () {
 
   
  }



  p.saveMySVG = function () {
   // p.save("how-to-desordres.svg");
   /* let svgElement = undefined;
   let SVGsize = 1600; 
   svgElement = document.getElementById("defaultCanvas0").children[0];
   let clonedSvgElement = svgElement.cloneNode(true);
   let outerHTML = clonedSvgElement.outerHTML,
   blob = new Blob([outerHTML],{type:'image/svg+xml;charset=utf-8'});
   let URL = window.URL || window.webkitURL || window;
   let blobURL = URL.createObjectURL(blob);
   let image = new Image();

    image.onload = () => {
      let canvas = document.createElement('canvas');
      canvas.width = SVGsize;
      canvas.height = SVGsize;
      console.log(canvas);
      let context = canvas.getContext('2d');
      // draw image in canvas starting left-0 , top - 0  
      context.drawImage(image, 0, 0, SVGsize, SVGsize);
      
      let png = canvas.toDataURL(); // default png
      //download(png, "image.png");
    };

    image.src = blobURL; */
  }

  var download = function(href, name){
    var link = document.createElement('a');
    link.download = name;
    link.style.opacity = "0";
   // document.append(link);
    link.href = href;
    link.click();
    link.remove();
  }


  p.restart = function () {

    // reset raster
    sliderSize.value = 2;
    amount = 2;
    sliderSize.style.setProperty('--value', 2);

    // reset anzahl
    sliderDensity.value = 4;
    density = 4;
    sliderDensity.style.setProperty('--value', 4);

    // reset dichte
    sliderSpacing.value = 0;
    versatzAmount = 0;
    sliderSpacing.style.setProperty('--value', 0);

    //reset zufall
    exceptionSlider.value = 1;
    exceptionAmount = 30;
    exceptionSlider.style.setProperty('--value', 1);
/*     document.getElementById("strokeToggle").checked = false;
    document.getElementById("rotationToggle").checked = false; */

    p.drawGrid();
  }

  p.inputEvent = function () {

    p.drawGrid();
  }

  p.showSelectedFunction = function (pressedButton) {
    // set all buttons to inactive
    var allButtons = gameButtons.children;
    for (var i = 0; i < allButtons.length; i++) {
      var button = allButtons[i];
      button.classList.remove("selected-text");
      button.classList.add("not-selected-text");
      //change icon color
      button.children[0].classList.remove("selected-icon");
      button.children[0].classList.add("not-selected-icon");
    }
    pressedButton.classList.remove("not-selected-text");
    pressedButton.classList.add("selected-text");
    pressedButton.children[0].classList.remove("not-selected-icon");
    pressedButton.children[0].classList.add("selected-icon");

    //set pressedButton to active
    let functionName = pressedButton.id.substring(7);

    var children = containerFunctions.children;
    for (var i = 0; i < children.length; i++) {
      var functionChild = children[i];
      functionChild.classList.add("noPointerEvents");
      functionChild.classList.add("transparent");

      if (functionName == functionChild.id.substring(9)) {
        functionChild.classList.remove("transparent");
        functionChild.classList.remove("noPointerEvents");
      }
    }
  }

  sliderSize.oninput = function () {
    p.clear();
    amount = sliderSize.value;
    p.inputEvent();
  }

  exceptionSlider.oninput = function () {
    p.clear();
    exceptionAmount = 32 - exceptionSlider.value;
    p.inputEvent();
  }

  sliderSpacing.oninput = function () {
    p.clear();
    versatzAmount = (sliderSpacing.value)/10;
    console.log()
    p.inputEvent();
  }

  sliderDensity.oninput = function () {
    p.clear();
    density = sliderDensity.value;
    p.inputEvent();
    
  }


  p.drawGrid = function () {
    console.log("drawGrid");
    //delete previous quads
    quads = [];
    p.background(	242,236,231);
    //calculate quad size
    length = (canvasSize - 2 * spacing) / amount;
    midLength = length / 2;
    for (var gridY = 0; gridY < amount; gridY++) {
      for (var gridX = 0; gridX < amount; gridX++) {
        var posX = length * gridX + midLength + spacing;
        var posY = length * gridY + midLength + spacing;
        quads.push(new Quad(posX, posY, exeption));
      }
    }

    for (let i = 0; i < quads.length; i++) {
      quads[i].drawQuad();
    }

  }


  class Quad {
    constructor(x, y, lineChangeProbability) {
      // this.quadChangeProbability = quadChangeProbability;
      this.lineChangeProbability = lineChangeProbability;
      this.x = x;
      this.y = y;
      this.length = 0;

      this.pos = p.createVector(x, y);
    }



    // Display the Points
    drawQuad() {

      /*if(exceptionToggle.checked == false){
        this.lineChangeProbability = 10000000000;
      } else{
        this.lineChangeProbability = 10;
      } */

      this.lineChangeProbability = exceptionAmount;

      let quadSize = midLength - spacing;
      quadSpacing = quadSize / density;
      p.noFill();
      for (let i = 0; i < density; i++) {
        let lineRandomness = 0;
        if(exceptionSlider.value == 1){
           lineRandomness = 0;
          
        } else{
           lineRandomness = p.int(p.random(1, this.lineChangeProbability));
        }
        
       if (lineRandomness !== 1) {

          let quadHalf = quadSize - (quadSpacing * i);
          if (quadHalf < 0) {
            quadHalf = 0;
          }
          p.push();
          if (i % 4 == 0) {
            p.translate(this.pos.x +versatzAmount*i, this.pos.y);
          }
          if (i % 4 == 1) {
            p.translate(this.pos.x , this.pos.y-versatzAmount*i);
          }
          if (i % 4 == 2) {
            p.translate(this.pos.x -versatzAmount*i, this.pos.y);
          }
          if (i % 4 == 3) {
            p.translate(this.pos.x , this.pos.y+versatzAmount*i);
          }
          

          let lineRandomness2 = p.int(p.random(1, exceptionAmount));
          if (lineRandomness2 == 1 && lineRandomness !== 0 ) {
/*             if (rotationToggle.checked == true) {
              p.rotate(p.radians(p.int(p.random(-15, 15))));
            } */
/*             if (strokeToggle.checked == true) {
              p.strokeWeight(p.int(p.random(1, 5)));
            } */
          }

          /* if (colorToggle.checked == true) {
             p.stroke(p.random(255, 0), p.random(255, 0), p.random(255, 0));
           } */

          p.quad(0 - quadHalf, 0 - quadHalf, 0 + quadHalf, 0 - quadHalf, 0 + quadHalf, 0 + quadHalf, 0 - quadHalf, 0 + quadHalf);
          p.pop();

        }
      }

    }

  }


}

let myp5 = new p5(sketch, 'game-wrapper');




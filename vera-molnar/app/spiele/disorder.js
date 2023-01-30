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
let sketch = function (p) {
  let canvasSize = 0;
  // p.preload = function () {

  // }

  p.setup = function () {

    gameWidth = gameCanvas.clientWidth;
    gameHeight = gameCanvas.clientHeight;

    if (gameWidth >= gameHeight) {
      canvas = p.createCanvas(gameHeight, gameHeight);
      canvasSize = gameHeight;
    } else {
      canvas = p.createCanvas(gameWidth, gameWidth);
      canvasSize = gameWidth;
    }
    gameCanvas.setAttribute("style", "height:100px!important");

    p.drawGrid();
    // colorToggle.addEventListener('change', (event) => { p.inputEvent() });
    rotationToggle.addEventListener('change', (event) => { p.inputEvent() });
    strokeToggle.addEventListener('change', (event) => { p.inputEvent() });



    //add listeners for showing/hiding sliders and other ui
    buttonGrid.addEventListener('click', (event) => { p.showSelectedFunction(buttonGrid) });
    buttonCount.addEventListener('click', (event) => { p.showSelectedFunction(buttonCount) });
    buttonDensity.addEventListener('click', (event) => { p.showSelectedFunction(buttonDensity) });
    buttonRandom.addEventListener('click', (event) => { p.showSelectedFunction(buttonRandom) });
    restartButton.addEventListener('click', (event) => { p.restart() });
    p.restart();
  }


  p.draw = function () {


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
    sliderSpacing.value = 5;
    quadSpacing = 5;
    sliderSpacing.style.setProperty('--value', 5);

    //reset zufall
    exceptionSlider.value = 1;
    exceptionAmount = 30;
    exceptionSlider.style.setProperty('--value', 1);
    document.getElementById("strokeToggle").checked = false;
    document.getElementById("rotationToggle").checked = false;

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
      functionChild.classList.add("dont-show");
      if (functionName == functionChild.id.substring(9)) {
        functionChild.classList.remove("dont-show");
      }
      // klasse hinzufühen, die sichtbarkeit ausschaltet
    }

    switch (functionName) {
      case 'grid':
        console.log('grid');
        //vorherige objekte ausschalten

        //objekt mit dem gleichen namen einblenden
        break;

      case 'count':
        console.log('count');
        break;

      case 'density':
        console.log('density');
        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case 'random':
        console.log('random');
        break;
      default:
        console.log(`Kein Button mit passender ID!`);
    }


  }

  sliderSize.oninput = function () {
    amount = sliderSize.value;
    p.inputEvent();
  }

  exceptionSlider.oninput = function () {
    exceptionAmount = 32 - exceptionSlider.value;
    p.inputEvent();
  }

  sliderSpacing.oninput = function () {
    quadSpacing = sliderSpacing.value;
    p.inputEvent();
  }

  sliderDensity.oninput = function () {
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
          p.translate(this.pos.x, this.pos.y);

          let lineRandomness2 = p.int(p.random(1, exceptionAmount));
          if (lineRandomness2 == 1 && lineRandomness !== 0 ) {
            if (rotationToggle.checked == true) {
              p.rotate(p.radians(p.int(p.random(-15, 15))));
            }
            if (strokeToggle.checked == true) {
              p.strokeWeight(p.int(p.random(1, 5)));
            }
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




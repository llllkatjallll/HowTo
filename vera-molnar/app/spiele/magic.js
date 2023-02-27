
var gameCanvas = document.getElementById("game-wrapper");
var restartButton = document.getElementById("button-neu");
var sectionWrapper = document.getElementById("section-wrapper-touch");
var placeholderWrapper = document.getElementById("body-wrapper");

let currentGameId = "Magie";
let points = [];
let amount = 4;
let length = undefined;
let spacing = 6;
let activationDistance = 20;
let shapePoints = [];
let magicSquare = [16, 3, 2, 13, 5, 10, 11, 8, 9, 6, 7, 12, 4, 15, 14, 1];
let resultReady = false;


var font;
let fontsize = 14;

let sketch = function (p) {

  p.preload = function () {
    font = p.loadFont('spiele/assets/OpenSans-Medium.ttf');

  }

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
    p.background(242, 236, 231);

    //text settings
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont(font);
    p.textSize(fontsize);
    p.strokeCap(p.ROUND);
    p.strokeJoin(p.ROUND);

    p.noFill();

    p.createGrid();


    gameCanvas.addEventListener('touchstart', p.process_touchstart, false);
    gameCanvas.addEventListener('touchmove', p.process_touchmove, false);
    gameCanvas.addEventListener('touchend', p.process_touchend, false);

    restartButton.addEventListener('click', function () {
      p.restart();
    });

  }


  p.draw = function () {
    
    
  }

  p.restart = function () {
    p.background(242, 236, 231);

    for (let i of points) {
      i.used = 0;
    }
    shapePoints = [];
    resultReady = false;
    p.drawGrid();
  }

  p.checkIfFinished = function () {
    if (!resultReady) {
      if (shapePoints.length == 16) {
          //p.clear();
          p.background(242, 236, 231);
          p.showResultShape();
        console.log("showResultShape");
      }
    } 
  }

  p.process_touchstart = function () {


    sectionWrapper.classList.add("hideOverflow");
    placeholderWrapper.classList.add("hideOverflow");

    for (let i of points) {
      i.pointDraw();
    }

    p.checkIfFinished();

  }

  p.process_touchmove = function () {
    for (let i of points) {
      i.pointDraw();
    }
    p.checkIfFinished();
  }


  p.process_touchend = function () {
    for (let i of points) {
      i.pointDraw();
    }

    p.checkIfFinished();
    sectionWrapper.classList.remove("hideOverflow");
    placeholderWrapper.classList.remove("hideOverflow");
  }


  p.createGrid = function () {
    //calculate quad size
    length = (canvasSize - 2 * spacing) / amount;
    midLength = length / 2;
    var i = 0;
    for (var gridY = 0; gridY < amount; gridY++) {
      for (var gridX = 0; gridX < amount; gridX++) {
        var posX = length * gridX + midLength + spacing;
        var posY = length * gridY + midLength + spacing;
        points.push(new Point(posX, posY, magicSquare[i]));
        i++;
      }
    }

    p.drawGrid();

  }

  p.drawGrid = function () {
    //p.background(242, 236, 231);
    for (let i of points) {
      i.display(100);
    }
  }


  p.showResultShape = function () {
    
    p.drawLine();
    resultReady = true;
    sectionWrapper.classList.remove("hideOverflow");
    placeholderWrapper.classList.remove("hideOverflow");
  }

  p.drawLine = function () {

    p.noFill();
    p.stroke(0);
    p.strokeWeight(2);

     p.beginShape();
    for (let i = 0; i < shapePoints.length; i++) {
      p.vertex(shapePoints[i].x, shapePoints[i].y);
    }
    p.endShape(); 

    console.log("done");

  }

  class Point {
    constructor(x, y, number) {
      this.x = x;
      this.y = y;
      this.number = number;
      this.used = false;
    }

    // Display the Points
    display(p_rad) {
      if (this.used) {
  
        p.noStroke();
        p.fill(237, 231, 226);
      } else {

        p.noStroke();
        p.fill(222, 216, 211);
      }
     
      p.ellipse(this.x, this.y, 30);

      if (this.used) {
        p.fill(170, 170, 170);
      } else {
        p.fill(0);
      }

      p.push();
      p.translate(this.x, this.y - fontsize / 5);
      p.text(this.number, 0, 0);
      p.pop();

    }

    pointDraw() {
      if (!this.used) {
        this.checkDistance();
      }
    }

    checkDistance() {
      if (p.dist(p.mouseX, p.mouseY, this.x, this.y) < activationDistance) {
        console.log("near" + p.mouseX);
        let newPos = p.createVector(this.x, this.y);
        p.append(shapePoints, newPos);
        this.used = true;
        p.drawGrid();
        p.drawLine();
      }
    }

  }


}

let myp5 = new p5(sketch, 'game-wrapper');

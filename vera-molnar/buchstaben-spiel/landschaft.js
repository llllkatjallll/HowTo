var gameCanvas = document.getElementById("game-content");
var restartButton = document.getElementById("restartButton");
var canvas;
let balls = [];

let shapePoints = [];
let startMode = true;
let stop = false;
let currentGameId = "landschaft";
let timer = 0;

let sketch = function (p) {

   // p.preload = function () {

   // }
  
    p.setup = function () {
        
      gameWidth = gameCanvas.clientWidth;
      gameHeight = gameCanvas.clientHeight;
      canvas = p.createCanvas(gameWidth, gameWidth);

      restartButton.addEventListener('click', function () { 
        console.log("Restart");
        p.restart();
      });
    }


    p.draw = function () {
      if (startMode) {
        p.drawLine();
      } else {
        if(!stop){
        p.createArt();
          }
      }
          
    }



    p.touchStarted = function () {
      p.restart();
      if(startMode){
        let newPos = p.createVector(p.mouseX, p.mouseY);
        p.append(shapePoints, newPos);
        }
    }

    p.touchMoved = function () {
      if (p.frameCount % 5 == 0){
        if(startMode){
       let newPos = p.createVector(p.mouseX, p.mouseY);
       p.append(shapePoints, newPos);
       }
    }
  }

    p.touchEnded = function () {
      startMode = !startMode;
    }

    p.keyPressed = function () {
      

    }

    p.drawLine = function () {

      p.background(235);
      p.noFill();
      p.beginShape();
      for (let i = 0; i < shapePoints.length; i++) {
        p.vertex(shapePoints[i].x, shapePoints[i].y);
      }
        p.endShape();

    }

let k = 1;
    p.createArt = function () {
    
      if (p.millis() >= 2600+timer) {
        k = k+1;
        timer = p.millis();
      }


      
        p.beginShape();
      for (let i = 0; i < shapePoints.length; i++) {
        p.vertex(
          //shapePoints[i].x + p.random(0 * k, 0 * k),
          //shapePoints[i].y + p.random(0 * k, 0 * k)
          shapePoints[i].x + 0,
          shapePoints[i].y +  p.random(1 * k, 30 * k) 
        );
      }
        p.endShape();
    
    stop = true;

    }

    p.restart = function () {
      startMode = true;
      stop = !true;
      shapePoints = [];
      p.background(235);
    }


   


}

let myp5 = new p5(sketch, 'game-content');
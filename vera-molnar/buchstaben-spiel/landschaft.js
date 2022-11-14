
let shapePoints = [];
let startMode = true;
let stop = false;

let sketch = function (p) {

   // p.preload = function () {

   // }
  
    p.setup = function () {
        
      gameWidth = gameCanvas.clientWidth;
      gameHeight = gameCanvas.clientHeight;
      canvas = p.createCanvas(gameWidth, gameWidth);


    }


    p.draw = function () {
      if (startMode) {
        drawLine();
      } else {
        if(!stop){
        createArt();
          }
      }
          
    }



    p.touchStarted = function () {
      if(startMode){
        let newPos = p.createVector(mouseX, mouseY);
        append(shapePoints, newPos);
        }
    }

    class newClassBall {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
    
        // Display the Points
        display(p_rad) {
          p_rad = this.radius;
        }

    }


}

let myp5 = new p5(sketch, 'game-content');


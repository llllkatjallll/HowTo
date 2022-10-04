var gameCanvas = document.getElementById("game-content");
var canvas;
let balls = [];

let sketch = function (p) {

   // p.preload = function () {

   // }
  
    p.setup = function () {
        
      gameWidth = gameCanvas.clientWidth;
      gameHeight = gameCanvas.clientHeight;
      canvas = p.createCanvas(gameWidth, gameWidth+50);
        p.background(0,120,0);
       // balls.push(new newClassBall(x, y));
      //  for (let i of balls) {
       //// }
    }


    p.draw = function () {
        
          
    }



    p.newFunction = function () {

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



var canvas;
let balls = [];

let sketch = function (p) {

   // p.preload = function () {

   // }
  
    p.setup = function () {
        
        canvas = p.createCanvas(300, 300);
        p.background(0,0,0);
        balls.push(new newClassBall(x, y));
        for (let i of balls) {
            i.display(x / 2)  
        }
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


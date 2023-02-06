var gameCanvas = document.getElementById("game-content");
var canvas;
let currentGameId = "zufall";
let balls = [];

let threshold = 5;
let accChangeX = 0;
let accChangeY = 0;
let accChangeT = 0;
let gameWidth,gameHeight = 0;

let sketch = function (p) {

   // p.preload = function () {

   // }
  
    p.setup = function () {
        console.log(gameCanvas);
        gameWidth = gameCanvas.clientWidth, SVG;
        gameHeight = gameCanvas.clientHeight,SVG;
        canvas = p.createCanvas(gameWidth, gameWidth+50);
        p.background(255);
        p.rectMode(p.CENTER);
        for (let i = 0; i < 6; i++) {
          balls.push(new Ball());
        }

        //IOS GYRO
        // DeviceOrientationEvent, DeviceMotionEvent
        if (typeof (DeviceOrientationEvent) !== 'undefined' && typeof (DeviceOrientationEvent.requestPermission) === 'function') {
            // ios 13 device

            DeviceOrientationEvent.requestPermission()
                .catch(() => {
                    // show permission dialog only the first time
                    let button = p.createButton("click to allow access to sensors");
                    button.style("font-size", "24px");
                    button.center();
                    button.mousePressed(p.requestAccess);
                    
                    //throw p.error;
                })
                .then(() => {
                    // on any subsequent visits
                    permissionGranted = true;
                })
        } else {
            // non ios 13 device
            p.textSize(48);
            // text("non ios 13 device", 100, 100);
            permissionGranted = true;
        }
          
        svgButton.addEventListener('click', (event) => {  p.saveMySVG() });
    }

    p.draw = function () {
        if (!permissionGranted) return;
        p.background(255);

        for (let i = 0; i < balls.length; i++) {
          balls[i].move();
          balls[i].display();
        }
        
        p.checkForShake();  
    }

    p.saveMySVG = function () {
      p.save("how-to-desordres.svg");
  
    }

    p.checkForShake = function () {
        // Calculate total change in accelerationX and accelerationY
        accChangeX = p.abs(p.accelerationX - p.pAccelerationX);
        accChangeY = p.abs(p.accelerationY - p.pAccelerationY);
        accChangeT = accChangeX + accChangeY;
        // If shake
        if (accChangeT >= threshold) {
            for (let i = 0; i < balls.length; i++) {
                balls[i].shake();
                balls[i].turn();
            }
        }
        // If not shake
        else {
            for (let i = 0; i < balls.length; i++) {
                balls[i].stopShake();
                balls[i].turn();
                balls[i].move();
            }
        }

    }

    p.requestAccess = function () {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response == 'granted') {
                    permissionGranted = true;
                } else {
                    permissionGranted = false;
                }
            })
            .catch(console.error);

        this.remove();
    }



    class Ball {
        constructor() {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.diameter = 90;
          this.xspeed = p.random(0);
          this.yspeed = p.random(0);
          this.oxspeed = this.xspeed;
          this.oyspeed = this.yspeed;
          this.rotation = p.random(0,180);
          this.direction = 0.7;
        }
      
        move() {
          this.x += this.xspeed * this.direction;
          this.y += this.yspeed * this.direction;
        }
      
        // Bounce when touch the edge of the canvas
        turn() {
          if (this.x < 0) {
            this.x = 0;
            this.rotation =this.rotation+20;
            this.direction = -this.direction;
          } else if (this.y < 0) {
            this.y = 0;
            this.direction = -this.direction;
            this.rotation =this.rotation+20;
          } else if (this.x > p.width - 20) {
            this.x = p.width - 20;
            this.direction = -this.direction;
            this.rotation =this.rotation+20;
          } else if (this.y > p.height - 20) {
            this.y = p.height - 20;
            this.direction = -this.direction;
            this.rotation =this.rotation+20;
          }
          
          
        }
      
        // Add to xspeed and yspeed based on
        // the change in accelerationX value
        shake() {
          this.xspeed += p.random(0, accChangeX / 20);
          this.yspeed += p.random(0, accChangeX / 20);
        }
      
        // Gradually slows down
        stopShake() {
          if (this.xspeed > this.oxspeed) {
            this.xspeed -= 0.6;
          } else {
            this.xspeed = this.oxspeed;
          }
          if (this.yspeed > this.oyspeed) {
            this.yspeed -= 0.6;
          } else {
            this.yspeed = this.oyspeed;
          }
        }
      
        display() {  
            p.push();
        let randomPosition = p.createVector(p.random(0+50,p.width-50),p.random(50,p.height-50));
          p.fill(252,0,2,190);
          p.noStroke();
          p.translate(this.x,this.y);
          p.rotate(this.rotation);
         
          p.rect(0,0, this.diameter, this.diameter);
        p.pop();
          
        }
      }

}

let myp5 = new p5(sketch, 'game-content');





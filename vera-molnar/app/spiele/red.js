var gameCanvas = document.getElementById("game-wrapper");
var restartButton = document.getElementById("button-neu");
var iosButton = document.getElementById("button-ios");
var canvas;
let currentGameId = "red";
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
        gameWidth = gameCanvas.clientWidth;
        gameHeight = gameCanvas.clientHeight;
        canvas = p.createCanvas(gameWidth, gameWidth+50);
        p.background(245);
        p.rectMode(p.CENTER);
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
          balls.push(new Ball(gameWidth/3.5*i+gameWidth/4.6, gameWidth/3.5*j +gameWidth/3.5));
        }

        restartButton.addEventListener('click', function () { 
          console.log("Restart");
          p.restart();
        });

        
      }

        //IOS GYRO
        // DeviceOrientationEvent, DeviceMotionEvent
        if (typeof (DeviceOrientationEvent) !== 'undefined' && typeof (DeviceOrientationEvent.requestPermission) === 'function') {
            // ios 13 device

            DeviceOrientationEvent.requestPermission()
                .catch(() => {
                    // show permission dialog only the first time
                    let button = p.createButton("click to allow access to sensors");
                    button.style("z-index", "70000");
                    button.center();
                    button.mousePressed(p.requestAccess);

                    iosButton.addEventListener('click', function () { 
                      
                      p.requestAccess();
                    });
                    
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
          
    }

    p.draw = function () {
        if (!permissionGranted) return;
        p.background(245);

        for (let i = 0; i < balls.length; i++) {
          balls[i].move();
          balls[i].display();
        }
        
        p.checkForShake();  
    }

    p.restart = function () {
      
        for (let i = 0; i < balls.length; i++) {
          balls[i].x = balls[i].xStart;
          balls[i].y = balls[i].yStart;
          balls[i].rotation = p.random(-0,0);
    }
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
        constructor(xPos, yPos) {
          this.x = xPos;
          this.y = yPos;
          this.xStart = xPos;
          this.yStart = yPos;
          this.diameter = gameCanvas.clientWidth/4;
          this.xspeed = p.random(0);
          this.yspeed = p.random(0);
          this.oxspeed = this.xspeed;
          this.oyspeed = this.yspeed;
          this.rotation = p.random(-0,0);
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

let myp5 = new p5(sketch, 'game-wrapper');





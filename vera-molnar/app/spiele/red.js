var gameCanvas = document.getElementById("game-wrapper");
var restartButton = document.getElementById("button-neu");
var iosButton = document.getElementById("button-ios");
let svgButton = document.getElementById("button-speichern");
var canvas;
let currentGameId = "Zufall";
let balls = [];

let threshold = 5;
let accChangeX = 0;
let accChangeY = 0;
let accChangeT = 0;
let gameWidth,gameHeight = 0;
let length = undefined;
let midLength = undefined;
let spacing = 30;
let amount = 3;

let sketch = function (p) {

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


    p.background(242, 236, 231);
    p.rectMode(p.CENTER);

    length = (canvasSize - 2 * spacing) / amount;
    midLength = length / 2;
    //quad size
    size = length-spacing/8;

    for (let i = 0; i < amount; i++) {
      for (let j = 0; j < amount; j++) {
        var posX = length * i + midLength + spacing;
        var posY = length * j + midLength + spacing;
        balls.push(new Ball(posX, posY));
      }
      //svgButton.addEventListener('click', (event) => {  p.saveMySVG() });
      restartButton.addEventListener('click', function () {
        console.log("Restart");
        p.restart();
      });

      p.restart();
    }

        //IOS GYRO
        // DeviceOrientationEvent, DeviceMotionEvent
        if (typeof (DeviceOrientationEvent) !== 'undefined' && typeof (DeviceOrientationEvent.requestPermission) === 'function') {
            // ios 13 device

            DeviceOrientationEvent.requestPermission()
                .catch(() => {
                    // show permission dialog only the first time
                    let button = p.createButton("SPIEL STARTEN");;
                    
                    button.style("z-index", "70000");
                    button.style("padding", "0.4em 0.6em 0.2em 0.6em");
                    button.style("background-color", "black");
                    button.style("color", "white");
                    button.style("border-radius", "0.4em");
                    button.style("font-size", "1em");
                    button.position(gameWidth/2, -gameHeight);
                    button.center();
                    button.mousePressed(p.requestAccess);
                    button.id(iosAccessButton);
                    
                    
                    //throw p.error;
                })
                .then(() => {
                    // on any subsequent visits
                    permissionGranted = true;
                    p.restart();
                })
        } else {
            // non ios 13 device
            p.textSize(48);
            // text("non ios 13 device", 100, 100);
            permissionGranted = true;
            p.restart();
        }
          
    }

    p.draw = function () {
      p.clear();
      p.background(	242,236,231);

        for (let i = 0; i < balls.length; i++) {
          balls[i].move();
          balls[i].display();
        }
        
        p.checkForShake(); 
      
    }

    p.saveMySVG = function () {
      p.save("how-to-zufall.svg");
  
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
        //console.log("change " + accChangeT);
        // If shake
        if (accChangeT >= threshold) {
          p.enableDownload();
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

    p.enableDownload = function () {

      //change button state
      saveButton.classList.remove("disabled");
      //set boot to show that there are new changes
      newChanges = true;
    }

    p.requestAccess = function () {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response == 'granted') {
                    permissionGranted = true;
                    p.restart();
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
          this.diameter = size;
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
          if (this.x < size/2) {
            this.x = size/2;
            this.rotation =this.rotation+size/2;
            this.direction = -this.direction;
          } else if (this.y < size/2) {
            this.y = size/2;
            this.direction = -this.direction;
            this.rotation =this.rotation+size/2;
          } else if (this.x > p.width - size/2) {
            this.x = p.width - size/2;
            this.direction = -this.direction;
            this.rotation =this.rotation+size/2;
          } else if (this.y > p.height - size/2) {
            this.y = p.height - size/2;
            this.direction = -this.direction;
            this.rotation =this.rotation+size/2;
          }
          
          
        }
      
        // Add to xspeed and yspeed based on
        // the change in accelerationX value
        shake() {
          this.xspeed += p.random(0, accChangeX / 20);
          this.yspeed += p.random(0, accChangeX / 20);
          this.rotation =this.rotation+ p.random(-0.1,0.1);
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





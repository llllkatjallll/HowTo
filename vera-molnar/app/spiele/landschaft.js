var gameCanvas = document.getElementById("game-wrapper");
var restartButton = document.getElementById("button-neu");
var sectionWrapper = document.getElementById("section-wrapper-touch");
var placeholderWrapper = document.getElementById("placeholder-wrapper");
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
      p.background(235);

      gameCanvas.addEventListener('touchstart', p.process_touchstart, false);
      gameCanvas.addEventListener('touchmove', p.process_touchmove, false);
      gameCanvas.addEventListener('touchend', p.process_touchend, false);


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



    p.process_touchstart = function () {
      sectionWrapper.classList.add("hideOverflow");
     //  sectionWrapper.classList.add("scroll-snap");
      placeholderWrapper.classList.add("hideOverflow");
      p.restart();
      if(startMode){
        let newPos = p.createVector(p.mouseX, p.mouseY);
        p.append(shapePoints, newPos);
        }
    }

    p.process_touchmove = function () {
      if (p.frameCount % 5 == 0){
        if(startMode){
       let newPos = p.createVector(p.mouseX, p.mouseY);
       p.append(shapePoints, newPos);
       }
    }
  }

    p.process_touchend = function () {
     sectionWrapper.classList.remove("hideOverflow");
    // sectionWrapper.classList.remove("scroll-snap");
     placeholderWrapper.classList.remove("hideOverflow");
      startMode = !startMode;
    }

    p.keyPressed = function () {
      

    }

    p.drawLine = function () {

     // p.background(235);
      p.noFill();
      p.strokeWeight(0.7);
      p.beginShape();
      for (let i = 1; i < shapePoints.length; i++) {
        p.vertex(shapePoints[i].x, shapePoints[i].y);
      }
        p.endShape();

    }

let k = 1;
    p.createArt = function () {
    
      if (p.frameCount%2 == 0) {
        k = k+1;
      
        p.beginShape();
      for (let i = 1; i < shapePoints.length; i++) {
        p.vertex(
          shapePoints[i].x + 0,
          //shapePoints[i].y +  p.random(2.2*k ) 
          shapePoints[i].y + p.random(0,2.2*k)
        );
      }
        p.endShape();

        if(k>= 400){
          stop = true;
        }
    
      }
    //

    }

    p.restart = function () {
      startMode = true;
      stop = !true;
      shapePoints = [];
      p.background(235);
      k=0;
    }


   


}

let myp5 = new p5(sketch, 'game-wrapper');

/*
let gameVisible = false;
var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true){
		console.log('Element is fully visible in screen');
    gameVisible = true;} else{
      gameVisible = false;
      console.log('Element is NOT visible in screen');
    }
}, { threshold: [1] });

observer.observe(document.querySelector("#game-wrapper")); */
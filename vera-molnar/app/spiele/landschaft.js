var gameCanvas = document.getElementById("game-wrapper");
var restartButton = document.getElementById("button-neu");
var holdButton = document.getElementById("button-stop");
let svgButton = document.getElementById("button-speichern");

var sectionWrapper = document.getElementById("section-wrapper-touch");
var placeholderWrapper = document.getElementById("body-wrapper");
var canvas;
let balls = [];

let shapePoints = [];
let startMode = true;
let stop = false;
let currentGameId = "Spur";
let timer = 0;

var x = 0,
    y = 0,
    px = 0,
    py = 0,
    easing = 0.3;

let sketch = function (p) {

   // p.preload = function () {

   // }
   
  
    p.setup = function () {
        
      gameWidth = gameCanvas.clientWidth;
      gameHeight = gameCanvas.clientHeight;
      canvas = p.createCanvas(gameWidth, gameWidth, p.SVG);
      p.background(	242,236,231);
      p.noFill();
      p.strokeWeight(0.7);

      gameCanvas.addEventListener('touchstart', p.process_touchstart, false);
      gameCanvas.addEventListener('touchmove', p.process_touchmove, false);
      gameCanvas.addEventListener('touchend', p.process_touchend, false);
      //svgButton.addEventListener('click', (event) => {  p.saveMySVG() });


      restartButton.addEventListener('click', function () { 
        //console.log("Restart");
        p.neu();
      });

      holdButton.addEventListener('click', function () { 
        
        stop=!stop;
        if(stop){
          holdButton.innerHTML="<div class="+"text-button-icon "+ "id=" +"icon-play-dark"+"></div>"+"Weiter";
        } else{
          holdButton.innerHTML="<div class="+"text-button-icon "+ "id=" +"icon-pause-dark"+"></div>"+"Stop";
        }
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

    p.saveMySVG = function () {
      p.save("how-to-desordres.svg");
  
    }

    p.process_touchstart = function () {
      //console.log("process_touchstart");

      p.restart();
      sectionWrapper.classList.add("hideOverflow");
      placeholderWrapper.classList.add("hideOverflow");
      holdButton.classList.remove("disabled");
      restartButton.classList.remove("disabled");

      //p.restart();
      if(startMode){
       
        let newPos = p.createVector(p.mouseX, p.mouseY);
        p.append(shapePoints, newPos);
        }  
        
    }

    p.process_touchmove = function () {
      //console.log("process_touchmove");
        if (p.frameCount % 5 == 0){
        if(startMode){
       let newPos = p.createVector(p.mouseX, p.mouseY);
       p.append(shapePoints, newPos);
       }  
  } 
}
    p.process_touchend = function () {
   sectionWrapper.classList.remove("hideOverflow");
    placeholderWrapper.classList.remove("hideOverflow");
    startMode = !startMode;  
    p.enableDownload();
    //console.log(shapePoints);
    }

    p.enableDownload = function () {

      //change button state
      saveButton.classList.remove("disabled");
      //set boot to show that there are new changes
      newChanges = true;
    }

    let capturedPoints = 0;

    p.drawLine = function () {

     // p.background(235);

      //if there are new points, draw again
      if(capturedPoints < shapePoints.length ){

      p.beginShape();
      
      for (let i = 1; i < shapePoints.length; i++) {
        p.vertex(shapePoints[i].x, shapePoints[i].y);
      }
        p.endShape();
        capturedPoints = shapePoints.length;
      }

    }

    let k = 1;

    p.createArt = function () {
    //console.log("art");
      if (p.frameCount%6 == 0) {
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
        } else{
          p.enableDownload();
        }
    
      }
    //

    }

    p.restart = function () {
   
       startMode = true;
      stop = !true;
    shapePoints = [];
    capturedPoints = 0;
      //
       k=0; 
      holdButton.innerHTML="<div class="+"text-button-icon "+ "id=" +"icon-pause-dark"+"></div>"+"Stop";
      restartButton.classList.add("disabled");
      svgButton.classList.add("disabled");
    }

    p.neu = function () {
      p.background(242,236,231);
       startMode = true;
      stop = !true;
      shapePoints = [];
      capturedPoints = 0;
      //
       k=0; 
      holdButton.innerHTML="<div class="+"text-button-icon "+ "id=" +"icon-pause-dark"+"></div>"+"Stop";
      holdButton.classList.add("disabled");
      restartButton.classList.add("disabled");
      svgButton.classList.add("disabled");
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
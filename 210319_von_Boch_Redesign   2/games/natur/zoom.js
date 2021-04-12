var capture,captureHeight,canvas;
let cameraBtn, infoBtn, newCaptureBtn, invertBtn,galleryBtn,backBtn, nextBtn, saveBtn,contrastBtn,selectImageBtn;
let gamebar;
let cameraWrapper, downloadWrapper, shootWrapper,galleryWrapper,nextWrapper, selectWrapper;
let sliderContrast,sliderCircleSize;
var imgs = [];
var w, h;
var touchX =0;
var touchY =0;
var picture;
var editedPicture;
var ongoingEditedPicture;
var firstEdit = false;
var options = {
  video: {

    facingMode: {
      // exact: "environment"
     // exact: "user"
    },
    // mandatory: {
    // maxWidth: 300,
    // maxHeight: 300
    //}

  }
};

// variables for time-animations
var flash = false;
var flashCounter = 0;
var editing = false;
var editMode = false;
var startEditingStepsDone =true;

var showImageTest = false;
var alpha = 0;

var shutterSound;

//gallery part
var currentSelectedImageId = undefined;

//bools
var selectedImageMode = false;
var contrastSliderOn = false;
var circleSliderOn = false;

var s = 0;
var r = 0;
var p = 0;
var temp_s =1;
let start_pos = new p5.Vector(0, 0);
let temp_pos = new p5.Vector(0, 0);
let pos = new p5.Vector(0, 0);
let dist_x = 0;
let dist_y = 0;

let sketch = function(p) {

  p.preload = function(){
    // shutterSound = p.loadSound('games/natur/src/shutter.wav');
    // for (var i=1; i < 6; i++) {
    //   imgs[i] = p.loadImage("games/natur/img/img"+i +".png"); 
    // }
  } 



  p.setup = function() {

    // DEFINE CANVAS
    w = window.innerWidth - 60;
    h = window.innerHeight - 60;
    captureHeight = w / 3 * 4;
    canvas = p.createCanvas(w, captureHeight);
    p.pixelDensity(1);
    //FUTURE: CHECK PHONE PROPORTIONS
    //canvas.parent("game-content");
    p.background(255);
    //capture = p.createCapture(p.VIDEO);
   // capture = p.createCapture(options);
   // capture.hide();
    
     //GENERAL BUTTONS
    galleryBtn = document.getElementById("button-gallery");
    backBtn = document.getElementById("button-zurueck"); //necessary?
    cameraBtn = document.getElementById("button-shoot");
    newCaptureBtn = document.getElementById("button-camera");
    saveBtn = document.getElementById("button-download");
    selectImageBtn = document.getElementById("button-select");
    nextBtn = document.getElementById("button-weiter");
    infoBtn = document.getElementById("button-intro");
    gamebar = document.getElementById("gamebar");
    cameraWrapper = document.getElementById("button-wrapper-camera");
    downloadWrapper = document.getElementById("button-wrapper-download");
    shootWrapper = document.getElementById("button-wrapper-shoot");
    galleryWrapper = document.getElementById("button-wrapper-gallery");
    nextWrapper = document.getElementById("button-wrapper-weiter");
    selectWrapper = document.getElementById("button-wrapper-select");
    //GAME RELATED BUTTONS
    //game PHOTOGRAM
    invertBtn = document.getElementById("button-download");
    //game NATURE
    contrastBtn = document.getElementById("button-download");
     
    // GENERAL BUTTONS VISIBILITY
    // newCaptureBtn.style.display =  "none";
    // saveBtn.style.display =  "none";
    // saveBtn.style.visibility =  "visible";
    // selectImageBtn.style.display =  "none";
/*
    //GAME RELATED VISIBILITY
      // game PHOTOGRAM

    
      //game NATURE
      contrastBtn.style.visibility =  "hidden";
      */
     if(document.getElementById("contrast-container")!=null){
      sliderContrast = p.createSlider(-200, 200, 0);
      sliderContrast.id('contrast-range');
      sliderContrast.addClass('rotatedSlider');
      sliderContrast.addClass('disappear');
      sliderContrast.parent('contrast-container');
      }
      //game LICHT
    
      p.rectMode(p.CENTER);
      currentX = p.width/2;

      pos.x = p.width/2;
      pos.y = p.height/2;

  };

  p.draw = function() {
    
  
  };


  


p.scaleEndRect = function(event) {
  temp_s = temp_s + s;
   s = 0;
}

p.endPan = function(event) {
 pos.x = pos.x-dist_x;
 pos.y =pos.y-dist_y;
 dist_x = 0;
 dist_y = 0
}

p.startPan = function (event) {
start_pos = (event.center);
}


p.rotateRect = function (event) {
// console.log(event);
 r = radians(event.rotation);
}

p.scaleRect = function (event) {
s = (event.scale-1)*3.4;
}

p.panRect = function  (event) {
temp_pos = (event.center);
console.log(temp_pos.x); 
 dist_x = start_pos.x-temp_pos.x;
 dist_y = start_pos.y-temp_pos.y;

}


  


};

let myp5 = new p5(sketch, 'game-content');
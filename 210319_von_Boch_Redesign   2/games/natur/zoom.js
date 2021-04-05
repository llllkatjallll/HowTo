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

var s = 1.0;
var r = 0;
var currentX = 0;

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
  };

  p.draw = function() {
    
    p.background(0,233,0);
    p.fill(0);
    
    p.ellipse(p.width/2, p.height/2, p.windowWidth*0.5, p.windowWidth*0.5);
    currentX = currentX+r;
    p.fill(255);
    p.translate(currentX, p.height/2);
    r = 0;
    //p.rotate(r);
   // p.scale(s);
    p.rect(0, 0, p.windowWidth*0.1, p.windowWidth*0.1);
  };


  p.rotateRect = function(x) {
    
    r = p.map(x,0,p.windowWidth,-p.windowWidth/2,p.windowWidth/2);
    console.log(r);
  };


  p.scaleRect = function(event) {
    
    console.log(event);
    s = event.scale;
  };

  

};

let myp5 = new p5(sketch, 'game-content');
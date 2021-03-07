var capture,captureHeight;
let switchFlag = false;
let shootBtn, newCaptureBtn, invertBtn,galleryBtn,backBtn;
let img1,img2,img3;
var imgs = [];
var w, h;
var picture;
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

var showImageTest = false;
var alpha = 0;

var shutterSound;
var galleryElement;

//gallery part
var currentSelectedImageId = undefined;

//bools
var selectedImageMode = false;

let sketch = function(p) {

  p.preload = function(){
    for (var i=1; i<6; i++) {
      imgs[i] = p.loadImage("/img/img"+i+".png"); 
    }
    
  }

  p.setup = function() {
    w = document.querySelector('body').clientWidth;
    h = document.querySelector('body').clientHeight;

    captureHeight = w / 3 * 4;

    p.createCanvas(w, captureHeight);
    //capture = p.createCapture(p.VIDEO);
    capture = p.createCapture(options);
    // capture.size(document.querySelector('body').clientWidth, document.querySelector('body').clientHeight);
    capture.hide();

    galleryElement = p.select('#img2');
   // galleryElement.mouseClicked(p.test);
    

    shutterSound = p.loadSound('src/shutter.wav');

    backBtn = p.createButton('back');
    backBtn.parent('toolbar');
    backBtn.mousePressed(p.goToPhotoView);
    backBtn.addClass('myButton');
    backBtn.id('backBtn');


    galleryBtn = p.createButton('gallery');
    galleryBtn.parent('toolbar');
    galleryBtn.mousePressed(p.activateGallery);
    galleryBtn.addClass('myButton');
    galleryBtn.id('galleryBtn');


    shootBtn = p.createButton('shoot pic');
    shootBtn.parent('toolbar');
    shootBtn.mousePressed(p.shoot);
    shootBtn.addClass('myButton');
    shootBtn.id('shootBtn');


    newCaptureBtn = p.createButton('photo');
    newCaptureBtn.parent('toolbar');
    newCaptureBtn.mousePressed(p.newCapture);
    newCaptureBtn.addClass('myButton');
    newCaptureBtn.id('newCaptureBtn');
    document.getElementById("newCaptureBtn").style.visibility =  "hidden";

    invertBtn = p.createButton('invert pic');
    invertBtn.parent('game-toolbar');
    invertBtn.mousePressed(p.invert);
    invertBtn.addClass('myButton');
    invertBtn.id('invertBtn');
    document.getElementById("invertBtn").style.visibility =  "hidden";

    saveBtn = p.createButton('save');
    saveBtn.parent('toolbar');
    saveBtn.mousePressed(p.saveArtwork);
    saveBtn.addClass('myButton');
    saveBtn.id('saveBtn');
    document.getElementById("saveBtn").style.visibility =  "hidden";
 
    selectImageBtn = p.createButton('SELECT');
    selectImageBtn.parent('toolbar');
    selectImageBtn.mousePressed(p.selectedImageMode);
    selectImageBtn.addClass('myButton');
    selectImageBtn.id('selectImageBtn');
    document.getElementById("selectImageBtn").style.visibility =  "hidden";   

  };

  

  p.draw = function() {
    //wenn nicht editiert wird
    if (!editing) {
      //p.background(0);
      p.image(capture, 0, 0, w, captureHeight);
      p.filter(p.GRAY);
      if (picture != null) {
        //p.image(picture, 0, 0, 300, 300);
      }
       capture.get(0, 0, w, captureHeight);
      if (editMode) {
        //capture.get(0, 0, w, captureHeight);
        capture.loadPixels();
        picture = capture.get(0, 0, 300, 300);
        picture.loadPixels();
        editMode=false;
        p.print(picture);
      }

      if(flash && flashCounter < 6){
        flashCounter+=1;
        p.fill(0);
        p.rect(0,0,w,h);
      }

      //picture.resize(w, captureHeight);
      
    }

    if(showImageTest && alpha < 255){
       p.background(255);
      p.tint(255, alpha);
      p.image(picture, 0,0);
      alpha+=1;
    }

    if(selectedImageMode==true){
      p.image(imgs[currentSelectedImageId],0,0,w,h);
    }   
  };

  p.goToPhotoView = function(){
    //start camera
    capture.play();
    editing=false;
    //hide buttons
    
    
    //hide gallery
    document.getElementById("gallery").classList.remove("gallery-animation");
    document.getElementById("gallery").classList.add("gallery-animation-reverse");
    
    //show buttons
    document.getElementById("galleryBtn").style.visibility =  "visible";
    document.getElementById("shootBtn").style.visibility =  "visible";
    document.getElementById("gallery").title="";
  }

  p.activateGallery = function(){
    //stop filming
    capture.pause();
    editing=true;
    
    document.getElementById("gallery").classList.remove("gallery-animation-reverse");
    //hide gallery Button
    document.getElementById("galleryBtn").style.visibility =  "hidden";
    document.getElementById("shootBtn").style.visibility =  "hidden";
    document.getElementById("saveBtn").style.visibility =  "hidden";   
    //show gallery canvas
    document.getElementById("gallery").style.visibility =  "visible";
    document.getElementById("selectImageBtn").style.visibility =  "hidden";  
    document.getElementById("gallery").classList.add("gallery-animation");
    //show buttons
    
    
    
  }


  p.selectedImageMode = function(){
    
    //hide buttons
    document.getElementById("selectImageBtn").style.visibility =  "hidden"; 
   //hide gallery
    document.getElementById("gallery").classList.remove("gallery-animation");
    document.getElementById("gallery").classList.add("gallery-animation-reverse");

    //show buttons
    document.getElementById("galleryBtn").style.visibility =  "visible";
    document.getElementById("shootBtn").style.visibility =  "visible";
    document.getElementById("invertBtn").style.visibility =  "visible";
    //activate image editing

    currentSelectedImageId = document.getElementById("gallery").title;
    if(currentSelectedImageId.length>0){
      selectedImageMode = true;
      var currentImage = imgs[currentSelectedImageId];
      currentImage.loadPixels();
      picture = currentImage.get();
    }
    
    
    //
    
  }

  p.shoot = function() {
    if (capture.loadedmetadata) {

    }
    capture.loadPixels();
    picture = capture.get();
    //picture.resize(w, captureHeight);
    p.print(picture);
    capture.pause();
    flash = true;
    shutterSound.play();
    document.getElementById("shootBtn").style.visibility ="hidden";
    document.getElementById("newCaptureBtn").style.visibility =  "visible";
    document.getElementById("invertBtn").style.visibility =  "visible";
    document.getElementById("saveBtn").style.visibility =  "visible";
  };


  p.newCapture = function() {
    picture = null;
    editMode = false;
    editing = false;
    alpha = 0;
    flashCounter = 0;
    showImageTest = false;
    flash = false;
    capture.play();

    document.getElementById("shootBtn").style.visibility ="visible";
    document.getElementById("newCaptureBtn").style.visibility =  "hidden";
    document.getElementById("invertBtn").style.visibility =  "hidden";
    document.getElementById("saveBtn").style.visibility =  "hidden";
  };

  p.saveArtwork = function() {
  picture.save();
  };


  p.invert = function() {
    editing = true;
    editMode=true;
    selectedImageMode = false;
  //p.image(picture, 0,0,700,700); 
    picture.loadPixels();
    for (let x = 0; x < picture.width; x++) {
    for (let y = 0; y < picture.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * picture.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      r = picture.pixels[loc];

      // Calculate an amount to change brightness based on proximity to the mouse
      let maxdist = 50;
     // let d = dist(x, y, mouseX, mouseY);
       let adjustbrightness = 0;
     
      r += adjustbrightness;
      
      // Constrain RGB to make sure they are within 0-255 color range
      r = p.constrain(r, 0, 255);
      // Make a new color and set pixel in the window
      //color c = color(r, g, b);
      let pixloc = (y * picture.width + x) * 4;
      picture.pixels[pixloc] = 255 -r;
      picture.pixels[pixloc + 1] = 255 -r;
      picture.pixels[pixloc + 2] = 255- r;
      picture.pixels[pixloc + 3] = 255;
    }
  }
   picture.updatePixels();
   picture.resize(w,0);
    // p.image(picture, 0,0);  
    p.background(0);
    showImageTest = true;
    alpha = 0;

    
  };

  
  
  
  p.blechserie = function() {
    editing = true;
    editMode=true;
    //p.background(255);
    picture.resize(200, 0);
    //p.image(picture, 0, 0);
    var mouseXFactor = p.map(300, 0, w, 0.05, 1);
    var mouseYFactor = p.map(300, 0, captureHeight, 0.05, 1);
    //scale(10);
    //p.translate(-p.mouseX, -captureHeight / 3);

    //MAKE IMAGE SMALLER???

    p.push();
    for (var gridX = 0; gridX < w; gridX=gridX+10) {
      for (var gridY = 0; gridY < captureHeight; gridY=gridY+10) {
        // grid position + tile size
        var tileWidth = w / w;
        var tileHeight = captureHeight / captureHeight;
        var posX = tileWidth * gridX;
        var posY = tileHeight * gridY;

        // get current color

        //picture.loadPixels();
        var c = p.color(p.get(gridX, gridY));
        // greyscale conversion
        var greyscale = p.round(p.red(c) * 0.222 + p.green(c) * 0.707 + p.blue(c) * 0.071);
        p.print("        ", p.red(c));
        // greyscale to ellipse area
        let color1 = 0;
        let color2 = 250;
        let currentColor = 0;
        let currentAlpha = 0;
        if (greyscale >= 110) {
          currentColor = color1;
          currentAlpha = color2;
        } else {
          currentColor = color2;
          currentAlpha = color1;
        }
        p.fill(currentColor, currentAlpha);
        
        p.noStroke();
        var r2 = 1.1284 * p.sqrt(tileWidth * tileWidth * (1 - greyscale / 255));
        r2 *= mouseXFactor * 3;
        p.rectMode(p.CENTER);
        //rect(posX, posY, r2, r2);
         p.ellipse(posX, posY, tileWidth * 1.8, tileWidth * 1.8); 
        //p.print("        ",posX, posY,tileWidth * 1.8,currentColor,currentAlpha);
      }
    }
    p.pop();

  };




};

let myp5 = new p5(sketch, 'photo_p5');
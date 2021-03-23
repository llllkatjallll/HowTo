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


let sketch = function(p) {

  p.preload = function(){
    shutterSound = p.loadSound('games/natur/src/shutter.wav');
    for (var i=1; i < 6; i++) {
      imgs[i] = p.loadImage("games/natur/img/img"+i +".png"); 
    }
  } 

  p.setup = function(){
    w = window.innerWidth - 60;
   h = window.innerHeight - 60;
   captureHeight = w / 3 * 4;
  canvas = p.createCanvas(w, captureHeight);
  
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
    capture = p.createCapture(options);
    capture.hide();

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
          invertBtn.style.visibility =  "hidden";
    
      //game NATURE
      contrastBtn.style.visibility =  "hidden";
      */
      sliderContrast = p.createSlider(-200, 200, 0);
      sliderContrast.id('contrast-range');
      sliderContrast.addClass('rotatedSlider');
      sliderContrast.addClass('disappear');
      sliderContrast.parent('contrast-container');
      //document.getElementById("contrast-range").style.visibility =  "hidden";

      //game BLECHSERIE
     /*  sliderCircleSize = p.createSlider(0, 100, 10);
      sliderCircleSize.id('circle-range');
      sliderCircleSize.addClass('rotatedSlider');
      sliderCircleSize.parent('circle-container'); */
      //document.getElementById("circle-range").style.visibility =  "hidden"; 

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
        //capture.loadPixels();
        //picture = capture.get(0, 0, 300, 400);
        //picture.loadPixels();
        editMode=false;
        p.print(picture);
      }

      if(flash && flashCounter < 6){
        flashCounter+=1;
        p.fill(0);
        p.rect(0,0,w,h);
      }

      //picture.resize(w, captureHeight);
      sliderContrast.changed(p.changeContrast);
      //sliderCircleSize.changed(p.blechserie);
    }

    if (startEditingStepsDone == false){
      p.startEditing();
    } 
  

    if(showImageTest && alpha < 255){
       p.background(255);
      p.tint(255, alpha);
      p.image(picture, 0,0);
      alpha+=1;
    }

    if(selectedImageMode==true){
      //p.image(imgs[0],0,0,w,h);
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
    document.getElementById("gallery").title="";
  }

  p.activateGallery = function(){
    //stop filming
    capture.pause();
    editing=true;
    
    document.getElementById("gallery").classList.remove("gallery-animation-reverse");
    //hide gallery Button
  
    saveBtn.style.display =  "none";
    selectImageBtn.style.display =  "inline";
    selectImageBtn.style.visibility =  "hidden";  
    //show gallery canvas
    document.getElementById("gallery").style.visibility =  "visible";
    //document.getElementById("selectImageBtn").style.visibility =  "hidden";  
    document.getElementById("gallery").classList.add("gallery-animation");
    document.getElementById("gallery").classList.add("active-gallery");
    //show buttons
  }

  p.selectedImageMode = function(){
    
    //hide buttons
    selectImageBtn.style.display =  "none";
   //hide gallery
    document.getElementById("gallery").classList.remove("gallery-animation");
    document.getElementById("gallery").classList.add("gallery-animation-reverse");

    //show buttons
    invertBtn.style.display =  "inline";
    galleryBtn.classList.remove("disappear");
    infoBtn.classList.remove("disappear");
    saveBtn.classList.remove("disappear");
    newCaptureBtn.classList.remove("disappear");
    cameraWrapper.classList.remove("dont-show");
    downloadWrapper.classList.remove("dont-show");
    shootWrapper.classList.add("dont-show");
    galleryWrapper.classList.add("dont-show");
    nextBtn.classList.remove("disappear");
    nextWrapper.classList.remove("dont-show");
    selectWrapper.classList.add("dont-show");

    gamebar.classList.remove("hide");
    gamebar.classList.remove("disappear");
    //activate image editing

    currentSelectedImageId = document.getElementById("gallery").title;
    console.log("currentSelectedImageId " + currentSelectedImageId);
    if(currentSelectedImageId.length>0 ){
      selectedImageMode = true;
      if( currentSelectedImageId == null){
        var currentImage = imgs[0];
      } else{
        var currentImage = imgs[currentSelectedImageId];
        console.log("currentSelectedImageId 2" + currentSelectedImageId);
      }
      currentImage.loadPixels();
      picture = currentImage.get();
    }
    startEditingStepsDone = false;
    console.log("startEditingStepsDone " + startEditingStepsDone);
  }

  p.startEditing = function() {
    //ACTIVATE BUTTONS
    
    
    saveBtn.style.display =  "inline";
    saveBtn.style.visibility =  "visible";
    selectImageBtn.style.display =  "none"; 
   
    newCaptureBtn.style.display =  "inline";

    //SHOW GAMEBAR
    gamebar.classList.remove("disappear");

    //DO IT ONLY ONCE
    startEditingStepsDone = true;
    }

  p.makePhoto = function() {
    if (capture.loadedmetadata) {
      //do sth
    }

    capture.loadPixels();
    picture = capture.get();
    capture.updatePixels();
    //picture.resize(w, captureHeight);
    p.print(picture);
    capture.pause();
    flash = true;
    //shutterSound.play();

    newCaptureBtn.style.display =  "inline";
    newCaptureBtn.classList.remove("disappear");
    cameraWrapper.classList.remove("dont-show");
    downloadWrapper.classList.remove("dont-show");
    shootWrapper.classList.add("dont-show");
    galleryWrapper.classList.add("dont-show");
    saveBtn.classList.remove("disappear");
    saveBtn.style.display =  "inline";
    saveBtn.style.visibility =  "visible";
    gamebar.classList.remove("disappear");
    gamebar.classList.remove("hide");
  };

  p.refreshCamera = function() {
    editing = false;
    capture.play();
    console.log("refresh " +editing);
  }
  p.newCapture = function() {
    picture = null;
    editMode = false;
    editing = false;
    alpha = 0;
    flashCounter = 0;
    showImageTest = false;
    selectedImageMode =false;
    flash = false;
    capture.play();

    saveBtn.style.display =  "none";
    newCaptureBtn.style.display =  "none";
    galleryWrapper.classList.remove("dont-show");
    shootWrapper.classList.remove("dont-show");
    cameraBtn.classList.remove("disappear");
    cameraWrapper.classList.add("dont-show");
    downloadWrapper.classList.add("dont-show");
    shootWrapper.classList.remove("dont-show");

    //SHOW GAMEBAR
    gamebar.classList.add("disappear");
  };

  p.saveArtwork = function() {
  //picture.save();
  p.saveCanvas(canvas, 'howTo-mein_Naturfoto', 'jpg');
  };

  p.writeSmth = function() {
    console.log("YEAHHH");
}  


  p.contrastFunction = function(){
    contrastSliderOn=!contrastSliderOn;
    if(contrastSliderOn){
      //sliderContrast.classList.add('disappear');
      document.getElementById("contrast-range").classList.add('disappear');
    } else{
      //sliderContrast.classList.remove('disappear');
      document.getElementById("contrast-range").classList.remove('disappear');
  }
}
  p.circleFunction = function(){
    circleSliderOn=!circleSliderOn;
    if(circleSliderOn){
      document.getElementById("circle-range").style.visibility =  "visible";
    } else{
      document.getElementById("circle-range").style.visibility =  "hidden";

    }
  }

  let imgScale =10;
  p.blechserie = function(){
    p.background(255);
    p.scale(5);
    p.translate(p.map(touchX,0,w,100,-500),p.map(touchY,0,w,100,-500));
    p.push();
    editing = true;
    editMode=true;
    selectedImageMode = false;
    var scaledPicture = picture.get();
    scaledPicture.resize(picture.width/imgScale,0);
    editedPicture = picture.get();
    scaledPicture.loadPixels();
    picture.loadPixels();
   for (let x = 0; x < scaledPicture.width; x++) {
    for (let y = 0; y < scaledPicture.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * scaledPicture.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      r = scaledPicture.pixels[loc];
      g = scaledPicture.pixels[loc+1];
      b = scaledPicture.pixels[loc+2];
      var greyscale = p.round(r * 0.222 + g * 0.707 + b * 0.071);

      let color1 =0;
          let color2 =255;
           let currentColor = 0;
          let currentAlpha = 0;
        if(greyscale >= 110){
           currentColor = color1;
          currentAlpha = color2;
        } else{
           currentColor = color2;
          currentAlpha = color1;
        }
      // Calculate an amount to change brightness based on proximity to the mouse
       let adjustbrightness = sliderContrast.value()/2;
      //r = r + adjustbrightness;
      // Constrain RGB to make sure they are within 0-255 color range
      r = p.constrain(r, 0, 255);
      p.fill(currentColor);
      p.noStroke();
      let currentRandom = sliderCircleSize.value();
      p.ellipse(x*imgScale,y*imgScale, currentRandom,currentRandom);
      
    }
  }
  firstEdit = true;
  p.pop();
  }


/*    p.touchMoved = function() {
     touchX =p.mouseX;
     touchY =p.mouseY;
    p.blechserie();
  } */

  p.invert = function() {
    console.log("contrast");
    editing = true;
    editMode=true;
    selectedImageMode = false;
    if (firstEdit){
      editedPicture = ongoingEditedPicture.get();
      ongoingEditedPicture.loadPixels();
    } else{
      editedPicture = picture.get();
      picture.loadPixels();
    }
    
    editedPicture.loadPixels();
    
   for (let x = 0; x < picture.width; x++) {
    for (let y = 0; y < picture.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * picture.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      if(firstEdit){
        r = ongoingEditedPicture.pixels[loc];
      } else{
        r = picture.pixels[loc];
      }
      
      // Calculate an amount to change brightness based on proximity to the mouse
       let adjustbrightness = sliderContrast.value()/2;
      r = r + adjustbrightness;
      // Constrain RGB to make sure they are within 0-255 color range
      r = p.constrain(r, 0, 255);
      let pixloc = (y * picture.width + x) * 4;
       editedPicture.pixels[pixloc] = 255-r;
       editedPicture.pixels[pixloc + 1] = 255-r;
       editedPicture.pixels[pixloc + 2] = 255-r;
       editedPicture.pixels[pixloc + 3] = 255;
    }
  }
  editedPicture.updatePixels();
  ongoingEditedPicture = editedPicture.get();
  p.image(editedPicture,0,0,w, captureHeight);
  firstEdit = true;
  };

  p.bitmapEffect = function() {
    console.log("contrast");
    editing = true;
    editMode=true;
    selectedImageMode = false;
    if (firstEdit){
      editedPicture = ongoingEditedPicture.get();
      ongoingEditedPicture.loadPixels();
    } else{
      editedPicture = picture.get();
      picture.loadPixels();
    }
    
    editedPicture.loadPixels();
    
   for (let x = 0; x < picture.width; x++) {
    for (let y = 0; y < picture.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * picture.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      if(firstEdit){
        r = ongoingEditedPicture.pixels[loc];
      } else{
        r = picture.pixels[loc];
      }
      
      // Calculate an amount to change brightness based on proximity to the mouse
       let adjustbrightness = sliderContrast.value()/2;
      if(r < 125){
        r = 0;
      }  else{
        r = 255;
      } 
      r = r + adjustbrightness;
      // Constrain RGB to make sure they are within 0-255 color range
      r = p.constrain(r, 0, 255);
      let pixloc = (y * picture.width + x) * 4;
       editedPicture.pixels[pixloc] = r;
       editedPicture.pixels[pixloc + 1] = r;
       editedPicture.pixels[pixloc + 2] = r;
       editedPicture.pixels[pixloc + 3] = 255;
    }
  }
  editedPicture.updatePixels();
  ongoingEditedPicture = editedPicture.get();
  p.image(editedPicture,0,0,w, captureHeight);
  firstEdit = true;
  };

  p.changeContrast = function(){
    console.log("contrast");
    editing = true;
    editMode=true;
    selectedImageMode = false;
    editedPicture = picture.get();
    editedPicture.loadPixels();
    picture.loadPixels();
   for (let x = 0; x < picture.width; x++) {
    for (let y = 0; y < picture.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * picture.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      r = picture.pixels[loc];
      // Calculate an amount to change brightness based on proximity to the mouse
       let adjustbrightness = sliderContrast.value()/2;
      r = r + adjustbrightness;
      // Constrain RGB to make sure they are within 0-255 color range
      r = p.constrain(r, 0, 255);
      let pixloc = (y * picture.width + x) * 4;
       editedPicture.pixels[pixloc] = r;
       editedPicture.pixels[pixloc + 1] = r;
       editedPicture.pixels[pixloc + 2] = r;
       editedPicture.pixels[pixloc + 3] = 255;
    }
  }
  editedPicture.updatePixels();
  ongoingEditedPicture = editedPicture.get();
  p.image(editedPicture,0,0,w, captureHeight);
  firstEdit = true;
  }

};

let myp5 = new p5(sketch, 'game-content');
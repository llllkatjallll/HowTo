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

// pan and zoom
var s = 0;
var r = 0;
var p = 0;
var temp_s =1;
let start_pos = new p5.Vector(0, 0);
let temp_pos = new p5.Vector(0, 0);
let pos = new p5.Vector(0, 0);
let dist_x = 0;
let dist_y = 0;

let panActive= false;

//raster blechserie
let colWidth, rowHeight;
let columns = 20
let rows = 20
let inktrapC;

let counter = 0;
let lineLength = 5;
let lineThikness = 5;
let endVolume = 0;

//class
let commandPoints = [];
let diameter = 20;

let easing = 0.4;
const loopDuration = 7 * 60
let myFont;
let blechColorBoolSW=true;
let blechContourBool=true;
let img;

let sketch = function(p) {

  p.preload = function(){
    img = p.loadImage("games/natur/img/img3.png");
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
    
      

      //game BLECHSERIE
      if(document.getElementById("circle-container")!=null){
      sliderCircleSize = p.createSlider(5, 40, 20);
      sliderCircleSize.id('circle-range');
      sliderCircleSize.addClass('rotatedSlider');
      sliderCircleSize.parent('circle-container'); 
      document.getElementById("circle-range").style.visibility =  "hidden"; 
    }
      //pan and zoom
      p.rectMode(p.CENTER);
      currentX = p.width/2;

      pos.x = p.width/2;
      pos.y = p.height/2;

      // blechserie - kann später verschoben werden

      inktrapC = p.color(238, 98, 87);
	p.textAlign(p.CENTER, p.CENTER)
	colWidth = p.float(p.width) / columns
	rowHeight = colWidth
	//rowHeight = float(height)/rows
	diameter = colWidth;

	p.fill(255)
	p.noStroke()
	p.textSize(250)

	//p.image(img, 0, 0, 300, 400)
	let id = 0;
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			p.noFill()
			p.rect(x * colWidth, y * rowHeight, colWidth, rowHeight)
			let c = p.get(x * colWidth + colWidth / 2, y * rowHeight + rowHeight / 2)
			if (p.red(c) < 125) {
				p.fill(inktrapC)
				p.ellipse(x * colWidth, y * rowHeight, colWidth, rowHeight)
				commandPoints.push(new CommandPoint(x * colWidth, y * rowHeight, id));
				id++;
			}
		}
	}
	p.background(10)
	p.createNewPositions()

	if (blechColorBoolSW) {
		p.fill(10, 80)
		p.stroke(250)

	} else {
		p.fill(250)
		p.stroke(10)
	}
	p.rect(0, 0, p.width, p.height)
	p.noFill()
	p.stroke(255)
	for (let p of commandPoints) {
		p.display(diameter / 2)
		for (let other of commandPoints) {
			if (p !== other) {
				p.isNeighbour(other)
			}
		}
  }
  
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
      if (sliderContrast!= null){
        sliderContrast.changed(p.changeContrast);
      }
    }

    if (sliderCircleSize!= null){
      sliderCircleSize.changed(p.blechserie);
    }

    if (startEditingStepsDone == false){
      p.startEditing();
    } 
  

    if(showImageTest && alpha < 255){
       p.background(255);
      p.tint(255, alpha);
      p.image(editedPicture,0,0,w, captureHeight);
      alpha+=1;
    }


    if(selectedImageMode==true){
      //p.image(imgs[0],0,0,w,h);
      p.image(imgs[currentSelectedImageId],0,0,w,h);
    }   

 

 if(panActive){
  p.blechserie();
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

    galleryBtn.classList.remove("disappear");
    infoBtn.classList.remove("disappear");
    saveBtn.classList.remove("disappear");
    newCaptureBtn.classList.remove("disappear");
    cameraWrapper.classList.remove("dont-show");
    downloadWrapper.classList.remove("dont-show");
    shootWrapper.classList.add("dont-show");
    galleryWrapper.classList.add("dont-show");
 
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
    editedPicture = null;
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
    //cameraBtn.classList.remove("disappear");
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

  p.startPhotogram = function() {
    p.photogramInvert();
    showImageTest = true;
    alpha = 0;
}  


  p.contrastFunction = function(){
    contrastSliderOn=!contrastSliderOn;
   
    if(contrastSliderOn){

      document.getElementById("contrast-range").classList.add('disappear');
    } else{
  
      document.getElementById("contrast-range").classList.remove('disappear');
  }
}
  p.circleFunction = function(){
    circleSliderOn=!circleSliderOn;
    if(circleSliderOn){
      document.getElementById("circle-range").style.visibility =  "visible";
      document.getElementById("circle-range").classList.remove("slider-animation-reverse");
      document.getElementById("circle-range").classList.add("slider-animation");
    } else{
      //document.getElementById("circle-range").style.visibility =  "hidden";
      document.getElementById("circle-range").classList.remove("slider-animation");
      document.getElementById("circle-range").classList.add("slider-animation-reverse");

    }
  }

  let imgScale =10;
  p.blechserie = function(){
    p.background(255);

   
    p.translate(pos.x-dist_x, pos.y-dist_y);
    let currentScale= 1;
    if ((temp_s + s) < 1){
      currentScale = 1;
    }  else if ((temp_s + s) > 3){
      currentScale = 3;
    } else {
      currentScale =temp_s + s;
    }
    //console.log(currentScale)
    
    p.push();
    //currentScale = p.map(p.mouseX,0,300,1,3)
    p.scale(currentScale);
    editing = true;
    editMode=true;
    selectedImageMode = false;
    var scaledPicture = picture.get();
    p.background(0)
 
      for (let i = 0; i < commandPoints.length; i++) {
        commandPoints.splice(i, commandPoints.length);
      }
      columns = p.int(p.map(p.mouseX,0,300,20,20))
      columns = sliderCircleSize.value()
      rows = columns*1.3
      colWidth = p.float(w) / columns
      rowHeight = colWidth
      //rowHeight = float(height)/rows
      diameter = colWidth;
         
      p.image(picture, -w/2, -h/2, w, h);
      p.filter(p.GRAY)
      let id = 0;
      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          p.noFill()
          //rect(x * colWidth, y * rowHeight, colWidth, rowHeight)
          let c = p.get(x * colWidth + colWidth / 2, y * rowHeight + rowHeight / 2)
          if (p.red(c) < 125) {
            p.fill(inktrapC)
            //ellipse(x * colWidth, y * rowHeight, colWidth, rowHeight)
            commandPoints.push(new CommandPoint(-w/2 +x * colWidth, -h/2 +y * rowHeight, id));
            id++;
          }
        }
      }

      if (blechColorBoolSW) {
        p.background(250)
    
      } else {
        p.background(0)
      }
      
      p.createNewPositions()
      
      if (blechColorBoolSW) {
        p.fill(250)
    
      } else {
        p.fill(0)
      }
      
      //p.rect(0, 0, p.width, p.height)
      p.noFill()
      p.stroke(255)
      for (let p of commandPoints) {
        p.display(diameter / 2)
        for (let other of commandPoints) {
          if (p !== other) {
            p.isNeighbour(other)
          }
        }
      }
  firstEdit = true;
  p.textSize(200)
  p.fill(250,0,0)
 
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
    
    let adjustbrightness = 0;
      if(sliderContrast != null){
         adjustbrightness = sliderContrast.value()/2;
        console.log(1);
      } else{
         adjustbrightness = 0;
        console.log(adjustbrightness);
      }

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

  p.photogramInvert = function() {
    console.log("contrast");
    editing = true;
    editMode=true;
    selectedImageMode = false;
    editedPicture = picture.get();
    editedPicture.loadPixels();
    picture.loadPixels();
    let adjustbrightness = 0;
      if(sliderContrast != null){
         adjustbrightness = sliderContrast.value()/2;
        console.log(1);
      } else{
         adjustbrightness = 0;
        console.log(adjustbrightness);
      }

   for (let x = 0; x < picture.width; x++) {
    for (let y = 0; y < picture.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * picture.width) * 4;
      // Get the R,G,B values from image
      let r, g, b;
      
        r = picture.pixels[loc];
      
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
    let adjustbrightness = sliderContrast.value()/2;
      // Calculate an amount to change brightness based on proximity to the mouse
      if(sliderContrast != null){
        let adjustbrightness = sliderContrast.value()/2;
      } else{
        let adjustbrightness = 0;
      }
    
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


  p.scaleEndRect = function(event) {
    temp_s = temp_s + s;
     s = 0;
  }
  
  p.endPan = function(event) {
   pos.x = pos.x-dist_x;
   pos.y =pos.y-dist_y;
   dist_x = 0;
   dist_y = 0
   panActive =false;
  }
  
  p.startPan = function (event) {
  start_pos = (event.center);
  panActive =true;
  }
  
  
  p.rotateRect = function (event) {
  // console.log(event);
   r = radians(event.rotation);
  }
  
  p.scaleRect = function (event) {
  s = (event.scale-1)*1.4;
  p.blechserie()
  }
  
  p.panRect = function  (event) {
  temp_pos = (event.center);
   dist_x = start_pos.x-temp_pos.x;
   dist_y = start_pos.y-temp_pos.y;
  
  }

  p.drawRect = function  () {
    p.background(0,233,0);
    p.fill(0);
    
    p.ellipse(p.width/2, p.height/2, p.windowWidth*0.5, p.windowWidth*0.5);
    currentX = currentX+r;
    p.fill(255,0,0);
    p.translate(pos.x-dist_x, pos.y-dist_y);
    p.push()
    // rotate(r);
    //p.scale(temp_s + s);
    //p.rect(0, 0, p.windowWidth*0.1, p.windowWidth*0.1);
    p.pop()
    }

    p.blechInvert = function() {
      blechColorBoolSW =!blechColorBoolSW
      p.blechserie()
    }

    p.blechContour = function() {
      blechContourBool =!blechContourBool
      p.blechserie()
    }

    p.createNewPositions = function  () {
      // let size = float(width /commandPoints.length/2)
      for (let i = 0; i < commandPoints.length; i++) {
        commandPoints[i].x2 = p.float(p.random(0 + 100, p.width - 100))
        commandPoints[i].y2 = p.float(p.random(0 + 100, p.height - 100))
      }
    }

    
    p.drawForm = function  (x, y, rad) {
      p.push()
      p.translate(x, y)
      p.strokeWeight(1)
      p.noFill()
      let sz = p.map(p.mouseX, p.width / 2, p.width, 5, 30)

      if (blechColorBoolSW) {
        p.stroke(0)
        p.strokeWeight(2)
        p.fill(0)
    
      } else {
        p.stroke(255)
        p.strokeWeight(2)
        p.fill(255)
      }

      /*if(blechContourBool){

      } else{
        p.noFill();
      }*/
      
      p.ellipse(0, 0, diameter, diameter)
      p.pop()
    }

    class CommandPoint {
      constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.radius = diameter / 2;
        this.id = id;
      }
    
      // Display the Points
      display(p_rad) {
    
        p_rad = this.radius;
        p.drawForm(this.x, this.y, p_rad)
        //this.drawCorner()
      }
    
      isNeighbour(other) {
    
        let dx = p.dist(this.x, this.y, other.x, other.y);
    
        if (dx <= p.float(this.radius + other.radius + 1)) {
    
          let left = (this.x - other.x) > 0;
          let top = (this.y - other.y) > 0;
          let hor_middle = (this.y - other.y) == 0;
          let ver_middle = (this.x - other.x) == 0;
          if (hor_middle && !left) {
            this.drawCorner(180, 0)
            this.drawCorner(90, 0)
          }
    
          if (hor_middle && left) {
            this.drawCorner(0, 0)
            this.drawCorner(-90, 0)
          }
    
          if (ver_middle && top) {
            this.drawCorner(90, 0)
            this.drawCorner(0, 0)
          }
    
          if (ver_middle && !top) {
            this.drawCorner(-90, 0)
            this.drawCorner(180, 0)
          }
    
        }
        let hyp = (this.radius * 2) / p.sin(p.radians(45));
    
        if ((dx <= hyp) && (dx > p.float(this.radius + other.radius + 1))) {
          let left = (this.x - other.x) > 0;
          let top = (this.y - other.y) > 0;
    
    
          if (left && top) {
            this.drawCorner(0, 0)
            this.drawCorner(90, this.radius * 2)
          }
    
          if (!left && top) {
            this.drawCorner(0, -this.radius * 2)
            this.drawCorner(90, 0)
          }
    
          if (!left && !top) {
            this.drawCorner(180, 0)
            this.drawCorner(-90, -this.radius * 2)
          }
    
          if (left && !top) {
            this.drawCorner(180, this.radius * 2)
            this.drawCorner(-90, 0)
          }
    
        }
    
      }
        drawCorner = function  (rad, x_trans) {
      
        p.push()
        p.translate(this.x - x_trans, this.y)
        p.rotate(p.radians(rad))
        p.beginShape();
        if (blechColorBoolSW) {
          p.fill(0);
        p.stroke(0)
      
        } else {
          p.fill(255);
        p.stroke(255)
        }

        /*if(blechContourBool){
          p.noFill();
        } else{
          p.noFill();
        } */

        
        p.strokeWeight(2)
            p.vertex(0 - this.radius, 0)
            let randomNr = p.int(p.random(4,4))
        p.bezierVertex(
          0 - this.radius, 0 - this.radius / 2,
          0 - this.radius / 2, 0 - this.radius,
          0, 0 - this.radius);
            p.vertex(0 - this.radius, 0 - this.radius)
        p.vertex(0 - this.radius, 0)
        p.endShape();
        p.pop()
      }
    
    
    }
  

};

let myp5 = new p5(sketch, 'game-content');
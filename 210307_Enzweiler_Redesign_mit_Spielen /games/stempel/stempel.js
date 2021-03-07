//based on the original example on objects 
//https://p5js.org/examples/objects-objects.html


// responsive 


var w = window.innerWidth;
var h = window.innerHeight;


var forms = [];
var x = 0;
var y = 0;
var tileNr = 4;
var tileNrY = 4;
var tileSz = 0;
var counterFor = 0;
var color_bgd = [10, 35, 50, 75, 100, 150, 190, 220, 255];
var this_color = 0;
var color_step = 25;
var clientWidth;
var cnv;

var clientHeight;
var offY=0.15;
var stemp_width=300;


function setup() {
  //  clientWidth = document.getElementById('stempelspiel').clientWidth;
  //  clientHeight = document.getElementById('stempelspiel').clientHeight * 0.7;
    
    clientWidth = window.innerWidth-60;
    clientHeight = window.innerHeight-60;

     cnv = createCanvas(clientWidth, clientHeight);
    cnv.parent("game-content");

    // add these to your setup function AFTER createCanvas() 
   // var el = document.getElementsByTagName("canvas")[0];
  //  el.addEventListener("touchend", mouseClicked, false);


    background(255);
    
    var ix = 0;
    var iy = 0;


       if(window.innerWidth>750){
        tileNr = int(clientWidth / 85);
       } else{
        tileNr = int(clientWidth / 70); 
       }

    tileSz = clientWidth/ tileNr;
    tileNrY = (clientHeight / tileSz)-1;
    for (var i = 0; i < tileNrY-1; i++) {
        for (var j = 0; j < tileNr; j++) {
            x = tileSz * j;
            y = tileSz * i;
            forms[counterFor] = new Forms(x, y);
            counterFor = counterFor + 1;
        }
    }
    for (var i = 0; i < forms.length; i++) {
        //forms[i].display();
    }

    stemp_width=w / 3;
}

window.onresize = function () {
    // assigns new values for width and height variables
   // w = window.innerWidth;
   // h = window.innerHeight;
    clientWidth = window.innerWidth-60;
    clientHeight = window.innerHeight-60;
    
    //cnv.size(clientWidth, clientHeight);
    //cnv.parent("game-content");
   
    if(window.innerWidth>750){
        tileNr = int(clientWidth / 85);
       } else{
        tileNr = int(clientWidth / 70); 
       }
       tileSz = clientWidth/ tileNr;
       tileNrY = (clientHeight / tileSz)-1;
    counterFor = 0;
    for (var i = 0; i < tileNrY-1; i++) {
        for (var j = 0; j < tileNr; j++) {
            x = tileSz * j;
            y = tileSz * i;
            forms[counterFor] = new Forms(x, y);
            counterFor = counterFor + 1;
        }
    }
}


function draw() {
    background(250);
    for (var i = 0; i < forms.length; i++) {
        //forms[i].move();
        forms[i].display();
    }

    for (var j = 0; j < tileSz * (tileNr+1); j = j + tileSz) {
        for (var k = 0; k < tileSz * (tileNrY); k = k + tileSz) {
            stroke(200);
            strokeWeight(1);
            line(j, 0, j, tileSz * (tileNrY)-tileNrY+1);
            line(0, k, w, k);
        }
    }
    
     touchabfrage();
    //Stempelkissen
    drawStempelkissen(clientWidth/2,tileSz * tileNr+clientHeight*0.2);
}

function touchabfrage() {
  
  if(touches.length!=0){
    console.log("touched " +touches[0].x,touches[0].y);
  for (var i=0; i<forms.length; i++) { 
    var antwort= pointRect(touches[0].x, touches[0].y, forms[i].x, forms[i].y, tileSz, tileSz);
    
    if (antwort) {
      if (forms[i].color>this_color) {
        //Check color
        if (this_color+color_step<255) {
          this_color=this_color+color_step;
        } else {
          this_color=255;
        }

        noStroke();

        forms[i].color=this_color;
      }
    }
  }
   

  if (pointRect(touches[0].x, touches[0].y, clientWidth/2,tileSz * tileNr+clientHeight*0.2, stemp_width, 50)) {
    this_color=0;
  }
    }
}
function stempelkissen(){
    this_color=0;
}
function pointRect(px, py, rx, ry, rw, rh) {

    // is the point inside the rectangle's bounds?
    if (px >= rx && // right of the left edge AND
        px <= rx + rw && // left of the right edge AND
        py >= ry && // below the top AND
        py <= ry + rh) { // above the bottom
        return true;
    }
    return false;
}

function drawStempelkissen(x,y){
    fill(0);
    if (this_color > 225) {
        //fill(0);
        //text("Klicke auf das Stempelkissen, um Farbe aufzunehmen", 20, y+20, 160);
    }  
    
}
//reset colors
function resetColors() {
    for (var i = 0; i < forms.length; i++) {
        forms[i].color = 255;
    }
     this_color=0;
}

function saveArtwork() {
   var to_save = get( 0, clientHeight*offY, clientWidth, clientWidth ); 
   to_save.save("myComposition");
}


// Forms class
class Forms {
    constructor(tx, ty) {
        this.x = tx;
        this.y = ty;
        this.color = 255;
    }


    move() {}

    display() {
        noStroke();
        fill(this.color);
        rect(this.x, this.y, tileSz, tileSz);
        fill(255);
        ellipse(this.x + tileSz / 2, this.y + tileSz / 2, tileSz - 10, tileSz - 10);
        //console.log(this.x,this.y);
    }
}

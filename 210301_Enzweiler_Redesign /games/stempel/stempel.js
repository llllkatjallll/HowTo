//based on the original example on objects 
//https://p5js.org/examples/objects-objects.html


// responsive 


var w = window.innerWidth;
var h = window.innerHeight;


var forms = [];
var x = 0;
var y = 0;
var tileNr = 4;
var tileSz = 0;
var counterFor = 0;
var color_bgd = [10, 35, 50, 75, 100, 150, 190, 220, 255];
var this_color = 0;
var color_step = 25;
var clientWidth;

var clientHeight;
var offY=0.15;
var stemp_width=300;


function setup() {



  //  clientWidth = document.getElementById('stempelspiel').clientWidth;
  //  clientHeight = document.getElementById('stempelspiel').clientHeight * 0.7;
    
    clientWidth = window.innerWidth;
    clientHeight = window.innerHeight;

    var cnv = createCanvas(clientWidth, clientHeight);
    cnv.parent("stempelspiel");

    // add these to your setup function AFTER createCanvas() 
   // var el = document.getElementsByTagName("canvas")[0];
  //  el.addEventListener("touchend", mouseClicked, false);


    background(255);
    
    var ix = 0;
    var iy = 0;


       if(window.innerWidth>750){
        tileNr = int(w / 85);
    } else{
        tileNr = int(w / 60); 
    }

    tileSz = w / tileNr;
    for (var i = 0; i < tileNr; i++) {
        for (var j = 0; j < tileNr; j++) {
            x = tileSz * j;
            y = tileSz * i+clientHeight*offY;
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
    w = window.innerWidth;
    h = window.innerHeight;
    
    
    cnv.size(clientWidth, clientHeight);
    cnv.parent("stempelspiel");
   
    if(window.innerWidth>750){
        tileNr = int(w / 85);
    } else{
        tileNr = int(w / 60); 
    }
    tileSz = w / tileNr;
    counterFor = 0;
    for (var i = 0; i < tileNr; i++) {
        for (var j = 0; j < tileNr; j++) {
            x = tileSz * j;
            y = tileSz * i+clientHeight*offY;
            forms[counterFor].x = x;
            forms[counterFor].y = y;
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

    for (var j = 0; j < tileSz * tileNr; j = j + tileSz) {
        for (var k = clientHeight*offY; k < tileSz * tileNr+clientHeight*offY; k = k + tileSz) {
            stroke(220);
            strokeWeight(0.5);
            line(j, clientHeight*offY, j, w+clientHeight*offY);
            line(0, k, w, k);
        }
    }
    
     touchabfrage();
    //Stempelkissen
    drawStempelkissen(clientWidth/2,tileSz * tileNr+clientHeight*0.2);
}

function touchabfrage() {
  
  if(touches.length!=0){
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
    noStroke();
    rect(x, y, stemp_width, 50);
    fill(255);
    text("Stempelkissen", x+20,y+20);

    if (this_color > 225) {
        fill(0);
        text("Klicke auf das Stempelkissen, um Farbe aufzunehmen", 20, y+20, 160);
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
    }
}

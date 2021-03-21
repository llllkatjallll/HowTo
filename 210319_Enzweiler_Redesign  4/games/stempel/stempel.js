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
var offY = 0.15;
var gameCanvasWidth,gameCanvasHeight;


function setup() {
    //  clientWidth = document.getElementById('stempelspiel').clientWidth;
    //  clientHeight = document.getElementById('stempelspiel').clientHeight * 0.7;

    clientWidth = window.innerWidth - 60;
    clientHeight = window.innerHeight - 60;


    background(255);
    gameCanvasWidth = clientWidth;

    if (window.innerWidth > 750) {
        tileNr = int(gameCanvasWidth / 85);
    } else {
        tileNr = int(gameCanvasWidth / 70);
    }

    tileSz = clientWidth / tileNr;
    tileNrY = floor(clientHeight / tileSz) - 1;
    gameCanvasHeight = tileNrY * tileSz;

    cnv = createCanvas(clientWidth+1, clientHeight);
    cnv.parent("game-content");

    for (var i = 0; i < tileNrY; i++) {
        for (var j = 0; j < tileNr; j++) {
            x = tileSz * j;
            y = tileSz * i;
            forms[counterFor] = new Forms(x, y);
            counterFor = counterFor + 1;
        }
    }
}

window.onresize = function () {

    clientWidth = window.innerWidth - 60;
    clientHeight = window.innerHeight - 60;

    gameCanvasWidth = clientWidth;

    if (window.innerWidth > 750) {
        tileNr = int(gameCanvasWidth / 85);
    } else {
        tileNr = int(gameCanvasWidth / 70);
    }

    tileSz = clientWidth / tileNr;
    tileNrY = floor(clientHeight / tileSz) - 1;
    gameCanvasHeight = tileNrY * tileSz;
    for (var i = 0; i < tileNrY; i++) {
        for (var j = 0; j < tileNr; j++) {
            x = tileSz * j;
            y = tileSz * i;
            forms[counterFor] = new Forms(x, y);
            counterFor = counterFor + 1;
        }
    }
}


function draw() {
    //background(250);
    for (var i = 0; i < forms.length; i++) {
        forms[i].display();
    }

    for (var j = 0; j < tileSz * (tileNr+1); j = j + tileSz) {
        for (var k = 0; k < tileSz * (tileNrY + 1); k = k + tileSz) {
            stroke(200);
            strokeWeight(1);
            line(j, 0, j, gameCanvasHeight);
            line(0, k, gameCanvasWidth, k);
        }
    }

    touchabfrage();

    
}

function touchabfrage() {

    if (touches.length != 0) {
        for (var i = 0; i < forms.length; i++) {
            var antwort = pointRect(touches[0].x, touches[0].y, forms[i].x, forms[i].y, tileSz, tileSz);

            if (antwort) {
                if (forms[i].color > this_color) {
                    //Check color
                    if (this_color + color_step < 255) {
                        this_color = this_color + color_step;
                    } else {
                        this_color = 255;
                    }

                    noStroke();

                    forms[i].color = this_color;
                }
            }
            if(this_color==255){
                document.getElementById("button-stamp").classList.add('pulse');
            }
        }
    }
}

function stempelkissen() {
    this_color = 0;
    document.getElementById("button-stamp").classList.remove('pulse');
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

//reset colors
function resetColors() {
    for (var i = 0; i < forms.length; i++) {
        forms[i].color = 255;
    }
    this_color = 0;
}

function saveArtwork() {
    var to_save = get(0, clientHeight * offY, clientWidth, clientWidth);
    //to_save.save("myComposition");
    saveCanvas(cnv, 'howTo-meinRhythmus', 'jpg');
}

class Forms {
    constructor(tx, ty) {
        this.x = tx;
        this.y = ty;
        this.color = 255;
    }

    display() {
        noStroke();
        fill(this.color);
        rect(this.x, this.y, tileSz, tileSz);
        fill(255);
        ellipse(this.x + tileSz / 2, this.y + tileSz / 2, tileSz - 10, tileSz - 10);
        //console.log(this.x,this.y);
    }
}

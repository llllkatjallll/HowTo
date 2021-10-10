  var y = 80;
  var amplitude = 50;
  var steps = 3;
  var timeSteps = 0.01;
  var versatz = 10;
  //var sw = random (0.5, 2);
  var strokeAlpha = 1;
  var tileNr = 4;
  var tileNrY = 4;
  var tileSz = 0;
  var margin = 30;

  var doReDraw = true;

  var xStart = 0;
  var yStart = 0;
  var xEnd = 0;
  var yEnd = 0;

  var counterFor = 0;

  var forms = [];
  //graphics
  let pgraph;
  let pgraph_temp;

  var click_offsetX;
  var click_offsetY;

  var translate_offsetX;
  var translate_offsetY;

  var dragStartX;
  var dragStartY;
  var w, h;
  var dragEndX;
  var dragEndY;
  var gameCanvasWidth, gameCanvasHeight;
  var riss_sounds;
  var colb1;
  var colb2;

  var clientWidth;


  var clientHeight;

  function preload() {

    var r1 = loadSound('games/risse/r1.mp3');
    var r2 = loadSound('games/risse/r2.mp3');
    var r3 = loadSound('games/risse/r3.mp3');
    var r4 = loadSound('games/risse/r4.mp3');
    var r5 = loadSound('games/risse/r5.mp3');
    riss_sounds = [r1, r2, r3, r4, r5];
  }

  function setup() {

    // var w = window.innerWidth;

    // var h = window.innerHeight;

    clientWidth = window.innerWidth - 60;
    clientHeight = window.innerHeight - 60;
    gameCanvasWidth = clientWidth;

    canvas = createCanvas(clientWidth, clientHeight);
    canvas.parent("game-content");
    smooth();
    amplitude = random(50, 80);
    bgColor = color('#eee8dc');

    if (window.innerWidth > 750) {
      tileNr = int(gameCanvasWidth / 85);
    } else {
      tileNr = int(gameCanvasWidth / 70);
    }

    tileSz = gameCanvasWidth / tileNr;
    tileNrY = floor(clientHeight / tileSz) - 1;
    gameCanvasHeight = tileNrY * tileSz;
    // zwei Bilder werden erstellt
    pgraph = createGraphics(tileSz, tileSz);
    pgraph_temp = createGraphics(tileSz, tileSz);


    // Formen werden erstellt
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
    // assigns new values for width and height variables
    clientWidth = window.innerWidth - 60;
    clientHeight = window.innerHeight - 60;
    canvas.size(clientWidth, clientHeight);

    if (window.innerWidth > 750) {
      tileNr = int(gameCanvasWidth / 85);
    } else {
      tileNr = int(gameCanvasWidth / 70);
    }
    tileSz = gameCanvasWidth / tileNr;
    tileNrY = floor(clientHeight / tileSz) - 1;
    gameCanvasHeight = tileNrY * tileSz;
    counterFor = 0;
    for (var i = 0; i < tileNrY; i++) {
      for (var j = 0; j < tileNr; j++) {
        x = tileSz * j;
        y = tileSz * i;
        forms[counterFor].x = x;
        forms[counterFor].y = y;
        counterFor = counterFor + 1;
      }
    }
    bgColor = color('#eee8dc');

  }



  function draw() {
    background(255);
    push();

    for (var i = 0; i < forms.length; i++) {
      forms[i].display();
    }

    for (var j = 0; j < tileSz * tileNr; j = j + tileSz) {
      for (var k = 0; k < tileSz * (tileNrY); k = k + tileSz) {
        stroke(255);
        line(j, 0, j, gameCanvasHeight);
        line(0, k, gameCanvasWidth, k);
      }
    }
    pop();
  }
  /*
    function touchStarted(){
      console.log("touchStarted");
    }
    
    function touchEnded(){
      console.log("touchEnded");
    }
    
    
    function touchMoved(){
      console.log("touchMoved");
    }
  */

  function touchStarted() {
    for (var i = 0; i < forms.length; i++) {
       forms[i].active = false;
       forms[i].passive = false;
    }

    xStart = mouseX;
    yStart = mouseY;

    for (var i = 0; i < forms.length; i++) {
      if (pointRect(mouseX, mouseY, forms[i].x, forms[i].y, tileSz, tileSz)) {
       
        forms[i].active = true;
        pgraph_temp = forms[i].pimage;
        click_offsetX = mouseX - forms[i].x;
        click_offsetY = mouseY - forms[i].y;
        dragStartX = forms[i].x;
        dragStartY = forms[i].y;
      }
    }

  }

  function touchMoved() {
    for (var i = 0; i < forms.length; i++) {
      if (forms[i].active == true) {
        forms[i].x = mouseX - click_offsetX;
        forms[i].y = mouseY - click_offsetY;
      }
    }

  }

  function touchEnded() {
    if(!anyActive()) return;
    let infoContainer = document.getElementById("information");
    let soundSpielen = false;
  
    xEnd = mouseX;
    yEnd = mouseY;

    // risse machen
    // TODO: riss machen, auch wenn der finger sich ein bisschen bewegt hat
    if (xEnd == xStart && yEnd == yStart) {

      stroke(200);
      // line(xStart,yStart,xEnd,yEnd);
      for (var i = 0; i < forms.length; i++) {
        if (pointRect(xEnd, yEnd, forms[i].x, forms[i].y, tileSz, tileSz)) {
          setRandomValues();
          // savePoints(xStart,yStart,xEnd,yEnd);
          pgraph = createGraphics(tileSz, tileSz);
          drawFilles(xStart, yStart, xEnd, yEnd, forms[i]);
          drawLines(xStart, yStart, xEnd, yEnd, forms[i]);
          soundSpielen = true;
        }
      }
      if(infoContainer.classList.contains("disappear")){
        riss_sounds[int(random(0, 4))].play();
      }
    }

    // Risse Bewegen
    else {
      for (var i = 0; i < forms.length; i++) {
        if (pointRect(xEnd, yEnd, forms[i].x, forms[i].y, tileSz, tileSz)) {
          // Zelle wo losgelassen wurde taggen
          if (!forms[i].active) {
            
            forms[i].passive = true;
            dragEndX = forms[i].x;
            dragEndY = forms[i].y;
          }
        }
      }

      for (var i = 0; i < forms.length; i++) {

        if (forms[i].active) {
          forms[i].x = dragEndX;
          forms[i].y = dragEndY;
          if (!anyPassive()) {
            forms[i].x = dragStartX;
            forms[i].y = dragStartY;
          }
        }

        if (forms[i].passive) {
          forms[i].x = dragStartX;
          forms[i].y = dragStartY;
        }

        // forms[i].active = false;
        // forms[i].passive = false;
      }
    }
    
  }


  function setRandomValues() {
    //noiseSeed ((int) random (100000));
    noiseSeed(random(100000));

    sw = random(0.5, 2);

    steps = random(sw * 2, 6);
    amplitude = random(40, 80);

    timeSteps = random(0.01, 0.05);

    versatz = random(-50, -20);
    versatz_r = 80;

    strokeAlpha = random(50, 200);
  }

  function refreshImages() {
    for (var i = 0; i < forms.length; i++) {
      forms[i].refresh();
    } 
  }

  function saveArtwork() {
    var to_save = get(0, clientHeight, clientWidth, clientWidth);
    saveCanvas(canvas, 'howTo-meineKomposition', 'jpg');
}

  function anyPassive() {
    for (var i = 0; i < forms.length; i++) {
      if (forms[i].passive) {
        return true;
      }
    }
    return false;
  }

  function anyActive() {
    for (var i = 0; i < forms.length; i++) {
      if (forms[i].active) {
        return true;
      }
    }
    return false;
  }

  function drawFilles(s_x, s_y, e_x, e_y, form) {

    var xS = s_x;
    var yS = s_y;
    var xE = e_x;
    var yE = e_y;
    var t_form = form;
    bgColor = color('#f5c91b');
    fill(bgColor);
    noStroke();

    var noiseValue;
    var x = -50;
    var time = 0.0;
    y = s_y - form.y;
    pgraph.noStroke();
    pgraph.fill(bgColor);
    pgraph.beginShape();
    time = 0.0;
    var distance = dist(xS, yS, xE, yE);
    var points = new Array();
    pgraph.vertex(0, tileSz);
    //pgraph.vertex (0, x);
    var counter = 0;
    while (x < 1000) {
      noiseValue = y - noise(time) * amplitude;
      pgraph.vertex(x, noiseValue);

      points[counter] = noiseValue;
      counter = counter + 1;
      x += steps;
      time += timeSteps;
    }
    pgraph.vertex(tileSz, yE);
    pgraph.vertex(tileSz, tileSz);
    //vertex (xE, height+1);
    pgraph.endShape();
  }

  function drawLines(s_x, s_y, e_x, e_y, form) {
    pgraph.noFill();
    pgraph.strokeWeight(sw);

    var xS = s_x;
    var yS = s_y;
    var xE = e_x;
    var yE = e_y;
    var t_form = form;
    var noiseValue;
    var x = -50;
    var time = 0.0;
    var zunahme = 0;
    var absteigen = false;
    y = s_y - form.y;
    zunahme = 0;
    absteigen = false;
    while (x < 400 + abs(versatz)) {
      noiseValue = y - noise(time) * amplitude;
      pgraph.strokeWeight(random(sw * 0.5, sw * 1.2));
      pgraph.stroke(56, 56, 53, random(strokeAlpha * 0.8, strokeAlpha));

      pgraph.line(x, noiseValue + 3, x + random(versatz * 0.95, versatz), noiseValue + 3 + zunahme);

      x += steps;
      time += timeSteps;

      if (zunahme > 300) {
        absteigen = true;
      }
      if (absteigen) {
        zunahme = zunahme + 1;
      } else {
        zunahme = zunahme + 1;
      }
    }
    form.pimage = pgraph;
  }


  function drawMargin() {
    noStroke();
    fill(bgColor);
    rect(0, 0, width, margin);
    rect(0, height, width, -margin);
    rect(0, 0, margin, height);
    rect(width, 0, -margin, height);
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


  // Forms class
  class Forms {
    constructor(tx, ty) {
      this.x = tx;
      this.y = ty;
      this.color = 255;

      var emptyImage = createGraphics(tileSz, tileSz);
      emptyImage.background(229);
      //emptyImage.rect(10,10,100,100);
      this.pimage = emptyImage;
      this.defaultImage = emptyImage;
      this.active = false;
      this.passive = false;
    }


    refresh() {
      this.pimage = this.defaultImage;
      this.display();
    }

    display() {
      if (this.pimage != null) {
        image(this.pimage, this.x, this.y);
      }
    }
  }
var gameCanvas = document.getElementById("game-content");
var canvas;
let quads = [];
let amount = 2;
let length = undefined;
let midLength = undefined;
let spacing = 10;
let density = 10;
let currentGameId = "desordires";
let sketch = function (p) {

  // p.preload = function () {

  // }

  p.setup = function () {

    gameWidth = gameCanvas.clientWidth;
    gameHeight = gameCanvas.clientHeight;
    canvas = p.createCanvas(gameWidth, gameWidth);
    p.background(240, 240, 240);

    p.drawGrid();
  }


  p.draw = function () {


  }



  p.drawGrid = function () {
    //calculate quad size
    length = (gameWidth - 2 * spacing) / amount;
    midLength = length / 2;
    for (var gridY = 0; gridY < amount; gridY++) {
      for (var gridX = 0; gridX < amount; gridX++) {
        var posX = length * gridX + midLength + spacing;
        var posY = length * gridY + midLength + spacing;
        quads.push(new Quad(posX, posY, 10));
      }
    }

    for (let i = 0; i < quads.length; i++) {
      quads[i].drawQuad();
    }

  }

  class Quad {
    constructor(x, y, lineChangeProbability) {
      // this.quadChangeProbability = quadChangeProbability;
      this.lineChangeProbability = lineChangeProbability;
      this.x = x;
      this.y = y;
      this.length = 0;

      this.pos = p.createVector(x, y);
    }



    // Display the Points
    drawQuad() {
      let quadSize = midLength - spacing;
      let quadSpacing = 8;
      p.noFill();
      for (let i = 0; i < density; i++) {
        let lineRandomness = p.int(p.random(0, this.lineChangeProbability));
        if (lineRandomness !== 1) {

          let quadHalf = quadSize - (quadSpacing * i);
          if (quadHalf < 0) {
            quadHalf = 0;
          }
          p.push();
          p.translate(this.pos.x, this.pos.y);
          let lineRandomness2 = p.int(p.random(0, this.lineChangeProbability));
          
          if (lineRandomness2 == 1) {
            p.rotate(p.radians(p.int(p.random(-5, 5))))
          }
         // p.stroke(p.int(p.random(0, 255),p.int(p.random(0, 255)),p.int(p.random(0, 255))));
         p.stroke(p.random(255,0), p.random(255,0), p.random(255,0));
          p.strokeWeight(p.int(p.random(1, 5)));
          p.quad(0 - quadHalf, 0 - quadHalf, 0 + quadHalf, 0 - quadHalf, 0 + quadHalf, 0 + quadHalf, 0 - quadHalf, 0 + quadHalf);
          p.pop();

        }
      }

    }

  }


}

let myp5 = new p5(sketch, 'game-content');


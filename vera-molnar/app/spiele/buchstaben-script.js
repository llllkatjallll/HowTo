// setup

var grid = document.getElementById("defaultCanvas0");
var gridWidth;
var gridHeight;
var gridSize;
var letterWidth = 30; // @todo: make this dynamic
var letterHeight = 30; // @todo: make this dynamic
var totalLetters;
var initials = [];
var letterArray = [];
var currentLetters = 0;
var resizeCount = 0;
var lettersInitialien = ["A", "R"];
var inBool = true;
let currentGameId = "buchstaben";

var sliderThikness = document.getElementById("thiknessSlider");
var sliderRotation = document.getElementById("rotationSlider");
var sliderSize = document.getElementById("sizeSlider");

var sliderGrid = document.getElementById("gridSlider");
var colorLetter = document.getElementById("textColotInput");
var colorBackground = document.getElementById("backgroundInput");
var spans = document.getElementById("defaultCanvas0").getElementsByTagName("span");



//230123
//funtions UI zum ein/ausblenden
var buttonGrid = document.getElementById("button-grid");
var buttonThikness = document.getElementById("button-thikness");
var buttonSize = document.getElementById("button-size");
var buttonRotation = document.getElementById("button-rotation");
var containerFunctions = document.getElementById("functions-container");
var gameButtons = document.getElementById("game-buttons");

// the unicode values that we want to loop through (A-Z)
// http://www.codingforums.com/showpost.php?s=ca38992f8716f43d325c12be6fc0198b&p=843844&postcount=3

var charCodeRange = {
  start: 65,
  end: 90
};

// get the grid's width and height

function getDimensions() {
  var gridRect = grid.getBoundingClientRect();
  grid.style.height=gridRect.width + "px";
  gridWidth = gridRect.width;
  gridHeight = gridRect.width;
}

// get the total possible letters needed to fill the grid
// and store that in totalLetters

function getTotalLetters() {
  //var multiplierX = gridWidth / letterWidth;
  //var multiplierY = gridHeight / letterHeight; 
  //totalLetters = Math.round((multiplierX * multiplierY));

  totalLetters = sliderGrid.value * sliderGrid.value;


  //console.log('multiplierX: '+multiplierX, '\nmultiplierY: '+multiplierY, '\ntotalLetters: '+totalLetters);
}

function calculateGrid() {

  var sliderValue = sliderGrid.value;
  var letterWidth = gridWidth / sliderValue;

  // for loop for object grid children  
  allLetters = document.getElementsByClassName("letter-ops");

  for (var i = 0; i < allLetters.length; i++) {

    grid.children[i].style.width = letterWidth + "px";
    grid.children[i].style.height = letterWidth + "px";
    grid.children[i].style.lineHeight = letterWidth + "px";
  }
}

// loop through the unicode values and push each character into letterArray

function populateLetters() {
  for (var i = charCodeRange.start; i <= charCodeRange.end; i++) {
    if (inBool) {
      letterArray.push(lettersInitialien[0]);
    } else {
      letterArray.push(lettersInitialien[1]);
    }
    inBool = !inBool;
  }
  console.log('letterArray: ' + letterArray, '\nletterArray.length: ' + letterArray.length);
}

function deleteLetters() {
  letterArray = [];
  console.log('letterArray: ' + letterArray, '\nletterArray.length: ' + letterArray.length);
}


// a function to loop a given number of times (value), each time
// appending a letter from the letter array to the grid

function drawLetters(value) {
  var text;
  var span;
  var count = 0;

  for (var letter = 0; letter <= totalLetters - 1; letter++) {
    text = document.createTextNode(letterArray[count]);
    span = document.createElement('span');
    span.appendChild(text);
    span.classList.add("letter-ops");

    span.addEventListener('click', function () { 
      console.log(this.innerHTML);
      rotateLetter(this);
    });
    grid.appendChild(span);
    count++;

    // if our count equals the length of our letter array, then that
    // means we've reached the end of the array (Z), so we set count to 
    // zero again in order to start from the beginning of the array (A).
    // we keep looping over the letter array 'value' number of times.

    if (count === letterArray.length) {
      count = 0;
    }

    // if our for counter var (letter) equals the passed in value argument
    // then we've finished our loop and we throw a class onto the grid element

    if (letter === value) {
      grid.classList.add('js-show-letters');
    }
  }


}

// get the length of the grid.find('span') jQuery object
// essentially the current number of letters in the grid at this point

function getCurrentLetters() {
  currentLetters = grid.querySelectorAll('span').length;

}

function init() {
  populateLetters();
  getDimensions();
  getTotalLetters();
  drawLetters(totalLetters);
  getCurrentLetters();
  calculateGrid();

   //add listeners for showing/hiding sliders and other ui
   buttonThikness.addEventListener('click', (event) => { showSelectedFunction(buttonThikness) });
   buttonRotation.addEventListener('click', (event) => { showSelectedFunction(buttonRotation) });
   buttonSize.addEventListener('click', (event) => { showSelectedFunction(buttonSize) });
   buttonGrid.addEventListener('click', (event) => { showSelectedFunction(buttonGrid);  });

   //document.getElementById("overlay-layer").addEventListener('click', (event) => { console.log("log"); event.stopPropagation(); });
   //restartButton.addEventListener('click', (event) => { p.restart() });

}

function onResize() {
  console.log('\nresizeCount: ' + resizeCount + '\n');
  resizeCount++;
  getDimensions();
  getTotalLetters();

  // here we're looking to see if the current number of letters in the grid
  // (currentLetters) is less than the total possible letters
  // if so, we figure out how many need to be added to fill it up, then draw them

  if (currentLetters < totalLetters) {
    var difference = totalLetters - currentLetters;
    drawLetters(totalLetters);
  }

  // update currentLetters with the current number of letters in the grid

  getCurrentLetters();
}

init();

// do everything we've done so far, except on window resize using debounce to 
// ensure that resize isn't going nuts firing all this code constantly

//window.addEventListener('resize', _.debounce(onResize, 100));

showSelectedFunction = function (pressedButton) {
  // set all buttons to inactive
  var allButtons = gameButtons.children;
  for (var i = 0; i < allButtons.length; i++) {
    var button = allButtons[i];
    button.classList.remove("selected-text");
    button.classList.add("not-selected-text");
    //change icon color
    button.children[0].classList.remove("selected-icon");
    button.children[0].classList.add("not-selected-icon");
  }
  pressedButton.classList.remove("not-selected-text");
  pressedButton.classList.add("selected-text");
  pressedButton.children[0].classList.remove("not-selected-icon");
  pressedButton.children[0].classList.add("selected-icon");

  //set pressedButton to active
  let functionName = pressedButton.id.substring(7);

  var children = containerFunctions.children;
  for (var i = 0; i < children.length; i++) {
    var functionChild = children[i];
    functionChild.classList.add("dont-show");
    if (functionName == functionChild.id.substring(9)) {
      functionChild.classList.remove("dont-show");
    }
    
  }
}


//Slider Thikness
sliderThikness.oninput = function () {
  document.getElementById("defaultCanvas0").style.fontWeight = this.value;
  const collection = document.getElementsByClassName("letter-ops");
for (let i = 0; i < collection.length; i++) {
  collection[i].style.fontWeight = this.value;
}
}

//Slider Grid size
sliderGrid.oninput = function () {

  deleteLetters();
  const myNode = document.getElementById("defaultCanvas0");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }

  if (!myNode.firstChild) {
    letterArray = [];
    init();
  }

  updateEverything();
}

var gridValue = undefined;
var rotationValue =  undefined;
var sizeValue = undefined;
var thiknessValue = undefined;

function collectInputData(){
   gridValue = sliderGrid.value;
   rotationValue =  sliderRotation.value;
   sizeValue = sliderSize.value;
   thiknessValue = sliderThikness.value;
}

function rotateLetter(thisSpan){
  thisSpan.style.transform += "rotate(" + 30 + "deg)";
}

function updateEverything(){
  collectInputData();
  for (i = 0; i < spans.length; i++) {
    spans[i].style.transform = "scale(" + sizeValue + ")";
    spans[i].style.transform += "rotate(" + rotationValue+ "deg)";
  }
}

//Slider Letter size
sliderSize.oninput = function () {
  updateEverything();
}

//slider Rotation
sliderRotation.oninput = function () {
  updateEverything();
}

// Slider color
colorBackground.oninput = function () {
  let input = document.getElementById("backgroundInput").value;
  document.getElementById("defaultCanvas0").style.backgroundColor = input;
}

//Slider Letter
colorLetter.oninput = function () {
  let input = document.getElementById("textColotInput").value;
  document.getElementById("defaultCanvas0").style.color = input;
 
}



//is it being used?
function readText() {
  let input = document.getElementById("initialien").value;
  lettersInitialien[0] = input[0];
  lettersInitialien[1] = input[1];
  console.log("lettersInitialien" + lettersInitialien);


  const myNode = document.getElementById("game-content");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }

  if (!myNode.firstChild) {
    letterArray = [];
    init();
  }

  updateEverything();

}




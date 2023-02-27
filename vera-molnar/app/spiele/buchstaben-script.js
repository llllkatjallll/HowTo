

// setup
var gameWrapper = document.getElementById("game-wrapper");
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
var lettersInitialien = ["V", "M"];
var inBool = true;
let currentGameId = "buchstaben";

var sliderThikness = document.getElementById("thiknessSlider");
var sliderRotation = document.getElementById("rotationSlider");
var rotationValue = 0;
var thiknessValue = 0;
var sliderSize = document.getElementById("sizeSlider");

var sliderGrid = document.getElementById("gridSlider");
var colorCharacterInput = document.getElementById("textColotInput");
var colorBackgroundInput = document.getElementById("backgroundInput");
var colorCharacterValue = "#000000";
var colorBackgroundValue = "#f2ece7";
var spans = document.getElementById("defaultCanvas0").getElementsByTagName("span");



//230123
//funtions UI zum ein/ausblenden
var buttonLetter = document.getElementById("button-letter");
var buttonGrid = document.getElementById("button-grid");
var buttonThikness = document.getElementById("button-thikness");
var buttonSize = document.getElementById("button-size");
var buttonRotation = document.getElementById("button-rotation");
var containerFunctions = document.getElementById("functions-container");
var gameButtons = document.getElementById("game-buttons");
var gameFunctions = document.getElementById("game-functions");
var buttonRestart = document.getElementById("button-neu");

//rotationsdaten speichern
var rotationData=[];

// the unicode values that we want to loop through (A-Z)
// http://www.codingforums.com/showpost.php?s=ca38992f8716f43d325c12be6fc0198b&p=843844&postcount=3

var charCodeRange = {
  start: 65,
  end: 90
};

let svgButton = document.getElementById("button-speichern");

// get the grid's width and height

function getDimensions() {
  var gridRect = grid.getBoundingClientRect();
  grid.style.height=gridSize + "px";
  grid.style.width=gridSize + "px";
  gridWidth = gameWrapper.clientWidth;
  gridHeight = gameWrapper.clientHeight;
 console.log(gridWidth, gridHeight);
  if (gridWidth >= gridHeight) {
    gridWidth = gridHeight;
    gridWidth = gridHeight;
    gridSize =gridHeight;

  } else {
    gridWidth = gridWidth;
    gridHeight = gridWidth;
    gridSize =gridWidth;
  }

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
  rotationData = [];
  var sliderValue = sliderGrid.value;
  var letterWidth = gridWidth / sliderValue;

  // for loop for object grid children  
  allLetters = document.getElementsByClassName("letter-ops");

  for (var i = 0; i < allLetters.length; i++) {

    grid.children[i].style.width = letterWidth + "px";
    grid.children[i].style.height = letterWidth + "px";
    grid.children[i].style.lineHeight = letterWidth + "px";
    rotationData[i]= sliderRotation.value;
  }

}



function populateLetters() { 
    for (i=0;i < lettersInitialien.length;i++) {
      letterArray.push(lettersInitialien[i]);
    } 
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
  //restart();

   //add listeners for showing/hiding sliders and other ui
   buttonThikness.addEventListener('click', (event) => { showSelectedFunction(buttonThikness) });
   buttonRotation.addEventListener('click', (event) => { showSelectedFunction(buttonRotation) });
   buttonSize.addEventListener('click', (event) => { showSelectedFunction(buttonSize) });
   buttonGrid.addEventListener('click', (event) => { showSelectedFunction(buttonGrid);  });
   buttonLetter.addEventListener('click', (event) => { showSelectedFunction(buttonLetter);  });
   characterInput.addEventListener('focusout', (event) => { readText();  });

   characterInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.target.blur();
      readText();
    }
  });
  //svgButton.addEventListener('click', (event) => {  saveMyImage() });
   //document.getElementById("overlay-layer").addEventListener('click', (event) => { console.log("log"); event.stopPropagation(); });
   buttonRestart.addEventListener('click', (event) => { restart() });

}

function redraw() {
  //restart();
  colorBackgroundValue = document.getElementById("backgroundInput").value;
  document.getElementById("defaultCanvas0").style.backgroundColor = colorBackgroundValue;

  colorCharacterValue = colorCharacterInput.value;
  document.getElementById("defaultCanvas0").style.color = colorCharacterValue;
  populateLetters();
  getDimensions();
  getTotalLetters();
  drawLetters(totalLetters);
  getCurrentLetters();
  calculateGrid();
   //document.getElementById("overlay-layer").addEventListener('click', (event) => { console.log("log"); event.stopPropagation(); });
 

}

function restart(){

  startTextInput();
  //reset color
  colorBackgroundInput.value = "#f2ece7";
  colorCharacterInput.value = "#000000";

  //reset grid
  sliderGrid.value = 3;
  updateGrid(3);
  //reset thikness
  sliderThikness.value = 400;
  updateThikness(sliderThikness.value);
  //reset rotation
  sliderRotation.value = "0";
 
  redraw();
 /*  colorBackgroundValue = document.getElementById("backgroundInput").value;
  document.getElementById("defaultCanvas0").style.backgroundColor = colorBackgroundValue;

  colorCharacterValue = colorCharacterInput.value;
  document.getElementById("defaultCanvas0").style.color = colorCharacterValue;
 */
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
    functionChild.classList.add("noPointerEvents");
    functionChild.classList.add("transparent");

    if (functionName == functionChild.id.substring(9)) {
      functionChild.classList.remove("transparent");
      functionChild.classList.remove("noPointerEvents");
    }
  }
}


//Slider Thikness
sliderThikness.oninput = function () {
  thiknessValue = this.value;
  updateThikness(thiknessValue);

}

function updateThikness(value){
  for (let i = 0; i < allLetters.length; i++) {
    allLetters[i].style.fontWeight = value;
  }
}

//Slider Grid size
sliderGrid.oninput = function () {
updateGrid(this.value);
 
}

function updateGrid(value){
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


function collectInputData(){
   gridValue = sliderGrid.value;
   rotationValue =  sliderRotation.value;
   sizeValue = sliderSize.value;
   thiknessValue = sliderThikness.value;
}

function rotateLetter(thisSpan){

  var child = thisSpan;
  var parent = child.parentNode;
// The equivalent of parent.children.indexOf(child)
var index = Array.prototype.indexOf.call(parent.children, child);
 rotationData[index]= (parseInt(rotationData[index])+90).toString();
  thisSpan.style.transform = "rotate(" + rotationData[index] + "deg)";
}

function getCurrentRotation(el){
  var st = window.getComputedStyle(el, null);
  var tm = st.getPropertyValue("-webkit-transform") ||
           st.getPropertyValue("-moz-transform") ||
           st.getPropertyValue("-ms-transform") ||
           st.getPropertyValue("-o-transform") ||
           st.getPropertyValue("transform") ||
           "none";
  if (tm != "none") {
    var values = tm.split('(')[1].split(')')[0].split(',');
    /*
    a = values[0];
    b = values[1];
    angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
    */
    //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
    var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
    return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
  }
  return 0;
}


function updateEverything(){
  collectInputData();
  for (i = 0; i < spans.length; i++) {
    spans[i].style.fontSize =  sizeValue*20 + "px";
    spans[i].style.transform = "rotate(" + rotationData[i]+ "deg)";
    allLetters[i].style.fontWeight = thiknessValue;

    //rotationData[i]=rotationValue;
  }


}

//Slider Letter size
sliderSize.oninput = function () {
  updateEverything();
}

//slider Rotation
sliderRotation.oninput = function () {
  rotationValue = sliderRotation.value;
  for (var i = 0; i < allLetters.length; i++) {
    rotationData[i]= rotationValue;
  }
  updateEverything();
}

// Slider color
colorBackgroundInput.oninput = function () {
  colorBackgroundValue = document.getElementById("backgroundInput").value;
  document.getElementById("defaultCanvas0").style.backgroundColor = colorBackgroundValue;
}

//Slider Letter
colorCharacterInput.oninput = function () {
  colorCharacterValue = colorCharacterInput.value;
  document.getElementById("defaultCanvas0").style.color = colorCharacterValue;
 
}



//is it being used?
function readText() {

  let input = document.getElementById("characterInput").value;

  if(input.length>=1){

    //make functions visible
    gameFunctions.classList.remove("hiddenElement");
    gameButtons.classList.remove("hiddenElement");
    gameWrapper.classList.remove("hiddenElement");
    document.getElementById("textInput").classList.add("hiddenElement");
    document.getElementById("textInput").classList.add("dont-show");
    document.getElementById("game-text-buttons").classList.remove("hiddenElement");

  lettersInitialien = [];
  for (i=0;i < input.length;i++) {
    lettersInitialien[i]=input[i];
  }

  if(input.length == 0){
    lettersInitialien[0]=".";
  }
 
  
  const myNode = document.getElementById("defaultCanvas0");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }

  if (!myNode.firstChild) {
    letterArray = [];
    redraw();
  }

  updateEverything();
}
}

function startTextInput(){

      //make functions visible
      gameFunctions.classList.add("hiddenElement");
      gameButtons.classList.add("hiddenElement");
      gameWrapper.classList.add("hiddenElement");
      document.getElementById("textInput").classList.remove("hiddenElement");
      document.getElementById("characterInput").value="";
      document.getElementById("textInput").classList.remove("dont-show");
      document.getElementById("game-text-buttons").classList.add("hiddenElement");
      
}


function saveMyImage() {
 
  var endSize = 1000;
  var scale = 2;


  var node = document.getElementById('game-wrapper');
  scale = endSize / node.clientHeight;

  domtoimage.toPng(node, {
    width: endSize,
    height: endSize,
    //width: node.clientWidth,
    //height: node.clientHeight,
    style: {
      transform: 'scale(' + scale + ') translate(-' + 0 + 'px,-' + 0 + 'px )',
      transformOrigin: 'top center',

    }
  })
    .then(dataURL => {
      var image = new Image();
      image.src = dataURL;
      document.body.appendChild(image);
    }); 
}



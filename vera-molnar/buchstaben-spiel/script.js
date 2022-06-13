

  // setup

  var grid = document.querySelector('.letter-grid');
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
  var lettersInitialien = ["A","R"];
  var inBool =true;

  // the unicode values that we want to loop through (A-Z)
  // http://www.codingforums.com/showpost.php?s=ca38992f8716f43d325c12be6fc0198b&p=843844&postcount=3

  var charCodeRange = {
    start: 65,
    end: 90
  };

  // get the grid's width and height

  function getDimensions(){
    var gridRect = grid.getBoundingClientRect();
    gridWidth = gridRect.width;
    gridHeight = gridRect.height;
    console.log('Grid width: '+gridWidth, '\nGrid height: '+gridHeight);
  }

  // get the total possible letters needed to fill the grid
  // and store that in totalLetters

  function getTotalLetters(){
    var multiplierX = gridWidth / letterWidth;
    var multiplierY = gridHeight / letterHeight; 
    totalLetters = Math.round((multiplierX * multiplierY));
    console.log('multiplierX: '+multiplierX, '\nmultiplierY: '+multiplierY, '\ntotalLetters: '+totalLetters);
  }

  // loop through the unicode values and push each character into letterArray

  function populateLetters() {
    for (var i = charCodeRange.start; i <= charCodeRange.end; i++) {
      if(inBool){
      letterArray.push(lettersInitialien[0]); }
      else{
        letterArray.push(lettersInitialien[1]);
      }
      inBool=!inBool;
    }
    console.log('letterArray: '+letterArray, '\nletterArray.length: '+letterArray.length);
  }

  function deleteLetters() {
    letterArray = [];
    console.log('letterArray: '+letterArray, '\nletterArray.length: '+letterArray.length);
  }


  // a function to loop a given number of times (value), each time
  // appending a letter from the letter array to the grid

  function drawLetters(value){
    var text;
    var span;
    var count = 0;

    for (var letter=0; letter <= value; letter++) {
      text = document.createTextNode(letterArray[count]);
      span = document.createElement('span');
      span.appendChild(text);
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

  function getCurrentLetters(){
    currentLetters = grid.querySelectorAll('span').length;
    console.log('currentLetters: '+currentLetters);
  }

  function init() {
    populateLetters();
    getDimensions();
    getTotalLetters();
    drawLetters(totalLetters);
    getCurrentLetters();
  }

  function onResize() {
    console.log('\nresizeCount: '+resizeCount+'\n');
    resizeCount++;
    getDimensions();
    getTotalLetters();

    // here we're looking to see if the current number of letters in the grid
    // (currentLetters) is less than the total possible letters
    // if so, we figure out how many need to be added to fill it up, then draw them
    
    if (currentLetters < totalLetters) {
      var difference = totalLetters - currentLetters;
      drawLetters(difference);
    }
    
    // update currentLetters with the current number of letters in the grid
    
    getCurrentLetters();
  }

  init();

  // do everything we've done so far, except on window resize using debounce to 
  // ensure that resize isn't going nuts firing all this code constantly

  window.addEventListener('resize', _.debounce(onResize, 100));



var slider = document.getElementById("myRange");
var sliderRotation = document.getElementById("myRotation");
var sliderSize = document.getElementById("mySize");

var sliderGrid = document.getElementById("gridSize");
var colorLetter = document.getElementById("colorLetter");
var colorBackground = document.getElementById("colorBackground");





slider.oninput = function() {
  document.getElementById("myGrid").style.fontWeight = this.value;

}

sliderGrid.oninput = function() {
  
  var spans = document.getElementById("myGrid").getElementsByTagName("span");

  for(i=0;i<spans.length;i++)
  {
    spans[i].style.width=this.value +"px";
    spans[i].style.height=this.value +"px";
    spans[i].style.lineHeight=this.value +"px";
  }
}

sliderSize.oninput = function() {
  var spans = document.getElementById("myGrid").getElementsByTagName("span");

  for(i=0;i<spans.length;i++)
  {
    spans[i].style.fontSize=this.value +"px"
  }
}


sliderRotation.oninput = function() {

var spans = document.getElementById("myGrid").getElementsByTagName("span");

for(i=0;i<spans.length;i++)
{
  spans[i].style.transform = "rotate("+  this.value +"deg)";
}

}

colorBackground.oninput = function() {
  let input = document.getElementById("colorBackground").value;
  document.getElementById("myGrid").style.backgroundColor=input;
  }

  colorLetter.oninput = function() {
    let input = document.getElementById("colorLetter").value;
    document.getElementById("myGrid").style.color=input;
    }

function readText() {
  let input = document.getElementById("initialien").value;
  lettersInitialien[0] = input[0];
  lettersInitialien[1] = input[1];
  console.log(lettersInitialien);
  const myNode = document.getElementById("myGrid");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  if (!myNode.firstChild){
    letterArray = [];
    init();
  }
  
}
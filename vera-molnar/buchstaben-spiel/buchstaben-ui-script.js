let buttonThikness = document.getElementById("buttonThikness");
let buttonRotation = document.getElementById("buttonRotation");
let buttonSize = document.getElementById("buttonSize");
let buttonGrid = document.getElementById("buttonGrid");
let buttonInitials = document.getElementById("buttonInitials");
let buttonColor = document.getElementById("buttonColor");



if(buttonThikness) {buttonThikness.addEventListener("click", showFunction);}
buttonRotation.addEventListener("click", showFunction);
buttonSize.addEventListener("click", showFunction);
buttonGrid.addEventListener("click", showFunction);
buttonInitials.addEventListener("click", showFunction);
buttonColor.addEventListener("click", showFunction);




function showFunction() {
let name = this.id.replace("button", "");

//get children of function-container
let children = document.getElementById("functions-container").children;
//loop through children
for (let i = 0; i < children.length; i++) {

    let nameFunction = children[i].id.replace("function", "");
    children[i].classList.remove("hidden");
    children[i].classList.add("hidden");
    if (nameFunction == name) {
        children[i].classList.remove("hidden");
    }
} //end for
}



saveButton.onclick = function () {

    saveImage();
  }
  //Save Image
  function saveImage() {
    html2canvas(document.querySelector("#myGrid")).then(canvas => {
      canvas.classList.add("gallery-item");
      //containerGallery.appendChild(canvas);
      containerGallery.insertBefore(canvas, containerGallery.firstChild);
      let dataUrl = canvas.toDataURL("image/png");
      setItem("s1", dataUrl);
      //DOWNLOAD IMAGE
      /*canvas.toBlob(function(blob) {
        window.saveAs(blob, 'my_image.jpg');
      }); */
  });
  
    
  }

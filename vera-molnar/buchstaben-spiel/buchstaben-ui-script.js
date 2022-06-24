let buttonThikness = document.getElementById("buttonThikness");
let buttonRotation = document.getElementById("buttonRotation");
let buttonSize = document.getElementById("buttonSize");
let buttonGrid = document.getElementById("buttonGrid");
let buttonInitials = document.getElementById("buttonInitials");
let buttonColor = document.getElementById("buttonColor");

buttonThikness.addEventListener("click", showFunction);
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
let buttonGallery = document.getElementById("buttonGallery");
var containerGallery = document.getElementById("containerGallery");
let buttonEditor = document.getElementById("buttonEditor");
let saveButton = document.getElementById("button-speichern");



window.onload = function(){
    displayImagesfromStorage(currentGameId);
    buttonEditor.addEventListener("click", changeMode);
buttonGallery.addEventListener("click", changeMode);
saveButton.addEventListener("click", saveImage);

}

function changeMode(){
    
    let name = this.id.replace("button", "");
    let children = document.getElementById("all-content").children;

    for (let i = 0; i < children.length; i++) {
        let nameMode = children[i].id.replace("container", "");
        children[i].classList.remove("hidden");
        children[i].classList.add("hidden");
        if (nameMode == name) {
            children[i].classList.remove("hidden");
        }
    }
   
}


function setItem(gameKey, itemValue) {
    //console.log("CLICK");
    try {
        let now = new Date();
        let jsonData = JSON.stringify({time: now, data: itemValue});
        let timestamp = Date.now() / 1000 | 0;
        let itemKey = gameKey + "-" + timestamp;
        //console.log(itemKey);
        window.localStorage.setItem(itemKey, jsonData);
        let totalStorageItems = window.localStorage.length;
       // console.log(itemValue);

        //check local storage memory
        var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

        return true;
    } catch(e) {
        return false;
    }
}

function getItem(itemKey) {
    try {
        let jsonObjectString = window.localStorage.getItem(itemKey);
        let parsedData = JSON.parse(jsonObjectString);
        //console.log("getItem: " + itemKey + ": " + parsedData.data);
        return parsedData.data;
    } catch(e) {
        return null;
    }
}

function expireOldCacheItems() {
    let totalStorageItems = window.localStorage.length;
    let now = new Date();
    let maxAge = 1000 * 60 * 60 * 24 * 5; // 5 days

    for(let i = 0; i < totalStorageItems; i++) {
        let itemKey = window.localStorage.key(i);
        let itemData = window.localStorage.getItem(itemKey);

        try {
            let parsedData = JSON.parse(itemData);
            let itemCacheTime = new Date(parsedDate.time);
            let timeDifference = now.valueOf() - imageCacheTime.valueOf();

            if(timeDifference > maxAge) {
                window.localStorage.removeItem(itemKey);
            }
        } catch(e) {
            return null;
        }
    }
}

function deleteCache() {
    window.localStorage.clear();
    let totalStorageItems = window.localStorage.length;
    //console.log("totalStorageItems: " + totalStorageItems);
}

function countImagesGame(gameName){
    let itemsCount = 0;
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        let keyName =localStorage.key( i );
 

        if (gameName == keyName.substring(0,2)) {
            itemsCount++;
        }
      }
      //console.log("itemsCount: " + itemsCount);
      return itemsCount;
      
}


function displayImagesfromStorage(gameId){
    
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        let keyName = localStorage.key( i );
        //console.log("lokStorage Key:  " + keyName + "   GameID:  " + gameId);
        if (gameId.substring(0,3) == keyName.substring(0,3)) {
            //place to the gallery
           
            var element = new Image();
            element.src = getItem(keyName);
            element.classList.add("gallery-item");
            containerGallery.appendChild(element);
        }
      }
      
}



/*saveButton.onclick = function () {

    saveImage();
  } */
  //Save Image
  function saveImage() {
    html2canvas(document.querySelector("#game-content")).then(canvas => {
      canvas.classList.add("gallery-item");
      //containerGallery.appendChild(canvas);
      containerGallery.insertBefore(canvas, containerGallery.firstChild);
      let dataUrl = canvas.toDataURL("image/png");
      setItem(currentGameId, dataUrl);
      
      //DOWNLOAD IMAGE
      /*canvas.toBlob(function(blob) {
        window.saveAs(blob, 'my_image.jpg');
      }); */
  });
  }


var containerGallery = document.getElementById("gallery-wrapper");

let saveButton = document.getElementById("button-speichern");
let downloadButton = document.getElementById("button-download");

saveButton.addEventListener("click", saveImage);


window.onload = function () {
    displayImagesfromStorage(currentGameId);
    downloadButton.addEventListener('click', (event) => { downloadImages() });

}




function setItem(gameKey, itemValue) {
    console.log("setItem");
    try {
        let now = new Date();
        let jsonData = JSON.stringify({ time: now, data: itemValue });
        let timestamp = Date.now() / 1000 | 0;
        let itemKey = gameKey + "-" + timestamp;
        console.log(itemKey);
        window.localStorage.setItem(itemKey, jsonData);
        let totalStorageItems = window.localStorage.length;
        // console.log(itemValue);

        //check local storage memory
        var _lsTotal = 0, _xLen, _x;
        for (_x in localStorage) {
            if (!localStorage.hasOwnProperty(_x)) { continue; } _xLen = ((localStorage[_x].length + _x.length) * 2); _lsTotal += _xLen;
            //console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB") 
        };
        console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

        return true;
    } catch (e) {
        console.log("Storage is FULL");
        //delete first 20%
        // Get all keys from localStorage
        const keys = Object.keys(localStorage);

        // Create a new array for sorted key-value pairs
        const sortedItems = [];

        // Sort the keys based on timestamp in the key ID
        keys.sort((a, b) => {
            const timestampA = a.split("-")[1];
            const timestampB = b.split("-")[1];

            return timestampB - timestampA; // Descending order
        });

        for (let k = keys.length-1; k > keys.length - ((keys.length) * 0.5); k--) {
            window.localStorage.removeItem(keys[k]);
            console.log("deleted " + keys[k]);
        }
        try {
            let now = new Date();
            let jsonData = JSON.stringify({ time: now, data: itemValue });
            let timestamp = Date.now() / 1000 | 0;
            let itemKey = gameKey + "-" + timestamp;
            console.log(itemKey);
            window.localStorage.setItem(itemKey, jsonData);
            let totalStorageItems = window.localStorage.length;
            // console.log(itemValue);
    
            //check local storage memory
            var _lsTotal = 0, _xLen, _x;
            for (_x in localStorage) {
                if (!localStorage.hasOwnProperty(_x)) { continue; } _xLen = ((localStorage[_x].length + _x.length) * 2); _lsTotal += _xLen;
                //console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB") 
            };
            console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    
            
        } catch (e) {
            return false;
        }
    }
}

function getItem(itemKey) {
    try {
        let jsonObjectString = window.localStorage.getItem(itemKey);
        let parsedData = JSON.parse(jsonObjectString);
        //console.log("getItem: " + itemKey + ": " + parsedData.data);
        return parsedData.data;
    } catch (e) {
        return null;
    }
}

function expireOldCacheItems() {
    let totalStorageItems = window.localStorage.length;
    let now = new Date();
    let maxAge = 1000 * 60 * 60 * 24 * 5; // 5 days

    for (let i = 0; i < totalStorageItems; i++) {
        let itemKey = window.localStorage.key(i);
        let itemData = window.localStorage.getItem(itemKey);

        try {
            let parsedData = JSON.parse(itemData);
            let itemCacheTime = new Date(parsedDate.time);
            let timeDifference = now.valueOf() - imageCacheTime.valueOf();

            if (timeDifference > maxAge) {
                window.localStorage.removeItem(itemKey);
            }
        } catch (e) {

            return null;
        }
    }
}

function deleteCache() {
    window.localStorage.clear();
    let totalStorageItems = window.localStorage.length;
    //console.log("totalStorageItems: " + totalStorageItems);
}

function countImagesGame(gameName) {
    let itemsCount = 0;
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        let keyName = localStorage.key(i);


        if (gameName == keyName.substring(0, 2)) {
            itemsCount++;
        }
    }
    //console.log("itemsCount: " + itemsCount);
    return itemsCount;

}


function displayImagesfromStorage(gameId) {

    while (containerGallery.firstChild) {
        containerGallery.removeChild(containerGallery.firstChild);
    }

    // Get all keys from localStorage
    const keys = Object.keys(localStorage);

    // Create a new array for sorted key-value pairs
    const sortedItems = [];

    // Sort the keys based on timestamp in the key ID
    keys.sort((a, b) => {
        const timestampA = a.split("-")[1];
        const timestampB = b.split("-")[1];

        return timestampB - timestampA; // Descending order
    });

      for (const key of keys) {
        let keyName = key;
        //console.log("lokStorage Key:  " + keyName + "   GameID:  " + gameId);
        if (gameId.substring(0, 3) == keyName.substring(0, 3)) {
            //place to the gallery

            var element = new Image();
            element.src = getItem(keyName);
            element.classList.add("gallery-image");
            element.dataset.numberId = keyName.split("-")[1];
            //imageContainer hinzufügen
            var imageContainer = document.createElement("div");
            imageContainer.classList.add("gallery-image-container");

            //checkbox hinzufügen
            var checkboxElement = document.createElement("div");
            checkboxElement.classList.add("checkbox");
            imageContainer.appendChild(element);
            imageContainer.appendChild(checkboxElement);
            containerGallery.appendChild(imageContainer);
        }
    }

    addListenerToImages();

    //if gallery has images-remove no images message
    if(containerGallery.children.length>0){
       document.getElementById("emptyGalleryMessage").style.display="none";
    }


}

function addListenerToImages() {
    for (const child of containerGallery.children) {
        child.addEventListener('click', (event) => { imageClickedRegistration(child) });
    }
}

function imageClickedRegistration(obj) {
    let selectedCheckbox = obj.querySelector('.checkbox');

    if (obj.classList.contains("selected")) {
        obj.classList.remove("selected");
    } else {
        obj.classList.add("selected");
    }

    if (selectedCheckbox.classList.contains("checkbox-active")) {
        selectedCheckbox.classList.remove("checkbox-active");
    } else {
        selectedCheckbox.classList.add("checkbox-active");
    }
}

function downloadImages() {
    for (const child of containerGallery.children) {
        if (child.classList.contains("selected")) {
            downloadImage(child.querySelector('.gallery-image').src,child.querySelector('.gallery-image').dataset.numberId);
            //download(child.querySelector('.gallery-image').src, "image.png"); 
        }
    }

    //deselect all images
    let allCheckedBoxes = document.getElementsByClassName("checkbox");
    for (let i =0;i<allCheckedBoxes.length;i++) {
        allCheckedBoxes[i].classList.remove("checkbox-active");
    }

    let allCheckedContainer = document.getElementsByClassName("gallery-image-container");
    for (let i =0;i<allCheckedContainer.length;i++) {
        allCheckedContainer[i].classList.remove("selected");
    }


}

function downloadImage(url,number) {
    fetch(url, {
        mode: 'no-cors',
    })
        .then(response => response.blob())
        .then(blob => {
            let blobUrl = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.download = currentGameId + "-" + number;
            a.href = blobUrl;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
}

/*saveButton.onclick = function () {

    saveImage();
  } */
//Save Image
let pngURL = undefined;
let blobURL = undefined;

function saveImage(event) {
    
    document.getElementsByClassName('saved-image-transition')[0].classList.add("moved-image");

    setTimeout(() => {
        document.getElementsByClassName('saved-image-transition')[0].classList.remove("moved-image");
      }, "1000");
    // let wrapper = document.getElementById("section-wrapper-touch");
    //wrapper.classList.remove("scroll-snap"); 

    let svgElement = undefined;
    let SVGsize = 1080;

    // check if svg comes from p5 canvas or html
    if (currentGameId == "Buchstaben") {

       // return;

        // if html element
        var endSize =1080;
        var scale = undefined;


        var node = document.getElementById('game-wrapper');
        var actualNode = document.getElementById('defaultCanvas0');
        scale = endSize / actualNode.clientWidth;

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
                //var image = new Image();
               // image.src = dataURL;

                setItem(currentGameId, dataURL);
               displayImagesfromStorage(currentGameId);
               // document.body.appendChild(image);
            }); 

    } else { //if p5 
        svgElement = document.getElementById("defaultCanvas0").children[0];
       
        let clonedSvgElement = svgElement.cloneNode(true);

        let outerHTML = clonedSvgElement.outerHTML,
            blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });


        let URL = window.URL || window.webkitURL || window;

        blobURL = URL.createObjectURL(blob);
      
        let image = new Image();

        image.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = SVGsize;
            canvas.height = SVGsize;
            let context = canvas.getContext('2d');
            // draw image in canvas starting left-0 , top - 0  
            context.drawImage(image, 0, 0, SVGsize, SVGsize);

            pngURL = canvas.toDataURL(); // default png
            
            setItem(currentGameId, pngURL);
            displayImagesfromStorage(currentGameId);
        };

        image.src = blobURL;

    }



}

//**dataURL to blob**
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

//**blob to dataURL**
function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}


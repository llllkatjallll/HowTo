
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
        //console.log(itemKey);
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
        return false;
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

    for (var i = 0, len = localStorage.length; i < len; ++i) {
        let keyName = localStorage.key(i);
        //console.log("lokStorage Key:  " + keyName + "   GameID:  " + gameId);
        if (gameId.substring(0, 3) == keyName.substring(0, 3)) {
            //place to the gallery

            var element = new Image();
            element.src = getItem(keyName);
            element.classList.add("gallery-image");
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
            downloadImage(child.querySelector('.gallery-image').src);
            //download(child.querySelector('.gallery-image').src, "image.png"); 
        }
    }
}

function downloadImage(url) {
    fetch(url, {
        mode: 'no-cors',
    })
        .then(response => response.blob())
        .then(blob => {
            let blobUrl = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.download = "image";
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
    // let wrapper = document.getElementById("section-wrapper-touch");
    //wrapper.classList.remove("scroll-snap"); 

    let svgElement = undefined;
    let SVGsize = 1600;

    // check if svg comes from p5 canvas or html
    if (currentGameId == "buchstaben") {

        return;
        // if html element
        var node = document.getElementById('defaultCanvas0');
        domtoimage.toSvg(document.getElementById('defaultCanvas0'),)
            .then(function (dataUrl) {
                console.log(dataUrl);

                var svgElement = document.createElement('a');
                svgElement.download = 'actual.svg';
                svgElement.href = dataUrl;
                console.log(svgElement);
                //link.click();
                let clonedSvgElement = svgElement.cloneNode(true);

                let outerHTML = clonedSvgElement.outerHTML,
                blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });
        
        
            let URL = window.URL || window.webkitURL || window;
        
            blobURL = URL.createObjectURL(blob);
            console.log("It is blob  " + blobURL);
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
            });

    } else { //if p5 
        svgElement = document.getElementById("defaultCanvas0").children[0];
        console.log(svgElement);
        let clonedSvgElement = svgElement.cloneNode(true);

        let outerHTML = clonedSvgElement.outerHTML,
        blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });


    let URL = window.URL || window.webkitURL || window;

    blobURL = URL.createObjectURL(blob);
    console.log("It is blob  " + blobURL);
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


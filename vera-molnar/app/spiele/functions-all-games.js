import multiDownload from '/multipleDownload.js';
var containerGallery = document.getElementById("gallery-wrapper");

let saveButton = document.getElementById("button-speichern");
let downloadButton = document.getElementById("button-download");

saveButton.addEventListener("click", saveImage);


window.onload = function () {
    displayImagesfromStorage(currentGameId);
    downloadButton.addEventListener('click', (event) => { downloadImages() });
}


// SAVE GAME RESULTS WITH INDEXED DB

function setItem(gameKey, itemValue) {
    console.log("setItem");
    try {

        //prepare item key name
        let now = new Date();
        let jsonData = JSON.stringify({ time: now, data: itemValue });
        let timestamp = Date.now() / 1000 | 0;
        let itemKey = gameKey + "-" + timestamp;



        // save image data in local storage 
        localforage.setItem(itemKey, jsonData).then(function (value) {
            // Do other things once the value has been saved.
            displayImagesfromStorage(currentGameId);
        }).catch(function (err) {

            console.log(err);
        });

        //get total number of saved items

        localforage.length().then(function (numberOfKeys) {
            // Outputs the length of the database.
            console.log("numberOfKeys " + numberOfKeys);
            let totalStorageItems = numberOfKeys;
        }).catch(function (err) {
            console.log(err);
        });

        return true;
    } catch (e) {

    }
}

function getItem(itemKey) {
    try {

        localforage.getItem('itemKey').then(function (value) {
            let jsonObjectString = value;
            let parsedData = JSON.parse(jsonObjectString);
            console.log("PARSED DATA" + parsedData.data);
            return parsedData.data;
        }).catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
            return null;
        });

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
let gameKeys = undefined;

function displayImagesfromStorage(gameId) {

    while (containerGallery.firstChild) {
        containerGallery.removeChild(containerGallery.firstChild);
    }

    localforage.iterate(function (value, key, iterationNumber) {

        if (gameId.substring(0, 3) == key.substring(0, 3)) {
            //place to the gallery

            var element = new Image();
            //console.log(value.data);
            let jsonObjectString = value;
            let parsedData = JSON.parse(jsonObjectString);


            element.src = parsedData.data;
            element.classList.add("gallery-image");
            element.dataset.numberId = key.split("-")[1];
            //imageContainer hinzufügen
            var imageContainer = document.createElement("div");
            imageContainer.classList.add("gallery-image-container");

            //checkbox hinzufügen
            var checkboxElement = document.createElement("div");
            checkboxElement.classList.add("checkbox");
            imageContainer.appendChild(element);
            imageContainer.appendChild(checkboxElement);
            console.log(iterationNumber);
            if (iterationNumber == 1) {
                containerGallery.appendChild(imageContainer);
            } else {
                containerGallery.insertBefore(imageContainer, containerGallery.firstChild);
            }
        }



    }).then(function () {

        addListenerToImages();

        //if gallery has images-remove no images message

        if (containerGallery.children.length > 0) {
            document.getElementById("emptyGalleryMessage").style.display = "none";
        }

        console.log('Iteration has completed');
    }).catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
    });
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

let imagesString = undefined;

function downloadImages() {
    for (const child of containerGallery.children) {
        if (child.classList.contains("selected")) {
             downloadImage(child.querySelector('.gallery-image').src, child.querySelector('.gallery-image').dataset.numberId);
            //download(child.querySelector('.gallery-image').src, "image.png"); 
            console.log(child.querySelector('.gallery-image').src);
            
            imagesString = imagesString + child.querySelector('.gallery-image').src + " ";
        }
       // const files = imagesString.split(' ');
       // multiDownload(files);
       // imagesString = undefined;
    }

    //deselect all images
    let allCheckedBoxes = document.getElementsByClassName("checkbox");
    for (let i = 0; i < allCheckedBoxes.length; i++) {
        allCheckedBoxes[i].classList.remove("checkbox-active");
    }

    let allCheckedContainer = document.getElementsByClassName("gallery-image-container");
    for (let i = 0; i < allCheckedContainer.length; i++) {
        allCheckedContainer[i].classList.remove("selected");
    }


}

function downloadImage(url, number) {
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
        var endSize = 1080;
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
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

//**blob to dataURL**
function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
}


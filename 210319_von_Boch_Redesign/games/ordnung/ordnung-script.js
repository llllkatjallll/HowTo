import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
// import { Vector3, SpriteMaterial, Sprite, Clock, Color, Scene } from 'https://unpkg.com/three@latest/build/three.module.js';
import {
    OrbitControls
} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';


let currentSectionNr = 1;
/**VARIABLES */
let ordnungGameOn = false;
let counterLight = 0;
let galleryOn = false;
let counterModel = 0;
//let modelPaths = [ '../../monika-von-boch/models/smaller.gltf', '../../monika-von-boch/static/models/cups.gltf'];
let modelPaths = [ '../../models/smaller.gltf', '../../static/models/cups.gltf'];
/**HTML ELEMENTS */
let galleryButton = document.getElementById("button-gallery");
let gallery = document.getElementById("gallery");
let affordance = document.getElementById("affordance");
let backFromGalleryButton =document.getElementById("button-zurueck-from-gallery");
let flash =document.getElementById("flash");
// Debug
//const gui = new dat.GUI()

/**
 * Models
 */
const gltfLoader = new GLTFLoader()



// Canvas
//const canvas = document.querySelector('canvas.webgl')
let container = document.querySelector("#game-content");


// Scene
const scene = new THREE.Scene()

const zoomRatio = 1.5;


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial({ color: 0x444444, dithering:false } )
material.roughness = 0.8

// Objects
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    material
)
plane.rotation.x = -Math.PI * 0.5
plane.receiveShadow =true;
plane.position.y = 0

scene.add(plane)

const group = new THREE.Group()

//scene.add(group)

gltfLoader.load(
    modelPaths[0],
    (gltf) => {

        while (gltf.scene.children.length) {
            group.add(gltf.scene.children[0])
        }
    }
)
let loadedModel = undefined;


function loadAnotherModel(modelPath) {
    /*if (loadedModel !== undefined) {
        // unload again

        scene.remove(loadedModel);
        loadedModel = undefined;
        return;
    } */
    scene.remove(loadedModel);
    loadedModel = undefined;
    // load the second model
    const modelPosition = new THREE.Vector3(0, 0, 1);
    let uniformScale = new THREE.Vector3(1, 1, 1);
    gltfLoader.load(
        modelPath,
        gltf => loadedModel =
        onLoad(gltf)

    );
}

function onLoad(gltf) {

    const model = new THREE.Group();

    while (gltf.scene.children.length) {
        model.add(gltf.scene.children[0])
    }
    model.position.set(0, 0, 0)
    model.scale.set(0.3, 0.3, 0.3)
    model.traverse(n =>{
        if(n.isMesh){
            n.castShadow = true;
            n.receiveShadow = true;
            if(n.material.map) n.material.map.anisotropy = 16;
        }
    });
    scene.add(model);
    return model;
};

group.scale.x = 0.3
group.scale.y = 0.3
group.scale.z = 0.3


/**
 * Lights
 
// Ambient light
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
//scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.position.set(1, 0.25, 0)
//scene.add(directionalLight)

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3)
//scene.add(hemisphereLight)

// Point light
const pointLight = new THREE.PointLight(0xffffff, 0.5, 10, 2)
pointLight.position.set(1, - 0.5, 1)
//scene.add(pointLight)

// Rect area light
const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
//scene.add(rectAreaLight) */

// Spot light
const spotLight = new THREE.SpotLight(0xffffff, 0.1, 20, Math.PI * 0.2, 0.65, 2)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
spotLight.target.position.x = -0.75
spotLight.castShadow = true;
spotLight.shadow.bias = -0.001;
spotLight.shadow.mapSize.width = 1024*2;
spotLight.shadow.mapSize.height = 1024*2;
spotLight.shadow.focus = 1;
spotLight.intensity =0.1;
scene.add(spotLight.target)

// Spot light
const spotLight2 = new THREE.SpotLight(0xffffff, 0.1, 20, Math.PI * 0.2, 1, 2)
spotLight2.position.set(0, 0, 7)
scene.add(spotLight2)
spotLight2.target.position.x = -group.position.x
spotLight2.castShadow = true;
spotLight2.shadow.bias = -0.001;
spotLight2.shadow.mapSize.width = 1024*2;
spotLight2.shadow.mapSize.height = 1024*2;
spotLight2.shadow.focus = 1;
spotLight2.intensity =0.1;
scene.add(spotLight2.target)


const spotLight3 = new THREE.SpotLight(0xffffff, 0.1, 20, Math.PI * 0.2, 0.65, 2)
//spotLight3.position.set(0, 1, -7)
spotLight3.position.set(0, 6, -4)
scene.add(spotLight3)
spotLight3.target.position.x = -group.position.x
spotLight3.castShadow = true;
spotLight3.shadow.bias = -0.001;
spotLight3.shadow.mapSize.width = 1024*2;
spotLight3.shadow.mapSize.height = 1024*2;
spotLight3.shadow.focus = 1;
spotLight3.intensity =0.1;
scene.add(spotLight3.target)
/*

// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
//scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
//scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
//scene.add(pointLightHelper)
 */
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2)
//scene.add(spotLightHelper)
//scene.add(spotLightHelper2)
window.requestAnimationFrame(() => {
    //spotLightHelper.update()
    //spotLightHelper2.update()
})

//const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
//scene.add(rectAreaLightHelper)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



window.addEventListener('resize', () => {

    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.zoom = camera.aspect / 1.2;
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 2
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, container)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true,
    preserveDrawingBuffer: true
})
renderer.setSize(sizes.width, sizes.height)

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//renderer.shadowMap.type = THREE.VSMShadowMap;
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    if (ordnungGameOn == true) {
        const elapsedTime = clock.getElapsedTime()

        // Update objects


        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)

    }

}

tick()

function light1On() {
    gsap.to(spotLight, {
        duration: 1,
        delay: 1,
        intensity: 1
    })
    gsap.to(spotLight2, {
        duration: 1,
        delay: 0,
        intensity: 0
    })
    gsap.to(spotLight3, {
        duration: 1,
        delay: 0,
        intensity: 0
    })
}

function light2On() {
    gsap.to(spotLight2, {
        duration: 1,
        delay: 1,
        intensity: 1
    })
    gsap.to(spotLight, {
        duration: 1,
        delay: 0,
        intensity: 0
    })
    gsap.to(spotLight3, {
        duration: 1,
        delay: 0,
        intensity: 0
    })
}

function light3On() {
    gsap.to(spotLight3, {
        duration: 1,
        delay: 1,
        intensity: 1
    })
    gsap.to(spotLight, {
        duration: 1,
        delay: 0,
        intensity: 0
    })
    gsap.to(spotLight2, {
        duration: 1,
        delay: 0,
        intensity: 0
    })
}

var allLights = [
    light2On,
    light1On,
    light3On
]


document.getElementById("light-button").addEventListener("click", function () {
    if (counterLight < allLights.length - 1) {
        counterLight++;
    } else {
        counterLight = 0;
    }
    console.log("light pressed")
    allLights[counterLight]();

});


document.getElementById("model-button").addEventListener("click", function () {
    if (counterModel < modelPaths.length - 1) {
        counterModel++;
    } else {
        counterModel = 0;
    }
    console.log(modelPaths[counterModel])
    loadAnotherModel(modelPaths[counterModel]);
});

/* MANAGE BUTTONS */

//UNTIL INTERACTION STARTS
controls.addEventListener('start', function () {
    hideAffordance();
});

//HIDE AFFORDANCE IF A BUTTON WAS PRESSED
document.getElementById("gamebar").addEventListener('click', hideAffordance);
document.getElementById("navbar").addEventListener('click', hideAffordance);

// RETURN FROM GALLERY
backFromGalleryButton.addEventListener("click", function () {
    ordnungGameOn = true;
    tick();
});

/* IF GALLERY BUTTON CLICKED */
galleryButton.addEventListener("click", function () {
    showGallery();
    ordnungGameOn = false;
    
});

function showGallery() {
    gallery.style.visibility = "visible";
    gallery.classList.remove("gallery-animation-reverse");
    gallery.classList.add("gallery-animation");
}

function hideGallery() {
    gallery.classList.remove("gallery-animation");
    gallery.classList.add("gallery-animation-reverse");
}


/* WHICH SECTION IS ACTIVE NOW? */

document.getElementById("button-weiter").addEventListener("click", function () {
    currentSectionNr = currentSectionNr + 1;
    checkIfGame();
});
document.getElementById("button-zurueck").addEventListener("click", function () {
    currentSectionNr = currentSectionNr - 1;
    checkIfGame();
});

function checkIfGame() {
    if (currentSectionNr == 4) {
        ordnungGameOn = true;
        setTimeout(function () {
            showAffordance();
        }, 2000);

        loadAnotherModel(modelPaths[0]);
        tick();
        light2On()
    } else {
        ordnungGameOn = false;
    }
}

function showAffordance() {
    affordance.classList.remove("hide");
}

function hideAffordance() {
    affordance.classList.add("hide");
}

/* MAKE PHOTO AND PUT IT IN THE GALLERY */

document.getElementById("button-shoot").addEventListener("click", function () {
    var imgData, imgNode, imgFigure;
    imgData = renderer.domElement.toDataURL();
    console.log(imgData)
    try {
        imgData = renderer.domElement.toDataURL();
        console.log(imgData);
    } catch (e) {
        console.log("Browser does not support taking screenshot of 3d context");
        // return;
    }
    imgFigure = document.createElement("figure");
    imgFigure.classList.add("gallery-frame");

    imgNode = document.createElement("img");
    //imgNode.classList.add("bar-image");

    imgNode.addS
    imgNode.src = imgData;
    //document.body.appendChild(imgNode);
    imgFigure.appendChild(imgNode);
    document.getElementById("gallery-container").appendChild(imgFigure);
    //document.getElementById("gallery-container").appendChild(imgNode);

    //show flash
    
    flash.classList.add("flash-animation")
    setTimeout(function () {
        flash.classList.remove("flash-animation")
    }, 1200);
});
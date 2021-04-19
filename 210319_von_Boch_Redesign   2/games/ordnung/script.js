
import * as THREE from '../build/three.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from './jsm/utils/RoughnessMipmapper.js';
import {EffectComposer} from './jsm/postprocessing/EffectComposer.js';
import {RenderPass} from './jsm/postprocessing/RenderPass.js';
import {BloomPass} from './jsm/postprocessing/BloomPass.js';
import {FilmPass} from './jsm/postprocessing/FilmPass.js';

let camera, scene, renderer, composer;
let container = undefined;

init();
render();

function init() {

     container = document.getElementById( 'game-content' );
    console.log(container.clientHeight)

    camera = new THREE.PerspectiveCamera( 45, container.clientWidth / container.clientHeight, 0.25, 120 );
    camera.position.set( 0, 4, 10 );

    scene = new THREE.Scene();

    

    new RGBELoader()
        .setDataType( THREE.UnsignedByteType )
        .setPath( 'games/ordnung/textures/' )
        .load( 'memorial.hdr', function ( texture ) {

            const envMap = pmremGenerator.fromEquirectangular( texture ).texture;

            // scene.background = envMap;
             scene.environment = envMap;

            texture.dispose();
            pmremGenerator.dispose();

            render();

            // model

            // use of RoughnessMipmapper is optional
            const roughnessMipmapper = new RoughnessMipmapper( renderer );

            const loader = new GLTFLoader().setPath( 'games/ordnung/models/Cup/' );
            loader.load( 'teller_array-export.gltf', function ( gltf ) {

                gltf.scene.traverse( function ( child ) {

                    if ( child.isMesh ) {

                        // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
                        // roughnessMipmapper.generateMipmaps( child.material );

                    }

                } );

                scene.add( gltf.scene );

                roughnessMipmapper.dispose();

                render();

            } );

        } );
       

    renderer = new THREE.WebGLRenderer( { antialias: true,preserveDrawingBuffer: true  } );
    renderer.setPixelRatio( container.devicePixelRatio );
    renderer.setSize( container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild( renderer.domElement );
    console.log(container.clientWidth)
    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    pmremGenerator.compileEquirectangularShader();

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    // controls.minDistance = 6;
    // controls.maxDistance = 20;
    // controls.target.set( 0, 0, - 0.2 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize, false );

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new BloomPass(
            1,    // strength
            20,   // kernel size
            1,    // sigma ?
            512,  // blur render target resolution
        );


    // composer.addPass(bloomPass);
    const filmPass = new FilmPass(
        0.05,   // noise intensity
        0.025,  // scanline intensity
        648,    // scanline count
        false,  // grayscale
    );
    filmPass.renderToScreen = true;
    // composer.addPass(filmPass);



}

function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
console.log(container.clientWidth)
    renderer.setSize( container.clientWidth, container.clientHeight);

    render();

}

//

function render() {

    //renderer.render( scene, camera );
    if(composer != null)
    composer.render();

}


			/*** ADDING SCREEN SHOT ABILITY ***/
            window.addEventListener("keyup", function(e){
                var imgData, imgNode;
                //Listen to 'P' key
                if(e.which !== 80) return;  
                try {
                    imgData = renderer.domElement.toDataURL();      
                    console.log(imgData);
                } 
                catch(e) {
                    console.log("Browser does not support taking screenshot of 3d context");
                    return;
                }
               imgNode = document.createElement("img");
               imgNode.src = imgData;
               document.body.appendChild(imgNode);
            });



            document.getElementById("button-shoot").addEventListener("click", function(){
                var imgData, imgNode, imgFigure;
    imgData = renderer.domElement.toDataURL();  
    console.log(imgData)    
    try {
        imgData = renderer.domElement.toDataURL();      
        console.log(imgData);
    } 
    catch(e) {
        console.log("Browser does not support taking screenshot of 3d context");
       // return;
    }
   imgFigure =  document.createElement("figure");
   imgFigure.classList.add("gallery-frame");
  
   imgNode = document.createElement("img");
   //imgNode.classList.add("bar-image");

   imgNode.addS
   imgNode.src = imgData;
   //document.body.appendChild(imgNode);
   imgFigure.appendChild(imgNode);
   document.getElementById("gallery-container").appendChild(imgFigure);

   //document.getElementById("gallery-container").appendChild(imgNode);
            });





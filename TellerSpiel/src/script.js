import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

/**
 * Models
 */
 const gltfLoader = new GLTFLoader()



// Canvas
//const canvas = document.querySelector('canvas.webgl')
let container =   document.querySelector("#gameContainer");
console.log("container " + container.clientWidth)

// Scene
const scene = new THREE.Scene()

const zoomRatio = 1.5;


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = 0

scene.add( plane)

const group = new THREE.Group()

scene.add(group)

gltfLoader.load(
    '/models/teller.gltf',
    (gltf) =>
    {
        
        while(gltf.scene.children.length)
        {
            group.add(gltf.scene.children[0])
        }
    }
)

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
const spotLight = new THREE.SpotLight(0xffffff, 0, 20, Math.PI * 0.2, 0.65, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
spotLight.target.position.x = - 0.75
scene.add(spotLight.target) 

// Spot light
const spotLight2 = new THREE.SpotLight(0xffffff, 1, 20, Math.PI * 0.2, 0.65, 1)
spotLight2.position.set(0, 0, 7)
scene.add(spotLight2)
spotLight2.target.position.x = -group.position.x
scene.add(spotLight2.target)


const parameters = {
    light1: () =>
    {
        lightOn()
        console.log("light")
    },

    light2: () =>
    {
        gsap.to(spotLight, { duration: 1, delay: 1, intensity:0 })
        gsap.to(spotLight2, { duration: 1, delay: 2, intensity:1 })
        console.log("light")
    }
}
gui.add(parameters, 'light1')
gui.add(parameters, 'light2')
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
window.requestAnimationFrame(() =>
{
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
console.log("sizes " + container.clientWidth)


window.addEventListener('resize', () =>
{
    
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
const camera = new THREE.PerspectiveCamera(75,  sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, container)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias:true
})
renderer.setSize(sizes.width, sizes.height)
console.log("renderer " + container.clientWidth)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

function lightOn(){
    gsap.to(spotLight, { duration: 1, delay: 2, intensity:1 })
        gsap.to(spotLight2, { duration: 1, delay: 1, intensity:0 })
        console.log("light")
}
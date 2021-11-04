import * as THREE from './libraries/three/build/three.module.js';
import { OrbitControls } from './libraries/three/examples/jsm/controls/OrbitControls.js'
import { GUI } from './libraries/three/examples/jsm/libs/dat.gui.module.js'
import Point from './Point.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const boxX = 4
const boxY = 4
const boxZ = 4

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(5, 5, 5);

// AMBIANT LIGHT
const ambiantLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambiantLight );

// LIGHT
const light = new THREE.PointLight( 0xfff200, 20, 20, 20);
light.position.x = 0
light.position.y = 0
light.position.z = 0
scene.add( light );

// PLANE
const planeGeometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
const planeMaterial = new THREE.MeshPhongMaterial( {color: 0xffa94d} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane ); 
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI/2

// Utils functions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// PARTICLE CURVE

let nbPoints = 100
let currentPoint = new Point(null, new THREE.Vector2(0, 0), new THREE.Vector2(0, 1))
let nbIterations = 1000
for (let i = 0; i <= nbIterations; i++)  {
  
  let point = new Point(currentPoint, newPos, )
}

let particlesPosition = []

for (let i = 0; i < particles.length; i++) {
  particlesPosition.push(particles[i].pos)
}

// CURVE
console.log(particlesPosition)
const curve = new THREE.SplineCurve( 
  particlesPosition
 );

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
const splineObject = new THREE.Line( geometry, material );
scene.add(splineObject)

const moon = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( moon );

// RESIZING
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

// ORBIT CONTROLS
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

// GUI
// const gui = new GUI()
// const tubeFolder = gui.addFolder('Tree paramters')
// tubeFolder.add(tubeParams, 'radius', 0, 4).onChange(() => {
//   tube.geometry.parameters.radius = tubeParams.radius
// })
// tubeFolder.add(tubeParams, 'radialSegments', 0, 15).onChange(() => {
//   tube.geometry.parameters.radialSegments = tubeParams.radialSegments
// })
// tubeFolder.add(tubeParams, 'tubularSegments', 0, 40).onChange(() => {
//   tube.geometry.parameters.tubularSegments = tubeParams.tubularSegments
// })

const animate = function () {
  requestAnimationFrame( animate );

  // CONTROLS
  controls.update();
  

  // sphere.rotation.x += 0.01;
  // sphere.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();
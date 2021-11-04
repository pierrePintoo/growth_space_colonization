import * as THREE from './libraries/three/build/three.module.js';
import { OrbitControls } from './libraries/three/examples/jsm/controls/OrbitControls.js'
import { GUI } from './libraries/three/examples/jsm/libs/dat.gui.module.js'
import Tree from './algorithm/tree.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const boxX = 10
const boxY = 10
const boxZ = 10

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const geometry = new THREE.SphereGeometry( 0.5 );
// const material = new THREE.MeshPhongMaterial( );
// const sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );
// sphere.position.y = 2

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

// Plane
const planeGeometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
const planeMaterial = new THREE.MeshPhongMaterial( {color: 0xffa94d} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane ); 
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI/2

// CURVE(
const v1 = new THREE.Vector3(-2, 0, 0)
const v2 = new THREE.Vector3(2, 0, 0)
const curve = new THREE.LineCurve3(v1, v2)

// TUBE GEOMETRY
const tubeParams = {
  tubularSegments: 20,
  radius: 0.1,
  radialSegments: 8
};

const tubeGeometry = new THREE.TubeGeometry( curve, tubeParams.tubularSegments, tubeParams.radius, tubeParams.radialSegments, false );
const tubeMaterial = new THREE.MeshLambertMaterial( { color: 0xe09304, wireframe: true } );
const tube = new THREE.Mesh( tubeGeometry, tubeMaterial );
scene.add( tube );

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
const gui = new GUI()
const tubeFolder = gui.addFolder('Tree paramters')
tubeFolder.add(tubeParams, 'radius', 0, 4).onChange(() => {
  tube.geometry.parameters.radius = tubeParams.radius
})
tubeFolder.add(tubeParams, 'radialSegments', 0, 15).onChange(() => {
  tube.geometry.parameters.radialSegments = tubeParams.radialSegments
})
tubeFolder.add(tubeParams, 'tubularSegments', 0, 40).onChange(() => {
  tube.geometry.parameters.tubularSegments = tubeParams.tubularSegments
})

// SPACE COLONIZATION
let max_dist = 50
let min_dist = 10
let tree = new Tree(boxX, boxY, boxZ, min_dist, max_dist, scene)
tree.show()

const animate = function () {
  requestAnimationFrame( animate );

  // CONTROLS
  controls.update();

  // sphere.rotation.x += 0.01;
  // sphere.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();
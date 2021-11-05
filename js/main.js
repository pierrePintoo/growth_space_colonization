import * as THREE from './libraries/three/build/three.module.js';
import { OrbitControls } from './libraries/three/examples/jsm/controls/OrbitControls.js'
import { GUI } from './libraries/three/examples/jsm/libs/dat.gui.module.js'
import Point from './Point.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

const boxX = 4
const boxY = 4
const boxZ = 4
let mouseX = 0
let mouseY = 0

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(-10.58, 14.94, -58.57);

// AMBIANT LIGHT
const ambiantLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambiantLight );

// LIGHT
const light = new THREE.PointLight( 0xffa94d, 30, 20);
light.position.x = 0
light.position.y = 2
light.position.z = 0
scene.add( light );

// FOG
scene.fog = new THREE.Fog(0x000000, 50, 100)

// PLANE
const planeGeometry = new THREE.PlaneGeometry( 150, 150, 150, 150 );
const planeMaterial = new THREE.MeshLambertMaterial( {color: 0x2a2a2a} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane ); 
plane.position.set(0, 0, 0)
plane.rotation.x = -Math.PI/2

// Utils functions
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

// PARTICLE CURVE
let currentPoint = new Point(null, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0))


let nbNoeuds = 3
const points = [];
let branches = [];
// points.push( new THREE.Vector3( 0, 0, 0 ) );
// points.push( currentPoint.pos );
for (let i = nbNoeuds; i > 0; i -= 0.05){
  let newPos = new THREE.Vector3()

  let newDir = new THREE.Vector3(getRandomArbitrary(0, -i), getRandomArbitrary(0, i), getRandomArbitrary(0, i))
  //currentPoint.dir.multiplyScalar(5)
  newPos.addVectors(currentPoint.pos, currentPoint.dir)

  let point = new Point(currentPoint, newPos, newDir)

  branches.push(point.createNewBranch(i, scene, point))
  
  points.push(point.pos)

  currentPoint = point

}
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('./png/circle_05_t.png')

const material = new THREE.PointsMaterial({
	size: .1,
  sizeAttenuation: true,
  color: 0xffa94d,
  transparent: true,
  alphaMap: particleTexture,
  depthTest: false
});


const geometry = new THREE.BufferGeometry().setFromPoints( points );
//geometry.setDrawRange()

const line = new THREE.Points(geometry, material);
scene.add( line );

const moon = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( moon );

// on MouseMove
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  let range = (mouseX * points.length) / window.innerWidth
  let invMouseY = window.innerHeight - mouseY
  let materialRange = (invMouseY * 2) / window.innerHeight
  let branchRange = (mouseX * branches.length) / window.innerWidth
  
  material.size = materialRange
  geometry.setDrawRange(0, range)
  
  for(let i = 0; i < branches.length; i++) {
    branches[i].line.geometry.setDrawRange(0, branchRange)
    branches[i].material.size = materialRange
  }

})


// RESIZING
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

// ORBIT CONTROLS
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true
controls.enableDamping = true
controls.enableZoom = true
controls.maxPolarAngle = Math.PI / 2 - 0.1
controls.rotateSpeed = 1
controls.enableRotate = true
controls.minDistance = 1
controls.update();

const animate = function () {
  requestAnimationFrame( animate );

  // CONTROLS
  controls.update();

  //console.log(camera.position)

  renderer.render( scene, camera );
};

animate();
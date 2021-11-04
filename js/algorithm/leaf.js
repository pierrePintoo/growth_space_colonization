import * as THREE from '../libraries/three/build/three.module.js';

function Leaf(boxX, boxY, boxZ, scene) {
  this.pos = new THREE.Vector3(getRandomInt(-boxX/2, boxX/2), getRandomInt(0, boxY), getRandomInt(-boxZ/2, boxZ/2))
  this.reached = false

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  this.show = function() {
    // fill(255)
    // noStroke()
    // ellipse(this.pos.x, this.pos.y, 4, 4)
    console.log('appel')
    const geometry = new THREE.SphereGeometry( 0.2 );
    const material = new THREE.MeshPhongMaterial( {color: 0xffa94d} );
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    sphere.position.set(this.pos.x, this.pos.y, this.pos.z)
  }
}

export default Leaf;
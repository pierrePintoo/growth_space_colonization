import * as THREE from '../libraries/three/build/three.module.js';

function Leaf(boxX, boxY, boxZ, scene) {
  this.pos = new THREE.Vector3(getRandomArbitrary(-boxX/2, boxX/2), getRandomArbitrary(1, boxY), getRandomArbitrary(-boxZ/2, boxZ/2))
  this.reached = false

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  this.show = function() {
    // fill(255)
    // noStroke()
    // ellipse(this.pos.x, this.pos.y, 4, 4)
    const geometry = new THREE.SphereGeometry( 0.01 );
    const material = new THREE.MeshLambertMaterial( {color: 0xffa94d} );
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    sphere.position.set(this.pos.x, this.pos.y, this.pos.z)
  }
}

export default Leaf;
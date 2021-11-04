import * as THREE from './libraries/three/build/three.module.js';

function Point (parent, pos, dir) {
    this.parent = parent
    this.pos = pos
    this.dir = dir

    // this.setPosition = function (parent) {
    //     this.parent = parent
    //     let newPos = new THREE.Vector3()
    //     newPos.addVectors(this.pos, this.parent.pos)
    //     return new Particle(this.parent, newPos)
    // }
}

export default Point;
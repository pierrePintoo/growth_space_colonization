import * as THREE from '../libraries/three/build/three.module.js';

function Branch(parent, pos, dir, scene) {
  this.pos = pos
  this.parent = parent
  this.dir = dir
  this.count = 0
  this.origDir = new THREE.Vector3()
  this.origDir.copy(this.dir)
  
  this.reset = function () {
    this.dir.copy(this.origDir)
    this.count = 0
  }
  
  this.next = function () {
    // console.log('pos : ', this.pos, 'dir : ', this.dir)
    let newPos = new THREE.Vector3()
    newPos.addVectors(this.pos, this.dir)
    let copyDir = new THREE.Vector3()
    // console.log('nextPos', nextPos)
    // console.log('this dans next : ', this)
    // console.log(nextPos)
    let nextBranch = new Branch(this, newPos, copyDir.copy(this.dir), scene)
    return nextBranch;
  }
  
  this.show = function (scene) {
    // console.log(this.parent)
    if (this.parent != null) {
        // stroke(255)
        // CURVE
        const curve = new THREE.LineCurve3(this.pos, this.parent.pos)
        console.log(curve)
        // TUBE GEOMETRY
        const tubeParams = {
          tubularSegments: 6,
          radius: 0.1,
          radialSegments: 6
        };

        const tubeGeometry = new THREE.TubeGeometry( curve, tubeParams.tubularSegments, tubeParams.radius, tubeParams.radialSegments, false );
        const tubeMaterial = new THREE.MeshLambertMaterial( { color: 0xe09304, side: THREE.DoubleSide, depthTest: true, depthWrite: true } );
        const tube = new THREE.Mesh( tubeGeometry, tubeMaterial );
        scene.add( tube );
        // console.log(tube)
        // line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y) 
    }
  }
}

export default Branch;
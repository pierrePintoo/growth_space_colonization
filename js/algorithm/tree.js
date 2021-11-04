import Branch from './branch.js'
import Leaf from './leaf.js'
import * as THREE from '../libraries/three/build/three.module.js';

function Tree(boxX, boxY, boxZ, min_dist, max_dist, scene) {
  this.leaves = []
  this.branches = []
  this.nbLeaves = 300


  for(let i = 0; i < this.nbLeaves; i++) {
    this.leaves.push(new Leaf(boxX, boxY, boxZ, scene))
  }
  
  let dir = new THREE.Vector3(0, 0.1, 0)
  let pos = new THREE.Vector3(0, -1, 0)
  let root = new Branch(null, pos, dir, scene)
  
  this.branches.push(root)
  
  let current = root
  let found = false
  
  while (!found) {
    for (let i = 0; i < this.leaves.length; i++) {

      let d = current.pos.distanceTo(this.leaves[i].pos)

      if (d < max_dist) {
        found = true
        console.log('founded')
      }
      if (!found) {
        let branch = current.next()
        // console.log('branch', branch.pos)
        current = branch
        this.branches.push(current)
        // console.log('not founded')
      }
    }
  }
  
  this.grow = function(min_dist, max_dist) {
    for(let i = 0; i < this.leaves.length; i++) {
      let leaf = this.leaves[i]
      let closestBranch = null
      let record = 10000
      
      for(let j = 0; j < this.branches.length; j++) {
        let branch = this.branches[j]
        let d = leaf.pos.distanceTo(branch.pos)
        // console.log(min_dist, d)
        if (d < min_dist) {
          leaf.reached = true
          closestBranch = null
        } else if (d > max_dist) {
          
        } else if (closestBranch == null || d < record) {
          closestBranch = branch
          record = d
        }
      }
      
      if (closestBranch != null) {
        let newDir = leaf.pos.sub(closestBranch.pos)
        newDir.normalize()
        closestBranch.dir.add(newDir)
        closestBranch.count++
      }
    }
    
    for (let i = this.leaves.length - 1; i >= 0; i--) {
      if (this.leaves[i].reached) {
        console.log('reached')
        this.leaves.splice(i, 1)
      }
    }
    
    for (let i = this.branches.length - 1; i >= 0 ; i--) {
      let branch = this.branches[i]
      // console.log('count branch', branch.count)
      if (branch.count > 0) {
        // console.log('counted')
        branch.dir.divide(branch.count)
        let newPos = new THREE.Vector3()
        newPos.addVectors(branch.pos, branch.dir)
        
        let newBranch = new Branch(branch, newPos, branch.dir, scene)
        
        this.branches.push(newBranch)
      }
      branch.reset()
    }
  }
  
  this.show = function() {
    for (let i = 0; i < this.leaves.length; i++) {
      this.leaves[i].show()
    }
    console.log(this.branches)
    for (let i = 0; i < this.branches.length ; i++) {
      // console.log('branches')
      this.branches[i].show(scene)
    }
  }
}

export default Tree
function Branch(parent, pos, dir) {
  this.pos = pos
  this.parent = parent
  this.dir = dir
  this.count = 0
  // this.origDir = this.dir.copy()
  
  // this.reset = function () {
  //   this.dir = this.origDir.copy()
  //   this.count = 0
  // }
  
  // this.next = function () {
  //   let nextPos = p5.Vector.add(this.pos, this.dir)
  //   let nextBranch = new Branch(this, nextPos, this.dir.copy())
  //   return nextBranch;
  // }
  
  // this.show = function () {
  //   if (this.parent != null) {
  //       stroke(255)
  //       line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y) 
  //   }
  // }
}

export default Branch;
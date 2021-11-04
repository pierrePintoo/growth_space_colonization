const Line = () => {
  this.mesh

  const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  this.mesh = new THREE.Mesh( geometry, material );
}

export default Line();
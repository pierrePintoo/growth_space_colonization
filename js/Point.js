import * as THREE from './libraries/three/build/three.module.js';
import { GUI } from './libraries/three/examples/jsm/libs/dat.gui.module.js';

function Point (parent, pos, dir) {
    this.parent = parent
    this.pos = pos
    this.dir = dir

    this.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min
      }

    this.createNewBranch = function(nbNoeuds, scene, currentPoint) {

        // let currentPoint = new Point(null, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0))

        const points = [];
        for (let i = nbNoeuds; i > 0; i -= 0.05) {
            let newPos = new THREE.Vector3()
            let newDir = new THREE.Vector3(this.getRandomArbitrary(0, i), this.getRandomArbitrary(0, i), this.getRandomArbitrary(0, i))
            newPos.addVectors(currentPoint.pos, currentPoint.dir)

            let point = new Point(currentPoint, newPos, newDir)
            
            points.push(point.pos)

            currentPoint = point
        }

        
        const textureLoader = new THREE.TextureLoader()
        const particleTexture = textureLoader.load('./png/circle_05_t.png')

        const material = new THREE.PointsMaterial({
            size: .1,
            sizeAttenuation: true,
            color: 0xffbf00,
            transparent: true,
            alphaMap: particleTexture,
            //alphaTest: 0.001h
            depthTest: false
        });

        // GUI

        let count = {
            particles: 100
        }
        
        let initGUI = function () {

            const gui = new GUI();

            gui.add( count, "particles", 0, nbNoeuds, 1 ).onChange( function ( value ) {

                geometry.setDrawRange( 0,  nbNoeuds);

            } );

        }

        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        geometry.setDrawRange(0, points.length)
        const line = new THREE.Points( geometry, material );
        // line.rotation.x = -Math.PI / 6
        // initGUI()
        scene.add( line );

        const branch = {
            line: line,
            points: points,
            material: material
        }

        return branch;
    }
}

export default Point;
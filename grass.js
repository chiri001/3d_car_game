import * as THREE from 'three';

export class Grass {
    constructor(scene, width, length, offset) {
        this.width = (width - 200) / 2;
        this.length = length;
        this.offset = offset;

        const grassGeom = new THREE.PlaneGeometry(this.width, this.length);
        const grassMaterial = new THREE.MeshLambertMaterial({
            color: 0x228b22,
        }); //green color

        this.mesh = new THREE.Mesh(grassGeom, grassMaterial);
        this.mesh.rotation.x = -Math.PI / 2; //lay flat

        //position grass beside road
        this.mesh.position.set(this.offset, 0, 0);

        scene.add(this.mesh);
    }
}

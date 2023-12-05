import * as THREE from 'three';

export class Highway {
    constructor(scene, length) {
        this.roadLength = length;
        this.roadWidth = 200;
        const roadGeom = new THREE.PlaneGeometry(
            this.roadWidth,
            this.roadLength
        );
        const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        this.mesh = new THREE.Mesh(roadGeom, roadMaterial);
        this.mesh.rotation.x = -Math.PI / 2;
        scene.add(this.mesh);

        //creating dashed lines for lane seperation
        this.dashedLines = [];
        const numDashes = 20;
        const dashSpacing = this.roadLength / numDashes;
        //setting three lanes
        for (let i = 0; i < numDashes; i++) {
            const dashGeom = new THREE.PlaneGeometry(3, 5); //size of one dash
            const dashMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff,
            });
            const dash = new THREE.Mesh(dashGeom, dashMaterial);

            //setting position of each dash
            dash.position.set(0, 0.1, i * dashSpacing - this.roadLength / 2);
            dash.rotation.x = -Math.PI / 2;
            scene.add(dash);
            this.dashedLines.push(dash);
        }
    }

    getRoadWidth() {
        return this.roadWidth;
    }
    getRoadLength() {
        return this.roadLength;
    }

    animate() {
        //moving dashed lines to simulate motion
        this.dashedLines.forEach((dash) => {
            dash.position.z += 3; //movement speed
            if (dash.position.z > this.roadLength / 2) {
                //reset position sinceit has gone beyond screen
                dash.position.z = -this.roadLength / 2;
            }
        });
    }
}

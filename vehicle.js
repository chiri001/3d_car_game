import * as THREE from 'three';

export class Vehicle extends THREE.Object3D {
    constructor(scene, lane, roadWidth, roadLength) {
        super();
        this.lane = lane;
        this.roadWidth = roadWidth;
        this.roadLength = roadLength;
        this.velocity = new THREE.Vector3(0, 0, 100);
        this.color = this.getRandomColor();

        //main body of the car
        const bodyGeometry = new THREE.BoxGeometry(30, 20, 45); //l,w,h
        const bodyMaterial = new THREE.MeshLambertMaterial({
            color: this.color,
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(0, 5, 0);
        this.add(body);

        // Top part of the car
        const topGeometry = new THREE.BoxGeometry(28, 10, 22);
        const topMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.set(0, 20, 5);
        this.add(top);

        //wheels
        const wheelGeometry = new THREE.CylinderGeometry(5, 5, 5, 32);
        const wheelMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
        });

        //front wheels
        const frontWheelPositions = [
            new THREE.Vector3(-12, 3, -10),
            new THREE.Vector3(12, 3, -10),
        ];
        frontWheelPositions.forEach((pos) => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.rotation.x = Math.PI / 2;
            wheel.position.copy(pos);
            this.add(wheel);
        });

        //rear wheels
        const rearWheelPositions = [
            new THREE.Vector3(-12, 3, 10),
            new THREE.Vector3(12, 3, 10),
        ];
        rearWheelPositions.forEach((pos) => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.rotation.x = Math.PI / 2;
            wheel.position.copy(pos);
            this.add(wheel);
        });

        // Rear lights
        const lightGeometry = new THREE.BoxGeometry(2, 2, 2);
        const lightMaterial = new THREE.MeshLambertMaterial({
            color: 0xff0000,
        });
        const rearLightPositions = [
            new THREE.Vector3(-14, 10, 23),
            new THREE.Vector3(14, 10, 23),
        ];
        rearLightPositions.forEach((pos) => {
            const light = new THREE.Mesh(lightGeometry, lightMaterial);
            light.position.copy(pos);
            this.add(light);
        });

        scene.add(this);

        //find position based on lane, 1 is right and 0 is left
        const laneWidth = this.roadWidth / 2;
        const laneCenter = laneWidth / 2;
        this.position.x = lane === 0 ? -laneCenter : laneCenter;
    }

    update(deltaTime) {
        this.position.add(this.velocity.clone().multiplyScalar(deltaTime));
    }

    getRandomColor() {
        const r = Math.floor(Math.random() * 256); // Get a random number between 0 - 255
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Convert each color component to a two-digit hexadecimal string
        const hexR = r.toString(16).padStart(2, '0');
        const hexG = g.toString(16).padStart(2, '0');
        const hexB = b.toString(16).padStart(2, '0');

        // Combine them and prepend with '0x'
        return parseInt(`0x${hexR}${hexG}${hexB}`, 16);
    }

    getBoundingBox() {
        const box = new THREE.Box3().setFromObject(this);
        return box;
    }
}

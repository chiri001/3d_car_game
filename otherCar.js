import { Vehicle } from './vehicle.js';
import * as THREE from 'three';

export class Car extends Vehicle {
    constructor(scene, lane, roadWidth, roadLength) {
        super(scene, lane, roadWidth, roadLength);

        this.position.z = -roadLength / 2;
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}

import { Vehicle } from './vehicle.js';
import * as THREE from 'three';

export class MyCar extends Vehicle {
    constructor(scene, lane, roadWidth, roadLength) {
        super(scene, lane, roadWidth, roadLength);

        this.position.z = -this.roadWidth / 16; // 1/16 length from start of road
    }

    moveCar(direction) {
        if (direction === 'left' && this.lane == 1) {
            this.lane = 0;
        } else if (direction === 'right' && this.lane == 0) {
            this.lane = 1;
        }

        const laneWidth = this.roadWidth / 2;
        const laneCenter = laneWidth / 2;
        this.position.x = this.lane === 0 ? -laneCenter : laneCenter;
    }
}

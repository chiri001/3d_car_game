import * as THREE from 'three';
import { Highway } from './highway.js';
import { Grass } from './grass.js';
import { MyCar } from './myCar.js';
import { Car } from './otherCar.js';

let scene, camera, renderer, highway;
let lastSpawnTime = 0;
const spawnInterval = 5;
const cars = [];
const clock = new THREE.Clock();
const sceneWidth = 1500; //width of view
const sceneLength = 1000; //length of view
let myCar;
let running = false;

function init() {
    scene = new THREE.Scene(); //scene

    //camera
    const aspectRatio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 100, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x87ceeb, 1);
    document.body.appendChild(renderer.domElement);

    //lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    //creating highway
    highway = new Highway(scene, sceneLength);

    //finding the offset for grass
    const grassOffset =
        highway.getRoadWidth() / 2 + (sceneWidth - highway.getRoadWidth()) / 4;

    //grass on the highway sides
    const grassLeft = new Grass(scene, sceneWidth, sceneLength, -grassOffset);
    const grassRight = new Grass(scene, sceneWidth, sceneLength, grassOffset);

    //my car
    myCar = new MyCar(
        scene,
        get_random_lane(),
        highway.getRoadWidth(),
        sceneLength
    );

    window.addEventListener('keydown', onDocumentKeyDown, false);
}

function animate() {
    if (running) {
        const deltaTime = clock.getDelta();

        requestAnimationFrame(animate);

        //game logic
        highway.animate(); //simulates movement of my car

        cars.forEach((car) => {
            car.update(deltaTime); // Apply movement
        });

        spawnVehicle();

        check_collission();
    }

    renderer.render(scene, camera);
}

function spawnVehicle() {
    const currTime = performance.now() / 1000; //time in seconds

    if (currTime - lastSpawnTime > spawnInterval) {
        //randomly spawn on lane 1 or 2
        const new_car = new Car(
            scene,
            get_random_lane(),
            highway.getRoadWidth(),
            sceneLength
        );

        cars.push(new_car);

        lastSpawnTime = currTime;
    }
}

function get_random_lane() {
    return Math.floor(Math.random() * 2); //random index btwn 0 and 1
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentKeyDown(event) {
    const keyCode = event.which;
    if (keyCode == 37) {
        // Left arrow key
        myCar.moveCar('left');
    } else if (keyCode == 39) {
        // Right arrow key
        myCar.moveCar('right');
    }
}

function check_collission() {
    const myCarBounds = myCar.getBoundingBox();

    for (let car of cars) {
        const carBounds = car.getBoundingBox();

        if (myCarBounds.intersectsBox(carBounds)) {
            //console.log('collision detected');
            running = false;
            game_over();
        }
    }
}

function start_simulation() {
    running = true;
    init();
    animate();
}

start_simulation();

function game_over() {
    const popup = document.getElementById('restart-game');
    popup.style.display = 'block';
}

document.getElementById('restart-btn').addEventListener('click', function () {
    const popup = document.getElementById('restart-game');
    popup.style.display = 'none';

    window.location.reload();
});

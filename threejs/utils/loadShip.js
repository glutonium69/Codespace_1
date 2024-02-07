import {  Object3D, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const rocketUrl = new URL("../assets/ship.gltf", import.meta.url);

export function loadShip(animate, scene){
    
    const pivot = new Object3D();
    pivot.name = "ship";
    scene.add(pivot);

    const loader = new GLTFLoader();

    loader.load(
        rocketUrl.href, 

        (gltf) => {

            let rocket = gltf.scene;
            rocket.name = "shipModel";
            rocket.scale.set(3, 3, 3);
            rocket.rotation.set(-Math.PI / 2, -Math.PI / 2, 0);
            pivot.add(rocket);
            pivot.add(scene.getObjectByName("camera"))

            const boundingBox = new Box3().setFromObject(rocket);
            const shipLength = boundingBox.max.z - boundingBox.min.z;

            rocket.position.z = shipLength / 2;

            animate();
        }, 

        undefined,

        (error) => {
            console.log(error)
        }
    )
}
import {  Object3D, Box3, MeshBasicMaterial, Mesh, Vector3, BufferGeometry, BufferAttribute } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const rocketUrl = new URL("../assets/ship.gltf", import.meta.url);

export function loadShip(animate, scene, pCamera){

    const pivot = new Object3D();
    pivot.name = "ship";
    pivot.position.set(0, 0, 20000);
    // pivot.position.z = 5000;
    scene.add(pivot);

    const loader = new GLTFLoader();

    loader.load( 
        rocketUrl.href, 

        (gltf) => {

            let rocket = gltf.scene;
            rocket.name = "shipModel";
            rocket.rotation.set(-Math.PI / 2, -Math.PI / 2, 0);


            const geometry = new BufferGeometry();
            geometry.setAttribute('position', new BufferAttribute(new Float32Array([
                0,    200, 0,
                -200, -200, 0,
                200, -200, 0
            ]), 3));

            const material = new MeshBasicMaterial({ color: 0x43eb34 });

            const blip = new Mesh(geometry, material);
            blip.scale.set(6, 6, 6);
            blip.rotateX(-Math.PI / 2);
            blip.layers.set(1);
            
            pivot.add(rocket, pCamera, blip);

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
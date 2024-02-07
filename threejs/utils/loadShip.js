import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const rocketUrl = new URL("../assets/ship.gltf", import.meta.url);

export function loadShip(animate, scene){
    
    const loader = new GLTFLoader();

    loader.load(
        rocketUrl.href, 

        (gltf) => {
    
            let rocket = gltf.scene;
            rocket.name = "ship";
            rocket.scale.set(3, 3, 3);
            rocket.rotation.set(-Math.PI / 2, -Math.PI / 2, 0);
            scene.add(rocket);
            animate();
        }, 

        undefined,

        (error) => {
            console.log(error)
        }
    )
}
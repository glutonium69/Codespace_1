import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { scene } from '../init.js';

const rocketUrl = new URL("../assets/ship.gltf", import.meta.url);

export function loadShip(animate){
    
    const loader = new GLTFLoader();

    loader.load(
        rocketUrl.href, 

        (gltf) => {
    
            let rocket = gltf.scene;
            rocket.name = "ship";
            rocket.scale.set(3, 3, 3);
            rocket.position.set(0, 0, 30);
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
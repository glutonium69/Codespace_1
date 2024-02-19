import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    AmbientLight,
    Vector3,
    Vector2,
    CubeTextureLoader,
} from 'three';

import starsTexture from "./assets/textures/stars.jpg";

export const scene = new Scene();
export const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export const pCamera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 5000);
const pCameraOffset = new Vector3(0, 20, 50);
pCamera.lookAt(new Vector3(0, -3, -40));
pCamera.position.copy(pCameraOffset);

scene.add(pCamera);

const cubeTextureLoader = new CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const light = new AmbientLight( 0xffffff, 0.05 ); // soft white light
scene.add(light);

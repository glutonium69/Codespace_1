import { Scene, WebGLRenderer, PerspectiveCamera, AmbientLight, Vector3, CubeTextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from "./assets/textures/stars.jpg";

export const scene = new Scene();
export const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export const camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 5000);
// const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.update();

const cameraOffset = new Vector3(0, 30, 50);
camera.lookAt(new Vector3(0, -3, -5000));
camera.rotateX(-0.3)
camera.position.copy(cameraOffset);
camera.name = "camera";
scene.add(camera);

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
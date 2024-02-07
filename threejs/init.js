import { Scene, WebGLRenderer, PerspectiveCamera, AmbientLight, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createBoxs } from './utils/createBoxes.js';


export const scene = new Scene();
export const renderer = new WebGLRenderer();
renderer.setClearColor(0x101010);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export const camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 1500);
// const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.update();

const cameraOffset = new Vector3(0.0, 40.0, 80.0);
camera.rotateX(-0.3)
camera.position.copy(cameraOffset);
camera["cameraOffset"] = cameraOffset;

const light = new AmbientLight( 0xffffff ); // soft white light
scene.add(light);

createBoxs(scene);
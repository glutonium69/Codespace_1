import { Scene, WebGLRenderer, PerspectiveCamera, AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const scene = new Scene();
export const renderer = new WebGLRenderer();
renderer.setClearColor(0x212121);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
const orbit = new OrbitControls( camera, renderer.domElement );

camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0);
orbit.update();


const light = new AmbientLight( 0xffffff ); // soft white light
scene.add( light );
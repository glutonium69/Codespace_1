import { scene, camera, renderer } from './init.js';
import { createPlanets } from './functions/createPlantes.js';
import { checkWBGL } from './functions/checkWEBGL.js';
import { loadShip } from './functions/loadShip.js';
import { controlShip } from './functions/controlShip.js';
import { keyPressed, shipProp, planets } from './functions/objectsProp.js';
import { invokeEventListeners } from './functions/eventListeners.js';
import { animatePlanets } from './functions/animatePlanets.js';
import Stats from 'three/examples/jsm/libs/stats.module'
const stats = new Stats()
document.body.appendChild(stats.dom)

createPlanets(scene, planets, camera);
invokeEventListeners(scene, keyPressed, shipProp, camera, renderer);
checkWBGL() && loadShip(animate, scene, planets);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	animatePlanets(planets);
	controlShip(scene.getObjectByName("shipModel") ,scene.getObjectByName("ship"), shipProp, keyPressed);
	stats.update();
}
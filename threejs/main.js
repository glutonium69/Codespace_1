import { scene, camera, renderer } from './init.js';
import { createPlanets } from './utils/createPlantes.js';
import { checkWBGL } from './utils/checkWEBGL';
import { loadShip } from './utils/loadShip';
import { controlShip } from './utils/controlShip.js';
import { keyPressed, shipProp, planets } from './utils/objectsProp.js';
import { invokeEventListeners } from './utils/eventListeners.js';
import { animatePlanets } from './utils/animatePlanets.js';
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
import { scene, camera, renderer } from './init.js';
import { createPlanets } from './utils/createPlantes.js';
import { checkWBGL } from './utils/checkWEBGL';
import { loadShip } from './utils/loadShip';
import { controlShip } from './utils/controlShip.js';
import { handleKeydown } from './utils/eventHandler/keyDown.js';
import { handleKeyup } from './utils/eventHandler/keyUp.js';
import { keyPressed, shipProp, planets } from './utils/objectsProp.js';
import { animatePlanets } from './utils/animatePlanets.js';
import Stats from 'three/examples/jsm/libs/stats.module'
const stats = new Stats()
document.body.appendChild(stats.dom)

createPlanets(scene, planets, camera);
checkWBGL() && loadShip(animate, scene);

window.addEventListener("keydown", event => {

	if(!scene.getObjectByName("ship")) return;

	handleKeydown(event.key.toLowerCase(), keyPressed);

	if("ws".includes(event.key.toLowerCase()))
		shipProp.accelarating = true;
});

window.addEventListener("keyup", event => {
	
	if(!scene.getObjectByName("ship")) return;
	
	handleKeyup(event.key.toLowerCase(), keyPressed);

	if("ws".includes(event.key.toLowerCase()))
		shipProp.accelarating = false;
});

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	animatePlanets(planets);
	controlShip(scene.getObjectByName("shipModel") ,scene.getObjectByName("ship"), shipProp, keyPressed);
	stats.update();
}

window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});
import { scene, camera, renderer } from './init.js';
import { checkWBGL } from './utils/checkWEBGL';
import { loadShip } from './utils/loadShip';
import { controlShip } from './utils/controlShip.js';
import { controlCamera } from './utils/controlCamera.js';
import { handleKeydown } from './utils/eventHandler/keyDown.js';
import { handleKeyup } from './utils/eventHandler/keyUp.js';
import Stats from 'three/examples/jsm/libs/stats.module'
const stats = new Stats()
document.body.appendChild(stats.dom)

const keyPressed = {
	w: false,
	s: false,
	a: false,
	d: false,
}

const shipProp = {
	linearVelocity: 0,
	accelaration: 0.5,
	deccelaration: -0.1,
	maxVelocity: 5,
	accelarating: false
}


let moveShip = false;

checkWBGL() && loadShip(animate, scene);

window.addEventListener("keydown", event => {

	if(!scene.getObjectByName("ship")) return;

	handleKeydown(event, keyPressed);
	shipProp.accelarating = true;
});

window.addEventListener("keyup", event => {
	
	if(!scene.getObjectByName("ship")) return;
	
	handleKeyup(event, keyPressed);
	shipProp.accelarating = false;
});

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	
	controlShip(scene.getObjectByName("ship"), shipProp, keyPressed);
	controlCamera(scene.getObjectByName("ship"), shipProp, camera);

	stats.update();
}
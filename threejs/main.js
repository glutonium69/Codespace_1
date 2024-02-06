import { scene, camera, renderer } from './init.js';
import { checkWBGL } from './utils/checkWEBGL';
import { loadShip } from './utils/loadShip';
import { createBoxs } from './utils/createBoxes.js';
import { controlShip } from './utils/control.js';
import { handleKeydown } from './utils/eventHandler/keyDown.js';
import { handleKeyup } from './utils/eventHandler/keyUp.js';

createBoxs(scene);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

checkWBGL() && loadShip(animate);


const keyPressed = {
	w: false,
    s: false,
    a: false,
    d: false,
}

window.addEventListener("keydown", event => {

	if(!scene.getObjectByName("ship")) return;

	handleKeydown(event, keyPressed);
	controlShip(scene.getObjectByName("ship"), keyPressed);
});
window.addEventListener("keyup", event => {

	if(!scene.getObjectByName("ship")) return;

	handleKeyup(event, keyPressed);
	controlShip(scene.getObjectByName("ship"), keyPressed);
});
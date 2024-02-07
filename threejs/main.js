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
	q: false,
	else: false,
	shift: false
}

const shipProp = {
	angularVelocity: 0.01, // determines how fast ship rotates horizontally
	turningVelocity: 1, // determines how fast ship titls
	linearVelocity: 0, // keeps track of ship's velocity
	accelaration: 0.1, // determines how fast ship accelerates
	deccelaration: -0.1, // determines how fast ship decelerates
	maxVelocity: 4, // maximum velocity of the ship
	boostVelocity: 10, // maximum velocity upon providing boost
	accelarating: false // determines ships state that is, if user is trying to move the ship or not
}

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
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	
	controlShip(scene.getObjectByName("shipModel") ,scene.getObjectByName("ship"), shipProp, keyPressed);
	controlCamera(scene.getObjectByName("ship"), shipProp, camera);

	stats.update();
}


window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});
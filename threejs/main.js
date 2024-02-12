import { scene, pCamera, renderer } from './init.js';
import { setMinimap } from './functions/setMinimap.js';
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



createPlanets(scene, planets, pCamera);
invokeEventListeners(scene, keyPressed, shipProp, pCamera, renderer);

const { oCamera, minimapObj } = setMinimap(scene, planets);
checkWBGL() && loadShip(animate, scene, pCamera);


function animate() {
	requestAnimationFrame(animate);
	animatePlanets(planets);
	controlShip(scene.getObjectByName("shipModel") ,scene.getObjectByName("ship"), shipProp, keyPressed);
	stats.update();
	
	renderer.setViewport( 0, 0, innerWidth, innerHeight );
	renderer.clear();
	renderer.render(scene, pCamera);

	if(!oCamera || !minimapObj) return;

    renderer.setViewport(minimapObj.posX, minimapObj.posY, minimapObj.width, minimapObj.height);
    renderer.render(scene, oCamera);
}
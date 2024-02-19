import { Vector2 } from 'three';
import { scene, pCamera, renderer } from './init.js';
import { setBlips } from  './functions/setBlips.js';
import { updatePolygons } from "./functions/updatePolygons.js";
import { createPlanets } from './functions/createPlantes.js';
import { checkWBGL } from './functions/checkWEBGL.js';
import { loadShip } from './functions/loadShip.js';
import { controlShip } from './functions/controlShip.js';
import { keyPressed, shipProp, planets } from './functions/objectsProp.js';
import { invokeEventListeners } from './functions/eventListeners.js';
import { animatePlanets } from './functions/animatePlanets.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import Stats from 'three/examples/jsm/libs/stats.module';
const stats = new Stats()
document.body.appendChild(stats.dom)

const renderScene = new RenderPass(scene, pCamera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);

const bloomPass = new UnrealBloomPass(
   new Vector2(innerWidth, innerHeight),
   1,
   0.1,
   0.1
);
composer.addPass(bloomPass);

createPlanets(scene, planets, pCamera);
invokeEventListeners(scene, keyPressed, shipProp, pCamera, renderer);

checkWBGL() && loadShip(animate, scene, pCamera);

function animate() {
    requestAnimationFrame(animate);
    animatePlanets(planets);
    controlShip(scene.getObjectByName("shipModel"), scene.getObjectByName("ship"), shipProp, keyPressed);
    stats.update();
    updatePolygons(scene.getObjectByName("ship"), planets);    
   
    setBlips(planets, pCamera, scene.getObjectByName("ship"), scene);    
    keyPressed.b ? composer.render() : renderer.render(scene, pCamera);
}

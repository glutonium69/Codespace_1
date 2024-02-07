import { Vector3 } from "three";

let counter  = 0;
export function controlCamera(ship, shipProp, camera){
    const offset = new Vector3();
    offset.copy(camera.cameraOffset);
    offset.z += counter;

    camera.position.copy(ship.position).add(offset);
    const dist = ship.position.distanceTo(camera.position);
    if(dist < 110 && shipProp.accelarating) counter += shipProp.accelaration;

    if(!shipProp.accelarating && (shipProp.linearVelocity !== 0 || counter > 0)) {
        counter -= shipProp.accelaration;
        
        counter = counter < 1 ? 0 : counter; 
    }
}
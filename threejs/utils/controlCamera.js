import { Vector3 } from "three";

let x  = 1;
export function controlCamera(ship, shipProp, camera){
    const offset = new Vector3();
    offset.copy(camera.cameraOffset);
    offset.z += x;

    camera.position.copy(ship.position).add(offset);
    const dist = ship.position.distanceTo(camera.position);
    if(dist < 110 && shipProp.accelarating) x += shipProp.accelaration;
}
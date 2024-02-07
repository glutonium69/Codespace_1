export function controlShip(ship, shipProp, keyPressed){

	// if(shipProp.linearVelocity === 0) return;

	// if(!shipProp.accelarating && shipProp.linearVelocity > 0){
	// 	shipProp.linearVelocity += shipProp.deccelaration;
	// }

	(keyPressed.w) && goForward(ship, shipProp);
	(keyPressed.s) && goBackward(ship, shipProp);
	keyPressed.a && goLeft(ship, shipProp);
	keyPressed.d && goRight(ship, shipProp);
}


function goForward(ship, shipProp) {
    ship.position.z -= shipProp.linearVelocity;
	if(shipProp.linearVelocity >= shipProp.maxVelocity || !shipProp.accelarating) return;
	shipProp.linearVelocity += shipProp.accelaration
 }

function goBackward(ship, shipProp) { 
    ship.position.z += shipProp.linearVelocity;
	if(shipProp.linearVelocity >= shipProp.maxVelocity) return;
	shipProp.linearVelocity += shipProp.accelaration
}

function goLeft(ship, shipProp) { 
	ship.rotation.y -= 0.1;
}

function goRight(ship, shipProp) { 
	ship.rotation.y += 0.1;

}
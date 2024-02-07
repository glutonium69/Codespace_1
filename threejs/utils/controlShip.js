export function controlShip(ship, shipProp, keyPressed){

	if(!shipProp.accelarating && shipProp.linearVelocity !== 0){

		if(shipProp.linearVelocity > 0)
			shipProp.linearVelocity += shipProp.deccelaration;
	
		
		if(shipProp.linearVelocity < 0)
			shipProp.linearVelocity -= shipProp.deccelaration;

	
		if(
			shipProp.linearVelocity < (shipProp.accelaration * 0.9) &&
			shipProp.linearVelocity > (shipProp.accelaration * -0.9)
		) 
			shipProp.linearVelocity = 0; 

	}


	
	if(keyPressed.w && shipProp.linearVelocity <= shipProp.maxVelocity)
		shipProp.linearVelocity += shipProp.accelaration;

	if(keyPressed.s && Math.abs(shipProp.linearVelocity) <= shipProp.maxVelocity)
		shipProp.linearVelocity -= shipProp.accelaration
	
	ship.position.z -= shipProp.linearVelocity;

	keyPressed.a && goLeft(ship, shipProp);
	keyPressed.d && goRight(ship, shipProp);
}


function goForward(ship, shipProp) {
	// ship.position.z += shipProp.linearVelocity;
	// if(shipProp.linearVelocity >= shipProp.maxVelocity || !shipProp.accelarating) return;
	shipProp.linearVelocity += shipProp.accelaration
 }

function goBackward(ship, shipProp) { 
    // ship.position.z += shipProp.linearVelocity;
	// if(shipProp.linearVelocity >= shipProp.maxVelocity) return;
	shipProp.linearVelocity -= shipProp.accelaration

}

function goLeft(ship, shipProp) { 
	ship.rotation.y -= 0.1;
}

function goRight(ship, shipProp) { 
	ship.rotation.y += 0.1;

}
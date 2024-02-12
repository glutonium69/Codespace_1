import { Vector3 } from "three";

export function controlShip(shipModel, ship, shipProp, keyPressed){

	const currentShipRotationY = radToDeg(shipModel.rotation.y);
	
	keyPressed.a && goLeft(shipModel, ship, shipProp, currentShipRotationY);
	keyPressed.d && goRight(shipModel, ship, shipProp, currentShipRotationY);
	keyPressed.arrowup && goDown(ship);
	keyPressed.arrowdown && goUp(ship);
	keyPressed.arrowleft && ship.rotateY(shipProp.angularVelocity * 1.5)
	keyPressed.arrowright && ship.rotateY(-shipProp.angularVelocity * 1.5)
	
	
	if(!keyPressed.a && !keyPressed.d && currentShipRotationY > -90){
		shipModel.rotation.y -= degToRad(1);
	}
	
	if(keyPressed.shift){
		provideBoost(shipProp, ship);
	}else if((keyPressed.w || keyPressed.s) && !keyPressed.shift){
		updateVelocity(keyPressed, shipProp)
	}
	
	if(!shipProp.accelarating  && shipProp.linearVelocity !== 0){
		slowDownShip(shipProp)
	}
	
	
	moveShipForward(ship, shipProp);
}

function updateVelocity(keyPressed, shipProp){

	// 10 is being added here cause sometimes the linearVel goes a little above maxVel after a boost has been provided.. this causes the if block to run and linearVel to drop by a lot causing issue.
	// adding 10 is there just to offset it by a little bit so it doesn't trigger  
	if(shipProp.linearVelocity > (shipProp.maxVelocity + 10)){
		shipProp.linearVelocity -= (shipProp.boostAccelaration * 5);
		return;
	}
	
	if(keyPressed.w && shipProp.linearVelocity <= shipProp.maxVelocity)
		shipProp.linearVelocity += shipProp.accelaration;

	if(keyPressed.s && Math.abs(shipProp.linearVelocity) <= shipProp.maxVelocity)
		shipProp.linearVelocity -= shipProp.accelaration

}

function provideBoost(shipProp, ship){
	if(shipProp.linearVelocity <= shipProp.boostVelocity){
		shipProp.linearVelocity += shipProp.boostAccelaration;
	}
	moveShipForward(ship, shipProp);
}

function moveShipForward(ship, shipProp) {
	// Get the ship's forward vector
	const forwardVector = new Vector3(0, 0, -1);
	forwardVector.applyQuaternion(ship.quaternion);
	
	// Normalize the vector to maintain direction while scaling it to a unit vector
	forwardVector.normalize();
	
	// Calculate the new position by moving the ship along its forward vector
	const newPosition = ship.position.clone().add(forwardVector.multiplyScalar(shipProp.linearVelocity));

	// Set the ship's position to the new position
	ship.position.copy(newPosition);
}

function slowDownShip(shipProp){
	// deccelerate ship when moving forward when forward button not pressed
	if(shipProp.linearVelocity > 0)
		shipProp.linearVelocity += shipProp.deccelaration;

	// deccelerate ship when moving backward when backward button not pressed
	if(shipProp.linearVelocity < 0)
		shipProp.linearVelocity -= shipProp.deccelaration;

	// when velocity really close to 0, then set velocity to 0
	// we have to make sure the range doesn't exceed the accalaration value
	// else this function won't let the ship accelarate and will set valocity to 0 always
	if(shipProp.linearVelocity < 0.1 && shipProp.linearVelocity > -0.1)
		shipProp.linearVelocity = 0; 
}

function goLeft(shipModel, ship, shipProp, currentShipRotationY) { 
	currentShipRotationY <= -45 && shipModel.rotateY(-degToRad(shipProp.turningVelocity));
	ship.rotateY(shipProp.angularVelocity)
}

function goRight(shipModel, ship, shipProp, currentShipRotationY) { 
	currentShipRotationY <= -45 && shipModel.rotateY(degToRad(shipProp.turningVelocity));
	ship.rotateY(-shipProp.angularVelocity)
}

function goUp(ship){
	ship.rotateX(
		degToRad(
			ship.rotation.x < degToRad(90) ? 1 : 1
		)
	);
}

function goDown(ship){
	ship.rotateX(
		degToRad(
			ship.rotation.x > degToRad(-90) ? -1 : -1
		)
	);
}

function radToDeg(rad) {
    return rad * 180 / Math.PI;
}

function degToRad(deg) {
    return deg * Math.PI / 180;
}
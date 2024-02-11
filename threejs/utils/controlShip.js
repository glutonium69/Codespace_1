import { Vector3 } from "three";

export function controlShip(shipModel, ship, shipProp, keyPressed){

	if(!shipProp.accelarating && shipProp.linearVelocity !== 0){
		slowDownShip(shipProp)
	}

	const currentShipRotationY = radToDeg(shipModel.rotation.y);
	// const currentShipRotationX = radToDeg(ship.rotation.x);
	
	if(currentShipRotationY <= -45){
		keyPressed.a && goLeft(shipModel, ship, shipProp);
		keyPressed.d && goRight(shipModel, ship, shipProp);
	}else{
		shipModel.rotation.y = degToRad(-45);
	}

	if(!keyPressed.a && !keyPressed.d && currentShipRotationY > -90){
		shipModel.rotation.y -= degToRad(1);
	}

	// if(!keyPressed.arrowup && !keyPressed.arrowdown && ship.rotation.x !== 0){
		// 	if(currentShipRotationX > 0) ship.rotation.x -= degToRad(0.05);
		// 	if(currentShipRotationX < 0) ship.rotation.x += degToRad(0.05);
	// 	if(currentShipRotationX > -0.3 && currentShipRotationX < 0.3) ship.rotation.x = 0;
	// }

	(keyPressed.w || keyPressed.s) && updateVelocity(keyPressed, shipProp, ship)
	// keyPressed.arrowup && goDown(ship);
	// keyPressed.arrowdown && goUp(ship);
	keyPressed.arrowleft && ship.rotateY(shipProp.angularVelocity * 1.5)
	keyPressed.arrowright && ship.rotateY(-shipProp.angularVelocity * 1.5)
}

function updateVelocity(keyPressed, shipProp, ship){
	
	if(keyPressed.w && shipProp.linearVelocity <= shipProp.maxVelocity)
	shipProp.linearVelocity += shipProp.accelaration;

	if(keyPressed.s && Math.abs(shipProp.linearVelocity) <= shipProp.maxVelocity)
	shipProp.linearVelocity -= shipProp.accelaration

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

	if( shipProp.linearVelocity < 0.1 &&	shipProp.linearVelocity > -0.1)
		shipProp.linearVelocity = 0; 
}

function goLeft(shipModel, ship, shipProp) { 
	shipModel.rotateY(-degToRad(1));
	ship.rotateY(shipProp.angularVelocity)
}

function goRight(shipModel, ship, shipProp) { 
	shipModel.rotateY(degToRad(1));
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
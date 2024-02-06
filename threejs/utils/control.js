const shipObj = {
	velocity: 0,
	accelaration: 0.2,
	maxVelocity: 3,
	rotation: {x: 0, y: 0, z: 0},
}


export function controlShip(ship, keyPressed){
	keyPressed.w && goForward(ship);
	keyPressed.s && goBackward(ship);
	keyPressed.a && goLeft(ship);
	keyPressed.d && goRight(ship);
}


function goForward(ship) {
    ship.position.z -= 20;
 }

function goBackward(ship) { }

function goLeft(ship) { }

function goRight(ship) { }
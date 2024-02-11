export const keyPressed = {
	w: false, // forward movement
	s: false, // backward movement
	a: false, // tilt and rotate left
	d: false, // tilt and rotate right
	arrowleft: false, // rotate left while hovering
	arrowright: false, // rotate right while hovering
	shift: false, // provide boost to the speed
	arrowup: false, // provide boost to the speed
	arrowdown: false
}

export const shipProp = {
	angularVelocity: 0.02, // determines how fast ship rotates horizontally
	turningVelocity: 0.5, // determines how fast ship titls
	linearVelocity: 0, // keeps track of ship's velocity
	accelaration: 0.1, // determines how fast ship accelerates
	deccelaration: -0.1, // determines how fast ship decelerates.. better to keep it at least -0.2
	maxVelocity: 5, // maximum velocity of the ship
	boostVelocity: 10, // maximum velocity upon providing boost
	accelarating: false // determines ships state that is, if user is trying to move the ship or not
}

export const planets = []
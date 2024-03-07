import { SphereGeometry, Vector3 } from "three";

export function updatePolygons(ship, planets, camera){
    for(let planet of planets){
	
	const y1 = getObjectPositionOnScreen(planet.sphere, camera); 
	const y2 = getObjectPositionOnScreen(planet.sphere.children[0], camera);

	const object2DDiameter = 2 * Math.round(Math.abs(y1 - y2));
	
	const segment = Math.min((Math.round((object2DDiameter / innerHeight) * 20)), 20);

	planet.name === "mars" && console.log(segment);

	if(segment === planet.currentSegmentCount) continue;

	planet.sphere.geometry.dispose();
	planet.sphere.geometry = new SphereGeometry(planet.radius, segment, segment);
	planet.currentSegmentCount = segment;
    }
}

function getObjectPositionOnScreen(object, camera){
	
	const vec3 = new Vector3();
	vec3.setFromMatrixPosition(object.matrixWorld);
        vec3.project(camera);
        
	const halfH = innerHeight / 2;    
        let y = -(vec3.y * halfH) + halfH;
 	y = Math.round(y);

	return y;
}

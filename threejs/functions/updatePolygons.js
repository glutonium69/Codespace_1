import { SphereGeometry, Vector3 } from "three";

export function updatePolygons(ship, planets){
    for(let planet of planets){
	
	const planetPos = new Vector3();
	planet.sphere.getWorldPosition(planetPos);
        
	const distance = planetPos.distanceTo(ship.position);
	let segment = 0;
        
	if(distance > 20000){
	    segment = 5;    
	}else if(distance > 10000){
	    segment = 10;
	}else{
	    segment = 20;
	}
	
	if(segment === planet.currentSegmentCount) continue;

	planet.sphere.geometry.dispose();
	planet.sphere.geometry = new SphereGeometry(planet.radius, segment, segment);
	planet.currentSegmentCount = segment;
    }
}

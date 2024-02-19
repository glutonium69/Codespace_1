import { Vector3 } from "three";

const text = document.querySelectorAll("span:has(.distance)");
const distances = document.querySelectorAll(".distance");

export function setBlips(planets, camera, ship, scene) {
        for(let i=0; i<planets.length; i++){
	    
	    const vec3 = new Vector3();
	    vec3.setFromMatrixPosition(planets[i].sphere.children[0].matrixWorld);
            vec3.project(camera);
            const halfW = innerWidth / 2;
            const halfH = innerHeight / 2;
            
	    const halfTextW = text[i].getBoundingClientRect().width / 2;
            const halfTextH = text[i].getBoundingClientRect().height / 2;

            let x = (vec3.x * halfW) + halfW;
            let y = -(vec3.y * halfH) + halfH;
	    
	    x = Math.round(x);
 	    y = Math.round(y);
		
	    // position the element
            text[i].style.left = x + "px";
            text[i].style.top = (y - 30) + "px";
	    
	    const planetPos = planets[i].sphere.getWorldPosition(new Vector3());
	    const distance = planetPos.distanceTo(ship.position);
	    distances[i].textContent = Math.round(distance);
	}
};

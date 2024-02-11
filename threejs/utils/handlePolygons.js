import { SphereGeometry } from "three";

function handlePolygon(planets, ship){
    for(let planet in planets){

        const distance = planet.position.distanceTo(ship);

        const lowDetailThreshold = 50;
        const highDetailThreshold = 200;

        let segments = 32;

        if (distance > lowDetailThreshold && distance <= highDetailThreshold) {
            segments = 16;
        } else if (distance > highDetailThreshold) {
            segments = 8;
        }

        const geometry = new SphereGeometry(radius, segments, segments);
        sphere.geometry.dispose();
        sphere.geometry = geometry;

    }
}
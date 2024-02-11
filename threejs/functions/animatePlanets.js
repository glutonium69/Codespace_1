export function animatePlanets(planets){
    for(let planet of planets){
        planet.sphere.rotateY(planet.axisRotation * Math.PI / 180);
        planet.parent?.rotateY(planet.orbitRotation * Math.PI / 180);
    }
}
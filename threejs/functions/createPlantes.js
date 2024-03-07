import {
    SphereGeometry,
    TextureLoader,
    MeshBasicMaterial,
    Mesh,
    RingGeometry,
    DoubleSide,
    Object3D
} from "three";



export function createPlanets(scene, planets, pCamera){
    
    const textureLoader = new TextureLoader();
    const texturePath = "../assets/textures/";
    const earthRadius = 50;
    const rotationMultiplier = 0.05;
    const distanceFromSunMultiplier = 4;

    const planetProps = [
        {
            // Mercury
	    name: "mercury", 
	    texture: "mercury.jpg",
            distanceFromSun: 1500 * distanceFromSunMultiplier,
            radius: earthRadius * 0.382,
            orbitRotation: (360 / 88) * rotationMultiplier,
            axisRotation: (360 / 1407) * rotationMultiplier,
            lightColor: 0xffffff
        },
        {
            // Venus
	    name: "venus", 
            texture: "venus.jpg",
            distanceFromSun: 2000 * distanceFromSunMultiplier,
            radius: earthRadius,
            orbitRotation: (360 / 225) * rotationMultiplier,
            axisRotation: (360 / 5832) * rotationMultiplier,
            lightColor: 0xffffff
        },
        {
            // Earth
	    name: "earth", 
            texture: "earth.jpg",
            distanceFromSun: 3000 * distanceFromSunMultiplier,
            radius: earthRadius,
            orbitRotation: (360 / 365) * rotationMultiplier,
            axisRotation: (360 / 24) * rotationMultiplier,
            lightColor: 0x0000ff
        },
        {
            // Mars
	    name: "mars", 
            texture: "mars.jpg",
            distanceFromSun: 5500 * distanceFromSunMultiplier,
            radius: earthRadius * 0.532,
            orbitRotation: (360 / 687) * rotationMultiplier,
            axisRotation: (360 / 25) * rotationMultiplier,
            lightColor: 0xff0000
        },
        {
            // Jupiter
	    name: "jupiter", 
            texture: "jupiter.jpg",
            distanceFromSun: 8000 * distanceFromSunMultiplier,
            radius: earthRadius * 11.21,
            orbitRotation: (360 / (12 * 365)) * rotationMultiplier, 
            axisRotation: (360 / 10) * rotationMultiplier, 
            lightColor: 0xffaa00
        },
        {
            // Saturn
	    name: "saturn", 
            texture: "saturn.jpg",
            ringTexture: "saturnRing.jpg",
            distanceFromSun: 10000 * distanceFromSunMultiplier,
            radius: earthRadius * 9.45,
            orbitRotation: (360 / (30 * 365)) * rotationMultiplier,
            axisRotation: (360 / 11) * rotationMultiplier, 
            lightColor: 0xffff00
        },
        {
            // Uranus
	    name: "uranus", 
            texture: "uranus.jpg",
            distanceFromSun: 12000 * distanceFromSunMultiplier,
            radius: earthRadius * 4.01,
            orbitRotation: (360 / (84 * 365)) * rotationMultiplier,
            axisRotation: (360 / 17) * rotationMultiplier, 
            lightColor: 0x00ffff
        },
        {
            // Neptune
	    name: "neptune", 
            texture: "neptune.jpg",
            distanceFromSun: 14000 * distanceFromSunMultiplier,
            radius: earthRadius * 3.88,
            orbitRotation: (360 / (165 * 365)) * rotationMultiplier,
            axisRotation: (360 / 16) * rotationMultiplier, 
            lightColor: 0x0000ff
        }
    ];
    

    const sunG = new SphereGeometry(earthRadius * 50);
    const sunM = new MeshBasicMaterial({
        map: textureLoader.load(texturePath + "sun.jpg"),
        side: DoubleSide
    });
    const sun = new Mesh(sunG, sunM);
    
    const sunBlip = new Object3D();
    sun.add(sunBlip);
    sunBlip.position.y += (earthRadius * 50); 
    sunBlip.name = "blip";
    sun.add(sunBlip);
    scene.add(sun);

    planets.push({
	name: "sun",
        sphere: sun,
	radius: earthRadius * 50,
        parent: null,
        axisRotation: (360 / (26 * 24)) * rotationMultiplier,
        orbitRotation: null,
	currentSegmentCount: 16
    });

    for(let prop of planetProps){

        const sphereG = new SphereGeometry(prop.radius);
        const sphereM = new MeshBasicMaterial({
            map: textureLoader.load(texturePath + (prop.texture)),
            side: DoubleSide
        });
        const sphere = new Mesh(sphereG, sphereM);
        
	const parent = new Object3D();
        parent.position.copy(sun.position);
        parent.add(sphere);
        scene.add(parent);
	
	const blip = new Object3D();
	sphere.add(blip);
	blip.position.y += prop.radius;
	
	if(prop.name === "earth"){
	    const moonRadius = prop.radius * 0.3;
	    const moonG = new SphereGeometry(moonRadius);
	    const moonM = new MeshBasicMaterial({
                map: textureLoader.load(texturePath + "moon.jpg"),
		side: DoubleSide
	    })

	    const moon = new Mesh(moonG, moonM);
	    sphere.add(moon);
	    moon.position.x += (prop.radius + moonRadius + 100);
	}


        const theta = Math.random() * 360 * Math.PI / 180; 
        sphere.position.x = prop.distanceFromSun * Math.cos(theta) ;
        sphere.position.z = prop.distanceFromSun * Math.sin(theta) ;

        if(prop.texture === "saturn.jpg"){

            const ringG = new RingGeometry(prop.radius * 1.5, prop.radius * 2.5);
            const ringM = new MeshBasicMaterial({
                side: DoubleSide,
                map: textureLoader.load(texturePath + prop.ringTexture)
            });
            const ring = new Mesh(ringG, ringM);
            ring.rotateX(0.5);

            parent.add(ring)
            ring.position.copy(sphere.position);
        }

        planets.push({
	    name: prop.name,
            sphere: sphere,
	    radius: prop.radius,
            parent: parent,
            axisRotation: prop.axisRotation,
            orbitRotation: prop.orbitRotation,
	    currentSegmentCount: 16
        });
    }

    pCamera.far = planetProps.at(-1).distanceFromSun * 2;
    pCamera.updateProjectionMatrix();
}

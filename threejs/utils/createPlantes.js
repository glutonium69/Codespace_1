import {
    SphereGeometry,
    TextureLoader,
    MeshBasicMaterial,
    Mesh,
    PointLight,
    RingGeometry,
    DoubleSide,
    Object3D
} from "three";



export function createPlanets(scene, planets, camera){
    
    const textureLoader = new TextureLoader();
    const texturePath = "../assets/textures/";
    const earthRadius = 30;
    const rotationAmplifier = 0.0;
    const distanceFromSunAmplifier = 2;
    const earthOrbitRotation = 0.1; // Increase the orbit rotation speed for better visualization
    const earthAxisRotation = 0.05; // Keep the axis rotation speed the same as before
    
    const planetProps = [
        {
            // Mercury
            texture: "mercury.jpg",
            distanceFromSun: 1500 * distanceFromSunAmplifier,
            radius: earthRadius * 0.382,
            orbitRotation: (360 / 88) * rotationAmplifier,
            axisRotation: (360 / 1407) * rotationAmplifier,
            lightColor: 0xffffff
        },
        {
            // Venus
            texture: "venus.jpg",
            distanceFromSun: 2000 * distanceFromSunAmplifier,
            radius: earthRadius,
            orbitRotation: earthOrbitRotation * rotationAmplifier,
            axisRotation: earthAxisRotation * rotationAmplifier,
            lightColor: 0xffffff
        },
        {
            // Earth
            texture: "earth.jpg",
            distanceFromSun: 3000 * distanceFromSunAmplifier,
            radius: earthRadius,
            orbitRotation: (360 / 365) * rotationAmplifier,
            axisRotation: (360 / 24) * rotationAmplifier,
            lightColor: 0x0000ff
        },
        {
            // Mars
            texture: "mars.jpg",
            distanceFromSun: 5500 * distanceFromSunAmplifier,
            radius: earthRadius * 0.532,
            orbitRotation: (360 / 687) * rotationAmplifier,
            axisRotation: (360 / 25) * rotationAmplifier,
            lightColor: 0xff0000
        },
        {
            // Jupiter
            texture: "jupiter.jpg",
            distanceFromSun: 8000 * distanceFromSunAmplifier,
            radius: earthRadius * 11.21,
            orbitRotation: (360 / (12 * 365)) * rotationAmplifier, 
            axisRotation: (360 / 10) * rotationAmplifier, 
            lightColor: 0xffaa00
        },
        {
            // Saturn
            texture: "saturn.jpg",
            ringTexture: "saturnRing.jpg",
            distanceFromSun: 10000 * distanceFromSunAmplifier,
            radius: earthRadius * 9.45,
            orbitRotation: (360 / (30 * 365)) * rotationAmplifier,
            axisRotation: (360 / 11) * rotationAmplifier, 
            lightColor: 0xffff00
        },
        {
            // Uranus
            texture: "uranus.jpg",
            distanceFromSun: 12000 * distanceFromSunAmplifier,
            radius: earthRadius * 4.01,
            orbitRotation: (360 / (84 * 365)) * rotationAmplifier,
            axisRotation: (360 / 17) * rotationAmplifier, 
            lightColor: 0x00ffff
        },
        {
            // Neptune
            texture: "neptune.jpg",
            distanceFromSun: 14000 * distanceFromSunAmplifier,
            radius: earthRadius * 3.88,
            orbitRotation: (360 / (165 * 365)) * rotationAmplifier,
            axisRotation: (360 / 16) * rotationAmplifier, 
            lightColor: 0x0000ff
        }
    ];
    

    const sunG = new SphereGeometry(earthRadius * 50);
    const sunM = new MeshBasicMaterial({
        map: textureLoader.load(texturePath + "sun.jpg")
    });
    const sun = new Mesh(sunG, sunM);
    sun.position.set(0, 0, 0);

    const pointLight = new PointLight(0xffff00 ,500, 5000);
    pointLight.position.copy(sun.position);

    scene.add(sun, pointLight);
    planets.push({
        sphere: sun,
        parent: null,
        axisRotation: (360 / (26 * 24)) * rotationAmplifier,
        orbitRotation: null
    });

    for(let prop of planetProps){

        const sphereG = new SphereGeometry(prop.radius);
        const sphereM = new MeshBasicMaterial({
            map: textureLoader.load(texturePath + (prop.texture))
        });
        const sphere = new Mesh(sphereG, sphereM);

        const parent = new Object3D();
        parent.position.copy(sun.position);
        parent.add(sphere);
        scene.add(parent);

        sphere.position.x = prop.distanceFromSun * Math.cos(Math.random() * 360 * Math.PI / 180) ;
        sphere.position.z = prop.distanceFromSun * Math.sin(Math.random() * 360 * Math.PI / 180) ;

        if(prop.texture === "saturn.jpg"){

            const ringG = new RingGeometry(prop.radius * 1.5, prop.radius * 2.5);
            const ringM = new MeshBasicMaterial({
                side: DoubleSide,
                map: textureLoader.load(texturePath + prop.ringTexture)
            });
            const ring = new Mesh(ringG, ringM);
            ring.rotateX(0.4660029);

            parent.add(ring)
            ring.position.copy(sphere.position);
        }

        planets.push({
            sphere: sphere,
            parent: parent,
            axisRotation: prop.axisRotation,
            orbitRotation: prop.orbitRotation
        });
    }

    camera.far = planetProps.at(-1).distanceFromSun * 2;
    camera.updateProjectionMatrix();
}
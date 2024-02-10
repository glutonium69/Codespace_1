import { SphereGeometry, TextureLoader, MeshBasicMaterial, Mesh, PointLight, RingGeometry, DoubleSide } from "three";
const textureLoader = new TextureLoader();



export function createBoxs(scene){
    
    const texturePath = "../assets/textures/";
    const earthRadius = 50;
    const planetProps = [
        {
            texture: "mercury.jpg",
            distanceFromSun: 2500, // Mercury's distance from the Sun
            radius: earthRadius * 0.382, // Mercury's radius relative to Earth's radius
            lightColor: 0xffffff // White light emitted by Mercury (no significant atmosphere)
        },
        {
            texture: "venus.jpg",
            distanceFromSun: 4000, // Venus's distance from the Sun
            radius: earthRadius * 0.949, // Venus's radius relative to Earth's radius
            lightColor: 0xffffff // White light emitted by Venus (dense atmosphere)
        },
        {
            texture: "earth.jpg",
            distanceFromSun: 4000, // Earth's distance from the Sun
            radius: earthRadius, // Earth's radius
            lightColor: 0x0000ff // Blue light emitted by Earth's oceans and atmosphere
        },
        {
            texture: "mars.jpg",
            distanceFromSun: 6500, // Mars's distance from the Sun
            radius: earthRadius * 0.532, // Mars's radius relative to Earth's radius
            lightColor: 0xff0000 // Reddish light emitted by Mars (iron oxide-rich soil)
        },
        {
            texture: "jupiter.jpg",
            distanceFromSun: 9000, // Jupiter's distance from the Sun
            radius: earthRadius * 11.21, // Jupiter's radius relative to Earth's radius
            lightColor: 0xffaa00 // Orange light emitted by Jupiter's clouds and atmosphere
        },
        {
            texture: "saturn.jpg",
            ringTexture: "saturnRing.jpg",
            distanceFromSun: 11000, // Saturn's distance from the Sun
            radius: earthRadius * 9.45, // Saturn's radius relative to Earth's radius
            lightColor: 0xffff00 // Yellow light emitted by Saturn's clouds
        },
        {
            texture: "uranus.jpg",
            distanceFromSun: 13000, // Uranus's distance from the Sun
            radius: earthRadius * 4.01, // Uranus's radius relative to Earth's radius
            lightColor: 0x00ffff // Bluish-green light emitted by Uranus's atmosphere
        },
        {
            texture: "neptune.jpg",
            distanceFromSun: 15000, // Neptune's distance from the Sun
            radius: earthRadius * 3.88, // Neptune's radius relative to Earth's radius
            lightColor: 0x0000ff // Blue light emitted by Neptune's atmosphere and methane clouds
        }
    ];
        
    const sunG = new SphereGeometry(earthRadius * 20);
    const sunM = new MeshBasicMaterial({
        map: textureLoader.load(texturePath + "sun.jpg")
    });
    const sun = new Mesh(sunG, sunM);
    sun.position.set(0, 0, -5000);

    const pointLight = new PointLight(0xffff00 ,500, 5000);
    pointLight.position.copy(sun.position);

    scene.add(sun, pointLight);


    for(let prop of planetProps){
        
        const sphereG = new SphereGeometry(prop.radius);
        const sphereM = new MeshBasicMaterial({
            map: textureLoader.load(texturePath + (prop.texture))
        });
        const sphere = new Mesh(sphereG, sphereM);
        sun.add(sphere);
        sphere.position.x = prop.distanceFromSun;

        if(prop.texture === "saturn.jpg"){

            const ringG = new RingGeometry(prop.radius * 1.5, prop.radius * 2.5);
            const ringM = new MeshBasicMaterial({
                side: DoubleSide,
                map: textureLoader.load(texturePath + prop.ringTexture)
            });
            const ring = new Mesh(ringG, ringM);
            ring.rotateX(0.4660029);
        
            sphere.add(ring)
        }
    }        
}
import { Mesh, MeshBasicMaterial, OrthographicCamera, PlaneGeometry, SphereGeometry, TextureLoader } from "three";
import minimapTexture from "../assets/textures/minimap.png";

export function setMinimap(scene,planets, enabled = true){

    if(!enabled) return { oCamera: null, minimapObj: null };

    const minimapObj = {
        width: 210,
        height: 210,
        posX: innerWidth - 210 - 10,
        posY: innerHeight - 210 - 10
    }

    const oCamera = new OrthographicCamera(
        -28000,
         28000,
         28000,
        -28000,
        -5000,
         10000
    );
    // oCamera.lookAt(new Vector3(0, -3, -40));
    oCamera.position.y = 2000;
    oCamera.lookAt(0, 0, 0);
    oCamera.layers.disable(0);
    oCamera.layers.enable(1);

    const planeG = new PlaneGeometry(56000, 56000);
    const planeM = new MeshBasicMaterial({ map: (new TextureLoader()).load(minimapTexture) });
    const plane = new Mesh(planeG, planeM);
    plane.rotation.x = -Math.PI / 2;
    plane.layers.set(1);

    scene.add(oCamera, plane);


    for(let planet of planets){
        const blipG = new SphereGeometry(700, 4, 4);
        const blipColor = planet.parent ? 0x42d7f5 : 0xf5cb42;
        const blipM = new MeshBasicMaterial({color: blipColor});
        const blip = new Mesh(blipG, blipM);
        blip.layers.set(1);
        planet.sphere.add(blip);
    }

    return { oCamera, minimapObj };
}


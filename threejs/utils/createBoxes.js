import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";

export function createBoxs(scene){
    for(let i=1; i<=30; i++){
        const boxG = new BoxGeometry(10, 10, 10);
        const boxM = new MeshBasicMaterial({ color: 0x0000ff });
        const box = new Mesh(boxG, boxM);
        box.position.set(50, 0, 50 * -i * 5);
        scene.add(box);
    }
    
    
    for(let i=1; i<=30; i++){
        const boxG = new BoxGeometry(10, 10, 10);
        const boxM = new MeshBasicMaterial({ color: 0x0000ff });
        const box = new Mesh(boxG, boxM);
        box.position.set(-50, 0, 50 * -i * 5);
        scene.add(box);
    }
}
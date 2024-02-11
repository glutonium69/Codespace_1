export function invokeEventListeners(scene, keyPressed, shipProp, camera, renderer){

    window.addEventListener("keydown", event => {

        if(!scene.getObjectByName("ship")) return;
    
        keyPressed[event.key.toLowerCase()] = true;
    
        if("ws".includes(event.key.toLowerCase()))
            shipProp.accelarating = true;
    });
    
    window.addEventListener("keyup", event => {
        
        if(!scene.getObjectByName("ship")) return;
        
        keyPressed[event.key.toLowerCase()] = false;
    
        if("ws".includes(event.key.toLowerCase()))
            shipProp.accelarating = false;
    });
    

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    });
}
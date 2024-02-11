import WebGL from 'three/addons/capabilities/WebGL.js';

export function checkWBGL(){
	if ( WebGL.isWebGLAvailable() ) {
		return true;
	} else {
		const warning = WebGL.getWebGLErrorMessage();
		document.getElementById('container').appendChild(warning);
        return false;
	}	
}

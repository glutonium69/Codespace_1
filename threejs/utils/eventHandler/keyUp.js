export function handleKeyup(key, keyPressed){
    switch (key) {
        case "w":
            keyPressed.w = false;
            break;

        case "s":
            keyPressed.s = false;
            break;

        case "shift":
            keyPressed.shift = false;
            break;

        case "arrowup":
            keyPressed.arrowup = false;
            break;

        case "arrowdown":
            keyPressed.arrowdown = false;
            break;
    }

    switch (key) {
        case "a":
            keyPressed.a = false;
            break;

        case "d":
            keyPressed.d = false;
            break;

        case "arrowleft":
            keyPressed.arrowleft = false;
            break;

        case "arrowright":
            keyPressed.arrowright = false;
            break;
    }
}

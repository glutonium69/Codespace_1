export function handleKeydown(key, keyPressed){
    switch (key) {
        case "w":
            keyPressed.w = true;
            break;

        case "s":
            keyPressed.s = true;
            break;

        case "shift":
            keyPressed.shift = true;
            break;

        case "arrowup":
            keyPressed.arrowup = true;
            break;

        case "arrowdown":
            keyPressed.arrowdown = true;
            break;
    }

    switch (key) {
        case "a":
            keyPressed.a = true;
            break;

        case "d":
            keyPressed.d = true;
            break;

        case "arrowleft":
            keyPressed.arrowleft = true;
            break;

        case "arrowright":
            keyPressed.arrowright = true;
            break;
    }
}
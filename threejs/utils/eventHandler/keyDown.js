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
    }

    switch (key) {
        case "a":
            keyPressed.a = true;
            break;

        case "d":
            keyPressed.d = true;
            break;

        case "q":
            keyPressed.q = true;
            break;

        case "e":
            keyPressed.e = true;
            break;
    }
}
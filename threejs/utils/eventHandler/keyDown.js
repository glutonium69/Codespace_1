export function handleKeydown(key, keyPressed){
    switch (key) {
        case "w":
            keyPressed.w = true;
            break;

        case "s":
            keyPressed.s = true;
            break;
    }

    switch (key) {
        case "a":
            keyPressed.a = true;
            break;

        case "d":
            keyPressed.d = true;
            break;
    }
}
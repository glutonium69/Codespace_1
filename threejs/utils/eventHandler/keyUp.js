export function handleKeyup(key, keyPressed){
    switch (key) {
        case "w":
            keyPressed.w = false;
            break;

        case "s":
            keyPressed.s = false;
            break;
    }

    switch (key) {
        case "a":
            keyPressed.a = false;
            break;

        case "d":
            keyPressed.d = false;
            break;
    }
}

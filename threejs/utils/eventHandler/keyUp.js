export function handleKeyup(event, keyPressed){
    switch (event.key) {
        case "w":
            keyPressed.w = false;
            break;

        case "s":
            keyPressed.s = false;
            break;
    }

    switch (event.key) {
        case "a":
            keyPressed.a = false;
            break;

        case "d":
            keyPressed.d = false;
            break;
    }
}

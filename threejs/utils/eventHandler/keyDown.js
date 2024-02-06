export function handleKeydown(event, keyPressed){
    switch (event.key) {
        case "w":
            keyPressed.w = true;
            break;

        case "s":
            keyPressed.s = true;
            break;
    }

    switch (event.key) {
        case "a":
            keyPressed.a = true;
            break;

        case "d":
            keyPressed.d = true;
            break;
    }
}
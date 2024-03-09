export class drawContents {
    constructor(onloadJson) {
        this.onloadJson = onloadJson;
    }

    draw() {
        const mainContents = document.getElementById("mainContents");

        // Clear existing content
        mainContents.innerHTML = '';
    }
}

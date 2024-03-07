class drawContents {
    constructor(onloadJson) {
        this.onloadJson = onloadJson;
    }

    draw() {
        const mainContents = document.getElementById("mainContents"); // Select mainContents element once

        // Clear existing content
        mainContents.innerHTML = '';

        for (let i = 0; i < this.onloadJson.length; i++) {
            const loadedTable = this.onloadJson[i];
            const keys = Object.keys(loadedTable);
    
            keys.forEach(key => {
                const data = loadedTable[key];
                const dataKeys = Object.keys(data);

                dataKeys.forEach(dataKey => {
                    const contentEach = data[dataKey];

                    // Create a new element for this piece of data
                    const newElement = document.createElement('div');
                    newElement.innerHTML = contentEach;
                    newElement.id = dataKey;

                    // Append the new element to mainContents
                    mainContents.appendChild(newElement);
                });
            });
        }
    }    
}

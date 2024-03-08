class drawContents {
    constructor(onloadJson) {
        this.onloadJson = onloadJson;
    }

    draw() {
        const mainContents = document.getElementById("mainContents");

        // Clear existing content
        mainContents.innerHTML = '';

        for (let i = 0; i < this.onloadJson.length; i++) {
            const loadedTable = this.onloadJson[i];
            const keys = Object.keys(loadedTable);

            keys.forEach(key => {
                const data = loadedTable[key];
                const dataKeys = Object.keys(data);

                console.log(key);

                const newParentElement = document.createElement('div');
                newParentElement.className = key;

                // Append the new parent element to mainContents
                mainContents.appendChild(newParentElement);

                dataKeys.forEach(dataKey => {
                    const contentEach = data[dataKey];

                    // Create a new element for this piece of data
                    const newChildElement = document.createElement('span');
                    newChildElement.innerHTML = contentEach;
                    newChildElement.className = dataKey;

                    // Append the new child element to the new parent element
                    newParentElement.appendChild(newChildElement);
                });
            });
        }
    }    
}

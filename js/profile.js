export class drawContents {
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
                
                    // Use a regular expression to remove digits from the end of the dataKey
                    const className = dataKey.replace(/\d+$/, '');
                
                    // Create a new element for this piece of data
                    const newChildElement = document.createElement('span');
                    newChildElement.innerHTML = contentEach;
                    // Set the class name to the modified dataKey without digits
                    newChildElement.className = className;
                
                    // Append the new child element to the new parent element
                    newParentElement.appendChild(newChildElement);
                });                
            });
        }
    }
}

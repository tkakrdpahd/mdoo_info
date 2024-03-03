function readAndWrite() {
    const pageId = localStorage.getItem("page");

    fetch("../json/" + pageId + ".json")
        .then(response => response.json())
        .then(json => {
            const language = localStorage.getItem("language");
            const contents = json[language];
            const contentsLength = contents.length;

            for (let i = 0; i < contentsLength; i++) {
                const currentContentKeys = Object.keys(contents[i]);

                for (let j = 0; j < currentContentKeys.length; j++) {
                    const key = currentContentKeys[j];
                    const value = contents[i][key];
                    console.log(`${key}: ${value}`); // 키와 값 모두 출력

                    document.createElement("div");
                    
                }
            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

loadScript(readAndWrite());
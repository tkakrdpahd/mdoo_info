document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    const header = new HeaderSetting();
    header.initSetting(); // 
    header.settingLanguage(); // listen language setting onload

    const contents = new ContentsDataSetting(header);
    header.setContentsSetting(contents);
    contents.loadJsonData();
}
// Class HeaderStting control the visibility of header and list.
class HeaderSetting {
    constructor() {
        this.ids = ['index', 'profile', 'ArtDescriptions', 'DevDescriptions', 'contact'];
        this.visibility = true;
        this.currentPage = "index";
        this.currentLanguage = "en";
        this.contentsSetting = null; // ContentsSetting 참조를 위한 속성 추가
    }

    setContentsSetting(contentsSetting) {
        this.contentsSetting = contentsSetting; // ContentsSetting 인스턴스를 설정하는 메소드
    }

    initSetting() {
        this.ids.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', (event) => {
                    event.preventDefault(); 
                    this.currentPage = id;

                    // Setting li visibility
                    this.setLiTag(); 
                    
                    if (this.contentsSetting) {
                        this.contentsSetting.loadJsonData();
                    }
                });
            }
        });
    
        this.setVisibility(); // Does header is visible?
    }    

    setVisibility() {
        const headerElement = document.querySelector('header');
        const toggleElement = document.getElementById("headerDisplay");
        if (toggleElement) {
            toggleElement.addEventListener('click', (event) => {
                this.visibility = !this.visibility;
                headerElement.style.visibility = this.visibility ? 'visible' : 'hidden';
            });
        }
    }

    setLiTag() {
        // 모든 li 요소를 찾아 display 속성을 none으로 설정
        const allLi = document.querySelectorAll('li');
        allLi.forEach(li => {
            li.style.display = 'none';
        });
        // this.currentPage ID를 가진 요소 하위의 li 요소들만 찾아 display 속성을 block으로 설정
        const currentPageLi = document.querySelectorAll('#' + this.currentPage + ' li');
        currentPageLi.forEach(li => {
            li.style.display = 'block';
        });
    }        

    settingLanguage() {
        // Language setting logic here (Placeholder for future implementation)
        const korean = document.getElementById("korean");
        const english = document.getElementById("english");

        korean.addEventListener('click', (event) => {
            this.currentLanguage = "ko";
            this.contentsSetting.loadJsonData();
        })

        english.addEventListener('click', (event) => {
            this.currentLanguage = "en";
            this.contentsSetting.loadJsonData();
        })
    }
}
// Class ContentsDataSetting manages loading and applying JSON, JavaScript, and CSS resources based on header settings.
class ContentsDataSetting {
    constructor(headerSetting) {
        this.headerSetting = headerSetting;
        this.contents = null; // Initialize contents as null
    }

    // Loads JSON data based on the current page and language, then triggers JavaScript loading.
    async loadJsonData() {
        const contentsUrl = `/json/${this.headerSetting.currentPage}.json`;
        try {
            const response = await fetch(contentsUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            this.contents = json[this.headerSetting.currentLanguage];
            this.loadJavaScript(); // Proceed to load JavaScript after JSON is loaded
        } catch (error) {
            console.error('Error loading JSON:', error);
        }
    }

    // Loads JavaScript dynamically and ensures the necessary class is available before proceeding.
    async loadJavaScript() {
        const scriptUrl = `/js/${this.headerSetting.currentPage}.js`;

        // Remove any script not related to the current script or the main script file
        this.cleanupScripts(scriptUrl);

        try {
            const pageModule = await import(scriptUrl); // Dynamically import the current page's script

            // After importing, check if drawContents is defined
            if (pageModule && pageModule.drawContents) {
                const drawContentsInstance = new pageModule.drawContents(this.contents);
                drawContentsInstance.draw();
            } else {
                console.error('drawContents class is not defined after module import.');
            }
        } catch (error) {
            console.error('Error loading JavaScript module:', error);
        }

        this.loadCSS(); // Proceed to load CSS after JavaScript
    }

    // Removes all scripts except the current script and the main script file
    cleanupScripts(keepScriptUrl) {
        document.querySelectorAll('script').forEach(script => {
            if (script.src && script.src !== keepScriptUrl && !script.src.includes('scripts.js')) {
                script.remove();
                console.log(`${script.src} has been removed.`);
            }
        });
    }

    // Loads the CSS file corresponding to the current page, replacing any previously loaded CSS.
    loadCSS() {
        const cssUrl = `/css/${this.headerSetting.currentPage}.css`;
        this.cleanupCSS(); // Remove all non-main CSS files

        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = cssUrl;
        document.head.appendChild(linkElement);
        console.log(`${cssUrl} has been successfully loaded.`);
    }

    // Removes all non-main CSS links from the document
    cleanupCSS() {
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (link.href && !link.href.endsWith('style.css')) {
                link.remove();
                console.log(`${link.href} has been removed.`);
            }
        });
    }
}

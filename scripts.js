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
// Class ContentsDataSetting is pooling the json and js file
class ContentsDataSetting {
    constructor(headerSetting) {
        this.headerSetting = headerSetting;
        this.contents
    }

    async loadJsonData() {
        const contentsUrl = `/json/${this.headerSetting.currentPage}.json`;
        try {
            const response = await fetch(contentsUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            const language = this.headerSetting.currentLanguage;
            this.contents = json[language];
    
            // 모듈 경로를 생성하고, 해당 모듈을 동적으로 불러옴
            const modulePath = `/js/${this.headerSetting.currentPage}.js`;
            const pageModule = await import(modulePath);
            
            // 동적으로 불러온 모듈에서 drawContents 클래스의 인스턴스를 생성
            const drawContentsClassName = Object.keys(pageModule)[0]; // 모듈에서 첫 번째로 내보낸 클래스 이름을 가져옴
            const DrawContentsClass = pageModule[drawContentsClassName];
            if (DrawContentsClass) {
                const drawContentsInstance = new DrawContentsClass(this.contents);
                drawContentsInstance.draw();
            }
        } catch (error) {
            console.error('Error:', error);
        }
        this.loadJavaScript();
    }    

    loadJavaScript() {
        const scriptUrl = `/js/${this.headerSetting.currentPage}.js`;
        const existingScripts = document.querySelectorAll('script');
        
        // 현재 로딩하려는 스크립트와 scripts.js를 제외한 모든 스크립트 삭제
        existingScripts.forEach(script => {
            if (script.src && script.src !== scriptUrl && !script.src.includes('scripts.js')) {
                script.parentNode.removeChild(script);
                console.log(`${script.src} has been removed.`);
            }
        });
    
        // 이미 로드된 스크립트인지 확인
        for (let script of existingScripts) {
            if (script.getAttribute('src') === scriptUrl) {
                console.log(`${scriptUrl} is already loaded.`);
                this.loadDrawContents();
                return;
            }
        }
    
        // 새 스크립트 요소 생성 및 설정
        const scriptElement = document.createElement('script');
        scriptElement.src = scriptUrl;
        scriptElement.onload = () => {
            console.log(`${scriptUrl} has been successfully loaded.`);
            this.loadDrawContents();
        };
        
        document.body.appendChild(scriptElement); // 스크립트 요소를 문서의 <body>에 추가

        this.loadCSS();
    }    
    
    loadCSS() {
        const cssUrl = `/css/${this.headerSetting.currentPage}.css`;
        const existingLinks = document.querySelectorAll('link[rel="stylesheet"]');
    
        // 이미 로드된 CSS 파일인지 확인
        for (let link of existingLinks) {
            if (link.href && link.href.endsWith(cssUrl)) {
                console.log(`${cssUrl} is already loaded.`);
                return; // 이미 로드된 경우, 함수 종료
            }
        }
    
        // 현재 로딩하려는 CSS와 style.css를 제외한 모든 CSS 삭제
        existingLinks.forEach(link => {
            if (link.href && !link.href.endsWith('style.css')) {
                link.parentNode.removeChild(link);
                console.log(`${link.href} has been removed.`);
            }
        });
    
        // 새로운 <link> 요소 생성 및 설정
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = cssUrl;
    
        // <link> 요소를 문서의 <head>에 추가
        document.head.appendChild(linkElement);
        console.log(`${cssUrl} has been successfully loaded.`);

        this.oadDrawContents();
    }        

    loadDrawContents() {
        // drawContents 클래스의 존재 여부를 확인
        if (typeof drawContents !== 'undefined') {
            const drawContentsInstance = new drawContents(this.contents); // Call calss drawContents
            drawContentsInstance.draw();
        } else {
            console.error('drawContents class is not defined yet.');
        }
    }    
}

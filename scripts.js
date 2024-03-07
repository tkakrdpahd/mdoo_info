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
        this.currentLanguage = "ko";
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
        console.log(currentPageLi);
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
    }

    loadJsonData() {
        const contentsUrl = `/json/${this.headerSetting.currentPage}.json`;
        fetch(contentsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                const language = this.headerSetting.currentLanguage;
                const contents = json[language];

                console.log(contents);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    this.loadJavaScript();
    }

    loadJavaScript() {
        const scriptUrl = `/js/${this.headerSetting.currentPage}.js`;

        // 문서에 있는 모든 스크립트 태그를 가져옴
        const existingScripts = document.querySelectorAll('script');

        // 이미 로드된 스크립트인지 확인하기 위해 순회
        for (let script of existingScripts) {
            if (script.getAttribute('src') === scriptUrl) {
                console.log(`${scriptUrl} is already loaded.`);
                return; // 스크립트가 이미 로드되어 있다면 추가 로드 방지
            }
        }

        // 새 스크립트 요소 생성 및 설정
        const scriptElement = document.createElement('script');
        scriptElement.src = scriptUrl;
        scriptElement.onload = () => {
            console.log(`${scriptUrl} has been successfully loaded.`);
        };

        // 스크립트 요소를 문서의 <body> 태그에 추가
        document.body.appendChild(scriptElement);
    }    
}

document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    const header = new HeaderSetting();
    header.initSetting();
    const contents = new ContentsSetting(header);
    header.setContentsSetting(contents);
    contents.readAndWrite();
}

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

                    this.setLiTag(); 
                    
                    if (this.contentsSetting) {
                        this.contentsSetting.readAndWrite(); // ContentsSetting의 readAndWrite 메소드 호출
                    }
                });
            }
        });
    
        this.setVisibility();
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
    }
}

class ContentsSetting {
    constructor(headerSetting) {
        this.headerSetting = headerSetting;
    }

    readAndWrite() {
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
            })
            .catch(error => {
                console.error('Error:', error);
            });
    this.loadJavaScript();
    }

    loadJavaScript() {
        const scriptUrl = `/js/${this.headerSetting.currentPage}.js`;
    
        // 스크립트 요소 생성
        const scriptElement = document.createElement('script');
        scriptElement.src = scriptUrl;
    
        // 스크립트 요소가 로드되었을 때 실행될 콜백 함수 설정 (선택 사항)
        scriptElement.onload = () => {
            console.log(`${scriptUrl} has been successfully loaded.`);
        };
    
        // 스크립트 요소를 문서의 <body> 태그에 추가
        document.body.appendChild(scriptElement);
    }    
}

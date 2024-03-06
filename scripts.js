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
                    console.log(this.currentPage); 
                    
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
        // Li tag setting logic here (Placeholder for future implementation)
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

                console.log(contents);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

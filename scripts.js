document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    let newHeader = new Header();
    newHeader.navigationRedirect();
}

class Header {
    constructor() {
        this.language = 'ko';
        this.ids = ['index', 'curriculumVitae', 'linkedIn', 'enBlog', 'krBlog', 'artStation', 'gitHub', 'itchIo'];
        this.pageMap = {
            'index': 'https://www.mdoo.info',
            'curriculumVitae': 'https://ftp.mdoo.info/Documents/Resume.pdf',
            'linkedIn': 'https://www.linkedin.com/in/minseok-doo/',
            'enBlog': 'https://blog.mdoo.info',
            'krBlog': 'https://blog.mdoo.pe.kr',
            'artStation': 'https://mdoo_pri.artstation.com',
            'gitHub': 'https://github.com/tkakrdpahd',
            'itchIo': 'https://mdoo12.itch.io'
        };
    }

    navigationRedirect() {
        this.ids.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', event => {
                    event.preventDefault();
                    const url = this.pageMap[id];
                    if (url) {
                        window.location.href = url;
                    }
                });
            }
        });
    }
    
    // this is language button eventListener
    langButtonEventListener() {
        if (!localStorage.getItem("language")) {
            this.updateLanguageInfo("ko");
        }
    
        document.getElementById('korean').addEventListener('click', () => {
            this.updateLanguageInfo("ko");
        });
    
        document.getElementById('english').addEventListener('click', () => {
            this.updateLanguageInfo("en");
        });
    }
    
    updateLanguageInfo(language) {
        localStorage.setItem("language", language);
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    setupPageNavigation();
    langButtonEventListener();
    loadScript();
}

function setupPageNavigation() {
    const ids = [
        'index', 'profile', 'ArtDescriptions', 'DevDescriptions', 'contact'
    ];

    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', event => {
                event.preventDefault();
                localStorage.setItem("page", id);
                
                if (id === 'index') {
                    window.location.href = '../index.html';
                } else {
                    const currentPage = window.location.pathname.split('/').pop();
                    if (currentPage === 'index.html') {
                        window.location.href = './html/detailPage.html';
                    } else {
                        location.reload();
                    }
                }
            });
        }
    });
}

function loadScript(callback) {
    const pageId = localStorage.getItem("page");
    const scriptSrc = '../js/' + pageId + '.js';
    const scripts = document.getElementsByTagName('script');

    for (let script of scripts) {
        if (script.getAttribute('src') === scriptSrc) {
            return;
        }
    }

    const newScript = document.createElement('script');
    newScript.src = scriptSrc;

    // callback readAndWrite();
    newScript.onload = function() {
        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    document.body.appendChild(newScript);
}

function langButtonEventListener() {
    if (localStorage.getItem("language") == null) {
        updateLanguageInfo("ko");
    }

    document.getElementById('korean').addEventListener('click', () => updateLanguageInfo("ko"));
    document.getElementById('english').addEventListener('click', () => updateLanguageInfo("en"));
}

function updateLanguageInfo(language) {
    localStorage.setItem("language", language);
    location.reload();
}
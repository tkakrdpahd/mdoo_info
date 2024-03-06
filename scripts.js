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
                setCookie("page", id);
                
                if (id === 'index') {
                    window.location.href = '../index.html';
                } else {
                    const currentPage = window.location.pathname.split('/').pop();
                    if (currentPage !== 'detailPage.html') {
                        window.location.href = './html/detailPage.html';
                        location.reload();
                    } else {
                        location.reload();
                    }
                }
            });
        }
    });
}

function loadScript(callback) {
    const pageId = getCookie("page");
    if (pageId == null) {
        setCookie("page", "index");
    }

    const scriptSrc = '../js/' + pageId + '.js';
    const scripts = document.getElementsByTagName('script');

    for (let script of scripts) {
        if (script.getAttribute('src') === scriptSrc) {
            return;
        }
    }

    const newScript = document.createElement('script');
    newScript.src = scriptSrc;
    newScript.onload = function() {
        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    document.body.appendChild(newScript);
}

function langButtonEventListener() {
    if (!getCookie("language")) {
        setCookie("language", "ko");
        location.reload();
    }

    document.getElementById('korean').addEventListener('click', () => {
        setCookie("language", "ko");
        location.reload();
    });

    document.getElementById('english').addEventListener('click', () => {
        setCookie("language", "en");
        location.reload();
    });
}

// 쿠키 설정 함수
function setCookie(name, value, days) {

    document.cookie = name + "=" + (value || "") + "; path=/";
}

// 쿠키 가져오기 함수
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

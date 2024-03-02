// scripts.js
document.addEventListener('DOMContentLoaded', initializePage);
function initializePage() {
    setupPageNavigation();
    langButtonEventListener();
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
                if (id === 'index') {
                    window.location.href = '../index.html';
                } else {
                    const currentPage = window.location.pathname.split('/').pop();
                    if (currentPage === 'index.html') {
                        window.location.href = './html/detailPage.html';
                    } else {
                        location.reload();
                    }
                    readAndWrite(id);
                }
            });
        }
    });
}

// this is language button eventListener
function langButtonEventListener() {
    if (localStorage.getItem("language") == null) {
        updateLanguageInfo("ko");
    }

    document.getElementById('korean').addEventListener('click', function () {
        updateLanguageInfo("ko");
    });

    document.getElementById('english').addEventListener('click', function () {
        updateLanguageInfo("en");
    });
}

function updateLanguageInfo(language) {
    localStorage.setItem("language", language);
    location.reload();
}

// load contents;
function readAndWrite(pageId){
    fetch("../json/" + pageId + ".json")
    .then(response => response.json())
        .then(json => {

    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
}
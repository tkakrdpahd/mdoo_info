// scripts.js
document.addEventListener('DOMContentLoaded', initializePage);
function initializePage() {
    setupPageNavigation();
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
                    if (currentPage === 'index.html' || currentPage === '') {
                        window.location.href = './html/detailPage.html';
                    }
                    readAndWrite(id);
                }
            });
        }
    });
}


function readAndWrite(pageId){
    fetch("../json/" + pageId + ".json")
    .then(response => response.json())
        .then(json => {

    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
}
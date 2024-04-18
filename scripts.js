document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    navigationRedirect();
}

function navigationRedirect() {
    var ids = ['index', 'curriculumVitae', 'linkedIn', 'enBlog', 'krBlog', 'artStation', 'gitHub', 'itchIo'];

    var pageMap = {
        'index': 'https://www.mdoo.info',
        'curriculumVitae': 'https://ftp.mdoo.info/Documents/Resume.pdf',
        'linkedIn': 'https://www.linkedin.com/in/minseok-doo/',
        'enBlog': 'https://blog.mdoo.info',
        'krBlog': 'https://blog.mdoo.pe.kr',
        'artStation': 'https://mdoo_pri.artstation.com',
        'gitHub': 'https://github.com/tkakrdpahd',
        'itchIo': 'https://mdoo12.itch.io'
    };

    ids.forEach(function(id) {
        var element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', function(event) {
                event.preventDefault();
                var url = pageMap[id];
                if (url) {
                    window.location.href = url;
                }
            });
        }
    });
}

function languageButtonEvent() {

}
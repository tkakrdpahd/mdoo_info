/*
// 데이터 요청 및 수신
fetch('/api/user-info').then(response => response.json()).then(data => {
  // 새로운 요소 생성 및 데이터 삽입
  const userInfoDiv = document.createElement('div');
  userInfoDiv.innerHTML = `
    <h1>${data.name}</h1>
    <p>${data.role}</p>
    <p>Contact: ${data.contactInfo[0].value}</p>
    <a href="${data.portfolio[0].url}">Portfolio</a>
  `;

  // 요소를 페이지에 추가
  document.getElementById('user-info-container').appendChild(userInfoDiv);
});
*/

function readAndWrite() {
    const pageId = localStorage.getItem("page");

    fetch("../json/" + pageId + ".json")
        .then(response => response.json())
        .then(json => {
            const language = localStorage.getItem("language");
            const contents = json[language];
            const contentsKeys = Object.keys(contents);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

loadScript(readAndWrite());

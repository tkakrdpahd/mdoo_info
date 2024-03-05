const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    fs.readFile('public/index.html', (err, data) => { // 'public/index.html' 파일 읽기
        if (err) {
            res.statusCode = 500; // 서버 에러
            res.end(`Error: ${err.message}`);
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html'); // Content-Type을 text/html로 설정
            res.end(data); // 읽은 파일 데이터로 응답
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

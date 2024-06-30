const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const hostname = '127.0.0.1';
const webPort = 3000;
const apiPort = 4000;

// admin.mdoo.kr
const app = express();
const server = http.createServer(app);

// Socket.IO 서버 생성
const io = new Server(server);

// 정적 파일 제공을 위한 미들웨어 설정 (예: HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 웹 서버 라우트 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// 웹 서버와 Socket.IO 서버 시작
server.listen(webPort, hostname, () => {
  console.log(`Web server running at http://${hostname}:${webPort}/`);
});

// mdoo.info/API
const apiApp = express();
const apiServer = http.createServer(apiApp);

// API 서버 라우트 설정
apiApp.get('/api', (req, res) => {
  res.json({ message: 'Hello from API Server!' });
});

// API 서버 시작
apiServer.listen(apiPort, hostname, () => {
  console.log(`API server running at http://${hostname}:${apiPort}/`);
});

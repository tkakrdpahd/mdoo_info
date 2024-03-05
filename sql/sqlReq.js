const mysql = require('mysql');

// MariaDB 연결을 위한 설정
const connection = mysql.createConnection({
  host: 'localhost:3306', // DB 호스트 주소
  user: 'node.js', // DB 사용자 이름
  password: 'node.js', // DB 비밀번호
  database: 'mdoo.info' // 사용할 데이터베이스 이름
});

// 데이터베이스 연결
connection.connect(error => {
  if (error) {
    console.error('An error occurred while connecting to the DB: ', error);
    return;
  }
  console.log('Connected to the MariaDB database successfully!');
});

// 데이터 조회 쿼리 실행
connection.query('SELECT * FROM your_table_name', (error, results, fields) => {
  if (error) {
    console.error('An error occurred while executing the query: ', error);
    return;
  }
  console.log('Query results: ', results);
});

// 연결 종료
connection.end();

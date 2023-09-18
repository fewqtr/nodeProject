// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path'); // path 모듈 추가
// const http = require('http'); // http 모듈 추가
// const socketIo = require('socket.io'); // socket.io 모듈 추가
// const app = express();

// const server = http.createServer(app); // Express 애플리케이션을 기반으로 http 서버 생성
// const io = socketIo(server); // 서버를 Socket.io에 연결
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const server = require('http').createServer(app); // http 모듈을 사용한 서버 생성
const io = require('socket.io')(server); // 서버를 Socket.io에 연결


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'dist')));  왜 오류 나는지 모르겠음 
//app.use(express.static(path.join(__dirname, 'plugins')));

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/plugins', express.static(__dirname + '/plugins'));

const posts = [];

// Socket.io 관련 로직을 추가
io.on('connection', (socket) => {
    console.log('a user connected');
    
    // 여기에서 클라이언트와의 소켓 통신 로직을 작성할 수 있습니다.
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});



app.get('/', (req, res) => {
    //res.send('서버 실행');
    res.render('chat');
});

app.get('/ajaxHandler', (req, res) => {
    //console.log(res);
    console.log('msg : ' + req.query.message);
    //console.log(res.query);
    res.send('서버 실행');
});
  
const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
// });
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
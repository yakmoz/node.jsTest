var fs = require('fs');
var server = require('http').createServer();
var io = require('socket.io').listen(server);

server.listen(process.env.PORT,function(){
    console.log('server %d',process.env.PORT);
});

// 서버에 접속시...
server.on('request',function(req,res){
    fs.readFile('socket.io/HTMLPage3.html',function(error,data) {
       // res.send(data,{'Content-Type':'text/html'},200);
       res.writeHead(200,{'Content-Type':'text/html'});
       res.end(data);
    });
});


// 소켓에 대한 이벤트 정의
io.sockets.on('connection',function(socket){
    socket.on('join',function(data){
        socket.join(data);
        socket.set('room',data);        // 방번호 부여??
    });
    
    socket.on('message',function(data){
        socket.get('room',function(error,room){
            io.sockets.in(room).emit('message',data);   //room에 속한 대상에게 emit
        });        
    });
});
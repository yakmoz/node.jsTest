var server = require('http').createServer();
var io  = require('socket.io').listen(server);
var fs = require('fs');


server.on('request',function(req,res){
    fs.readFile('socket.io/webchat/HTMLPage.html',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

server.listen(process.env.PORT,function(){
    console.log('server listen:%d',process.env.PORT);
});


io.sockets.on('connection',function(socket){
    socket.on('join',function(data){
        socket.join(data);      // 이걸 안하면.. html 에서 var socket = io.connect(); 에 대해 에러나더라?
        socket.set('room',data);
    });
    
    socket.on('sendMsg',function(data){
        socket.get('room',function(error,room) {
            io.sockets.in(room).emit('recvMsg',data);
        });
    });
});
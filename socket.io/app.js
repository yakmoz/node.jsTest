var fs = require('fs');
var server = require('http').createServer();
var io = require('socket.io').listen(server);

server.listen(process.env.PORT, function() {
    console.log('server run:%d',process.env.PORT);
});

server.on('request', function(req,res){
    fs.readFile('socket.io/HTMLPage2.html','utf8', function(error,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

io.sockets.on('connection',function(socket){
   
    socket.on('setname',function(data){
        socket.set('name',data);        // name 이라는 키로 넣음
    });
    
    socket.on('getname',function(){
        socket.get('name',function(error,data) {        // name 이라는 키로 꺼냄
            console.log('socket getname:%s',data);
            socket.emit('responsename',data);
        });
    });
});
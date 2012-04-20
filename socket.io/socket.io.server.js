var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(req,res){
    fs.readFile('./socket.io/HTMLPage.html',function(error,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
}).listen(process.env.PORT);


var id = 0;
var io = socketio.listen(server);

io.set('log level',2);
// 클라이언트가 연결될때 발생

io.sockets.on('connection',function(socket){
    
    id = socket.id;
    
    // on.. event?
    console.log('socket recv:%s',socket);
    socket.on('rint',function(data) {
        console.log('client data:%s',data);
       
        // 이벤트를 받아 다시 발생시킴
        //socket.emit('smart',data);  // not public
        
        //public 통신
        //io.sockets.emit('smart',data);
        
        //broadcast
        //socket.broadcast.emit('smart',data);
        
        //private
        io.sockets.sockets[id].emit('smart',data);
    });
    
});
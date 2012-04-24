var connect     = require('connect');
var socketio    = require('socket.io');
var fs          = require('fs');
var url         = require('url');

var pwd         = 'socket.io/cine/';

var seats = [
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];

var server = connect().use(function(req,res){
    var pathname = url.parse(req.url).pathname;

    switch(pathname) {
        case '/':
            fs.readFile(pwd+'HTMLPage.html',function(error,data) {
                defaultHead(res);
                res.end(data);
            });
            break;
        case '/seats' :
            //res.writeHead(200,{'Content-Type':'text/html'});
            console.log('/seats ....called');
            defaultHead(res);
            res.end(JSON.stringify(seats));
            break;
        default:
            break;
    }
});

server.listen(process.env.PORT,function(){
    console.log('server %d',process.env.PORT);
});

var io = socketio.listen(server);
//io.set('log level',2);
io.sockets.on('connection',function(socket){
    socket.on('reserve',function(data) {
        seats[data.y][data.x] = 2;
        io.sockets.emit('reserve',data);
    });
});


function defaultHead(res) {
    res.writeHead(200,{'Content-Type':'text/html'});
}



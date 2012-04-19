
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.cookieParser());      // 쿠키생성을 위한 미들웨어 추가
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/life',routes.life);
/*
app.get('/product',function(req,res){
    res.render('product',{title:'Product Page'});
});
*/
app.get('/product',function(req,res){
    res.render('product',{title:'Product Page'});
});

app.get('/product/insert',function(req,res){
    res.render('product/insert',{title:'Insert Page'});
});
app.get('/product/edit',function(req,res){
    res.render('product/edit',{title:'Edit Page'});
});

app.get('/redirect',function(req,res) {
    res.redirect('http://c9.io');
});

app.get('/cookie',function(req,res){
    res.cookie('name1','value1',{expires:new Date(Date.now()+1000*60*10)});
    res.cookie('name2','value2',{maxAge:1000*60*10});
    
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end('<h1>'+JSON.stringify(req.cookies)+'</h1>');
});

app.get('/onlyChrome',function(req,res){
   var agent = req.header('User-Agent');   
   console.log('agent:'+agent);
   
   if(agent.toLowerCase().match(/chrome/)) {
     res.send('<h1>welcome chrome...</h1>',{'Content-Type':'text/html'},200);
   } else {
     res.send('<h1>No chrome...</h1>',{'Content-Type':'text/html'},200);
   }
});

app.get('/params',function(req,res){
    res.send(req.param('id')+'/'+req.param('name'),{'Content-Type':'text/html'},200);
});



app.listen(process.env.C9_PORT, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

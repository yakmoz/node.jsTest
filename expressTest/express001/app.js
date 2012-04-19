
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


app.listen(process.env.C9_PORT, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var express = require('express');
var mainController = require('./controllers/mainController');
var roomsController = require('./controllers/roomsController');
var conversationController = require('./controllers/conversationController');
var chatController = require('./controllers/chatController');
var session = require('client-sessions');
var app = express();
var socket = require('socket.io');

//setting template engine
app.set('view engine', 'ejs');

//sets static files
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));

app.use(session({
  cookieName: 'session',
  secret: 'my-random-session-string',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

//listening to port 3000
var server = app.listen(3000, '127.0.0.1', function(){
  console.log('listening to port 3000');
});

var io = socket(server);

//start mainController
mainController(app);
roomsController(app);
conversationController(app);
chatController(app, io);

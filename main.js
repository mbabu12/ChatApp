var express = require('express');
var mainController = require('./controllers/mainController');
var roomsController = require('./controllers/roomsController');
var conversationController = require('./controllers/conversationController');
var session = require('client-sessions');
var app = express();

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

//start mainController
mainController(app);
roomsController(app);
conversationController(app);

//listening to port 3000
app.listen(3000, '127.0.0.1');
console.log('listening to port 3000');

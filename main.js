var express = require('express');
var mainController = require('./controllers/mainController');
var app = express();

//setting template engine
app.set('view engine', 'ejs');

//sets static files
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));

//start mainController
mainController(app);

//listening to port 3000
app.listen(3000, '127.0.0.1');
console.log('listening to port 3000');

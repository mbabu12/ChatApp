var bodyparser = require('body-parser');
var addData = require('../assets/addData');
const UserModel = require('../models/user');
var connection = require('../assets/connection');

var urlencodedParser = bodyparser.urlencoded({ extended: false });
//connecting to chatdb
connection();

module.exports = function(app){

  app.get('/', function(req,res){
    res.render('index');
  });

  app.get('/rooms.html', function(req,res){
    res.render('rooms');
  });

  app.post('/', urlencodedParser, function(req,res){
    var user = new UserModel({userName:req.body.lname, password:req.body.lpassword, avatar:''});
    addData(user);
  });
};

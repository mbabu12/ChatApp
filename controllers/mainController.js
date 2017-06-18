var bodyparser = require('body-parser');
var checkData = require('../models/checkData');
var connection = require('../models/connection');
const UserModel = require('../models/user');
var roomsController = require('./roomsController');

var urlencodedParser = bodyparser.urlencoded({ extended: false });
//connecting to chatdb
connection();

module.exports = function(app){

  app.get('/', function(req,res){
    res.render('index');
  });

  app.get('/sign', function(req,res){
    res.render('sign');
  });

  app.post('/', urlencodedParser, function(req,res){
    var user = new UserModel({userName:req.body.lname, password:req.body.lpassword, avatar:''});
    if(req.body.login === 'no'){
      checkData.addUser(user).then(function(resp){
        console.log(resp);
        if(resp)
        res.send('already added');
        else{
          roomsController(app);
          res.send('success');
        }
      });
    }
    else{
      checkData.checkUser(user).then(function(resp){
        console.log(resp);
        if(resp){
          roomsController(app);
          res.send('user exists');
        }
        else
        res.send('wrong username or password');
      });
    }
  });
};

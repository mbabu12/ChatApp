var bodyparser = require('body-parser');
var connection = require('../models/connection');
const UserModel = require('../models/user');
var roomsController = require('./roomsController');
var fs = require('fs');
var urlencodedParser = bodyparser.urlencoded({ extended: false });
//connecting to chatdb
connection();

module.exports = function(app){

  app.get('/', function(req,res){
    if(req.session.user)
      res.redirect('/rooms');
    else
      res.render('index');
  });

  app.get('/sign', function(req,res){
    if(req.session.user)
      res.redirect('/rooms');
    else
      res.render('sign');
  });

  app.get('/logout', function(req, res) {
    req.session.reset();
    res.redirect('/');
  });

  function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
  }

  app.post('/', urlencodedParser, function(req,res){
    var user = UserModel({userName:req.body.lname, password:req.body.lpassword, avatar:''});
    if(req.body.login === 'no'){
      user.avatar = req.body.imgname;
      userModel.findOne({userName : user.userName}, function (err, doc) {
        if(doc){
          res.send('already added');
        }
        user.save(function(err){
          if(err){
            console.log('cannot save to database');
          }
          if(req.body.imgdata !== ''){
            var base64Data = decodeBase64Image(req.body.imgdata);
            fs.closeSync(fs.openSync('./uploads/'+req.body.imgname, 'w'));
            fs.writeFile('./uploads/'+req.body.imgname,base64Data.data, function(err) {
              if(err) {
                return console.log(err);
              }
              console.log("The file was saved!");
            });
          }
          res.send('success');

        });
      });
    }
    else{
      UserModel.findOne({userName : user.userName, password : user.password}, {userName : 0, avatar : 0, password : 0}, function (err, doc) {
        if (doc){
          req.session.user = doc;
          res.send('user exists');
        }
        else
        res.send('wrong username or password');
      });
    }
  });
};

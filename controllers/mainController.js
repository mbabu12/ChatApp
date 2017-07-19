var bodyparser = require('body-parser');
var checkData = require('../models/checkData');
var connection = require('../models/connection');
const UserModel = require('../models/user');
var roomsController = require('./roomsController');
var fs = require('fs');
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
    var user = new UserModel({userName:req.body.lname, password:req.body.lpassword, avatar:''});
    if(req.body.login === 'no'){
      user.avatar = req.body.imgname;
      checkData.addUser(user).then(function(resp){
        console.log(resp);
        if(resp)
        res.send('already added');
        else{
          var base64Data = decodeBase64Image(req.body.imgdata);
          fs.closeSync(fs.openSync('./uploads/'+req.body.imgname, 'w'));
          fs.writeFile('./uploads/'+req.body.imgname,base64Data.data, function(err) {
            if(err) {
              return console.log(err);
            }
            console.log("The file was saved!");
          });
          roomsController(app);
          res.send('success');
        }
      });
    }
    else{
      checkData.checkUser(user).then(function(resp){
      //  console.log(resp);
        if(resp.saved){
          roomsController(app);
          res.send({resp : 'user exists', curUser : resp.curUser});
        }
        else
        res.send({resp : 'wrong username or password', curUser : ''});
      });
    }
  });
};

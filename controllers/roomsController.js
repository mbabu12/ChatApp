const ConvModel = require('../models/groupConv').ConvModel;
const UserModel = require('../models/user');
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: false });
var fs = require('fs');


module.exports = function(app){
  //get data from mongodb and pass to roomsview
  app.get('/rooms', function(req,res){
    if (req.session && req.session.user) { // Check if session exists
      // lookup the user in the DB
      UserModel.findById(req.session.user._id, function (err, user) {
        if (!user) {
          // if the user isn't found in the DB, reset the session info and
          // redirect the user to the login page
          req.session.reset();
          res.redirect('/');
        } else {
          ConvModel.find({}, function(err,data){
            if(err) throw err;
            res.render('rooms', {allConv : data, curUser : user});
          });
        }
      });
    }
    else{
      res.redirect('/');
    }
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

  app.post('/rooms', urlencodedParser, function(req,res){
    if (req.session && req.session.user) { // Check if session exists
      // lookup the user in the DB
      UserModel.findById(req.session.user._id, function (err, user) {
        if (!user) {
          // if the user isn't found in the DB, reset the session info and
          // redirect the user to the login page
          req.session.reset();
          res.redirect('/');
        } else {
          var base64Data = decodeBase64Image(req.body.imgData);
          fs.closeSync(fs.openSync('./uploads/'+req.body['fordb[img]'], 'w'));
          fs.writeFile('./uploads/'+req.body['fordb[img]'],base64Data.data, function(err) {
            if(err) {
              return console.log(err);
            }
            console.log("The file was saved!");
          });
          var conv = ConvModel({title : req.body['fordb[title]'],
          latitude : req.body['fordb[latitude]'],
          longitude : req.body['fordb[longitude]'],
          userId : req.session.user._id,
          date : req.body['fordb[date]'],
          text : req.body['fordb[text]'],
          img : req.body['fordb[img]'],
          comments : req.body['fordb[comments]']});
          conv.save(function(err, data){
            if(err){
              console.log('cannot save to database');
            }
            res.json(data);
          });
        }
      });
    }
    else{
      res.redirect('/');
    }
  });
}

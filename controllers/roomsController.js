const ConvModel = require('../models/groupConv');
const UserModel = require('../models/user');
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: false });

module.exports = function(app){
  //get data from mongodb and pass to roomsview
  app.get('/rooms', function(req,res){
    ConvModel.find({}, function(err,data){
      if(err) throw err;
      UserModel.findById(req.query.id, function (err, user) {
        if(user){
          res.render('rooms', {allConv : data, curUser : user});
        }
        else{
          console.log('sjdfsdf');
          res.render('index');
        }
      } );

    });

  });

  app.post('/rooms', urlencodedParser, function(req,res){
  //  req.body.img = req.body.img.name;
    var conv = ConvModel(req.body);

    conv.save(function(err, data){
      if(err){
        console.log('cannot save to database');
      }
      res.json(data);
    });
  });
}

const ConvModel = require('../models/groupConv').ConvModel;
const UserModel = require('../models/user');
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: false });

module.exports = function(app){
  //get data from mongodb and pass to conversation view
  app.get('/conversation', function(req,res){
    ConvModel.findById(req.query.id, function(err,data){
      if(err) throw err;
      UserModel.findById(req.query.userId, function (err, user) {
        if(user){
          var userInfos = [];
          for(var i = 0; i < data.comments.length; i++){
            UserModel.findById(data.comments.userId, function (err, us){
              if(us){
                userInfos.push(us);
              }
            });
          }
          res.render('conversation', {convData : data, curUser : user, infos : userInfos});
        }
        else{
          console.log('sjdfsdf');
          res.render('index');
        }
      } );

    });

  });


  app.post('/conversation', urlencodedParser, function(req,res){
    ConvModel.findById(req.query.id, function(err,data){
      if(err) throw err;
      data.comments.push(req.body);
      data.save(function (err) {
        if (err) return handleError(err)
        console.log('Success!');
      });
      res.json(data);
    });
  });
}

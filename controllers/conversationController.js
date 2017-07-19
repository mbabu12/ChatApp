const ConvModel = require('../models/groupConv');
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
          res.render('conversation', {convData : data, curUser : user});
        }
        else{
          console.log('sjdfsdf');
          res.render('index');
        }
      } );

    });

  });
}

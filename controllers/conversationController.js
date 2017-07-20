const ConvModel = require('../models/groupConv').ConvModel;
const UserModel = require('../models/user');
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: false });

module.exports = function(app){
  //get data from mongodb and pass to conversation view
  app.get('/conversation', function(req,res){
    if (req.session && req.session.user) { // Check if session exists
      // lookup the user in the DB
      UserModel.findById(req.session.user._id, function (err, user) {
        if (!user) {
          // if the user isn't found in the DB, reset the session info and
          // redirect the user to the login page
          req.session.reset();
          res.redirect('/');
        } else {
          ConvModel.findById(req.query.id, function(err,data){
            if(data){
              if(err) throw err;
              var userIds = [];
              var userInfos = [];
              data.comments.forEach(function(comment){
                userIds.push(comment.userId);
              });
              UserModel.find({_id: {$in: userIds}}, function (err, users){
                if(users){
                  userIds.forEach(function(usId){
                    users.forEach(function(us){
                      if(usId.equals(us._id)){
                        userInfos.push({_id: us._id, userName:us.userName, avatar:us.avatar});
                      }
                    });
                  });
                  res.render('conversation', {convData : data, curUser : user, infos : userInfos});
                }
              })
            }
            else{
              res.redirect('/');
            }
          });
        }
      });
    }
    else{
      res.redirect('/');
    }
  });



  app.post('/conversation', urlencodedParser, function(req,res){
    if (req.session && req.session.user) { // Check if session exists
      // lookup the user in the DB
      UserModel.findById(req.session.user._id, function (err, user) {
        if (!user) {
          // if the user isn't found in the DB, reset the session info and
          // redirect the user to the login page
          req.session.reset();
          res.redirect('/');
        } else {
          ConvModel.findById(req.query.id, function(err,data){
            if(err) throw err;
            data.comments.push({userId:req.session.user._id, text:req.body.text, date:req.body.date});
            data.save(function (err) {
              if (err) return handleError(err)
              console.log('Success!');
            });
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

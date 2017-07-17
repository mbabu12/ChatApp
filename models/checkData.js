const mongoose = require('mongoose');
const userModel = require('../models/user');

module.exports.addUser = function addUser(user){
  var saved = false;
  return userModel.findOne({userName : user.userName}, function (err, doc) {
    if (doc){
      saved = true;
    }else{
      user.save(function(err){
        if(err){
          console.log('cannot save to database');
        }
      }).then(function(){
        saved = false;
      });
    }
  }).then(function(){
    return saved;
  });
}

module.exports.checkUser = function checkUser(user){
  var info = {saved : false, curUser : ''};
  return userModel.findOne({userName : user.userName, password : user.password}, {userName : 0, avatar : 0, password : 0}, function (err, doc) {
    if (doc){
      info.saved = true;
      info.curUser = doc;
    }else{
      info.saved = false;
    }
  }).then(function(){
    return info;
  });
}

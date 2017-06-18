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
  var saved = false;
  return userModel.findOne({userName : user.userName}, {password : user.password}, function (err, doc) {
    if (doc){
      saved = true;
    }else{
      saved = false;
    }
  }).then(function(){
    return saved;
  });
}

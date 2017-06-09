const mongoose = require('mongoose');
const userModel = require('../models/user');

module.exports = function(user){
  var saved = false;
  return userModel.find({userName : user.userName}, function (err, docs) {
    if (docs.length){
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

const mongoose = require('mongoose');

module.exports = function(user){
  user.save(function(err){
    if(err){
      if (err.name === 'MongoError' && err.code === 11000) {
        console.log('already exists');
      }
    }
    else{
      console.log('user saved');
    }
  })
}

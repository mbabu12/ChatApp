const mongoose = require('mongoose');

module.exports = function(){
  //using es6 promise
  mongoose.Promise = global.Promise;
  //connect to database
  mongoose.connect('mongodb://localhost/chatdb');

  mongoose.connection.once('open', function(){
    console.log("connection has been made");
  }).on('error',function(error){
    console.log('error:',error);
  })
}

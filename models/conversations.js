const mongoose = require('mongoose');
const convModel = require('./groupConv');

module.exports.addConv = function addConv(conv){
  conv.save(function(err){
    if(err){
      console.log('cannot save to database');
    }
  }
}

module.exports.getConv = function getConv(user){
  convModel.find(function (err, doc) {
    if (docs){

    }else{

    }
  })
}

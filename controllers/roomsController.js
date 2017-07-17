const ConvModel = require('../models/groupConv');

module.exports = function(app){
  //get data from mongodb and pass to roomsview
  ConvModel.find({}, function(err,data){
    app.get('/rooms', function(req,res){
      if(err) throw err;
      res.render('rooms', {allConv : data});
    });
  });
}

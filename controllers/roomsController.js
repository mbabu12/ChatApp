module.exports = function(app){
  app.get('/rooms', function(req,res){
    res.render('rooms');
  });
}

module.exports = function(app){

  app.get('/', function(req,res){
    res.render('index');
  });

  app.get('/rooms.html', function(req,res){
    res.render('rooms');
  });
};

module.exports = function(app){

  app.get('/', function(req,res){
    res.sendFile('/Users/Home/Documents/ChatApp/views/index.html');
  });

  app.get('/rooms.html', function(req,res){
    res.sendFile('/Users/Home/Documents/ChatApp/views/rooms.html');
  });
};

module.exports = function(app){

  app.get('/', function(req,res){
    res.sendFile('/Users/Home/Documents/ChatApp/views/index.html');
  });

};

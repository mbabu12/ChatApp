const UserModel = require('../models/user');
connections = {};
allsockets = {};

module.exports = function(app, io){
  //get data from mongodb and pass to conversation view
  app.get('/chat', function(req,res){
    if (req.session && req.session.user) { // Check if session exists
      // lookup the user in the DB
      UserModel.findById(req.session.user._id, function (err, user) {
        if (!user) {
          // if the user isn't found in the DB, reset the session info and
          // redirect the user to the login page
          req.session.reset();
          res.redirect('/');
        } else {
          res.render('chat', {userId:req.session.user._id});
        }
      });
    }else{
      res.redirect('/');
    }
  });

require('socketio-auth')(io, {
  authenticate: function (socket, data, callback) {
    //get credentials sent by the client
    var userId = data.id;
    connections[userId] = socket;
    allsockets[socket.id] = userId;
    return callback(null, true);
  }
});

  io.on('connect', function(socket){
    console.log("made socket connection");
    
  //  console.log(req.session.user);
    socket.on('disconnect', function(){
      var usId = allsockets[socket.id];
      delete connections[usId];
      delete allsockets[socket.id];
      console.log('disconnected'+usId+" "+socket.id);
    });
  });
}

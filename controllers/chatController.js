const UserModel = require('../models/user');

module.exports = function(app){
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
          res.render('chat');
        }
      });
    }else{
      res.redirect('/');
    }
  });
}

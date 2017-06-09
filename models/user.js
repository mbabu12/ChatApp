const mongoose = require('mongoose');
const schema = mongoose.Schema;

// creates model. userName is unique
var UserModelSchema = new schema({
  userName : {type : String, unique : true, required : true},
  password : {type : String, requires : true},
  avatar : String
});

const UserModel = mongoose.model('Users', UserModelSchema);

// for using elsewhere
module.exports = UserModel;

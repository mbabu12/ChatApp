const mongoose = require('mongoose');
const schema = mongoose.Schema;

// creates model
Const UserModelSchema = new schema({
  userName : String;
  password : String;
  avatar : url;
});

const UserModel = mongoose.model('UserModel', UserModelSchema);

// for using elsewhere
model.exports = UserModel;

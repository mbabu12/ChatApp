const mongoose = require('mongoose');
const schema = mongoose.Schema;

// creates comment model
var CommentSchema = new schema({
  userId : {type: schema.Types.ObjectId, required : true},
  text : {type : String, required : true},
  date : {type : Date, default : Date.now}
});

// creates conversation model with subdoc comments
var ConvModelSchema = new schema({
  title : {type : String, required : true},
  latitude : {type : Number, required : true},
  longitude : {type : Number, required : true},
  userId : {type: schema.Types.ObjectId, required : true},
  date : {type : Date, default : Date.now},
  text : {type : String, required : true},
  img : { data: Buffer },
  comments : [CommentSchema]
});

const ConvModel = mongoose.model('Conversations', ConvModelSchema);

// for using elsewhere
module.exports = ConvModel;

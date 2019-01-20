var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  "_id" :Number,
  "name" : String,
  "password" : String,
  "sex" : Number,
  "age" : Number,
  "degree" : String,
  "remark" : String
});

module.exports = mongoose.model("User",userSchema);
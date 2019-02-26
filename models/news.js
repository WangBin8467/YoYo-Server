var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  "_id" : Number,
  "title" : String,
  "content" : String,
  "createTime" : String,
  "userID" : Number,
  "author" : String,
  "type" : Number,
  "imageUrl": String,
});

module.exports = mongoose.model("New",newsSchema);
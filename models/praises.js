var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var praiseSchema = new Schema({
  "_id" :Number,
  "praiseID":Number,
  "bePraiseID":Number,
  "praiseUsername":String,
  "newsID":Number,
  "createTime":String,
  "praiseImage":String,
  "bePraiseImage":String,
  "isRead":Boolean
});

module.exports = mongoose.model("Praise",praiseSchema);
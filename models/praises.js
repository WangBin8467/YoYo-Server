var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var praiseSchema = new Schema({
  "_id" :Number,
  "praiseID":Number,
  "bePraiseID":Number,
  "newsID":Number,
  "createTime":String,
});

module.exports = mongoose.model("Praise",praiseSchema);
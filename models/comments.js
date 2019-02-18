var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
  "_id" : Number,              // 评论 id
  "comment_uid" : Number,      // 评论人 id
  "comment_nid" : Number,      // 评论帖子 id
  "comment_name":String,       // 评论人 姓名
  "comment_avatar":String,     // 评论人 头像
  "createTime" : String,       // 评论时间
  "comment_content" : String,  // 评论内容
  "replyList":[                // 回复数据 数组
    {
      "reply_id":Number,       // 回复 id
      "reply_uid":Number,      // 回复人 id
      "reply_name":String,     // 回复人 姓名
      "reply_to_uid":Number,   // 被回复人 id
      "reply_to_name":String,  // 被回复人 姓名
      "reply_content":String,  // 回复内容
      "reply_createTime":String// 回复时间
    }
  ],
});

module.exports = mongoose.model("Comment",commentsSchema);
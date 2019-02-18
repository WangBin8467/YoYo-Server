var express = require('express');
var router = express.Router();

var New = require('../models/news');
var User =require('../models/Users');
var Praise =require('../models/praises');
var Comment =require('../models/comments');

// 日期格式化
require('./../utils/dateFormat')

// 新增评论
router.post('/addComment',(req,res)=>{
  const data=req.body;

  let r1 = Math.floor(Math.random() * 10);
  let r2 = Math.floor(Math.random() * 10);
  let _id = `${r1}${(Date.parse(new Date())) / 1000}${r2}`;
  let createTime=new Date().Format('yyyy-MM-dd hh:mm:ss');

  let comment=new Comment({
    _id,
    comment_uid:data.userID,
    comment_nid:data.newsID,
    comment_name:data.username,
    comment_avatar:data.userAvatar,
    createTime,
    comment_content:data.content,
    replyList:[]
  })

  // 插入评论数据
  comment.save((err,doc)=>{
    if (err){
      res.json({
        code:400,
        msg:err.message,
        result:''
      })
    } else {
      if(doc){
        res.json({
          code:200,
          msg:'ok',
        })
      }else{
        res.json({
          code:400,
          msg:'评论失败',
        })
      }
    }
  })
})

// 查找帖子下的所有评论信息
router.post('/getCommentAll',async (req,res)=>{
  const whereStr={'comment_nid':req.body.newsID};

  await Comment.find(whereStr,(err,doc)=>{
    if (err){
      res.json({
        code:400,
        msg:err.message,
        result:'',
      })
    } else{
      res.json({
        code:200,
        result:doc,
      })
    }
  })
})

module.exports = router;
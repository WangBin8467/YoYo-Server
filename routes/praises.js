var express = require('express');
var router = express.Router();

var New = require('../models/news');
var User =require('../models/Users');
var Praise =require('../models/praises')

// 日期格式化
require('./../utils/dateFormat')

// 用户点赞
router.post('/addLike', (req,res)=>{
  const {praiseID, bePraiseID,newsID} = req.body;

  let r1 = Math.floor(Math.random() * 10);
  let r2 = Math.floor(Math.random() * 10);
  let _id = `${r1}${(Date.parse(new Date())) / 1000}${r2}`;
  let createTime=new Date().Format('yyyy-MM-dd hh:mm:ss');

  let praise=new Praise({
    _id,
    praiseID,
    bePraiseID,
    newsID,
    createTime,
  })

  // 插入数据
  praise.save((err,doc)=>{
    if (err){
      res.json({
        code:400,
        msg:err.message,
        result:''
      })
    } else {
      console.clear();
      console.log(doc);
      if(doc){
        res.json({
          code:200,
          msg:'',
          result:'ok'
        })
      }else{
        res.json({
          code:400,
          msg:'操作失败',
        })
      }
    }
  })
})

// 查找帖子被赞信息
router.post('/getNewsLike',async (req,res)=>{
  const whereStr={'newsID':req.body.newsID};

  await Praise.find(whereStr,(err,doc)=>{
    if (err){
      res.json({
        code:400,
        msg:err.message,
        result:'',
      })
    } else{
      if (doc.length){
        const likeArr=[];
        doc.map(i=>{
          likeArr.push(i.praiseID)
        })

        res.json({
          code:200,
          result:{
            likeList: likeArr,
          }
        })
      } else{
        res.json({
          code:200,
          result:{
            likeList: []
          }
        })
      }
    }
  })
})

module.exports = router;
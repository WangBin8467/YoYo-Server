var express = require('express');
var router = express.Router();

var New = require('../models/news');
var User =require('../models/Users');
var Praise =require('../models/praises')

// 日期格式化
require('./../utils/dateFormat')

// 用户点赞
router.post('/addLike', (req,res)=>{
  const {praiseID, bePraiseID,praiseUsername,newsID,praiseImage,bePraiseImage} = req.body;

  let r1 = Math.floor(Math.random() * 10);
  let r2 = Math.floor(Math.random() * 10);
  let _id = `${r1}${(Date.parse(new Date())) / 1000}${r2}`;
  let createTime=new Date().Format('yyyy-MM-dd hh:mm:ss');

  let praise=new Praise({
    _id,
    praiseID,
    bePraiseID,
    praiseUsername,
    newsID,
    createTime,
    praiseImage,
    bePraiseImage,
    isRead:false
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

// 查找用户点赞过的帖子
router.post('/getUserLike',async (req,res)=>{
  const userID=req.body.userID;

  if (userID){
    // mongoose 3.x  Aggregate $lookup
    const data=await Praise.aggregate([
      {
        $lookup:
          {
            from: "news",
            localField: "newsID",
            foreignField: "_id",
            as: "new_docs",
          },
      },
      { $match : { praiseID : userID } }
    ])

    // ES6 async异步方案下的同步写法 不写回调
    if (data){
      res.json({
        code:200,
        result:data
      })
    } else{
      res.json({
        code:400,
        result:'',
      })
    }
  }
})

// 查找用户被点赞的信息
router.post('/getUserBeLike',async (req,res)=>{
  const userID=req.body.userID;

  if (userID){
    const data=await Praise.aggregate([
      {
        $lookup:
          {
            from: "news",
            localField: "newsID",
            foreignField: "_id",
            as: "new_docs",
          },
      },
      { $match : { bePraiseID : userID } }
    ])

    if (data){
      res.json({
        code:200,
        result:data
      })
    } else{
      res.json({
        code:400,
        result:'',
      })
    }
  }
})

// 用户阅读
router.post('/read',async (req,res)=>{
  const whereStr={'_id':req.body.praiseID};
  const updateStr={'isRead':true}

  await Praise.update(whereStr,updateStr,(err,doc)=>{
    if (err){
      res.json({
        code:400,
        msg:err.message,
        result:'',
      })
    } else{
      if (doc.ok===1){
        res.json({
          code:200,
          result:'ok',
        })
      }
    }
  })

})

module.exports = router;
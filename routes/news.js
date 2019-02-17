var express = require('express');
var router = express.Router();

var New = require('../models/news');
var User =require('../models/Users')

// 日期格式化
require('./../utils/dateFormat')

// 查询news列表数据
router.get('/getNewsList', (req,res,next)=>{
  let sort =req.body.sort||-1; // 默认按创建时间倒序
  let page = req.body.page||1; //默认第一页
  let pageSize = req.body.pageSize || 10; // 默认一页10条
  let skip=(page-1)*pageSize; // 跳过多少条
  let params={}; // 筛选条件
  if(req.body.type){
    params={
      'type': req.body.type,
    }
  }

  let newsModel= New.find(params).skip(skip).limit(pageSize);
  // 1 升序 -1 降序
  sort && newsModel.sort({'createTime':sort})
  newsModel.exec((err,doc)=>{
    if(err){
      res.json({
        code:400,
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        code:200,
        msg:'successful',
        result:{
          count:doc.length,
          data:doc
        }
      })
    }
  })
})

// 新增news数据
router.post('/addNews',async (req,res)=>{
  const {name,content,userID,type,author}=req.body;
  try{
    let r1 = Math.floor(Math.random() * 10);
    let r2 = Math.floor(Math.random() * 10);
    let _id = `${r1}${(Date.parse(new Date())) / 1000}${r2}`;

    let createTime=new Date().Format('yyyy-MM-dd hh:mm:ss');

    console.clear();
    console.log(content);
    console.log(createTime)
    //插入数据
    New.insertMany({
      _id,
      userID,
      title:name,
      content,
      type,
      author,
      createTime,
    })
    res.json({
      code:200,
      msg:'发布成功',
      result:{
        news_id:_id,
      }
    })
  }catch (e) {
    res.json({
      code: 400,
      msg: e.message,
      result:''
    })
  }
})

// 获取单个news信息
router.post('/getNewsInfo',async (req,res)=>{
  const newsID=req.body._id;

  console.clear();
  console.log(newsID);

  if (newsID){
    await New.findById(newsID,(err,doc)=>{
      if (err){
        res.json({
          code:400,
          msg:err.message,
          result:'',
        })
      } else{
        console.log(doc);
        res.json({
          code:200,
          result:doc
        })
      }
    })
  }
})

// 获取用户发帖信息
router.post('/getUserNews',async (req,res)=>{
  const userID=req.body.userID;
  if(userID){
    await New.find({userID:userID},(err,doc)=>{
      if (err){
        res.json({
          code:400,
          msg:err.message,
          result:'',
        })
      } else{
        res.json({
          code:200,
          result:{
            news:doc
          }
        })
      }
    })
  }
})

module.exports = router;
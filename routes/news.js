var express = require('express');
var router = express.Router();

var New = require('../models/news');

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

module.exports = router;
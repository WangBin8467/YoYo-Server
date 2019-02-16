var express = require('express');
var router = express.Router();

var User = require('../models/Users');

// 日期格式化
require('./../utils/dateFormat')

// 登录
router.post('/login',async (req,res,next)=>{
  var param = {
    name:req.body.name,
    password:req.body.password
  }
  await User.findOne(param,(err,doc)=>{
    if(err){
        res.json({
          code:400,
          msg:err.message,
          result:''
        })
      }else{
      if(doc){
        res.cookie("userId", doc._id, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
          res.json({
            code:200,
            result:{
              user:doc
            }
          })
        }else{
        res.json({
          code:400,
          msg: '登录失败，账号或者密码错误',
          result: '',
        })
      }
    }
  })
});

// 登出
router.post('/loginOut', (req, res) => {
  res.cookie("userId", "", {
    path: "/",
    maxAge: -1
  });
  res.json({
    code:200,
    msg: '',
    result: ''
  })
})

// 注册
router.post('/register', async (req, res) => {
  const {name, password,sex,age,degree,remark} = req.body;
  try {
    const doc = await User.findOne({name})
    if (doc!=null) {
      res.json({
        code:400,
        msg: '该账号已存在!',
        result: ''
      })
    } else {
      let r1 = Math.floor(Math.random() * 10);
      let r2 = Math.floor(Math.random() * 10);
      let _id = `${r1}${(Date.parse(new Date())) / 1000}${r2}`
      // 可以注册
      User.insertMany({
        _id,
        name,
        password,
        sex,
        age,
        degree,
        remark,
        likeList:[]
      })
      res.json({
        code: 200,
        msg: '注册成功',
        result: {
          user:{
            _id,
            name,
            password,
            sex,
            age,
            degree,
            remark,
          }
        }
      })
    }
  } catch (err) {
    res.json({
      code: 400,
      msg: err.message,
      result:''
    })
  }
})

// 更新用户资料
router.post('/updateInfo',async (req,res)=>{
  const user=req.body;
  const wherestr = {'_id' : user._id};
  const updatestr = user;
  await User.update(wherestr,updatestr,(err,doc)=>{
    if (err){
      res.json({
        code:400,
        msg:err.message,
        result:''
      })
    } else {
      if (doc){
        res.json({
          code:200,
          msg:'',
          result:'ok'
        })
      }
    }
  })
})

// 重置用户密码
router.post('/changeUserPwd',async (req,res)=>{
  const password=req.body.password;
  const wherestr = {'_id' : req.body._id};
  const updatestr={'password':password};

  await User.update(wherestr,updatestr,(err,doc)=>{
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

// 更新用户头像
router.post('/changeImage',async (req,res)=>{
  const updatestr={'imageUrl':req.body.imgStr};

  await User.findByIdAndUpdate(req.body._id,updatestr,(err,doc)=>{
    if (err){
      res.json({
        code:400,
        msg:err.message,
        result:''
      })
    }else{
      if (doc.imageUrl){
        res.json({
          code:200,
          msg:'',
          result:'ok'
        })
      } else{
        res.json({
          code:400,
          msg:'更新失败',
        })
      }
    }
  })
})

module.exports = router;

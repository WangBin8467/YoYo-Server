var express = require('express');
var router = express.Router();

var User = require('../models/Users');

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

module.exports = router;

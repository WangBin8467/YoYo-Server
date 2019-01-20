var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/',(req,res,next)=>{
  res.send('12121');
})

module.exports = router;

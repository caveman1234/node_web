var express = require('express');
var { wrapRes } = require("../../../src/utils/index");
var userDb = require("../../../src/db/user/index");

var router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
router.get('/findAll',async function(req, res) {
  try{
    var allUsers = await userDb.findAllUser();
  }catch(e){
    res.json(wrapRes(2,e.message,[]));
    return;
  }
  res.json(wrapRes(1,"成功",allUsers));
})
router.get('/create',async function(req, res) {
  try{
    var allUsers = await userDb.createUser({
      username:"jack",
      password:"a123456"
    });
  }catch(e){
    res.json(wrapRes(2,e.message,{}));
    return;
  }
  res.json(wrapRes(1,"成功",allUsers));
})
router.get("/test",function(req,res){
  debugger
})




module.exports = router
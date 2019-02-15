var express = require('express');
var { wrapRes } = require("../../../src/utils/index");
var placeDetailDb = require("../../../src/db/placeDetail/index");

var router = express.Router();

router.post('/place/create',async function(req, res) {
  try{
    var {userId,username,realname,telphone,studentNumber} = req.session.userInfo;
    var {placeCode,placeAddress,placeType,startDateTime,endDateTime} = req.body;

    var {count} = await placeDetailDb.findCountByDateTime({startDateTime,endDateTime});
    if(count > 0) throw new Error("预约场地时间有重叠");

    var result = await placeDetailDb.create({userId,username,realname,telphone,studentNumber,placeCode,placeAddress,placeType,startDateTime,endDateTime});
    res.json(wrapRes(1,"成功",result));
  }catch(e){
    res.json(wrapRes(2,e.message,null));
    return;
  }
});
router.get('/place/detail',async function(req, res) {
  try{
    var {placeCode} = req.query;
    if(!placeCode) throw new Error("placeCode不能为空");
    var results = await placeDetailDb.findByPlaceCode(placeCode);
    res.json(wrapRes(1,"成功",results));
  }catch(e){
    res.json(wrapRes(2,e.message,null));
    return;
  }
});
router.get('/place/cancel',async function(req, res) {
  try{
    var placeDetailId = req.query.placeDetailId;
    if(!placeDetailId) throw new Error("placeDetailId不能为空");
    var {userId} = req.session.userInfo;
    var results = await placeDetailDb.deleteById({placeDetailId,userId});
    res.json(wrapRes(1,"成功",results));
  }catch(e){
    res.json(wrapRes(2,e.message,null));
    return;
  }
});
router.get('/place/findAll',async function(req, res) {
  try{
    var results = await placeDetailDb.findAllPlace();
    res.json(wrapRes(1,"成功",results));
  }catch(e){
    res.json(wrapRes(2,e.message,null));
    return;
  }
});
router.get('/place/mySubscribe',async function(req, res) {
  try{
    var {userId} = req.session.userInfo;
    if(!userId) throw new Error("请登录");
    var results = await placeDetailDb.findAllPlaceByUserId(userId);
    res.json(wrapRes(1,"成功",results));
  }catch(e){
    res.json(wrapRes(2,e.message,null));
    return;
  }
});






module.exports = router
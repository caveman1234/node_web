var express = require('express');
var { wrapRes,generateCode } = require("../../../src/utils/index");
var noticeDb = require("../../../src/db/notice/index");

var router = express.Router();


router.post('/notice/create',async function(req, res) {
    try{
    var {userId,username,realname,telphone,studentNumber} = req.session.userInfo;
      var {noticeCode,noticeTitle,noticeContent} = req.body;
    var allNotices = await noticeDb.createNotice({
        noticeCode:generateCode(),
        userId:userId,
        username:username,
        realname:realname,
        telphone:telphone,
        noticeTitle:noticeTitle,
        noticeContent:noticeContent,
      });
      res.json(wrapRes(1,"成功",allNotices));
    }catch(e){
      res.json(wrapRes(2,e.message,null));
      return;
    }
});
// router.get('/notice/detail',async function(req, res) {
//     try{
//       var {noticeTitle} = req.query;
//       if(!noticeTitle) throw new Error("placeCode不能为空");
//       var results = await placeDetailDb.findByNoticeTitle(noticeTitle);
//       res.json(wrapRes(1,"成功",results));
//     }catch(e){
//       res.json(wrapRes(2,e.message,null));
//       return;
//     }
// });
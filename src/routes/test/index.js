var express = require('express');
var fs = require("fs");
var path = require("path");
var { wrapRes } = require("../../utils/index");
var {findAllUser} = require("../../db/user/index");
var { genPage } = require("../../utils/index");

var router = express.Router();

router.use(function timeLog (req, res, next) {
  
  next()
})
router.post("/testPostJson",function (req, res) {
  var body = req.body;
  
  res.json(wrapRes(1,"成功",body));
})
router.post("/testUrlEncoding",function(req,res){
  var body = req.body;
  res.json(wrapRes(1,"成功",body));
})
router.post("/testFormData",function(req,res){
  var body = req.body;
  res.json(wrapRes(1,"成功",body));
  Object.keys(req.files).forEach(function(key) {
    var fileInfo = req.files[key];
    var originalFilename = fileInfo.originalFilename;
    var filePath = fileInfo.path;
    var dist = path.resolve(__dirname,"../../webapp",originalFilename);
    var rs = fs.createReadStream(filePath);
    var ws = fs.createWriteStream(dist);
    rs.pipe(ws);
  });
})
router.get("/testGet",async function(req,res){
  var page = parseInt(req.query.page) || 0;
  var size = parseInt(req.query.size) || 10;
  var params = {limit:size,offset:size * page};
  var {users,count} = await findAllUser(params);
  var pageable = {page,size,count};
  // res.cookie('rememberme', '1', { maxAge: 1000, httpOnly: true });
  res.json(wrapRes(1,"成功",users,pageable));
})
router.get("/testGetLogin",function(req,res){
  req.session.userInfo = {
    username:req.query.username
  };
  res.json(wrapRes(1,"成功",req.query));
})
router.get("/testGetLogout",function(req,res){
  req.session.userInfo = null;
  res.json(wrapRes(1,"退出成功",req.query));
})


module.exports = router
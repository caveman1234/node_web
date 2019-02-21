var express = require('express');
var { wrapRes } = require("../../../src/utils/index");
var userDb = require("../../../src/db/user/index");

var router = express.Router();

router.post('/user/create',async function(req, res) {
  try{
    var {username,password,realname,telphone,studentNumber} = req.body;
    var count = await userDb.findUserCountByName(username);
    if(count > 0) throw new Error("用户已存在");

    var allUsers = await userDb.createUser({
      username:username,
      password:password,
      realname:realname,
      telphone:telphone,
      studentNumber:studentNumber
    }); 
    res.json(wrapRes(1,"成功",allUsers));
  }catch(e){
    res.json(wrapRes(2,e.message,null));
    return;
  }
  
});
router.post("/user/login",async function(req,res){
  try{
    var {username,password} = req.body;
    if(!username || !password) throw new Error("用户名密码不能为空");
    var count = await userDb.findUserCountByName(username);
    if(count === 0) throw new Error("用户不存在");
    var users = await userDb.findUser({username,password});
    if(users.length === 0) throw new Error("用户名/密码不正确");
    req.session.userInfo = {
      username:users[0].username,
      password:users[0].password,
      userId:users[0].id,
      role:users[0].role,
      studentNumber:users[0].studentNumber,
      telphone:users[0].telphone,
      realname:users[0].realname,
    };
    res.cookie('username', users[0].username, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true });
    res.cookie('userId', users[0].id, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true });
    res.cookie('role', users[0].role, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true });
    res.cookie('studentNumber', users[0].studentNumber, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true });
    res.cookie('telphone', users[0].telphone, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true });
    res.json(wrapRes(1,"成功",req.session.userInfo));
  }catch(e){
    res.json(wrapRes(2,e.message,null));
    return;
  }
});
router.get("/user/logout",async function(req,res){
  try{
    req.session.userInfo = null;
    res.clearCookie("username");
    res.clearCookie("userId");
    res.clearCookie("role");
    res.json(wrapRes(1,"成功",null));
  }catch(e){
    res.json(wrapRes(2,e.message,null));
    return;
  }
});
router.get("/user/resetPassword",async function(req,res){
  try{
    var id = req.query.userId;
    if(!id) throw new Error("id不能为空");
    var result = await userDb.resetPassword(id);
    res.json(wrapRes(1,"成功",null));
  }catch(e){
    res.json(wrapRes(2,e.message,null));
    return;
  }
});
router.get("/user/list",async function(req,res){
  try{
    var page = parseInt(req.query.page) || 0;
    var size = parseInt(req.query.size) || 10;
    var params = {limit:size,offset:size * page};
    var {users,count} = await userDb.findAllUser(params);
    var totalPages = Math.ceil(count/size);
    var pageable = {page,size,count,totalPages};
    res.json(wrapRes(1,"成功",users,pageable));
  }catch(e){
    res.json(wrapRes(2,e.message,null));
    return;
  }
});








module.exports = router
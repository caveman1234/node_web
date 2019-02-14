var express = require("express");
var path = require("path");

var userRouter = require("./user/index");
var testRouter = require("./test/index");
var bodyParser = require("body-parser");
var multipart = require("connect-multiparty");
var session = require('express-session');

var { wrapRes } = require("../utils/index");


var sessionMiddleWare = function(req,res,next) {
  var userInfo = req.session.userInfo;
  var notValidateSessionPath = ["/test/testGetLogin","/test/testGetLogout"];
  if(userInfo){
    next();
  }else{
    if(notValidateSessionPath.includes(req.path)){
      next();
    }else{
      res.json(wrapRes(10,"未登录",{}));
    }
  }
}

var handleMiddleWare = function(app) {
  app.use("/",express.static(path.resolve(__dirname,"../../webapp")));
  app.use(session({ secret: 'dfsdfsdfs', cookie: { maxAge: 1000 * 60 * 10 }}));
  // app.use(session({ secret: 'dfsdfsdfs', cookie: { maxAge: 1000 }}));
  app.use(sessionMiddleWare);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(multipart());
  app.use("/user",userRouter);
  app.use("/test",testRouter);
}

module.exports = handleMiddleWare;
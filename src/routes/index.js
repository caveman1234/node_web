var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var multipart = require("connect-multiparty");
var session = require('express-session');
var { wrapRes } = require("../utils/index");
var testRouter = require("./test/index");
var userRouter = require("./user/index");
var placeRouter = require("./place/index");
var noticeRouter = require("./notice/index");
var projectName = "/node-web";

var sessionMiddleWare = function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  // next();
  // return;
  var userInfo = req.session.userInfo;
  var notValidateSessionPath = ["/node-web/user/create","/node-web/user/logout","/node-web/user/login"];
  if(userInfo){
    next();
  }else{
    if(notValidateSessionPath.includes(req.path)){
      next();
    }else{
      res.json(wrapRes(10,"未登录",null));
    }
  }
}

var handleMiddleWare = function(app) {
  app.use("/",express.static(path.resolve(__dirname,"../../webapp")));
  app.use(session({ secret: 'dfsdfsdfs', cookie: { maxAge: 1000 * 60 * 60 * 2 }}));
  app.use(sessionMiddleWare);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(multipart());
  app.use(projectName,userRouter);
  app.use(projectName,testRouter);
  app.use(projectName,placeRouter);
  app.use(projectName,noticeRouter);
}

module.exports = handleMiddleWare;
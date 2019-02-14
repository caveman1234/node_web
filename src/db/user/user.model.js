var Sequelize = require("sequelize");
var BaseModel = require("../base/model");
var Model = {
  username: {
    type: Sequelize.STRING,
    validate:{
      notEmpty:{
        args:true,
        msg:"用户名不能为空"
      }
    }
  },
  password: {
    type:Sequelize.STRING,
    validate:{
      is: {
        args:/^[a-z]\w{5,20}/i,
        msg:"密码必须以字母开始，且至少6-20位"
      },  
    },
  },
  role:{
    type:Sequelize.ENUM("1","2"),
    defaultValue:"2"
  }
};


module.exports = {
  ...Model,
  ...BaseModel
};
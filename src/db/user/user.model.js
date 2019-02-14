var Sequelize = require("sequelize");
var BaseModel = require("../base/model");
var Model = {
  username: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  password: {
    type:Sequelize.STRING,
    defaultValue: null,
    validate:{
      is: {
        args:/^[a-z]\w{5,20}/i,
        msg:"密码必须以字母开始，且至少6-20位"
      }
    },
  },
  role:{
    type:Sequelize.ENUM("1","2"),
    defaultValue:"2"
  }
};
var validate = {
  validate:{
    notNullOrEmpty() {
      if(!this.username) throw new Error('用户名不能为空');
      if(!this.password) throw new Error('密码不能为空');
    }
  }
}

module.exports = [
  {
    ...Model,
    ...BaseModel
  },
  validate
];
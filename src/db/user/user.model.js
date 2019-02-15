var Sequelize = require("sequelize");
var BaseModel = require("../base/model");
var {isEmpty} = require("../../utils/index");
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
  },
  realname: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  telphone: {
    type: Sequelize.STRING,
    defaultValue: null,
    validate:{
      is: {
        args:/^\d{11}$/i,
        msg:"手机号码不正确"
      }
    },
  },
  studentNumber: {
    type: Sequelize.STRING,
    defaultValue: null
  },
};
var validate = {
  validate:{
    notNullOrEmpty() {
      if(isEmpty(this.username)) throw new Error('用户名不能为空');
      if(isEmpty(this.password)) throw new Error('密码不能为空');
      if(isEmpty(this.realname)) throw new Error('真实姓名不能为空');
      if(isEmpty(this.telphone)) throw new Error('电话不能为空');
      if(isEmpty(this.studentNumber)) throw new Error('学号不能为空');
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
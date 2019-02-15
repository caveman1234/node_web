var Sequelize = require("sequelize");
var BaseModel = require("../base/model");
var {isEmpty} = require("../../utils/index");
var Model = {
  userId: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  realname: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  telphone: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  studentNumber: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  placeCode:{
    type:Sequelize.STRING,
    defaultValue:null
  },
  placeAddress:{
    type:Sequelize.STRING,
    defaultValue:null
  },
  placeType:{
    type: Sequelize.STRING,
    defaultValue: null
  },
  startDateTime:{
    type:Sequelize.DATE,
    defaultValue:null,
    get(){
      var dateTime = this.getDataValue("startDateTime");
      return dateTime ? dateTime.getTime() : null;
    }
  },
  endDateTime:{
    type:Sequelize.DATE,
    defaultValue:null,
    get(){
      var dateTime = this.getDataValue("endDateTime");
      return dateTime ? dateTime.getTime() : null;
    }
  },
};
var validate = {
  validate:{
    notNullOrEmpty() {
      // if(isEmpty(this.placeCode)) throw new Error("场地编码不能为空");
      // if(isEmpty(this.placeAddress)) throw new Error("场地地址不能为空");
      // if(isEmpty(this.placeType)) throw new Error("场地类型不能为空");
      // if(isEmpty(this.startDateTime)) throw new Error("开始时间不能为空");
      // if(isEmpty(this.endDateTime)) throw new Error("结束时间不能为空");
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
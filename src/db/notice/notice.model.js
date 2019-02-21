var Sequelize = require("sequelize");
var BaseModel = require("../base/model");
var {isEmpty} = require("../../utils/index");
var Model ={
    noticeCode:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    noticeTitle:{
        type: Sequelize.STRING,
        defaultValue: null,
    },
    noticeContent:{
        type: Sequelize.STRING,
        defaultValue: null,
    },
    userId:{
        type: Sequelize.STRING,
        defaultValue: null,
    },
    username:{
        type: Sequelize.STRING,
        defaultValue: null,
    },
    realname:{
        type: Sequelize.STRING,
        defaultValue: null,
    },
    telphone:{
        type: Sequelize.STRING,
        defaultValue: null,
    },
}
var validate = {
    validate:{
      
    }
}
module.exports = [
  {
    ...Model,
    ...BaseModel
  },
  validate
];
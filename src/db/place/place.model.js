var Sequelize = require("sequelize");
var BaseModel = require("../base/model");
var {isEmpty} = require("../../utils/index");
var Model = {
  placeCode: {
    type: Sequelize.STRING,
    defaultValue: null,
    unique:true
  },
  placeAddress: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  placeType:{
    type: Sequelize.STRING,
    defaultValue: null
  }
};
var validate = {
  validate:{
    notNullOrEmpty() {
      
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
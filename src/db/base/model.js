var Sequelize = require("sequelize");

var BaseModel = {
  id: {
    type: Sequelize.STRING,
    defaultValue:Sequelize.UUIDV1,
    primaryKey:true
  },
  updatedAt : {
    type:Sequelize.DATE,
    get(){
      return (this.getDataValue("updatedAt") || new Date()).getTime();
    }
  },
  createdAt : {
    type:Sequelize.DATE,
    get(){
      return (this.getDataValue("createdAt") || new Date()).getTime();
    }
  },
  dr:{
    type:Sequelize.ENUM(["0","1"]),
    defaultValue:"1"
  }
}

module.exports = BaseModel;
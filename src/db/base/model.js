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
      return this.getDataValue("updatedAt").getTime();
    }
  },
  createdAt : {
    type:Sequelize.DATE,
    get(){
      return this.getDataValue("createdAt").getTime();
    }
  }
}

module.exports = BaseModel;
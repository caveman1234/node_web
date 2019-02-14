var sequelize = require("../connection");
var userModel = require("./user.model");





var User = sequelize.define("user",userModel);

module.exports = {
  User
}
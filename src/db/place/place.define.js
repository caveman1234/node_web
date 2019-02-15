var sequelize = require("../connection");
var model = require("./place.model");





var Place = sequelize.define("place",...model);

module.exports = {
  Place
}
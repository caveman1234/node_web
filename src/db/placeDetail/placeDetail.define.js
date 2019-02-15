var sequelize = require("../connection");
var model = require("./placeDetail.model");





var PlaceDetail = sequelize.define("placeDetail",...model);

module.exports = {
  PlaceDetail
}
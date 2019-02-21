var sequelize = require("../connection");
var model = require("./notice.model");





var Notice = sequelize.define("notice",...model);

module.exports = {
    Notice
}
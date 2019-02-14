var devConfig = require("./application.properties.dev");
var proConfig = require("./application.properties.pro");
var NODE_EVN = process.env.NODE_ENV;

var config = NODE_EVN === "development" ? devConfig : proConfig;

module.exports = config;

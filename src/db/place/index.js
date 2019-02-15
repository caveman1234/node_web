var Sequelize = require("sequelize")
var { Place } = require("./user.define");
var { genPage } = require("../../utils/index");

var Op = Sequelize.Op;

var dbAccess = {
  async findAll(params){
    var {count} = await Place.findAndCount();
    var places = await Place.findAll({
      limit:params.limit,
      offset:params.offset,
      order:[
        ["createdAt","DESC"]
      ],
      // attributes:[]
      // attributes:{exclude:["password"]}
    });
    return {count,places}
  }
};

module.exports = dbAccess;
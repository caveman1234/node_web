var { User } = require("./user.define");
var { genPage } = require("../../utils/index");



var dbAccess = {
  async findAllUser (params){
    var {count} = await User.findAndCount();
    var users = await User.findAll({
      limit:params.limit,
      offset:params.offset,
      order:[
        ["createdAt","DESC"]
      ]
    });
    return {count,users}
  },
  async createUser(data){
    return User.create(data);
  }
};

module.exports = dbAccess;
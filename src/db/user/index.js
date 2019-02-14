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
  },
  async findUserCountByName(username){
    var {count} = await User.findAndCount({
      where:{
        username:username
      }
    });
    return count;
  },
  async findUser(params){
    var {username,password} = params;
    var users = await User.findAll({
      where:{username,password}
    });
    return users;
  }
};

module.exports = dbAccess;
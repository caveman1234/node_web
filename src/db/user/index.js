var Sequelize = require("sequelize")
var { User } = require("./user.define");
var { genPage } = require("../../utils/index");

var Op = Sequelize.Op;

var dbAccess = {
  async findAllUser (params){
    var {count} = await User.findAndCount();
    var users = await User.findAll({
      limit:params.limit,
      offset:params.offset,
      order:[
        ["createdAt","DESC"]
      ],
      // attributes:[["id","userId"]]
      attributes:{exclude:["password"]}
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
  },
  async resetPassword(id){
    var users = await User.findAll({where:{id}});
    if(users.length === 0) throw new Error("无此用户");
    if(users[0].role === "2") throw new Error("只有管理员才能重置密码");
    return await User.update({ password:"a12345" },{ where:{id} });
  }
};

module.exports = dbAccess;
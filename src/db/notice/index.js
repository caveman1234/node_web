var Sequelize = require("sequelize")
var { notice } = require("./notice.define");
var { genPage } = require("../../utils/index");

var Op = Sequelize.Op;

var dbAccess = {
    async create(params){
        return await NoticeDetail.create(params);
    },
    async findAllPlace(){
        return await Notice.findAll({where:{dr:"1"}});
    },
    async findByNoticeTitle(noticeTitle){
        return await NoticeDetail.findAll({
          where:{
            noticeTitle:noticeTitle,
            dr:"1"
          }
        });
      },
}
module.exports = dbAccess;

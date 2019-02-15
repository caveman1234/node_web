var Sequelize = require("sequelize")
var { PlaceDetail } = require("./placeDetail.define");
var {Place} = require("../place/place.define");
var { genPage } = require("../../utils/index");

var Op = Sequelize.Op;

var dbAccess = {
  async findAllPlace(){
    return await Place.findAll({where:{dr:"1"}});
  },
  async findAllPlaceByUserId(userId){
    return await PlaceDetail.findAll({where:{dr:"1",userId}});
  },
  async create(params){
    return await PlaceDetail.create(params);
  },
  async deleteById(params){
    var id = params.placeDetailId;
    var userId = params.userId;
    return await PlaceDetail.update({dr:"0"},{where:{id,userId}});
  },
  async findByPlaceCode(placeCode){
    return await PlaceDetail.findAll({
      where:{
        placeCode:placeCode,
        dr:"1"
      }
    });
  },
  async findCountByDateTime({startDateTime,endDateTime}){
    var recodes = await PlaceDetail.findAndCount({
      where:{
        startDateTime:{
          [Op.between]:[new Date(startDateTime),new Date(endDateTime)],
        },
        dr:"1"
      }
    });
    return recodes;
  }
};

module.exports = dbAccess;
var { Place } = require("./place.define");

var initialData = [
  { placeCode:"01",placeType:"1",placeAddress:"场地1" },
  { placeCode:"02",placeType:"1",placeAddress:"场地2" },
  { placeCode:"03",placeType:"1",placeAddress:"场地3" },
  { placeCode:"04",placeType:"1",placeAddress:"场地4" },
  { placeCode:"05",placeType:"1",placeAddress:"场地5" },
  { placeCode:"06",placeType:"2",placeAddress:"场地6" },
  { placeCode:"07",placeType:"2",placeAddress:"场地7" },
  { placeCode:"08",placeType:"2",placeAddress:"场地8" },
  { placeCode:"09",placeType:"2",placeAddress:"场地9" },
  { placeCode:"10",placeType:"2",placeAddress:"场地10" },
];
var fn = async () => {
  await Place.sync({force:true});
  //await Place.sync({alter:true});
  await Place.truncate({force:true});
  
  await Place.bulkCreate(initialData);
}
fn();











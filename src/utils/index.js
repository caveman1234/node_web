var setEnv = function() {
  var argv = process.argv.slice(2);
  process.env.NODE_ENV = argv[0] || "development";
}
setEnv();

var wrapRes = function(status,message,data,pageable={}) {
  //status 1->"操作成功" | 2->"业务错误" 10->"登录失效"
  return {status,message,data,...pageable}
};

var genPage = function(pageInfo = {page:0,size:2}) {
  var pageQueryParams  = {
    limit:parseInt(pageInfo.size),
    offset:parseInt(pageInfo.page * pageInfo.size)
  };
  return pageQueryParams;
}

var isEmpty = function(value){
  if(value === undefined || value === null || value === ""){
    return true;
  }else{
    return false;
  }
}

module.exports={
  wrapRes,
  genPage,
  isEmpty
}

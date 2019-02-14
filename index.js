var express = require("express");
var handleMiddleWare = require("./src/routes/index");

var app = express();
handleMiddleWare(app);

app.listen(8899);




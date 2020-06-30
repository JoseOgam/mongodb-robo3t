var express = require("express");
require("./db/mongoose");
var User = require("./models/users");
var Task = require("./models/task");

var app = express();
var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});

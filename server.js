// var express = require('express');
// var app = express();
// 
// app.use(function(req, res, next) {
//   console.log(`${req.method} request for ${req.url}`);
//   next();
// });
// 
// app.use(express.static('time.html'));
// 
// app.listen(3000);
// 
// console.log("Express app running on port 3000");
// 
// module.exports = app;

var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/public/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "time.html");
});

app.use("/",router);
app.use(express.static(__dirname + '/public'));

// app.use("*",function(req,res){
//   res.sendFile(path + "404.html");
// });

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
// app.listen(3000,function(){
//   console.log("Live at Port 3000");
// });

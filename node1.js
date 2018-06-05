var express = require("express");
var fs = require("fs");

var app = express();
app.get('/readfile',function(req,res){

var data = fs.readFileSync("helo.txt")
res.send(data.toString())
})
app.listen(2222,function(){
    console.log("hello")
})
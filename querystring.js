const express = require("express");
const app = express();  
app.get("/", function(req, res){
const query = req.query;
res.send(query);
res.end();       
}).listen(7000);

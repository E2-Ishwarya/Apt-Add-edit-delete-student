var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/cal.html'); //Gets the html
});
app.post('/submission', function(req, res) {
    var first = parseInt(req.body.firstNumber);
   var second = parseInt(req.body.lastNumber);
    var sum = first + second;
     res.send('The sum is: ' + sum);
     res.end();
    });
app.listen(8060);

var express = require('express');
var app = express();
app.use(express.json());
const employee = require('./employee');
const manager = require('./manager');
app.use('/employee',employee);
app.use('/manager',manager);
app.listen(8088);

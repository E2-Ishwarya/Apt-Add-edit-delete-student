var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'customer'
});
con.connect(function (err) {
    if (err) { console.log("error"); }
    else console.log("connection success");  
});
module.exports = con;
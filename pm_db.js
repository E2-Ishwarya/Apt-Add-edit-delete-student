var mysql = require('mysql');
var express = require('express');
var app = express();
app.use(express.json());
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'customer'
});
con.connect(function (err) {
    if (err) { console.log("error"); }
    else console.log("connection success");
    app.get('/get', function (req, res) {
        con.query("select * from cust", function (err, data) {
            if (err) { console.log("error"); }
            else
                console.log(data);
            res.send(data);
        });
    });
        app.post('/get', function (req, res) {
            var sql = "insert into cust SET ?";
            let post = {
                cust_id: req.body.cust_id,
                cust_name: req.body.cust_name
            }
            con.query(sql, post, function (err, data) {
                if (err) throw err;
                console.log('data inserted successfully!!!');
                res.send(data);
            });
        });
        app.put('/get', function (req, res) {
            cust_id = req.body.cust_id;
            cust_name = req.body.cust_name;
            con.query("update cust set cust_name = ?WHERE cust_id = ?", [cust_name, cust_id], function (err, data) {
                if (err) throw err;
                console.log('data updated successfully!!!');
                res.send(data);
            });
        });
        app.delete('/get', function (req, res) {
            cust_id = req.body.cust_id;
            con.query("delete from cust where cust_id = ?", [cust_id], function (error, data) {
                if (error) throw error;
                res.send(data);
                console.log('data deleted successfully!!!');
            });
        });
    
});
app.listen(8065);
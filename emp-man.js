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
    app.get('/employee', function (req, res) {
        con.query("select * from employee", function (err, employee) {
            if (err) {
                console.log("error");
            }
            res.send(employee);
        });

    });
    app.get('/manager', function (req, res) {
        con.query("select * from manager", function (err, manager) {
            if (err) {
                console.log("error");
            }
            res.send(manager);
        });
    });
    app.post('/employee', function (req, res) {
        var sql1 = "insert into employee SET ?";
        let post = {
            name: req.body.name,
            place: req.body.place
        }
        con.query(sql1, post, function (err, employee) {
            if (err) throw err;
            res.send(employee);
            console.log(employee);
        });
    });
    app.post('/manager', function (req, res) {
        var sql2 = "insert into manager SET ?";
        let post = {
            name: req.body.name,
            place: req.body.place
        }
        con.query(sql2, post, function (err, manager) {
            if (err) throw err;
            res.send(manager);
            console.log(manager);
        });
    });
    app.put('/employee', function (req, res) {
        var name = req.body.name;
        var place = req.body.place;
        emp_id = req.body.emp_id;
        con.query("update employee set name = ?,place = ? WHERE emp_id  = ?", [name,place,emp_id], function (err, data) {
            if (err) throw err;
            console.log('data updated successfully!!!');
            res.send(data);
        });
    });
    app.put('/manager', function (req, res) {
        var name = req.body.name;
        var place = req.body.place;
        manager_id = req.body.manager_id;
        con.query("update manager set name = ?,place = ? WHERE manager_id  = ?", [name,place,manager_id], function (err, data) {
            if (err) throw err;
            console.log('data updated successfully!!!');
            res.send(data);
        });
    });
    app.delete('/employee', function (req, res) {
        emp_id = req.body.emp_id;
        con.query("delete from employee where emp_id = ?", [emp_id], function (error, data) {
            if (error) throw error;
            res.send(data);
            console.log('data deleted successfully!!!');
        });
    });
    app.delete('/manager', function (req, res) {
        manager_id = req.body.manager_id;
        con.query("delete from manager where manager_id = ?", [manager_id], function (error, data) {
            if (error) throw error;
            res.send(data);
            console.log('data deleted successfully!!!');
        });
    });

}); app.listen(8095);

var express = require('express');
var router = express.Router();
var con = require('./con.js');
router.get('/', function (req, res) {
    con.query("select * from employee", function (err, employee) {
        if (err) {
            console.log("error");
        }
        res.send(employee);
    });

});
router.post('/', function (req, res) {
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
router.put('/', function (req, res) {
    var name = req.body.name;
    var place = req.body.place;
    emp_id = req.body.emp_id;
    con.query("update employee set name = ?,place = ? WHERE emp_id  = ?", [name, place, emp_id], function (err, data) {
        if (err) throw err;
        console.log('data updated successfully!!!');
        res.send(data);
    });
});
router.delete('/', function (req, res) {
    emp_id = req.body.emp_id;
    con.query("delete from employee where emp_id = ?", [emp_id], function (error, data) {
        if (error) throw error;
        res.send(data);
        console.log('data deleted successfully!!!');
    });
});
module.exports = router;
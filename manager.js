var express = require('express');
var router = express.Router();
var con = require('./con.js');
router.get('/', function (req, res) {
    con.query("select * from manager", function (err, manager) {
        if (err) {
            console.log("error");
        }
        res.send(manager);
    });
});
router.post('/', function (req, res) {
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
router.put('/', function (req, res) {
    var name = req.body.name;
    var place = req.body.place;
    manager_id = req.body.manager_id;
    con.query("update manager set name = ?,place = ? WHERE manager_id  = ?", [name,place,manager_id], function (err, data) {
        if (err) throw err;
        console.log('data updated successfully!!!');
        res.send(data);
    });
});
router.delete('/', function (req, res) {
    manager_id = req.body.manager_id;
    con.query("delete from manager where manager_id = ?", [manager_id], function (error, data) {
        if (error) throw error;
        res.send(data);
        console.log('data deleted successfully!!!');
    });
});
module.exports = router;
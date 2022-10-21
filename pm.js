const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());;
app.get('/det', (req, res) => {
    fs.readFile('data1.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
    
});
app.post('/det', function (req, res) {
    fs.readFile("./data1.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push(req.body);
        console.log(data);
        res.end(JSON.stringify(data));
    fs.writeFile("./data1.json", JSON.stringify(data,null,2), (err) => {
        console.log("New data added");
    });
});
});

app.put('/det/:id', function (req, res) {
    fs.readFile("./data1.json", 'utf8', function (err, data) {
        const id = req.params.id;
        const updated = req.body;
        data[id] = updated;
        res.send(JSON.stringify(updated));
        fs.writeFile("./data2.json", JSON.stringify(data,null,2), (err) => {
            console.log("updated");
        });
    });
});
app.delete('/det/:id', function (req, res) {
    fs.readFile("./data1.json", 'utf8', function (err, data) {
        const id = req.params.id;
        delete data[id];
        res.send(id);
        fs.writeFile("./data1.json", JSON.stringify(data,null,2), (err) => {
            console.log("deleted");
        });
    });
    });
app.listen(8070);
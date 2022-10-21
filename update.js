const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
app.put('/det', function (req, res) {
    fs.readFile("./data1.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        console.log(data);
        const id = req.body.id;
        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                const updated = req.body;
                data[id] = updated;
            }
            else
                console.log("error");
        }
        fs.writeFile("./data1.json", JSON.stringify((data), null, 2), (err) => {
            console.log(data);
            console.log("updated");
            res.send(JSON.stringify(updated));
        });
    });
});
app.listen(8066);
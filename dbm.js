const fs = require('fs');
fs.readFile('./data2.json', 'utf8', (err, data) => {
    if (err) {
        console.log("error");
    } else {
        var data = JSON.parse(data);
        console.log(data);
    }
    let newData ={"id": 5, "name": "uvw"};
    data.push(newData);
    var newData2 = JSON.stringify(data, null, 2);
    fs.writeFile("data2.json", newData2, (err) => {
        if (err)
        console.log("err");
        console.log("New data added");
        console.log(newData2);
      //delete
        delete data[0];
        fs.writeFile("data2.json",JSON.stringify(data, null, 2), (err) => {
            if (err)
            console.log("err");
        console.log(data);
        });
    });
});


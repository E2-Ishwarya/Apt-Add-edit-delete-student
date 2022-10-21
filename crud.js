const express = require('express');
const app = express();
const details=[
    { name:'abc', age:17},
    {name:'xyz', age:18},
    {name:'uvw', age:19}
];
app.use(express.json());
app.get('/det', function(req, res){
    res.send(details);
})
app.get('/det/:id', function(req, res){
    const id=req.params.id;
    res.send(details[id]);
});
app.post('/det', function(req, res){
   const det=req.body;
   details.push(det);
   res.send(details);
})
app.put('/det/:id', function(req, res){
    const id =req.params.id;
    const updated=req.body;
    details[id]=updated;
    res.send(updated);
})
app.delete('/det/:id', function(req, res){
    const id =req.params.id;
     details.splice(id,1);
    res.send(id);
})
app.listen(3000);

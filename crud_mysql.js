var mysql= require('mysql');
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database: 'customer'
});
const value=process.argv;
con.connect()
{
 if(value[2]=='insert'){
    var sql="insert into cust(cust_id,cust_name) values(value[3],value[4])";
    con.query(sql,function(err,data){
        console.log(value[3]);
        console.log(value[4]);
        if(err) { console.log("error");   }
        else
        console.log(data);    });

}
else if(value[2]=='read')
{
    con.query("select * from cust",function(err,data){
        if(err) { console.log("error");   }
        else
        console.log(data);
      });
}
else if(value[2]=='update')
{
    con.query("update cust set cust_name='kennechi' where cust_id=4",function(err,data){
        if(err) { console.log("error");   }
        else
        console.log("table updated");
    });
}
else if(value[2]=='delete'){
    con.query("delete from cust where cust_id=2",function(err,data){
        if(err) { console.log("error");   }
        else
        console.log("deleted");
      });
}
}
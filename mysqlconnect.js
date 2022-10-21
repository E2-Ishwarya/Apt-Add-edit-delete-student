var mysql= require('mysql');
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database: 'customer'
});
con.connect(function(err)
{
    if(err) {  console.log("error");    }
    else console.log("success");
    /*con.query("create database customer ",function(err,data){
    if(err){    console.log("error");  }
    else
    console.log("databasae created");
});
  con.query("create table cust(cust_id int ,cust_name varchar(20))",function(err,data){
    if(err) { console.log("error");   }
    else
    console.log("table created");
  });
  var insert="insert into cust values?";
  var values=[
    [5,'hattori'],
    [6,'nobita'],
    [7,'patlu']
  ];
   con.query(insert,[values],function(err,data){
    if(err) { console.log("error");   }
    else
    console.log("Multiple values inserted");
  });
    con.query("update cust set cust_name='keo' where cust_id=4",function(err,data){
    if(err) { console.log("error");   }
    else
    console.log("table updated");
  });*/
  con.query("select * from cust",function(err,data){
    if(err) { console.log("error");   }
    else
    console.log(data);
  });
  con.query("select * from cust where cust_id=1",function(err,data){
    if(err) { console.log("error");   }
    else
    console.log(data);
  });
  con.query("select * from cust order by cust_id desc",function(err,data){
    if(err) { console.log("error");   }
    else
    console.log(data);
  });
  con.query("delete from cust where cust_id=2",function(err,data){
    if(err) { console.log("error");   }
    else
    console.log("deleted");
  });
});
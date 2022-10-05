var AWS = require("aws-sdk");

AWS.config.update(global.DynamoDBAccessToken);

var docClient = new AWS.DynamoDB.DocumentClient();
function itemsDao() {
}
itemsDao.getItems = function (callback) {
  console.log("entered1FGH");
var params = {
  TableName: 'NodeJS-Items'
};
docClient.scan(params, function(err, data) {
  if (err) {
    console.log("Error", err);
    callback(err, null)
  } else {
    
    console.log("Success", data);
    console.log(data)
    callback(null, data)
  }
});
}

itemsDao.addItems = function (data,callback) {  
  var params = {
    TableName: 'NodeJS-Items',
    Item: data
  };
  console.log("Adding a new item...");
  docClient.put(params, function (err, data) {
    if (err) {
        callback(err, null)
    } else {
        callback(null, data)
    }
});
  }
  itemsDao.updateItems = function (data, callback) {
    if (data != null) {
        var params = {
          TableName: 'NodeJS-Items',
            Item: data
        }
        docClient.put(params, function (err, data) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        });
    }

}
itemsDao.deleteItems = function (data, callback) {
  console.log("ffffffffkjgnj",data);
  var params = {
    TableName: 'NodeJS-Items',
    Key:{
        "item_id": data.item_id
    }
  };
  docClient.delete(params, function (err, data) {
      if (err) {
        console.log("error", err);
        callback(err, null)
      } else {
        console.log("deleted", data);
        callback(null, data);
      }
  });
}
itemsDao.getCategory1 = function(callback) {
var params = {
      TableName: 'NodeJS-Items',
};
var items = [];
items = items.concat(data.Items);
  docClient.scan(params, onScan);   

  function onScan(err, data) {
      if (err) {
          callback(err, null)
      } else {
        items = items.concat(data.Items);
        console.log(data.Items);
        var data = {
            "Items" : items,
            "Count" : items.length
        };
              callback(null, data);
              console.log(data);
          }
      }
  }




module.exports = itemsDao;
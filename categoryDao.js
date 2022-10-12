var AWS = require("aws-sdk");

AWS.config.update(global.DynamoDBAccessToken);

var docClient = new AWS.DynamoDB.DocumentClient();
function categoryDao() {
}
categoryDao.getCategory = function (callback) {
  console.log("entered1FGH");
var params = {
  TableName: 'NodeJS-Category'
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

/*categoryDao.getImage= function (callback) {
  var params = {
    TableName: 'NodeJS-Category'
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
  }*/

categoryDao.addCategory = function (data,callback) {  
  var params = {
    TableName: 'NodeJS-Category',
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
  categoryDao.updateCategory = function (data, callback) {
    if (data != null) {
        var params = {
          TableName: 'NodeJS-Category',
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
categoryDao.deleteCategory = function (data, callback) {
  console.log("ffffffffkjgnj",data);
  var params = {
    TableName: 'NodeJS-Category',
    Key:{
        "category_id": data.category_id
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

/*categoryDao.uploadInformation = function (data, callback) {
  if (data != null) {
    var params = {
      TableName: 'NodeJS-Category',
      Item: data
    };
    console.log("yes",data.categoryImage)  
      docClient.put(params, function (err, data) {
          if (err) {
              callback(err, null)
          } else {
              callback(null, data)
          }
      });
  }

}
/*categoryDao.getCategory1 = function(callback) {
  var params = {
        TableName: 'NodeJS-Category',
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
  */
  


module.exports = categoryDao;
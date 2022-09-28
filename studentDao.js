var AWS = require("aws-sdk");

AWS.config.update(global.DynamoDBAccessToken);

var docClient = new AWS.DynamoDB.DocumentClient();
function studentDao() {
}
studentDao.getStudents = function (callback) {
  console.log("entered1");
var params = {
  TableName: 'NodeJS-Dev'
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

studentDao.AddStudents = function (data,callback) {
  
    console.log('success1')
    console.log('success2')
   
  var params = {
    TableName: 'NodeJS-Dev',
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
  studentDao.updateStudents = function (data, callback) {
    if (data != null) {
        var params = {
          TableName: 'NodeJS-Dev',
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
studentDao.deleteStudents = function (data, callback) {
  console.log("ffffffffkjgnj",data);
  var params = {
    TableName: 'NodeJS-Dev',
    Key:{
        "studentId": data.studentId
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
  


module.exports = studentDao;
var AWS = require("aws-sdk");

AWS.config.update(global.DynamoDBAccessToken);

var docClient = new AWS.DynamoDB.DocumentClient();
function userDao() {

}
userDao.getUsersList=function(callback){
    var table = global.UserTbl;
    var params = {
        TableName: table
    };
    var items = [];
    docClient.scan(params, onScan);   

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(err, null)
        } else {
            if (typeof data.LastEvaluatedKey != "undefined") {
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                items = items.concat(data.Items);
                docClient.scan(params, onScan);
            } else {
                items = items.concat(data.Items);
                var data = {
                    "Items" : items,
                    "Count" : items.length
                };
                callback(null, data);
            }
        }
    }
}


userDao.fetchUser = function (username, callback) {
    var table = global.LoginTbl;
    var params = {
        TableName: table,
        KeyConditionExpression: "#uname = :usrname",
        ExpressionAttributeNames: {
            "#uname": "userName"
        },
        ExpressionAttributeValues: {
            ":usrname": username
        }
    };

    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(err, null)
        } else {
            callback(null, data);
        }
    });
}

userDao.AddNewUser = function (data, callback) {
    var table = global.UserTbl;
    if (data != null) {
        var params = {
            TableName: table,
            Item: data
        }
        console.log("Adding a new item...");
        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                callback(err, null)
            } else {
                callback(null, data)
            }
        });
    }

}

userDao.updateresetToken = function (username,communityId, token, callback) {

    if (username != null && token != null) {
        var params = {
            TableName: global.LoginTbl,
            Key: {
                "userName": username,
                "communityId": communityId
            },
            UpdateExpression: "SET resetToken = :resetToken",
            ExpressionAttributeValues: {
                ":resetToken": token
            }
        };
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable resetToken for change password. Error JSON:", JSON.stringify(err, null, 2));
                callback(true, null)
            } else {
                callback(null, data)
            }
        });
    }
    else {
        callback(true, null)
    }
}

userDao.updateresetUserToken = function (username, token, callback) {
    if (username != null && token != null) {
        var params = {
            TableName: global.ReportLoginTbl,
            Key: {
                "userName": username,
            },
            UpdateExpression: "SET resetToken = :resetToken",
            ExpressionAttributeValues: {
                ":resetToken": token
            }
        };
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable resetToken for change password. Error JSON:", JSON.stringify(err, null, 2));
                callback(true, null)
            } else {
                callback(null, data)
            }
        });
    }
    else {
        callback(true, null)
    }
}

userDao.fetchUserForFirmware = function (firmwareVersion, callback) {
    console.log("firmwareVersion1 "+firmwareVersion);
    var params = {
        TableName: global.UserTbl,
        FilterExpression: "#firmwareVersion = :firmwareVersion",
        ExpressionAttributeNames: {
            "#firmwareVersion": "firmwareVersion"
        },
        ExpressionAttributeValues: {
            ":firmwareVersion": firmwareVersion
        }
    };
    var items = [];
    docClient.scan(params, onScan);   

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(err, null)
        } else {
            if (typeof data.LastEvaluatedKey != "undefined") {
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                items = items.concat(data.Items);
                docClient.scan(params, onScan);
            } else {
                items = items.concat(data.Items);
                var data = {
                    "Items" : items,
                    "Count" : items.length
                };
                callback(null, data);
            }
        }
    }
};

module.exports = userDao

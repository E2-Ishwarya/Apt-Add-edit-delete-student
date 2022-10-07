var AWS = require("aws-sdk");
var firmwareLog = require('../../config/firmwareLog');
var notificationService = require('../../service/notificationService');

AWS.config.update(global.DynamoDBAccessToken);
var docClient = new AWS.DynamoDB.DocumentClient();

function cateUploadDao() {

}

//deleteFirmware
cateUploadDao.deleteFirmware = function(data, username, callback) {
    firmwareLog.log({
		level : 'info',
		message : 'Deleting the firmware.'
    });
	var table = global.FirmwareTbl;
    if (data != null) {
    	var params = {
                TableName: table,
                Key: {
                    firmwareVersion: data.firmwareVersion,
                    createdEpochMs: data.createdEpochMs
                }
        }
        docClient.delete(params, function (err, data) {
            if (err) {
            	firmwareLog.log({
					level: 'error',
					message: "Unable to delete item. Error JSON: "+JSON.stringify(err, null, 2)
				});
                callback(err, null)
            } else {
            	firmwareLog.log({
					level: 'info',
					message: "Deleted firmware"+JSON.stringify(data, null, 2)
				});
                callback(null, data)
            }
        });
    }
}

cateUploadDao.uploadFirmWareInformation = function (data, callback) {
    firmwareLog.log({
		level : 'info',
		message : 'Uploading Firmware. Data : '+JSON.stringify(data)
	});
    var table = global.FirmwareTbl;
    if (data != null) {
        var params = {
            TableName: table,
            Item: data
        }
        docClient.put(params, function (err, data) {
            if (err) {
                firmwareLog.log({
                    level : 'error',
                    message : 'Unable to upload firmware information. Error JSON:'+JSON.stringify(err)
                });
                callback(err, null)
            } else {
                firmwareLog.log({
                    level : 'info',
                    message : 'Uploaded firmware information successfully. JSON:'+JSON.stringify(data)
                });
                callback(null, data)
            }
        });
    }
}

cateUploadDao.getFirmwareList=function(callback){
    firmwareLog.log({
        level : 'info',
        message : 'Getting firmware list.'
    });
    var table = global.FirmwareTbl;
    var params = {
        TableName: table,
        ScanIndexForward: false
    };
    var items = [];
    docClient.scan(params, onScan);   

    function onScan(err, data) {
        if (err) {
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
                firmwareLog.log({
                    level : 'info',
                    message : 'Firmware list fetched successfully.'
                });
                callback(null, data);
            }
        }
    }
}

cateUploadDao.fetchFirmware = function (firmwareVersion,createdEpochMs, callback) {
    firmwareLog.log({
        level : 'info',
        message : 'Fetch Firmware information. FirmwareVersion: '+firmwareVersion+" & createdEpochMs: "+createdEpochMs
    });
    var table = global.FirmwareTbl;
    var params = {
        TableName: table,
        FilterExpression: "attribute_not_exists(deletedEpochMs)",
        KeyConditionExpression: "#firmwareVersion = :firmwareVersion and #createdEpochMs =:createdEpochMs",
        ExpressionAttributeNames: {
            "#firmwareVersion": "firmwareVersion",
            "#createdEpochMs": "createdEpochMs"
        },
        ExpressionAttributeValues: {
            ":firmwareVersion": firmwareVersion,
            ":createdEpochMs":createdEpochMs
        }
    };

    docClient.query(params, function (err, data) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, data);
        }
    });
}
module.exports = cateUploadDao
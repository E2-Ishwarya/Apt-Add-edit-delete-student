var s3 = require('s3');
var fs = require('fs')
var AWS = require("aws-sdk");
var AWSs3 = new AWS.S3({
	options : global.s3AccessToken
});

function s3Updator() {

}

var client = s3.createClient({
    s3Options: global.s3AccessToken
});

s3Updator.firmwareUpload = function (localFilePath, fileName, callback) {
    fs.readFile(localFilePath, (err, data) => {
        if (err) {
            callback(err, null);
        }
        var params = {
            Bucket: global.s3Bucket,
            Key: "firmware/"+fileName, 
            Body: data
        };
        AWSs3.upload(params, function(s3Err, data) {
            if (s3Err) {
                callback(err, null);
            }
            callback(null, "File uploaded successfully");
        });
     });
}

s3Updator.categoryImage = function (localFilePath, fileName, callback) {
   // console.log("entered here ------------"+(localFilePath+fileName));
    var localfilepath = localFilePath + "/" + fileName;
    console.log("entered here ------------"+(localfilepath));
    fs.readFile(localfilepath, (err, data) => {
        if (err) {
            callback(err, null);
        }
        var params = {
            Bucket: global.s3Bucket,
            Key: "testcategory/"+fileName, 
            Body: data
        };
        AWSs3.upload(params, function(s3Err, data) {
            if (s3Err) {
                console.log("error here",s3Err);
                callback(s3Err, null);
            }
            console.log("no error here",data);
            callback(null, data);
        });
     });
}
s3Updator.ImagegetObject = function (fileName, callback) {
    console.log("entered--1");
    var params = {
        Bucket: global.s3Bucket,
        Key: "testcategory/"+fileName, 
    };
    console.log("params entered--1",params);
    AWSs3.getObject(params, function(s3Err, data) {
        if (s3Err) {
            console.log(s3Err);
            callback(s3Err, null);
        }
        console.log(data.Body);
        callback(null, data.Body);
    });
}


s3Updator.getObject = function (fileName, callback) {
    var params = {
        Bucket: global.s3DataLogBucket,
        Key: fileName
    };
    AWSs3.getObject(params, function(s3Err, data) {
        if (s3Err) {
            callback(s3Err, null);
        }
        console.log(data.Body);
        callback(null, data.Body);
    });
}

s3Updator.downloadFile = function (fileName, callback) {
    var localfilepath = localFolderPath + "/" + fileName
    var params = {
        localFile: localfilepath,
        s3Params: {
            Bucket: global.s3DataLogBucket,
            Key: fileName
        }
    }
    var downloader = client.downloadFile(params);
    downloader.on('error', function (err) {
        console.error("unable to download:", err.stack);
        callback(err, null)
    });
    downloader.on('progress', function () {
        console.log("progress", downloader.progressAmount, downloader.progressTotal);
    });
    downloader.on('end', function () {
        console.log("done downloading");
        callback(null, localfilepath)
    });
}

s3Updator.firmwareDelete = function (fileName, callback) {
    var params = {
        Bucket: global.s3Bucket,
        Key: "firmware/"+fileName
    };
    AWSs3.deleteObject(params, function (err, data) {
        if (err) {
            console.log(err, "Firmware delete failed"); 
            callback(err, null);
        }
        else{
            console.log("Firmware deleted from s3");
            callback(null, data);
        }
    });
}

s3Updator.fileUpload = function (localFilePath, fileName, callback) {
    fs.readFile(localFilePath+'/'+fileName, (err, data) => {
        if (err) {
            callback(err, null);
        }
        var params = {
            Bucket: global.s3DataLogBucket,
            Key: fileName, 
            Body: data
        };
        AWSs3.upload(params, function(s3Err, data) {
            if (s3Err) {
                callback(err, null);
            }
            callback(null, data);
        });
     });

}

s3Updator.downloadFirmware = function (fileName, callback) {
    var localfilepath = localFolderPath + "/" + fileName
    var params = {
        localFile: localfilepath,
        s3Params: {
            Bucket: global.s3Bucket,
            Key: "firmware/"+fileName
        }
    }
    var downloader = client.downloadFile(params);
    downloader.on('error', function (err) {
        console.error("unable to download:", err.stack);
        callback(err, null)
    });
    downloader.on('progress', function () {
        console.log("progress", downloader.progressAmount, downloader.progressTotal);
    });
    downloader.on('end', function () {
        console.log("done downloading");
        callback(null, localfilepath)
    });
}

s3Updator.logFileUpload = function ( params, callback) {
    AWSs3.upload(params, function(s3Err, data) {
        if (s3Err) {
            callback(err, null);
        }
        callback(null, "File uploaded successfully");
    });
}

s3Updator.logFileUpload = function (params, callback) {
    AWSs3.upload(params, function(err, data) {
        if (err) {
            callback(err, null);
        }
        callback(null, "File uploaded successfully");
    });
}

s3Updator.logFileUpload = function (params, callback) {
    AWSs3.upload(params, function(err, data) {
        if (err) {
            callback(err, null);
        }
        callback(null, "File uploaded successfully");
    });
}

s3Updator.logFileUpload = function (params, callback) {
    AWSs3.upload(params, function(err, data) {
        if (err) {
            callback(err, null);
        }
        callback(null, "File uploaded successfully");
    });
}

module.exports = s3Updator;
// s3Updator.categoryImage = function (localFilePath, fileName, callback) {
//     console.log("entered here ------------"+(localFilePath+fileName));
//     fs.readFile(localFilePath+'/'+fileName, (err, data) => {
//         if (err) {
//             callback(err, null);
//         }
//         var params = {
//             Bucket: global.s3Bucket,
//             Key: "testcategory/"+fileName, 
//             Body: data
//         };
//         AWSs3.upload(params, function(s3Err, data) {
//             if (s3Err) {
//                 console.log("error here",s3Err);
//                 callback(err, null);
//             }
//             console.log("no error here",data);
//             callback(null, data);
//         });
//      });
// }

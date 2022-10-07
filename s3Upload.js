var s3 = require('s3');
var fs = require('fs')
var AWS = require("aws-sdk");
var AWSs3 = new AWS.S3({
	options : global.s3AccessToken
});

function s3Upload() {

}

var client = s3.createClient({
    s3Options: global.s3AccessToken
});

s3Upload.cateUpload = function (localFilePath, fileName, callback) {
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

module.exports = s3Upload;
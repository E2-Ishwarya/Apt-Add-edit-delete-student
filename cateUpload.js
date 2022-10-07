const cateUploadDao = require('../../dao/dynamoDb/cateUploadDao.js');
var s3Upload = require('../../s3Store/s3Upload.js');

var categoryUpload = {
cateUpload: function (request, response) {
                var currTime = (new Date().getTime());
                var firmwareName = request.body.firmwareName;
                var compatibility = request.body.compatibility;
                var firmwareVersion = request.body.firmwareVersion;
                var localFileName = request.body.filename;
                var fileExtension = localFileName.substring(localFileName.lastIndexOf('.'), localFileName.length);
                var localFilePath = localFolderPath + '/' + localFileName;
                var fileName = firmwareVersion+"_"+currTime+fileExtension; 
                var userName = request.body.userName;
                s3Upload.cateUpload(localFilePath, fileName, function (err, url) {
                    if (err) {
                        var errorJson = errorjsonimpl(err);
                        response.json(errorJson);
                        return;
                    }
                    var fileContents = fs.readFileSync(localFilePath);
                    var sha256Data = sha256(fileContents);
                    
                    var data = {
                        "createdEpochMs": currTime,
                        "fileName": "s3://"+global.s3Bucket+"/firmware/"+fileName,
                        "totalDataSize": fileContents.length,
                        "sha256Data": sha256Data
                    }
                    response.status(200);
                });
            },
}
module.exports = categoryUpload;

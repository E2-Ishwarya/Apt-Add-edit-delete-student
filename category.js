
var categoryDao = require('../../dao/dynamoDb/categoryDao.js')
var s3 = require('../../s3Store/s3Updator.js');
var fs = require('fs')


var categoryDetails = {
  getCategory: function (request, response) {
      console.log("entered");
      categoryDao.getCategory(function (err, data) {
          response.status(200)
          response.send(data)
          console.log(data);
          return  
        } )
  }   ,
  /*getImage: function (request, response) {
    console.log("entered");
    categoryDao.getImage(function (err, data) {
        response.status(200)
        response.send(data)
        return  
      } )
}   ,*/

  createCategory: function (request, response) {
    console.log("localFilePath--entered");
    console.log("localFilePath--"+localFolderPath);
    console.log("request.body.filename---"+request.body.filename);
    s3.categoryImage(localFolderPath, request.body.filename, function (err, url) {
      console.log("entered1232");
      var stu={
        "category_id"  :request.body.category_id,
        "categoryName":request.body.categoryName,
        "categoryImage":request.body.filename,
        "s3URL": url.Location
      }
      categoryDao.addCategory(stu, function (err, data) {
        response.status(200)
        response.send(data)
        console.log(data);
        return  
      } );
    })
  },


updateCategory: function (request, response) {
 // var localFileName = request.body.filename;
 var fileName = request.query.filename;
  var localFilePath = localFolderPath + '/' + fileName;
  console.log("*++++*");
  s3.categoryImage(localFilePath, function (err, url) {
    console.log("*******************");
    var stu={
      "category_id"  :request.body.category_id,
      "categoryName":request.body.categoryName,
      "categoryImage":request.body.fileName,
      "s3URL": url.Location
    }
    console.log("*******************",stu);
    categoryDao.updateCategory(stu, function (err, data) {
      response.status(200)
      response.send(data)
      console.log(data);
      return  
    } );
  })
},
     
deleteCategory: function (request, response) {
    categoryDao.deleteCategory(request.body, function (err, data) {
    console.log("ffffffff");
      response.status(200)
      response.send(data)
      console.log(data);
      return;  
  })
} ,  

getImageview: function (request, response) {
  console.log("entered---fs");
  var fileName = request.query.filename;
  console.log("+++++++++++++++++++",fileName)
  var localFilePath = localFolderPath + '/' + fileName;
  console.log("+++++++++++++++++++",localFilePath)
  fs.readFile(localFilePath, function(err, data) {
    response.writeHead(200, {'Content-Type': 'image/jpeg'});
    response.end(data); 
  })

  // fs.readFile(localFolderPath+'/'+request.query.fileName, function(err, data) {
  //   console.log(".........-------.....",localFolderPath+'/'+request.query.fileName)
  //   if (err){
  //     response.writeHead(200, {'Content-Type': 'image/jpeg'});
  //     fs.readFile(localFolderPath+'/default', function(err, data) {
  //       response.end(data);
  //     });
  //   }
  //   else {
  //     response.writeHead(200, {'Content-Type': 'image/jpeg'});
  //     response.end(data); // Send the file data to the browser.
  //   }
  // });
},
/*getCategory1: function (request, response) {
  categoryDao.getCategory1(request.body, function (err, data) {
    console.log("ff");
      response.status(200)
      response.send(data)
      console.log(data);
      return;  
  })
}*/
  }     
module.exports = categoryDetails;
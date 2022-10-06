
var categoryDao = require('../../dao/dynamoDb/categoryDao.js')
var categoryDetails = {
  getCategory: function (request, response) {
      console.log("entered");
      categoryDao.getCategory(function (err, data) {
          response.status(200)
          response.send(data)
          return  
        } )
  }   ,   
  createCategory: function (request, response) {
    console.log("entered1232");
    var stu={
      "category_id"  :request.body.category_id,
			"categoryName":request.body.categoryName,
    }
      console.log(stu);
      categoryDao.addCategory(stu, function (err, data) {
        response.status(200)
        response.send(data)
        console.log(data)
        return;
      })
    },
updateCategory: function (request, response) {
    categoryDao.updateCategory(request.body,function (err, data) {
          response.status(200)
          response.send(data)
          return
      },
    )
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
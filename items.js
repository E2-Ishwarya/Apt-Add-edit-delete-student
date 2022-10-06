
var itemsDao = require('../../dao/dynamoDb/itemsDao.js')
var itemDetails = {
  getItems: function (request, response) {
      console.log("entered");
      itemsDao.getItems(function (err, data) {
          response.status(200)
          response.send(data)
          return  
        } )
  }   ,   
  createItems: function (request, response) {
    console.log("entered1232");
    var stu={
      "item_id"  :request.body.item_id,
	    "itemName" :request.body.itemName,
      "category_id" : request.body.category_id
      
    }
      console.log(stu);
      itemsDao.addItems(stu, function (err, data) {
        response.status(200)
        response.send(data)
        console.log(data)
        return;
      })
    },
updateItems: function (request, response) {
    itemsDao.updateItems(request.body,function (err, data) {
          response.status(200)
          response.send(data)
          return
      },
    )
  },
     
deleteItems: function (request, response) {
    itemsDao.deleteItems(request.body, function (err, data) {
    console.log("ffffffff");
      response.status(200)
      response.send(data)
      console.log(data);
      return;  
  })
} ,

}                                                    
	
      
module.exports = itemDetails;
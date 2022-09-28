
var studentDao = require('../../dao/dynamoDb/studentDao.js')
var studentDetails = {
  getStudents: function (request, response) {
      console.log("entered");
      studentDao.getStudents(function (err, data) {
        if (err) {
          response.status(500)
          var errorJson = errorjsonimpl('Database Connection Failed')
          response.json(errorJson)
          return
        }
        else{
          response.status(200)
          response.send(data)
          return
        }
          
        } )
  }   ,   
  createStudents: function (request, response) {
    console.log("entered1232");
    var stu={
		 studentId : request.body.studentId,
     name :request.body.name,
     studentAge :request.body.studentAge
    }
      console.log(stu);
			studentDao.AddStudents(stu, function (err, data) {
        response.status(200)
        response.send(data)
        console.log(data)
        return;
      })
    },
updateStudents: function (request, response) {
   studentDao.updateStudents(request.body,function (err, data) {
          response.status(200)
          response.send(data)
          return
      },
    )
  },
     
deleteStudents: function (request, response) {
  studentDao.deleteStudents(request.body, function (err, data) {
    console.log("ffffffff");
    
      response.status(200)
      response.send(data)
      console.log(data);
      return;
    
  })
}   
  }
                                                     
	
      
module.exports = studentDetails;
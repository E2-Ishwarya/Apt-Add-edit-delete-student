var User_details = require('../model/user')
const user_post = (req, res) => {
  let post = {
    userName: req.body.user_name,
    noofDays: req.body.no_of_days,
  }
  User_details.create(post).then((data) => {
    res.send(data)
  })
}
const user_update = (req, res) => {
  User_details.update({
    where: {
      userName: req.body.user_name,
    },
  }).then((result) => res.json(result))
}
const user_delete = (req, res) => {
  User_details.destroy({
    where: { userName: req.body.user_name },
  })
}
const user_get = (req, res) => {
  User_details.findAll().then((result) => res.json(result))
}
module.exports = {
  user_get,
  user_post,
  user_update,
  user_delete,
}

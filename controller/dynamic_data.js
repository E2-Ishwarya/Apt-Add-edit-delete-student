var express = require('express')
var app = express()
app.use(express.json())
const Sequelize = require('sequelize')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('library_details', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
})
;(async () => {
  sequelize.authenticate()
  console.log('Connection successfull.')
  sequelize.sync()
})()
const User_details = sequelize.define('user_details', {
  userName: { type: Sequelize.STRING, field: 'user_name' },
  noofDays: { type: Sequelize.INTEGER, field: 'no_of_days' },
})
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  User_details.findAll().then((result) => res.json(result))
  res.render('user', { data: results })
})
app.post('/', (req, res) => {
  let post = {
    userName: req.body.user_name,
    noofDays: req.body.no_of_days,
  }
  User_details.create(post).then((data) => {
    res.send(data)
  })
})
app.listen(3000)

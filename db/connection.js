const Sequelize = require('sequelize')
const sequelize = new Sequelize('library_details', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
})
;(async () => {
  sequelize.authenticate()
  console.log('Connection successfull.')
})()
module.exports = sequelize

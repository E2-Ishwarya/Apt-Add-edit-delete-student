const Sequelize = require('sequelize')
var sequelize = require('../db/connection')
const User_details = sequelize.define('user_details', {
  userName: { type: Sequelize.STRING, field: 'user_name' },
  noofDays: { type: Sequelize.INTEGER, field: 'no_of_days' },
})

module.exports = User_details

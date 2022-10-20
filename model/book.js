const Sequelize = require('sequelize')
var sequelize = require('../db/connection')

const Book_details = sequelize.define('book_details', {
  bookName: { type: Sequelize.STRING, field: 'book_name' },
  noofBooks: { type: Sequelize.INTEGER, field: 'no_of_books' },
})
module.exports = Book_details

var Book_details = require('../model/book')
const book_post = (req, res) => {
  let post = {
    bookName: req.body.book_name,
    noofBooks: req.body.no_of_books,
  }
  Book_details.create(post).then((data) => {
    res.send(data)
  })
}
const book_update = (req, res) => {
  Book_details.update({
    where: {
      bookName: req.body.book_name,
    },
  }).then((result) => res.json(result))
}
const book_delete = (req, res) => {
  Book_details.destroy({
    where: {
      bookName: req.body.book_name,
    },
  }).then((result) => res.json(result))
}
const book_get = (req, res) => {
  Book_details.findAll().then((result) => res.json(result))
}
module.exports = {
  book_get,
  book_post,
  book_update,
  book_delete,
}

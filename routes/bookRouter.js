const express = require('express');
const booksController = require('../controllers/booksController');

function routes(Book) {
    const bookRouter = express.Router();
    const controller = booksController(Book);
    bookRouter.route('/books')
        .post(controller.post)
        .get(controller.get);

    bookRouter.route('/books/:bookId')
        .get((req, res) => {

            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(book);

            });
        })
        .put((req, res) => {

            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    return res.send(err);
                }

                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;
                book.save();
                return res.json(book);

            });
        })
        .patch((req, res) => {

            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    return res.send(err);
                }

                if (req.body._id) {
                    delete req.body._id;
                }

                Object.entries(req.body).forEach((item) => {
                    const key = item[0];
                    const value = item[1];
                    book[key] = value;
                });
                book.save((err) => {
                    if (err) {
                        return res.send(err);
                    }
                    return res.json(book);
                });
            });

        })
        .delete((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    return res.send(err);
                }

                book.remove((err) => {
                    if (err) {
                        return res.send(err);
                    }
                    return res.sendStatus(204);
                });
            });
        });
    return bookRouter;
}

module.exports = routes;
require('should');
const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';
const app = require('../app');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
    it('should allow a book to posted and return read and _it', (done) => {
        const bookPost = {
            title: "Adam's book",
            author: "Adam Tan",
            genre: "Fantasy",
        };

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, results) => {
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            })
    });

    afterEach((done) => {
        Book.deleteMany({}).exec();
        done();
    });

    after((done) => {
        mongoose.connection.close();
        app.server.close(done());
    })

});
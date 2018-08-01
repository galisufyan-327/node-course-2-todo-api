var expect = require('expect');
var request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

var todos = [{
    text: 'First todo text'
}, {
    text: 'Second todo text'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

//POST todo Starts
describe('POST /todo', () => {
    it('should create a new todo', (done) => {
        var text = 'Todo test text';

        request(app)
            .post('/todo')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it('should not creat todo with invalid data', (done) => {
        request(app)
            .post('/todo')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2)
                    done();
                }).catch((e) => done(e));
            });
    });
});
//POST todo Ends

//GET /todos Starts
describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});































// beforeEach((done) => {
//     Todo.remove({}).then(() => done());
// });

// describe('POST /todo', () => {
//     it('should create a new todo', (done) => {
//         var text = 'Test todo text';

//         request(app)
//             .post('/todo')
//             .send({text})
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).toBe(text);
//             })
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//             })
            
//             Todo.find().then((todos) => {
//                 expect(todos.length).toBe(1);
//                 expect(todos[0].text).toBe(text);
//                 done();
//             }).catch((e) => done(e));        
//     });
// });
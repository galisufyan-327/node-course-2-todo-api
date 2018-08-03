var expect = require('expect');
var request = require('supertest');
var {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

var todos = [{
    _id: new ObjectID(),
    text: 'First todo text',
    completed: true,
    completedAt: 333
}, {
    _id: new ObjectID(),
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

//GET /todos/:id Starts
describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 non-object ids', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

//DELETE /todos/:id Starts
describe('DELETE /todos/:id', () => {
    it('should return deleted todo doc', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
            
            // Todo.findById(hexId).then((todo) => {
            //     expect(todo).toNotExist();
            //     done();
            // }).catch((e) => done(e));
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID();
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if non-object ids', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });
});

//PATCH /todos/:id Starts
describe('PATCH /todos/:id', () => {
    it('should return updated todo', (done) => {
        var id = todos[1]._id;
        var todoObj = {
            "completed": true,
            "text": "Updated from tests"
        }
        request(app)
            .patch(`/todos/${id}`)
            .send(todoObj)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todoObj.text);
                expect(res.body.todo.completed).toBe(todoObj.completed);
                // expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var id = todos[0]._id;
        var todoObj = {
            "completed": false,
            "text": "Updated from tests"
        }
        request(app)
            .patch(`/todos/${id}`)
            .send(todoObj)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(todoObj.completed);
                expect(res.body.todo.text).toBe(todoObj.text);
                expect(res.body.todo.completedAt).toBe(null);
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
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');


// beforeEach(populateUsers);
// beforeEach(populateTodos);

// //POST todo Starts
// describe('POST /todo', () => {
//     it('should create a new todo', (done) => {
//         var text = 'Todo test text';

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
//                 Todo.find({text}).then((todos) => {
//                     expect(todos.length).toBe(1);
//                     expect(todos[0].text).toBe(text);
//                     done();
//                 }).catch((e) => done(e));
//             });
//     });
//     it('should not creat todo with invalid data', (done) => {
//         request(app)
//             .post('/todo')
//             .send({})
//             .expect(400)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 Todo.find().then((todos) => {
//                     expect(todos.length).toBe(2)
//                     done();
//                 }).catch((e) => done(e));
//             });
//     });
// });
// //POST todo Ends

// //GET /todos Starts
// describe('GET /todos', () => {
//     it('should get all todos', (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todos.length).toBe(2);
//             })
//             .end(done);
//     });
// });

// //GET /todos/:id Starts
// describe('GET /todos/:id', () => {
//     it('should return todo doc', (done) => {
//         request(app)
//             .get(`/todos/${todos[0]._id.toHexString()}`)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo.text).toBe(todos[0].text);
//             })
//             .end(done);
//     });

//     it('should return 404 if todo not found', (done) => {
//         var hexId = new ObjectID();
//         request(app)
//             .get(`/todos/${hexId}`)
//             .expect(404)
//             .end(done);
//     });

//     it('should return 404 non-object ids', (done) => {
//         request(app)
//             .get('/todos/123')
//             .expect(404)
//             .end(done);
//     });
// });

// //DELETE /todos/:id Starts
// describe('DELETE /todos/:id', () => {
//     it('should return deleted todo doc', (done) => {
//         var hexId = todos[0]._id.toHexString();
//         request(app)
//             .delete(`/todos/${hexId}`)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body._id).toBe(hexId);
//             })
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 done();
//             });
            
//             // Todo.findById(hexId).then((todo) => {
//             //     expect(todo).toNotExist();
//             //     done();
//             // }).catch((e) => done(e));
//     });

//     it('should return 404 if todo not found', (done) => {
//         var id = new ObjectID();
//         request(app)
//             .delete(`/todos/${id}`)
//             .expect(404)
//             .end(done);
//     });

//     it('should return 404 if non-object ids', (done) => {
//         request(app)
//             .delete('/todos/123')
//             .expect(404)
//             .end(done);
//     });
// });

// //PATCH /todos/:id Starts
// describe('PATCH /todos/:id', () => {
//     it('should return updated todo', (done) => {
//         var id = todos[1]._id;
//         var todoObj = {
//             "completed": true,
//             "text": "Updated from tests"
//         }
//         request(app)
//             .patch(`/todos/${id}`)
//             .send(todoObj)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo.text).toBe(todoObj.text);
//                 expect(res.body.todo.completed).toBe(todoObj.completed);
//                 // expect(res.body.todo.completedAt).toBeA('number');
//             })
//             .end(done);
//     });

//     it('should clear completedAt when todo is not completed', (done) => {
//         var id = todos[0]._id;
//         var todoObj = {
//             "completed": false,
//             "text": "Updated from tests"
//         }
//         request(app)
//             .patch(`/todos/${id}`)
//             .send(todoObj)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo.completed).toBe(todoObj.completed);
//                 expect(res.body.todo.text).toBe(todoObj.text);
//                 expect(res.body.todo.completedAt).toBe(null);
//             })
//             .end(done);
//     });
// });

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id);
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if user is not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create auser', (done) => {
        var email = 'example@example.com';
        var password = '123abc';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.bod._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                User.find({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                });
            });
    });

    it('should return errors if request invalid', (done) => {
        var email = 'example#example.com';
        var password = '123abc';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done)
    });

    it('should not create user if email in use', (done) => {
        var email = users[0].email;
        var password = '123abc';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done)
    });
});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        var email = 'ali@example.com';
        var password = 'userOnePass';
        request(app)
            .post('/users/login')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end(done);
    });

    it('should reject invalid login', (done) => {
        var email = 'example@example.com';
        var password = '123abc';
        
        request(app)
            .post('/users/login')
            .send(email, password)
            .expect(404)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end(done);
    });
});
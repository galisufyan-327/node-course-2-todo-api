var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

// var id = '5b62469b902ab20e786b37fb';

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo ', todo);
// });

// Todo.findById(id).then((todo) => {
//     console.log('Todo By Id', todo);
// });

id = '5b60decc2854410924bea17e';

User.findById(id).then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log('User found ', user);
}).catch((e) => console.log(e));
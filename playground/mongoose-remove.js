var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');


// Todo.remove({}).then((todos) => {
//     console.log(todos);
// });

// Todo.findOneAndRemove({_id: 'some id'}).then((todos) => {
//     console.log(todos);
// });

// Todo.findByIdAndRemove('some id').then((todos) => {
//     console.log(todos);
// });
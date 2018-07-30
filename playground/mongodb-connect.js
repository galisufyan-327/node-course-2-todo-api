// const MongoClient = require('mongodb').MongoClient;
// Object destructuring
const {MongoClient, ObjectID} = require('mongodb');

const test = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'TodoApp';
// Connect using MongoClient
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//   // Create a collection we want to drop later
//   const col = client.db(dbName).collection('Todos');
//   // Insert a bunch of documents
//   col.insertOne({
//       text: 'some text here',
//       completed: false
//   }, (err, result) => {
//         if (err) {
//             return console.log('Unable to insert todo', err);
//         }
//         console.log(JSON.stringify(result.ops, undefined, 2));
//         client.close();
//   });

    // const users_col = client.db(dbName).collection('Users');

    // users_col.insertOne({
    //     name: 'Ali',
    //     age: 25,
    //     location: 'Lahore'
    // }, (err, result) => {
    //     if (err) {
    //         return console('Unable to insert user', err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    //     client.close();
    // });
});
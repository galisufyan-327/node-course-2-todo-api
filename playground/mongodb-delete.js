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
    
    //deleteMany
    // client.db(dbName).collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //deleteMany Users
    // client.db(dbName).collection('Users').deleteMany({name: 'Zahid'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne
    // client.db(dbName).collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // client.db(dbName).collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete User
    client.db(dbName).collection('Users').findOneAndDelete({_id: new ObjectID('5b607b5b1dddee1b28095728')}).then((result) => {
        console.log(result);
    });
});
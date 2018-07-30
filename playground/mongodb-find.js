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
    // client.db(dbName).collection('Todos').find({
    //     _id: new ObjectID('5b5f8c22cc0ed11f2439f989')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch data', err);
    // });

    // client.db(dbName).collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch data', err);
    // });

    client.db(dbName).collection('Users').find({
        name: 'Atlas'
    }).toArray().then((user) => {
        console.log(user);
    }, (err) => {
        console.log('Unable to fetch user', err);
    });
});
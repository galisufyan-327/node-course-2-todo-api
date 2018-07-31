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
    
    client.db(dbName).collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b5f8deb7965581c582ee39a')
    }, {
        $set: {
            name: 'Ali'
        },
        $inc: {
            age: 4
        }
    }, {returnOriginal: false}).then((result) => {
        console.log(result);
    });
});
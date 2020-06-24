//testing mongo
const mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017';
var databaseName = 'task-manager';
MongoClient.connect(connectionURL, { useNewUrlParser: true }, function(err, client) {
    if (err) {
        return console.log('unable to connect');
    }
    var db = client.db(databaseName);
    // db.collection('users').insertMany([{
    //     name: 'jayden',
    //     age: 36,
    // }], (err, result) => {
    //     if (err) {
    //         return console.log('unable to connect');
    //     }
    //     console.log(result.ops);
    // })
    db.collection('tasks').insertMany([{

        description: 'coding',
        competed: false,

    }, {

        description: 'playing',
        competed: false,

    }, {

        description: 'dancing',
        competed: true,

    }], (err, result) => {
        if (err) {
            return console.log('unable to connect');
        }
        console.log(result.ops);
    })

});
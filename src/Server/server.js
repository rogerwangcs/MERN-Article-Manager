//express libraries
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

//open server on port.
app.listen(3001, () => console.log('Server started on port 3001'));

//bodyparser library necessary for parsing json requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//mongoDB
const MongoClient = require('mongodb').MongoClient,
      ObjectId = require('mongodb').ObjectID;
var uri = "mongodb://rooterbuster:root1999@cluster0-shard-00-00-gleoi.mongodb.net:27017,cluster0-shard-00-01-gleoi.mongodb.net:27017,cluster0-shard-00-02-gleoi.mongodb.net:27017/TestDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

//initiate mongoDB connection and make get and post requests in the connection for db access
MongoClient.connect(uri, function(err, client) {
  if (err) throw err;
  var db = client.db('genome_compass');

  //  db.collection('articles').insertMany([
  //    {
  //      title: "article title here",
  //      cnTitle: "cn Title here",
  //      date: "date time 12/27/2017",
  //      content: "content here"
  //    },
  //  ])
  //    .then(function(result) {
  //    console.log('inserted');
  //  });

  //gets article given mongo ObjectId or entire collection if no given ID
  app.get('/api/articles', (req, res, next) => {
    var query = {};
    if (req.query._id != undefined) {
      query._id = ObjectId(req.query._id);
      db.collection('articles').find(query).toArray(function(err, results) {
        if (err || results.length == 0) {
          res.sendStatus(404); //404 not found
          return console.log(err);
        }
        else {
          res.send(results);
          console.log("Retrieved article.");
          return;
//          return console.log(results);
        }
      })
    }
    else {
      db.collection('articles').find().toArray(function(err, results) {
        if (err || results.length == 0) {
          res.sendStatus(404); //404 not found
          return console.log(err);
        }
        else {
          res.send(results);
          console.log("Retrieved articles.");
          return;
//          return console.log(results);
        }
      })
    }
  });

  //posts a new article with given body parameters of article json info.
  app.post('/api/articles', (req, res, next) => {
    db.collection('articles').save(req.body, (err, result) => {
      if (err) {
        res.sendStatus(400) //400 bad request
        return console.log(err);
      }
      else {
        console.log('saved to database');
        res.sendStatus(201); //201 OK
      }
    });
  });

  //deletes the article with the given mongoDB ObjectID
  app.delete('/api/articles', (req, res, next) => {
    var query = {};
    if (req.query._id) {
      query._id = ObjectId(req.query._id);
    }
    db.collection('articles').deleteOne({_id: ObjectId(req.query._id)});
    res.sendStatus(201); //201 OK
    return console.log("Deleted article.");
  });

  //update the article with the given mongoDB ObjectID
  app.put('/api/articles', (req, res, next) => {
    var newInfo = req.body;
    delete newInfo._id;
    db.collection('articles').replaceOne(
      { _id: ObjectId(req.query._id) },
      newInfo)
      .then(function(result) {
      console.log("Updated Article");
      res.end();
    }) 
  });

  //  //this function calls when you go to this address.
  //  app.all('/api/secret', (req, res, next) => {
  //    console.log('Accessing the secret section ...');
  //    next(); // pass control to the next handler
  //  });

});

//express libraries
const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      app = express();

//open server on port.
const port = process.env.PORT || 5000;
app.listen(port);
console.log('Server started on port ' + port + '.');

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
const mongoDB = require('./db-config.js').mongoDB;

const MongoClient = require('mongodb').MongoClient,
      ObjectId = require('mongodb').ObjectID;

//initiate mongoDB connection and make get and post requests in the connection for db access
MongoClient.connect(mongoDB.uri, function(err, client) {
  if (err) throw err;
  var db = client.db(mongoDB.dbname);

  //gets article given mongo ObjectId or entire collection if no given ID
  app.get('/api/articles', (req, res, next) => {
    var query = {};
    if (req.query._id != undefined) {
      query._id = ObjectId(req.query._id);
      db.collection(mongoDB.collection).find(query).toArray(function(err, results) {
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
      db.collection(mongoDB.collection).find().toArray(function(err, results) {
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
    db.collection(mongoDB.collection).save(req.body, (err, result) => {
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
    db.collection(mongoDB.collection).deleteOne({_id: ObjectId(req.query._id)});
    res.sendStatus(201); //201 OK
    return console.log("Deleted article.");
  });

  //update the article with the given mongoDB ObjectID
  app.put('/api/articles', (req, res, next) => {
    var newInfo = req.body;
    delete newInfo._id;
    db.collection(mongoDB.collection).replaceOne(
      { _id: ObjectId(req.query._id) },
      newInfo)
      .then(function(result) {
      console.log("Updated Article");
      res.end();
    }) 
  });

  //serve static html for production ready app
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });


});


# MERN Article Manager App

Manage articles and similar content in an user friendly dashboard. Front end built with React.js, back end built with Express.js and MongoDB Atlas.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Getting started

To begin, install dependencies in both the server and client directories.

```
npm install
cd client
npm install
cd ..
```
This project contains two npm projects. The server runs in the root folder and the client runs in the `/client` folder.

To run a local server with `create-react-app`, run:
NOTE: You will need to connect a MongoDB database to run the server. Check  out [Usage](#usage)
```
npm start
```

A new browser window should open up with the following url: [http://localhost:5000](http://localhost:5000)

To run the developmental local server with `create-react-app`, open a new shell and run:
```
cd client
npm start
```
You are now all set and ready to go!
## Usage

The app requires a MongoDB database connected to the server. I used MongoDB Atlas, but you can use another service as well. You will need the database connection string as well as the database and collection names.

```
"dbname": "mern-cms-app",
"collection" : "articles",
"uri" : "mongodb://USERNAME:PASSWORD@cluster0-shard-00-00-
		gleoi.mongodb.net:27017,cluster0-shard-00-01-
		gleoi.mongodb.net:27017,cluster0-shard-00-02-
		gleoi.mongodb.net:00000/Database?ssl=true&replicaSet=Cluster0-
		shard-0&authSource=admin"
```
Configure the `db-config.js` file in the root folder to connect the database.
## Support

Please [open an issue](https://github.com/rogerwangcs/MERN-Article-Manager/issues/new) for support.
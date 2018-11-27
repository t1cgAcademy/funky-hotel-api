require('./util/objectId.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createServer = require('http').createServer;
const room = require('./routes/room.js');
const reservation = require('./routes/reservation.js');
const mongo = require('./mongo/mongo.js');
const apolloServer = require('./graphql/server.js');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/rest/room', room);
app.use('/api/rest/reservation', reservation);

// Keep this line of code below all `app.use` statements
// Server uses `/graphql` as default endpoint
apolloServer.applyMiddleware({ app });

const server = createServer(app);

const port = process.env.PORT || 7001;

server.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Running on port ${port}`);
  }
});

module.export = app;

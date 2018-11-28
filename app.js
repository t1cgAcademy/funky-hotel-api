const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const room = require('./routes/room.js');
const reservation = require('./routes/reservation.js');
const mongo = require('./mongo/mongo.js');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/rest/room', room);
app.use('/api/rest/reservation', reservation);

const port = process.env.PORT || 7001;

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Running on port ${port}`);
  }
});

module.export = app;

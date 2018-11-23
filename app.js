const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

const port = process.env.PORT || 7001;

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Running on port ${port}`);
  }
});

module.export = app;

const express = require('express');
const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');


app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// app.use(jwt());

app.use(errorHandler);

app.use('/user', require('./routes/user.router'));

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80):3030;

app.listen(port, function (){
  console.log('Server listening on port ' + port);
});
// Init Project
const express = require('express');
const morgan = require('morgan');
const timer = require('./src/services/timer.js');
const app = express();

require('dotenv').config();

// Set Middleware
app.use(express.json());
app.use(morgan());
app.use(express.urlencoded({
  extended: true
}));

// Set Static dir
app.use(express.static('public'));


// Set Template Engine
app.set('views', './views');
app.set('view engine', 'ejs');


// Set Router
const MainRouter = require('./src/routes')
app.use('/', MainRouter);


// Set Port
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  timer.start()
});

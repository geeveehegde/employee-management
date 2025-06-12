/* ---------------------------------------------------------------
** Variable declaration
------------------------------------------------------------------*/
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const config = require('./config/config.js');

/* ---------------------------------------------------------------
** Giving Connection for mysql database
------------------------------------------------------------------*/
require('./api/data/mongonative-connection.js').open()

/* ---------------------------------------------------------------
** ** Declarations of routes
------------------------------------------------------------------*/
var appRoutes         = require('./api/routes/app');
var appUser = require('./api/routes/user');
var appShiftShedule = require('./api/routes/shiftShedule');
var appStaffShedule = require('./api/routes/staff');
var appRoleShedule = require('./api/routes/role');
var appShiftManagementShedule = require('./api/routes/shiftManagement');

/* ---------------------------------------------------------------
** Express Setting
---------------------------------------------------------------- */
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(express.static(path.join(__dirname, 'public')));
// This is required if angular and backend code are
// in different servers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token, type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS, HEAD, PUT'); //GET, PUT, POST, DELETE, HEAD, OPTIONS
  next();
});

/* ---------------------------------------------------------------
** Set Routes
---------------------------------------------------------------- */
app.use('/', appRoutes);
app.use('/api/adminUser', appUser);
app.use('/api/shiftShedule', appShiftShedule);
app.use('/api/staff', appStaffShedule);
app.use('/api/role', appRoleShedule); 
app.use('/api/shiftManagement', appShiftManagementShedule); 

// set port, listen for requests
const { PORT } = config;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;



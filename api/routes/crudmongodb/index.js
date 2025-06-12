/* -----------------------------------------------------------------
**Variable declaration
-------------------------------------------------------------------*/
var express  = require('express');
var router   = express.Router();
var ctrlCrud = require('../../controllers/crudmongodb.controllers.js');
// var ctrlUser = require('../../controllers/user/user.controllers.js')


/* ---------------------------------------------------------------
** create data
---------------------------------------------------------------- */

router
  .route('/createData')
  .post(ctrlCrud.createData);


/* ---------------------------------------------------------------
** create Multi data
---------------------------------------------------------------- */

router
  .route('/createMultiData')
  .post(ctrlCrud.createMultiData);


//---------------------------------------------------------------
// delete data
//---------------------------------------------------------------

router
  .route('/deleteData')
  .post(ctrlCrud.deleteData);

//---------------------------------------------------------------
// retrive all
//---------------------------------------------------------------

router
  .route('/retrieveAll')
  .post(ctrlCrud.retrieveAll);


//---------------------------------------------------------------
// retrive data by key
//---------------------------------------------------------------

router
  .route('/retrieveOne')
  .post(ctrlCrud.retrieveOne);


//---------------------------------------------------------------
// update data
//---------------------------------------------------------------

router
.route('/updateData')
.post(ctrlCrud.updateData);

//---------------------------------------------------------------
// updateIncrementDb data
//---------------------------------------------------------------

router
.route('/updateIncrementDb')
.post(ctrlCrud.updateIncrementDb);

//---------------------------------------------------------------
// getDateCount data
//---------------------------------------------------------------

router
.route('/dropSchema')
.post(ctrlCrud.dropSchema);

module.exports = router;

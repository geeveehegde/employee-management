/* -----------------------------------------------------------------
**Variable declaration
-------------------------------------------------------------------*/
var express  = require('express');
var router   = express.Router();
var ctrlspecific = require('../../controllers/staff/shiftShedule.controllers');

router
.route('/')
.post(ctrlspecific.createNewStaff);  
 
router
.route('/')
.get(ctrlspecific.fetchAllStaff);  


module.exports = router;
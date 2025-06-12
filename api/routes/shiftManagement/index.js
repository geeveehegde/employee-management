/* -----------------------------------------------------------------
**Variable declaration
-------------------------------------------------------------------*/
var express  = require('express');
var router   = express.Router();
var ctrlspecific = require('../../controllers/shiftManagement/shiftManagement.controllers');

router
.route('/')
.post(ctrlspecific.createNewShiftManagement);  
 
router
.route('/')
.get(ctrlspecific.fetchAllShiftManagement);  


module.exports = router;
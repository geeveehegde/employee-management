/* -----------------------------------------------------------------
**Variable declaration
-------------------------------------------------------------------*/
var express  = require('express');
var router   = express.Router();
var ctrlspecific = require('../../controllers/shiftShedule/shiftShedule.controllers');

router
.route('/')
.post(ctrlspecific.createNewShift);  
 
router
.route('/')
.get(ctrlspecific.fetchAllShift);  


module.exports = router;
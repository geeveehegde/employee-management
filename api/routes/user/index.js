/* -----------------------------------------------------------------
**Variable declaration
-------------------------------------------------------------------*/
var express  = require('express');
var router   = express.Router();
var ctrlspecific = require('../../controllers/user/user.controllers');

router
.route('/')
.post(ctrlspecific.createAdminUser);  
 
router
.route('/')
.get(ctrlspecific.fetchAdminUser);  


module.exports = router;
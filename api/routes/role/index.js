/* -----------------------------------------------------------------
**Variable declaration
-------------------------------------------------------------------*/
var express  = require('express');
var router   = express.Router();
var ctrlspecific = require('../../controllers/role/role.controllers');

router
.route('/')
.post(ctrlspecific.createRole);  
 
router
.route('/')
.get(ctrlspecific.fetchRole);  


module.exports = router;
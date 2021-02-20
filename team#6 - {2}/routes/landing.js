var express = require('express');
var router = express.Router();
const {ensureGuest} = require("../middleware/authMiddleware");
/* GET home page. */
router.get('/',ensureGuest, function(req, res, next) {
  res.render('landing', {});
});
module.exports = router;
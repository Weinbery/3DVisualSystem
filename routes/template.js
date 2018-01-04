var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('template', { title: '模板-维恩动力' });
});

module.exports = router;

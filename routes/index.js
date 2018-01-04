/*
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('template', { title: '登录-维恩动力' });
});

module.exports = router;
*/

// 门锁密码：713421687

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/signin');
    });

    app.use('/adduser', require('./adduser'));
    app.use('/removeuser', require('./removeuser'));
    app.use('/updateuser', require('./updateuser'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
    app.use('/usermgr', require('./usermgr'));
    app.use('/3dview', require('./3dview'));

    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
};

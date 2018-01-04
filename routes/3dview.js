var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/user');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /signin 登录页
router.get('/', checkLogin, function(req, res, next) {
    //console.log(req.session.user);
    //res.render('3dview', {currentuser: req.session.user});
    res.render('editor');
});

// POST /signin 用户登录
router.post('/', checkLogin, function(req, res, next) {
    var name = req.fields.name;
    var password = req.fields.password;

    UserModel.getUserByName(name)
        .then(function (user) {
            if (!user) {
                req.flash('error', '用户不存在');
                return res.redirect('back');
            }
            // 检查密码是否匹配
            if (sha1(password) !== user.password) {
                req.flash('error', '用户名或密码错误');
                return res.redirect('back');
            }
            req.flash('success', '登录成功');
            // 用户信息写入 session
            delete user.password;
            req.session.user = user;
            // 跳转到主页
            res.redirect('/signin');
        })
        .catch(next);
});

module.exports = router;

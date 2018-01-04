var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/user');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signin');
});

/*
router.post('/', checkNotLogin, function(req, res, next) {

    res.redirect('/3dview');

});
*/
// POST /signin 用户登录
router.post('/', checkNotLogin, function(req, res, next) {
  var name = req.fields.username;
  var password = req.fields.password;

  console.log('用户名：' + name + '\n密码：' + password);

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
      console.log(req.session.user);
        // 跳转到主页
      if (name === 'postmaster') { // 超级管理员跳转到后台管理界面
          res.redirect('/posts');
      }
      else {
          res.redirect('/3dview'); // 其他用户跳转到3D视图界面
      }
    })
    .catch(next);
});

module.exports = router;

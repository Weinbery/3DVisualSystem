var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dao = require('./mysql');


// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

var clinet =

app.get('/', function (req, res) {
    res.sendFile(__dirname + "\\" + "login.html");
    console.log("[Info] Send " + __dirname + "\\" + "login.html");
})

app.get('/login.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "login.html");
    console.log("[Info] Send " + __dirname + "\\" + "login.html");
})

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "index.html");
    console.log("[Info] Send " + __dirname + "\\" + "index.html");
})

app.get('/404.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "404.html");
    console.log("[Info] Send " + __dirname + "\\" + "404.html");
})

app.get('/widgets.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "widgets.html");
    console.log("[Info] Send " + __dirname + "\\" + "widgets.html");
})

app.get('/basic_table.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "basic_table.html");
    console.log("[Info] Send " + __dirname + "\\" + "basic_table.html");
})

app.get('/general.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "general.html");
    console.log("[Info] Send " + __dirname + "\\" + "general.html");
})

app.get('/grids.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "grids.html");
    console.log("[Info] Send " + __dirname + "\\" + "grids.html");
})

app.get('/form_validation.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "form_validation.html");
    console.log("[Info] Send " + __dirname + "\\" + "form_validation.html");
})

app.get('/form_component.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "form_component.html");
    console.log("[Info] Send " + __dirname + "\\" + "form_component.html");
})

app.get('/chart-chartjs.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "chart-chartjs.html");
    console.log("[Info] Send " + __dirname + "\\" + "chart-chartjs.html");
})

app.get('/profile.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "profile.html");
    console.log("[Info] Send " + __dirname + "\\" + "profile.html");
})

app.get('/buttons.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "buttons.html");
    console.log("[Info] Send " + __dirname + "\\" + "buttons.html");
})

app.get('/blank.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "blank.html");
    console.log("[Info] Send " + __dirname + "\\" + "blank.html");
})

app.get('/home3D.html', function (req, res) {
    res.sendFile(__dirname + "\\" + "home3D.html");
    console.log("[Info] Send " + __dirname + "\\" + "home3D.html");
})

app.post('/auth_post', urlencodedParser, function (req, res) {
    // 输出 JSON 格式
    var response = {
        "username": req.body.username,
        "password": req.body.password
    };
    console.log(response);
    //
    client = dao.connect();
    result = null;
    dao.selectFun(client, req.body.username, function (result) {
        if(result[0] === undefined) {
            //res.send('没有该用户');
            res.sendFile(__dirname + "\\" + "login.html");
        }else{
            if(result[0].password === req.body.password){
                res.sendFile(__dirname + "\\" + "index.html");
            }else {
                //res.send('密码错误！');
                res.sendFile(__dirname + "\\" + "login.html");
            }
        }
    });
})

var server = app.listen(7070, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("[Info] Server start listening by http://%s:%s", host, port);
})
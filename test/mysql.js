var mysql = require('mysql');

function connectMysql() {
    var client = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'Wein',
        port:3306,
        database:'Weinbery'
    })

    return client;
}

function  selectFun(client, username, callback) {
  client.query('select password from userinfo where username = "' + username+ '"', function(err, results, fields) {
        if(err) {
            throw err;
        }
        callback(results);
    });
}

function insertFun(client, username, password, callback) {
    client.query('insert into userinfo value(?, ?)', [username, password], function(err, result){
         if(err) {
           console.log("error:" + err.message);
          return err;
         }
         callback(err);
    });
}

exports.connect = connectMysql;
exports.selectFun = selectFun;
exports.insertFun = insertFun;
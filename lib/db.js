var config = require('config-lite')(__dirname);
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
});
exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

exports.Post = mongolass.model('Post', {
    author: { type: Mongolass.Types.ObjectId },
    title: { type: 'string' },
    content: { type: 'string' },
    pv: { type: 'number' }
});
exports.Post.index({ author: 1, _id: -1 }).exec();// 按创建时间降序查看用户的文章列表

exports.Comment = mongolass.model('Comment', {
    author: { type: Mongolass.Types.ObjectId },
    content: { type: 'string' },
    postId: { type: Mongolass.Types.ObjectId }
});
exports.Comment.index({ postId: 1, _id: 1 }).exec();// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({ author: 1, _id: 1 }).exec();// 通过用户 id 和留言 id 删除一个留言





/**
 * Created by Administrator on 2016/7/19.
 */
// 连接MySQL
    /*
var mysql = require('mysql');

var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Wein',
    database:'weinbery'
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release(); // 释放链接
        });
    });
}

exports.query = query;
*/
/*
var mysql=require('mysql');

function connectServer(){

    var client=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'Wein',
        database:'weinbery'
    })

    return client;
}


function  selectFun(client,username,callback){
    //client为一个mysql连接对象
    client.query('select password from userinfo where username="'+username+'"',function(err,results,fields){
        if(err) throw err;

        callback(results);
    });
}

function insertFun(client , username , password,callback){
    client.query('insert into userinfo value(?,?)', [username, password], function(err,result){
        if( err ){
            console.log( "error:" + err.message);
            return err;
        }
        callback(err);
    });
}

exports.connect = connectServer;
exports.selectFun  = selectFun;
exports.insertFun = insertFun;
*/

/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 's3kreee7'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();

 */
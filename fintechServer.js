const express = require('express')
const app = express()
const path = require('path');
const request = require('request');
const jwt = require('jsonwebtoken')
const auth = require('./lib/auth');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'fintech'
});

connection.connect();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));//to use static asset

app.get('/design', function(req, res){
    res.render('wallet');
})

app.get('/signup', function(req, res){
    res.render('signup')
})

app.get('/login', function(req, res){
    res.render('login');
})

app.get('/main', function(req, res){
    res.render('main');
})

app.post('/login', function(req, res){
    console.log(req.body);
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;

    var sql = "SELECT * FROM fintech.user WHERE email = ?";
    connection.query(sql, [userEmail], function(error, result){
        if (error) throw error;
        if(result.length == 0){
            res.json('사용자가 없습니다.')
        }
        else {
            console.log(result[0].accesstoken);
            var dbPassword = result[0].password;
            console.log('database password : ', dbPassword);
            if(dbPassword == userPassword){
                console.log('login 성공!');
                jwt.sign(
                    { 
                        userId : result[0].id,
                        userName : result[0].name
                    },  //paylaod
                    'fi&4nt%dnn2nw1ooec@hse#rvice!1234#', 
                    {
                        expiresIn : '1d',
                        issuer : 'fintech.admin',
                        subject : 'user.login.info'
                    },
                    function(err, token) {
                        console.log('우리가 발급한 토큰 : ',token);
                        res.json(token);
                    }
                );                   
            }
            else if(dbPassword != userPassword) {
                res.json('패스워드가 다릅니다');
            }
        }
    })
})

app.get('/authResult', function(req, res){
    console.log('authResult');
    console.log(req.query);
    var authCode = req.query.code;
    console.log(authCode);
    var option = {
        method : "POST",
        url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
        header : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        form : {
            code : authCode,
            client_id : 'q7kH44ThJwjpvNRg0BbJvE1yxvx5X53DKz1rNgPF', //key변경
            client_secret : 'yVT6irMr2h4ZTHzZY7sDpbvhm1nlOzr4nP7DYRVy',//secret변경
            redirect_uri : 'http://localhost:3000/authResult',
            grant_type : 'authorization_code'
        }
    }
    request(option, function (error, response, body) {
        console.log(body);
        var requestResultJSON = JSON.parse(body);
        res.render('resultChild',{data : requestResultJSON})
    });
})

app.post('/signup', function(req, res){
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userAccessToken = req.body.userAccessToken;
    var userRefreshToken = req.body.userRefreshToken;
    var userSeqNo = req.body.userSeqNo;
    console.log(userAccessToken, userRefreshToken, userSeqNo)
    var sql = "INSERT INTO fintech.user"+
    " (name, email, password, accesstoken, refreshtoken, userseqno)"+
    " VALUES (?, ?, ?, ?, ?, ?)"
    connection.query(sql,[userName, userEmail, userPassword, 
        userAccessToken, userRefreshToken, userSeqNo], function (error, results, fields) {
        if (error) throw error;
        res.json('가입완료');
    });     
})

app.post('/list', function(req, res){
    var option = {
        method : "GET",
        url : "https://testapi.openbanking.or.kr/v2.0/user/me",
        headers : {
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwMDM0NzM2Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MDAxNTQxNzksImp0aSI6IjU4NjBlZTY4LTE2N2QtNDc4YS1hODYxLTdmZjBjMTZhMzM1ZCJ9.wjgJA0k0cp_kEzmMD_mjUZSDSYwlIbo2P0Mr4GDESWs'
        },
        qs : {
            user_seq_no : '1100034736'
        }
    }
    request(option, function (error, response, body) {
        console.log(body);
        var requestResultJSON = JSON.parse(body);
        res.json(requestResultJSON)
    });
})

app.get('/authTest', auth, function(req, res){
    res.json(req.decoded);
})

app.listen(3000)

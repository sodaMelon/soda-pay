const express = require('express')
const app = express()
const path = require('path');
const request = require('request');

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

app.get('/authResult', function(req, res){
    console.log('authResult');
    console.log(req.query);
    var authCode = req.query.code;
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
        res.json(body);
    });
})

app.listen(3000)

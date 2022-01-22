const express = require('express')
const app = express()
 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));//to use static asset

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/test', function (req, res) {
    res.render('test');
})

app.get('/test2', function (req, res) {
    res.render('test2')
})

app.get('/inputTest', function(req, res){
    res.render('inputTest');
})

app.post('/inputTest', function(req, res){
    console.log('request!!');
    console.log(req.body.userIdBody);
    console.log(req.body.userPasswordBody);
    res.json(1123123);
})

app.post('/postTest', function(req, res){
    res.send('Post !!!!!');
})

app.listen(3000)

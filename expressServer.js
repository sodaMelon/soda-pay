const express = require('express')
const app = express()
 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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

app.listen(3000)

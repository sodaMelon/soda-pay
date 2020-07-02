const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('branch test using gitHub!')
})



app.listen(3000)
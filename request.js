const request = require('request');
request('http://naver.com', function (error, response, body) {
  console.log('body:', body); 
});

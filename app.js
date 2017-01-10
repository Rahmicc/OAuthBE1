var express = require("express"),
app = express(),
port = process.env.PORT || 1881,
http = require("http"),

options = {
  hostname: 'www.googleapis.com',
  port: 443,
  path: '/oauth2/v4/token',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  }
};



app.get('/callback', function (req, res) {
  console.log('Google did sent a response');
  console.log (req);
  console.log('sending POST request...');
  app.post('https://www.googleapis.com/oauth2/v4/token', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;
    res.send(user_id + ' ' + token + ' ' + geo);
  });
  res.send('Hello World!')
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
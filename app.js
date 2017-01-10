var express = require("express"),
app = express(),
port = process.env.PORT || 1881,
https = require("https"),
querystring = require('querystring');
 
// form data
var postData = querystring.stringify({
  firstanme: "Amy",
  lastname: "Li"
});

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

  var postReq= https.request(options, function(res){
  	var result = '';
	res.on('data', function (chunk) {
		result += chunk;
	 });
	res.on('end', function () {
		console.log(result);
  	});
  	res.on('error', function (err) {
    		console.log(err);
  	});
   });

   // req error
   postReq.on('error', function (err) {
   	console.log(err);
   });
 
  //send request witht the postData form
  postReq.write(postData);
  postReq.end();
  res.send('Hello World!')
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
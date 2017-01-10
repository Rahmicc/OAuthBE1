'use strict';
var express = require('express'),
querystring = require('querystring'),
https = require('https'),
app = express(),
url= require('url'),
//jwt = require('jsonwebtoken'),
port = process.env.PORT || 3000;


app.get('/callback', function (req, res) {

  console.log('Google did sent a response:' + req.url);
  console.log(query);
  var queryString  = url.parse(req.url, true).query;
  console.log(queryString);
  
  var qsFromReq = querystring.parse(queryString);
  console.log('qsFromReq');
  console.log(qsFormReq);
 
  var data = querystring.stringify({code:qsFromReq.code,
		client_id:'920263213693-i234smkj1crhoquepvdmshin9k8qoptc.apps.googleusercontent.com',
		client_secret:'eRoYBXEU6TlG1xc9EWtuaf9y',
		redirect_uri:'https://peaceful-waters-40664.herokuapp.com/callback',
		grant_type:'authorization_code'
  });

  var options = {
	hostname: 'www.googleapis.com',
  	port: 443,
  	path: '/oauth2/v4/token',
  	method: 'POST',
  	headers: {
      		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(data)
	}
   };

  var postReq= https.request(options, function(res){
	


	console.log ('sending...'+data);
  	var result = '';
	res.on('data', function (chunk) {
		result += chunk;
	 });
	res.on('end', function () {
		console.log(result);
//		var queryStringForIDToken =querystring.parse(urlparse(req.url));
//		console.log(queryStringForIDToken);
//		var idToken = queryString.idtoken;
 //		console.log(queryStringForIDToken);
//		console.log(jwt.decode(idToken));
		
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
  postReq.write(data);
  postReq.end();
  res.send('Hello World!')
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
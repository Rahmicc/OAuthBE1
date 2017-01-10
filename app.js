var express = require('express'),
querystring = require('querystring'),
https = require('https'),
app = express(),
urlparse = require('url-parse'),
port = process.env.PORT || 3000;
data = querystring.stringify({code:'4/P7q7W91a-oMsCeLvIaQm6bTrgtp7',
	client_id:'920263213693-i234smkj1crhoquepvdmshin9k8qoptc.apps.googleusercontent.com',
	client_secret:'eRoYBXEU6TlG1xc9EWtuaf9y',
	redirect_uri:'https://peaceful-waters-40664.herokuapp.com/callback',
	grant_type:'authorization_code'
    });

options = {
  hostname: 'www.googleapis.com',
  port: 443,
  path: '/oauth2/v4/token',
  method: 'POST',
  headers: {
      	'Content-Type': 'application/x-www-form-urlencoded',
	'Content-Length': Buffer.byteLength(data)
  },
  

};



app.get('/callback', function (req, res) {

  console.log('Google did sent a response');
  var parsedCallbackReq = url-parse(req);
  console.log(parsedCallbackReq.query);

  var qsFromReq = querystring.parse(parsedCallbackReq.query);
  console.log(qsFromReq.code);
  
  console.log('sending new POST request...');


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
  postReq.write(data);
  postReq.end();
  res.send('Hello World!')
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
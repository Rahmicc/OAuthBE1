var express = require('express'),
https = require('https'),
app = express(),
port = process.env.PORT || 3000;

options = {
  hostname: 'www.googleapis.com',
  port: 443,
  path: '/oauth2/v4/token',
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
  },
  
  form: {'code':'4/P7q7W91a-oMsCeLvIaQm6bTrgtp7',
		'client_id':'920263213693-i234smkj1crhoquepvdmshin9k8qoptc.apps.googleusercontent.com',
		'client_secret':'eRoYBXEU6TlG1xc9EWtuaf9y',
		'redirect_uri':'https://peaceful-waters-40664.herokuapp.com/callback',
		'grant_type':'authorization_code'}
};



app.get('/callback', function (req, res) {
  console.log('Google did sent a response');

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
  postReq.write();
  postReq.end();
  res.send('Hello World!')
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
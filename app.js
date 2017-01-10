var express = require("express"),
app = express(),
port = process.env.PORT || 1881;  
 
app.get('/callback', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
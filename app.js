var fs = require('fs');
var express = require('express');
var http = require('http');


http.createServer((req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
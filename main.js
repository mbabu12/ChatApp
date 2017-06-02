var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function (req, res) {
  var filePath = '.' + req.url;
  var extname = path.extname(filePath);

  if(req.url === '/home' || req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/views/index.html').pipe(res);
  }
  else if(req.url === '/rooms'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/views/rooms.html').pipe(res);
  }
  else if(extname === '.css'){
    res.writeHead(200, {'Content-Type': 'text/css'});
    fs.createReadStream(filePath).pipe(res);
  }
  else if(extname === '.jpg'){
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    fs.createReadStream(filePath).pipe(res);
  }
  else if(extname === '.html'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/views' + req.url).pipe(res);
  }
  else{
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end("File Not Found");
  }
});

server.listen(3000, '127.0.0.1');
console.log('listening to port 3000');

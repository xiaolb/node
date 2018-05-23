var http = require('http');  
http.createServer(function (request, response) {  
    response.writeHead(200, {
      'Content-Type': 'text/plain',
      'charset': 'utf-8'
    });  
    response.end('好了哦\n');  
}).listen(80);  
console.log('Server running at http://127.0.0.1:80/');  
 
var http = require('http');
var fs = require('fs');
//creating a server
server = http.createServer(function (request, response){
  response.writeHead(200, {'Content-type': 'text/html'});
  console.log('Request', request.url);
  if(request.url === '/'){
    fs.readFile('views/chat.html', 'utf8', function (errors, contents){
      response.write(contents); 
      response.end();
    });
  } 
  else if(request.url === '/chat.html')
  {
    fs.readFile('views/chat.html', 'utf8', function (errors, contents){
      response.write(contents);
      response.end();
    });
  } 
  else 
  {
    response.end('File not found!!!');
  }
});
server.listen(7077);
console.log("Running in localhost at port 7077");
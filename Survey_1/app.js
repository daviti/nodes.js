 
var http = require('http');
var fs = require('fs');
//creating a server
server = http.createServer(function (request, response){
  response.writeHead(200, {'Content-type': 'text/html'});
  console.log('Request', request.url);
  if(request.url === '/'){
    fs.readFile('views/survey.html', 'utf8', function (errors, contents){
      response.write(contents); 
      response.end();
    });
  } 
  else if(request.url === '/result.html')
  {
    fs.readFile('views/result.html', 'utf8', function (errors, contents){
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
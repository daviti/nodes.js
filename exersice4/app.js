
var http = require('http');
var mysql = require('mysql');

var attempt = 0;
var db = mysql.createConnection({
  user: 'root',
  password: '',
  database: ''
});

server = http.createServer(function (request, response){
  response.writeHead(200, {'Content-type': 'text/html'});
  attempt = attempt + 1;
 response.end('Attempt #' + attempt);

db.query('SELECT * FROM contacts', function (errors, results);
 results.forEach(function (result) {
    console.log(result.firstname + ' ' + result.lastname + ' ' + result.email);
  });
});


});
server.listen(6789);
console.log('Server in localhost at port 6789');

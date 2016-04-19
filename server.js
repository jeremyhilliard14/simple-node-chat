var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){
	fs.readFile('index.html', 'UTF-8', function(error, data){
		response.writeHead(200, {'content-type': 'text/html'});
	response.write(data);
	response.end();
	})

});

var io = require('socket.io').listen(server);

io.sockets.on('connect', function(socket){
	console.log(socket);
	socket.on('message_to_server', function(data){
		io.sockets.emit('message_to_client', {message: data.message});
	})
})

server.listen(8001);
console.log('Server listening on port 8001');
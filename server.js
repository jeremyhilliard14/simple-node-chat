var http = require('http');
var fs = require('fs');
var port = process.env.PORT || '8001';

var server = http.createServer(function(request, response){
	fs.readFile('index.html', 'UTF-8', function(error, data){
		response.writeHead(200, {'content-type': 'text/html'});
	response.write(data);
	response.end();
	})

});

var io = require('socket.io').listen(server);
var messageArray = [];

io.sockets.on('connect', function(socket){
	console.log(socket);
	var date = new Date();
	var time = date.toLocaleTimeString();
	console.log(time)
	socket.on('message_to_server', function(data){
		io.sockets.emit('message_to_client', {message: data.message, time: time});
		messageArray.push(data.message);
	})
})


server.listen(port);
console.log('Server listening on port 8001');
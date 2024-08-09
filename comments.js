// Create web server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 8080;

// Create a list of comments
var comments = [];

// Load the comments
app.get('/comments', function(req, res) {
  res.send(comments);
});

// Add a new comment
app.post('/comments', function(req, res) {
  var comment = req.body;
  comments.push(comment);
  io.emit('comment', comment);
  res.send(comment);
});

// Start the web server
server.listen(port, function() {
  console.log('Server listening at port %d', port);
});
const express = require('express')
const app = express();
const http = require('http').Server(app).listen(80);
const io = require('socket.io')(http);
console.log('[+] Server Started!');
app.get('/', function(req,res) {
  res.sendFile(__dirname+'/index.html');
});
io.on('connection', function(socket){
  console.log('[+] A User is Connected!');
  socket.on('message', function(data) {
    console.log('[+] Received : ' + data);
    socket.emit('sendres', data)
  });
  socket.on('disconnect', function(){
    console.log('[+] A user is disconnected!')
  })
})
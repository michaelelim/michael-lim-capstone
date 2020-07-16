  var socket = io().connect('http://localhost:80');
  var append = "";

  function send(data){
  socket.emit('message',data);
  document.getElementById("sender").value = "";
  };
  socket.on('sendres',function(data){
      append+= '<br>[+]'+data;
      document.getElementById('results').innerHTML=append;
  })
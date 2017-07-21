var socket = io.connect('http://localhost:3000');
socket.on('connect', function(){
  var userid = document.getElementById("jsfile").getAttribute("userid");
  socket.emit('authentication', {id: userid });
  socket.on('authenticated', function() {
    // use the socket as usual
  });
});


$('#logout').click(function() {
  window.open("/logout", "_self",false);
});

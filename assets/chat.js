var socket = io.connect('http://localhost:3000');
var chatwith = '';
var chatuser = '';

$(document).ready(function(){
  $('#enter').on('click', sendmsg);
});

socket.on('connect', function(){
  var userid = document.getElementById("jsfile").getAttribute("userid");
  var userName = document.getElementById("jsfile").getAttribute("userName");
  socket.emit('authentication', {id: userid, name: userName });
  socket.on('authenticated', function() {
    // use the socket as usual
    socket.on('getUsers', function(data){
      //console.log(data);
      var active = $('#active-users');
      active.html('');
      for (var i = 0; i < data.length; i++){
        active.append('<hr>');
        active.append('<li id = '+data[i].id +' onclick = startchat(this.id)><p>'+data[i].name+'</p></li>');
      }
      active.append('<hr>');
    });
    socket.emit('new connection','sdfsdf');

    socket.on('sendmsg', function(data){
      if(data.usId === chatwith){
        var textarea = $('#texts');
        textarea.append('<p>'+chatuser+': '+data.msg+'</p>');
        scrollbottom();
      }
      else if(data.usId === ''){
        var textarea = $('#texts');
        textarea.append('<p>'+chatuser+' '+data.msg+'</p>');
      }
      else{
        var clicked = document.getElementById(data.usId);
        clicked.style.backgroundColor = 'lightblue';
      }
    });
  });
});

function startchat(id){
  var clicked = document.getElementById(id);
  clicked.style.backgroundColor = 'white';
  chatwith = id;
  var name = $('#'+id+" p").text();
  chatuser = name;
  var text = $('#header');
  text.html('');
  text.append('<h2>Chatting with '+name+'</h2>');
  var textarea = $('#texts');
  textarea.html('');
}

function scrollbottom(){
  var objDiv = document.getElementById("texts");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function sendmsg(){
  if(chatwith !== ''){
    var msgarea = $('#msgarea');
    var msg = msgarea.val();
    $('#texts').append('<p id = me >Me: '+msg+'</p>');
    scrollbottom();
    msgarea.val('');
    socket.emit("newmsg", {to: chatwith, message:msg});
  }
}

document.getElementById("msgarea").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    document.getElementById("enter").click();
  }
});


$('#logout').click(function() {
  window.open("/logout", "_self",false);
});

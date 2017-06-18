$(function() {

  var addAction = function() {

    var newRoomValue = $('#room_name').val();

    if (newRoomValue == '') {
      return true;
    }

    $('#room_list').append('<section class = "room">');

  };

  document.getElementById("room_name").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      document.getElementById("create_room").click();
    }
  });

  $('#logout').click(function() {
    window.open("/", "_self",false);
  });

  $('.seeFull').click(function() {
    window.open("/conversation", "_self",false);
  });

  $('#create_room').on('click', addAction);

});
/*
var username = sessionStorage.getItem("username");
document.getElementById('username').innerHTML = username;
function create()
{
  var room = document.getElementById('room_name').value;
  document.write(room);
}*/

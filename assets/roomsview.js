$(document).ready(function(){

  $('#create_room').on('click', function(){

    var title = $('#room_name').val();
    var text = $('#text').val();
    var lat;
    var lon;

    $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
      JSON.stringify(data, null, 2);
      lat = data.latitude;
      lon = data.longitude;
    });

    var newConv = {title: title, latitude:lat, longitude:lon, userId:'', date:'', text: text, img: '',comments:''};
/*
    $.ajax({
      type: 'POST',
      url: '/',
      data: '',
      success: function(resp){
      }
    });
    */
    return false;
  });
});



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

/*
var username = sessionStorage.getItem("username");
document.getElementById('username').innerHTML = username;
function create()
{
  var room = document.getElementById('room_name').value;
  document.write(room);
}*/

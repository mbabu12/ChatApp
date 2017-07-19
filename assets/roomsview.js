function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


$(document).ready(function(){
  var files = [];

  $("input[type=file]").change(function(event) {
  $.each(event.target.files, function(index, file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      object = {};
      object.filename = file.name;
      object.data = event.target.result;
      files.push(object);
    };
    reader.readAsDataURL(file);
  });
});

  $('#create_room').on('click', function(){

    var title = $('#room_name').val();
    var text = $('#text').val();

    $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
      JSON.stringify(data, null, 2);

      var lat = data.latitude;
      var lon = data.longitude;
      var id = getParameterByName('id');
      var date = new Date();

      var newConv = {title: title, latitude:lat, longitude:lon, userId:id, date:date, text: text, img:files[0].filename, comments:[]};
      var alldata = {fordb : newConv, imgData : files[0].data};

      $.ajax({
        type: 'POST',
        url: '/rooms',
        data: alldata,
        success: function(data){
          location.reload();
        }
      });
      return false;
    });
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

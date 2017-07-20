function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function createComment(){
  var text = $('#addComment').val();
  var date = new Date();
  var id = getParameterByName('id');

  var newCom = {text:text, date:date};

  $.ajax({
    type: 'POST',
    url: '/conversation?id='+id,
    data: newCom,
    success: function(data){
      location.reload();
    }
  });
  return false;
}

document.getElementById("addComment").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    createComment();
  }
});

$('#logout').click(function() {
  window.open("/logout", "_self",false);
});

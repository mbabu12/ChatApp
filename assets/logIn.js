$(document).ready(function(){

  $('#enter').on('click', function(){

    var name = $('#name').val();
    var password = $('#password').val();
    var loginData = {lname: name, lpassword:password};

    $.ajax({
      type: 'POST',
      url: '/',
      data: loginData,
      success: function(data){
        location.reload();
      }
    });

    return false;

  });

  $('#signUp').on('click', function(){

    var name = $('#name').val();
    var password = $('#password').val();
    var loginData = {lname: name, lpassword:password};

    $.ajax({
      type: 'POST',
      url: '/',
      data: loginData,
      success: function(data){
        location.reload();
      }
    });

    return false;

  });
});


/*document.getElementById("name").addEventListener("keyup", function(event) {
event.preventDefault();
if (event.keyCode == 13) {
document.getElementById("enter").click();
}
});

function login()
{
sessionStorage.setItem("username", document.getElementById('name').value);
window.open("rooms.html", "_self",false);
}
function SignUp()
{
sessionStorage.setItem("username", document.getElementById('name').value);
window.open("rooms.html", "_self",false);
} */

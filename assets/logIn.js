$(document).ready(function(){

  $('#enter').on('click', function(){

    var name = $('#name').val();
    var password = $('#password').val();
    var loginData = {login:'yes', lname: name, lpassword:password};

    $.ajax({
      type: 'POST',
      url: '/',
      data: loginData,
      success: function(resp){
        if(resp === 'user exists'){
          window.location.href = '/rooms';
        }
        else{
          location.reload();
        }
      }
    });

    return false;

  });

  $('#signUp').on('click', function(){

    var name = $('#name').val();
    var password = $('#password').val();
    var loginData = {login:'no', lname: name, lpassword:password};

    $.ajax({
      type: 'POST',
      url: '/',
      data: loginData,
      success: function(resp){
        if(resp === 'success'){
          window.location.href = '/';
        }
        else{
          location.reload();
        }
      },
      error: function(err){
        alert(err);
      }
    });

    return false;
  });
});

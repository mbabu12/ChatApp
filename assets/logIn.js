var files = [];

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profileImage').attr('src', e.target.result);
            object = {};
            object.filename = input.files[0].name;
            object.data = e.target.result;
            files.push(object);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#imageUpload").change(function(){
    readURL(this);
});


$(document).ready(function(){
  $("#profileImage").click(function(e) {
    $("#imageUpload").click();
  });
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
    var imgname = '';
    var imgdata = '';
    if(files.length == 0){
      imgname = 'girl.png';
    }
    else{
      imgname = files[0].filename;
      imgdata = files[0].data;
    }

    var loginData = {login:'no', lname: name, lpassword:password, imgname: imgname, imgdata : imgdata};

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

document.getElementById("password").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    document.getElementById("enter").click();
  }
});

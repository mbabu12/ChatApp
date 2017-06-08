document.getElementById("name").addEventListener("keyup", function(event) {
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
}

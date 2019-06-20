const socket = io();

var login = document.getElementById('btn-login');
var singin = document.getElementById('btn-singin');

login.addEventListener('click', function (e) {
  e.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var data = {password: password, email: email}
  console.log(data);
  
  socket.emit('login', data, function (response) {
    console.log(response);
    if (response.errorCode) return alert(response.errorCode);
    localStorage.setItem('userToken', response.token);
    window.location.href = "/chats.html";
  });
});

singin.addEventListener('click', function (e) {
  e.preventDefault();
  var email = document.getElementById('email-singin').value;
  var password = document.getElementById('password-singin').value;
  var name = document.getElementById('name').value;
  var data = {password: password, email: email, name: name}

  socket.emit('singin', data, function (response) {
    console.log(response);
    if (response.errorCode) return alert(response.errorCode);
    localStorage.setItem('userToken', response.token);
    window.location.href = "/chats.html";
  })
})
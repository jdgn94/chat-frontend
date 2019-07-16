var login = document.getElementById('btn-login');
var singin = document.getElementById('btn-singin');
const url = 'http://192.168.0.110:3000/api';

console.log(localStorage);

login.addEventListener('click', function (e) {
  e.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var data = JSON.stringify({password: password, email: email});

  const request = new Request(url + '/auth/sessions', {
    headers: { "content-type": "application/json" },
    method: 'POST',
    body: data
  });
  
  fetch(request)
  .then((response) => {
    if (response.status == 200){
      const res = response.json()
      Promise.resolve(res).then(function(value) {
        localStorage.setItem('userToken', value.token);
      })
      window.location.href = '/chats.html';
    }
  })
});

singin.addEventListener('click', function (e) {
  e.preventDefault();
  var email = document.getElementById('email-singin').value;
  var password = document.getElementById('password-singin').value;
  var name = document.getElementById('name').value;
  var data = JSON.stringify({password: password, email: email, name: name});

  const request = new Request(url + '/users', {
    headers: { "content-type": "application/json" },
    method: 'POST',
    body: data
  });

  fetch(request)
  .then(response => {
    if (response.status == 200){
      const res = response.json()
      Promise.resolve(res).then(function(value) {
        localStorage.setItem('userToken', value.token)
      })
      window.location.href = '/chats.html'
    }
  });
});
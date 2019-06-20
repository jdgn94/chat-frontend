var logout = document.getElementById('btn-logout');

logout.addEventListener('click', function () {
  localStorage.removeItem('userToken');
  window.location.href = "/";
})
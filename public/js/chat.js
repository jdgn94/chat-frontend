const logout = document.getElementById('logout');
console.log(localStorage)

logout.addEventListener('click', function() {
  console.log("hola vale");
  localStorage.removeItem('userToken')
  window.location.href = '/index.html'
});
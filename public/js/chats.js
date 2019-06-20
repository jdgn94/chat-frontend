const socket = io();

var logout = document.getElementById('btn-logout');

logout.addEventListener('click', function () {
  localStorage.removeItem('userToken');
  window.location.href = "/";
})

socket.emit('token', localStorage.getItem('userToken'), function (response) {
  socket.on('allChats', function (chats) {
    
    console.log (chats);
    // let ol = document.createElement('ol');
  
    // chats.forEach( function (chat) {
    //   let li = document.createElement('li');
    //   li.innerHTML = user;
    //   ol.appendChild(li);
    // })
  
    // let chatList = document.getElementById('all-chats');
    // chatList.innerHTML = "";
    // chatList.appendChild(ol);
  });
});
let socket = io('http://192.168.0.110:3000/', {
    query: { token: localStorage.getItem('userToken') }
});

function scrollToBottom() {
    let messages = document.querySelector('#messages').lastElementChild;
    messages.scrollIntoView();
  }

  let searchQuery = window.location.search.substring(1);
  let params = JSON.parse('{"'+decodeURI(searchQuery).replace(/&/g,'","').replace(/\+/g,'" "').replace(/=/g,'":"')+'"}')


socket.on('connect', function(){
    console.log('Connected to server. token:', localStorage.getItem('userToken'));
    console.log(params);

   
    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('No Error');
            
        }
    })
});

socket.on('disconnect', function(){
    console.log('Disconnected to server.');
});

socket.on('updateUserList', function (users) {
    console.log(users);
    let ol = document.createElement('ol');
    users.forEach(function (user) {
        let li = document.createElement('li');
        li.innerHTML = user;
        ol.appendChild(li);
    })

    let usersList = document.querySelector('#users');
    usersList.innerHTML = "";
    usersList.appendChild(ol);
    
})

socket.on("newMessage", function (message) {
    
    console.log(message);
    

    const formattedTime = moment(message.createdAt).format('LT');
    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.senderId,
        text: message.text,
        createdAt: message.createdAt
    });

    const div = document.createElement('div');
    div.innerHTML = html

    document.querySelector('#messages').appendChild(div);
    scrollToBottom();
});


socket.on("newLocationMessage", function (message) {
    console.log("newLocationMessage", message);
    const formattedTime = moment(message.createdAt).format('LT');

    let li = document.createElement('li');
    let a = document.createElement('a');
    li.innerText = `${message.from} ${formattedTime}`;
    a.setAttribute('target', '_blank');
    a.setAttribute('href',message.url);
    a.innerText('My current location');

    li.appendChild(a);

    document.querySelector('body').appendChild(li);
})


document.querySelector('#submit-btn').addEventListener('click', function(e){
    e.preventDefault();

    params['text'] = document.querySelector('input[name="message"]').value;

    socket.emit("createMessage", params, function(){
        document.querySelector('input[name="message"]').value = '';
    })
})


document.querySelector('#send-location').addEventListener('click', function(e){
    console.log(navigator.geolocation);
    if(navigator.geolocation) {
        return alert("Geolocation is not supported by your browser.")
    }


    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
        
    },function () {
        alert("unable to fetch location");
    })
 
});
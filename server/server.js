const path = require('path');
const express = require('express');
var Request = require("request");
const app = express();

app.set('port', (process.env.PORT || '4000'));

app.use(express.static(path.join(__dirname, "../public")));

const server = app.listen(app.get('port'), function () {
  console.log(`port conection ${app.get('port')}`);
});

const SocketIO = require('socket.io');
const io = SocketIO.listen(server);
const url = 'http://localhost:3000/api';

io.on('connection', (socket) => {
  console.log(`New conection ${socket.id}`);

  socket.on('login', (params, callback) =>{
    Request.post({
      "headers": { "content-type": "application/json" },
      "url": `${url}/auth/sessions`,
      "body": JSON.stringify({
        "email": params.email,
        "password": params.password
      })
    }, (error, response, body) => {
      if(error) {
        console.dir(error);
        return callback(null);
      }
      console.dir(JSON.parse(body));
      return callback(JSON.parse(body));
    });
  });

  socket.on('singin', (params, callback) => {
    Request.post({
      "headers": { "content-type": "application/json" },
      "url": `${url}/users`,
      "body": JSON.stringify({
        "name": params.name,
        "email": params.email,
        "password": params.password
      })
    }, (error, response, body) => {
      if(error) {
        console.dir(error);
        return callback(null);
      }
      console.dir(JSON.parse(body));
      return callback(JSON.parse(body));
    });
  });

  socket.on('token', (param) => {
    Request.get(`${url}/conversations/`, param, (error, response, body) => {
      if (error) return console.dir(error);
      console.dir(JSON.parse(body));
      return socket.emit('allChats', JSON.parse(body));
    })
  });
});
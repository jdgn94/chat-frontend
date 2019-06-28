const path = require('path');
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || '4000'));

app.use(express.static(path.join(__dirname, "../public")));

const server = app.listen(app.get('port'), function () {
  console.log(`port conection ${app.get('port')}`);
});

const socketIO = require('socket.io');
let io = socketIO(server);
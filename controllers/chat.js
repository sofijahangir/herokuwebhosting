// chat controller
// const Chat = require('../models/chatSchema');
const http = require('http');

const express = require('express');

const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

const chat = async (req, res) => {
  // Socket

  io.on('connection', (socket) => {
    console.log('Connected...');
    socket.on('message', (msg) => {
      socket.broadcast.emit('message', msg);
    });
  });
  res.sendFile(`${__dirname}/index.html`);
};

module.exports = chat;

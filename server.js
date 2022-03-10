// Require the express moule
const express = require('express');

const http = require('http');

const userRoutes = require('./routes/user');

// create a new express application
const app = express();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.use('/', userRoutes);

// Socket
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Connected...');
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

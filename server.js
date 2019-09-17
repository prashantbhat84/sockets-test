const io = require('socket.io')(3000);
let users = {};
io.on('connection', socket => {
  console.log('New User');
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });
  socket.emit('chat-message', '');
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', {
      message: message,
      name: users[socket.id]
    });
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});

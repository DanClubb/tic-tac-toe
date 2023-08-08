const io = require("socket.io")(5050, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  socket.on("check room", (room) => {
    if (io.sockets.adapter.rooms.get(room)?.size === 2)
      socket.emit(
        "room full",
        "Room is full please choose another room to play!"
      );
  });
  socket.on("join room", (room) => {
    socket.join(room);
    socket.on("make move", (move, cell) => {
      socket.to(room).emit("receive move", move, cell);
    });
  });
});

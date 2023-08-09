const io = require("socket.io")(5050, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  socket.on("check room", (room) => {
    if (io.sockets.adapter.rooms.get(room)?.size === 2) {
      socket.emit(
        "room full",
        "Room is full! Please choose another room to play"
      );
    }
  });
  socket.on("join room", (room) => {
    socket.join(room);
    socket.on("get turns", () => {
      const usersInRoom = io.sockets.adapter.rooms.get(room);
    });
    socket.on("make move", (move, cell) => {
      socket.to(room).emit("receive move", move, cell);
    });
  });

  socket.on("leave room", (room) => {
    socket.leave(room);
  });
});

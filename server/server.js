const io = require("socket.io")(5050, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  socket.on("join room", (room) => {
    socket.join(room);
  });

  socket.on("check room", (room) => {
    if (io.sockets.adapter.rooms.get(room)?.size === 2) {
      socket.emit(
        "room full",
        "Room is full! Please choose another room to play"
      );
    }
  });

  socket.on("leave room", (room) => {
    socket.leave(room);
  });

  socket.on("get turns", (room) => {
    console.log(io.sockets.adapter.rooms.get(room));
    const usersInRoom = io.sockets.adapter.rooms.get(room);
    // console.log("var value => ", usersInRoom[0]);
  });

  socket.on("make move", (move, cell, room) => {
    socket.to(room).emit("receive move", move, cell);
  });
});

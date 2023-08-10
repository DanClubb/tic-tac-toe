const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const buildPath = path.join(__dirname, "../build");

app.use(express.static(buildPath));
app.use(express.json());

///////// ACCESSING ROOMS /////////

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

  ///////// GAME /////////

  socket.on("room joined", (room) => {
    if (io.sockets.adapter.rooms.get(room)?.size === 2) {
      socket.emit("start game", "cross");
      socket.to(room).emit("start game", "circle");
    }
  });

  socket.on("make move", (move, cell, room) => {
    socket.to(room).emit("receive move", move, cell);
  });
});

// gets the static files from the build folder
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is online on port: ${port}`);
});

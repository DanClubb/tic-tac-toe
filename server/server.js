const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const port = 8080;
const server = http.createServer(app);

const buildPath = path.join(__dirname, "../build");

app.use(express.static(buildPath));
app.use(express.json());
app.use(cors());

// const io = new Server(server, {
//   cors: {
//     origin: "https://tic-tac-toe-6mi5.onrender.com",
//   },
// });
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

///////// ACCESSING ROOMS /////////
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

  socket.on("room joined", async (room) => {
    if (io.sockets.adapter.rooms.get(room)?.size === 2) {
      let playerIds = io.sockets.adapter.rooms.get(room);
      const playAgainDefault = Object.assign(
        ...Array.from(playerIds, (id) => ({ [id]: false }))
      );

      socket.emit("start game", "cross");
      socket.to(room).emit("start game", "circle");
      io.to(room).emit("play again default", playAgainDefault);
    }
  });

  socket.on("make move", (move, cell, room) => {
    socket.to(room).emit("receive move", move, cell);
  });

  socket.on("play again choice", (room, userChoice) => {
    socket.to(room).emit("send user opponent choice", userChoice);

    // if (playAgain === 2) {
    //   console.log(playAgain);
    //   socket.emit("play again");
    // }
  });
});

// gets the static files from the build folder
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

server.listen(port, () => {
  console.log(`Server is online on port: ${port}`);
});

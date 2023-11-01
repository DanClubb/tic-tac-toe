import { io } from "socket.io-client";

// const socket = io("https://tic-tac-toe-6mi5.onrender.com/");
const socket = io("http://localhost:8080");

export default socket;

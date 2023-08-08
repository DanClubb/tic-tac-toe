import { Link } from "react-router-dom";
import { useState } from "react";
import socket from "../socket";

function Home() {
  const [room, setRoom] = useState<string>();
  const [roomFull, setRoomFull] = useState<string | null>(null);

  const joinRoom = () => {
    if (!roomFull) socket.emit("join room", room);
  };

  const checkRoomAvailability = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value);
    setRoomFull(null);

    socket.emit("check room", e.target.value);

    socket.on("room full", (message) => {
      setRoomFull(message);
    });
  };
  console.log(roomFull);

  return (
    <main className="flex flex-col justify-center items-center gap-4 h-full">
      <h1 className="text-2xl">
        <span className="bold uppercase text-violet-500">Create</span> or{" "}
        <span className="bold uppercase text-orange-400">join</span> a room
      </h1>
      <form className="mb-[15%]">
        <input
          className="border-2 border-violet-500 rounded-md mr-4 p-2 w-72 hover:outline-0 hover:shadow-md hover:shadow-violet-500 hover:transition-all"
          placeholder="Room name"
          onChange={(e) => checkRoomAvailability(e)}
        />

        <Link
          to={roomFull ? "" : "/gameboard"}
          onClick={joinRoom}
          className="border-2 border-orange-400 rounded-md px-5 py-2 hover:text-white hover:bg-orange-400 hover:transition-all"
        >
          GO
        </Link>
      </form>
      <p>{roomFull}</p>
    </main>
  );
}

export default Home;

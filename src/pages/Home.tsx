import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSocket } from "../contexts/socketContext";

function Home() {
  const { socket, room, setRoom } = useSocket();
  const [roomFull, setRoomFull] = useState<string | null>(null);
  const navigation = useNavigate();

  const joinRoom = () => {
    if (!roomFull) {
      socket.emit("join room", room);
      navigation("/game-room");
    }
  };

  const checkRoomAvailability = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value.trim());
    setRoomFull(null);

    socket.emit("check room", e.target.value);

    socket.on("room full", (message: string) => {
      setRoomFull(message);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinRoom();
  };

  return (
    <main className="flex flex-col items-center gap-4 h-full">
      <h1 className="mt-[18%] text-2xl">
        <span className="bold uppercase text-violet-500">Create</span> or{" "}
        <span className="bold uppercase text-orange-400">join</span> a room
      </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="border-2 border-violet-500 rounded-md mr-4 p-2 w-72 hover:outline-0 hover:shadow-md hover:shadow-violet-500 hover:transition-all"
          onChange={(e) => checkRoomAvailability(e)}
          placeholder="Room name"
          minLength={2}
          required
        />

        <button
          className={`${
            roomFull
              ? "cursor-not-allowed"
              : "hover:text-white hover:bg-orange-400 hover:transition-all"
          } border-2 border-orange-400 rounded-md px-5 py-2`}
        >
          GO
        </button>
      </form>
      <p className="text-lg text-red-500">{roomFull}</p>
    </main>
  );
}

export default Home;

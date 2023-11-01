import { Link } from "react-router-dom";
import { useSocket } from "../contexts/socketContext";

function Header() {
  const { socket, room, setRoom } = useSocket();
  const leaveRoom = () => {
    socket.emit("leave room", room);
    setRoom("");
  };
  return (
    <div className="flex justify-between items-center">
      <Link
        to="/"
        onClick={leaveRoom}
        className="mt-4 ml-10 py-2 px-4 rounded-full bg-slate-200"
      >
        ← Leave
      </Link>
      <h2 className="mt-4 mr-10 text-lg font-bold">
        <span className="text-xl">Room:</span> {room}
      </h2>
    </div>
  );
}

export default Header;

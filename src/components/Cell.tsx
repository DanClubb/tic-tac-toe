import Cross from "../components/Cross";
import Circle from "../components/Circle";
import { useSocket } from "../contexts/socketContext";

interface CellProps {
  cell: number;
  crosses: number[];
  circles: number[];
  gameState: string;
  setCrosses: React.Dispatch<React.SetStateAction<number[]>>;
  setCircles: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function Cell({
  cell,
  gameState,
  crosses,
  circles,
  setCircles,
  setCrosses,
}: CellProps) {
  const { socket, room, turn, setTurn, playerSymbol } = useSocket();

  const handleCellClick = (cell: number) => {
    if (!(crosses.includes(cell) || circles.includes(cell))) {
      if (turn === "cross") {
        socket.emit("make move", "cross", cell, room);
        setCrosses((prev) => [...prev, cell]);
      }
      if (turn === "circle") {
        socket.emit("make move", "circle", cell, room);
        setCircles((prev) => [...prev, cell]);
      }
      setTurn((prevTurn) => {
        if (prevTurn === "cross") return "circle";
        else return "cross";
      });
    }
  };
  return (
    <button
      key={cell}
      className={`cell ${gameState !== "playing" && "disabled-cell"}`}
      onClick={() => handleCellClick(cell)}
      disabled={gameState !== "playing" || playerSymbol !== turn}
    >
      {(crosses.includes(cell) && <Cross />) ||
        (circles.includes(cell) && <Circle />)}
    </button>
  );
}

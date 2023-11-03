import Cell from "../components/Cell";
import { useSocket } from "../contexts/socketContext";

interface GameBoardProps {
  gameState: string;
}

export default function Gameboard({ gameState }: GameBoardProps) {
  const { socket, setTurn, crosses, setCrosses, circles, setCircles } =
    useSocket();
  const GRID_CELLS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  socket.on("receive move", (move: string, cell: number) => {
    if (move === "cross") {
      setCrosses((prev) => {
        if (!prev.includes(cell)) {
          return [...prev, cell];
        } else {
          return [...prev];
        }
      });
      setTurn("circle");
    }
    if (move === "circle") {
      setCircles((prev) => {
        if (!prev.includes(cell)) {
          return [...prev, cell];
        } else {
          return [...prev];
        }
      });
      setTurn("cross");
    }
  });

  return (
    <section className="mx-auto grid w-fit grid-cols-3 gap-2 bg-slate-500">
      {GRID_CELLS.map((cell) => {
        return (
          <Cell
            cell={cell}
            crosses={crosses}
            circles={circles}
            gameState={gameState}
            setCrosses={setCrosses}
            setCircles={setCircles}
          />
        );
      })}
    </section>
  );
}

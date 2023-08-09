import { useCallback, useEffect, useState } from "react";
import socket from "../socket";
import Cross from "../components/Cross";
import Circle from "../components/Circle";
import { Link } from "react-router-dom";

function GameBoard() {
  const [crosses, setCrosses] = useState<number[]>([]);
  const [circles, setCircles] = useState<number[]>([]);
  const [turn, setTurn] = useState("cross");
  const [room, setRoom] = useState(sessionStorage.getItem("room"));
  const [gameState, setGameState] = useState("playing");
  const GRID_CELLS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  socket.on("receive move", (move: string, cell: number) => {
    if (!(crosses.includes(cell) || circles.includes(cell))) {
      if (move === "cross") {
        setCrosses((prev) => [...prev, cell]);
      }
      if (move === "circle") {
        setCircles((prev) => [...prev, cell]);
      }
    }
  });

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
    }
  };

  useEffect(() => {
    const handleTurn = () => {
      socket.emit("get turns", room);
    };
    handleTurn();
  }, []);

  const leaveRoom = () => {
    socket.emit("leave room", room);
    setRoom("");
    sessionStorage.removeItem("room");
  };

  const checkForWin = useCallback((): boolean => {
    const winningCombinations: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    let win: boolean = false;

    winningCombinations.forEach((combination) => {
      if (win) {
        return;
      }
      win =
        combination.every((cell) => {
          return crosses.includes(cell);
        }) ||
        combination.every((cell) => {
          return circles.includes(cell);
        });
    });
    return win;
  }, [crosses, circles]);

  const checkResult = useCallback(() => {
    if (checkForWin()) {
      setGameState("win");
    } else if ([...crosses, ...circles].length === 9) {
      setGameState("draw");
    } else
      setTurn((prevTurn) => {
        if (prevTurn === "cross") return "circle";
        else return "cross";
      });
  }, [checkForWin, circles, crosses]);

  useEffect(() => {
    checkResult();
  }, [crosses, circles, checkResult]);

  return (
    <main>
      <h2>Room: {room}</h2>
      <h3 className="my-16 text-center text-4xl uppercase">Your turn</h3>
      <section className="mx-auto grid w-fit grid-cols-3 gap-2 bg-slate-500">
        {GRID_CELLS.map((cell) => {
          return (
            <button
              key={cell}
              className="cell"
              onClick={() => handleCellClick(cell)}
              disabled={gameState !== "playing"}
            >
              {(crosses.includes(cell) && <Cross />) ||
                (circles.includes(cell) && <Circle />)}
            </button>
          );
        })}
      </section>
      <p className="mt-10 text-center text-2xl">
        <span className="bold uppercase text-orange-400">Crosses</span> 2 : 0
        <span className="bold uppercase text-violet-500"> Circles</span>
      </p>
      {gameState !== "playing" && (
        <button
          className="mx-auto mt-8 flex items-center justify-center gap-2 text-4xl capitalize"
          onClick={() => {
            setCircles([]);
            setCrosses([]);
            setGameState("playing");
          }}
        >
          {gameState === "draw" ? "It's a draw!" : `${turn} wins!`}{" "}
          <span className="rounded-lg border-4 border-orange-400 p-3 text-2xl hover:border-violet-500 hover:bg-violet-500 hover:text-white">
            Play Again?
          </span>
        </button>
      )}
      <Link to="/" onClick={leaveRoom}>
        Back
      </Link>
    </main>
  );
}

export default GameBoard;

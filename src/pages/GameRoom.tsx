import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../contexts/socketContext";
import Gameboard from "../components/Gameboard";
import EndGameModal from "../components/EndGameModal";
import TurnIndicator from "../components/TurnIndicator";
import Header from "../components/Header";
import ScoreTracker from "../components/ScoreTracker";

function GameRoom() {
  const { socket, room, turn, setPlayerSymbol, crosses, circles } = useSocket();

  const [gameState, setGameState] = useState("pending");
  const [winCount, setWinCount] = useState<{ [key: string]: number }>({
    cross: 0,
    circle: 0,
  });

  const [showModal, setShowModal] = useState(false);

  socket.on("start game", (symbol: string) => {
    setGameState("playing");
    setPlayerSymbol!(symbol);
  });

  useEffect(() => {
    socket.emit("room joined", room);
  }, [room, socket]);

  const checkForWin = useCallback(() => {
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
    let win = false;

    winningCombinations.forEach((combination) => {
      if (win) {
        return win;
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
  }, [circles, crosses]);

  const checkResult = useCallback(() => {
    if (checkForWin()) {
      setGameState("win");
      if (turn === "cross")
        setWinCount((prev) => {
          return { ...prev, circle: prev["circle"] + 1 };
        });
      if (turn === "circle")
        setWinCount((prev) => {
          return { ...prev, cross: prev["cross"] + 1 };
        });
      setTimeout(() => setShowModal(true), 700);
    } else if ([...crosses, ...circles].length === 9) {
      setGameState("draw");
      setShowModal(true);
    }
  }, [checkForWin, circles, crosses, turn]);

  useEffect(() => {
    checkResult();
  }, [crosses, circles, checkResult]);

  return (
    <main className="h-full relative">
      <Header />
      <TurnIndicator />
      <Gameboard gameState={gameState} />
      <ScoreTracker winCount={winCount} />

      {showModal && (
        <EndGameModal
          gameState={gameState}
          setGameState={setGameState}
          setShowModal={setShowModal}
        />
      )}
    </main>
  );
}

export default GameRoom;

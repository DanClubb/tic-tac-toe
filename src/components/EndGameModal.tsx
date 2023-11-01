import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../contexts/socketContext";
import LoadingSpinner from "./LoadingSpinner";

interface EndGameModalProps {
  gameState: string;
}

export default function EndGameModal({ gameState }: EndGameModalProps) {
  const { socket, turn, room, playAgainChoices, setPlayAgainChoices } =
    useSocket();
  const [timer, setTimer] = useState(30);
  const navigation = useNavigate();

  const handleUserPlayAgainChoice = (userChoice: string) => {
    socket.emit("play again choice", room, userChoice);
    setPlayAgainChoices((prev) => {
      if (userChoice === "yes") return { ...prev, user: true };
      else return { ...prev, user: false };
    });
    if (userChoice === "no")
      setTimeout(() => {
        socket.emit("leave room", room);
        navigation("/");
      }, 700);
  };

  const receiveOpponentPlayAgainChoice = (opponentChoice: string) => {
    setPlayAgainChoices((prev) => {
      if (opponentChoice === "yes") return { ...prev, opponent: true };
      else return { ...prev, opponent: false };
    });
    if (opponentChoice === "no")
      setTimeout(() => {
        socket.emit("leave room", room);
        navigation("/");
      }, 700);
  };

  socket.on("send user opponent choice", (opponentChoice: string) =>
    receiveOpponentPlayAgainChoice(opponentChoice)
  );

  const startTimer = useCallback(() => {
    if (timer === 0) {
      socket.emit("leave room", room);
      navigation("/");
    } else {
      setTimeout(() => setTimer((prev) => prev - 1), 1000);
    }
  }, [navigation, room, socket, timer]);

  useEffect(() => {
    startTimer();
  }, [startTimer]);
  return (
    <div className="w-full h-full z-10 absolute top-0 ">
      <div className="w-full h-full bg-slate-400 opacity-75 z-20"></div>
      <div className="w-4/12 p-6 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 rounded-lg">
        {/*  */}
        {(gameState === "draw" || gameState === "win") && (
          <div className="flex items-center justify-center gap-2 mx-auto mt-8 text-5xl font-bold">
            {gameState === "draw" ? (
              <p>It's a draw!</p>
            ) : (
              <p>
                <span
                  className={`capitalize ${
                    turn === "cross" ? "text-violet-500" : "text-orange-400"
                  }`}
                >
                  {turn === "cross" ? "Circle" : "Cross"}
                </span>{" "}
                wins!
              </p>
            )}
          </div>
        )}
        <h1 className="text-3xl text-center">Play Again?</h1>
        <div className="flex justify-between align-center mt-6 px-16">
          {/*  */}
          <div className="flex flex-col">
            <h2 className="mb-2 text-3xl text-center">You</h2>
            {playAgainChoices.user === undefined && <LoadingSpinner />}
            {playAgainChoices.user === true && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0,0,256,256"
              >
                <g
                  fill="#4bde80"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M20.29297,5.29297l-11.29297,11.29297l-4.29297,-4.29297l-1.41406,1.41406l5.70703,5.70703l12.70703,-12.70703z"></path>
                  </g>
                </g>
              </svg>
            )}
            {playAgainChoices.user === false && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0,0,256,256"
              >
                <g
                  fill="#ef4444"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z"></path>
                  </g>
                </g>
              </svg>
            )}
          </div>
          {/*  */}
          <div className="flex flex-col">
            <h2 className="mb-2 text-3xl text-center">Opponent</h2>
            {playAgainChoices.opponent === undefined && <LoadingSpinner />}
            {playAgainChoices.opponent === true && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0,0,256,256"
              >
                <g
                  fill="#4bde80"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M20.29297,5.29297l-11.29297,11.29297l-4.29297,-4.29297l-1.41406,1.41406l5.70703,5.70703l12.70703,-12.70703z"></path>
                  </g>
                </g>
              </svg>
            )}
            {playAgainChoices.opponent === false && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0,0,256,256"
              >
                <g
                  fill="#ef4444"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z"></path>
                  </g>
                </g>
              </svg>
            )}
          </div>
        </div>
        {/*  */}
        <div>{timer}</div>
        <div className="flex justify-center align-center gap-3 mt-20">
          <button
            className="px-4 py-2 bg-green-400 rounded"
            onClick={() => handleUserPlayAgainChoice("yes")}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-red-500 rounded"
            onClick={() => handleUserPlayAgainChoice("no")}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

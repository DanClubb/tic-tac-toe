import { useSocket } from "../contexts/socketContext";

function TurnIndicator() {
  const { turn, playerSymbol } = useSocket();
  return (
    <h3
      className={`mb-12 md:mb-10 2xl:mb-14 text-center text-xl uppercase font-bold sm:text-2xl lg:text-4xl ${
        turn === "cross" ? "text-orange-400" : "text-violet-500"
      }`}
    >
      {playerSymbol === turn ? "Your turn!" : "Waiting for opponent!"}
    </h3>
  );
}

export default TurnIndicator;

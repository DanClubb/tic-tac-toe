import { createContext, useContext, useState } from "react";
import socket from "../socket";

interface SocketContextType {
  socket: any;
  room: string | null;
  setRoom: React.Dispatch<React.SetStateAction<string | null>>;
  turn: string;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  playerSymbol: string | null;
  setPlayerSymbol: React.Dispatch<React.SetStateAction<string | null>>;
  crosses: number[];
  setCrosses: React.Dispatch<React.SetStateAction<number[]>>;
  circles: number[];
  setCircles: React.Dispatch<React.SetStateAction<number[]>>;
  playAgainChoices: PlayAgainChoices;
  setPlayAgainChoices: React.Dispatch<React.SetStateAction<PlayAgainChoices>>;
}

interface PlayAgainChoices {
  user: undefined | boolean;
  opponent: undefined | boolean;
}

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export const SocketContextProvider = ({ ...props }) => {
  const [room, setRoom] = useState<string | null>(null);
  const [turn, setTurn] = useState("cross");
  const [playerSymbol, setPlayerSymbol] = useState<string | null>(null);
  const [crosses, setCrosses] = useState<number[]>([]);
  const [circles, setCircles] = useState<number[]>([]);
  const [playAgainChoices, setPlayAgainChoices] = useState<PlayAgainChoices>({
    user: undefined,
    opponent: undefined,
  });

  return (
    <SocketContext.Provider
      value={{
        socket,
        room,
        setRoom,
        turn,
        setTurn,
        playerSymbol,
        setPlayerSymbol,
        crosses,
        setCrosses,
        circles,
        setCircles,
        playAgainChoices,
        setPlayAgainChoices,
      }}
      {...props}
    />
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketContext;

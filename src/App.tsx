import { Routes, Route } from "react-router-dom";
import GameRoom from "./pages/GameRoom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game-room" element={<GameRoom />} />
    </Routes>
  );
}

export default App;

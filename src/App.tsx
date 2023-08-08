import { Routes, Route } from "react-router-dom";
import GameBoard from "./pages/Gameboard";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gameboard" element={<GameBoard />} />
    </Routes>
  );
}

export default App;

import { render, screen } from "@testing-library/react";
import Home from "./pages/Home";
// import Gameboard from "./pages/Gameboard";
import { BrowserRouter } from "react-router-dom";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const linkElement = screen.getByRole("heading");
  expect(linkElement).toBeInTheDocument();
});

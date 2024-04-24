import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

let grid = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Game = () => {
  const [winner, setWinner] = React.useState();
  const [currentPlayer, setCurrentPlayer] = React.useState("X");
  const [winningCombo, setWinningCombo] = React.useState([]);

  const changeCurrentPlayer = () => {
    currentPlayer === "X" ? setCurrentPlayer("O") : setCurrentPlayer("X");
  };

  const checkForWinner = () => {
    for (let i = 0; i <= 7; i++) {
      let winningCombo = winningCombos[i]; // 0: [0, 1, 2]
      let a = grid[winningCombo[0]]; // grid[0]
      let b = grid[winningCombo[1]]; // grid[1]
      let c = grid[winningCombo[2]]; // grid[2]

      if (a === "" || b === "" || c === "") continue;
      if (a === b && b === c) {
        setWinner(currentPlayer);
        setWinningCombo(winningCombo);
        return;
      }
    }
  };
  const handleClick = (index) => {
    if (grid[index] === "") {
      grid[index] = currentPlayer;
      checkForWinner();
      changeCurrentPlayer();
    }
  };

  const handleReset = () => {
    grid = ["", "", "", "", "", "", "", "", ""];
    setWinner("");
    setCurrentPlayer("X");
  };

  return (
    <div className="container">
      <div className="winner">
        {winner ? (
          <h1>
            The winner is: <span className="green">{winner}</span>
          </h1>
        ) : (
          <h1>
            It is <span className="green">{currentPlayer}</span>&apos;s turn
          </h1>
        )}
      </div>
      <div className="grid">
        {grid.map((item, index) => (
          <button
            className={`grid-item ${
              winningCombo.length && winningCombo.includes(index)
                ? "winner-combo"
                : ""
            }`}
            key={index}
            onClick={() => handleClick(index)}
            disabled={winner}
          >
            {item}
          </button>
        ))}
      </div>

      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

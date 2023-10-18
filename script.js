const statusDisplay = document.querySelector(".gamestatus");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `${currentPlayer} WON!`;
const drawMessage = () => `draw!`;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function CellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function PlayerChange() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function Result() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") continue;
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  const roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  PlayerChange();
}

function CellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = +clickedCell.getAttribute("id");
  if (gameState[clickedCellIndex] !== "" || !gameActive) return;

  CellPlayed(clickedCell, clickedCellIndex);
  Result();
}

function RestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", CellClick));
document.querySelector(".gamerestart").addEventListener("click", RestartGame);

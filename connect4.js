const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1;
let board = [];

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
    console.log(board);
  }
}

function makeHtmlBoard() {
  let htmlBoard = document.querySelector("#board");
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

function placeInTable(y, x) {
  const gamePieceDiv = document.createElement("div");
  gamePieceDiv.classList.add("piece");
  gamePieceDiv.classList.add(`player${currPlayer}`);
  let playerSquare = document.getElementById(`${y}-${x}`);

  playerSquare.append(gamePieceDiv);
}

function endGame(msg) {
  let timer = setInterval(function () {
    alert(msg);
    clearInterval(timer);
  }, 500);
}

function handleClick(evt) {
  let x = +evt.target.id;
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  board[y][x] = currPlayer;

  placeInTable(y, x);

  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  if (board.every((row) => row.every((cells) => cells))) {
    return endGame(`It's a tie!=`);
  }

  currPlayer = currPlayer === 1 ? 2 : 1;
}

function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

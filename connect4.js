/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //creating board with for loop.  y represents the vertical axis on the connect 4 board.
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
    console.log(board);
    //creating array from width value which is set to undefined
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.querySelector("#board");
  //top row:add a table row for the top row the user can select and we are giving the top row an id of column-top.  a click event has been added to the top row.
  //we are using a for loop to create the 7(width var) columns.  for each iteration, a headcell is being created with a td element, then the headcell is being given an id attribute named 'x'.  then we are appending the headcell to the top(the table row).  we should end up with 7 columns  each td is given an id attreibute named x.  then the top row and 7 columns are being appended to the htmlboard.
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // function clickResetBtn() {
  //   const resetBtn = document.querySelector("#resetBtn");
  //   const gamePiece = document.getElementsByClassName("piece");
  //   resetBtn.addEventListener("click", function (e) {
  //     console.log("you clicked the reset btn");

  //     gamePiece.remove();
  //   });
  // }
  // clickResetBtn();
  // TODO: add comment for this code
  //nested loops which are creating the remainder of the playing board. as long as y is less than 6, we increment y starting at 0.  for each loop create a table row.  then we have a nested loop for the columns.  as long as x is less than 7, we increment.  for each nested loop, we create a cell(td) which is being assigned an id of row number, which is set by the y loop-and x which is set by the x loop.  so 0-0, 0-1, 0-2, etc....  we are then appending the cells(td's) to the row(tr).  once the nest loops runs we are appending the rows to the htmlboard.
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

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y; //return top empty row in column
    }
  }
  return null; //return null if column is filled
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const gamePieceDiv = document.createElement("div");
  gamePieceDiv.classList.add("piece");
  gamePieceDiv.classList.add(`player${currPlayer}`);
  let playerSquare = document.getElementById(`${y}-${x}`);

  playerSquare.append(gamePieceDiv);
  //appending the child,playerSquare to the parent element, gamePieceDiv
  const resetBtn = document.querySelector("#resetBtn");
  resetBtn.addEventListener("click", function (e) {
    console.log("you clicked the reset btn");

    gamePieceDiv.remove();
  });
}

/** endGame: announce game end */
//set timer to announce message after final gamepiecediv is appended
function endGame(msg) {
  let timer = setInterval(function () {
    alert(msg);
    clearInterval(timer);
  }, 1000);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;

  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => row.every((cells) => cells))) {
    return endGame(`It's a tie!=`);
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  //alternate between player 1 and player 2
  currPlayer = currPlayer === 1 ? 2 : 1;
  console.log(currPlayer);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

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

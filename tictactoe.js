const winDrawLose = Object.freeze({
  Win: 1,
  Draw: 0,
  Lose: -1,
});

const State = Object.freeze({
    Blank: "",
    X: "X",
    O: "O",
  });

function Gameboard(size) {
  const gameSize = size;
  let board = resetBoard();
  let moveCount = 0;
  function inputPlay(x, y, letter) {
    if (board[x][y] == State.Blank) {
      board[x][y] = letter;
    }
    moveCount++;

    //check end conditions

    //check col
    for (let i = 0; i < n; i++) {
      if (board[x][i] != s) break;
      if (i == n - 1) {
        //report win for s
        return winDrawLose.Win;
      }
    }

    //check row
    for (let i = 0; i < n; i++) {
      if (board[i][y] != s) break;
      if (i == n - 1) {
        //report win for s
        return winDrawLose.Win;
      }
    }

    //check diag
    if (x == y) {
      //we're on a diagonal
      for (let i = 0; i < n; i++) {
        if (board[i][i] != s) break;
        if (i == n - 1) {
          //report win for s
          return winDrawLose.Win;
        }
      }
    }

    //check anti diag (thanks rampion)
    if (x + y == n - 1) {
      for (let i = 0; i < n; i++) {
        if (board[i][n - 1 - i] != s) break;
        if (i == n - 1) {
          //report win for s
          return winDrawLose.Win;
        }
      }
    }

    //check draw
    if (moveCount == Math.pow(n, 2) - 1) {
      //report draw
      winDrawLose.Draw;
    }
  }

  function resetBoard() {
    return Array.from(Array(gameSize), () =>
      new Array(gameSize).fill(State.Blank)
    );
  }

  return { inputPlay, resetBoard };
}

function Player(name, letter) {
  let assignLetter = letter;
  function changeLetter(letter) {
    assignLetter = letter;
  }

  function announceWin() {
    console.log(`Player ${name} wins`);
  }
}

function handlePlay(){
    const player1 = new Player(1, State.X)
    const player2 = new Player(2, State.O)

    
}
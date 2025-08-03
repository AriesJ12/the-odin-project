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

function Gameboard() {
  const gameSize = 3;
  let board = Array.from(Array(gameSize), () =>
    new Array(gameSize).fill(State.Blank)
  );
  let moveCount = 0;
  function resetBoard() {
    board = Array.from(Array(gameSize), () =>
      new Array(gameSize).fill(State.Blank)
    );
    return true;
  }

  function inputPlay(x, y, playedLetter) {
    if (!isValidInput(x,y)){
      throw Error("Input Out of Bounds") 
    }

    if (board[x][y] == State.Blank) {
      board[x][y] = playedLetter;
    } else {
      return false
    }
    moveCount++;

    //check end conditions

    //check col
    for (let i = 0; i < gameSize; i++) {
      if (board[x][i] != playedLetter) break;
      if (i == gameSize - 1) {
        //report win for s
        return winDrawLose.Win;
      }
    }

    //check row
    for (let i = 0; i < gameSize; i++) {
      if (board[i][y] != playedLetter) break;
      if (i == gameSize - 1) {
        //report win for s
        return winDrawLose.Win;
      }
    }

    //check diag
    if (x == y) {
      //we're on a diagonal
      for (let i = 0; i < gameSize; i++) {
        if (board[i][i] != playedLetter) break;
        if (i == gameSize - 1) {
          //report win for s
          return winDrawLose.Win;
        }
      }
    }

    //check anti diag (thanks rampion)
    if (x + y == gameSize - 1) {
      for (let i = 0; i < gameSize; i++) {
        if (board[i][gameSize - 1 - i] != playedLetter) break;
        if (i == gameSize - 1) {
          //report win for s
          return winDrawLose.Win;
        }
      }
    }

    //check draw
    if (moveCount == Math.pow(gameSize, 2) - 1) {
      //report draw
      return winDrawLose.Draw;
    }
  }

  function isValidInput(x, y){
    return (x >= 0 && x < gameSize) && (y >= 0 && y < gameSize);
  }

  return { inputPlay, resetBoard};
}

function Player(name, letter) {
  let assignLetter = letter;

  
}

const game = Gameboard(gameSize);
// players, can add option for what player state
const player1 = Player(1, State.X);
const player2 = Player(2, State.O);



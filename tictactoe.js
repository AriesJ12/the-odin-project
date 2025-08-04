const gameCondition = Object.freeze({
  InPlay: 2,
  Win: 1,
  Draw: 0,
  Lose: -1,
});
// a button/div/position possible values
const State = Object.freeze({
  Blank: " ",
  X: "X",
  O: "O",
});

const NUM_PLAYERS = 2;
const gameSize = 3;


function Gameboard() {
  const gameSize = gameSize;
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
    if (!isValidInput(x, y)) {
      throw Error("Input Out of Bounds");
    }

    if (board[x][y] == State.Blank) {
      board[x][y] = playedLetter;
    } else {
      return false;
    }
    moveCount++;

    //check end conditions

    //check col
    for (let i = 0; i < gameSize; i++) {
      if (board[x][i] != playedLetter) break;
      if (i == gameSize - 1) {
        //report win for s
        return gameCondition.Win;
      }
    }

    //check row
    for (let i = 0; i < gameSize; i++) {
      if (board[i][y] != playedLetter) break;
      if (i == gameSize - 1) {
        //report win for s
        return gameCondition.Win;
      }
    }

    //check diag
    if (x == y) {
      //we're on a diagonal
      for (let i = 0; i < gameSize; i++) {
        if (board[i][i] != playedLetter) break;
        if (i == gameSize - 1) {
          //report win for s
          return gameCondition.Win;
        }
      }
    }

    //check anti diag (thanks rampion)
    if (x + y == gameSize - 1) {
      for (let i = 0; i < gameSize; i++) {
        if (board[i][gameSize - 1 - i] != playedLetter) break;
        if (i == gameSize - 1) {
          //report win for s
          return gameCondition.Win;
        }
      }
    }

    //check draw
    if (moveCount == Math.pow(gameSize, 2) - 1) {
      //report draw
      return gameCondition.Draw;
    }

    return gameCondition.InPlay;
  }

  function isValidInput(x, y) {
    return x >= 0 && x < gameSize && y >= 0 && y < gameSize;
  }

  return { inputPlay, resetBoard };
}

function Player(name, letter) {
  let assignLetter = letter;
  let score = 0;
  function announceWinner() {
    score++;
    console.log(`Player ${name} - ${assignLetter} wins`);
  }
  return { announceWinner, score, assignLetter };
}

function TurnFactory(numPlayers) {
  let turn = 0;
  function nextTurn() {
    // turn + 1
    // check if its the same as numPlayers(considers array), then turn it back to 0
    turn++;
    if (turn >= numPlayers) {
      turn = 0;
    }
  }

  function getTurn() {
    return turn;
  }
  return {
    nextTurn,
    getTurn,
  };
}



const game = Gameboard(gameSize);
// players, can add option for what player state
const players = [Player(1, State.X), Player(2, State.O)];
const turn = TurnFactory(NUM_PLAYERS);


function ScreenHander() {
  const TICTACTOE = document.getElementById("tictactoe");
  const GAME_SIZE = gameSize
  function generateDom() {
    for (let i = 0; i < GAME_SIZE; i++) {
      let row = document.createElement("div");
      for (let j = 0; j < GAME_SIZE; j++) {
        let button = document.createElement("button");
        button.textContent = State.Blank
        button.addEventListener("click", () => {
          button.textContent = players[turn].assignLetter
          clickHandlerBoard(i, j);
        })
        row.appendChild(button)
      }
    }
  }
  function clickHandlerBoard(x, y) {
    inputPlay(x,y,players[turn].assignLetter)
    turn++
    if (turn > players.length) {
      turn = 0;
    }
  }

  return {generateDom, updateScreen, clickHandlerBoard}
}

players[turn].announceWinner();

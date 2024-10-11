//SELECTING ALL THE ELEMENTS IN THE HTML
const body = document.querySelector('body');
const restartBtn = document.querySelector('.restart-btn');
const score1Text = document.querySelector('.score-1');
const score2Text = document.querySelector('.score-2');
const box = document.querySelectorAll('.box');
const currentPlayerText = document.querySelector('.current-player');
const currentPlayerNumber = document.querySelector('#cur-player');
const roundOf = document.querySelector('.turn');
const horizontal1 = document.querySelector('.raya-horizontal-1');
const horizontal2 = document.querySelector('.raya-horizontal-2');
const horizontal3 = document.querySelector('.raya-horizontal-3');
const vertical1 = document.querySelector('.raya-vertical-1');
const vertical2 = document.querySelector('.raya-vertical-2');
const vertical3 = document.querySelector('.raya-vertical-3');
const diagonal1 = document.querySelector('.raya-diagonal-1');
const diagonal2 = document.querySelector('.raya-diagonal-2');
const winnerDisplay = document.querySelectorAll(
  '.ventana-ganador, .texto-ganador, .restart-div2, .restart-btn2'
);
const restartBtn2 = document.querySelector('.restart-btn2');

/////////////////////////////////////

//CREATING THE LOGIC
let currentPlayer = 1;
let boxNumber;
let playerWin = 0;
let empate = false;
let wins = false;
let winnerCombination = [3, 6, 9];
let winnerCombinationIndex;
let blockContent = 0;
const scores = [0, 0];
const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const prueba = [1, 1, 1];
const winCombinations = [
  {
    combination: [1, 2, 3],
    line: horizontal1
  },
  {
    combination: [4, 5, 6],
    line: horizontal2
  },
  {
    combination: [7, 8, 9],
    line: horizontal3
  },
  {
    combination: [1, 4, 7],
    line: vertical1
  },
  {
    combination: [2, 5, 8],
    line: vertical2
  },
  {
    combination: [3, 6, 9],
    line: vertical3
  },
  {
    combination: [1, 5, 9],
    line: diagonal1
  },
  {
    combination: [3, 5, 7],
    line: diagonal2
  }
];

//RESTART BUTTON
const restartFunction = function () {
  box.forEach(function (individualBox) {
    individualBox.innerHTML = '';
    clearUpBoard();
    scores.fill(0);
    currentPlayer = 1;
    currentPlayerText.innerHTML = '&#10006';
    winCombinations[winnerCombinationIndex].line.style.opacity = 0;
    score1Text.innerHTML = scores[0];
    score2Text.innerHTML = scores[1];
  });
};
restartBtn.addEventListener('click', restartFunction);

let function1;
//MARK X or O FUNCTION
box.forEach(function (individualBox) {
  individualBox.onclick = function () {
    boxNumber = individualBox.classList[1].slice(4) - 1;
    if (!wins && !empate && !blockContent) {
      if (board[boxNumber] === 0) {
        addMoveToArray(boxNumber);
        individualBox.innerHTML = currentPlayer === 1 ? '&#10006' : 'O';
        if (checkIfWin()) {
          //SOLO AQUI SI GANAS
          console.log(`Player ${currentPlayer} wins!`);
          wins = true;
          scores[currentPlayer - 1]++;
          currentPlayer === 1 ? score1Text.innerHTML++ : score2Text.innerHTML++;
          winCombinations[winnerCombinationIndex].line.style.opacity = 1;
          roundOf.style.fontWeight = 'bold';
          roundOf.style.color = 'rgb(73, 255, 1)';
          roundOf.innerHTML = `PLAYER ${currentPlayer} WINS!`;
          ganarElJuego();
        } else if (!checkIfWin()) {
          if (board.every((box) => box !== 0)) {
            empate = true;
            roundOf.style.fontWeight = 'bold';
            roundOf.style.color = 'rgb(73, 255, 1)';
            roundOf.innerHTML = 'DRAW!';
          } else {
            if (currentPlayer === 1) {
              currentPlayer++;
              roundOf.innerHTML = 'Round of <span class="current-player">O</span>';
            } else {
              currentPlayer--;
              roundOf.innerHTML = 'Round of <span class="current-player">&#10006</span>';
            }
          }
        }
      }
    } else if (wins || empate || blockContent) {
      for (let i = 0; i < box.length; i++) {
        box[i].innerHTML = '';
      }
      clearUpBoard();
      currentPlayer = 1;
      wins = false;
      empate = false;
      winCombinations[winnerCombinationIndex].line.style.opacity = 0;
      roundOf.innerHTML = 'Round of <span class="current-player">&#10006</span>';
      roundOf.style.fontWeight = 'normal';
      roundOf.style.color = 'white';
    }
  };
});
/////////////////////////////////
//SCORES PLAYER 1/PLAYER2
score1Text.innerHTML = scores[0];
score2Text.innerHTML = scores[1];
//FUNCION PARA ANADIR MOVE A BOARD
function addMoveToArray(box) {
  board.splice(box, 1, currentPlayer);
  return board;
}

////////////////////////////
function checkIfWin() {
  for (let i = 0; i < winCombinations.length; i++) {
    //Getting the indexes on board of every winCombination in winCombinations
    let aIndex = winCombinations[i].combination[0] - 1;
    let bIndex = winCombinations[i].combination[1] - 1;
    let cIndex = winCombinations[i].combination[2] - 1;
    if (
      board[aIndex] === currentPlayer &&
      board[bIndex] === currentPlayer &&
      board[cIndex] === currentPlayer
    ) {
      winnerCombination = [aIndex, bIndex, cIndex];
      console.log(winnerCombination);
      winnerCombinationIndex = winCombinations.findIndex(
        (elem) =>
          elem.combination[0] === aIndex + 1 &&
          elem.combination[1] === bIndex + 1 &&
          elem.combination[2] === cIndex + 1
      );
      return 1;
    }
  }
  return 0;
}

function clearUpBoard() {
  board.fill(0);
  currentPlayerText.innerHTML = '&#10006';
}

//SCORE LLEGA A 3
function ganarElJuego() {
  if (scores.some((score) => score === 3)) {
    winnerDisplay.forEach(function (property) {
      property.style.opacity = 1;
      property.style.pointerEvents = 'all';
    });
    currentPlayerNumber.innerHTML = currentPlayer;
    restartBtn.style.opacity = 0;
    roundOf.innerHTML = '';
    blockContent = 1;
    return 1;
  }
  return 0;
}
restartBtn2.addEventListener('click', function () {
  box.forEach(function (individualBox) {
    individualBox.innerHTML = '';
    clearUpBoard();
    scores.fill(0);
    currentPlayer = 1;
    currentPlayerText.innerHTML = '&#10006';
    score1Text.innerHTML = scores[0];
    score2Text.innerHTML = scores[1];
  });
  winnerDisplay.forEach((el) => (el.style.opacity = 0));
  winnerDisplay.forEach((el) => (el.style.pointerEvents = 'none'));
  winCombinations[winnerCombinationIndex].line.style.opacity = 0;
  roundOf.style.fontWeight = 'normal';
  roundOf.style.color = 'white';
  roundOf.innerHTML = 'Round of <span class="current-player">&#10006</span>';
  blockContent = 0;
  wins = false;
  restartBtn.style.opacity = 1;
});

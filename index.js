'use strict';

// selecting elements
const newBtn = document.querySelector('.new-btn');
const holdBtn = document.querySelector('.hold-btn');
const rollBtn = document.querySelector('.roll-btn');
const diceEl = document.querySelector('.dice');
const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');
const player0El = document.getElementById('player-0');
const player1El = document.getElementById('player-1');
const current0El = document.getElementById('current-score--0');
const current1El = document.getElementById('current-score--1');

// starting conditions
let dice, playerActive, gameRunning, currentScore, score;

// top and left positions of all the dots displayed on the dice
const dotPositions = {
  1: [[50, 50]],
  2: [
    [80, 20],
    [20, 80],
  ],
  3: [
    [80, 20],
    [50, 50],
    [20, 80],
  ],
  4: [
    [20, 20],
    [80, 20],
    [20, 80],
    [80, 80],
  ],
  5: [
    [20, 20],
    [80, 20],
    [50, 50],
    [20, 80],
    [80, 80],
  ],
  6: [
    [20, 20],
    [80, 20],
    [20, 50],
    [80, 50],
    [20, 80],
    [80, 80],
  ],
};

// initialization functionality
function init() {
  dice = 0;
  playerActive = 0;
  gameRunning = true;
  currentScore = 0;
  score = [0, 0];
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
  player0El.classList.remove('player-win');
  player1El.classList.remove('player-win');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.innerHTML = '';
  diceEl.classList.remove('show');
}

// start the game
init();

// functionality for creating dots on the dice
const createDot = function (dotNum) {
  const dotPosition = dotPositions[dotNum];
  for (let i = 0; i < dotNum; i++) {
    const div = document.createElement('div');
    div.classList.add('dot');
    div.style.left = dotPosition[i][0] + '%';
    div.style.top = dotPosition[i][1] + '%';
    diceEl.appendChild(div);
  }
};

// revert background functionality
function revert() {
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');
}

// switching player functionality
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current-score--${playerActive}`).textContent =
    currentScore;
  playerActive = playerActive ? 0 : 1;

  // revert the background
  revert();
}

// rolling dice functionality (only if the game is running)
rollBtn.addEventListener('click', function () {
  if (gameRunning) {
    // generate a random dice roll
    dice = Math.trunc(Math.random() * 6) + 1;

    // create dots for the dice and show it (remove the dots if already present)
    diceEl.innerHTML = '';
    createDot(dice);
    diceEl.classList.add('show');

    if (dice !== 1) {
      // add the dice roll to the current score of active player
      currentScore += dice;
      document.getElementById(`current-score--${playerActive}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// hold button functionality (add the current score of the player to its total score)
holdBtn.addEventListener('click', function () {
  if (gameRunning) {
    // add the current score to the total score of the active player
    score[playerActive] += currentScore;
    document.getElementById(`score-${playerActive}`).textContent =
      score[playerActive];

    if (score[playerActive] >= 100) {
      gameRunning = false;
      document
        .getElementById(`player-${playerActive}`)
        .classList.add('player-win');
      diceEl.classList.remove('show');
    } else {
      switchPlayer();
    }
  }
});

// reset game functionality
newBtn.addEventListener('click', function () {
  gameRunning = true;

  // restart the game
  init();
});

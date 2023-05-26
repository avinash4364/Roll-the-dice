'use strict';

const newBtn = document.querySelector('.new-btn');
const holdBtn = document.querySelector('.hold-btn');
const rollBtn = document.querySelector('.roll-btn');
const players = document.querySelectorAll('.player');
const playerOneScoreDisplay = document.querySelectorAll('.player-score')[0];
const playerTwoScoreDisplay = document.querySelectorAll('.player-score')[1];
const playerOneCurrent = document.querySelectorAll('.player-current--score')[0];
const playerTwoCurrent = document.querySelectorAll('.player-current--score')[1];
const dice = document.querySelector('.dice');

let diceNum;
let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneCurrentScore = 0;
let playerTwoCurrentScore = 0;
let playerOneSelected = true;

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

// revert background
const revert = function () {
  players.forEach((player) => {
    player.classList.toggle('show-bg');
  });
};

const createDot = function (dotNum) {
  const dotPosition = dotPositions[dotNum];
  for (let i = 0; i < dotNum; i++) {
    const div = document.createElement('div');
    div.classList.add('dot');
    div.style.left = dotPosition[i][0] + '%';
    div.style.top = dotPosition[i][1] + '%';
    dice.appendChild(div);
  }
};

// click event to the hold button
rollBtn.addEventListener('click', () => {
  // a random number between 1 and 6
  diceNum = Math.trunc(Math.random() * 6 + 1);
  console.log(diceNum);

  // check if dots are already present and then remove them
  //   we can set the innerHTML of the parent element to empty
  dice.innerHTML = '';

  //   create the dot according to the random number generated
  createDot(diceNum);

  // show the dice
  dice.classList.add('show');

  // if the dice displays one then the player loses the current score and is not able to hold(add to the total) the score
  if (diceNum === 1) {
    playerOneCurrentScore = 0;
    playerTwoCurrentScore = 0;
    playerOneCurrent.textContent = playerOneCurrentScore;
    playerTwoCurrent.textContent = playerTwoCurrentScore;

    revert();
    playerOneSelected = !playerOneSelected;
  } else {
    if (playerOneSelected) {
      playerOneCurrentScore += diceNum;
      playerOneCurrent.textContent = playerOneCurrentScore;
    } else {
      playerTwoCurrentScore += diceNum;
      playerTwoCurrent.textContent = playerTwoCurrentScore;
    }
  }
});

holdBtn.addEventListener('click', () => {
  // hold(add) the current score to the player's total score
  if (playerOneSelected) {
    playerOneScore += playerOneCurrentScore;
    playerOneCurrentScore = 0;
    playerOneCurrent.textContent = playerOneCurrentScore;
    playerOneScoreDisplay.textContent = playerOneScore;
    playerOneSelected = false;
  } else {
    playerTwoScore += playerTwoCurrentScore;
    playerTwoCurrentScore = 0;
    playerTwoCurrent.textContent = playerTwoCurrentScore;
    playerTwoScoreDisplay.textContent = playerTwoScore;
    playerOneSelected = true;
  }

  // revert the background
  revert();
});

// reset the game
newBtn.addEventListener('click', () => {
  playerOneScore = 0;
  playerTwoScore = 0;
  playerOneCurrentScore = 0;
  playerTwoCurrentScore = 0;
  playerOneScoreDisplay.textContent = playerOneScore;
  playerTwoScoreDisplay.textContent = playerTwoScore;
  playerOneCurrent.textContent = playerOneCurrentScore;
  playerTwoCurrent.textContent = playerTwoCurrentScore;
  dice.classList.remove('show');
  dice.innerHTML = '';
  if (!playerOneSelected) {
    revert();
    playerOneSelected = true;
  }
});

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

// revert background
const revert = function () {
  players.forEach((player) => {
    player.classList.toggle('show-bg');
  });
};

// click event to the hold button
rollBtn.addEventListener('click', () => {
  // a random number between 1 and 6
  diceNum = Math.trunc(Math.random() * 6 + 1);
  console.log(diceNum);

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

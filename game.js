import { getCurrentPage, setCurrentPage, changePage } from './pages.js';
import { setBoard } from './grid.js';
import { drawSnake, updateSnake } from './snake.js';
import { drawFood } from './food.js';
import { getBestRecord } from './record.js';

const gameBoard = document.querySelector('[data-game-board]');
const bestRecordPanel = document.querySelector('[data-best-record]');
const restartButton = document.querySelector('[data-restart-button]');
const returnButton = document.querySelector('[data-return-button]');
let boardSet = { cols: 28, rows: 16 };

// 遊戲進行
let lastRenderTime = 0;
let speed = 2;
let score = 0;
let startNewGame = false;

function startAnimate() {
  function animate(currentTime) {
    const currentPage = getCurrentPage();
    const requestId = window.requestAnimationFrame(animate);
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000; // 將milisecond 轉成 second
    if (secondSinceLastRender < 1 / speed) return;
    lastRenderTime = currentTime;
    update();
    draw();
    if (currentPage !== 'game-page') cancelAnimationFrame(requestId);
  }

  window.requestAnimationFrame(animate);

  function update() {
    updateSnake(boardSet);
    setGameSpeed();
  }

  function draw() {
    drawSnake(gameBoard, boardSet);
    drawFood(gameBoard, boardSet);
  }
}

export function addScore() {
  score += 1;
}

export function getScore() {
  return score;
}

export function renderText(dom, text) {
  document.querySelector(`[data-${dom}]`).innerText = text;
}

export function setSpeed(num) {
  speed = num;
}

function setGameSpeed() {
  switch (true) {
    case score >= 5 && score < 10: 
      setSpeed(3);
      break;
    case score >= 10 && score < 15:
      setSpeed(4);
      break;
    case score >= 15 && score < 20:
      setSpeed(5);
      break;
    case score >= 20 && score < 30:
      setSpeed(6);
      break;
    case score >= 30:
      setSpeed(7);
      break;
  }
}

function resetGame() {
  startAnimate();
  score = 0;
  renderText('score', score);
}

// 遊戲頁面切換
window.addEventListener('keyup', (e) => {
  const currentPage = getCurrentPage();
  if (e.code === 'Space' && currentPage === 'start-page') {
    setCurrentPage('game-page');
    changePage();
    const bestRecord = getBestRecord();
    bestRecordPanel.innerText = bestRecord;
    setSpeed(2);
    resetGame();
  }
  if (e.code === 'KeyY' && currentPage === 'end-page') {
    restartButton.classList.add('selected');
    returnButton.classList.remove('selected');
    startNewGame = true;
  }
  if (e.code === 'KeyN' && currentPage === 'end-page') {
    restartButton.classList.remove('selected');
    returnButton.classList.add('selected');
    startNewGame = false;
  }
  if (e.code === 'Enter' 
    && currentPage === 'end-page'
    && startNewGame === true) {
    setCurrentPage('game-page');
    changePage();
    setSpeed(2);
    resetGame();
  }
  if (e.code === 'Enter'
    && currentPage === 'end-page'
    && startNewGame === false) {
    setCurrentPage('start-page');
    changePage();
  }
});


function init() {
  setCurrentPage('start-page');
  changePage();
  setBoard(gameBoard, boardSet);
}
init();

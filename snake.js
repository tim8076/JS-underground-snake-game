import { getGridItemByXY, outsideGrid } from './grid.js';
import { getSnakeDirection, resetSnakeDirection } from './direction.js';
import { getFoodPosiotion, createFood } from './food.js';
import { addScore, getScore, renderText } from './game.js';
import { setCurrentPage, changePage } from './pages.js';
import { setRecord, getBestRecord } from './record.js';
 
let snakeBody = [
  { x: 14, y: 6 },
  { x: 14, y: 7 },
  { x: 14, y: 8 },
];

let segments = 1;

export function updateSnake(boardSet) {
  const direction = getSnakeDirection();
  let hasMove = direction.x !== 0 || direction.y !== 0;
  if (hasMove) {
    for (let i = snakeBody.length - 2; i >= 0; i--) {
      snakeBody[i + 1] = { ...snakeBody[i] };  // 設定最後一個的元素變成倒數第二的元素
    }
    snakeBody[0].x += direction.x;
    snakeBody[0].y += direction.y;

    // 蛇移動超過容器，穿到對面
    if (outsideGrid(boardSet, snakeBody[0])) {
      setSnakeOpposite({ direction, snakeHead: snakeBody[0], boardSet })
    }
  }

  const foodPosition = getFoodPosiotion();
  // 吃到食物
  if (onSnake({ snakeBody, position: foodPosition })) {
    addSnakeBody();
    createFood({ boardSet, snakeBody });
    addScore();
    const score = getScore();
    renderText('score', score);
    return;
  } 

  // 吃到自己身體，遊戲結束
  if (onSnake({ snakeBody, position: snakeBody[0] }, true)) {
    resetSnakeBody();
    resetSnakeDirection();
    setRecord();
    const bestScore = getBestRecord();
    const score = getScore();
    renderText('best-record-final', bestScore);
    renderText('score-final', score);
    setCurrentPage('end-page');
    changePage();
  }
}

function resetSnakeBody() {
  snakeBody = [
    { x: 14, y: 6 },
    { x: 14, y: 7 },
    { x: 14, y: 8 },
  ];
}

function addSnakeBody() {
  for (let i = 0; i < segments; i += 1) {
    snakeBody.push(snakeBody[snakeBody.length - 1]);
  }
}

function setSnakeOpposite({ direction, snakeHead, boardSet }) {
  const { cols, rows } = boardSet;
  if (direction.x !== 0) {
    if (snakeHead.x < 1) return snakeHead.x = cols;
    if (snakeHead.x > cols) return snakeHead.x = 1;
  }
  if (direction.y !== 0) {
    if (snakeHead.y < 1) return snakeHead.y = rows;
    if (snakeHead.y > rows) return snakeHead.y = 1;
  }
}

export function onSnake({ snakeBody, position }, ignoreHead = false) {
  return snakeBody.some((body, index) => {
    if (ignoreHead) {
      if (index > 0) return body.x === position.x && body.y === position.y;
    } else {
      return body.x === position.x && body.y === position.y;
    }
  });
} 

export function drawSnake(gameBoard, boardSet) {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => item.className = 'grid-item');
  snakeBody.forEach((body, index) => {
    const gridItem = getGridItemByXY({ gameBoard, boardSet, postion: body });
    gridItem.className = 'grid-item';
    if (index === 0) gridItem.classList.add('head');
    if (index === 1) gridItem.classList.add('gray-100');
    if (index === 2) gridItem.classList.add('gray-200');
    if (index === 3) gridItem.classList.add('gray-300');
    if (index === 4) gridItem.classList.add('gray-400');
    if (index > 4) gridItem.classList.add('body');
  })
}


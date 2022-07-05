export function setBoard(gameBoard, boardSet) {
  const { cols, rows } = boardSet;
  gameBoard.style.setProperty('--col-num', cols);
  gameBoard.style.setProperty('--row-num', rows);
  const itemsNum = cols * rows; 
  for (let i = 0; i < itemsNum; i += 1) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gameBoard.append(gridItem);
  }
}

export function getRandomNumBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomGridItem(boardSet) {
  const { cols, rows } = boardSet;
  const gridX = getRandomNumBetween(1, cols);
  const gridY = getRandomNumBetween(1, rows);
  return { x: gridX, y: gridY };
}

export function getGridItemNum({ boardSet, postion }) {
  return (boardSet.cols * (postion.y - 1)) + postion.x;
}

export function outsideGrid(boardSet, snakeHead) {
  const { cols, rows } = boardSet;
  const { x: headX, y: headY } = snakeHead;
  return headX < 1 
    || headX > cols
    || headY < 1
    || headY > rows; 
}

export function getGridItemByXY({ gameBoard, boardSet, postion }) {
  const itemNum = getGridItemNum({ boardSet, postion })
  return gameBoard.querySelector(`.grid-item:nth-child(${itemNum})`);
}

let food = { x: 18, y: 6 };
import { getGridItemByXY, getRandomGridItem } from './grid.js';
import { onSnake } from './snake.js';

export function drawFood(gameBoard, boardSet) {
  const gridItems = gameBoard.querySelectorAll('.grid-items');
  gridItems.forEach((item) => {
    if (item.classList.contains('food')) item.classList.remove('food');
  });
  const foodItem = getGridItemByXY({ gameBoard, boardSet, postion: food });
  foodItem.classList.add('food');
  drawFoodSiblings(gameBoard, boardSet);
}

export function createFood({ boardSet, snakeBody }) {
  let newFood = getRandomGridItem(boardSet);
  let snakeAndFoodPosition = [ food, ...snakeBody ];
  while (onSnake({ snakeBody: snakeAndFoodPosition, position: newFood })) {
    newFood = getRandomGridItem(boardSet);
  }
  food = newFood;
}

export function drawFoodSiblings(gameBoard, boardSet) {
  const { cols, rows } = boardSet;
  const siblings = [];
  const xRange = {
    min: food.x - 4,
    max: food.x + 5,
  }
  const yRange = {
    min: food.y - 4,
    max: food.y + 5,
  }
  for (let i = xRange.min; i < xRange.max; i++) {
    let gridItem = { x: i , y: food.y }
    if (gridItem.x !== food.x) siblings.push(gridItem);
  }
  for (let i = yRange.min; i < yRange.max; i++) {
    let gridItem = { x: food.x, y: i };
    if (gridItem.y !== food.y) siblings.push(gridItem);
  }
  const ary = siblings.filter((item) => {
    return item.x > 0 
      && item.x <= cols 
      && item.y > 0
      && item.y <= rows
  })
  ary.forEach((item) => {
    const foodSibling = getGridItemByXY({ gameBoard, boardSet, postion: item });
    foodSibling.classList.add('sibling');
  })
}

export function getFoodPosiotion() {
  return food;
}
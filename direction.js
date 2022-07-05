import { getCurrentPage } from './pages.js';
let snakeDirection = { x: 0, y: 0 };
let lastSnakeDirection = { x: 0, y: 0 };

window.addEventListener('keydown', (e) => {
  const page = getCurrentPage();
  if (page === 'game-page') {
    switch (e.code) {
      case ('ArrowUp'):
        if (lastSnakeDirection.y !== 0) return;
        snakeDirection = { x: 0, y: -1 };
        break;
      case ('ArrowDown'):
        if (lastSnakeDirection.y !== 0) return;
        snakeDirection = { x: 0, y: 1 };
        break;
      case ('ArrowLeft'):
        if (lastSnakeDirection.x !== 0) return;
        snakeDirection = { x: -1, y: 0 };
        break;
      case ('ArrowRight'):
        if (lastSnakeDirection.x !== 0) return;
        snakeDirection = { x: 1, y: 0 };
        break;
    }
  }
})

export function resetSnakeDirection() {
  snakeDirection = { x: 0, y: 0 };
}

export function getSnakeDirection() {
  lastSnakeDirection = snakeDirection;
  return snakeDirection;
}
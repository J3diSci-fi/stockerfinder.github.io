import GameController from './controller/gameController.js';

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  const controller = new GameController(appElement);
  controller.render();
});

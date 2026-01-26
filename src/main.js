import { GameState } from './models/GameState.js';
import { BoardView } from './views/boardView.js';
import { GameController } from './controllers/gameController.js';
import { InputController } from './controllers/inputController.js'; // 1. Add this import

const canvas = document.getElementById('game-canvas');
const scoreElement = document.getElementById('score-value');

const state = new GameState();
state.grid.offeredBlocks = state.offeredBlocks;

const view = new BoardView(canvas, state.grid);
const controller = new GameController(state, view);

const input = new InputController(state, view, controller);

function animate() {
    view.render(input);
    scoreElement.textContent = state.score;
    requestAnimationFrame(animate);
}

document.getElementById('reset-btn').addEventListener('click', () => {
    location.reload();
});

animate();
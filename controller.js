import * as view from "./view.js";
import Grid from "./grid.js";
export { nextIteration, toggleTimer, clearGame, restartGame, addRandomCells, updateViewForCell, newBoard, updateSpeed };
window.addEventListener("load", firstStart);

let model;
let timer;
let speed = 500;

function firstStart() {
  newGrid();
  view.initView(model, speed);
  startGame();
}

function newBoard(rows, cols) {
  newGrid(rows, cols);
  view.createBoard(model);
  view.updateBoardSize(model);
  restartGame();
}

function updateSpeed(speedValue) {
  speed = speedValue;
  if (timer) {
    stopTimer();
    toggleTimer();
  }
}

function newGrid(rows, cols) {
  // If invalid input, make sure we default to the start size
  if (!rows || isNaN(rows) || rows < 10 || 300 < rows) {
    rows = 100;
  }
  if (!cols || isNaN(cols) || cols < 10 || 300 < cols) {
    cols = 200;
  }
  model = new Grid(rows, cols);
}

function startGame() {
  model.addRandomValues(0.2, true);
  view.updateBoard(model);
  toggleTimer();
}

function addRandomCells() {
  model.addRandomValues(0.2);
  view.updateBoard(model);
}

function toggleTimer() {
  if (timer) {
    stopTimer();
    return 0;
  } else {
    // Unsure what looks best - instant next iteration or wait
    // nextIteration();
    timer = setInterval(() => {
      nextIteration();
    }, speed);
    return 1;
  }
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function nextIteration() {
  model.createNextGen();
  // view.updateBoard(model);
}

function clearGame() {
  model.fill(0);
  view.updateBoard(model);
}

function restartGame() {
  stopTimer();
  clearGame();
  startGame();
}

function updateViewForCell(cell) {
  view.updateCell(cell);
}

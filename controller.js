import * as view from "./view.js";
import Grid from "./grid.js";
export { nextIteration, toggleTimer, clearGame, restartGame, addRandomCells };
window.addEventListener("load", start);

let model;
let timer;
function start() {
  model = new Grid(30, 100);
  view.initView(model);
  startGame()

  window.view = view;
  window.model = model;
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
  console.log("Timer:", timer);
  if (timer) {
    stopTimer();
    return 0;
  } else {
    nextIteration();
    timer = setInterval(() => {
      nextIteration();
    }, 50);
    return 1;
  }
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function nextIteration() {
  model.createNextGen();
  view.updateBoard(model);
}


function clearGame() {
  model.fill(0);
  view.updateBoard(model)
}

function restartGame(){
  clearGame()
  startGame()
}



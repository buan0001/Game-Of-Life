import * as view from "./view.js";
import Grid from "./grid.js";
export { nextIteration, toggleTimer, clearGame, restartGame, addRandomCells };
window.addEventListener("load", start);

let model;
function start() {
  model = new Grid(20, 40, 0.2);
  view.initView(model);
  startGame()

  window.view = view;
  window.model = model;
}



function nextIteration() {
  model.createNextGen();
  view.updateBoard(model);
}

let timer;

function toggleTimer() {
  console.log("Timer:", timer);
  if (timer) {
    stopTimer();
    return 0;
  } else {
    nextIteration();
    timer = setInterval(() => {
      nextIteration();
    }, 10);
    return 1;
  }
}
function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function clearGame() {
  model.fill(0);
  view.updateBoard(model)
  // stopTimer();
}

function restartGame(){
  clearGame()
  startGame()
}

function startGame(){
  model.addRandomValues(0.2, true);
  view.updateBoard(model)
  toggleTimer()
}

function addRandomCells(){
  model.addRandomValues(0.2);
  view.updateBoard(model)
}
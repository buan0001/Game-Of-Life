export { initView, updateBoard };
import * as controller from "./controller.js";
const board = document.querySelector("#grid");
const pauseBtn = document.querySelector("#pause-btn");

function initView(model) {
  board.style.setProperty("--GRID_WIDTH", model.cols());
  board.addEventListener("click", boardClicked)
  console.log("Model cols:", model.cols);
  
  document.querySelector("#next-btn").addEventListener("click", controller.nextIteration);
  pauseBtn.addEventListener("click", counterToggled);
  document.querySelector("#clear-btn").addEventListener("click", gameClearClicked);
  document.querySelector("#restart-btn").addEventListener("click", gameRestartClicked);
  document.querySelector("#add-btn").addEventListener("click", controller.addRandomCells);
  createBoard(model);

  console.log(board);
}

function boardClicked(event){
  console.log("event:",event);
  const target = event.target
  console.log(target);
  
  
}

function counterToggled() {
  const isStarted = controller.toggleTimer()
  pauseBtn.innerHTML = isStarted ? "Pause" : "Play";
}

function gameClearClicked() {
  // pauseBtn.disabled = true;
  controller.clearGame();
}

function gameRestartClicked() {
  pauseBtn.disabled = false;
  pauseBtn.innerHTML = "Pause"
  controller.restartGame();
}

function createBoard(model) {
  const rows = model.rows();
  const cols = model.cols();
  for (let cell = 0; cell < rows * cols; cell++) {
    board.insertAdjacentHTML("beforeend", `<div class="cell" data-index="${cell}"></div>`)
  }
}

function updateBoard(model){
  for (let row = 0; row < model.rows(); row++) {
    
    for (let col = 0; col < model.cols(); col++) {
      const cell = model.getCell(row, col)
      const index = model.indexFor(row, col)

      const node = document.querySelector(`[data-index="${index}"]`)
      if (cell.value){
        node.classList.add("alive")
      }
      else {
        node.classList.remove("alive")
      }
    }
  }
}
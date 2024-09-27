export { initView, updateBoard, updateCell };
import * as controller from "./controller.js";
const board = document.querySelector("#grid");
const pauseBtn = document.querySelector("#pause-btn");

const cellNodes = [];

function initView(model) {
  board.style.setProperty("--GRID_WIDTH", model.cols());
  board.addEventListener("click", boardClicked);

  document.querySelector("#next-btn").addEventListener("click", controller.nextIteration);
  pauseBtn.addEventListener("click", counterToggled);
  document.querySelector("#clear-btn").addEventListener("click", gameClearClicked);
  document.querySelector("#restart-btn").addEventListener("click", gameRestartClicked);
  document.querySelector("#add-btn").addEventListener("click", controller.addRandomCells);

  createBoard(model);
}

function boardClicked(event) {
  console.log("event:", event);
  const target = event.target;
  console.log(target);
}

function counterToggled() {
  const isStarted = controller.toggleTimer();
  pauseBtn.innerHTML = isStarted ? "Pause" : "Play";
}

function gameClearClicked() {
  // pauseBtn.disabled = true;
  controller.clearGame();
}

function gameRestartClicked() {
  pauseBtn.disabled = false;
  pauseBtn.innerHTML = "Pause";
  controller.restartGame();
}

function createBoard(model) {
  const rows = model.rows();
  const cols = model.cols();
  for (let row = 0; row < rows; row++) {
    cellNodes[row] = [];
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      board.appendChild(cell);
      cellNodes[row][col] = cell;
    }
  }
}

function updateBoard(model) {
  for (let row = 0; row < model.rows(); row++) {
    for (let col = 0; col < model.cols(); col++) {
      const cellValue = model.get(row, col);
      const node = cellNodes[row][col]
      if (cellValue) {
        node.classList.add("alive");
      } else {
        node.classList.remove("alive");
      }
    }
  }
}

function updateCell(cell) {
  // console.log("updating cell:",cell);
  
  const node = cellNodes[cell.row][cell.col];
  node.classList.toggle("alive")
}

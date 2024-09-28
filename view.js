export { initView, updateBoard, updateCell, createBoard, updateBoardSize };
import * as controller from "./controller.js";
const board = document.querySelector("#grid");
const pauseBtn = document.querySelector("#pause-btn");

// SAVE ALL THE CELLS IN AN ARRAY TO AVOID DOM FETCHING - NOTABLE PERFORMANCE IMPROVEMENT
let cellNodes = [];

function initView(model, speed) {
  console.log(window.innerHeight);

  // TODO: Implement ability to manually add / remove cells
  // Maybe add save / load functionality
  setEventListeners();
  document.querySelector("#refresh-display").textContent = speed;
  updateBoardSize(model);
  createBoard(model);
}

function setEventListeners() {
  board.addEventListener("click", boardClicked);

  pauseBtn.addEventListener("click", counterToggled);
  document.querySelector("#next-btn").addEventListener("click", controller.nextIteration);
  document.querySelector("#clear-btn").addEventListener("click", gameClearClicked);
  document.querySelector("#restart-btn").addEventListener("click", gameRestartClicked);
  document.querySelector("#add-btn").addEventListener("click", () => controller.addRandomCells());
  document.querySelector("#update-btn").addEventListener("click", boardSizeChanged);

  // Pls dont abuse the input event listener
  document.querySelector("#speed-input").addEventListener("input", speedChanged);
}

function speedChanged(event) {
  const speed = +event.target.value;
  controller.updateSpeed(speed);
  document.querySelector("#refresh-display").textContent = speed;
}

function boardSizeChanged() {
  const cols = +document.querySelector("#cols-input").value;
  const rows = +document.querySelector("#rows-input").value;
  console.log("value:", cols);
  controller.newBoard(rows, cols);
}

function updateBoardSize(model) {
  console.log("Updated board size:", model.cols());

  board.style.setProperty("--GRID_WIDTH", model.cols());
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
  controller.clearGame();
}

function gameRestartClicked() {
  pauseBtn.innerHTML = "Pause";
  controller.restartGame();
}

function createBoard(model) {
  console.log("model:", model);
  // Make input field's values reflect the model's values
  document.querySelector("#cols-input").value = model.cols();
  document.querySelector("#rows-input").value = model.rows();
  // This function will also be called when the board is being refreshed, so clear cellNodes and board nodes before starting
  board.innerHTML = "";
  cellNodes = [];

  const rows = model.rows();
  const cols = model.cols();

  const boardWidth = window.innerWidth;
  const boardHeight = window.innerHeight;
  console.log("height:", boardHeight, "width:", boardWidth);

  const cellSize = Math.max(boardWidth / (cols * 5), boardHeight / (rows * 4), 5);

  for (let row = 0; row < rows; row++) {
    cellNodes[row] = [];
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      board.appendChild(cell);
      cellNodes[row][col] = cell;
    }
  }
  console.log(cellNodes);
  // const size = window.screen.height / model.cols()
  // document.querySelectorAll(".cell").forEach((cell) => cell.style.setProperty("--SIZE", size));
}

function updateBoard(model) {
  for (let row = 0; row < model.rows(); row++) {
    for (let col = 0; col < model.cols(); col++) {
      const cellValue = model.get(row, col);
      // const node = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      const node = cellNodes[row][col];
      if (cellValue) {
        node.classList.add("alive");
      } else {
        node.classList.remove("alive");
      }
    }
  }
}

function updateCell(cell) {
  // const node = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
  const node = cellNodes[cell.row][cell.col];
  node.classList.toggle("alive");
}

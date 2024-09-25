export { initView };

const board = document.querySelector("#grid");

function initView(model) {
  board.style.setProperty("--GRID_WIDTH", cols);
  createBoard(model);

  console.log(board);
}

function createBoard(model) {
  const rows = model.rows();
  const cols = model.cols();
  for (let cell = 0; cell < rows * cols; cell++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.id = cell;
    board.appendChild(div);
  }
}

function updateBoard(model){

}
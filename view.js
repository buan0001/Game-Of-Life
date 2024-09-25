export { initView };

const board = document.querySelector("#grid");

function initView(model) {
  const rows = model.rows();
  const cols = model.cols();
  board.style.setProperty("--GRID_WIDTH", cols);
  console.log("rows:", rows);
  console.log("rows:", cols);

  createBoard(rows,cols);

  console.log(board);
}

function createBoard(rows, cols) {
  for (let cell = 0; cell < rows * cols; cell++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.id = cell;
    board.appendChild(div);
  }
}

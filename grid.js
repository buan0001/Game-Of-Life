import * as controller from "./controller.js"

export default class Grid {
  #rows;
  #cols;
  #grid = [];

  constructor(rows, cols) {
    this.#rows = rows;
    this.#cols = cols;
    this.initGrid();
  }

  initGrid() {
    for (let row = 0; row < this.#rows; row++) {
      this.#grid[row] = [];
      for (let col = 0; col < this.#cols; col++) {
        this.#grid[row][col] = 0;
      }
    }
  }

  // Game of life specific
  addRandomValues(startLivingPercent, overrideAlives) {
    for (let row = 0; row < this.#rows; row++) {
      for (let col = 0; col < this.#cols; col++) {
        const shouldLive = Math.random() <= startLivingPercent ? 1 : 0;
        if (shouldLive) {
          this.#grid[row][col] = 1;
        } else if (overrideAlives) {
          this.#grid[row][col] = 0;
        }
      }
    }
  }

  getNeighboursAlive(row, col) {
    const neighbourVals = this.neighbourValues(row, col);
    return neighbourVals.length;
  }

  isAlive(row, col) {
    const aliveNeighbours = this.getNeighboursAlive(row, col);
    const oldValue = this.get(row, col);
    if (aliveNeighbours < 2 || aliveNeighbours > 3) {
      return { newValue: 0, oldValue};
    } else if (aliveNeighbours == 3) {
      return { newValue: 1, oldValue };
    } else {
      return { newValue: oldValue, oldValue };
    }
  }

  createNextGen() {
    let newGrid = [];

    for (let row = 0; row < this.#rows; row++) {
      const newRow = [];
      for (let col = 0; col < this.#cols; col++) {
        const {newValue, oldValue} = this.isAlive(row, col);
        newRow.push(newValue);
        if (newValue != oldValue){
          controller.updateViewForCell({row, col})
        }
      }
      newGrid.push(newRow);
    }

    this.#grid = newGrid;
  }

  // CALL THIS FUNCTION AT THE START OF EVERY FUNCTION THAT ACCEPTS ROWS AND COLS
  convertObjToIntParams(maybeRow, maybeCol, maybeValue) {
    if (typeof maybeRow == "number") {
      return { row: maybeRow, col: maybeCol, value: maybeValue };
    } else {
      return { row: maybeRow.row, col: maybeRow.col, value: maybeCol };
    }
  }

  set(row, col, value) {
    ({ row, col, value } = this.convertObjToIntParams(row, col, value));
    console.log(row, col, value);
    if (this.#validRowCol(row, col)) {
      this.#grid[row][col] = value;
      return this.#grid[row][col];
    }
  }

  get(row, col) {
    ({ row, col } = this.convertObjToIntParams(row, col));
    if (this.#validRowCol(row, col)) {
      return this.#grid[row][col];
    }
  }

  getCell(row, col) {
    ({ row, col } = this.convertObjToIntParams(row, col));
    if (this.#validRowCol(row, col)) {
      return { row, col, value: this.#grid[row][col] };
    }
  }

  #validRowCol(row, col) {
    if (row < 0 || row >= this.#rows || col < 0 || col >= this.#cols) {
      return 0;
    }
    return 1;
  }

  indexFor(row, col) {
    ({ row, col } = this.convertObjToIntParams(row, col));
    return this.#cols * row + col;
  }

  rowColFor(index) {
    const col = index % this.#cols;
    const row = Math.floor(index / this.#cols);
    return { row, col };
  }

  neighbours(row, col) {
    const neighbours = [];
    for (let rows = -1; rows <= 1; rows++) {
      for (let cols = -1; cols <= 1; cols++) {
        // Skip (0,0) since it's the starting point
        if (!(rows == 0 && cols == 0)) {
          const currentRow = row - rows;
          const currentCol = col - cols;
          const currentCellValue = this.get(currentRow, currentCol);

          if (currentCellValue) {
            neighbours.push({ row: currentRow, col: currentCol });
          }
        }
      }
    }

    return neighbours;
  }

  neighbourValues(row, col) {
    const neighbours = this.neighbours(row, col);
    const values = neighbours.map((cell) => this.get(cell.row, cell.col));
    return values;
  }

  nextInRow(row, col) {
    return this.getCell(row, col + 1);
  }
  nextInCol(row, col) {
    return this.getCell(row + 1, col);
  }
  north(row, col) {
    return this.getCell(row - 1, col);
  }
  south(row, col) {
    return this.getCell(row + 1, col);
  }
  west(row, col) {
    return this.getCell(row, col - 1);
  }
  east(row, col) {
    return this.getCell(row, col + 1);
  }

  rows() {
    return this.#rows;
  }
  cols() {
    return this.#cols;
  }

  fill(value) {
    for (let row = 0; row < this.#rows; row++) {
      for (let col = 0; col < this.#cols; col++) {
        this.#grid[row][col] = value;
      }
    }
  }
  dump() {
    console.table(this.#grid);
  }
}

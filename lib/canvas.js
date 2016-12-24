const Cell = require('./cell')

class Canvas {
  constructor() {
    this.x = Canvas.CELLS_X;
    this.y = Canvas.CELLS_Y;

    this.cells = this.newCells();
  }

  clickHandler(x,y) {
    this.cells[Math.floor(x/Canvas.CELLXDIM)][Math.floor(y/Canvas.CELLYDIM)].clickMe();
  }

  newCells() {
    let newGrid = []
    for (let i = 0; i < this.x; i++) {
      newGrid[i] = [];
      for (let j = 0; j < this.y; j++) {
        newGrid[i][j] = new Cell(i, j, 'path');
      }
    }
    return newGrid;
  }

  draw(ctx) {
    ctx.fillStyle = Canvas.BG_COLOR;
    ctx.fillRect(0, 0, Canvas.DIM_X, Canvas.DIM_Y);

    ctx.strokeStyle = '#222222'
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        this.cells[i][j].draw(ctx);
      }
    }
  }

  neighbors() {

  }
}

Canvas.BG_COLOR = "#ffffff";
Canvas.DIM_X = 600;
Canvas.DIM_Y = 600;
Canvas.CELLS_X = 60;
Canvas.CELLS_Y = 60;
Canvas.CELLXDIM = Canvas.DIM_X/Canvas.CELLS_X;
Canvas.CELLYDIM = Canvas.DIM_Y/Canvas.CELLS_Y;

module.exports = Canvas;

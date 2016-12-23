const Cell = require('./cell.js')

class Canvas {
  constructor() {
    this.x = 30;
    this.y = 30;

    this.cells = this.newCells();
  }

  clickHandler(x,y) {
    this.cells[Math.floor(x/15)][Math.floor(y/15)].clickMe();
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

  step(ctx) {

  }
}

Canvas.BG_COLOR = "#ffffff";
Canvas.DIM_X = 450;
Canvas.DIM_Y = 450;

module.exports = Canvas;

const Canvas = require('./canvas');

class Cell {
  constructor(i, j, status) {
    this.x = i;
    this.y = j;
    this.status = status;
  }

  clickMe() {
    this.toggle();
  }

  toggle() {
    if (this.status === 'path') {
      this.status = 'wall';
    } else {
      this.status = 'path';
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#000000'
    if (this.status === 'wall') {
      ctx.fillRect(10*this.x, 10*this.y, 10, 10);
    } else {
      ctx.strokeRect(10*this.x, 10*this.y, 10, 10);
    }
  }

  neighbors() {
    const neighborActions = [[1,0], [1,1], [0,1], [-1,1], [-1,-1], [1,-1], [-1,0], [0,-1]]
    let neighborCells = [];
    neighborActions.forEach((move) => {

    });
  }
}

module.exports = Cell;

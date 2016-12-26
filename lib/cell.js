
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
    if (this.status === 'dead') {
      this.status = 'alive';
    } else {
      this.status = 'dead';
    }
  }

  live() {
    this.status = 'alive';
  }

  die() {
    this.status = 'dead';
  }

  draw(ctx) {
    ctx.fillStyle = '#000000'
    const gdSz = 10;
    if (this.status === 'alive') {
      ctx.fillStyle = '#000000'
      ctx.fillRect(gdSz*this.x, gdSz*this.y, gdSz, gdSz);
    } else {
      ctx.fillStyle = '#ffffff'
      ctx.strokeRect(gdSz*this.x, gdSz*this.y, gdSz, gdSz);
    }
  }

  neighbors() {
    const neighborActions = [[1,0], [1,1], [0,1], [-1,1], [-1,-1], [1,-1], [-1,0], [0,-1]]
    const gdSz = Cell.GRIDSIZE;
    let neighborCells = [];
    neighborActions.forEach((move) => {
      let newX = move[0] + this.x;
      let newY = move[1] + this.y;
      if (newX < Cell.CELLS_X && newX >= 0 && newY < Cell.CELLS_Y && newY >= 0) {
        neighborCells.push([newX, newY]);
      }
    });
    return neighborCells;
  }
}

Cell.GRIDSIZE = 10;
Cell.CELLS_X = 68;
Cell.CELLS_Y = 60;
module.exports = Cell;

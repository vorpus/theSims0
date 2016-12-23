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
      ctx.fillRect(15*this.x, 15*this.y, 15, 15);
    } else {
      ctx.strokeRect(15*this.x, 15*this.y, 15, 15);
    }
  }

}

module.exports = Cell;

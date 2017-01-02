const Cell = require('./cell');
const Template = require('./template');

class Canvas {
  constructor() {
    this.x = Canvas.CELLS_X;
    this.y = Canvas.CELLS_Y;

    this.cells = this.newCells();
    this.generateTemplate(10, 10, Template.glidergun());
    this.template = Template.dot();
  }

  clearCells() {
    this.cells = this.newCells();
  }

  clickHandler(x,y) {
    let cellXpos = Math.floor(x/Canvas.CELLXDIM);
    let cellYpos = Math.floor(y/Canvas.CELLYDIM);
    // this.cells[cellXpos][cellYpos].clickMe();
    this.generateTemplate(cellXpos, cellYpos, this.template);
  }

  hoverHandler(x, y, ctx) {
    let cellXpos = Math.floor(x/Canvas.CELLXDIM)*Canvas.CELLXDIM;
    let cellYpos = Math.floor(y/Canvas.CELLYDIM)*Canvas.CELLYDIM;

    let templateHeight = this.template.length*Canvas.CELLXDIM;
    let templateWidth = this.template[0].length*Canvas.CELLYDIM;

    this.draw(ctx);
    ctx.fillStyle = 'rgba(255,255,0,0.3)';
    ctx.fillRect(cellXpos, cellYpos, templateWidth, templateHeight);
  }

  setTemplate(templateName) {
    if (Template[templateName]) {
      this.template = Template[templateName]();
    } else {
      this.template = Template.dot();
    }
  }

  generateTemplate(x, y, template) {
    template.forEach((templateRow, rowIdx) => {
      templateRow.forEach((activeState, cellIdx) => {
        if (activeState === 1) {
          this.cells[x+cellIdx][y+rowIdx].live();
        } else {
          this.cells[x+cellIdx][y+rowIdx].die();
        }
      });
    });
  }

  newCells() {
    let newGrid = []
    for (let i = 0; i < this.x; i++) {
      newGrid[i] = [];
      for (let j = 0; j < this.y; j++) {
        newGrid[i][j] = new Cell(i, j, 'dead');
      }
    }
    return newGrid;
  }

  processConway(ctx, steps) {
    this.step();
    this.draw(ctx);
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

  step() {
    let cellsToLive = [];
    let cellsToDie = [];

    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        let neighborCount = this.neighbors(i,j);
        let fate = this.myFate(i, j, neighborCount);

        if (fate === 'live') {
          cellsToLive.push([i,j]);
        } else if (fate === 'die') {
          cellsToDie.push([i,j]);
        }
      }
    }
    this.createLife(cellsToLive);
    this.reaperLife(cellsToDie);
  }

  createLife(cells) {
    cells.forEach((cell) => {
      this.cells[cell[0]][cell[1]].live();
    });
  }

  reaperLife(cells) {
    cells.forEach((cell) => {
      this.cells[cell[0]][cell[1]].die();
    });
  }

  neighbors(i, j) {
    let liveNeighborCount = 0;
    let myNeighbors = this.cells[i][j].neighbors();

    myNeighbors.forEach((neighbor) => {
      let neighborHealth = this.cells[neighbor[0]][neighbor[1]].status;
      if (neighborHealth === 'alive') {
        liveNeighborCount++;
      }
    });
    return liveNeighborCount;
  }

  myFate(i, j, neighborCount) {
    if (this.cells[i][j].status === 'alive') {
      if (neighborCount < 2) {
        return 'die';
      } else if (neighborCount > 3) {
        return 'die';
      }
    } else {
      if (neighborCount === 3) {
        return 'live';
      }
    }
    return null;
  }


}

Canvas.BG_COLOR = "#e2e2e2";
Canvas.DIM_X = 680;
Canvas.DIM_Y = 600;
Canvas.CELLS_X = 68;
Canvas.CELLS_Y = 60;
Canvas.CELLXDIM = Canvas.DIM_X/Canvas.CELLS_X;
Canvas.CELLYDIM = Canvas.DIM_Y/Canvas.CELLS_Y;

module.exports = Canvas;

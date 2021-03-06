/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Canvas = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const canvas = document.getElementById('canvas');
	
	  canvas.width = Canvas.DIM_X;
	  canvas.height = Canvas.DIM_Y;
	  canvas.speed = 400;
	
	  const ctx = canvas.getContext('2d');
	
	  ctx.fillStyle = Canvas.BG_COLOR;
	  ctx.fillRect(0, 0, Canvas.DIM_X, Canvas.DIM_Y);
	
	  const thisCanvas = new Canvas();
	
	  thisCanvas.draw(ctx);
	
	  function getMousePos(docCanvas, evt) {
	    var rect = docCanvas.getBoundingClientRect();
	    return {
	      x: evt.clientX - rect.left,
	      y: evt.clientY - rect.top
	    };
	  }
	
	  $('canvas')[0].addEventListener("click", (e) => {
	    let clickedPos = getMousePos(e.target, e);
	    thisCanvas.clickHandler(clickedPos.x, clickedPos.y);
	    thisCanvas.draw(ctx);
	  });
	
	  $('canvas')[0].addEventListener("mousemove", (e) => {
	    let clickedPos = getMousePos(e.target, e);
	    thisCanvas.hoverHandler(clickedPos.x, clickedPos.y, ctx);
	  });
	
	  $('.one-step').on('click', () => {
	    thisCanvas.processConway(ctx, 1);
	    thisCanvas.draw(ctx);
	  });
	
	
	
	
	
	  let intervalName;
	  $('.step-play').on('click', () => {
	    $('.play-active').toggleClass('hidden');
	
	    if (intervalName) {
	      clearInterval(intervalName);
	      intervalName = null;
	    } else {
	      intervalName = setInterval(() => {
	        thisCanvas.processConway(ctx, 1);
	        thisCanvas.draw(ctx);
	      }, canvas.speed);
	    }
	  });
	
	  $('.pick-still-life').on('click', () => {
	    $('.still-life-select').removeClass('hidden');
	    $('.oscillator-select').addClass('hidden');
	    $('.spaceship-select').addClass('hidden');
	    $('.generator-select').addClass('hidden');
	  });
	
	  $('.pick-oscillator').on('click', () => {
	    $('.still-life-select').addClass('hidden');
	    $('.oscillator-select').removeClass('hidden');
	    $('.spaceship-select').addClass('hidden');
	    $('.generator-select').addClass('hidden');
	  });
	
	  $('.pick-spaceship').on('click', () => {
	    $('.still-life-select').addClass('hidden');
	    $('.oscillator-select').addClass('hidden');
	    $('.spaceship-select').removeClass('hidden');
	    $('.generator-select').addClass('hidden');
	  });
	
	  $('.pick-generator').on('click', () => {
	    $('.still-life-select').addClass('hidden');
	    $('.oscillator-select').addClass('hidden');
	    $('.spaceship-select').addClass('hidden');
	    $('.generator-select').removeClass('hidden');
	  });
	
	  $('.template-clickable').on('click', (e) => {
	    thisCanvas.setTemplate(e.target.attributes.data.nodeValue);
	  });
	
	  $('.clear-all').on('click', (e) => {
	    thisCanvas.clearCells();
	    thisCanvas.draw(ctx);
	  });
	
	  $('#speed-picker').on('change', (e) => {
	    $('.play').removeClass('hidden');
	    $('.stop').addClass('hidden');
	    clearInterval(intervalName);
	    intervalName = null;
	    canvas.speed = 1000 - 10*parseInt(e.target.value);
	  })
	
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Cell = __webpack_require__(2);
	const Template = __webpack_require__(3);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	class Template {
	  static processTextplate(txtfile) {
	    let maxWidth = 0;
	    let txtarr = txtfile.split("\n").map((line) => {
	      const onlyLine = line.trim();
	      if (onlyLine.length > maxWidth) {
	        maxWidth = onlyLine.length;
	      }
	      return onlyLine;
	    });
	    return this.txtArrToTemplate(txtarr, maxWidth);
	  }
	
	  static txtArrToTemplate(txtarr, maxWidth) {
	    const templateArr = new Array(txtarr.length);
	    txtarr.forEach((line, idx) => {
	      templateArr[idx] = [];
	      for (let i = 0; i < maxWidth; i++) {
	        if (line[i] === "O") {
	          templateArr[idx].push(1);
	        } else {
	          templateArr[idx].push(0)
	        }
	      }
	    });
	    return templateArr;
	  }
	
	  static dot () {
	    return [
	      [1]
	    ];
	  }
	
	  static block () {
	    return [
	      [1,1],
	      [1,1]
	    ]
	  }
	
	  static beehive () {
	    return [
	      [0,1,1,0],
	      [1,0,0,1],
	      [0,1,1,0]
	    ]
	  }
	
	  static pentadecathlon () {
	    return [
	      [0,0,1,0,0,0,0,1,0,0],
	      [1,1,0,1,1,1,1,0,1,1],
	      [0,0,1,0,0,0,0,1,0,0]
	    ]
	  }
	
	  static pulsar () {
	    return [
	      [0,0,1,1,1,0,0,0,1,1,1,0,0],
	      [0,0,0,0,0,0,0,0,0,0,0,0,0],
	      [1,0,0,0,0,1,0,1,0,0,0,0,1],
	      [1,0,0,0,0,1,0,1,0,0,0,0,1],
	      [1,0,0,0,0,1,0,1,0,0,0,0,1],
	      [0,0,1,1,1,0,0,0,1,1,1,0,0],
	      [0,0,0,0,0,0,0,0,0,0,0,0,0],
	      [0,0,1,1,1,0,0,0,1,1,1,0,0],
	      [1,0,0,0,0,1,0,1,0,0,0,0,1],
	      [1,0,0,0,0,1,0,1,0,0,0,0,1],
	      [1,0,0,0,0,1,0,1,0,0,0,0,1],
	      [0,0,0,0,0,0,0,0,0,0,0,0,0],
	      [0,0,1,1,1,0,0,0,1,1,1,0,0]
	    ]
	  }
	
	  static p16 () {
	    return [
	      [0,0,1,1,1,0,0,0,1,1,1,0,0],
	      [0,1,0,0,0,1,0,1,0,0,0,1,0],
	      [0,1,0,0,0,1,0,1,0,0,0,1,0],
	      [1,0,1,1,1,1,0,1,1,1,1,0,1],
	      [1,1,0,0,0,0,0,0,0,0,0,1,1],
	      [0,0,0,0,0,0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0,0,0,0,0,0],
	      [0,0,0,0,1,1,0,1,1,0,0,0,0],
	      [0,0,0,1,0,1,0,1,0,1,0,0,0],
	      [0,0,0,0,1,0,0,0,1,0,0,0,0]
	    ]
	  }
	
	  static lightweightspaceship () {
	    return [
	      [0,1,0,0,1],
	      [1,0,0,0,0],
	      [1,0,0,0,1],
	      [1,1,1,1,0]
	    ];
	  }
	
	  static glider () {
	    return [
	      [1,0,0],
	      [0,1,1],
	      [1,1,0]
	    ];
	  }
	
	
	  static c10orthogonal () {
	    return [
	      [0,1,1,0,0,1,1,0],
	      [0,0,0,1,1,0,0,0],
	      [0,0,0,1,1,0,0,0],
	      [1,0,1,0,0,1,0,1],
	      [1,0,0,0,0,0,0,1],
	      [0,0,0,0,0,0,0,0],
	      [1,0,0,0,0,0,0,1],
	      [0,1,1,0,0,1,1,0],
	      [0,0,1,1,1,1,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,1,1,0,0,0],
	      [0,0,0,1,1,0,0,0],
	    ];
	  }
	
	  static glidergun () {
	    return [
	      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
	      [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
	      [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	      [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	    ];
	  }
	
	  static b52bomber () {
	    return this.processTextplate(
	      `....OOOOOO
	      ..OO.....O
	      OO.O.....O
	      ....O...O
	      ......O
	      ......OO
	      .....OOOO
	      .....OO.OO
	      .......OO`
	    );
	  }
	
	  static backrake1 () {
	    return this.processTextplate(
	      `.....OOO...........OOO
	        ....O...O.........O...O
	        ...OO....O.......O....OO
	        ..O.O.OO.OO.....OO.OO.O.O
	        .OO.O....O.OO.OO.O....O.OO
	        O....O...O..O.O..O...O....O
	        ............O.O
	        OO.......OO.O.O.OO.......OO
	        ............O.O
	        ......OOO.........OOO
	        ......O...O.........O
	        ......O.O....OOO
	        ............O..O....OO
	        ...............O
	        ...........O...O
	        ...........O...O
	        ...............O
	        ............O.O`
	    );
	  }
	  static canadagoose () {
	    return this.processTextplate(
	      `OOO
	      O.........OO
	      .O......OOO.O
	      ...OO..OO
	      ....O
	      ........O
	      ....OO...O
	      ...O.O.OO
	      ...O.O..O.OO
	      ..O....OO
	      ..OO
	      ..OO`
	    );
	  }
	  static bentkeys () {
	    return this.processTextplate(
	      `.O........O
	      O.O......O.O
	      .O.OO..OO.O
	      ....O..O
	      ....O..O`
	    );
	  }
	  static diamondring () {
	    return this.processTextplate(
	      `......O
	      .....O.O
	      ....O.O.O
	      ....O...O
	      ..OO..O..OO
	      .O....O....O
	      O.O.OO.OO.O.O
	      .O....O....O
	      ..OO..O..OO
	      ....O...O
	      ....O.O.O
	      .....O.O
	      ......O`
	    );
	  }
	
	  static vacuum () {
	    return this.processTextplate(
	      `.OO.......................OO
	        .OO.......................O
	        ........................O.O
	        ...............OO.......OO
	        OO.............O.O
	        OO.............O.OO
	        ................OO
	        ................O
	        ............................................OO
	        ................O...........................OO
	        ................OO
	        OO.............O.OO.............O...O
	        OO.............O.O.............O.....O.......OO
	        ...............OO..............O.............OO
	        ...............................OO...O
	        .OO..............................OOO
	        .OO
	        .................................OOO
	        ...............................OO...O
	        ...............................O.............OO
	        ...............................O.....O.......OO
	        ................................O...O
	
	        ............................................OO
	        ............................................OO
	
	
	
	
	        .....................................OO
	        .....................................O.O.......OO
	        .......................................O.......OO
	        .....................................OOO
	        ......................O.O
	        .....................OOO
	        .....................OOO
	        .....................O...............OOO
	        .........................O.O...........O
	        .....................OO....O.........O.O
	        ................OO....O...OO.........OO
	        ...............O.O......O
	        ...............O
	        ..............OO`
	    );
	  }
	
	  static bigun () {
	    return this.processTextplate(
	      `...........O
	      ..........OO
	      .........OO
	      ..........OO..OO
	      ......................................O
	      ......................................OO........OO
	      .......................................OO.......OO
	      ..........OO..OO..................OO..OO
	      OO.......OO
	      OO........OO
	      ...........O
	      ..................................OO..OO
	      .......................................OO
	      ......................................OO
	      ......................................O`
	    );
	  }
	  static eater () {
	    return this.processTextplate(
	      `OO
	      O.O
	      ..O
	      ..OO`
	    );
	  }
	  static quadpseudo () {
	    return this.processTextplate(
	      `........OO
	      ...OO.O..O
	      ...O.OO.O
	      ........OO
	      ...O.OO...O
	      .OOO.OO.OO
	      O.......O
	      .OOO.OO.O
	      ...O.O.O`
	    );
	  }
	}
	
	module.exports = Template;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
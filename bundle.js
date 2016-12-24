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
	
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Cell = __webpack_require__(2)
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Canvas = __webpack_require__(1);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
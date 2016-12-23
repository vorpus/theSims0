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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
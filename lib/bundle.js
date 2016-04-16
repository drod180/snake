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
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var SnakeView = __webpack_require__(1);
	
	$d(function () {
	
	  var rootEl = $d('.snake-game');
	  new SnakeView(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);
	
	var View = function ($el) {
		this.$el = $el;
	
		this.board = new Board(20);
		this.$li = this.setupGrid();
	
		this.intervalId = setInterval(
			this.step.bind(this),
			View.GAME_SPEED
		);
	
		$d('body').on("keydown", this.handleKeyEvent.bind(this));
	};
	
	View.GAME_SPEED = 100;
	View.KEYS = {
		38: "N",
		39: "E",
		40: "S",
		37: "W"
	};
	
	View.prototype.handleKeyEvent = function (event) {
		if (View.KEYS[event.keyCode]) {
			this.board.snake.turn(View.KEYS[event.keyCode]);
		}
	};
	
	View.prototype.render = function () {
		this.updateClasses(this.board.snake.segments, "snake");
		this.updateClasses([this.board.apple.position], "apple");
	};
	
	
	View.prototype.setupGrid = function () {
	  var html = "";
	
	  for (var i = 0; i < this.board.dimension; i++) {
	    html += "<ul>";
	    for (var j = 0; j < this.board.dimension; j++) {
	      html += "<li></li>";
	    }
	    html += "</ul>";
	  }
	
	  this.$el.html(html);
	  return this.$el.find("li");
	};
	
	View.prototype.step = function () {
	  if (this.board.snake.segments.length > 0) {
	    this.board.snake.move();
	    this.render();
	  } else {
	    alert("You lose!");
	    window.clearInterval(this.intervalId);
	  }
	};
	
	View.prototype.updateClasses = function(coords, className) {
		this.$li.filter("." + className).removeClass(className);
	
		coords.forEach(function(coord){
			var flatCoord = (coord.x * this.board.dimension) + coord.y;
			this.$li.equal(flatCoord).addClass(className);
		}.bind(this));
	};
	
	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(3);
	var Apple = __webpack_require__(5);
	var Board = __webpack_require__(2);
	
	var Board = function (dimension) {
		this.dimension = dimension;
		this.snake = new Snake(this);
		this.apple = new Apple(this);
	};
	
	Board.BLANK_SYMBOL = ".";
	
	Board.blankGrid = function (dim) {
	  var grid = [];
	
	  for (var i = 0; i < dim; i++) {
	    var row = [];
	    for (var j = 0; j < dim; j++) {
	      row.push(Board.BLANK_SYMBOL);
	    }
	    grid.push(row);
	  }
	
	  return grid;
	};
	
	Board.prototype.render = function () {
	  var grid = Board.blankGrid(this.dim);
	
	  this.snake.segments.forEach(function (segment) {
	    grid[segment.i][segment.j] = Snake.SYMBOL;
	  });
	
	  grid[this.apple.position.i][this.apple.position.j] = Apple.SYMBOL;
	
	  var rowStrs = [];
	  grid.map(function (row) {
	    return row.join("");
	  }).join("\n");
	};
	
	Board.prototype.validPosition = function (coord) {
	  return (coord.i >= 0) && (coord.i < this.dim) &&
	    (coord.j >= 0) && (coord.j < this.dim);
	};
	
	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Coord = __webpack_require__(4);
	
	var _directions = {
		"N": new Coord(-1, 0),
		"E": new Coord(0, 1),
		"S": new Coord(0, 1),
		"W": new Coord(-1, 0)
	};
	
	var Snake = function (board) {
		this.direction = "S";
	
		var center = new Coord(Math.floor(board.dim/2), Math.floor(board.dim/2));
		this.segments = [center];
		
		this.turning = false;
		this.board = board;
	
		this.growTurns = 0;
	};
	
	Snake.GROW_TURNS = 3;
	Snake.SYMBOL = "S";
	
	Snake.prototype.eatApple = function () {
	  if (this.head().equals(this.board.apple.position)) {
	    this.growTurns += 3;
	    return true;
	  } else {
	    return false;
	  }
	};
	
	Snake.prototype.head = function () {
	  return this.segments[this.segments.length - 1];
	};
	
	Snake.prototype.isOccupying = function (array) {
	  var result = false;
	  this.segments.forEach(function (segment) {
	    if (segment.i === array[0] && segment.j === array[1]) {
	      result = true;
	      return result;
	    }
	  });
	  return result;
	};
	
	Snake.prototype.isValid = function () {
	  var head = this.head();
	
	  if (!this.board.validPosition(this.head())) {
	    return false;
	  }
	
	  for (var i = 0; i < this.segments.length - 1; i++) {
	    if (this.segments[i].equals(head)) {
	      return false;
	    }
	  }
	
	  return true;
	};
	
	Snake.prototype.move = function () {
	  this.segments.push(this.head().plus(_directions[this.direction]));
	
	  this.turning = false;
	
	  if (this.eatApple()) {
	    this.board.apple.replace();
	  }
	
	  if (this.growTurns > 0) {
	    this.growTurns -= 1;
	  } else {
	    this.segments.shift();
	  }
	
	  if (!this.isValid()) {
	    this.segments = [];
	  }
	};
	
	Snake.prototype.turn = function (dir) {
		this.direction = dir;
	};
	
	module.exports = Snake;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Coord = function (x, y) {
		this.x = x;
		this.y = y;
	};
	
	
	Coord.prototype.plus = function (coord) {
		return new Coord(this.x + coord.x, this.y + coord.y);
	};
	
	Coord.prototype.equals = function (coord) {
		return (this.x === coord.x && this.y === coord.y);
	
	};
	
	Coord.prototype.isOpposite = function (coord) {
		return (this.x === coord.y && this.y === coord.y);
	};
	
	module.exports = Coord;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Coord = __webpack_require__(4);
	
	var Apple = function (board) {
	  this.board = board;
	  this.position = this.replace();
	};
	
	Apple.prototype.replace = function () {
	  var x = Math.floor(Math.random() * this.board.dimension);
	  var y = Math.floor(Math.random() * this.board.dimension);
	
	  // Don't place an apple where there is a snake
	  while (this.board.snake.isOccupying([x, y])) {
	    x = Math.floor(Math.random() * this.board.dimension);
	    y = Math.floor(Math.random() * this.board.dimension);
	  }
	
	  return new Coord(x, y);
	};
	
	module.exports = Apple;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
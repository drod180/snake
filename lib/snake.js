var Coord = require("./coord.js");

var Snake = function (board) {
	this.direction = "S";

	var center = new Coord(1, 1);
	this.segments = [center];
	this.turning = false;
	this.board = board;

	this.growTurns = 0;
};

Snake.GROW_TURNS = 1;
Snake.SYMBOL = "S";
Snake.DIRS = {
	"N": new Coord(-1, 0),
	"E": new Coord(0, 1),
	"S": new Coord(1, 0),
	"W": new Coord(0, -1)
};

Snake.prototype.eatApple = function () {
  if (this.head().equals(this.board.apple.position)) {
    this.growTurns += Snake.GROW_TURNS;
    return true;
  } else {
    return false;
  }
};

Snake.prototype.head = function () {
  return this.segments[this.segments.length - 1];
};

Snake.prototype.isOccupying = function (array) {
  this.segments.forEach(function (segment) {
    if (segment.x === array[0] && segment.y === array[1]) {
      return true;
    }
  });
  return false;
};

Snake.prototype.isValid = function () {
  var head = this.head();

  if (!this.board.validPosition(head)) {
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
  this.segments.push(this.head().plus(Snake.DIRS[this.direction]));

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

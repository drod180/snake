var Coord = require("./coord.js");

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

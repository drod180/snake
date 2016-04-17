var Snake = require("./snake.js");
var Apple = require("./apple.js");
var Board = require("./board.js");

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

Board.prototype.validPosition = function (coord) {
  return (coord.x >= 0) && (coord.x < this.dimension) &&
    (coord.y >= 0) && (coord.y < this.dimension);
};

module.exports = Board;

var Coord = require("./coord.js");

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

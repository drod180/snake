var Coord = require("./coord" );

var Apple = function (board) {
  this.board = board;
  this.position = this.replace();
};

Apple.prototype.replace = function () {
  var x = Math.floor(Math.random() * this.board.dim);
  var y = Math.floor(Math.random() * this.board.dim);

  // Don't place an apple where there is a snake
  while (this.board.snake.isOccupying([x, y])) {
    x = Math.floor(Math.random() * this.board.dim);
    y = Math.floor(Math.random() * this.board.dim);
  }

  return new Coord(x, y);
};

module.exports = Apple;

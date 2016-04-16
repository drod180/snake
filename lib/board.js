var Snake = require("./snake");
var Apple = require("./apple");

var Board = function () {
	this.snake = Snake.new();
	this.apple = Apple.new();
};

module.exports = Board;

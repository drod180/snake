var Snake = require("./snake");

var Board = {

	start: function () {
		this.snake = Snake.new();
	}
};

module.exports = Board;

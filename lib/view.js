var Board = require("./board.js");

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

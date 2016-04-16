var DOMNodeCollection = require("./dom_node_collection");
var Board = require("./board");

var View = function ($el) {
	this.$el = $el;

	this.board = new Board(20);
	this.$li = this.setupGrid();

	this.intervalId = window.setInterval(
		this.step.bind(this),
		View.STEP_INTERVAL
	);

	$l(window).on("keydown", this.handleKeyEvent.bind(this));
};

View.STEP_INTERVAL = 100;
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

View.prototype.updateClasses = function(coords, className) {
  this.$li.filter("." + className).removeClass();

  coords.forEach(function(coord){
    var flatCoord = (coord.i * this.board.dim) + coord.j;
    this.$li.eq(flatCoord).addClass(className);
  }.bind(this));
};

View.prototype.setupGrid = function () {
  var html = "";

  for (var i = 0; i < this.board.dim; i++) {
    html += "<ul>";
    for (var j = 0; j < this.board.dim; j++) {
      html += "<li></li>";
    }
    html += "</ul>";
  }

  this.$el.html(html);
  return this.$el.find("li");
};
module.exports = View;

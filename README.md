# Snake

Snake is a simple game built using [DOMinion](http://github.com/drod180/DOMinion) as a proof of concept.

[Live](http://www.drodriguez.io/snake/)

### Technical Details
Using DOMinion, once the document is ready we find the root element which we are going to add everything to.

```javascript
$d(function () {
  var rootEl = $d('.snake-game');
  new SnakeView(rootEl);
});
```

The view is setup with a key listener on the body of the HTML view to handle the movement of the snake. In order to display the board, we setup a list of boxes which is setup in a grid formation. Using the returned list of li elements DOMinion's filter and equal commands are used to determine which list items refer to the snake or apple.
```javascript
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

View.prototype.updateClasses = function(coords, className) {
	this.$li.filter("." + className).removeClass(className);
	coords.forEach(function(coord){
		var flatCoord = (coord.x * this.board.dimension) + coord.y;
		this.$li.equal(flatCoord).addClass(className);
	}.bind(this));
};
```

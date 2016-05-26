var SnakeView = require('./view.js');

$d(function () {
  var rootEl = $d('.snake-game');
	var statusEl = $d('.status');
  new SnakeView(rootEl, statusEl);
});

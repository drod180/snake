var SnakeView = require('./view.js');

$d(function () {
  var rootEl = $d('.snake-game');
  new SnakeView(rootEl);
});

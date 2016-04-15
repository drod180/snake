var Coords = require("./coords");

var _directions = {N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0]};

var Snake = {

	new: function () {
		this.direction = "S";
		this.segments = [[0, 1]];
	},


	move: function () {
		segments.map(function (segment) {
			return Coords.add(segment, _directions[this.direction]);
		});
	},

	turn: function (dir) {
		this.direction = dir;
	},
};


module.exports = Snake;

var Coords = require("./coords");

var _directions = {
	"N": new Coord(-1, 0),
	"E": new Coord(0, 1), 
	"S": new Coord(0, 1),
	"W": new Coord(-1, 0)
};

var Snake = function () {
	this.direction = "S";
	this.segments = [new Coord(1, 1)];
};

Snake.prototype.move = function () {
	segments.map(function (segment) {
		return Coords.add(segment, _directions[this.direction]);
	});
};

Snake.prototype.turn = function () {
	this.direction = dir;
};

module.exports = Snake;

var Coord = function (x, y) {
	this.x = x;
	this.y = y;
};


Coord.prototype.plus = function (coord) {
	return new Coord(this.x + coord.x, this.y + coord.y);
};

Coord.prototype.equals = function (coord) {
	return (this.x === coord.x && this.y === coord.y);

};

Coord.prototype.isOpposite = function (coord) {
	return (this.x === coord.y && this.y === coord.y);
};

module.exports = Coord;

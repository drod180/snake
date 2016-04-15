
var Coord = {
	plus: function (coord1, val) {
		return [coord1[0] + coord2[0], coord1[1] + coord2[1]];
	},

	equals: function (coord1, coord2) {
		if (coord1[0] === coord2[0] && coord1[1] === coord2[1]) {
			return true;
		} else {
			return false;
		}
	},

	isOpposite: function (coord1, coord2) {
		if (coord1[0] === coord2[1] && coord1[1] === coord2[0]) {
			return true;
		} else {
			return false;
		}

	},

};

module.exports = Coord;

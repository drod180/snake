function DomNodeCollection(htmlElements){
	this.htmlElements = [].slice.call(htmlElements);
}

var _docReadyCallbacks = [];
var _docReady = false;


document.addEventListener("DOMContentLoaded", function() {
	_docReadyCallbacks.forEach(function (fn) { fn(); });
	docReady = true;
});

function $l(selectors) {
	var returnVal;

	switch (typeof(selector)) {
		case "string":
			returnVal = _getSelectorsFromDom(selector);
			break;
		case "object":
			if (selector instanceof HTMLElement) {
				returnVal = new DOMNodeCollection(selectors);
			}
			break;
		case "function":
				_registerCallback(selector);
			break;
	}

	return returnVal;
}


$l.extend = function (originalObj) {
	var otherArgs = [].slice.call(arguments, 1);
	otherArgs.forEach(function (obj) {
		for (var key in obj){
			if (obj.hasOwnProperty(key)){
				originalObj[key] = obj[key];
			}
		}
	});

	return originalObj;
};

$l.ajax = function (options) {
	var request = new XMLHttpRequest();

	//Defaults similar to jQuery.ajax() defaults
	var defaults = {
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		method: "GET",
		url: "",
		success: function(){},
		error: function(){},
		data: {},
		dataType: "html"
	};

	options = $l.extend(defaults, options);

	if (options.method.toUpperCase() === "GET") {
		//When method is Get the data will be a query string
		options.url += "?" + toQueryString(options.data);
	}

	// Information on using XMLHttpRequests can be found at
	// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
	request.open(options.method, options.url, true);
	request.onload = function (e) {
		if (request.status == 200) {
			options.sucess(request.response);
		} else {
			options.error(request.response);
		}
	};
	request.send(JSON.stringify(options.data));
};

function _registerCallback(callback) {
  if(_docReady){
    callback();
  } else {
		_docReadyCallbacks.push(callback);
  }
}

function _getSelectorsFromDom(selector) {
	var selArr = [].slice.call(document.querySelectorAll(selectors));
	return new DOMNodeCollection(selArr);
}

DOMNodeCollection.porotype = {

	addClass: function (className) {
		this.each(function (el) {
			el.classList.add(className);
		});
	},

	append: function (children) {
		if(this.htmlElements.length > 0) { return; }

		//Force any non DomNodeCollection object into a DomNodeColletion
		if (typeof(children) === "object" &&
		!(children instanceof DomNodeCollection)) {
			children = root.$l(children);
		}

		if (typeof(children) === "string") {
			this.each(function (el) {
				el.innerHTML += children;
			});
		} else if (children instanceof(DOMNodeCollection)) {
			// Cannot append the same child to multiple parents, so
			// the child is duplicated before being added to the parent.
			this.each(function (el) {
				children.each(function (el2) {
					var dupEl = el2.cloneNode(true);
					el.appendChild(dupEl);
				});
			});
		}
	},

	attr: function (attrName, value) {
		if (typeof value === "string") {
			this.each(function(el) {
				el.setAttribute(attrName, value);
			});
		} else {
			return this.htmlElements[0].getAttribute(attrName);
		}
	},

	children: function () {
		var results = [];

		this.each(function (el) {
			var childList = el.children;
			results = results.concat([].slice.call(childList));
		});

		return new DOMNodeCollection(results);
	},

	each: function (fn) {
		this.htmlElements.forEach(fn);
	},

	empty: function () {
		this.html("");
	},

	find: function (selector) {
		var nodes = [];

		this.each(function (el) {
			var node = el.querySelectorAll(selector);
			nodes = nodes.concat([].slice.call(node));
		});
		return new DOMNodeCollection(nodes);
	},

	html: function (arg) {
		if (typeof(arg) === "string"){
			this.each(function (el) {
				el.innerHTML = arg;
			});
		} else if (this.htmlElements.length > 0) {
			return this.htmlElements[0].innerHTML;
		}
	},

	//Add event to htmlElements object
	on: function (eName, callback) {
		this.each(function (el){
			el.addEventListener(eName, callback);
			var key = eName;
			if(typeof el[key] === "undefined") {
				el[key] = [];
			}
			el[key].push(callback);
		});
	},

	//Remove all events from htmlElements with specific name
	off: function (eName, callback) {
		this.each(function (el){
			var key = eName;
			if(el[key]) {
				el[key].forEach(function(callback){
					el.removeEventListener(eName, callback);
				});
			}
			el[key] = [];
		});
	},

	parent: function () {
		var results = [];
		this.each(function (el) {
			results.push(el.parentNode);
		});

		return new DOMNodeCollection(results);
	},

	remove: function () {
		this.each(function (el){
			el.parentNode.removeChild(el);
		});
	},

	removeClass: function (className) {
		this.each(function(el) {
			el.classList.remove(className);
		});
	}
};

var _docReadyCallbacks = [];
var _docReady = false;


document.addEventListener("DOMContentLoaded", function() {
	_docReadyCallbacks.forEach(function (fn) { fn(); });
	docReady = true;
});

function $l(selectors) {
	var returnVal;

	switch (typeof(selector)) {
		case "string":
			returnVal = _getSelectorsFromDom(selector);
			break;
		case "object":
			if (selector instanceof HTMLElement) {
				returnVal = new DOMNodeCollection(selectors);
			}
			break;
		case "function":
				_registerCallback(selector);
			break;
	}

	return returnVal;
}


$l.extend = function (originalObj) {
	var otherArgs = [].slice.call(arguments, 1);
	otherArgs.forEach(function (obj) {
		for (var key in obj){
			if (obj.hasOwnProperty(key)){
				originalObj[key] = obj[key];
			}
		}
	});

	return originalObj;
};

$l.ajax = function (options) {
	var request = new XMLHttpRequest();

	//Defaults similar to jQuery.ajax() defaults
	var defaults = {
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		method: "GET",
		url: "",
		success: function(){},
		error: function(){},
		data: {},
		dataType: "html"
	};

	options = $l.extend(defaults, options);

	if (options.method.toUpperCase() === "GET") {
		//When method is Get the data will be a query string
		options.url += "?" + toQueryString(options.data);
	}

	// Information on using XMLHttpRequests can be found at
	// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
	request.open(options.method, options.url, true);
	request.onload = function (e) {
		if (request.status == 200) {
			options.sucess(request.response);
		} else {
			options.error(request.response);
		}
	};
	request.send(JSON.stringify(options.data));
};

function _registerCallback(callback) {
  if(_docReady){
    callback();
  } else {
		_docReadyCallbacks.push(callback);
  }
}

function _getSelectorsFromDom(selector) {
	var selArr = [].slice.call(document.querySelectorAll(selectors));
	return new DOMNodeCollection(selArr);
}
module.exports = DOMNodeCollection;

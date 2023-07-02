/*
    ES5 polyfill 27 June 2015
    updated 25 July, 2016
    updated 13 December, 2016
*/

/*jslint for, multivar */

/*property
    __proto__, assign, call, create, hasOwnProperty, isArray, keys, length,
    prototype, push, toString
*/

if (!Object.create) {
    Object.create = function (o) {
        "use strict";
        var F = function () {
        	return;
        };

        if (o === null) {
            return {__proto__: null};   // was {"__proto__": null}
        }
        F.prototype = o;
        return new F();
    };
}

if (!Object.keys) {
    Object.keys = function (obj) {
		"use strict";
        var name, keys;

        if ((typeof obj !== "object" && typeof obj !== "function") || obj === null) {
            throw new TypeError("Object.keys called on non-object or null");
        }

        keys = [];
        for (name in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, name)) {
                keys.push(name);
            }
        }
        return keys;
    };
}

if (typeof Object.assign !== "function") {
	Object.assign = function (target, ignore) { // .length of function is 2
    	"use strict";
    	var to, index, nextSource, nextKey;

    	if ((target === null) || (target === undefined)) { // TypeError if undefined or null
      		throw new TypeError("Cannot convert undefined or null to object");
    	}

		to = Object(target);

    	for (index = 1; index < arguments.length; index += 1) {
      		nextSource = arguments[index];

      		if ((nextSource !== null) && (nextSource !== undefined)) { // Skip over if undefined or null
        		for (nextKey in nextSource) {
          			// Avoid bugs when hasOwnProperty is shadowed
          			if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            			to[nextKey] = nextSource[nextKey];
          			}
        		}
      		}
    	}
    	return to;
  	};
}

if (!Array.isArray) {
    Array.isArray = function (o) {
		"use strict";
        return Object.prototype.toString.call(o) === "[object Array]";
    };
}

Number.isNaN = Number.isNaN || function (value) {
	"use strict";
	return value !== value;
};

Number.isFinite = Number.isFinite || function (value) {
    "use strict";
    return (typeof value === "number") && isFinite(value);
};

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*
	 * app.es6
	 * es6 entry point, transpiled (via BabelJS) to ES5.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.world = exports.webvr = exports.webgl = exports.util = undefined;

	var _util = __webpack_require__(3);

	var _util2 = _interopRequireDefault(_util);

	var _gamepad = __webpack_require__(5);

	var _gamepad2 = _interopRequireDefault(_gamepad);

	var _webgl = __webpack_require__(6);

	var _webgl2 = _interopRequireDefault(_webgl);

	var _webvr = __webpack_require__(7);

	var _webvr2 = _interopRequireDefault(_webvr);

	var _ui = __webpack_require__(8);

	var _ui2 = _interopRequireDefault(_ui);

	var _shaderFader = __webpack_require__(9);

	var _shaderFader2 = _interopRequireDefault(_shaderFader);

	var _shaderTexture = __webpack_require__(11);

	var _shaderTexture2 = _interopRequireDefault(_shaderTexture);

	var _shaderColor = __webpack_require__(12);

	var _shaderColor2 = _interopRequireDefault(_shaderColor);

	var _shaderTerrain = __webpack_require__(13);

	var _shaderTerrain2 = _interopRequireDefault(_shaderTerrain);

	var _shaderSky = __webpack_require__(14);

	var _shaderSky2 = _interopRequireDefault(_shaderSky);

	var _shaderWater = __webpack_require__(15);

	var _shaderWater2 = _interopRequireDefault(_shaderWater);

	var _shaderMetal = __webpack_require__(16);

	var _shaderMetal2 = _interopRequireDefault(_shaderMetal);

	var _lights = __webpack_require__(17);

	var _lights2 = _interopRequireDefault(_lights);

	var _shaderPool = __webpack_require__(18);

	var _shaderPool2 = _interopRequireDefault(_shaderPool);

	var _primFactory = __webpack_require__(20);

	var _primFactory2 = _interopRequireDefault(_primFactory);

	var _world = __webpack_require__(30);

	var _world2 = _interopRequireDefault(_world);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log('in es6');

	// DEV ENVIRONMENT

	var env = process.env.WEBPACK_ENV;

	// REQUIRE ALL POLYFILLS

	// WebGL matrix math library.

	var glMatrix = __webpack_require__(32);

	if (!glMatrix) {

	    console.error('gl-matrix could\'nt be loaded...');
	} else {

	    console.log('loaded gl-matrix');
	}

	// Import WebVR-Mini libraries. Note: if you don't use super() imports will fail!

	// NOTE: imports Emitter class

	// Import Shaders.

	// Lights

	// Collects the shaders in one place.

	// Object primitives.

	// Import the world (variable object, changes with each VR world).

	// Init Util first to create shortcuts.

	var util = new _util2.default();

	// If we are in dev mode, load any special libraries.

	var webgl = null;

	if (true) {

	    console.log('app.es6: in development mode');

	    // require kronos webgl debug from node_modules
	    // https://github.com/vorg/webgl-debug

	    var debug = __webpack_require__(42);

	    exports.webgl = webgl = new _webgl2.default(false, glMatrix, util, debug);

	    if (debug) {

	        console.log('Loading webgl-debug');
	    } else {

	        console.log('Error loading webgl-debug');
	    }
	} else if (__RELEASE__ === 'true') {

	    // Code only added to release.

	    exports.webgl = webgl = new _webgl2.default(false, glMatrix, util);
	}

	// Create sub-objects.

	var webvr = void 0,
	    gamepad = void 0,
	    ui = void 0,
	    shaderPool = void 0,
	    lights = void 0,
	    world = void 0;

	// WebGL can take some time to init.

	var promise = new Promise(function (resolve, reject) {

	    // do a thing, possibly async, then…

	    if (webgl.init('webvr-mini-canvas')) {

	        exports.webvr = webvr = new _webvr2.default(true, util, glMatrix, webgl);

	        // Load Gamepad support.

	        gamepad = new _gamepad2.default(true, util);

	        // Load our (minimal) 2d user interface.

	        ui = new _ui2.default(false, util, webgl, webvr);

	        // Add shaders to ShaderPool.

	        lights = new _lights2.default(glMatrix);

	        shaderPool = new _shaderPool2.default(true, util, glMatrix, webgl);

	        // Define the default Shaders used by this app.

	        // REQUIRED Shader, used for fadeins on Prim creation.

	        shaderPool.addAsset(new _shaderFader2.default(true, util, glMatrix, webgl, webvr, 'shaderFader', lights));

	        // Basic one-texture Shader, without lighting.

	        shaderPool.addAsset(new _shaderTexture2.default(true, util, glMatrix, webgl, webvr, 'shaderTexture', lights));

	        // Basic color array Shader, without lighting.

	        shaderPool.addAsset(new _shaderColor2.default(true, util, glMatrix, webgl, webvr, 'shaderColor', lights));

	        // Terrain.

	        shaderPool.addAsset(new _shaderTerrain2.default(true, util, glMatrix, webgl, webvr, 'shaderTerrain', lights));

	        // Sky.

	        shaderPool.addAsset(new _shaderSky2.default(true, util, glMatrix, webgl, webvr, 'shaderSky', lights));

	        // Water simulation.

	        shaderPool.addAsset(new _shaderWater2.default(true, util, glMatrix, webgl, webvr, 'shaderWater', lights));

	        // Metallic, reflective mirrors.

	        shaderPool.addAsset(new _shaderMetal2.default(true, util, glMatrix, webgl, webvr, 'shaderMetal', lights));

	        // Create the world, which needs WebGL, WebVR, GamePad, the Shader list and world Lights.

	        exports.world = world = new _world2.default(true, glMatrix, webgl, webvr, gamepad, shaderPool, lights, ui);

	        // Initialize our Ui after other elements.

	        ui.init();

	        resolve('Stuff worked!');
	    } else {

	        reject(Error('It broke'));

	        // TODO: Write 'WebGL not available across canvas';

	        ui = new _ui2.default(false, util, webgl, webvr);

	        ui.initBadGL();
	    }
	}).then(function (result) {

	    // TODO: Call ui to create a wait icon here.

	    world.init();
	});

	// DEBUG
	// TODO: remove

	window.world = world;

	// Commented out since all errors end up here if we don't

	//.catch( ( err ) => {

	//    // error

	//    console.error( 'app.es6 load error:' + err );

	//} );


	// TODO: don't automatically update webgl
	// TODO: enclose in a promise, then update ShaderPool and Shaders.
	// TODO: then call world

	// Export our classes to app.js.

	exports.util = util;
	exports.webgl = webgl;
	exports.webvr = webvr;
	exports.world = world;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _emitter = __webpack_require__(4);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Util = function () {

	    /** 
	     * Utility functions.
	     */

	    function Util(emitter) {
	        _classCallCheck(this, Util);

	        console.log('in Util');

	        // Shared constants

	        this.NOT_IN_LIST = -1, // for .indexOf() checks

	        this.DEFAULT_KEY = 'default', this.POSITIVE = 1, this.NEGATIVE = -1,

	        // Create an Emitter object for pseudo-events, used by MANY other objects calling Util

	        this.emitter = new _emitter2.default(),

	        // String polyfills.

	        this.setTrim(),

	        // Performance polyfill.

	        this.setPerformance(),

	        // Finite number polyfill.

	        this.setFinite(),

	        // Add slice to typed arrays, if needed.

	        this.setSlice();
	    }

	    /** 
	     * Polyfill for .trim
	     * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	     */


	    _createClass(Util, [{
	        key: 'setTrim',
	        value: function setTrim() {

	            String.trim = String.trim || function (value) {

	                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	            };
	        }

	        /** 
	         * Polyfill for isFinite()
	         */

	    }, {
	        key: 'setFinite',
	        value: function setFinite() {

	            Number.isFinite = Number.isFinite || function (value) {

	                return typeof value === 'number' && isFinite(value);
	            };
	        }

	        /** 
	         * Performance polyfill for timing.
	         */

	    }, {
	        key: 'setPerformance',
	        value: function setPerformance() {

	            Date.now = Date.now || function () {
	                // can't use () => here!

	                return new Date().getTime();
	            };

	            window.performance = window.performance || {};

	            window.performance.now = window.performance.now || function () {

	                var nowOffset = Date.now();

	                return Date.now() - nowOffset;
	            };
	        }

	        /** 
	         * if typed arrays don't have slice, add it
	         */

	    }, {
	        key: 'setSlice',
	        value: function setSlice() {

	            if (!Object.defineProperty) {

	                return;
	            }

	            if (Uint16Array && !Uint16Array.prototype.slice) {

	                Object.defineProperty(Uint16Array.prototype, 'slice', {

	                    value: Array.prototype.slice

	                });
	            }

	            if (Uint32Array && !Uint32Array.prototype.slice) {

	                Object.defineProperty(Uint32Array.prototype, 'slice', {

	                    value: Array.prototype.slice

	                });
	            }

	            if (Float32Array && !Float32Array.prototype.slice) {

	                Object.defineProperty(Float32Array.prototype, 'slice', {

	                    value: Array.prototype.slice

	                });
	            }
	        }

	        /*
	         * ---------------------------------------
	         * STRING OPERATIONS
	         * ---------------------------------------
	         */

	        /**
	         * Check if object is a string.
	         * @param {String} str the string.
	         * @returns {Boolean} return true/false.
	         */

	    }, {
	        key: 'isString',
	        value: function isString(str) {

	            return Object.prototype.toString.call(str) === '[object String]';
	        }

	        /** 
	         * Check if string is only invisible characters, or is an empty string ''.
	         * @param {String} str the string.
	         * @returns {Boolean} true/false.
	         */

	    }, {
	        key: 'isWhitespace',
	        value: function isWhitespace(str) {

	            return !/[^\s]/.test(str);
	        }

	        /** 
	         * Check if a string looks like a URL.
	         * @param {String} str the test string
	         */

	    }, {
	        key: 'isURL',
	        value: function isURL(str) {

	            return (/^[\w+:\/\/]/.exec(str) != null
	            );
	        }

	        /** 
	         * Reverse string (used in hash keys).
	         * @param {String} str the string.
	         * @returns {String} the reversed string.
	         */

	    }, {
	        key: 'reverseString',
	        value: function reverseString(str) {

	            if (!str.split) return null;

	            return str.split('').reverse().join('');
	        }

	        /** 
	         * Get an unique object id.
	         * @link https://jsfiddle.net/briguy37/2MVFd/
	         * @returns {String} a unique UUID format id.
	         */

	    }, {
	        key: 'computeId',
	        value: function computeId() {

	            var d = new Date().getTime();

	            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {

	                var r = (d + Math.random() * 16) % 16 | 0;

	                d = Math.floor(d / 16);

	                return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
	            });

	            return uuid;
	        }

	        /** 
	         * Parse JSON files withi a try...catch statement.
	         * @param {String} data the incoming JSON data.
	         * @returns {Object|null} the parsed JSON object, or null.
	         */

	    }, {
	        key: 'parseJSON',
	        value: function parseJSON(data) {

	            var d = null;

	            try {

	                d = JSON.parse(data);
	            } catch (err) {

	                if (err instanceof SyntaxError) {

	                    console.error('Util::parseJSON(): JSON syntax error:' + err);
	                } else {

	                    console.error('Util::parseJSON(): JSON unknown error:' + err);
	                }
	            }

	            return d;
	        }

	        /** 
	         * Given a JS object, compute the equivalent Ajax query string.
	         * @param {Object} obj any JS object
	         * @returns {String} a query string that can be used in Ajax requests.
	         */

	    }, {
	        key: 'computeQueryString',
	        value: function computeQueryString(obj) {

	            var query = [];

	            var _loop = function _loop(key) {

	                var value = Array.isArray(obj[key]) ? obj[key] : [obj[key]];

	                value.forEach(function (v) {

	                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(v));
	                });
	            };

	            for (var key in obj) {
	                _loop(key);
	            }

	            return query.join('&');
	        }

	        /*
	         * ---------------------------------------
	         * NUMBER OPERATIONS
	         * ---------------------------------------
	         */

	        /** 
	         * Check if a variable can be coerced to a number.
	         * @param {Number} n the variable to be tested.
	         * @returns {Boolean} if Number, return true, else false.
	         */

	    }, {
	        key: 'isNumber',
	        value: function isNumber(n) {

	            return Number.isFinite(parseFloat(n));
	        }

	        /** 
	         * Check if a number is a power of two.
	         * @param {Number} n the variable to be tested.
	         * @returns {Boolean} if a power of 2, return true, else false.
	         */

	    }, {
	        key: 'isPowerOfTwo',
	        value: function isPowerOfTwo(n) {

	            n = parseInt(n);

	            return (n & n - 1) === 0;
	        }

	        /** 
	         * Check if a number is even.
	         * @param {Number} n the variable to be tested.
	         * @returns {Boolean} if even, return true, else false.
	         */

	    }, {
	        key: 'isEven',
	        value: function isEven(n) {

	            return parseInt(n) % 2 == 0;
	        }

	        /** 
	         * Check if a number is odd.
	         * @param {Number} n the variable to be tested.
	         * @returns {Boolean} if odd, return true, else false.
	         */

	    }, {
	        key: 'isOdd',
	        value: function isOdd(n) {

	            return Math.abs(parseInt(n) % 2) == 1;
	        }

	        /** 
	         * Return radians for (fractional) degrees.
	         * @param {Number} n the number, in degrees (0-360).
	         * @returns {Number} return the same number, in radians (0-2PI).
	         */

	    }, {
	        key: 'degToRad',
	        value: function degToRad(deg) {

	            return parseFloat(deg) * Math.PI / 180;
	        }

	        /** 
	         * Returns radians for (fractional) degress.
	         */

	    }, {
	        key: 'radToDeg',
	        value: function radToDeg(rad) {

	            return parseFloat(rad) * 180 / Math.PI;
	        }

	        /** 
	         * Returns hours for (fractional) degrees.
	         */

	    }, {
	        key: 'degToHours',
	        value: function degToHours(deg) {

	            return 24 * deg / 360;
	        }

	        /**
	         * Returns 0-360 degrees for a 24-hour clock, optionally
	         * accurate for minutes and seconds.
	         */

	    }, {
	        key: 'hoursToDeg',
	        value: function hoursToDeg() {
	            var hours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	            var minutes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	            var seconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


	            var deg = 0;

	            hours = parseFloat(hours); // force to number

	            minutes = parseFloat(minutes);

	            seconds = parseFloat(seconds);

	            if (hours) hours *= 360 / 24;

	            if (minutes) minutes *= 360 / 1440; // convert to fractional hours

	            if (seconds) seconds *= 360 / 86400;

	            return hours + minutes + seconds;
	        }
	    }, {
	        key: 'cartesianToUV',
	        value: function cartesianToUV(coords) {

	            if (!coords.length) {

	                console.error('Util::uvToCartesian(): ARRAY not supplied (did you just use separate x, y, z?');

	                return null;
	            }

	            var m = new Float32Array(2 * coords.length / 3);

	            var idx = 0;

	            for (var i = 0; i < coords.length; i += 3) {

	                var _x4 = coords[i],
	                    y = coords[i + 1],
	                    z = coords[i + 2];

	                var r = Math.sqrt(_x4 * _x4 + y * y + z * z);

	                m[idx++] = Math.acos(z / r);

	                m[idx++] = Math.acos(_x4 / Math.sqrt(_x4 * _x4 + y * y)) * (y < 0 ? -1 : 1);
	            }

	            return m;
	        }

	        /** 
	         * Given a uv (latitude, longitude) array, return cartesian coordinate equivalents.
	         * @param {Array} FLATTENED uvPositions array, with alternating u (theta) and v (phi) coordinates in RADIANS.
	         * @param {Number} w the width of the bounding box for the resulting 3d space.
	         * @param {Number} h the height of the bounding box for the resulting 3d space.
	         * @param {Number} d the depth of the bounding box for the resulting 3d space.
	         * @returns {Float32Array} a flattened Float32 array, vertices-compatible, with equivalent x, y, z coordinates.
	         */

	    }, {
	        key: 'uvToCartesian',
	        value: function uvToCartesian(uvPositions) {
	            var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	            var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	            var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;


	            if (!uvPositions.length) {

	                console.error('Util::uvToCartesian(): ARRAY not supplied (did you just add latitude and longitude?');

	                return null;
	            }

	            var m = new Float32Array(3 * uvPositions.length / 2);

	            var idx = 0;

	            for (var i = 0; i < uvPositions.length; i += 2) {

	                var u = uvPositions[i];

	                var v = uvPositions[i + 1];

	                m[idx++] = Math.cos(u) * Math.sin(v) * w; // x

	                m[idx++] = Math.sin(u) * Math.sin(v) * h; // y

	                m[idx++] = Math.cos(v) * d; // z
	            }

	            return m;
	        }

	        /** 
	         * Convert hex colors to RGB.
	         * @link https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	         */

	    }, {
	        key: 'hexToRGB',
	        value: function hexToRGB(hex) {
	            var normalize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;


	            hex = hex.replace('#', '');

	            return {

	                r: parseInt(hex.substring(0, 2), 16) / normalize,

	                g: parseInt(hex.substring(2, 4), 16) / normalize,

	                b: parseInt(hex.substring(4, 6), 16) / normalize

	            };
	        }

	        /** 
	         * Use when only one latitude and longitude needs to be converted, instead of a flattened array of uv coordinates.
	         * @param {Number} latitude the latitude
	         * @param {Number} longitude the longitude
	         * @param {Number} w the width of the bounding box for the resulting 3d space.
	         * @param {Number} h the height of the bounding box for the resulting 3d space.
	         * @param {Number} d the depth of the bounding box for the resulting 3d space.
	         * @returns {Float32Array} a Float32 array with equivalent x, y, z coordinates.
	         */

	    }, {
	        key: 'latLongToCartesian',
	        value: function latLongToCartesian(latitude, longitude) {
	            var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	            var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
	            var d = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;


	            return this.uvToCartesian([latitude, longitude], w, h, d);
	        }

	        /** 
	         * return the fractional (non-integer) portion 
	         * of a number.
	         * @param {Number} n the float number
	         * @returns {Number} the fractional part of the number;
	         */

	    }, {
	        key: 'frac',
	        value: function frac(n) {

	            return parseFloat(n) % 1;
	        }
	    }, {
	        key: 'getRand',
	        value: function getRand(min, max) {

	            if (min === undefined || max === undefined) {

	                max = 1;

	                min = 0;
	            }

	            return min + (Math.random() + 1 / (1 + this.getSeed())) % 1 * (max - min);
	        }
	    }, {
	        key: 'getRandInt',
	        value: function getRandInt(range) {

	            return Math.floor(Math.random() * range);
	        }

	        /*
	         * ---------------------------------------
	         * NUMBER UI OPERATIONS
	         * ---------------------------------------
	         */

	    }, {
	        key: 'randomColor',
	        value: function randomColor() {

	            return [Math.abs(Math.random()), Math.abs(Math.random()), Math.abs(Math.random())];
	        }

	        /** 
	         * Basic easing operations.
	         * @link https://gist.github.com/gre/1650294
	         * @link https://github.com/gre/bezier-easing
	         * @link https://github.com/danro/easing-js/blob/master/easing.js
	         * @param {Number} a a number between 0-1
	         * @param {Number} type the type of easing.
	         */

	        // ease-in quad 

	    }, {
	        key: 'easeLinearIn',
	        value: function easeLinearIn(t) {
	            var inc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.002;
	            return t + inc;
	        }
	    }, {
	        key: 'easeLinearOut',
	        value: function easeLinearOut(t) {
	            var inc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.002;
	            return t - inc;
	        }
	    }, {
	        key: 'easeQuadIn',
	        value: function easeQuadIn(t) {
	            return t + t * t;
	        }
	    }, {
	        key: 'easeQuadOut',
	        value: function easeQuadOut(t) {
	            return t + t * t;
	        }

	        // TODO: these functions have to be adjusted for 0-1, computing what to return by current position on 0, 1 axis


	        /** 
	         * pulse, using an easein/easeout combo.
	         */

	    }, {
	        key: 'pulse',
	        value: function pulse(t, min, max, infn, outfn) {

	            if (t > max) {

	                this.outfn(t);
	            } else if (t < min) {

	                this.infn(t);
	            }
	        }

	        /* 
	         * ---------------------------------------
	         * ASSOCIATIVE ARRAY (OBJECT) OPTIONS
	         * ---------------------------------------
	         */

	    }, {
	        key: 'isObject',
	        value: function isObject(obj) {

	            return obj === Object(obj);
	        }

	        /** 
	         * Number of keys in an associative array or object.
	         * NOTE: won't work on old browsers, but we should never get here.
	         * @param {Object} obj a JS Object.
	         * @returns {Number} the number of keys.
	         */

	    }, {
	        key: 'numKeys',
	        value: function numKeys(obj) {

	            if (this.isObject(obj)) {

	                return Object.keys(obj).length;
	            }

	            return this.NOT_IN_LIST;
	        }

	        /** 
	         * Given an associative arry of Number values, sort by those values, 
	         * and returns the keys. Used to sort Obj file groups, obj, and material 
	         * starts by their start positions in the overall arrays.
	         * @param {Object} obj the associative array. Values MUST be numbers.
	         * @returns {Array} a set of keys, sorted in order.
	         */

	    }, {
	        key: 'getSortedKeys',
	        value: function getSortedKeys(obj) {

	            var keys = Object.keys(obj);

	            return keys.sort(function (a, b) {
	                return obj[b] - obj[a];
	            });
	        }

	        /*
	         * ---------------------------------------
	         * ARRAY OPERATIONS
	         * ---------------------------------------
	         */

	        /** 
	         * check if object is an Array, including a Typed Array 
	         * (not fastest, but maximally compatible)
	         * @param {Object} o the object to test.
	         * @returns {Boolean} if an Array, return true, else false.
	         */

	    }, {
	        key: 'isArray',
	        value: function isArray(o) {

	            var type = Object.prototype.toString.call(o);

	            return type.indexOf('Array') > this.NOT_IN_LIST ? true : false;
	        }

	        /** 
	         * check if two arrays contain exactly the same items.
	         * @param {Array} arr1 the first array.
	         * @param {Array} arr2 the second Array.
	         * @returns {Boolean} if same items, return true, else false.
	         */

	    }, {
	        key: 'containsAll',
	        value: function containsAll(arr1, arr2) {

	            return arr2.every(function (arr2Item) {
	                return arr1.includes(arr2Item);
	            });
	        }

	        /** 
	         * compare two arrays, return true if identical number of elements, 
	         * and all values are the same.
	         * @param {Array} arr1 the first array.
	         * @param {Array} arr2 the second array.
	         * @returns {Boolean} if arrays are value-identical, return true, else false.
	         */

	    }, {
	        key: 'compArr',
	        value: function compArr(arr1, arr2) {

	            return this.containsAll(arr1, arr2) && this.containsAll(arr2, arr1);
	        }

	        /** 
	         * Get a succession of values from a flat array, similar to Array.substring().
	         * @param {Array} arr a flat array.
	         * @param {Number} idx index into the array.
	         * @param {Number} stride number of elements to get. This is 
	         * also assumed to be the 'stride' through the array.
	         * @returns {Array} requested elements in an Array.
	         */

	    }, {
	        key: 'getArr',
	        value: function getArr(arr, idx, stride) {

	            if (!arr || idx < 0 || stride < 1) {

	                console.error('getArr() invalid params, arr:' + arr + ', index:' + idx + ' stride:' + stride);

	                return -1;
	            }

	            var o = [];

	            for (var i = 2; i < stride; i++) {

	                o.push(arr[idx * stride + i]);
	            }

	            return o;
	        }

	        /** 
	         * Get an object from a 2d array. Supply a variable list of 
	         * values. The number of values is assumed to be the 'walk' stride 
	         * for the array.
	         * @param {Array} arr a flat array.
	         * @param {Number} index the stride into 2d array.
	         * @param {...Number} additional arguments. The array 'stride' is 
	         * assumed equal to the number of additional parameters.
	         */

	    }, {
	        key: 'setArr',
	        value: function setArr(arr, index) {

	            var alen = arguments.length;

	            if (alen < 3) {

	                console.error('setArr() no value or index specified');

	                return -1;
	            }

	            var stride = alen - 2;

	            for (var i = 2; i < alen; i++) {

	                arr[idx * stride + i] - arguments[i];
	            }

	            return idx; // ending position 
	        }

	        /** 
	         * Copy an array. If array.slice is not present, use a direct copy.
	         */

	    }, {
	        key: 'copyArr',
	        value: function copyArr(arr) {

	            if (arr.slice) {

	                return arr.slice();
	            } else {

	                var newArr = new Array(arr.length);

	                for (var i = 0; i < arr.length; i++) {

	                    newArr[i] = arr[i];
	                }

	                return newArr;
	            }
	        }

	        /** 
	         * Check if an array is multi-dimensional, and needs flattening.
	         * @param {Array} arr a standard JS array
	         * @returns {Boolean} if multi-dimensional, return true, else false.
	         */

	    }, {
	        key: 'canFlatten',
	        value: function canFlatten(arr) {

	            if (typeof arr[0][0] !== "undefined" && arr[0].constructor === Array) {

	                return true;
	            }

	            return false;
	        }

	        /** 
	         * Given a multi-dimensional array, flatten to 
	         * a single-dimensional one. NOTE: only works for 
	         * Array(), not Float32Array!
	         */

	    }, {
	        key: 'flatten',
	        value: function flatten(arr, mutable) {

	            if (mutable !== true && mutable !== false) {

	                mutable = false;
	            }

	            var nodes = mutable && arr || arr.slice(); // return a new array.

	            var flattened = [];

	            for (var node = nodes.shift(); node !== undefined; node = nodes.shift()) {

	                if (Array.isArray(node)) {

	                    nodes.unshift.apply(nodes, node);
	                } else {

	                    flattened.push(node);
	                }
	            }

	            return flattened;
	        }

	        /** 
	         * Given a flat array, convert to multi-dimensional.
	         * @param {Array} original (flattened) array.
	         * @param {Number} stride the 'chunk' of the array being put into a sub-array.
	         * @returns{Array} a 2-dimensional array with each element in the second dimension of stride length.
	         */

	    }, {
	        key: 'unFlatten',
	        value: function unFlatten(arr, stride) {

	            var ct = 0,
	                ct2 = 0;

	            var nodes = []; // multi-dimensional

	            var sub = new Array(arr.length / stride);

	            for (var i = 0; i < arr.length; i += stride) {

	                var a = new Array(stride);

	                for (var j = 0; j < stride; j++) {

	                    a[j] = arr[ct2++];
	                }

	                nodes[ct++] = a;
	            }

	            return nodes;
	        }

	        /** 
	         * Concatenate typed and untyped arrays. if the first array is typed, 
	         * the second array is converted to the same type. The first array 
	         * receives the concatenation (no new Array is created).
	         * @param {Array|TypedArray} arr1 the first Array.
	         * @param {Array|TypedArray} arr2 the second Array.
	         * @returns {Array|TypedArray} the concatenated Array.
	         */

	    }, {
	        key: 'concatArr',
	        value: function concatArr(arr1, arr2) {

	            var result = null;

	            var len1 = arr1.length;

	            var len2 = arr2.length;

	            if (ArrayBuffer.isView(arr1)) {
	                // typed array


	                // Convert both sets of array values to the array type of the first array.

	                if (arr1 instanceof Float32Array) {

	                    result = new Float32Array(len1 + len2);

	                    if (!arr2 instanceof Float32Array) {

	                        arr2 = Float32Array.from(arr2);
	                    }
	                } else if (arr1 instanceof Uint32Array) {

	                    result = new Uint32Array(len1 + len2);

	                    if (!arr2 instanceof Uint32Array) {

	                        arr2 = Uint32Array.from(arr2);
	                    }
	                } else if (arr1 instanceof Uint16Array) {

	                    result = new Uint16Array(len1 + len2);

	                    if (!arr2 instanceof Uint16Array) {

	                        arr2 = Uint16Array.from(arr2);
	                    }
	                }

	                // Assign arr1 to output.

	                result.set(arr1);

	                // Append arr2 to arr1 in output.

	                result.set(arr2, len1);
	            } else {

	                if (ArrayBuffer.isView(arr2)) {
	                    // arr2 typed, copied to arr1, untyped

	                    for (var i = 0; i < len2; i++) {

	                        arr1.push(arr2[i]);
	                    }

	                    result = arr1;
	                } else {

	                    result = arr1.concat(arr2); // both arrays are untyped
	                }
	            }

	            return result;
	        }

	        /**
	         * Concat multiple arrays, adding only unique elements.
	         * @param {...Array} argument list of arrays
	         * @returns {Array} the unique composite of inputed Arrays.
	         */

	    }, {
	        key: 'concatUniqueArr',
	        value: function concatUniqueArr() {

	            var unique = [];

	            for (var _len = arguments.length, arrs = Array(_len), _key = 0; _key < _len; _key++) {
	                arrs[_key] = arguments[_key];
	            }

	            for (var i = 0; i < arrs.length; i++) {

	                var arr = arrs[i];

	                for (var j = 0; j < arr.length; j++) {

	                    if (!arr[j] in unique) {

	                        unique.push(arr[j]);
	                    }
	                }
	            }

	            return unique;
	        }
	    }, {
	        key: 'swap',


	        /**
	         * Fastest Array swap method for JS.
	         * @link https://jsperf.com/js-list-swap/2
	         * @param {Array} arr the array with elements to swap
	         * @param {Number|String} p1 the first position.
	         * @param {Number|String} p2 the second position.
	         */
	        value: function swap(arr, p1, p2) {

	            var t = arr[p1];

	            arr[p1] = x[p2];

	            arr[p1] = t;

	            return arr;
	        }

	        /** 
	         * Some objects NULL their arrays to remove elements, rather than deleting elements. This method
	         * provides housekeeping to remove those nulls.
	         * @param {Array} arr the Array to remove null values from.
	         */

	    }, {
	        key: 'clearFalsy',
	        value: function clearFalsy(arr) {
	            // clear null positions when Prims are removed from a rendering list

	            return arr.filter(function (elem) {
	                return elem;
	            });
	        }

	        /** 
	         * Sort a 2-dimensional array by value.
	         * @param {Array} arr the array to sort.
	         * @param {Number} colNum the position in the second-dimension (column) of the 2d array.
	         */

	    }, {
	        key: 'sort2DByColNum',
	        value: function sort2DByColNum(arr, colNum) {

	            arr.sort(function (a, b) {

	                return a[colNum] - b[colNum];
	            });
	        }

	        /* 
	         * ---------------------------------------
	         * RANDOM NUMBERS
	         * ---------------------------------------
	         */

	        /** 
	         * Random seed.
	         */

	    }, {
	        key: 'getSeed',
	        value: function getSeed() {

	            var number = void 0;

	            try {

	                // If the client supports the more secure crypto lib

	                if (Uint32Array && window.crypto && window.crypto.getRandomValues) {

	                    var numbers = new Uint32Array(1);

	                    window.crypto.getRandomValues(numbers);

	                    number = numbers.length ? numbers[0] + '' : null;
	                }
	            } catch (e) {} finally {

	                if (!number) {

	                    number = Math.floor(Math.random() * 1e9).toString() + new Date().getTime();
	                }
	            }

	            // process between min and max. Number could be 0-10^9

	            return number;
	        }

	        /* 
	         * ---------------------------------------
	         * Objects
	         * ---------------------------------------
	         */

	        /** 
	         * Remove a member from a JS object, ensuring that 
	         * values returned are consistent with deletion.
	         * @param {String} key the key identifying the object
	         */

	    }, {
	        key: 'removeObjMember',
	        value: function removeObjMember(obj, key) {

	            if (!obj.hasOwnProperty(key)) {

	                return;
	            }
	            if (isNaN(parseInt(key)) || !(this instanceof Array)) {

	                delete obj[key];
	            } else {

	                obj.splice(key, 1);
	            }
	        }

	        /*
	         * ---------------------------------------
	         * OS AND UI OPERATIONS
	         * ---------------------------------------
	         */

	        /** 
	         * Get the path only of a file name.
	         */

	    }, {
	        key: 'getFilePath',
	        value: function getFilePath(fname) {

	            if (fname) {

	                return fname.substring(0, fname.lastIndexOf('/')) + '/';
	            }

	            return null;
	        }

	        /** 
	         * Get the file name, no path.
	         */

	    }, {
	        key: 'getFileName',
	        value: function getFileName(fname) {

	            if (fname) {

	                return fname.replace(/^(.*[/\\])?/, '');
	            }

	            return null;
	        }

	        /** 
	         * Get the file name, without path or extension.
	         */

	    }, {
	        key: 'getBaseName',
	        value: function getBaseName(fname) {

	            if (fname) {

	                return this.getFileName(fname).replace(/(\.[^.]*)$/, '');
	            }

	            return null;
	        }

	        // Get the file extension of a file.

	    }, {
	        key: 'getFileExtension',
	        value: function getFileExtension(fname) {

	            if (fname) {

	                return fname.slice((fname.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
	            }

	            return null;
	        }

	        // See if we're running in an iframe.

	    }, {
	        key: 'isIFrame',
	        value: function isIFrame() {

	            try {

	                return window.self !== window.top;
	            } catch (e) {

	                return true;
	            }

	            return false;
	        }

	        /** 
	         * Handle mouse events, in case we aren't in VR. This function
	         * adds mouse coordinates to the <canvas> element we are using to draw.
	         */

	    }, {
	        key: 'getMousePosition',
	        value: function getMousePosition(canvas, e) {

	            var r = canvas.getBoundingClientRect();

	            return {

	                x: e.clientX - r.left,

	                y: e.clientY - r.top

	            };
	        }

	        /*
	         * ---------------------------------------
	         * GEOLOCATION
	         * ---------------------------------------
	         */

	        /** 
	         * Get the geolocation of the user.
	         * @param {Number} dLat the default latitude, if no geolocated coords are returned.
	         * @param {Number} dLong the default longitude, if no geolocated coords are returned.
	         */

	    }, {
	        key: 'getGeolocation',
	        value: function getGeolocation() {
	            var dLat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	            var dLong = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


	            var emitter = this.emitter;

	            navigator.geolocation.getCurrentPosition(function (pos) {

	                emitter.emit(emitter.events.WORLD_GEOLOCATION_READY, pos.coords);
	            }, function (err) {

	                // TODO: many need to remove in production.

	                console.error('Util::getGeolocation():Geolocation data not available, error:' + err);

	                // Create a default geolocator, at the equator, no movement.

	                emitter.emit(emitter.events.WORLD_GEOLOCATION_READY, {

	                    latitude: dLat,

	                    longitude: dLong,

	                    altitude: 0,

	                    accuracy: 1,

	                    altitudeAccuracy: 1,

	                    heading: 0,

	                    speed: 0

	                });
	            }, {

	                enableHighAccuracy: true,

	                timeout: 5000,

	                maximumAge: 0

	            });
	        }

	        /*
	         * ---------------------------------------
	         * API get and put
	         * ---------------------------------------
	         */

	        /*
	         * ---------------------------------------
	         * BROWSER AND DEVICE FEATURES
	         * ---------------------------------------
	         */

	        /** 
	         * Compatible mobiles (as of 2017)
	         */

	    }, {
	        key: 'isCompatMobile',
	        value: function isCompatMobile() {

	            return this.hasTouch() && this.hasDeviceOriention()(this.isIOS() || this.isGearVR() || this.isGooglePixel());
	        }

	        /** 
	         * Detect if we support touch. If so, don't show hover tooltips.
	         */

	    }, {
	        key: 'hasTouch',
	        value: function hasTouch() {

	            return !!('ontouchstart' in window || navigator.msMaxTouchPoints);
	        }
	    }, {
	        key: 'hasDeviceOrientation',
	        value: function hasDeviceOrientation() {

	            return !!window.DeviceOrientationEvent;
	        }

	        /** 
	         * Check to see if we are on a mobile, or desktop.
	         */

	    }, {
	        key: 'isStandalone',
	        value: function isStandalone() {

	            return !!window.matchMedia('(display-mode: standalone)').matches;
	        }

	        /** 
	         * Check if device is in landscape orientation.
	         */

	    }, {
	        key: 'isLandscape',
	        value: function isLandscape() {

	            return window.orientation === 90 || window.orientation === -90;
	        }

	        /** 
	         * Check to see if we're running under iOS
	         * @returns {false|Number} if not iOS, return false, else return the iOS version number.
	         */

	    }, {
	        key: 'isIOS',
	        value: function isIOS() {

	            //return ( /iPad|iPhone|iPod/.test( navigator.platform ) );

	            var result = navigator.userAgent.match(/(iPad|iPhone|iphone|iPod).*?(OS |os |OS\_)(\d+((_|\.)\d)?((_|\.)\d)?)/);

	            if (result === null) result = false;

	            return result; // return iOS number
	        }

	        /** 
	         * Test for Google Pixel chrome platform on Pixel phones, which means that 
	         * Google Daydream will be active. 
	         * @link https://github.com/faisalman/ua-parser-js/blob/master/src/ua-parser.js
	         */

	    }, {
	        key: 'isGooglePixel',
	        value: function isGooglePixel() {

	            return (/android.+;\s(pixel xl|pixel)\s/i.test(navigator.userAgent)
	            );
	        }

	        /** 
	         * Test for Samsung Internet browser / GearVR. Note that you can install on 
	         * a Pixel, but incompatible with Google Daydream.
	         * Chrome remote debugging for Samsung Internet for GearVR. 
	         * Connect adb through wifi (GearVR USB won't work, it's charging only), 
	         * open chrome://inspect in the desktop chrome and when the headset is active, 
	         * the page should be visible on the list. All active webkit instances are on that list, not only Chrome. 
	         * For this to work, you have to have the headset's screen active
	         * use some paper sticky tape to cover the sensor that is between the lenses.
	         * Setting up ADB over wifi
	         * @link https://developer.android.com/studio/command-line/adb.html
	         */

	    }, {
	        key: 'isGearVR',
	        value: function isGearVR() {

	            return (/SamsungBrowser.+Mobile VR/i.test(navigator.userAgent)
	            );
	        }

	        /** 
	         * Get the width of the entire screen (excluding OS taskbars)
	         * @link http://ryanve.com/lab/dimensions/
	         */

	    }, {
	        key: 'getScreenWidth',
	        value: function getScreenWidth() {

	            return window.screen.width;
	        }

	        /** 
	         * Get the height of the entire screen (excluding OS taskbars)
	         */

	    }, {
	        key: 'getScreenHeight',
	        value: function getScreenHeight() {

	            return window.screen.height;
	        }

	        /** 
	         * get the width of the content region of the browser window.
	         */

	    }, {
	        key: 'getWindowWidth',
	        value: function getWindowWidth() {

	            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	        }

	        /** 
	         * get the height of the content region of the browser window.
	         */

	    }, {
	        key: 'getWindowHeight',
	        value: function getWindowHeight() {

	            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	        }
	    }]);

	    return Util;
	}();

	exports.default = Util;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Emitter = function () {

	    /** 
	     * Callback organizer. Used to update Ui for webvr, webgl, and other events 
	     * taking some time, avoiding the CustomEvent interface. The main advantage is that 
	     * an object (like Ui) can use it to bind one of its callbacks to an 'emit' in another 
	     * object that doesn't have a reference to it. Creates a de facto extension of processed 
	     * events for the app.
	     * Usage similar to webvr-boilerplate:
	     * @link https://github.com/borismus/webvr-boilerplate/blob/master/build/webvr-manager.js
	     */
	    function Emitter() {
	        _classCallCheck(this, Emitter);

	        this.callbacks = {};

	        // Define supported emitter events.

	        this.events = {

	            WORLD_DEFINITION_READY: 'wrddefrdy', // World definition file is ready

	            WORLD_GEOLOCATION_READY: 'wrdgeordy', // World was geo-located in the real world

	            PROCEDURAL_GEOMETRY_READY: 'plgrdy', // Procedural geometry is ready

	            OBJ_GEOMETRY_READY: 'ogrdy', // Use for .OBJ and .MTL file formats

	            HYG_GEOMETRY_READY: 'hygrdy', // Use for HYG stellar database

	            GLTF_GEOMETRY_READY: 'gltfrdy', // Use for GlTF file formats

	            MATERIAL_READY: 'mrdy', // sends Prim reference. Not used for procedural geometry

	            TEXTURE_2D_READY: 'trdy', // sends Prim reference, key in Prim texture Array

	            TEXTURE_3D_READY: 't3drdy', // 3d texture is ready

	            TEXTURE_CUBEMAP_MEMBER_READY: 'trcmpmbrdy', // one file in a cubemap is ready

	            TEXTURE_CUBEMAP_READY: 'tcmprdy', // all files for cubemap loaded

	            PRIM_ADDED_TO_SHADER: 'prash', // Prim added to Shader

	            PRIM_REMOVED_FROM_SHADER: 'prmsh', // a Prim was removed by a Shader

	            PRIM_FAIL: 'prmfl', // a Prim couldn't load its assets

	            VR_DISPLAY_READY: 'vrdispready', // the VR device is ready (either a VRDevice or a window object)

	            VR_DISPLAY_CHANGE: 'virdispchange', // the display we're using was changed

	            VR_DISPLAY_FAIL: 'vrdispfail' // WebVR is present, but blew up

	        };
	    }

	    _createClass(Emitter, [{
	        key: 'emit',
	        value: function emit(eventName) {

	            var callbacks = this.callbacks[eventName];

	            if (!callbacks) {

	                return;
	            }

	            // Convert arguments to a useful Array.

	            var args = [].slice.call(arguments);

	            // Eliminate the first param in the argument list (eventName).

	            args.shift();

	            for (var i = 0; i < callbacks.length; i++) {

	                callbacks[i].apply(this, args);
	            }
	        }

	        /** 
	         * Bind a callback to an event (without using CustomEvents)
	         * @param {String} eventName an event name.
	         * @param {Function} callback function to execute when we 'emit'.
	         */

	    }, {
	        key: 'on',
	        value: function on(eventName, callback) {

	            if (eventName in this.callbacks) {

	                this.callbacks[eventName].push(callback);
	            } else {

	                this.callbacks[eventName] = [callback];
	            }
	        }
	    }]);

	    return Emitter;
	}();

	exports.default = Emitter;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GamePad = function () {
	    function GamePad(init, util, glMatrix, webgl) {
	        _classCallCheck(this, GamePad);

	        console.log('in gamepad constructor');

	        this.util = util;

	        // Statistics object.

	        this.stats = {};

	        // Immediately initialize (for now).

	        if (init === true) {

	            this.init();
	        }
	    }

	    /** 
	     * Set the World object (which has .requestAnimationFrame). used by World 
	     * to apply itself to this object.
	     * @param {World} world the current world, including world.render() loop.
	     */


	    _createClass(GamePad, [{
	        key: 'setWorld',
	        value: function setWorld(world) {

	            this.world = world;
	        }

	        /** 
	         * Initialize Gamepad object.
	         */

	    }, {
	        key: 'init',
	        value: function init() {
	            var _this = this;

	            this.getGamepads(); // non-Promise based

	            // Listen for the connection

	            window.addEventListener('gamepadconnected', function (evt) {

	                // TODO: need to tedect TWO controllers here!

	                _this.gpad = navigator.getGamepads()[evt.gamepad.index];

	                // TODO: activate gamepad icon

	                console.log('found gamepad: ' + _this.gpad.id);

	                _this.getGamepads;
	            });

	            // Disconnected

	            window.addEventListener('gamepaddisconnected', function (evt) {

	                // TODO: deactivate gamepad icon

	                console.log('gamepad disconnected');
	            });
	        }

	        /**
	         * Get the current gamepad by the ID of the WebVR headset. The 
	         * WebVR headset and gamepads share an Id, useful for tying them together.
	         * @param {Number} id the HMD id from WebVR.
	         * @returns {}
	         */

	    }, {
	        key: 'getGamepadByHMDId',
	        value: function getGamepadByHMDId(id) {

	            if (!this.gamepads.length) {

	                this.getGamepads();
	            }

	            for (var i = 0; i < this.gamepads.length; i++) {

	                var _gp = this.gamepads[i];

	                if (_gp && _gp.displayId === id) {

	                    return _gp;
	                }
	            }
	        }

	        /** 
	         * Get gamepads, and process accordingly.
	         */

	    }, {
	        key: 'getGamepads',
	        value: function getGamepads() {

	            // Save the reported array of gamepads.

	            var gamepads = navigator.getGamepads();

	            this.gamepads = [];

	            console.log('GamePad::():getGamePads():' + gamepads.length + ' controllers');

	            this.stats.numGamepads = gamepads.length;

	            for (var i = 0; i < gamepads.length; i++) {

	                var _gp2 = gamepads[i];

	                if (_gp2) {
	                    // can be undefined or null

	                    this.gamepads[i] = _gp2;
	                }
	            }
	        }

	        /** 
	         * Check if we have Gamepad support
	         */

	    }, {
	        key: 'hasGamepads',
	        value: function hasGamepads() {

	            return !!('getGamepads' in navigator);
	        }

	        /**
	         * Report a Gamepad's features to the Ui for display.
	         * @param {Number|Object} either the Gamepad object from the array, 
	         * or the index of the object in the Gamepad array.
	         * @returns {Object|null} a list of gamepad device features, or null.
	         */

	    }, {
	        key: 'reportGamePad',
	        value: function reportGamePad() {
	            var gamepad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


	            if (this.util.isNumber(gamePad)) {

	                gamepad = this.gamepads[gamepad] || null;
	            }

	            // Return a key-value array for readout

	            if (gamepad) {

	                return {

	                    id: gp.displayIndex,

	                    gamepad: gp.index,

	                    hand: gp.hand,

	                    actuators: gp.hapticActuators.length,

	                    pose: !!(gp.pose && gp.pose.hasPosition),

	                    orientation: !!(gp.pose && gp.pose.hasOrientation)

	                };
	            }

	            return null;
	        }
	    }]);

	    return GamePad;
	}();

	exports.default = GamePad;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WebGL = function () {

	    /**
	     * References:
	     * LiteGL
	     * @link https://github.com/jagenjo/litegl.js/tree/master/src
	     * GL Tutorial: http://webglfundamentals.org
	     * HTML5 Games code: http://www.wiley.com/WileyCDA/WileyTitle/productCd-1119975085.html
	     * Best Practices
	     * @link https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
	     * WebGL tests:
	     * @link https://www.browserleaks.com/webgl
	     * WebGL cross-browser:
	     * @link http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl/
	     * Great WebGL Examples:
	     * http://alteredqualia.com/
	     * Toji: https://github.com/toji/webvr-samples
	     * https://github.com/toji/webvr.info/blob/master/samples/05-room-scale.html
	     * TWGL: @link http://twgljs.org/
	     * perspective Matrix
	     * @link http://www.rozengain.com/blog/2010/02/22/beginning-webgl-step-by-step-tutorial/ 
	     * 
	     * Google demos for kronos (including webworkers and particle systems)
	     * https://www.khronos.org/registry/webgl/sdk/demos/google/
	     * 
	     * @constructor
	     * @param {Object} config a configuration object, set in app.js.
	     */

	    function WebGL(init, glMatrix, util, debug) {
	        _classCallCheck(this, WebGL);

	        console.log('in webGL class');

	        this.gl = null;

	        this.contextCount = 0;

	        this.version = 0;

	        this.glMatrix = glMatrix;

	        this.util = util;

	        this.NOT_IN_LIST = util.NOT_IN_LIST; // -1 value for .indexOf()

	        // Default shader name for vertices (must always use in vertex and fragment shader).

	        /*
	         * All the Shaders MUST use the following names for common shader attributes. They are 
	         * hard-coded to improve positioning.
	         */

	        this.attributeNames = {

	            aVertexPosition: ['aVertexPosition', 0],

	            aVertexColor: ['aVertexColor', 1],

	            aTextureCoord: ['aTextureCoord', 2],

	            aTextureCoord1: ['aTextureCoord1', 3],

	            aTextureCoord2: ['aTextureCoord2', 4],

	            aTextureCoord3: ['aTextureCoord3', 5],

	            aTextureCoord4: ['aTextureCoord4', 6],

	            aTextureCoord5: ['aTextureCoord5', 7],

	            aVertexNormal: ['aVertexNormal', 8],

	            aVertexTangent: ['aVertexTangent', 9]

	            // Perspective matrix in Shaders.

	        };this.near = 0.1;

	        this.far = 100;

	        // Statistics object.

	        this.stats = {};

	        if (init === true) {

	            this.init(document.getElementById('webvr-mini-canvas')); // Normally not called this way
	        }

	        // If we are running in debug mode, save the debug utils into this object.

	        if (debug) {

	            this.debug = debug;
	        }
	    }

	    /**
	     * initialize with a canvas context
	     * @param {HTMLCanvasElement|String|undefined} canvas a HTML5 <canvas>, id for canvas, or undefined, 
	     * in which case a <canvas> object is 
	     * created and added to document.body, an ID value for a tag, or a CanvasDOMobject.
	     * @param {Function} lostContext callback when WebGL context is lost.
	     * @param {Function} restoredContext callback when WebGL context is restored.
	     * @returns {WebGLContext} the WebGL context of the <canvas> object.
	     */


	    _createClass(WebGL, [{
	        key: 'init',
	        value: function init(canvas, lostContext, restoredContext) {
	            var _this = this;

	            if (!canvas) {

	                /* 
	                 * Create the minimal player wraparound.
	                 * <div class="webvr-mini-player">
	                 *     <nav class="webvr-mini-controls"></nav>
	                 *     <canvas id="webvr-mini-canvas" ></canvas>
	                 * </div>
	                 */

	                canvas = document.createElement('canvas');

	                canvas.width = 480;

	                canvas.height = 320;

	                var player = document.createElement('div');

	                player.className = 'webvr-mini-player';

	                var controls = document.createElement('div');

	                controls.className = 'webvr-mini-controls';

	                player.appendChild(controls);

	                player.appendChild(canvas);

	                // This seems to fix a bug in IE 11. TODO: remove extra empty <canvas>.

	                document.body.appendChild(player);
	            } else if (this.util.isString(canvas)) {

	                canvas = document.getElementById(canvas);
	            } else {

	                canvas = canvas;
	            }

	            if (canvas) {

	                // This line will make the <canvas> element work for focus events.

	                // canvas.addAttribute( 'tabindex', '1' );

	                // NOTE: IE10 needs canvas bound to DOM for the following command to work.

	                var r = canvas.getBoundingClientRect();

	                canvas.width = r.width;

	                canvas.height = r.height;

	                // Save current window width and height (used in window resize).

	                this.oldWidth = this.util.getWindowWidth();

	                this.oldHeight = this.util.getWindowHeight();

	                // Create the WebGL context for the <canvas>, trying to get the most recent version.

	                this.gl = this.createContext(canvas);

	                if (this.gl) {

	                    var gl = this.gl;

	                    // Default WebGL initializtion and stats, can be over-ridden in your world file.

	                    if (gl.getParameter && gl.getShaderPrecisionFormat) {

	                        var stats = this.stats;

	                        // Check if high precision supported in fragment shader.

	                        stats.highp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision;

	                        // Max texture size, for gl.texImage2D.                

	                        stats.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

	                        // Max cubemap size, for gl.texImage2D.

	                        stats.maxCubeSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

	                        // Max texture size, for gl.renderbufferStorage and canvas width/height.

	                        stats.maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);

	                        // Max texture units.

	                        stats.combinedUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);

	                        // Max vertex buffers.

	                        stats.maxVSattribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);

	                        // Max 4-byte uniforms.

	                        stats.maxVertexShader = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);

	                        // Max 4-byte uniforms.

	                        stats.maxFragmentShader = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
	                    } else {

	                        this.stats = false;
	                    }

	                    /* 
	                     * Set up listeners for context lost and regained.
	                     * @link https://www.khronos.org/webgl/wiki/HandlingContextLost
	                     * Simulate lost and restored context events with:
	                     * @link https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context/restoreContext
	                     * @link http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl/
	                     * gl.isContextLost() also works to check
	                     */

	                    canvas.addEventListener('webglcontextlost', function (e) {

	                        console.error('error: webglcontextlost event, context count:' + _this.contextCount);

	                        if (lostContext) {

	                            _this.gl = null;

	                            lostContext(e);
	                        }

	                        e.preventDefault();
	                    }, false);

	                    canvas.addEventListener('webglcontextrestored', function (e) {

	                        console.error('error: webglcontextrestored event, context count:' + _this.contextCount);

	                        if (restoredContext) {

	                            restoredContext(e);
	                        }

	                        e.preventDefault();
	                    }, false);

	                    // Do an initial set of our viewport width and height.

	                    gl.viewportWidth = canvas.width;

	                    gl.viewportHeight = canvas.height;

	                    // listen for <canvas> resize event.

	                    window.addEventListener('resize', function (e) {

	                        _this.resizeCanvas();

	                        e.preventDefault();
	                    }, false);

	                    // If we're reloading, clear all current textures in the texture buffers.

	                    this.clearTextures();

	                    // Set our default rendering values.

	                    this.glDefaults();

	                    // Clear the screen to the clearColor by default.

	                    this.clear();

	                    return this.gl;
	                } else {

	                    // We check prior to loading this module, so we shouldn't go here if not supported.

	                    console.error('no WebGL context');
	                } // end of have a gl context

	            } else {

	                console.error(' no WebGL canvas');
	            } // end of if have a <canvas>

	            return null;
	        }

	        /**
	         * (re)set the defaults we draw with.
	         */

	    }, {
	        key: 'glDefaults',
	        value: function glDefaults() {

	            var gl = this.getContext();

	            if (gl) {

	                // Default 3D enables.

	                gl.enable(gl.DEPTH_TEST);

	                gl.enable(gl.CULL_FACE);

	                gl.clearDepth(1.0); // Clear everything

	                gl.depthFunc(gl.LEQUAL); // Near things obscure far things

	                gl.enable(gl.BLEND); // Allow blending

	                // Fog NOT in Webgl use shader
	                //http://www.geeks3d.com/20100228/fog-in-glsl-webgl/
	                // http://in2gpu.com/2014/07/22/create-fog-shader/

	                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	                /* 
	                 * IMPORTANT: tells WebGL to premultiply alphas for <canvas>
	                 * @link http://stackoverflow.com/questions/39251254/avoid-cpu-side-conversion-with-teximage2d-in-firefox
	                 */
	                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

	                gl.clearColor(0.0, 0.0, 0.0, 1.0);
	            }
	        }

	        /** 
	         * Flag for supporting WebGL.
	         * @returns {Boolean} if WebGL context is present, return true, else false.s
	         */

	    }, {
	        key: 'hasWebGL',
	        value: function hasWebGL() {

	            return !!this.getContext();
	        }

	        /* 
	         * ---------------------------------------
	         * WEBGL EXTENSIONS
	         * ---------------------------------------
	         */

	        /** 
	         * Support indexed vertex drawing when there are more than 
	         * 64k vertices in WebGL 1.0. Enabled by default in WebGL 2.0. No constant, so 
	         * this should only be called in 1.0 context.
	         * @param {WebGLRenderingContext} gl a WebGL rendering context (should be 1.x only).
	         */

	    }, {
	        key: 'index32Support',
	        value: function index32Support(gl) {

	            return !!gl.getExtension('OES_element_index_uint');
	        }

	        /** 
	         * Add support for Shaders to use derivatives.
	         * Have to add the following to the Shaders
	         * #extension GL_EXT_shader_texture_lod : enable
	         * #extension GL_OES_standard_derivatives : enable
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
	         * @param {WebGLRenderingContext} gl a WebGL rendering context (should be 1.x only).
	         */

	    }, {
	        key: 'derivativeSupport',
	        value: function derivativeSupport(gl) {

	            var s = !!gl.FRAGMENT_SHADER_DERIVATIVE_HINT; // Should be present in WebGL 2.0

	            if (!s) {

	                var ext = gl.getExtension('GL_OES_standard_derivatives');

	                if (ext) {

	                    s = true;

	                    gl.FRAGMENT_SHADER_DERIVATIVE_HINT = ext.FRAGMENT_SHADER_DERIVATIVE_HINT_OES;
	                }

	                if (gl.FRAGMENT_SHADER_DERIVATIVE_HINT) {

	                    this.stats.lodSupport = !!gl.getExtension('EXT_shader_texture_lod');
	                }
	            }

	            return s;
	        }

	        /** 
	         * Add vertex buffer support to WebGL 1.0.
	         * @param {WebGLRenderingContext} gl a WebGL rendering context (should be 1.x only).
	         */

	    }, {
	        key: 'vertexArraySupport',
	        value: function vertexArraySupport(gl) {

	            var s = !!gl.VERTEX_ARRAY_BINDING; // Should be present in WebGL 2.0

	            if (!s) {

	                var ext = gl.getExtension('OES_vertex_array_object');

	                if (ext) {

	                    s = true;

	                    gl.VERTEX_ARRAY_BINDING = ext.VERTEX_ARRAY_BINDING_OES;

	                    gl.createVertexArray = function () {
	                        return ext.createVertexArrayOES();
	                    };

	                    gl.deleteVertexArray = function (v) {
	                        ext.deleteVertexArrayOES(v);
	                    };

	                    gl.isVertexArray = function (v) {
	                        return ext.isVertexArrayOES(v);
	                    };

	                    gl.bindVertexArray = function (v) {
	                        ext.bindVertexArrayOES(v);
	                    };
	                }
	            }

	            return s;
	        }

	        /** 
	         * Add support for depth textures, allows WebGLRenderingContext.texImage2D() format and internalformat parameters 
	         * to accept accept gl.DEPTH_COMPONENT and gl.DEPTH_STENCIL. The type parameter now accepts gl.UNSIGNED_SHORT, 
	         * gl.UNSIGNED_INT, and ext.UNSIGNED_INT_24_8_WEBGL. The pixels parameter now accepts an ArrayBufferView of type Uint16Array and Uint32Array.
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_depth_texture
	         * @param {WebGLRenderingContext} gl a WebGL rendering context (should be 1.x only).
	         */

	    }, {
	        key: 'depthTextureSupport',
	        value: function depthTextureSupport(gl) {

	            var s = !!(gl.DEPTH_COMPONENT && gl.DEPTH_STENCIL);

	            if (!s) {

	                var ext = gl.getExtension('WEBGL_depth_texture') || gl.getExtension('MOZ_WEBGL_depth_texture') || gl.getExtension('WEBKIT_WEBGL_depth_texture');

	                if (ext) {

	                    s = true;

	                    gl.DEPTH_COMPONENT = ext.DEPTH_COMPONENT;

	                    gl.DEPTH_STENCIL = ext.DEPTH_STENCIL;
	                }
	            }

	            return s;
	        }

	        /** 
	         * Add support for anisotrophic texture filtering, improving mipmap quality. Used by 
	         * both WebGL 1.0 and WebGL 2.0 contexts.
	         * gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, 4);
	         * @link http://blog.tojicode.com/2012/03/anisotropic-filtering-in-webgl.html
	         * @param {WebGLRenderingContext} gl a WebGL rendering context (should be 1.x only).
	         */

	    }, {
	        key: 'anisotropicSupport',
	        value: function anisotropicSupport(gl) {

	            var s = !!gl.TEXTURE_MAX_ANISOTROPY_EXT;

	            if (!s) {

	                var ext = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');

	                if (ext) {

	                    s = true;

	                    gl.TEXTURE_MAX_ANISOTROPY_EXT = ext.TEXTURE_MAX_ANISOTROPY_EXT;
	                }
	            }

	            return s;
	        }

	        /** 
	         * Add support for S3 compressed textures.
	         * @link http://blog.tojicode.com/2011/12/compressed-textures-in-webgl.html
	         * @link https://en.wikipedia.org/wiki/S3_Texture_Compression
	         * @param {WebGLRenderingContext} gl a WebGL rendering context (should be 1.x only).
	         */

	    }, {
	        key: 'S3TCTextureSupport',
	        value: function S3TCTextureSupport(gl) {

	            var s = !!gl.COMPRESSED_RGB_S3TC_DXT1_EXT;

	            if (!s) {

	                var ext = gl.getExtension('WEBGL_compressed_texture_s3tc') || gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');

	                if (ext) {

	                    s = true, gl.COMPRESSED_RGB_S3TC_DXT1_EXT = ext.COMPRESSED_RGB_S3TC_DXT1_EXT, gl.COMPRESSED_RGBA_S3TC_DXT1_EXT = ext.COMPRESSED_RGBA_S3TC_DXT1_EXT, gl.COMPRESSED_RGBA_S3TC_DXT3_EXT = ext.COMPRESSED_RGBA_S3TC_DXT3_EXT, gl.COMPRESSED_RGBA_S3TC_DXT5_EXT = ext.COMPRESSED_RGBA_S3TC_DXT5_EXT;
	                }
	            }

	            return s;
	        }

	        /** 
	         * Add support for PVR compressed textures. 
	         * Available in both WebGL 1.0 and WebGL 2.0 contexts.
	         * Used on mobile devices, e.g.iPhone, iPod Touch and iPad and supported on certain Android devices 
	         * using a PowerVR GPU.
	         * @link http://blog.tojicode.com/2011/12/compressed-textures-in-webgl.html
	         * @param {WebGLRenderingContext} gl a WebGL rendering context (should be 1.x only).
	         */

	    }, {
	        key: 'PVRTCTextureSupport',
	        value: function PVRTCTextureSupport(gl) {

	            var s = !!gl.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;

	            if (!s) {

	                var ext = gl.getExtension('WEBGL_compressed_texture_pvrtc ') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');

	                if (ext) {

	                    s = true, gl.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG, gl.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG, gl.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG, gl.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
	                }
	            }

	            return s;
	        }

	        /** 
	         * Add support for Ericsson ETC1 compressed textures, RGB only, 6x compression of 24-bit data.
	         * Can be used with gl.compressedTexImage2D() 
	         * @link http://blog.tojicode.com/2011/12/compressed-textures-in-webgl.html
	         * @link https://en.wikipedia.org/wiki/Ericsson_Texture_Compression
	         * @param {WebGLRenderingContext} gl a WebGL rendering context (should be 1.x only).
	         */

	    }, {
	        key: 'ETC1TextureSupport',
	        value: function ETC1TextureSupport(gl) {

	            var s = !!(gl.COMPRESSED_RGB_ETC1_WEBGL || gl.COMPRESSED_RGB_ETC1);

	            if (!s) {

	                var ext = gl.getExtension('WEBGL_compressed_texture_etc1');

	                if (ext) {

	                    s = true;

	                    gl.COMPRESSED_RGB_ETC1_WEBGL = ext.COMPRESSED_RGB_ETC1_WEBGL;
	                }
	            }

	            return s;
	        }

	        /*
	         * ---------------------------------------
	         * OTHER WEBGL TESTS
	         * ---------------------------------------
	         */

	        /** 
	         * Wrapper for WebGL error reporting.
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getError
	         */

	    }, {
	        key: 'getError',
	        value: function getError() {

	            var fnName = 'webgl.glError():',
	                gl = this.getContext();

	            switch (gl.getError()) {

	                case gl.NO_ERROR:
	                    // No error has been recorded. The value of this constant is 0.

	                    return fnName + 'gl.NO_ERROR';

	                case gl.INVALID_ENUM:
	                    // An unacceptable value has been specified for an enumerated argument. The command is ignored and the error flag is set.

	                    return fnName + 'gl.INVALID_ENUM';

	                case gl.INVALID_VALUE:
	                    // A numeric argument is out of range. The command is ignored and the error flag is set.

	                    return fnName + 'gl.INVALID_VALUE';

	                case gl.INVALID_OPERATION:
	                    // The specified command is not allowed for the current state. The command is ignored and the error flag is set.

	                    return fnName + 'gl.INVALID_OPERATION';

	                case gl.INVALID_FRAMEBUFFER_OPERATION:
	                    // The currently bound framebuffer is not framebuffer complete when trying to render to or to read from it.

	                    return fnName + 'gl.INVALID_FRAMEBUFFER_OPERATION';

	                case gl.OUT_OF_MEMORY:
	                    //Not enough memory is left to execute the command.

	                    return fnName + 'gl.OUT_OF_MEMORY';

	                case gl.CONTEXT_LOST_WEBGL:

	                    return fnName + 'gl.CONTEXT_LOST_WEBGL';

	            }
	        }

	        /** 
	         * Check to see if the framebuffer is valid, must bind a frameBuffer 
	         * first, using gl.createFramebuffer() with valid offscreen texture.
	         * @param {WebGLRenderingContext} gl the WebGL rendering context.
	         * @param {WebGLFrameBuffer} the bound frameBuffer.
	         * @returns {String} error message.
	         */

	    }, {
	        key: 'checkFramebuffer',
	        value: function checkFramebuffer(gl, framebuffer) {

	            // assumes the framebuffer is bound

	            var valid = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

	            switch (valid) {

	                case gl.FRAMEBUFFER_UNSUPPORTED:

	                    return 'Framebuffer is unsupported';

	                case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:

	                    return 'Framebuffer incomplete attachment';

	                case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:

	                    return 'Framebuffer incomplete dimensions';

	                case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:

	                    return 'Framebuffer incomplete missing attachment';

	                default:

	                    return true;

	            }
	        }

	        /*
	         * ---------------------------------------
	         * WEBGL STATE TOGGLES
	         * ---------------------------------------
	         */

	    }, {
	        key: 'enableBlending',
	        value: function enableBlending(source, dest, eq) {

	            var gl = this.getContext();

	            if (eq) {

	                gl.blendEquation(gl[eq]);
	            }

	            if (source && dest) {

	                gl.blendFunc(gl[source], gl[dest]);
	            }

	            gl.enable(gl.BLEND);

	            gl.depthMask(false);
	        }
	    }, {
	        key: 'disableBlending',
	        value: function disableBlending() {

	            var gl = this.getContext();

	            gl.disable(gl.BLEND);

	            gl.depthMask(true);
	        }

	        /* 
	         * ---------------------------------------
	         * CANVAS OPERATIONS
	         * ---------------------------------------
	         */

	        /** 
	         * Get WebGL canvas only if we've created a gl context.
	         * @returns {HTMLCanvasElement} canvas the rendering <canvas>.
	         */

	    }, {
	        key: 'getCanvas',
	        value: function getCanvas() {

	            return this.gl ? this.gl.canvas : null;
	        }

	        /** 
	         * Resize the canvas if the window changes size. 
	         * @param {Boolean} force force a resize, even if window size has not changed. Use 
	         * when exiting VR.
	         */

	    }, {
	        key: 'resizeCanvas',
	        value: function resizeCanvas(force) {

	            if (this.ready()) {

	                console.log('resize');

	                var wWidth = this.util.getWindowWidth();

	                var wHeight = this.util.getWindowHeight();

	                if (force || wWidth !== this.oldWidth) {

	                    var f = Math.max(window.devicePixelRatio, 1);

	                    var gl = this.getContext();

	                    var c = this.getCanvas();

	                    // Get the current size of the <canvas>

	                    var width = c.clientWidth * f | 0;

	                    var height = c.clientHeight * f | 0;

	                    // Set the <canvas> width and height property.

	                    c.width = width;

	                    c.height = height;

	                    // Set the WebGL viewport.

	                    gl.viewportWidth = width;

	                    gl.viewportHeight = height;

	                    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	                }

	                // Save the values.

	                this.oldWidth = wWidth;

	                this.oldHeight = wHeight;
	            }

	            return false;
	        }

	        /*
	         * ---------------------------------------
	         * WEBGL CONTEXT OPERATIONS
	         * ---------------------------------------
	         */

	        /** 
	         * get HTML5 canvas, and a WebGL context. We also scan for multiple 
	         * contexts being created ( > 1 ) and delete if one is already present.
	         * @param {Canvas} canvas the HTML5 <canvas> DOM element.
	         * TODO: PROBLEM IF THERE ARE MULTIPLE CONTEXES ON THE PAGE???????
	         * @param {HTMLCanvasElement} canvas the rendering <canvas>.
	         * @returns {WebGLRenderingContext} gl a WebGLRenderingContext.
	         */

	    }, {
	        key: 'createContext',
	        value: function createContext(canvas) {

	            if (!window.WebGLRenderingContext) {

	                console.error('this browser does not support webgl');

	                return null;
	            }

	            var gl = null;

	            if (gl && this.contextCount > 0) {

	                // Contexts are normally in garbage, can't be deleted without this!

	                console.warn('killing context');

	                this.killContext();

	                this.contextCount--;

	                this.gl = null; // just in case
	            }

	            var n = ['webgl2', 'experimental-webgl2', 'webgl', 'experimental-webgl'];

	            var i = 0;

	            while (i < n.length) {

	                try {

	                    if (this.debug) {

	                        gl = this.debug.makeDebugContext(canvas.getContext(n[i]));

	                        if (gl) {

	                            console.warn('using debug context');

	                            if (gl.getParameter !== 'function') {

	                                gl = canvas.getContext(n[i]);

	                                console.warn('unable to use debug context, trying release:' + n[i], ' getParameter:' + _typeof(gl.getParameter));
	                            }

	                            break;
	                        }
	                    } else {

	                        gl = canvas.getContext(n[i]);

	                        if (gl) {

	                            console.warn('using release context mode:' + n[i]);

	                            break;
	                        }
	                    }
	                } catch (e) {

	                    console.warn('failed to load context:' + n[i]);
	                }

	                i++;
	            } // end of while loop


	            /*
	             * If we got a context, assign WebGL version. Note that some 
	             * experimental versions don't have .getParameter
	             */

	            if (gl && typeof gl.getParameter == 'function') {

	                this.contextCount++;

	                this.gl = gl;

	                // Check if this is a full WebGL2 stack

	                this.version = gl.getParameter(gl.VERSION).toLowerCase();

	                if (i == 1 || i == 3) {

	                    console.warn('experimental context, .getParameter() may not work');
	                }

	                console.log('version:' + gl.getParameter(gl.VERSION));

	                // Supported extensions.

	                this.stats.uint32 = true; // by default, but check if we have WebGL 1.0.

	                this.stats.supported = gl.getSupportedExtensions();

	                // Take action, depending on version (identified by pos in our test array n).

	                switch (i) {

	                    // WebGL 2.0

	                    case 0:

	                    case 1:

	                        this.version = 2.0;

	                        break;

	                    // WebGL 1.0 

	                    case 2:

	                    case 3:

	                    default:

	                        this.version = 1.0;

	                        this.stats.uint32 = this.index32Support(gl); // vertices > 64k, no constant exported. WebGL 1.0 only.

	                        break;

	                }

	                // These extensions expose constants, so we can test here.

	                this.stats.anisotrophic = this.anisotropicSupport(gl);

	                this.stats.vertexArrays = this.vertexArraySupport(gl); // vertex buffers

	                this.stats.derivatives = this.derivativeSupport(gl); // shader derivatives

	                this.stats.depthTextures = this.depthTextureSupport(gl); // depth textures

	                this.stats.pvrtcTextures = this.PVRTCTextureSupport(gl); // PVRTC compressed texture support

	                this.stats.etc1Textures = this.ETC1TextureSupport(gl); // ETC1 compress texture support

	                this.stats.setcTextures = this.S3TCTextureSupport(gl); // S3 compressed texture support

	                // Set the maximum draw elements, based on card capabilities.

	                if (!this.stats.uint32) {

	                    this.MAX_DRAWELEMENTS = 65534;
	                } else {

	                    this.MAX_DRAWELEMENTS = 2e9;
	                }
	            } else {
	                // no WebGL

	                console.error('WebGL::createContext(): no WebGL available');

	                this.gl = null;
	            }

	            return this.gl;
	        }

	        /** 
	         * Return the current context. Note that we don't store a 
	         * separate reference to the canvas.
	         * @returns {WebGLRenderingContext} gl a WebGLRenderingContext.
	         */

	    }, {
	        key: 'getContext',
	        value: function getContext() {

	            if (!this.gl) {

	                console.warn('warning webgl context not initialized');
	            }

	            return this.gl;
	        }

	        /** 
	         * Kill the current context (complete reset will be needed). Also use to debug 
	         * when context is lost, and has to be rebuilt.
	         * @link http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl/
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context/loseContext
	         */

	    }, {
	        key: 'killContext',
	        value: function killContext() {

	            console.log('in killcontext, count:' + this.contextCount);

	            if (this.contextCount) {

	                console.log('killing WebGL context, count before:' + this.contextCount);

	                this.gl.getExtension('WEBGL_lose_context').loseContext();

	                this.contextCount--;
	            }
	        }

	        /** 
	         * check if we have a contex and are ready to render.
	         */

	    }, {
	        key: 'ready',
	        value: function ready() {

	            var gl = this.gl;

	            return !!(this.gl && this.glMatrix);
	        }

	        /*
	         * ---------------------------------------
	         * CLEAR/RESET OPERATIONS
	         * ---------------------------------------
	         */

	        /** 
	         * Clear the screen prior to redraw.
	         */

	    }, {
	        key: 'clear',
	        value: function clear() {

	            var gl = this.gl;

	            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	        }

	        /** 
	         * Clear textures from the videocard before the program starts.
	         */

	    }, {
	        key: 'clearTextures',
	        value: function clearTextures() {

	            var gl = this.gl;

	            var len = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);

	            for (var i = 0; i < len; i++) {

	                gl.activeTexture(gl.TEXTURE0 + i);

	                gl.bindTexture(gl.TEXTURE_2D, null);

	                gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	            }

	            gl.bindBuffer(gl.ARRAY_BUFFER, null);

	            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	            gl.bindRenderbuffer(gl.RENDERBUFFER, null);

	            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	        }

	        /*
	         * ---------------------------------------
	         * SHADER VARIABLES AND UNIFORMS
	         * ---------------------------------------
	         */

	        /** 
	         * create a WeGL shader object.
	         * @param {VERTEX_SHADER | FRAGMENT_SHADER} type type WebGL shader type.
	         * @param {String} source the shader source, as plain text.
	         * @returns {WebGLShader} a compiled WebGL shader object.
	         */

	    }, {
	        key: 'createShader',
	        value: function createShader(type, source) {

	            var shader = null;

	            if (!type || !source) {

	                console.error('createShader: invalid params, type:' + type + ' source:' + source);
	            } else if (this.ready()) {

	                var gl = this.gl;

	                /*
	                 * remove first EOL, which might come from using <script>...</script> tags,
	                 * to handle GLSL ES 3.00 (TWGL)
	                 */
	                source.replace(/^[ \t]*\n/, '');

	                if (type === gl.VERTEX_SHADER) {

	                    shader = gl.createShader(type); // assigned VS
	                } else if (type === gl.FRAGMENT_SHADER) {

	                    shader = gl.createShader(type); // assigned FS
	                } else {

	                    console.error('createShader: type not recognized:' + type);
	                }

	                gl.shaderSource(shader, source);

	                gl.compileShader(shader);

	                // Detect shader compile errors.

	                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

	                    console.error('createShader:' + gl.getShaderInfoLog(shader));

	                    shader = null;
	                }
	            }

	            return shader;
	        }
	    }, {
	        key: 'createVertexShader',
	        value: function createVertexShader(source) {

	            return this.createShader(this.gl.VERTEX_SHADER, source);
	        }
	    }, {
	        key: 'createFragmentShader',
	        value: function createFragmentShader(source) {

	            return this.createShader(this.gl.FRAGMENT_SHADER, source);
	        }

	        /** 
	         * Use the Fetch API to get a shader file
	         */

	    }, {
	        key: 'fetchShader',
	        value: function fetchShader(type, sourceURL) {
	            var _this2 = this;

	            var self = this;

	            fetch(sourceURL, {

	                method: 'POST',

	                mode: 'cors',

	                redirect: 'follow',

	                headers: new Headers({

	                    'Content-Type': 'text/plain'

	                })

	            }).then(function (response) {

	                console.log(text);

	                if (response.ok) {

	                    return response.text();
	                }

	                return false;
	            }).then(function (source) {

	                if (source) {

	                    return _this2.createShader(type, source);
	                }
	            });

	            return null;
	        }
	    }, {
	        key: 'fetchVertexShader',
	        value: function fetchVertexShader(sourceURL) {

	            return this.fetchShader(this.gl.VERTEX_SHADER, sourceURL);
	        }
	    }, {
	        key: 'fetchFragmentShader',
	        value: function fetchFragmentShader(sourceURL) {

	            return this.fetchShader(this.gl.FRAGMENT_SHADER, sourceURL);
	        }

	        /** 
	         * create shader form script element
	         * @param {String|DOMElement} tag the script element, or its id
	         */

	    }, {
	        key: 'createShaderFromTag',
	        value: function createShaderFromTag(tag) {

	            if (this.util.isString(tag)) {

	                tag = document.getElementById(tag);
	            }

	            if (!tag) {

	                console.error('createShaderFromTag: not found (' + tag + ')');

	                return false;
	            }

	            var type = null;

	            if (tag.type == 'x-shader/x-vertex') {

	                type = this.gl.VERTEX_SHADER;
	            } else if (tag.type == 'x-shader/x-fragment') {

	                type = this.gl.FRAGMENT_SHADER;
	            } else {

	                console.error('createShaderFromTag: type not found:(' + tag.type + ')');

	                return null;
	            }

	            var source = "";

	            var c = tag.firstChild;

	            while (c) {

	                if (c.nodeType == 3) {

	                    source += c.textContent;
	                }

	                c = c.nextSibling;
	            }

	            return this.createShader(type, source);
	        }

	        /*
	         * ---------------------------------------
	         * COMPILE WEBGL PROGRAM
	         * ---------------------------------------
	         */

	        /** 
	         * Create WebGL program with shaders. Program not used until 
	         * we apply gl.useProgram(program).
	         * @param {gl.VERTEX_SHADER} vShader the vertex shader.
	         * @param {gl.FRAGMENT_SHADER} fShader the fragment shader.
	         * @returns {Object} an object containing the compiled shaders, the 
	         * WebGL program, and a parsed list of all the varying and uniforms in 
	         * the shader source code.
	         * 
	         * prg.shaderProgram = program; // the WebGL program
	         * prg.vsVars = vs.varList,     // varying and uniform names in vertex shader.
	         * prg.fsVars = fs.varList      // varying and uniform names in fragment shader.
	         *
	         */

	    }, {
	        key: 'createProgram',
	        value: function createProgram(vs, fs) {

	            if (!vs || !fs) {

	                console.error('createProgram: parameter error, vs:' + vs + ' fs:' + fs);

	                return null;
	            }

	            // Wrap the VBO program object to keep V8 JIT happy.

	            var prg = {};

	            if (this.ready()) {

	                var gl = this.gl;

	                var vso = this.createVertexShader(vs.code);

	                var fso = this.createFragmentShader(fs.code);

	                var program = gl.createProgram();

	                gl.attachShader(program, vso);

	                gl.attachShader(program, fso);

	                // Explicitly assign attribute names and indexes (0-32k) BEFORE linking.
	                // http://stackoverflow.com/questions/4635913/explicit-vs-automatic-attribute-location-binding-for-opengl-shaders

	                for (var j in this.attributeNames) {

	                    //console.log('gl.bindAttrib( shaderProgram, "' + this.attributeNames[ j ][ 1 ] + '", "' +  this.attributeNames[ j ][ 0 ] + '"' );

	                    gl.bindAttribLocation(program, this.attributeNames[j][1], this.attributeNames[j][0]);
	                }

	                gl.linkProgram(program);

	                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {

	                    console.error('WebGL::createProgram():' + gl.getProgramInfoLog(program));

	                    this.checkShaders(vs, fs, program);
	                } else {

	                    prg.shaderProgram = program;

	                    prg.vsVars = vs.varList, prg.fsVars = fs.varList, prg.renderList = [];
	                }
	            }

	            return prg;
	        }

	        /** 
	         * Read shader code, and organize the variables in the shader 
	         * into an object. Abstracts some of the tedious work in setting 
	         * up shader variables.
	         *
	         * Called by individual Shader objects in vsSrc() and fsSrc().
	         * 
	         * @param {Array} sourceArr array of lines in the shader.
	         * @returns {Object} an object organizing attribute, uniform, and 
	         * varying variable names and datatypes.
	         */

	    }, {
	        key: 'createVarList',
	        value: function createVarList(source) {

	            var len = source.length;

	            var NOT_IN_LIST = this.NOT_IN_LIST;

	            var sp = ' ';

	            var list = {};

	            var varTypes = ['attribute', 'uniform', 'varying'];

	            if (len) {

	                for (var i = 0; i < len; i++) {

	                    var s = source[i];

	                    if (s.indexOf('void main') !== NOT_IN_LIST) {

	                        break;
	                    } else {

	                        for (var j = 0; j < varTypes.length; j++) {

	                            var type = varTypes[j];

	                            if (!list[type]) list[type] = {};

	                            if (s.indexOf(type) > NOT_IN_LIST) {

	                                //////////////////////////////console.log("SSS1:" + s)

	                                //s = s.slice(0, -1); // remove trailing ';'
	                                s = s.replace(/;\s*$/, "");

	                                ///////////////////////////////console.log("SSS:" + s)

	                                s = s.split(sp);

	                                //////////////////////////////console.log("FIRST: " + s)

	                                var vType = s.shift(); // attribute, uniform, or varying

	                                if (!list[vType]) {

	                                    list[vType] = {};
	                                }

	                                /////////////////////////console.log("SECOND AFTER SHIFT:" + vType + " remainder:" + s)

	                                var nType = s.shift(); // variable type

	                                if (!list[vType][nType]) {

	                                    list[vType][nType] = {};
	                                }

	                                var nName = s.shift(); // variable name

	                                if (!list[vType][nType][nName]) {

	                                    list[vType][nType][nName] = 'empty';
	                                }

	                                /////////////////////////console.log("THIRD AFTER SHIFT:" + nType + " remainder:" + s)
	                            }
	                        }
	                    }
	                }
	            }

	            return list;
	        }

	        /** 
	         * Pass the pre-defined attribute indexes and names to individual Shader programs. 
	         * The names and indexes are defined in the constructor.
	         * @param {WebGLProgram} program a compiled WebGL program.
	         * @param {Object} attributes the attributes we want to extract.
	         */

	    }, {
	        key: 'setAttributeArrays',
	        value: function setAttributeArrays(shaderProgram, attributes) {

	            var gl = this.gl;

	            for (var i in attributes) {

	                var attb = attributes[i];

	                for (var j in attb) {

	                    //console.log('setAttributeNames for attb["' + j + '""],' + this.attributeNames[ j ][ 1 ] + '", "' +  this.attributeNames[ j ][ 0 ] + '"' );

	                    attb[j] = this.attributeNames[j][1];
	                }
	            }

	            return attributes;
	        }

	        /** 
	         * Store our uniform locations.
	         * @param {WebGLProgram} program a compiled WebGL program.
	         * @param {Object} uniforms array of uniforms.
	         */

	    }, {
	        key: 'setUniformLocations',
	        value: function setUniformLocations(shaderProgram, uniforms) {

	            var gl = this.gl;

	            for (var i in uniforms) {

	                var unif = uniforms[i];

	                for (var j in unif) {

	                    unif[j] = gl.getUniformLocation(shaderProgram, j);

	                    ////////console.log("gl.getUniformLocation( shaderProgram," + j + ") is:" + unif[ j ] );
	                }
	            }

	            return uniforms;
	        }

	        /** 
	         * Create associative array with shader attributes.
	         * NOTE: Only attributes actually used in the shader show.
	         * @param {WebGLProgram} program a compiled WebGL program.
	         * @returns {Object} a collection of attributes, with .count = number.
	         */

	    }, {
	        key: 'getAttributes',
	        value: function getAttributes(program) {

	            var gl = this.gl;

	            var attrib = {};

	            var attribCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

	            for (var i = 0; i < attribCount; i++) {

	                var attribInfo = gl.getActiveAttrib(program, i);

	                /////////console.log("adding attribute:" + attribInfo.name );

	                attrib[attribInfo.name] = gl.getAttribLocation(program, attribInfo.name);
	            }

	            // Store the number of attributes.

	            attrib.count = attribCount;

	            return attrib;
	        }

	        /** 
	         * Create associative array with shader uniforms.
	         * NOTE: Only attributes actually used in the Shader show.
	         * @param {WebGLProgram} program a compiled WebGL program.
	         * @returns {Object} a collection of attributes, with .count = number.
	         */

	    }, {
	        key: 'getUniforms',
	        value: function getUniforms(program) {

	            var gl = this.gl;

	            var uniform = {};

	            var uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

	            var uniformName = '';

	            for (var i = 0; i < uniformCount; i++) {

	                var uniformInfo = gl.getActiveUniform(program, i);

	                uniformName = uniformInfo.name.replace('[0]', '');

	                //console.log("adding uniform:" + uniformName );

	                uniform[uniformName] = gl.getUniformLocation(program, uniformName);
	            }

	            // Store the number of uniforms.

	            uniform.count = uniformCount;

	            return uniform;
	        }

	        /** 
	         * Create associative array with shader varying variables.
	         * @param {WebGLProgram} program a compiled WebGL program.
	         */

	    }, {
	        key: 'getVarying',
	        value: function getVarying(program) {}

	        /** 
	         * check to see if we're ready to run, after supplying 
	         * shaders.
	         * @param {WebGLShader} vs the vertex shader.
	         * @param {WebGLShader} fs the fragment shader.
	         * @param {WebGLProgram} program a compiled WebGL program.
	         */

	    }, {
	        key: 'checkShaders',
	        value: function checkShaders(vs, fs, program) {

	            var gl = this.gl;

	            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {

	                // Test the vertex shader

	                if (vs && !gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {

	                    console.error('error creating the vertex shader, ' + gl.getShaderInfoLog(vs));
	                } else if (fs && !gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {

	                    console.error('error creating the fragment shader, ' + gl.getShaderInfoLog(fs));
	                } else {

	                    console.error('error in gl program linking');
	                }

	                gl.deleteProgram(program);

	                return false;
	            }

	            return true;
	        }

	        /** 
	         * Check if our VBO or IBO are ok.
	         */

	    }, {
	        key: 'checkBufferObjects',
	        value: function checkBufferObjects(bo) {

	            return bo && bo instanceof ArrayBuffer;
	        }

	        /** 
	         * Convert WebGL ENUM to string.
	         */

	    }, {
	        key: 'enumToString',
	        value: function enumToString(gl, val) {

	            for (var i in gl) {

	                if (gl[i] == val) {

	                    return i;
	                }
	            }

	            return '0x' + val.toString(16);
	        }
	    }]);

	    return WebGL;
	}();

	exports.default = WebGL;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WebVR = function () {

	    /** 
	     * @class
	     * render scenes to webvr devices, following toji's room-scale example:
	     * @link https://github.com/toji/webvr.info/blob/master/samples/05-room-scale.html
	     * Note: there is some WebVR code in  the Shader (shader.es6) parent object (it sets left and right eye matrix).
	     * ---------------------------------------
	     * Compatibility Aug 2017
	     * FF/openvr - works, with jitters, roomscale OK.
	     * FF/native - did not work.
	     * Edge/Windows Mixed Reality - works with Acer and HP headsets, including roomscale, as long as Vive is not installed!
	     * ----------------------------------------
	     * Compatibility April 2017
	     * Firefox Nightly: 
	     * - turn on support in about:config in location field of browser
	     * - Vive also needs an openvr .dll connected via about:config
	     * - https://webvr.rocks/firefox#download
	     * ----------------------------------------
	     * Chromium dev build from webvr rocks
	     * - turn on in chrome://flags/
	     * - use https:// instead of http://
	     *
	     * @constructor
	     */
	    function WebVR(init, util, glMatrix, webgl) {
	        _classCallCheck(this, WebVR);

	        console.log('in webVR class');

	        this.util = util, this.glMatrix = glMatrix, this.webgl = webgl, window.displayName = 'window', // give it a display name

	        this.displays = [window], // display [ 0 ] is always 'window'

	        this.cDisplay = this.displays[0], // pointer to the current display

	        this.frameData = null, // VR frame data

	        this.PLAYER_HEIGHT = 1.75; // average player height, a default if not available.

	        // Statistics object.

	        this.stats = {

	            version: 0

	        };

	        // Todo: Listen for World init event?

	        // Immediately initialize (for now).

	        if (init === true) {

	            this.init();
	        }
	    }

	    /** 
	     * Set the World object (which has .requestAnimationFrame). used by World 
	     * to apply itself to this object.
	     * @param {World} world the current world, including world.render() loop.
	     */


	    _createClass(WebVR, [{
	        key: 'setWorld',
	        value: function setWorld(world) {

	            this.world = world;
	        }

	        /** 
	         * Initialize webvr displays.
	         */

	    }, {
	        key: 'init',
	        value: function init() {
	            var _this = this;

	            // Collect stats no matter what...

	            var stats = this.stats,
	                d = null;

	            this.cDisplay = this.displays[0]; // zeroth position always window

	            if (navigator.getVRDisplays) {

	                navigator.getVRDisplays().then(function (displays) {

	                    console.log('WebVR::init(): webvr 1.1 is available');

	                    _this.stats.version = 1.1;

	                    if ('VRFrameData' in window) {

	                        _this.frameData = new VRFrameData(); // Contains our current pose.
	                    }

	                    // Only proceed if VRFrameData returned.

	                    if (_this.frameData) {

	                        console.log('WebVR::init(): VRFrameData is available for ' + displays.length + ' headsets');

	                        if (displays.length > 0) {

	                            console.log('WebVR::init(): ' + displays.length + ' displays are available');

	                            // Create our local wrapped display objects.

	                            for (var i = 0; i < displays.length; i++) {

	                                d = displays[i];

	                                if (d.displayName === undefined) {

	                                    d.displayName = 'Generic WebVR device';
	                                }

	                                // Add to our VRDisplay list.

	                                console.log('WebVR::init(): pushing display (' + d.displayName + ')');

	                                _this.displays.push(d);
	                            }

	                            // Grab the first VRDisplay, ignore others for now.

	                            d = _this.cDisplay = _this.displays[1];

	                            // If VRDisplay is valid, set parameters.

	                            if (d) {

	                                console.log('WebVR::init(): valid vr display (' + d.displayName + ') present');

	                                // Check if we are somehow already presenting.

	                                if (d.isPresenting) {

	                                    console.warn('WebVR::init(): (' + d.displayName + ') was already presenting, exit first');

	                                    _this.exitPresent(1);
	                                }

	                                // Adjust depthNear and depthFar to device info, or provide defaults.

	                                if (d.depthNear) {

	                                    _this.webgl.near = d.depthNear;
	                                } else {

	                                    d.depthNear = _this.webgl.near;
	                                }

	                                if (d.depthFar) {

	                                    _this.webgl.far = d.depthFar;
	                                } else {

	                                    d.depthFar = _this.webgl.far;
	                                }

	                                // At present, the device name is the only static value in the display.

	                                stats.displayName = d.displayName; // HMD name

	                                // Set WebVR display stage parameters.

	                                _this.setStageParameters(d);

	                                /** 
	                                 * Fire our pseudo-event VR_DISPLAY_READY for webvr capability.
	                                 * This is received by the UI to configure buttons, and World 
	                                 * to start the rendering process.
	                                 */

	                                _this.util.emitter.emit(_this.util.emitter.events.VR_DISPLAY_READY, d);

	                                // Listen for WebVR events.

	                                window.addEventListener('vrdisplaypresentchange', _this.presentChange.bind(_this), false);

	                                window.addEventListener('vrdisplayconnected', _this.displayConnected.bind(_this), false);

	                                window.addEventListener('vrdisplaydisconnected', _this.displayDisconnected.bind(_this), false);

	                                // Not implemented in 2017.

	                                window.addEventListener('vrdisplayactivate', _this.displayActivated.bind(_this), false);

	                                window.addEventListener('vrdisplaydeactivate', _this.displayDeactivated.bind(_this), false);

	                                window.addEventListener('vrdisplayblur', _this.displayBlur.bind(_this), false);

	                                window.addEventListener('vrdisplayfocus', _this.displayFocus.bind(_this), false);
	                            } // display is valid
	                        } else {
	                            // WebVR is present, but displays.length == 0

	                            console.warn('WebVR::init(): no VR displays found');

	                            // This should be reported as a fail.

	                            _this.util.emitter.emit(_this.util.emitter.events.VR_DISPLAY_FAIL, d);
	                        } // no valid display
	                    } else {
	                        // invalid VRFrameData

	                        console.warn('WebVR::init(): invalid VRFrameData for ' + d);

	                        // This should be reported as a fail.

	                        _this.util.emitter.emit(_this.util.emitter.events.VR_DISPLAY_FAIL, d);
	                    } // end of invalid VRFrameData
	                }, function (reject) {

	                    console.warn('WebVR::init(): reject navigator.getVRDisplays, error is:' + reject + ' display is:' + d);

	                    // This should be reported as a fail.

	                    _this.util.emitter.emit(_this.util.emitter.events.VR_DISPLAY_FAIL, d);
	                }).catch(function (error) {

	                    console.warn('WebVR::init(): error navigator.getVRDisplays:' + error + ' display is:' + d);

	                    // This should be reported as a fail.

	                    _this.util.emitter.emit(_this.util.emitter.events.VR_DISPLAY_FAIL, d);
	                }); // getVRDisplays returned a value
	            } else {

	                // We check for support prior to loading this module, so we shouldn't go here if not supported.

	                console.warn('WebVR::init(): WebVR API not present, or obsolete version');

	                this.util.emitter.emit(this.util.emitter.events.VR_DISPLAY_FAIL, d);
	            }
	        }

	        /** 
	         * Getter for frameData object.
	         * @returns {VRFrameData} frame object for submission to the VR display.
	         */

	    }, {
	        key: 'getFrameData',
	        value: function getFrameData() {

	            var d = this.cDisplay,
	                fd = this.frameData;

	            if (d.getFrameData) {

	                var result = d.getFrameData(fd);

	                if (result) {

	                    return fd;
	                }

	                console.error('WebVR::getFrameData(): display (' + d.displayName + '), display.getFrameData returned:' + result);

	                return null;
	            }

	            console.error('WebVR::getFrame(): display (' + d.displayName + ') does not have VRFrameData');

	            return null;
	        }

	        /** 
	         * Check if we have WebVR
	         */

	    }, {
	        key: 'hasWebVR',
	        value: function hasWebVR() {

	            return !!('VRFrameData' in window && 'getVRDisplays' in navigator);
	        }

	        /** 
	         * Check if we have access to a WebVR display
	         */

	    }, {
	        key: 'hasWebVRDisplay',
	        value: function hasWebVRDisplay() {

	            return !!(this.hasWebVR() && this.cDisplay && this.cDisplay.getFrameData);
	        }

	        /** 
	         * Check if we can support roomscale VR.
	         */

	    }, {
	        key: 'hasRoomscale',
	        value: function hasRoomscale() {

	            return this.cDisplay && this.cDisplay.capabilities && cDisplay.capabilities.hasPosition;
	        }

	        /** 
	         * Getter for the display.
	         * @returns {VRDisplay} the found vr display.
	         */

	    }, {
	        key: 'getDisplay',
	        value: function getDisplay() {

	            return this.cDisplay;
	        }

	        /** 
	         * Set the stage parameters.
	         * The check for size > 0 is necessary because some devices, like the
	         * Oculus Rift, can give you a standing space coordinate but don't
	         * have a configured play area. These devices will return a stage size of 0.
	         * @param {VRDisplay} the current VRDisplay object.
	         */

	    }, {
	        key: 'setStageParameters',
	        value: function setStageParameters(display) {

	            var d = display,
	                sp = d.stageParameters;

	            if (sp) {

	                console.log('WebVR::setStageParameters(): vr display stageParameters present');

	                if (sp.sizeX > 0 && sp.sizeZ > 0) {

	                    console.log('WebVR::setStageParameters(): device (' + d.displayName + ') stageParameters sizeX:' + sp.sizeX + ' and sizeZ:' + sp.sizeZ);

	                    // TODO: this.world.resize( d.stageParameters.sizeX, d.stageParameters.sizeZ );
	                } else {

	                    console.log('WebVR::setStageParameters(): device (' + d.displayName + ') reported stageParameters without a size, using defaults (3000)');
	                }
	            } else {

	                // TODO: test early.

	                console.error('WebVR::setStageParameters(): device (' + d.displayName + ') did not report stage parameters');
	            }
	        }

	        /** 
	         * Pose matrix for standing roomscale view (move point of view up). Also multiply our 
	         * current model-view matrix by the left and right eye view matrix. After Toji.
	         *
	         * @param {glMatrix.vec4} mvMatrix the current model-view matrix.
	         * @param {glmatrix.vec4} eyeView the frameData.leftViewMatrix or frameData.rightViewMatrix.
	         * @param {glMatrix.vec4} pose matrix describing user pose.
	         */

	    }, {
	        key: 'getStandingViewMatrix',
	        value: function getStandingViewMatrix(mvMatrix, eyeView, pose) {

	            var mat4 = this.glMatrix.mat4,
	                d = this.cDisplay;

	            if (d.stageParameters) {

	                /* 
	                * After toji:
	                * If the headset provides stageParameters use the
	                * sittingToStandingTransform to transform the view matrix into a
	                * space where the floor in the center of the users play space is the
	                * origin.
	                */

	                // This pulls us off the floor, and rotates the view on HTC Vive 180 degres clockwise in the xz direction.

	                mat4.invert(mvMatrix, d.stageParameters.sittingToStandingTransform);

	                mat4.multiply(mvMatrix, eyeView, mvMatrix);
	            } else {

	                /* 
	                 * After toji:
	                 * You'll want to translate the view to compensate for the
	                 * scene floor being at Y=0. Ideally this should match the user's
	                 * height (you may want to make it configurable). For this demo we'll
	                 * just assume all human beings are 1.65 meters (~5.4ft) tall.
	                 */

	                mat4.identity(mvMatrix);

	                mat4.translate(mvMatrix, mvMatrix, [0, this.PLAYER_HEIGHT, 0]);

	                mat4.invert(mvMatrix, mvMatrix);

	                mat4.multiply(mvMatrix, eyeView, mvMatrix);
	            }

	            return mvMatrix;
	        }

	        /* 
	         * ---------------------------------------
	         * VR PRESENTATION
	         * ---------------------------------------
	         */

	        /** 
	         * User requested VR mode, or display HMD was activated.
	         * @param {String} displayNum the number of the display, 0 === window.
	         */

	    }, {
	        key: 'requestPresent',
	        value: function requestPresent(displayNum) {
	            var _this2 = this;

	            if (this.world === null) {

	                console.error('WebVR::requestPresent(): world not available');

	                return false;
	            }

	            // Default to first VR device.

	            if (displayNum === undefined) {

	                displayNum = 1;
	            }

	            console.log('WebVR::requestPresent(): display(' + this.cDisplay.displayName + ')');

	            var world = this.world,
	                d = this.displays[displayNum];

	            if (d && d.capabilities && d.capabilities.canPresent) {

	                d.requestPresent([{ source: this.webgl.getCanvas() }]).then(function () {
	                    // fufilled

	                    // success

	                    // kill the old .rAF

	                    world.stop();

	                    // start the new .rAF with our new display

	                    _this2.cDisplay = d;

	                    world.start();

	                    /* 
	                     * Note: the <canvas> size changes, but it is wrapped in our <div> so 
	                     * doesn't change size. This makes it easier to see the whole stereo view onscreen.
	                     * 
	                     * Note: this triggers this.vrResize(), but NOT a window resize (handler: webgl.resize() ) event;
	                     *
	                     */

	                    console.log('WebVR::requestPresent(): present was successful');
	                }, function (reject) {
	                    // rejected

	                    console.error('WebVR::requestPresent(): reject, error:' + reject + ' for display:' + d);
	                }).catch(function (error) {

	                    console.warn('WebVR::requestPresent(): catch, error is:' + error + ' for display:' + d);

	                    /////////////this.util.emitter.emit( this.util.emitter.events.VR_DISPLAY_FAIL, d );
	                });
	            } else {

	                console.error('WebVR::requestPresent(): vrdisplay (' + d.displayName + ') has invalid configuration');
	            }

	            return false;
	        }

	        /**  
	         * User requested exiting VR mode, or display HMD was deactivated.
	         * Return to window-based display.
	         */

	    }, {
	        key: 'exitPresent',
	        value: function exitPresent(displayNum) {
	            var _this3 = this;

	            console.log('WebVR::exitPresent(): event');

	            if (this.world === null) {

	                console.error('WebVR::requestPresent(): world not available');

	                return false;
	            }

	            var d = this.cDisplay,
	                world = this.world;

	            if (displayNum !== undefined) {

	                d = this.displays[displayNum];
	            }

	            // Confirm that this display has an .exitPresent method.

	            if (d.exitPresent) {

	                d.exitPresent() // NO semicolon!

	                .then(function () {

	                    /* 
	                     * Success!
	                     *
	                     * Note: this triggers this.vrResize().
	                     */

	                    world.stop();

	                    _this3.cDisplay = _this3.displays[0];

	                    world.start();

	                    console.log('WebVR::exitPresent(): exited display (' + d.displayName + ') presentation to (' + _this3.cDisplay.displayName + ')');
	                }, function (reject) {

	                    console.error('WebVR::exitPresent(): reject for display(' + d.displayName + '), error:' + reject);

	                    _this3.util.emitter.emit(_this3.util.emitter.events.VR_DISPLAY_FAIL, d);
	                }).catch(function (error) {

	                    console.warn('WebVR::exitPresent(): error for display (' + d.displayName + '), error:' + error);

	                    _this3.util.emitter.emit(_this3.util.emitter.events.VR_DISPLAY_FAIL, d);
	                });
	            } else {

	                console.error('WebVR::exitPresent(): display (' + d.displayName + ') is not a vr display');

	                this.util.emitter.emit(this.util.emitter.events.VR_DISPLAY_FAIL, d);
	            }
	        }

	        /* 
	         * ---------------------------------------
	         * VR EVENTS
	         * ---------------------------------------
	         */

	        /** 
	         * resize event when in VR mode. Changes canvas 
	         * to hold stereo view. Since it mixes in WebVR display 
	         * objects, we put it here, instead of in Ui.
	         */

	    }, {
	        key: 'vrResize',
	        value: function vrResize() {

	            var d = this.cDisplay,
	                gl = this.webgl.getContext(),
	                c = this.webgl.getCanvas(),
	                p = c.parentNode;

	            console.log('WebVR::vrResize(): resize for display (' + d.displayName + ')');

	            // Get the current size of the parent <div> for the <canvas>.

	            this.oldWidth = p.clientWidth * f | 0;

	            this.oldHeight = p.clientHeight * f | 0;

	            var f = Math.max(window.devicePixelRatio, 1);

	            if (d && d.isPresenting) {

	                console.log('WebVR::vrResize(): display (' + d.displayName + ') currently presenting');

	                var leftEye = d.getEyeParameters('left');

	                var rightEye = d.getEyeParameters('right');

	                // Resize to twice the width of the mono display.

	                var width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;

	                var height = Math.max(leftEye.renderHeight, rightEye.renderHeight);

	                c.width = width;

	                c.height = height;

	                // p.style.width = c.width + 'px'; // let it get full sized

	                // p.style.height = c.height + 'px'; // let it get full-sized

	                gl.viewportWidth = width;

	                gl.viewportHeight = height;

	                gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	                // Force parent to the same size

	                console.log('WebVR::vrResize(): new width:' + c.width + ' height:' + c.height);
	            } else {

	                // Call the standard webgl object resize event.

	                p.style.width = '';

	                p.style.height = '';

	                console.log('WebVR::vrResize(): calling standard window resize');

	                /* 
	                 * Force a canvas resize, even if our window size did not change. 
	                 * Note: This changes the viewport to fill the canvas, instead of 2 stereo regions.
	                 */

	                this.webgl.resizeCanvas(true);
	            }
	        }

	        /** 
	         * VR Presentation has changed.
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/onvrdisplaypresentchange
	         */

	    }, {
	        key: 'presentChange',
	        value: function presentChange() {

	            var d = this.cDisplay;

	            // Handle resizes in both directions.

	            this.vrResize();

	            console.log('WebVR::presentChange(): event for ' + d.displayName);

	            if (d.isPresenting) {

	                if (d.capabilities && d.capabilities.hasExternalDisplay) {

	                    // Any changes needed when we jump to VR presenting.

	                }
	            } else {

	                if (d.capabilities && d.capabilities.hasExternalDisplay) {

	                    // Any changes needed when we leave VR presenting.

	                }
	            }
	        }

	        /** 
	         * Display was temporarily paused.
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/onvrdisplayblur
	         */

	    }, {
	        key: 'displayBlur',
	        value: function displayBlur() {

	            console.warn('WebVR::displayBlur(): display blur event');
	        }

	        /** 
	         * Display was unpaused.
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/onvrdisplayfocus
	         */

	    }, {
	        key: 'displayFocus',
	        value: function displayFocus() {

	            console.warn('WebVR::displayFocus(): display focus event');
	        }

	        /** 
	         * A display was activated (display is able to present).
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/onvrdisplayactivate
	         */

	    }, {
	        key: 'displayActivated',
	        value: function displayActivated() {

	            console.warn('WebVR::displayActivated(): display activation event');
	        }

	        /** 
	         * A displays was deactivated (e.g. standby or sleep mode).
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/onvrdisplaydeactivate
	         */

	    }, {
	        key: 'displayDeactivated',
	        value: function displayDeactivated() {

	            console.warn('WebVR::displayDeactivated(): display deactivation event');
	        }

	        /**
	         * A display was connected.
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/onvrdisplayconnected
	         */

	    }, {
	        key: 'displayConnected',
	        value: function displayConnected() {

	            console.warn('WebVR::displayConnected(): display connected event');
	        }

	        /** 
	         * A display was disconnected.
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/onvrdisplaydisconnected
	         */

	    }, {
	        key: 'displayDisconnected',
	        value: function displayDisconnected() {

	            console.warn('WebVR::displayDisconnected(): display disconnected event');
	        }

	        /** 
	         * Report features of the WebVR interface to the Ui.
	         * @param {Display|Number} the WebVR display object, or its index in our list of WebVR displays. The 
	         * first display is always 'window', and HMDs are listed after displays[ 0 ]. Currently, we only use 
	         * the first WebVR display (no way to switch yet).
	         * @returns {Array|null} a list of the display features, or null.
	         */

	    }, {
	        key: 'reportWebVR',
	        value: function reportWebVR() {
	            var display = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;


	            if (this.util.isNumber(display)) {

	                display = this.displays[display] || null;
	            }

	            // Return a key-value array for readout

	            if (display) {

	                var cap = display.capabilities || {};

	                return {

	                    id: display.displayId,

	                    name: display.displayName,

	                    present: cap.canPresent || false,

	                    externalHMD: cap.hasExternalDisplay || false,

	                    pose: cap.hasPosition || false,

	                    orientation: cap.hasOrientation || false,

	                    maxLayers: cap.maxLayers || false

	                };
	            }

	            return null;
	        }
	    }]);

	    return WebVR;
	}();

	exports.default = WebVR;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Ui = function () {

	    /** 
	     * DOM, fullscreen, and stereo Ui.
	     */

	    function Ui() {
	        var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	        var util = arguments[1];
	        var webgl = arguments[2];
	        var webvr = arguments[3];

	        _classCallCheck(this, Ui);

	        console.log('in Ui');

	        this.UI_DOM = 'uidom', this.UI_VR = 'uivr', this.UI_FULLSCREEN = 'fullscreen';

	        this.mode = this.UI_DOM; // by default

	        /* 
	         * some icons were modified from the noun project.
	         * @link https://thenounproject.com/
	         * Conversion of SVG to base64
	         * @link http://b64.io/
	         */
	        this.icons = {

	            // Created by Cyril S of the Noun Project.

	            vr: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAAYFBMVEUAAAAAAAD//wCAgAD//wDAwAD//wBAQAD//wDw8AD//wD//wD//wD//wCgoAAgIADg4AD//wBgYAD//wBwcAAwMAD//wDQ0ACQkABQUAD//wD//wD//wCwsAD//wD//wCnD3VfAAAAIHRSTlMAq6urVquBqyuroRULa6urq0Cri6urlqurq0s2IKt2YQWtHu0AAANCSURBVHgB7Zlpl7osAEfxqhW477Z//2/5NNMZjcIy9WnO/A/3bQn3sMAPEH8Ei8VisVgsFsumZ++9Iuv+G0yvMPO8aHVBMRt1KebsZe/IeIrl4TRaYc8Dqd/jvuLo/4BGNLoBIP2qZn3BmU9yKcZ1G6jFSE6QO4sDiJGsYO0sTgMbMQ4gcRbHf0vAWZ4Ydr8q4IInRrGB9LcF/H9RYAurXxVY/x2BHRwdjTxuAOm31Zimbn2AJs6nCnjgahNY0pG+WqPzlA7pLiGQSzT8xBmmatCQ29kCMUB93oRCBFkEII390MuqaB8IEW7OCqCcKRADKhM/BNEzgy3AOewHkwLcWQIlUIRaWFEgB9pfgtL2m6AAul4A3hVI+vo7DmpoljagDkIjLEDOEPChDsUdGea4kGPYb0MF8WSBCuMWfjI3QQpnIUy6yVSB1jxsAmNgqYBQPFJDOVUghUwYKK5l6rQQDayr/lQBIBy3Vl/wB2wDYKLAGorxu5WEgzAxS2A1XgAYzth/T6Cc1AXBcMh/V2Br+OL1INwvPAiddKDM0zvTMJsxDWNzmQFQmbZCFZqGwIyFaI1xakXQmJdizzheSOZsRoXx9sAUzFyTblhP3Yy6JojE2O04hSJ87ACZdJtF/XYgaYEovK9fJkO5m0Jrg3AFlLMi2REoNn2JHn3GMSYCtRMdmxqIlwilq+sV1zVnym4AJG0DpG1ya0DtHcSFYFcAxLNjucuVQvFNWt39ogVPyTd1zTeyXOBgUvkYzxoxPU3vK+mJE2e+wIXEvTqkx9zR6q+zr2lZaAZOfrw6+GUy92imsdaLK2/mRwTEej7rU+t8ATPytrjIMDX+Z4FYX/lXkC53QbEfcT+AngADBe4nr2hKqO9bTX5SoIHdwwko/5xAwkP+OoP/OYESijHHJY12tEDwsj9Tw61rYRyGhtA4/6rWfAzcQfqpy+oWTuKeEFgvJKCgerEKZsaoGL/4KljmwWILyjx2WejFJIL2+TIcCQP106WgMmsb8W4eytyecn0FOAx81qxvKG8e0RqAkxhJwAvqaZ9lYiybSPEMTxg5Pbf2QvEWh82FzOuJVj8Ewsh+pRHdPiULi8VisVgsFotliP8AcnQzhVuzTBwAAAAASUVORK5CYII=',

	            htcvive: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAAt1BMVEUAAAAzMzP//wDNzQ0zMzP//wBlZSZAQDH//wBmZiaSkhpOTi/FxQ7//wC8vBCVlRqLix1MTCyxsRL09AT//wD//wClpRZ3dyLc3Ag+PjCAgB+dnRn//wD//wBwcCO0tBT//wBtbSRiYidhYSeurhSAgCGoqBj//wBZWSlXVyr//wByciP//wD//wD4+AKUlBt3dyf//wCBgR/NzQz//wD//wD//wDCwhGkpBf//wBZWSn//wD//wCqAxrVAAAAPXRSTlMAq6vj4+PkrYGr463hC+Grx+bhq4uW0sCr5ePO1lb1q6G9ufbVq6th47ZA48c29Mura8SrICsVq+O4q0t2ZYJ3CQAABbNJREFUeAHsld2umkAUhTtfMg6Kdi6AhDRDz9yIiQeJRoX48/7P1aDi0NT2NHHQG75LY7IWe6+159vAUwwMDAzMVlmWrap3ye/PXAn2b9FfAGmu9RZYvEF/A3UoGsIcNi/XP8FctKyjl89gXxy0cMzhXL1SPijkVnSpKQiWL5JfJmDkXHRZY4Akm/Vf/cwCSKnEbyC5sOl5EyvLBWnEnwYiALvsu/tE+fyxgaNO6fUoVDEQaSXGDwwYGF8KCXHV4/jTsGndXw0IlQJ21Ys+QC4aNLJ4aKAhB+zOv/7OQrQWXxu4rCGZea9fAtFR/I8BcQQC3wZinIDYIg8PDKzdZfbehQ0wF/8yUIAWLR/A0vPbx4doUelXBlTqN4h7oH18Ql3DYwPUOmz/5YLoKYCpcsMFDEfRJaQAOnMaA5kvA2dXgDUNySIgF100wSKh60CD9XeB2vWqCJJT1SwlCoVDRU3mdqfYOVCRrxzOrAtADfa62YBUdTMXu7ao+wgSXwvocjvzlSVtYxCmLvLx/VyEwN6DflYYI++UkhsHKeV08jn6nEyllAdumFJeMaYonr+HVWZll7Kcju78dLgfv5eldJhs9tT2N7S4z56MHK2844csZZfCPmHhZGmo9djF7Ve7VrfcKA9Dx3uYOgWvC24CAS4ypWx+mmmzH+3sZvr+D/alJHhkQjfIuc25DvKxJUtHcnbQefAPGKRdIvi9nB/v7Os125//koJCKhTB99hC0d9Hy8dWqP70Wb+VX79EH09AEnyHRKERDuRDq9F++q3/LsU5UpjgO4SoRR/R3IsBSWk9SIUwGEYBbMQ5Fh4MVj9Ica2aqueE/ZAXEgPEwqJKlU4rq08m3Oxv979RAPQTYRADKIa2r8ivdmiRdVmZVxq/yq89cei9BjLq1hpDSKVDMkySEIisFz4Y2ffw867WNTB5kIc972YKLtztiw2wDQ7YI7YKieGEGQmAGls3vl0AEAMoT4F61312zxGJL4cEIC0BrNsIAyIGAXP8Klhb3gcnTBn1dyF6JxDs0TAIAF1mLLu4YUTB4aefJJrDU46JxxOooAPyVadlVqMl8CO1pfL2lnEISCA/peYNaVZmo3uAv447Q/YJCN06LjckdOXhYP+MvYQPznEizIM1sGEQyIBivdVQJHLfrZy7gIltwqwxGCDlXENR4guakl7abHiZwL0bUjWAnWQREE9lXTfSbR1+rJgELKJ2JywCFLanmfAIZCmAlBQBPgFq4p5JQKa2xvgSoCb4BEqgSIKkAEpPAtQEn8AGNp1j40fAMcEmEFvhFaLxI+Ca4BMorNSJPQlQE2wCGXRwhEbmR8AxwSZgxW8IJf0IuCbYtyADdFiEVg7yCTgm+ATEkwaIIOYToCb4BNrv4zgmy/MJWBOeBFz41wImgRXVA9cToNXwv7GCZCnGoUrf3t7SSowAQw+82qEYRVXWdRmd5foDAWDnlO4mjpshCf8+tjP4003aCGSNFk5I7tBh5/ZMw/plvC6fWU3WQRqocL01UHSrAMw6WBuQpkUC+yJUgJHnemQ2vjf/2x9KqOTYHlWOA0yeJ3luSMXOsG9bMnWmIRfjX7g/SG/aIurGMnvqAw3cJc/Pz8kdoC3VUyOV0CLOHltOaW9G66qhJwAgeP5CQO5iiS3piQgWnMHtC32eIXV1DcgLBLJujFe4QuqT94Qyad8HCIHWsbmhRoddIDXCfEDGzEc3xzYKFs5UaJsHd9otzE4Q0kZKhUm+ddv5BSMCumxI83ENKNroDF1Dy0ChheXk94o2cV7JZAlAxWT//UREIBsDmKy3/pQ/qHSvwoZsss9gd6EI2Dkhm8E8ulSMFNSFYhS9HwzNPnyHxQ9S+IPOir3H5Y/LSHjDc1pu8Xp8iJsvf98LJq5/L7D/WLkSvi8mlsLL9Jrlpy/+yxMOq8mMv/Zsshqz+g033HDDDf8Db7OIUNFvKHcAAAAASUVORK5CYII=',

	            oculusrift: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAAYFBMVEUAAAAAAAD//wBAQAD//wDAwACAgAD//wD//wCgoADx8QAgIAD//wDQ0AFgYAD//wDg4AD//wD//wD//wBwcAD//wCQjwD//wAwMAD//wCwsAD//wBQUAD//wD//wD//wALJkCDAAAAIHRSTlMAq6urgaurVqGrq6trq6sLqysgi6uWq0CrNqt2qxVhSxMoBJ0AAANiSURBVHgB7dnbjrJIFMXxXX8OlpwFEcSD7/+WE3cQpycTKbGmnS/hd8WFbZabWgWVltVqtfqTXTIL6lTLF9SWp05+X8sTtpTfdgTORgUJ3OS3bWBrRnvIvhEgNqMAwjXAV9ZAMNp/KcDT9wMkXwlQRaN8bcEaYA2wBlgDrAH+ywDlcXMK/0X782Fkw3/YdBfxoM5YrulK+UyZ8RnbeTj7VNt98L4izrkLPxhCBxAFZqk0TgBbf/L7k735yPAjQb2r52+6xW5KvbSQ9OZDxfPcWDdAu5OXGu6a+2UG9Mb4SBA+ftDsHbk9D9sXQOfvI0E3fnfCzCEyhCrI4aQDiIwXA7QicoLBbCGcCXA2gf6BvV96kSY6ggaC2T070/0dkB1UxpODjhTQc/xp/sxfwU6vPEmBsoZEs2zkhR3ketNuOgtP9BcddU1FcJQXSp1TDFkIgfFlC5sNHIxJoJZX2sdK8Roghs1JWw3ISyEUes+8BiggfJSgkZemQTUeA+hI50ugxqXiP0AzXwI1laX1HmC+BApITQHWc4D2cW8v8pouvh7wHMDCXle3qPnN2H+A+SeBusFgTO49wLTDyWvjQ2jrP8D4tRuZM0b1HmAswU7U7GbsP8C4tC4yZ9yz/QcoXEowbcaV7wCuJZg2Y78BHEugLuNnvQZwLYGy0Juz5wDuJRjfjHu/AVxLoK76Yb8BXEugOh1X4jNA4V6CaTOuYG98id1LMG3GAxx8vhUnziUYz1Ax5D7PBblzCcZXghRIjR/9VILyjf/JJv6ORlstQQ9W5k3nsxwSf0dDAnN2K8F0PjsAg/Eh4lGCq7jR97ctOrjP7QEq7dVN3JyALar3sAmp7QEtgZMjisTDDPZAnqCsuLqiofsELcRy6QAkaY46irPd1UJkNEESp2aZdAuQ9wHQNFkt76h1I0oj7vJDEbxrf8i5G7QGmbwtRB8G+4RPVGfdCNnJ27rHRlTkLBUV40YYygJ2qkBaxEOUQBs6aYA8GuKzUemyAWgVcjM5uK/i0kKVGvXBAOQC9H9fz7YUNxstcfocQCeLnB6bwDl6s8YZGiEYB9DKMkf0tSyuuGuP4q5ruYvOfa4DWKhhEnbvlijkoZWl6hZls4u8bxeibC2LlVcL4a2UZXbXhvZayv/barVa/QWitTau9tPhRAAAAABJRU5ErkJggg==',

	            smartphone: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAAYFBMVEUAAAAAAAD//wCAgABAQADw8AD//wD//wDAwAD//wCgoADQ0AAgIABgYAD//wBQUACQkAAwMAD//wDg4AD//wD//wD//wCwsAD//wD//wD//wD//wBwcAD//wD//wD//wBHb2y0AAAAIHRSTlMAq6urq6uBVqsLq6urq4urq6tAq5aha6thNiAVqytLdhOYuoMAAAOISURBVHgB7Zntcqs4DIZXDzYh2HwQyEfSpOf+73KXE0Gy080MBqfdM8PzszONXl7JSBZ/raysrKysROO2/dZo6Zc/bfabb5PwcYCvAqDbfVv4/xYA5e3t4bcbeC0A0o/3xj/v+ZeA3Wb3ENAC7N+ahxNAW4wCSqAcBSQ+Azi9L/slYAuRQcCOnt0oQMRYoPx4o/3OyyhA8755CPgHB+zPb4kPUEvPSwd66l7BJX78yx5sJb95VQPym8pCt41+/Dqwjdx5cQpUgDRAGltACRj5ImBABShF/LNwAAqZKkByLY1ofAK5TBcgLm4h3oBMRuoXApyXAR+3EEtwMlC1L3uBrWTA6AsiCjugeU4v5Vd7t78Ajl6UKxDrjdg9FUAG7D9fvyltIkoLhzjxN2D9o7hed9xtCtB6PYuRLLhsmEWb2QgWfGw6FrFsTtweWMySUfVzT8/xamQGpqodPd15yeO3hSzA1xbgsJ0TX6efpSQWKLfz4mcy0lRJEEYGvJuloHzuPia3BONqL3fyGQpOwFXuVI6ZZOpDETygnB/P7zP9sToJIFfRR+0LoZ2p0+6nYzZ5JcEUGdofNQuXoJc/Xs3TDjcHkzHOUQ7SIAMSjb/sKFZ2UGBCZrQdWOlprE7Cs2kcUGkSyqkCfg0V6DT+Epz2ch9QBUAzJMDIQhqrL7Tj5En9NmSgVSeWUeljFNBNHsGP+p9WIpCpBVMHpHHAz9WApRg91BlMa8wpFJqBSmLg7q/1GjZTBRi1TKJwvec0gVOIAAOtRMGAu9dUGiggkyiol+ZPE7AKWAWsAlYBDbTRBfxAM1IvQwScIInajmvI793wMHUgqRcPJMY91lUtFCHzwFmrr1qQA29BjRSjv5NNvRl8AIPyWuaR02OlJ1Mnp8/lHRTDWN7MH0QBnYcwd0O76Xfzo/S42SexHh1orBqQT1/aXYa7aQO4BTVQ6+1O9GZ0C1iP5OPl1PkFp6CPT6MGdEHLaTMWk61kLsl4P2/CvmCko/WJrlrmULWP273Ty3FAFeRPV3xc4SWM5toCtM3o5C1wQc5V6+k4LJ+TydSZpYd69kesVJPXY47MI/eP+OWcRWUuir9mhHIsRKln7AlVwfMRNFUyHdPIgM+A7jJ3WZz81K54XJfb2v/Atlw5d7r1rcx3fy9Qtpv9j30xUba7kgWUu2XhVcMp7QimS08afWVlZWVl5f/N39MRN8Py5nBMAAAAAElFTkSuQmCC',

	            emulated: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAALVBMVEUAAAD/c3P/c3P/c3P/c3P/c3P/c3P/c3P/c3P/c3P/c3P/c3P/c3P/c3P/c3MpA9IiAAAAD3RSTlMAq1aBK0RuoSCWC4thFTZMP6heAAABRUlEQVR4AezBgQAAAACAoP2pF6kCAAAAAAAA4PbKaFV2EIaiMZrEtjr//7mXWuy2DPdtYjngeigztJBFso2/pKYTeomsFi62Umk6u4YRnl7/CE90fv1XDTR8k2geKXSUEUWaR+z1P0SUbfhTmTVGZaGGcIkxFs70U+oz+zKkgPurVjK7HBJUDPVKJGYAAekfegiUcHHQRT8So0B8jIp9ImDxwtB2Dp0drXES+CY1AUTy86qAEumrAhvRNltAukBLZc7tp4eAIulPukB7irSn6x7435JOduq1RlUPgYyen1SWlJ8CiiQ4CCBdtuNqthghcPeoQMBlBiapbCh2C+y4Eg4HAbRgxHYI0HGfxegikMI3CS/2vg8KBJyGAGQwu3OaIOBsYDK2pg/JyE+AqhrKl/qYTV9WCgEXkvDJJ9NfYrFYLBaLxT9mCQfDsng1HAAAAABJRU5ErkJggg==',

	            strikethrough: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAABEVBMVEUAAAD/AAD/AAD/AAD/AAD/OgD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AQD/AgD/AAD/AAD/AAD/AQD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AQD/AAD/BQD/AQD/AAD/AAD/AAD/AAD/AAD/AAD/AgD/AAD/AAD/AAD/AAD/AgD/AAD+AQD/AAD+AAD/AAD/AAD/PgD/HQD/DAD/AAD/AAD/AQD+AAD/AQD/AQD/7AD/AAD/qwD//wD/xAD+dAD/XQD+ngD+WQD+2AD/EAD/fgD+HwD+cgD+yQD/AgD/gAD/MQD+RQD//wD//wD//wD//wD/hAAqGgnhAAAAW3RSTlMAq620sAOvqBEKoraSgg68sp1ZJQaln3t2cV0wGRWGlYtWTD84HgjAmGxoQzQgG7iPZGFIOy4sKYgju7urmpRpT01KRjIJGQ25srGkoqCNfWpXU0EyHmExKygcO7Wd2wAAA/RJREFUeAHtmmd+4kgUxNVB3aCAkASSyAgYsgkYjPE4h/HkPBv2/gfZsOrW7gVqvvC/QP9e+XW5qJZx5MgRLGE9aBSMn0YxXPu2PE8Xxk+i4VIiCLHGtcHQwFO661bL5B8kOb/bG1jMQ+AwSv6FjvwZehVOaoSq8z2SDMDnV7axpebnNKrtTANK69TlgmSUo/qiYkApBD4V2fy23Z61DCy7JGLZ+ouyPO+b4PEHMbfV9nM5CYvY21e6dwRR62c7wQsDy4t6h7JsfCZXvRL49oXTqqfkpyKeo+UfuFp+uvQnDfTt/+pIpi4/idZNsPzNdDwS2fik3O2DzWe4rxENs5IBeP2KfTc3f+LXzgwshVl7yfL5U/D4ZmFD9fGcur2mgeUx8alaP2q1+2j554nM5xcTtPmaM4cr9xG2E5yA3Wex6UiuxpedtIU9v7i7udLyC687L8KTv5afetZ0Dz6/1OtW1fyMjDcn6OSdrhjV6+/0CiY4e9xIKlTyF/FjycDSb1e1+QsraRhYmr2uzXT0jOrNIdZ8mkEkqFo/1j5FJ/+zms/LmfzMcrfo3mEeU538KZmEFfD/3vvc/PmyUw8NLIf1FdXuI69vi+DoF06rIyU/oTE6eRe3efInbDw9A0ff1u1Kmz+X13Vw9jAXQcfjJMP7cAqW/+nHpxEjGfTyzcfv2PGfP1+8JJqX776B5f/y9oLkXL5+/2AgeXj/+pLkXLz9Av77f3v3X/kvPj9jz//+8c2ljj5s9OnHE/jvf/rB08nL6wQLdPSqX+vkz6qr2xa4dzibjnX0IcLdFsHyN2KqzX9UnYbg4r94ey3V/IxerQ/wJ5/Okiv5uXMPTv6VcJJ3/jaFtX6arWuxbP4yx9c+rdM20+svoqCJlX/YrEdcRx+7C699Gokl1PqxKrz2KT3GQrmvoPIGHb0KPUcnL8pWKfx3/2ZMmDb/LrrzL+6nlke1+7gN+A+/ridIBru62YHfHFrp/1q3zQK8fieBY4vc/Gcm+slpIriWXybzArz2sShVt99PHuG1j0vz+ekG3bqVUovp45ftWQFf+xBt/pbbR5eug8RiRFPbo6Kf+fDL739nn363rDv/0Tht4nqHXx/+MIzmOiJlffucr7jk/+q3V0+G2Zj4S5on/0EJt/7Pf50/nMci/9ykOg0r6M5/JRlVl79Th7/3B47NtfzOfQn85BNOJNfJn8for33M/rksiyz5syjZoZP/rG3bKvhTPwCPX1nUozLJENxFd/7mrhbR3PzjLfpjp0FCvLzzr53A3/v9EdXJ3wkO6Oy1vzsnMlv/aveuZOAZDmpjixBBKDz5aw5pW9r+Ov/YC0+hEaCffI4cOfInY2NXGby88ZgAAAAASUVORK5CYII=',

	            viveControl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAAY1BMVEUAAAAAAAD//wCAgADAwABAQADw8AD//wD//wAwMADQ0ACgoAD//wDg4ABgYACQkAD//wBwcAD//wD//wD//wD//wD//wBQUACwsAD//wAgIAD//wD//wD//wD//wBaVgD//wAiIyFbAAAAIXRSTlMAq6urq6urK1arq6uBq6ura6sLoUB2Fauri6sgYTZLq5YNLwn5AAADR0lEQVR4Ae3aW5OiOheA4aw3B0gwHEDxYGv3//+V3yfVTkMpe99I2FPtczUXqcrLlNRadqne/mJ9ds03uzy/ZGeVXLvdMdLttq1K6H77xO7ap7r+CwbmoMtGV8a4e0OKhOzITay82L2+aaz3VeSmyxe/fgPgKlseIiOhapoA8JWpJX1wU3weeBT1ZwSo1XKuAMbfrw+m0v93MI6B+9TLFmyBYH0ECNrKj1NZOIDiFIB6yftFAmCsPNAOaOQA1Eve3wzXPBXAiRQLFWyBKCIGtMyIYJcqOAPODwHsZYYBK8sUnLvv+6WAIM+VwP0Mx3aZ+8UCwcsTGjAiSxTc7x9UAIe9TJ2ayHBoiYK+A/zkScEdtPUysGUVuIk/hwpgp16kBkr5YQ3POC0jBdCql+gn9w9s4ZgiNDIV4PqyCWTkgW8K4+4zQe9Pzz6TuXqJHAr5puXflK8PyCDKwEdcI/9kH/+8o+ZlAQpw+9vDOYBgZdaB+1kpgOyVa0h1qvh2khn3E5X48MrXUG07GHSXD+aHkQU2w9nggF2rXqY/cnPsh6kY5bkAxz9nydVL5ZuO+vZIbTc3DhvgfDtRA12mllJDNfcf8KEG5yzr1WIuc/MYaFUC7cx74KFTSRyhfP4ObFQSH6BlsNeFKe77uYZaJZF/B2g3mcMa8pQBPvIj+MQBhXgHuKKxTTH8y0sBV5VEBkYcoEc7WhADWboADfjJPl6mDYjTkaQhJA0IgIycgHQBihsjYwz6lAHuSYBKBHDTmVxCTBtQTNYS76BKGLCBz/FXVOvA+bQBtgQo9ic5lQeA0sImZYCUjJWSOGA/+YpqvNwDki4EtjIOZyo/2UfSLQRTDdSrBmjIf03ABcyqAdmzgGrtAAPZrwlogVUD1H8ywEG/agCgkvkCu2rA5h3wGGDhqJKpQc/8eWK1cfgOKGGnktnCYX4dSD8O3wHpA3pwj9P4otIBUq8DU++ADrxMRDirNcchoBJ6B+ygXDPgcRxa+Fo7YPOrAq5QyFgz3UfSj8MK8sQBUcYiXFRCLeCnHwF6lVI93QoD1CqpC1CN7+es0tr9/KpwH4GtSqw9AkSjTQSoVXJtzR9drtaQbR5+z5xcts23mfq7vf0P/dwpM3Idp1kAAAAASUVORK5CYII=',

	            riftControl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAAY1BMVEUAAAAAAAD//wDAwADx8QBAQAAQEADQ0ACAgACgoABwcABgYAAgIAD//wDg4AD//wD//wAwMACQjwD//wD//wD//wD//wD//wCwsAD//wBQUAD//wD//wD//wD//wD//wD//wCz89QSAAAAIXRSTlMAq6urq6urq6urq6urC6tWoaurQIErIGurdquLlhVLNmEagNWoAAAGW0lEQVR4Ae1abZOjOA+cFRjMS3ghZAKEhPz/X/ms4mkisui5ipdh6662P9wdlRvUltot2cnHvxJ/cT2W0/VPBf+8nUd6oD3f9mZxuPUVSVTTrok/z9GDJiCH427hpxbBrfnByI0Niei8U3hX96Lh4DPqmKVw2CH+0a09Q2QgYgaXz33iJ/WPFSQsxe9mUBJRHP1YR8rkvnc/nvX4jCF8bMj2fjztHB+oQwLGvpz2jZ9nTRDTAuP9c6/4URrTKsbyukd8G5KO8/W74+du9bEdYIyZDQSlqjxss/+6Ob4xJloqL7Q5FyLggEWQ/nyo03hDCp9sP1hwU+CJEfFTw3wyseok5/8zLfB8+U0GLVGBgF9hYMYd/jsjiXBw1oBe+XsufSMiA8FxSrkh1S4fRJSCWJjmXJO0EAwNP/ymS18rogYpD4nuh8NIVET8mCI3hiichZExmxwWHToG/gNDj3e7RFcHJ4qOnxsiiw+CpSc2y23iP7IciGjAywqiElWx7nl4zcCSDzql/8gyEcXivXSYjcFwRaCOcGEUhkuz4OOfg7vIZjEv43AhCusIGnTduIBUo+SRgdwGdohmBlw9D1yQZaf5K7yhYv8hDiTyXFjzE5aln31FDa0TC6P0lED+zGS7mI5CEp9aEmCrIgZcK3ikwKMxnEQ1E7EGzIdCbXlCACu05n+5ZPCHvjoshe/GRJOcELkK8BxGPTRN8BNdWnO74MVHUfdF0bE7+dgwAkTYA8Ihko7F+JyMKTCoeOGe4y8CNTH6twmIIhuiy4fESDREIRjA9xs3n0IiBK9yI6OHBMJ58BA1RJOMmJZjwEPBY9FDx02Z+LmACGeCn+8SECILXqzk5vw4YwbZg0D68N244+mBvYDyyBhOIKwKb/Aj8Mq/5YhwmeYRMLD8z+zhCCls8qkg5NCfwLpDmJAjDvG8L+f9CHN2BYwN0bgdgSOaBBpe1xE5QWBOTWWD5EdY6SYEzq5JSBvsmqZLc36OBhtYs4xfRHCSbQhUixLnTuRxupyd5VRiHgZRbkIAG1TCOAoUpMvjM6bTzOm134rAXXg0KMziCxprHNImFmOsIWrfJhCvExjh0RK5dkgLDRp69X43XiVwlZtsyaEL6RVxJN7h2wuWRnTj2mjIB5sEDkmM+JipPt/uhuZ5CLkvbfCfEQWI7xC83ZH7Z6AMPiZtUAdaNLSKRdzeHkgs3iZqMPGgpCI3ZrC2CYIC8QH7thEcRa0T9BLY4CqigiQK6Qo+TiSWOmATwQZXEdALiqaWH07v78P570P8+eerDb4cg9q2LctyKudrXU8RYvATL+9hg916/Gw5+x6OPXzQl8AkFmvQTi9rNojR8/KSw6l9vgJz7TuoRLDYaUi3wZBoPOh26uGEy3RnToY3dIhXxOtXEf4EMPzm4obmKN1pCYMjsEagJhq9jqep2Met2BkSGNw1An7tmIGE44B8Oyo2iMF9awJXueCGqOo1G4RXqwRS7GNvK8A9nVEkUGk93cuJgaOMOBApNqisT/pm4XlP08pt1y073EqvVRtaDR/y2YmpPGMNqwRCSEBr6Q1S5GNGYSTcVrPhSr1j8KwAcKieabdEnS4BxcxrpQI+Ooy1RtRB4lor8K8AdAgrijQJnLSzhVIBHx2mWiNiZv/3nsugAv46zDnR2jyeaTZ7/toEMTqFvw756B9o02CiSWB0f2EJJfLE5L4JUQ8EhfL+1omGt8B9g6+uM9JdgJQCUOqG9cuHP3BBzSi0CvQKa5ZgIzulP4NxMWMD6JLT2hZ0m8YQFOIPfE1AjbIHxvWcFZFvATRJW2UcLX+Nf/m6Re38ruoVTQ+KBK+rP3cZXHqUQ7HXhGqUA1lfHk+HOVW3kRipi88etQ14U69KEGj7cjpd7xXNl/cp+RdA72xLpLSGJN/85y24tltxQWtSG8Q0I7QRiuP/5bU+3i2RPQem3PGIM9zRbBof490rYmVMjdyPvBD/2wiwzeVKeLTgDUsQr81i3UpdHuGrcqvQ+vVc/utJKTJZsdkPSNSjMpAQIw4SmxqT2iTg2N8UHle0igkB24fXL6ldo7nQCy7txuH1a/rENZrD6VSWfdv25e10+vhO3FEDeS23H/CjImDAtdyOuAgGA67ldgPGss7ybTih0e2MMwlIxe3PYOynjz+CW8k4Xj/+Q/iL/wEs0FUtYkz0LgAAAABJRU5ErkJggg==',

	            daydreamControl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEyNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEyNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiMyODI4Mjg7fS5zdDF7ZmlsbDojQTBBMEEwO308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01MC42LDExOWgtMC4yYy0xMC4xLDAtMTguNC04LjMtMTguNC0xOC40VjI2LjRDMzIsMTYuMyw0MC4zLDgsNTAuNCw4aDBDNjAuNiw4LDY5LDE2LjQsNjksMjYuNnY3NEM2OSwxMTAuNyw2MC43LDExOSw1MC42LDExOXoiLz48ZWxsaXBzZSBjbGFzcz0ic3QxIiBjeD0iNTAuNyIgY3k9Ijc5LjkiIHJ4PSI4LjQiIHJ5PSI4LjUiLz48ZWxsaXBzZSBjbGFzcz0ic3QxIiBjeD0iNTAuOCIgY3k9IjU4IiByeD0iOC40IiByeT0iOC41Ii8+PGVsbGlwc2UgY2xhc3M9InN0MSIgY3g9IjUwLjQiIGN5PSIyNy41IiByeD0iMTYuMSIgcnk9IjE2Ii8+PC9zdmc+',

	            // Created by Arthur Shlain of the Noun Project.

	            gamepadControl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAAYFBMVEUAAAAAAAD//wDAwAD//wBAQACAgAD//wDw8AD//wD//wCgoAAwMADQ0AAgIAD//wCQkADg4AD//wBwcAD//wD//wD//wD//wBQUAD//wD//wD//wBgYACwsAD//wD//wCi9gSrAAAAIHRSTlMAq6urK6urVquBoaurq6sLq6uLq0AgFZarazZLq6t2YfI1sDIAAAUFSURBVHgB7ZnJdrM6EIRDScwDiBkP9vu/5ZUs+lpxbEmELP4F3y7nGLro6kGQrwMHBwcHBwcHB7yPJSe++cKRn+WFZz7uCD6eUxBIz7X/ladlAjEtp1+GX/DC4vk0PUUnpn57+PqOB4JFEpZAkcU+prV4wHJ5Yc5WCVs9HCZIyq4KVqpOQNI6kxBDkc8BMedQ3DfF7zMVPgy+cREAshO3skDSBN9pILnVG+JDEgU/aOBDWQSvFCWA1lvBACApgjdcEjjJybRcQOTkYQ5g8a2/7Gd8omAuGrJea01CQ0HsJyCl+HuoKFeJmYPBa4gAuAR7yVW9ymI2KlIAqY+ACbgGRIiVYCMl0OtyZua9uF8Cqv0CAIxrPQdE7pWCG9XxPgEMOMu7nSkDigrA2dkCAApTgBL9CwERgJjHAKJvqlIPB0SwS0CVJ0BJEwPJfAUSPQ86YHKPcirbC5OUJIApfJqzWCOX6xxoQPNAe+AxBC6URAUJeBAGbgRWLp2U3M1YSQKJRx9kQLFHwOVRaGMLlIHiCrT8i2e6Fhhwctfgs4wWLpHTiytaLwFXvXhHuk8C8Oc8aJzjmAMlCXj5ceolgJ6RBKyucy2gA252AWfg+hSQxpJeVqZi8hLQ6BCcBAjd+nd93xBonU0QBXtqIARw43H2CFisS5AvtF8AeDXBji5gVPUdA8DmBJrSmNAWjDyHkSQnAZGiCrwVUP+jERRfwVx9SNbtGcVzzlgXQpJBUnRXdqW05o424IB4FdByvk0ARZqGx+E6f1kRd8cmYAGxaxsK3Y4nSv7KDKR+m+CPzgPjOoOJAsgch4Hu/SE02AjTZsdmSj36kKbdfjoAS7/g9YmEvQ0AOFottAssQrq+NPqfcK6j0WF2yCBhHzXkCQARkYIf8Z3riAPMOudXGutRhILODWvmN9bc7KvIbivaFpLo06tIlpKCD4TWPrzTrd9RrW/nY/u+UnJ95q1juO5ibYLZloCp/pLUE9C97fyehomwDojavYosJ/3/D/vMpAhC0Im3tvZSaetDaxPQIqNahUlomps6nqO3fBdIAteVdMCrYBLRYYcOtrY3lti6iixXUoQUaPSe1CxA8xDESV9i7aWb3yp6pVq/89TLw+MGWL69TTEg4+qvDMh/14cLEDnmUJammZ5EydPLGsr0ApI2bUEJ2NqH9uKZI9XpK/nDkMxUXhofkJIimK/b+9BePAku0j8BiehUIs1aGrSogml5lZrKoU8f+nfhdd2rRRgW69ey9tsI1b5XYRiuW0Fs70P++aoZClbQCziAbDCvbc0PmxEUjX8furuQ3C2jrosYnvGJuoVENNElutKPQ/8+dHXhVQW8wSAdfy4yg2logdK/Dx1dOOs9x1OstO9MHBZQ+Lh+1GXk34f2LkxI89jHyxL3n16u6lN8v8XxQPn80FMA/LuQDKCYG5iAclsfArAYsBlumOB1Lh0AYTFgO3cywfNcSifS3QYQNZngOQgGINlvgMMEyoD/WwkZsN8EdxG2QOdrgL8J4t0cqD+9FYg/M8Bck4Trm3mdvVpW7TKAxtH8OonRW359eXErq/2j+fz/p6BF/pYWZg5CATUy9jFmQNI9PU1okX40AeJC//CkZO1iyACw9Z7Mfk9a6xCMAbvjmwqAkpVQZI6cxhlApJSrfdQLntxG58/PrVa68K+/YrxPUEzL4Jk1zuuvP4bTPf81Dg4ODg4ODg7+AwlERtddq/a6AAAAAElFTkSuQmCC',

	            // Created by Garrett Knoll of the Noun Project.

	            fullscreen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAAUVBMVEUAAAAAAAD//wCAgADAwABAQAD//wD//wD//wDx8QAQEADQ0AAwMACgoADh4QCwsABwcABgYABQUACQkAAgIAD//wD//wD//wD//wD//wD//wCYxtj5AAAAG3RSTlMAq6urq6tWK4Grq6urq6urq6urq6tAFZZmiyDXexdmAAACxklEQVR4Ae2a3W6cMBCF6wMkMeYf2qR9/wetdiPnDJtEYs6ialX5u9obW9/i8Qwe82NPofDz6Vt+/ZN5XvAtzx4BYZ7HEeirLxgcAto8HNiEL6h9Avo8RaAIPJRAY0h+gakhmyTQn5aIYqctQcJJLGIMbBGnsMpBuOAMkhKEU7hSAZiDTpuA2L7/nF0C6LIxI0igx8cTHSufQPaOQGqDyAygys/SKYA6XGkAjEGjg53GJ0D1CcCkBcAADHyQXgEuHgAlDOzAGopA3D7+SBTCoOKjWyEJINml9GKCZ4EogNUGsw+zfbaoCawAFrudXZgEkoCYBIHrwI4JbQsOLvYz7ZdaEdj4FLvLz3AErnrP9VuDJBAaTrMwIg6w0feiXgdRwNYiRsQB8oqxGikCOYGYUKqOMVJ2vIavLtBGYOBmcr+DTNx+mkDomE4aHKcOZrRXIPOpFi3VYdrbalQj4xLgKiowgnQBxrEX7iGHAHnOy8idLFWj3sg8cXqPAGuRXI10gUyvvJKMrEaygH23aoQInMJJAqHWBJoiUASKQBEoAkXg/xFImsBylsAETWBozxHopD6VHaULmNORB56K3AJvL1d+A3HXapC7lHxDfH1554/vXKB3a+2JQj+Y2Lf7rjkM2xq1S4A3HVmg3XVJjmK7I1UW6Hnz4jgd7/pEDmx/SD6ef+411ccYbrpbusCi9QpveoRJFOBodku1LumqCiS5X3zTJ14kAUaQs2POAYxjRWDe95om4a6AYZAEAWYRoRrddreiIJBXndVIrUWV2q5vbK/JzWhmkASs/3znnWFUBGpbjQRsLWoEgeH+i0OTPSe/gN3FQcRmEq/AZG8+VFqbS30Co7350OlMNfEJMIkN1T30TKetQyCTzv6AwinQ4xxipwnM2PH25OAVltRKAtN5X9N1FChfUhWBIvAAH7WW74of7NPuQuEvZ9lH5JznAfgAAAAASUVORK5CYII=',

	            world: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAAzFBMVEUAAAD//wA5OTlMTExGRkZBQUFTU1NiYmJZWVloaGhdXV2cnJvQ0BCqqqr09AOLi4vp6QeenhxLSzpbWzR0dHSurimysrGioqLa2gmUlJSBgYHt7Qvh4Q9iYjl3dyfY2BfCwhFMTD2mpifJyRu0tBRwcDFrayqHh0mIiDGEhCT39wOTkzW7uxmoqBhOTi96elN8fDxra0CRkSBgYFDX10qZmSjBwSDr6ytKSj5JST3ExEyzszOAgCGbm0O7uypNTT1CQkHFxYWoqHdBQUF5xNXLAAAARHRSTlMAq6urq6urq6urq6urq6urq6urq6urq6urq6urq6urq6sLq6urq6urq6urq6urraurq6urq6urq1Z0q6urq6sgRaurkO+wxToAAAiSSURBVHgB7ZgNc9rGFoZ5F4RDortZSVGuXEkgEGC+P7BxndiOm/b//6e7R0cSi+VprzDOnTvjp51px+OZ98l7zi5LGu+8knfesf743+Q+WZZY7YYqdZylPdxPRrHb/3Xpljd17KXjhAASH4DttlqW5tuvSHe7duKMXMvq+hI59u0iHWya2qL1xhPpe8NlLCzLnSRysW1tfTUYDNJw0mzGk4W091uSeMP4qTMWOj5eSDVxW83mVqZNzQDpdVOz0T8fxM03U/ASj+JHNtSk1WrpxAjzZrPdbs8hJ+2MeYR08zYK35Kl0PmxDTng+OYAuM5zAb/NbGzYm+35z0R3Bl2/uwDsOM/fStgc+uGDD/SuPxBaIUIkJ9Z5p/+QAInoSsh9i/KJW2CQpRO3QKQN2GGugH3rnPU/CBtAAKi4zN8C2HA8ER0MrrUNok3rbGOwhBA7aGbRIb89AJAnftSsJRno/7nm+2EGv/XHufKJBTLSScz5bQmEHM/MAUTrxxQZ8+sIkXt3vvwpEIJR6WCyaVNez8i/uLLDUILprbO1UNu7c+UvASxiX+GAVCr64RO9Xi/CgdntWgtpgzkkG7w+f0j5lh7/dp8q/A2zMF1fXFx8PBg8vXL/BeFk+Va+gPFmP0gjiSPCXu/et6HRAprSIO6/6vwX80dQ5PMGtjnrKoMiO8Q6U+k8M3iNgCDGAJR7EGhrrkHQ7hGdgntoflwcGUStVy7ASgKIOb9VFDCBJuL8zoEvM2iujA7aPhYnXwdPrs53AwA7yyiAuIWmZ+R/Ye55CKaBjcmpAt3iANrWQYANwrJrTv+tYAbNfWlAF7OUo9PyV3a+ANKjfLOBLQif83X654LfvoNYGwbtDeRpJ2GohHAVAMcooJ0JzHMBzufsS/4PiFT//DCEBbqn5LvAMLsBlKhM4BbEVZl/eXn56dOnS3K4KSrolBWkCE+pwAOQQDOyKg1ELJDnUzqjHf6sVKBtZ/EpR1ACkIAtrOcNfEDGmvOz+H9rWCE8ruCKZFVUvwK+AIFwxxMwG9gggwoo8v+lYYfvZgVXPCwf8SmXMBtA7bxnKzBABhdA8TqfIYOynrUfIWPeVotTLuEVJJjAH5kr8IO7KQrg+CyfDHgNf9xHYKI1HZu7EwSGwIwVWGKyyRvogeh1OlkBnP/161d2oBlIiYLwkZ6p1zKuP4FsC3fjIQyU7evnEFiAJpAX8DXj58+bm99DGKTz7DZsNxdJPQGrWAFXCHe6kC+8PELV633//v1GZxIv/Ir92CnuovYW/doTSAAkQmNZVrxfBKjBTM5mfA5ygaby6gq40ExZgE+BfgnZEf4B+fvNDTIejwQWk7oCXZ6A5vgiut7cypCIer2QIzP0LH7+/JqtoQSRUn4pMPHr5Lf4DPAEKjdhiox7XkLewRwW4ArCI4EYdXdQAdhVBOgisAuBjnEKmPIgElemQFP1T1gBzxQoK5AoPou+lPeAWcCnP5Hh5/ksYHv1BMbQiIoAVYCDQF6Bpvzza4FLZNweCQxqCjgAbEPA2EIUDRdXIRkUUP7nCER4JLCvcxe6vINLUalAszEEik+jMp7yL/NXCcp8Ehh16z1HbQC7fxAgg/I9kMdTAZ/LLTQF6lwEy5UIAIzFSzOYlwKFAStQOr/LfntExuPHwwSak24dgcCFZlURIIMBmPVHNjh6lF3S0/jLFTJ8owBXjeoIIIBGFLwo8OFjaaAVmM9ZfqeDjJTyWWAbYVpnB4DZzBQwDUqB3IAVGIrX+blAryxgL4E6DVgKgJy9LLAwBD4++25E8ZqLXi7ABcwVgKDWPeBJaJTz0hbYhYDG+Hr6hehkXLAA/8p2oED53ToClnBDZAQ7zxQgCoE2G7DCgQsiF9DpETJSd9eowZ0Qh+egGk4906AUYANW0OThhkAYglHzlrWr+R5QgFQokLYzHbGBIWAqGOi/NEzDkP05vtlsWd2aAhQjvKGsPElHQSHABqzAFuurue/3IhjIW3pLt1rWqKZAQgKa8TJAFaVJB4OBz9z2NBIVlD+hS5AEXK/mq9jhBxnhdpc2aqPCGZWU51vdp5rfC7r8WVASd53kv9SIUt9GRpnPK1AHseI3sYmlGY32gdJU+pZ2r/fD96+urj9oWMDmfCrA8mp/O1eAUxEgbDBNpm1C9x6RCxj5d7W/HQ8Bu4zO/hVVgaqCKbAoB8ATqAUtgRTPOBJoFfkvOEgQgzKfz0At/hIS8ESlA0OgZSocSTSRMSnyrW6/URuawU4851iADdiBLZgtMmKKp3wRN+pjjYFAiGoHS0OAFQwJ/mcCQlI+CYiHmgUwXQWsRAXLMQRYocIARMrxJxTAeDbgVCsQhYBVGFQdUhD7It+pXQDjSCjxDMsQKAwqEi0JIuZ81/Yap/GkZrPpcToxKgQ0h3jTJQYRcLwjh41TcSVCp7IGhYBrmQqmx54nYFmW50gEd42T8SSAZLo66sAFM7JyWs9JQXjeJAGQWI3T6Tv8MAuWXVeUHAtUJdgwCKCxx6LxGu4CDBNkqMQZe4IIqgIm3jJUEhnDsRD9xquwJDx3mkjkBPbSKQSEOModjSaObwfIkcmUWvuj8UpcGQiNt0sUDFimAM+QSj6IjG+NV+NhKBh3vFvaAf4WZfMbcnimfDaYChP3ATOlCWwDx3F2o5FLXUEj3fPkM55kgxIFwhEvMoRmeq585k5NqxmwxUusDgPoN85Gf3lkMH1JwOKb2gYQZANonJXx0NwCENLILtkVC2A1zszdcixKEhCCMSU8yvfEatVvnJ+u44mcMYhxdQEkEKy6D6vGm9DvRsVngl2uuokbAPYi8RpvRj8eyiBxuuMx7/oR44dIyZnD8W+HpS/lAEColHJyEju7IFW0WH1r/AIsPexxcrgLh9qh6wSLMaf/Ep4sMXakLNfQi3nvfz1/3TX+z3nnnXf+A3ZJ6hYGox7HAAAAAElFTkSuQmCC',

	            // Created by Shawn Erdely of the Noun Project.

	            gear: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAAYFBMVEUAAAAAAAD//wCAgAAwMAD//wD//wDw8ABAQAD//wDAwAD//wD//wD//wD//wD//wDg4ACgoAD//wD//wDQ0AD//wD//wBgYACwsAD//wBwcAAgIAD//wCQkABQUAD//wBkLwXoAAAAIHRSTlMAq6urq1ahq6uBqyBAKxULq6uWdqtri6urS6urNqurYepOiRMAAAQVSURBVHgB7ZrdkqI6F4a/PIEAQeQHAVGx7/8uv90VndG9yMGQNFO7yue42/VWsv7D/z58+PDhv0tZ3VJHVR13t37oeKf42lXEDcltTwEpkFm76G8WawHSPQUUcFevaBj2FDBCrl7Jofhxqy9eBqg3EjA/bH7uKMpnBEKm3gF+xWdPN8c2XxcAPH63AqveaaB6RCgARR036XQ4+tpFoRBgH3FYDzhMGTPsDXDOG6Ar/3GGHlr1zuLElSOQ5S1gDvHSHsBFKXUG+OoBcvXOxaVDcIczZcAhov0sf5pxtOrfnHigXVhIBUH2E+VIGoCTVpJLA9DkL38ZRUFpnvYd03m5qnUSraf3M6EKzz7O/haSDExwjRyd/c0Kxjq87E1qK3fgK+wCgEVtRwNlYAQ0KoRT4BGUQKICyCCsLnVwUtuxwXFQAecgFzhE6P5atY2cGI3aAORqEy4NBDP63OC+WIDM6nU/bSM1BUdASXTGb06TkkQrhwZ5B/eMd07iFBIg2hQkTxcww+07xMpDD2sZu4l0Ar30gRNg5pdbGgC0DMIxsBWuDmk/Anf1Riu73qqTZ5AA45DOG2fnsjc8sDK9DELsKMP1zJOu2hJ9HvvXp32poJGtsmNDQi4BTlZfcumAdPX6fwg3uN61Plu2BOQBrFrj6u30Usi8NSHdUAO0WmPxzsG1ce4qmaDfEHwXX4vhO84vUbcChvfCV4IAX4GpfP1TAl0sATn4fwtQqwAbWqHkj0+zgzyWAODPr7P42wJGyHe8ggAfCHDCK+DNnnsIUJl/JzqD9d9brETUwuC/totfQKxUfAeO3tbp6qsFQ7RipBpPYq877wTRQrqpHNtWa9mPeorrgDyAaz7p1rJpVVLgW0idVxUMgPYtrjD1nzeEg+HBSV4Cs7SPFUqf9OW2kaRKXVM6ydUL/asnViNSpwKKwjWlIXzJ+ThpAIbb0/0L1uxPMEbZ0stO63m6phjSvgCAZe1v5livE5NMBw2v2FwJRMKIvKa5txmOpk3UCpHekeoOrFonyS/6ksvsF3U877fvqTIX/2HMwCVgU1qEO0DAkmoKdwMTtqlsQyPhFrqobGD+q6vac+Ad1ECrtnMBDrsFgSQB+ghp4K62cc3cKiGIOuDJ5ASmjP9otSw+Pcli9fXNfvxns+QE0Kw9nOkGILsL+3EUTM/k6pDZoX1vIZNGvBeFKUD/fp81IJskgGE2j63tXTychiuw11/rrlTmJ+12l8cCyKYFYT+M44ijc14N+FJeisNUcT9gGADoH1EtZxALD4uVARiP8T9dorvJ2VkI+F5dmy794Y9YBrhE7UCDZ+crsKN9+RHJBMWeAiqAxp71N609wc5fUtUGQbXvx4R9xyum39W+o6rm9Ju52t/4hw8fPkTk/7PwOIFSnWjiAAAAAElFTkSuQmCC',

	            // Created by Guilhem of the Noun Project.

	            backArrow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABkCAMAAAB5NchtAAAAJFBMVEUAAAD//wD//wD//wD//wD//wD//wD//wD//wD//wD//wD//wD1AQnGAAAADHRSTlMAq2uLC6EgdjuBKxXxMof/AAAAfElEQVR42u3ZMRaCMBREUX5IQGH/+8XC0tbMUe7dwJsiqf4CAAC/4NzH+gj2t1EvR7hfe7hfz3C/Qo+gr+9+09fX19fX19fX1/++raZpffmgJmrpAXX7AS3+CPPf0AILLLDAAgsssMACCyYcLAInm8DRKnC2Cx4uAQDgX12bvgZPVbPIBgAAAABJRU5ErkJggg=='

	        };

	        // Imports.

	        this.util = util, this.webgl = webgl, this.webvr = webvr,

	        // Controls.

	        this.controls = null, // DOM element wrapping controls below.

	        // Buttons (DOM elements).

	        this.vrButton = null, this.fullscreenButton = null, this.worldButton = null, this.poseButton = null, this.exitFullscreenButton = null, this.exitVRButton = null;

	        /* 
	         * Styles for the 2d Ui. zIndex values, added to the current zIndex of the 
	         * <nav> or other navigation element (control panel).
	         */

	        this.styles = {

	            controls: {

	                boxSizing: 'border-box',

	                zIndex: 10

	            },

	            modal: {

	                zIndex: 50

	            },

	            button: {

	                backgroundSize: 'cover',

	                backgroundColor: 'transparent',

	                border: '0',

	                userSelect: 'none',

	                webkitUserSelect: 'none',

	                MozUserSelect: 'none',

	                cursor: 'pointer',

	                position: 'absolute',

	                top: '0px',

	                left: '0px',

	                width: '64px',

	                height: '50px',

	                padding: '12px',

	                margin: '8px',

	                zIndex: 100,

	                boxSizing: 'content-box',

	                display: 'inline-block'

	            },

	            em: {

	                zIndex: 101

	            },

	            strikethrough: {

	                zIndex: 102

	            },

	            progress: {

	                zIndex: 7999

	            },

	            menuContainer: {

	                cursor: 'pointer',

	                fontSize: '16px',

	                position: 'relative',

	                maxHeight: '180px',

	                overflow: 'hidden',

	                padding: '0',

	                borderRadius: '8px',

	                zIndex: 8999

	            },

	            menu: {

	                width: '100%',

	                height: '100%',

	                margin: '0',

	                padding: '0',

	                overflowY: 'auto',

	                fontSize: '16px',

	                lineHeight: '18px',

	                paddingLeft: '0px',

	                paddingRight: '18px' // hides the scrollbar

	            },

	            menuItem: {

	                margin: '0',

	                padding: '0',

	                listStyle: 'none',

	                textAlign: 'center'

	            },

	            spinner: {

	                zIndex: 9998

	            },

	            tooltip: {

	                position: 'absolute',

	                fontSize: '14px',

	                lineHeight: '16px', // vertically center

	                fontFamily: 'sans-serif',

	                padding: '4px',

	                padingBottom: '0px',

	                borderRadius: '9px',

	                left: '0px',

	                top: '0px',

	                backgroundColor: 'rgba(248,255,164,0.7)', // light yellow

	                zIndex: '10000',

	                display: 'none'

	            }

	            // EventHandler ES6 kludges. Rebind handlers so we can use removeEventListener.

	        };this.vrHandleKeys = this.vrHandleKeys.bind(this);

	        // save old DOM style

	        if (init) {

	            this.init(this.UI_DOM);
	        }
	    }

	    /** 
	     * Initialize our Ui
	     */


	    _createClass(Ui, [{
	        key: 'init',
	        value: function init(uiMode) {

	            if (!uiMode) {

	                console.log('no mode provided, setting default');

	                uiMode = this.mode;
	            }

	            // Listen to fullscreen change events.

	            document.addEventListener('webkitfullscreenchange', this.fullscreenChange.bind(this), false);

	            document.addEventListener('mozfullscreenchange', this.fullscreenChange.bind(this), false);

	            document.addEventListener('msfullscreenchange', this.fullscreenChange.bind(this), false);

	            // Click event for closing open menus and ui elements, if the user clicks outside of them.

	            document.addEventListener('click', this.clickChange.bind(this), false);

	            // Keep track of whether mouse is down (for desktop dragging).

	            //document.addEventListener( 'mousedown', ( evt ) => { this.mouseIsDown = true; }, false );

	            //document.addEventListener( 'mouseup', ( evt ) => { this.mouseIsDown = false }, false );

	            this.createUi(); // starting configuration
	        }

	        /**
	         * Error Condition when there is no WebGL
	         */

	    }, {
	        key: 'initNoGL',
	        value: function initNoGL() {

	            this.modalMessage('WebGL is not present on your system');
	        }

	        /** 
	         * Error condition when WebGL fails.
	         */

	    }, {
	        key: 'initBadGL',
	        value: function initBadGL() {

	            this.modalMessage('WebGL is present, but failed to load');
	        }

	        /** 
	         * Set the World object, which has a list of Worlds and other data 
	         * we can display in our Ui.
	         * @param {World} world the current World.
	         */

	    }, {
	        key: 'setWorld',
	        value: function setWorld(world) {

	            this.world = world;
	        }

	        /* 
	         * ---------------------------------------
	         * Ui SETUP AND CONFIGURATION
	         * ---------------------------------------
	         */

	        /** 
	         * Add a CSS rule to the first stylesheet of the browser. use for properties (e.g. :before, :after) that
	         * can't be easily set up via element.styles.xxx methods.
	         * @link http://fiddle.jshell.net/MDyxg/1/
	         * Example: addCSSRule("body:after", "content: 'foo'");
	         * @param {String} selector the CSS selector.
	         * @param {String} styles the associated CSS styles.
	         */

	    }, {
	        key: 'addCSSRule',
	        value: function addCSSRule(selector, styles) {

	            var sheet = document.styleSheets[0];

	            if (sheet.insertRule) {

	                return sheet.insertRule(selector + " {" + styles + "}", sheet.cssRules.length);
	            } else if (sheet.addRule) {

	                return sheet.addRule(selector, styles);
	            }
	        }

	        /** 
	         * Set the Ui controls (visible, active, inactive) by the current mode.
	         */

	    }, {
	        key: 'setControlsByMode',
	        value: function setControlsByMode(mode) {

	            switch (this.mode) {

	                case this.UI_VR:

	                    this.exitVRButton.show();

	                    this.vrButton.hide();

	                    this.fullscreenButton.hide();

	                    break;

	                case this.UI_FULLSCREEN:

	                    this.vrButton.hide();

	                    this.fullscreenButton.hide();

	                    this.exitFullscreenButton.show();

	                    break;

	                case this.UI_DOM:

	                    this.exitVRButton.hide();

	                    this.exitFullscreenButton.hide();

	                    this.vrButton.show();

	                    this.fullscreenButton.show();

	                default:

	                    break;

	            }

	            //TODO: switch() toggle control configurations.

	            // TODO: use this to control event handler response

	            // TODO: bind all the event handlers as separate functions in the constructor
	        }

	        /** 
	         * Global test for click. If something is open, and the user clicked outside it, close.
	         */

	    }, {
	        key: 'clickChange',
	        value: function clickChange(evt) {

	            evt.preventDefault();

	            evt.stopPropagation();

	            // If the World menu is open, close it.

	            if (!this.worldMenu.contains(evt.target)) {

	                this.worldMenu.hide();
	            }
	        }

	        /** 
	         * Create the default DOM ui.
	         */

	    }, {
	        key: 'createUi',
	        value: function createUi() {
	            var _this = this;

	            console.log('entering DOMUi');

	            var c = this.webgl.getCanvas(),
	                p = c.parentNode;

	            // c.parentNode should be a <div> or <nav> that gets ALL the DOM styling. Don't touch <canvas>.

	            // TODO: set local style of <canvas> to width=100%, height = 100%

	            // TODO: test with fullscreen <canvas> style (attached to document.body)

	            // Set some local styles overriding any conflicting styles for parentNode.

	            p.style.margin = '0';

	            p.style.border = '0';

	            p.style.padding = '0';

	            // Check for control HTML markup, create if necessary.

	            var controls = c.parentNode.querySelector('.webvr-mini-controls');

	            if (!controls) {

	                this.controls = document.createElement('nav');

	                controls.style.zIndex = this.styles.controls.zIndex;

	                controls.style.position = 'relative';

	                p.appendChild(controls);
	            } else {
	                // create control bar, attach to <canvas> parent

	                this.controls = controls;

	                if (parseInt(controls.style.zIndex) < this.styles.controls.zIndex) {

	                    controls.style.zIndex = this.styles.controls.zIndex;

	                    controls.style.position = 'relative';
	                }
	            }

	            // document.styleSheets[0].addRule('p.special:before', 'content: "' + str + '";');

	            // save the base zIndex to add to individual controls.

	            // Create an information tooltip on mouse hover (only one).

	            this.tooltip = this.createTooltip();

	            // Ui for HTML5 canvas present.

	            if (c) {

	                // WebVR object methods to connect.

	                var vr = this.webvr;

	                console.log('creating DOM Ui');

	                /* 
	                 * ================ VR button =====================
	                 */

	                var vrButton = this.createButton('vrButton', this.icons.vr, 0, 0);

	                vrButton.tooltipActive = 'go to vr mode', vrButton.tooltipInactive = 'vr mode not available';

	                vrButton.inactivate();

	                vrButton.show(); // initially .active === true

	                /* 
	                 * Set the emitter (pseudo-event 'vrdisplay'). If the 
	                 * device is recognized, use a custom icon. If there is a lag, 
	                 * the inactive generic VR icon will be visible until the device initializess.
	                 */

	                this.util.emitter.on(this.util.emitter.events.VR_DISPLAY_READY, function (device) {

	                    if (device.displayName) {

	                        var dName = device.displayName.toLowerCase();

	                        if (dName.indexOf('vive') !== _this.util.NOT_IN_LIST) {

	                            vrButton.src = vrButton.src = _this.icons.htcvive;

	                            // Look for emulated display.

	                            if (dName.indexOf('emulat') !== _this.util.NOT_IN_LIST) {

	                                vrButton.emulated(_this.icons.emulated);
	                            }
	                        } else if (dName.indexOf('oculus') !== _this.util.NOT_IN_LIST) {

	                            vrButton.src = vrButton.src = _this.icons.oculusrift;
	                        }

	                        // NOTE: FF uses OpenVR HMD, which doesn't return the name of the device!
	                    }

	                    vrButton.activate();
	                });

	                // If the VR display initializes but crashes, also turn off.

	                this.util.emitter.on(this.util.emitter.events.VR_DISPLAY_FAIL, function (device) {

	                    vrButton.inactivate();
	                });

	                this.vrButton = vrButton;

	                // Go to VR mode.

	                vrButton.addEventListener('click', function (evt) {

	                    evt.preventDefault();

	                    evt.stopPropagation();

	                    if (!_this.vrButton.active) return; // don't process click if inactive

	                    console.log('clicked vr button...');

	                    _this.vrButton.hide();

	                    _this.fullscreenButton.hide();

	                    _this.exitVRButton.show();

	                    // Set the mode (DOM -> WebVR stereo).

	                    _this.mode = _this.UI_VR;

	                    _this.fullscreenChange(evt);

	                    // Add a keydown event to make VR entry and exit like fullscreen.

	                    addEventListener('keydown', _this.vrHandleKeys);

	                    // Request VR presentation. This may take a few seconds (spinner).

	                    vr.requestPresent();
	                });

	                /* 
	                 * ================ VR exit arrow =====================
	                 */

	                var exitVRButton = this.createButton('exitVR', this.icons.backArrow, 0, 0);

	                exitVRButton.tooltipActive = 'exit from VR', exitVRButton.tooltipInactive = '';

	                if (vr.hasWebVR()) {

	                    exitVRButton.activate();
	                } else {

	                    exitVRButton.inactivate();
	                }

	                exitVRButton.hide();

	                this.exitVRButton = exitVRButton; // save reference

	                // Bind our pseudo-event to activating the button (so it waits for the webvr display).

	                this.util.emitter.on(this.util.emitter.events.VR_DISPLAY_READY, exitVRButton.activate);

	                // Return from VR button listener.

	                exitVRButton.addEventListener('click', function (evt) {

	                    evt.preventDefault();

	                    evt.stopPropagation();

	                    console.log('clicked exit vr button');

	                    _this.exitVRButton.hide();

	                    _this.vrButton.show();

	                    _this.fullscreenButton.show();

	                    // Call webvr presentation exit (which may fail).

	                    vr.exitPresent();

	                    removeEventListener('keydown', _this.vrHandleKeys);
	                });

	                /* 
	                 * ================ Fullscreen button =====================
	                 */

	                var fullscreenButton = this.createButton('fullscreen', this.icons.fullscreen, 0, 72);

	                fullscreenButton.tooltipActive = 'go to fullscreen mode', fullscreenButton.tooltipInactive = 'fullscreen mode not available';

	                fullscreenButton.show(); // initially .active === true

	                if (this.hasFullscreen()) {

	                    fullscreenButton.activate();
	                } else {

	                    fullscreenButton.inactivate();
	                }

	                // Attach DOM element directly, and via controls DOM element.

	                this.fullscreenButton = fullscreenButton;

	                // Go to fullscreen mode.

	                fullscreenButton.addEventListener('click', function (evt) {

	                    evt.preventDefault();

	                    evt.stopPropagation();

	                    if (!_this.fullscreenButton.active) return; // don't process click if inactive

	                    console.log('clicked fullscreen button...');

	                    var f = Math.max(window.devicePixelRatio, 1);

	                    // Get the current size of the parent.

	                    _this.oldWidth = p.clientWidth * f | 0;

	                    _this.oldHeight = p.clientHeight * f | 0;

	                    // Set style of enclosing element <div><canvas><</div> to screen size.

	                    p.style.width = _this.util.getScreenWidth() + 'px';

	                    p.style.height = _this.util.getScreenHeight() + 'px';

	                    // Set the mode (DOM -> Fullscreen)

	                    _this.mode = _this.UI_DOM;

	                    // Fire the request fullscreen command.

	                    _this.requestFullscreen();
	                });

	                /* 
	                 * ================ Exit fullscreen button =====================
	                 */

	                var exitFullscreenButton = this.createButton('exitFullscreen', this.icons.backArrow, 0, 0);

	                exitFullscreenButton.tooltipActive = 'exit from Fullscreen', exitFullscreenButton.tooltipInactive = '';

	                if (this.hasFullscreen()) {

	                    exitFullscreenButton.activate();
	                } else {

	                    exitFullscreenButton.inactivate();
	                }

	                exitFullscreenButton.hide();

	                this.exitFullscreenButton = exitFullscreenButton;

	                // Return from fullscreen button listener.

	                exitFullscreenButton.addEventListener('click', function (evt) {

	                    evt.preventDefault();

	                    evt.stopPropagation();

	                    if (!_this.exitFullscreenButton.active) return;

	                    console.log('clicked exit fullscreen button...');

	                    // Fire the exit fullscreen event (also triggered by escape key).

	                    _this.exitFullscreen();
	                });

	                this.exitFullscreenButton = exitFullscreenButton;

	                /* 
	                 * ================ World select button =====================
	                 */

	                var worldButton = this.createButton('worlds', this.icons.world, 0, 144);

	                worldButton.tooltipActive = 'Select a World', worldButton.tooltipInactive = 'No Worlds Available';

	                worldButton.activate();

	                worldButton.show();

	                // Attach DOM element directly, and via controls DOM element.

	                this.worldButton = worldButton;

	                // WorldButton controls the scene menu.

	                worldButton.addEventListener('click', function (evt) {

	                    evt.preventDefault();

	                    evt.stopPropagation();

	                    if (!_this.worldButton.active) return;

	                    console.log('clicked world scenes...');

	                    // Get a list of Worlds, and display to use in popup select menu.

	                    var worldMenu = _this.worldMenu;

	                    var scrollTo = worldMenu.buildList(_this.world.getWorldScenes());

	                    worldMenu.activate();

	                    // Define a scroll to center.

	                    worldMenu.show(scrollTo);
	                });

	                /* 
	                 * ================ World Scene menu =======================
	                 */

	                // Note: controls is always box-sizing = 'border-box';

	                var menuTop = parseFloat(worldButton.style.top) + parseFloat(worldButton.style.height) + 10;

	                var menuLeft = parseFloat(worldButton.style.left) + parseFloat(worldButton.style.width) / 2;

	                var worldMenu = this.createMenu('worldMenu', null, menuTop, menuLeft);

	                // Allow World selection.

	                worldMenu.addEventListener('click', function (evt) {

	                    console.log('World name:' + evt.target.innerHTML);

	                    // Commit.

	                    console.log("CHANGING WORLD TO:" + evt.target.innerHTML);

	                    worldMenu.hide();
	                });

	                // Detect element moving on mobile.

	                worldMenu.addEventListener('touchstart', function (evt) {

	                    console.log('start touch');
	                });

	                /** 
	                 * Move event on mobile
	                 */
	                worldMenu.addEventListener('touchmove', function (evt) {

	                    console.log('touch in menu');

	                    // TODO:
	                });

	                worldMenu.addEventListener('touchend', function (evt) {

	                    console.log('end touch');
	                });

	                // Hide for now.

	                worldMenu.hide();

	                /*
	                 * =============== End of Menus =============================
	                 */

	                // Attach.

	                this.worldMenu = worldMenu;

	                // Append the buttons to the DOM.

	                controls.appendChild(vrButton);

	                controls.appendChild(exitVRButton);

	                controls.appendChild(fullscreenButton);

	                /*
	                 * TODO: FF had document.exitFullscreen, but it is ZAPPED when we try to add this button, and becomes the 
	                 * exitFullscreenButton!!!!!!!!!!!!!!!!!
	                 * So, in the exit, check if typeof document.exitFullscreen === 'function', and only use if it is
	                 */

	                controls.appendChild(exitFullscreenButton);

	                controls.appendChild(worldButton);

	                controls.appendChild(worldMenu);
	            } else {

	                console.error('Ui::createDOMUi(): canvas not defined');
	            }
	        }

	        /* 
	         * ---------------------------------------
	         * UI FACTORY FUNCTIONS
	         * ---------------------------------------
	         */

	    }, {
	        key: 'createUiElement',
	        value: function createUiElement(elem, name, className, top, left, zIndex, display) {

	            elem.className = 'webvr-mini-' + name;

	            // Create button styles.

	            var s = elem.style;

	            var styleObj = this.styles[name];

	            for (var i in styleObj) {

	                s[i] = styleObj[i];
	            }

	            // Convert to CSS property value if a number was supplied.

	            if (this.util.isNumber(top)) {

	                s.top = parseFloat(top) + 'px';
	            }

	            if (this.util.isNumber(left)) {

	                s.left = parseFloat(left) + 'px';
	            }

	            if (this.util.isNumber(zIndex)) {

	                s.zIndex = parseInt(zIndex);
	            }

	            if (display) s.display = display;

	            // Prevent button from being selected and dragged.

	            elem.draggable = false;

	            elem.addEventListener('dragstart', function (evt) {

	                evt.preventDefault();

	                evt.stopPropagation();
	            });

	            // by default, button is active.

	            elem.active = true;

	            return elem;
	        }

	        /** 
	         * Create a Ui button
	         */

	    }, {
	        key: 'createButton',
	        value: function createButton(name, buttonIcon, top, left, zIndex, display) {
	            var _this2 = this;

	            var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};


	            var button = this.createUiElement(document.createElement('img'), 'button', 'webvr-mini-button', top, left, zIndex, display);

	            button.name = name;

	            // Set the icon.

	            button.src = buttonIcon;

	            // Button tooltip messages

	            button.tooltipActive = '', button.tooltipInactive = '',

	            // Style it on hover for desktops.

	            button.addEventListener('mouseenter', function (evt) {

	                var b = evt.target;

	                var st = b.style;

	                st.filter = st.webkitFilter = 'drop-shadow(0 0 6px rgba(255,255,255,1))';

	                var tt = b.parentNode.querySelector('.webvr-mini-tooltip');

	                var ts = tt.style;

	                tt.status = 'visible'; // Manage mousleave with setTimeout below

	                // Deactivate tooltip if necessary.

	                if (!b.active) {

	                    tt.innerHTML = b.tooltipInactive;
	                } else {

	                    tt.innerHTML = b.tooltipActive;
	                }

	                // Delay appearance of tooltip after mouse hover starts.

	                tt.tid = setTimeout(function () {

	                    if (tt.status === 'visible') {

	                        ts.left = 16 + parseFloat(st.left) + parseFloat(st.width) + 'px', ts.top = 2 + parseFloat(st.top) + 'px';

	                        ts.display = 'inline-block';

	                        // Make the tooltip disappear after a time limit (needed for mobile).

	                        tt.t2id = setTimeout(function () {

	                            var evt = new Event('mouseleave');

	                            button.dispatchEvent(evt);
	                        }, 3000);
	                    }
	                }, 900);
	            });

	            // Set tooltip to invisible after mouse leaves.

	            button.addEventListener('mouseleave', function (evt) {

	                var b = evt.target;

	                var st = b.style;

	                st.filter = st.webkitFilter = '';

	                var tt = b.parentNode.querySelector('.webvr-mini-tooltip');

	                tt.status = 'invisible'; // flag compensating for setTimeout above

	                if (tt.tid) {

	                    clearTimeout(tt.tid);

	                    tt.tid = null;
	                }

	                if (tt.t2id) {

	                    tt.t2id = null;
	                }

	                tt.style.display = 'none';

	                tt.innerHTML = '';
	            });

	            // Show the button onscreen. Also set activation/deactivation of its strikethrough.

	            button.show = function () {

	                button.style.display = 'inline-block';

	                if (button.active) {

	                    button.strikethroughImg.style.display = 'none';
	                } else {

	                    button.strikethroughImg.style.display = 'inline-block';
	                }
	            };

	            // Hide the button onscreen.

	            button.hide = function () {

	                button.style.display = 'none';

	                button.strikethroughImg.style.display = 'none';
	            };

	            // Add the emulated symbol underneath a given button.

	            button.emulated = function (emuImg) {

	                if (!button.emulatedImg) {

	                    var emu = document.createElement('img');

	                    emu.style.position = 'absolute', emu.style.top = '0', emu.style.left = button.style.left, emu.style.padding = button.style.padding, emu.style.zIndex = _this2.styles.emu.zIndex, emu.style.display = 'none', emu.src = emuImg, button.emulatedImg = emu, // save a reference to emulation in the original button.

	                    _this2.controls.appendChild(emu);
	                }
	            };

	            // Add a strikethrough image link

	            button.strikethrough = function (strikeImg) {

	                if (!button.strikethroughImg) {

	                    var strike = document.createElement('img');

	                    strike.style.position = 'absolute', strike.style.top = button.style.top, strike.style.left = button.style.left, strike.style.width = button.style.width, strike.style.height = button.style.height, strike.style.padding = button.style.padding, strike.style.margin = button.style.margin, strike.style.zIndex = _this2.styles.strikethrough.zIndex, strike.style.display = 'none', strike.src = strikeImg, strike.name = 'strikethrough', button.strikethroughImg = strike; // save a reference to strikethrough in the original button.

	                    _this2.controls.appendChild(strike);
	                }
	            };

	            // Set the strikethrough.

	            button.strikethrough(this.icons.strikethrough);

	            // Display and activate the button.

	            button.activate = function () {

	                button.active = true;

	                if (button.strikethroughImg) button.strikethroughImg.style.display = 'none';
	            };

	            // Display the button, but deactivate it.

	            button.inactivate = function () {

	                button.active = false;

	                if (button.strikethroughImg) button.strikethroughImg.style.display = 'inline-block';
	            };

	            // Return the completed button.

	            return button;
	        }

	        /** 
	         * Create a modal dialog.
	         */

	    }, {
	        key: 'createModal',
	        value: function createModal(name, modalIcon, top, left, zIndex, display) {
	            var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};


	            var modal = this.createUiElement(document.createElement('div'), 'modal', 'webvr-mini-modal', top, left, zIndex, display);

	            modal.name = name;

	            modal.show = function () {

	                modal.style.display = 'inline-block';
	            };

	            modal.hide = function () {

	                modal.style.display = 'none';
	            };

	            return modal;
	        }

	        /** 
	         * Create a DOM-based modal dialog
	         * TODO: REMOVE LATER
	         */

	    }, {
	        key: 'modalMessage',
	        value: function modalMessage(msg) {

	            // TODO: create modal dialog

	            console.error(msg);
	        }

	        /** 
	         * Create a loading progress bar.
	         */

	    }, {
	        key: 'createProgress',
	        value: function createProgress(name, progressIcon, top, left, zIndex, display) {
	            var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};


	            var progress = this.createUiElement(document.createElement('img'), 'progress', 'webvr-mini-progress', top, left, zIndex, display);

	            progress.name = name;

	            progress.show = function () {

	                progress.style.display = 'inline-block';
	            };

	            progress.hide = function () {

	                progress.style.display = 'none';
	            };

	            return progress;
	        }

	        /** 
	         * Create a selectable menu.
	         */

	    }, {
	        key: 'createMenu',
	        value: function createMenu(name) {
	            var menuIcon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	            var top = arguments[2];
	            var left = arguments[3];
	            var zIndex = arguments[4];

	            var _this3 = this;

	            var display = arguments[5];
	            var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};


	            var menu = this.createUiElement(document.createElement('div'), 'menuContainer', 'webvr-mini-menu', top, left, zIndex, display);

	            var menuList = document.createElement('ul');

	            // Assign default style.

	            for (var i in this.styles.menu) {

	                menuList.style[i] = this.styles.menu[i];
	            }

	            menuList.style.border = '1px solid black'; //////////////////////////TEMPORARY

	            menu.appendChild(menuList);

	            menu.name = name;

	            menu.style.backgroundColor = 'white';

	            // Build an empty menu item.

	            menu.buildItem = function (key, value) {

	                var domItem = document.createElement('li');

	                var s = domItem.style;

	                for (var j in _this3.styles.menuItem) {

	                    s[j] = _this3.styles.menuItem[j];
	                }

	                domItem.innerHTML = '<div id=' + key + '>' + value + '</div>';

	                return domItem;
	            };

	            // Timeout ID for setTimeout.

	            menu.mid = null;

	            // End timeout.

	            menu.addEventListener('mouseenter', function (evt) {

	                if (menu.mid) {

	                    clearTimeout(menu.mid);

	                    menu.mid = null;
	                }
	            });

	            // Set timeout.

	            menu.addEventListener('mouseleave', function (evt) {

	                menu.mid = setTimeout(function () {

	                    menu.hide();
	                }, 900);
	            });

	            // Get a blank padding menu element.

	            menu.blankItem = function () {

	                var domItem = menu.buildItem('-1', '-');

	                return domItem;
	            };

	            // Get the menu list.

	            menu.getList = function () {

	                return _this3.worldMenu.getElementsByTagName('ul')[0];
	            };

	            // Create function for building the menu list.

	            menu.buildList = function (listObj) {

	                var domList = menu.getList();

	                // Clear the menu.

	                domList.innerHTML = '';

	                var h = 0,
	                    itemCount = 0,
	                    scrollToChild = 0;

	                /* 
	                 * Read the object and build the list. Recurse to find the topmost name 
	                 * of the supplied object.
	                 */

	                // Add the list elements.

	                for (var i in listObj) {

	                    var item = listObj[i];

	                    var domItem = menu.buildItem(i, item.name);

	                    // Select if active.

	                    if (item.active) {

	                        domItem.style.backgroundColor = 'red';

	                        domItem.active = true;

	                        // Set scroll to active item.

	                        scrollToChild = itemCount * parseFloat(_this3.styles.menu.lineHeight);
	                    }

	                    // TODO: when change active element, need to change domItem.active!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	                    domList.appendChild(domItem);

	                    itemCount++;
	                }

	                var cn = domList.childNodes;

	                // Assign an index by using .childNodes ordering.

	                for (var _i = 0; _i < domList.childNodes.length; _i++) {

	                    cn[_i].index = _i;
	                }

	                return scrollToChild;
	            };

	            // Show the menu.

	            menu.show = function (scroll) {

	                console.log("MENU SCROLLTOP:" + scroll);

	                menu.style.display = 'inline-block';

	                var domList = menu.getList();

	                domList.scrollTop = scroll || 0;
	            };

	            menu.hide = function () {

	                menu.style.display = 'none';
	            };

	            menu.activate = function () {};

	            menu.deactivate = function () {};

	            menu.timeout = function () {

	                // TODO: TIMEOUT FOR MENU IF NOT SELECTED.

	            };

	            return menu;
	        }

	        /** 
	         * Create a loading spinner.
	         */

	    }, {
	        key: 'createSpinner',
	        value: function createSpinner(name, spinnerIcon, top, left, zIndex, display) {
	            var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};


	            var spinner = this.createUiElement(document.createElement('img'), 'spinner', 'webvr-mini-spinner', top, left, zIndex, display);

	            spinner.name = name; // TODO ADD TO createUiElement

	            spinner.show = function () {

	                spinner.style.display = 'inline-block';
	            };

	            spinner.hide = function () {

	                spinner.style.display = 'none';
	            };

	            return spinner;
	        }

	        /** 
	         * Create a Ui tooltip
	         * @param {String} activeMsg the message when a control is active.
	         * @param {String} inactiveMsg the message when a control is inactive.
	         * @param {Number} baseIndex the base zIndex to add our zIndex to.
	         */

	    }, {
	        key: 'createTooltip',
	        value: function createTooltip(activeMsg, inactiveMsg) {

	            // Create an information tooltip on mouse hover (only one).

	            var tooltip = document.createElement('p');

	            tooltip.className = 'webvr-mini-tooltip';

	            tooltip.setAttribute('status', 'invisible');

	            var ts = tooltip.style;

	            for (var i in this.styles.tooltip) {

	                ts[i] = this.styles.tooltip[i]; // sets zIndex
	            }

	            tooltip.innerHTML = '', this.tooltip = tooltip, this.controls.appendChild(tooltip);

	            return tooltip;
	        }

	        /* 
	         * ---------------------------------------
	         * MOUSE MOVE EVENTS
	         * ---------------------------------------
	         */

	        /* 
	         * ---------------------------------------
	         * KEYDOWN EVENTS
	         * ---------------------------------------
	         */

	        /** 
	         * Add an escape key handler for entry into VR, similar to fullscreen. 
	         * 
	          * Note: we bind this 
	         * sucker to itself(!) in the constructor, so that we can supply addEventListener with a named function, 
	         * and remove it later. Otherwise, you can't remove handlers bound with addEventListener.
	         */

	    }, {
	        key: 'vrHandleKeys',
	        value: function vrHandleKeys(evt) {

	            switch (evt.keyCode) {

	                case 27:
	                    // ESC key

	                    console.log("AN ESCAPE");

	                    this.mode = this.UI_DOM;

	                    this.exitVRButton.hide();

	                    this.vrButton.show();

	                    this.fullscreenButton.show();

	                    // this.webvr.exitPresent handles some of the resizing, we have to restore the Uis.

	                    // exit VR presentation (order may be important here).

	                    this.webvr.exitPresent();

	                    // Remove the event listener

	                    removeEventListener('keydown', this.vrHandleKeys);

	                    break;

	                default:

	                    break;

	            }
	        }

	        /* 
	         * ---------------------------------------
	         * FULLSCREEN EVENTS
	         * ---------------------------------------
	         */

	    }, {
	        key: 'hasFullscreen',
	        value: function hasFullscreen() {

	            return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
	        }

	        /** 
	         * Cross-browser enter fullscreen mode. Note: this is called by an 
	         * anonymous function bound to the fullscreen button in init().
	         * @param {Event} fullscreen event.
	         */

	    }, {
	        key: 'requestFullscreen',
	        value: function requestFullscreen(evt) {

	            var canvas = this.webgl.getCanvas();

	            var parent = canvas.parentNode;

	            if (parent.requestFullscreen) {

	                parent.requestFullscreen();
	            } else if (parent.mozRequestFullScreen) {

	                parent.mozRequestFullScreen();
	            } else if (parent.webkitRequestFullscreen) {

	                parent.webkitRequestFullscreen();
	            } else if (parent.msRequestFullscreen) {

	                parent.msRequestFullscreen();
	            }
	        }

	        /** 
	         * Cross-browser exit fullscreen mode.
	         * @param {Event} exit event.
	         */

	    }, {
	        key: 'exitFullscreen',
	        value: function exitFullscreen(evt) {

	            if (typeof document.exitFullscreen === 'function') {

	                document.exitFullscreen();
	            } else if (document.mozCancelFullScreen) {

	                document.mozCancelFullScreen();
	            } else if (document.webkitExitFullscreen) {

	                document.webkitExitFullscreen();
	            } else if (document.msExitFullscreen) {

	                document.msExitFullscreen();
	            }
	        }

	        /** 
	         * Handle a fullscreen transition.
	         * Note: used .bind() to bind to this object.s
	         */

	    }, {
	        key: 'fullscreenChange',
	        value: function fullscreenChange(evt) {

	            var c = this.webgl.getCanvas(),
	                p = c.parentNode,
	                gl = this.webgl.getContext();

	            switch (this.mode) {

	                case this.UI_VR:

	                    console.log('from vr to dom...');

	                    this.setControlsByMode(this.mode);

	                    break;

	                case this.UI_FULLSCREEN:

	                    /* 
	                     * Due to fullscreen API nastiness, you can't just call your standard resize() method
	                     * and support the canvas jumping back to a DOM mode with CSS styles defined by an external 
	                     * stylesheet. Additional resizing specific to exiting fullscreen has to be done here. 
	                     * Removing the .style properties is particularly important.
	                     *
	                     * Note: UI_FULLSCREEN mode is actually from fullscreen to DOM.
	                     * Note: UI_VR mode is from DOM to VR
	                     */

	                    console.log('from fullscreen to DOM...');

	                    // Kill local CSS styles ensuring we get a fullscreen view.

	                    p.style.width = '';

	                    p.style.height = '';

	                    // set the HTML5 canvas back to its original size, so it is synced with style in parentNode.

	                    var width = this.oldWidth;

	                    var height = this.oldHeight;

	                    // Set the WebGL viewport.

	                    gl.viewportWidth = width;

	                    gl.viewportHeight = height;

	                    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	                    // Set the canvas size.

	                    c.width = width;

	                    c.height = height;

	                    this.mode = this.UI_DOM;

	                    // Hide the return button, if it wasn't already.

	                    this.setControlsByMode(this.mode);

	                    break;

	                default:

	                case this.UI_DOM:

	                    console.log('from DOM to fullscreen...');

	                    // We hide fullscreen and vr in the calling functions...

	                    this.mode = this.UI_FULLSCREEN;

	                    this.setControlsByMode(this.mode);

	                    break;

	            }
	        }
	    }]);

	    return Ui;
	}();

	// We put this here because of JSDoc(!).

	exports.default = Ui;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shader = __webpack_require__(10);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var ShaderFader = function (_Shader) {
	    _inherits(ShaderFader, _Shader);

	    /** 
	     * --------------------------------------------------------------------
	     * VERTEX SHADER 0
	     * Prims with varying alpha values during creation and deletion.
	     *
	     * When the final alpha is reached, the Shader swaps the Prim back 
	     * to its defaultShader.
	     * 
	     * SUPPORTS:
	     * ShaderColor
	     * ShaderTexture
	     * 
	     * phong lighting, rendered in shader
	     * @link https://github.com/stackgl/glsl-lighting-walkthrough
	     * --------------------------------------------------------------------
	     */
	    function ShaderFader(init, util, glMatrix, webgl, webvr, shaderName, lights) {
	        _classCallCheck(this, ShaderFader);

	        var _this = _possibleConstructorReturn(this, (ShaderFader.__proto__ || Object.getPrototypeOf(ShaderFader)).call(this, init, util, glMatrix, webgl, webvr, shaderName, lights));

	        _this.required.buffer.indices = true, _this.required.buffer.colors = true, _this.required.buffer.texCoords = true, // even if default

	        _this.sortByDistance = true;

	        console.log('In ShaderFader class');

	        return _this;
	    }

	    _createClass(ShaderFader, [{
	        key: 'vsSrc',
	        value: function vsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            'attribute vec3 ' + this.webgl.attributeNames.aVertexPosition[0] + ';', 'attribute vec4 ' + this.webgl.attributeNames.aVertexColor[0] + ';', 'attribute vec2 ' + this.webgl.attributeNames.aTextureCoord[0] + ';', 'attribute vec3 ' + this.webgl.attributeNames.aVertexNormal[0] + ';',

	            //'uniform mat4 uMMatrix;',   // Model matrix
	            //'uniform mat4 uVMatrix;',  // View matrix
	            'uniform mat4 uMVMatrix;', // Model-View matrix
	            'uniform mat4 uPMatrix;', // Perspective matrix
	            'uniform mat3 uNMatrix;', // Inverse-transpose of Model-View matrix

	            // World position.

	            'uniform vec3 uPOV;',

	            // Point size.

	            'uniform float uPointSize;',

	            // Line size.

	            // Adjusted positions and normals.

	            'varying vec3 vPOV;', // user point of view (camera)
	            'varying vec4 vPositionW;', // adjusted position
	            'varying vec4 vNormalW;', // adjusted normal

	            // Texture coordinates.

	            'varying vec2 vTextureCoord;', 'varying vec4 vVertexColor;', 'void main(void) {',

	            // GL pointSize

	            'gl_PointSize = uPointSize;',

	            // View-Model-Position-Projection matrix.

	            'gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);', 'vTextureCoord = aTextureCoord;', 'vVertexColor = aVertexColor;', 'vPOV = -uPOV;', // reversed from our coordinates

	            'vPositionW = uMVMatrix * vec4(aVertexPosition, 1.0);', // Model-View Matrix (including POV / camera).

	            'vNormalW =  normalize(vec4(uNMatrix*aVertexNormal, 0.0));', // Inverse-transpose-normal matrix rotates object normals.

	            '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * a default-lighting textured object fragment shader.
	         * - varying texture coordinate
	         * - texture 2D sampler
	         */

	    }, {
	        key: 'fsSrc',
	        value: function fsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            // Lighting flags.

	            'uniform bool uUseLighting;', 'uniform bool uUseTexture;', 'uniform bool uUseColor;',

	            // Lighting values.

	            'uniform vec3 uAmbientColor;', 'uniform vec3 uLightingDirection;', // uLightingDirection
	            'uniform vec3 uDirectionalColor;',

	            // Material properties (includes specular highlights).

	            'uniform vec3 uMatEmissive;', 'uniform vec3 uMatAmbient;', 'uniform vec3 uMatDiffuse;', 'uniform vec3 uMatSpecular;', 'uniform float uMatSpecExp;',

	            // Alpha value.

	            'uniform float uAlpha;',

	            // Varying.

	            'varying vec3 vPOV;', // World point of view (camera)
	            'varying vec4 vPositionW;', 'varying vec4 vNormalW;', 'varying vec2 vTextureCoord;', 'varying vec4 vVertexColor;',

	            // Texture sampler.

	            'uniform sampler2D uSampler;',

	            // Main program.

	            'void main(void) {', 'vec4 vColor;', 'if(uUseTexture) {', 'vColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));', '} else {', 'vColor = vVertexColor;', // we always read this, so always bind it

	            '}',

	            //  Set light components by Light x Material.

	            'vec4 Emissive = vec4(uMatEmissive, uAlpha);',

	            // We do a quad fadein of our Ambient so near-transparent objects don't have the Ambient color.

	            'vec4 Ambient = vec4(uAmbientColor * uMatAmbient, uAlpha);', 'vec4 Diffuse = vec4(uDirectionalColor * uMatDiffuse, uAlpha);',

	            // Specular should be zero if we aren't lighting.

	            'vec4 Specular = vec4(0.0, 0.0, 0.0, uAlpha);', 'if(uUseLighting) {',

	            // Add lighting direction to Diffuse.

	            'vec4 N = normalize(vNormalW);', 'vec4 LL = normalize(vec4(uLightingDirection, 1.0));', 'float NdotL = max( dot(N, LL), 0.0);', 'Diffuse = NdotL * Diffuse;',

	            // Compute specular dot. Changing 4th parameter to 0.0 instead of 1.0 improved results.

	            'vec4 L = normalize(vec4(uLightingDirection, uAlpha) - vPositionW);', 'vec4 EyePosW = vec4(vPOV, 0.0);', // world = eye = camera position

	            'vec4 V = normalize(EyePosW - vPositionW );', 'vec4 H = normalize(L + V);', 'vec4 R = reflect(-L, N);', // -L computes side facing Light, +L computes shadow component

	            'float RdotV = max(dot(R, V), 0.0);', 'float NdotH = max(dot(N, H), 0.0);', 'float spec = uMatSpecExp;',

	            // Multiply Specular by global uAlpha here.

	            'Specular = pow(RdotV, spec) * pow(NdotH, spec) * vec4(uDirectionalColor * uMatSpecular, uAlpha);', '} else {',

	            // Somewhat arbitrary, but gives the best fade up for non-lighted objects.

	            'Ambient.rgb *= uAlpha;', '}', 'gl_FragColor = ((Emissive + Ambient + Diffuse + Specular) * vec4(vColor.rgb, vColor.a));', '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * --------------------------------------------------------------------
	         * Vertex Shader 0, fades in/out colored/textured objects.
	         * --------------------------------------------------------------------
	         */

	        /** 
	         * initialize the update() and render() methods for this shader.
	         * @param{Prim[]} primList a list of initializing Prims (optional).
	         */

	    }, {
	        key: 'init',
	        value: function init(primList) {

	            // DESTRUCTING DID NOT WORK!
	            //[gl, canvas, mat4, vec3, pMatrix, mvMatrix, program ] = this.setup();

	            var arr = this.setup(),
	                gl = arr[0],
	                canvas = arr[1],
	                mat4 = arr[2],
	                mat3 = arr[3],
	                vec3 = arr[4],
	                program = arr[5],
	                vsVars = arr[6],
	                fsVars = arr[7],
	                stats = arr[8],
	                near = arr[9],
	                far = arr[10],
	                vr = arr[11],
	                iSize = arr[12];

	            // Attach our VBO program.

	            var shaderProgram = program.shaderProgram;

	            // If we init with a primList, add them here.

	            if (primList) {

	                program.renderList = this.util.concatArr(program.renderList, primList);
	            }

	            // Local reference to our matrices.

	            //let pMatrix = this.pMatrix,

	            var mvMatrix = this.mvMatrix,
	                vMatrix = this.vMatrix,
	                mMatrix = this.mMatrix;

	            /** 
	             * POLYMORPHIC PROPERTIES AND METHODS.
	             */

	            // Shorten names of attributes, uniforms for rendering.

	            var aVertexPosition = vsVars.attribute.vec3.aVertexPosition,
	                aVertexColor = vsVars.attribute.vec4.aVertexColor,
	                aTextureCoord = vsVars.attribute.vec2.aTextureCoord,
	                aVertexNormal = vsVars.attribute.vec3.aVertexNormal,
	                uSampler = fsVars.uniform.sampler2D.uSampler,
	                uAlpha = fsVars.uniform.float.uAlpha,
	                uUseLighting = fsVars.uniform.bool.uUseLighting,
	                uUseTexture = fsVars.uniform.bool.uUseTexture,
	                uUseColor = fsVars.uniform.bool.uUseColor,


	            // Material.

	            uMatEmissive = fsVars.uniform.vec3.uMatEmissive,
	                uMatAmbient = fsVars.uniform.vec3.uMatAmbient,
	                uMatDiffuse = fsVars.uniform.vec3.uMatDiffuse,
	                uMatSpecular = fsVars.uniform.vec3.uMatSpecular,
	                uMatSpecExp = fsVars.uniform.float.uMatSpecExp,


	            // Lighting.

	            uAmbientColor = fsVars.uniform.vec3.uAmbientColor,
	                // ambient light color

	            uDirectionalColor = fsVars.uniform.vec3.uDirectionalColor,
	                // directional light color

	            uLightingDirection = fsVars.uniform.vec3.uLightingDirection,


	            // Point size, if GL_POINTS is used.

	            uPointSize = vsVars.uniform.float.uPointSize,


	            // World position, also position of camera.

	            uPOV = vsVars.uniform.vec3.uPOV,


	            // Transform arrays

	            uPMatrix = vsVars.uniform.mat4.uPMatrix,
	                uMVMatrix = vsVars.uniform.mat4.uMVMatrix,
	                uNMatrix = vsVars.uniform.mat3.uNMatrix; // Inverse-transpose normal matrix

	            // Default Local link to easing function. Individual Prims can override.

	            var easeIn = this.util.easeQuadIn;

	            var easeType = 0;

	            /* 
	             * Set up directional lighting with the primary World light passed to the 
	             * parent Shader class (see lights.es6 for defaults).
	             */

	            var light0 = this.lights.getLight(this.lights.lightTypes.LIGHT_0); // 'this.lights' loaded in parent Shader class

	            var ambient = light0.ambient;

	            var lightingDirection = light0.lightingDirection;

	            var directionalColor = light0.directionalColor;

	            // Inverse transpose matrix, created from Model-View matrix for lighting.

	            var nMatrix = mat3.create(); // TODO: ADD MAT3 TO PASSED VARIABLES

	            var adjustedLD = lightingDirection;

	            /** 
	             * Simple fadein/fadeout
	             */
	            var fade = function fade(prim) {

	                var f = prim.fade;

	                var dir = f.endAlpha - f.startAlpha;

	                ///console.log("DIR:" + dir + " endAlpha:" + f.endAlpha + " startAlpha:" + f.startAlpha)

	                if (dir > 0) {

	                    // Fadein. Use a fade equation.

	                    f.incr = f.eq(f.incr);

	                    prim.alpha += f.incr;

	                    if (prim.alpha >= f.endAlpha) {

	                        prim.alpha = f.endAlpha;

	                        // This turns off this Shader!

	                        ///console.log("TURN OFF SHADER:" + this.name + " MOVE TO:" + prim.defaultShader.name)

	                        prim.shader.movePrim(prim, prim.defaultShader);
	                    }
	                } else if (dir <= 0) {

	                    // Fadeout. Use a fade equation.

	                    f.incr = f.eq(f.incr);

	                    prim.alpha -= f.incr;

	                    if (prim.alpha <= f.endAlpha) {

	                        prim.alpha = f.endAlpha;

	                        // This turns off this Shader!

	                        ///console.log("TURN OFF SHADER:" + this.name + " MOVE TO:" + prim.defaultShader.name)

	                        prim.shader.movePrim(prim, prim.defaultShader);
	                    }
	                }
	            };

	            // Update Prim position, motion - given to World object.

	            program.update = function (prim, MVM, updatePrim) {

	                ///let f = prim.fade;
	                ///console.log(prim.name + ' in fade: alpha:' + prim.alpha + ' inc:' + f.incr + ' endAlpha:' + f.endAlpha + ' startAlpha:' + f.startAlpha)

	                fade(prim);

	                // Update the model-view matrix using current Prim position, rotation, etc.

	                prim.setMV(MVM);

	                // Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.

	                mat3.normalFromMat4(nMatrix, MVM);

	                // Update coordinates every time for mono, but only one time for stereo.

	                if (updatePrim) prim.updateCoords();
	            };

	            // Create a save matrix.

	            var saveMV = mat4.create();

	            /*
	             * Prim rendering. We pass in a the Projection Matrix so we can render in mono and stereo, and 
	             * the position of the camera/eye (POV) for some kinds of rendering (e.g. specular lighting).
	             * @param {glMatrix.mat4} PM projection matrix, either mono or stereo.
	             * @param {glMatrix.vec3} pov the position of the camera in World space.
	             * @param {Boolean} updatePrim if true, adjust Prim coordinates. Do every time for mono, but only 
	             * one time for stereo.
	             */

	            program.render = function (PM, pov, updatePrim) {

	                if (!program.renderList.length) return;

	                gl.useProgram(shaderProgram);

	                // Save the model-view supplied by the shader. Mono and VR return different MV matrices.

	                mat4.copy(saveMV, mvMatrix);

	                // Reset perspective matrix.

	                //mat4.perspective( PM, Math.PI*0.4, canvas.width / canvas.height, near, far ); // right

	                for (var i = 0, len = program.renderList.length; i < len; i++) {

	                    var prim = program.renderList[i];

	                    // Only render if we have at least one texture loaded.

	                    if (!prim) continue; // could be null

	                    // Individual prim update

	                    program.update(prim, mvMatrix, updatePrim);

	                    // Bind vertex buffer.

	                    gl.bindBuffer(gl.ARRAY_BUFFER, prim.geometry.vertices.buffer);
	                    gl.enableVertexAttribArray(aVertexPosition);
	                    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);

	                    // Color buffer, even if we don't draw with it (prevents 'out of range' errors).

	                    gl.bindBuffer(gl.ARRAY_BUFFER, prim.geometry.colors.buffer);
	                    gl.enableVertexAttribArray(aVertexColor);
	                    gl.vertexAttribPointer(aVertexColor, 4, gl.FLOAT, false, 0, 0); // NOTE: prim.geometry.colors.itemSize for param 2

	                    // Bind texture coordinates. Shader complains if one is not bound (unlike some other uniforms).

	                    gl.bindBuffer(gl.ARRAY_BUFFER, prim.geometry.texCoords.buffer);
	                    gl.enableVertexAttribArray(aTextureCoord);
	                    gl.vertexAttribPointer(aTextureCoord, 2, gl.FLOAT, false, 0, 0);

	                    // Set pointSize.

	                    gl.uniform1f(uPointSize, prim.pointSize);

	                    // Alpha, with easing animation (in this.util).

	                    gl.uniform1f(uAlpha, prim.alpha);

	                    // Bind lighting.

	                    gl.uniform3fv(uAmbientColor, ambient);
	                    gl.uniform3fv(uLightingDirection, adjustedLD);
	                    gl.uniform3fv(uDirectionalColor, directionalColor);
	                    gl.uniform3fv(uPOV, pov.position); // used for specular highlight

	                    // Conditionally set lighting, based on default Shader the Prim was assigned to.

	                    if (prim.useLighting) {

	                        gl.uniform1i(uUseLighting, 1);
	                    } else {

	                        // Turn off lighting in the Shader.

	                        gl.uniform1i(uUseLighting, 0);
	                    }

	                    // Bind normals for lighting, or other calcs.

	                    gl.bindBuffer(gl.ARRAY_BUFFER, prim.geometry.normals.buffer);
	                    gl.enableVertexAttribArray(aVertexNormal);
	                    gl.vertexAttribPointer(aVertexNormal, 3, gl.FLOAT, false, 0, 0);

	                    // Normals matrix (transpose inverse) uniform.

	                    gl.uniformMatrix3fv(uNMatrix, false, nMatrix);

	                    // Set Perspective uniform.

	                    gl.uniformMatrix4fv(uPMatrix, false, PM);

	                    // Model-View matrix uniform.

	                    gl.uniformMatrix4fv(uMVMatrix, false, mvMatrix);

	                    // Bind indices buffer.

	                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, prim.geometry.indices.buffer);

	                    // Loop through materials

	                    /* 
	                     * ms (matStarts) gives the start of the material from the OBJ file. Direct loads default 
	                     * to position 0.
	                     * iSize is either gl.UNSIGNED_INT (0 -> 2e9) or gl.UNSIGNED_SHORT (0 -> 65535)
	                     * GeometryPool and ModelPool routines are expected to "chop"
	                     */

	                    // Loop through materials, and regions of Prim they apply to.

	                    var ms = prim.matStarts;

	                    for (var j = 0; j < ms.length; j++) {

	                        var st = ms[j];

	                        // Get the next material from prim.matStarts

	                        var m = prim.materials[st[0]]; // bind the material (defaultmaterial still present)

	                        // Set the material quality of the Prim.

	                        if (m !== undefined) {

	                            gl.uniform3fv(uMatAmbient, m.ambient);
	                            gl.uniform3fv(uMatDiffuse, m.diffuse);
	                            gl.uniform3fv(uMatEmissive, m.emissive);
	                            gl.uniform3fv(uMatSpecular, m.specular);
	                            gl.uniform1f(uMatSpecExp, m.specularExponent);

	                            // We always bind a texture to prevent Shader errors, even if not used.

	                            if (m.map_Kd instanceof WebGLTexture) {

	                                // Set fragment shader sampler uniform.

	                                gl.uniform1i(uSampler, 0);

	                                gl.activeTexture(gl.TEXTURE0);
	                                gl.bindTexture(gl.TEXTURE_2D, null);
	                                gl.bindTexture(gl.TEXTURE_2D, m.map_Kd);
	                            }

	                            // Conditionally draw colors instead of textures.

	                            if (prim.useColorArray === true) {

	                                gl.uniform1i(uUseColor, 1);
	                                gl.uniform1i(uUseTexture, 0);
	                            } else {

	                                gl.uniform1i(uUseColor, 0);
	                                gl.uniform1i(uUseTexture, 1);
	                            }

	                            if (prim.drawTris) gl.drawElements(gl.TRIANGLES, st[2], iSize, st[1]);

	                            if (prim.drawPoints) gl.drawElements(gl.POINTS, st[2], iSize, st[1]);

	                            if (prim.drawLines) gl.drawElements(gl.LINES, st[2], iSize, st[1]);
	                        }
	                    }

	                    // Copy back the original for the next Prim. 

	                    mat4.copy(mvMatrix, saveMV);
	                } // end of renderList for Prims
	            }; // end of program.render()

	            return program;
	        } // end of init()

	    }]);

	    return ShaderFader;
	}(_shader2.default);

	exports.default = ShaderFader;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Shader = function () {

	    /* 
	     * Shaders used for rendering.
	     * GREAT description of model, view, projection matrix
	     * @link https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection
	     * 
	     * Using vertex arrays:
	     * @link http://blog.tojicode.com/2012/10/oesvertexarrayobject-extension.html
	     * 
	     * WebGL Stack
	     * @link https://github.com/stackgl
	     * 
	     * Some shaders
	     * https://github.com/jwagner/terrain
	     * http://shadertoy.com
	     * 
	     * Superfast Advanced Batch Processing
	     * http://max-limper.de/tech/batchedrendering.html
	     * 
	     * GLSL Sandbox
	     * http://mrdoob.com/projects/glsl_sandbox/
	     * 
	     * Basic MVC
	     * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection
	     */
	    function Shader(init, util, glMatrix, webgl, webvr, shaderName, lights) {
	        _classCallCheck(this, Shader);

	        console.log('In Shader class');

	        this.name = shaderName;

	        // class name = this.constructor.name // doesn't work with Babel 3/2017

	        this.util = util, this.glMatrix = glMatrix, this.webgl = webgl, this.vr = webvr;

	        // Perspective and model-view matrix.

	        this.pMatrix = this.glMatrix.mat4.create();

	        this.mvMatrix = this.glMatrix.mat4.create();

	        this.mvMatrixStack = this.glMatrix.mat4.create();

	        /* 
	         * Floating precision (determined by WebGL object). WebGL best practice
	         * says use highp whenever possible.
	         * @link https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
	         */

	        this.floatp = '';

	        if (this.webgl.stats.highp) {

	            this.floatp = 'precision highp float;';
	        } else {

	            this.floatp = 'precision mediump float;';
	        }

	        // Add (global to prims) Lights, if present.

	        if (lights) {

	            this.lights = lights;
	        } else {

	            this.lights = null;
	        }

	        // Define the arrays needed for shaders to work. Subclasses override these values.

	        this.required = {

	            buffer: {

	                vertices: true,

	                indices: false,

	                texCoords: false,

	                normals: false,

	                colors: true,

	                tangents: false

	            },

	            textures: {

	                map_Kd: false, // diffuse map, an image file (other maps not in default)

	                map_Ks: false, // specular map

	                map_Ka: false, // ambient map

	                map_bump: false, // bumpmap

	                map_refl: false, // environment map

	                map_d: false, // alpha map

	                map_disp: false // displacement map

	            },

	            lights: {

	                world: false, // World illumination

	                internal: false // Shader expects Prims to glow

	            }

	        };

	        // Max number of times a Prim can fail to add to a Shader.

	        this.MAX_FAIL = 100;

	        // If we need to sort by distance (translucent Prims), set to true.

	        this.sortByDistance = false;

	        /* 
	         * By default, each derived Shader has explicit vertex and fragment shaders 
	         * written into it. If we need to load a vertex and fragment shader files (in text format), put their paths in derived classes.
	         */

	        this.vertexShaderFile = null;

	        this.fragmentShaderFile = null;

	        // For indexOf tests.

	        this.NOT_IN_LIST = util.NOT_IN_LIST;

	        // Get the WebGL program we will use to render.

	        this.createProgram();
	    }

	    /*
	     * ---------------------------------------
	     * PRIM OPERATIONS
	     * ---------------------------------------
	     */

	    /** 
	     * Check for a Prim in list of drawn objects in this Shader.
	     * NOTE: we store Prims as a numeric array only.s
	     * @param {Prim} prim a Prim object.
	     */


	    _createClass(Shader, [{
	        key: 'primInList',
	        value: function primInList(prim) {

	            var renderList = this.program.renderList;

	            var pos = renderList.indexOf(prim);

	            return pos;
	        }

	        /**
	         * We add each Prim to our internal Program (returned from webgl).
	         * NOTE: the prim must already be initialized
	         * NOTE: we store Prims as numeric array only.
	         * @param {Prim} prim a Prim object.
	         * @param {Boolean} emit if true, broadcast the event, else false.
	         */

	    }, {
	        key: 'addPrim',
	        value: function addPrim(prim) {
	            var emit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


	            // If a Prim never initializes, give up, and flag with a warning.

	            if (prim.failCount > this.MAX_FAIL) {

	                // Remove the Prim its CURRENT Shader.

	                prim.shader.removePrim(prim);

	                console.error('prim:' + prim.name + ' could not be added to Shader:' + this.name + ', giving up (removing from display list)');

	                return;
	            }

	            if (this.checkPrim(prim)) {

	                ///console.log( 'Shader::addPrim(): checking if ' + prim.name + ' is in our list...' );

	                if (this.primInList(prim) === this.NOT_IN_LIST) {

	                    ///console.warn( 'Shader::addPrim(): prim:' + prim.name + ' current Shader:' + prim.shader.name + ' default:' + prim.defaultShader.name )

	                    ///console.warn( 'Shader::addPrim():prim:'  + prim.name + ' not in list, adding to Shader::' + this.name );

	                    // Add the Prim to the Shader program's renderList. If a nulled position is present, use it.

	                    var pos = this.program.renderList.indexOf(null);

	                    if (pos !== this.NOT_IN_LIST) {

	                        ///console.warn( 'Shader::addPrim():filling NULL with:' + prim.name + ' to:' + this.name );

	                        this.program.renderList[pos] = prim;
	                    } else {

	                        ///console.warn( 'Shader::addPrim():appending prim:' + prim.name + ' to:' + this.name )

	                        this.program.renderList.push(prim);
	                    }

	                    // Sort the program.renderList by distance for translucent objects.

	                    if (this.sortByDistance) {

	                        this.sortPrimsByDistance([0, 0, 0]);
	                    }

	                    // Switch the Prim's default Shader, and remove it from its old Shader (there can only be one).

	                    if (prim.shader && prim.shader !== this) {

	                        //console.log( 'Shader::addPrim(): removing prim:' + prim.name + ' from old Shader:' + prim.shader.name)

	                        prim.shader.removePrim(prim, emit);
	                    }

	                    prim.shader = this; // may already be the case


	                    prim.rendering = true;

	                    // Emit a PRIM_READY event.

	                    if (emit) {

	                        this.util.emitter.emit(this.util.emitter.events.PRIM_ADDED_TO_SHADER, prim);
	                    }

	                    return true;
	                } else {

	                    console.warn('Shader::addPrim():' + prim.name + ' already added to Shader::' + this.name);
	                }
	            }

	            //console.warn( 'Shader::addPrim():' + prim.name + ' did not pass Shader test for ' + this.name )

	            // Increment our fail count. If past PrimFactory.MAX_FAIL, give up trying to add the Prim.

	            //console.log(prim.name + " failCount:" + prim.failCount)

	            prim.failCount++;

	            return false;
	        }

	        /** 
	         * Remove a Prim from the Shader so it isn't rendered (not from PrimFactor). 
	         * NOTE: removing from the array messes up JIT optimization, so slows things down!
	         * @param {Prim} obj a Prim object.
	         * @param {Boolean} emit if true, emit the event, else false.
	         */

	    }, {
	        key: 'removePrim',
	        value: function removePrim(prim) {
	            var emit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


	            var pos = this.primInList(prim);

	            if (pos !== this.NOT_IN_LIST) {

	                // Remove a Prim from the Shader program's renderList (still in PrimList and World).

	                console.warn('Shader::removePrim():removing prim:' + prim.name + ' from Shader:' + this.name);

	                //////////////////////this.program.renderList.splice( pos, 1 );

	                this.program.renderList[pos] = null;

	                prim.rendering = false;

	                // Emit a Prim removal event.

	                if (emit) {

	                    this.util.emitter.emit(this.util.emitter.events.PRIM_REMOVED_FROM_SHADER, prim);
	                }

	                return true;
	            } else {

	                console.warn('Shader::removePrim():' + prim.name + ' not found in Shader::' + this.name);
	            }

	            return false;
	        }

	        /** 
	         * Move a Prim between Shaders.
	         * @param {Prim} prim the Prim to move.
	         * @param {Shader} newShader the Shader to move to.
	         */

	    }, {
	        key: 'movePrim',
	        value: function movePrim(prim, newShader) {

	            if (prim.shader && newShader && prim.shader !== newShader) {

	                /*
	                 * NOTE: emit MUST be false to prevent a race condition.
	                 */

	                //////console.log("Shader::movePrim():" + prim.name )

	                return newShader.addPrim(prim, false);
	            }
	        }

	        /** 
	         * Check if a given Prim has the elements to be rendered by this Shader.
	         * Bound to Emitter.events.PRIM_READY events.
	         * @param {Prim} prim the primitive object.
	         * @returns {Boolean} if everything is there, return true, else false.
	         */

	    }, {
	        key: 'checkPrim',
	        value: function checkPrim(prim) {

	            if (!this.checkPrimBuffers(prim)) {

	                console.warn('Shader::checkPrim():' + prim.name + ' has bad buffers');

	                return false;
	            }

	            if (!this.checkPrimMaterials(prim)) {

	                console.warn('Shader::checkPrim():' + prim.name + ' has bad materials');

	                return false;
	            }

	            if (!this.checkPrimTextures(prim)) {

	                console.warn('Shader::checkPrim():' + prim.name + ' has bad textures');

	                return false;
	            }

	            // FAIL IF WE ARE TRYING TO ADD TO OURSELVES!!!!!!!!!

	            console.log('Shader::checkPrim(): prim:' + prim.name + ' ready to be added to:' + this.name + ' from:' + prim.shader.name);

	            return true;
	        }

	        /**
	         * Confirm that all required WebGL coordinate buffers are present.
	         * @param {Prim} prim an object primitive.
	         */

	    }, {
	        key: 'checkPrimBuffers',
	        value: function checkPrimBuffers(prim) {

	            var buffer = this.required.buffer,
	                geo = prim.geometry;

	            // Loop through geometry buffer objects, which are part of 'required' here.

	            for (var i in buffer) {

	                ///console.log(prim.name + " BUFFER NAME:" + i );

	                if (buffer[i]) {

	                    ///console.log( prim.name + ' required i:' + i + ' value:' + buffer[ i ] + ' geo value:' + geo[ i ])

	                    if (!geo[i] || !geo[i].buffer) {

	                        ///console.log( prim.name + ' has no buffer at:' + i + ' yet' );

	                        return false;
	                    }
	                }
	            }

	            return true;
	        }

	        /** 
	         * Check to see if any required material properties are available for the Shader.
	         * TODO: 
	         */

	    }, {
	        key: 'checkPrimMaterials',
	        value: function checkPrimMaterials(prim) {

	            // Check that 'matStarts' has been defined.

	            if (prim.matStarts === undefined || prim.matStarts.length < 1) {

	                ///console.log(prim.name + ' does not have matStarts yet' )

	                return false;
	            }

	            // Check that 'matStarts' points to a defined material.

	            //let matName = prim.matStarts[ 0 ][ 0 ];

	            for (var i = 0; i < prim.matStarts.length; i++) {

	                if (prim.materials[prim.matStarts[i][0]] === undefined) {

	                    return false;
	                }
	            }

	            //if ( prim.materials[ matName ] === undefined ) {

	            ///console.log(prim.name + ' does not have first material (' + prim.matStarts[ 0 ][ 0 ] + ') yet' );

	            //    return false; 

	            //}

	            return true;
	        }

	        /** 
	         * Check to confirm that the required number of textures is available for Shader.
	         * @param {Prim} prim the primitive object.
	         */

	    }, {
	        key: 'checkPrimTextures',
	        value: function checkPrimTextures(prim) {

	            // check the material designated as 'defaultMaterial'.

	            var tex = this.required.textures;

	            var st = prim.matStarts;

	            ///if (st.length === 0 ) console.log(prim.name + " does have ST IS ZERO in checkPrimTextures")

	            for (var i = 0; i < st.length; i++) {

	                //console.log(prim.name + " does have material NAME " + st[ 0 ][ 0 ] + ' in matStarts in checkPrimtextures')

	                for (var j in prim.materials) {

	                    //console.log(prim.name + ' does have LOOPO current material: ' + j + '===' +  st[ 0 ][ 0 ] )

	                    //if ( j === st[ 0 ][ 0 ] ) console.log(prim.name + ' does have st[0] matching ' + j )

	                    // TODO: NEED A FAIL FLAG FOR NO LOAD ON THIS CHECK.

	                }

	                var matName = st[0][0];

	                var m = prim.materials[matName];

	                if (m === undefined) {

	                    //console.log(prim.name + ' does not have MATERIAL ' + matName + ' DEFINED IN checkPrimTextures' )

	                    return false;
	                }

	                //console.warn(prim.name + ' does have MATERIAL DEFINED in checkPrimTextures')

	                for (var _i in tex) {

	                    //console.log(prim.name + ' does check TEXTURE ' + i + ' in material:' + m.name + ', == ' + m[i])

	                    if (m[_i] && (m[_i] === null || !(m[_i] instanceof WebGLTexture))) {

	                        console.warn('Shader::checkTextures(): prim:' + prim.name + ' OBJ file does not have texture ' + _i + ' defined in material:' + matName + ' yet');

	                        return false;
	                    }
	                }
	            }

	            return true;
	        }

	        /**
	         * Sort the list of rendered Prims furthest to closest to the viewer or Camera.
	         * NOTE: don't use for large > 20 sorts.
	         * @param {glMatrix.vec3} viewer position of viewer (camera).
	         */

	    }, {
	        key: 'sortPrimsByDistance',
	        value: function sortPrimsByDistance(viewer) {

	            var vec3 = this.glMatrix.vec3;

	            this.program.renderList.sort(function (a, b) {

	                if (a && b) {
	                    // nulls possible

	                    return vec3.distance(a.position, viewer) - vec3.distance(b.position, viewer);
	                }
	            });
	        }

	        /*
	         * ---------------------------------------
	         * WEBGL PROGRAM OPERATIONS
	         * ---------------------------------------
	         */

	        /** 
	         * Create the rendering program that will use our Shaders. Initially created 
	         * by WebGL module, then each Shader adds update() and render() methods specific to 
	         * the shader program.
	         */

	    }, {
	        key: 'createProgram',
	        value: function createProgram() {

	            var program = null;

	            if (this.vertexShaderFile && this.fragmentShaderFile) {

	                program = this.webgl.createProgram(this.webgl.fetchVertexShader(this.vertexShaderFile), this.webgl.fetchFragmentShader(this.fragmentShaderFile));
	            } else {

	                /*
	                 * NOTE: webgl.createProgram adds the render array .renderList
	                 * vsSrc() and fsSrc() are defined in derived Shader objects.
	                 */

	                program = this.webgl.createProgram(this.vsSrc(), this.fsSrc());
	            }

	            if (!program) {

	                console.error('error creating WebGL program using Shader ' + this.constructor.name);
	            } else {}

	            /* 
	             * Add stuff that all Shaders share (non-polymorphic properties and methods).
	             * Individual Shader derivatives define an init() method, which in turn attaches 
	             * 
	             * program.update()
	             * program.render() 
	             * 
	             * To the program object. The ShaderPool grabs the Shader.program.update() and Shader.program.render()
	             * methods when rendering.
	             *
	             */

	            // Rendering uses a more direct program reference. we save a reference here for manipulating objects.

	            return this.program = program;
	        }

	        /** 
	         * get the WebGL Program (which contains the indivdiual update() and render() 
	         * methods for this particular shader).
	         * @returns {Object} returns the WebGL program from WebGL module, decorated with additional 
	         * update() and render() methods by the specific shader.
	         */

	    }, {
	        key: 'getProgram',
	        value: function getProgram() {

	            return this.program;
	        }

	        /*
	         * ---------------------------------------
	         * RENDERING OPERATIONS
	         * ---------------------------------------
	         */

	        /** 
	         * set up our program object, using WebGL. We wrap the 'naked' WebGL 
	         * program object, and add additional properties to the wrapper. 
	         *
	         * This method is called by polymorphic .init() methods in derived Shaders.
	         * 
	         * Individual shaders use these variables to construct a program wrapper 
	         * object containing the GLProgram, plus properties, plus update() and 
	         * render() functions.
	         */

	    }, {
	        key: 'setup',
	        value: function setup() {

	            // The program is created by decorating an object provided by the WebGL object 
	            // with additional methods.

	            var program = this.program,
	                glMatrix = this.glMatrix,
	                mat4 = glMatrix.mat4;

	            this.pMatrix = glMatrix.mat4.create(); // projection matrix (defaults to mono view)

	            this.mMatrix = glMatrix.mat4.create(); // Model only (no view)

	            this.vMatrix = glMatrix.mat4.create(); // View only, create makes and an identity matrix

	            this.mvMatrix = glMatrix.mat4.create(); // model-view matrix

	            var pMatrix = this.pMatrix,
	                mMatrix = this.mMatrix,
	                vMatrix = this.vMatrix,
	                mvMatrix = this.mvMatrix,
	                canvas = this.webgl.getCanvas(),
	                gl = this.webgl.getContext(),
	                near = this.webgl.near,
	                far = this.webgl.far;

	            // Set the index size, based on WebGL capabilities.

	            var iSize = void 0;

	            if (this.webgl.stats.uint32) {

	                iSize = gl.UNSIGNED_INT; // > 64k indices references
	            } else {

	                iSize = gl.UNSIGNED_SHORT; // <= 16-bit indices references
	            }

	            var primUpdate = true;

	            /**
	             * Rendering mono view.
	             */
	            program.renderMono = function (vMatrix, pov) {

	                //mat4.identity( vMatrix );

	                //mat4.rotate( vMatrix, vMatrix, pov.rotation[ 1 ], [ 0, 1, 0 ] ); // rotate on Y axis only (for mouselook).

	                //mat4.rotate( vMatrix, vMatrix, pov.rotation[ 0 ], [ 1, 0 , 0 ] ); // rotate on X axis only (for mouselook).

	                // POV position (common to all renderings in a frame).

	                //mat4.translate( vMatrix, vMatrix, pov.position );

	                // Copy vMatrix to mvMatrix (so we have vMatrix separately for Shader).

	                mat4.copy(mvMatrix, vMatrix);

	                // mono Perspective (common for all renderings in a frame).

	                mat4.perspective(pMatrix, Math.PI * 0.4, canvas.width / canvas.height, near, far);

	                program.render(pMatrix, pov, true);
	            };

	            /** 
	             *  Rendering left and right eye for VR. Called once for each Shader by World.
	             */
	            program.renderVR = function (vr, frameData, vvMatrix, pov) {

	                // Framedata provided by calling function.

	                // ----------------------- Left eye. ----------------------------------

	                mat4.identity(vMatrix); // ???????????REALLY NEEDED??????????????????? TEST ON HTC VIVE

	                // Adjust viewport to render on LEFT side of VR canvas, using current width and height.

	                gl.viewport(0, 0, canvas.width * 0.5, canvas.height);

	                // Multiply vMatrix by our eye.leftViewMatrix, and adjust for height of VR viewer.

	                vr.getStandingViewMatrix(vMatrix, frameData.leftViewMatrix, frameData.pose); // after Toji

	                // Combine with the initial World viewMatrix.

	                mat4.multiply(mvMatrix, vMatrix, vvMatrix);

	                // Copy vMatrix to mvMatrix (so we have vMatrix separately for Shader).

	                /////////////mat4.copy( mvMatrix, vvMatrix );       

	                // Use left Projection matrix provided by WebVR FrameData object to render the World.

	                program.render(frameData.leftProjectionMatrix, pov, true);

	                // ----------------------- Right eye. ----------------------------------

	                mat4.identity(vMatrix); // ????????????REALLY NEEDED????????????? TEST ON HTC VIVE

	                // Adjust viewport to render on RIGHT side of VR canvas, using current width and height.

	                gl.viewport(canvas.width * 0.5, 0, canvas.width * 0.5, canvas.height);

	                // Multiply vMatrix by our eye.rightViewMatrix, and adjust for height of VR viewer.

	                vr.getStandingViewMatrix(vMatrix, frameData.rightViewMatrix, frameData.pose); // after Toji

	                // Combine with the initial World viewMatrix.

	                mat4.multiply(mvMatrix, vMatrix, vvMatrix);

	                // Copy vMatrix to mvMatrix (so we have vMatrix separately for Shader).

	                ////////////mat4.copy( mvMatrix, vvMatrix );

	                // Use right Projection matrix provided by WebVR FrameData object to render the World.

	                program.render(frameData.rightProjectionMatrix, pov, false); // DON'T UPDATE THE PRIM

	                // Calling function submits rendered stereo view to device.
	            };

	            /* Return references to our properties, and assign uniform and attribute locations using webgl object.
	             * We do this return to provide local references for all the Shader and other objects
	             * used by the WebGL program update() and render(). It could be provided in each init, but saves 
	             * code to have each custom Shader init() method grab the local references from a common method. 
	             */

	            return [gl, //this.webgl.getContext(),

	            canvas, //this.webgl.getCanvas(),

	            this.glMatrix.mat4, this.glMatrix.mat3, this.glMatrix.vec3, program, {

	                attribute: this.webgl.setAttributeArrays(program.shaderProgram, program.vsVars.attribute),

	                uniform: this.webgl.setUniformLocations(program.shaderProgram, program.vsVars.uniform)

	            }, {

	                uniform: this.webgl.setUniformLocations(program.shaderProgram, program.fsVars.uniform)

	            }, this.webgl.stats, this.webgl.near, this.webgl.far, this.vr, iSize];
	        }

	        /*
	         * ---------------------------------------
	         * MATRIX OPERATIONS
	         * ---------------------------------------
	         */

	        /** 
	         * Get the perspective matrix.
	         * @returns {glMatrix.mat4} the perspective matrix used in the Shader.
	         */

	    }, {
	        key: 'getPMatrix',
	        value: function getPMatrix() {

	            return this.pMatrix;
	        }

	        /**
	         * Get the model-view matrix.
	         * @returns {glMatrix.mat4} the model-view matrix used in the Shader.
	         */

	    }, {
	        key: 'getmMVMatrix',
	        value: function getmMVMatrix() {

	            return this.mvMatrix;
	        }

	        /**
	         * Organize our matrix transforms in specific order.
	         */

	    }, {
	        key: 'mvPushMatrix',
	        value: function mvPushMatrix(matrix) {

	            var mat4 = this.glMatrix.mat4;

	            var copy = mat4.clone(matrix);

	            this.mvMatrixStack.push(copy);
	        }

	        /** 
	         * Get the next matrix transform in a sequence.
	         */

	    }, {
	        key: 'mvPopMatrix',
	        value: function mvPopMatrix() {

	            if (this.mvMatrixStack.length == 0) {

	                throw 'Invalid popMatrix!';
	            }

	            mvMatrix = this.mvMatrixStack.pop();
	        }
	    }]);

	    return Shader;
	}();

	exports.default = Shader;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shader = __webpack_require__(10);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var ShaderTexture = function (_Shader) {
	    _inherits(ShaderTexture, _Shader);

	    /** 
	     * --------------------------------------------------------------------
	     * VERTEX SHADER 1
	     * textured, no lighting.
	     * @link http://learningwebgl.com/blog/?p=684
	     * StackGL
	     * @link https://github.com/stackgl
	     * phong lighting
	     * @link https://github.com/stackgl/glsl-lighting-walkthrough
	     * - vertex position
	     * - texture coordinate
	     * - model-view matrix
	     * - projection matrix
	     * --------------------------------------------------------------------
	     */
	    function ShaderTexture(init, util, glMatrix, webgl, webvr, shaderName, lights) {
	        _classCallCheck(this, ShaderTexture);

	        var _this = _possibleConstructorReturn(this, (ShaderTexture.__proto__ || Object.getPrototypeOf(ShaderTexture)).call(this, init, util, glMatrix, webgl, webvr, shaderName, lights));

	        _this.required.buffer.indices = true, _this.required.buffer.colors = true, _this.required.buffer.normals = true, _this.required.lights = 0, _this.required.textures.map_Kd = true;

	        console.log('In ShaderTexture class');

	        return _this;
	    }

	    /* 
	     * Vertex and Fragment Shaders. We use the internal 'program' object from the webgl object to compile these. 
	     * Alternatively, They may be defined to load from HTML or and external file.
	     * @return {Object{code, varList}} an object, with internal elements
	     * code: The shader code.
	     * varList: A scanned list of all the variables in the shader code (created by webgl object).
	     */


	    _createClass(ShaderTexture, [{
	        key: 'vsSrc',
	        value: function vsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            'attribute vec3 ' + this.webgl.attributeNames.aVertexPosition[0] + ';', 'attribute vec2 ' + this.webgl.attributeNames.aTextureCoord[0] + ';', 'attribute vec3 ' + this.webgl.attributeNames.aVertexNormal[0] + ';', 'uniform mat4 uMVMatrix;', // Model-view matrix
	            'uniform mat4 uPMatrix;', // Perspective matrix
	            'uniform mat3 uNMatrix;', // Inverse-transpose of Model-View matrix

	            // World position.

	            'uniform vec3 uPOV;',

	            // Point size.

	            'uniform float uPointSize;',

	            // Adjusted positions and normals.

	            'varying vec3 vPOV;', // user point of view (camera)
	            'varying vec4 vPositionW;', // adjusted position
	            'varying vec4 vNormalW;', // adjusted normal

	            'varying vec2 vTextureCoord;', 'void main(void) {', 'gl_PointSize = uPointSize;', 'gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);', 'vTextureCoord = aTextureCoord;', 'vPOV = -uPOV;', // reversed from our coordinates

	            'vPositionW = uMVMatrix * vec4(aVertexPosition, 1.0);', // Model-View Matrix (including POV / camera).

	            'vNormalW =  normalize(vec4(uNMatrix*aVertexNormal, 0.0));', // Inverse-transpose-normal matrix rotates object normals.

	            '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * a default-lighting textured object fragment shader.
	         * - varying texture coordinate
	         * - texture 2D sampler
	         */

	    }, {
	        key: 'fsSrc',
	        value: function fsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            // Lighting flags.

	            'uniform bool uUseLighting;',

	            // Lighting values.

	            'uniform vec3 uAmbientColor;', 'uniform vec3 uLightingDirection;', // uLightingDirection
	            'uniform vec3 uDirectionalColor;',

	            // Material properties (includes specular highlights).

	            'uniform vec3 uMatEmissive;', 'uniform vec3 uMatAmbient;', 'uniform vec3 uMatDiffuse;', 'uniform vec3 uMatSpecular;', 'uniform float uMatSpecExp;',

	            // Alpha value.

	            'uniform float uAlpha;',

	            // Varying.

	            'varying vec3 vPOV;', // World point of view (camera)
	            'varying vec4 vPositionW;', 'varying vec4 vNormalW;', 'varying vec2 vTextureCoord;', 'uniform sampler2D uSampler;', 'void main(void) {', 'vec4 vColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));',

	            //  Set light components by Light x Material.

	            'vec4 Emissive = vec4(uMatEmissive, uAlpha);',

	            // We do a quad fadein of our Ambient so near-transparent objects don't have the Ambient color.

	            'vec4 Ambient = vec4(uAmbientColor * uMatAmbient, uAlpha);', 'vec4 Diffuse = vec4(uDirectionalColor * uMatDiffuse, uAlpha);',

	            // Specular should be zero if we aren't lighting.

	            'vec4 Specular = vec4(0.0, 0.0, 0.0, uAlpha);', 'if(uUseLighting) {',

	            // Add lighting direction to Diffuse.

	            'vec4 N = normalize(vNormalW);', 'vec4 LL = normalize(vec4(uLightingDirection, 1.0));', 'float NdotL = max( dot(N, LL), 0.0);', 'Diffuse = NdotL * Diffuse;',

	            // Compute specular dot. Changing 4th parameter to 0.0 instead of 1.0 improved results.

	            'vec4 L = normalize(vec4(uLightingDirection, uAlpha) - vPositionW);',

	            /////////////'vec4 L = normalize(vec4(0.0, 0.0, 0.0, 0.0));', // bright, everything illuminated.

	            'vec4 EyePosW = vec4(vPOV, 0.0);', // world = eye = camera position

	            'vec4 V = normalize(EyePosW - vPositionW );', 'vec4 H = normalize(L + V);', 'vec4 R = reflect(-L, N);', // -L computes side facing Light, +L computes shadow component

	            'float RdotV = max(dot(R, V), 0.0);', 'float NdotH = max(dot(N, H), 0.0);', 'float spec = uMatSpecExp;',

	            // Multiply Specular by global uAlpha here.

	            'Specular = pow(RdotV, spec) * pow(NdotH, spec) * vec4(uDirectionalColor * uMatSpecular, uAlpha);', '} else {',

	            // Somewhat arbitrary, but gives the best fade up for non-lighted objects.

	            'Ambient.rgb *= uAlpha;', '}',

	            //'vColor.rgb *= 2.0;',  // STUFF SEEMS TOO DARK

	            'gl_FragColor =  (Emissive + Ambient + Diffuse + Specular) * vec4(vColor.rgb, vColor.a);', '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * --------------------------------------------------------------------
	         * Vertex Shader 1, using texture buffer.
	         * --------------------------------------------------------------------
	         */

	        /** 
	         * initialize the update() and render() methods for this shader.
	         * @param{Prim[]} primList a list of initializing Prims (optional).
	         */

	    }, {
	        key: 'init',
	        value: function init(primList) {

	            // DESTRUCTING DID NOT WORK!
	            //[gl, canvas, mat4, vec3, pMatrix, mvMatrix, program ] = this.setup();

	            var arr = this.setup(),
	                gl = arr[0],
	                canvas = arr[1],
	                mat4 = arr[2],
	                mat3 = arr[3],
	                vec3 = arr[4],
	                program = arr[5],
	                vsVars = arr[6],
	                fsVars = arr[7],
	                stats = arr[8],
	                near = arr[9],
	                far = arr[10],
	                vr = arr[11],
	                iSize = arr[12];

	            // Attach objects.

	            var shaderProgram = program.shaderProgram;

	            // If we init with a primList, add them here.

	            if (primList) {

	                program.renderList = this.util.concatArr(program.renderList, primList);
	            }

	            // Local reference to our matrices.

	            //let pMatrix = this.pMatrix,

	            var mvMatrix = this.mvMatrix,
	                vMatrix = this.vMatrix,
	                mMatrix = this.mMatrix;

	            /** 
	             * POLYMORPHIC PROPERTIES AND METHODS.
	             */

	            // Shorten names of attributes, uniforms for rendering.

	            // Shorten names of attributes, uniforms for rendering.

	            var aVertexPosition = vsVars.attribute.vec3.aVertexPosition,
	                aTextureCoord = vsVars.attribute.vec2.aTextureCoord,
	                aVertexNormal = vsVars.attribute.vec3.aVertexNormal,
	                uSampler = fsVars.uniform.sampler2D.uSampler,
	                uAlpha = fsVars.uniform.float.uAlpha,
	                uUseLighting = fsVars.uniform.bool.uUseLighting,


	            // Material.

	            uMatEmissive = fsVars.uniform.vec3.uMatEmissive,
	                uMatAmbient = fsVars.uniform.vec3.uMatAmbient,
	                uMatDiffuse = fsVars.uniform.vec3.uMatDiffuse,
	                uMatSpecular = fsVars.uniform.vec3.uMatSpecular,
	                uMatSpecExp = fsVars.uniform.float.uMatSpecExp,


	            // Lighting.

	            uAmbientColor = fsVars.uniform.vec3.uAmbientColor,
	                // ambient light color

	            uDirectionalColor = fsVars.uniform.vec3.uDirectionalColor,
	                // directional light color

	            uLightingDirection = fsVars.uniform.vec3.uLightingDirection,


	            // Point size, if GL_POINTS is used.

	            uPointSize = vsVars.uniform.float.uPointSize,


	            // World position, also position of camera.

	            uPOV = vsVars.uniform.vec3.uPOV,


	            // Transform arrays

	            uPMatrix = vsVars.uniform.mat4.uPMatrix,
	                uMVMatrix = vsVars.uniform.mat4.uMVMatrix,
	                uNMatrix = vsVars.uniform.mat3.uNMatrix; // Inverse-transpose normal matrix

	            /*
	             * Set up directional lighting with the primary World light passed to the 
	             * parent Shader class (see lights.es6 for defaults).
	             */

	            var light0 = this.lights.getLight(this.lights.lightTypes.LIGHT_0); // 'this.lights' loaded in parent Shader class

	            var ambient = light0.ambient;

	            var lightingDirection = light0.lightingDirection;

	            var directionalColor = light0.directionalColor;

	            // Inverse transpose matrix, created from Model-View matrix for lighting.

	            var nMatrix = mat3.create(); // TODO: ADD MAT3 TO PASSED VARIABLES

	            var adjustedLD = lightingDirection;

	            // Update Prim position, motion - given to World object.

	            program.update = function (prim, MVM, updatePrim) {

	                // Update the model-view matrix using current Prim position, rotation, etc.

	                prim.setMV(MVM);

	                // Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.

	                mat3.normalFromMat4(nMatrix, MVM);

	                // Update coordinates every time for mono, but only one time for stereo.

	                if (updatePrim) prim.updateCoords();
	            };

	            // Create a save matrix.

	            var saveMV = mat4.create();

	            /*
	             * Prim rendering. We pass in a the Projection Matrix so we can render in mono and stereo, and 
	             * the position of the camera/eye (POV) for some kinds of rendering (e.g. specular).
	             * @param {glMatrix.mat4} PM projection matrix, either mono or stereo.
	             * @param {glMatrix.vec3} pov the position of the camera in World space.
	             * @param {Boolean} updatePrim if true, adjust Prim coordinates. Do every time for mono, but only 
	             * one time for stereo.
	             */

	            program.render = function (PM, pov, updatePrim) {

	                if (!program.renderList.length) return;

	                gl.useProgram(shaderProgram); // program.shaderProgram

	                // Save the model-view supplied by the shader. Mono and VR return different MV matrices.

	                mat4.copy(saveMV, mvMatrix);

	                for (var i = 0, len = program.renderList.length; i < len; i++) {

	                    var prim = program.renderList[i];

	                    // Only render if we are visible, and have at least one texture loaded.

	                    if (!prim || prim.alpha === 0) continue;

	                    // Individual Prim update.

	                    program.update(prim, mvMatrix, updatePrim);

	                    // Bind vertex buffer.

	                    gl.bindBuffer(gl.ARRAY_BUFFER, prim.geometry.vertices.buffer);
	                    gl.enableVertexAttribArray(aVertexPosition);
	                    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);

	                    // Bind Textures buffer (could have multiple bindings here).

	                    gl.bindBuffer(gl.ARRAY_BUFFER, prim.geometry.texCoords.buffer);
	                    gl.enableVertexAttribArray(aTextureCoord);
	                    gl.vertexAttribPointer(aTextureCoord, 2, gl.FLOAT, false, 0, 0);

	                    // Set fragment shader sampler uniform.

	                    gl.uniform1i(uSampler, 0);

	                    // Set pointSize.

	                    gl.uniform1f(uPointSize, prim.pointSize);

	                    // Alpha, with easing animation (in this.util).

	                    gl.uniform1f(uAlpha, prim.alpha);

	                    // Bind lighting.

	                    gl.uniform3fv(uAmbientColor, ambient);
	                    gl.uniform3fv(uLightingDirection, adjustedLD);
	                    gl.uniform3fv(uDirectionalColor, directionalColor);
	                    gl.uniform3fv(uPOV, pov.position); // used for specular highlight

	                    if (prim.useLighting) {

	                        gl.uniform1i(uUseLighting, 1);
	                    } else {

	                        // Turn off lighting in the Shader.

	                        gl.uniform1i(uUseLighting, 0);
	                    }

	                    gl.uniform3fv(uPOV, pov.position); // used for specular highlight

	                    // Bind normals for lighting, or other calcs.

	                    gl.bindBuffer(gl.ARRAY_BUFFER, prim.geometry.normals.buffer);
	                    gl.enableVertexAttribArray(aVertexNormal);
	                    gl.vertexAttribPointer(aVertexNormal, 3, gl.FLOAT, false, 0, 0);

	                    // Normals matrix (transpose inverse) uniform.

	                    gl.uniformMatrix3fv(uNMatrix, false, nMatrix);

	                    // Set Perspective uniform.

	                    gl.uniformMatrix4fv(uPMatrix, false, PM);

	                    // Model-View matrix uniform.

	                    gl.uniformMatrix4fv(uMVMatrix, false, mvMatrix);

	                    // Bind index buffer.

	                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, prim.geometry.indices.buffer);

	                    /* 
	                     * ms (matStarts) gives the start of the material from the OBJ file. Direct loads default 
	                     * to position 0.
	                     * iSize is either gl.UNSIGNED_INT (0 -> 2e9) or gl.UNSIGNED_SHORT (0 -> 65535)
	                     * GeometryPool and ModelPool routines are expected to "chop"
	                     */

	                    // Look for (multiple) materials.

	                    var ms = prim.matStarts;

	                    for (var j = 0; j < ms.length; j++) {

	                        var st = ms[j];

	                        // Get the next material from prim.matStarts

	                        var m = prim.materials[st[0]]; // bind the material

	                        // Set the material quality of the Prim. If undefined, material is MISSING from .mtl file

	                        gl.uniform3fv(uMatAmbient, m.ambient);
	                        gl.uniform3fv(uMatDiffuse, m.diffuse);
	                        gl.uniform3fv(uMatEmissive, m.emissive);
	                        gl.uniform3fv(uMatSpecular, m.specular);
	                        gl.uniform1f(uMatSpecExp, m.specularExponent);

	                        gl.activeTexture(gl.TEXTURE0);
	                        gl.bindTexture(gl.TEXTURE_2D, null);
	                        gl.bindTexture(gl.TEXTURE_2D, m.map_Kd);

	                        // We can overlay points and lines on objects.

	                        if (prim.drawTris) gl.drawElements(gl.TRIANGLES, st[2], iSize, st[1]);

	                        if (prim.drawPoints) gl.drawElements(gl.POINTS, st[2], iSize, st[1]);

	                        if (prim.drawLines) gl.drawElements(gl.LINES, st[2], iSize, st[1]);
	                    }

	                    // Copy back the original for the next Prim. 

	                    mat4.copy(mvMatrix, saveMV);
	                } // end of renderList for Prims

	                // Disable buffers that might cause problems in another Prim.
	            }; // end of program.render()

	            return program;
	        } // end of init()

	    }]);

	    return ShaderTexture;
	}(_shader2.default);

	exports.default = ShaderTexture;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shader = __webpack_require__(10);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var ShaderColor = function (_Shader) {
	    _inherits(ShaderColor, _Shader);

	    /** 
	     * --------------------------------------------------------------------
	     * VERTEX SHADER 2
	     * colorized, non-lit shader.
	     * @link http://learningwebgl.com/blog/?p=684
	     * StackGL
	     * @link https://github.com/stackgl
	     * phong lighting
	     * @link https://github.com/stackgl/glsl-lighting-walkthrough
	     * - vertex position
	     * - texture coordinate
	     * - model-view matrix
	     * - projection matrix
	     * --------------------------------------------------------------------
	     */

	    function ShaderColor(init, util, glMatrix, webgl, webvr, shaderName, lights) {
	        _classCallCheck(this, ShaderColor);

	        // Define arrays that are needed for this shader.

	        var _this = _possibleConstructorReturn(this, (ShaderColor.__proto__ || Object.getPrototypeOf(ShaderColor)).call(this, init, util, glMatrix, webgl, webvr, shaderName, lights));

	        _this.required.buffer.indices = true, _this.required.buffer.colors = true, console.log('In ShaderColor class');

	        return _this;
	    }

	    /* 
	     * Vertex and Fragment Shaders. We use the internal 'program' object from the webgl object to compile these. 
	     * Alternatively, They may be defined to load from HTML or and external file.
	     * @return {Object{code, varList}} an object, with internal elements
	     * code: The shader code.
	     * varList: A scanned list of all the variables in the shader code (created by webgl object).
	     */


	    _createClass(ShaderColor, [{
	        key: 'vsSrc',
	        value: function vsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            'attribute vec3 ' + this.webgl.attributeNames.aVertexPosition[0] + ';', 'attribute vec4 ' + this.webgl.attributeNames.aVertexColor[0] + ';', 'attribute vec3 ' + this.webgl.attributeNames.aVertexNormal[0] + ';',
	            //'attribute vec2 ' + this.webgl.attributeNames.aTextureCoord[ 0 ] + ';',

	            'uniform mat4 uMVMatrix;', 'uniform mat4 uPMatrix;', 'uniform mat3 uNMatrix;', // Inverse-transpose of Model-View matrix

	            // World position.

	            'uniform vec3 uPOV;',

	            // Point size.

	            'uniform float uPointSize;',

	            // Adjusted positions and normals.

	            'varying vec3 vPOV;', // user point of view (camera)
	            'varying vec4 vPositionW;', // adjusted position
	            'varying vec4 vNormalW;', // adjusted normal

	            //'varying vec2 vTextureCoord;',

	            'varying vec4 vVertexColor;', 'void main(void) {', 'gl_PointSize = uPointSize;', 'gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);', 'vVertexColor = aVertexColor;', 'vPOV = -uPOV;', 'vPositionW = uMVMatrix * vec4(aVertexPosition, 1.0);', // Model-View Matrix (including POV / camera).

	            'vNormalW =  normalize(vec4(uNMatrix*aVertexNormal, 0.0));', // Inverse-transpose-normal matrix rotates object normals.

	            '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }
	    }, {
	        key: 'fsSrc',
	        value: function fsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            // Lighting flags.

	            'uniform bool uUseLighting;', 'uniform bool uUseColor;',

	            // Lighting values.

	            'uniform vec3 uAmbientColor;', 'uniform vec3 uLightingDirection;', // uLightingDirection
	            'uniform vec3 uDirectionalColor;',

	            // Material properties (includes specular highlights).

	            'uniform vec3 uMatEmissive;', 'uniform vec3 uMatAmbient;', 'uniform vec3 uMatDiffuse;', 'uniform vec3 uMatSpecular;', 'uniform float uMatSpecExp;',

	            // Alpha value.

	            'uniform float uAlpha;', 'varying vec3 vPOV;', // World point of view (camera)
	            'varying vec4 vPositionW;', 'varying vec4 vNormalW;', 'varying lowp vec4 vVertexColor;', 'void main(void) {', 'vec4 vColor = vVertexColor;',

	            //  Set light components by Light x Material.

	            'vec4 Emissive = vec4(uMatEmissive, uAlpha);', 'vec4 Ambient = vec4(uAmbientColor * uMatAmbient, uAlpha);', 'vec4 Diffuse = vec4(uDirectionalColor * uMatDiffuse, uAlpha);', 'vec4 Specular = vec4(0.0, 0.0, 0.0, uAlpha);', 'if(uUseLighting) {',

	            // Add lighting direction to Diffuse.

	            'vec4 N = normalize(vNormalW);', 'vec4 LL = normalize(vec4(uLightingDirection, 1.0));', 'float NdotL = max( dot(N, LL), 0.0);', 'Diffuse = NdotL * Diffuse;',

	            // Compute specular dot. Changing 4th parameter to 0.0 instead of 1.0 improved results.

	            'vec4 L = normalize(vec4(uLightingDirection, 1.0) - vPositionW);', 'vec4 EyePosW = vec4(vPOV, 0.0);', // world = eye = camera position

	            'vec4 V = normalize(EyePosW - vPositionW );', 'vec4 H = normalize(L + V);', 'vec4 R = reflect(-L, N);', // -L computes side facing Light, +L computes shadow component

	            'float RdotV = max(dot(R, V), 0.0);', 'float NdotH = max(dot(N, H), 0.0);', 'float spec = uMatSpecExp;',

	            // Multiply Specular by global uAlpha here.

	            'Specular = pow(RdotV, spec) * pow(NdotH, spec) * vec4(uDirectionalColor * uMatSpecular, 1.0);', '}',

	            // Final color.

	            'gl_FragColor = (Emissive + Ambient + Diffuse + Specular) * vec4(vColor.rgb, vColor.a * uAlpha);', '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * --------------------------------------------------------------------
	         * Vertex Shader 2, using color buffer but not texture.
	         * --------------------------------------------------------------------
	         */

	        /** 
	         * initialize the update() and render() methods for this shader.
	         * @param{Prim[]} primList a list of initializing Prims (optional).
	         */

	    }, {
	        key: 'init',
	        value: function init(primList) {

	            // DESTRUCTING DID NOT WORK!
	            //[gl, canvas, mat4, vec3, pMatrix, mvMatrix, program ] = this.setup();

	            var arr = this.setup(),
	                gl = arr[0],
	                canvas = arr[1],
	                mat4 = arr[2],
	                mat3 = arr[3],
	                vec3 = arr[4],
	                program = arr[5],
	                vsVars = arr[6],
	                fsVars = arr[7],
	                stats = arr[8],
	                near = arr[9],
	                far = arr[10],
	                vr = arr[11],
	                iSize = arr[12];

	            // Attach objects.

	            var shaderProgram = program.shaderProgram;

	            // If we init with a primList, add them here.

	            if (primList) {

	                program.renderList = this.util.concatArr(program.renderList, primList);
	            }

	            // Local reference to our matrices.

	            //let pMatrix = this.pMatrix,

	            var mvMatrix = this.mvMatrix,
	                vMatrix = this.vMatrix,
	                mMatrix = this.mMatrix;

	            /** 
	             * POLYMORPHIC PROPERTIES AND METHODS
	             */

	            // Shorten names of attributes, uniforms for rendering.

	            var aVertexPosition = vsVars.attribute.vec3.aVertexPosition,
	                aVertexColor = vsVars.attribute.vec4.aVertexColor,
	                aVertexNormal = vsVars.attribute.vec3.aVertexNormal,


	            // Lighting

	            uUseLighting = fsVars.uniform.bool.uUseLighting,
	                uAmbientColor = fsVars.uniform.vec3.uAmbientColor,
	                // ambient light color

	            uDirectionalColor = fsVars.uniform.vec3.uDirectionalColor,
	                // directional light color

	            uLightingDirection = fsVars.uniform.vec3.uLightingDirection,


	            // Overall Alpha value (individual colors may have their own).

	            uAlpha = fsVars.uniform.float.uAlpha,


	            // Material properties.

	            uMatEmissive = fsVars.uniform.vec3.uMatEmissive,
	                uMatAmbient = fsVars.uniform.vec3.uMatAmbient,
	                uMatDiffuse = fsVars.uniform.vec3.uMatDiffuse,
	                uMatSpecular = fsVars.uniform.vec3.uMatSpecular,
	                uMatSpecExp = fsVars.uniform.float.uMatSpecExp,


	            // Model-view, Perspective and inverse-transpose matrix.

	            uPMatrix = uPMatrix = vsVars.uniform.mat4.uPMatrix,
	                uMVMatrix = uMVMatrix = vsVars.uniform.mat4.uMVMatrix,
	                uNMatrix = vsVars.uniform.mat3.uNMatrix; // Inverse-transpose normal matrix

	            // Lighting.

	            var light0 = this.lights.getLight(this.lights.lightTypes.LIGHT_0),
	                // 'this.lights' loaded in parent Shader class

	            ambient = light0.ambient,
	                lightingDirection = light0.lightingDirection,
	                directionalColor = light0.directionalColor,


	            // Point size, if GL_POINTS is used.

	            uPointSize = vsVars.uniform.float.uPointSize,


	            // World Position (also position of camera/POV).

	            uPOV = vsVars.uniform.vec3.uPOV;

	            // Initialize some local variables.

	            var nMatrix = mat3.create(); // TODO: ADD MAT3 TO PASSED VARIABLES

	            var adjustedLD = lightingDirection;

	            // Update Prim position, motion - given to World object.

	            program.update = function (prim, MVM, updatePrim) {

	                // Update the model-view matrix using current Prim position, rotation, etc.

	                prim.setMV(MVM);

	                // Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.

	                mat3.normalFromMat4(nMatrix, MVM);

	                // Update coordinates every time for mono, but only one time for stereo.

	                if (updatePrim) prim.updateCoords();
	            };

	            // Create a save matrix.

	            var saveMV = mat4.create();

	            /*
	             * Prim rendering. We pass in a the Projection Matrix so we can render in mono and stereo, and 
	             * the position of the camera/eye (POV) for some kinds of rendering (e.g. specular).
	             * @param {glMatrix.mat4} PM projection matrix, either mono or stereo.
	             * @param {glMatrix.vec3} pov the position of the camera in World space.
	             * @param {Boolean} updatePrim if true, adjust Prim coordinates. Do every time for mono, but only 
	             * one time for stereo.
	             */

	            program.render = function (PM, pov, updatePrim) {

	                if (!program.renderList.length) return;

	                gl.useProgram(shaderProgram);

	                // Save the model-view supplied by the Shader. Mono and VR return different MV matrices.

	                mat4.copy(saveMV, mvMatrix);

	                // Reset perspective matrix.

	                //mat4.perspective( PM, Math.PI*0.4, canvas.width / canvas.height, near, far ); // right

	                for (var i = 0, len = program.renderList.length; i < len; i++) {

	                    var prim = program.renderList[i];

	                    // Only render if we are visible.

	                    if (!prim || prim.alpha === 0) continue; // could be null or invisible

	                    // Individual prim update, using mvMatrix.

	                    program.update(prim, mvMatrix, updatePrim);

	                    // Look for (multiple) materials.

	                    var ms = prim.matStarts;

	                    // Bind vertex buffer.

	                    gl.bindBuffer(gl.ARRAY_BUFFER, prim.geometry.vertices.buffer);
	                    gl.enableVertexAttribArray(aVertexPosition);
	                    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);

	                    // Bind color buffer.

	                    gl.bindBuffer(gl.ARRAY_BUFFER, prim.geometry.colors.buffer);
	                    gl.enableVertexAttribArray(aVertexColor);
	                    gl.vertexAttribPointer(aVertexColor, 4, gl.FLOAT, false, 0, 0);

	                    // Bind lighting.

	                    gl.uniform3fv(uAmbientColor, ambient);
	                    gl.uniform3fv(uLightingDirection, adjustedLD);
	                    gl.uniform3fv(uDirectionalColor, directionalColor);
	                    gl.uniform3fv(uPOV, pov.position); // used for specular highlight

	                    // Set pointSize.

	                    gl.uniform1f(uPointSize, prim.pointSize);

	                    // Alpha, with easing animation (in this.util).

	                    gl.uniform1f(uAlpha, prim.alpha);

	                    if (prim.useLighting) {

	                        gl.uniform1i(uUseLighting, 1);
	                    } else {

	                        // Turn off lighting in the Shader.

	                        gl.uniform1i(uUseLighting, 0);
	                    }

	                    // Bind normals for lighting (or other calcs).

	                    gl.bindBuffer(gl.ARRAY_BUFFER, prim.geometry.normals.buffer);
	                    gl.enableVertexAttribArray(aVertexNormal);
	                    gl.vertexAttribPointer(aVertexNormal, 3, gl.FLOAT, false, 0, 0);

	                    // Set normals matrix uniform (inverse transpose matrix).

	                    gl.uniformMatrix3fv(uNMatrix, false, nMatrix);

	                    // Set Perspective uniform.

	                    gl.uniformMatrix4fv(uPMatrix, false, PM);

	                    // Model-View matrix uniform.

	                    gl.uniformMatrix4fv(uMVMatrix, false, mvMatrix);

	                    // Bind indices buffer.

	                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, prim.geometry.indices.buffer);

	                    // Loop through materials

	                    /* 
	                     * iSize is either gl.UNSIGNED_INT (0 -> 2e9) or gl.UNSIGNED_SHORT (0 -> 65535)
	                     * GeometryPool and ModelPool routines are expected to "chop"
	                     */

	                    // Loop through materials, and regions of Prim they apply to.

	                    for (var j = 0; j < ms.length; j++) {

	                        var st = ms[j];

	                        // Get the next material from prim.matStarts

	                        var m = prim.materials[st[0]]; // bind the material

	                        // Set the material quality of the Prim.

	                        gl.uniform3fv(uMatAmbient, m.ambient);
	                        gl.uniform3fv(uMatDiffuse, m.diffuse);
	                        gl.uniform3fv(uMatEmissive, m.emissive);
	                        gl.uniform3fv(uMatSpecular, m.specular);
	                        gl.uniform1f(uMatSpecExp, m.specularExponent);

	                        if (prim.drawTris) gl.drawElements(gl.TRIANGLES, st[2], iSize, st[1]);

	                        if (prim.drawPoints) gl.drawElements(gl.POINTS, st[2], iSize, st[1]);

	                        if (prim.drawLines) gl.drawElements(gl.LINES, st[2], iSize, st[1]);
	                    }

	                    // Copy back the original Model-View matrix for the next Prim. 

	                    mat4.copy(mvMatrix, saveMV);
	                } // end of renderList for Prims
	            }; // end of program.render()

	            return program;
	        } // end of init()

	    }]);

	    return ShaderColor;
	}(_shader2.default);

	exports.default = ShaderColor;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shader = __webpack_require__(10);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var ShaderTerrain = function (_Shader) {
	    _inherits(ShaderTerrain, _Shader);

	    /** 
	     * --------------------------------------------------------------------
	     * VERTEX SHADER 5
	     * For semi-transparent object in fading animation only. Objects placed  
	     * here are moved to their regular shader when alpha = 1.0. It 
	     * draws the object with the first texture defined in its texture array, 
	     * dropping back to the color array if the texture isn't defined.
	     * --------------------------------------------------------------------
	     */
	    function ShaderTerrain(init, util, glMatrix, webgl, webvr, shaderName, lights) {
	        _classCallCheck(this, ShaderTerrain);

	        var _this = _possibleConstructorReturn(this, (ShaderTerrain.__proto__ || Object.getPrototypeOf(ShaderTerrain)).call(this, init, util, glMatrix, webgl, webvr, shaderName, lights));

	        console.log('In ShaderTerrain class');

	        _this.required.buffer.indices = true, _this.required.buffer.texCoords = true, _this.required.buffer.normals = true, _this.required.lights = 1, _this.required.textures = 1;

	        return _this;
	    }

	    /* 
	     * Vertex and Fragment Shaders. We use the internal 'program' object from the webgl object to compile these. 
	     * Alternatively, They may be defined to load from HTML or and external file.
	     * @return {Object{code, varList}} an object, with internal elements
	     * code: The shader code.
	     * varList: A scanned list of all the variables in the shader code (created by webgl object).
	     */


	    _createClass(ShaderTerrain, [{
	        key: 'vsSrc',
	        value: function vsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            'attribute vec3 ' + this.webgl.attributeNames.aVertexPosition[0] + ';',
	            //'attribute vec4 ' + this.webgl.attributeNames.aVertexColor[ 0 ] + ';',
	            'attribute vec2 ' + this.webgl.attributeNames.aTextureCoord[0] + ';', 'attribute vec3 ' + this.webgl.attributeNames.aVertexNormal[0] + ';', 'uniform mat4 uMVMatrix;', // Model-view matrix
	            'uniform mat4 uPMatrix;', // Perspective matrix
	            'uniform mat3 uNMatrix;', // Inverse-transpose of Model-View matrix

	            // World position.

	            'uniform vec3 uPOV;',

	            // Adjusted positions and normals.

	            'varying vec3 vPOV;', // user point of view (camera)
	            'varying vec4 vPositionW;', // adjusted position
	            'varying vec4 vNormalW;', // adjusted normal

	            'varying vec2 vTextureCoord;', 'void main(void) {',

	            // View-Model-Position-Projection matrix.

	            '    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);', '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * terrain fragment shader.
	         * - varying texture coordinate
	         * - texture 2D sampler
	         */

	    }, {
	        key: 'fsSrc',
	        value: function fsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            'void main(void) {', 'gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);', '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * initialize the update() and render() methods for this shader.
	         * @param{Prim[]} primList a list of initializing Prims (optional).
	         */

	    }, {
	        key: 'init',
	        value: function init(primList) {

	            var arr = this.setup(),
	                gl = arr[0],
	                canvas = arr[1],
	                mat4 = arr[2],
	                mat3 = arr[3],
	                vec3 = arr[4],
	                program = arr[5],
	                vsVars = arr[6],
	                fsVars = arr[7],
	                stats = arr[8],
	                near = arr[9],
	                far = arr[10],
	                vr = arr[11],
	                iSize = arr[12];

	            // Shorter reference.

	            var shaderProgram = program.shaderProgram;

	            // If we init with primList, add them here.

	            if (primList) {

	                program.renderList = this.util.concatArr(program.renderList, primList);
	            }

	            // Local reference to our matrices.

	            //let pMatrix = this.pMatrix,

	            mvMatrix = this.mvMatrix, vMatrix = this.vMatrix, mMatrix = this.mMatrix;

	            /** 
	             * POLYMORPHIC METHODS
	             */

	            // Update Prim position, motion - given to World object.

	            program.update = function (prim, MVM, updatePrim) {

	                // Update the model-view matrix using current Prim position, rotation, etc.

	                prim.setMV(mvMatrix);

	                // Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.

	                mat3.normalFromMat4(nMatrix, mvMatrix);

	                // Update coordinates every time for mono, but only one time for stereo.

	                if (updatePrim) prim.updateCoords();
	            };

	            // Create a save matrix.

	            var saveMV = mat4.create();

	            /*
	             * Prim rendering. We pass in a the Projection Matrix so we can render in mono and stereo, and 
	             * the position of the camera/eye (POV) for some kinds of rendering (e.g. specular).
	             * @param {glMatrix.mat4} PM projection matrix, either mono or stereo.
	             * @param {glMatrix.vec3} pov the position of the camera in World space.
	             * @param {Boolean} updatePrim if true, adjust Prim coordinates. Do every time for mono, but only 
	             * one time for stereo.
	             */

	            program.render = function (PM, pov, updatePrim) {

	                if (!program.renderList.length) return;

	                gl.useProgram(shaderProgram);

	                // Save the model-view supplied by the shader. Mono and VR return different MV matrices.

	                mat4.copy(saveMV, mvMatrix);

	                // Begin program loop

	                for (var i = 0, len = program.renderList.length; i < len; i++) {

	                    var prim = program.renderList[i];

	                    // Only render if we are visible, and have at least one texture loaded.

	                    if (!prim || prim.alpha === 0) continue;

	                    // Update Model-View matrix with standard Prim values.

	                    program.update(prim, mvMatrix, updatePrim);

	                    // TODO: bind buffers

	                    // TODO: Set fragment shader sampler uniform.

	                    // TODO: drawElements()

	                    // Copy back the original for the next Prim. 

	                    mat4.copy(mvMatrix, saveMV);
	                } // end of renderList for Prims.
	            }; // end of program.render()
	        } // end of init()

	    }]);

	    return ShaderTerrain;
	}(_shader2.default);

	exports.default = ShaderTerrain;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shader = __webpack_require__(10);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var ShaderSky = function (_Shader) {
	    _inherits(ShaderSky, _Shader);

	    /** 
	     * --------------------------------------------------------------------
	     * VERTEX SHADER 7
	     * A sky shader (realistic sky colors, clouds).
	     * @link http://learningwebgl.com/blog/?p=684
	     * - vertex position
	     * - texture coordinate
	     * - model-view matrix
	     * - projection matrix
	     * Water example
	     * @link http://madebyevan.com/webgl-water/
	     * --------------------------------------------------------------------
	     */
	    function ShaderSky(init, util, glMatrix, webgl, webvr, shaderName, lights) {
	        _classCallCheck(this, ShaderSky);

	        var _this = _possibleConstructorReturn(this, (ShaderSky.__proto__ || Object.getPrototypeOf(ShaderSky)).call(this, init, util, glMatrix, webgl, webvr, shaderName, lights));

	        console.log('In ShaderSky class');

	        _this.required.buffer.indices = true, _this.required.buffer.texCoords = true, _this.required.buffer.colors = true, _this.required.buffer.normals = true, _this.required.buffer.tangents = true, _this.required.lights = 1, _this.required.textures = 5;

	        // TODO: include more for water

	        return _this;
	    }

	    /* 
	     * Vertex and Fragment Shaders. We use the internal 'program' object from the webgl object to compile these. 
	     * Alternatively, They may be defined to load from HTML or and external file.
	     * @return {Object{code, varList}} an object, with internal elements
	     * code: The shader code.
	     * varList: A scanned list of all the variables in the shader code (created by webgl object).
	     */


	    _createClass(ShaderSky, [{
	        key: 'vsSrc',
	        value: function vsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            'attribute vec3 ' + this.webgl.attributeNames.aVertexPosition[0] + ';',
	            //'attribute vec4 ' + this.webgl.attributeNames.aVertexColor[ 0 ] + ';',
	            'attribute vec2 ' + this.webgl.attributeNames.aTextureCoord[0] + ';', 'attribute vec3 ' + this.webgl.attributeNames.aVertexNormal[0] + ';', 'uniform mat4 uMVMatrix;', // Model-view matrix
	            'uniform mat4 uPMatrix;', // Perspective matrix
	            'uniform mat3 uNMatrix;', // Inverse-transpose of Model-View matrix

	            // World position.

	            'uniform vec3 uPOV;',

	            // Adjusted positions and normals.

	            'varying vec3 vPOV;', // user point of view (camera)
	            'varying vec4 vPositionW;', // adjusted position
	            'varying vec4 vNormalW;', // adjusted normal

	            'varying vec2 vTextureCoord;', 'void main(void) {',

	            // View-Model-Position-Projection matrix.

	            '    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);', '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * sky fragment shader.
	         * - varying texture coordinate
	         * - texture 2D sampler
	         */

	    }, {
	        key: 'fsSrc',
	        value: function fsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            'void main(void) {', 'gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);', '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * initialize the update() and render() methods for this shader.
	         * @param{Prim[]} primList a list of initializing Prims (optional).
	         */

	    }, {
	        key: 'init',
	        value: function init(primList) {

	            var arr = this.setup(),
	                gl = arr[0],
	                canvas = arr[1],
	                mat4 = arr[2],
	                mat3 = arr[3],
	                vec3 = arr[4],
	                program = arr[5],
	                vsVars = arr[6],
	                fsVars = arr[7],
	                stats = arr[8],
	                near = arr[9],
	                far = arr[10],
	                vr = arr[11],
	                iSize = arr[12];

	            // Shorter reference.

	            var shaderProgram = program.shaderProgram;

	            // If we init with primList, add them here.

	            if (primList) {

	                program.renderList = this.util.concatArr(program.renderList, primList);
	            }

	            // Local reference to our matrices.

	            //let pMatrix = this.pMatrix,

	            var mvMatrix = this.mvMatrix,
	                vMatrix = this.vMatrix,
	                mMatrix = this.mMatrix;

	            /** 
	             * POLYMORPHIC METHODS
	             */

	            // Update Prim position, motion - given to World object.

	            program.update = function (prim, MVM, updatePrim) {

	                // Update the model-view matrix using current Prim position, rotation, etc.

	                prim.setMV(mvMatrix);

	                // Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.

	                mat3.normalFromMat4(nMatrix, mvMatrix);

	                // Update coordinates every time for mono, but only one time for stereo.

	                if (updatePrim) prim.updateCoords();
	            };

	            // Create a save matrix.

	            var saveMV = mat4.create();

	            /*
	             * Prim rendering. We pass in a the Projection Matrix so we can render in mono and stereo, and 
	             * the position of the camera/eye (POV) for some kinds of rendering (e.g. specular).
	             * @param {glMatrix.mat4} PM projection matrix, either mono or stereo.
	             * @param {glMatrix.vec3} pov the position of the camera in World space.
	             * @param {Boolean} if true, have the Prim update its position and rotation. If false, 
	             * compute the mvMatrix for the Prim without updating (e.g. for the second Stereo view in 
	             * vrDisplay).
	             */

	            program.render = function (PM, pov, updatePrim) {

	                if (!program.renderList.length) return;

	                gl.useProgram(shaderProgram);

	                // Save the model-view supplied by the shader. Mono and VR return different MV matrices.

	                mat4.copy(saveMV, mvMatrix);

	                // Begin program loop

	                for (var i = 0, len = program.renderList.length; i < len; i++) {

	                    var prim = program.renderList[i];

	                    // Only render if we are visible, and have at least one texture loaded.

	                    if (!prim || prim.alpha === 0) continue;

	                    // Update Model-View matrix with standard Prim values.

	                    program.update(prim, mvMatrix, updatePrim);

	                    // TODO: bind buffers

	                    // TODO: Set fragment shader sampler uniform.

	                    // TODO: drawElements()

	                    // Copy back the original for the next Prim. 

	                    mat4.copy(mvMatrix, saveMV);
	                } // end of renerList for Prims
	            }; // end of program.render()
	        } // end of init()

	    }]);

	    return ShaderSky;
	}(_shader2.default);

	exports.default = ShaderSky;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shader = __webpack_require__(10);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var ShaderWater = function (_Shader) {
	    _inherits(ShaderWater, _Shader);

	    /** 
	     * --------------------------------------------------------------------
	     * VERTEX SHADER 6
	     * a directionally-lit textured water shader.
	     * @link http://learningwebgl.com/blog/?p=684
	     * - vertex position
	     * - texture coordinate
	     * - model-view matrix
	     * - projection matrix
	     * Water example
	     * @link http://madebyevan.com/webgl-water/
	     * --------------------------------------------------------------------
	     */
	    function ShaderWater(init, util, glMatrix, webgl, webvr, shaderName, lights) {
	        _classCallCheck(this, ShaderWater);

	        var _this = _possibleConstructorReturn(this, (ShaderWater.__proto__ || Object.getPrototypeOf(ShaderWater)).call(this, init, util, glMatrix, webgl, webvr, shaderName, lights));

	        console.log('In ShaderWater class');

	        _this.required.buffer.indices = true, _this.required.buffer.texCoords = true, _this.required.buffer.colors = true, _this.required.buffer.normals = true, _this.required.buffer.tangents = true, _this.required.lights = 1, _this.required.textures = 5;

	        // TODO: include more for water

	        return _this;
	    }

	    /* 
	     * Vertex and Fragment Shaders. We use the internal 'program' object from the webgl object to compile these. 
	     * Alternatively, They may be defined to load from HTML or and external file.
	     * @return {Object{code, varList}} an object, with internal elements
	     * code: The shader code.
	     * varList: A scanned list of all the variables in the shader code (created by webgl object).
	     */


	    _createClass(ShaderWater, [{
	        key: 'vsSrc',
	        value: function vsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            'attribute vec3 ' + this.webgl.attributeNames.aVertexPosition[0] + ';',
	            //'attribute vec4 ' + this.webgl.attributeNames.aVertexColor[ 0 ] + ';',
	            'attribute vec2 ' + this.webgl.attributeNames.aTextureCoord[0] + ';', 'attribute vec3 ' + this.webgl.attributeNames.aVertexNormal[0] + ';', 'uniform mat4 uMVMatrix;', // Model-view matrix
	            'uniform mat4 uPMatrix;', // Perspective matrix
	            'uniform mat3 uNMatrix;', // Inverse-transpose of Model-View matrix

	            // World position.

	            'uniform vec3 uPOV;',

	            // Adjusted positions and normals.

	            'varying vec3 vPOV;', // user point of view (camera)
	            'varying vec4 vPositionW;', // adjusted position
	            'varying vec4 vNormalW;', // adjusted normal

	            'varying vec2 vTextureCoord;', 'void main(void) {',

	            // View-Model-Position-Projection matrix.

	            '    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);', '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * water fragment shader.
	         * - varying texture coordinate
	         * - texture 2D sampler
	         */

	    }, {
	        key: 'fsSrc',
	        value: function fsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            'void main(void) {', 'gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);', '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * initialize the update() and render() methods for this shader.
	         * @param{Prim[]} primList a list of initializing Prims (optional).
	         */

	    }, {
	        key: 'init',
	        value: function init(primList) {

	            var arr = this.setup(),
	                gl = arr[0],
	                canvas = arr[1],
	                mat4 = arr[2],
	                mat3 = arr[3],
	                vec3 = arr[4],


	            //pMatrix = arr[ 5 ],

	            //mvMatrix = arr[ 6 ],

	            program = arr[5],
	                vsVars = arr[6],
	                fsVars = arr[7],
	                stats = arr[8],
	                near = arr[9],
	                far = arr[10],
	                vr = arr[11],
	                iSize = arr[12];

	            // Shorter reference.

	            var shaderProgram = program.shaderProgram;

	            // If we init with primList, add them here.

	            if (primList) {

	                program.renderList = this.util.concatArr(program.renderList, primList);
	            }

	            // Local reference to our matrices.

	            //let pMatrix = this.pMatrix,

	            var mvMatrix = this.mvMatrix,
	                vMatrix = this.vMatrix,
	                mMatrix = this.mMatrix;

	            /** 
	             * POLYMORPHIC METHODS
	             */

	            // Update Prim position, motion - given to World object.

	            program.update = function (prim, MVM, updatePrim) {

	                // Update the model-view matrix using current Prim position, rotation, etc.

	                prim.setMV(mvMatrix);

	                // Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.

	                mat3.normalFromMat4(nMatrix, mvMatrix);

	                // Update coordinates every time for mono, but only one time for stereo.

	                if (updatePrim) prim.updateCoords();
	            };

	            // Create a save matrix.

	            var saveMV = mat4.create();

	            /*
	             * Prim rendering. We pass in a the Projection Matrix so we can render in mono and stereo, and 
	             * the position of the camera/eye (POV) for some kinds of rendering (e.g. specular).
	             * @param {glMatrix.mat4} PM projection matrix, either mono or stereo.
	             * @param {glMatrix.vec3} pov the position of the camera in World space.
	             * @param {Boolean} updatePrim if true, adjust Prim coordinates. Do every time for mono, but only 
	             * one time for stereo.
	             */

	            program.render = function (PM, pov, updatePrim) {

	                if (!program.renderList.length) return;

	                gl.useProgram(shaderProgram);

	                // Save the model-view supplied by the shader. Mono and VR return different MV matrices.

	                mat4.copy(saveMV, mvMatrix);

	                // Begin program loop

	                for (var i = 0, len = program.renderList.length; i < len; i++) {

	                    var prim = program.renderList[i];

	                    // Only render if we are visible, and have at least one texture loaded.

	                    if (!prim || prim.alpha === 0) continue;

	                    // Update Model-View matrix with standard Prim values.

	                    program.update(prim, mvMatrix, updatePrim);

	                    // TODO: bind buffers

	                    // TODO: Set fragment shader sampler uniform.

	                    // TODO: drawElements()

	                    // Copy back the original for the next Prim. 

	                    mat4.copy(mvMatrix, saveMV);
	                } // end of renerList for Prims
	            }; // end of program.render()
	        } // end of init()

	    }]);

	    return ShaderWater;
	}(_shader2.default);

	exports.default = ShaderWater;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shader = __webpack_require__(10);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var ShaderMetal = function (_Shader) {
	    _inherits(ShaderMetal, _Shader);

	    /** 
	     * --------------------------------------------------------------------
	     * VERTEX SHADER 4
	     * a directionally-lit textured object vertex shader.
	     * @link http://learningwebgl.com/blog/?p=684
	     * - vertex position
	     * - texture coordinate
	     * - model-view matrix
	     * - projection matrix
	     * --------------------------------------------------------------------
	     */
	    function ShaderMetal(init, util, glMatrix, webgl, webvr, shaderName, lights) {
	        _classCallCheck(this, ShaderMetal);

	        var _this = _possibleConstructorReturn(this, (ShaderMetal.__proto__ || Object.getPrototypeOf(ShaderMetal)).call(this, init, util, glMatrix, webgl, webvr, shaderName, lights));

	        console.log('In ShaderMetal class');

	        _this.required.buffer.indices = true, _this.required.buffer.texCoords = true, _this.required.buffer.colors = true, _this.required.buffer.normals = true, _this.required.lights = 1, _this.required.textures = 0;

	        return _this;
	    }

	    /* 
	     * Vertex and Fragment Shaders. We use the internal 'program' object from the webgl object to compile these. 
	     * Alternatively, They may be defined to load from HTML or and external file.
	     * @return {Object{code, varList}} an object, with internal elements
	     * code: The shader code.
	     * varList: A scanned list of all the variables in the shader code (created by webgl object).
	     */


	    _createClass(ShaderMetal, [{
	        key: 'vsSrc',
	        value: function vsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            'attribute vec3 ' + this.webgl.attributeNames.aVertexPosition[0] + ';',
	            //'attribute vec4 ' + this.webgl.attributeNames.aVertexColor[ 0 ] + ';',
	            'attribute vec2 ' + this.webgl.attributeNames.aTextureCoord[0] + ';', 'attribute vec3 ' + this.webgl.attributeNames.aVertexNormal[0] + ';', 'uniform mat4 uMVMatrix;', // Model-view matrix
	            'uniform mat4 uPMatrix;', // Perspective matrix
	            'uniform mat3 uNMatrix;', // Inverse-transpose of Model-View matrix

	            // World position.

	            'uniform vec3 uPOV;',

	            // Adjusted positions and normals.

	            'varying vec3 vPOV;', // user point of view (camera)
	            'varying vec4 vPositionW;', // adjusted position
	            'varying vec4 vNormalW;', // adjusted normal

	            'varying vec2 vTextureCoord;', 'void main(void) {',

	            // View-Model-Position-Projection matrix.

	            '    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);', '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * metal fragment shader.
	         * - varying texture coordinate
	         * - texture 2D sampler
	         */

	    }, {
	        key: 'fsSrc',
	        value: function fsSrc() {

	            var s = [

	            // Set precision.

	            this.floatp,

	            /* 
	             * Attribute names are hard-coded in the WebGL object, with rigid indices.
	             * vertex, textureX coordinates, colors, normals, tangents.
	             */

	            'void main(void) {', 'gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);', '}'];

	            return {

	                code: s.join('\n'),

	                varList: this.webgl.createVarList(s)

	            };
	        }

	        /** 
	         * initialize the update() and render() methods for this shader.
	         * @param{Prim[]} primList a list of initializing Prims (optional).
	         */

	    }, {
	        key: 'init',
	        value: function init(primList) {

	            var arr = this.setup(),
	                gl = arr[0],
	                canvas = arr[1],
	                mat4 = arr[2],
	                mat3 = arr[3],
	                vec3 = arr[4],
	                program = arr[5],
	                vsVars = arr[6],
	                fsVars = arr[7],
	                stats = arr[8],
	                near = arr[9],
	                far = arr[10],
	                vr = arr[11],
	                iSize = arr[12];

	            // Shorter reference.

	            var shaderProgram = program.shaderProgram;

	            // If we init with primList, add them here.

	            if (primList) {

	                program.renderList = this.util.concatArr(program.renderList, primList);
	            }

	            // Local reference to our matrices.

	            //let pMatrix = this.pMatrix,

	            var mvMatrix = this.mvMatrix,
	                vMatrix = this.vMatrix,
	                mMatrix = this.mMatrix;

	            /** 
	             * POLYMORPHIC METHODS
	             */

	            // Update Prim position, motion - given to World object.

	            program.update = function (prim, MVM, updatePrim) {

	                // Update the model-view matrix using current Prim position, rotation, etc.

	                prim.setMV(mvMatrix);

	                // Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.

	                mat3.normalFromMat4(nMatrix, mvMatrix);

	                // Update coordinates every time for mono, but only one time for stereo.

	                if (updatePrim) prim.updateCoords();
	            };

	            // Create a save matrix.

	            var saveMV = mat4.create();

	            /*
	             * Prim rendering. We pass in a the Projection Matrix so we can render in mono and stereo, and 
	             * the position of the camera/eye (POV) for some kinds of rendering (e.g. specular).
	             * @param {glMatrix.mat4} PM projection matrix, either mono or stereo.
	             * @param {glMatrix.vec3} pov the position of the camera in World space.
	             * @param {Boolean} updatePrim if true, adjust Prim coordinates. Do every time for mono, but only 
	             * one time for stereo.
	             */

	            program.render = function (PM, pov, updatePrim) {

	                if (!program.renderList.length) return;

	                gl.useProgram(shaderProgram);

	                // Save the model-view supplied by the shader. Mono and VR return different MV matrices.

	                mat4.copy(saveMV, mvMatrix);

	                // Begin program loop

	                for (var i = 0, len = program.renderList.length; i < len; i++) {

	                    var prim = program.renderList[i];

	                    // Only render if we are visible, and have at least one texture loaded.

	                    if (!prim || prim.alpha === 0) continue;

	                    // Update Model-View matrix with standard Prim values.

	                    program.update(prim, mvMatrix, updatePrim);

	                    // TODO: bind buffers

	                    // TODO: Set fragment shader sampler uniform.

	                    // TODO: drawElements()

	                    // Copy back the original for the next Prim. 

	                    mat4.copy(mvMatrix, saveMV);
	                } // end of renderList for Prims
	            }; // end of program.render()
	        } // end of init()

	    }]);

	    return ShaderMetal;
	}(_shader2.default);

	exports.default = ShaderMetal;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Lights = function () {
	    function Lights(glMatrix) {
	        _classCallCheck(this, Lights);

	        this.glMatrix = glMatrix;

	        this.lightTypes = {

	            LIGHT_0: 'light0', // World Directional (default)

	            LIGHT_1: 'light1',

	            LIGHT_2: 'light2',

	            LIGHT_3: 'light3'

	        };

	        this.lightList = [];

	        // Set a default Light.

	        this.setLight(this.lightTypes.LIGHT_0);
	    }

	    _createClass(Lights, [{
	        key: 'getLight',
	        value: function getLight(id) {

	            if (!id) {

	                id = this.lightTypes.LIGHT_0;
	            }

	            return this.lightList[id];
	        }
	    }, {
	        key: 'getPos',
	        value: function getPos(id) {

	            if (!id) {

	                id = this.lightTypes.LIGHT_0;
	            }

	            return this.lightList[id].lightingDirection;
	        }

	        /** 
	         * Set a Light.
	         * @param {String} lightType the type of light to use (pre-defined in constructor).
	         * @param {glMatrix.vec3} ambient the ambient (nondirectional) lighting from the light. 
	         * usually zero if this isn't a World light.
	         * @param {GlMatrix.vec3} lightingDireciton the direction of the light, also its apparent position.
	         * @param {GlMatrix.vec3} directionalColor the color of the light.
	         * @param {Boolean} active if true, the light is on, else false.
	         */

	    }, {
	        key: 'setLight',
	        value: function setLight(type) {
	            var ambient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0.3, 0.3, 0.3];
	            var lightingDirection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [-1000.0, 0.0, 1000.1];
	            var directionalColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [1, 1, 1];
	            var active = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;


	            this.lightList[type] = {

	                ambient: ambient,

	                lightingDirection: lightingDirection,

	                directionalColor: directionalColor,

	                attenuation: 0.0,

	                radius: 1.0

	            };
	        }

	        /** 
	         * Set Light to an XYZ coordinate.
	         */

	    }, {
	        key: 'setPos',
	        value: function setPos(id, x, y, z) {

	            if (!id) {

	                id = this.lightTypes.LIGHT_0;
	            }

	            this.lightList[id].lightingDirection = [-x, -y, z];
	        }

	        /**
	         * Set Light by Polar coordinates.
	         */

	    }, {
	        key: 'setPolar',
	        value: function setPolar(id, u, v) {

	            if (!id) {

	                id = this.lightTypes.LIGHT_0;
	            }

	            // TODO:
	        }
	    }]);

	    return Lights;
	}();

	exports.default = Lights;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _assetPool = __webpack_require__(19);

	var _assetPool2 = _interopRequireDefault(_assetPool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var ShaderPool = function (_AssetPool) {
	    _inherits(ShaderPool, _AssetPool);

	    /** 
	     * Store Shader objects used to render scenes, input 
	     * inherited classes from Shader (e.g. ShaderWater).
	     */

	    function ShaderPool(init, util, glMatrix, webgl) {
	        _classCallCheck(this, ShaderPool);

	        var _this = _possibleConstructorReturn(this, (ShaderPool.__proto__ || Object.getPrototypeOf(ShaderPool)).call(this, util));

	        console.log('In ShaderPool class');

	        _this.webgl = webgl;

	        _this.glmatrix = glMatrix;

	        if (_this.init) {

	            // do something

	        }

	        return _this;
	    }

	    /** 
	     * Render everything in mono 3d, for non-VR use case.
	     * NOTE: you may want to call shaders individually in World.render()
	     */


	    _createClass(ShaderPool, [{
	        key: 'renderMono',
	        value: function renderMono() {

	            var keyList = this.keyList;

	            for (var i in keyList) {

	                keyList[i].program.render();
	            }
	        }

	        /** 
	         * Render everything in VR, for displays or polyfills.
	         * NOTE: you may want to call shaders individually in World.render()
	         */

	    }, {
	        key: 'renderVR',
	        value: function renderVR(vr, display, frameData) {

	            var keyList = this.keyList;

	            for (var i in this.keyList) {

	                keyList[i].program.renderVR(vr, display, frameData);
	            }
	        }
	    }]);

	    return ShaderPool;
	}(_assetPool2.default);

	exports.default = ShaderPool;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AssetPool = function () {

	    /** 
	     * Load a set of URLs to grab, and run parallel, queued requests until 
	     * complete or timed out. Also provide a callback so the requesting object 
	     * can check if their load is complete.
	     * Inspired by:
	     * @link https://blog.hospodarets.com/fetch_in_action
	     */
	    function AssetPool(util) {
	        _classCallCheck(this, AssetPool);

	        this.util = util, this.emitter = util.emitter, this.MIN_WAIT_TIME = 100, this.MAX_TRIES = 6, this.NOT_IN_LIST = this.util.NOT_IN_LIST,

	        // Store assets as a pool, with two arrays referencing them (numeric and key-based).

	        this.keyList = [], this.defaultKey = null;
	    }

	    /*
	     * ---------------------------------------
	     * ASSET POOL OPERATIONS
	     * ---------------------------------------
	     */

	    /** 
	     * Get the default asset, if it is defined.
	     * @returns {Object} default object in the pool.
	     */


	    _createClass(AssetPool, [{
	        key: 'getPlaceholder',
	        value: function getPlaceholder() {

	            if (this.defaultKey) {

	                return this.keyList[this.defaultKey];
	            }

	            return null;
	        }

	        /** 
	         * Find a texture by its key (numeric or string)
	         */

	    }, {
	        key: 'getAssetByKey',
	        value: function getAssetByKey(key) {

	            if (key) {

	                if (this.keyList[key]) {

	                    return this.keyList[key];
	                }
	            } else {

	                console.error('AssetPool::getAssetByKey(): undefined key');
	            }

	            return null;
	        }

	        /** 
	         * Find an asset by its name
	         */

	    }, {
	        key: 'getAssetByName',
	        value: function getAssetByName(name) {

	            if (name) {

	                for (var i in this.keyList) {

	                    var o = this.keyList[i];

	                    if (o.name && o.name === name) {

	                        return o;
	                    }
	                }
	            }

	            return null;
	        }

	        /** 
	         * Get ALL the assets associated with this object, returned as 
	         * key => value array.
	         * @return {Array} the array of assets in the pool.
	         */

	    }, {
	        key: 'getAllAssets',
	        value: function getAllAssets() {

	            return this.keyList;
	        }

	        /** 
	         * Find an asset by its path, if the path was not used as the key.
	         * @param {String} path the URL of the texture file.
	         * @returns {Boolean} if found in current textureList, return true, else false.
	         */

	    }, {
	        key: 'pathInList',
	        value: function pathInList(path) {

	            if (path) {

	                for (var i in this.keyList) {

	                    var obj = this.keyList[i];

	                    //////////////////////////console.log( '^^^^obj.path:' + obj.path + ' path:' + path )

	                    if (obj.path && obj.path === path) {

	                        return obj;
	                    }
	                }
	            }

	            return null;
	        }

	        /** 
	         * Check if the actual object (not a clone) has already been added to the list.
	         * @param {Object} the test object.
	         * @returns {Object|null} if found, return the object, else null.
	         */

	    }, {
	        key: 'assetInList',
	        value: function assetInList(obj) {

	            if (obj) {

	                for (var i in this.keyList) {

	                    var o = this.keyList[i];

	                    if (o === obj) {

	                        return o;
	                    }
	                }
	            }

	            return null;
	        }

	        /*
	         * add an asset to the pool.
	         * @param {String|Number} key the key of the object, either a number or a guid style key.
	         * @param {Object} the asset.
	         * @returns {Object} the stored object.
	        */

	    }, {
	        key: 'addAsset',
	        value: function addAsset(obj, key) {

	            if (obj) {

	                if (key) {

	                    // Object saves its associative key.

	                    obj.key = key;

	                    if (this.keyList[key]) {

	                        if (this.keyList[key] === obj) {

	                            ///////////console.warn( 'AssetPool::addAsset(): asset ' + key + ' already added to pool' );

	                            return obj;
	                        } else {

	                            /////////console.warn( 'AssetPool::addAsset(): replacing asset at key:' + key );

	                        }
	                    }
	                } else {

	                    obj.key = this.util.computeId();

	                    // Undefined path ok for procedural geometry.

	                    ///////////console.log( '^^ adding obj:' + obj.key + ' path:' + obj.path );

	                    // Add the key to the object, just added to the AssetPool

	                    this.keyList[obj.key] = obj;
	                }
	            }

	            // Return the asset

	            return obj;
	        }
	    }, {
	        key: 'removeAsset',
	        value: function removeAsset(key) {

	            var obj = null;

	            if (this.keyList[key]) {

	                obj = this.keyList[key];

	                if (obj) {

	                    delete this.keyList[key];
	                }
	            } else {

	                console.warn('AssetPool::removeAsset(): key not found in assetList');
	            }

	            return obj;
	        }

	        /*
	         * ---------------------------------------
	         * FETCH API (WRAPPED)
	         * ---------------------------------------
	         */

	        /** 
	         * Wrap a Promise in an object.
	         */

	    }, {
	        key: 'getWrappedPromise',
	        value: function getWrappedPromise() {

	            var wrappedPromise = {},
	                promise = new Promise(function (resolve, reject) {

	                wrappedPromise.resolve = resolve, wrappedPromise.reject = reject;
	            });

	            wrappedPromise.then = promise.then.bind(promise);

	            wrappedPromise.catch = promise.catch.bind(promise);

	            wrappedPromise.promise = promise;

	            return wrappedPromise;
	        }

	        /** 
	         * get fetch wrapped into a wrapped Promise.
	         * @link http://stackoverflow.com/questions/35520790/error-handling-for-fetch-in-aurelia
	         */

	    }, {
	        key: 'getWrappedFetch',
	        value: function getWrappedFetch(url, params, tries, pos) {
	            var _this = this;

	            var wrappedPromise = this.getWrappedPromise();

	            var req = new Request(url, params);

	            wrappedPromise.url = url;

	            wrappedPromise.params = params;

	            wrappedPromise.tries = tries;

	            wrappedPromise.pos = pos;

	            // Start the timeout, which lengthens with each attempt.

	            wrappedPromise.timeoutId = setTimeout(function () {

	                console.warn('AssetPool::getWrappedFetch(): TIMEOUT' + ' for ' + (_this.MIN_WAIT_TIME * wrappedPromise.tries + 1) + 'msec ' + wrappedPromise.url);

	                wrappedPromise.catch(0);
	            }, this.MIN_WAIT_TIME * wrappedPromise.tries);

	            // Apply arguments to fetch.

	            fetch(req).then(function (response) {

	                if (!response.ok) {
	                    // catch 404 errors

	                    throw new Error('Network response was not ok for ' + wrappedPromise.url);
	                } else {

	                    return response; // send to the next '.then'
	                }
	            }).then(function (response) {

	                //console.warn( 'AssetPool::getWrappedFetch(): OK, RESOLVE ' + wrappedPromise.url );

	                clearTimeout(wrappedPromise.timeoutId);

	                return wrappedPromise.resolve(response);
	            }, function (error) {

	                console.warn('AssetPool::getWrappedFetch(): NOT OK, REJECT ' + wrappedPromise.url);

	                clearTimeout(wrappedPromise.timeoutId);

	                return wrappedPromise.reject(error); // TODO: using Error causes a strange fail here(!)
	            }).catch(function (error) {

	                console.warn('AssetPool::getWrappedFetch(): NOT OK, CATCH ' + wrappedPromise.url);

	                clearTimeout(wrappedPromise.timeoutId);

	                return wrappedPromise.catch(error);
	            });

	            return wrappedPromise;
	        }

	        /** 
	         * Get an individual file from the server.
	         * @param {String} requestURL the file path for our asset.
	         * @param {String} pos position identifier for the asset, so the requesting object can put it in the right place.
	         * @param {Function} updateFn callback function when an asset loads or fails
	         * @param {Boolean} cacheBust if true, add a random query string to avoid caching
	         * @param {String} mimeType the MIME type of the expected data
	         * @param {Number} tries. If load fails, try to load again with a longer timeout. Load until 
	         *        number of 'tries' = this.MAX_TRIES. Lengthen the timeout with each try.
	         */

	    }, {
	        key: 'doRequest',
	        value: function doRequest(requestURL, pos, updateFn) {
	            var cacheBust = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	            var _this2 = this;

	            var mimeType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'text/plain';
	            var tries = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;


	            var headers = new Headers({

	                'Content-Type': mimeType + '; charset: UTF-8'

	            });

	            var ft = this.getWrappedFetch(cacheBust ? requestURL + '?' + new Date().getTime() : requestURL, {

	                method: 'get', // optional, "GET" is default value

	                mode: 'cors',

	                redirect: 'follow',

	                headers: headers

	            }, tries, // attach some additional variables to this fetch

	            pos // position identifier for object requested, from the calling requestor object.

	            );

	            // Return the Promise.

	            return ft.promise.then(function (response) {

	                //console.warn( '1. AssetPool::doRequest(): ft.promise FIRST .then OK, response.status:' + response.status + ' for ' + ft.url );

	                //console.warn( '1. AssetPool::doRequest(): ft.promise FIRST .then OK, response:' + response + ' for ' + ft.url );

	                //console.warn( '1. AssetPool::doRequest(): ft.promise FIRST .then OK, tries:' + ft.tries + ' for ' + ft.url );

	                //console.warn( '1. AssetPool::doRequest(): ft.promise FIRST .then OK, mimeType:' + mimeType + ' for ' + ft.url );

	                var data = null;

	                // Check response.status ('0' is ok if we are serving from desktop os).

	                if (response.status === 200 || response.status === 0) {

	                    if (mimeType === 'application/json') {

	                        data = response.json();
	                    } else if (mimeType.indexOf('text') !== _this2.util.NOT_IN_LIST) {

	                        data = response.text();
	                    } else if (mimeType === 'application/xml') {

	                        data = response.formData();
	                    } else if (mimeType.indexOf('image') !== _this2.util.NOT_IN_LIST) {

	                        data = response.blob();

	                        // TODO: data = arraybufferview type
	                        ///TODO: data = response.arrayBuffer(); // NEED ARRAYBUFFERVIEW
	                    } else {
	                        // all other mime types (e.g. audio, video)

	                        data = response.blob();
	                    }

	                    // Return a resolved Promise to the next '.then'.

	                    return Promise.resolve(data);
	                } else {

	                    return Promise.reject(response);
	                }
	            }, function (error) {
	                // Triggered by setTimeout(). Try up to this.MAX_TRIES before giving up.

	                //console.warn( '2. AssetPool::doRequest(): ft.promise FIRST .then error, error:' + error + ' for ' + ft.url );

	                //console.warn( '2. AssetPool::doRequest(): ft.promise FIRST .then error, tries:' + ft.tries + ' for ' + ft.url );

	                ft.tries++;

	                if (ft.tries < _this2.MAX_TRIES) {

	                    console.warn('AssetPool::doRequest(): ft.promise .then error, TRYING AGAIN:' + error + ' for ' + ft.url);

	                    _this2.doRequest(requestURL, pos, updateFn, cacheBust = true, mimeType, ft.tries);
	                }

	                return Promise.resolve(error);
	            }).then(function (response) {

	                if (response instanceof Error) {

	                    // Run the callback with error values.

	                    updateFn({ pos: pos, path: requestURL, data: null, error: response }); // Send a wrapped error object
	                } else {

	                    // Run the callback we got in the original request, return received file in data.

	                    //console.log('AssetPool::doRequest(): about to call update function')

	                    updateFn({ pos: pos, path: requestURL, data: response, error: false }); // Send the data to the caller.
	                }
	            }, function (error) {

	                // Unknown error?

	                return Promise.reject(0);
	            });
	        }

	        /** 
	         * Add fetch() url requests for resolve, with a timeout for fails. 
	         * when individual fetch()es are complete, run a callback.
	         * when all fetch()es are complete, run a final callback
	         * usage: addRequests( requestor, '/first.jpg', 'second.jpg',...);
	         * @param {Object} requestor the name of the requestor.
	         *         - requestor.name = the name of the requestor
	         *         - requestor.updateFn = the function receiving data from the fetch() call
	         *         - requestor.cacheBust = if true, randomize URL query string to prevent caching
	         *         - requestor.mimeType = if present, set to a specific MIME type. Default = text/text
	         * @param {Function} updateFn the function to call after each fetch completes. The 
	         * calling program is responsible for handing determining if it has enough fetch() 
	         * operations to complete. 
	         */
	        /*
	            addRequests ( requestor ) {
	        
	                let paths = requestor.files;
	        
	                for ( let i = 0; i < paths.length; i++ ) {
	        
	                    let path = paths[ i ];
	        
	                    console.log("AssetPool::addRequests(): " +  path, ", " + typeof requestor.updateFn + ", " + requestor.cacheBust + ", " + requestor.mimeType )
	        
	                    this.doRequest( path, i, requestor.updateFn, requestor.cacheBust, requestor.mimeType, 0 ); // initial request at 0 tries
	        
	                } // end of request loop
	        
	            } // end of addRequests()
	        
	        */

	    }]);

	    return AssetPool;
	}();

	exports.default = AssetPool;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _map2d = __webpack_require__(21);

	var _map2d2 = _interopRequireDefault(_map2d);

	var _map3d = __webpack_require__(23);

	var _map3d2 = _interopRequireDefault(_map3d);

	var _mesh = __webpack_require__(24);

	var _mesh2 = _interopRequireDefault(_mesh);

	var _lights = __webpack_require__(17);

	var _lights2 = _interopRequireDefault(_lights);

	var _geometryPool = __webpack_require__(25);

	var _geometryPool2 = _interopRequireDefault(_geometryPool);

	var _texturePool = __webpack_require__(27);

	var _texturePool2 = _interopRequireDefault(_texturePool);

	var _modelPool = __webpack_require__(26);

	var _modelPool2 = _interopRequireDefault(_modelPool);

	var _audioPool = __webpack_require__(28);

	var _audioPool2 = _interopRequireDefault(_audioPool);

	var _geometryBuffer = __webpack_require__(29);

	var _geometryBuffer2 = _interopRequireDefault(_geometryBuffer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	'use strict';

	var PrimFactory = function () {

	    /** 
	     * @class
	     * Object Factory for Prims, and return vertex and index data 
	     * suitable for creating a VBO and IBO.
	     * 
	     * Because objects can vary widely in composition and have lots of 
	     * properties, we use an Object-Factory pattern here instead of an ES6 class, and 
	     * don't use 'new' operator to create individual Prims.
	     *
	     * Members of the manufactured Prim (values are units, with 1.0 being normalized size).
	     *
	     * Elements of Prims:
	     * 
	     * prim.position      = (glMatrix.vec5) [ x, y, z, rounding, | startSlice, endSlice,  ]
	     * prim.dimensions    = (glMatrix.vec4) [ x, y, z ]
	     * prim.divisions     = (glMatrix.vec5) [ x, y, z ]
	     * prim.acceleration  = (glMatrix.vec3) [ x, y, z ]
	     * prim.rotation      = (glMatrix.vec3) [ x, y, z ]
	     * prim.angular       = (glMatrix.vec3) [ x, y, z ]
	     * 
	     * prim.geometry      = GeometryBuffer flattened arrays plus WebGL objects with the following datatypes:
	     *
	     *  { 
	     *    vertices:  [],   // Float32Array
	     *    indices:   [],   // Uint32Array (Uint16Array if 32-bit indices not supported)
	     *    texCoords: [],   // Float32Array
	     *    normals:   [],   // Float32Array
	     *    tangents:  [],   // Float32Array
	     *    colors:    []    // Float32Array
	     *  }
	     * 
	     * prim.shader        = Shader used by this prim.
	     * prim.materials     = materials used by this prim, may contain textures.
	     * prim.audio         = array of audio files use by this prim.
	     * prim.video         = array of video files used by this prim.
	     *
	     * Array optimization
	     * https://gamealchemist.wordpress.com/2013/05/01/lets-get-those-javascript-arrays-to-work-fast/
	     *
	     * @constructor
	     * Note don't call anything in World that requires World.init() in constructor.
	     *
	     * @param {Boolean} init if true, initialize immediately.
	     * @param {Util} util shared utility methods, patches, polyfills.
	     * @param {glMatrix} glMatrix fast array manipulation object.
	     * @param {WebGL} webgl object holding the WebGLRenderingContext.
	     * @param {TexturePool} a TexturePool object for accessing textures.
	     * @param {ModelPool} a ModelPool for reading OBJ WaveFront and similar 3d object files.
	     * @param {GeometryPool} Creates geometry, procedural or Mesh (by invoking ModelPool).
	     */
	    function PrimFactory(init, world) {
	        var _this = this;

	        _classCallCheck(this, PrimFactory);

	        console.log('in PrimFactory class');

	        // Keep a copy of the World for up-communication.

	        this.world = world, this.util = world.util, this.webgl = world.webgl, this.glMatrix = world.glMatrix,

	        // Attach 1 copy of the Texture loader to this Factory.

	        this.texturePool = world.texturePool, // new TexturePool( init, util, webgl );

	        // Attach 1 copy of the Model loader to this Factory.

	        this.modelPool = world.modelPool, // new ModelPool( init, util, webgl );

	        // Attach 1 copy of GeometryPool to this Factory (itself loading a reference to world.modelPool.

	        this.geometryPool = world.geometryPool,

	        // Attach 1 copy of MaterialPool to this Factory.

	        this.materialPool = world.materialPool;

	        // Keep a list of all created Prims here.

	        this.prims = [];

	        /** 
	         * ---------------------------------------
	         * EMITTER CALLBACKS
	         * ---------------------------------------
	         */

	        // Bind the callback for geometry initialization applied to individual prims (GeometryPool, Mesh, and ModelPool).

	        // Alias Wavefront OBJ format files.

	        this.util.emitter.on(this.util.emitter.events.OBJ_GEOMETRY_READY, function (prim, key, options) {

	            ////console.log( 'PrimFactory::' + prim.name + ' OBJ geometry ready, key:' + key + ' pos:' + options.pos );

	            // Object, Group, SmoothingGroup starts.

	            var coords = _this.modelPool.keyList[key];

	            prim.objects = coords.options.objects;

	            // Start of section of a model, typically with a new material.

	            prim.groups = coords.options.groups;

	            // Use smoothingGroups to redefine normals.

	            prim.smoothingGroups = coords.options.smoothingGroups;

	            // Material start array.

	            prim.matStarts = coords.options.matStarts;

	            _this.initPrimGeometry(prim, coords, options);

	            prim.shader.addPrim(prim); // TRY to add it
	        });

	        // HYG stellar database (only fires once for each database load).

	        this.util.emitter.on(this.util.emitter.events.HYG_GEOMETRY_READY, function (prim, key, options) {

	            console.log('PrimFactory::HYG_GEOMETRY_READY event');

	            var coords = _this.modelPool.keyList[key];

	            // Star data, one for each vertex.

	            prim.objects = coords.options.objects;

	            // Default material.

	            prim.matStarts = coords.options.matStarts;

	            // Note: this routine computes the bounding box, needed for the rotation.

	            _this.initPrimGeometry(prim, coords, options);

	            // If the World is gelocated, check if this Prim reacts to Geolocation data. If so, fire a position/rotation update.

	            if (prim.geolocate === true) {

	                var geoData = _this.world.geoData;

	                if (geoData && _this.util.isNumber(geoData.latitude) && _this.util.isNumber(geoData.longitude)) {

	                    console.log('PrimFactory::HYG_GEOMETRY_READY event, world.geoData:' + geoData);

	                    _this.world.computeSkyRotation(prim, geoData);
	                }
	            }

	            prim.shader.addPrim(prim);
	        });

	        // Standard procedural Prim shapes

	        this.util.emitter.on(this.util.emitter.events.PROCEDURAL_GEOMETRY_READY, function (prim, key, options) {

	            ////console.log( 'PrimFactory::' + prim.name + ' Procedural geometry ready, key:' + key + ' pos:' + options.pos );

	            var coords = _this.modelPool.keyList[key];

	            prim.matStarts = [[_this.materialPool.createDefaultName(prim.name), 0, coords.indices.length]]; //////////////////////////////

	            _this.initPrimGeometry(prim, coords, options);

	            prim.shader.addPrim(prim); // TRY to add it
	        });

	        // Bind Prim callback for a new material applied to individual Prims.

	        this.util.emitter.on(this.util.emitter.events.MATERIAL_READY, function (prim, key, materialName) {

	            _this.initPrimMaterial(prim, _this.materialPool.keyList[key], materialName); // associative array

	            prim.shader.addPrim(prim); // TRY to add it
	        });

	        // Bind Prim callback for a new texture loaded .(TexturePool).

	        this.util.emitter.on(this.util.emitter.events.TEXTURE_2D_READY, function (prim, key, options) {

	            _this.initPrimTexture(prim, _this.texturePool.keyList[key], options);

	            prim.shader.addPrim(prim); // TRY to add its
	        });

	        // Bind Prim callback for a new texture loaded .(TexturePool).

	        this.util.emitter.on(this.util.emitter.events.TEXTURE_3D_READY, function (prim, key, options) {

	            _this.initPrimTexture3d(prim, _this.texturePool.keyList[key], options);

	            // Check if complete, add if it is...

	            prim.shader.addPrim(prim);
	        });

	        // Bind Prim callback for a new texture loaded .(TexturePool).

	        this.util.emitter.on(this.util.emitter.events.TEXTURE_CUBE_MAP_READY, function (prim, key, options) {

	            _this.initPrimTextureCubeMap(prim, _this.texturePool.keyList[key], options);

	            // Check if complete, add if it is...

	            prim.shader.addPrim(prim);
	        });

	        // Bind Prim callback for a Shader accepting a Prim for rendering.

	        this.util.emitter.on(this.util.emitter.events.PRIM_ADDED_TO_SHADER, function (prim) {

	            // If we are a Prim that needs geolocation, update our rotation (STARDOME, TERRAIN)

	            // Get the maximum alpha in all the defined textures. If we have more than one, don't use 'default'.

	            var maxAlpha = 0;

	            for (var i in prim.materials) {

	                var m = prim.materials[i];

	                if (m.name.indexOf(_this.util.defaultKey) !== _this.util.NOT_IN_LIST) {

	                    if (Number.isFinite(m.transparency)) {

	                        var alpha = 1.0 - m.transparency;

	                        if (alpha > maxAlpha) maxAlpha = alpha;
	                    }
	                }
	            }

	            if (maxAlpha > 0) {

	                prim.alpha = maxAlpha;
	            } // otherwise, keep the default of 1.0

	            // Fade in from invisible to our assigned alpha value.

	            //console.log(prim.name + " SETTING PRIM FADEIN, shader:" + prim.shader.name + ' and defaultShader:' + prim.defaultShader)

	            prim.setFade(0, prim.alpha, 0.001, 'easeQuad');

	            prim.failCount = 0;
	        });

	        this.util.emitter.on(this.util.emitter.events.PRIM_REMOVED_FROM_SHADER, function (prim) {

	            // TODO:

	        });
	    } // end of constructor


	    /** 
	     * Create a large coordinate data array with data for multiple Prims.
	     * When a Prim is made, we store a reference in the this.prims[] 
	     * array. So, to make one, we just concatenate their  
	     * vertices. Use to send multiple prims sharing the same Shader.
	    // TODO: SET UP VERTEX ARRAYS, http://blog.tojicode.com/2012/10/oesvertexarrayobject-extension.html
	    // TODO: https://developer.apple.com/library/content/documentation/3DDrawing/Conceptual/OpenGLES_ProgrammingGuide/TechniquesforWorkingwithVertexData/TechniquesforWorkingwithVertexData.html
	    // TODO: http://max-limper.de/tech/batchedrendering.html
	     * @param {glMatrix.vec3[]} vertices
	     * @returns {glMatrix.vec3[]} vertices
	     */


	    _createClass(PrimFactory, [{
	        key: 'setVertexData',
	        value: function setVertexData(vertices) {

	            vertices = [];

	            for (var i in this.prims) {

	                vertices = vertices.concat(this.prims[i].geometry.vertices.data);
	            }

	            return vertices;
	        }

	        /** 
	         * get the big array with all index data. Use to 
	         * send multiple prims sharing the same Shader.
	         * @param {Array} indices the indices to add to the larger array.
	         * @returns {Array} the indices.
	         */

	    }, {
	        key: 'setIndexData',
	        value: function setIndexData(indices) {

	            indices = [];

	            for (var i in this.prims) {

	                indices = indices.concat(this.prims[i].geometry.indices.data);
	            }

	            return indices;
	        }

	        /** 
	         * Add a new texture to the Prim (callback for TEXTURE_2D_READY event).
	         * @param {Prim} prim the prim to be updated.
	         * @param {TextureObj} textureObj the texture object returned from TexturePool.
	         * @param {Number} pos a position to write the texture to.
	         */

	    }, {
	        key: 'initPrimTexture',
	        value: function initPrimTexture(prim, textureObj, options) {

	            ///console.log("Prim::initPrimTexture(): new texture for prim:" + prim.name + ', options:' + options );

	            //if ( options.fromObj ) {

	            //    console.warn(">>PrimFactory::initPrimTexture(): TEXTURE COMING THROUGH FROM AN OBJ FILE FOR: " + prim.name + " WITH NAME:" + options.materialName + " WITH MATERIAL KEY:" + options.materialKey )

	            //}

	            /* 
	             * Find the associated material from the material key given to the texture.
	             */

	            var m = prim.materials[options.materialName];

	            //for ( let i in prim.materials ) {

	            //    console.log(">>PrimFactory::initPrimTexture(): current materials are:" + prim.materials[ i ].name)

	            //}

	            if (m) {

	                console.log('PrimFactory::initPrimTexture(): adding texture ' + options.type + ' to material:' + options.materialName);

	                m[options.type] = textureObj.texture, m[options.type + '_path'] = textureObj.path, m[options.type + '_key'] = textureObj.key, m[options.type + '_options'] = options[options.type + '_options'];
	            } else {

	                console.log('PrimFactory::initPrimTexture(): no material, creating placeholder for material:' + options.materialName);

	                prim.materials[options.materialName] = this.materialPool.default(options.materialName);
	            }
	        }

	        /** 
	         * Add a new 3d texture to the Prim.
	         */

	    }, {
	        key: 'initPrimTexture3d',
	        value: function initPrimTexture3d(prim, textureObj, options) {

	            console.log("Prim::initPrimTexture(): new 3D texture for prim:" + prim.name + ', options:' + options);
	        }

	        /** 
	         * Add a new cubemap texture to the Prim
	         */

	    }, {
	        key: 'initPrimTextureCubeMap',
	        value: function initPrimTextureCubeMap(prim, textureObj, options) {

	            console.log("Prim::initPrimTexture(): new CubeMap texture for prim:" + prim.name + ', options:' + options);
	        }

	        /** 
	         * Add ma material description to the Prim.
	         * Note: a single .mtl file may add multiple materials.
	         * @param {Prim} prim the prim.
	         * @param {Material} material the material object.
	         * @param {Number} pos starting position in array (usually 0).
	         */

	    }, {
	        key: 'initPrimMaterial',
	        value: function initPrimMaterial(prim, material, options) {

	            /////console.log('Prim::initMaterial(): new material:' + material.name + ' for prim:' + prim.name + ' key:' + material.key );

	            var m = prim.materials[material.name];

	            /* 
	             * If a texture arrives before a material (PrimFactor.initPrimTexture()), it creates a placeholder material with 
	             * default values. Check if it exists, and merge our material values onto it if necessary.
	             */

	            if (m && m.name === options.materialName) {
	                // merge over our values, except for textures and texture options.

	                console.log('Prim::initMaterial(): found existing material:' + material.name + ' for prim:' + prim.name);

	                this.materialPool.mergeTo(m, material);
	            } else {

	                // Just add the material.

	                console.log('Prim::initMaterial(): adding new material:' + material.name + ' for prim:' + prim.name);

	                prim.materials[material.name] = material;
	            }
	        }

	        /** 
	         * Initialize Prim geometry from proceedural geometry routines or OBJ wavefront files.
	         * @param {prim} prim the Prim.
	         * @param {String} key the identifying the geometry in the ModelPool.
	         * @param {Object} coords coordinates object returned by procedural, Mesh, or ModelPool. Added 
	         * to the ModelPool. The method gets the coords object from ModelPool via a key (see constructor).
	         * { 
	         *   vertices: vertices, 
	         *   indices: indices,
	         *   normals: normals, 
	         *   texCoords: texCoords, 
	         *   tangents: tangents
	         *   type: type.
	         *   path: file path.
	         *   options: grouping of vertices under objects, groups, materials, smoothinGroups...
	         * };
	         */

	    }, {
	        key: 'initPrimGeometry',
	        value: function initPrimGeometry(prim, coords, options) {

	            // Update vertices if they were supplied.

	            prim.updateVertices(coords.vertices);

	            // Compute bounding box.

	            prim.computeBoundingBox(prim.geometry.vertices.data);

	            /* 
	             * Procedural geometry is already at scale = 1, so bounding box should be computed 
	             * automatically.
	             * 
	             * For a Mesh, look at dimensions supplied in the initial Prim call, 
	             * relative to topleft and bottomright of bounding box
	             * and determine a scale. Use this to scale in the MV matrix
	             *
	             */

	            var scale = prim.dimensions[0] / prim.boundingBox.dimensions[0];

	            scale = Math.max(scale, prim.dimensions[1] / prim.boundingBox.dimensions[1]);

	            scale = Math.max(prim.dimensions[2] / prim.boundingBox.dimensions[2]);

	            prim.scale = [scale, scale, scale];

	            // Update indices if they were supplied.

	            prim.updateIndices(coords.indices);

	            // If normals are used, re-compute.

	            prim.updateNormals(coords.normals);

	            // If texcoords are used, re-compute.

	            prim.updateTexCoords(coords.texCoords);

	            // Tangents aren't supplied by OBJ format, so re-compute.

	            prim.updateTangents();

	            // Colors aren't supplied by OBJ format, but are supplied by others (e.g. Hyg) so re-compute.

	            prim.updateColors(coords.colors);

	            // If a usemtl was specified by a file load

	            // Check our buffers for consistency.

	            //////////prim.geometry.checkBufferData();

	            //if ( prim.name === 'cubesphere' ) {
	            //if ( prim.name === 'TestCapsule' ) {
	            //if ( prim.name === 'colored cube' ) {
	            //if ( prim.name === 'texsphere' ) {

	            var mesh = new _mesh2.default(prim);

	            // SUBDIVIDE TEST

	            //mesh.subdivide( true );
	            //mesh.subdivide( true );
	            //mesh.subdivide( true );
	            //mesh.subdivide( true );
	            //mesh.subdivide( true );
	            //mesh.subdivide( true );
	            //mesh.subdivide( true );
	            //mesh.subdivide( true );
	            //mesh.subdivide( true ); // this one zaps from low-vertex < 10 prim

	            //}

	            //console.log("checking buffer data for " + prim.name );

	            /////////prim.geometry.checkBufferData();
	        }

	        /** 
	         * Create an standard 3d object.
	         * @param {Function} shader Shader-derived object that can add and remove this Prim from rendering list.
	         * @param {String} type assigned type of object (required for prim generation)
	         * @param {String} name assigned name of object (not necessarily unique).
	         * @param {vec5} dimensions object dimensions (width, height, depth, (plus additional info for some Prims)
	         * @param {vec5} divisions number of divisions in the x, y, z surface, (plus additional info for some Prims)
	         * @param {glMatrix.vec3} position location of center of object.
	         * @param {glMatrix.vec3} acceleration movement vector (acceleration) of object.
	         * @param {glMatrix.vec3} rotation rotation vector (spin) around center of object.
	         * @param {glMatrix.vec3} angular orbital rotation around a defined point ///TODO!!!!! DEFINE########
	         * @param {String[]} textureImagea array of the paths to images used to create a texture (one Prim can have several).
	         * @param {glMatrix.vec4[]|glMatrix.vec4} color the default color(s) of the object, either a single color or color array.
	         * @param {Boolean} applyTexToFace if true, apply texture to each face, else apply texture to the entire object.
	         * @param {String[]} modelFiles path to model OBJ (and indirectly, material files ) used to define non-procedural Mesh Prims.
	         */

	    }, {
	        key: 'createPrim',
	        value: function createPrim(shader, // Shader which attaches/detaches this Prim from display list

	        type) // if not false, the Prim has animation waypoints

	        {
	            var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'unknown';
	            var dimensions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [1, 1, 1, 0, 0];
	            var divisions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [1, 1, 1, 0, 0];
	            var position = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this.glMatrix.vec3.create();
	            var acceleration = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : this.glMatrix.vec3.create();
	            var rotation = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : this.glMatrix.vec3.create();
	            var angular = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : this.glMatrix.vec3.create();
	            var textureImages = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [];
	            var modelFiles = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : [];
	            var useColorArray = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : false;
	            var applyTexToFace = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : false;
	            var useLighting = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : true;
	            var useMetaData = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : false;

	            var _this2 = this;

	            var pSystem = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : false;
	            var animSystem = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : false;
	            // function to execute when prim is done (e.g. attach to drawing list shader).

	            var vec3 = this.glMatrix.vec3,
	                mat4 = this.glMatrix.mat4;

	            // Check to see if the Prim type is defined.

	            if (!this.geometryPool.checkType(type)) {

	                console.error('Prim::createPrim(): unsupported Prim type:' + type + 'for:' + prim.name);

	                return null;
	            }

	            if (modelFiles && modelFiles.length === 0 && type === this.geometryPool.typeList.MESH) {

	                console.error('PrimFactory::createPrim(): type MESH does not have an defining file for Prim:' + prim.name);

	                return null;
	            }

	            // Start the object factory.

	            var prim = {};

	            var p = prim;

	            /** 
	             * Update the model-view matrix with position, translation, rotation, and orbital motion for individual Prims.
	             * @param {glMatrix.mat4} mvMatrix model-view matrix.
	             * @returns {glMatrix.mat4} the altered model-view matrix.
	             */
	            prim.setMV = function (mvMatrix) {

	                // TODO: translate everything.

	                mat4.translate(mvMatrix, mvMatrix, p.position);

	                // Set the Model matrix.

	                prim.setM(mvMatrix);

	                return mvMatrix;
	            };

	            /** 
	             * Update the Model part of the Model-View matrix, when we need just the Model.
	             * @param {glMatrix.mat4} mvMatrix model-view matrix.
	             * @returns {glMatrix.mat4} the altered model-view matrix.
	             */
	            prim.setM = function (mMatrix) {

	                mat4.rotate(mMatrix, mMatrix, p.rotation[0], [1, 0, 0]);

	                mat4.rotate(mMatrix, mMatrix, p.rotation[1], [0, 1, 0]);

	                mat4.rotate(mMatrix, mMatrix, p.rotation[2], [0, 0, 1]);

	                mat4.scale(mMatrix, mMatrix, p.scale);

	                return mMatrix;
	            };

	            /** 
	             * Update the position, rotation, and orbit of a Prim during rendering loop. Called 
	             * in the Shader.program.update() routine, conditionally if mono (always) 
	             * or stereo (called evern other render).
	             */
	            prim.updateCoords = function () {

	                vec3.add(p.position, p.position, p.acceleration); // translate

	                vec3.add(p.rotation, p.rotation, p.angular); // rotate

	                // Scale doesn't need to be updated, just passed in the .setM and .setMV above.
	            };

	            /** 
	             * Set the Prim as a emissive glowing object. Global Lights 
	             * are handled by the World.
	             * @param {glMatrix.vec3} direction the direction of the light.
	             * @param {glMatrix.vec4} color light color
	             */
	            prim.setLight = function () {
	                var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [1, 1, 1];
	                var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [255, 255, 255];


	                p.light.direction = direction, p.light.color = color;
	            };

	            /** 
	             * Set Prim material, with defaults available from MaterialPool.
	             */
	            prim.setMaterial = function () {
	                var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.util.DEFAULT_KEY;
	                var ambient = arguments[1];
	                var diffuse = arguments[2];
	                var specular = arguments[3];
	                var specularExponent = arguments[4];
	                var sharpness = arguments[5];
	                var refraction = arguments[6];
	                var transparency = arguments[7];
	                var illum = arguments[8];
	                var map_Kd = arguments[9];


	                console.log('Prim::setMaterial(): to name:' + name);

	                // Default material.

	                // TODO: IF NAME IS DEFAULT, GET THE DEFAULT MATERIAL FROM THE POOL.

	                return _this2.initPrimMaterial(prim, _this2.materialPool.default(name, ambient, diffuse, specular, specularExponent, sharpness, refraction, transparency, illum, map_Kd), name);
	            };

	            // We don't have a .setMaterial - set directly in loadModel.updateMateria()

	            // Update vertices (no re-compute available).

	            prim.updateVertices = function (vertices) {

	                var geo = p.geometry;

	                if (vertices && vertices.length > 0) {

	                    geo.setVertices(vertices);
	                }
	            };

	            // update indices (no re-compute available).

	            prim.updateIndices = function (indices) {

	                var geo = p.geometry;

	                if (indices && indices.length > 0) {

	                    geo.setIndices(indices);
	                }
	            };

	            // Update or re-compute normals.

	            prim.updateNormals = function (normals) {

	                var geo = p.geometry;

	                if (normals && normals.length > 0) {

	                    geo.setNormals(normals);
	                } else {

	                    console.log("Prim::updateNormals():" + p.name + ' recalculating normal coordinates');

	                    geo.setNormals(_this2.geometryPool.computeNormals(geo.vertices.data, geo.indices.data, [], p.useFaceNormals));
	                }
	            };

	            // Update or re-compute texture coordinates.

	            prim.updateTexCoords = function (texCoords) {

	                var geo = p.geometry;

	                if (texCoords && texCoords.length > 0) {

	                    geo.setTexCoords(texCoords);
	                } else if (geo.numTexCoords() !== geo.numVertices()) {

	                    console.log("Prim::updateTexCoords():" + p.name + ' recalculating texture coordinates');

	                    geo.setTexCoords(_this2.geometryPool.computeTexCoords(geo.vertices.data, texCoords));
	                }
	            };

	            // Update or re-compute tangents.

	            prim.updateTangents = function (tangents) {

	                var geo = p.geometry;

	                if (tangents && tangents.length > 0) {

	                    geo.setTangents(tangents);
	                } else {

	                    /////////console.log("Prim::updateTangents():" + p.name + ' recalculating tangent coordinates' );

	                    geo.setTangents(_this2.geometryPool.computeTangents(geo.vertices.data, geo.indices.data, geo.normals.data, geo.texCoords.data, []));
	                }
	            };

	            // Update or re-compute colors.

	            prim.updateColors = function (colors) {

	                var geo = p.geometry;

	                if (colors && colors.length > 0) {

	                    geo.setColors(colors);
	                } else {

	                    ////////console.log("Prim::updateColors():" + p.name + ' recalculating color coordinates' );

	                    geo.setColors(_this2.geometryPool.computeColors(geo.normals.data, []));
	                }
	            };

	            // Compute the bounding box.

	            prim.computeBoundingBox = function () {

	                prim.boundingBox = _this2.geometryPool.computeBoundingBox(prim.geometry.vertices.data);
	            };

	            // Compute the bounding sphere (could be used for auto-computation of texture coordinates).

	            prim.computeBoundingSphere = function () {

	                _this2.geometryPool.computeBoundingSphere(prim.geometry.vertices.data);
	            };

	            // Copy just the geometry of a Prim into another geometry.

	            prim.copyGometry = function (scale, pos, geo) {

	                var vertices = _this2.util.copyArr(prim.geometry.vertices.data),
	                    indices = _this2.util.copyArr(prim.geometry.indices.data),
	                    texCoords = _this2.util.copyArr(prim.geometry.texCoords.data),
	                    normals = _this2.util.copyArr(prim.geometry.normals.data),
	                    tangents = _this2.util.copyArr(prim.geometry.tangents.data),
	                    colors = _this2.util.copyArr(prim.geometry.tangents.data);

	                _this2.geometryPool.scale(newVertices, scale);

	                _this2.geometryPool.computeMove(newVertices, pos);

	                if (!geo) {

	                    geo = _this2.geometryPool.default(vertices, indices, texCoords, normals, tangents, colors);
	                } else {

	                    geo.vertices = _this2.util.concatArr(geo.vertices, vertices);

	                    // INDICES

	                    for (var i = 0; i < indices.length; i++) {

	                        indices[i] += geo.vertices.length; // shift index by current length of vertices
	                    }

	                    geo.indices = _this2.util.contactArr(geo.indices, indices), geo.texCoords = _this2.util.concatArr(geo.texCoords, texCoords), geo.normals = _this2.util.concatArr(geo.normals, normals), geo.tangents = _this2.util.concatArr(geo.tangents, tangents), geo.colors = _this2.util.concatArr(geo.colors, colors);
	                }

	                return geo;
	            };

	            // Scale. Normally, we use matrix transforms to accomplish this.

	            prim.resize = function (scale) {

	                _this2.geometryPool.computeScale(prim.geometry.vertices.data, scale);
	            };

	            // Move. Normally, we use matrix transforms to accomplish this.

	            prim.move = function (pos) {

	                _this2.geometryPool.computeMove(prim.geometry.vertices.data, pos);
	            };

	            // Move to a specificed coordinate. Normally, we use matrix transforms to accomplish this.

	            prim.moveTo = function (pos) {

	                _this2.geometryPool.computeMove([_this2.position[0] - pos[0], _this2.position[1] - pos[1], _this2.position[2] - pos[2]]);
	            };

	            /** 
	             * Fade the Prim in or out, optionally using a define equation. Note that 
	             * We have to sort Prims back to front to get the fade to be 'transparent'.
	             * @param {Boolean} direction if true, fade in, else fade out.
	             * @param {Number} start starting alpha.
	             * @param {Number} end ending alpha.
	             * @param {Number} inc the incremental fade value.
	             * @param {Function} eq (optional) fading equation (optional).
	             */

	            prim.setFade = function (start, end, inc, eq) {

	                prim.fade.startAlpha = start;

	                prim.fade.endAlpha = end;

	                // Can only fade up or down to the Prim's material transparency.

	                var defaultMaterial = prim.materials[prim.matStarts[0][0]];

	                prim.alpha = start;

	                // Increment.

	                if (Number.isFinite(inc)) {

	                    prim.fade.incr = inc;
	                }

	                // Fade equation.

	                if (eq) {

	                    if (end > start) {
	                        // fadein

	                        prim.fade.eq = _this2.util[eq + 'In'];
	                    } else {
	                        // fadeout

	                        prim.fade.eq = _this2.util[eq + 'Out'];
	                    }
	                } else {

	                    prim.fade.eq = _this2.util['easeLinearIn'];
	                }

	                console.log("PRIM NAME:" + prim.name + ' defaultMaterial transparency:' + defaultMaterial.transparency);

	                // Save our current Shader as a default (automatically swapped back by s0).

	                if (prim.shader !== _this2.world.s0) {

	                    prim.defaultShader = prim.shader;

	                    // Move the Prim WITHOUT emitting a Prim add/remove event.

	                    prim.shader.movePrim(prim, _this2.world.s0);
	                }
	            };

	            // Prim name (arbitrary).

	            prim.name = name;

	            // Shader after the Prim has initialized.

	            prim.defaultShader = shader; // Our post-fadein Shader

	            prim.shader = this.world.s0; // fadein shader

	            ///console.log(prim.name + " SHADER IS:" + prim.shader.name + " AND DEFAULT SHADER IS:" + prim.defaultShader.name )

	            // Initially we aren't rendering.

	            prim.rendering = false;

	            // Type (must match type defined in Prim.typeList).

	            prim.type = type;

	            // UUID key similar to other program objects.

	            prim.key = this.util.computeId();

	            // Size in world coordinates.

	            prim.dimensions = dimensions || this.vec5(1, 1, 1, 0, 0, 0, 0);

	            // Amount of division of the Prim along each axis.

	            prim.divisions = divisions || this.vec5(1, 1, 1, 0, 0, 0);

	            // Prim position in World coordinates.

	            prim.position = position || vec3.create();

	            // Prim speed in World coordinates.

	            prim.acceleration = acceleration || vec3.create();

	            // Prim rotation on x, y, z axis.

	            prim.rotation = rotation || vec3.create();

	            // Prim angular rotation indicates circular velocity in x, y, z

	            prim.angular = angular || vec3.create();

	            // If orbiting, the radius to orbit around.

	            prim.orbitRadius = 0.0;

	            // Angular velocity in an orbit.

	            prim.orbitAngular = 0.0;

	            // Prim scale, default in World coordinates (adjusted after Geometry created).

	            prim.scale = [1.0, 1.0, 1.0];

	            // Visible from outside (counterclockwise winding) or inside (clockwise winding).

	            prim.visibleFrom = this.geometryPool.OUTSIDE;

	            // If this is set to true, ignore the texture material and use the Prim's color array to render.

	            prim.useColorArray = useColorArray;

	            // If this is set to true, use GL_TRIANGLES to draw. True by default.

	            prim.drawTris = true;

	            // If this is set to true, use GL_POINTS to draw (determined by prim.type = GeometryPool.typeList).

	            prim.drawPoints = false;

	            prim.pointSize = 2.0; // size if drawn

	            // If this is set to true, use GL_LINES instad of GL_TRIANGLES to draw (determined by prim type = GeometryPool.typeList).

	            prim.drawLines = false;

	            /* 
	             * Repeatedly apply the texture to each defined Face of the Prim (instead of wrapping around the Mesh).
	             * If we have multiple textures, apply in succession.
	             */

	            prim.applyTexToFace = applyTexToFace;

	            // Whether to use face normals for a Face of the prim.

	            prim.useFaceNormals = false; // TODO: optional setting

	            // Whether to include tangents 

	            prim.useTangents = false; // TODO: optional setting

	            // Information for making this Prim into a particle system

	            prim.pSystem = pSystem;

	            // Waypoints for scripted motion or timelines

	            prim.animSystem = animSystem;

	            // By default, Prims do not adjust to geolocation data. If ModelPool loads data, this may be set to true for TERRAIN and STARDOME objects.

	            prim.geolocate = false;

	            // Material array (stores textures as well).

	            prim.materials = [];

	            // Set default material for the Prim (similar to OBJ format).

	            var defaultName = this.materialPool.createDefaultName(prim.name);

	            prim.materials[defaultName] = this.materialPool.setDefaultMaterial(prim, this.materialPool.createDefaultName(prim.name), textureImages);

	            // prim.defaultMaterial = prim.materials[ defaultName ];

	            // Set Prim alpha from the active Material's transparency (opposite of prim.alpha === opacity).

	            prim.alpha = 1.0 - prim.materials[defaultName].transparency; // typically 1.0

	            // Use lighting in Shader.

	            prim.useLighting = useLighting;

	            // So the Prim can emit light.

	            prim.glow = new _lights2.default(this.glMatrix);

	            // Note: fade equations in util.

	            prim.fade = {

	                startAlpha: 0.0, // starting opacity value

	                endAlpha: prim.alpha, // ending opacity value

	                incr: 0.002 // animation fade increment

	            };

	            // Store multiple sounds for one Prim.

	            prim.audio = [];

	            // Store multiple videos for one Prim.

	            prim.video = [];

	            // Parent Node.

	            prim.parentNode = null;

	            // Child Prim array.

	            prim.children = [];

	            // Execute geometry creation routine (which may be a file load).

	            console.log('PrimFactory::createPrim(): Generating:' + prim.name + '(' + prim.type + ')');

	            // Geometry factory function, create empty WebGL Buffers.

	            prim.geometry = new _geometryBuffer2.default(prim.name, this.util, this.webgl);

	            // Create Geometry data, or load Mesh data (may alter some of the above default properties).

	            if (modelFiles.length > 0) {

	                for (var i = 0; i < modelFiles.length; i++) {

	                    this.geometryPool.getGeometry(prim, modelFiles[i], true, { pos: i, defaultMatStarts: false });
	                }
	            } else {

	                this.geometryPool.getGeometry(prim, null, true, { pos: 0, defaultMatStarts: true });
	            }

	            // Prim timecheck. If it is failing to add to a Shader, will keep track of number of attempts.

	            prim.failCount = 0;

	            this.prims.push(prim);

	            return prim;
	        }

	        /** 
	         * Create a Particle System from a Prim.
	         * @param {Prim} The Prim to use to create the particle system.
	         * @param {PsSystem} particle system configuration (PSystem class)
	         */

	    }, {
	        key: 'createParticleSystem',
	        value: function createParticleSystem(prim) {

	            if (!prim.pSystem) {

	                console.error('PrimFactory::createParticleSystem(): no particle system defined');
	            }

	            var ps = prim.pSystem;

	            // Loop through the prim points, and shift them accd. to pSystem coordinates. If 
	            // a function is defined (e.g. another Prim) use its coordinates, to place the Prim. 
	            // scale so it works.

	            if (ps.coords) {

	                // Move the first Prim to the first coordinate.

	                var _geo = this.geometryPool.default();

	                for (var i = 1; i < ps.coords.length; i++) {

	                    _geo = prim.copyGeometry(ps.coords.scale[i], ps.coords.pos[i], _geo);
	                }
	            }

	            // force geometry to update.

	            var options = {};

	            this.initPrimGeometry(prim, geo, options);
	        }
	    }, {
	        key: 'createAnimationSystem',
	        value: function createAnimationSystem(prim) {

	            if (!prim.animSystem) {

	                console.error('PrimFactory::createAnimationSystem(): no animation system defined');
	            }
	        }
	    }]);

	    return PrimFactory;
	}(); // End of class.

	// We put this here because of JSDoc(!).

	exports.default = PrimFactory;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mapd = __webpack_require__(22);

	var _mapd2 = _interopRequireDefault(_mapd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var Map2d = function (_Mapd) {
	    _inherits(Map2d, _Mapd);

	    /* 
	     * NOTE: using 'map.es6' causes a transpile error
	     *
	     * Generic map object, equivalent to a 2-dimensional array, used 
	     * for heightmaps and color maps and other "maplike" data, including 
	     * Image data in arrays.
	     * Maps are defined in x (columns)  and z (rows) instead of 
	     * x and y to match Prim definitions of heightMaps.
	     * Maps can be scaled using bilinear or bicubic algorithms.
	     *
	     * @link https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/
	     *
	     */
	    function Map2d(util) {
	        _classCallCheck(this, Map2d);

	        console.log('in Map2d');

	        //this.util = util;

	        var _this = _possibleConstructorReturn(this, (Map2d.__proto__ || Object.getPrototypeOf(Map2d)).call(this, util));

	        _this.typeList = {

	            PLANE: 'initPlane',

	            RANDOM: 'initRandom',

	            DIAMOND: 'initDiamond',

	            IMAGE: 'initImage'

	        };

	        _this.edgeType = {

	            NONE: 0, // don't do anything

	            WRAP: 1, // wrap a out of range side to the opposite side

	            TOZERO: 2 // push down to zero

	        };

	        _this.width = 0;

	        _this.depth = 0;

	        _this.low = 0;

	        _this.high = 0;

	        _this.map = null; // actual heightmap

	        _this.squareSize = 0; // max square that starts at 0, 0 and fits in Map2d.

	        _this.max = 0;

	        // offscreen canvas for heightmaps from images.

	        _this.canvas = _this.ctx = _this.imgData = null;

	        return _this;
	    }

	    _createClass(Map2d, [{
	        key: 'checkParams',
	        value: function checkParams(w, d, roughness, flatten) {

	            if (w < 1 || d < 1) {

	                console.error('invalid map width or height, was:' + w + ', ' + d);

	                return false;
	            } else if (roughness < 0 || roughness > 1.0) {

	                console.error('invalid Map roughness (0-1), was:' + roughness);

	                return false;
	            } else if (flatten < 0 || flatten > 1.0) {

	                console.error('invalid Map flatten (0-1.0), was:' + flatten);

	                return false;
	            }

	            return true;
	        }

	        /** 
	         * Get a Map pixel. For the diamond algorithm, this.max is a width or 
	         * height. For all others, it is the length of the entire array.
	         * @param {Number} x the x coordinate of the pixel (column)
	         * @param {Number} z the z coordinate of the pixel (row)
	         * @param {Enum} edgeFlag how to handle requests off the edge of the map 
	         * - WRAP: grab from other side, divide to zero).
	         * - TOZERO: reduce to zero, depending on unit distance from edge.
	         * @returns {Number} the Map value at the x, z position.
	         */

	    }, {
	        key: 'getPixel',
	        value: function getPixel(x, z) {
	            var edgeFlag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;


	            if (x < 0 || x > this.width || z < 0 || z > this.depth) {

	                switch (edgeFlag) {

	                    case this.edgeType.WRAP:
	                        if (x < 0) x = this.width - x;
	                        if (x > this.width - 1) x = x - this.width;
	                        if (z < 0) z = this.depth - z;
	                        if (z > this.depth - 1) z = z - this.depth;
	                        break;

	                    case this.edgeType.TOZERO:
	                        var xs = x;
	                        var zs = z;
	                        if (x < 0) x = 0;
	                        if (x > this.width - 1) x = this.width - 1;
	                        if (z < 0) z = 0;
	                        if (z > this.depth - 1) z = this.depth - 1;
	                        return this.map[x + this.squareSize * z] / (Math.abs(xs - x) + Math.abs(zs - z));
	                        break;

	                    default:
	                        console.error('getPixel out of range x:' + x + ' z:' + z + ' width:' + w + ' height:' + h + ' max:' + this.max);
	                        return -1;
	                        break;

	                }
	            }

	            return this.map[x + this.width * z];
	        }

	        /** 
	         * Set a pixel in the Map.
	         * @param {Number} x the x (column) coordinate in the Map.
	         * @param {Number} z the z (row) coordinate in the Map.
	         * @param {Number} val the value at a map coordinate, typically Float32
	         */

	    }, {
	        key: 'setPixel',
	        value: function setPixel(x, z, val) {

	            if (x < 0 || x > this.max || z < 0 || z > this.max) {

	                console.error('setPixel out of range x:' + x + ' z:' + z + ' max:' + this.max);

	                return -1;
	            }

	            if (this.low > val) this.low = val;

	            if (this.high < val) this.high = val;

	            this.map[x + this.width * z] = val; // Note: was this.squareSize
	        }

	        /** 
	         * Create a completely flat Map.
	         */

	    }, {
	        key: 'initPlane',
	        value: function initPlane(w, d) {

	            if (this.checkParams(w, d, 0, 0)) {

	                this.img = this.map = null;

	                this.map = new Float32Array(w * d);

	                this.width = w;

	                this.depth = d;

	                this.squareSize = Math.min(w * d); // shortest face.

	                this.type = this.typeList.PLANE;
	            } else {

	                console.error('error creating Map2d using ' + this.typeList.PLANE);
	            }
	        }

	        /** 
	         * Generate a Map using completely random numbers clamped. 
	         * to a range.
	         */

	    }, {
	        key: 'initRandom',
	        value: function initRandom(w, d, roughness) {

	            if (this.checkParams(w, d, roughness, 0)) {

	                this.map = new Float32Array(w * d);

	                this.width = w;

	                this.depth = d;

	                this.squareSize = Math.min(w, d);

	                this.max = this.squareSize - 1;

	                var util = this.util;

	                for (var i = 0, len = this.map.length; i < len; i++) {

	                    this.map[i] = util.getRand() * roughness;
	                }

	                this.type = this.typeList.RANDOM;
	            } else {

	                console.error('error creating Map using ' + this.typeList.RANDOM);
	            }
	        }

	        /** 
	         * Create a blank heightmap in canvas ImageData format. If 
	         * random === true, make a random heightmap.
	         * https://github.com/hunterloftis/playfuljs-demos/blob/gh-pages/terrain/index.html
	         * @param {Number} w the width of the heightmap (x).
	         * @param {Number} h the height of the heightmap (z).
	         * @param {Boolean} create if true, make a proceedural heightmap using diamond algorithm.
	         * @param {Number} roughness if create === true, assign a roughness (0 - 1) to generated terrain.
	         */

	    }, {
	        key: 'initDiamond',
	        value: function initDiamond(w, d, roughness, flatten) {

	            if (this.checkParams(w, d, roughness, flatten)) {

	                this.img = this.map = null;

	                // Get next highest power of 2 (scale back later).

	                console.log('starting width:' + w + ' height:' + d + ' roughness:' + roughness);

	                var n = Math.pow(2, Math.ceil(Math.log((w + d) / 2) / Math.log(2)));

	                console.warn('random map, selecting nearest power of 2 (' + n + ' x ' + n + ')');

	                // Set up for diamond algorithm.

	                this.squareSize = n + 1;

	                this.width = this.depth = n; // SQUARE

	                this.map = new Float32Array(this.squareSize * this.squareSize);

	                // For the Diamond algorithm, this.max is the length or width of the terrain.

	                this.max = this.squareSize - 1;

	                this.setPixel(0, 0, this.max);

	                this.setPixel(this.max, 0, this.max / 2);

	                this.setPixel(this.max, this.max, 0);

	                this.setPixel(0, this.max, this.max / 2);

	                // Start recursive terrain generation.

	                this.divide(this.max, roughness);

	                // The first pixel may be too high.

	                this.setPixel(0, 0, (this.getPixel(0, 1) + this.getPixel(1, 0)) / 2);

	                this.flatten(flatten / this.squareSize); // if divisions = 100, shrink height 1/ 100;

	                this.type = this.typeList.DIAMOND;
	            } else {

	                console.error('error creating Map using ' + this.typeList.DIAMOND);
	            }
	        }

	        /** 
	         * Use an RGBA image to create the heightmap, after drawing into <canvas>.
	         * @link https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/
	         * @link http://stackoverflow.com/questions/39678642/trying-to-convert-imagedata-to-an-heightmap
	         * @param {Number} w desired heightmap width (x).
	         * @param {Number} d desired height (z) of heightmap.
	         */

	    }, {
	        key: 'initImage',
	        value: function initImage(w, d, path, callback) {
	            var _this2 = this;

	            if (this.checkParams(w, d, roughness, flatten)) {}

	            if (!this.canvas) {

	                this.canvas = document.createElement('canvas');
	            }

	            if (!this.ctx) {

	                this.ctx = this.canvas.getContext('2d');
	            }

	            var img = new Image();

	            img.style.display = 'none';

	            img.onload = function () {

	                _this2.ctx.drawImage(img, 0, 0);

	                // Uint8ClampedArray, RGBA 32-bit for all images.
	                //  let rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + (data[3] / 255) + ')';

	                _this2.imgData = _this2.ctx.getImageData(0, 0, img.width, img.height);

	                _this2.width = img.width;

	                _this2.depth = img.height;

	                _this2.squareSize = Math.min(w, h); // largest square area starting with 0, 0

	                _this2.max = _this2.squareSize - 1;

	                // Pixel-level view.
	                //this.pixels = new Uint32Array( this.data.buffer );

	                _this2.map = new Float32Array(_this2.squareSize);

	                var j = 0;

	                var data = _this2.imgData;

	                for (var i = 0, len = _this2.data.length; i < len; i++) {

	                    _this2.map[j++] = data[i] + data[i + 1] + data[i + 2] / 3;
	                }
	            };

	            img.onerror = function () {

	                console.error('image could not be loaded:' + path);
	            };

	            img.src = path;

	            callback(this.data);
	        }

	        /* 
	         * ---------------------------------------
	         * HEIGHTMAP GENERATION ALGORITHMS
	         * ---------------------------------------
	         */

	        /** 
	         * Divide Map in Diamond algorithm.
	         */

	    }, {
	        key: 'divide',
	        value: function divide(size, roughness) {

	            var x = void 0,
	                z = void 0,
	                half = size / 2;

	            var scale = roughness * size;

	            var util = this.util;

	            if (half < 1) return;

	            for (z = half; z < this.max; z += size) {

	                for (x = half; x < this.max; x += size) {

	                    this.square(x, z, half, util.getRand() * scale * 2 - scale);
	                }
	            }

	            for (z = 0; z <= this.max; z += half) {

	                for (x = (z + half) % size; x <= this.max; x += size) {

	                    this.diamond(x, z, half, util.getRand() * scale * 2 - scale);
	                }
	            }

	            this.divide(size / 2, roughness);
	        }

	        /** 
	         * Get average in Diamond algorithm.
	         */

	    }, {
	        key: 'average',
	        value: function average(values) {

	            var valid = values.filter(function (val) {

	                return val !== -1;
	            });

	            var total = valid.reduce(function (sum, val) {

	                return sum + val;
	            }, 0);

	            return total / valid.length;
	        }

	        /** 
	         * new square, average value. Alternates with diamond.
	         */

	    }, {
	        key: 'square',
	        value: function square(x, z, size, offset) {

	            var ave = this.average([this.getPixel(x - size, z - size), // upper left
	            this.getPixel(x + size, z - size), // upper right
	            this.getPixel(x + size, z + size), // lower right
	            this.getPixel(x - size, z + size) // lower left
	            ]);

	            this.setPixel(x, z, ave + offset);
	        }

	        /** 
	         * new diamond, average value. Alternates with square.
	         */

	    }, {
	        key: 'diamond',
	        value: function diamond(x, z, size, offset) {

	            var ave = this.average([this.getPixel(x, z - size), // top
	            this.getPixel(x + size, z), // right
	            this.getPixel(x, z + size), // bottom
	            this.getPixel(x - size, z) // left
	            ]);

	            this.setPixel(x, z, ave + offset);
	        }

	        /* 
	         * ---------------------------------------
	         * SCALING/SMOOTHING ALGORITHMS
	         * ---------------------------------------
	         */

	        /** 
	         * Scale heightMap y values (0.1 = 1/10 the max), 
	         * passing 0 will completely flatten the map.
	         */

	    }, {
	        key: 'flatten',
	        value: function flatten(scale) {

	            var val = void 0;

	            if (this.map && this.map.length) {

	                var map = this.map;

	                for (var i = 0, len = map.length; i < len; i++) {

	                    map[i] *= scale;

	                    val = map[i];

	                    if (this.high < val) this.high = val;

	                    if (this.low > val) this.low = val;
	                }
	            }
	        }

	        /** 
	         * roughen an existing Map.
	         */

	    }, {
	        key: 'roughen',
	        value: function roughen(percent) {

	            if (this.map && this.map.length) {}
	        }

	        /** 
	         * given an existing Map, scale to new dimensions, smoothing 
	         * with the biCubic or biLinear algorithm.
	         */

	    }, {
	        key: 'scale',
	        value: function scale(w, h) {

	            if (this.checkParams(w, h, 0, 0)) {

	                var map = new Float32Array(w * h);

	                var xScale = this.width / w;

	                var zScale = this.depth / h;

	                console.log('original width:' + this.width + ' new:' + w + 'original height:' + this.depth + ' new:' + h);

	                console.log('xScale:' + xScale + ' zScale:' + zScale);

	                for (var z = 0; z < h; z++) {

	                    for (var x = 0; x < w; x++) {

	                        map[w * z + x] = this.biCubic(x * xScale, z * zScale);
	                    }
	                }

	                console.log('WIDTH:' + w + " HEIGHT:" + h);

	                this.map = map;

	                this.width = w;

	                this.depth = h;

	                this.squareSize = Math.min(w, h);

	                this.max = this.squareSize - 1;
	            }
	        }

	        /** 
	         * Given a point defined in 2d between 
	         * x and z, return an interpolation using a bilinear algorithm.
	         * @param {Array} heightmap 
	         * @param {Number} x = desired x position (between 0.0 and 1.0)
	         * @param {Number} z = desired z position (between 0.0 and 1.0)
	         */

	    }, {
	        key: 'biLinear',
	        value: function biLinear(x, z) {

	            if (x < 0 || x > 1.0 || z < 0 || z > 1.0) {

	                console.error('heightmap x index out of range, x:' + x + ' z:' + z);

	                return null;
	            }

	            // Our x and z, scaled to heightmap divisions.

	            x *= this.width;
	            z *= this.depth;

	            // Points above and below our position.

	            var x1 = Math.min(x);
	            var x2 = Math.max(x);
	            var z1 = Math.min(z);
	            var z2 = Math.max(z);

	            // Interpolate along x axis, get interpolations above and below point.

	            var a = this.getPixel(x1, z1) * (x - x1) + this.getPixel(x1, z2) * (1 - x - x1);

	            var b = this.getPixel(z1, z2) * (x - x1) + this.getPixel(x2, z2) * (1 - x - x1);

	            // Interpolate these results along z axis.

	            var v = a * (z - z1) + b * (1 - z - z1);

	            return v;
	        }

	        /** 
	         * Given a point, and a collection of 16 neighboring points in 
	         * 2d, return a smoothed value for the point using the 
	         * biCubic interpolation algorithm.
	         * Adapted from:
	         * https://github.com/hughsk/bicubic-sample/blob/master/index.js
	         * https://github.com/hughsk/bicubic/blob/master/index.js
	         * @param {Number} xf 
	         * @param {Number} zf
	         */

	    }, {
	        key: 'biCubicPoint',
	        value: function biCubicPoint(xf, zf, p00, p01, p02, p03, p10, p11, p12, p13, p20, p21, p22, p23, p30, p31, p32, p33) {

	            var zf2 = zf * zf;
	            var xf2 = xf * xf;
	            var xf3 = xf * xf2;

	            var x00 = p03 - p02 - p00 + p01;
	            var x01 = p00 - p01 - x00;
	            var x02 = p02 - p00;
	            var x0 = x00 * xf3 + x01 * xf2 + x02 * xf + p01;

	            var x10 = p13 - p12 - p10 + p11;
	            var x11 = p10 - p11 - x10;
	            var x12 = p12 - p10;
	            var x1 = x10 * xf3 + x11 * xf2 + x12 * xf + p11;

	            var x20 = p23 - p22 - p20 + p21;
	            var x21 = p20 - p21 - x20;
	            var x22 = p22 - p20;
	            var x2 = x20 * xf3 + x21 * xf2 + x22 * xf + p21;

	            var x30 = p33 - p32 - p30 + p31;
	            var x31 = p30 - p31 - x30;
	            var x32 = p32 - p30;
	            var x3 = x30 * xf3 + x31 * xf2 + x32 * xf + p31;

	            var y0 = x3 - x2 - x0 + x1;
	            var y1 = x0 - x1 - y0;
	            var y2 = x2 - x0;

	            return y0 * zf * zf2 + y1 * zf2 + y2 * zf + x1;
	        }

	        /** 
	         * value interpolation
	         */

	    }, {
	        key: 'biCubic',
	        value: function biCubic(x, z) {

	            var x1 = Math.floor(x);
	            var z1 = Math.floor(z);
	            var x2 = x1 + 1;
	            var z2 = z1 + 1;

	            //console.log('lower pixel: for x:' + x + ' value:' + this.getPixel( x1, z1 ) + ' upper pixel for z:' + z + ' value:' + this.getPixel( x2, z2 ) );

	            var p00 = this.getPixel(x1 - 1, z1 - 1);
	            var p01 = this.getPixel(x1 - 1, z1);
	            var p02 = this.getPixel(x1 - 1, z2);
	            var p03 = this.getPixel(x1 - 1, z2 + 1);

	            var p10 = this.getPixel(x1, z1 - 1);
	            var p11 = this.getPixel(x1, z1);
	            var p12 = this.getPixel(x1, z2);
	            var p13 = this.getPixel(x1, z2 + 1);

	            var p20 = this.getPixel(x2, z1 - 1);
	            var p21 = this.getPixel(x2, z1);
	            var p22 = this.getPixel(x2, z2);
	            var p23 = this.getPixel(x2, z2 + 1);

	            var p30 = this.getPixel(x2 + 1, z1 - 1);
	            var p31 = this.getPixel(x2 + 1, z1);
	            var p32 = this.getPixel(x2 + 1, z2);
	            var p33 = this.getPixel(x2 + 1, z2 + 1);

	            return this.biCubicPoint(x - x1, z - z1, p00, p10, p20, p30, p01, p11, p21, p31, p02, p12, p22, p32, p03, p13, p23, p33);
	        }
	    }]);

	    return Map2d;
	}(_mapd2.default);

	exports.default = Map2d;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Mapd =

	/** 
	 * General map class.
	 */
	function Mapd(util) {
	    _classCallCheck(this, Mapd);

	    this.util = util;
	};

	exports.default = Mapd;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mapd = __webpack_require__(22);

	var _mapd2 = _interopRequireDefault(_mapd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var Map3d = function (_Mapd) {
	    _inherits(Map3d, _Mapd);

	    /* 
	     * NOTE: using 'map.es6' causes a transpile error
	     *
	     * Generic map object, equivalent to a 2-dimensional array, used 
	     * for heightmaps and color maps and other "maplike" data, including 
	     * Image data in arrays.
	     * Maps are defined in x (columns)  and z (rows) instead of 
	     * x and y to match Prim definitions of heightMaps.
	     * Maps can be scaled using bilinear or bicubic algorithms.
	     *
	     * @link https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/
	     *
	     */
	    function Map3d(util) {
	        _classCallCheck(this, Map3d);

	        console.log('in Map3d');

	        var _this = _possibleConstructorReturn(this, (Map3d.__proto__ || Object.getPrototypeOf(Map3d)).call(this, util));

	        _this.typeList = {

	            CLOUD: 'initRandom',

	            SPHERE: 'initRandomSphere'

	        };

	        _this.width = 0;

	        _this.depth = 0;

	        _this.low = 0;

	        _this.high = 0;

	        _this.map = null; // actual heightmap

	        return _this;
	    }

	    /** 
	     * confirm our data is ok for a 3d map (pointcloud).
	     */


	    _createClass(Map3d, [{
	        key: 'checkParams',
	        value: function checkParams(w, h, d, flatten) {

	            if (w && h && d && w + h + d > 0) {

	                return true;
	            }

	            return false;
	        }

	        /** 
	         * Get a 3D pixel from a 3D texture. This allows interpolation of values (colors or other 
	         * meta-data ) using 3d coordinates.
	         *
	         * @param {Number} x the x coordinate of the pixel (column)
	         * @param {Number} z the z coordinate of the pixel (row)
	         * @param {Enum} edgeFlag how to handle requests off the edge of the map 
	         * - WRAP: grab from other side, divide to zero).
	         * - TOZERO: reduce to zero, depending on unit distance from edge.
	         * @returns {Number} the Map value at the x, z position.
	         */

	    }, {
	        key: 'getPoint',
	        value: function getPoint(x, y, z) {}

	        /** 
	         * Set a pixel in the Map.
	         * @param {Number} x the x (column) coordinate in the Map.
	         * @param {Number} z the z (row) coordinate in the Map.
	         * @param {Number} val the value at a map coordinate, typically Float32
	         */

	    }, {
	        key: 'setPoint',
	        value: function setPoint(x, y, z, val) {}

	        /** 
	         * Generate a 3d Map using completely random numbers clamped. 
	         * to a range.
	         */

	    }, {
	        key: 'initRandom',
	        value: function initRandom(w, h, d, numPoints) {

	            if (this.checkParams(w, h, d, 0)) {

	                this.type = this.CLOUD;

	                this.map = new Float32Array(numPoints * 3);

	                this.width = w;

	                this.height = h;

	                this.depth = d;

	                var util = this.util;

	                var colorPtr = 0;

	                for (var i = 0; i < this.map.length; i += 3) {

	                    this.map[i] = util.getRand() * w, this.map[i + 1] = util.getRand() * h, this.map[i + 2] = this.util.getRand() * d;
	                }

	                this.type = this.typeList.CLOUD;
	            } else {

	                console.error('error creating Map3d using ' + this.type.CLOUD);
	            }
	        }

	        /** 
	         * Return a set of random UV coordinates, arrayed on a sphere.
	         * @param {Number} w the width of the space, in program/WebGL units.
	         * @param {Number} h the height of the space, in program/WebGL units.
	         * @param {Number} d the depth of the space, in program/WebGL units.
	         * @param {Number} numPoints the number of points (vertices) to create.
	         */

	    }, {
	        key: 'initRandomSphere',
	        value: function initRandomSphere(w, h, d, numPoints) {

	            var util = this.util;

	            var mapUV = new Float32Array(numPoints * 2);

	            for (var i = 0; i < numPoints; i += 2) {

	                // Distribute evenly over sphere. Since the sphere radius is constant, we don't set min or max for util.getRand.

	                mapUV[i] = Math.PI * 2 * util.getRand(); // theta or u

	                mapUV[i + 1] = Math.acos(2 * util.getRand() - 1); // phi or v
	            }

	            //this.map = this.uvToCartesian( mapUV, w, h, d );

	            this.map = util.uvToCartesian(mapUV, w, h, d);

	            this.mapUV = mapUV; // retain lat and long data

	            this.type = this.typeList.SPHERE;
	        }

	        /** 
	         * Initialize a Map3d from data. The first parameter is always 3d coordinates,
	         * after that an arbitrary number of arrays may be assigned at comparable positions
	         * in the map object.
	         */

	    }, {
	        key: 'initFromData',
	        value: function initFromData(positions) {}
	    }]);

	    return Map3d;
	}(_mapd2.default);

	exports.default = Map3d;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	/* 
	 * A mesh object, along with helper objects, containing un-flattened references to 
	 * vertices, indices, and texture coordinates, suitable for subdivision and other manipulations.
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Coords = function () {

	    /**
	     * @class
	     * Handle 3d coordinate locations on an object basis.
	     * @constructor
	     * @param {Number} x the initializing x or 0 coordinate
	     * @param {Number} y the initializing y or 1 coordinate
	     * @param {Number} z the initializing z or 2 coordinate
	     */
	    function Coords() {
	        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	        _classCallCheck(this, Coords);

	        this.x = x;

	        this.y = y;

	        this.z = z;
	    }

	    /**
	     * Check for null or undefined values.
	     * @returns {Boolean} all all 3 coordinates are defined, return true, else false
	     */


	    _createClass(Coords, [{
	        key: 'isValid',
	        value: function isValid() {

	            return Number.isFinite(this.x) && Number.isFinite(this.y) && Number.isFinite(this.z);
	        }

	        /** 
	         * Add two Coords objects together.
	         * @param {Coords} the other Coords object.
	         * @returns {Coords} this Coords object.
	         */

	    }, {
	        key: 'add',
	        value: function add(coords) {

	            this.x += coords.x;

	            this.y += coords.y;

	            this.z += coords.z;

	            return this;
	        }

	        /** 
	         * Subtract two Coords objects.
	         * @param {Coords} the other Coords object.
	         * @returns {Coords} this Coords object.
	         */

	    }, {
	        key: 'subtract',
	        value: function subtract(coords) {

	            this.x -= coords.x;

	            this.y -= coords.y;

	            this.z -= coords.z;

	            return this;
	        }

	        /** 
	         * Scale a Coords position outward.
	         * @param {Number} scalar the value to scale this Coords by.
	         * @returns {Coords} this Coords object.
	         */

	    }, {
	        key: 'scale',
	        value: function scale(scalar) {

	            this.x *= scalar;

	            this.y *= scalar;

	            this.z *= scalar;

	            return this;
	        }

	        /** 
	         * Compute an approximate or exact distance between two Coord 
	         * positions.
	         * @param {Coords} coords the Coords to check the distance to.
	         * @param {Boolean} fast if true, return an approximation of the 
	         * distance not involving square root calculations. If false, do 
	         * a regular distance calc (slow).
	         */

	    }, {
	        key: 'distance',
	        value: function distance(coords, fast) {

	            var x = this.x - coords.x;

	            var y = this.y - coords.y;

	            var z = this.z - coords.z;

	            if (fast) {

	                return (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 3;
	            } else {

	                return Math.sqrt(x * x + y * y + z * z);
	            }
	        }

	        /**
	         * Return a new copy of this Coords
	         * @returns {Coords} a copy of the current coordinates.
	         */

	    }, {
	        key: 'clone',
	        value: function clone() {

	            return new Coords(this.x, this.y, this.z);
	        }
	    }]);

	    return Coords;
	}(); // End of class.

	var Vertex = function () {

	    /** 
	     * @class
	     * Create a class containing position, texture coordinate, and mesh
	     * connectivity information.
	     * @constructor
	     * @param {Number} x the x coordinate of the Vertex.
	     * @param {Number} y the y coordinate of the Vertex.
	     * @param {Number} z the z coordinate of the Vertex.
	     * @param {Number} u the u texture coordinate.
	     * @param {Number} v the v texture coordinate.
	     * @param {Number} idx the index of this Vertex in the larger Vertex array.
	     * @param {Vertex[]]} vertexArr the array holding this (and other) Vertices.
	     */
	    function Vertex() {
	        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	        var u = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	        var v = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
	        var idx = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;
	        var vertexArr = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];

	        _classCallCheck(this, Vertex);

	        this.coords = new Coords(x, y, z);

	        this.texCoords = { u: u, v: v };

	        this.idx = idx; // locally store our index in the vertexArr

	        this.e = []; // Edge array

	        this.s = []; // Seam array (other Vertex objects with the same coordinates)

	        this.vertexArr = vertexArr;
	    }

	    /** 
	     * Confirm Vertex has valid values for position and texture.
	     * @returns {Boolean} if valid, return true, else false.
	     */


	    _createClass(Vertex, [{
	        key: 'isValid',
	        value: function isValid() {

	            var texCoords = this.texCoords;

	            if (this.idx === -1) {

	                console.error('Vertex::isValid(): index never set!');

	                return false;
	            }

	            if (this.coords.isValid()) {

	                if (Number.isFinite(parseFloat(texCoords.u)) && Number.isFinite(parseFloat(texCoords.v))) {

	                    if (texCoords.u >= 0 && texCoords.v >= 0) {

	                        return true;
	                    }

	                    console.warn('Vertex.isValid(): negative texture coordinates for:' + this.idx + texCoords);

	                    return false;
	                }

	                return true;
	            }

	            console.error('Vertex::isValid(): invalid coordinates for vertex position:' + this.idx + ' coords.x:' + Number.isFinite(this.coords.x) + ', coords.y:' + Number.isFinite(this.coords.y) + ', coords.z:' + Number.isFinite(this.coords.z));

	            return false;
	        }

	        /** 
	         * Return a vector distance between two Coords, optionally 
	         * leaving out the square root calculation.
	         * @param {Vertex} vtx another Vertex object
	         * @param {Boolean} fast if true, don't do square root, approx distance.
	         * @returns {Number} a vector distance, or approximation.
	         */

	    }, {
	        key: 'distance',
	        value: function distance(vtx) {
	            var fast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


	            return this.coords.distance(vtx.coords, fast);
	        }

	        /** 
	         * In-place setting values
	         * @param {Number} x the x coordinate value.
	         * @param {Number} y the y coordinate value.
	         * @param {Number} z the z coordinate value.
	         * @param {Number} u the u coordinate value.
	         * @param {Number} v the v coordinate value. 
	         * @returns {Vertex} this Vertex.    
	         */

	    }, {
	        key: 'set',
	        value: function set(x, y, z, u, v) {

	            this.coords.x = x;

	            this.coords.y = y;

	            this.coords.z = z;

	            // Texture coordinates optional.

	            if (u !== undefined) this.texCoords.u = u;

	            if (v !== undefined) this.texCoords.v = v;

	            return this;
	        }

	        /** 
	         * Add two Vertex objects, ignoring texture coordinates.
	         * @param {Vertex} vtx the Vertex object to add.
	         * @returns {Vertex} this Vertex.
	         */

	    }, {
	        key: 'add',
	        value: function add(vtx) {

	            this.coords.add(vtx.coords);

	            return this;
	        }

	        /** 
	         * Subtract two Vertex objects, ignoring texture coordinates.
	         * @param {Vertex} vtx the Vertex object to subtract.
	         * @returns {Vertex} this Vertex.
	         */

	    }, {
	        key: 'subtract',
	        value: function subtract(vtx) {

	            this.coords.subtract(vtx.coords);

	            return this;
	        }

	        /** 
	         * Scale coordinates of the Vertex, ignoring texture coordinates.
	         * @param {Number} scalar the value to scale the Vertex position by.
	         * @returns {Vertex} this Vertex.
	         */

	    }, {
	        key: 'scale',
	        value: function scale(scalar) {

	            this.coords.scale(scalar);

	            return this;
	        }

	        /** 
	         * Return a copy of this Vertex.
	         * @param {Vertex[]} vertexArr if defined, set the clone's Vertex array to the 
	         * supplied array, otherwise use this Vertex's array as vertexArr.
	         * @returns {Vertex} a deep copy of this Vertex. Note that 
	         * the new Vertex has the same index as its parent.
	         */

	    }, {
	        key: 'clone',
	        value: function clone(vertexArr) {

	            var vtx = new Vertex(this.coords.x, this.coords.y, this.coords.z, this.texCoords.u, this.texCoords.v, this.idx, vertexArr);

	            // Copy the surround Edges.

	            for (var i = 0; i < this.e.length; i++) {

	                vtx.e.push(this.e[i]);
	            }

	            for (var _i = 0; _i < this.s.length; _i++) {

	                vtx.s.push(this.s[_i]);
	            }

	            return vtx;
	        }
	    }]);

	    return Vertex;
	}(); // End of class.

	var Edge = function () {

	    /** 
	     * @class
	     * create an Edge, make from two consecutive Vertices in the index for 
	     * drawing the Mesh. The Vertex objects used are defined by the index array.
	     * @constructor
	     * @param {Number} i0 index of the first Vertex in the Vertex array.
	     * @param {Number} i1 index of the second Vertex in the Vertex array.
	     * @param {Number} i2 index of the third Vertex (forming a triangle) in the Vertex Array.
	     * @param {Number} fi index of the Face created by the three Vertices.
	     */
	    function Edge(i0, i1, i2, fi) {
	        _classCallCheck(this, Edge);

	        this.v = new Array(2); // index the two Vertex objects forming the Edge

	        this.ov = new Array(2); // index the opposite Vertices in first and second Face

	        this.f = new Array(2); // index the opposite Faces

	        this.v[0] = i0;

	        this.v[1] = i1;

	        this.f[0] = fi; // The Face this Edge is initially part up during creation

	        this.f[1] = 4294967295; // The other Face, initially invalid index value

	        // Index of the opposite Vertex (forming triangle) connected to this Edge (only know first one at this point).

	        this.ov[0] = i2;

	        this.ov[1] = i2; // This should change during computation
	    }

	    _createClass(Edge, [{
	        key: 'isValid',
	        value: function isValid() {

	            if (this.v[0].isValid() && this.v[1].isValid) {

	                return true;
	            }

	            return false;
	        }

	        /** 
	         * Given a Vertex, return the opposite Vertex in this Edge.
	         * @param {Vertex} vtx the Vertex to test.
	         * @returns {Number} the index of the opposite Vertex in the Vertex array.
	         */

	    }, {
	        key: 'getOpposite',
	        value: function getOpposite(vtx) {

	            if (vtx.idx === this.v[0]) {

	                return this.v[1];
	            } else if (vtx.idx === this.v[1]) {

	                return this.v[0];
	            } else {

	                console.error('Edge::getOpposite(): invalid Vertex:' + vtx.idx + ' supplied, our Edge:' + this.v[0] + ', ' + this.v[1]);
	            }
	        }
	    }]);

	    return Edge;
	}();

	var Face =

	/** 
	 * @class
	 * Face, storing three consecutive Vertex objects, a.k.a. the drawing triangle.
	 * @constructor
	 * @param {Number} e0 the first Edge index
	 * @param {Number} e1 the second Edge index
	 * @param {Number} e2 the third Edge index
	 * @param {Number} idx the index in the Face array
	 */
	function Face(e0, e1, e2) {
	    _classCallCheck(this, Face);

	    this.e = new Array(3);

	    this.e[0] = e0;

	    this.e[1] = e1;

	    this.e[2] = e2;
	};

	var Mesh = function () {

	    /** 
	     * @class
	     * Our class for subdivision and other complex coordinate manipulation.
	     * @param {Prim} An object with flattened vertices, indices, and texture 
	     * coordinates, as well as the Prim type.
	     * NOTE: check libraries like http://evanw.github.io/csg.js/ to 
	     * implement more complex mesh operations.
	     * @constructor
	     * @param {Prim} prim a 3d objct (defined in PrimFactory.es6)
	     */

	    function Mesh(prim) {
	        _classCallCheck(this, Mesh);

	        this.prim = prim, this.util = prim.util, this.geo = prim.geometry, this.type = this.geo.type;

	        // Mesh arrays.

	        this.vertexArr = [], // holds Vertex objects

	        this.indexArr = [], // holds drawing path through Vertex objects

	        this.edgeArr = [], // holds Edge objects

	        this.edgeMap = [], // lookup table for Edges (even Vertices)

	        this.faceArr = [], // holds the triangle list (derived from indexArr)

	        this.valenceArr = [], // holds computed valency constants for Edge and opposite Vertices

	        this.oldVertexArr = []; // keep the original Vertex data when transforming mesh

	        // Mesh statistics.

	        this.avDistance = 0, // average distance between Vertices

	        this.width = 0, this.height = 0, this.depth = 0, this.centroid = null, this.iterations = 0; // number of iterations of the subdivide algorithm

	        // Scaling factors for smoothing.

	        this.epsilon = 1e-9, this.fw = 3 / 8, // Edge Vertices a midpoint is created in.

	        this.ow = 1 / 8, // Opposite Vertices from the Edge the midpoint is in.

	        this.f0w = 4 / 8, // Use when there is only one 'opposite' Vertex (e.g. Mesh 'seam') - change this to 4.5 to see the seams

	        this.badIndex32 = 4294967294; // invalid index in Vertex array.

	        this.NOT_IN_LIST = -1; // same as util

	        // Pre-compute valency weighting values.

	        this.computeValencyWeights(100); // 6 is typical

	        // Convert flattened arrays to Vertex data structure (Index array remains the same).

	        this.geometryToVertex(this.geo.vertices.data, this.geo.indices.data, this.geo.texCoords.data);

	        //////////console.log( 'created Mesh for ' + prim.name );
	    }

	    /** 
	     * Given a valency of surround Edges (neighboring Vertices) for a given 
	     * Vertex, compute weights. Similar to:
	     * @link https://github.com/deyan-hadzhiev/loop_subdivision/blob/master/loop_subdivision.js
	     * @param {Number} max the maximum valency to compute.
	     */


	    _createClass(Mesh, [{
	        key: 'computeValencyWeights',
	        value: function computeValencyWeights(max) {

	            this.valenceArr = new Array(max);

	            this.valenceArr[0] = 0.0, this.valenceArr[1] = 0.0, this.valenceArr[2] = 1.0 / 8.0, this.valenceArr[3] = 3.0 / 16.0;

	            for (var i = 4; i < max; i++) {

	                //this.valenceArr[i] = 3.0 / ( 8.0 * i );

	                this.valenceArr[i] = 1.0 / i * (5.0 / 8.0 - Math.pow(3.0 / 8.0 + 1.0 / 4.0 * Math.cos(2.0 * Math.PI / i), 2.0));
	            }
	        }

	        /**
	         * Find and return the midpoint between several Vertices.
	         * @param{...Vertex} vtx the input Vertex objects.
	         * @returns {Vertex} a new Vertex at the geometric center of the 
	         * input Vertex positions.
	         */

	    }, {
	        key: 'computeCentroid',
	        value: function computeCentroid() {

	            var len = arguments.length,
	                x = 0,
	                y = 0,
	                z = 0,
	                u = 0,
	                v = 0;

	            for (var i in arguments) {

	                var vtx = arguments[i];

	                x += vtx.coords.x, y += vtx.coords.y, z += vtx.coords.z, u += vtx.texCoords.u, v += vtx.texCoords.v;
	            }

	            x /= len, y /= len, z /= len, u /= len, v /= len;

	            return new Vertex(x, y, z, u, v, 0, null);
	        }

	        /** 
	         * Create the Vertices, assigning texture coordinates.
	         * @param {Array} vertices a flattened array of xyz positions
	         * @param {Array} texCoords a flattened array of uv positions
	         * @returns {Vertex[]} an array of Vertex objects.
	         */

	    }, {
	        key: 'computeVertices',
	        value: function computeVertices(vertices, texCoords) {

	            var i = 0,
	                vi = 0,
	                ti = 0;

	            // Bounding Box (get width, height, and depth)

	            var width = 0,
	                height = 0,
	                depth = 0;

	            var min = new Coords();

	            var max = new Coords();

	            var centroid = new Coords();

	            var numVertices = vertices.length / 3;

	            var vertexArr = new Array(numVertices);

	            for (i = 0; i < numVertices; i++) {

	                vertexArr[i] = new Vertex(vertices[vi++], vertices[vi++], vertices[vi++], texCoords[ti++], texCoords[ti++], i, vertexArr);

	                var vtx = vertexArr[i];

	                if (i > 0) {

	                    var c = vtx.coords;

	                    min.x = Math.min(min.x, c.x);

	                    max.x = Math.max(max.x, c.x);

	                    min.y = Math.min(min.y, c.y);

	                    max.y = Math.min(min.y, c.y);

	                    min.z = Math.min(min.z, c.z);

	                    max.z = Math.min(max.z, c.z);

	                    centroid.add(c);
	                }

	                // Centroid position.

	                this.centroid = centroid.scale(1 / numVertices);
	            }

	            // Compute Mesh dimensions.

	            this.width = max.x - min.x;

	            this.height = max.y - min.y;

	            this.depth = max.z - min.z;

	            return vertexArr;
	        }

	        /** 
	         * Set values for an Edge
	         * @param {Number} i0 index of first Vertex in Edge.
	         * @param {Number} i1 index of second Vertex in Edge.
	         * @param {Number} i2 index of opposite Vertex, forming a Face with the Edge.
	         * @returns {Number} the index (key) of the edge in the Edge array.
	         */

	    }, {
	        key: 'computeEdge',
	        value: function computeEdge(i0, i1, i2, fi) {

	            var vertexArr = this.vertexArr;

	            var edgeArr = this.edgeArr;

	            var idx = -1;

	            // Order edge Vertices in the Edge by their drawing order (defined by index array).

	            var mini = Math.min(i0, i1);

	            var maxi = Math.max(i0, i1);

	            // Check hash lookup for Edge already existing.

	            var key = mini + '-' + maxi;

	            if (key in this.edgeMap) {

	                idx = this.edgeMap[key]; // use existing Edge

	                var edge = edgeArr[idx];

	                edge.f[1] = fi; // Add the second Face to the Edge (1st added in constructor)

	                edge.ov[1] = i2; // Add the second opposite Vertex to the Edge (1st added in constructor)
	            } else {

	                idx = edgeArr.length;

	                this.edgeMap[key] = idx;

	                var _edge = new Edge(mini, maxi, i2, fi);

	                edgeArr.push(_edge);

	                // Let Vertices know they are part of this Edge (non-seam Vertices get 6+).

	                vertexArr[mini].e.push(idx);

	                vertexArr[maxi].e.push(idx);
	            }

	            return idx;
	        }

	        /** 
	         * Compute the Faces and Edges of the mesh from 
	         * the index array.
	         */

	    }, {
	        key: 'computeFaces',
	        value: function computeFaces() {

	            var vertexArr = this.vertexArr;

	            var indexArr = this.indexArr;

	            var len = indexArr.length;

	            // Create the Edge and Face (triangle) arrays

	            var faceArr = this.faceArr;

	            // Loop through the indexArr, defining Edges and Faces, hashing back to Vertices.

	            for (var i = 0; i < len; i += 3) {

	                var i0 = indexArr[i];

	                var i1 = indexArr[i + 1];

	                var i2 = indexArr[i + 2];

	                var fi = i / 3;

	                // Add 3 computed Edges to a Face, with Edges adding themselves to component Vertices

	                var face = new Face(this.computeEdge(i0, i1, i2, fi), this.computeEdge(i1, i2, i0, fi), this.computeEdge(i2, i0, i1, fi), fi);

	                // NOTE TO SELF - computeEdge returns the index of the edge in the Edge array
	                // Need to connect Face specifically to surrounds

	                faceArr.push(face);
	            }
	        }

	        /** 
	         * Adjust Even Vertices, 6 or more control points.
	         * @param {Vertex} vtx the Vertex to compute.
	         * @param {Vertex[]} the array containing surround Vertices.
	         * @returns {Boolean} if the Vertex is changed, return true, else false.
	         */

	    }, {
	        key: 'computeEven',
	        value: function computeEven(vtx, vertexArr) {

	            var edgeArr = this.edgeArr;

	            var valency = vtx.e.length;

	            var valenceArr = vtx.e;

	            /* 
	             * IMPORTANT
	             * 
	             * For 'seamless' Meshes, every Vertex has at least 6 other Vertices connected 
	             * to it. However if the mesh is not continuous, some will have lower valency.
	             *
	             * Running computeEven on a Vertex on a seam or corner results in a jagged edge.
	             * So, exit this function if valency is low enough to be a seam.
	             * 
	             * Note: for this to work, the 'odd' vertices must also be correctly ignored. 
	             * In the 'odd' computation, the 'seam' Vertices are recognized by missing 
	             * the second Edge.ov[1] 'opposite' Vertex from the Edge they are inside. 
	             */

	            var seamVtx = void 0,
	                seamVtxWeight = void 0,
	                seamVtxBaseWeight = void 0;

	            if (valency < 6) {
	                // TODO: had 5, affects joins on CubeSphere

	                return false;
	            }

	            // Beta weighting for surround Vertices.

	            var beta = this.valenceArr[valency];

	            // Beta weighting for the original ith Vertex.

	            var vertexWeightBeta = 1.0 - valency * beta;

	            var c = vtx.coords,
	                tc = vtx.texCoords,
	                x = vertexWeightBeta * c.x,
	                y = vertexWeightBeta * c.y,
	                z = vertexWeightBeta * c.z,
	                u = vertexWeightBeta * tc.u,
	                v = vertexWeightBeta * tc.v;

	            // Beta weighting for surround Vertices, using Edge vertices.

	            for (var j = 0; j < valency; j++) {

	                // Get the surround Vertices for vtx, the opposite Vertex for each Edge in the Vertex.

	                var op = vertexArr[edgeArr[vtx.e[j]].getOpposite(vtx)];

	                c = op.coords;

	                tc = op.texCoords;

	                x += beta * c.x, y += beta * c.y, z += beta * c.z, u += beta * tc.u, v += beta * tc.v;
	            }

	            // Save the recomputed Vertex

	            vtx.set(x, y, z, u, v);

	            return true;
	        }

	        /** 
	         * Adjust Odd Vertices, 4 control Vertices. Don't compute if we don't have the 
	         * second 'opposite' Vertex.
	         * @param {Vertex} vtx the odd Vertex.
	         * @param {Vertex[]} vertexArr the ORIGINAL Vertex array with all Vertices.
	         * @param {String} key the lookup key for the Edge containing this Vertex.
	         * @param {String} revKey reversed lookup key for the Edge containing this Vertex.
	         * @returns {Boolean} if the Vertex was changed, return true, else false.
	         */

	    }, {
	        key: 'computeOdd',
	        value: function computeOdd(vtx, vertexArr, key, revKey) {

	            var fw = this.fw; // 3 / 8;

	            var ow = this.ow; // 1 / 8;

	            var f0w = this.f0w; // 4 / 8; // 4/8 change this to 4.5 to see seams

	            var edgeArr = this.edgeArr;

	            var edge = edgeArr[this.edgeMap[key]];

	            if (!edge) {

	                // vtx1-vtx2 key not found, find vtx2-vtx1 key.

	                edge = edgeArr[this.edgeMap[revKey]];
	            } else {

	                //console.log('using forward edge')

	            }

	            if (edge) {

	                /* 
	                 * IMPORTANT!
	                 * 
	                 * If a Vertex has only one 'opposite' Vertex (meaning 
	                 * that fv0 === fv1) we are at a 'seam' or a 'corner'. 
	                 * Vertices with no second control Vertex. They should 
	                 * not be computed.
	                 * 
	                 * You can see the 'seams by changing f0w to 4.5 / 8 and 
	                 * you will get a jagged vertical seam'.
	                 *
	                 * For this to work, the 'even' Vertices must also be ignored.
	                 * In computeEven(), seams are Vertices with < 6 surround 
	                 * vertices (Vertex.e.length < 6) and aren't processed.
	                 */

	                var ev0 = vertexArr[edge.v[0]];

	                var ev1 = vertexArr[edge.v[1]];

	                var fv0 = vertexArr[edge.ov[0]];

	                var fv1 = vertexArr[edge.ov[1]];

	                // adjust only if the facing Vertices are different.

	                var x = void 0,
	                    y = void 0,
	                    z = void 0,
	                    u = void 0,
	                    v = void 0;

	                if (fv0 !== fv1) {

	                    // Vertices forming the Edge the midpoint is in 

	                    x = fw * (ev0.coords.x + ev1.coords.x), y = fw * (ev0.coords.y + ev1.coords.y), z = fw * (ev0.coords.z + ev1.coords.z), u = fw * (ev0.texCoords.u + ev1.texCoords.u), v = fw * (ev0.texCoords.v + ev1.texCoords.v);

	                    x += ow * (fv0.coords.x + fv1.coords.x), y += ow * (fv0.coords.y + fv1.coords.y), z += ow * (fv0.coords.z + fv1.coords.z), u += ow * (fv0.texCoords.u + fv1.texCoords.u), v += ow * (fv0.texCoords.v + fv1.texCoords.v);

	                    vtx.set(x, y, z, u, v);

	                    return true;
	                } else {

	                    x = f0w * (ev0.coords.x + ev1.coords.x), y = f0w * (ev0.coords.y + ev1.coords.y), z = f0w * (ev0.coords.z + ev1.coords.z), u = f0w * (ev0.texCoords.u + ev1.texCoords.u), v = f0w * (ev0.texCoords.v + ev1.texCoords.v);

	                    vtx.set(x, y, z, u, v);

	                    return true;
	                }
	            } else {

	                console.error('Mesh::computeEven(): invalid keys:' + key + ',' + revKey + ' edge is undefined');
	            }
	            return false;
	        }

	        /**
	         * Subdivide and optionally smooth a Mesh, similar to 
	         * @link https://github.com/deyan-hadzhiev/loop_subdivision/blob/master/loop_subdivision.js
	         * compute the Euler characteristic, based on effect of subdivision:
	         * 1. Number of faces = 4x larger
	         * 2. Each subdivided Face creates 3 new Edges, subdivided Edge creates 2 new Edges.
	         * @param {Boolean} smooth if true, smooth the subdivided object, else just insert subdivions Vertices.
	         * @returns {Mesh} this Mesh object (for chaining).
	         */

	    }, {
	        key: 'subdivide',
	        value: function subdivide(smooth) {

	            // Test is our system can handle the subdivision.

	            if (this.geo.vertices.data.length / 3 > this.geo.MAX_DRAWELEMENTS) {

	                console.warn('subdivision of ' + geo.type + ' would exceed ability of device to render indexed meshes, aborting...');

	                return this;
	            }

	            // Convert flattened arrays to Vertex, Edge objects.

	            this.geometryToVertex(this.geo.vertices.data, this.geo.indices.data, this.geo.texCoords.data, this.geo.colors.data);

	            this.isValid();

	            var vertexArr = this.vertexArr;

	            var indexArr = this.indexArr;

	            // TODO: saving extra copy, remove in final version.

	            this.oldVertexArr = this.vertexArr.slice(); // make a copy

	            this.oldIndexArr = this.indexArr.slice(); // make a copy

	            var newVertexArr = [];

	            var newIndexArr = [];

	            var indexHash = []; // for old indices = position in oldVertexArray

	            var midHash = []; // for new points, position in newVertexArray

	            this.edgeMap = [];

	            this.midMap = [];

	            this.faceArr = [];

	            this.edgeArr = [];

	            var edgeArr = this.edgeArr;

	            var NOT_IN_LIST = this.NOT_IN_LIST;

	            // Rebuild the Vertex and Index array.

	            var v0 = void 0,
	                v1 = void 0,
	                v2 = void 0;

	            // Compute Faces and Edges (hash back to Vertices).

	            ////////console.log( 'Mesh::subdivide(): ' + this.prim.name + ' beginning subdivision, ' + this.iterations + ', starting size:' + this.oldVertexArr.length );

	            this.computeFaces();

	            // Loop through the Vertices, creating new midpoints & smoothing Vertex positions only when needed.

	            for (var i = 0; i < indexArr.length; i += 3) {

	                var i0 = indexArr[i + 0];

	                var i1 = indexArr[i + 1];

	                var i2 = indexArr[i + 2];

	                if (indexHash[i0]) {

	                    v0 = newVertexArr[indexHash[i0]];
	                } else {

	                    v0 = vertexArr[i0].clone(newVertexArr);
	                }

	                if (indexHash[i1]) {

	                    v1 = newVertexArr[indexHash[i1]];
	                } else {

	                    v1 = vertexArr[i1].clone(newVertexArr);
	                }

	                if (indexHash[i2]) {

	                    v2 = newVertexArr[indexHash[i2]];
	                } else {

	                    v2 = vertexArr[i2].clone(newVertexArr);
	                }

	                // Compute new indices in the subdivided Vertex array

	                var ii0 = newVertexArr.indexOf(v0);

	                if (ii0 === NOT_IN_LIST) {

	                    newVertexArr.push(v0);

	                    ii0 = newVertexArr.length - 1;

	                    indexHash[i0] = ii0;
	                } else {

	                    //ii0 = ii0;

	                }

	                var ii1 = newVertexArr.indexOf(v1);

	                if (ii1 === NOT_IN_LIST) {

	                    newVertexArr.push(v1);

	                    ii1 = newVertexArr.length - 1;

	                    indexHash[i1] = ii1;
	                } else {

	                    //ii1 = ii1;

	                }

	                var ii2 = newVertexArr.indexOf(v2);

	                if (ii2 === NOT_IN_LIST) {

	                    newVertexArr.push(v2);

	                    ii2 = newVertexArr.length - 1;

	                    indexHash[i2] = ii2;
	                } else {

	                    //ii2 = ii2;

	                }

	                var m0 = void 0,
	                    m1 = void 0,
	                    m2 = void 0,
	                    mi0 = void 0,
	                    mi1 = void 0,
	                    mi2 = void 0;

	                /*
	                newIndexArr.push(
	                     i0, i1, i2
	                 );
	                */

	                if (smooth) {

	                    this.computeEven(v0, vertexArr);

	                    this.computeEven(v1, vertexArr);

	                    this.computeEven(v2, vertexArr);
	                }

	                // if we add three midpoints

	                // First midpoint.

	                var key = ii0 + '-' + ii1;

	                var revKey = ii1 + '-' + ii0;

	                if (midHash[key]) {

	                    mi0 = midHash[key];
	                } else if (midHash[revKey]) {

	                    mi0 = midhash[revKey];
	                } else {

	                    m0 = this.computeCentroid(v0, v1);

	                    m0.vertexArr = newVertexArr; ////////////////////////

	                    m0.idx = newVertexArr.length; // GETS ALTERED SEVERAL TIMES

	                    if (smooth) {
	                        // in-place adjustment of m0's position

	                        this.computeOdd(m0, vertexArr, i0 + '-' + i1, i1 + '-' + i0); // OLD INDEXES
	                    }

	                    newVertexArr.push(m0);

	                    mi0 = newVertexArr.length - 1;

	                    midHash[key] = mi0;

	                    midHash[revKey] = mi0;
	                }

	                // Second midpoint.

	                key = ii1 + '-' + ii2;

	                revKey = ii2 + '-' + ii1;

	                if (midHash[key]) {

	                    mi1 = midHash[key];
	                } else if (midHash[revKey]) {

	                    mi1 = midhash[revKey];
	                } else {

	                    m1 = this.computeCentroid(v1, v2);

	                    m1.vertexArr = newVertexArr;

	                    m1.idx = newVertexArr.length;

	                    if (smooth) {
	                        // in-place adjustment of m1's position

	                        this.computeOdd(m1, vertexArr, i1 + '-' + i2, i2 + '-' + i1); // OLD INDEXES
	                    }

	                    newVertexArr.push(m1);

	                    mi1 = newVertexArr.length - 1;

	                    midHash[key] = mi1;

	                    midHash[revKey] = mi1;
	                }

	                // Third midpoint.

	                key = ii2 + '-' + ii0;

	                revKey = ii0 + '-' + ii2;

	                if (midHash[key]) {

	                    mi2 = midHash[key];
	                } else if (midHash[revKey]) {

	                    mi2 = midhash[revKey];
	                } else {

	                    m2 = this.computeCentroid(v2, v0);

	                    m2.vertexArr = newVertexArr;

	                    m2.idx = newVertexArr.length;

	                    if (smooth) {
	                        // in-place adjustment of m2's position

	                        this.computeOdd(m2, vertexArr, i2 + '-' + i0, i0 + '-' + i2); // OLD INDICES
	                    }

	                    newVertexArr.push(m2);

	                    mi2 = newVertexArr.length - 1;

	                    midHash[key] = mi2;

	                    midHash[revKey] = mi2;
	                }

	                // Push new indices

	                newIndexArr.push(mi0, ii1, mi1, // B  

	                mi1, mi2, mi0, // C

	                mi2, mi1, ii2, // D

	                mi2, ii0, mi0 // A

	                );
	            } // end of index loop

	            // Number of iterations of subdivision.

	            this.iterations++;

	            this.vertexArr = newVertexArr;

	            this.indexArr = newIndexArr;

	            this.vertexToGeometry();

	            console.log('Mesh::subdivde(): ' + this.prim.name + ' subdivided from ' + this.oldVertexArr.length + ' to:' + this.vertexArr.length + ' index length:' + this.indexArr.length);

	            return this;
	        }

	        /** 
	         * Reduce the number of vertices, preserving overall shape.
	         */

	    }, {
	        key: 'simplify',
	        value: function simplify() {

	            var NOT_IN_LIST = this.NOT_IN_LIST;

	            // Convert flattened arrays to Vertex, Edge objects.

	            console.log('Simplifying mesh... type:' + this.geo.type);

	            var vertexArr = this.vertexArr;

	            var indexArr = this.indexArr;

	            // Find overlapping Vertices (seams) and reduce complexity.

	            var newVertexArr = [];

	            var newIndexArr = [];

	            // Generate our Edge array

	            // Copy over old Vertex and Index array.

	            this.oldIndexArr = indexArr;

	            this.oldVertexArr = vertexArr;

	            this.vertexArr = newVertexArr;

	            // Index array remains the same.

	            this.indexArr = newIndexArr;

	            console.log('Mesh::simplify(): oldVertexArr:' + vertexArr.length + ', newVertexArr simplified to:' + newVertexArr.length);

	            this.vertexToGeometry();
	        }

	        /** 
	         * distort a shape into a shallow bowl
	         */

	        /** 
	         * Convert our native flattened geometric data (from Prim) to a Vertex object 
	         * data representation suitable for subdivision and morphing.
	         * @param {Array} vertices a flattened array of positions.
	         * @param {Array} indices drawing order for vertices.
	         * @param {Array} texCoords texture coordinates for each position.
	         * @returns {Mesh} this Mesh object (for chaining).
	         */

	    }, {
	        key: 'geometryToVertex',
	        value: function geometryToVertex(vertices, indices, texCoords) {
	            var colors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];


	            /* 
	             * The incoming flattened index array has stride = 3, so 
	             * an x coord in the vertexArr is just the index value
	             * of the starting x coordinate in flattened vertices * 3, 
	             * ...so we don't have to change the index array at all.
	             */

	            this.indexArr = indices.slice();

	            // Convert flattened coordinates to Vertex objects. IndexArr is unchanged, and still points to the right places.

	            this.vertexArr = this.computeVertices(vertices, texCoords, colors);

	            ////////console.log( 'Mesh::geometryToVertex(): numVertices:' + this.vertexArr.length + ' numIndices:' + this.indexArr.length );

	            return this.isValid();
	        }

	        /** 
	         * Convert an array of Vertex objects back to our native 
	         * flattened data representation, and apply to our Prim's geometry.
	         */

	    }, {
	        key: 'vertexToGeometry',
	        value: function vertexToGeometry() {

	            var prim = this.prim;

	            var geo = this.geo;

	            console.log('Mesh::vertexToGeometry()');

	            var vertexArr = this.vertexArr;

	            var numVertices = vertexArr.length;

	            var indexArr = this.indexArr;

	            // index array doesn't need to be flattened, just clone it.

	            var indices = this.indexArr.slice();

	            // Initialize vertices and texCoords array need to be generated from the Vertex array.

	            geo.vertices.data = new Array(vertexArr.length * 3);

	            geo.texCoords.data = new Array(vertexArr.length * 2);

	            var vertices = geo.vertices.data;

	            var texCoords = geo.texCoords.data;

	            // Write the flattened coordinate data.

	            for (var i = 0; i < numVertices; i++) {

	                var vi = i * 3;

	                var ti = i * 2;

	                var vtx = vertexArr[i];

	                if (vtx) {

	                    var c = vtx.coords;

	                    var t = vtx.texCoords;

	                    // Recover and flatten coordinate values.

	                    vertices[vi] = c.x;

	                    vertices[vi + 1] = c.y;

	                    vertices[vi + 2] = c.z;

	                    // Recover and flatten texture coordinate values.

	                    texCoords[ti] = t.u;

	                    texCoords[ti + 1] = t.v;
	                } else {

	                    console.warn('Mesh::vertexToGeometry(): no vertex in vertexArr at pos:' + i);

	                    vertices = vertices.slice(i); // truncate to keep the vertices valid for debugging

	                    break;
	                }
	            }

	            /* 
	             * Update our GeometryBuffer object with vertices, indices, and texture coordinates.
	             * We do this directly, instead of emitting a NEW_GEOMETRY event since we are using the 
	             * existing geometry, without changing position, scale, etc.
	             */

	            console.log('Mesh::vertexToGeometry(): vertices:' + vertices.length / 3 + ' indices:' + indices.length + ' texCoords:' + texCoords.length / 2);

	            geo.setVertices(vertices);

	            geo.setIndices(indices);

	            geo.setTexCoords(texCoords);

	            // Update normals, tangents, and colors to reflect the altered Mesh.

	            prim.updateNormals();

	            prim.updateTangents();

	            prim.updateColors();

	            //return geo.checkBufferData();
	        }

	        /** 
	         * Validate a Mesh structure
	         * @returns {Boolean} if valid, return true, else false.
	         */

	    }, {
	        key: 'isValid',
	        value: function isValid() {

	            var vertexArr = this.vertexArr;

	            if (!(vertexArr.length > 0)) {

	                console.error('Mesh::isValid(): vertex array empty, vertex:' + vertexArr.length);

	                return false;
	            }

	            var indexArr = this.indexArr;

	            if (!(indexArr.length > 0)) {

	                console.error('Mesh::isValid(): index array empty, vertex:' + vertexArr.length + ' index:' + indexArr.length);

	                return false;
	            }

	            if (vertexArr.length > 0) {

	                for (var i = 0; i < vertexArr.length; i++) {

	                    if (!vertexArr[i].isValid()) {

	                        console.warn('Mesh::isValid(): invalid supplied vertex at:' + i);

	                        return false;
	                    }
	                }
	            } else {

	                console.error('Mesh::isValid(): no vertex and/or index array defined');

	                return false;
	            }

	            return true;
	        } // end of isValid


	    }]);

	    return Mesh;
	}(); // End of class.

	// We only export Mesh

	exports.default = Mesh;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _map2d = __webpack_require__(21);

	var _map2d2 = _interopRequireDefault(_map2d);

	var _map3d = __webpack_require__(23);

	var _map3d2 = _interopRequireDefault(_map3d);

	var _mesh = __webpack_require__(24);

	var _mesh2 = _interopRequireDefault(_mesh);

	var _modelPool = __webpack_require__(26);

	var _modelPool2 = _interopRequireDefault(_modelPool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	'use strict';

	var GeometryPool = function () {

	    /** 
	     * @class GeometryPool
	     * create coordinate geometry for vertices, textures, normals, tangents, either 
	     * from a file or proceedurally.
	     *
	     * geo primitive examples
	     * https://github.com/nickdesaulniers/prims
	     * https://github.com/mhintz/platonic/tree/master/src
	     * https://github.com/azmobi2/html5-webgl-geometry-shapes/blob/master/webgl_geometry_shapes.html
	     * 
	     * Ogre 3d procedural
	     * https://bitbucket.org/transporter/ogre-procedural/src/ca6eb3363a53c2b53c055db5ce68c1d35daab0d5/library/include/?at=default
	     * https://bitbucket.org/transporter/ogre-procedural/wiki/Home
	     *
	     * https://github.com/jagenjo/litegl.js/tree/master/src
	     *
	     * http://wiki.unity3d.com/index.php/ProceduralPrimitives
	     * 
	     * advanced toolset
	     * https://www.geometrictools.com/Samples/Geometrics.html
	     * Lots of Webgl tricks!
	     * https://acko.net
	     * http://acko.net/blog/on-webgl/
	     * https://gamedevdaily.io/four-ways-to-create-a-mesh-for-a-sphere-d7956b825db4#.lkbq2omq5
	     *
	     * ---------------------------------------------------------------
	     * Code Writing Conventions
	     * 1. vertices = flattened array, final vertex data for computation or rendering
	     * 2. vtx      = any initialization Vertex object (e.g. for complex polyhedra)
	     * 3. v, vv    = local vertex or vertex array.
	     * 4. when using glMatrix functions, do 'in place' conversion first. 
	     *    If not practical, return the result. If not practical, use an 
	     *    object literal:
	     *    - vec3.sub( resultPt, a, b );
	     *    - resultPt = vec3.sub( resultPt, a, b );
	     *    - resultPt = vec3.sub( [ 0, 0, 0 ], a, b );
	     * ---------------------------------------------------------------
	     * @constructor
	     * @param {Boolean} init if true, initialize in the constructor.
	     * @param {Util} util the utility class.
	     * @param {glMatrix} the glMatrix class.
	     * @param {WebGL} the webGL class.
	     */
	    function GeometryPool(init, util, glMatrix, webgl, modelPool) {
	        _classCallCheck(this, GeometryPool);

	        console.log('in GeometryPool class');

	        this.util = util, this.glMatrix = glMatrix, this.webgl = webgl, this.modelPool = modelPool, this.typeList = {

	            POINT: 'geometryPointCloud',

	            POINTCLOUD: 'geometryPointCloud', // random cloud of 3d points

	            TEXTURECLOUD: 'geometryTextureCloud',

	            STARDOME: 'geometryStarDome', // stars projected onto a sphere

	            STAR3D: 'geometryStarSpace', // stars projected in 3d

	            LINE: 'geometryLine',

	            PLANE: 'geometryOuterPlane',

	            OUTERPLANE: 'geometryOuterPlane',

	            INNERPLANE: 'geometryInnerPlane',

	            CURVEDPLANE: 'geometryCurvedOuterPlane',

	            CURVEDOUTERPLANE: 'geometryCurvedOuterPlane',

	            CURVEDINNERPLANE: 'geometryCurvedInnerPlane',

	            TERRAIN: 'geometryTerrain',

	            CIRCLE: 'geometryCircle',

	            CUBE: 'geometryCube',

	            CUBESPHERE: 'geometryCubeSphere',

	            SPHERE: 'geometrySphere',

	            DISC: 'geometryCap',

	            CAP: 'geometryCap',

	            DOME: 'geometryDome',

	            TOPDOME: 'geometryTopDome',

	            SKYDOME: 'geometrySkyDome',

	            BOTTOMDOME: 'geometryBottomDome',

	            CONE: 'geometryCone',

	            TOPCONE: 'geometryTopCone',

	            BOTTOMCONE: 'geometryBottomCone',

	            SPINDLE: 'geometrySpindle',

	            TEARDROP: 'geometryTeardrop',

	            CYLINDER: 'geometryCylinder',

	            CAPSULE: 'geometryCapsule',

	            PRISM: 'geometryPrism', // 3 sides

	            ICOSOHEDRON: 'geometryIcosohedron', // 8 sides

	            PYRAMID: 'geometryPyramid',

	            REGULARTETRAHEDRON: 'geometryRegularTetrahedron', // 2 joined 4-sided pyramids

	            ICOSPHERE: 'geometryIcoSphere',

	            TOPICODOME: 'geometryTopIcoDome',

	            SKYICODOME: 'geometrySkyIcoDome',

	            BOTTOMICODOME: 'geometryBottomIcoDome',

	            OCTAHEDRON: 'geometryOctahedron',

	            DODECAHEDRON: 'geometryDodecahedron',

	            TORUS: 'geometryTorus',

	            MESH: 'geometryMesh'
	        };

	        // Sideness, direction. Mapped to equivalent unit vector names in this.getStdVecs()

	        this.directions = {

	            DEFAULT: 'up',

	            FORWARD: 'forward',

	            FRONT: 'forward',

	            BACK: 'back',

	            LEFT: 'left',

	            RIGHT: 'right',

	            UP: 'up',

	            TOP: 'top', // MADE THIS TOP

	            DOWN: 'down',

	            BOTTOM: 'down'

	        };

	        // Visible from inside or outside, or not visible.

	        this.OUTSIDE = 100, this.INSIDE = 101, this.INVISIBLE = 102;

	        // Math shorthand.

	        this.TWO_PI = Math.PI * 2;

	        if (init) {

	            // do something

	        }
	    }

	    /** 
	     * Return a default GeometryPool object.
	     * @param {glMatrix.vec3[]} vertices the vertex data.
	     * @param {Array[gl.UNSIGNED_INT|gl.UNSIGNED_SHORT]} current indices into the vertices.
	     * @param {glMatrix.vec2[]} texCoords the 2d texture coordinate data.
	     * @param {glMatrix.vec3[]} normals normals for the vertices.
	     * @param {glMatrix.vec3[]} tangents tangent data for vertices.
	     */


	    _createClass(GeometryPool, [{
	        key: 'default',
	        value: function _default() {
	            var vertices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	            var indices = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	            var texCoords = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	            var normals = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
	            var tangents = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
	            var colors = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];


	            return {

	                vertices: vertices,

	                indices: indices,

	                normals: normals,

	                texCoords: texCoords,

	                tangents: tangents,

	                colors: colors

	            };
	        }

	        /** 
	         * ---------------------------------------
	         * UTILITY
	         * ---------------------------------------
	         */

	        /** 
	         * See if supplied Prim type is supported via a method. 
	         * Individual Prim factory methods may do more detailed checking.
	         * @param {String} type the Prim type.
	         * @returns {Boolean} if supported, return true, else false.
	         */

	    }, {
	        key: 'checkType',
	        value: function checkType(type) {

	            // Confirm we have a factory function for this type.

	            if (this[type] instanceof Function) {

	                return true;
	            }

	            return false;
	        }

	        /* 
	         * ---------------------------------------
	         * DEFAULT VECTORS AND OBJECTS
	         * ---------------------------------------
	         */

	        /** 
	         * Standard vectors (similar to Unity) when needed. Call only 
	         * if using the array literal (e.g. [ 0, 0, 0,]) doesn't make sense. 
	         * Note you may need to go "let getStdVecs = this.getStdVecs.bind( this)" 
	         * in your calling function.
	         * @link https://docs.unity3d.com/ScriptReference/Vector3.html
	         * @param {String} type the (flattened) vector type.
	         * @returns {Array} a directional array.
	        */

	    }, {
	        key: 'getStdVecs',
	        value: function getStdVecs(type) {

	            var dir = this.directions;

	            switch (type) {

	                case dir.BACK:
	                    return [0, 0, -1];

	                case dir.DOWN:
	                    return [0, -1, 0];

	                case dir.FORWARD:
	                    return [0, 0, 1];

	                case dir.LEFT:
	                    return [-1, 0, 0];

	                case dir.RIGHT:
	                    return [1, 0, 0];

	                case dir.UP:
	                    return [0, 1, 0];

	                case dir.ONE:
	                    return [1, 1, 1];

	                case dir.ZERO:
	                    return [0, 0, 0];

	            }
	        }

	        /** 
	         * Larger configuration vectors for Prims. additional values control slicing 
	         * or flattening of part of a prim.
	         * @param {Number} a the x value of the vector.
	         * @param {Number} b the y value of the vector.
	         * @param {Number} c the z value of the vector.
	         * @param {Number} d for CONE, truncation of the CONE point, otherwise controls 
	         * the start and end of a Caps on CYLINDER and CONE Prims, or flattening of the 
	         * top and bottom of SPHERE Prims. This ensures the texture stretchs across a Prim 
	         * made up of CYLINER or CONE with Caps at the end.
	         */

	    }, {
	        key: 'vec5',
	        value: function vec5(a, b, c) {
	            var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	            var e = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;


	            return [a, b, c, d, e];
	        }

	        /* 
	         * ---------------------------------------
	         * NORMAL, INDEX, VERTEX, TRIANGLE, QUAD CALCULATIONS
	         * ---------------------------------------
	         */

	        /**
	         * Compute whether point is in a triangle of 3 coordinates, wrapped 
	         * clockwise (p0, p1, p2)
	         * @link http://blackpawn.com/texts/pointinpoly/
	         * @param {glMatrix.vec3} p the point to test.
	         * @param {glMatrix.vec3} p0 first clockwise vertex of triangle.
	         * @param {glMatrix.vec3} p1 second clockwise vertex of triangle.
	         * @param {glMatrix.vec3} p2 third clockwise vertex of triangle.
	         * @returns {Boolean} if point in triangle, return true, else false.
	         */

	    }, {
	        key: 'computePointInTriangle',
	        value: function computePointInTriangle(p, p0, p1, p2) {

	            var uv = this.computeBaryCentric(p, p0, p1, p2);

	            // Check if point is in triangle.

	            return u >= 0 && v >= 0 && u + v < 1;
	        }

	        /** 
	         * Compute the angle between two 2d coordinates.
	         * @param {glMatrix.vec3} a the first vertex in the angle.
	         * @param {glMatrix.vec3} b the second vertex in the angle.
	         * @returns {Number} the angle between the vertices, in radians.
	         */

	    }, {
	        key: 'computeAngle2d',
	        value: function computeAngle2d(a, b, whichAngle) {

	            var d1 = void 0,
	                d2 = void 0;

	            switch (whichAngle) {

	                case 0:
	                    // xz

	                    d1 = b[0] - a[0];

	                    d2 = b[2] - a[2];

	                    break;

	                case 1:
	                    // xy

	                    d1 = b[0] - a[0];

	                    d2 = b[1] - a[1];

	                    break;

	                case 2:
	                    // yz

	                    d1 = b[1] - a[1];

	                    d2 = b[2] - a[2];

	                    break;

	                default:

	                    console.error('invalid 2d angle choice, ' + whichAngle);

	                    break;

	            }

	            return Math.atan2(d2, d1);
	        }

	        /** 
	         * Compute the angle between three 3d coordinates defining a plane.
	         * @param {glMatrix.vec3} a first vertex in angle.
	         * @param {glMatrix.vec3} b second axis vertex in angle.
	         * @param {glMatrix.vec3} c third vertex defining the angle.
	         * @returns {Number} the angle between the vertices, in radians.
	         */

	    }, {
	        key: 'computeAngle3d',
	        value: function computeAngle3d(a, b, c) {

	            var ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];

	            var bc = [c[0] - b[0], c[1] - b[1], c[2] - b[2]];

	            var abDist = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]);

	            var bcDist = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1] + bc[2] * bc[2]);

	            var abNorm = [ab[0] / abDist, ab[1] / abDist, ab[2] / abDist];

	            var bcNorm = [bc[0] / bcDist, bc[1] / bcDist, bc[2] / bcDist];

	            return Math.acos(abNorm[0] * bcNorm[0] + abNorm[1] * bcNorm[1] + abNorm[2] * bcNorm[2]);
	        }

	        /**
	         * Find the center between any set of 3d coordinates.
	         * @param {glMatrix.vec3[]} vertices an array of xyz coordinates.
	         * @returns {glMatrix.vec3} the center point.
	         */

	    }, {
	        key: 'computeCentroid',
	        value: function computeCentroid(vertices) {

	            var c = [0, 0, 0];

	            var len = vertices.length;

	            for (var i = 0; i < len; i++) {

	                var vertex = vertices[i];

	                c[0] += vertex[0], c[1] += vertex[1], c[2] += vertex[2];
	            }

	            c[0] /= len, c[1] /= len, c[2] /= len;

	            return c;
	        }

	        /** 
	         * Compute an area-weighted centroid point for a Prim.
	         * Use this when we want the center of the whole object the polygon is part of.
	         * @param {glMatrix.vec3[]} vertices a list of 3d vertices.
	         * @param {glMatrix.vec3} the centroid Point.
	         */

	    }, {
	        key: 'computeMassCentroid',
	        value: function computeMassCentroid(vertices) {

	            var vec3 = this.glMatrix.vec3;

	            var c = [0, 0, 0];

	            var areaTotal = 0.0;

	            var p1 = vertices[0];

	            var p2 = vertices[1];

	            for (var i = 2; i < vertices.length; i++) {

	                var p3 = vertices[i];

	                var edge1 = vec3.subtract([0, 0, 0], p3, p1);

	                var edge2 = vec3.subtract([0, 0, 0], p3, p2);

	                var crossProduct = vec3.cross([0, 0, 0], edge1, edge2);

	                var area = vec3.length(crossProduct) / 2;

	                c[0] += area * (p1[0] + p2[0] + p3[0]) / 3, c[1] += area * (p1[1] + p2[1] + p3[1]) / 3, c[2] += area * (p1[2] + p2[2] + p3[2]) / 3;

	                areaTotal += area;

	                p2 = vec3.copy([0, 0, 0], p3);
	            }

	            return [c[0] / areaTotal, c[1] / areaTotal, c[2] / areaTotal];
	        }

	        /** 
	         * Compute barycentric coordinates of a Point relative 
	         * to a triangle defined by three coordinates.
	         * @param {glMatrix.vec3} p the point to test.
	         * @param {glMatrix.vec3} p0 first clockwise vertex of triangle.
	         * @param {glMatrix.vec3} p1 second clockwise vertex of triangle.
	         * @param {glMatrix.vec3} p2 third clockwise vertex of triangle.
	         * @returns {glMatrix.vec2} uv coordinates of Point relative to triangle.
	         */

	    }, {
	        key: 'computeBarycentric',
	        value: function computeBarycentric(p, p0, p1, p2) {

	            var vec3 = this.glMatrix.vec3;

	            var v0 = void 0,
	                v1 = void 0,
	                v2 = void 0,
	                d00 = void 0,
	                d01 = void 0,
	                d02 = void 0,
	                d11 = void 0,
	                d12 = void 0;

	            // Compute vectors.

	            v0 = vec3.sub(v0, p2, p0);

	            v1 = vec3.sub(v1, p1, p0);

	            v2 = vec3.sub(v2, p, p0);

	            // Compute dot products.

	            d00 = vec3.dot(v0, v0);

	            d01 = vec3.dot(v0, v1);

	            d02 = vec3.dot(v0, v2);

	            d11 = vec3.dot(v1, v1);

	            d12 = vec3.dot(v1, v2);

	            // Compute barycentric coordinates.

	            var invDenom = 1 / (d00 * d11 - d01 * d01);

	            var u = (d11 * d02 - d01 * d12) * invDenom;

	            var v = (d00 * d12 - d01 * d02) * invDenom;

	            return [u, v];
	        }

	        /** 
	         * Bounding box for a set of 3d coordinates. This object is NO the same 
	         * as a standard Cube, since each side is a quad without 
	         * further divisions.
	         * @param {glMatrix.vec3[]} vertices a list of coordinates to be enclosed in the bounding box.
	         * @returns{Prim.BoundingBox} a BoundingBox object.
	         */

	    }, {
	        key: 'computeBoundingBox',
	        value: function computeBoundingBox(vertices) {

	            var vec3 = this.glMatrix.vec3;

	            var box = {};

	            var tx = 0,
	                ty = 0,
	                tz = 0,
	                bx = 0,
	                by = 0,
	                bz = 0;

	            // Find minimum topLeft and maximum bottomRight coordinates defining a cube.

	            for (var i = 0; i < vertices.length; i += 3) {

	                var v0 = vertices[i],
	                    v1 = vertices[i + 1],
	                    v2 = vertices[i + 2];

	                tx = Math.min(tx, v0), ty = Math.min(ty, v1), tz = Math.min(tz, v2), bx = Math.max(bx, v0), by = Math.max(by, v1), bz = Math.max(bz, v2);
	            }

	            // Two quads, vary by z values only, clockwise.

	            box.vertices = [

	            // Front face

	            tx, ty, bz, bx, ty, bz, bx, by, bz, tx, by, bz,

	            // Back face

	            tx, ty, tz, tx, by, tz, bx, by, tz, bx, ty, tz,

	            // Top face

	            tx, by, tz, tx, by, bz, bx, by, bz, bx, by, tz,

	            // Bottom face

	            tx, ty, tz, bx, ty, tz, bx, ty, bz, tx, ty, bz,

	            // Right face

	            bx, ty, tz, bx, by, tz, bx, by, bz, bx, ty, bz,

	            // Left face

	            tx, ty, tz, tx, ty, bz, tx, by, bz, tx, by, tz];

	            box.indices = [0, 1, 2, 0, 2, 3, // front

	            4, 5, 6, 4, 6, 7, // back

	            8, 9, 10, 8, 10, 11, // top

	            12, 13, 14, 12, 14, 15, // bottom

	            16, 17, 18, 16, 18, 19, // right

	            20, 21, 22, 20, 22, 23 // left

	            ];

	            box.topLeft = [tx, ty, tz];

	            box.bottomRight = [bx, by, bz];

	            box.dimensions = vec3.subtract([0, 0, 0], box.bottomRight, box.topLeft);

	            // if we draw it, add more here.

	            return box;
	        }

	        /** 
	         * Compute the bounding sphere enclosed by a bounding box
	         */

	    }, {
	        key: 'computeBoundingSphere',
	        value: function computeBoundingSphere(boundingBox) {

	            var sphere = {};

	            var topLeft = boundingBox.topLeft;

	            var bottomRight = boundingBox.bottomRight;

	            var xSpan = Math.abs(bottomRight[0] - topLeft[0]);

	            var ySpan = Math.abs(bottomRight[1] - topLeft[1]);

	            var zSpan = Math.abs(bottomRight[2] - topLeft[2]);

	            var radius = Math.max(xSpan, ySpan, zSpan) / 2;

	            sphere.radius = radius;

	            var center = this.computeCentroid(vertices);

	            sphere.center = center;

	            return sphere;
	        }

	        /** 
	         * Get spherical coordinates (u, v) for normalized unit vector.
	         * @param {glMatrix.vec3} vtx the [x, y, z] unit vector
	         * @returns {glMatrix.vec2} the texture coordinate [ u, v ].
	         */

	    }, {
	        key: 'computeSphericalCoords',
	        value: function computeSphericalCoords(vtx) {

	            var u = Math.atan2(vtx[0], vtx[2]) / this.TWO_PI; // x, z

	            var v = Math.asin(vtx[1]) / Math.PI + 0.5; // y

	            if (u < 0) {

	                u += 1;
	            }

	            return [u, v];
	        }

	        /** 
	         * Compute the bounding sphere for a Prim, with all its coordinates projected to the 
	         * surface of the sphere. Use to make non-uv sphere. Also use to supply texture coordinates 
	         * when they are missing.
	         * @param {glMatrix.vec3[]} vertices the vertex coordinates.
	         * @param {Object} boundingBox a pre-computed bounding box for the coordinates.
	         */

	    }, {
	        key: 'computeInflateToSphere',
	        value: function computeInflateToSphere(vertices, boundingBox) {

	            var sphere = this.computeSphere(boundingBox);

	            var sVertices = [];

	            var sTexCoords = [];

	            // Compute distances between extremes

	            var cx = sphere.center[0];

	            var cy = sphere.center[1];

	            var cz = sphere.center[2];

	            var radius = sphere.radius;

	            for (var i = 0; i < vertices.length; i += 3) {

	                var x = vertices[i];

	                var y = vertices[i + 1];

	                var z = vertices[i + 2];

	                var dist = Math.sqrt(cx * x + cy * y + cz * z);

	                var scale = dist / radius;

	                sVertices.push(x * scale, y * scale, z * scale);

	                var texCoord = this.computeSphericalCoords([x, y, z]);

	                sTexCoords.push(texCoord.u, texCoord.v);
	            }

	            return {

	                vertices: vertices,

	                texCoords: texCoords

	            };
	        }

	        /** 
	         * Compute normals for a 3d object. 
	         * NOTE: some routines may compute their own normals. In that case, computation optionally
	         * only is done for normals that aren't computed yet.
	         * Adapted from BabylonJS version:
	         * @link https://github.com/BabylonJS/Babylon.js/blob/3fe3372053ac58505dbf7a2a6f3f52e3b92670c8/src/Mesh/babylon.mesh.vertexData.js
	         * @link http://gamedev.stackexchange.com/questions/8191/any-reliable-polygon-normal-calculation-code
	         * @link https://www.opengl.org/wiki/Calculating_a_Surface_Normal
	         * @param {glMatrix.vec3[]} vertices the current 3d position coordinates.
	         * @param {Array[gl.UNSIGNED_INT|gl.UNSIGNED_SHORT]} current indices into the vertices.
	         * @param {glMatrix.vec3[]} normals the normals array to populate, or recalculate.
	         * @param {Boolean} justFace if true, return the face normal for all three vertices in a triangle, otherwise, compute each vertex normal separately.
	         * @returns {glMatrix.vec3[]} an array of normals.
	         */

	    }, {
	        key: 'computeNormals',
	        value: function computeNormals(vertices, indices, normals) {
	            var justFace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


	            var idx = 0,
	                nbFaces = void 0;

	            var p1p2x = 0.0,
	                p1p2y = 0.0,
	                p1p2z = 0.0;

	            var p3p2x = 0.0,
	                p3p2y = 0.0,
	                p3p2z = 0.0;

	            var faceNormalx = 0.0,
	                faceNormaly = 0.0,
	                faceNormalz = 0.0;

	            var length = 0.0;

	            var i1 = 0,
	                i2 = 0,
	                i3 = 0;

	            // Create a new Normals array.

	            var norms = new Float32Array(vertices.length);

	            // Index triangle = 1 face.

	            nbFaces = indices.length / 3;

	            for (idx = 0; idx < nbFaces; idx++) {

	                i1 = indices[idx * 3]; // get the indices of each Vertex of the Face

	                i2 = indices[idx * 3 + 1];

	                i3 = indices[idx * 3 + 2];

	                // Get face vertex values.

	                p1p2x = vertices[i1 * 3] - vertices[i2 * 3]; // compute two vectors per Face

	                p1p2y = vertices[i1 * 3 + 1] - vertices[i2 * 3 + 1];

	                p1p2z = vertices[i1 * 3 + 2] - vertices[i2 * 3 + 2];

	                p3p2x = vertices[i3 * 3] - vertices[i2 * 3];

	                p3p2y = vertices[i3 * 3 + 1] - vertices[i2 * 3 + 1];

	                p3p2z = vertices[i3 * 3 + 2] - vertices[i2 * 3 + 2];

	                // Compute the face normal with cross product.

	                faceNormalx = p1p2y * p3p2z - p1p2z * p3p2y;

	                faceNormaly = p1p2z * p3p2x - p1p2x * p3p2z;

	                faceNormalz = p1p2x * p3p2y - p1p2y * p3p2x;

	                // Get normalized length of face normal.

	                length = Math.sqrt(faceNormalx * faceNormalx + faceNormaly * faceNormaly + faceNormalz * faceNormalz);

	                length = length === 0 ? 1.0 : length;

	                faceNormalx /= length; // normalize this normal

	                faceNormaly /= length;

	                faceNormalz /= length;

	                // Accumulate all the normals defined for the face.

	                norms[i1 * 3] += faceNormalx;

	                norms[i1 * 3 + 1] += faceNormaly;

	                norms[i1 * 3 + 2] += faceNormalz;

	                norms[i2 * 3] += faceNormalx;

	                norms[i2 * 3 + 1] += faceNormaly;

	                norms[i2 * 3 + 2] += faceNormalz;

	                norms[i3 * 3] += faceNormalx;

	                norms[i3 * 3 + 1] += faceNormaly;

	                norms[i3 * 3 + 2] += faceNormalz;
	            }

	            // Last normalization of each normal.

	            for (idx = 0; idx < norms.length / 3; idx++) {

	                faceNormalx = norms[idx * 3];

	                faceNormaly = -norms[idx * 3 + 1];

	                faceNormalz = norms[idx * 3 + 2];

	                length = Math.sqrt(faceNormalx * faceNormalx + faceNormaly * faceNormaly + faceNormalz * faceNormalz);

	                length = length === 0 ? 1.0 : length;

	                faceNormalx /= length;

	                faceNormaly /= length;

	                faceNormalz /= length;

	                // NOTE: added negative (-) to x, z to match our lighting model.

	                norms[idx * 3] = -faceNormalx;

	                norms[idx * 3 + 1] = faceNormaly;

	                norms[idx * 3 + 2] = -faceNormalz;
	            }

	            // Replace current normals with computed array.

	            normals = norms;

	            return normals;
	        }

	        /** 
	         * Compute tangents.
	         * NOTE: some routines compute their own tangents.
	         * Adapted from these links:
	         * @link http://codepen.io/ktmpower/pen/ZbGRpW
	         * @link http://www.terathon.com/code/tangent.html
	         * "The code below generates a four-component tangent, in which the handedness of the local coordinate system
	         * is stored as ±1 in the w-coordinate. The bitangent vector B is then given by b = (n × tangent) · tangentw."
	         * @param {glMatrix.vec3[]} vertices the current 3d position coordinates.
	         * @param {Array[gl.UNSIGNED_INT|gl.UNSIGNED_SHORT]} current indices into the vertices.
	         * @param {glMatrix.vec3[]} normals the normals array to populate, or recalculate.
	         * @param {glmatrix.vec2[]} texCoordinates the texture coordinates for the geometry.
	         * @param {glMatrix.vec4[]} tangents the tangents array to populate or recompute.
	         * @returns {glMatrix.vec4[]} an array of tangents.
	         */

	    }, {
	        key: 'computeTangents',
	        value: function computeTangents(vertices, indices, normals, texCoords, tangents) {

	            var vec3 = this.glMatrix.vec3;

	            var tan1 = new Float32Array(normals.length);

	            var tan2 = new Float32Array(normals.length);

	            // The indices array specifies the Faces (triangles) forming the object mesh (3 indices per Face).

	            var numIndices = indices.length;

	            var numVertices = vertices.length;

	            var tans = new Float32Array(numVertices * 4 / 3);

	            // For each Face (step through indices 3 by 3)

	            for (var i = 0; i < numIndices; i += 3) {

	                var i1 = indices[i],
	                    i2 = indices[i + 1],
	                    i3 = indices[i + 2];

	                var j = i1 * 3;var v1x = vertices[j],
	                    v1y = vertices[j + 1],
	                    v1z = vertices[j + 2];

	                j = i2 * 3;var v2x = vertices[j],
	                    v2y = vertices[j + 1],
	                    v2z = vertices[j + 2];

	                j = i3 * 3;var v3x = vertices[j],
	                    v3y = vertices[j + 1],
	                    v3z = vertices[j + 2];

	                var x1 = v2x - v1x,
	                    x2 = v3x - v1x;

	                var y1 = v2y - v1y,
	                    y2 = v3y - v1y;

	                var z1 = v2z - v1z,
	                    z2 = v3z - v1z;

	                j = i1 * 2;

	                var w1x = texCoords[j],
	                    w1y = texCoords[j + 1];

	                j = i2 * 2;

	                var w2x = texCoords[j],
	                    w2y = texCoords[j + 1];

	                j = i3 * 2;

	                var w3x = texCoords[j],
	                    w3y = texCoords[j + 1];

	                var s1 = w2x - w1x,
	                    s2 = w3x - w1x;

	                var t1 = w2y - w1y,
	                    t2 = w3y - w1y;

	                var r = 1.0 / (s1 * t2 - s2 * t1);

	                var sx = (t2 * x1 - t1 * x2) * r,
	                    sy = (t2 * y1 - t1 * y2) * r,
	                    sz = (t2 * z1 - t1 * z2) * r;

	                var tx = (s1 * x2 - s2 * x1) * r,
	                    ty = (s1 * y2 - s2 * y1) * r,
	                    tz = (s1 * z2 - s2 * z1) * r;

	                j = i1 * 3;tan1[j] += sx;tan1[j + 1] += sy;tan1[j + 2] += sz;

	                tan2[j] += tx;tan2[j + 1] += ty;tan2[j + 2] += tz;

	                j = i2 * 3;tan1[j] += sx;tan1[j + 1] += sy;tan1[j + 2] += sz;

	                tan2[j] += tx;tan2[j + 1] += ty;tan2[j + 2] += tz;

	                j = i3 * 3;tan1[j] += sx;tan1[j + 1] += sy;tan1[j + 2] += sz;

	                tan2[j] += tx;tan2[j + 1] += ty;tan2[j + 2] += tz;
	            }

	            // Loop through vertices.

	            for (var _i = 0, i4 = 0; i4 < numVertices; _i += 3, i4 += 4) {

	                var n = [normals[_i], normals[_i + 1], normals[_i + 2]];

	                var _t = [tan1[_i], tan1[_i + 1], tan1[_i + 2]];

	                var _t2 = [tan2[_i], tan2[_i + 1], tan2[_i + 2]];

	                // Gram-Schmidt orthogonalize, was const tmp  = subtract(t1, scale(dot(n, t1), n));

	                var tmp = vec3.sub([0, 0, 0], _t, vec3.scale([0, 0, 0], _t, vec3.dot(n, _t)));

	                var len2 = tmp[0] * tmp[0] + tmp[1] * tmp[1] + tmp[2] * tmp[2];

	                // Normalize the vector only if non-zero length.

	                var txyz = len2 > 0 ? vec3.scale([0, 0, 0], tmp, 1.0 / Math.sqrt(len2)) : tmp;

	                // Calculate handedness, originally const tw = (dot(cross(n, t1), t2) < 0.0) ? -1.0 : 1.0;

	                var tw = vec3.dot(vec3.cross([0, 0, 0], n, _t), _t2) < 0.0 ? -1.0 : 1.0;

	                // If we already have tangents, leave those in place.

	                tans[i4] = txyz[0];

	                tans[i4 + 1] = txyz[1];

	                tans[i4 + 2] = txyz[2];

	                tans[i4 + 3] = tw;
	            }

	            tangents = tans;

	            return tangents;
	        }

	        /** 
	         * Compute texture coordinates by getting the equivalent spherical coordinate of normalized
	         * vertices in the object.
	         * @param {glMatrix.vec3[]} vertices. vertices the current 3d position coordinates.
	         * @returns {glmatrix.vec2} an array of texture coordinates.
	         */

	    }, {
	        key: 'computeTexCoords',
	        value: function computeTexCoords(vertices, texCoords) {

	            // Assume y is vertical, x and z are horizontal.

	            console.log('GeometryPool::()computeTexCoords(): vertices:' + vertices.length);

	            var tCoords = [];

	            for (var i = 0; i < vertices.length; i += 3) {

	                var t = this.computeSphericalCoords([vertices[i], vertices[i + 1], vertices[i + 2]]);

	                tCoords.push(t[0], t[1]);
	            }

	            texCoords = tCoords;

	            return texCoords;
	        }

	        /** 
	         * Create default colors for Prim color array. This can also be used 
	         * to generate a normal map or tangent map.
	         * @param {glMatrix.vec3[]} coords either vertices, normals (normalmap) tangents (tangentmap).
	         * @param {glmatrix.vec4[]} colors the colors array to populate or recompute.
	         * @returns {glMatrix.vec4[]} the completed colors array
	         */

	    }, {
	        key: 'computeColors',
	        value: function computeColors(coords, colors) {

	            var c = [];

	            // Catch the case where we want a single color (e.g. a call from a Material file).

	            if (colors.length === 4) {

	                for (var i = 0; i < coords.length; i += 3) {

	                    c.push(colors[0], colors[1], colors[2], colors[3]);
	                }
	            }

	            // Otherwise, create colors as a normals map.

	            for (var _i2 = 0; _i2 < coords.length; _i2 += 3) {

	                c.push(coords[_i2], coords[_i2 + 1], coords[_i2 + 2], 1.0);
	            }

	            return c;
	        }

	        /* 
	         * ---------------------------------------
	         * GEOMETRY TRANSFORMATIONS
	         * ---------------------------------------
	         */

	        /** 
	         * Scale vertices directly, without changing position.
	         * @param {glMatrix.vec3[]} vertices the input positions.
	         * @param {Number} scale the value to scale by (> 0).
	         */

	    }, {
	        key: 'computeScale',
	        value: function computeScale(vertices, scale) {

	            var oldPos = this.getCenter(vertices);

	            for (var i = 0; i < vertices.length; i++) {

	                vertices[i] *= scale;
	            }

	            this.moveTo(oldPos); // ERROR!!!!!!!!!!!!!!!!!!!!
	        }

	        /** 
	         * Move vertices directly in geometry, i.e. for something 
	         * NOTE: normally, you will want to use a matrix transform to position objects.
	         * @param {glMatrix.vec3[]} vertices flattened vertex array.
	         * @param {glMatrix.vec3} pos the new position measured from object centroid.
	         */

	    }, {
	        key: 'computeMove',
	        value: function computeMove(vertices, pos) {

	            var center = this.computeCentroid(vertices);

	            var delta = [center[0] - pos[0], center[1] - pos[1], center[2] - pos[2]];

	            for (var i = 0; i < vertices.length; i += 3) {

	                vertices[i] = delta[0];

	                vertices[i + 1] = delta[1];

	                vertices[i + 2] = delta[2];
	            }
	        }

	        /* 
	         * ---------------------------------------
	         * GEOMETRY CREATORS
	         * ---------------------------------------
	         */

	        /** 
	         * Given a set of 3d coordinates, compute a triangle fan around the Centroid for those coordinates.
	         * @param {glMatrix.vec3[]} vertices an array of UN-FLATTENED xyz coordinates.
	         * @param {Array[gl.UNSIGNED_INT|gl.UNSIGNED_SHORT]} current indices into the vertices.
	         * @returns {Object} UN-FLATTENED vertices, indices, texCoords nomals, tangents.
	         */

	    }, {
	        key: 'computeFan',
	        value: function computeFan(vertices, indices) {

	            var vec3 = this.glMatrix.vec3;

	            var vv = [];

	            // Get the subset of vertices we should take by following indices.

	            for (var i = 0; i < indices.length; i++) {

	                vv.push(vertices[indices[i]]);
	            }

	            // Compute the central point of the triangle fan.

	            var center = this.computeCentroid(vv);

	            // Add a central point so we can create a triangle fan.

	            vv.push(center);

	            var centerPos = vv.length - 1;

	            var vtx = [],
	                tex = [],
	                norms = [],
	                idx = [];

	            // We re-do the indices calculations, since we insert a central point.

	            var lenv = vv.length;

	            var env = lenv - 1;

	            for (var _i3 = 1; _i3 < lenv; _i3++) {

	                var p1 = _i3 - 1;

	                var p2 = _i3;

	                if (_i3 === lenv - 1) {

	                    p2 = 0;
	                }

	                var v1 = vv[p1];

	                var v2 = vv[p2];

	                idx.push(p1, p2, centerPos);

	                // NOTE: each vertex gets a face normal = center. For shapes built with triangle fans, re-compute!

	                norms.push(center[0], center[1], center[2]); // center vertex in fan

	                // Assumes a regular polygon.

	                tex.push(Math.cos(this.TWO_PI * p2 / (lenv - 1)) / 2 + .5, Math.sin(this.TWO_PI * p2 / (lenv - 1)) / 2 + .5);
	            } // end of for loop

	            // Push the center point texture coordinate.

	            tex.push(0.5, 0.5);

	            // Push the center point normal.

	            norms.push(center[0], center[1], center[2]);

	            return this.default(vv, idx, tex, norms, [], []);
	            /*
	                    return {
	            
	                        vertices: vv,
	            
	                        indices: idx,
	            
	                        texCoords: tex,
	            
	                        normals: norms,
	            
	                        tangents: [],
	            
	                        colors: []
	            
	                    }
	            */
	        }

	        /** 
	         * WebGL point cloud (particle system).
	         * Rendered as GL_POINT.
	         * @link https://github.com/potree/potree/releases
	         * @link https://www.khronos.org/registry/webgl/sdk/demos/google/particles/index.html
	         * @link https://github.com/gouzhen1/WebGL-Particle-System/
	         * @link https://github.com/gouzhen1/WebGL-Particle-System/blob/master/index.html#L3
	         * @link http://nullprogram.com/blog/2014/06/29/
	         * https://codepen.io/kenjiSpecial/pen/yyeaKm
	         * rendered as an array of coordinates.
	         * NOTE: for different sized points, use multiple Prims.
	         * NOTE: for different brightness, use custom Color array.
	         * 
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (glMatrix.vec4) [ x, y, z, radius || 0, pointSize (pixels) | 0 ]
	         *  - prim.divisions     = (glMatrix.vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         * Creating WebGL buffers is turned on or off conditionally in the method.
	         */

	    }, {
	        key: 'geometryPointCloud',
	        value: function geometryPointCloud(prim) {
	            var useTexture = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


	            var dimensions = prim.dimensions,
	                divisions = prim.divisions;

	            prim.drawTris = false; // don't draw filled triangles

	            prim.drawPoints = true; // draw points

	            // Shortcuts to Prim data arrays

	            var vertices = [],
	                indices = [],
	                normals = [],
	                texCoords = [],
	                tangents = [];

	            var mm = new _map3d2.default(this.util);

	            mm[mm.typeList.SPHERE](dimensions[0], dimensions[1], dimensions[2], divisions[0] * divisions[1] * divisions[2]); // initRandomSphere

	            vertices = mm.map;

	            var vIdx = 0,
	                idx = 0;

	            for (var i = 0; i < mm.map.length; i += 3) {

	                indices.push(idx++);
	            }

	            // If we use a texture, specify points on a single texture surface.
	            // TODO: shift by divisions width.

	            if (useTexture) {

	                var twoPI = Math.PI * 2;

	                var halfPI = Math.PI / 2;

	                for (var _i4 = 0; _i4 < mm.mapUV.length; _i4 += 2) {

	                    texCoords.push(1.0 - mm.mapUV[_i4] / twoPI);

	                    texCoords.push(mm.mapUV[_i4 + 1] / Math.PI);
	                }
	            }

	            // Initialize the Prim, adding normals, texCoords and tangents as necessary.

	            return this.default(vertices, indices, texCoords, normals, tangents);
	        }

	        /** 
	         * a PointCloud which uses texture mapping to assign color.
	         *
	         */

	    }, {
	        key: 'geometryTextureCloud',
	        value: function geometryTextureCloud(prim) {

	            return this.geometryPointCloud(prim, true); // PointCloud, but use textures
	        }

	        /** 
	         * Arrange starlike points randomly on a dome.
	         * We don't use a procedural generation for a StarDome - it uses data specified in the world.json file instead.
	         * So we should never go here.
	         */

	    }, {
	        key: 'geometryStarDome',
	        value: function geometryStarDome(prim) {

	            console.error('GeometryPool::geometryStarDome(): not procedural, use stellar data, generating randomMap');

	            return this.geometryPointCloud(prim);
	        }

	        /** 
	         * Arrange starlike points in 3d space randomly.
	         * We don't use a procedural generation for a StarDome - it uses data specified in the world.json file instead.
	         * So we should never go here.
	         */

	    }, {
	        key: 'geometryStarSpace',
	        value: function geometryStarSpace(prim) {

	            console.error('GeometryPool::geometryStarSpace(): not procedural, use stellar data, generating randomMap');

	            return this.geometryPointCloud(prim);
	        }

	        /** 
	         * type LINE
	         * rendered as GL_LINE.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (glMatrix.vec4) [ x, y, z, thickness | 0 ]
	         *  - prim.divisions     = (glMatrix.vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryLine',
	        value: function geometryLine(prim) {

	            var vec3 = this.glMatrix.vec3,
	                geo = prim.geometry;

	            var w = prim.dimensions[0],
	                h = prim.dimensions[1],
	                d = prim.dimensions[2],
	                radius = parseFloat(prim.dimensions[3]) || 1,
	                pointSize = parseFloat(prim.dimensions[4]) || 1,
	                numPoints = prim.divisions[0] || 1;

	            // Shortcuts to Prim data arrays

	            var vertices = [],
	                indices = [],
	                texCoords = [],
	                normals = [],
	                tangents = [];

	            // Expect points in Map3d object, or generate random.

	            // The Line is created centered on 0,0,0.

	            vertices.push(w - radius, h - radius, d - radius, w + radius, h + radius, d + radius);

	            indices.push(0, 3);

	            // Initialize the Prim, adding normals, texCoords and tangents as necessary.

	            return this.default(vertices, indices, texCoords, normals, tangents);

	            ////////////return { vertices: vertices, indices: indices, normals: normals, texCoords: texCoords, tangents: tangents };
	        }

	        /** 
	         * Objects created with uv methods (i.e. they have polar points).
	         * rendered as GL_TRIANGLES.
	         * startSlice cuts off the cylinder, and wraps the texture across the top. 
	         * endSlize truncates the bottom of the cylinder, and wraps the texture across the bottom.
	         * for an open cylinder with no caps, set startSlice and endSlize to zero.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, startSlice | 0, endSlice | 0 ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometrySphere',
	        value: function geometrySphere(prim) {

	            var list = this.typeList;

	            var vec3 = this.glMatrix.vec3,
	                geo = prim.geometry;

	            if (prim.applyTexToFace === true) {

	                console.warn('GeometryPool::geometrySphere(): cannot apply textures to individual faces of Sphere-derived shapes due to shared indices');
	            }

	            // Shortcuts to Prim data arrays.

	            var vertices = [],
	                indices = [],
	                normals = [],
	                texCoords = [],
	                tangents = [];

	            var longitudeBands = prim.divisions[0]; // x axis (really xz)

	            var latitudeBands = prim.divisions[1]; // y axis

	            // Radius is measured along the x axis.

	            var l = prim.dimensions[0],
	                w = prim.dimensions[1],
	                h = prim.dimensions[2],
	                startSlice = parseFloat(prim.dimensions[3]) || 0,
	                endSlice = parseFloat(prim.dimensions[4]) || 1.0;

	            if (startSlice > prim.dimensions[1]) {

	                console.error('GeometryPool::geometrySphere(): error - flattening is greater than sphere radius for:' + prim.name);
	            }

	            // Everything except SPHERE, CYLINDER, SPINDLE, TEARDROP, and CONE is a half-object.

	            var latStart = 0,
	                longStart = 0,
	                latDist = void 0;

	            if (prim.type === list.SPHERE || prim.type === list.CYLINDER || prim.type === list.SPINDLE || prim.type === list.CONE || prim.type === list.TEARDROP) {

	                latDist = latitudeBands;
	            } else if (prim.type === list.CAP) {

	                latDist = 1; // one flat object, central points + one ring.
	            } else {

	                latDist = latitudeBands / 2; // half-domes and half-cones
	            }

	            var latNum = void 0,
	                longNum = void 0;

	            // Start our uv build loop.

	            for (latNum = latStart; latNum <= latDist; latNum++) {

	                var theta = latNum * Math.PI / latitudeBands;

	                var sinTheta = Math.sin(theta);

	                var cosTheta = Math.cos(theta);

	                for (longNum = longStart; longNum <= longitudeBands; longNum++) {

	                    var phi = longNum * this.TWO_PI / longitudeBands;

	                    var sinPhi = Math.sin(phi);

	                    var cosPhi = Math.cos(phi);

	                    var x = void 0,
	                        y = void 0,
	                        z = void 0,
	                        _u = void 0,
	                        _v = void 0,
	                        r = void 0,
	                        flatten = void 0;

	                    // Compute vertices.

	                    var lat = latNum / latDist;

	                    r = lat / 2; // use for no-spherical shapes

	                    var long = longNum / longitudeBands;

	                    _u = 1 - long;

	                    _v = 1 - lat;

	                    x = cosPhi * sinTheta / 2;

	                    z = sinPhi * sinTheta / 2;

	                    // Flatten spherical objects at their poles (both).

	                    flatten = (1 - lat) * startSlice;

	                    switch (prim.type) {

	                        case list.CAP:

	                            y = 0;

	                            break;

	                        case list.CYLINDER:
	                        case list.PRISM:

	                            if (startSlice > 0 && lat <= startSlice) {

	                                y = 1 - startSlice;
	                            } else if (endSlice !== 1.0 && lat >= endSlice) {

	                                y = 1 - endSlice;
	                            } else {

	                                y = 1 - lat;

	                                x = cosPhi / 2;

	                                z = sinPhi / 2;
	                            }

	                            y -= 0.5;

	                            break;

	                        case list.SPHERE:

	                            y = cosTheta / 2;

	                            // flatten if startslice is present (flattening)

	                            if (startSlice > 0) y -= flatten;

	                            break;

	                        case list.TOPDOME:
	                        case list.DOME:

	                            y = cosTheta / 2;

	                            if (startSlice > 0) y -= flatten;

	                            break;

	                        case list.SKYDOME:

	                            y = cosTheta / 2;

	                            if (startSlice > 0) y -= flatten;

	                            _u = long;

	                            break;

	                        case list.BOTTOMDOME:

	                            y = (1 - cosTheta) / 2 - 0.5;

	                            if (startSlice > 0) y -= flatten;

	                            _u = long;

	                            _v = lat;

	                            break;

	                        case list.SPINDLE:

	                            if (lat <= 0.4) {

	                                x = cosPhi * lat;

	                                z = sinPhi * lat;
	                            } else {

	                                x = cosPhi * (1 - lat + 1 / latDist);

	                                z = sinPhi * (1 - lat + 1 / latDist);
	                            }

	                            y = 1 - lat - 0.5;

	                            break;

	                        case list.TEARDROP:

	                            if (lat < 0.5) {

	                                y = cosTheta / 4;
	                            } else {

	                                x = 2 * cosPhi * (0.5 - r);

	                                z = 2 * sinPhi * (0.5 - r);

	                                y = cosTheta / 2;
	                            }

	                            break;

	                        case list.CONE:

	                            if (lat <= startSlice) {

	                                y = 1 - startSlice;

	                                x = cosPhi * r;

	                                z = sinPhi * r;
	                            } else if (lat > endSlice) {
	                                // NOTE: not >= endSlice

	                                y = 1 - endSlice;

	                                x = cosPhi * sinTheta / 2;

	                                z = sinPhi * sinTheta / 2;
	                            } else {

	                                y = 1 - lat;

	                                x = cosPhi * r;

	                                z = sinPhi * r;
	                            }

	                            y -= 0.5;

	                            break;

	                        case list.TOPCONE:

	                            x = cosPhi * r;

	                            z = sinPhi * r;

	                            y = 0.5 - r;

	                            break;

	                        case list.BOTTOMCONE:

	                            x = cosPhi * (0.5 - r);

	                            z = sinPhi * (0.5 - r);

	                            y = 0.0 - r;

	                            break;

	                    }

	                    // Texture coords.

	                    texCoords.push(_u, _v);

	                    // Push normals.

	                    var n = vec3.normalize([0, 0, 0], [x, y, z]);

	                    // Push vertices.

	                    vertices.push(x * l, y * w, z * h);

	                    /* 
	                     * These were wrapped bottom->top, so reverse y on normals.
	                     * Also reverse the normals so the works looking inside a skydome, bottomcone, bottomcone.
	                     */

	                    if (prim.type === list.BOTTOMDOME || prim.type === list.BOTTOMCONE || prim.type === list.SKYDOME) {

	                        y = -y; // the y value (have to flip indices backwards for SKYDOME for it to work).

	                        normals.push(-n[0], -n[1], -n[2]);
	                    } else {

	                        if (prim.type === list.CAP) {

	                            n[0] = n[2] = 0;

	                            n[1] = 1;
	                        }

	                        normals.push(n[0], n[1], n[2]);
	                    }

	                    // Sphere indices.

	                    if (latNum !== latDist && longNum !== longitudeBands) {

	                        var first = latNum * (longitudeBands + 1) + longNum;

	                        var second = first + longitudeBands + 1;

	                        // Texture only visible outside.

	                        indices.push(first + 1, second + 1, second);

	                        indices.push(first, first + 1, second);
	                    }
	                }
	            }

	            // Wind the SKYDOME indices backwards so texture displays inside.

	            if (prim.type === list.SKYDOME) {

	                geo.indices.data = indices.reverse();
	            }

	            // Initialize the Prim, adding normals, texCoords and tangents as necessary.

	            return this.default(vertices, indices, texCoords, normals, tangents);

	            ///////return { vertices: vertices, indices: indices, normals: normals, texCoords: texCoords, tangents: tangents };
	        }

	        /** 
	         * Type CAP.
	         * rendered as GL_TRIANGLES.
	         * Just a flattened half-sphere creating a circular 'lid'.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, startRadius | 0 ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryCap',
	        value: function geometryCap(prim) {

	            return this.geometrySphere(prim);
	        }

	        /** 
	         * Type DOME.
	         * rendered as GL_TRIANGLES.
	         * Half-sphere, visible from outside.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, startRadius | 0 ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryDome',
	        value: function geometryDome(prim) {

	            return this.geometrySphere(prim);
	        }

	        /** 
	         * type TOPDOME.
	         * rendered as WebGL TRIANGLES.
	         * Half-sphere (equivalent to type DOME).
	         * prim.dimensions    = (vec4) [ x, y, z, startRadius | 0 ]
	         * prim.divisions     = (vec3) [ x, y, z ]
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryTopDome',
	        value: function geometryTopDome(prim) {

	            return this.geometrySphere(prim);
	        }

	        /** 
	         * type SKYDOME
	         * rendered as GL_TRIANGLES.
	         * Half-sphere, order of drawing is reversed, so texture displays inside by default.
	          * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, startRadius | 0 ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometrySkyDome',
	        value: function geometrySkyDome(prim) {

	            prim.visibleFrom = this.INSIDE;

	            return this.geometrySphere(prim);
	        }

	        /** 
	         * Type BOTTOMDOME
	         * rendered as GL_TRIANGLES.
	         * bowl shaped, formed from lower half of sphere.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryBottomDome',
	        value: function geometryBottomDome(prim) {

	            return this.geometrySphere(prim);
	        }

	        /** 
	         * Type CYLINDER.
	         * rendered as GL_TRIANGLES.
	         * Cylinder, either open or closed, visible from outside.
	         * startSlice cuts off the cylinder, and wraps the texture across the top. 
	         * endSlize truncates the bottom of the cylinder, and wraps the texture across the bottom.
	         * for an open cylinder with no caps, set startSlice and endSlize to zero.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, startSlice | 0, endSlice | 0 ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryCylinder',
	        value: function geometryCylinder(prim) {

	            return this.geometrySphere(prim);
	        }

	        /** 
	         * Type CONE.
	         * rendered as GL_TRIANGLES (equivalent to TOPCONE).
	         * Cone can have segments sliced off its beginning or end.
	         * startSlice cuts off the cone, and wraps the texture across the top. 
	         * endSlize truncates the bottom of the cone, and wraps the texture across the bottom.
	         * for a cone with no caps, set startSlice and endSlize to zero.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, startSlice | 0, endSlice | 0 ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryCone',
	        value: function geometryCone(prim) {

	            return this.geometrySphere(prim);
	        }

	        /** 
	         * Type TOPCONE.
	         * rendered as GL_TRIANGLES.(equivalent to CONE).
	         * startSlice cuts off the cone, and wraps the texture across the top. 
	         * endSlize truncates the bottom of the cone, and wraps the texture across the bottom.
	         * for a cone with no caps, set startSlice and endSlize to zero.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, startSlice | 0, endSlice | 0 ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryTopCone',
	        value: function geometryTopCone(prim) {

	            return this.geometrySphere(prim);
	        }

	        /** 
	         * Type BOTTOMCONE.
	         * rendered as GL_TRIANGLES.
	         * Cone structure, pointing downwards.
	         * startSlice cuts off the cone, and wraps the texture across the top. 
	         * endSlize truncates the bottom of the cone, and wraps the texture across the bottom.
	         * for a cone with no caps, set startSlice and endSlize to zero.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, startSlice | 0, endSlice | 0 ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryBottomCone',
	        value: function geometryBottomCone(prim) {

	            return this.geometrySphere(prim);
	        }

	        /**
	         * Type SPINDLE.
	         * rendered as GL_TRIANGLES.
	         * Spindle (two cones stuck together).
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometrySpindle',
	        value: function geometrySpindle(prim) {

	            return this.geometrySphere(prim);
	        }

	        /** 
	         * Type TEARDROP.
	         * Rendered as GL_TRIANGLES.
	         * Teardrop (cone and dome stuck together).
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryTeardrop',
	        value: function geometryTeardrop(prim) {

	            return this.geometrySphere(prim);
	        }

	        /** 
	         * type CAPSULE
	         * rendered as WebGL TRIANGLES.
	         * a cylinder with two spheres on each end, similar to capped cylinder, 
	         * equivalent to a closed cube.
	         * @link https://github.com/vorg/primitive-capsule
	         * position x axis is the radius, y axis is the height z not used
	         * dimensions x is number of steps along the y axis, dimensions y is the number of radial 
	         * divisions around the capsule.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryCapsule',
	        value: function geometryCapsule(prim) {

	            var TWO_PI = this.TWO_PI;

	            var list = this.typeList;

	            var vec3 = this.glMatrix.vec3;

	            var util = this.util;

	            var geo = prim.geometry;

	            // Shortcuts to Prim data arrays.

	            var vertices = [],
	                indices = [],
	                normals = [],
	                texCoords = [],
	                tangents = [];

	            if (prim.divisions[0] < 4 || prim.divisions[1] < 4 || prim.divisions[2] < 4) {

	                console.error('GeometryPool::geometryCapsule(): invalid number of divisions for ' + prim.name + ' (must be 4+ in each dimension');
	            }

	            // Radius is measured along the x axis, height along y axis.

	            var radius = prim.dimensions[0] || 0.5,
	                height = prim.dimensions[1] || 1.0,
	                segmentHeight = prim.divisions[0] || 12,
	                // divisions along x

	            numSegments = prim.divisions[1] || 12; // divisions along y

	            // Compute a capsule ring.

	            function calculateRing(segments, r, y, dy) {

	                var segIncr = 1.0 / (segments - 1);

	                for (var s = 0; s < segments; s++) {

	                    var x = Math.cos(TWO_PI * s * segIncr) * r;

	                    var z = Math.sin(TWO_PI * s * segIncr) * r;

	                    vertices.push(radius * x, radius * y + height * dy, radius * z);

	                    normals.push(x, y, z);

	                    var _u2 = 1 - s * segIncr;

	                    var _v2 = 0.5 + (radius * y + height * dy) / (2.0 * radius + height);

	                    texCoords.push(_u2, _v2);
	                }
	            }

	            var ringsBody = segmentHeight + 1;

	            var ringsTotal = segmentHeight + ringsBody;

	            var bodyIncr = 1.0 / (ringsBody - 1);

	            var ringIncr = 1.0 / (segmentHeight - 1);

	            // Top.

	            for (var r = 0; r < segmentHeight / 2; r++) {

	                calculateRing(numSegments, Math.sin(Math.PI * r * ringIncr), Math.sin(Math.PI * (r * ringIncr - 0.5)), -0.5);
	            }

	            // Middle.

	            for (var _r = 0; _r < ringsBody; _r++) {

	                calculateRing(numSegments, 1.0, 0.0, _r * bodyIncr - 0.5);
	            }

	            // Bottom.

	            for (var _r2 = segmentHeight / 2; _r2 < segmentHeight; _r2++) {

	                calculateRing(numSegments, Math.sin(Math.PI * _r2 * ringIncr), Math.sin(Math.PI * (_r2 * ringIncr - 0.5)), +0.5);
	            }

	            // Compute indices.

	            for (var _r3 = 0; _r3 < ringsTotal - 1; _r3++) {

	                for (var s = 0; s < numSegments - 1; s++) {

	                    indices.push(_r3 * numSegments + (s + 1), _r3 * numSegments + (s + 0), (_r3 + 1) * numSegments + (s + 1));

	                    indices.push((_r3 + 1) * numSegments + (s + 0), (_r3 + 1) * numSegments + (s + 1), _r3 * numSegments + s);
	                }
	            }

	            // Initialize the Prim, adding normals, texCoords and tangents as necessary.

	            return this.default(vertices, indices, texCoords, normals, tangents);

	            ///////return { vertices: vertices, indices: indices, normals: normals, texCoords: texCoords, tangents: tangents };
	        }

	        /** 
	         * Create a PLANE, CUBE, or spherical object from cube mesh.
	         * --------------------------------------------------------------------
	         * type CUBE.
	         * rendered as WebGL TRIANGLES.
	         * Derived partly from pex.
	         * @link http://vorg.github.io/pex/docs/
	         * adjust curveRadius to round the edges of the Cube.
	         * used by several other Prim routines (CUBESPHERE, PLANE, OUTERPLANE, 
	         * INNERPLANE, CURVEDPLANE, CURVEDOUTERPLANE, CURVEDINNERPLANE)
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, Prim.side, curveRadius ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryCube',
	        value: function geometryCube(prim) {

	            var vec3 = this.glMatrix.vec3;

	            var flatten = this.util.flatten;

	            var list = this.typeList;

	            var side = this.directions;

	            var geo = prim.geometry;

	            if (prim.applyTexToFace === false) {

	                console.warn('GeometryPool::geometryCube(): textures can only apply to individual faces of Cube-derived shapes');
	            }

	            // Shortcuts to Prim data arrays

	            var vertices = [],
	                indices = [],
	                normals = [],
	                texCoords = [],
	                tangents = [];

	            var sx = prim.dimensions[0],
	                // x width

	            sy = prim.dimensions[1],
	                // y height

	            sz = prim.dimensions[2],
	                // z depth

	            nx = prim.divisions[0],
	                // should be x , j

	            ny = prim.divisions[1],
	                // should be y, i 

	            nz = prim.divisions[2]; // should be z

	            // numVertices = ( nx + 1 ) * ( ny + 1 ) * 2 + ( nx + 1 ) * ( nz + 1 ) * 2 + ( nz + 1 ) * ( ny + 1 ) * 2;

	            var positions = [];

	            var sides = [];

	            var vertexIndex = 0;

	            switch (prim.type) {

	                case list.CUBE:

	                case list.CUBESPHERE:

	                    // These aren't converted to floats by default, since some CUBE routines use non-numnbers 

	                    prim.divisions[3] = parseFloat(prim.divisions[3]), prim.divisions[4] = parseFloat(prim.divisions[4]), computeSquare(0, 1, 2, sx, sy, nx, ny, sz / 2, 1, -1, side.FRONT, side), //front

	                    computeSquare(0, 1, 2, sx, sy, nx, ny, -sz / 2, -1, -1, side.BACK, side), //back

	                    computeSquare(2, 1, 0, sz, sy, nz, ny, -sx / 2, 1, -1, side.LEFT, side), //left

	                    computeSquare(2, 1, 0, sz, sy, nz, ny, sx / 2, -1, -1, side.RIGHT, side), //right

	                    computeSquare(0, 2, 1, sx, sz, nx, nz, sy / 2, 1, 1, side.TOP, side), //top

	                    computeSquare(0, 2, 1, sx, sz, nx, nz, -sy / 2, 1, -1, side.BOTTOM, side); //bottom

	                    break;

	                case list.PLANE:
	                case list.CURVEDOUTERPLANE:
	                case list.CURVEDINNERPLANE:
	                case list.TERRAIN:

	                    // NOTE: dimensions[ 3 ] is a STRING here!

	                    switch (prim.dimensions[3]) {// which side, based on cube sides

	                        case side.FRONT:

	                            computeSquare(0, 1, 2, sx, sy, nx, ny, sz / 2, 1, -1, side.FRONT);

	                            break;

	                        case side.BACK:

	                            computeSquare(0, 1, 2, sx, sy, nx, ny, -sz / 2, -1, -1, side.BACK);

	                            break;

	                        case side.LEFT:

	                            computeSquare(2, 1, 0, sx, sy, nz, ny, -sx / 2, 1, -1, side.LEFT);

	                            break;

	                        case side.RIGHT:

	                            computeSquare(2, 1, 0, sx, sy, nz, ny, sx / 2, -1, -1, side.RIGHT);

	                            break;

	                        case side.TOP:

	                            computeSquare(0, 2, 1, sx, sy, nx, nz, sy / 2, 1, 1, side.TOP); // ROTATE xy axis

	                            break;

	                        case side.BOTTOM:

	                            computeSquare(0, 2, 1, sx, -sy, nx, nz, -sy / 2, 1, -1, side.BOTTOM); // ROTATE xy axis

	                            break;

	                        default:

	                            break;

	                    }

	                    break;

	                default:

	                    break;

	            }

	            // Make an individual Plane.

	            function computeSquare(u, v, w, su, sv, nu, nv, pw, flipu, flipv, currSide) {

	                // Create a square, positioning in correct position.

	                var vertShift = vertexIndex;

	                for (var j = 0; j <= nv; j++) {

	                    for (var i = 0; i <= nu; i++) {

	                        var vert = positions[vertexIndex] = [0, 0, 0];

	                        vert[u] = (-su / 2 + i * su / nu) * flipu;

	                        vert[v] = (-sv / 2 + j * sv / nv) * flipv;

	                        vert[w] = pw;

	                        // heightMap is always the middle, up-facing vector.

	                        if (prim.heightMap) {

	                            // our 'y' for the TOP x/z MAY NEED TO CHANGE FOR EACH SIDE

	                            vert[w] = prim.heightMap.getPixel(i, j);
	                        }

	                        // Texture coords.

	                        texCoords.push(i / nu, 1.0 - j / nv);

	                        // Advance Vertex pointer.

	                        ++vertexIndex;
	                    }
	                }

	                // Compute indices and sides.

	                var side = [];

	                for (var _j = 0; _j < nv; _j++) {

	                    for (var _i5 = 0; _i5 < nu; _i5++) {

	                        var n = vertShift + _j * (nu + 1) + _i5;

	                        // Indices for entire prim.

	                        indices.push(n, n + nu + 1, n + nu + 2);

	                        indices.push(n, n + nu + 2, n + 1);

	                        // Individual sides.

	                        side.push(n, n + nu + 1, n + nu + 2);

	                        side.push(n, n + nu + 2, n + 1);
	                    }
	                }

	                // Save the indices for this side.

	                sides[currSide] = side;
	            } // end of computeSquare.

	            // Round the edges of the CUBE or SPHERECUBE to a sphere.

	            if ((prim.type === list.CUBE || prim.type === list.CUBESPHERE) && prim.divisions[3] !== 0) {

	                var tmp = [0, 0, 0];

	                // Radius controlled by 4th parameter in divisions

	                var radius = prim.divisions[3];

	                var rx = sx / 2.0;

	                var ry = sy / 2.0;

	                var rz = sz / 2.0;

	                for (var i = 0; i < positions.length; i++) {

	                    var pos = positions[i];

	                    var inner = [pos[0], pos[1], pos[2]];

	                    if (pos[0] < -rx + radius) {

	                        inner[0] = -rx + radius;
	                    } else if (pos[0] > rx - radius) {

	                        inner[0] = rx - radius;
	                    }

	                    if (pos[1] < -ry + radius) {

	                        inner[1] = -ry + radius;
	                    } else if (pos[1] > ry - radius) {

	                        inner[1] = ry - radius;
	                    }

	                    if (pos[2] < -rz + radius) {

	                        inner[2] = -rz + radius;
	                    } else if (pos[2] > rz - radius) {

	                        inner[2] = rz - radius;
	                    }

	                    // Re-compute position on sphere via taking the normal of the position..

	                    var normal = [pos[0], pos[1], pos[2]];

	                    vec3.sub(normal, normal, inner);

	                    vec3.normalize(normal, normal);

	                    normals[i] = normal;

	                    pos = [inner[0], inner[1], inner[2]];

	                    tmp = [normal[0], normal[1], normal[2]];

	                    vec3.scale(tmp, tmp, radius);

	                    vec3.add(pos, pos, tmp);

	                    positions[i] = pos;
	                }
	            } else if ((prim.type === list.CURVEDOUTERPLANE || prim.type === list.CURVEDINNERPLANE) && prim.dimensions[4] && prim.dimensions[4] !== 0) {

	                var dSide = 1;

	                switch (prim.dimensions[3]) {

	                    case side.FRONT:

	                        if (prim.type === list.CURVEDINNERPLANE || prim.type == list.INNERPLANE) dSide = -1;

	                        break;

	                    case side.BACK:

	                        if (prim.type === list.CURVEDOUTERPLANE || prim.type === list.OUTERPLANE) dSide = -1;

	                        break;

	                    case side.LEFT:

	                        if (prim.type === list.CURVEDOUTERPLANE || prim.type === list.OUTERPLANE) dSide = -1;

	                        break;

	                    case side.RIGHT:

	                        if (prim.type === list.CURVEDINNERPLANE || prim.type === list.INNERPLANE) dSide = -1;

	                        break;

	                    case side.TOP:

	                        if (prim.type === list.CURVEDOUTERPLANE || prim.type === list.OUTERPLANE) dSide = -1;

	                        break;

	                    case side.BOTTOM:

	                        if (prim.type === list.CURVEDINNERPLANE || prim.type === list.INNERPLANE) dSide = -1;

	                        break;
	                }

	                for (var _i6 = 0; _i6 < positions.length; _i6++) {

	                    switch (prim.dimensions[3]) {

	                        case side.FRONT:

	                            positions[_i6][2] = dSide * Math.cos(positions[_i6][0]) * prim.dimensions[4];

	                            break;

	                        case side.BACK:

	                            positions[_i6][2] = dSide * Math.cos(positions[_i6][0]) * prim.dimensions[4];

	                            break;

	                        case side.LEFT:

	                            positions[_i6][0] = dSide * Math.cos(positions[_i6][2]) * prim.dimensions[4];

	                            break;

	                        case side.RIGHT:

	                            positions[_i6][0] = dSide * Math.cos(positions[_i6][2]) * prim.dimensions[4];

	                            break;

	                        case side.TOP:

	                            positions[_i6][1] = dSide * Math.cos(positions[_i6][0]) * prim.dimensions[4];

	                            break;

	                        case side.BOTTOM:

	                            positions[_i6][1] = -Math.cos(positions[_i6][0]) * prim.dimensions[4]; // SEEN FROM INSIDE< CORRECT

	                            break;

	                    }
	                }
	            }

	            // Flatten vertices, which were created using 2D array.

	            vertices = flatten(positions, false);

	            // Normals are only computed for cubesphere.

	            if (normals.length) {

	                normals = flatten(normals, false);
	            }

	            // Initialize the Prim, adding normals, texCoords and tangents as necessary.

	            return this.default(vertices, indices, texCoords, normals, tangents);

	            /////////return { vertices: vertices, indices: indices, normals: normals, texCoords: texCoords, tangents: tangents };
	        }

	        /** 
	         * type PLANE, OUTERPLANE
	         * rendered as WebGL TRIANGLES.
	         * visible from the 'outside' as defined by the outward vector from Prim.side.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, Prim.side ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryOuterPlane',
	        value: function geometryOuterPlane(prim) {

	            return this.geometryCube(prim);
	        }

	        /** 
	         * type INNERPLANE
	         * rendered as WebGL TRIANGLES.
	         * visible from the 'inside', as defined by the outward vectore from Prim.side.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, Prim.side ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryInnerPlane',
	        value: function geometryInnerPlane(prim) {

	            return this.geometryCube(prim);
	        }

	        /** 
	         * type CURVEDPLANE, CUREVEDOUTERPLANE
	         * rendered as WebGL TRIANGLES.
	         * visible from the 'outside' as defined by the outward vector from Prim.side.
	         * curve radius sets the amount of curve by assigning a radius for a circle.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, Prim.side, curveRadius | 0 ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryCurvedOuterPlane',
	        value: function geometryCurvedOuterPlane(prim) {

	            return this.geometryCube(prim);
	        }

	        /** 
	        * type CURVEDINNERPLANE
	        * rendered as GL_TRIANGLES.
	        * visible from the 'inside', as defined by the outward vectore from Prim.side.
	        * curve radius sets the amount of curve by assigning a radius for a circle.
	        * @param {Prim} the Prim needing geometry. 
	        *  - prim.dimensions    = (vec4) [ x, y, z, Prim.side, curveRadius | 0 ]
	        *  - prim.divisions     = (vec3) [ x, y, z ]
	        * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	        */

	    }, {
	        key: 'geometryCurvedInnerPlane',
	        value: function geometryCurvedInnerPlane(prim) {

	            return this.geometryCube(prim);
	        }
	    }, {
	        key: 'geometryTerrain',


	        /** 
	         * type TERRAIN.
	         * rendered as GL_TRIANGLES.
	         * Generate random terrain from a PLANE object. The 
	         * heightMap values are interpolated for each vertex in the PLANE.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, Prim.side ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. .
	         */
	        value: function geometryTerrain(prim) {

	            if (!prim.map) {

	                console.log('Prim::geometryTerrain(): adding heightmap for:' + prim.name);

	                prim.heightMap = new _map2d2.default(this.util);

	                // roughness 0.2 of 0-1, flatten = 1 of 0-1;

	                prim.heightMap[prim.heightMap.typeList.DIAMOND](prim.divisions[0], prim.divisions[2], 0.6, 1);

	                // TODO: SCALE DOWN FOR WATERLINE.

	                //prim.heightMap.scale( 165, 165 );

	                //prim.heightMap.scale( 25, 25 );
	            }

	            // NOTE: this can make the heightmap in any orientation.

	            return this.geometryOuterPlane(prim);
	        }
	    }, {
	        key: 'geometryHexTerrain',


	        /** 
	         * Create terrain with hexagon grid with each grid element independently addressible.
	         * @link http://catlikecoding.com/unity/tutorials/hex-map-1/
	         */
	        value: function geometryHexTerrain(prim) {}

	        /** 
	         * Create terrain with octagon grid, with each grid element independently addressible.
	         */

	    }, {
	        key: 'geometryOctTerrain',
	        value: function geometryOctTerrain(prim) {}

	        /** 
	         * type CUBESPHERE.
	         * rendered as WebGL TRIANGLES.
	         * http://catlikecoding.com/unity/tutorials/rounded-cube/
	         * http://mathproofs.blogspot.com.au/2005/07/mapping-cube-to-sphere.html
	         * just sets the curveRadius to 1/2 of the prim size.
	         * @param {Prim} the Prim needing geometry. 
	         *  - prim.dimensions    = (vec4) [ x, y, z, Prim.side, curveRadius ]
	         *  - prim.divisions     = (vec3) [ x, y, z ]
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryCubeSphere',
	        value: function geometryCubeSphere(prim) {

	            // force the rounding radii to a circle

	            prim.divisions[3] = prim.dimensions[0] / 2;

	            // NOTE: if there is a heightmap, return, then 'pincusion' out the points.

	            return this.geometryCube(prim);
	        }

	        /** 
	         * Icosphere, adapted from Unity 3d tutorial.
	         * @link https://www.binpress.com/tutorial/creating-an-octahedron-sphere/162
	         * Additional tutorials:
	         * @link https://bitbucket.org/transporter/ogre-procedural/src/ca6eb3363a53c2b53c055db5ce68c1d35daab0d5/library/src/ProceduralIcoSphereGenerator.cpp?at=default&fileviewer=file-view-default
	         * @link http://donhavey.com/blog/tutorials/tutorial-3-the-icosahedron-sphere/
	         * http://blog.andreaskahler.com/2009/06/creating-icosphere-mesh-in-code.html
	         * https://github.com/glo-js/primitive-icosphere
	         * https://github.com/hughsk/icosphere
	         * http://mft-dev.dk/uv-mapping-sphere/
	         * Octahedron sphere generation:
	         * @link https://www.binpress.com/tutorial/creating-an-octahedron-sphere/162
	         * @link  https://experilous.com/1/blog/post/procedural-planet-generation
	         * @link https://experilous.com/1/planet-generator/2014-09-28/planet-generator.js
	         * @link https://fossies.org/dox/eigen-3.2.10/icosphere_8cpp_source.html
	         * divisions max: ~60
	         * @param {Object} prim the primitive needing geometry.
	         * @param {Boolean} domeFlag if 0, do nothing, if 1, do top, if 2, do bottom.
	         */

	    }, {
	        key: 'geometryIcoSphere',
	        value: function geometryIcoSphere(prim, domeFlag, visibleFrom) {

	            var TWO_PI = this.TWO_PI; // connect scope to internal functions.

	            var vec3 = this.glMatrix.vec3;

	            var flatten = this.util.flatten;

	            var list = this.typeList;

	            var side = this.directions;

	            if (prim.applyTexToFace === true) {

	                console.warn('GeometryPool::geometryIcoSphere(): cannot apply textures to individual faces of IcoSphere-derived shapes due to shared indices');
	            }

	            // Size and divisions. After making the object, subdivide further to match divisions.

	            var subdivisions = void 0;

	            subdivisions = prim.divisions[0];

	            if (prim.type === list.REGULARTETRAHEDRON) {

	                subdivisions = 1;
	            } else if (prim.type === list.ICOSOHEDRON) {

	                subdivisions = 2;
	            } else {

	                subdivisions = prim.divisions[0];
	            }

	            var radius = prim.dimensions[0] * 0.5;

	            var resolution = subdivisions;

	            // Default vectors.

	            var getStdVecs = this.getStdVecs.bind(this);

	            var directions = [side.LEFT, side.BACK, side.RIGHT, side.FORWARD];

	            /* 
	             * The original algorithm tried to pre-define the size of the index array, since out-of-range 
	             * indices may be accessed. However, for some sizes this leads to a blob of undefineds, which 
	             * would cause problems elsewhere. So, we use the dynamic feature of JS arrays - slower, but 
	             * more compatible. The browser needs to support adding a new cell with aVar[num++] constructs
	             */

	            var geo = prim.geometry;

	            var vertices = new Array((resolution + 1) * (resolution + 1) * 4 - (resolution * 2 - 1) * 3),
	                indices = new Array(vertices.length),
	                // will get bigger!

	            texCoords = new Array(vertices.length),
	                normals = new Array(vertices.length),
	                tangents = new Array(vertices.length);

	            // Initialize lots of default variables.

	            var v = 0,
	                vBottom = 0,
	                t = 0,
	                i = void 0,
	                d = void 0,
	                progress = void 0,
	                from = void 0,
	                to = void 0;

	            for (i = 0; i < 4; i++) {

	                vertices[v++] = getStdVecs(side.DOWN);
	            }

	            for (i = 1; i <= resolution; i++) {

	                progress = i / resolution;

	                to = vec3.lerp([0, 0, 0], getStdVecs(side.DOWN), getStdVecs(side.FORWARD), progress);

	                vertices[v++] = vec3.copy([0, 0, 0], to);

	                for (d = 0; d < 4; d++) {

	                    from = vec3.copy([0, 0, 0], to);

	                    to = vec3.lerp([0, 0, 0], getStdVecs(side.DOWN), getStdVecs(directions[d]), progress);

	                    // Conditionally draw the bottom of the icosphere.

	                    if (domeFlag !== this.directions.TOP) {

	                        t = createLowerStrip(i, v, vBottom, t, indices);
	                    }

	                    v = createVertexLine(from, to, i, v, vertices);

	                    vBottom += i > 1 ? i - 1 : 1;
	                }

	                vBottom = v - 1 - i * 4;
	            }

	            for (i = resolution - 1; i >= 1; i--) {

	                progress = i / resolution;

	                to = vec3.lerp([0, 0, 0], getStdVecs(side.UP), getStdVecs(side.FORWARD), progress);

	                vertices[v++] = vec3.copy([0, 0, 0], to);

	                for (d = 0; d < 4; d++) {

	                    from = vec3.copy([0, 0, 0], to);

	                    to = vec3.lerp([0, 0, 0], getStdVecs(side.UP), getStdVecs(directions[d]), progress);

	                    // Conditionally draw the top of the icosphere.

	                    if (domeFlag !== this.directions.BOTTOM) {

	                        // Reverse the winding order for a SkyDome (viewed from inside).

	                        if (visibleFrom === this.INSIDE) {

	                            t = createUpperSkyStrip(i, v, vBottom, t, indices);
	                        } else {

	                            t = createUpperStrip(i, v, vBottom, t, indices);
	                        }
	                    }

	                    v = createVertexLine(from, to, i, v, vertices);

	                    vBottom += i + 1;
	                }

	                vBottom = v - 1 - i * 4;
	            }

	            for (i = 0; i < 4; i++) {

	                indices[t++] = vBottom;

	                indices[t++] = v;

	                indices[t++] = ++vBottom;

	                vertices[v++] = getStdVecs(side.UP);
	            }

	            // Create our Normals, and set icosphere to unit size.

	            for (i = 0; i < vertices.length; i++) {

	                // Toggle icosphere with icosohedron.

	                if (prim.type !== list.OCTAHEDRON) {

	                    vertices[i] = vec3.normalize([0, 0, 0], vertices[i]);
	                }

	                normals[i] = vec3.copy([0, 0, 0], vertices[i]);
	            }

	            // Texture coords.

	            createUV(vertices, texCoords);

	            // Scale if necessary.

	            if (radius != 1) {

	                for (i = 0; i < vertices.length; i++) {

	                    vertices[i][0] *= radius;

	                    vertices[i][1] *= prim.dimensions[1] / 2; //radius;

	                    vertices[i][2] *= prim.dimensions[2] / 2; //radius;
	                }
	            }

	            // Tangents (nonstandard).

	            createTangents(vertices, tangents);

	            // Flatten the data arrays.

	            vertices = flatten(vertices, false);

	            texCoords = flatten(texCoords, false);

	            normals = flatten(normals, false);

	            tangents = flatten(tangents, false);

	            // Helper functions.

	            // Create UV texCoords.

	            function createUV(vertices, uv) {

	                var previousX = 1;

	                for (i = 0; i < vertices.length; i++) {

	                    v = vertices[i];

	                    if (v[0] == previousX) {
	                        // was v.x

	                        uv[i - 1][0] = 1; // was v.x
	                    }

	                    previousX = v[0]; // was v.x

	                    var textureCoordinates = [0, 0];

	                    textureCoordinates[0] = Math.atan2(v[0], v[2]) / -TWO_PI; // was v.x, v.z

	                    if (textureCoordinates[0] < 0) {
	                        // was textureCoordinates.x

	                        textureCoordinates[0] += 1; // was textureCoordinates
	                    }

	                    textureCoordinates[1] = Math.asin(v[1]) / Math.PI + 0.5; // was v.y, textureCoordinates.y


	                    uv[i] = textureCoordinates;
	                }

	                uv[vertices.length - 4][0] = 0.125;

	                uv[0][0] = 0.125; // was v.x

	                uv[vertices.length - 3][0] = 0.375;

	                uv[1][0] = 0.375; // was v.x

	                uv[vertices.length - 2][0] = 0.625;

	                uv[2][0] = 0.625; // was v.x

	                uv[vertices.length - 1][0] = 0.875;

	                uv[3][0] = 0.875; // was v.x

	                // Our engine wraps opposite, so reverse first coordinate (can't do it until we do all coordinates).

	                for (i = 0; i < texCoords.length; i++) {

	                    texCoords[i][0] = 1.0 - texCoords[i][0];
	                }
	            }

	            // Create tangents.

	            function createTangents(vertices, tangents) {

	                for (i = 0; i < vertices.length; i++) {

	                    var _v3 = vertices[i];

	                    var vt = vec3.normalize([0, 0, 0], [_v3[0], 0, _v3[2]]);

	                    var tangent = [0, 0, 0, 0];

	                    tangent[0] = -vt[2];

	                    tangent[1] = 0;

	                    tangent[2] = vt[0];

	                    tangent[3] = -1;

	                    tangents[i] = tangent;
	                }

	                // Adjust a few specific tangents.

	                tangents[vertices.length - 4] = [-1, 0, 1];

	                tangents[0] = [-1, 0, -1];

	                tangents[vertices.length - 3] = [1, 0, -1];

	                tangents[1] = [1, 0, -1];

	                tangents[vertices.length - 2] = [1, 0, 1];

	                tangents[2] = [1, 0, 1];

	                tangents[vertices.length - 1] = [-1, 0, 1];

	                tangents[3] = [-1, 0, 1];

	                for (i = 0; i < 4; i++) {

	                    tangents[vertices.length - 1 - i][3] = tangents[i][3] = -1;
	                }
	            }

	            // Create line of vertices.

	            function createVertexLine(from, to, steps, v, vertices) {

	                for (var _i7 = 1; _i7 <= steps; _i7++) {

	                    vertices[v++] = vec3.lerp([0, 0, 0], from, to, _i7 / steps);
	                }

	                return v;
	            }

	            // Create a triangle strip for the lower part of the sphere.

	            function createLowerStrip(steps, vTop, vBottom, t, triangles) {

	                for (var _i8 = 1; _i8 < steps; _i8++) {

	                    triangles[t++] = vBottom;

	                    triangles[t++] = vTop - 1;

	                    triangles[t++] = vTop;

	                    triangles[t++] = vBottom++;

	                    triangles[t++] = vTop++;

	                    triangles[t++] = vBottom;
	                }

	                triangles[t++] = vBottom;

	                triangles[t++] = vTop - 1;

	                triangles[t++] = vTop;

	                return t;
	            }

	            // Create a triangle strip for the upper part of the sphere.

	            function createUpperStrip(steps, vTop, vBottom, t, triangles) {

	                triangles[t++] = vBottom;

	                triangles[t++] = vTop - 1;

	                triangles[t++] = ++vBottom;

	                for (var _i9 = 1; _i9 <= steps; _i9++) {

	                    triangles[t++] = vTop - 1;

	                    triangles[t++] = vTop;

	                    triangles[t++] = vBottom;

	                    triangles[t++] = vBottom;

	                    triangles[t++] = vTop++;

	                    triangles[t++] = ++vBottom;
	                }

	                return t;
	            }

	            // Create a strip for the upper sphere, but reverse the winding order so it works as a SkyDome.

	            function createUpperSkyStrip(steps, vTop, vBottom, t, triangles) {

	                triangles[t++] = vBottom;

	                triangles[t++] = ++vBottom;

	                triangles[t++] = vTop - 1;

	                for (var _i10 = 1; _i10 <= steps; _i10++) {

	                    triangles[t++] = vTop;

	                    triangles[t++] = vTop - 1;

	                    triangles[t++] = vBottom;

	                    triangles[t++] = vBottom;

	                    triangles[t++] = ++vBottom;

	                    triangles[t++] = vTop++;
	                }

	                return t;
	            }

	            // Initialize the Prim, adding normals, texCoords and tangents as necessary.

	            return this.default(vertices, indices, texCoords, normals, tangents);

	            ///////////return { vertices: vertices, indices: indices, normals: normals, texCoords: texCoords, tangents: tangents };
	        }

	        /** 
	         * Type REGULARTETRAHEDRON.
	         * Create a icosohedron.
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryRegularTetrahedron',
	        value: function geometryRegularTetrahedron(prim) {

	            return this.geometryIcoSphere(prim);
	        }

	        /** 
	         * Type ICOSOHEDRON.
	         * Create a icosohedron.
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryIcosohedron',
	        value: function geometryIcosohedron(prim) {

	            return this.geometryIcoSphere(prim);
	        }

	        /** 
	         * Type PRISM.
	         * create a closed prism type shape.
	         * Create a icosohedron.
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryPrism',
	        value: function geometryPrism(prim) {

	            var g = null;

	            var oldDivisions = [prim.divisions[0], prim.divisions[1], prim.divisions[2]];

	            // Use the Sphere creator, and create caps.

	            // Force a minimal Cylinder (note that this invalidates divisions in the xz direction.

	            prim.divisions = [3, 2, 3];

	            g = this.geometrySphere(prim);

	            // Multiply texture coordinates by 3.

	            if (prim.applyTexToFace === true) {

	                //TODO: texture coords flipped for one side of prism.

	                // -0,  -1, 0,   1, 1, 1,   -1, 1, 1,   -0,  -1, 0,   -1, 1, 1,  -1, 1, -1,  -0,  -1, 0,   -1, 1, -1,   1, 1,-1,  -0,  -1, 0,   1, 1, -1,  1, 1, 1, 
	                //  0.5, 1,      0, 0,       1, 0,       0.5, 1,       0, 0,      1, 0,       0.5, 1,       0, 0,       1, 0,      0.5, 1,      0, 0,      1, 0   

	                var len = g.texCoords.length;

	                for (var i = 0; i < len; i += 2) {

	                    var tc = g.texCoords[i] * 3;

	                    if (tc >= 2) {

	                        tc -= 2;
	                    }

	                    g.texCoords[i] = tc;
	                }
	            }

	            // Add on vertices at start and end

	            var ry = prim.dimensions[1] / 2;

	            // Top cap.            

	            var ln = g.vertices.length / 3;

	            ln = g.vertices.length / 3;

	            g.vertices = this.util.concatArr(g.vertices, [g.vertices[0], -ry, g.vertices[2], g.vertices[3], -ry, g.vertices[5], g.vertices[6], -ry, g.vertices[8]]);

	            g.normals = this.util.concatArr(g.normals, [0, -1, 0, 0, -1, 0, 0, -1, 0]);

	            g.texCoords = this.util.concatArr(g.texCoords, [0, 1.0, 1.0, 1.0, 0.5, 0]);

	            g.indices = this.util.concatArr(g.indices, [ln, ln + 1, ln + 2]);

	            // Bottom cap.

	            ln = g.vertices.length / 3;

	            g.vertices = this.util.concatArr(g.vertices, [g.vertices[0], ry, g.vertices[2], g.vertices[3], ry, g.vertices[5], g.vertices[6], ry, g.vertices[8]]);

	            g.normals = this.util.concatArr(g.normals, [0, 1, 0, 0, 1, 0, 0, 1, 0]);

	            g.texCoords = this.util.concatArr(g.texCoords, [0, 1.0, 1.0, 1.0, 0.5, 0]);

	            g.indices = this.util.concatArr(g.indices, [ln, ln + 1, ln + 2]);

	            // this is already an altered geometry.SPHERE, so don't need to default it.

	            return g;
	        }

	        /** 
	         * Type PYRAMID.
	         * create a closed pyramid shape, half of an icosohedron.
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryPyramid',
	        value: function geometryPyramid(prim) {

	            var oldDivisions = [prim.divisions[0], prim.divisions[1], prim.divisions[2]];

	            var vertices = [

	            // -0.5,  0.5,  0.5, // top -> 0
	            //  0.5,  0.5, -0.5,  // back  bottom right -> 1
	            //  0.5,  0.5,  0.5,  // front bottom right -> 2
	            // -0.5,  0.5,  0.5,  // front bottom left -> 3
	            // -0.5,  0.5, -0.5,  // back bottom left -> 4

	            // front, 0, 3, 2
	            -0.0, -0.5, 0.0, // top -> 0
	            0.5, 0.5, 0.5, // front bottom right -> 2            
	            -0.5, 0.5, 0.5, // front bottom left -> 3


	            // left 0, 4, 3
	            -0.0, -0.5, 0.0, // top -> 0
	            -0.5, 0.5, 0.5, // front bottom left -> 3 
	            -0.5, 0.5, -0.5, // back bottom left -> 4


	            // back, 0, 1, 4
	            -0.0, -0.5, 0.0, // top -> 0
	            -0.5, 0.5, -0.5, // back bottom left -> 4             
	            0.5, 0.5, -0.5, // back  bottom right -> 1            


	            // right, 0, 1, 2
	            -0.0, -0.5, 0.0, // top -> 0            
	            0.5, 0.5, -0.5, // back  bottom right -> 1
	            0.5, 0.5, 0.5, // front bottom right -> 2

	            // base ( 2 triangles)

	            // 2, 3, 4
	            -0.5, 0.5, -0.5, // back bottom left -> 4
	            -0.5, 0.5, 0.5, // front bottom left -> 3
	            0.5, 0.5, 0.5, // front bottom right -> 2

	            // 2, 4, 1
	            0.5, 0.5, -0.5, // back  bottom right -> 1
	            -0.5, 0.5, -0.5, // back bottom left -> 4            
	            0.5, 0.5, 0.5];

	            // Scale relative to dimensions.

	            for (var i = 0; i < vertices.length; i += 3) {

	                vertices[i] *= prim.dimensions[0], vertices[i + 1] *= prim.dimensions[1], vertices[i + 2] *= prim.dimensions[2];
	            }

	            var indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

	            var texCoords = [],
	                normals = [],
	                tangents = [];

	            if (prim.applyTexToFace === true) {

	                texCoords = [

	                // front 0, 3, 2
	                0.5, 1.0, 0.0, 0.0, 1.0, 0.0,

	                // left 0, 4, 3
	                0.5, 1.0, 0.0, 0.0, 1.0, 0.0,

	                // back, 0, 1, 4
	                0.5, 1.0, 0.0, 0.0, 1.0, 0.0,

	                // right 0, 1, 2
	                0.5, 1.0, 0.0, 0.0, 1.0, 0.0,

	                // base 2, 3, 4
	                1.0, 1.0, 0.0, 1.0, 0.0, 0.0,

	                // base 2, 4, 1 
	                1.0, 0.0, 1.0, 1.0, 0.0, 0.0];
	            } else {

	                //3 = 0 or 1.0
	                //2 = 0.25
	                //1 = 0.5
	                //4 = 0.75

	                texCoords = [

	                // front 0, 3, 2
	                0.125, 1.0, 0.0, 0.0, 0.25, 0.0,

	                // left 0, 4, 3
	                0.375, 1.0, 0.25, 0.0, 0.5, 0.0,

	                // back, 0, 1, 4
	                0.625, 1.0, 0.5, 0.0, 0.75, 0.0,

	                // right 0, 1, 2
	                0.875, 1.0, //875
	                0.75, 0.0, 1.0, 0.0,

	                // base 2, 3, 4
	                1.0, 1.0, 0.0, 1.0, 0.0, 0.0,

	                // base 2, 4, 1 
	                1.0, 0.0, 1.0, 1.0, 0.0, 0.0];
	            }

	            // Hard-code normals.
	            /*
	                    normals = [
	            
	                        0, 0.4472, 0.89443, 
	                        0, 0.4472, 0.89443, 
	                        0, 0.4472, 0.89443,
	            
	                        -0.89443, 0.4472, 0,
	                        -0.89443, 0.4472, 0,
	                        -0.89443, 0.4472, 0,
	            
	                        0, 0.4472, -0.89443,
	                        0, 0.4472, -0.89443,
	                        0, 0.4472, -0.89443,
	            
	                        0.89443, -0.4472, 0,
	                        0.89443, -0.4472, 0,
	                        0.89443, -0.4472, 0,
	            
	                        0, 1, 0,
	                        0, 1, 0,
	                        0, 1, 0,
	            
	                        0, 1, 0,
	                        0, 1, 0,
	                        0, 1, 0,
	            
	            
	                    ];
	            */

	            return this.default(vertices, indices, texCoords, normals, tangents);

	            ///////////return { vertices: vertices, indices: indices, normals: normals, texCoords: texCoords, tangents: tangents };
	        }

	        /** 
	         * type ICODOME.
	         * create a half-sphere from an icosphere.
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryIcoDome',
	        value: function geometryIcoDome(prim) {

	            return this.geometryTopIcoDome(prim);
	        }

	        /** 
	         * type TOPICODOME.
	         * create a half-sphere from an icosphere.
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryTopIcoDome',
	        value: function geometryTopIcoDome(prim) {

	            return this.geometryIcoSphere(prim, this.directions.TOP);
	        }

	        /** 
	         * Type SKYICODOME.
	         * create a half-sphere with texture only visible from the inside.
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometrySkyIcoDome',
	        value: function geometrySkyIcoDome(prim) {

	            prim.visibleFrom = this.INSIDE;

	            return this.geometryIcoSphere(prim, this.directions.TOP, prim.visibleFrom);
	        }

	        /** 
	         * Type BOTTOMICODOME.
	         * create a bowl shape from the lower half of an icosphere.
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryBottomIcoDome',
	        value: function geometryBottomIcoDome(prim) {

	            return this.geometryIcoSphere(prim, this.directions.BOTTOM);
	        }

	        /** 
	         * Type OCTAHEDRON.
	         * Create an octahedron
	         * Note: the icosphere algorithm returns an octahedron if we don't "inflate" 
	         * the object's vertices by normalizing.
	         * Additional links:
	         * @link https://github.com/nickdesaulniers/prims/blob/master/octahedron.js
	         * @link http://paulbourke.net/geometry/platonic/
	         * @link https://www.binpress.com/tutorial/creating-an-octahedron-sphere/162
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryOctahedron',
	        value: function geometryOctahedron(prim) {

	            return this.geometryIcoSphere(prim);
	        }

	        /** 
	         * Type DODECAHEDRON.
	         * Create a dodecahedron.
	         * @link https://github.com/prideout/par/blob/master/par_shapes.h
	         * @link https://github.com/nickdesaulniers/prims/blob/master/dodecahedron.js
	         * @link http://vorg.github.io/pex/docs/pex-gen/Dodecahedron.html
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryDodecahedron',
	        value: function geometryDodecahedron(prim) {

	            var vec3 = this.glMatrix.vec3;

	            var flatten = this.util.flatten;

	            var geo = prim.geometry;

	            // Shortcuts to Prim data arrays.

	            var vertices = [],
	                indices = [],
	                normals = [],
	                texCoords = [],
	                tangents = [];

	            var w = prim.dimensions[0],
	                h = prim.dimensions[1],
	                d = prim.dimensions[2];

	            var r = prim.divisions[0] || 0.5;

	            var phi = (1 + Math.sqrt(5)) / 2;

	            var a = 0.5;

	            var b = 0.5 * 1 / phi;

	            var c = 0.5 * (2 - phi);

	            var vtx = [[c, 0, a], // 0
	            [-c, 0, a], // 1
	            [-b, b, b], // 2
	            [0, a, c], // 3

	            [b, b, b], // 4  + 1 = 5
	            [b, -b, b], // 5  + 1 = 6
	            [0, -a, c], // 6  + 1 = 7
	            [-b, -b, b], // 7  + 1 = 8

	            [c, 0, -a], // 8  + 2 = 10
	            [-c, 0, -a], // 9  + 2 = 12
	            [-b, -b, -b], // 10 + 2 = 13
	            [0, -a, -c], // 11 + 2 = 14

	            [b, -b, -b], // 12 + 3 = 16
	            [b, b, -b], // 13 + 3 = 17
	            [0, a, -c], // 14 + 3 = 18
	            [-b, b, -b], // 15 + 3 = 19

	            [a, c, 0], // 16 + 4 = 21
	            [-a, c, 0], // 17 + 4 = 22
	            [-a, -c, 0], // 18 + 4 = 23
	            [a, -c, 0] // 19 + 4 = 24

	            ];

	            //vertices = vertices.map(function(v) { return v.normalize().scale(r); })

	            var faces = [[4, 3, 2, 1, 0], [7, 6, 5, 0, 1], [12, 11, 10, 9, 8], [15, 14, 13, 8, 9], [14, 3, 4, 16, 13], [3, 14, 15, 17, 2], [11, 6, 7, 18, 10], [6, 11, 12, 19, 5], [4, 0, 5, 19, 16], [12, 8, 13, 16, 19], [15, 9, 10, 18, 17], [7, 1, 2, 17, 18]];

	            if (prim.applyTexToFace) {

	                for (var i = 0; i < faces.length; i++) {

	                    var len = vertices.length;

	                    // The fan is a flat polygon, constructed with face points, shared vertices.

	                    var fan = this.computeFan(vtx, faces[i]);

	                    vertices = vertices.concat(fan.vertices);

	                    // Update the indices to reflect concatenation.

	                    for (var _i11 = 0; _i11 < fan.indices.length; _i11++) {

	                        fan.indices[_i11] += len;
	                    }

	                    indices = indices.concat(fan.indices);

	                    texCoords = texCoords.concat(fan.texCoords);

	                    normals = normals.concat(fan.normals);
	                }
	            } else {

	                for (var _i12 = 0; _i12 < faces.length; _i12++) {

	                    var vv = faces[_i12]; // indices to vertices

	                    var vvv = []; // saved vertices

	                    var lenv = vv.length;

	                    for (var j = 0; j < vv.length; j++) {

	                        vvv.push(vtx[vv[j]]);
	                    }

	                    var center = this.geometry.computeCentroid(vvv);

	                    for (var _i13 = 1; _i13 <= lenv; _i13++) {

	                        var p1 = _i13 - 1;

	                        var p2 = _i13;

	                        if (_i13 === lenv) {

	                            p1 = p2 - 1;

	                            p2 = 0;
	                        }

	                        var v1 = vvv[p1];

	                        var v2 = vvv[p2];

	                        vertices.push(vec3.copy([0, 0, 0], v1), vec3.copy([0, 0, 0], v2), vec3.copy([0, 0, 0], center));

	                        var cLen = vertices.length - 1;

	                        indices.push(cLen - 2, cLen - 1, cLen);

	                        normals.push(vec3.copy([0, 0, 0], v1), vec3.copy([0, 0, 0], v2), vec3.copy([0, 0, 0], center));

	                        texCoords.push(this.computeSphericalCoords(v1), this.computeSphericalCoords(v2), this.computeSphericalCoords(center));
	                    } // end of 'for' loop.
	                } // end of 'faces' loop.
	            } // end of wrap whole object with one texture.

	            // Scale.

	            for (var _i14 = 0; _i14 < vertices.length; _i14++) {

	                var _vv = vertices[_i14];

	                _vv[0] *= w;

	                _vv[1] *= h;

	                _vv[2] *= d;
	            }

	            // Flatten.

	            vertices = flatten(vertices);

	            texCoords = flatten(texCoords);

	            normals = flatten(normals);

	            // Initialize the Prim, adding normals, texCoords and tangents as necessary.

	            return this.default(vertices, indices, texCoords, normals, tangents);

	            ////////return { vertices: vertices, indices: indices, normals: normals, texCoords: texCoords, tangents: tangents };
	        }

	        /** 
	         * Type TORUS
	         * A Torus object.
	         * @link https://blogoben.wordpress.com/2011/10/26/webgl-basics-7-colored-torus/
	         * @link http://apparat-engine.blogspot.com/2013/04/procedural-meshes-torus.html
	         * Creates a 3D torus in the XY plane, returns the data in a new object composed of
	         *   several Float32Array objects named 'vertices' and 'colors', according to
	         *   the following parameters:
	         * r:  big radius
	         * sr: section radius
	         * n:  number of faces
	         * sn: number of faces on section
	         * k:  factor between 0 and 1 defining the space between strips of the torus
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         */

	    }, {
	        key: 'geometryTorus',
	        value: function geometryTorus(prim) {

	            var vec3 = this.glMatrix.vec3;

	            var geo = prim.geometry;

	            // Shortcuts to Prim data arrays

	            var vertices = [],
	                indices = [],
	                normals = [],
	                texCoords = [],
	                tangents = [];

	            var radius = prim.dimensions[0] / 2; // x coordinate, width of torus in x direction

	            var ringRadius = prim.dimensions[2] / 2; // ringradius

	            var rings = prim.divisions[0];

	            var sides = prim.divisions[1];

	            // typical: radius = 0.5, ringRadius = 0.25, sides = 36, rings = 24;

	            var vertsPerRow = sides + 1;

	            var vertsPerColumn = rings + 1;

	            var ringStride = this.TWO_PI / rings;

	            var torusStride = this.TWO_PI / sides;

	            var theta = 0,
	                phi = 0,
	                x = void 0,
	                y = void 0,
	                z = void 0;

	            for (var vertColumn = 0; vertColumn < vertsPerColumn; vertColumn++) {

	                theta = ringStride * vertColumn;

	                for (var horizRow = 0; horizRow < vertsPerRow; horizRow++) {

	                    phi = torusStride * horizRow;

	                    // Position.

	                    x = Math.cos(theta) * (radius + ringRadius * Math.cos(phi));

	                    y = Math.sin(theta) * (radius + ringRadius * Math.cos(phi));

	                    z = ringRadius * Math.sin(phi);

	                    vertices.push(x, y, z); // NOTE: x, z, y gives a horizontal torus

	                    var norm = vec3.normalize([0, 0, 0], [x, y, z]);

	                    normals.push(norm[0], norm[1], norm[2]);

	                    var _u3 = horizRow / vertsPerRow;

	                    var _v4 = vertColumn / vertsPerColumn;

	                    texCoords.push(_u3, _v4);
	                }
	            }

	            // let numIndices = sides * rings * 6;

	            for (var _vertColumn = 0; _vertColumn < rings; _vertColumn++) {

	                for (var _horizRow = 0; _horizRow < sides; _horizRow++) {

	                    var lt = _horizRow + _vertColumn * vertsPerRow;

	                    var rt = _horizRow + 1 + _vertColumn * vertsPerRow;

	                    var lb = _horizRow + (_vertColumn + 1) * vertsPerRow;

	                    var rb = _horizRow + 1 + (_vertColumn + 1) * vertsPerRow;

	                    indices.push(lb, rb, rt, lb, rt, lt);

	                    // NOTE: wrap backwards to see inside of torus ( a tunnel?).
	                }
	            }

	            // Initialize the Prim, adding normals, texCoords and tangents as necessary.

	            return this.default(vertices, indices, texCoords, normals, tangents);

	            ////////////return { vertices: vertices, indices: indices, normals: normals, texCoords: texCoords, tangents: tangents };
	        }

	        /** 
	         * Generic 3d shape defined from files (e.g. OBJ model).
	         * calls load-model, then executes final callback. Final callback creates WebGL buffers 
	         * for the Prim. Other model files (e.g. material) are loaded by load-model and values 
	         * assigned to the Prim before final loading.
	         *
	         * @link https://dannywoodz.wordpress.com/2014/12/16/webgl-from-scratch-loading-a-mesh/
	         * @link https://github.com/jagenjo/litegl.js/blob/master/src/mesh.js
	         * 
	         * @param {Prim} the Prim needing geometry. 
	         * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	         * Creating WebGL buffers is turned on or off conditionally in the method.
	         */

	    }, {
	        key: 'geometryMesh',
	        value: function geometryMesh(prim, pathList) {

	            // Get the model file. Pass in Prim so we can respond to model completion events.

	            if (pathList === undefined || pathList.length === undefined) {

	                console.error('GeometryPool::geometryMesh(): empty path passed for mesh file, returning');

	                return false;
	            }

	            for (var i = 0; i < pathList.length; i++) {

	                this.modelPool.getModel(prim, pathList[i], true, { pos: i });
	            }

	            return true;
	        }

	        /* 
	         * ---------------------------------------
	         * LOADERS
	         * ---------------------------------------
	         */

	        /** 
	         * Get a geometry, either procedural, or from a OBJ file.
	         * @param {Prim} prim the calling Prim.
	         * @param {String} path the URL to load.
	         */

	    }, {
	        key: 'getGeometry',
	        value: function getGeometry(prim, path) {
	            var cacheBust = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { pos: 0 };


	            if (path !== null) {

	                /* 
	                 * Mesh geometry, uses data from a file using OBJ format, or 
	                 * other data formats (e.g. HYG stellar coordinates).
	                 */

	                // Could have an empty path.

	                if (!path instanceof String || !this.util.isWhitespace(path)) {

	                    console.log('GeometryPool::getGeometry(): getting model for:' + prim.name + ' at path:' + path);

	                    // Adjust options for special models, e.g. the HYG stellar database.

	                    if (prim.type === this.typeList.STARDOME) {

	                        // Use RA and Dec fields as spherical coordinates when creating vertices.

	                        options.useXYZ = false;
	                    } else if (prim.type === this.typeList.STAR3D) {

	                        // Use Cartesian x,y,z fields for coordinates when creating vertices.

	                        options.useXYZ = true;
	                    }

	                    this.modelPool.getModel(prim, path, true, options);
	                } else {

	                    console.warn('GeometryPool::getGeometry(): no path supplied for prim ' + prim.name);
	                } // end of valid path
	            } else {
	                // NO PATHLIST (procedural instead)

	                /* 
	                 * Procedural geometry, returns the same structure as modelPool.getModel();
	                 *
	                 * Model format:
	                 * {
	                 *   vertices: vertices,
	                 *   indices: indices,
	                 *   texCoords: texCoords,
	                 *   normals: normals,
	                 *   tangents: tangents,
	                 *   type: type,
	                 *   path: key to the ModelPool,
	                 *   usemtl: util.DEFAULT_KEY (always 'default')
	                 * }
	                 */

	                console.log('GeometryPool::getGeometry() new procedural geometry for:' + prim.name);

	                if (prim.type === this.typeList.MESH) {

	                    console.error('GeometryPool::getGeometry(): Mesh object for ' + prim.name + ' does not have associated file, giving up');

	                    return;
	                }

	                var m = this.modelPool.addAsset(this[prim.type](prim));

	                // Store the type.

	                m.type = prim.type,

	                // Since there's no file path, we'll use our key for the pseudo-path (Blob-like).

	                m.path = m.key,

	                // Default material, since none specified.

	                m.material = this.util.DEFAULT_KEY;

	                // Add the emit event.

	                this.util.emitter.emit(this.util.emitter.events.PROCEDURAL_GEOMETRY_READY, prim, m.key, options);
	            }
	        }
	    }]);

	    return GeometryPool;
	}();

	exports.default = GeometryPool;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _assetPool = __webpack_require__(19);

	var _assetPool2 = _interopRequireDefault(_assetPool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var ModelPool = function (_AssetPool) {
	    _inherits(ModelPool, _AssetPool);

	    /** 
	     * @class
	     * Load model files for custom geometry.
	     * Geometry prebuilt
	     * http://paulbourke.net/geometry/roundcube/
	     * NOTE: GeometryPool adds its geometry objects to this pool, doesn't have its own!
	     *
	     * @constructor
	     * @param {Boolean} init if true, initialize immediately.
	     * @param {Util} util reference to utility methods.
	     * @param {WebGL} webgl reference to WebGL object.
	     * @param {TexturePool} texture loader and asset pool.
	     * @param {MaterialPool} material loader and asset pool.
	     * @param {PrimFactory} the Prim creation and ''
	     */
	    function ModelPool(init, util, webgl, texturePool, materialPool) {
	        _classCallCheck(this, ModelPool);

	        console.log('in ModelPool');

	        // Initialize superclass.

	        var _this = _possibleConstructorReturn(this, (ModelPool.__proto__ || Object.getPrototypeOf(ModelPool)).call(this, util));

	        _this.util = util, _this.webgl = webgl, _this.texturePool = texturePool, _this.materialPool = materialPool, _this.modelMimeTypes = {

	            'obj': 'text/plain',

	            'mtl': 'text/plain',

	            'gltf': 'text/tgltf',

	            'gltfBinary': 'bin/gltf',

	            'hyg': 'text/plain'

	        };

	        if (init) {

	            // Create and store a default Model.

	            _this.defaultKey = _this.addAsset(_this.default()).key;
	        }

	        return _this;
	    }

	    /** 
	     * Create the default ModelPool object.
	     * @param {glMatrix.vec3[]} vertices flattened vertex array.
	     * @param {Array} indices index array.
	     * @param {glMatrix.vec2[]} texCoords texture coordinates (2D).
	     * @param {glMatrix.vec3[]} normals normals array.
	     * @param {Array[Number]} objects a list of starts in the index array for new sub-objects.
	     * @param {Array[Number]} groups a list of starts in the index array for new groups.
	     * @param {Array[Number]} smoothingGroups a list of starts in the index array for smoothing groups.
	     * @param {Array[Number]} materials a list of starts for materials in the index array.
	     */


	    _createClass(ModelPool, [{
	        key: 'default',
	        value: function _default() {
	            var vertices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	            var indices = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	            var texCoords = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	            var normals = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
	            var objects = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
	            var groups = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
	            var smoothingGroups = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
	            var materials = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
	            var matStarts = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];


	            return {

	                vertices: vertices,

	                indices: indices,

	                texCoords: texCoords,

	                normals: normals,

	                tangents: [], // not supplied by OBJ file format

	                // References to sub-regions in the obj file, number = position in vertices.

	                options: {

	                    objects: objects,

	                    groups: groups,

	                    smoothingGroups: smoothingGroups,

	                    materials: materials,

	                    matStarts: matStarts

	                }

	            };
	        }

	        /** 
	         * Extract 3d vertex data (vertices, normals) from a string.
	         * @param {String} data string to be parsed for 3d coordinate values.
	         * @param {Array} arr the array to add the coordinate values to.
	         * @param {Number} numReturned number of values to returned. In some 
	         * OBJ files, 3 numbers are written for 2d texture.
	         */

	    }, {
	        key: 'computeObj3d',
	        value: function computeObj3d(data, arr) {

	            // TODO: replace with .split() and .parseFloat()????

	            var vs = data.match(/^(-?\d+(\.\d+)?)\s*(-?\d+(\.\d+)?)\s*(-?\d+(\.\d+)?)/);

	            if (vs) {

	                arr.push(parseFloat(vs[1]), parseFloat(vs[3]), parseFloat(vs[5]));

	                //////////////////////console.log("PUSHED:" + vs[ 1 ] + ',' + vs[ 3 ] + ',' + vs[ 5 ] )

	                return true;
	            }

	            return false;
	        }

	        /** 
	         * Extract 2 vertex data (texture coordinates) from a string. For some routines, 
	         * use the 'return' while others do not.
	         * @param {String} data string to be parsed for 3d coordinate values.
	         * @param {Array} arr the array to add the coordinate values to.
	         */

	    }, {
	        key: 'computeObj2d',
	        value: function computeObj2d(data, arr) {

	            var uvs = data.match(/^(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)$/);

	            if (uvs) {

	                arr.push(parseFloat(uvs[1]), parseFloat(uvs[3]));

	                return true;
	            } else {
	                // check if 2d texture written in 3d(!)

	                var uv2 = [];

	                if (this.computeObj3d(data, uv2)) {

	                    arr.push(uv2[0], uv2[1]); // only copy the first 2 coordinates          

	                    return true;
	                }
	            }

	            return false;
	        }

	        /** 
	         * Compute index, with fallback for missing index.
	         * @param {Number} num the number to test.
	         * @returns {Number} the number, or an error number (-1).
	         */

	    }, {
	        key: 'computeFaceIndex',
	        value: function computeFaceIndex(num) {

	            if (!Number.isFinite(num)) {

	                console.warn("WEIRD NUM:" + num);

	                return this.NOT_IN_STRING;
	            }

	            return num;
	        }

	        /** 
	         * Compute triangles for Quads and higher polygons (all triangles share the 1st position).
	         * Use when the number of faces on a line is > 3 (usually a quad).
	         * @param {Array} idxs an array of single numbers, representing start positions in another Array.
	         * @returns {Array} an Array, augmented with additional positions converting polygons to a set of triangles.
	         */

	    }, {
	        key: 'computeFaceFan',
	        value: function computeFaceFan(idxs) {

	            if (idxs.length) {

	                var nIdxs = [];

	                // For quad, this gives 0, 1, 2, 0, 2, 3.

	                for (var i = 1; i < idxs.length - 1; i++) {

	                    nIdxs.push(idxs[0], idxs[i], idxs[i + 1]);
	                }

	                return nIdxs;
	            }

	            return idxs;
	        }

	        /** 
	         * Convert the faces xx/xx/xx listing in OBJ files to vertex, texCoord, normal positions in 
	         * the other arrays loaded by the OBJ file.
	         * f 20/30/22 --> faces[ i ] = [ 20, 30, 22 ]
	         * If the face is NOT a triangle, convert higher-order polygon to a set of triangles.
	         *
	         * @param {String} data the data for an individual face.
	         * @param {Array} the face array to append the data to.
	         */

	    }, {
	        key: 'computeObjFaces',
	        value: function computeObjFaces(data, faces, lineNum) {

	            var parts = data.match(/[^\s]+/g);

	            var NOT_IN_STRING = this.NOT_IN_LIST;

	            var idxs = void 0,
	                iVert = void 0,
	                iTexCoord = void 0,
	                iNormal = void 0,
	                iVerts = [],
	                iTexCoords = [],
	                iNormals = [];

	            // Each map should refer to one point.

	            parts.map(function (fs) {

	                //console.log("fs:" + fs)

	                // Split indices, normals and texture coordinates if they are present.

	                if (fs.indexOf('//') !== NOT_IN_STRING) {
	                    // normals, no texture coordinates

	                    idxs = fs.split('//');

	                    iVerts.push(parseFloat(idxs[0]) - 1);

	                    iTexCoords.push(null);

	                    iNormals.push(parseFloat(idxs[1]) - 1);
	                } else if (fs.indexOf('/') !== NOT_IN_STRING) {
	                    // texCoords present

	                    idxs = fs.split('/');

	                    iVerts.push(parseFloat(idxs[0]) - 1);

	                    if (idxs.length == 2) {
	                        // texCoords present

	                        iTexCoords.push(parseFloat(idxs[1]) - 1);

	                        iNormals.push(null);
	                    } else if (idxs.length === 3) {
	                        // both texCoords and normals present

	                        iTexCoords.push(parseFloat(idxs[1]) - 1);

	                        iNormals.push(parseFloat(idxs[2]) - 1);
	                    }
	                } else {
	                    // Has indices only

	                    iVerts.push(parseFloat(fs) - 1);
	                }
	            });

	            // Now, convert quads and higher polygons to a set of triangles.

	            iVerts = this.computeFaceFan(iVerts);

	            iTexCoords = this.computeFaceFan(iTexCoords);

	            iNormals = this.computeFaceFan(iNormals);

	            // Append to faces array.

	            for (var i = 0; i < iVerts.length; i++) {

	                faces.push([iVerts[i], iTexCoords[i], iNormals[i]]);
	            }
	        }

	        /** 
	         * Parse the .obj file into flattened object data
	         * @link http://paulbourke.net/dataformats/obj/
	         * 
	         * @param {String} data the incoming data from the file.
	         * @param {Prim} prim the Prim object defined in prim.es6
	         * @param {String} path the path to the file. MTL files may reference other files in their directory.
	         */

	    }, {
	        key: 'computeObjMesh',
	        value: function computeObjMesh(data, prim, path) {
	            var _this2 = this;

	            //////console.log( 'ModelPool::computeObjMesh(): loading a new file:' + path + ' for ' + prim.name );

	            var m = this.default();

	            var isWhitespace = this.util.isWhitespace,
	                vertices = m.vertices,
	                indices = m.indices,
	                texCoords = m.texCoords,
	                normals = m.normals,
	                objMtl = this.util.DEFAULT_KEY,
	                objects = m.options.objects,
	                groups = m.options.groups,
	                smoothingGroups = m.options.smoothingGroups,
	                materials = m.options.materials,
	                matStarts = m.options.matStarts,


	            // temp arrays needed to flatten OBJ multi-index format to WebGL format, so don't append directly to default() Model.

	            tIndices = [],
	                tVertices = [],
	                tNormals = [],
	                tTexCoords = [],
	                iIndices = [],
	                iTexCoords = [],
	                iNormals = [],
	                iHash = [],
	                // associative lookup table for faces (vertices, indices, texCoords);

	            faces = [];

	            var dir = this.util.getFilePath(path);

	            var matName = this.materialPool.createDefaultName(prim.name);

	            // Get the lines of the file.

	            var lineNum = 0,
	                lines = data.split('\n'),
	                lastType = this.NOT_IN_STRING;

	            // Start the loop through the OBJ file.

	            lines.forEach(function (line) {

	                // First value in string.

	                var type = line.split(' ')[0].trim();

	                // All other values as a string.

	                var data = line.substr(type.length).trim();

	                // If there's no data, don't process.

	                if (data !== '') {

	                    switch (type) {

	                        case 'o':
	                            // object name (could be several in file)

	                            if (!prim.name) {

	                                prim.name = data;
	                            }

	                            objects.push([data, faces.length]); // start position in final flattened array

	                            lastType = type; // use to catch smoothing groups

	                            break;

	                        case 'g':
	                            // group name, store hierarchy

	                            groups.push([data, faces.length]); // starting position in final flattened array

	                            lastType = type; // use to catch smoothing groups

	                            break;

	                        case 's':
	                            // smoothing group (related to 'g') applies to next line.

	                            /* 
	                             * TODO: we would need to process lines[ lineNum ] into just the vertices positions here.
	                             * TODO: need to store the smoothing groups, then...
	                             * Scan completed files for vertex groups.
	                             * NOTE: since we are already taking a group of faces, we're just tagging these sets of 
	                             * vertices as being smoothed in a specific way. So. smoothing group starts and finishes 
	                             * for the final array should be sufficient.
	                             *
	                             * Our format for a group is: smoothingGroups[ i ][ name, start, length ]
	                             */

	                            smoothingGroups.push([data + 's']);

	                            lastType = type; // use to catch smoothing groups

	                            break;

	                        case 'v':
	                            // vertices

	                            _this2.computeObj3d(data, tVertices);

	                            lastType = type; // use to catch smoothing groups

	                            break;

	                        case 'f':
	                            // line of faces, indices, convert polygons to triangles

	                            // If our previous line was a smoothing group, add the start.

	                            var sg = void 0,
	                                oldLen = void 0;

	                            if (lastType === 's') {

	                                sg = smoothingGroups[smoothingGroups.length - 1];

	                                oldLen = faces.length;

	                                sg.push(oldLen);
	                            }

	                            // Get the faces

	                            _this2.computeObjFaces(data, faces, lineNum);

	                            // If our previous line was a smoothing group, add the length.

	                            if (lastType === 's') {

	                                sg.push(faces.length - oldLen);
	                            }

	                            lastType = type; // use to catch smoothing groups

	                            break;

	                        case 'vn':
	                            // normals

	                            _this2.computeObj3d(data, tNormals);

	                            lastType = type; // use to catch smoothing groups

	                            break;

	                        case 'vt':
	                            // texture uvs

	                            if (!_this2.computeObj2d(data, tTexCoords)) {

	                                //console.warn( '3D texture encountered:'+ data );

	                                _this2.computeObj3d(data, tTexCoords);
	                            }

	                            lastType = type; // use to catch smoothing groups

	                            break;

	                        case 'mtllib':
	                            // materials library data

	                            // Multiple files may be specified here, and each file may have multiple materials.

	                            var mtls = data.split(' ');

	                            for (var i = 0; i < mtls.length; i++) {

	                                var _path = dir + _this2.util.getFileName(mtls[i]);

	                                _this2.materialPool.getMaterial(prim, _path, true, { pos: i });
	                            }

	                            lastType = type; // use to catch smoothing groups

	                            break;

	                        case 'usemtl':
	                            // use material (by name, loaded as .mtl file elsewhere)

	                            // matStarts records where to start in the index (faces) array.

	                            matName = _this2.util.getFileName(data);

	                            matStarts.push([matName, faces.length * 4, 0]); // multiply times 4/3

	                            lastType = type; // use to catch smoothing groups

	                            break;

	                        case '#':
	                            // comments are ignored

	                            break;

	                        case 'maplib': // poorly documented
	                        case 'usemap': // ditto
	                        case 'vp': // parameter vertices
	                        case 'p': // point
	                        case 'l': // line
	                        case 'curv': // 2d curve
	                        case 'surf': //surface
	                        case 'parm': // parameter values
	                        case 'trim': // outer trimming loop
	                        case 'hole': // inner trimming loop
	                        case 'scrv': //special curve
	                        case 'sp': // special point
	                        case 'end': // end statment
	                        case 'con': // connectivity between free-form surfaces
	                        case 'mg': // merging group
	                        case 'bevel': // bevel interpolation
	                        case 'c_interp': // color interpolation
	                        case 'd_interp': // dissolve interpolation
	                        case 'lod': // level of detail
	                        case 'shadow_obj': // shadow casting
	                        case 'trace_obj': // ray tracing
	                        case 'ctech': // curve approximation
	                        case 'stech': // surface approximation
	                        case '':
	                            // no parameter

	                            console.warn('ModelPool::computeObjMesh(): OBJ data type: ' + type + ' in .obj file not supported');

	                            break;

	                        default:

	                            // If it's not a pure whitespace line, report.

	                            if (!isWhitespace(data)) {

	                                console.error('ModelPool::computeObjMesh(): unknown line data: ' + line + ' in .obj file at line:' + lineNum);
	                            }

	                            break;

	                    } // end of switch
	                } // end of data !== ''

	                lineNum++;
	            });

	            /* 
	             * Second phase.
	             *
	             *  Rewrite indices to fold texCoords and normals under a single index, which is 
	             * the same as the vertices (needed for WebGL).
	             */

	            if (faces.length) {

	                var nIndices = [],
	                    nVertices = [],
	                    nTexCoords = [],
	                    nNormals = [],
	                    nMatStarts = [],
	                    nSmoothingGroups = [];

	                for (var i = 0; i < faces.length; i++) {

	                    // i is the index in the faces array.

	                    var f = faces[i];

	                    // Construct a hash key for this face.

	                    var key = f[0] + '_' + f[1] + '_' + f[2]; // point key (vertex, index, normals)

	                    var vIdx = void 0,
	                        iIdx = void 0;

	                    // Hash lookup.

	                    if (iHash[key] !== undefined) {

	                        // Push the existing, revised value for the face key.

	                        vIdx = f[0]; // old face index within OBJ file.

	                        iIdx = iHash[key]; //REDUNDANT

	                        nIndices.push(iHash[key]);
	                    } else {

	                        vIdx = f[0]; // old face index within OBJ file

	                        iIdx = parseInt(nVertices.length / 3); // new face index in the new arrays

	                        var tIdx = void 0,
	                            nIdx = void 0;

	                        // Push the new Index.

	                        nIndices.push(iIdx);

	                        // Save the new index under the hash key

	                        iHash[key] = iIdx;

	                        // Push the flattened vertex, texCoord, normal values.

	                        vIdx *= 3;

	                        // Push vertices.

	                        nVertices.push(tVertices[vIdx], tVertices[vIdx + 1], tVertices[vIdx + 2]);

	                        // Push texture coords.

	                        if (f[1] !== null && f[1] !== undefined) {

	                            tIdx = f[1] * 2;

	                            if (isFinite(tTexCoords[tIdx]) && isFinite(tTexCoords[tIdx + 1])) {

	                                nTexCoords.push(tTexCoords[tIdx], tTexCoords[tIdx + 1]);
	                            } else {

	                                console.error('ModelPool::computeObjMesh(): bad texCoords in file: at' + tIdx + '  face (' + f + ')');
	                            }
	                        } else {}

	                        /* 
	                         * In a complex OBJ file, groups or objects may have 
	                         * normals or texture coordinates, while others may lack them.
	                         * Uncomment below while debugging automated texture coordinate assignment.
	                         */

	                        //nTexCoords.push( 0, 0 );

	                        //console.log("INVALID teXCOorD at position:" + i + " 0:" + tTexCoords[ tIdx] + " 1:" + tTexCoords[ tIdx + 1])

	                        // Push normals.

	                        if (f[2] !== null && f[2] !== undefined) {

	                            nIdx = f[2] * 3;

	                            if (isFinite(tNormals[nIdx]) && isFinite(tNormals[nIdx + 1] && isFinite(tNormals[nIdx + 2]))) {

	                                nNormals.push(tNormals[nIdx], tNormals[nIdx + 1], tNormals[nIdx + 2]);
	                            } else {

	                                console.error('ModelPool::computeObjMesh(): bad normals in file at' + nIdx + ' face (' + f + ')');
	                            }
	                        } // else, don't write anything, GeometryPool will compute
	                    } // end of re-index a new face
	                } // end of for loop

	                // Should be the same.

	                if (nVertices.length > this.webgl.MAX_DRAWELEMENTS) {

	                    console.error('ModelPool::computeObjMesh(): size of prim ' + prim.name + ' (' + nVertices.length + ') exceeds max buffer:' + this.webgl.MAX_DRAWELEMENTS);
	                }

	                // Make sure we returned enough normals, if they were defined.

	                if (nNormals.length > 0 && nNormals.length !== nVertices.length) {

	                    console.warn('ModelPool::computeObjMesh(): not enough normals returned, zeroing out!');

	                    nNormals = [];
	                }

	                /*
	                 * Make sure we returned enough texCoords, if they were defined.
	                 * If not, compute manually in GeometryPool.
	                 * TODO: useing spherical texCoord calc, get alternate working!
	                 */

	                if (nTexCoords.length > 0 && nTexCoords.length !== 2 * nVertices.length / 3) {

	                    console.warn('ModelPool::computeObjMesh(): not enough texCoords returned, zeroing out!');

	                    nTexCoords = [];
	                }

	                // Replace raw vertex, index, texCoord, normal data with face-adjusted data.

	                tVertices = nVertices, tIndices = nIndices, tTexCoords = nTexCoords, tNormals = nNormals;
	            } else {

	                console.error('ModelPool::computeObjMesh(): no faces data in file!');

	                return m; // return an empty object
	            }

	            // If there were no materials, create a default one. This can happen for an .OBJ file without any .mtl files associated.

	            if (matStarts.length === 0) {

	                m.options.matStarts.push([this.materialPool.createDefaultName(prim.name), 0, tIndices.length]);
	            }

	            // Compute matStarts length

	            for (var _i = 1; _i < m.options.matStarts.length; _i++) {

	                m.options.matStarts[_i - 1][2] = (m.options.matStarts[_i][1] - m.options.matStarts[_i - 1][1]) / 4;
	            }

	            m.options.matStarts[m.options.matStarts.length - 1][2] = tIndices.length - m.options.matStarts[m.options.matStarts.length - 1][1] / 4;

	            // If there was no faces in the OBJ file, use the raw data.

	            m.options.matStarts = matStarts;

	            m.vertices = tVertices, m.indices = tIndices, m.texCoords = tTexCoords, m.normals = tNormals;

	            // NOTE: Color arrays and tangents are not part of the Wavefront .obj format.

	            return m;
	        }

	        /** 
	         * Decode a simple GlTF file. We only support one scene, with multiple objects. Objects only suppot features 
	         * implemented in this program (e.g. no rigging). 
	         * Reference: THREE glTF shader, starting about line 850.
	         * @param {String} data the incoming data from the file.
	         * @param {Prim} prim the Prim object defined in prim.es6
	         * @param {String} path the path to the file.
	         */

	    }, {
	        key: 'computeGlTFMesh',
	        value: function computeGlTFMesh(data, prim, path) {

	            var m = this.default();

	            m.data = JSON.parse(data);

	            // TODO: study the recursion. See how often you can have scene in scene, etc.

	            for (var i in m.data) {

	                switch (i) {

	                    case 'scene':

	                        break;

	                    case 'scenes':

	                        break;

	                    case 'nodes':

	                        break;

	                }
	            }

	            return m;
	        }

	        /** 
	         * Compute a mesh encoded in GlTF format.
	         * @param {String} data the incoming data from the file.
	         * @param {Prim} prim the Prim object defined in prim.es6
	         * @param {String} path the path to the file. MTL files may reference other files in their directory.
	         */

	    }, {
	        key: 'computeGlTFBinaryMesh',
	        value: function computeGlTFBinaryMesh(data, prim, path) {

	            var m = this.default();

	            return m;
	        }

	        /**
	         * Compute a starmap based on the Hyg database, encoded as a JSON file. From the HYG database, with 
	         * some fields removed.
	         * Database
	         * @link https://github.com/astronexus/HYG-Database
	         *
	         * Lookup for some missing star names (get their hipparcos ID)
	         * @link http://simbad.u-strasbg.fr/simbad/sim-fid
	         *
	         * CSV to JSON converter:
	         * @link http://www.convertcsv.com/csv-to-json.htm
	         *
	         * Nebulae and galaxies
	         * @link https://github.com/astronexus/HYG-Database/blob/master/dso.csv
	         *
	         * Building a Planetarium
	         * @link https://medium.com/@LeapMotion/planetarium-3675b0eedbc2
	         * 
	         * Check our map against projection of night sky
	         * @link https://in-the-sky.org/skymap.php
	         * 
	         * Find our Hyg stars by their HIP number
	         * @link http://www.magnitudo.org/stars/#
	         * 
	         * @param {String} data the incoming data from the file.
	         * @param {Prim} prim the Prim object defined in prim.es6
	         * @param {String} path the path to the file. MTL files may reference other files in their directory.
	         * @param {Object} options additional data for using specific fields in the HYG data.
	         */

	    }, {
	        key: 'computeHyg',
	        value: function computeHyg(data, prim, path, options) {

	            var m = this.default();

	            var dimensions = prim.dimensions;

	            var stars = JSON.parse(data);

	            var tVertices = [],
	                tIndices = [],
	                tNormals = [],
	                tTexCoords = [],
	                tColors = [];

	            var objects = m.options.objects; // data for each Star (original JSON array)

	            var iIdx = 0;

	            /* 
	             * ADDITIONAL PARAMETERS
	             * Use the colorIndex instead of spectral type colors. Otherwise, 
	             * use preceived colors accd. to spectral type.
	             */

	            var useColorIndex = false; /////////////////////////////////////////////////////////////////////////////
	            var properNamesOnly = true; ///////////////////////////////////////////////////////////////////////////

	            for (var i = 0; i < stars.length; i++) {

	                var star = stars[i];

	                // NOTE: xyz option (3d starfield instead of stardome) doesn't plot Stars beyond webgl clipping.

	                if (options.useXYZ === true) {

	                    if (star.dist < this.webgl.far) {

	                        tVertices.push(parseFloat(star.x), parseFloat(star.y), parseFloat(star.z));

	                        // Normals, indices, texture coordinates.

	                        tNormals.push(0, 0, 0);

	                        tIndices.push(iIdx++);

	                        tTexCoords.push(0, 1);
	                    }
	                } else {

	                    // Not a straight UVToCartesian, ra = 0-24 hours, dec = 0-360 degrees.

	                    var A = this.util.degToRad(parseFloat(star.ra) * 15);

	                    var B = this.util.degToRad(parseFloat(star.dec));

	                    /*
	                     * The map is reversed, relative to our coordinate system.
	                     *
	                     * 1. Rotate z to 90 degrees to put the Polaris overhead, with y axis rotating around North pole at zeinth.
	                     * 2. Rotate -x to  change latitude, i.e., push down from pole to equator. User initially faces Polaris.
	                     * 3. Rotate -y to move the skydome with respect to hours of day ( y === 0 is midnight ).
	                     *
	                     */

	                    tVertices.push(Math.sin(B), // z

	                    Math.cos(B) * Math.cos(A), // x

	                    Math.cos(B) * Math.sin(A) // y

	                    );

	                    tNormals.push(0, 0, 0); // no normals

	                    tIndices.push(iIdx++);

	                    tTexCoords.push(0, 1); // no texture
	                }

	                /* 
	                 * We compute magnitude by scaling Sirius (brightest star) from -1.44 to 1.0
	                 * and assume a cutoff magnitude of +8.5
	                 * @link https://lco.global/spacebook/what-apparent-magnitude/
	                 */

	                var mag = 1.0 - (parseFloat(star.mag) + 1.44) / 8.5;

	                //////////////console.log( 'RAWMAG:' + ( parseFloat( star.mag ) + 1.44 ) +  ' MAG:' + mag)

	                /* 
	                 * rather than using the color index, we use the start spectral type, 
	                 * which is closer to the real visual display. The first leter of the 
	                 * spectral type is the class, which we use to set the color.
	                 */

	                var rgb = void 0,
	                    clr = void 0;

	                var spect = star.spect[0]; // first letter of spectral type

	                if (spect && !useColorIndex) {

	                    spect = spect.toLowerCase();

	                    switch (spect) {

	                        case 'o':

	                            clr = '9bb0ff';

	                            break;

	                        case 'b':

	                            clr = 'aabfff';

	                            break;

	                        case 'a':

	                            clr = 'aabfff';

	                            break;

	                        case 'f':

	                            clr = 'fbf8ff';

	                            break;

	                        case 'g':

	                            clr = 'fff4e8';

	                            break;

	                        case 'k':

	                            clr = 'ffddb4';

	                            break;

	                        case 'm':

	                            clr = 'ff806f'; // made slightly redder

	                            break;

	                        default:

	                            clr = '#FFFFFF';

	                            break;

	                    }

	                    // Brightness

	                    rgb = this.util.hexToRGB(clr, 255);

	                    rgb.r *= mag, rgb.g *= mag, rgb.b *= mag;
	                } else {

	                    // No stellar type, use colorIndex instead.

	                    clr = parseFloat(star.ci) || 0;

	                    clr *= mag;

	                    rgb = { r: mag + clr, g: mag, b: mag - clr };
	                }

	                // Colorize certain stars forming useful constellations

	                //////////////////////////////////////////////

	                if (star.proper === 'Betelgeuse' || star.proper === 'Rigel' || star.proper === 'Bellatrix' || star.proper === 'Saiph' || star.proper === 'Alnitak' || star.proper === 'Alnilam' || star.proper === 'Mintaka' || star.proper === 'Alkaid' || star.proper === 'Mizar' || star.proper === 'Alioth' || star.proper === 'Mergrez' || star.proper === 'Phad' || star.proper === 'Merak' || star.proper === 'Dubhe' || star.proper === 'Polaris' || star.proper === 'kochab' || star.hip === '75097' || star.hip === '79822' || star.hip === '77055' || star.hip === '82080' || star.hip === '85822' || star.proper === 'Caph' || star.proper === 'Shedir' || star.proper === 'Cih' || star.proper === 'Ruchbah' || star.id === '8867') tColors.push(0, 1, 0, 1);else tColors.push(rgb.r, rgb.b, rgb.b, 1);

	                ////////////////////////////////////////////////

	                // Save the Star data in the Objects array, conditionally only named Stars.

	                if (properNamesOnly) {

	                    if (star.proper.length > 0) {

	                        objects.push([star, tVertices.length]);
	                    }
	                } else {

	                    objects.push([star, tVertices.length]); // start position for each Star final flattened array
	                }
	            } // end of loop through Stars

	            // Set the geolocation flag so we can rotate just before the Prim is added to the Shader.

	            prim.geolocate = true;

	            // Push the (single) Material start and length for this kind of Prim.

	            m.options.matStarts.push([this.materialPool.createDefaultName(prim.name), 0, tIndices.length]);

	            m.vertices = tVertices, m.indices = tIndices, m.texCoords = tTexCoords, m.normals = tNormals, m.colors = tColors; // use the color array

	            return m;
	        }

	        /** 
	         * Add a model
	         * @param {Prim} prim the requesting Prim object.
	         * @param {Object} data data to construct the Prim GeometryBuffer.
	         * @param {String} path the file path to the object.
	         * @param {Number} pos the index of the object in the calling Prim's array.
	         * @param {String} mimeType the MIME type of the file.
	         * @param {String} type the GeometryPool.typeList type of the object, e.g. MESH, SPHERE...
	         */

	    }, {
	        key: 'addModel',
	        value: function addModel(prim, data, path, mimeType, options) {

	            //let d;

	            var fType = this.util.getFileExtension(path);

	            var d = null,
	                emitEvent = '';

	            switch (fType) {

	                case 'obj':

	                    // Return a Model object.

	                    d = this.computeObjMesh(data, prim, path); // ADDS LOTS OF STUFF TO 'd'

	                    // Not supplied by OBJ format.

	                    d.tangents = [];

	                    d.colors = [];

	                    emitEvent = this.util.emitter.events.OBJ_GEOMETRY_READY;

	                    break;

	                case 'gltf':

	                    d = this.computeGlTFMesh(data, prim, path);

	                    emitEvent = this.util.emitter.events.GLTF_GEOMETRY_READY;

	                    break;

	                case 'gltfbinary':

	                    d = this.computeGlTFBinaryMesh(data, prim, path);

	                    emitEvent = this.util.emitter.events.GLTF_GEOMETRY_READY;

	                    break;

	                case 'hyg':
	                    // stardome or 3d stars

	                    prim.drawTris = false, prim.drawLines = false, prim.drawPoints = true;

	                    /* 
	                     * OPTIONS.xyz is assigned by GeometryPool as true for 
	                     * typeList.STAR3D, false for typeList.STARDOME. HYG data contains 
	                     * both spherical (RA and Dec) coordinates, as well as Cartesian coords.
	                     */

	                    d = this.computeHyg(data, prim, path, options);

	                    emitEvent = this.util.emitter.events.HYG_GEOMETRY_READY;

	                    break;

	                default:

	                    console.warn('ModelPool::addModel(): unknown model file:' + path + ' MIME type:' + mimeType);

	                    break;

	            }

	            /* 
	             * We save references to the model object in ModelPool.
	             * NOTE: .addAsset() puts the assigned key by ModelPool into our object.
	             */

	            if (d) {

	                d.type = prim.type, d.path = path, d.emits = emitEvent;

	                /*
	                 * Model format which must be returned by Mesh or procedural geometry creation.
	                 * {
	                 *   vertices: vertices,
	                 *   indices: indices,
	                 *   texCoords: texCoords,
	                 *   normals: normals,
	                 *   options: options (start points for objects, groups, smoothingGroups, etc),
	                 *   type: type,
	                 *   path: file path
	                 * }
	                */
	            } else {

	                console.warn('ModelPool::addModel(): no model returned by addModel() + ' + mimeType + ' function');
	            }

	            return this.addAsset(d);
	        }

	        /** 
	         * Load models, using a list of paths. If a Model already exists, 
	         * just return it. Otherwise, do the load.
	         * @param {String} path the URL to load.
	         * @param {Boolean} cacheBust if true, add a http://url?random query string to request.
	         */

	    }, {
	        key: 'getModel',
	        value: function getModel(prim, path) {
	            var _this3 = this;

	            var cacheBust = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { pos: 0 };


	            // Check if model is already in asset pool, use it if it is. Define unique models by their PATH.

	            var modelObj = this.pathInList(path);

	            if (modelObj !== null) {

	                this.util.emitter.emit(modelObj.emits, prim, modelObj.key, options);

	                return;
	            }

	            // Could have an empty path.

	            if (!this.util.isWhitespace(path)) {

	                // Get the file mimeType.

	                var mimeType = this.modelMimeTypes[this.util.getFileExtension(path)];

	                // check if mimeType is OK.

	                if (mimeType) {

	                    this.doRequest(path, options.pos, function (updateObj) {

	                        /* 
	                         * updateObj returned from GetAssets has the following structure:
	                         * { 
	                         *   pos: pos, 
	                         *   path: requestURL, 
	                         *   data: null|response, (Blob, Text, JSON, FormData, ArrayBuffer)
	                         *   error: false|response 
	                         * } 
	                         */

	                        ////////console.log( 'ModelPool::getModel(): OBJ file:' + path + ' returned model for:' + prim.name );

	                        // load a Model file. the 'options' may contain special instructions for computing model data differently (e.g. stardome vs 3d stars).

	                        if (updateObj.data) {

	                            var _modelObj = _this3.addModel(prim, updateObj.data, updateObj.path, mimeType, options);

	                            if (_modelObj) {

	                                /* 
	                                 * XX_GEOMETRY_READY event, with additional data referencing sub-groups of the model.
	                                 * NOTE: options (e.g. starts of groups, materials, smoothing groups) are attached to modelObj.
	                                 * NOTE: we recover the modelObj by its key in PrimFactory.
	                                 * See this.addModel() above for more information.
	                                 */

	                                _this3.util.emitter.emit(_modelObj.emits, prim, _modelObj.key, options); ///////////TODO: COMPARE TO PROCEDUAR GEO EMIT
	                            } else {

	                                console.error('ModelPool::getModel():' + +_this3.util.getFileExtension(path) + ' file path:' + path + ' could not be parsed');
	                            }
	                        } else {

	                            console.error('ModelPool::getModel(): ' + _this3.util.getFileExtension(path) + ' file, no data found for:' + updateObj.path);
	                        }
	                    }, cacheBust, mimeType, 0); // end of this.doRequest(), initial request at 0 tries
	                } else {

	                    console.error('ModelPool::getModel(): file type "' + this.util.getFileExtension(path) + '" in:' + path + ' not supported, not loading');
	                }
	            } else {

	                console.warn('ModelPool::getModel(): no path supplied for prim:' + prim.name);
	            } // end of valid path
	        }
	    }]);

	    return ModelPool;
	}(_assetPool2.default);

	exports.default = ModelPool;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _assetPool = __webpack_require__(19);

	var _assetPool2 = _interopRequireDefault(_assetPool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var TexturePool = function (_AssetPool) {
	    _inherits(TexturePool, _AssetPool);

	    /** 
	     * @class
	     * Manage texture assets, similar to ModelPool
	     * @constructor
	     * @param {Boolean} init if true, initialize immediately.
	     * @param {Util} util utility methods.
	     * @param {WebGL} webgl the WebGL object.
	     */
	    function TexturePool(init, util, webgl) {
	        _classCallCheck(this, TexturePool);

	        console.log('in TexturePool');

	        // Initialize superclass.

	        var _this = _possibleConstructorReturn(this, (TexturePool.__proto__ || Object.getPrototypeOf(TexturePool)).call(this, util));

	        _this.util = util, _this.webgl = webgl, _this.textureMimeTypes = {

	            'png': 'image/png',

	            'jpg': 'image/jpeg',

	            'jpeg': 'image/jpeg',

	            'gif': 'image/gif'

	        },

	        /* 
	         * TODO: COMPRESSED TEXTURES
	         * DXT: supported by all desktop devices and some Android devices
	         * PVR: supported by all iOS devices and some Android devices
	         * ETC1: supported by most Android devices
	         * @link https://github.com/toji/texture-tester/blob/master/js/webgl-texture-util.js
	         * @link https://github.com/toji/webgl-texture-utils
	         */

	        // Default texture pixel.

	        _this.greyPixel = new Uint8Array([128, 128, 128, 255]);

	        _this.transparentPixel = new Uint8Array([0, 0, 0, 0]);

	        if (init) {

	            // Create and store a default texture (one greyPixel, one transparent pixel).

	            var gl = webgl.getContext();

	            _this.defaultKey = _this.addAsset(_this.default(null, null, gl.TEXTURE_2D, null, _this.create2dTexture(), null)).key;

	            _this.transparentKey = _this.addAsset(_this.default(null, null, gl.TEXTURE_2D, null, _this.create2dTexture(), null)).key;
	        }

	        return _this;
	    }

	    /** 
	     * Create the default TexturePool object.
	     * @param {Image} image the image providing texture data (if present).
	     * @param {MimeType} the MIME type of the Image.
	     * @param {GLTextureType} gl.TEXTURE_2D, gl.TEXTURE_3D...
	     * @param {String} path the path to the Image file, if present.
	     * @param {WebGLTexture} the WebGL texture buffer.
	     * @param {Emitter.events} the Emitter event for this texture.
	     * @returns {Object} the Texture object for our TexturePool.
	     */


	    _createClass(TexturePool, [{
	        key: 'default',
	        value: function _default() {
	            var image = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	            var mimeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	            var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	            var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	            var texture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
	            var emitEvent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;


	            return {

	                image: image, // JavaScript Image object.

	                mimeType: mimeType, // image/png, image/jpg...

	                type: type, // gl.TEXTURE_2D, gl.TEXTURE_3D...

	                path: path, // URL of object, should uniquely identify the texture.

	                texture: texture, // WebGLTexture

	                emits: emitEvent // emitted event

	            };
	        }

	        /* 
	         * ---------------------------------------
	         * TEXTURE CREATION BY TYPE
	         * ---------------------------------------
	         */

	        /** 
	         * Create a new WebGL texture object.
	         * @param {Image} image a JS Image object.
	         * @param {String} key a numeric or text key referencing this texture in the load pool.
	         * @param {Number} compressed the parameter identifying a compressed texture, e.g. gl.COMPRESSED_RGBA8_ETC2_EAC.
	         */

	    }, {
	        key: 'create2dTexture',
	        value: function create2dTexture(image, compressed) {

	            var gl = this.webgl.getContext(),
	                texture = gl.createTexture();

	            // Flip the image's Y axis to match the WebGL texture coordinate space.

	            // TODO: FF says this is deprecated! This flips our texture

	            // TODO: change our texture coords calculations!

	            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

	            // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

	            // gl.pixelStorei( gl.UNPACK_ALIGNMENT, true );

	            // Bind the texture data to the videocard, receive a WebGL texture in our textureObject.

	            gl.bindTexture(gl.TEXTURE_2D, texture);

	            if (image instanceof HTMLImageElement) {
	                // Standard image

	                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image); // HASN'T LOADED YET
	            } else if (image instanceof Uint8Array && image.length) {

	                var sz = Math.sqrt(image.length / 4);

	                if (sz % 1 === 0) {
	                    // texture defined by an array, 1x1, 2x2, etc.

	                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sz, sz, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
	                }
	            } else {
	                // Default to single-pixel texture

	                console.warn('TexturePool::create2DTexture(): no image (' + image + '), using default pixel texture');

	                image = { width: 1, height: 1 }; // kludge image structure for isPowerOfTwo test below

	                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.greyPixel);
	            }

	            // Generate mipmaps if we are a power of 2 texture.

	            if (this.util.isPowerOfTwo(image.width) && this.util.isPowerOfTwo(image.height)) {

	                //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR );

	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);

	                gl.generateMipmap(gl.TEXTURE_2D);
	            } else {

	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	            }

	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	            gl.bindTexture(gl.TEXTURE_2D, null);

	            return texture;
	        }

	        /** 
	         * Upload a 3d texture.
	         * @param {Blob} data image data in Blob format.
	         * @param {String} key the associative key for this texture in the pool.
	         * @param {Number} compressed the parameter identifying a compressed texture, e.g. gl.COMPRESSED_RGBA8_ETC2_EAC.
	         * @param {Number} size the size of the image, in bytes.
	         */

	    }, {
	        key: 'create3dTexture',
	        value: function create3dTexture(data, compressed, size) {

	            console.log('creating 3D texture');

	            var gl = this.webgl.getContext(),
	                texture = gl.createTexture();

	            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

	            // Bind the texture data to the videocard, receive a WebGL texture in our textureObject.

	            gl.bindTexture(gl.TEXTURE_3D, texture);

	            // Use JS Image object, or default to single-color texture if image is not present.

	            if (image) {

	                gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_BASE_LEVEL, 0);

	                gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAX_LEVEL, Math.log2(size));

	                gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

	                gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

	                gl.texImage3D(gl.TEXTURE_3D, // target

	                0, // level

	                gl.R8, // internalformat

	                data.width, // width

	                data.height, // height

	                data.depth, // depth

	                0, // border

	                gl.RED, // format

	                gl.UNSIGNED_BYTE, // data type

	                data // data pixels

	                );
	            } else {

	                console.error('TexturePool::create2DTexture(): no data (' + data + '), for 3d, giving up');
	            }

	            // Generate mipmaps.

	            gl.generateMipmap(gl.TEXTURE_3D);

	            gl.bindTexture(gl.TEXTURE_3D, null);

	            return texture;
	        }

	        /** 
	         * Upload a cubemap texture. Note that this can't be called unless a cubemap set 
	         * is available. Typically called by a Prim using a cubemap after all the cubemap textures 
	         * have been loaded.
	         * @param {Blob} data image data in Blob format.
	         * @param {Number} size the size of the image, in bytes.
	         * @param {String} key the associative key for this texture in the pool.
	         * @param {Number} compressed the parameter identifying a compressed texture, e.g. gl.COMPRESSED_RGBA8_ETC2_EAC.
	         */

	    }, {
	        key: 'createCubeMapTexture',
	        value: function createCubeMapTexture(images, compressed) {

	            console.log('creating cubemap texture');

	            var gl = this.webgl.getContext(),
	                texture = gl.createTexture();

	            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

	            // Bind the texture data to the videocard, receive a WebGL texture in our textureObject.

	            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

	            // Use JS Image object, or default to single-color texture if image is not present.

	            if (images) {

	                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

	                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, format, format, type, images.pos.x), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, format, format, type, images.pos.y), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, format, format, type, images.pos.z), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, format, format, type, images.neg.x), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, format, format, type, images.neg.y), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, format, format, type, images.neg.z);
	            } else {

	                console.error('TextureObj::create2DTexture(): no data (' + images + '), for cubemap, giving up');
	            }

	            gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

	            return texture;
	        }

	        // To add textures, use super.addRequests() or super.doRequest()

	        /** 
	         * Create a WebGL texture from a JavaScript Image object, and add it to our texture list.
	         * @param {Image} image a JS Image object with defined .src
	         * @param {String} path the file URL for the texture.
	         * @param {String} mimeType the MIME type of the image
	         * @param {Number} glTextureType the WebGL texture type (e.g. TEXTURE_2D, TEXTURE_CUBE_MAP).
	         * @param {Object} any additional params.
	         */

	    }, {
	        key: 'addTexture',
	        value: function addTexture(prim, image, path, mimeType, glTextureType) {

	            var gl = this.webgl.getContext();

	            if (!glTextureType) {

	                glTextureType = gl.TEXTURE_2D;
	            }

	            var texture = null,
	                emitEvent = '';

	            switch (glTextureType) {

	                case gl.TEXTURE_2D:

	                    texture = this.create2dTexture(image);

	                    emitEvent = this.util.emitter.events.TEXTURE_2D_READY;

	                    break;

	                case gl.TEXTURE_3D:

	                    texture = this.create3dTexture(image);

	                    emitEvent = this.util.emitter.events.TEXTURE_3D_READY;

	                    break;

	                case gl.TEXTURE_CUBE_MAP:

	                    texture = this.createCubeMapTexture(image); // NOTE: image is actually an array here

	                    emitEvent = this.util.emitter.events.TEXTURE_CUBE_MAP_MEMBER_READY;

	                    break;

	                default:

	                    console.warn('TexturePool::addTexture() for prim:' + prim.name + ' unsupported texture requested');

	                    break;

	            }

	            // If we got a texture, construct the output object for JS.

	            if (texture) {

	                /* 
	                 * We save references to the texture object in TexturePool.
	                 * NOTE: .addAsset() also puts the assigned key by TexturePool into our object.
	                 */

	                return this.addAsset(this.default(image, mimeType, glTextureType, path, texture, emitEvent));
	            } else {

	                console.warn('TexturePool::addTexture(): no texture returned by createXXTexture() function');
	            }

	            return null;
	        }

	        /** 
	         * Load textures, using a list of paths.
	         * NOTE: textures in a single pathList will be loaded in parallel, so redundant textures 
	         * are not checked for.
	         * @param {Array[String]} pathList a list of URL paths to load, or keys referencing our pool.
	         * @param {Boolean} cacheBust if true, add a http://url?random query string to request.
	         * @param {Boolean} keepDOMImage if true, keep the Image object we created the texture from (internal Blob).
	         * @param {WebGL.TEXTURE} textureType a WebGL-enumerated texture type (TEXTURE_2D, TEXTURE_3D...), default TEXTURE_2D.
	         * @param {Object} options if present, additional options loading or rendering the texture.
	         */

	    }, {
	        key: 'getTexture',
	        value: function getTexture(prim, path) {
	            var cacheBust = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	            var keepDOMImage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	            var _this2 = this;

	            var glTextureType = arguments[4];
	            var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : { pos: 0 };


	            // Wrap single strings in an Array.

	            // If no textureType defined, default to 2D texture.

	            if (!glTextureType) {

	                glTextureType = this.webgl.gl.TEXTURE_2D;
	            }

	            // Check if texture is already in asset pool, use it if it is. Define by PATH.

	            var textureObj = this.pathInList(path);

	            if (textureObj !== null) {

	                // Use a pool texture if available. Generally won't be ready within a Prim, but useful for Prims sharing textures.

	                console.log('TexturePool::getTexture(): found texture ' + path + ' in pool, using it...');

	                this.util.emitter.emit(this.util.emitter.events.TEXTURE_2D_READY, prim, this.defaultKey, options);

	                return;
	            }

	            ////////if ( options.fromObj ) console.warn( 'TexturePool::getTexture(): getting texture from OBJ file ' + path + ' for:' + prim.name)

	            // Get texture from .OBJ file (could have an empty path).

	            if (!this.util.isWhitespace(path)) {

	                // Get the image mimeType.

	                var mimeType = this.textureMimeTypes[this.util.getFileExtension(path)];

	                // check if mimeType is OK.

	                if (mimeType) {

	                    /* 
	                     * Use Fetch API to load the image, wrapped in a Promise timeout with 
	                     * multiple retries possible (in parent class GetAssets). Return a 
	                     * response.blob() for images, and add to DOM or WebGL texture here. 
	                     * We apply the Blob data to a JS image to decode. Since this may not 
	                     * be instant, we catch the .onload event to actually send the WebGL texture.
	                     */

	                    this.doRequest(path, options.pos, function (updateObj) {

	                        /* 
	                         * updateObj returned from GetAssets has the following structure:
	                         * { 
	                         *   pos: pos, 
	                         *   path: requestURL, 
	                         *   data: null|response, (Blob, Text, JSON, FormData, ArrayBuffer)
	                         *   error: false|response 
	                         * } 
	                         */

	                        var image = new Image();

	                        // Blob data type requires Image .onload for processing.

	                        image.onload = function () {

	                            // Create a WebGLTexture from the Image (left off 'type' for gl.TEXTURE type).

	                            // Add the texture.

	                            //console.log('-----------adding texture ' + path + ' to ' + prim.name)

	                            if (options.fromObj) console.warn('TexturePool::getTexture(): adding OBJ texture:' + path + ' to ' + prim.name);

	                            var textureObj = _this2.addTexture(prim, image, updateObj.path, mimeType, glTextureType);

	                            if (textureObj) {

	                                if (!keepDOMImage) {

	                                    //document.body.appendChild( image );

	                                    // Remove the Blob URL

	                                    window.URL.revokeObjectURL(image.src);

	                                    // Kill the reference to our local Image and its (Blob) data.

	                                    textureObj.image = null;

	                                    // If you want to add to DOM, do so here.
	                                }

	                                /*
	                                 * Emit a 'texture ready event' with the key in the pool and path (intercepted by PrimFactory).
	                                 * NOTE: options for each texture's rendering are attached to textureObj.
	                                 * NOTE: in PrimFactory, we recover textureObj by its key in TexturePool.
	                                 */

	                                _this2.util.emitter.emit(textureObj.emits, prim, textureObj.key, options);
	                            } else {

	                                console.error('TexturePool::getTexture(): file:' + path + ' could not be parsed');

	                                _this2.util.emitter.emit(_this2.util.emitter.events.TEXTURE_2D_READY, prim, _this2.defaultKey, options);
	                            }
	                        }; // end of image.onload callback

	                        // Create a URL to the Blob, and fire the onload event (internal browser URL instead of network).

	                        if (updateObj.data) {

	                            image.src = window.URL.createObjectURL(updateObj.data);
	                        } else {

	                            // Put a single-pixel texture in its place.

	                            _this2.util.emitter.emit(_this2.util.emitter.events.TEXTURE_2D_READY, prim, _this2.defaultKey, options);

	                            console.error('TexturePool::getTexture(): invalid image data for prim:' + prim.name + 'path:' + updateObj.path + ' data:' + updateObj.data);
	                        }
	                    }, cacheBust, mimeType, 0); // end of this.doRequest(), initial request at 0 tries
	                } else {

	                    console.error('TexturePool::getTexture(): file type "' + this.util.getFileExtension(path) + '" in:' + path + ' not supported, not loading');

	                    // Put a single-pixel texture in its place.

	                    this.util.emitter.emit(this.util.emitter.events.TEXTURE_2D_READY, prim, this.defaultKey, options);
	                }
	            } else {

	                console.warn('TexturePool::getTexture(): empty path supplied for prim ' + prim.name);
	            } // end of valid path

	            //} // end of for loop for texture paths
	        }
	    }]);

	    return TexturePool;
	}(_assetPool2.default);

	exports.default = TexturePool;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _assetPool = __webpack_require__(19);

	var _assetPool2 = _interopRequireDefault(_assetPool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var AudioPool = function (_AssetPool) {
	    _inherits(AudioPool, _AssetPool);

	    /** 
	     * @class
	     * audio resources
	     * @constructor
	     * Create an audio pool.
	     * @param {Boolean} init if true, initialize immediately.
	     * @param {Util} util utility methods.
	     * @param {WebGL} webgl the webgl module.
	     */
	    function AudioPool(init, util, webgl) {
	        _classCallCheck(this, AudioPool);

	        var _this = _possibleConstructorReturn(this, (AudioPool.__proto__ || Object.getPrototypeOf(AudioPool)).call(this, init, util, webgl));

	        if (init) {

	            // do something

	        }

	        return _this;
	    }

	    return AudioPool;
	}(_assetPool2.default);

	exports.default = AudioPool;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GeometryBuffer = function () {

	    /** 
	     * @class
	     * Create an object from a Prim which may be used by our Shader objects.
	     * Create WebGL buffers from flattened vertex, index, texture and other coordinate data.
	     * @constructor
	     * @param {Util} util shared utility methods, patches, polyfills.
	     * @param {WebGL} webgl object holding the WebGLRenderingContext.
	     */
	    function GeometryBuffer(name, util, webgl, type) {
	        _classCallCheck(this, GeometryBuffer);

	        this.primName = name, this.webgl = webgl, this.util = util, this.FLOAT32 = 'float32', this.UINT = 'uint';

	        this.UINT32 = 'uint32';

	        this.UINT16 = 'uint16';

	        this.makeBuffers = true, this.vertices = {

	            data: [],

	            buffer: null,

	            itemSize: 3,

	            numItems: 0

	        }, this.indices = { // where to start drawing GL_TRIANGLES.

	            data: [],

	            buffer: null,

	            itemSize: 1,

	            numItems: 0

	        }, this.sides = { // a collection of triangles creating a side on the shape.

	            data: [],

	            buffer: null,

	            itemSize: 3,

	            numItems: 0

	        }, this.normals = {

	            data: [],

	            buffer: null,

	            itemSize: 3,

	            numItems: 0

	        }, this.tangents = {

	            data: [],

	            buffer: null,

	            itemSize: 4,

	            numItems: 0

	        }, this.texCoords = {

	            data: [],

	            buffer: null,

	            itemSize: 2,

	            numItems: 0

	        }, this.colors = {

	            data: [],

	            buffer: null,

	            itemSize: 4,

	            numItems: 0

	        };

	        this.pointSizes = {

	            data: [],

	            buffer: null,

	            itemSize: 1,

	            numItems: 0

	        };

	        this.valid = false;

	        // Save the max allowed drawing size. For WebGL 1.0 with extension, vertices must be < 65k.

	        this.MAX_DRAWELEMENTS = this.webgl.MAX_DRAWELEMENTS;

	        this.mName = this.primName + ' GeometryBuffer::';
	    } // end of constructor


	    /* 
	     * If we are limited to 65k drawing, split up our arrays, and re-index our index array
	     * so the indices are always gl.UNSIGNED_SHORT. Use on old WebGL distributions.
	     */


	    _createClass(GeometryBuffer, [{
	        key: 'splitBuffers',
	        value: function splitBuffers() {}

	        // TODO: split buffers

	        // TODO: create multiple indices

	        // TODO: package in new WebGL buffer structure.

	        /** 
	         * Confirm that data is a number.
	         * @param {Array} data the data array
	         * @param {String} dataType the type (FLOAT32, UINT16, UINT32, UINT)
	         * @param {String} arrName the name of the array.
	         */

	    }, {
	        key: 'confirmNumericalData',
	        value: function confirmNumericalData(data, dataType, arrName) {

	            var len = data.length;

	            for (var i = 0; i < len; i++) {

	                var d = data[i];

	                switch (dataType) {

	                    case this.FLOAT32:

	                        if (!Number.isFinite(parseFloat(d))) {

	                            console.error(this.mName + 'confirmNumericalData(): invalid float32 in ' + arrName + ' at pos:' + i + ' = ' + d);

	                            return false;
	                        }

	                        break;

	                    case this.UINT16:
	                    case this.UINT32:
	                    case this.UINT:

	                        if (!Number.isFinite(parseInt(d))) {

	                            console.error(this.mName + 'confirmNumericalData(): invalid Uint in ' + arrName + ' at pos:' + i + ' = ' + d);

	                            return false;
	                        }

	                        break;

	                    default:

	                        console.error(this.mName + ' confirmNumericalData(): unknown data type ' + dataType + ' for:' + arrName);

	                        return false;

	                        break;

	                }
	            }

	            return true;
	        }

	        /** 
	         * Check integrity of vertex data
	         * @param {Boolean} complete it true, do all the tests.
	         */

	    }, {
	        key: 'checkVertexData',
	        value: function checkVertexData(complete) {

	            var fnName = this.mName + ' checkVertexData():'; // so many error messages we use this.

	            var len = this.vertices.data.length;

	            var numVertices = this.numVertices();

	            if (len < this.vertices.itemSize || this.util.frac(numVertices) !== 0) {

	                console.error(fnName + ' invalid vertex size, ' + numVertices);

	                return false;
	            } else if (len > this.MAX_DRAWELEMENTS) {

	                console.error(fnName + ' vertex size exceeds 64k on hardware not supporting it');

	                return false;
	            }

	            if (complete) {

	                if (!this.confirmNumericalData(this.vertices.data, this.FLOAT32, 'vertices')) {

	                    return false;
	                }
	            }

	            return numVertices; // number of vertices (not array length)
	        }

	        /** 
	         * Check integrity of index data.
	         * @param {Boolean} complete it true, do all the tests.
	         */

	    }, {
	        key: 'checkIndexData',
	        value: function checkIndexData(complete) {

	            var fnName = this.mName + ' checkIndexData():'; // so many error messages we use this.

	            var len = this.numIndices(),
	                vLen = this.numVertices();

	            if (len < this.indices.itemSize) {
	                // can be fractional

	                console.error(fnName + ' invalid index size, ' + len);

	                return false;
	            }

	            if (complete) {

	                // Make sure we have a valid number

	                if (!this.confirmNumericalData(this.indices.data, this.UINT, 'indices')) {

	                    return false;
	                }

	                // Make sure indices point to valid vertex.

	                var d = this.indices.data;

	                for (var i = 0; i < len; i++) {

	                    var di = d[i];

	                    if (di < 0 || di > vLen) {

	                        console.error(fnName + ' index at ' + i + ' points to invalid postion in vertices ' + di + ', max:' + vLen);

	                        return false;
	                    }
	                }
	            }

	            return len; // number of indices
	        }

	        /** 
	         * Check the number of sides (triangles) 
	         * @param {Boolean} complete it true, do all the tests.
	         */

	    }, {
	        key: 'checkFacesData',
	        value: function checkFacesData(complete) {

	            // TODO: first check 3-sided faces (triangles).

	            // TODO: then check non-triangle larger drawing faces defined on the object.

	            // Make sure we have a valid number of Faces (triangles)

	            var len = this.numFaces();

	            if (!len) {

	                console.error(fnName + ' number of sides (triangles) is invalid');

	                return false;
	            }

	            return len;
	        }

	        /** 
	         * Normals check (assumed always present for drawing).
	         * @param {Boolean} complete it true, do all the tests.
	         */

	    }, {
	        key: 'checkNormalsData',
	        value: function checkNormalsData(complete) {

	            var fnName = this.mName + ' checkNormalsData():'; // so many error messages we use this.

	            var numVertices = this.numVertices(),
	                len = this.numNormals();

	            if (len < this.normals.itemSize || this.util.frac(len) !== 0) {

	                console.error(fnName + ' invalid normals size, ' + len);

	                return false;
	            } else if (len !== numVertices) {

	                console.error(fnName + ' normals length: ' + this.numNormals() + ' does not match vertices length: ' + this.numVertices());

	                return false;
	            }

	            if (complete) {

	                if (!this.confirmNumericalData(this.normals.data, this.FLOAT32, 'normals')) {

	                    return false;
	                }
	            }

	            return len;
	        }

	        /** 
	         * Check texture coordinate data.
	         * @param {Boolean} complete it true, do all the tests.
	         */

	    }, {
	        key: 'checkTexCoordsData',
	        value: function checkTexCoordsData(complete, texCoords) {

	            var fnName = this.mName + ' checkTexCoordsData():'; // so many error messages we use this.

	            var numVertices = this.numVertices(),
	                tc = texCoords || this.texCoords,
	                // allows handling multiple texCoord buffers.

	            len = this.numTexCoords(tc);

	            if (len > 0) {

	                if (len < tc.itemSize || this.util.frac(len) !== 0) {

	                    console.error(fnName + ' invalid texCoords size, ' + tc.data.length);

	                    return false;
	                } else if (len !== numVertices) {

	                    console.error(fnName + ' texCoords length: ' + this.numTexCoords(tc) + ' does not match vertices length: ' + this.numVertices());

	                    return false;
	                }
	            } else {

	                console.warn(fnName + ' no texCoords data defined.');
	            }

	            if (complete) {

	                if (!this.confirmNumericalData(tc.data, this.FLOAT32, 'texCoords')) {

	                    return false;
	                }
	            }

	            return len;
	        }

	        /** 
	         * Check tangent data.
	         * @param {Boolean} complete it true, do all the tests.
	         */

	    }, {
	        key: 'checkTangentsData',
	        value: function checkTangentsData(complete) {

	            var fnName = this.mName + ' checkTangentsData():'; // so many error messages we use this.

	            var numVertices = this.numVertices(),
	                len = this.numTangents();

	            if (len > 0) {

	                if (len < this.tangents.itemSize || this.util.frac(len) !== 0) {

	                    console.error(fnName + ' invalid tangents size, ' + len);

	                    return false;
	                } else if (len !== numVertices) {

	                    console.error(fnName + ' tangents length ' + this.numTangents() + ' does not match vertices length: ' + this.numVertices());

	                    return false;
	                }
	            } else {

	                console.warn(fnName + ' no tangents data defined.');
	            }

	            if (complete) {

	                if (!this.confirmNumericalData(this.tangents.data, this.FLOAT32, 'tangents')) {

	                    return false;
	                }
	            }

	            return len;
	        }

	        /**
	         * Check color data.
	         * @param {Boolean} complete it true, do all the tests.
	         */

	    }, {
	        key: 'checkColorsData',
	        value: function checkColorsData(complete) {

	            var fnName = this.mName + ' checkColorsData():'; // so many error messages we use this.

	            var numVertices = this.numVertices(),
	                len = this.numColors();

	            if (len > 0) {

	                if (len < this.colors.itemSize || this.util.frac(len) !== 0) {

	                    console.error(fnName + ' invalid colors size, ' + this.colors.data.length);

	                    return false;
	                } else if (len !== numVertices) {

	                    console.error(fnName + ' colors length: ' + this.numColors() + ' does not match vertices length:' + this.numVertices());

	                    return false;
	                }
	            } else {

	                console.warn(fnName + ' no colors data defined.');
	            }

	            if (complete) {

	                if (!this.confirmNumericalData(this.colors.data, this.FLOAT32, 'colors')) {

	                    return false;
	                }
	            }

	            return len;
	        }

	        /** 
	         * Check validity of buffer data.
	         * @param {Boolean} complete if true, do extra checks.
	         * @returns {Boolean} if buffers ok to use, return true, else false.
	         */

	    }, {
	        key: 'checkBufferData',
	        value: function checkBufferData(complete) {

	            var valid = this.valid = true;

	            var len = this.vertices.data.length;

	            var vLen = len; // used in indices checks

	            var fnName = this.mName + ' checkBufferData():'; // so many error messages we use this.

	            // Vertex check.

	            if (this.checkVertexData(true) && this.checkIndexData(true) && this.checkNormalsData(true) && this.checkTexCoordsData(true) && this.checkTangentsData(true) && this.checkColorsData(true)) {

	                return true;
	            }

	            console.warn(this.mName + 'checkBufferData() buffers not ok');

	            return false;
	        }

	        /** 
	         * Returns the number of vertex points.
	         * @returns {Number} the number of vertices.
	         */

	    }, {
	        key: 'numVertices',
	        value: function numVertices() {

	            return this.vertices.data.length / this.vertices.itemSize;
	        }

	        /** 
	         * Returns the number of indices.
	         * @returns {Number} the number of indices.
	         */

	    }, {
	        key: 'numIndices',
	        value: function numIndices() {

	            return this.indices.data.length;
	        }

	        /** 
	         * Returns the number of normals.
	         * @returns {Number} the number of normals.
	         */

	    }, {
	        key: 'numNormals',
	        value: function numNormals() {

	            return this.normals.data.length / this.normals.itemSize;
	        }

	        /** 
	         * Returns the number of texture coordinates.
	         * @param {glMatrix.vec2[] texCoords} use if defined, else default to this.texCoords buffer.
	         * @returns {Number} the number of texture coordinates.
	         */

	    }, {
	        key: 'numTexCoords',
	        value: function numTexCoords(texCoords) {

	            // Since we can have multiple texCoords, condtional.

	            var tc = texCoords || this.texCoords;

	            return tc.data.length / tc.itemSize;
	        }

	        /** 
	         * Returns the number of tangents.
	         * @returns {Number} the number of texture coordinates.
	         */

	    }, {
	        key: 'numTangents',
	        value: function numTangents() {

	            return this.tangents.data.length / this.tangents.itemSize;
	        }
	    }, {
	        key: 'numColors',
	        value: function numColors() {

	            return this.colors.data.length / this.colors.itemSize;
	        }

	        /** 
	         * Returns the number of faces (triangles).
	         * @returns {Number} the number of faces.
	         */

	    }, {
	        key: 'numFaces',
	        value: function numFaces() {

	            var len = this.indices.length / 3;

	            if (this.util.frac(len / this.tangents.itemSize !== 0)) {

	                console.error(this.mName + 'numFaces(): fractional number of faces');
	            }

	            return len;
	        }

	        /** 
	         * Returns the number of sides (many Prims have only one).
	         * @returns {Number} the number of sides.
	         */

	    }, {
	        key: 'numSides',
	        value: function numSides() {

	            console.warn(this.mName + 'numSides(): sides not implemented yet');

	            return 0;
	        }

	        /** 
	         * Returns the number of coordinates for ALL buffers as a sum.
	         * use to compute if we are 'dirty' and need to run this.createGLBuffers();
	         * @returns {Number} total size of ALL buffers.
	         */

	    }, {
	        key: 'numCoords',
	        value: function numCoords() {

	            return this.numVertices() + this.numIndices() + this.numNormals() + this.numTangents() + this.numColors();
	        }

	        /** 
	         * Set or reset the vertices.
	         * @param {glMatrix.vec3[]} vertices a flattened vertex array.
	         */

	    }, {
	        key: 'setVertices',
	        value: function setVertices(vertices) {

	            var o = this.vertices;

	            if (this.util.isArray(vertices)) {

	                o.data = new Float32Array(vertices);

	                o.numItems = vertices.length / o.itemSize;

	                this.bindGLBuffer(o, this.FLOAT32);
	            } else {

	                console.warn(this.mName + 'setVertices() invalid input, not Array, nothing set');
	            }
	        }

	        /** 
	         * Set or reset the indices.
	         * @param {Array} indices a flattened index array.
	         */

	    }, {
	        key: 'setIndices',
	        value: function setIndices(indices) {

	            var o = this.indices;

	            if (this.util.isArray(indices)) {

	                if (this.webgl.stats.uint32) {

	                    o.data = new Uint32Array(indices);

	                    this.bindGLBuffer(o, this.UINT32);
	                } else {

	                    o.data = new Uint16Array(indices);

	                    this.bindGLBuffer(o, this.UINT16);
	                }
	            } else {

	                console.warn(this.mName + 'setIndices() invalid input, not Array, nothing set');
	            }
	        }

	        /** 
	         * Set or reset the normals.
	         * @param {glMatrix.vec3[]} normals a flattened normals array.
	         */

	    }, {
	        key: 'setNormals',
	        value: function setNormals(normals) {

	            var o = this.normals;

	            if (this.util.isArray(normals)) {

	                o.data = new Float32Array(normals);

	                o.numItems = normals.length / o.itemSize;

	                this.bindGLBuffer(o, this.FLOAT32);
	            } else {

	                console.error(this.mName + 'setNormals() invalid input, not Array');
	            }
	        }

	        /** 
	         * Set or reset the texture coordinates.
	         * @param {glMatrix.vec3[]} texCoords a flattened texture coordinate array.
	         */

	    }, {
	        key: 'setTexCoords',
	        value: function setTexCoords(texCoords) {

	            var o = this.texCoords;

	            if (this.util.isArray(texCoords)) {

	                o.data = new Float32Array(texCoords);

	                o.numItems = texCoords.length / o.itemSize;

	                this.bindGLBuffer(o, this.FLOAT32);
	            } else {

	                console.error(this.mName + 'setTexCoords() invalid input, not Array');
	            }
	        }

	        /** 
	         * Set or reset the colors.
	         * @param {glMatrix.vec4[]} vertices a flattened color array.
	         */

	    }, {
	        key: 'setColors',
	        value: function setColors(colors) {

	            var o = this.colors;

	            if (this.util.isArray(colors)) {

	                o.data = new Float32Array(colors);

	                o.numItems = colors.length / o.itemSize;

	                this.bindGLBuffer(o, this.FLOAT32);
	            } else {

	                console.error(this.mName + 'setTangents() invalid input, not Array');
	            }
	        }

	        /** 
	         * Set or reset the tangents.
	         * @param {glMatrix.vec3[]} vertices a flattened tangent array.
	         */

	    }, {
	        key: 'setTangents',
	        value: function setTangents(tangents) {

	            var o = this.tangents;

	            if (this.util.isArray(tangents)) {

	                o.data = new Float32Array(tangents);

	                o.numItems = tangents.length / o.itemSize;

	                this.bindGLBuffer(o, this.FLOAT32);
	            } else {

	                console.error(this.mName + 'setTangents() invalid input, not Array');
	            }
	        }
	    }, {
	        key: 'setBufferData',
	        value: function setBufferData() {
	            var vertices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	            var indices = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	            var normals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	            var texCoords = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
	            var tangents = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
	            var colors = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];


	            if (vertices.length > 0) {

	                this.setVertices(vertices);

	                console.log('numVertices is now:' + this.numVertices());
	            }

	            if (indices.length > 0) {

	                this.setIndices(indices);

	                console.log('numIndices is now:' + this.numIndices());
	            }

	            if (normals.length > 0) {

	                this.setNormals(normals);

	                console.log('numNormals is now:' + this.numNormals());
	            }

	            if (texCoords.length > 0) {

	                this.setTexCoords(texCoords);

	                console.log('numTexCoords is now:' + this.numTexCoords());
	            }

	            if (tangents.length > 0) {

	                this.setTangents(tangents);

	                console.log('numTangents is now:' + this.numTangents());
	            }

	            if (colors.length > 0) {

	                this.setColors(colors);

	                console.log('numColors is now:' + this.numColors());
	            }

	            if (this.vertices.data.length > this.webgl.MAX_DRAWELEMENTS) {

	                this.ssz = true;
	            } else {

	                this.ssz = false;
	            }
	        }

	        /** 
	         * Add data to existing data (e.g. combine two Prims into one).
	         * @param {glMatrix.vec3[]} vertices the position data.
	         * @param {Number} indices the index array for the vertices.
	         * @param {glMatrix.vec3[]} the normals array for the vertices.
	         * @param {glMatrix.vec2[]} the texture coordinates for the vertices.
	         * @param {glMatrix.vec4[]} the tangent coordinates for the vertices.
	         * @param {glMatrix.vec4[]} colors the colors array for the vertices.
	         * @param {Boolean} check if true, check the data for consistency, else do not.
	         */

	    }, {
	        key: 'addBufferData',
	        value: function addBufferData() {
	            var vertices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	            var indices = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	            var normals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	            var texCoords = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
	            var tangents = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
	            var colors = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
	            var check = arguments[6];


	            // Local reference to utility function.

	            var concat = this.util.concatArr;

	            // Current buffer size.

	            var currBufferSize = this.numCoords();

	            // Concat data, if present.

	            this.vertices.data = concat(this.vertices.data, vertices);

	            this.indices.data = concat(this.indices.data, indices), this.normals.data = concat(this.normals.data, normals), this.texCoords.data = concat(this.texCoords.data, texCoords), this.tangents.data = concat(this.tangents.data, tangents), this.colors.data = concat(this.colors.data, colors);

	            if (this.vertices.data.length > this.webgl.MAX_DRAWELEMENTS) {

	                this.ssz = true;
	            } else {

	                this.ssz = false;
	            }

	            // Reset WebGL buffers if size has changed.

	            if (currBufferSize !== this.numCoords()) {

	                this.createGLBuffers();
	            }

	            // If check flagged, make sure the data is valid for drawing by a Shader.

	            if (check) {

	                return this.checkBufferData();
	            }

	            return true;
	        }
	    }, {
	        key: 'clearData',
	        value: function clearData(c) {

	            c.data = [];
	        }
	    }, {
	        key: 'clearBuffer',
	        value: function clearBuffer(c) {

	            this.clearData(c), c.buffer = null, c.numItems = 0;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {

	            this.clearBuffer(this.vertices), this.clearBuffer(this.indices), this.clearBuffer(this.normals), this.clearBuffer(this.texCoords), this.clearBuffer(this.colors);
	        }

	        /** 
	         * Bind a WebGL buffer
	         * @param {Object} o the bufferObj for for particular array (e.g. vertex, tangent).
	         * @param {String} type the typed-array type.
	         */

	    }, {
	        key: 'bindGLBuffer',
	        value: function bindGLBuffer(o, type) {

	            var gl = this.webgl.getContext();

	            o.buffer = gl.createBuffer();

	            gl.bindBuffer(gl.ARRAY_BUFFER, o.buffer);

	            switch (type) {

	                case this.FLOAT32:

	                    if (o.data instanceof Float32Array) {

	                        gl.bufferData(gl.ARRAY_BUFFER, o.data, gl.STATIC_DRAW);
	                    } else {

	                        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(o.data), gl.STATIC_DRAW);
	                    }

	                    o.numItems = o.data.length / o.itemSize;

	                    break;

	                case this.UINT32:

	                    o.buffer = gl.createBuffer();

	                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.buffer);

	                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(o.data), gl.STATIC_DRAW);

	                    o.numItems = o.data.length / o.itemSize;

	                    break;

	                case this.UINT16:

	                    o.buffer = gl.createBuffer();

	                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.buffer);

	                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(o.data), gl.STATIC_DRAW);

	                    o.numItems = o.data.length / o.itemSize;

	                    break;

	                default:

	                    console.error(this.mName + 'bindGLBuffer(): invalid WebGL buffer type ' + type);

	                    break;

	            }
	        }

	        /** 
	         * Create (empty) WebGL buffers using geometry data. Note that the 
	         * size is for flattened arrays.
	         * an array of vertices, in glMatrix.vec3 objects.
	         * an array of indices for the vertices.
	         * an array of texture coordinates, in glMatrix.vec2 format.
	         * an array of normals, in glMatrix.vec3 format.
	         * an array of tangents, in glMatrix.vec3 format.
	         * an array of colors, in glMatrix.vec4 format.
	         */

	    }, {
	        key: 'createGLBuffers',
	        value: function createGLBuffers() {

	            var gl = this.webgl.getContext();

	            var fnName = this.mName + 'createGLBuffers():';

	            // Vertex Buffer Object.

	            var o = this.vertices;

	            if (!o.data.length) {

	                // console.log( fnName + ' no vertices present, creating default' );

	                o.data = new Float32Array();
	            }

	            this.bindGLBuffer(o, this.FLOAT32);

	            // Create the Index buffer.

	            o = this.indices;

	            /* 
	             * Conditionally create a UINT16 or UINT32 buffer for the index values, based 
	             * on whether this is WebGL 2.0, or the WebGL extension is available
	             */
	            if (this.webgl.stats.uint32) {

	                if (!o.data.length) {

	                    // console.log( fnName + ' no indices present, creating default' );

	                    o.data = new Uint32Array();
	                }

	                this.bindGLBuffer(o, this.UINT32);
	            } else {

	                if (!o.data.length) {

	                    // console.log( fnName + ' no indices present, creating default' );

	                    o.data = new Uint16Array();
	                }

	                this.bindGLBuffer(o, this.UINT16);
	            }

	            // Create the Sides buffer, a kind of indices buffer.

	            o = this.sides;

	            if (!o.data.length) {

	                // console.warn( fnName + ' no sides present, creating default' );

	                o.data = new Uint16Array();
	            }

	            this.bindGLBuffer(o, this.UINT16);

	            // create the Normals buffer.

	            o = this.normals;

	            if (!o.data.length) {

	                // console.log( fnName + ': no normals, present, creating default' );

	                o.data = new Float32Array();
	            }

	            this.bindGLBuffer(o, this.FLOAT32);

	            // Create the primary Texture buffer.

	            o = this.texCoords;

	            if (!o.data.length) {

	                // console.warn( fnName + ' no texture present, creating default' );

	                o.data = new Float32Array();
	            }

	            this.bindGLBuffer(o, this.FLOAT32);

	            // create the Tangents Buffer.

	            o = this.tangents;

	            if (!o.data.length) {

	                // console.warn( fnName + ' no tangents present, creating default' );

	                o.data = new Float32Array();
	            }

	            this.bindGLBuffer(o, this.FLOAT32);

	            // Create the Colors buffer.

	            o = this.colors;

	            if (!o.data.length || o.data.length < 4 * this.vertices.length / 3) {

	                // console.warn( fnName + ' no colors present, creating default color' );

	                o.data = new Float32Array();
	            }

	            this.bindGLBuffer(o, this.FLOAT32);

	            // Set the flag.

	            this.makeBuffers = false;

	            return this;
	        }
	    }]);

	    return GeometryBuffer;
	}();

	exports.default = GeometryBuffer;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _assetPool = __webpack_require__(19);

	var _assetPool2 = _interopRequireDefault(_assetPool);

	var _geometryPool = __webpack_require__(25);

	var _geometryPool2 = _interopRequireDefault(_geometryPool);

	var _texturePool = __webpack_require__(27);

	var _texturePool2 = _interopRequireDefault(_texturePool);

	var _materialPool = __webpack_require__(31);

	var _materialPool2 = _interopRequireDefault(_materialPool);

	var _modelPool = __webpack_require__(26);

	var _modelPool2 = _interopRequireDefault(_modelPool);

	var _audioPool = __webpack_require__(28);

	var _audioPool2 = _interopRequireDefault(_audioPool);

	var _lights = __webpack_require__(17);

	var _lights2 = _interopRequireDefault(_lights);

	var _primFactory = __webpack_require__(20);

	var _primFactory2 = _interopRequireDefault(_primFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var World = function (_AssetPool) {
	    _inherits(World, _AssetPool);

	    /** 
	     * The World class creates the scene, and should be uniquely 
	     * written for each instance using the WebVR-Mini library.
	     * Required functions:
	     * getVS() - the vertex shader.
	     * getFS() - get the fragment shader.
	     * render() - rendering loop.
	     * init() - create the world for this first time.
	     * constructor() - initialize, passing in WebVR-Mini object.
	     * 
	     * TODO: add some standard world objects (e.g. 360 video player by default)
	     * @link https://github.com/flimshaw/Valiant360/blob/master/src/valiant.jquery.js
	     */

	    /** 
	     * constructor for World.
	     * @param {WebGL} gl the webgl module.
	     * @param {WebVR} webvr the webvr module.
	     * @param {Prim} prim the object/mesh primitives module.
	     * @param {ShaderPool} shaderPool the GLSL rendering module.
	     * @param {Lights} lights object for World light.
	     * @param {Ui} ui the 2d web Ui interface.
	     */
	    function World(init, glMatrix, webgl, webvr, gamepad, shaderPool, lights, ui) {
	        _classCallCheck(this, World);

	        var _this = _possibleConstructorReturn(this, (World.__proto__ || Object.getPrototypeOf(World)).call(this, webgl.util));

	        // Initialize AssetLoader superclass.

	        console.log('in World class');

	        _this.glMatrix = glMatrix, _this.webgl = webgl, _this.util = webgl.util, _this.vr = webvr, _this.gamepad = gamepad, _this.shaderPool = shaderPool,

	        // Attach 1 copy of Texture loader.

	        _this.texturePool = new _texturePool2.default(init, _this.util, webgl);

	        // Materials file can find a material, or a texture used as material.

	        _this.materialPool = new _materialPool2.default(init, _this.util, webgl, _this.texturePool);

	        // Attach 1 copy of the Model loader. Note: passing in TexturePool and MaterialPool.

	        _this.modelPool = new _modelPool2.default(init, _this.util, webgl, _this.texturePool, _this.materialPool);

	        // Attach 1 copy of geometry loader, with ModelPool (which contains TexturePool and MaterialPool).

	        _this.geometryPool = new _geometryPool2.default(init, _this.util, glMatrix, webgl, _this.modelPool);

	        // Create the Prim factory (no Prim class).

	        _this.primFactory = new _primFactory2.default(true, _this);

	        //this.dimensions = [ 100, 100, 100 ];

	        // Set the defaults for World position and Camera POV, in case we don't have a JSON file.

	        _this.default();

	        // Add World Lights (Prims may have their own).

	        _this.lights = lights,

	        // Connect to our user interface.

	        _this.ui = ui;

	        // File types in which a World may be described.

	        _this.worldMimeTypes = {

	            'json': 'text/plain', // our proprietary JSON format

	            'gltf': 'text/tgltf', // TODO: GLTF text

	            'gltfBinary': 'bin/gltf' // TODO: GLTF binary

	        };

	        ////////////////////////////////////////////////////////////////////////////////////////
	        /* 
	         * TODO: THE SERVERS SHOULD SET THESE. USE AJAX OR EMBED PRIOR TO DOWNLOAD.
	         */

	        _this.worldPaths = ['world/default-world.json', 'world/gltf-world.json', 'world/obj-world.json', 'world/tangled-world.json', 'world/celestial-world.json'];

	        /////////////////////////////////////////////////////////////////////////////////////////


	        // Stats on World operation.

	        _this.stats = { fps: 0 };

	        // Matrix operations.

	        _this.canvas = webgl.getCanvas();

	        _this.glMatrix = webgl.glMatrix;

	        _this.wvMatrix = glMatrix.mat4.create();

	        _this.pMatrix = _this.glMatrix.mat4.create();

	        _this.mvMatrix = _this.glMatrix.mat4.create();

	        _this.last = performance.now(); // initialize the counter

	        _this.rafId = null;

	        _this.counters = {

	            fps: 0, // visible FPS

	            fps_max: 300, // for every 5 seconds

	            geolocate: 0, // positions of sun, moon, stars

	            geolocate_max: 18000, // for 0.02 rotational speed of skydome, 36000 for 0.1

	            housekeep: 0 // check for damaged Prims, etc

	        };

	        // The World controls day, night, weather.

	        // TODO : add weather info here.

	        // Bind the render loop (best current method)

	        _this.render = _this.render.bind(_this);

	        // Create a default, empty World.

	        _this.defaultKey = _this.addAsset(_this.default(), '').key;

	        // Listen for the VR display being ready (initially bind to 'window').

	        _this.util.emitter.on(_this.util.emitter.events.VR_DISPLAY_READY, function (device) {

	            if (_this.rafId !== null) {

	                console.log('VR_DISPLAY_READY, display typeof:' + _this.vr.getDisplay());

	                _this.stop();

	                _this.start();
	            }
	        });

	        /* 
	         * Rotate Prims which depend on our current (real-world) latitude and longitude.
	         * Fires 1 times per minute in world.update()
	         */

	        _this.util.emitter.on(_this.util.emitter.events.WORLD_GEOLOCATION_READY, function (geoData) {

	            // Confirm back we got meaningful data.

	            console.log('World::WORLD_GEOLOCATION_READY event');

	            if (_this.util.isNumber(geoData.latitude) && _this.util.isNumber(geoData.longitude)) {

	                _this.geoData = geoData;

	                // Individual Prims which need to update check this value.

	                for (var i = 0; i < _this.primFactory.prims.length; i++) {

	                    var prim = _this.primFactory.prims[i];

	                    if (prim.geolocate === true) {

	                        // default position x = 0, spin around zeinth

	                        // default position x = -59, like 30 degrees north (los angeles)

	                        // default position x = -90, equator spin straight ahead (north)

	                        // set default for z, adjust x, spin on y

	                        console.log('World::WORLD_GEOLOCATION_READY event, setting geoData lat:' + geoData.latitude + ' long:' + geoData.longitude);

	                        _this.computeSkyRotation(prim, geoData);
	                    }
	                }
	            }
	        });

	        return _this;
	    }

	    /**
	     * Create a default World. Units are OpenGL/WebGL units. Replaced by 
	     * Scene data in the JSON world files when loaded.
	     */


	    _createClass(World, [{
	        key: 'default',
	        value: function _default() {
	            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0, -5];
	            var rotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0];
	            var dimensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [100, 100, 100];
	            var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'no name';
	            var description = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'none';
	            var geolocate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
	            var lights = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
	            var connections = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};


	            var d = {

	                scene: {

	                    active: false,

	                    name: name,

	                    description: description,

	                    dimensions: dimensions[0],

	                    position: position[0],

	                    rotation: rotation[0],

	                    light: lights,

	                    connections: connections

	                }

	            };

	            // Add a simple point of view (POV), by moving the World instead of camera.

	            var scene = d.scene;

	            this.position = scene.position, this.rotation = scene.rotation,

	            // Additional World (scene) features.

	            this.dimensions = scene.dimensions, this.name = scene.name, this.description = scene.description, this.geolocate = scene.geolocate, this.connections = scene.connections; // teleports

	            // the global Lights object is in app.js. We only add individual Lights.

	            if (lights) this.setLights(scene.lights);

	            /*
	             * Because the World object = the current World, and we may need to purge
	             * the Prims from a world, we only store the path and JSON data for a world, rather 
	             * than the World object itself (of which there is only one).
	             */

	            return d; // end of returned JSON object
	        }

	        /** 
	         * Get all worlds by their key.
	         */

	    }, {
	        key: 'getWorlds',
	        value: function getWorlds() {

	            return this.getAllAssets();
	        }

	        /** 
	         * Get all worlds by their name. Used by the Ui class.
	         */

	    }, {
	        key: 'getWorldScenes',
	        value: function getWorldScenes() {

	            var w = {},
	                dName = 'unnamed world ',
	                ct = 0;

	            var worlds = this.getAllAssets();

	            for (var i in worlds) {
	                // i is the key in AssetPool

	                var wd = worlds[i];

	                w[i] = wd.scene;
	            }

	            window.w = w;

	            return w;
	        }

	        /** 
	         * Set the scene which should be active.
	         */

	    }, {
	        key: 'setActiveWorld',
	        value: function setActiveWorld(world) {

	            // Clear existing World.

	            // Set the new World.

	            this.computeWorld(world);
	        }

	        /** 
	         * Add Lights to global (app.js) Light object.
	         */

	    }, {
	        key: 'setLights',
	        value: function setLights(lights) {

	            for (var j in lights) {

	                var l = lights[j];

	                this.lights.setLight(this.lights.lightTypes[j], j.ambient, j.lightingDirection, j.directionalColor, j.active);
	            }
	        }

	        /** 
	         * Get the POV (simple camera).
	         * @returns {Object} an object containing vec3 position and rotation arrays.
	         */

	    }, {
	        key: 'getPOV',
	        value: function getPOV() {

	            return {

	                position: this.position,

	                rotation: this.rotation

	            };
	        }

	        /**
	         * Handle resize event for the World dimensions.
	         * @param {Number} width world width (x-axis) in units.
	         * @param {Number} height world height (y-axis) in units.
	         * @param {Number} depth world depth (z-axis) in units.
	         */

	    }, {
	        key: 'resize',
	        value: function resize(width, height, depth) {

	            console.error('world::resize(): not implemented yet!');
	        }

	        /** 
	         * Given a World JSON file data set, compute the World.
	         * @param {Object} world the definition of a scene and its Prims.
	         * @param {String} path the server path to the JSON file with the scene and its Prims.
	         * @param {Boolean} createPrims if true, create the scene objects, otherwise just store the JSON file.
	         */

	    }, {
	        key: 'computeWorld',
	        value: function computeWorld(world, path) {

	            var vec3 = this.glMatrix.vec3;

	            var vec4 = this.glMatrix.vec4;

	            var vec5 = this.primFactory.geometryPool.vec5; // special vector

	            var typeList = this.primFactory.geometryPool.typeList; // types of geometry

	            var directions = this.primFactory.geometryPool.directions; // cardinal positions

	            var util = this.util;

	            // If we're going to create the Scene, make this the active Scene.

	            if (world.scene) {

	                // Assign a URL style path, if defined.

	                if (path) world.scene.path = path;

	                // Check if the World is active.

	                world.scene.active = JSON.parse(world.scene.active);

	                if (world.scene.active === true) {

	                    // Loop thrugh Scene objects.

	                    for (var i in world) {

	                        var s = world[i];

	                        // 'scene' = parameters used to configure the World for its Prims.

	                        if (i === 'scene') {

	                            this.position = s.position; // World position

	                            this.rotation = s.rotation; // World rotation

	                            // Set lights, if present.

	                            this.setLights(s.lights);

	                            // If our scene is located in the real world, geolocate.

	                            if (s.geolocate) {

	                                util.getGeolocation();
	                            }
	                        } else {
	                            // its an individual Prim

	                            console.log("I is:" + i + ", CHECKING SHADER for " + world.scene.name + " is:" + s.shader + " for prim: " + s.name);

	                            var shader = this.shaderPool.getAssetByName(s.shader);

	                            if (shader.name) console.log("GETTING SHADER:" + shader.name);

	                            if (shader) {

	                                // Handle cases for dimensions and divisions params are numbers (they may also be strings).

	                                if (this.util.isNumber(s.dimensions[3])) {

	                                    s.dimensions[3] = parseFloat(s.dimensions[3]);
	                                }

	                                if (this.util.isNumber(s.dimensions[4])) {

	                                    s.dimensions[4] = parseFloat(s.dimensions[4]);
	                                }

	                                if (this.util.isNumber(s.divisions[3])) {

	                                    s.divisions[3] = parseFloat(s.divisions[3]);
	                                }

	                                if (this.util.isNumber(s.divisions[4])) {

	                                    s.divisions[4] = parseFloat(s.divisions[4]);
	                                }

	                                if (s.useColorArray) s.useColorArray = JSON.parse(s.useColorArray); // if true, use color array instead of texture array

	                                if (s.useFaceTextures) s.useFaceTextures = JSON.parse(s.useFaceTextures); // if true, apply textures to each face, not whole Prim.

	                                if (s.useLighting) s.useLighting = JSON.parse(s.useLighting); // if true, use lighting (default)

	                                if (s.useMetaData) s.useMetaData = JSON.parse(s.useMetaData); // if true, keep data associated with regions of prim.

	                                // Create the Prim.

	                                var p = this.primFactory.createPrim(this.shaderPool.getAssetByName(s.shader), // Shader used

	                                typeList[s.type], // Prim type

	                                i, // name

	                                vec5(parseFloat(s.dimensions[0]), parseFloat(s.dimensions[1]), parseFloat(s.dimensions[2]), s.dimensions[3], // these may be non-numeric
	                                s.dimensions[4]), // dimensions, WebGL units

	                                vec5(parseFloat(s.divisions[0]), parseFloat(s.divisions[1]), parseFloat(s.divisions[2]), s.divisions[3], //these may be non-numeric
	                                s.divisions[4]), // divisions, pass curving of edges as 4th parameter

	                                vec3.fromValues(parseFloat(s.position[0]), parseFloat(s.position[1]), parseFloat(s.position[2])), // acceleration in x, y, z

	                                vec3.fromValues(parseFloat(s.acceleration[0]), parseFloat(s.acceleration[1]), parseFloat(s.acceleration[2])), // position (absolute), relative to camera not World space

	                                vec3.fromValues(util.degToRad(s.rotation[0]), util.degToRad(s.rotation[1]), util.degToRad(s.rotation[2])), // rotation (absolute)

	                                vec3.fromValues(util.degToRad(s.angular[0]), util.degToRad(s.angular[1]), util.degToRad(s.angular[2])), // angular (orbital) velocity

	                                s.textures, // texture images (if not in model)

	                                s.models, // model (.OBJ, .GlTF)

	                                s.useColorArray, // if true, use color array instead of texture array

	                                s.useFaceTextures, // if true, apply textures to each face, not whole Prim.

	                                s.useLighting, // if true, use lighting (default)

	                                s.useMetaData, // if true, store meta-data in prim.materials[].objects array

	                                s.pSystem, // if this Prim should be duplicated into a particle system, data is here

	                                s.animSystem // if this Prim has animation waypoints, data is here

	                                ); // end createPrim
	                            } else {

	                                console.error('World::getWorld(): invalid Shader:' + i + ', shader:' + s.shader + ' for Prim:' + i.name);
	                            }
	                        } // scene vs. prim conditional
	                    } // end of loop through World
	                } // world.scene.active

	                /* 
	                 * WORLD_DEFINITION_READY event, indicating all descriptions of World loaded. Individual media 
	                 * and model files may still need to be loaded.
	                 */

	                this.util.emitter.emit(this.emitter.events.WORLD_DEFINITION_READY);

	                console.log("WORLD EMITTING:" + world.scene.name);

	                return true;
	            } else {

	                // inactive World.

	                console.log('World::computeWorld(): inactive World at path:' + path + ' loaded');
	            }

	            return false;
	        }

	        /** 
	         * load a World from a JSON file description.
	         */

	    }, {
	        key: 'getWorld',
	        value: function getWorld(path) {
	            var _this2 = this;

	            if (!this.util.isWhitespace(path)) {

	                var mimeType = this.worldMimeTypes[this.util.getFileExtension(path)];

	                var vec3 = this.glMatrix.vec3;

	                var vec4 = this.glMatrix.vec4;

	                var vec5 = this.primFactory.geometryPool.vec5; // special vector

	                var typeList = this.primFactory.geometryPool.typeList; // types of geometry

	                var directions = this.primFactory.geometryPool.directions; // cardinal positions

	                var util = this.util;

	                // check if mimeType is OK.

	                if (mimeType) {

	                    this.doRequest(path, 0, function (updateObj) {

	                        /* 
	                         * updateObj returned from GetAssets has the following structure:
	                         * { 
	                         *   pos: pos, 
	                         *   path: requestURL, 
	                         *   data: null|response, (Blob, Text, JSON, FormData, ArrayBuffer)
	                         *   error: false|response 
	                         * } 
	                         */

	                        // load a Model file.

	                        if (updateObj.data) {

	                            var world = _this2.util.parseJSON(updateObj.data);

	                            if (world) {

	                                if (_this2.computeWorld(world, path, world.active)) {

	                                    // Store in AssetPool (superclass) using a key, with path in world.scene.path

	                                    _this2.addAsset(world, '');
	                                }
	                            } else {

	                                console.error('World::getWorld():World file:' + path + ' could not be parsed');
	                            }
	                        } else {

	                            console.error('World::getWorld(): World file, no data found for:' + updateObj.path);
	                        }
	                    }, true, mimeType, 0); // end of this.doRequest(), initial request at 0 tries
	                } else {

	                    // Invalid MIMEtype.

	                    console.error('World::getWorld(): file type "' + this.util.getFileExtension(path) + '" in:' + path + ' not supported, not loading');
	                }
	            } else {

	                // Invalid path.

	                console.error('World::getWorld(): no path supplied, not loading');
	            }
	        }

	        /** 
	         * save a World to a JSON file description.
	         */

	    }, {
	        key: 'saveWorld',
	        value: function saveWorld(path) {

	            // TODO: output in editor interface.

	            console.error('World::saveWorld(): not implemented yet!');
	        }

	        /** 
	         * Compute the rotations needed for a StarDome to be positioned from 
	         * the point of view of an observer on Earth,  given the user's latitude, 
	         * longitude, and the time of day. 
	         * Assumes a StarDome Prim, set to rotation 0, 0, 0. and util.geoLocate() was fired:
	         *
	         * - world.getWorld()
	         * - with a 1 minute timer in world.update()
	         * Note: greenwich, england - 51.4826° N, 0.0077° W
	         * Note: los Angeles - 34.0522° N, 118.2437° W
	         *
	         * @param {Prim} prim the prim to rotate
	         */

	    }, {
	        key: 'computeSkyRotation',
	        value: function computeSkyRotation(prim, geoData) {

	            if (!prim.geolocate) {

	                console.error('World::computeSkyRotation(): prim ' + prim.name + ' does not geolocate');

	                return;
	            }

	            if (this.util.isNumber(geoData.latitude) && this.util.isNumber(geoData.longitude)) {

	                prim.rotation[0] = this.util.degToRad(-90 + geoData.latitude);

	                var d = new Date();

	                var hrDegs = this.util.hoursToDeg(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());

	                prim.rotation[1] = -this.util.degToRad(geoData.longitude - hrDegs);

	                prim.rotation[2] = this.util.degToRad(90);
	            } else {

	                console.warn('World::computeSkyRotation(): invalid geoData');
	            }
	        }

	        /** 
	         * Compute position of the Sun from a position on Earth, given the user's 
	         * latitude, longitude, and time of day on a normalized sphere.
	         */

	    }, {
	        key: 'computeSunPosition',
	        value: function computeSunPosition(prim) {}

	        /**
	         * Compute position of the planets from a position on Earth, given the user's
	         * latitude, longitude, and time of day on a nomalized sphere.
	         */

	    }, {
	        key: 'computePlanetPositions',
	        value: function computePlanetPositions(prim) {}

	        /** 
	         * Create the world. Load Shader objects, and 
	         * create objects to render in the world.
	         */

	    }, {
	        key: 'init',
	        value: function init() {

	            var vec3 = this.glMatrix.vec3;

	            var vec4 = this.glMatrix.vec4;

	            var vec5 = this.primFactory.geometryPool.vec5;

	            var typeList = this.primFactory.geometryPool.typeList;

	            var directions = this.primFactory.geometryPool.directions;

	            var util = this.util;

	            // Put some media into our asset pools.

	            // Get the shaders (not initialized with update() and render() yet!).
	            // Note: pass 'world' in so we can get the World POV.

	            this.s0 = this.shaderPool.getAssetByName('shaderFader');

	            this.s1 = this.shaderPool.getAssetByName('shaderTexture');

	            this.s2 = this.shaderPool.getAssetByName('shaderColor');

	            // Get the World file, overwriting defaults as necessary.

	            ////////////////////////////this.getWorld( this.DEFAULT_WORLD_PATH, true );

	            for (var i = 0; i < this.worldPaths.length; i++) {

	                this.getWorld(this.worldPaths[i]);
	            }

	            // if nobody is active, or there are not worldPaths, create a default world.

	            // TODO: ULTRA-SIMPLE PRIM GENERATION.

	            // TODO: WARNING THAT NO WORLDS ARE DEFINED

	            /*
	            
	                        this.primFactory.createPrim(
	            
	                            this.s1,                               // callback function
	                            typeList.MESH,
	                            'objfile',
	                            vec5( 2, 2, 2 ),                       // dimensions (4th dimension doesn't exist for cylinder)
	                            vec5( 40, 40, 40  ),                    // divisions MAKE SMALLER
	                            vec3.fromValues( -3.5, -1, -0.0 ),      // position (absolute)
	                            vec3.fromValues( 0, 0, 0 ),            // acceleration in x, y, z
	                            vec3.fromValues( util.degToRad( 0 ), util.degToRad( 0 ), util.degToRad( 0 ) ), // rotation (absolute)
	                            vec3.fromValues( util.degToRad( 0.2 ), util.degToRad( 0.5 ), util.degToRad( 0 ) ),  // angular velocity in x, y, x
	                            [], // texture loaded directly
	                            //[ 'obj/capsule/capsule.obj' ], // works, but HALF-CAPSULE (shader normals???)
	                            //[ 'obj/rose/rose.obj' ], // works great
	                            //[ 'obj/rose2/rose2.obj' ],
	                            //[ 'obj/cube/cube.obj' ], // works great
	                            //[ 'obj/oblong/oblong.obj' ], // works great but HALF-OBJECT (dark side in pure gray)
	                            //[ 'obj/cylinder/cylinder.obj' ], // !!!!!!!! nothing shadows. One panel is gray
	                            //[ 'obj/balls/balls.obj' ], // great
	                            //[ 'obj/mountains/mountains.obj' ], // NOT WORKING, calls nonexistent materials
	                            //[ 'obj/landscape/landscape.obj'], // ok, but black shadows with lighting
	                            [ 'obj/toilet/toilet.obj' ], // works great
	                            //[ 'obj/naboo/naboo.obj' ], // ok, black shadows
	                            //[ 'obj/star/star.obj'], // ok
	                            //[ 'obj/robhead/robhead.obj'], // ok, no texcoords or normals. works, but turns black with lighting
	                            //[ 'obj/soccerball/soccerball.obj'], // no texcoords or normals
	                            //[ 'obj/basketball/basketball.obj'], //!!!!!!!!!!! grey, then goes black at alpha = 1; missing texture
	                            //[ 'obj/rock1/rock1.obj'], // ok, works
	                            //[ 'obj/cherries/cherries.obj'], // ok
	                            //[ 'obj/banana/banana.obj' ], // works great
	                            false, // if true, use color array instead of texture array
	                            false, // if true, apply textures to each face, not whole Prim.
	                            true, // if true, use lighting                
	                        );
	            
	            */

	            // Note: the init() method sets up the update() and render() methods for the Shader.

	            this.r0 = this.s0.init();

	            this.r1 = this.s1.init();

	            this.r2 = this.s2.init();

	            /* 
	             * Fire world update (either window or WebVR display). Since we 
	             * do this directly, in most cases this will be the 'window' object. If the 
	             * VRDisplay becomes available, it emits an VR_DISPLAY_READY event, and we 
	             * dynamically switch to VRDisplay (see constructor emitter handler).
	             */

	            this.start();
	        }

	        /** 
	         * Start World animation and updating.
	         */

	    }, {
	        key: 'start',
	        value: function start() {

	            console.log('World::start(): starting animation');

	            // Attach reporters from WebVR and GamePad API only if we can render.

	            this.vr.setWorld(this);

	            this.gamepad.setWorld(this);

	            this.ui.setWorld(this);

	            // Fire the WebVR .requestAnimationFrame (rather than window.requestAnimationFrame).

	            return this.rafId = this.vr.getDisplay().requestAnimationFrame(this.render);
	        }

	        /** 
	         * Stop World animation and updating.
	         */

	    }, {
	        key: 'stop',
	        value: function stop() {

	            console.log('World::stop(): stopping animation');

	            // Use the WebVR .requestAnimationFrame (rather than window.requestAnimationFrame).

	            this.vr.getDisplay().cancelAnimationFrame(this.rafId);

	            return this.rafId = null;
	        }

	        /** 
	         * Update the World. Called occasionally to look for broken Prims, malfunctioning APIs, ect..
	         */

	    }, {
	        key: 'housekeep',
	        value: function housekeep() {}

	        // TODO: Safari hack to and from fullscreen - if (self.isIOS) { utils.forceCanvasResizeSafariMobile(this.canvas);
	        /*
	        
	        module.exports = function forceCanvasResizeSafariMobile (canvasEl) {
	          var width = canvasEl.style.width;
	          var height = canvasEl.style.height;
	          // Taken from webvr-polyfill (https://github.com/borismus/webvr-polyfill/blob/85f657cd502ec9417bf26b87c3cb2afa6a70e079/src/util.js#L200)
	          // iOS only workaround for https://bugs.webkit.org/show_bug.cgi?id=152556
	          // By changing the size 1 pixel and restoring the previous value
	          // we trigger a size recalculation cycle.
	          canvasEl.style.width = (parseInt(width, 10) + 1) + 'px';
	          canvasEl.style.height = (parseInt(height, 10) + 1) + 'px';
	          setTimeout(function () {
	            canvasEl.style.width = width;
	            canvasEl.style.height = height;
	          }, 200);
	        };
	        
	        */

	        // TODO: TEST WITHOUT A DOM (document.body)

	        // TODO: world menu

	        // TODO: scene teleports (see celestial.json file)

	        // TODO: add texture option for stardome

	        // TODO: iOS pseudo fullscreen

	        // TODO: constellation data co-loaded.

	        // TODO: particle system

	        // TODO: toggle worlds in Ui

	        // TODO: terrain multitexture

	        // TODO: terrain for texture (bumpy)

	        // =========================

	        // TODO: audit in https://www.npmjs.com/package/lighthouse

	        // TODO: fog in Shader

	        // TODO: study debug system in a-frame

	        // TODO: Webworker for file loads.
	        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

	        // TODO: daydream controls
	        // https://github.com/aframevr/aframe/blob/master/src/components/daydream-controls.js

	        // TODO: check event being fired on tap in ios, google pixel. Make sure that tooltip is removed.

	        // TODO: sum for lighting requires a nonzero specular to draw into the shadow!!!!

	        // TODO: escape key needs to run correct resize image in fullscreen! (vr button returns correctly)

	        // TODO: JIT - https://www.html5rocks.com/en/tutorials/speed/v8/
	        // TODO: JIT - https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/JIT_Optimization_Strategies
	        // TODO: JIT - https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution
	        // TODO: JIT - http://mrale.ph/irhydra/2/#
	        // TODO: JIT - https://www.shivering-isles.com/javascript-performance-optimization/
	        // TODO: JIT - https://news.ycombinator.com/item?id=7943303
	        // TODO: JIT - http://webassembly.org/docs/web/

	        // TODO: geometryPool::computeTexCoords2

	        // TODO: fullscreen doesn't work if we use VRDisplay.exitFullScreen() in Firefox (CANVAS NOT RESIZED)

	        // TODO: Spinner in Ui

	        // TODO: https://codepen.io/ionic/pen/GgwVON

	        // TODO: Modal DOM dialog for ui.es6

	        // TODO: Just make the ShaderTexture use light. Remove ShaderDirLightTexture.

	        // TODO: IF A MATERIAL HAS A COLOR, OVERRIDE THE DEFAULT COLOR ARRAY (by re-writing it in that color).
	        // TODO: use the texture pixel in prim.defaultMaterial - set it to the value of the diffuse color.
	        // TODO: or, study if textures actually list color independently from ambient color.
	        // TODO: set ambient, and diffuse color to the same color, and assign to the texture array.
	        // TODO: or, ignore color array? WHAT WOULD THAT LOOK LIKE?????????
	        // TODO: some wavefront files have x, y, z, r, g, b for 'v' - PROCESS

	        // TODO: I noticed that FF now puts out "Error: WebGL warning: texImage2D: Alpha-premult 
	        //and y-flip are deprecated for non-DOM-Element uploads." for something like  
	        //gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true ); What IS the best practice here?

	        // TODO: TGA Loader?

	        // TODO: RANDOMIZE when Prims leave ShaderFader, so they don't all leave at once...

	        // PrimFactory needs to do the sorting of Prims.

	        // TODO: Push and Pop mvMatrix (in Shader) to better organize sequence (research if we can get a speedup)

	        // Jank optimization - http://jankfree.org/

	        // Cross-platform - http://codeflow.org/entries/2013/feb/22/how-to-write-portable-webgl/

	        // TODO: splitBuffers() in geometry-buffer.es6 for old distributions using gl.UNSIGNED_SHORT

	        // TODO: change webvr sitting to standing matrix so we reduce matrix multiplys.

	        // TODO: check if webvr.presenting when first rebooting. If so, toggle Ui to that mode.

	        // TODO: initPrimMaterial is just picking the first material as default. Find the material with the lowest start.

	        // TODO: sort materials by starting position using object.keys function

	        // TODO: detect if a texture is too big, and try to load a smaller one!

	        // Error: WebGL: texImage2D: Requested size at this level is unsupported.

	        // TODO: PULSE routine for multiple properties

	        // TODO: smoothing groups

	        // TODO: make camera work in mouselook only.

	        // TODO: SUPPORT FOR SMOOTHING GROUPS. STARTED IN MODELPOOL DIRECTORY.

	        // TODO: make shader-texture and shader-color handle basic materials. But use shader-dirlight-texture 

	        // TODO: be choosen if there are multiple materials in the file.

	        // TODO: ANIMATION CLASS FOR PRIM IN UPDATEMV ROUTINE.

	        // TODO: PRIM CONCATENATE SEVERAL PRIMS TOGETHER INTO ONE ARRAY??? CHECK HOW TO DO

	        // TODO: SPLIT PRIMS IF SEVERAL MATERIALS ARE INVOLVED?

	        // TODO: SPLIT PRIMS IF < 64k support?

	        // Note: WebWorker for OBJ file parsing

	        // TODO: JSON FILE FOR PRIMS (loadable) use this.load(), this.save()

	        // TODO: DEFAULT MINI WORLD IF NO JSON FILE (just a skybox and ground grid)

	        // TODO: PRIM ORBIT FUNCTION

	        /** 
	         * Update the World, called with each animation frame.
	         */

	    }, {
	        key: 'update',
	        value: function update() {

	            var counters = this.counters;

	            // Check for VR mode.

	            // fps calculation.

	            counters.fps++;

	            var now = performance.now();

	            var delta = now - this.last;

	            if (counters.fps > counters.fps_max) {

	                //console.log('delta:' + delta)

	                this.stats.fps = parseInt(1000 / (delta / this.counters.fps)) + ' fps';

	                this.last = now;

	                counters.fps = 0;
	            }

	            // Update stars, if present

	            counters.geolocate++;

	            if (counters.geolocate > counters.geolocate_max) {

	                counters.geolocate = 0;

	                this.util.getGeolocation(); // fires event back to world.computeSkyRotation();
	            }

	            // Update Sun, if present

	            // Update Moon, if present

	            // Update Lights

	            var lightPos = this.lights.getPos();

	            //this.glMatrix.vec3.rotateX( lightPos, lightPos, [ 0, 0, 0 ], 0.01 );

	            //this.glMatrix.vec3.rotateY( lightPos, lightPos, [ 0, 0, 0 ], 0.01 );

	            // Update atmosphere

	            // Update Skydome/Stardome
	        }

	        /** 
	         * Get the World view matrix.
	         */

	    }, {
	        key: 'getWorldViewMatrix',
	        value: function getWorldViewMatrix(wvMatrix) {

	            var mat4 = this.glMatrix.mat4,
	                pov = this.getPOV();

	            mat4.rotate(wvMatrix, wvMatrix, pov.rotation[1], [0, 1, 0]); // rotate on Y axis only (for mouselook).

	            mat4.rotate(wvMatrix, wvMatrix, pov.rotation[0], [1, 0, 0]); // rotate on X axis only (for mouselook).

	            mat4.translate(wvMatrix, wvMatrix, pov.position); // putting this first rotates around world center!
	        }

	        /** 
	         * Render the World for a mono or a VR display.
	         * Update Prims locally, then call Shader. objects to do rendering. Individual renderers 
	         * (this.r#) were bound (ES5 method) in the constructor. 
	         * Note: Our scene graph is just the rendering order shown here.
	         * Note: we can call Shaders indivdually, or use the global 
	         * this.shaderPool.renderVR() or this.shaderPool.renderMono() will will render everything.
	         */

	    }, {
	        key: 'render',
	        value: function render() {

	            var mat4 = this.glMatrix.mat4,
	                wvMatrix = this.wvMatrix,
	                vr = this.vr,
	                // wrapped WebVR object

	            pov = this.getPOV();

	            this.update();

	            this.webgl.clear();
	            // TODO: DEBUG TEMPORARY.
	            //pov.rotation[ 0 ] += 0.003;
	            //pov.rotation[ 1 ] += 0.003;
	            // Render for mono or WebVR stereo.

	            /*
	              Sean McBeth says....
	            
	              Basically, I have a startup process:
	            currentDisplay = window
	            callbackID = currentDisplay.requestAnimationFrame(animationCallback)
	            Then animationCallback has to make sure to always do `callbackID = currentDisplay.requestAnimationFrame(animationCallback)` to update the callbackID every frame.
	            
	            And then my "change display" process is:
	            currentDisplay.cancelAnimationFrame(callbackID)
	            if(userHasSelectedVRDisplay) 
	            currentDisplay = userSelectedVRDisplay
	            else currentDisplay = window
	            callbackID = currentDisplay.requestAnimationFrame(animationCallback)
	            
	            You have to make sure you call cancelAnimationFrame from the same object from which requestAnimationFrame was called to create the callbackID, or else the cancel will not happen correctly.
	            
	            Note: THIS IMPLIES WE HAVE TO DO IT IN WORLD.
	            
	            */

	            var d = vr.getDisplay();

	            // Clear the View matrix for the World.

	            mat4.identity(wvMatrix);

	            /* 
	             * Toggle between VR and mono view modes.
	             * If we found a VRDisplay, we use VRDisplay.requestAnimationFrame for both mono and stereo.
	             * If there is noVRDisplay, we use window.requestAnimationFrame
	             */

	            if (d) {

	                if (d.isPresenting) {

	                    // We can only go here if VRDisplay exists.

	                    this.rafId = d.requestAnimationFrame(this.render);

	                    // Get FrameData (with matrices for left and right eye) Can be NULL the first time.

	                    var fd = vr.getFrameData();

	                    if (fd !== null) {

	                        // Get any World transforms (translation, rotation).

	                        this.getWorldViewMatrix(wvMatrix);

	                        /* 
	                         * These routines set the canvas viewport to left and right stereo, and 
	                         * draw left or right view using the frameDat left and right view matrix.
	                         */

	                        ////////////////this.r3.renderVR( vr, fd, wvMatrix, pov );  // particle

	                        this.r1.renderVR(vr, fd, wvMatrix, pov); // textured, no lighting

	                        this.r2.renderVR(vr, fd, wvMatrix, pov); // color

	                        this.r0.renderVR(vr, fd, wvMatrix, pov); // REQUIRED alpha (Prim appearing or disappearing), drawn in front

	                        d.submitFrame();
	                    } else {

	                        console.error('World::render(): invalid VRFrameData');
	                    }
	                } else {

	                    /* 
	                     * Render mono view, using either disp === VRDisplay, or disp === window.
	                     * webvr.vrResize() calls webgl.resize(), which converts the canvas viewport back to 
	                     * mono view if we are using VRDisplay. 
	                     *
	                     * If we are using disp === window then the viewport always fills the canvas.
	                     */

	                    this.rafId = d.requestAnimationFrame(this.render);

	                    // Get any World transforms (translation, rotation).

	                    this.getWorldViewMatrix(wvMatrix);

	                    //////////////this.r3.renderMono( wvMatrix, pov );

	                    this.r1.renderMono(wvMatrix, pov); // textured, no lighting

	                    this.r2.renderMono(wvMatrix, pov); // color

	                    this.r0.renderMono(wvMatrix, pov); // REQUIRED alpha (Prim appearing or disappearing), drawn in front
	                }
	            } else {

	                console.error('World::render(): no display');
	            }

	            ////////////////////////////console.log( this.webgl.getError() );
	        }
	    }]);

	    return World;
	}(_assetPool2.default);

	exports.default = World;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _assetPool = __webpack_require__(19);

	var _assetPool2 = _interopRequireDefault(_assetPool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	'use strict';

	var MaterialPool = function (_AssetPool) {
	    _inherits(MaterialPool, _AssetPool);

	    function MaterialPool(init, util, webgl, texturePool) {
	        _classCallCheck(this, MaterialPool);

	        console.log('in MaterialPool');

	        // Initialize superclass.

	        var _this = _possibleConstructorReturn(this, (MaterialPool.__proto__ || Object.getPrototypeOf(MaterialPool)).call(this, util));

	        _this.util = util, _this.webgl = webgl, _this.texturePool = texturePool;

	        _this.materialMimeTypes = {

	            'mtl': 'text/plain'

	        };

	        // Reverse map for texture Roles (due to redundancy, don't use Object.keys()).

	        _this.texturePositions = ['map_Kd', 'map_Ka', 'map_bump', 'map_Ks', 'map_Ns', 'map_refl', 'map_d', 'map_disp'];

	        if (init) {

	            // Create and store a default Material asset.

	            _this.defaultKey = _this.addAsset(_this.default()).key;
	        }

	        return _this;
	    }

	    /** 
	     * Create the default MaterialPool object.
	     * @param {String} name the name of the material, either 'defaul' in .mtl file.
	     * @param {Array} ambient the ambient color.
	     * @param {Array} diffuse the diffuse color.
	     * @param {Array} specular the specular color.
	     * @param {Number} specularExponent the shininess of the object.
	     * @param {Number} sharpness of reflection map.
	     * @param {Number} refraction light-bending of transparent objects.
	     * @param {Number} transparency.
	     * @param {Number} enumerated list of lighting modes.
	     * @param {String} map_Kd the default texture for diffuse mapping.
	     * @returns {Material} a Material object.
	     */


	    _createClass(MaterialPool, [{
	        key: 'default',
	        value: function _default() {
	            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.util.DEFAULT_KEY;
	            var ambient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [1.0, 1.0, 1.0];
	            var diffuse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [1.0, 1.0, 1.0];
	            var specular = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [1.0, 1.0, 1.0];
	            var specularExponent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 64.0;
	            var emissive = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [0, 0, 0];
	            var sharpness = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 60;
	            var refraction = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
	            var transparency = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
	            var illum = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 2;
	            var map_Kd = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;


	            // Add a default placeholder one-pixel texture corresponding to the diffuse color (makes us valid for most Shaders).

	            if (!map_Kd) {

	                map_Kd = this.texturePool.getAssetByKey(this.texturePool.defaultKey).texture;
	            }

	            return {

	                name: name,

	                key: null, // key in MaterialPool

	                path: null, // path to file

	                emissive: emissive,

	                ambient: ambient, // Ka ambient color, white

	                diffuse: diffuse, // Kd diffuse color, white

	                specular: specular, // Ks specular color, black (off)

	                specularExponent: specularExponent, // Ns specular exponent, ranges between 0 and 1000

	                sharpness: sharpness, // sharpness of reflection map (0-1000)

	                refraction: refraction, // refraction, 1.0 = no refraction

	                transparency: transparency, // d | Tr = transparency 1.0 = transparent (1.0 - transparency for prim.alpha)

	                illum: illum, // illium, color and ambient on

	                map_Kd: map_Kd, // diffuse map, an image file (other maps not in default)

	                map_Ks: null, // specular reflectivity map

	                map_Ka: null, // ambient map

	                map_Ns: null, // specular exponent map

	                map_refl: null, // environment map

	                map_d: null, // alpha map

	                map_bump: null, // bumpmap

	                map_disp: null // displacement map

	            };
	        }

	        /** 
	         * In some cases, our default material may be replaced by another after it loads from a .mtl file, 
	         * so provide for merging. We merge down everything except map_xxx properties.
	         * @param {Material} 
	         */

	    }, {
	        key: 'mergeTo',
	        value: function mergeTo(recMat, inputMat) {

	            for (var i in recMat) {

	                // Explicit clone is MUCH faster!

	                console.log("MERGING:" + i);

	                switch (i) {

	                    case name:
	                    case key: // key in AssetPool
	                    case path: // path to file
	                    case specularExponent: // Ns specular exponent, ranges between 0 and 1000
	                    case sharpness: // sharpness of reflection map (0-1000)
	                    case refraction: // refraction, 1.0 = no refraction
	                    case transparency: // d | Tr = transparency 1.0 = transparent (1.0 - transparency for prim.alpha)
	                    case illum:
	                        // illium, color and ambient on

	                        recMat[i] = inputMat[i];

	                        break;

	                    case emissive: // Ke emissive color
	                    case ambient: // Ka ambient color
	                    case diffuse: // Kd diffuse color
	                    case specular:
	                        // Ks specular color

	                        recMat[i] = JSON.parse(JSON.stringify(inputMat[i]));

	                        break;

	                    case map_Kd: // diffuse map, an image file (other maps not in default)
	                    case map_Ks: // specular map
	                    case map_Ka: // ambient map
	                    case map_refl: // environment map
	                    case map_d: // alpha map
	                    case map_bump: // bumpmap
	                    case map_disp:
	                        // displacement map

	                        console.log("INPUT:" + inputMat[i] + " RECEIVE:" + recMat[i]);

	                        if (inputMat[i] instanceof WebGLTexture) {

	                            console.log('MaterialPool::mergeTo(): replacing ' + i + ' with new texture');

	                            recMat[i] = inputMat[i];
	                        }

	                        break;

	                    default:

	                        console.error('MaterialPool::mergeTo(): unknown object member (' + i + ')!');

	                        break;

	                }
	            }
	        }

	        /** 
	         * extract additional options for texture maps in OBJ format. Assumes that 
	         * a texture file was specified as the last data item in the line. Only the 
	         * options specified in the file are added (so calling program must test for them).
	         * @param {Array} data the line of the file for a texture map.
	         */

	    }, {
	        key: 'computeTextureMapOptions',
	        value: function computeTextureMapOptions(data) {

	            var options = {};

	            ///////console.log('computeTextureMapOptions data:' + data + ' length:' + data.length )

	            // If there there are no options, return an empty object.

	            if (data.length < 4) {

	                return options;
	            }

	            ///////console.log('...analyzing TextureMapOptions:' + data);

	            /* 
	             * Texturemap format:
	             * -s 1 1 1 -o 0 0 0 -mm 0 1 filename.png
	             * 
	             * Copy the data string, sans filename.
	             */

	            var p = [];

	            for (var i = 0; i < data.length - 1; i++) {

	                p[i] = data[i];
	            }

	            var pp = p.join(' ').split('-');

	            for (var _i = 0; _i < pp.length; _i++) {

	                var ppp = pp[_i].split(' ');

	                if (ppp.length > 1) {

	                    ////////console.log( 'ppp[0]:' + ppp[0] )

	                    var d = ppp[0],
	                        d1 = ppp[1];

	                    switch (d) {

	                        case 'blenu': // texture blends in horizontal direction
	                        case 'blenv': // texture blends in vertical direction
	                        case 'cc': // color correction, only with color maps (map_Ka, map_Kd, and map_Ks)
	                        case 'clamp':
	                            // restrict textures to 0-1 range

	                            if (d1 === 'off') options[d] = false;else options[d] = true;

	                            break;

	                        case 'bm': // bump map multiplier, should be 0-1
	                        case 'mm':
	                            // base gain multiplier (makes brighter, 0-1)

	                            if (Number.isFinite(parseFloat(d1))) {

	                                options[d] = parseFloat(d1);
	                            }

	                            break;

	                        case 'boost':
	                            // sharpen, any non-negative number

	                            if (Number.isFinite(parseFloat(d1)) && d1 >= 0) {

	                                options[d] = parseFloat(d1);
	                            }

	                            break;

	                        case 'imfchan': // channel used to create scalar or bump texture, (r | g | b | m | l | z)
	                        case 'texres':
	                            // scale up images to the next power of 2.

	                            options[d] = d1;

	                            break;

	                        case 'o': // offset texture map origin x, y z
	                        case 's': // scales the size of the texture pattern, default 1,1,1
	                        case 't':
	                            // turn on texture turbulence (u, v, w )

	                            // Remove anything that isn't a number.

	                            var ct = 0;

	                            options[d] = [];

	                            for (var j = 1; j < ppp.length; j++) {

	                                var pi = ppp[j];

	                                if (Number.isFinite(parseFloat(pi))) {

	                                    options[d][ct++] = parseFloat(pi);
	                                }
	                            }

	                            if (options[d].length !== 3) {

	                                console.warn('MaterialPool::computeTextureMapOptions(): in valid texture param for:' + d);

	                                options[d] = [0, 0, 0];
	                            }

	                            break;

	                        default:

	                            console.error('unknown texture map option: ' + data);

	                            break;

	                    }
	                }
	            }

	            // Options could be empty.

	            return options;
	        }

	        /** 
	         * Compute material properties for a model.
	         * Similar to:
	         * @link https://github.com/tiansijie/ObjLoader/blob/master/src/objLoader.js
	         * 
	         * Reference:
	         * @link http://paulbourke.net/dataformats/mtl/
	         * 
	         * @param {String} data the incoming data from the file.
	         * @param {Prim} prim the Prim object defined in prim.es6
	         * @param {String} path the path to the file. MTL files may reference other files in their directory.
	         */

	    }, {
	        key: 'computeObjMaterials',
	        value: function computeObjMaterials(data, prim, path) {
	            var _this2 = this;

	            ////////console.log( 'MaterialPool::computeObjMaterials(): loading model:' + path + ' for:' + prim.name );

	            var lineNum = 0;

	            var materials = [];

	            var currName = null;

	            var dir = this.util.getFilePath(path);

	            var lines = data.split('\n');

	            lines.forEach(function (line) {

	                line = line.trim();

	                // First value, the directive.

	                var type = line.split(' ')[0].trim();

	                // All other values as an array.

	                var data = line.substr(type.length).trim().split(' ');

	                // If there's no data, don't process.

	                if (data !== '') {

	                    switch (type) {

	                        case 'newmtl':
	                            // name of material.

	                            currName = data[0].trim();

	                            // Apply file data to a default Material.

	                            ///////////////materials[ currName ] = this.default( currName );

	                            // GET THE ASSET OBJECT WITH ITS KEY

	                            materials[currName] = _this2.addAsset(_this2.default(currName));

	                            materials[currName].fromObj = true;

	                            break;

	                        case 'Ka':
	                            // ambient

	                            if (data.length < 3) {

	                                console.error('MaterialPool::computeObjMaterials(): error in ambient material array at line:' + lineNum);
	                            } else {

	                                data[0] = parseFloat(data[0]), data[1] = parseFloat(data[1]), data[2] = parseFloat(data[2]);

	                                if (currName && Number.isFinite(data[0]) && Number.isFinite(data[1]) && Number.isFinite(data[2])) {

	                                    materials[currName].ambient = [data[0], data[1], data[2]];
	                                } else {

	                                    console.error('MaterialPool::computerObjMaterials(): invalid ambient data at line:' + lineNum);
	                                }
	                            }

	                            break;

	                        case 'Kd':
	                            // diffuse (usually the same as ambient)

	                            if (data.length < 3) {

	                                console.error('MaterialPool::computeObjMaterials(): error in diffuse material array at line:' + lineNum);
	                            } else {

	                                data[0] = parseFloat(data[0]), data[1] = parseFloat(data[1]), data[2] = parseFloat(data[2]);

	                                if (currName && Number.isFinite(data[0]) && Number.isFinite(data[1]) && Number.isFinite(data[2])) {

	                                    materials[currName].diffuse = [data[0], data[1], data[2]];
	                                } else {

	                                    console.error('MaterialPool::computeObjMaterials(): invalid diffuse array at line:' + lineNum);
	                                }
	                            }

	                            break;

	                        case 'Ks':
	                            // specular

	                            if (data.length < 3) {

	                                console.error('MaterialPool::computeObjMaterials(): error in specular array at line:' + lineNum);
	                            } else {

	                                data[0] = parseFloat(data[0]), data[1] = parseFloat(data[1]), data[2] = parseFloat(data[2]);

	                                if (currName && Number.isFinite(data[0]) && Number.isFinite(data[1]) && Number.isFinite(data[2])) {

	                                    materials[currName].specular = [data[0], data[1], data[2]];
	                                } else {

	                                    console.error('MaterialPool::computeObjMaterials(): invalid specular array at line:' + lineNum);
	                                }
	                            }

	                            break;

	                        case 'Ns':
	                            // specular exponent

	                            if (data.length < 1) {

	                                console.error('MaterialPool::computeObjMaterials(): error in specular exponent array at line:' + lineNum);
	                            } else {

	                                data[0] = parseFloat(data[0]);

	                                if (currName && Number.isFinite(data[0]) && data[0] >= 0 && data[0] < 1001) {

	                                    materials[currName].specularExponent = data[0];
	                                } else {

	                                    console.error('MaterialPool::computeObjMaterials(): invalid specular exponent array at line:' + lineNum);
	                                }
	                            }

	                            break;

	                        case 'Ke':
	                            // emissive coefficient

	                            if (data.length < 3) {

	                                console.error('MaterialPool::computeObjMaterials(): error in specular array at line:' + lineNum);
	                            } else {

	                                data[0] = parseFloat(data[0]), data[1] = parseFloat(data[1]), data[2] = parseFloat(data[2]);

	                                if (currName && Number.isFinite(data[0]) && Number.isFinite(data[1]) && Number.isFinite(data[2])) {

	                                    materials[currName].emissive = [data[0], data[1], data[2]];
	                                } else {

	                                    console.error('MaterialPool::computeObjMaterials(): invalid specular array at line:' + lineNum);
	                                }
	                            }

	                            break;

	                        case 'sharpness':
	                            // sharpness, 0-1000, default 60, for reflection maps

	                            data[0] = parseFloat(data[0]);

	                            if (currName && Number.isFinite(data[0]) && data[0] >= 0 && data[0] < 1001) {

	                                materials[currName].sharpness = data[0];
	                            }

	                            break;

	                        case 'Ni':
	                            // optical density (refraction index, 1.0 = no refraction)

	                            data[0] = parseFloat(data[0]);

	                            if (currName && Number.isFinite(data[0]) && data[0] >= 0 && data[0] < 1001) {

	                                materials[currName].refraction = data[0];
	                            }

	                            break;

	                        case 'd': // opacity
	                        case 'Tr':
	                            // transparent

	                            // TODO: handle -halo parameter  d -halo factor

	                            if (data.length < 1) {

	                                console.error('MaterialPool::computeObjMaterials(): error in transparency value at line:' + lineNum);
	                            } else {

	                                data[0] = parseFloat(data[0]);

	                                if (currName && Number.isFinite(data[0])) {

	                                    if (type === 'd') data[0] = 1.0 - data[0]; // Invert

	                                    materials[currName].transparency = data[0]; // single value, 0.0 - 1.0

	                                    /////////console.log('>>>' + prim.name + ' transparency in material:' + currName + ":" + data[ 0 ])
	                                } else {

	                                    console.error('MaterialPool::computeObjMaterials(): invalid transparency value at line:' + lineNum);
	                                }
	                            }

	                            break;

	                        case 'illum':
	                            // illumination mode

	                            if (data.length < 1) {

	                                console.error('MaterialPool::computeObjMaterials(): error in illumination value at line:' + lineNum);
	                            } else {

	                                data[0] = parseInt(data[0]);

	                                if (currName && Number.isFinite(data[0]) && data[0] > 0 && data[0] < 11) {

	                                    /* 
	                                     * VALUES:
	                                     * 0. Color on and Ambient off
	                                     * 1. Color on and Ambient on (DEFAULT FOR THIS APP)
	                                     * 2. Highlight on
	                                     * 3. Reflection on and Ray trace on
	                                     * 4. Transparency: Glass on, Reflection: Ray trace on
	                                     * 5. Reflection: Fresnel on and Ray trace on
	                                     * 6. Transparency: Refraction on, Reflection: Fresnel off and Ray trace on
	                                     * 7. Transparency: Refraction on, Reflection: Fresnel on and Ray trace on
	                                     * 8. Reflection on and Ray trace off
	                                     * 9. Transparency: Glass on, Reflection: Ray trace off
	                                     * 10. Casts shadows onto invisible surfaces
	                                     */

	                                    materials[currName].illum = data[0];
	                                }
	                            }

	                            break;

	                        case 'map_Kd': // diffuse map, an image file (e.g. file.jpg)
	                        case 'map_Ks': // specular map
	                        case 'map_Ka': // ambient map
	                        case 'map_d': // alpha map
	                        case 'bump': // bumpmap
	                        case 'map_bump': // bumpmap
	                        case 'map_refl': // environment map
	                        case 'refl': // environment map
	                        case 'disp':
	                            // displacement map

	                            /* 
	                             * These commands all load single image files, and append to Prim texture list 
	                             * after being emitted with a TEXTURE_2D_READY in PrimFactory.
	                             * @link  "filename" is the name of a color texture or image file.
	                             * @link http://paulbourke.net/dataformats/mtl/
	                             * map_Ka -s 1 1 1 -o 0 0 0 -mm 0 1 file.png
	                             */

	                            //////let tPath = data[ data.length - 1 ].replace(/^.*[\\\/]/, '');

	                            var tPath = _this2.util.getFileName(data[data.length - 1]);

	                            ////////let tPath = data[ data.length - 1 ].trim();

	                            //////////console.log('path:' + path + ' data:' + data + ' tPath:' + tPath)

	                            if (currName) {
	                                // if not, file is corrupt.

	                                // Set the materials texture value to texture path.

	                                materials[currName][type] = tPath;

	                                // get (hyphenated) texture options, if present, and add them to the getTexture() call.

	                                var o = _this2.computeTextureMapOptions(data);

	                                // Convert equivalent types.

	                                if (type === 'bump' || type === 'map_Km') type = 'map_bump';

	                                if (type === 'refl') type = 'map_refl';

	                                if (type === 'disp') type = 'map_disp';

	                                // Save data for texture finding its material later.

	                                var options = {

	                                    fromObj: "OBJ",

	                                    materialKey: materials[currName].key,

	                                    type: type,

	                                    materialName: currName

	                                    // Save options specific to use of this texture.

	                                };options[type + '_options'] = o;

	                                /*
	                                 * NOTE: the texture attaches to prim.textures, so the fourth parmeter is the texture type (map_Kd, map_Ks...).
	                                 * NOTE: the sixth paramater, is NULL since it defines a specific WebGL texture type (we want the default).
	                                 * NOTE: thex seventh paramater, options, if present, we pass those in as well.
	                                 * TODO: HOW DO WE KNOW IF WE ARE LOADING A CUBEMAP TEXTURE????????????
	                                 */

	                                // The Prim uses textures to render, so toggle to true.

	                                //////prim.hasObjTextures = true;

	                                //////console.log("MaterialPool::computeObjMaterials(): setting prim:" + prim.name + ' .hasObjTextures to TRUE')

	                                _this2.texturePool.getTexture(prim, dir + tPath, true, false, null, options);
	                            }

	                            break;

	                        case 'Tf': // transmission filter
	                        case '#': // comment
	                        case '':
	                            // no parameter

	                            break;

	                        default:

	                            console.warn('MaterialPool::computeObjMaterials(): unknown property:' + type + ' in file');

	                            break;

	                    } // end of switch
	                } // end of if data !== ''

	                lineNum++;
	            });

	            return materials;
	        }

	        /** 
	         * create the default Material name for the Prim.
	         */

	    }, {
	        key: 'createDefaultName',
	        value: function createDefaultName(name) {

	            return name + '_' + this.util.DEFAULT_KEY;
	        }

	        /** 
	         * Get a default material when we don't have a .mtl file.
	         */

	    }, {
	        key: 'setDefaultMaterial',
	        value: function setDefaultMaterial(prim, materialName, textureImages) {

	            var defaultName = this.createDefaultName(prim.name);

	            var mi = this.addAsset(this.default(defaultName));

	            mi.type = prim.type, mi.path = prim.path, mi.emits = this.util.emitter.events.MATERIAL_READY;

	            // We don't emit a MATERIAL_READY event for the default

	            // If we have textures, load them.

	            for (var i = 0; i < textureImages.length; i++) {

	                var options = { materialKey: mi.key, materialName: defaultName, type: this.texturePositions[i] };

	                this.texturePool.getTexture(prim, textureImages[i], true, false, this.webgl.getContext().TEXTURE_2D, options);
	            }

	            return mi;
	        }

	        /** 
	         * Add a material.
	         * @param {Prim} prim the requesting Prim object.
	         * @param {Object} data data to construct the Prim GeoBuffer.
	         * @param {String} path the file path to the object.
	         * @param {String} mimeType the MIME type of the file.
	         */

	    }, {
	        key: 'addMaterial',
	        value: function addMaterial(prim, data, path, mimeType) {

	            var m = void 0;

	            var fType = this.util.getFileExtension(path);

	            switch (fType) {

	                case 'mtl':

	                    /////////////console.log("MTL file for prim:" + prim.name + " loaded, parsing....")

	                    // Returns an array with one or more materials.

	                    m = this.computeObjMaterials(data, prim, path);

	                    break;

	                default:

	                    console.warn('MaterialPool::addModel(): unknown material file:' + path + ' MIME type:' + mimeType);

	                    break;

	            }

	            // Add extra properties to all the Materials we generate.

	            if (m) {

	                for (var i in m) {

	                    var mi = m[i];

	                    mi.type = prim.type, mi.path = path, mi.emits = this.util.emitter.events.MATERIAL_READY;

	                    ///////////console.log("MaterialPool::addMaterial(): adding:" + mi.name + " to Prim:" + prim.name )

	                    this.addAsset(mi);
	                }
	            }

	            return m;
	        }

	        /** 
	         * Load models, using a list of paths. If a Model already exists, 
	         * just return it. Otherwise, do the load.
	         * @param {Prim} prim the calling Prim.
	         * @param {Array[String]} path the URL to load.
	         * @param {Boolean} cacheBust if true, add a http://url?random query string to request.
	         */

	    }, {
	        key: 'getMaterial',
	        value: function getMaterial(prim, path) {
	            var _this3 = this;

	            var cacheBust = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { pos: 0 };


	            // Could have an empty path.

	            if (!this.util.isWhitespace(path)) {

	                // Get the image mimeType.

	                var mimeType = this.materialMimeTypes[this.util.getFileExtension(path)];

	                // check if mimeType is OK.

	                if (mimeType) {

	                    this.doRequest(path, options.pos, function (updateObj) {

	                        /* 
	                         * updateObj returned from GetAssets has the following structure:
	                         * { 
	                         *   pos: pos, 
	                         *   path: requestURL, 
	                         *   data: null|response, (Blob, Text, JSON, FormData, ArrayBuffer)
	                         *   error: false|response 
	                         * } 
	                         */

	                        if (updateObj.data) {

	                            var materialObj = _this3.addMaterial(prim, updateObj.data, updateObj.path, mimeType);

	                            // Multiple materials may be returned from one .mtl file.

	                            if (materialObj) {

	                                for (var j in materialObj) {

	                                    console.log("MaterialPool::getMaterial(): emitting new material :" + j + ' for prim:' + prim.name);

	                                    _this3.util.emitter.emit(materialObj[j].emits, prim, materialObj[j].key, options);
	                                }
	                            } // end of material addition.
	                        } else {

	                            console.error('MaterialPool::getMaterials(): no data found for material file:' + updateObj.path);
	                        }
	                    }, cacheBust, mimeType, 0); // end of this.doRequest(), initial request at 0 tries
	                } else {

	                    console.error('MaterialPool::getMaterials(): file type "' + this.util.getFileExtension(path) + ' not supported, not loading');
	                }
	            } else {

	                console.warn('MaterialPool::getMaterials(): empty path supplied for prim ' + prim.name);
	            } // end of valid path

	        } // end of function

	    }]);

	    return MaterialPool;
	}(_assetPool2.default);

	exports.default = MaterialPool;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview gl-matrix - High performance matrix and vector operations
	 * @author Brandon Jones
	 * @author Colin MacKenzie IV
	 * @version 2.3.2
	 */

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	// END HEADER

	exports.glMatrix = __webpack_require__(33);
	exports.mat2 = __webpack_require__(34);
	exports.mat2d = __webpack_require__(35);
	exports.mat3 = __webpack_require__(36);
	exports.mat4 = __webpack_require__(37);
	exports.quat = __webpack_require__(38);
	exports.vec2 = __webpack_require__(41);
	exports.vec3 = __webpack_require__(39);
	exports.vec4 = __webpack_require__(40);

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	/**
	 * @class Common utilities
	 * @name glMatrix
	 */
	var glMatrix = {};

	// Configuration Constants
	glMatrix.EPSILON = 0.000001;
	glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
	glMatrix.RANDOM = Math.random;
	glMatrix.ENABLE_SIMD = false;

	// Capability detection
	glMatrix.SIMD_AVAILABLE = (glMatrix.ARRAY_TYPE === Float32Array) && ('SIMD' in this);
	glMatrix.USE_SIMD = glMatrix.ENABLE_SIMD && glMatrix.SIMD_AVAILABLE;

	/**
	 * Sets the type of array used when creating new vectors and matrices
	 *
	 * @param {Type} type Array type, such as Float32Array or Array
	 */
	glMatrix.setMatrixArrayType = function(type) {
	    glMatrix.ARRAY_TYPE = type;
	}

	var degree = Math.PI / 180;

	/**
	* Convert Degree To Radian
	*
	* @param {Number} Angle in Degrees
	*/
	glMatrix.toRadian = function(a){
	     return a * degree;
	}

	/**
	 * Tests whether or not the arguments have approximately the same value, within an absolute
	 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less 
	 * than or equal to 1.0, and a relative tolerance is used for larger values)
	 * 
	 * @param {Number} a The first number to test.
	 * @param {Number} b The second number to test.
	 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
	 */
	glMatrix.equals = function(a, b) {
		return Math.abs(a - b) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a), Math.abs(b));
	}

	module.exports = glMatrix;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(33);

	/**
	 * @class 2x2 Matrix
	 * @name mat2
	 */
	var mat2 = {};

	/**
	 * Creates a new identity mat2
	 *
	 * @returns {mat2} a new 2x2 matrix
	 */
	mat2.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Creates a new mat2 initialized with values from an existing matrix
	 *
	 * @param {mat2} a matrix to clone
	 * @returns {mat2} a new 2x2 matrix
	 */
	mat2.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Copy the values from one mat2 to another
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Set a mat2 to the identity matrix
	 *
	 * @param {mat2} out the receiving matrix
	 * @returns {mat2} out
	 */
	mat2.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Create a new mat2 with the given values
	 *
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m10 Component in column 1, row 0 position (index 2)
	 * @param {Number} m11 Component in column 1, row 1 position (index 3)
	 * @returns {mat2} out A new 2x2 matrix
	 */
	mat2.fromValues = function(m00, m01, m10, m11) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m10;
	    out[3] = m11;
	    return out;
	};

	/**
	 * Set the components of a mat2 to the given values
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m10 Component in column 1, row 0 position (index 2)
	 * @param {Number} m11 Component in column 1, row 1 position (index 3)
	 * @returns {mat2} out
	 */
	mat2.set = function(out, m00, m01, m10, m11) {
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m10;
	    out[3] = m11;
	    return out;
	};


	/**
	 * Transpose the values of a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a1 = a[1];
	        out[1] = a[2];
	        out[2] = a1;
	    } else {
	        out[0] = a[0];
	        out[1] = a[2];
	        out[2] = a[1];
	        out[3] = a[3];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

	        // Calculate the determinant
	        det = a0 * a3 - a2 * a1;

	    if (!det) {
	        return null;
	    }
	    det = 1.0 / det;
	    
	    out[0] =  a3 * det;
	    out[1] = -a1 * det;
	    out[2] = -a2 * det;
	    out[3] =  a0 * det;

	    return out;
	};

	/**
	 * Calculates the adjugate of a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.adjoint = function(out, a) {
	    // Caching this value is nessecary if out == a
	    var a0 = a[0];
	    out[0] =  a[3];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] =  a0;

	    return out;
	};

	/**
	 * Calculates the determinant of a mat2
	 *
	 * @param {mat2} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat2.determinant = function (a) {
	    return a[0] * a[3] - a[2] * a[1];
	};

	/**
	 * Multiplies two mat2's
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the first operand
	 * @param {mat2} b the second operand
	 * @returns {mat2} out
	 */
	mat2.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    return out;
	};

	/**
	 * Alias for {@link mat2.multiply}
	 * @function
	 */
	mat2.mul = mat2.multiply;

	/**
	 * Rotates a mat2 by the given angle
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2} out
	 */
	mat2.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    return out;
	};

	/**
	 * Scales the mat2 by the dimensions in the given vec2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to rotate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat2} out
	 **/
	mat2.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    return out;
	};

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2.identity(dest);
	 *     mat2.rotate(dest, dest, rad);
	 *
	 * @param {mat2} out mat2 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2} out
	 */
	mat2.fromRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2.identity(dest);
	 *     mat2.scale(dest, dest, vec);
	 *
	 * @param {mat2} out mat2 receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat2} out
	 */
	mat2.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    return out;
	}

	/**
	 * Returns a string representation of a mat2
	 *
	 * @param {mat2} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat2.str = function (a) {
	    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat2
	 *
	 * @param {mat2} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat2.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
	};

	/**
	 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
	 * @param {mat2} L the lower triangular matrix 
	 * @param {mat2} D the diagonal matrix 
	 * @param {mat2} U the upper triangular matrix 
	 * @param {mat2} a the input matrix to factorize
	 */

	mat2.LDU = function (L, D, U, a) { 
	    L[2] = a[2]/a[0]; 
	    U[0] = a[0]; 
	    U[1] = a[1]; 
	    U[3] = a[3] - L[2] * U[1]; 
	    return [L, D, U];       
	}; 

	/**
	 * Adds two mat2's
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the first operand
	 * @param {mat2} b the second operand
	 * @returns {mat2} out
	 */
	mat2.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    return out;
	};

	/**
	 * Subtracts matrix b from matrix a
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the first operand
	 * @param {mat2} b the second operand
	 * @returns {mat2} out
	 */
	mat2.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    return out;
	};

	/**
	 * Alias for {@link mat2.subtract}
	 * @function
	 */
	mat2.sub = mat2.subtract;

	/**
	 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {mat2} a The first matrix.
	 * @param {mat2} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat2.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	};

	/**
	 * Returns whether or not the matrices have approximately the same elements in the same position.
	 *
	 * @param {mat2} a The first matrix.
	 * @param {mat2} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat2.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
	            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
	};

	/**
	 * Multiply each element of the matrix by a scalar.
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to scale
	 * @param {Number} b amount to scale the matrix's elements by
	 * @returns {mat2} out
	 */
	mat2.multiplyScalar = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    return out;
	};

	/**
	 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
	 *
	 * @param {mat2} out the receiving vector
	 * @param {mat2} a the first operand
	 * @param {mat2} b the second operand
	 * @param {Number} scale the amount to scale b's elements by before adding
	 * @returns {mat2} out
	 */
	mat2.multiplyScalarAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    return out;
	};

	module.exports = mat2;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(33);

	/**
	 * @class 2x3 Matrix
	 * @name mat2d
	 * 
	 * @description 
	 * A mat2d contains six elements defined as:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty]
	 * </pre>
	 * This is a short form for the 3x3 matrix:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty,
	 *  0, 0, 1]
	 * </pre>
	 * The last row is ignored so the array is shorter and operations are faster.
	 */
	var mat2d = {};

	/**
	 * Creates a new identity mat2d
	 *
	 * @returns {mat2d} a new 2x3 matrix
	 */
	mat2d.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};

	/**
	 * Creates a new mat2d initialized with values from an existing matrix
	 *
	 * @param {mat2d} a matrix to clone
	 * @returns {mat2d} a new 2x3 matrix
	 */
	mat2d.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};

	/**
	 * Copy the values from one mat2d to another
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the source matrix
	 * @returns {mat2d} out
	 */
	mat2d.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};

	/**
	 * Set a mat2d to the identity matrix
	 *
	 * @param {mat2d} out the receiving matrix
	 * @returns {mat2d} out
	 */
	mat2d.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};

	/**
	 * Create a new mat2d with the given values
	 *
	 * @param {Number} a Component A (index 0)
	 * @param {Number} b Component B (index 1)
	 * @param {Number} c Component C (index 2)
	 * @param {Number} d Component D (index 3)
	 * @param {Number} tx Component TX (index 4)
	 * @param {Number} ty Component TY (index 5)
	 * @returns {mat2d} A new mat2d
	 */
	mat2d.fromValues = function(a, b, c, d, tx, ty) {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = a;
	    out[1] = b;
	    out[2] = c;
	    out[3] = d;
	    out[4] = tx;
	    out[5] = ty;
	    return out;
	};

	/**
	 * Set the components of a mat2d to the given values
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {Number} a Component A (index 0)
	 * @param {Number} b Component B (index 1)
	 * @param {Number} c Component C (index 2)
	 * @param {Number} d Component D (index 3)
	 * @param {Number} tx Component TX (index 4)
	 * @param {Number} ty Component TY (index 5)
	 * @returns {mat2d} out
	 */
	mat2d.set = function(out, a, b, c, d, tx, ty) {
	    out[0] = a;
	    out[1] = b;
	    out[2] = c;
	    out[3] = d;
	    out[4] = tx;
	    out[5] = ty;
	    return out;
	};

	/**
	 * Inverts a mat2d
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the source matrix
	 * @returns {mat2d} out
	 */
	mat2d.invert = function(out, a) {
	    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
	        atx = a[4], aty = a[5];

	    var det = aa * ad - ab * ac;
	    if(!det){
	        return null;
	    }
	    det = 1.0 / det;

	    out[0] = ad * det;
	    out[1] = -ab * det;
	    out[2] = -ac * det;
	    out[3] = aa * det;
	    out[4] = (ac * aty - ad * atx) * det;
	    out[5] = (ab * atx - aa * aty) * det;
	    return out;
	};

	/**
	 * Calculates the determinant of a mat2d
	 *
	 * @param {mat2d} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat2d.determinant = function (a) {
	    return a[0] * a[3] - a[1] * a[2];
	};

	/**
	 * Multiplies two mat2d's
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the first operand
	 * @param {mat2d} b the second operand
	 * @returns {mat2d} out
	 */
	mat2d.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    out[4] = a0 * b4 + a2 * b5 + a4;
	    out[5] = a1 * b4 + a3 * b5 + a5;
	    return out;
	};

	/**
	 * Alias for {@link mat2d.multiply}
	 * @function
	 */
	mat2d.mul = mat2d.multiply;

	/**
	 * Rotates a mat2d by the given angle
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2d} out
	 */
	mat2d.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};

	/**
	 * Scales the mat2d by the dimensions in the given vec2
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to translate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat2d} out
	 **/
	mat2d.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};

	/**
	 * Translates the mat2d by the dimensions in the given vec2
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to translate
	 * @param {vec2} v the vec2 to translate the matrix by
	 * @returns {mat2d} out
	 **/
	mat2d.translate = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0;
	    out[1] = a1;
	    out[2] = a2;
	    out[3] = a3;
	    out[4] = a0 * v0 + a2 * v1 + a4;
	    out[5] = a1 * v0 + a3 * v1 + a5;
	    return out;
	};

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.rotate(dest, dest, rad);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2d} out
	 */
	mat2d.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.scale(dest, dest, vec);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat2d} out
	 */
	mat2d.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.translate(dest, dest, vec);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {vec2} v Translation vector
	 * @returns {mat2d} out
	 */
	mat2d.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = v[0];
	    out[5] = v[1];
	    return out;
	}

	/**
	 * Returns a string representation of a mat2d
	 *
	 * @param {mat2d} a matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat2d.str = function (a) {
	    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat2d
	 *
	 * @param {mat2d} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat2d.frob = function (a) { 
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
	}; 

	/**
	 * Adds two mat2d's
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the first operand
	 * @param {mat2d} b the second operand
	 * @returns {mat2d} out
	 */
	mat2d.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    out[4] = a[4] + b[4];
	    out[5] = a[5] + b[5];
	    return out;
	};

	/**
	 * Subtracts matrix b from matrix a
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the first operand
	 * @param {mat2d} b the second operand
	 * @returns {mat2d} out
	 */
	mat2d.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    out[4] = a[4] - b[4];
	    out[5] = a[5] - b[5];
	    return out;
	};

	/**
	 * Alias for {@link mat2d.subtract}
	 * @function
	 */
	mat2d.sub = mat2d.subtract;

	/**
	 * Multiply each element of the matrix by a scalar.
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to scale
	 * @param {Number} b amount to scale the matrix's elements by
	 * @returns {mat2d} out
	 */
	mat2d.multiplyScalar = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    out[4] = a[4] * b;
	    out[5] = a[5] * b;
	    return out;
	};

	/**
	 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
	 *
	 * @param {mat2d} out the receiving vector
	 * @param {mat2d} a the first operand
	 * @param {mat2d} b the second operand
	 * @param {Number} scale the amount to scale b's elements by before adding
	 * @returns {mat2d} out
	 */
	mat2d.multiplyScalarAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    out[4] = a[4] + (b[4] * scale);
	    out[5] = a[5] + (b[5] * scale);
	    return out;
	};

	/**
	 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {mat2d} a The first matrix.
	 * @param {mat2d} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat2d.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
	};

	/**
	 * Returns whether or not the matrices have approximately the same elements in the same position.
	 *
	 * @param {mat2d} a The first matrix.
	 * @param {mat2d} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat2d.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
	            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
	            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
	            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)));
	};

	module.exports = mat2d;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(33);

	/**
	 * @class 3x3 Matrix
	 * @name mat3
	 */
	var mat3 = {};

	/**
	 * Creates a new identity mat3
	 *
	 * @returns {mat3} a new 3x3 matrix
	 */
	mat3.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};

	/**
	 * Copies the upper-left 3x3 values into the given mat3.
	 *
	 * @param {mat3} out the receiving 3x3 matrix
	 * @param {mat4} a   the source 4x4 matrix
	 * @returns {mat3} out
	 */
	mat3.fromMat4 = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[4];
	    out[4] = a[5];
	    out[5] = a[6];
	    out[6] = a[8];
	    out[7] = a[9];
	    out[8] = a[10];
	    return out;
	};

	/**
	 * Creates a new mat3 initialized with values from an existing matrix
	 *
	 * @param {mat3} a matrix to clone
	 * @returns {mat3} a new 3x3 matrix
	 */
	mat3.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Copy the values from one mat3 to another
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Create a new mat3 with the given values
	 *
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m02 Component in column 0, row 2 position (index 2)
	 * @param {Number} m10 Component in column 1, row 0 position (index 3)
	 * @param {Number} m11 Component in column 1, row 1 position (index 4)
	 * @param {Number} m12 Component in column 1, row 2 position (index 5)
	 * @param {Number} m20 Component in column 2, row 0 position (index 6)
	 * @param {Number} m21 Component in column 2, row 1 position (index 7)
	 * @param {Number} m22 Component in column 2, row 2 position (index 8)
	 * @returns {mat3} A new mat3
	 */
	mat3.fromValues = function(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m02;
	    out[3] = m10;
	    out[4] = m11;
	    out[5] = m12;
	    out[6] = m20;
	    out[7] = m21;
	    out[8] = m22;
	    return out;
	};

	/**
	 * Set the components of a mat3 to the given values
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m02 Component in column 0, row 2 position (index 2)
	 * @param {Number} m10 Component in column 1, row 0 position (index 3)
	 * @param {Number} m11 Component in column 1, row 1 position (index 4)
	 * @param {Number} m12 Component in column 1, row 2 position (index 5)
	 * @param {Number} m20 Component in column 2, row 0 position (index 6)
	 * @param {Number} m21 Component in column 2, row 1 position (index 7)
	 * @param {Number} m22 Component in column 2, row 2 position (index 8)
	 * @returns {mat3} out
	 */
	mat3.set = function(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m02;
	    out[3] = m10;
	    out[4] = m11;
	    out[5] = m12;
	    out[6] = m20;
	    out[7] = m21;
	    out[8] = m22;
	    return out;
	};

	/**
	 * Set a mat3 to the identity matrix
	 *
	 * @param {mat3} out the receiving matrix
	 * @returns {mat3} out
	 */
	mat3.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a12 = a[5];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a01;
	        out[5] = a[7];
	        out[6] = a02;
	        out[7] = a12;
	    } else {
	        out[0] = a[0];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a[1];
	        out[4] = a[4];
	        out[5] = a[7];
	        out[6] = a[2];
	        out[7] = a[5];
	        out[8] = a[8];
	    }
	    
	    return out;
	};

	/**
	 * Inverts a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        b01 = a22 * a11 - a12 * a21,
	        b11 = -a22 * a10 + a12 * a20,
	        b21 = a21 * a10 - a11 * a20,

	        // Calculate the determinant
	        det = a00 * b01 + a01 * b11 + a02 * b21;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = b01 * det;
	    out[1] = (-a22 * a01 + a02 * a21) * det;
	    out[2] = (a12 * a01 - a02 * a11) * det;
	    out[3] = b11 * det;
	    out[4] = (a22 * a00 - a02 * a20) * det;
	    out[5] = (-a12 * a00 + a02 * a10) * det;
	    out[6] = b21 * det;
	    out[7] = (-a21 * a00 + a01 * a20) * det;
	    out[8] = (a11 * a00 - a01 * a10) * det;
	    return out;
	};

	/**
	 * Calculates the adjugate of a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];

	    out[0] = (a11 * a22 - a12 * a21);
	    out[1] = (a02 * a21 - a01 * a22);
	    out[2] = (a01 * a12 - a02 * a11);
	    out[3] = (a12 * a20 - a10 * a22);
	    out[4] = (a00 * a22 - a02 * a20);
	    out[5] = (a02 * a10 - a00 * a12);
	    out[6] = (a10 * a21 - a11 * a20);
	    out[7] = (a01 * a20 - a00 * a21);
	    out[8] = (a00 * a11 - a01 * a10);
	    return out;
	};

	/**
	 * Calculates the determinant of a mat3
	 *
	 * @param {mat3} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat3.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];

	    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
	};

	/**
	 * Multiplies two mat3's
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @returns {mat3} out
	 */
	mat3.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        b00 = b[0], b01 = b[1], b02 = b[2],
	        b10 = b[3], b11 = b[4], b12 = b[5],
	        b20 = b[6], b21 = b[7], b22 = b[8];

	    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
	    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
	    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

	    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
	    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
	    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

	    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
	    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
	    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
	    return out;
	};

	/**
	 * Alias for {@link mat3.multiply}
	 * @function
	 */
	mat3.mul = mat3.multiply;

	/**
	 * Translate a mat3 by the given vector
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to translate
	 * @param {vec2} v vector to translate by
	 * @returns {mat3} out
	 */
	mat3.translate = function(out, a, v) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],
	        x = v[0], y = v[1];

	    out[0] = a00;
	    out[1] = a01;
	    out[2] = a02;

	    out[3] = a10;
	    out[4] = a11;
	    out[5] = a12;

	    out[6] = x * a00 + y * a10 + a20;
	    out[7] = x * a01 + y * a11 + a21;
	    out[8] = x * a02 + y * a12 + a22;
	    return out;
	};

	/**
	 * Rotates a mat3 by the given angle
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat3} out
	 */
	mat3.rotate = function (out, a, rad) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],

	        s = Math.sin(rad),
	        c = Math.cos(rad);

	    out[0] = c * a00 + s * a10;
	    out[1] = c * a01 + s * a11;
	    out[2] = c * a02 + s * a12;

	    out[3] = c * a10 - s * a00;
	    out[4] = c * a11 - s * a01;
	    out[5] = c * a12 - s * a02;

	    out[6] = a20;
	    out[7] = a21;
	    out[8] = a22;
	    return out;
	};

	/**
	 * Scales the mat3 by the dimensions in the given vec2
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat3} out
	 **/
	mat3.scale = function(out, a, v) {
	    var x = v[0], y = v[1];

	    out[0] = x * a[0];
	    out[1] = x * a[1];
	    out[2] = x * a[2];

	    out[3] = y * a[3];
	    out[4] = y * a[4];
	    out[5] = y * a[5];

	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.translate(dest, dest, vec);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {vec2} v Translation vector
	 * @returns {mat3} out
	 */
	mat3.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = v[0];
	    out[7] = v[1];
	    out[8] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.rotate(dest, dest, rad);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat3} out
	 */
	mat3.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);

	    out[0] = c;
	    out[1] = s;
	    out[2] = 0;

	    out[3] = -s;
	    out[4] = c;
	    out[5] = 0;

	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.scale(dest, dest, vec);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat3} out
	 */
	mat3.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;

	    out[3] = 0;
	    out[4] = v[1];
	    out[5] = 0;

	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}

	/**
	 * Copies the values from a mat2d into a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat2d} a the matrix to copy
	 * @returns {mat3} out
	 **/
	mat3.fromMat2d = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = 0;

	    out[3] = a[2];
	    out[4] = a[3];
	    out[5] = 0;

	    out[6] = a[4];
	    out[7] = a[5];
	    out[8] = 1;
	    return out;
	};

	/**
	* Calculates a 3x3 matrix from the given quaternion
	*
	* @param {mat3} out mat3 receiving operation result
	* @param {quat} q Quaternion to create matrix from
	*
	* @returns {mat3} out
	*/
	mat3.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - yy - zz;
	    out[3] = yx - wz;
	    out[6] = zx + wy;

	    out[1] = yx + wz;
	    out[4] = 1 - xx - zz;
	    out[7] = zy - wx;

	    out[2] = zx - wy;
	    out[5] = zy + wx;
	    out[8] = 1 - xx - yy;

	    return out;
	};

	/**
	* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
	*
	* @param {mat3} out mat3 receiving operation result
	* @param {mat4} a Mat4 to derive the normal matrix from
	*
	* @returns {mat3} out
	*/
	mat3.normalFromMat4 = function (out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,

	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;

	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

	    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

	    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

	    return out;
	};

	/**
	 * Returns a string representation of a mat3
	 *
	 * @param {mat3} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat3.str = function (a) {
	    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
	                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat3
	 *
	 * @param {mat3} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat3.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
	};

	/**
	 * Adds two mat3's
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @returns {mat3} out
	 */
	mat3.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    out[4] = a[4] + b[4];
	    out[5] = a[5] + b[5];
	    out[6] = a[6] + b[6];
	    out[7] = a[7] + b[7];
	    out[8] = a[8] + b[8];
	    return out;
	};

	/**
	 * Subtracts matrix b from matrix a
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @returns {mat3} out
	 */
	mat3.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    out[4] = a[4] - b[4];
	    out[5] = a[5] - b[5];
	    out[6] = a[6] - b[6];
	    out[7] = a[7] - b[7];
	    out[8] = a[8] - b[8];
	    return out;
	};

	/**
	 * Alias for {@link mat3.subtract}
	 * @function
	 */
	mat3.sub = mat3.subtract;

	/**
	 * Multiply each element of the matrix by a scalar.
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to scale
	 * @param {Number} b amount to scale the matrix's elements by
	 * @returns {mat3} out
	 */
	mat3.multiplyScalar = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    out[4] = a[4] * b;
	    out[5] = a[5] * b;
	    out[6] = a[6] * b;
	    out[7] = a[7] * b;
	    out[8] = a[8] * b;
	    return out;
	};

	/**
	 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
	 *
	 * @param {mat3} out the receiving vector
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @param {Number} scale the amount to scale b's elements by before adding
	 * @returns {mat3} out
	 */
	mat3.multiplyScalarAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    out[4] = a[4] + (b[4] * scale);
	    out[5] = a[5] + (b[5] * scale);
	    out[6] = a[6] + (b[6] * scale);
	    out[7] = a[7] + (b[7] * scale);
	    out[8] = a[8] + (b[8] * scale);
	    return out;
	};

	/*
	 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {mat3} a The first matrix.
	 * @param {mat3} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat3.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && 
	           a[3] === b[3] && a[4] === b[4] && a[5] === b[5] &&
	           a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
	};

	/**
	 * Returns whether or not the matrices have approximately the same elements in the same position.
	 *
	 * @param {mat3} a The first matrix.
	 * @param {mat3} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat3.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = a[6], b7 = b[7], b8 = b[8];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
	            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
	            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
	            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
	            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
	            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
	            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)));
	};


	module.exports = mat3;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(33);

	/**
	 * @class 4x4 Matrix
	 * @name mat4
	 */
	var mat4 = {
	  scalar: {},
	  SIMD: {},
	};

	/**
	 * Creates a new identity mat4
	 *
	 * @returns {mat4} a new 4x4 matrix
	 */
	mat4.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Creates a new mat4 initialized with values from an existing matrix
	 *
	 * @param {mat4} a matrix to clone
	 * @returns {mat4} a new 4x4 matrix
	 */
	mat4.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Copy the values from one mat4 to another
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Create a new mat4 with the given values
	 *
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m02 Component in column 0, row 2 position (index 2)
	 * @param {Number} m03 Component in column 0, row 3 position (index 3)
	 * @param {Number} m10 Component in column 1, row 0 position (index 4)
	 * @param {Number} m11 Component in column 1, row 1 position (index 5)
	 * @param {Number} m12 Component in column 1, row 2 position (index 6)
	 * @param {Number} m13 Component in column 1, row 3 position (index 7)
	 * @param {Number} m20 Component in column 2, row 0 position (index 8)
	 * @param {Number} m21 Component in column 2, row 1 position (index 9)
	 * @param {Number} m22 Component in column 2, row 2 position (index 10)
	 * @param {Number} m23 Component in column 2, row 3 position (index 11)
	 * @param {Number} m30 Component in column 3, row 0 position (index 12)
	 * @param {Number} m31 Component in column 3, row 1 position (index 13)
	 * @param {Number} m32 Component in column 3, row 2 position (index 14)
	 * @param {Number} m33 Component in column 3, row 3 position (index 15)
	 * @returns {mat4} A new mat4
	 */
	mat4.fromValues = function(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m02;
	    out[3] = m03;
	    out[4] = m10;
	    out[5] = m11;
	    out[6] = m12;
	    out[7] = m13;
	    out[8] = m20;
	    out[9] = m21;
	    out[10] = m22;
	    out[11] = m23;
	    out[12] = m30;
	    out[13] = m31;
	    out[14] = m32;
	    out[15] = m33;
	    return out;
	};

	/**
	 * Set the components of a mat4 to the given values
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {Number} m00 Component in column 0, row 0 position (index 0)
	 * @param {Number} m01 Component in column 0, row 1 position (index 1)
	 * @param {Number} m02 Component in column 0, row 2 position (index 2)
	 * @param {Number} m03 Component in column 0, row 3 position (index 3)
	 * @param {Number} m10 Component in column 1, row 0 position (index 4)
	 * @param {Number} m11 Component in column 1, row 1 position (index 5)
	 * @param {Number} m12 Component in column 1, row 2 position (index 6)
	 * @param {Number} m13 Component in column 1, row 3 position (index 7)
	 * @param {Number} m20 Component in column 2, row 0 position (index 8)
	 * @param {Number} m21 Component in column 2, row 1 position (index 9)
	 * @param {Number} m22 Component in column 2, row 2 position (index 10)
	 * @param {Number} m23 Component in column 2, row 3 position (index 11)
	 * @param {Number} m30 Component in column 3, row 0 position (index 12)
	 * @param {Number} m31 Component in column 3, row 1 position (index 13)
	 * @param {Number} m32 Component in column 3, row 2 position (index 14)
	 * @param {Number} m33 Component in column 3, row 3 position (index 15)
	 * @returns {mat4} out
	 */
	mat4.set = function(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
	    out[0] = m00;
	    out[1] = m01;
	    out[2] = m02;
	    out[3] = m03;
	    out[4] = m10;
	    out[5] = m11;
	    out[6] = m12;
	    out[7] = m13;
	    out[8] = m20;
	    out[9] = m21;
	    out[10] = m22;
	    out[11] = m23;
	    out[12] = m30;
	    out[13] = m31;
	    out[14] = m32;
	    out[15] = m33;
	    return out;
	};


	/**
	 * Set a mat4 to the identity matrix
	 *
	 * @param {mat4} out the receiving matrix
	 * @returns {mat4} out
	 */
	mat4.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Transpose the values of a mat4 not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.scalar.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a03 = a[3],
	            a12 = a[6], a13 = a[7],
	            a23 = a[11];

	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a01;
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a02;
	        out[9] = a12;
	        out[11] = a[14];
	        out[12] = a03;
	        out[13] = a13;
	        out[14] = a23;
	    } else {
	        out[0] = a[0];
	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a[1];
	        out[5] = a[5];
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a[2];
	        out[9] = a[6];
	        out[10] = a[10];
	        out[11] = a[14];
	        out[12] = a[3];
	        out[13] = a[7];
	        out[14] = a[11];
	        out[15] = a[15];
	    }

	    return out;
	};

	/**
	 * Transpose the values of a mat4 using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.SIMD.transpose = function(out, a) {
	    var a0, a1, a2, a3,
	        tmp01, tmp23,
	        out0, out1, out2, out3;

	    a0 = SIMD.Float32x4.load(a, 0);
	    a1 = SIMD.Float32x4.load(a, 4);
	    a2 = SIMD.Float32x4.load(a, 8);
	    a3 = SIMD.Float32x4.load(a, 12);

	    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
	    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
	    out0  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
	    out1  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
	    SIMD.Float32x4.store(out, 0,  out0);
	    SIMD.Float32x4.store(out, 4,  out1);

	    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
	    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
	    out2  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
	    out3  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
	    SIMD.Float32x4.store(out, 8,  out2);
	    SIMD.Float32x4.store(out, 12, out3);

	    return out;
	};

	/**
	 * Transpse a mat4 using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.transpose = glMatrix.USE_SIMD ? mat4.SIMD.transpose : mat4.scalar.transpose;

	/**
	 * Inverts a mat4 not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.scalar.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,

	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	    if (!det) {
	        return null;
	    }
	    det = 1.0 / det;

	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

	    return out;
	};

	/**
	 * Inverts a mat4 using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.SIMD.invert = function(out, a) {
	  var row0, row1, row2, row3,
	      tmp1,
	      minor0, minor1, minor2, minor3,
	      det,
	      a0 = SIMD.Float32x4.load(a, 0),
	      a1 = SIMD.Float32x4.load(a, 4),
	      a2 = SIMD.Float32x4.load(a, 8),
	      a3 = SIMD.Float32x4.load(a, 12);

	  // Compute matrix adjugate
	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
	  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
	  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
	  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
	  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
	  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
	  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

	  tmp1   = SIMD.Float32x4.mul(row2, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.mul(row1, tmp1);
	  minor1 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
	  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
	  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row1, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
	  minor3 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
	  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
	  minor2 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
	  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row0, row1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
	  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

	  // Compute matrix determinant
	  det   = SIMD.Float32x4.mul(row0, minor0);
	  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
	  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
	  tmp1  = SIMD.Float32x4.reciprocalApproximation(det);
	  det   = SIMD.Float32x4.sub(
	               SIMD.Float32x4.add(tmp1, tmp1),
	               SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
	  det   = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
	  if (!det) {
	      return null;
	  }

	  // Compute matrix inverse
	  SIMD.Float32x4.store(out, 0,  SIMD.Float32x4.mul(det, minor0));
	  SIMD.Float32x4.store(out, 4,  SIMD.Float32x4.mul(det, minor1));
	  SIMD.Float32x4.store(out, 8,  SIMD.Float32x4.mul(det, minor2));
	  SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
	  return out;
	}

	/**
	 * Inverts a mat4 using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.invert = glMatrix.USE_SIMD ? mat4.SIMD.invert : mat4.scalar.invert;

	/**
	 * Calculates the adjugate of a mat4 not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.scalar.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
	    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
	    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
	    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
	    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
	    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
	    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
	    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
	    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
	    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
	    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
	    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
	    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
	    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
	    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
	    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
	    return out;
	};

	/**
	 * Calculates the adjugate of a mat4 using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.SIMD.adjoint = function(out, a) {
	  var a0, a1, a2, a3;
	  var row0, row1, row2, row3;
	  var tmp1;
	  var minor0, minor1, minor2, minor3;

	  var a0 = SIMD.Float32x4.load(a, 0);
	  var a1 = SIMD.Float32x4.load(a, 4);
	  var a2 = SIMD.Float32x4.load(a, 8);
	  var a3 = SIMD.Float32x4.load(a, 12);

	  // Transpose the source matrix.  Sort of.  Not a true transpose operation
	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
	  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
	  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
	  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

	  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
	  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
	  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
	  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

	  tmp1   = SIMD.Float32x4.mul(row2, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.mul(row1, tmp1);
	  minor1 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
	  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
	  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row1, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
	  minor3 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
	  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
	  minor2 = SIMD.Float32x4.mul(row0, tmp1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
	  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

	  tmp1   = SIMD.Float32x4.mul(row0, row1);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row3);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
	  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
	  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

	  tmp1   = SIMD.Float32x4.mul(row0, row2);
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
	  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
	  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
	  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
	  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
	  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

	  SIMD.Float32x4.store(out, 0,  minor0);
	  SIMD.Float32x4.store(out, 4,  minor1);
	  SIMD.Float32x4.store(out, 8,  minor2);
	  SIMD.Float32x4.store(out, 12, minor3);
	  return out;
	};

	/**
	 * Calculates the adjugate of a mat4 using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	 mat4.adjoint = glMatrix.USE_SIMD ? mat4.SIMD.adjoint : mat4.scalar.adjoint;

	/**
	 * Calculates the determinant of a mat4
	 *
	 * @param {mat4} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat4.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32;

	    // Calculate the determinant
	    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	};

	/**
	 * Multiplies two mat4's explicitly using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand, must be a Float32Array
	 * @param {mat4} b the second operand, must be a Float32Array
	 * @returns {mat4} out
	 */
	mat4.SIMD.multiply = function (out, a, b) {
	    var a0 = SIMD.Float32x4.load(a, 0);
	    var a1 = SIMD.Float32x4.load(a, 4);
	    var a2 = SIMD.Float32x4.load(a, 8);
	    var a3 = SIMD.Float32x4.load(a, 12);

	    var b0 = SIMD.Float32x4.load(b, 0);
	    var out0 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1),
	                       SIMD.Float32x4.add(
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2),
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 0, out0);

	    var b1 = SIMD.Float32x4.load(b, 4);
	    var out1 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1),
	                       SIMD.Float32x4.add(
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2),
	                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 4, out1);

	    var b2 = SIMD.Float32x4.load(b, 8);
	    var out2 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1),
	                       SIMD.Float32x4.add(
	                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2),
	                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 8, out2);

	    var b3 = SIMD.Float32x4.load(b, 12);
	    var out3 = SIMD.Float32x4.add(
	                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0),
	                   SIMD.Float32x4.add(
	                        SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1),
	                        SIMD.Float32x4.add(
	                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2),
	                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
	    SIMD.Float32x4.store(out, 12, out3);

	    return out;
	};

	/**
	 * Multiplies two mat4's explicitly not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	mat4.scalar.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	    // Cache only the current line of the second matrix
	    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
	    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
	    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
	    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
	    return out;
	};

	/**
	 * Multiplies two mat4's using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	mat4.multiply = glMatrix.USE_SIMD ? mat4.SIMD.multiply : mat4.scalar.multiply;

	/**
	 * Alias for {@link mat4.multiply}
	 * @function
	 */
	mat4.mul = mat4.multiply;

	/**
	 * Translate a mat4 by the given vector not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to translate
	 * @param {vec3} v vector to translate by
	 * @returns {mat4} out
	 */
	mat4.scalar.translate = function (out, a, v) {
	    var x = v[0], y = v[1], z = v[2],
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23;

	    if (a === out) {
	        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
	        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
	        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
	        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	    } else {
	        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
	        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
	        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

	        out[12] = a00 * x + a10 * y + a20 * z + a[12];
	        out[13] = a01 * x + a11 * y + a21 * z + a[13];
	        out[14] = a02 * x + a12 * y + a22 * z + a[14];
	        out[15] = a03 * x + a13 * y + a23 * z + a[15];
	    }

	    return out;
	};

	/**
	 * Translates a mat4 by the given vector using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to translate
	 * @param {vec3} v vector to translate by
	 * @returns {mat4} out
	 */
	mat4.SIMD.translate = function (out, a, v) {
	    var a0 = SIMD.Float32x4.load(a, 0),
	        a1 = SIMD.Float32x4.load(a, 4),
	        a2 = SIMD.Float32x4.load(a, 8),
	        a3 = SIMD.Float32x4.load(a, 12),
	        vec = SIMD.Float32x4(v[0], v[1], v[2] , 0);

	    if (a !== out) {
	        out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3];
	        out[4] = a[4]; out[5] = a[5]; out[6] = a[6]; out[7] = a[7];
	        out[8] = a[8]; out[9] = a[9]; out[10] = a[10]; out[11] = a[11];
	    }

	    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
	    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
	    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

	    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
	    SIMD.Float32x4.store(out, 12, t0);

	    return out;
	};

	/**
	 * Translates a mat4 by the given vector using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to translate
	 * @param {vec3} v vector to translate by
	 * @returns {mat4} out
	 */
	mat4.translate = glMatrix.USE_SIMD ? mat4.SIMD.translate : mat4.scalar.translate;

	/**
	 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {vec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/
	mat4.scalar.scale = function(out, a, v) {
	    var x = v[0], y = v[1], z = v[2];

	    out[0] = a[0] * x;
	    out[1] = a[1] * x;
	    out[2] = a[2] * x;
	    out[3] = a[3] * x;
	    out[4] = a[4] * y;
	    out[5] = a[5] * y;
	    out[6] = a[6] * y;
	    out[7] = a[7] * y;
	    out[8] = a[8] * z;
	    out[9] = a[9] * z;
	    out[10] = a[10] * z;
	    out[11] = a[11] * z;
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Scales the mat4 by the dimensions in the given vec3 using vectorization
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {vec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/
	mat4.SIMD.scale = function(out, a, v) {
	    var a0, a1, a2;
	    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

	    a0 = SIMD.Float32x4.load(a, 0);
	    SIMD.Float32x4.store(
	        out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

	    a1 = SIMD.Float32x4.load(a, 4);
	    SIMD.Float32x4.store(
	        out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

	    a2 = SIMD.Float32x4.load(a, 8);
	    SIMD.Float32x4.store(
	        out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};

	/**
	 * Scales the mat4 by the dimensions in the given vec3 using SIMD if available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {vec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 */
	mat4.scale = glMatrix.USE_SIMD ? mat4.SIMD.scale : mat4.scalar.scale;

	/**
	 * Rotates a mat4 by the given angle around the given axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	mat4.rotate = function (out, a, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t,
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23,
	        b00, b01, b02,
	        b10, b11, b12,
	        b20, b21, b22;

	    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;

	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;

	    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

	    // Construct the elements of the rotation matrix
	    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
	    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
	    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

	    // Perform rotation-specific matrix multiplication
	    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the X axis not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.scalar.rotateX = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[0]  = a[0];
	        out[1]  = a[1];
	        out[2]  = a[2];
	        out[3]  = a[3];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[4] = a10 * c + a20 * s;
	    out[5] = a11 * c + a21 * s;
	    out[6] = a12 * c + a22 * s;
	    out[7] = a13 * c + a23 * s;
	    out[8] = a20 * c - a10 * s;
	    out[9] = a21 * c - a11 * s;
	    out[10] = a22 * c - a12 * s;
	    out[11] = a23 * c - a13 * s;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the X axis using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.SIMD.rotateX = function (out, a, rad) {
	    var s = SIMD.Float32x4.splat(Math.sin(rad)),
	        c = SIMD.Float32x4.splat(Math.cos(rad));

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	      out[0]  = a[0];
	      out[1]  = a[1];
	      out[2]  = a[2];
	      out[3]  = a[3];
	      out[12] = a[12];
	      out[13] = a[13];
	      out[14] = a[14];
	      out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    var a_1 = SIMD.Float32x4.load(a, 4);
	    var a_2 = SIMD.Float32x4.load(a, 8);
	    SIMD.Float32x4.store(out, 4,
	                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
	    SIMD.Float32x4.store(out, 8,
	                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the X axis using SIMD if availabe and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.rotateX = glMatrix.USE_SIMD ? mat4.SIMD.rotateX : mat4.scalar.rotateX;

	/**
	 * Rotates a matrix by the given angle around the Y axis not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.scalar.rotateY = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[4]  = a[4];
	        out[5]  = a[5];
	        out[6]  = a[6];
	        out[7]  = a[7];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c - a20 * s;
	    out[1] = a01 * c - a21 * s;
	    out[2] = a02 * c - a22 * s;
	    out[3] = a03 * c - a23 * s;
	    out[8] = a00 * s + a20 * c;
	    out[9] = a01 * s + a21 * c;
	    out[10] = a02 * s + a22 * c;
	    out[11] = a03 * s + a23 * c;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Y axis using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.SIMD.rotateY = function (out, a, rad) {
	    var s = SIMD.Float32x4.splat(Math.sin(rad)),
	        c = SIMD.Float32x4.splat(Math.cos(rad));

	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[4]  = a[4];
	        out[5]  = a[5];
	        out[6]  = a[6];
	        out[7]  = a[7];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    var a_0 = SIMD.Float32x4.load(a, 0);
	    var a_2 = SIMD.Float32x4.load(a, 8);
	    SIMD.Float32x4.store(out, 0,
	                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
	    SIMD.Float32x4.store(out, 8,
	                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Y axis if SIMD available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	 mat4.rotateY = glMatrix.USE_SIMD ? mat4.SIMD.rotateY : mat4.scalar.rotateY;

	/**
	 * Rotates a matrix by the given angle around the Z axis not using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.scalar.rotateZ = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7];

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[8]  = a[8];
	        out[9]  = a[9];
	        out[10] = a[10];
	        out[11] = a[11];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c + a10 * s;
	    out[1] = a01 * c + a11 * s;
	    out[2] = a02 * c + a12 * s;
	    out[3] = a03 * c + a13 * s;
	    out[4] = a10 * c - a00 * s;
	    out[5] = a11 * c - a01 * s;
	    out[6] = a12 * c - a02 * s;
	    out[7] = a13 * c - a03 * s;
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Z axis using SIMD
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.SIMD.rotateZ = function (out, a, rad) {
	    var s = SIMD.Float32x4.splat(Math.sin(rad)),
	        c = SIMD.Float32x4.splat(Math.cos(rad));

	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[8]  = a[8];
	        out[9]  = a[9];
	        out[10] = a[10];
	        out[11] = a[11];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }

	    // Perform axis-specific matrix multiplication
	    var a_0 = SIMD.Float32x4.load(a, 0);
	    var a_1 = SIMD.Float32x4.load(a, 4);
	    SIMD.Float32x4.store(out, 0,
	                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
	    SIMD.Float32x4.store(out, 4,
	                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
	    return out;
	};

	/**
	 * Rotates a matrix by the given angle around the Z axis if SIMD available and enabled
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	 mat4.rotateZ = glMatrix.USE_SIMD ? mat4.SIMD.rotateZ : mat4.scalar.rotateZ;

	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, dest, vec);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {vec3} v Translation vector
	 * @returns {mat4} out
	 */
	mat4.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.scale(dest, dest, vec);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {vec3} v Scaling vector
	 * @returns {mat4} out
	 */
	mat4.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = v[1];
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = v[2];
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a given angle around a given axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotate(dest, dest, rad, axis);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	mat4.fromRotation = function(out, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t;

	    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;

	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;

	    // Perform rotation-specific matrix multiplication
	    out[0] = x * x * t + c;
	    out[1] = y * x * t + z * s;
	    out[2] = z * x * t - y * s;
	    out[3] = 0;
	    out[4] = x * y * t - z * s;
	    out[5] = y * y * t + c;
	    out[6] = z * y * t + x * s;
	    out[7] = 0;
	    out[8] = x * z * t + y * s;
	    out[9] = y * z * t - x * s;
	    out[10] = z * z * t + c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the X axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateX(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromXRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);

	    // Perform axis-specific matrix multiplication
	    out[0]  = 1;
	    out[1]  = 0;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = c;
	    out[6] = s;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = -s;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the Y axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateY(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromYRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);

	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = 0;
	    out[2]  = -s;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = s;
	    out[9] = 0;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from the given angle around the Z axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateZ(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromZRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);

	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = s;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = -s;
	    out[5] = c;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}

	/**
	 * Creates a matrix from a quaternion rotation and vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslation = function (out, q, v) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - (yy + zz);
	    out[1] = xy + wz;
	    out[2] = xz - wy;
	    out[3] = 0;
	    out[4] = xy - wz;
	    out[5] = 1 - (xx + zz);
	    out[6] = yz + wx;
	    out[7] = 0;
	    out[8] = xz + wy;
	    out[9] = yz - wx;
	    out[10] = 1 - (xx + yy);
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;

	    return out;
	};

	/**
	 * Returns the translation vector component of a transformation
	 *  matrix. If a matrix is built with fromRotationTranslation,
	 *  the returned vector will be the same as the translation vector
	 *  originally supplied.
	 * @param  {vec3} out Vector to receive translation component
	 * @param  {mat4} mat Matrix to be decomposed (input)
	 * @return {vec3} out
	 */
	mat4.getTranslation = function (out, mat) {
	  out[0] = mat[12];
	  out[1] = mat[13];
	  out[2] = mat[14];

	  return out;
	};

	/**
	 * Returns a quaternion representing the rotational component
	 *  of a transformation matrix. If a matrix is built with
	 *  fromRotationTranslation, the returned quaternion will be the
	 *  same as the quaternion originally supplied.
	 * @param {quat} out Quaternion to receive the rotation component
	 * @param {mat4} mat Matrix to be decomposed (input)
	 * @return {quat} out
	 */
	mat4.getRotation = function (out, mat) {
	  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
	  var trace = mat[0] + mat[5] + mat[10];
	  var S = 0;

	  if (trace > 0) { 
	    S = Math.sqrt(trace + 1.0) * 2;
	    out[3] = 0.25 * S;
	    out[0] = (mat[6] - mat[9]) / S;
	    out[1] = (mat[8] - mat[2]) / S; 
	    out[2] = (mat[1] - mat[4]) / S; 
	  } else if ((mat[0] > mat[5])&(mat[0] > mat[10])) { 
	    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
	    out[3] = (mat[6] - mat[9]) / S;
	    out[0] = 0.25 * S;
	    out[1] = (mat[1] + mat[4]) / S; 
	    out[2] = (mat[8] + mat[2]) / S; 
	  } else if (mat[5] > mat[10]) { 
	    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
	    out[3] = (mat[8] - mat[2]) / S;
	    out[0] = (mat[1] + mat[4]) / S; 
	    out[1] = 0.25 * S;
	    out[2] = (mat[6] + mat[9]) / S; 
	  } else { 
	    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
	    out[3] = (mat[1] - mat[4]) / S;
	    out[0] = (mat[8] + mat[2]) / S;
	    out[1] = (mat[6] + mat[9]) / S;
	    out[2] = 0.25 * S;
	  }

	  return out;
	};

	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @param {vec3} s Scaling vector
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslationScale = function (out, q, v, s) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2,
	        sx = s[0],
	        sy = s[1],
	        sz = s[2];

	    out[0] = (1 - (yy + zz)) * sx;
	    out[1] = (xy + wz) * sx;
	    out[2] = (xz - wy) * sx;
	    out[3] = 0;
	    out[4] = (xy - wz) * sy;
	    out[5] = (1 - (xx + zz)) * sy;
	    out[6] = (yz + wx) * sy;
	    out[7] = 0;
	    out[8] = (xz + wy) * sz;
	    out[9] = (yz - wx) * sz;
	    out[10] = (1 - (xx + yy)) * sz;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;

	    return out;
	};

	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     mat4.translate(dest, origin);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *     mat4.translate(dest, negativeOrigin);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @param {vec3} s Scaling vector
	 * @param {vec3} o The origin vector around which to scale and rotate
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
	  // Quaternion math
	  var x = q[0], y = q[1], z = q[2], w = q[3],
	      x2 = x + x,
	      y2 = y + y,
	      z2 = z + z,

	      xx = x * x2,
	      xy = x * y2,
	      xz = x * z2,
	      yy = y * y2,
	      yz = y * z2,
	      zz = z * z2,
	      wx = w * x2,
	      wy = w * y2,
	      wz = w * z2,

	      sx = s[0],
	      sy = s[1],
	      sz = s[2],

	      ox = o[0],
	      oy = o[1],
	      oz = o[2];

	  out[0] = (1 - (yy + zz)) * sx;
	  out[1] = (xy + wz) * sx;
	  out[2] = (xz - wy) * sx;
	  out[3] = 0;
	  out[4] = (xy - wz) * sy;
	  out[5] = (1 - (xx + zz)) * sy;
	  out[6] = (yz + wx) * sy;
	  out[7] = 0;
	  out[8] = (xz + wy) * sz;
	  out[9] = (yz - wx) * sz;
	  out[10] = (1 - (xx + yy)) * sz;
	  out[11] = 0;
	  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
	  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
	  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
	  out[15] = 1;

	  return out;
	};

	/**
	 * Calculates a 4x4 matrix from the given quaternion
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat} q Quaternion to create matrix from
	 *
	 * @returns {mat4} out
	 */
	mat4.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,

	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;

	    out[0] = 1 - yy - zz;
	    out[1] = yx + wz;
	    out[2] = zx - wy;
	    out[3] = 0;

	    out[4] = yx - wz;
	    out[5] = 1 - xx - zz;
	    out[6] = zy + wx;
	    out[7] = 0;

	    out[8] = zx + wy;
	    out[9] = zy - wx;
	    out[10] = 1 - xx - yy;
	    out[11] = 0;

	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;

	    return out;
	};

	/**
	 * Generates a frustum matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {Number} left Left bound of the frustum
	 * @param {Number} right Right bound of the frustum
	 * @param {Number} bottom Bottom bound of the frustum
	 * @param {Number} top Top bound of the frustum
	 * @param {Number} near Near bound of the frustum
	 * @param {Number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.frustum = function (out, left, right, bottom, top, near, far) {
	    var rl = 1 / (right - left),
	        tb = 1 / (top - bottom),
	        nf = 1 / (near - far);
	    out[0] = (near * 2) * rl;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = (near * 2) * tb;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = (right + left) * rl;
	    out[9] = (top + bottom) * tb;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (far * near * 2) * nf;
	    out[15] = 0;
	    return out;
	};

	/**
	 * Generates a perspective projection matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} fovy Vertical field of view in radians
	 * @param {number} aspect Aspect ratio. typically viewport width/height
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.perspective = function (out, fovy, aspect, near, far) {
	    var f = 1.0 / Math.tan(fovy / 2),
	        nf = 1 / (near - far);
	    out[0] = f / aspect;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = f;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (2 * far * near) * nf;
	    out[15] = 0;
	    return out;
	};

	/**
	 * Generates a perspective projection matrix with the given field of view.
	 * This is primarily useful for generating projection matrices to be used
	 * with the still experiemental WebVR API.
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
	    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
	        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
	        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
	        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
	        xScale = 2.0 / (leftTan + rightTan),
	        yScale = 2.0 / (upTan + downTan);

	    out[0] = xScale;
	    out[1] = 0.0;
	    out[2] = 0.0;
	    out[3] = 0.0;
	    out[4] = 0.0;
	    out[5] = yScale;
	    out[6] = 0.0;
	    out[7] = 0.0;
	    out[8] = -((leftTan - rightTan) * xScale * 0.5);
	    out[9] = ((upTan - downTan) * yScale * 0.5);
	    out[10] = far / (near - far);
	    out[11] = -1.0;
	    out[12] = 0.0;
	    out[13] = 0.0;
	    out[14] = (far * near) / (near - far);
	    out[15] = 0.0;
	    return out;
	}

	/**
	 * Generates a orthogonal projection matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} left Left bound of the frustum
	 * @param {number} right Right bound of the frustum
	 * @param {number} bottom Bottom bound of the frustum
	 * @param {number} top Top bound of the frustum
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.ortho = function (out, left, right, bottom, top, near, far) {
	    var lr = 1 / (left - right),
	        bt = 1 / (bottom - top),
	        nf = 1 / (near - far);
	    out[0] = -2 * lr;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = -2 * bt;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 2 * nf;
	    out[11] = 0;
	    out[12] = (left + right) * lr;
	    out[13] = (top + bottom) * bt;
	    out[14] = (far + near) * nf;
	    out[15] = 1;
	    return out;
	};

	/**
	 * Generates a look-at matrix with the given eye position, focal point, and up axis
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {vec3} eye Position of the viewer
	 * @param {vec3} center Point the viewer is looking at
	 * @param {vec3} up vec3 pointing up
	 * @returns {mat4} out
	 */
	mat4.lookAt = function (out, eye, center, up) {
	    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
	        eyex = eye[0],
	        eyey = eye[1],
	        eyez = eye[2],
	        upx = up[0],
	        upy = up[1],
	        upz = up[2],
	        centerx = center[0],
	        centery = center[1],
	        centerz = center[2];

	    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
	        Math.abs(eyey - centery) < glMatrix.EPSILON &&
	        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
	        return mat4.identity(out);
	    }

	    z0 = eyex - centerx;
	    z1 = eyey - centery;
	    z2 = eyez - centerz;

	    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
	    z0 *= len;
	    z1 *= len;
	    z2 *= len;

	    x0 = upy * z2 - upz * z1;
	    x1 = upz * z0 - upx * z2;
	    x2 = upx * z1 - upy * z0;
	    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
	    if (!len) {
	        x0 = 0;
	        x1 = 0;
	        x2 = 0;
	    } else {
	        len = 1 / len;
	        x0 *= len;
	        x1 *= len;
	        x2 *= len;
	    }

	    y0 = z1 * x2 - z2 * x1;
	    y1 = z2 * x0 - z0 * x2;
	    y2 = z0 * x1 - z1 * x0;

	    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
	    if (!len) {
	        y0 = 0;
	        y1 = 0;
	        y2 = 0;
	    } else {
	        len = 1 / len;
	        y0 *= len;
	        y1 *= len;
	        y2 *= len;
	    }

	    out[0] = x0;
	    out[1] = y0;
	    out[2] = z0;
	    out[3] = 0;
	    out[4] = x1;
	    out[5] = y1;
	    out[6] = z1;
	    out[7] = 0;
	    out[8] = x2;
	    out[9] = y2;
	    out[10] = z2;
	    out[11] = 0;
	    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	    out[15] = 1;

	    return out;
	};

	/**
	 * Returns a string representation of a mat4
	 *
	 * @param {mat4} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat4.str = function (a) {
	    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
	                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
	                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
	                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
	};

	/**
	 * Returns Frobenius norm of a mat4
	 *
	 * @param {mat4} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat4.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
	};

	/**
	 * Adds two mat4's
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	mat4.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    out[4] = a[4] + b[4];
	    out[5] = a[5] + b[5];
	    out[6] = a[6] + b[6];
	    out[7] = a[7] + b[7];
	    out[8] = a[8] + b[8];
	    out[9] = a[9] + b[9];
	    out[10] = a[10] + b[10];
	    out[11] = a[11] + b[11];
	    out[12] = a[12] + b[12];
	    out[13] = a[13] + b[13];
	    out[14] = a[14] + b[14];
	    out[15] = a[15] + b[15];
	    return out;
	};

	/**
	 * Subtracts matrix b from matrix a
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	mat4.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    out[4] = a[4] - b[4];
	    out[5] = a[5] - b[5];
	    out[6] = a[6] - b[6];
	    out[7] = a[7] - b[7];
	    out[8] = a[8] - b[8];
	    out[9] = a[9] - b[9];
	    out[10] = a[10] - b[10];
	    out[11] = a[11] - b[11];
	    out[12] = a[12] - b[12];
	    out[13] = a[13] - b[13];
	    out[14] = a[14] - b[14];
	    out[15] = a[15] - b[15];
	    return out;
	};

	/**
	 * Alias for {@link mat4.subtract}
	 * @function
	 */
	mat4.sub = mat4.subtract;

	/**
	 * Multiply each element of the matrix by a scalar.
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {Number} b amount to scale the matrix's elements by
	 * @returns {mat4} out
	 */
	mat4.multiplyScalar = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    out[4] = a[4] * b;
	    out[5] = a[5] * b;
	    out[6] = a[6] * b;
	    out[7] = a[7] * b;
	    out[8] = a[8] * b;
	    out[9] = a[9] * b;
	    out[10] = a[10] * b;
	    out[11] = a[11] * b;
	    out[12] = a[12] * b;
	    out[13] = a[13] * b;
	    out[14] = a[14] * b;
	    out[15] = a[15] * b;
	    return out;
	};

	/**
	 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
	 *
	 * @param {mat4} out the receiving vector
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @param {Number} scale the amount to scale b's elements by before adding
	 * @returns {mat4} out
	 */
	mat4.multiplyScalarAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    out[4] = a[4] + (b[4] * scale);
	    out[5] = a[5] + (b[5] * scale);
	    out[6] = a[6] + (b[6] * scale);
	    out[7] = a[7] + (b[7] * scale);
	    out[8] = a[8] + (b[8] * scale);
	    out[9] = a[9] + (b[9] * scale);
	    out[10] = a[10] + (b[10] * scale);
	    out[11] = a[11] + (b[11] * scale);
	    out[12] = a[12] + (b[12] * scale);
	    out[13] = a[13] + (b[13] * scale);
	    out[14] = a[14] + (b[14] * scale);
	    out[15] = a[15] + (b[15] * scale);
	    return out;
	};

	/**
	 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {mat4} a The first matrix.
	 * @param {mat4} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat4.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && 
	           a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && 
	           a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
	           a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
	};

	/**
	 * Returns whether or not the matrices have approximately the same elements in the same position.
	 *
	 * @param {mat4} a The first matrix.
	 * @param {mat4} b The second matrix.
	 * @returns {Boolean} True if the matrices are equal, false otherwise.
	 */
	mat4.equals = function (a, b) {
	    var a0  = a[0],  a1  = a[1],  a2  = a[2],  a3  = a[3],
	        a4  = a[4],  a5  = a[5],  a6  = a[6],  a7  = a[7], 
	        a8  = a[8],  a9  = a[9],  a10 = a[10], a11 = a[11], 
	        a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];

	    var b0  = b[0],  b1  = b[1],  b2  = b[2],  b3  = b[3],
	        b4  = b[4],  b5  = b[5],  b6  = b[6],  b7  = b[7], 
	        b8  = b[8],  b9  = b[9],  b10 = b[10], b11 = b[11], 
	        b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
	            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
	            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
	            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
	            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
	            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
	            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
	            Math.abs(a9 - b9) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
	            Math.abs(a10 - b10) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
	            Math.abs(a11 - b11) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
	            Math.abs(a12 - b12) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
	            Math.abs(a13 - b13) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
	            Math.abs(a14 - b14) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
	            Math.abs(a15 - b15) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a15), Math.abs(b15)));
	};



	module.exports = mat4;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(33);
	var mat3 = __webpack_require__(36);
	var vec3 = __webpack_require__(39);
	var vec4 = __webpack_require__(40);

	/**
	 * @class Quaternion
	 * @name quat
	 */
	var quat = {};

	/**
	 * Creates a new identity quat
	 *
	 * @returns {quat} a new quaternion
	 */
	quat.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Sets a quaternion to represent the shortest rotation from one
	 * vector to another.
	 *
	 * Both vectors are assumed to be unit length.
	 *
	 * @param {quat} out the receiving quaternion.
	 * @param {vec3} a the initial vector
	 * @param {vec3} b the destination vector
	 * @returns {quat} out
	 */
	quat.rotationTo = (function() {
	    var tmpvec3 = vec3.create();
	    var xUnitVec3 = vec3.fromValues(1,0,0);
	    var yUnitVec3 = vec3.fromValues(0,1,0);

	    return function(out, a, b) {
	        var dot = vec3.dot(a, b);
	        if (dot < -0.999999) {
	            vec3.cross(tmpvec3, xUnitVec3, a);
	            if (vec3.length(tmpvec3) < 0.000001)
	                vec3.cross(tmpvec3, yUnitVec3, a);
	            vec3.normalize(tmpvec3, tmpvec3);
	            quat.setAxisAngle(out, tmpvec3, Math.PI);
	            return out;
	        } else if (dot > 0.999999) {
	            out[0] = 0;
	            out[1] = 0;
	            out[2] = 0;
	            out[3] = 1;
	            return out;
	        } else {
	            vec3.cross(tmpvec3, a, b);
	            out[0] = tmpvec3[0];
	            out[1] = tmpvec3[1];
	            out[2] = tmpvec3[2];
	            out[3] = 1 + dot;
	            return quat.normalize(out, out);
	        }
	    };
	})();

	/**
	 * Sets the specified quaternion with values corresponding to the given
	 * axes. Each axis is a vec3 and is expected to be unit length and
	 * perpendicular to all other specified axes.
	 *
	 * @param {vec3} view  the vector representing the viewing direction
	 * @param {vec3} right the vector representing the local "right" direction
	 * @param {vec3} up    the vector representing the local "up" direction
	 * @returns {quat} out
	 */
	quat.setAxes = (function() {
	    var matr = mat3.create();

	    return function(out, view, right, up) {
	        matr[0] = right[0];
	        matr[3] = right[1];
	        matr[6] = right[2];

	        matr[1] = up[0];
	        matr[4] = up[1];
	        matr[7] = up[2];

	        matr[2] = -view[0];
	        matr[5] = -view[1];
	        matr[8] = -view[2];

	        return quat.normalize(out, quat.fromMat3(out, matr));
	    };
	})();

	/**
	 * Creates a new quat initialized with values from an existing quaternion
	 *
	 * @param {quat} a quaternion to clone
	 * @returns {quat} a new quaternion
	 * @function
	 */
	quat.clone = vec4.clone;

	/**
	 * Creates a new quat initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} a new quaternion
	 * @function
	 */
	quat.fromValues = vec4.fromValues;

	/**
	 * Copy the values from one quat to another
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the source quaternion
	 * @returns {quat} out
	 * @function
	 */
	quat.copy = vec4.copy;

	/**
	 * Set the components of a quat to the given values
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} out
	 * @function
	 */
	quat.set = vec4.set;

	/**
	 * Set a quat to the identity quaternion
	 *
	 * @param {quat} out the receiving quaternion
	 * @returns {quat} out
	 */
	quat.identity = function(out) {
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};

	/**
	 * Sets a quat from the given angle and rotation axis,
	 * then returns it.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {vec3} axis the axis around which to rotate
	 * @param {Number} rad the angle in radians
	 * @returns {quat} out
	 **/
	quat.setAxisAngle = function(out, axis, rad) {
	    rad = rad * 0.5;
	    var s = Math.sin(rad);
	    out[0] = s * axis[0];
	    out[1] = s * axis[1];
	    out[2] = s * axis[2];
	    out[3] = Math.cos(rad);
	    return out;
	};

	/**
	 * Gets the rotation axis and angle for a given
	 *  quaternion. If a quaternion is created with
	 *  setAxisAngle, this method will return the same
	 *  values as providied in the original parameter list
	 *  OR functionally equivalent values.
	 * Example: The quaternion formed by axis [0, 0, 1] and
	 *  angle -90 is the same as the quaternion formed by
	 *  [0, 0, 1] and 270. This method favors the latter.
	 * @param  {vec3} out_axis  Vector receiving the axis of rotation
	 * @param  {quat} q     Quaternion to be decomposed
	 * @return {Number}     Angle, in radians, of the rotation
	 */
	quat.getAxisAngle = function(out_axis, q) {
	    var rad = Math.acos(q[3]) * 2.0;
	    var s = Math.sin(rad / 2.0);
	    if (s != 0.0) {
	        out_axis[0] = q[0] / s;
	        out_axis[1] = q[1] / s;
	        out_axis[2] = q[2] / s;
	    } else {
	        // If s is zero, return any axis (no rotation - axis does not matter)
	        out_axis[0] = 1;
	        out_axis[1] = 0;
	        out_axis[2] = 0;
	    }
	    return rad;
	};

	/**
	 * Adds two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {quat} out
	 * @function
	 */
	quat.add = vec4.add;

	/**
	 * Multiplies two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {quat} out
	 */
	quat.multiply = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];

	    out[0] = ax * bw + aw * bx + ay * bz - az * by;
	    out[1] = ay * bw + aw * by + az * bx - ax * bz;
	    out[2] = az * bw + aw * bz + ax * by - ay * bx;
	    out[3] = aw * bw - ax * bx - ay * by - az * bz;
	    return out;
	};

	/**
	 * Alias for {@link quat.multiply}
	 * @function
	 */
	quat.mul = quat.multiply;

	/**
	 * Scales a quat by a scalar number
	 *
	 * @param {quat} out the receiving vector
	 * @param {quat} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {quat} out
	 * @function
	 */
	quat.scale = vec4.scale;

	/**
	 * Rotates a quaternion by the given angle about the X axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateX = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw + aw * bx;
	    out[1] = ay * bw + az * bx;
	    out[2] = az * bw - ay * bx;
	    out[3] = aw * bw - ax * bx;
	    return out;
	};

	/**
	 * Rotates a quaternion by the given angle about the Y axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateY = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        by = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw - az * by;
	    out[1] = ay * bw + aw * by;
	    out[2] = az * bw + ax * by;
	    out[3] = aw * bw - ay * by;
	    return out;
	};

	/**
	 * Rotates a quaternion by the given angle about the Z axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateZ = function (out, a, rad) {
	    rad *= 0.5; 

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bz = Math.sin(rad), bw = Math.cos(rad);

	    out[0] = ax * bw + ay * bz;
	    out[1] = ay * bw - ax * bz;
	    out[2] = az * bw + aw * bz;
	    out[3] = aw * bw - az * bz;
	    return out;
	};

	/**
	 * Calculates the W component of a quat from the X, Y, and Z components.
	 * Assumes that quaternion is 1 unit in length.
	 * Any existing W component will be ignored.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate W component of
	 * @returns {quat} out
	 */
	quat.calculateW = function (out, a) {
	    var x = a[0], y = a[1], z = a[2];

	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
	    return out;
	};

	/**
	 * Calculates the dot product of two quat's
	 *
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {Number} dot product of a and b
	 * @function
	 */
	quat.dot = vec4.dot;

	/**
	 * Performs a linear interpolation between two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {quat} out
	 * @function
	 */
	quat.lerp = vec4.lerp;

	/**
	 * Performs a spherical linear interpolation between two quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {quat} out
	 */
	quat.slerp = function (out, a, b, t) {
	    // benchmarks:
	    //    http://jsperf.com/quaternion-slerp-implementations

	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];

	    var        omega, cosom, sinom, scale0, scale1;

	    // calc cosine
	    cosom = ax * bx + ay * by + az * bz + aw * bw;
	    // adjust signs (if necessary)
	    if ( cosom < 0.0 ) {
	        cosom = -cosom;
	        bx = - bx;
	        by = - by;
	        bz = - bz;
	        bw = - bw;
	    }
	    // calculate coefficients
	    if ( (1.0 - cosom) > 0.000001 ) {
	        // standard case (slerp)
	        omega  = Math.acos(cosom);
	        sinom  = Math.sin(omega);
	        scale0 = Math.sin((1.0 - t) * omega) / sinom;
	        scale1 = Math.sin(t * omega) / sinom;
	    } else {        
	        // "from" and "to" quaternions are very close 
	        //  ... so we can do a linear interpolation
	        scale0 = 1.0 - t;
	        scale1 = t;
	    }
	    // calculate final values
	    out[0] = scale0 * ax + scale1 * bx;
	    out[1] = scale0 * ay + scale1 * by;
	    out[2] = scale0 * az + scale1 * bz;
	    out[3] = scale0 * aw + scale1 * bw;
	    
	    return out;
	};

	/**
	 * Performs a spherical linear interpolation with two control points
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {quat} c the third operand
	 * @param {quat} d the fourth operand
	 * @param {Number} t interpolation amount
	 * @returns {quat} out
	 */
	quat.sqlerp = (function () {
	  var temp1 = quat.create();
	  var temp2 = quat.create();
	  
	  return function (out, a, b, c, d, t) {
	    quat.slerp(temp1, a, d, t);
	    quat.slerp(temp2, b, c, t);
	    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
	    
	    return out;
	  };
	}());

	/**
	 * Calculates the inverse of a quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate inverse of
	 * @returns {quat} out
	 */
	quat.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
	        invDot = dot ? 1.0/dot : 0;
	    
	    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

	    out[0] = -a0*invDot;
	    out[1] = -a1*invDot;
	    out[2] = -a2*invDot;
	    out[3] = a3*invDot;
	    return out;
	};

	/**
	 * Calculates the conjugate of a quat
	 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate conjugate of
	 * @returns {quat} out
	 */
	quat.conjugate = function (out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Calculates the length of a quat
	 *
	 * @param {quat} a vector to calculate length of
	 * @returns {Number} length of a
	 * @function
	 */
	quat.length = vec4.length;

	/**
	 * Alias for {@link quat.length}
	 * @function
	 */
	quat.len = quat.length;

	/**
	 * Calculates the squared length of a quat
	 *
	 * @param {quat} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 * @function
	 */
	quat.squaredLength = vec4.squaredLength;

	/**
	 * Alias for {@link quat.squaredLength}
	 * @function
	 */
	quat.sqrLen = quat.squaredLength;

	/**
	 * Normalize a quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quaternion to normalize
	 * @returns {quat} out
	 * @function
	 */
	quat.normalize = vec4.normalize;

	/**
	 * Creates a quaternion from the given 3x3 rotation matrix.
	 *
	 * NOTE: The resultant quaternion is not normalized, so you should be sure
	 * to renormalize the quaternion yourself where necessary.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {mat3} m rotation matrix
	 * @returns {quat} out
	 * @function
	 */
	quat.fromMat3 = function(out, m) {
	    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
	    // article "Quaternion Calculus and Fast Animation".
	    var fTrace = m[0] + m[4] + m[8];
	    var fRoot;

	    if ( fTrace > 0.0 ) {
	        // |w| > 1/2, may as well choose w > 1/2
	        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
	        out[3] = 0.5 * fRoot;
	        fRoot = 0.5/fRoot;  // 1/(4w)
	        out[0] = (m[5]-m[7])*fRoot;
	        out[1] = (m[6]-m[2])*fRoot;
	        out[2] = (m[1]-m[3])*fRoot;
	    } else {
	        // |w| <= 1/2
	        var i = 0;
	        if ( m[4] > m[0] )
	          i = 1;
	        if ( m[8] > m[i*3+i] )
	          i = 2;
	        var j = (i+1)%3;
	        var k = (i+2)%3;
	        
	        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
	        out[i] = 0.5 * fRoot;
	        fRoot = 0.5 / fRoot;
	        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
	        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
	        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
	    }
	    
	    return out;
	};

	/**
	 * Returns a string representation of a quatenion
	 *
	 * @param {quat} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	quat.str = function (a) {
	    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	/**
	 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {quat} a The first quaternion.
	 * @param {quat} b The second quaternion.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	quat.exactEquals = vec4.exactEquals;

	/**
	 * Returns whether or not the quaternions have approximately the same elements in the same position.
	 *
	 * @param {quat} a The first vector.
	 * @param {quat} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	quat.equals = vec4.equals;

	module.exports = quat;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(33);

	/**
	 * @class 3 Dimensional Vector
	 * @name vec3
	 */
	var vec3 = {};

	/**
	 * Creates a new, empty vec3
	 *
	 * @returns {vec3} a new 3D vector
	 */
	vec3.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    return out;
	};

	/**
	 * Creates a new vec3 initialized with values from an existing vector
	 *
	 * @param {vec3} a vector to clone
	 * @returns {vec3} a new 3D vector
	 */
	vec3.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};

	/**
	 * Creates a new vec3 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} a new 3D vector
	 */
	vec3.fromValues = function(x, y, z) {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};

	/**
	 * Copy the values from one vec3 to another
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the source vector
	 * @returns {vec3} out
	 */
	vec3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};

	/**
	 * Set the components of a vec3 to the given values
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} out
	 */
	vec3.set = function(out, x, y, z) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};

	/**
	 * Adds two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.subtract}
	 * @function
	 */
	vec3.sub = vec3.subtract;

	/**
	 * Multiplies two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.multiply}
	 * @function
	 */
	vec3.mul = vec3.multiply;

	/**
	 * Divides two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    return out;
	};

	/**
	 * Alias for {@link vec3.divide}
	 * @function
	 */
	vec3.div = vec3.divide;

	/**
	 * Math.ceil the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to ceil
	 * @returns {vec3} out
	 */
	vec3.ceil = function (out, a) {
	    out[0] = Math.ceil(a[0]);
	    out[1] = Math.ceil(a[1]);
	    out[2] = Math.ceil(a[2]);
	    return out;
	};

	/**
	 * Math.floor the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to floor
	 * @returns {vec3} out
	 */
	vec3.floor = function (out, a) {
	    out[0] = Math.floor(a[0]);
	    out[1] = Math.floor(a[1]);
	    out[2] = Math.floor(a[2]);
	    return out;
	};

	/**
	 * Returns the minimum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    return out;
	};

	/**
	 * Math.round the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to round
	 * @returns {vec3} out
	 */
	vec3.round = function (out, a) {
	    out[0] = Math.round(a[0]);
	    out[1] = Math.round(a[1]);
	    out[2] = Math.round(a[2]);
	    return out;
	};

	/**
	 * Scales a vec3 by a scalar number
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec3} out
	 */
	vec3.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    return out;
	};

	/**
	 * Adds two vec3's after scaling the second operand by a scalar value
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec3} out
	 */
	vec3.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec3.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};

	/**
	 * Alias for {@link vec3.distance}
	 * @function
	 */
	vec3.dist = vec3.distance;

	/**
	 * Calculates the squared euclidian distance between two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec3.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return x*x + y*y + z*z;
	};

	/**
	 * Alias for {@link vec3.squaredDistance}
	 * @function
	 */
	vec3.sqrDist = vec3.squaredDistance;

	/**
	 * Calculates the length of a vec3
	 *
	 * @param {vec3} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec3.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};

	/**
	 * Alias for {@link vec3.length}
	 * @function
	 */
	vec3.len = vec3.length;

	/**
	 * Calculates the squared length of a vec3
	 *
	 * @param {vec3} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec3.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return x*x + y*y + z*z;
	};

	/**
	 * Alias for {@link vec3.squaredLength}
	 * @function
	 */
	vec3.sqrLen = vec3.squaredLength;

	/**
	 * Negates the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to negate
	 * @returns {vec3} out
	 */
	vec3.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to invert
	 * @returns {vec3} out
	 */
	vec3.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  return out;
	};

	/**
	 * Normalize a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to normalize
	 * @returns {vec3} out
	 */
	vec3.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    var len = x*x + y*y + z*z;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	        out[2] = a[2] * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec3.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	};

	/**
	 * Computes the cross product of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.cross = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2],
	        bx = b[0], by = b[1], bz = b[2];

	    out[0] = ay * bz - az * by;
	    out[1] = az * bx - ax * bz;
	    out[2] = ax * by - ay * bx;
	    return out;
	};

	/**
	 * Performs a linear interpolation between two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    return out;
	};

	/**
	 * Performs a hermite interpolation with two control points
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {vec3} c the third operand
	 * @param {vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.hermite = function (out, a, b, c, d, t) {
	  var factorTimes2 = t * t,
	      factor1 = factorTimes2 * (2 * t - 3) + 1,
	      factor2 = factorTimes2 * (t - 2) + t,
	      factor3 = factorTimes2 * (t - 1),
	      factor4 = factorTimes2 * (3 - 2 * t);
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};

	/**
	 * Performs a bezier interpolation with two control points
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {vec3} c the third operand
	 * @param {vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.bezier = function (out, a, b, c, d, t) {
	  var inverseFactor = 1 - t,
	      inverseFactorTimesTwo = inverseFactor * inverseFactor,
	      factorTimes2 = t * t,
	      factor1 = inverseFactorTimesTwo * inverseFactor,
	      factor2 = 3 * t * inverseFactorTimesTwo,
	      factor3 = 3 * factorTimes2 * inverseFactor,
	      factor4 = factorTimes2 * t;
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec3} out
	 */
	vec3.random = function (out, scale) {
	    scale = scale || 1.0;

	    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
	    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
	    var zScale = Math.sqrt(1.0-z*z) * scale;

	    out[0] = Math.cos(r) * zScale;
	    out[1] = Math.sin(r) * zScale;
	    out[2] = z * scale;
	    return out;
	};

	/**
	 * Transforms the vec3 with a mat4.
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec3} out
	 */
	vec3.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2],
	        w = m[3] * x + m[7] * y + m[11] * z + m[15];
	    w = w || 1.0;
	    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
	    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
	    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
	    return out;
	};

	/**
	 * Transforms the vec3 with a mat3.
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {mat4} m the 3x3 matrix to transform with
	 * @returns {vec3} out
	 */
	vec3.transformMat3 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2];
	    out[0] = x * m[0] + y * m[3] + z * m[6];
	    out[1] = x * m[1] + y * m[4] + z * m[7];
	    out[2] = x * m[2] + y * m[5] + z * m[8];
	    return out;
	};

	/**
	 * Transforms the vec3 with a quat
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {quat} q quaternion to transform with
	 * @returns {vec3} out
	 */
	vec3.transformQuat = function(out, a, q) {
	    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

	        // calculate quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;

	    // calculate result * inverse quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    return out;
	};

	/**
	 * Rotate a 3D vector around the x-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateX = function(out, a, b, c){
	   var p = [], r=[];
		  //Translate point to the origin
		  p[0] = a[0] - b[0];
		  p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];

		  //perform rotation
		  r[0] = p[0];
		  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
		  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

		  //translate to correct position
		  out[0] = r[0] + b[0];
		  out[1] = r[1] + b[1];
		  out[2] = r[2] + b[2];

	  	return out;
	};

	/**
	 * Rotate a 3D vector around the y-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateY = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
	  	r[1] = p[1];
	  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};

	/**
	 * Rotate a 3D vector around the z-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateZ = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
	  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
	  	r[2] = p[2];
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};

	/**
	 * Perform some operation over an array of vec3s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec3.forEach = (function() {
	    var vec = vec3.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 3;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Get the angle between two 3D vectors
	 * @param {vec3} a The first operand
	 * @param {vec3} b The second operand
	 * @returns {Number} The angle in radians
	 */
	vec3.angle = function(a, b) {
	   
	    var tempA = vec3.fromValues(a[0], a[1], a[2]);
	    var tempB = vec3.fromValues(b[0], b[1], b[2]);
	 
	    vec3.normalize(tempA, tempA);
	    vec3.normalize(tempB, tempB);
	 
	    var cosine = vec3.dot(tempA, tempB);

	    if(cosine > 1.0){
	        return 0;
	    } else {
	        return Math.acos(cosine);
	    }     
	};

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec3} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec3.str = function (a) {
	    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
	};

	/**
	 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {vec3} a The first vector.
	 * @param {vec3} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec3.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
	};

	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 *
	 * @param {vec3} a The first vector.
	 * @param {vec3} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec3.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2];
	    var b0 = b[0], b1 = b[1], b2 = b[2];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)));
	};

	module.exports = vec3;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(33);

	/**
	 * @class 4 Dimensional Vector
	 * @name vec4
	 */
	var vec4 = {};

	/**
	 * Creates a new, empty vec4
	 *
	 * @returns {vec4} a new 4D vector
	 */
	vec4.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    return out;
	};

	/**
	 * Creates a new vec4 initialized with values from an existing vector
	 *
	 * @param {vec4} a vector to clone
	 * @returns {vec4} a new 4D vector
	 */
	vec4.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Creates a new vec4 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} a new 4D vector
	 */
	vec4.fromValues = function(x, y, z, w) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};

	/**
	 * Copy the values from one vec4 to another
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the source vector
	 * @returns {vec4} out
	 */
	vec4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Set the components of a vec4 to the given values
	 *
	 * @param {vec4} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} out
	 */
	vec4.set = function(out, x, y, z, w) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};

	/**
	 * Adds two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.subtract}
	 * @function
	 */
	vec4.sub = vec4.subtract;

	/**
	 * Multiplies two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    out[3] = a[3] * b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.multiply}
	 * @function
	 */
	vec4.mul = vec4.multiply;

	/**
	 * Divides two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    out[3] = a[3] / b[3];
	    return out;
	};

	/**
	 * Alias for {@link vec4.divide}
	 * @function
	 */
	vec4.div = vec4.divide;

	/**
	 * Math.ceil the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to ceil
	 * @returns {vec4} out
	 */
	vec4.ceil = function (out, a) {
	    out[0] = Math.ceil(a[0]);
	    out[1] = Math.ceil(a[1]);
	    out[2] = Math.ceil(a[2]);
	    out[3] = Math.ceil(a[3]);
	    return out;
	};

	/**
	 * Math.floor the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to floor
	 * @returns {vec4} out
	 */
	vec4.floor = function (out, a) {
	    out[0] = Math.floor(a[0]);
	    out[1] = Math.floor(a[1]);
	    out[2] = Math.floor(a[2]);
	    out[3] = Math.floor(a[3]);
	    return out;
	};

	/**
	 * Returns the minimum of two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    out[3] = Math.min(a[3], b[3]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    out[3] = Math.max(a[3], b[3]);
	    return out;
	};

	/**
	 * Math.round the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to round
	 * @returns {vec4} out
	 */
	vec4.round = function (out, a) {
	    out[0] = Math.round(a[0]);
	    out[1] = Math.round(a[1]);
	    out[2] = Math.round(a[2]);
	    out[3] = Math.round(a[3]);
	    return out;
	};

	/**
	 * Scales a vec4 by a scalar number
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec4} out
	 */
	vec4.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    return out;
	};

	/**
	 * Adds two vec4's after scaling the second operand by a scalar value
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec4} out
	 */
	vec4.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec4.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};

	/**
	 * Alias for {@link vec4.distance}
	 * @function
	 */
	vec4.dist = vec4.distance;

	/**
	 * Calculates the squared euclidian distance between two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec4.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return x*x + y*y + z*z + w*w;
	};

	/**
	 * Alias for {@link vec4.squaredDistance}
	 * @function
	 */
	vec4.sqrDist = vec4.squaredDistance;

	/**
	 * Calculates the length of a vec4
	 *
	 * @param {vec4} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec4.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};

	/**
	 * Alias for {@link vec4.length}
	 * @function
	 */
	vec4.len = vec4.length;

	/**
	 * Calculates the squared length of a vec4
	 *
	 * @param {vec4} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec4.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return x*x + y*y + z*z + w*w;
	};

	/**
	 * Alias for {@link vec4.squaredLength}
	 * @function
	 */
	vec4.sqrLen = vec4.squaredLength;

	/**
	 * Negates the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to negate
	 * @returns {vec4} out
	 */
	vec4.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = -a[3];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to invert
	 * @returns {vec4} out
	 */
	vec4.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  out[3] = 1.0 / a[3];
	  return out;
	};

	/**
	 * Normalize a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to normalize
	 * @returns {vec4} out
	 */
	vec4.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    var len = x*x + y*y + z*z + w*w;
	    if (len > 0) {
	        len = 1 / Math.sqrt(len);
	        out[0] = x * len;
	        out[1] = y * len;
	        out[2] = z * len;
	        out[3] = w * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec4.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	};

	/**
	 * Performs a linear interpolation between two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec4} out
	 */
	vec4.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    out[3] = aw + t * (b[3] - aw);
	    return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec4} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec4} out
	 */
	vec4.random = function (out, scale) {
	    scale = scale || 1.0;

	    //TODO: This is a pretty awful way of doing this. Find something better.
	    out[0] = glMatrix.RANDOM();
	    out[1] = glMatrix.RANDOM();
	    out[2] = glMatrix.RANDOM();
	    out[3] = glMatrix.RANDOM();
	    vec4.normalize(out, out);
	    vec4.scale(out, out, scale);
	    return out;
	};

	/**
	 * Transforms the vec4 with a mat4.
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec4} out
	 */
	vec4.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2], w = a[3];
	    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
	    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
	    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
	    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
	    return out;
	};

	/**
	 * Transforms the vec4 with a quat
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to transform
	 * @param {quat} q quaternion to transform with
	 * @returns {vec4} out
	 */
	vec4.transformQuat = function(out, a, q) {
	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

	        // calculate quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;

	    // calculate result * inverse quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    out[3] = a[3];
	    return out;
	};

	/**
	 * Perform some operation over an array of vec4s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec4.forEach = (function() {
	    var vec = vec4.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 4;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec4} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec4.str = function (a) {
	    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};

	/**
	 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
	 *
	 * @param {vec4} a The first vector.
	 * @param {vec4} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec4.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	};

	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 *
	 * @param {vec4} a The first vector.
	 * @param {vec4} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec4.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
	            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
	            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
	};

	module.exports = vec4;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	var glMatrix = __webpack_require__(33);

	/**
	 * @class 2 Dimensional Vector
	 * @name vec2
	 */
	var vec2 = {};

	/**
	 * Creates a new, empty vec2
	 *
	 * @returns {vec2} a new 2D vector
	 */
	vec2.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = 0;
	    out[1] = 0;
	    return out;
	};

	/**
	 * Creates a new vec2 initialized with values from an existing vector
	 *
	 * @param {vec2} a vector to clone
	 * @returns {vec2} a new 2D vector
	 */
	vec2.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};

	/**
	 * Creates a new vec2 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} a new 2D vector
	 */
	vec2.fromValues = function(x, y) {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = x;
	    out[1] = y;
	    return out;
	};

	/**
	 * Copy the values from one vec2 to another
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the source vector
	 * @returns {vec2} out
	 */
	vec2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};

	/**
	 * Set the components of a vec2 to the given values
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} out
	 */
	vec2.set = function(out, x, y) {
	    out[0] = x;
	    out[1] = y;
	    return out;
	};

	/**
	 * Adds two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    return out;
	};

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.subtract}
	 * @function
	 */
	vec2.sub = vec2.subtract;

	/**
	 * Multiplies two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.multiply}
	 * @function
	 */
	vec2.mul = vec2.multiply;

	/**
	 * Divides two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    return out;
	};

	/**
	 * Alias for {@link vec2.divide}
	 * @function
	 */
	vec2.div = vec2.divide;

	/**
	 * Math.ceil the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to ceil
	 * @returns {vec2} out
	 */
	vec2.ceil = function (out, a) {
	    out[0] = Math.ceil(a[0]);
	    out[1] = Math.ceil(a[1]);
	    return out;
	};

	/**
	 * Math.floor the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to floor
	 * @returns {vec2} out
	 */
	vec2.floor = function (out, a) {
	    out[0] = Math.floor(a[0]);
	    out[1] = Math.floor(a[1]);
	    return out;
	};

	/**
	 * Returns the minimum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    return out;
	};

	/**
	 * Returns the maximum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    return out;
	};

	/**
	 * Math.round the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to round
	 * @returns {vec2} out
	 */
	vec2.round = function (out, a) {
	    out[0] = Math.round(a[0]);
	    out[1] = Math.round(a[1]);
	    return out;
	};

	/**
	 * Scales a vec2 by a scalar number
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec2} out
	 */
	vec2.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    return out;
	};

	/**
	 * Adds two vec2's after scaling the second operand by a scalar value
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec2} out
	 */
	vec2.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    return out;
	};

	/**
	 * Calculates the euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec2.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return Math.sqrt(x*x + y*y);
	};

	/**
	 * Alias for {@link vec2.distance}
	 * @function
	 */
	vec2.dist = vec2.distance;

	/**
	 * Calculates the squared euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec2.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return x*x + y*y;
	};

	/**
	 * Alias for {@link vec2.squaredDistance}
	 * @function
	 */
	vec2.sqrDist = vec2.squaredDistance;

	/**
	 * Calculates the length of a vec2
	 *
	 * @param {vec2} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec2.length = function (a) {
	    var x = a[0],
	        y = a[1];
	    return Math.sqrt(x*x + y*y);
	};

	/**
	 * Alias for {@link vec2.length}
	 * @function
	 */
	vec2.len = vec2.length;

	/**
	 * Calculates the squared length of a vec2
	 *
	 * @param {vec2} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec2.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1];
	    return x*x + y*y;
	};

	/**
	 * Alias for {@link vec2.squaredLength}
	 * @function
	 */
	vec2.sqrLen = vec2.squaredLength;

	/**
	 * Negates the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to negate
	 * @returns {vec2} out
	 */
	vec2.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    return out;
	};

	/**
	 * Returns the inverse of the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to invert
	 * @returns {vec2} out
	 */
	vec2.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  return out;
	};

	/**
	 * Normalize a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to normalize
	 * @returns {vec2} out
	 */
	vec2.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1];
	    var len = x*x + y*y;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	    }
	    return out;
	};

	/**
	 * Calculates the dot product of two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec2.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1];
	};

	/**
	 * Computes the cross product of two vec2's
	 * Note that the cross product must by definition produce a 3D vector
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec3} out
	 */
	vec2.cross = function(out, a, b) {
	    var z = a[0] * b[1] - a[1] * b[0];
	    out[0] = out[1] = 0;
	    out[2] = z;
	    return out;
	};

	/**
	 * Performs a linear interpolation between two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec2} out
	 */
	vec2.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    return out;
	};

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec2} out
	 */
	vec2.random = function (out, scale) {
	    scale = scale || 1.0;
	    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
	    out[0] = Math.cos(r) * scale;
	    out[1] = Math.sin(r) * scale;
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat2 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y;
	    out[1] = m[1] * x + m[3] * y;
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat2d
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2d} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat2d = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y + m[4];
	    out[1] = m[1] * x + m[3] * y + m[5];
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat3
	 * 3rd vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat3} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat3 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[3] * y + m[6];
	    out[1] = m[1] * x + m[4] * y + m[7];
	    return out;
	};

	/**
	 * Transforms the vec2 with a mat4
	 * 3rd vector component is implicitly '0'
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat4 = function(out, a, m) {
	    var x = a[0], 
	        y = a[1];
	    out[0] = m[0] * x + m[4] * y + m[12];
	    out[1] = m[1] * x + m[5] * y + m[13];
	    return out;
	};

	/**
	 * Perform some operation over an array of vec2s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec2.forEach = (function() {
	    var vec = vec2.create();

	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 2;
	        }

	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }

	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1];
	        }
	        
	        return a;
	    };
	})();

	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec2} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec2.str = function (a) {
	    return 'vec2(' + a[0] + ', ' + a[1] + ')';
	};

	/**
	 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
	 *
	 * @param {vec2} a The first vector.
	 * @param {vec2} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec2.exactEquals = function (a, b) {
	    return a[0] === b[0] && a[1] === b[1];
	};

	/**
	 * Returns whether or not the vectors have approximately the same elements in the same position.
	 *
	 * @param {vec2} a The first vector.
	 * @param {vec2} b The second vector.
	 * @returns {Boolean} True if the vectors are equal, false otherwise.
	 */
	vec2.equals = function (a, b) {
	    var a0 = a[0], a1 = a[1];
	    var b0 = b[0], b1 = b[1];
	    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
	            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)));
	};

	module.exports = vec2;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	** Copyright (c) 2012 The Khronos Group Inc.
	**
	** Permission is hereby granted, free of charge, to any person obtaining a
	** copy of this software and/or associated documentation files (the
	** "Materials"), to deal in the Materials without restriction, including
	** without limitation the rights to use, copy, modify, merge, publish,
	** distribute, sublicense, and/or sell copies of the Materials, and to
	** permit persons to whom the Materials are furnished to do so, subject to
	** the following conditions:
	**
	** The above copyright notice and this permission notice shall be included
	** in all copies or substantial portions of the Materials.
	**
	** THE MATERIALS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	** EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	** MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	** IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	** CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	** TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	** MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
	*/

	//Ported to node by Marcin Ignac on 2016-05-20

	// Various functions for helping debug WebGL apps.

	WebGLDebugUtils = function() {

	//polyfill window in node
	if (typeof(window) == 'undefined') {
	    window = global;
	}

	/**
	 * Wrapped logging function.
	 * @param {string} msg Message to log.
	 */
	var log = function(msg) {
	  if (window.console && window.console.log) {
	    window.console.log(msg);
	  }
	};

	/**
	 * Wrapped error logging function.
	 * @param {string} msg Message to log.
	 */
	var error = function(msg) {
	  if (window.console && window.console.error) {
	    window.console.error(msg);
	  } else {
	    log(msg);
	  }
	};


	/**
	 * Which arguments are enums based on the number of arguments to the function.
	 * So
	 *    'texImage2D': {
	 *       9: { 0:true, 2:true, 6:true, 7:true },
	 *       6: { 0:true, 2:true, 3:true, 4:true },
	 *    },
	 *
	 * means if there are 9 arguments then 6 and 7 are enums, if there are 6
	 * arguments 3 and 4 are enums
	 *
	 * @type {!Object.<number, !Object.<number, string>}
	 */
	var glValidEnumContexts = {
	  // Generic setters and getters

	  'enable': {1: { 0:true }},
	  'disable': {1: { 0:true }},
	  'getParameter': {1: { 0:true }},

	  // Rendering

	  'drawArrays': {3:{ 0:true }},
	  'drawElements': {4:{ 0:true, 2:true }},

	  // Shaders

	  'createShader': {1: { 0:true }},
	  'getShaderParameter': {2: { 1:true }},
	  'getProgramParameter': {2: { 1:true }},
	  'getShaderPrecisionFormat': {2: { 0: true, 1:true }},

	  // Vertex attributes

	  'getVertexAttrib': {2: { 1:true }},
	  'vertexAttribPointer': {6: { 2:true }},

	  // Textures

	  'bindTexture': {2: { 0:true }},
	  'activeTexture': {1: { 0:true }},
	  'getTexParameter': {2: { 0:true, 1:true }},
	  'texParameterf': {3: { 0:true, 1:true }},
	  'texParameteri': {3: { 0:true, 1:true, 2:true }},
	  'texImage2D': {
	     9: { 0:true, 2:true, 6:true, 7:true },
	     6: { 0:true, 2:true, 3:true, 4:true }
	  },
	  'texSubImage2D': {
	    9: { 0:true, 6:true, 7:true },
	    7: { 0:true, 4:true, 5:true }
	  },
	  'copyTexImage2D': {8: { 0:true, 2:true }},
	  'copyTexSubImage2D': {8: { 0:true }},
	  'generateMipmap': {1: { 0:true }},
	  'compressedTexImage2D': {7: { 0: true, 2:true }},
	  'compressedTexSubImage2D': {8: { 0: true, 6:true }},

	  // Buffer objects

	  'bindBuffer': {2: { 0:true }},
	  'bufferData': {3: { 0:true, 2:true }},
	  'bufferSubData': {3: { 0:true }},
	  'getBufferParameter': {2: { 0:true, 1:true }},

	  // Renderbuffers and framebuffers

	  'pixelStorei': {2: { 0:true, 1:true }},
	  'readPixels': {7: { 4:true, 5:true }},
	  'bindRenderbuffer': {2: { 0:true }},
	  'bindFramebuffer': {2: { 0:true }},
	  'checkFramebufferStatus': {1: { 0:true }},
	  'framebufferRenderbuffer': {4: { 0:true, 1:true, 2:true }},
	  'framebufferTexture2D': {5: { 0:true, 1:true, 2:true }},
	  'getFramebufferAttachmentParameter': {3: { 0:true, 1:true, 2:true }},
	  'getRenderbufferParameter': {2: { 0:true, 1:true }},
	  'renderbufferStorage': {4: { 0:true, 1:true }},

	  // Frame buffer operations (clear, blend, depth test, stencil)

	  'clear': {1: { 0: { 'enumBitwiseOr': ['COLOR_BUFFER_BIT', 'DEPTH_BUFFER_BIT', 'STENCIL_BUFFER_BIT'] }}},
	  'depthFunc': {1: { 0:true }},
	  'blendFunc': {2: { 0:true, 1:true }},
	  'blendFuncSeparate': {4: { 0:true, 1:true, 2:true, 3:true }},
	  'blendEquation': {1: { 0:true }},
	  'blendEquationSeparate': {2: { 0:true, 1:true }},
	  'stencilFunc': {3: { 0:true }},
	  'stencilFuncSeparate': {4: { 0:true, 1:true }},
	  'stencilMaskSeparate': {2: { 0:true }},
	  'stencilOp': {3: { 0:true, 1:true, 2:true }},
	  'stencilOpSeparate': {4: { 0:true, 1:true, 2:true, 3:true }},

	  // Culling

	  'cullFace': {1: { 0:true }},
	  'frontFace': {1: { 0:true }},

	  // ANGLE_instanced_arrays extension

	  'drawArraysInstancedANGLE': {4: { 0:true }},
	  'drawElementsInstancedANGLE': {5: { 0:true, 2:true }},

	  // EXT_blend_minmax extension

	  'blendEquationEXT': {1: { 0:true }}
	};

	/**
	 * Map of numbers to names.
	 * @type {Object}
	 */
	var glEnums = null;

	/**
	 * Map of names to numbers.
	 * @type {Object}
	 */
	var enumStringToValue = null;

	/**
	 * Initializes this module. Safe to call more than once.
	 * @param {!WebGLRenderingContext} ctx A WebGL context. If
	 *    you have more than one context it doesn't matter which one
	 *    you pass in, it is only used to pull out constants.
	 */
	function init(ctx) {
	  if (glEnums == null) {
	    glEnums = { };
	    enumStringToValue = { };
	    for (var propertyName in ctx) {
	      if (typeof ctx[propertyName] == 'number') {
	        glEnums[ctx[propertyName]] = propertyName;
	        enumStringToValue[propertyName] = ctx[propertyName];
	      }
	    }
	  }
	}

	/**
	 * Checks the utils have been initialized.
	 */
	function checkInit() {
	  if (glEnums == null) {
	    throw 'WebGLDebugUtils.init(ctx) not called';
	  }
	}

	/**
	 * Returns true or false if value matches any WebGL enum
	 * @param {*} value Value to check if it might be an enum.
	 * @return {boolean} True if value matches one of the WebGL defined enums
	 */
	function mightBeEnum(value) {
	  checkInit();
	  return (glEnums[value] !== undefined);
	}

	/**
	 * Gets an string version of an WebGL enum.
	 *
	 * Example:
	 *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
	 *
	 * @param {number} value Value to return an enum for
	 * @return {string} The string version of the enum.
	 */
	function glEnumToString(value) {
	  checkInit();
	  var name = glEnums[value];
	  return (name !== undefined) ? ("gl." + name) :
	      ("/*UNKNOWN WebGL ENUM*/ 0x" + value.toString(16) + "");
	}

	/**
	 * Returns the string version of a WebGL argument.
	 * Attempts to convert enum arguments to strings.
	 * @param {string} functionName the name of the WebGL function.
	 * @param {number} numArgs the number of arguments passed to the function.
	 * @param {number} argumentIndx the index of the argument.
	 * @param {*} value The value of the argument.
	 * @return {string} The value as a string.
	 */
	function glFunctionArgToString(functionName, numArgs, argumentIndex, value) {
	  var funcInfo = glValidEnumContexts[functionName];
	  if (funcInfo !== undefined) {
	    var funcInfo = funcInfo[numArgs];
	    if (funcInfo !== undefined) {
	      if (funcInfo[argumentIndex]) {
	        if (typeof funcInfo[argumentIndex] === 'object' &&
	            funcInfo[argumentIndex]['enumBitwiseOr'] !== undefined) {
	          var enums = funcInfo[argumentIndex]['enumBitwiseOr'];
	          var orResult = 0;
	          var orEnums = [];
	          for (var i = 0; i < enums.length; ++i) {
	            var enumValue = enumStringToValue[enums[i]];
	            if ((value & enumValue) !== 0) {
	              orResult |= enumValue;
	              orEnums.push(glEnumToString(enumValue));
	            }
	          }
	          if (orResult === value) {
	            return orEnums.join(' | ');
	          } else {
	            return glEnumToString(value);
	          }
	        } else {
	          return glEnumToString(value);
	        }
	      }
	    }
	  }
	  if (value === null) {
	    return "null";
	  } else if (value === undefined) {
	    return "undefined";
	  } else {
	    return value.toString();
	  }
	}

	/**
	 * Converts the arguments of a WebGL function to a string.
	 * Attempts to convert enum arguments to strings.
	 *
	 * @param {string} functionName the name of the WebGL function.
	 * @param {number} args The arguments.
	 * @return {string} The arguments as a string.
	 */
	function glFunctionArgsToString(functionName, args) {
	  // apparently we can't do args.join(",");
	  var argStr = "";
	  var numArgs = args.length;
	  for (var ii = 0; ii < numArgs; ++ii) {
	    argStr += ((ii == 0) ? '' : ', ') +
	        glFunctionArgToString(functionName, numArgs, ii, args[ii]);
	  }
	  return argStr;
	};


	function makePropertyWrapper(wrapper, original, propertyName) {
	  //log("wrap prop: " + propertyName);
	  wrapper.__defineGetter__(propertyName, function() {
	    return original[propertyName];
	  });
	  // TODO(gmane): this needs to handle properties that take more than
	  // one value?
	  wrapper.__defineSetter__(propertyName, function(value) {
	    //log("set: " + propertyName);
	    original[propertyName] = value;
	  });
	}

	// Makes a function that calls a function on another object.
	function makeFunctionWrapper(original, functionName) {
	  //log("wrap fn: " + functionName);
	  var f = original[functionName];
	  return function() {
	    //log("call: " + functionName);
	    var result = f.apply(original, arguments);
	    return result;
	  };
	}

	/**
	 * Given a WebGL context returns a wrapped context that calls
	 * gl.getError after every command and calls a function if the
	 * result is not gl.NO_ERROR.
	 *
	 * @param {!WebGLRenderingContext} ctx The webgl context to
	 *        wrap.
	 * @param {!function(err, funcName, args): void} opt_onErrorFunc
	 *        The function to call when gl.getError returns an
	 *        error. If not specified the default function calls
	 *        console.log with a message.
	 * @param {!function(funcName, args): void} opt_onFunc The
	 *        function to call when each webgl function is called.
	 *        You can use this to log all calls for example.
	 * @param {!WebGLRenderingContext} opt_err_ctx The webgl context
	 *        to call getError on if different than ctx.
	 */
	function makeDebugContext(ctx, opt_onErrorFunc, opt_onFunc, opt_err_ctx) {
	  opt_err_ctx = opt_err_ctx || ctx;
	  init(ctx);
	  opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
	        // apparently we can't do args.join(",");
	        var argStr = "";
	        var numArgs = args.length;
	        for (var ii = 0; ii < numArgs; ++ii) {
	          argStr += ((ii == 0) ? '' : ', ') +
	              glFunctionArgToString(functionName, numArgs, ii, args[ii]);
	        }
	        error("WebGL error "+ glEnumToString(err) + " in "+ functionName +
	              "(" + argStr + ")");
	      };

	  // Holds booleans for each GL error so after we get the error ourselves
	  // we can still return it to the client app.
	  var glErrorShadow = { };

	  // Makes a function that calls a WebGL function and then calls getError.
	  function makeErrorWrapper(ctx, functionName) {
	    return function() {
	      if (opt_onFunc) {
	        opt_onFunc(functionName, arguments);
	      }
	      var result = ctx[functionName].apply(ctx, arguments);
	      var err = opt_err_ctx.getError();
	      if (err != 0) {
	        glErrorShadow[err] = true;
	        opt_onErrorFunc(err, functionName, arguments);
	      }
	      return result;
	    };
	  }

	  // Make a an object that has a copy of every property of the WebGL context
	  // but wraps all functions.
	  var wrapper = {};
	  for (var propertyName in ctx) {
	    if (typeof ctx[propertyName] == 'function') {
	      if (propertyName != 'getExtension') {
	        wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
	      } else {
	        var wrapped = makeErrorWrapper(ctx, propertyName);
	        wrapper[propertyName] = function () {
	          var result = wrapped.apply(ctx, arguments);
	          return makeDebugContext(result, opt_onErrorFunc, opt_onFunc, opt_err_ctx);
	        };
	      }
	    } else {
	      makePropertyWrapper(wrapper, ctx, propertyName);
	    }
	  }

	  // Override the getError function with one that returns our saved results.
	  wrapper.getError = function() {
	    for (var err in glErrorShadow) {
	      if (glErrorShadow.hasOwnProperty(err)) {
	        if (glErrorShadow[err]) {
	          glErrorShadow[err] = false;
	          return err;
	        }
	      }
	    }
	    return ctx.NO_ERROR;
	  };

	  return wrapper;
	}

	function resetToInitialState(ctx) {
	  var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
	  var tmp = ctx.createBuffer();
	  ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
	  for (var ii = 0; ii < numAttribs; ++ii) {
	    ctx.disableVertexAttribArray(ii);
	    ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
	    ctx.vertexAttrib1f(ii, 0);
	  }
	  ctx.deleteBuffer(tmp);

	  var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
	  for (var ii = 0; ii < numTextureUnits; ++ii) {
	    ctx.activeTexture(ctx.TEXTURE0 + ii);
	    ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
	    ctx.bindTexture(ctx.TEXTURE_2D, null);
	  }

	  ctx.activeTexture(ctx.TEXTURE0);
	  ctx.useProgram(null);
	  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
	  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
	  ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
	  ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
	  ctx.disable(ctx.BLEND);
	  ctx.disable(ctx.CULL_FACE);
	  ctx.disable(ctx.DEPTH_TEST);
	  ctx.disable(ctx.DITHER);
	  ctx.disable(ctx.SCISSOR_TEST);
	  ctx.blendColor(0, 0, 0, 0);
	  ctx.blendEquation(ctx.FUNC_ADD);
	  ctx.blendFunc(ctx.ONE, ctx.ZERO);
	  ctx.clearColor(0, 0, 0, 0);
	  ctx.clearDepth(1);
	  ctx.clearStencil(-1);
	  ctx.colorMask(true, true, true, true);
	  ctx.cullFace(ctx.BACK);
	  ctx.depthFunc(ctx.LESS);
	  ctx.depthMask(true);
	  ctx.depthRange(0, 1);
	  ctx.frontFace(ctx.CCW);
	  ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
	  ctx.lineWidth(1);
	  ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
	  ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
	  ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
	  ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
	  // TODO: Delete this IF.
	  if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
	    ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
	  }
	  ctx.polygonOffset(0, 0);
	  ctx.sampleCoverage(1, false);
	  ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
	  ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
	  ctx.stencilMask(0xFFFFFFFF);
	  ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
	  ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);
	  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

	  // TODO: This should NOT be needed but Firefox fails with 'hint'
	  while(ctx.getError());
	}

	function makeLostContextSimulatingCanvas(canvas) {
	  var unwrappedContext_;
	  var wrappedContext_;
	  var onLost_ = [];
	  var onRestored_ = [];
	  var wrappedContext_ = {};
	  var contextId_ = 1;
	  var contextLost_ = false;
	  var resourceId_ = 0;
	  var resourceDb_ = [];
	  var numCallsToLoseContext_ = 0;
	  var numCalls_ = 0;
	  var canRestore_ = false;
	  var restoreTimeout_ = 0;

	  // Holds booleans for each GL error so can simulate errors.
	  var glErrorShadow_ = { };

	  canvas.getContext = function(f) {
	    return function() {
	      var ctx = f.apply(canvas, arguments);
	      // Did we get a context and is it a WebGL context?
	      if (ctx instanceof WebGLRenderingContext) {
	        if (ctx != unwrappedContext_) {
	          if (unwrappedContext_) {
	            throw "got different context"
	          }
	          unwrappedContext_ = ctx;
	          wrappedContext_ = makeLostContextSimulatingContext(unwrappedContext_);
	        }
	        return wrappedContext_;
	      }
	      return ctx;
	    }
	  }(canvas.getContext);

	  function wrapEvent(listener) {
	    if (typeof(listener) == "function") {
	      return listener;
	    } else {
	      return function(info) {
	        listener.handleEvent(info);
	      }
	    }
	  }

	  var addOnContextLostListener = function(listener) {
	    onLost_.push(wrapEvent(listener));
	  };

	  var addOnContextRestoredListener = function(listener) {
	    onRestored_.push(wrapEvent(listener));
	  };


	  function wrapAddEventListener(canvas) {
	    var f = canvas.addEventListener;
	    canvas.addEventListener = function(type, listener, bubble) {
	      switch (type) {
	        case 'webglcontextlost':
	          addOnContextLostListener(listener);
	          break;
	        case 'webglcontextrestored':
	          addOnContextRestoredListener(listener);
	          break;
	        default:
	          f.apply(canvas, arguments);
	      }
	    };
	  }

	  wrapAddEventListener(canvas);

	  canvas.loseContext = function() {
	    if (!contextLost_) {
	      contextLost_ = true;
	      numCallsToLoseContext_ = 0;
	      ++contextId_;
	      while (unwrappedContext_.getError());
	      clearErrors();
	      glErrorShadow_[unwrappedContext_.CONTEXT_LOST_WEBGL] = true;
	      var event = makeWebGLContextEvent("context lost");
	      var callbacks = onLost_.slice();
	      setTimeout(function() {
	          //log("numCallbacks:" + callbacks.length);
	          for (var ii = 0; ii < callbacks.length; ++ii) {
	            //log("calling callback:" + ii);
	            callbacks[ii](event);
	          }
	          if (restoreTimeout_ >= 0) {
	            setTimeout(function() {
	                canvas.restoreContext();
	              }, restoreTimeout_);
	          }
	        }, 0);
	    }
	  };

	  canvas.restoreContext = function() {
	    if (contextLost_) {
	      if (onRestored_.length) {
	        setTimeout(function() {
	            if (!canRestore_) {
	              throw "can not restore. webglcontestlost listener did not call event.preventDefault";
	            }
	            freeResources();
	            resetToInitialState(unwrappedContext_);
	            contextLost_ = false;
	            numCalls_ = 0;
	            canRestore_ = false;
	            var callbacks = onRestored_.slice();
	            var event = makeWebGLContextEvent("context restored");
	            for (var ii = 0; ii < callbacks.length; ++ii) {
	              callbacks[ii](event);
	            }
	          }, 0);
	      }
	    }
	  };

	  canvas.loseContextInNCalls = function(numCalls) {
	    if (contextLost_) {
	      throw "You can not ask a lost contet to be lost";
	    }
	    numCallsToLoseContext_ = numCalls_ + numCalls;
	  };

	  canvas.getNumCalls = function() {
	    return numCalls_;
	  };

	  canvas.setRestoreTimeout = function(timeout) {
	    restoreTimeout_ = timeout;
	  };

	  function isWebGLObject(obj) {
	    //return false;
	    return (obj instanceof WebGLBuffer ||
	            obj instanceof WebGLFramebuffer ||
	            obj instanceof WebGLProgram ||
	            obj instanceof WebGLRenderbuffer ||
	            obj instanceof WebGLShader ||
	            obj instanceof WebGLTexture);
	  }

	  function checkResources(args) {
	    for (var ii = 0; ii < args.length; ++ii) {
	      var arg = args[ii];
	      if (isWebGLObject(arg)) {
	        return arg.__webglDebugContextLostId__ == contextId_;
	      }
	    }
	    return true;
	  }

	  function clearErrors() {
	    var k = Object.keys(glErrorShadow_);
	    for (var ii = 0; ii < k.length; ++ii) {
	      delete glErrorShadow_[k];
	    }
	  }

	  function loseContextIfTime() {
	    ++numCalls_;
	    if (!contextLost_) {
	      if (numCallsToLoseContext_ == numCalls_) {
	        canvas.loseContext();
	      }
	    }
	  }

	  // Makes a function that simulates WebGL when out of context.
	  function makeLostContextFunctionWrapper(ctx, functionName) {
	    var f = ctx[functionName];
	    return function() {
	      // log("calling:" + functionName);
	      // Only call the functions if the context is not lost.
	      loseContextIfTime();
	      if (!contextLost_) {
	        //if (!checkResources(arguments)) {
	        //  glErrorShadow_[wrappedContext_.INVALID_OPERATION] = true;
	        //  return;
	        //}
	        var result = f.apply(ctx, arguments);
	        return result;
	      }
	    };
	  }

	  function freeResources() {
	    for (var ii = 0; ii < resourceDb_.length; ++ii) {
	      var resource = resourceDb_[ii];
	      if (resource instanceof WebGLBuffer) {
	        unwrappedContext_.deleteBuffer(resource);
	      } else if (resource instanceof WebGLFramebuffer) {
	        unwrappedContext_.deleteFramebuffer(resource);
	      } else if (resource instanceof WebGLProgram) {
	        unwrappedContext_.deleteProgram(resource);
	      } else if (resource instanceof WebGLRenderbuffer) {
	        unwrappedContext_.deleteRenderbuffer(resource);
	      } else if (resource instanceof WebGLShader) {
	        unwrappedContext_.deleteShader(resource);
	      } else if (resource instanceof WebGLTexture) {
	        unwrappedContext_.deleteTexture(resource);
	      }
	    }
	  }

	  function makeWebGLContextEvent(statusMessage) {
	    return {
	      statusMessage: statusMessage,
	      preventDefault: function() {
	          canRestore_ = true;
	        }
	    };
	  }

	  return canvas;

	  function makeLostContextSimulatingContext(ctx) {
	    // copy all functions and properties to wrapper
	    for (var propertyName in ctx) {
	      if (typeof ctx[propertyName] == 'function') {
	         wrappedContext_[propertyName] = makeLostContextFunctionWrapper(
	             ctx, propertyName);
	       } else {
	         makePropertyWrapper(wrappedContext_, ctx, propertyName);
	       }
	    }

	    // Wrap a few functions specially.
	    wrappedContext_.getError = function() {
	      loseContextIfTime();
	      if (!contextLost_) {
	        var err;
	        while (err = unwrappedContext_.getError()) {
	          glErrorShadow_[err] = true;
	        }
	      }
	      for (var err in glErrorShadow_) {
	        if (glErrorShadow_[err]) {
	          delete glErrorShadow_[err];
	          return err;
	        }
	      }
	      return wrappedContext_.NO_ERROR;
	    };

	    var creationFunctions = [
	      "createBuffer",
	      "createFramebuffer",
	      "createProgram",
	      "createRenderbuffer",
	      "createShader",
	      "createTexture"
	    ];
	    for (var ii = 0; ii < creationFunctions.length; ++ii) {
	      var functionName = creationFunctions[ii];
	      wrappedContext_[functionName] = function(f) {
	        return function() {
	          loseContextIfTime();
	          if (contextLost_) {
	            return null;
	          }
	          var obj = f.apply(ctx, arguments);
	          obj.__webglDebugContextLostId__ = contextId_;
	          resourceDb_.push(obj);
	          return obj;
	        };
	      }(ctx[functionName]);
	    }

	    var functionsThatShouldReturnNull = [
	      "getActiveAttrib",
	      "getActiveUniform",
	      "getBufferParameter",
	      "getContextAttributes",
	      "getAttachedShaders",
	      "getFramebufferAttachmentParameter",
	      "getParameter",
	      "getProgramParameter",
	      "getProgramInfoLog",
	      "getRenderbufferParameter",
	      "getShaderParameter",
	      "getShaderInfoLog",
	      "getShaderSource",
	      "getTexParameter",
	      "getUniform",
	      "getUniformLocation",
	      "getVertexAttrib"
	    ];
	    for (var ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
	      var functionName = functionsThatShouldReturnNull[ii];
	      wrappedContext_[functionName] = function(f) {
	        return function() {
	          loseContextIfTime();
	          if (contextLost_) {
	            return null;
	          }
	          return f.apply(ctx, arguments);
	        }
	      }(wrappedContext_[functionName]);
	    }

	    var isFunctions = [
	      "isBuffer",
	      "isEnabled",
	      "isFramebuffer",
	      "isProgram",
	      "isRenderbuffer",
	      "isShader",
	      "isTexture"
	    ];
	    for (var ii = 0; ii < isFunctions.length; ++ii) {
	      var functionName = isFunctions[ii];
	      wrappedContext_[functionName] = function(f) {
	        return function() {
	          loseContextIfTime();
	          if (contextLost_) {
	            return false;
	          }
	          return f.apply(ctx, arguments);
	        }
	      }(wrappedContext_[functionName]);
	    }

	    wrappedContext_.checkFramebufferStatus = function(f) {
	      return function() {
	        loseContextIfTime();
	        if (contextLost_) {
	          return wrappedContext_.FRAMEBUFFER_UNSUPPORTED;
	        }
	        return f.apply(ctx, arguments);
	      };
	    }(wrappedContext_.checkFramebufferStatus);

	    wrappedContext_.getAttribLocation = function(f) {
	      return function() {
	        loseContextIfTime();
	        if (contextLost_) {
	          return -1;
	        }
	        return f.apply(ctx, arguments);
	      };
	    }(wrappedContext_.getAttribLocation);

	    wrappedContext_.getVertexAttribOffset = function(f) {
	      return function() {
	        loseContextIfTime();
	        if (contextLost_) {
	          return 0;
	        }
	        return f.apply(ctx, arguments);
	      };
	    }(wrappedContext_.getVertexAttribOffset);

	    wrappedContext_.isContextLost = function() {
	      return contextLost_;
	    };

	    return wrappedContext_;
	  }
	}

	return {
	  /**
	   * Initializes this module. Safe to call more than once.
	   * @param {!WebGLRenderingContext} ctx A WebGL context. If
	   *    you have more than one context it doesn't matter which one
	   *    you pass in, it is only used to pull out constants.
	   */
	  'init': init,

	  /**
	   * Returns true or false if value matches any WebGL enum
	   * @param {*} value Value to check if it might be an enum.
	   * @return {boolean} True if value matches one of the WebGL defined enums
	   */
	  'mightBeEnum': mightBeEnum,

	  /**
	   * Gets an string version of an WebGL enum.
	   *
	   * Example:
	   *   WebGLDebugUtil.init(ctx);
	   *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
	   *
	   * @param {number} value Value to return an enum for
	   * @return {string} The string version of the enum.
	   */
	  'glEnumToString': glEnumToString,

	  /**
	   * Converts the argument of a WebGL function to a string.
	   * Attempts to convert enum arguments to strings.
	   *
	   * Example:
	   *   WebGLDebugUtil.init(ctx);
	   *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 2, 0, gl.TEXTURE_2D);
	   *
	   * would return 'TEXTURE_2D'
	   *
	   * @param {string} functionName the name of the WebGL function.
	   * @param {number} numArgs The number of arguments
	   * @param {number} argumentIndx the index of the argument.
	   * @param {*} value The value of the argument.
	   * @return {string} The value as a string.
	   */
	  'glFunctionArgToString': glFunctionArgToString,

	  /**
	   * Converts the arguments of a WebGL function to a string.
	   * Attempts to convert enum arguments to strings.
	   *
	   * @param {string} functionName the name of the WebGL function.
	   * @param {number} args The arguments.
	   * @return {string} The arguments as a string.
	   */
	  'glFunctionArgsToString': glFunctionArgsToString,

	  /**
	   * Given a WebGL context returns a wrapped context that calls
	   * gl.getError after every command and calls a function if the
	   * result is not NO_ERROR.
	   *
	   * You can supply your own function if you want. For example, if you'd like
	   * an exception thrown on any GL error you could do this
	   *
	   *    function throwOnGLError(err, funcName, args) {
	   *      throw WebGLDebugUtils.glEnumToString(err) +
	   *            " was caused by call to " + funcName;
	   *    };
	   *
	   *    ctx = WebGLDebugUtils.makeDebugContext(
	   *        canvas.getContext("webgl"), throwOnGLError);
	   *
	   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
	   * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
	   *     to call when gl.getError returns an error. If not specified the default
	   *     function calls console.log with a message.
	   * @param {!function(funcName, args): void} opt_onFunc The
	   *     function to call when each webgl function is called. You
	   *     can use this to log all calls for example.
	   */
	  'makeDebugContext': makeDebugContext,

	  /**
	   * Given a canvas element returns a wrapped canvas element that will
	   * simulate lost context. The canvas returned adds the following functions.
	   *
	   * loseContext:
	   *   simulates a lost context event.
	   *
	   * restoreContext:
	   *   simulates the context being restored.
	   *
	   * lostContextInNCalls:
	   *   loses the context after N gl calls.
	   *
	   * getNumCalls:
	   *   tells you how many gl calls there have been so far.
	   *
	   * setRestoreTimeout:
	   *   sets the number of milliseconds until the context is restored
	   *   after it has been lost. Defaults to 0. Pass -1 to prevent
	   *   automatic restoring.
	   *
	   * @param {!Canvas} canvas The canvas element to wrap.
	   */
	  'makeLostContextSimulatingCanvas': makeLostContextSimulatingCanvas,

	  /**
	   * Resets a context to the initial state.
	   * @param {!WebGLRenderingContext} ctx The webgl context to
	   *     reset.
	   */
	  'resetToInitialState': resetToInitialState
	};

	}();

	module.exports = WebGLDebugUtils;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ })
/******/ ]);
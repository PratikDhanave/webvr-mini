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
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*
	 * app.js
	 * main entry point for this application. Uses 
	 * ES5 syntax (es6 will be transpiled). Central 
	 * point for including both ES5 and ES6 libraries.
	 */
	console.log( 'in app.js' );

	// DEV ENVIRONMENT.

	var env = process.env.WEBPACK_ENV;

	// REQUIRE ALL .es6 files.

	var vrmini = __webpack_require__( 3 );

	// Check ES6 module structure.

	for (var i in vrmini ) {

	    console.log( i + ":" + vrmini[i] );

	}

	/* 
	 * these variables are defined by webpack inputs in package.json.
	 * "build": "cross-env __RELEASE__=true __DEV__=false webpack --config webpack-production.config.js -p -p",
	 * "dev": "cross-env __RELEASE__=false __DEV__=true webpack",
	 */

	if ( true ) {

	    console.warn('app.js: in development mode...');

	} else if ( __RELEASE__ === 'true' ) {

	    console.warn('in release mode');

	}

	// EXPOSE IN BROWSER WINDOW OBJECT

	window.vrmini = vrmini;

	console.log("Window.vrmini:" + vrmini );




	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

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

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.world = exports.webvr = exports.prim = exports.loadVideo = exports.loadAudio = exports.loadTexture = exports.loadModel = exports.webgl = exports.util = undefined;

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _webgl = __webpack_require__(5);

	var _webgl2 = _interopRequireDefault(_webgl);

	var _webvr = __webpack_require__(6);

	var _webvr2 = _interopRequireDefault(_webvr);

	var _loadTexture = __webpack_require__(7);

	var _loadTexture2 = _interopRequireDefault(_loadTexture);

	var _loadModel = __webpack_require__(9);

	var _loadModel2 = _interopRequireDefault(_loadModel);

	var _loadAudio = __webpack_require__(10);

	var _loadAudio2 = _interopRequireDefault(_loadAudio);

	var _loadVideo = __webpack_require__(11);

	var _loadVideo2 = _interopRequireDefault(_loadVideo);

	var _loadFont = __webpack_require__(12);

	var _loadFont2 = _interopRequireDefault(_loadFont);

	var _shaderTexture = __webpack_require__(13);

	var _shaderTexture2 = _interopRequireDefault(_shaderTexture);

	var _shaderColor = __webpack_require__(15);

	var _shaderColor2 = _interopRequireDefault(_shaderColor);

	var _shaderDirlightTexture = __webpack_require__(16);

	var _shaderDirlightTexture2 = _interopRequireDefault(_shaderDirlightTexture);

	var _shaderWater = __webpack_require__(17);

	var _shaderWater2 = _interopRequireDefault(_shaderWater);

	var _shaderMetal = __webpack_require__(18);

	var _shaderMetal2 = _interopRequireDefault(_shaderMetal);

	var _renderer = __webpack_require__(19);

	var _renderer2 = _interopRequireDefault(_renderer);

	var _prim = __webpack_require__(20);

	var _prim2 = _interopRequireDefault(_prim);

	var _world = __webpack_require__(31);

	var _world2 = _interopRequireDefault(_world);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 * app.es6
	 * es6 entry point, transpiled (via BabelJS) to ES5.
	 */

	console.log('in es6');

	// DEV ENVIRONMENT

	var env = process.env.WEBPACK_ENV;

	// REQUIRE ALL POLYFILLS

	// WebGL math library.

	var glMatrix = __webpack_require__(32);

	if (!glMatrix) {

	    console.error('gl-matrix could\'nt be loaded...');
	} else {

	    console.log('loaded gl-matrix');
	}

	// Import WebVR-Mini libraries. Note: if you don't use super() imports will fail!

	//import Loader from './load-pool';

	// import Shader from './Shader';

	// Collects the shaders in one place.

	// All objects.

	// import Map2d from './map2d';
	// import Map3d from './map3d';
	// import Morph from './morph';

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

	// WebVR needs WebGL.

	var webvr = new _webvr2.default(false, util, glMatrix, webgl);

	// The Prim object needs Loaders.

	var loadModel = new _loadModel2.default(true, util, glMatrix, webgl);

	var loadTexture = new _loadTexture2.default(true, util, glMatrix, webgl);

	var loadAudio = new _loadAudio2.default(true, util, glMatrix, webgl);

	var loadVideo = new _loadVideo2.default(true, util, glMatrix, webgl);

	var loadFont = new _loadFont2.default(true, util, glMatrix, webgl);

	var prim = new _prim2.default(true, util, glMatrix, webgl, loadModel, loadTexture, loadAudio, loadVideo);

	var shaderTexture = new _shaderTexture2.default(true, util, glMatrix, webgl, prim);

	var shaderColor = new _shaderColor2.default(true, util, glMatrix, webgl, prim);

	var shaderDirlightTexture = new _shaderDirlightTexture2.default(true, util, glMatrix, webgl, prim);

	var renderer = new _renderer2.default(true, util, glMatrix, webgl, shaderTexture, shaderColor, shaderDirlightTexture);

	// Create the world, which needs WebGL, WebVR, and Prim.

	var world = new _world2.default(webgl, prim, renderer, shaderTexture, shaderColor);

	// Export our classes to app.js.

	exports.util = util;
	exports.webgl = webgl;
	exports.loadModel = loadModel;
	exports.loadTexture = loadTexture;
	exports.loadAudio = loadAudio;
	exports.loadVideo = loadVideo;
	exports.prim = prim;
	exports.webvr = webvr;
	exports.world = world;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Util = function () {

	        /** 
	         * Utility functions.
	         */

	        function Util() {
	                _classCallCheck(this, Util);

	                console.log('in Util');

	                // Performance polyfill.

	                this.setPerformance();
	        }

	        /* 
	         * ======= DATE, TIME, PERFORMANCE OPERATIONS =======
	         */

	        /** 
	         * Performance polyfill for timing.
	         */


	        _createClass(Util, [{
	                key: 'setPerformance',
	                value: function setPerformance() {

	                        if (!'performance' in window) {

	                                window.performance = {};
	                        }

	                        Date.now = Date.now || function () {
	                                // can't use () => here!

	                                return new Date().getTime();
	                        };

	                        if (!'now' in window.performance) {
	                                (function () {

	                                        var nowOffset = Date.now();

	                                        if (performance.timing && performance.timing.navigationStart) {

	                                                nowOffset = performance.timing.navigationStart;
	                                        }

	                                        window.performance.now = function () {

	                                                return Date.now() - nowOffset;
	                                        };
	                                })();
	                        }
	                }

	                /* 
	                 * =============== STRING OPERATIONS ====================
	                 */

	        }, {
	                key: 'isString',
	                value: function isString(str) {

	                        return typeof str == 'string' || isObjectLike(str) && objToString.call(str) == stringTag || false;
	                }

	                /** 
	                 * Reverse string (used in hash keys)
	                 */

	        }, {
	                key: 'reverseString',
	                value: function reverseString(str) {

	                        return str.split('').reverse().join('');
	                }

	                /* 
	                 * =============== NUMBER OPERATIONS ====================
	                 */

	                /** 
	                 * Check if a variable can be coerced to a number.
	                 */

	        }, {
	                key: 'isNumber',
	                value: function isNumber(n) {

	                        return Number.isFinite(parseFloat(n));
	                }
	        }, {
	                key: 'isPowerOfTwo',
	                value: function isPowerOfTwo(n) {

	                        return (n & n - 1) === 0;
	                }
	        }, {
	                key: 'isEven',
	                value: function isEven(n) {

	                        return n % 2 == 0;
	                }
	        }, {
	                key: 'isOdd',
	                value: function isOdd(n) {

	                        return Math.abs(n % 2) == 1;
	                }
	        }, {
	                key: 'degToRad',
	                value: function degToRad(degrees) {

	                        return degrees * Math.PI / 180;
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

	                        return n % 1;
	                }

	                /* 
	                 * =============== ARRAY OPERATIONS ====================
	                 */

	        }, {
	                key: 'containsAll',
	                value: function containsAll(arr1, arr2) {

	                        arr2.every(function (arr2Item) {
	                                return arr1.includes(arr2Item);
	                        });
	                }

	                /** 
	                 * compare two arrays, return true if identical number of elements, 
	                 * and all values are the same.
	                 */

	        }, {
	                key: 'compArr',
	                value: function compArr(arr1, arr2) {

	                        return this.containsAll(arr1, arr2) && this.containsAll(arr2, arr1);
	                }

	                /** 
	                 * Get a succession of values from a flat array
	                 * @param {Array} arr a flat array.
	                 * @param {Number} idx index into the array.
	                 * @param {Number} size number of elements to get. This is 
	                 * also assumed to be the 'stride' through the array.
	                 * @returns {Array} requested elements in an Array.
	                 */

	        }, {
	                key: 'getArr',
	                value: function getArr(arr, idx, size) {

	                        if (!arr || idx < 0 || size < 1) {

	                                console.error('getArr() invalid params, arr:' + arr + ', index:' + idx + ' size:' + size);

	                                return -1;
	                        }

	                        var o = [];

	                        for (var i = 2; i < size; i++) {

	                                o.push(arr[idx * size + i]);
	                        }

	                        return o;
	                }

	                /** 
	                 * Get an object from a 2d array. Supply a variable list of 
	                 * values. The number of values is assumed to be the 'walk' size 
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

	                                console.error('no value or index specified');

	                                return -1;
	                        }

	                        var size = alen - 2;

	                        for (var i = 2; i < alen; i++) {

	                                arr[idx * size + i] - arguments[i];
	                        }

	                        return idx; // ending position 
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
	                 * @param {Number} subSize the 'chunk' of the array being put into a sub-array.
	                 * @returns{Array} a 2-dimensional array with each element in the second dimension of subSize length.
	                 */

	        }, {
	                key: 'unFlatten',
	                value: function unFlatten(arr, subSize) {

	                        var ct = 0,
	                            ct2 = 0;

	                        var nodes = []; // multi-dimensional

	                        var sub = new Array(arr.length / subSize);

	                        for (var i = 0; i < arr.length; i += subSize) {

	                                var a = new Array(subSize);

	                                for (var j = 0; j < subSize; j++) {

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


	                                // Convert both to array type of first array.

	                                if (arr1 instanceof Float32Array) {

	                                        result = new Float32Array(len1 + len2);

	                                        if (!arr2 instanceof Float32Array) {

	                                                arr2 = Float32Array.from(arr2);
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
	        }, {
	                key: 'randomColor',
	                value: function randomColor() {

	                        return [Math.abs(Math.random()), Math.abs(Math.random()), Math.abs(Math.random())];
	                }

	                /* 
	                 * ============ SYSTEM AND Ui OPERATIONS =================
	                 */

	                // Get the file extension of a file.

	        }, {
	                key: 'getFileExtension',
	                value: function getFileExtension(fname) {

	                        return fname.slice((fname.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
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
	        }]);

	        return Util;
	}();

	exports.default = Util;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

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

	                this.glVers = 0;

	                this.glMatrix = glMatrix;

	                this.util = util;

	                if (init === true) {

	                        this.init(canvas);
	                }

	                // If we are running in debug mode, save the debug utils into this object.

	                if (debug) {

	                        this.debug = debug;
	                }
	        }

	        /** 
	         * Clear textures from the videocard before starting.
	         */


	        _createClass(WebGL, [{
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

	                /**
	                 * initialize with a canvas context
	                 * @param {HTMLCanvasElement|String|undefined} canvas a HTML5 <canvas>, id for canvas, or undefined, 
	                 * in which case a <canvas> object is 
	                 * created and added to document.body, an ID value for a tag, or a CanvasDOMobject.
	                 * @param {Function} lostContext callback when WebGL context is lost.
	                 * @param {Function} restoredContext callback when WebGL context is restored.
	                 * @returns {WebGLContext} the WebGL context of the <canvas> object.
	                 */

	        }, {
	                key: 'init',
	                value: function init(canvas, lostContext, restoredContext) {
	                        var _this = this;

	                        if (!canvas) {

	                                canvas = document.createElement('canvas');

	                                canvas.width = 480;

	                                canvas.height = 320;

	                                // This seems to fix a bug in IE 11. TODO: remove extra empty <canvas>.

	                                document.body.appendChild(canvas);
	                        } else if (this.util.isString(canvas)) {

	                                canvas = document.getElementById(canvas);
	                        } else {

	                                canvas = canvas;
	                        }

	                        if (canvas) {

	                                // NOTE: IE10 needs this bound to DOM for the following command to work.

	                                var r = canvas.getBoundingClientRect();

	                                canvas.width = r.width;

	                                canvas.height = r.height;

	                                this.gl = this.createContext(canvas);

	                                if (this.gl) {

	                                        var gl = this.gl;

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

	                                        // Default WebGL initializtion and stats, can be over-ridden in your world file.

	                                        if (gl.getParameter && gl.getShaderPrecisionFormat) {

	                                                this.stats = {};

	                                                var stats = this.stats;

	                                                // Check if high precision supported in fragment shader.

	                                                stats.highp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision;

	                                                // Max texture size, for gl.texImage2D.                

	                                                stats.maxTexSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

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

	                                        // If we're reloading, clear all current textures in the texture buffers.

	                                        this.clearTextures();

	                                        // Default 3D enables.

	                                        gl.enable(gl.DEPTH_TEST);

	                                        gl.enable(gl.CULL_FACE);

	                                        //gl.disable(gl.CULL_FACE);

	                                        gl.clearDepth(1.0); // Clear everything

	                                        gl.depthFunc(gl.LEQUAL); // Near things obscure far things

	                                        gl.enable(gl.BLEND); // Allow blending

	                                        // Fog NOT in Webgl use shader
	                                        //http://www.geeks3d.com/20100228/fog-in-glsl-webgl/
	                                        // http://in2gpu.com/2014/07/22/create-fog-shader/
	                                        //gl.enable( gl.FOG );

	                                        // set this for individual objects 
	                                        //gl.blendFunc( gl.SRC_ALPHA, gl.ONE );

	                                        /* 
	                                         * IMPORTANT: tells WebGL to premultiply alphas for <canvas>
	                                         * @link http://stackoverflow.com/questions/39251254/avoid-cpu-side-conversion-with-teximage2d-in-firefox
	                                         */
	                                        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

	                                        gl.clearColor(0.1, 0.1, 0.1, 1.0);

	                                        return this.gl;
	                                } // end of have a gl context

	                        } // end of if have a <canvas>

	                        return null;
	                }
	        }, {
	                key: 'stats',
	                value: function stats() {}

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
	                 * NOTE: affected by CSS styles.
	                 * TODO: check current CSS style.
	                 * (TWGL)
	                 */

	        }, {
	                key: 'resizeCanvas',
	                value: function resizeCanvas() {

	                        if (this.ready()) {

	                                var f = Math.max(window.devicePixelRatio, 1);

	                                var gl = this.getContext();

	                                var c = this.getCanvas();

	                                var width = c.clientWidth * f | 0;

	                                var height = c.clientHeight * f | 0;

	                                if (c.width !== width || c.height !== height) {

	                                        c.width = width;

	                                        c.height = height;

	                                        gl.viewportWidth = c.width;

	                                        gl.viewportHeight = c.height;

	                                        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	                                        return true;
	                                }
	                        }

	                        return false;
	                }

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

	                                                                console.warn('unable to use debug context, trying release:' + n[i], ' getParameter:' + gl.getParameter);
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

	                                this.glVers = gl.getParameter(gl.VERSION).toLowerCase();

	                                if (i == 1 || i == 3) {

	                                        console.warn('experimental context, .getParameter() may not work');
	                                }

	                                console.log('version:' + gl.getParameter(gl.VERSION));

	                                // Take action, depending on version (identified by pos in our test array n).

	                                switch (i) {

	                                        case 0:
	                                        case 1:
	                                                //if ( ! gl.TRANSFORM_FEEDBACK ) {
	                                                // revert to 1.0
	                                                //    console.log("TRANSFORM FEEDBACK NOT SUPPORTED")
	                                                //}
	                                                this.glVers = 2.0;
	                                                break;

	                                        case 2:
	                                        case 3:
	                                                this.glVers = 1.0;
	                                                this.addVertexBufferSupport(gl);
	                                                break;

	                                        default:
	                                                break;

	                                }
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

	                /** 
	                 * Clear the screen prior to redraw.
	                 */

	        }, {
	                key: 'clear',
	                value: function clear() {

	                        var gl = this.gl;

	                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	                        /////////////////////gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
	                }

	                /** 
	                 * Add vertex buffer support to WebGL 1.0
	                 * @param {WebGLRenderingContext} gl a WebGL rendering context (should be 1.x only)l
	                 */

	        }, {
	                key: 'addVertexBufferSupport',
	                value: function addVertexBufferSupport(gl) {

	                        var ext = gl.getExtension('OES_vertex_array_object');

	                        if (ext) {

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

	                                gl.VERTEX_ARRAY_BINDING = ext.VERTEX_ARRAY_BINDING_OES;
	                        }
	                }

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

	                                        return self.createShader(type, source);
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

	                /** 
	                 * Create WebGL program with shaders. Program not used until 
	                 * we apply gl.useProgram(program).
	                 * @param {gl.VERTEX_SHADER} vShader the vertex shader.
	                 * @param {gl.FRAGMENT_SHADER} fShader the fragment shader.
	                 */

	        }, {
	                key: 'createProgram',
	                value: function createProgram(vs, fs) {

	                        if (!vs || !fs) {

	                                console.error('createProgram: parameter error, vs:' + vs + ' fs:' + fs);

	                                return null;
	                        }

	                        // Wrap the program object to make V8 happy.

	                        var prg = {};

	                        if (this.ready()) {

	                                var gl = this.gl;

	                                var vso = this.createVertexShader(vs.code);

	                                var fso = this.createFragmentShader(fs.code);

	                                var program = gl.createProgram();

	                                gl.attachShader(program, vso);

	                                gl.attachShader(program, fso);

	                                gl.linkProgram(program);

	                                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {

	                                        console.error('createProgram:' + gl.getProgramInfoLog(program));

	                                        this.checkShaders(vs, fs, program);
	                                } else {

	                                        prg.shaderProgram = program;

	                                        prg.vsVars = vs.varList, prg.fsVars = fs.varList;
	                                }
	                        }

	                        return prg;
	                }

	                /** 
	                 * Read shader code, and organize the variables in the shader 
	                 * into an object. Abstracts some of the tedious work in setting 
	                 * up shader variables.
	                 * @param {Array} sourceArr array of lines in the shader.
	                 * @returns {Object} an object organizing attribute, uniform, and 
	                 * varying variable names and datatypes.
	                 */

	        }, {
	                key: 'createVarList',
	                value: function createVarList(source) {

	                        var len = source.length;

	                        var sp = ' ';

	                        var list = {};

	                        var varTypes = ['attribute', 'uniform', 'varying'];

	                        if (len) {

	                                for (var i = 0; i < len; i++) {

	                                        var s = source[i];

	                                        if (s.indexOf('void main') !== -1) {

	                                                break;
	                                        } else {

	                                                for (var j = 0; j < varTypes.length; j++) {

	                                                        var type = varTypes[j];

	                                                        if (!list[type]) list[type] = {};

	                                                        if (s.indexOf(type) > -1) {

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
	                 * assign the attribute arrays.
	                 */

	        }, {
	                key: 'setAttributeArrays',
	                value: function setAttributeArrays(shaderProgram, attributes) {

	                        var gl = this.gl;

	                        for (var i in attributes) {

	                                var attb = attributes[i];

	                                // Note: we call glEnableAttribArray only when rendering

	                                for (var j in attb) {

	                                        attb[j] = gl.getAttribLocation(shaderProgram, j);

	                                        //////////console.log('gl.getAttribLocation( shaderProgram, "' + j + '" ) is:' + attb[ j ] );
	                                }
	                        }

	                        return attributes;
	                }
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
	                 * Bind attribute locations.
	                 * @param {WebGLProgram} program a compiled WebGL program.
	                 * @param {Object} attribLocationmap the attributes.
	                 */

	        }, {
	                key: 'bindAttributeLocations',
	                value: function bindAttributeLocations(program, attribLocationMap) {

	                        var gl = this.gl;

	                        if (attribLocationMap) {

	                                for (var attribName in attribLocationMap) {

	                                        console.log('binding attribute:' + attribName + ' to:' + attribLocationMap[attribName]);

	                                        gl.bindAttribLocation(program, attribLocationMap[attribName], attribName);
	                                }
	                        } else {

	                                console.warn('webgl.bindAttributes: no attributes supplied');
	                        }
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
	                 * NOTE: Only attributes actually used in the shader show.
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

	                                console.log("adding uniform:" + uniformName);

	                                uniform[uniformName] = gl.getUniformLocation(program, uniformName);
	                        }

	                        // Store the number of uniforms.

	                        uniform.count = uniformCount;

	                        return uniform;
	                }

	                /** 
	                 * Create associative array with shader varying variables.
	                 */

	        }, {
	                key: 'getVarying',
	                value: function getVarying(program) {}

	                /** 
	                 * check to see if we're ready to run, after supplying 
	                 * shaders.
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
	                 * Check if our VBO, IBO are ok.
	                 */

	        }, {
	                key: 'checkBufferObjects',
	                value: function checkBufferObjects(bo) {

	                        return bo && bo instanceof ArrayBuffer;
	                }
	        }]);

	        return WebGL;
	}();

	exports.default = WebGL;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WebVR = function () {
	        function WebVR(init, util, glMatrix, webgl) {
	                _classCallCheck(this, WebVR);

	                console.log('in webVR class');

	                this.util = util;

	                this.glMatrix = glMatrix;

	                this.webgl = webgl;

	                if (this.init === true) {

	                        // Do something.

	                }
	        }

	        _createClass(WebVR, [{
	                key: 'init',
	                value: function init() {}
	        }]);

	        return WebVR;
	}();

	exports.default = WebVR;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _loadPool = __webpack_require__(8);

	var _loadPool2 = _interopRequireDefault(_loadPool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LoadTexture = function (_LoadPool) {
	        _inherits(LoadTexture, _LoadPool);

	        /**
	         * Texture loader, using a texture pool.
	        * @link http://blog.tojicode.com/2012/03/javascript-memory-optimization-and.html
	         */

	        function LoadTexture(init, util, glMatrix, webgl) {
	                _classCallCheck(this, LoadTexture);

	                console.log('in LoadTexture class');

	                // Init superclass.

	                var MAX_CACHE_IMAGES = 3;

	                // Specific to texture cache.

	                var _this = _possibleConstructorReturn(this, (LoadTexture.__proto__ || Object.getPrototypeOf(LoadTexture)).call(this, init, util, glMatrix, webgl, MAX_CACHE_IMAGES));

	                _this.MAX_TIMEOUT = 10;

	                _this.greyPixel = new Uint8Array([0.5, 0.5, 0.5, 1.0]);

	                if (init) {

	                        // Do something specific to the sublclass.

	                }

	                return _this;
	        }

	        _createClass(LoadTexture, [{
	                key: 'init',
	                value: function init() {}

	                /**
	                 * Sets a texture to a 1x1 pixel color. 
	                 * @param {WebGLRenderingContext} gl the WebGLRenderingContext.
	                 * @param {WebGLTexture} texture the WebGLTexture to set parameters for.
	                 * @param {WebGLParameter} target.
	                 * @memberOf module: webvr-mini/LoadTexture
	                 */

	        }, {
	                key: 'setDefaultTexturePixel',
	                value: function setDefaultTexturePixel(gl, texture, target) {

	                        // Put 1x1 pixels in texture. That makes it renderable immediately regardless of filtering.

	                        var color = this.greyPixel;

	                        if (target === gl.TEXTURE_CUBE_MAP) {

	                                for (var i = 0; i < 6; ++i) {

	                                        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, color);
	                                }
	                        } else if (target === gl.TEXTURE_3D) {

	                                gl.texImage3D(target, 0, gl.RGBA, 1, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, color);
	                        } else {

	                                gl.texImage2D(target, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, color);
	                        }
	                }

	                /** 
	                 * Create a load object wrapper, and start a load.
	                 * POLYMORPHIC FOR LOAD MEDIA TYPE.
	                 * @param {Object} waitObj the unresolved wait object holding load directions for the asset.
	                 * @memberOf module: webvr-mini/LoadTexture
	                 */

	        }, {
	                key: 'createLoadObj',
	                value: function createLoadObj(waitObj) {
	                        var _this2 = this;

	                        var loadObj = {};

	                        loadObj.image = new Image();

	                        loadObj.image.crossOrigin = 'anonymous';

	                        loadObj.callback = waitObj.callback;

	                        loadObj.prim = waitObj.attach; ///////////////////////////

	                        loadObj.busy = true;

	                        // https://www.nczonline.net/blog/2013/09/10/understanding-ecmascript-6-arrow-functions/

	                        loadObj.image.addEventListener('load', function (e) {
	                                return _this2.uploadTexture(loadObj, loadObj.callback);
	                        });

	                        loadObj.image.addEventListener('error', function (e) {
	                                return console.log('error loading image:' + waitObj.source);
	                        }, false);

	                        // Start the loading.

	                        loadObj.image.src = waitObj.source;

	                        this.cacheCt++; // TODO: NOT NEEDED?

	                        return loadObj;
	                }

	                /** 
	                 * Create a WebGL texture and upload to GPU.
	                 * Note: problems with firefox data, see:
	                 * http://stackoverflow.com/questions/39251254/avoid-cpu-side-conversion-with-teximage2d-in-firefox
	                 * @param {Object} loadObj the loader object containing Image data.
	                 * @param {Function} callback callback function for individual texture load.
	                 * @memberOf module: webvr-mini/LoadTexture
	                 */

	        }, {
	                key: 'uploadTexture',
	                value: function uploadTexture(loadObj, callback) {

	                        ////////////console.log( 'In uploadTexture() for:' + loadObj.prim.name + ' src:' + loadObj.image.src );

	                        var gl = this.webgl.getContext();

	                        var textures = loadObj.prim.textures;

	                        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

	                        var textureObj = {
	                                image: loadObj.image,
	                                src: loadObj.image.src,
	                                texture: gl.createTexture()
	                        };

	                        gl.bindTexture(gl.TEXTURE_2D, textureObj.texture);

	                        // Use image, or default to single-color texture if image is not present.

	                        if (textureObj.image) {

	                                //////////console.log( 'binding image:' + textureObj.image.src );

	                                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureObj.image);

	                                // TODO: WHEN TO USE gl.renderBufferStorage()???
	                        } else {

	                                console.error('no loadObj.image for:' + textureObj.image.src + ', using default pixel texture');

	                                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.greyPixel);
	                        }

	                        if (this.util.isPowerOfTwo(textureObj.image.width) && this.util.isPowerOfTwo(textureObj.image.height)) {

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

	                        textures.push(textureObj);

	                        //window.prim = loadObj.prim;

	                        // Clear the object for re-use.

	                        loadObj.busy = false;

	                        // Send this to update for re-use .

	                        this.update(loadObj);
	                }

	                /** 
	                 * Upload a cubemap texture.
	                 * @memberOf module: webvr-mini/LoadTexture
	                 */

	        }, {
	                key: 'uploadCubeTexture',
	                value: function uploadCubeTexture() {}

	                /** 
	                 * Upload a 3d texture.
	                 * @memberOf module: webvr-mini/LoadTexture
	                 */

	        }, {
	                key: 'upload3DTexture',
	                value: function upload3DTexture() {}

	                // load() and update() are defined in the superclass.

	        }]);

	        return LoadTexture;
	}(_loadPool2.default);

	exports.default = LoadTexture;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoadPool = function () {

	        /**
	         * Base loader class. We don't use promise.all since we want to keep a 
	         * limited pool of loaders, which accept a larger number of waitObjs. As 
	         * each loadObj completes a load, it checks the queue to see if there is 
	         * another loadObj neededing a load.
	         */

	        function LoadPool(init, util, glMatrix, webgl, MAX_CACHE) {
	                _classCallCheck(this, LoadPool);

	                console.log('in LoadPool class');

	                this.util = util;

	                this.webgl = webgl;

	                this.glMatrix = glMatrix;

	                this.MAX_CACHE = MAX_CACHE; // from subclass

	                this.loadCache = new Array(MAX_CACHE);

	                this.waitCache = []; // Could be hundreds

	                this.waitCt = 0; // wait cache pointer

	                this.loadCt = 0; // load cache pointer

	                this.ready = false;
	        }

	        /** 
	         * Add to the queue of unresolved wait objects, an object holding
	         * directions for loading the asset and callback(s).
	         * @param {String} source the image path.
	         * @param {Function} callback callback function ofr individual waiter.
	         */


	        _createClass(LoadPool, [{
	                key: 'createWaitObj',
	                value: function createWaitObj(source, attach, callback) {

	                        /////////////console.log( 'creating wait object...' + source );

	                        this.loadCt++;

	                        this.waitCache.push({

	                                source: source,

	                                attach: attach,

	                                callback: callback

	                        });
	                }

	                // Create LoadObject is specific to subclass.

	                // UploadXXX is specific to subclass.

	                /** 
	                 * Update the queue.
	                 */

	        }, {
	                key: 'update',
	                value: function update(loadObj) {

	                        /////////////console.log( 'in loadTexture.update()' );

	                        var waitCache = this.waitCache;

	                        var wLen = waitCache.length;

	                        if (wLen < 1) {

	                                console.log('all assets loaded for:' + loadObj.prim.name);

	                                this.ready = true;

	                                return;
	                        }

	                        this.ready = false;

	                        // Check if there is an available loadCache

	                        var i = 0;

	                        var loadCache = this.loadCache;

	                        var waitObj = waitCache[0];

	                        /////////console.log( 'in update(), have a waitObj waiting...' + waitObj.attach.name + ' src:' + waitObj.source );

	                        if (loadObj && loadObj.busy === false) {

	                                //////////console.log( 're-using a loader object:' + ' loadObj:' + loadObj  );

	                                loadObj.prim = waitObj.attach;

	                                loadObj.image.src = waitObj.source;

	                                waitCache.shift();
	                        } else {

	                                for (i; i < loadCache.length; i++) {

	                                        if (!loadCache[i]) {

	                                                //////////console.log( 'creating a new Loader object at cache pos:' + i );

	                                                loadCache[i] = this.createLoadObj(waitObj);

	                                                waitCache.shift();

	                                                break;
	                                        }
	                                }
	                        }
	                } // end of update

	                /** 
	                 * load objects into the waiting queue. This can happen very quickly. 
	                 * images are queue for loading, with callback for each load, and 
	                 * final callback. We use custom code here instead of a Promise for 
	                 * brevity and flexibility.
	                 * @param {String} source the path to the image file
	                 * @param {Function} callback each time an image is loaded.
	                 * @param {Function} finalCallback (optional) the callback executed when all objects are loaded.
	                 */

	        }, {
	                key: 'load',
	                value: function load(source, attach, callback, finalCallback) {

	                        // Push a load request onto the queue.

	                        this.createWaitObj(source, attach, callback);

	                        // Start loading, if space available.

	                        this.update();
	                }
	        }]);

	        return LoadPool;
	}();

	exports.default = LoadPool;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _loadPool = __webpack_require__(8);

	var _loadPool2 = _interopRequireDefault(_loadPool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LoadModel = function (_LoadPool) {
	        _inherits(LoadModel, _LoadPool);

	        /**
	         * Base loader class.
	         */

	        function LoadModel(init, util, glMatrix, webgl) {
	                _classCallCheck(this, LoadModel);

	                console.log('in LoadModel class');

	                return _possibleConstructorReturn(this, (LoadModel.__proto__ || Object.getPrototypeOf(LoadModel)).call(this, init, util, glMatrix, webgl));
	        }

	        _createClass(LoadModel, [{
	                key: 'init',
	                value: function init() {}
	        }, {
	                key: 'uploadModel',
	                value: function uploadModel(loadObj, callback) {

	                        var lines = loadObj;

	                        return {
	                                vertices: vertices,
	                                indices: indices,
	                                normals: normals
	                        };
	                }
	        }, {
	                key: 'createLoadObj',
	                value: function createLoadObj(waitObj) {

	                        var loadObj = {};

	                        loadObj.model = {};

	                        //loadObj.model.crossOrigin = 'anonymous';
	                        // TODO: set headers and crossorigin here

	                        loadObj.callback = waitObj.callback;

	                        loadObj.prim = waitObj.attach; ///////////////////////////

	                        loadObj.busy = true;

	                        fetch(waitObj.source).then(function (response) {
	                                return response.text();
	                        }).then(function (xmlString) {
	                                return uploadModel(loadObj, waitObj.callback);
	                        }).then(function (data) {
	                                return console.log(data);
	                        });

	                        // Start the loading.

	                        this.cacheCt++;

	                        return loadObj;
	                }
	        }]);

	        return LoadModel;
	}(_loadPool2.default);

	exports.default = LoadModel;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _loadPool = __webpack_require__(8);

	var _loadPool2 = _interopRequireDefault(_loadPool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LoadAudio = function (_LoadPool) {
	        _inherits(LoadAudio, _LoadPool);

	        /**
	         * Base loader class.
	         * @link https://www.html5rocks.com/en/tutorials/webaudio/intro/
	         * @link http://mdn.github.io/fetch-examples/fetch-array-buffer/
	         */

	        function LoadAudio(init, util, glMatrix, webgl) {
	                _classCallCheck(this, LoadAudio);

	                console.log('in LoadAudio class');

	                var _this = _possibleConstructorReturn(this, (LoadAudio.__proto__ || Object.getPrototypeOf(LoadAudio)).call(this, init, util, glMatrix, webgl, MAX_CACHE_AUDIO));

	                var MAX_CACHE_AUDIO = 3;

	                _this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	                _this.sources = {};

	                if (init === true) {}

	                return _this;
	        }

	        _createClass(LoadAudio, [{
	                key: 'uploadAudio',
	                value: function uploadAudio(loadObj, callback) {

	                        var audio = loadObj.prim.audio;

	                        var audioObj = {
	                                audio: loadObj.audio,
	                                src: loadObj.src
	                        };

	                        // TODO: set audio volume, etc.

	                        audio.push(audioObj);

	                        // Clear the object for re-use.

	                        loadObj.busy = false;

	                        this.update(loadObj);
	                }
	        }, {
	                key: 'createLoadObj',
	                value: function createLoadObj(waitObj) {

	                        loadObj = {};

	                        loadObj.src = waitObj.source;

	                        loadObj.audio = this.audioCtx.createBufferSource();

	                        var req = new Request(waitObj.source);

	                        // TODO: SET CORS and mime type

	                        fetch(req).then(function (response) {

	                                if (!response.ok) {

	                                        throw Error(response.statusText);
	                                }

	                                return response.arrayBuffer();
	                        }).then(function (buffer) {

	                                if (!buffer) {

	                                        throw Error('no audio arrayBuffer');
	                                }

	                                this.audioCtx.decodeAudioData(buffer, function (decodedData) {

	                                        loadObj.audio.buffer = decodedData;

	                                        loadObj.audio.connect(this.audioCtx.destination);

	                                        // Attach to prim.

	                                        this.update(loadObj);
	                                });
	                        }).catch(function (err) {

	                                console.error(err);
	                        });
	                }
	        }]);

	        return LoadAudio;
	}(_loadPool2.default);

	exports.default = LoadAudio;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _loadPool = __webpack_require__(8);

	var _loadPool2 = _interopRequireDefault(_loadPool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LoadVideo = function (_LoadPool) {
	    _inherits(LoadVideo, _LoadPool);

	    /**
	     * Base loader class.
	     */

	    function LoadVideo(init, util, glMatrix, webgl) {
	        _classCallCheck(this, LoadVideo);

	        console.log('in LoadVideo class');

	        return _possibleConstructorReturn(this, (LoadVideo.__proto__ || Object.getPrototypeOf(LoadVideo)).call(this, init, util, glMatrix, webgl));
	    }

	    _createClass(LoadVideo, [{
	        key: 'init',
	        value: function init() {}
	    }]);

	    return LoadVideo;
	}(_loadPool2.default);

	exports.default = LoadVideo;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _loadPool = __webpack_require__(8);

	var _loadPool2 = _interopRequireDefault(_loadPool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LoadFont = function (_LoadPool) {
	        _inherits(LoadFont, _LoadPool);

	        /** 
	         * Load and configure fonts for use.
	         * Working with fonts:
	         * @link https://www.html5rocks.com/en/tutorials/webgl/million_letters/
	         */

	        function LoadFont(init, util, glMatrix, webgl) {
	                _classCallCheck(this, LoadFont);

	                console.log('in LoadFont class');

	                // Init superclass.

	                var MAX_CACHE_FONTS = 3;

	                return _possibleConstructorReturn(this, (LoadFont.__proto__ || Object.getPrototypeOf(LoadFont)).call(this, init, util, glMatrix, webgl, MAX_CACHE_FONTS));
	        }

	        return LoadFont;
	}(_loadPool2.default);

	exports.default = LoadFont;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	            value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shader = __webpack_require__(14);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ShaderTexture = function (_Shader) {
	            _inherits(ShaderTexture, _Shader);

	            function ShaderTexture(init, util, glMatrix, webgl, prim) {
	                        _classCallCheck(this, ShaderTexture);

	                        var _this = _possibleConstructorReturn(this, (ShaderTexture.__proto__ || Object.getPrototypeOf(ShaderTexture)).call(this, init, util, glMatrix, webgl, prim));

	                        console.log('In ShaderTexture class');

	                        return _this;
	            }

	            /** 
	             * --------------------------------------------------------------------
	             * VERTEX SHADER 1
	             * a default-lighting textured object vertex shader.
	             * - vertex position
	             * - texture coordinate
	             * - model-view matrix
	             * - projection matrix
	             * --------------------------------------------------------------------
	             */


	            _createClass(ShaderTexture, [{
	                        key: 'vsSrc',
	                        value: function vsSrc() {

	                                    var s = ['attribute vec3 aVertexPosition;', 'attribute vec2 aTextureCoord;', 'uniform mat4 uMVMatrix;', 'uniform mat4 uPMatrix;', 'varying vec2 vTextureCoord;', 'void main(void) {', '    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);', '    vTextureCoord = aTextureCoord;', '}'];

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

	                                    // 'precision mediump float;',

	                                    this.floatp, 'varying vec2 vTextureCoord;', 'uniform sampler2D uSampler;', 'void main(void) {', '    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));', '}'];

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

	            }, {
	                        key: 'init',
	                        value: function init(objList) {

	                                    // DESTRUCTING DID NOT WORK!
	                                    //[gl, canvas, mat4, vec3, pMatrix, mvMatrix, program ] = this.setup();

	                                    var arr = this.setup();
	                                    var gl = arr[0];
	                                    var canvas = arr[1];
	                                    var mat4 = arr[2];
	                                    var mat3 = arr[3];
	                                    var vec3 = arr[4];
	                                    var pMatrix = arr[5];
	                                    var mvMatrix = arr[6];
	                                    var program = arr[7];
	                                    var vsVars = arr[8];
	                                    var fsVars = arr[9];

	                                    // Attach objects.

	                                    var shaderProgram = program.shaderProgram;

	                                    window.vs1Vars = vsVars; /////////////////////////////////////////////////////////

	                                    program.renderList = objList || [];

	                                    // TODO: SET UP VERTEX ARRAYS, http://blog.tojicode.com/2012/10/oesvertexarrayobject-extension.html
	                                    // TODO: https://developer.apple.com/library/content/documentation/3DDrawing/Conceptual/OpenGLES_ProgrammingGuide/TechniquesforWorkingwithVertexData/TechniquesforWorkingwithVertexData.html
	                                    // TODO: http://max-limper.de/tech/batchedrendering.html

	                                    // Update object position, motion.

	                                    program.update = function (obj) {

	                                                // Standard Model-View (mvMatrix) updates, per Prim.

	                                                obj.setMV(mvMatrix);

	                                                // Custom updates go here.
	                                    };

	                                    // Rendering.

	                                    program.render = function () {

	                                                //console.log( 'gl:' + gl + ' canvas:' + canvas + ' mat4:' + mat4 + ' vec3:' + vec3 + ' pMatrix:' + pMatrix + ' mvMatrix:' + mvMatrix + ' program:' + program );

	                                                gl.useProgram(shaderProgram);

	                                                // Reset perspective matrix.

	                                                mat4.perspective(pMatrix, Math.PI * 0.4, canvas.width / canvas.height, 0.1, 100.0); // right

	                                                // Begin program loop

	                                                for (var i = 0, len = program.renderList.length; i < len; i++) {

	                                                            var obj = program.renderList[i];

	                                                            // Only render if we have at least one texture loaded.

	                                                            if (!obj.textures[0] || !obj.textures[0].texture) continue;

	                                                            // Update Model-View matrix with standard Prim values.

	                                                            program.update(obj, mvMatrix);

	                                                            // Bind vertex buffer.

	                                                            gl.bindBuffer(gl.ARRAY_BUFFER, obj.geometry.vertices.buffer);
	                                                            gl.enableVertexAttribArray(vsVars.attribute.vec3.aVertexPosition);
	                                                            gl.vertexAttribPointer(vsVars.attribute.vec3.aVertexPosition, obj.geometry.vertices.itemSize, gl.FLOAT, false, 0, 0);

	                                                            // Bind Textures buffer (could have multiple bindings here).

	                                                            gl.bindBuffer(gl.ARRAY_BUFFER, obj.geometry.texCoords.buffer);
	                                                            gl.enableVertexAttribArray(vsVars.attribute.vec2.aTextureCoord);
	                                                            gl.vertexAttribPointer(vsVars.attribute.vec2.aTextureCoord, obj.geometry.texCoords.itemSize, gl.FLOAT, false, 0, 0);

	                                                            gl.activeTexture(gl.TEXTURE0);
	                                                            gl.bindTexture(gl.TEXTURE_2D, null);
	                                                            gl.bindTexture(gl.TEXTURE_2D, obj.textures[0].texture);

	                                                            // Set fragment shader sampler uniform.

	                                                            gl.uniform1i(fsVars.uniform.sampler2D.uSampler, 0); //STRANGE

	                                                            // Set perspective and model-view matrix uniforms.

	                                                            gl.uniformMatrix4fv(vsVars.uniform.mat4.uPMatrix, false, pMatrix);
	                                                            gl.uniformMatrix4fv(vsVars.uniform.mat4.uMVMatrix, false, mvMatrix);

	                                                            // Bind index buffer.

	                                                            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.geometry.indices.buffer);

	                                                            // Draw elements.

	                                                            gl.drawElements(gl.TRIANGLES, obj.geometry.indices.numItems, gl.UNSIGNED_SHORT, 0);
	                                                }
	                                    };

	                                    return program;
	                        }
	            }]);

	            return ShaderTexture;
	}(_shader2.default);

	exports.default = ShaderTexture;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Shader = function () {

	        /* 
	         * Renderers.
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
	        function Shader(init, util, glMatrix, webgl, prim) {
	                _classCallCheck(this, Shader);

	                console.log('In Shader class');

	                this.webgl = webgl;

	                this.util = util;

	                this.prim = prim;

	                this.glMatrix = glMatrix;

	                this.pMatrix = this.glMatrix.mat4.create();

	                this.mvMatrix = this.glMatrix.mat4.create();

	                this.mvMatrixStack = this.glMatrix.mat4.create();

	                this.floatp = '';

	                if (this.webgl.stats.highp) {

	                        this.floatp = 'precision highp float;';
	                } else {

	                        this.floatp = 'precision mediump float;';
	                }

	                // If we need to load a vertext and fragment shader files (in text format), put their paths in derived classes.

	                this.vertexShaderFile = null;

	                this.fragmentShaderFile = null;
	        }

	        /* 
	          * MATRIX OPERATIONS
	          * Mostly with glMatrix
	          */

	        _createClass(Shader, [{
	                key: 'mvPushMatrix',
	                value: function mvPushMatrix() {

	                        var mat4 = this.glMatrix.mat4;

	                        var copy = mat4.create();

	                        mat4.set(this.mvMatrix, copy);

	                        mvMatrixStack.push(copy);
	                }
	        }, {
	                key: 'mvPopMatrix',
	                value: function mvPopMatrix() {

	                        if (this.mvMatrixStack.length == 0) {

	                                throw 'Invalid popMatrix!';
	                        }

	                        mvMatrix = this.mvMatrixStack.pop();
	                }

	                /** 
	                 * set up our program object, using WebGL. We wrap the 'naked' WebGL 
	                 * program object, and add additional properties to the wrapper. 
	                 * 
	                 * Individual shaders use these variables to construct a program wrapper 
	                 * object containing the GLProgram, plus properties, plus update() and 
	                 * render() functions.
	                 */

	        }, {
	                key: 'setup',
	                value: function setup() {

	                        // Compile shaders and create WebGL program using webgl object.

	                        var program = null;

	                        if (this.vertexShaderFile && this.this.fragmentShaderFile) {

	                                program = this.webgl.createProgram(this.webgl.fetchVertexShader(this.vertexShaderFile), this.webgl.fetchFragmentShader(this.fragmentShaderFile));
	                        } else {

	                                program = this.webgl.createProgram(this.vsSrc(), this.fsSrc());
	                        }

	                        // Return references to our properties, and assign uniform and attribute locations using webgl object.

	                        return [this.webgl.getContext(), this.webgl.getCanvas(), this.glMatrix.mat4, this.glMatrix.mat3, this.glMatrix.vec3, this.glMatrix.mat4.create(), // perspective

	                        this.glMatrix.mat4.create(), // model-view

	                        program, {
	                                attribute: this.webgl.setAttributeArrays(program.shaderProgram, program.vsVars.attribute),

	                                uniform: this.webgl.setUniformLocations(program.shaderProgram, program.vsVars.uniform)

	                        }, {

	                                uniform: this.webgl.setUniformLocations(program.shaderProgram, program.fsVars.uniform)

	                        }];
	                }
	        }]);

	        return Shader;
	}();

	exports.default = Shader;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shader = __webpack_require__(14);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ShaderColor = function (_Shader) {
	        _inherits(ShaderColor, _Shader);

	        function ShaderColor(init, util, glMatrix, webgl, prim) {
	                _classCallCheck(this, ShaderColor);

	                var _this = _possibleConstructorReturn(this, (ShaderColor.__proto__ || Object.getPrototypeOf(ShaderColor)).call(this, init, util, glMatrix, webgl, prim));

	                console.log('In ShaderColor class');

	                return _this;
	        }

	        _createClass(ShaderColor, [{
	                key: 'vsSrc',
	                value: function vsSrc() {

	                        var s = ['attribute vec3 aVertexPosition;', 'attribute vec4 aVertexColor;', 'uniform mat4 uMVMatrix;', 'uniform mat4 uPMatrix;', 'varying lowp vec4 vColor;', 'void main(void) {', '    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);', '    vColor = aVertexColor;', '}'];

	                        return {

	                                code: s.join('\n'),

	                                varList: this.webgl.createVarList(s)

	                        };
	                }
	        }, {
	                key: 'fsSrc',
	                value: function fsSrc() {

	                        var s = ['varying lowp vec4 vColor;', 'void main(void) {',

	                        //'gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);',

	                        'gl_FragColor = vColor;', '}'];

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

	        }, {
	                key: 'init',
	                value: function init(objList) {

	                        // DESTRUCTING DID NOT WORK!
	                        //[gl, canvas, mat4, vec3, pMatrix, mvMatrix, program ] = this.setup();

	                        var arr = this.setup();
	                        var gl = arr[0];
	                        var canvas = arr[1];
	                        var mat4 = arr[2];
	                        var mat3 = arr[3];
	                        var vec3 = arr[4];
	                        var pMatrix = arr[5];
	                        var mvMatrix = arr[6];
	                        var program = arr[7];
	                        var vsVars = arr[8];
	                        var fsVars = arr[9];

	                        // Attach objects.

	                        var shaderProgram = program.shaderProgram;

	                        window.vs2Vars = vsVars; /////////////////////////////////////////////////////////

	                        program.renderList = objList || [];

	                        // TODO: SET UP VERTEX ARRAYS, http://blog.tojicode.com/2012/10/oesvertexarrayobject-extension.html

	                        // Update object position, motion.

	                        program.update = function (obj) {

	                                // Standard mvMatrix updates.

	                                obj.setMV(mvMatrix);

	                                // Custom updates go here.
	                        };

	                        // Rendering.

	                        program.render = function () {

	                                //console.log( 'gl:' + gl + ' canvas:' + canvas + ' mat4:' + mat4 + ' vec3:' + vec3 + ' pMatrix:' + pMatrix + ' mvMatrix:' + mvMatrix + ' program:' + program );

	                                gl.useProgram(shaderProgram);

	                                // Reset perspective matrix.

	                                mat4.perspective(pMatrix, Math.PI * 0.4, canvas.width / canvas.height, 0.1, 100.0); // right

	                                // Loop through assigned objects.

	                                for (var i = 0, len = program.renderList.length; i < len; i++) {

	                                        var obj = program.renderList[i];

	                                        // Update Model-View matrix with standard Prim values.

	                                        program.update(obj, mvMatrix);

	                                        // Bind vertex buffer.

	                                        gl.bindBuffer(gl.ARRAY_BUFFER, obj.geometry.vertices.buffer);
	                                        gl.enableVertexAttribArray(vsVars.attribute.vec3.aVertexPosition);
	                                        gl.vertexAttribPointer(vsVars.attribute.vec3.aVertexPosition, obj.geometry.vertices.itemSize, gl.FLOAT, false, 0, 0);

	                                        // Bind color buffer.

	                                        gl.bindBuffer(gl.ARRAY_BUFFER, obj.geometry.colors.buffer);
	                                        gl.enableVertexAttribArray(vsVars.attribute.vec4.aVertexColor);
	                                        gl.vertexAttribPointer(vsVars.attribute.vec4.aVertexColor, obj.geometry.colors.itemSize, gl.FLOAT, false, 0, 0);
	                                        //gl.disableVertexAttribArray( vsVars.attribute.vec4.aVertexColor );

	                                        // Bind indices buffer.

	                                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.geometry.indices.buffer);

	                                        // Set perspective and model-view matrix uniforms.

	                                        gl.uniformMatrix4fv(vsVars.uniform.mat4.uPMatrix, false, pMatrix);
	                                        gl.uniformMatrix4fv(vsVars.uniform.mat4.uMVMatrix, false, mvMatrix);

	                                        // Draw elements.

	                                        gl.drawElements(gl.TRIANGLES, obj.geometry.indices.numItems, gl.UNSIGNED_SHORT, 0);
	                                }
	                        };

	                        return program;
	                }
	        }]);

	        return ShaderColor;
	}(_shader2.default);

	exports.default = ShaderColor;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	            value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shader = __webpack_require__(14);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ShaderDirlightTexture = function (_Shader) {
	            _inherits(ShaderDirlightTexture, _Shader);

	            function ShaderDirlightTexture(init, util, glMatrix, webgl, prim) {
	                        _classCallCheck(this, ShaderDirlightTexture);

	                        var _this = _possibleConstructorReturn(this, (ShaderDirlightTexture.__proto__ || Object.getPrototypeOf(ShaderDirlightTexture)).call(this, init, util, glMatrix, webgl, prim));

	                        console.log('In ShaderTexture class');

	                        return _this;
	            }

	            /** 
	             * --------------------------------------------------------------------
	             * VERTEX SHADER 3
	             * a directionally-lit textured object vertex shader.
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


	            _createClass(ShaderDirlightTexture, [{
	                        key: 'vsSrc',
	                        value: function vsSrc() {

	                                    var s = ['attribute vec3 aVertexPosition;', 'attribute vec3 aVertexNormal;', 'attribute vec2 aTextureCoord;', 'uniform mat4 uMVMatrix;', 'uniform mat4 uPMatrix;', 'uniform mat3 uNMatrix;', 'uniform vec3 uAmbientColor;', 'uniform vec3 uLightingDirection;', 'uniform vec3 uDirectionalColor;', 'uniform bool uUseLighting;', // TODO: remove?

	                                    'varying vec2 vTextureCoord;', 'varying vec3 vLightWeighting;', 'void main(void) {', '    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);', '    vTextureCoord = aTextureCoord;', '   if(!uUseLighting) {', '       vLightWeighting = vec3(1.0, 1.0, 1.0);', '   } else {', '       vec3 transformedNormal = uNMatrix * aVertexNormal;', '       float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);', '       vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;', '   }', '}'];

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

	                                    //'precision mediump float;',

	                                    this.floatp, 'varying vec2 vTextureCoord;', 'varying vec3 vLightWeighting;', 'uniform sampler2D uSampler;', 'void main(void) {', '    vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));', '    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);', '}'];

	                                    return {

	                                                code: s.join('\n'),

	                                                varList: this.webgl.createVarList(s)

	                                    };
	                        }

	                        /** 
	                         * --------------------------------------------------------------------
	                         * Vertex Shader 3, using texture buffer and lighting.
	                         * --------------------------------------------------------------------
	                         */

	            }, {
	                        key: 'init',
	                        value: function init(objList) {

	                                    // DESTRUCTING DID NOT WORK!
	                                    //[gl, canvas, mat4, vec3, pMatrix, mvMatrix, program ] = this.setup();

	                                    var arr = this.setup();
	                                    var gl = arr[0];
	                                    var canvas = arr[1];
	                                    var mat4 = arr[2];
	                                    var mat3 = arr[3];
	                                    var vec3 = arr[4];
	                                    var pMatrix = arr[5];
	                                    var mvMatrix = arr[6];
	                                    var program = arr[7];
	                                    var vsVars = arr[8];
	                                    var fsVars = arr[9];

	                                    // Shorter reference.

	                                    var shaderProgram = program.shaderProgram;

	                                    window.vs3Vars = vsVars; /////////////////////////////////////////////////////////


	                                    // TODO: TEMPORARY ADD LIGHTING CONTROL

	                                    var lighting = true;

	                                    var ambient = [0.1, 0.1, 0.1]; // ambient colors WORKING

	                                    var lightingDirection = [//TODO: REDO
	                                    -0.25, -0.5, -0.1];

	                                    var directionalColor = [0.7, 0.7, 0.7];

	                                    var nMatrix = mat3.create(); // TODO: ADD MAT3 TO PASSED VARIABLES

	                                    var adjustedLD = vec3.create(); // TODO: redo

	                                    // Attach objects.

	                                    program.renderList = objList || [];

	                                    // TODO: SET UP VERTEX ARRAYS, http://blog.tojicode.com/2012/10/oesvertexarrayobject-extension.html
	                                    // TODO: https://developer.apple.com/library/content/documentation/3DDrawing/Conceptual/OpenGLES_ProgrammingGuide/TechniquesforWorkingwithVertexData/TechniquesforWorkingwithVertexData.html
	                                    // TODO: http://max-limper.de/tech/batchedrendering.html

	                                    // Update object position, motion.

	                                    program.update = function (obj) {

	                                                // Standard mvMatrix updates.

	                                                obj.setMV(mvMatrix);

	                                                // Compute lighting normals.

	                                                vec3.normalize(adjustedLD, lightingDirection);

	                                                vec3.scale(adjustedLD, adjustedLD, -1);

	                                                // Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.

	                                                mat3.normalFromMat4(nMatrix, mvMatrix);

	                                                // glmat3 library
	                                                //mat4.normalFromMat4( nMatrix, mvMatrix );

	                                                // Custom updates go here, make local references to vsVars and fsVars.
	                                    };

	                                    // Rendering.

	                                    program.render = function () {

	                                                //console.log( 'gl:' + gl + ' canvas:' + canvas + ' mat4:' + mat4 + ' vec3:' + vec3 + ' pMatrix:' + pMatrix + ' mvMatrix:' + mvMatrix + ' program:' + program );

	                                                gl.useProgram(shaderProgram);

	                                                // Reset perspective matrix.

	                                                mat4.perspective(pMatrix, Math.PI * 0.4, canvas.width / canvas.height, 0.1, 100.0); // right

	                                                // Begin program loop

	                                                for (var i = 0, len = program.renderList.length; i < len; i++) {

	                                                            var obj = program.renderList[i];

	                                                            // Only render if we have at least one texture loaded.

	                                                            if (!obj.textures[0] || !obj.textures[0].texture) continue;

	                                                            // Update Model-View matrix with standard Prim values.

	                                                            program.update(obj, mvMatrix);

	                                                            // Bind vertex buffer.

	                                                            gl.bindBuffer(gl.ARRAY_BUFFER, obj.geometry.vertices.buffer);
	                                                            gl.enableVertexAttribArray(vsVars.attribute.vec3.aVertexPosition);
	                                                            gl.vertexAttribPointer(vsVars.attribute.vec3.aVertexPosition, obj.geometry.vertices.itemSize, gl.FLOAT, false, 0, 0);

	                                                            // Bind normals buffer.

	                                                            gl.bindBuffer(gl.ARRAY_BUFFER, obj.geometry.normals.buffer);
	                                                            gl.enableVertexAttribArray(vsVars.attribute.vec3.aVertexNormal);
	                                                            gl.vertexAttribPointer(vsVars.attribute.vec3.aVertexNormal, obj.geometry.normals.itemSize, gl.FLOAT, false, 0, 0);

	                                                            // Bind Textures buffer (could have multiple bindings here).

	                                                            gl.bindBuffer(gl.ARRAY_BUFFER, obj.geometry.texCoords.buffer);
	                                                            gl.enableVertexAttribArray(vsVars.attribute.vec2.aTextureCoord);
	                                                            gl.vertexAttribPointer(vsVars.attribute.vec2.aTextureCoord, obj.geometry.texCoords.itemSize, gl.FLOAT, false, 0, 0);

	                                                            gl.activeTexture(gl.TEXTURE0);
	                                                            gl.bindTexture(gl.TEXTURE_2D, null);
	                                                            gl.bindTexture(gl.TEXTURE_2D, obj.textures[0].texture);

	                                                            // Set fragment shader sampler uniform.

	                                                            gl.uniform1i(fsVars.uniform.sampler2D.uSampler, 0);

	                                                            // Lighting flag.

	                                                            gl.uniform1i(vsVars.uniform.bool.uUseLighting, lighting);

	                                                            if (lighting) {

	                                                                        gl.uniform3f(vsVars.uniform.vec3.uAmbientColor, ambient[0], ambient[1], ambient[2]);

	                                                                        gl.uniform3fv(vsVars.uniform.vec3.uLightingDirection, adjustedLD);

	                                                                        gl.uniform3f(vsVars.uniform.vec3.uDirectionalColor, directionalColor[0], directionalColor[1], directionalColor[2]);
	                                                            }

	                                                            // Normals matrix uniform

	                                                            gl.uniformMatrix3fv(vsVars.uniform.mat3.uNMatrix, false, nMatrix);

	                                                            // Set perspective and model-view matrix uniforms.

	                                                            gl.uniformMatrix4fv(vsVars.uniform.mat4.uPMatrix, false, pMatrix);
	                                                            gl.uniformMatrix4fv(vsVars.uniform.mat4.uMVMatrix, false, mvMatrix);

	                                                            // Bind index buffer.

	                                                            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.geometry.indices.buffer);

	                                                            // Draw elements.

	                                                            gl.drawElements(gl.TRIANGLES, obj.geometry.indices.numItems, gl.UNSIGNED_SHORT, 0);
	                                                }
	                                    };

	                                    return program;
	                        }
	            }]);

	            return ShaderDirlightTexture;
	}(_shader2.default);

	exports.default = ShaderDirlightTexture;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _shader = __webpack_require__(14);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ShaderWater = function (_Shader) {
	    _inherits(ShaderWater, _Shader);

	    function ShaderWater(init, util, glMatrix, webgl, prim) {
	        _classCallCheck(this, ShaderWater);

	        var _this = _possibleConstructorReturn(this, (ShaderWater.__proto__ || Object.getPrototypeOf(ShaderWater)).call(this, init, util, glMatrix, webgl, prim));

	        console.log('In ShaderWater class');

	        return _this;
	    }

	    /** 
	     * --------------------------------------------------------------------
	     * VERTEX SHADER 3
	     * a directionally-lit textured object vertex shader.
	     * @link http://learningwebgl.com/blog/?p=684
	     * - vertex position
	     * - texture coordinate
	     * - model-view matrix
	     * - projection matrix
	     * Water example
	     * @link http://madebyevan.com/webgl-water/
	     * --------------------------------------------------------------------
	     */

	    return ShaderWater;
	}(_shader2.default);

	exports.default = ShaderWater;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _shader = __webpack_require__(14);

	var _shader2 = _interopRequireDefault(_shader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ShaderMetal = function (_Shader) {
	    _inherits(ShaderMetal, _Shader);

	    function ShaderMetal(init, util, glMatrix, webgl, prim) {
	        _classCallCheck(this, ShaderMetal);

	        var _this = _possibleConstructorReturn(this, (ShaderMetal.__proto__ || Object.getPrototypeOf(ShaderMetal)).call(this, init, util, glMatrix, webgl, prim));

	        console.log('In ShaderMetal class');

	        return _this;
	    }

	    /** 
	     * --------------------------------------------------------------------
	     * VERTEX SHADER 3
	     * a directionally-lit textured object vertex shader.
	     * @link http://learningwebgl.com/blog/?p=684
	     * - vertex position
	     * - texture coordinate
	     * - model-view matrix
	     * - projection matrix
	     * --------------------------------------------------------------------
	     */

	    return ShaderMetal;
	}(_shader2.default);

	exports.default = ShaderMetal;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Renderer = function Renderer(init, util, glMatrix, webgl, shaderTexture, shaderColor, shaderDirlightTexture) {
	        _classCallCheck(this, Renderer);

	        console.log('In Renderer class');

	        this.webgl = webgl;

	        this.util = webgl.util;

	        this.glmatrix = glMatrix;

	        this.shaderTexture = shaderTexture;

	        this.shaderColor = shaderColor;

	        this.shaderDirlightTexture = shaderDirlightTexture;

	        if (this.init) {}
	}

	// Specialized render manipulations go below.


	;

	exports.default = Renderer;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _map2d=__webpack_require__(21);var _map2d2=_interopRequireDefault(_map2d);var _map3d=__webpack_require__(23);var _map3d2=_interopRequireDefault(_map3d);var _morph=__webpack_require__(24);var _morph2=_interopRequireDefault(_morph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Prim=function(){/** 
	     * @class
	     * Create object primitives, and return vertex and index data 
	     * suitable for creating a VBO and IBO.
	     * 
	     * TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	     * 1. regularize prim creation
	     * - local vertex, index, etc
	     * - vertices used in-place, instead of returned
	     * - arrays created first in prim creation, then routine, then WebGL buffers added
	     * 2. Texture indexing
	     * - create startpoints in indices for swapping textures for complex objects
	     * - create methods getting just the partial vertices, indices, etc. for manipulation.
	     * 3. Update routines
	     * - update when Prim modified (re-compute normals, tangents, smooth, optimize)
	     * 
	     * NOTE: if you need more complex shapes, use a mesh file, or 
	     * a library like http://evanw.github.io/csg.js/ to implement 
	     * mesh operations.
	     * 
	     * Implicit objects (values are units, with 1.0 being normalized size).
	     * 
	     * prim.position      = (vec5) [ x, y, z, rounding, | startSlice, endSlice,  ]
	     * prim.dimensions    = (vec4) [ x, y, z ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * prim.acceleration  = (vec3) [ x, y, z ]
	     * prim.rotation      = (vec3) [ x, y, z ]
	     * prim.angular       = (vec3) [ x, y, z ]
	     * prim.color         = [ red1, green1, blue1, alpha1, red2, blue2... ]
	     * prim.texure1Arr    = [ texture1, texture2, texture3 ]
	     * prim.audioArr      = [ AudioObj1, AudioObj2, AudioObj3...]
	     * 
	     * ---------------------------------------------------------------
	     * Code rules
	     * 1. vertices = final vertex data for computation or rendering
	     * 2. vtx = any initialization vertices (e.g. for complex polyhedra)
	     * 3. v, vv = local vertex or vertex array.
	     * 4. when using GlMatrix functions, do 'in place' conversion first. 
	     *    If not practical, return the result. If not practical, use an 
	     *    object literal:
	     *    a. vec3.sub( resultPt, a, b );
	     *    b. resultPt = vec3.sub( resultPt, a, b );
	     *    c. resultPt = vec3.sub( [ 0, 0, 0 ], a, b );
	     * ---------------------------------------------------------------
	     * Geometry - flattened arrays with the following datatypes
	     *
	     *  { 
	     *    vertices:  [],   // float32
	     *    indices:   [],   // unsigned int16
	     *    texCoords: [],   // float32
	     *    normals:   [],   // float32
	     *    tangents:  [],   // float32
	     *    colors:    []    // float32
	     *  }
	     *
	     * ---------------------------------------------------------------
	     * WebGL Buffer == duplicates Geometry, but with geometry data copied to sub-object
	     *  {
	     *    data:     [],   // the geometry data
	     *    buffer:   null, // the buffer created by WebGL
	     *    itemSize: 0,    // size of object, or stride through data array
	     *    numItems: 0     // number of objects
	     *  }
	     * ---------------------------------------------------------------
	     * Array optimization
	     * https://gamealchemist.wordpress.com/2013/05/01/lets-get-those-javascript-arrays-to-work-fast/
	     * 
	     * geo primitives
	     * USE THIS!!!! https://github.com/nickdesaulniers/prims
	     * https://github.com/mhintz/platonic/tree/master/src
	     * https://github.com/azmobi2/html5-webgl-geometry-shapes/blob/master/webgl_geometry_shapes.html
	     * 
	     * convert fonts to texture
	     * https://github.com/framelab/fontmatic
	     * 
	     * More prims
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
	     * Geometry prebuilt
	     * http://paulbourke.net/geometry/roundcube/
	     * Lots of Webgl tricks!
	     * https://acko.net
	     * http://acko.net/blog/on-webgl/
	     * 
	     * https://gamedevdaily.io/four-ways-to-create-a-mesh-for-a-sphere-d7956b825db4#.lkbq2omq5
	     *
	     * 
	     */function Prim(init,util,glMatrix,webgl,loadModel,loadTexture,loadAudio,loadVideo){_classCallCheck(this,Prim);console.log('in Prim class');this.util=util;this.webgl=webgl;this.glMatrix=glMatrix;this.loadModel=loadModel;this.loadTexture=loadTexture;this.loadAudio=loadAudio;this.loadVideo=loadVideo;// If we need distortion and smoothing for the Prims
	this.morph=new _morph2.default(true,util,glMatrix);this.objs=[];this.typeList={POINT:'geometryPointCloud',POINTCLOUD:'geometryPointCloud',LINE:'geometryLine',PLANE:'geometryOuterPlane',OUTERPLANE:'geometryOuterPlane',INNERPLANE:'geometryInnerPlane',CURVEDPLANE:'geometryCurvedOuterPlane',CURVEDOUTERPLANE:'geometryCurvedOuterPlane',CURVEDINNERPLANE:'geometryCurvedInnerPlane',TERRAIN:'geometryTerrain',CIRCLE:'geometryCircle',CUBE:'geometryCube',CUBESPHERE:'geometryCubeSphere',SPHERE:'geometrySphere',DISC:'geometryCap',CAP:'geometryCap',DOME:'geometryDome',TOPDOME:'geometryTopDome',SKYDOME:'geometrySkyDome',BOTTOMDOME:'geometryBottomDome',CONE:'geometryCone',TOPCONE:'geometryTopCone',BOTTOMCONE:'geometryBottomCone',SPINDLE:'geometrySpindle',TEARDROP:'geometryTeardrop',CYLINDER:'geometryCylinder',CAPSULE:'geometryCapsule',PRISM:'geometryPrism',ICOSOHEDRON:'geometryIcosohedron',PYRAMID:'geometryPyramid',ICOSPHERE:'geometryIcoSphere',TOPICODOME:'geometryTopIcoDome',SKYICODOME:'geometrySkyIcoDome',BOTTOMICODOME:'geometryBottomIcoDome',OCTAHEDRON:'geometryOctahedron',DODECAHEDRON:'geometryDodecahedron',TORUS:'geometryTorus',MESH:'geometryMesh'};// Sideness, direction. Mapped to equivalent unit vector names in this.getStdVecs()
	this.directions={DEFAULT:'up',FORWARD:'forward',FRONT:'forward',BACK:'back',LEFT:'left',RIGHT:'right',UP:'up',TOP:'up',DOWN:'down',BOTTOM:'down'};this.FLOAT32='float32',this.UINT32='uint32';// Visible from inside or outside.
	this.OUTSIDE=100,this.INSIDE=101;// Shorthand.
	this.TWO_PI=Math.PI*2;}/** 
	     * See if supplied Prim type is supported. Individual Prim factory 
	     * methods do more detailed checking.
	     * @param {String} type the prim type.
	     * @returns {Boolean} if supported, return true, else false.
	     */_createClass(Prim,[{key:'checkType',value:function checkType(type){// Confirm we have a factory function for this type.
	if(typeof type=='function'){return true;}return true;}/** 
	     * Unique object id
	     * @link https://jsfiddle.net/briguy37/2MVFd/
	     */},{key:'setId',value:function setId(){var d=new Date().getTime();var uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=(d+Math.random()*16)%16|0;d=Math.floor(d/16);return(c=='x'?r:r&0x3|0x8).toString(16);});return uuid;}/** 
	     * Get the big array with all vertex data. Every time a 
	     * Prim is made, we store a reference in the this.objs[] 
	     * array. So, to make one, we just concatenate the 
	     * vertices. Use to send multiple prims sharing the same shader to one 
	     * Renderer.
	     * @param {Array} vertices
	     * @returns {Array} vertices
	     */},{key:'setVertexData',value:function setVertexData(vertices){vertices=[];for(var _i in this.objs){vertices=vertices.concat(this.objs[_i].vertices);}return vertices;}/** 
	     * get the big array with all index data. Use to 
	     * send multiple prims sharing the same shader to one 
	     * Renderer.
	     */},{key:'setIndexData',value:function setIndexData(indices){indices=[];for(var _i2 in this.objs){indices=indices.concat(this.objs[_i2].indices);}return indices;}/** 
	     * Return an empty buffer object.
	     */},{key:'createGeoObj',value:function createGeoObj(){return{makeBuffers:true,vertices:{data:[],buffer:null,itemSize:3,numItems:0},indices:{// where to start drawing GL_TRIANGLES.
	data:[],buffer:null,itemSize:1,numItems:0},sides:{// a collection of triangles creating a side on the shape.
	data:[],buffer:null,itemSize:3,numItems:0},normals:{data:[],buffer:null,itemSize:3,numItems:0},tangents:{data:[],buffer:null,itemSize:4,numItems:0},texCoords:{data:[],buffer:null,itemSize:2,numItems:0},colors:{data:[],buffer:null,itemSize:4,numItems:0}};}/** 
	     * Add data to create buffers, works if existing data is present. However, 
	     * indices must be consistent!
	     */},{key:'addBufferData',value:function addBufferData(bufferObj,vertices,indices,normals,texCoords){var tangents=arguments.length>5&&arguments[5]!==undefined?arguments[5]:[];var colors=arguments.length>6&&arguments[6]!==undefined?arguments[6]:[];var concat=this.util.concatArr;bufferObj.vertices.data=concat(bufferObj.vertices.data,vertices),bufferObj.indices.data=concat(bufferObj.indices.data,indices),bufferObj.normals.data=concat(bufferObj.normals.data,normals),bufferObj.texCoords.data=concat(bufferObj.texCoords.data,texCoords),bufferObj.tangents.data=concat(bufferObj.tangents.data,tangents),bufferObj.colors.data=concat(bufferObj.colors.data,colors);return bufferObj;}/** 
	     * Bind a WebGL buffer
	     * @param {Object} o the bufferObj for for particular array (e.g. vertex, tangent).
	     * @param {String} type the typed-array type.
	     */},{key:'bindGLBuffer',value:function bindGLBuffer(o,type){var gl=this.webgl.getContext();o.buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,o.buffer);switch(type){case this.FLOAT32:if(o.data instanceof Float32Array){gl.bufferData(gl.ARRAY_BUFFER,o.data,gl.STATIC_DRAW);}else{gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(o.data),gl.STATIC_DRAW);}break;case this.UINT16:o.buffer=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,o.buffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(o.data),gl.STATIC_DRAW);o.numItems=o.data.length/o.itemSize;break;default:console.error('GL buffer type '+type);break;}}/** 
	     * Create WebGL buffers using geometry data. Note that the 
	     * size is for flattened arrays.
	     * @param {Object} bufferObj custom object holding the following:
	     * an array of vertices, in glMatrix.vec3 objects.
	     * an array of indices for the vertices.
	     * an array of texture coordinates, in glMatrix.vec2 format.
	     * an array of normals, in glMatrix.vec3 format.
	     * an array of tangents, in glMatrix.vec3 format.
	     * an array of colors, in glMatrix.vec4 format.
	     */},{key:'createGLBuffers',value:function createGLBuffers(bufferObj){var gl=this.webgl.getContext();// Vertex Buffer Object.
	var o=bufferObj.vertices;if(!o.data.length){console.log('no vertices present, creating default');o.data=new Float32Array([0,0,0]);}this.bindGLBuffer(o,this.FLOAT32);// Create the Index buffer.
	o=bufferObj.indices;if(!o.data.length){console.log('no indices present, creating default');o.data=new Uint16Array([1]);}this.bindGLBuffer(o,this.UINT16);// Create the Sides buffer, a kind of indices buffer.
	o=bufferObj.sides;if(!o.data.length){console.warn('no sides present, creating default');o.data=new Uint16Array([1]);}this.bindGLBuffer(o,this.UINT16);// create the Normals buffer.
	o=bufferObj.normals;if(!o.data.length){console.log('no normals, present, creating default');o.data=new Float32Array([0,1,0]);}this.bindGLBuffer(o,this.FLOAT32);// Create the primary Texture buffer.
	o=bufferObj.texCoords;if(!o.data.length){console.warn('no texture present, creating default');o.data=new Float32Array([0,0]);}this.bindGLBuffer(o,this.FLOAT32);// create the Tangents Buffer.
	o=bufferObj.tangents;if(!o.data.length){console.warn('no tangents present, creating default');o.data=new Float32Array([0,0,0,0]);}this.bindGLBuffer(o,this.FLOAT32);// Create the Colors buffer.
	o=bufferObj.colors;if(!o.data.length){console.warn('no colors present, creating default color');o.data=new Float32Array(this.computeColors(bufferObj.normals.data,o.data));}this.bindGLBuffer(o,this.FLOAT32);// Set the flag.
	bufferObj.makeBuffers=false;return bufferObj;}/** 
	     * Check the values of a Prim.
	     * TODO: why is itemsize of indices = 1
	     */},{key:'primReadout',value:function primReadout(prim){console.log('prim:'+prim.name+' type:'+prim.type+' vertex:('+prim.geometry.vertices.itemSize+'), '+prim.geometry.vertices.numItems+', texture:('+prim.geometry.texCoords.itemSize+'), '+prim.geometry.texCoords.numItems+', index:('+prim.geometry.indices.itemSize,'), '+prim.geometry.indices.numItems+', normals:('+prim.geometry.normals.itemSize+'), '+prim.geometry.normals.numItems);}/* 
	     * ---------------------------------------
	     * DEFAULT VECTORS AND OBJECTS
	     * ---------------------------------------
	     *//** 
	     * Standard vectors (similar to Unity) when needed. Call only 
	     * if using the array literal (e.g. [ 0, 0, 0,]) doesn't make sense. 
	     * Note you may need to go "let getStdVecs = this.getStdVecs.bind( this)" 
	     * in your calling function.
	     * @link https://docs.unity3d.com/ScriptReference/Vector3.html
	    */},{key:'getStdVecs',value:function getStdVecs(type){var dir=this.directions;switch(type){case dir.BACK:return[0,0,-1];case dir.DOWN:return[0,-1,0];case dir.FORWARD:return[0,0,1];case dir.LEFT:return[-1,0,0];case dir.RIGHT:return[1,0,0];case dir.UP:return[0,1,0];case dir.ONE:return[1,1,1];case dir.ZERO:return[0,0,0];}}/** 
	     * Larger configuration vectors for Prims. additional values control slicing 
	     * or flattening of part of a prim.
	     * For CONE, the fourth value is truncation of the cone point.
	     * For other Prims, the fourth and fifth values control the start and 
	     * end of a cap on open prims (CYLINDER, CONE) and flattening of the 
	     * top and bottom of SPHERE prims. This stretches the texture across the 
	     * ends of the Prim. 
	     */},{key:'vec5',value:function vec5(a,b,c){var d=arguments.length>3&&arguments[3]!==undefined?arguments[3]:0;var e=arguments.length>4&&arguments[4]!==undefined?arguments[4]:0;return[a,b,c,d,e];// dimensions, start slice (cone)
	}},{key:'vec6',value:function vec6(a,b,c){var d=arguments.length>3&&arguments[3]!==undefined?arguments[3]:0;var e=arguments.length>4&&arguments[4]!==undefined?arguments[4]:0;var f=arguments.length>5&&arguments[5]!==undefined?arguments[5]:0;return[a,b,c,d,e,f];}/* 
	     * ---------------------------------------
	     * NORMAL, INDEX, VERTEX, TRIANGLE, QUAD CALCULATIONS
	     * ---------------------------------------
	     *//** 
	     * Create default colors for Prim color array.
	     */},{key:'computeColors',value:function computeColors(normals,colors){for(var _i3=0;_i3<normals.length;_i3+=3){colors.push(normals[_i3],normals[_i3+1],normals[_i3+2],1.0);}return colors;}/** 
	     * Bounding box for a set of 3d points. This object is NO the same 
	     * as a standard Cube, since each side is a quad without 
	     * further divisions.
	     * @param {[...vec3]} vertices a list of points to be enclosed in the bounding box.
	     * @returns{Box} a BoundingBox object.
	     */},{key:'computeBoundingBox',value:function computeBoundingBox(vertices){var vec3=this.glMatrix.vec3;var box={vertices:[],indices:[],normals:[],texCoords:[]};var tx=0,ty=0,tz=0,bx=0,by=0,bz=0;for(var _i4=0;_i4<vertices.length;_i4++){var _v=vertices[_i4];tx=Math.min(tx,_v[0]),ty=Math.min(ty,_v[1]),tz=Math.min(tz,_v[2]),bx=Math.max(bx,_v[0]),by=Math.max(by,_v[1]),bz=Math.max(bz,_v[2]);}// Two quads, vary by z values only, clockwise.
	box.vertices.push([tx,ty,tz],// topLeft
	[bx,ty,tz],// r
	[bx,by,tz],// b
	[tx,by,tz],// l
	[tx,ty,bz],// t
	[bx,ty,bz],// r
	[bx,by,bz],// bottomRight
	[tx,by,bz]// l
	);box.topLeft=box.vertices[0];box.bottomRight=box.vertices[6];box.dimensions=vec3.subtract([0,0,0],box.bottomRight,box.topLeft);// if we draw it, add more here.
	return box;}/** 
	     * Get spherical coordinates (u, v) for normalized unit vector.
	     */},{key:'computeSphereCoords',value:function computeSphereCoords(vtx){var u=Math.atan2(vtx[0],vtx[2])/this.TWO_PI;// x, z
	var v=Math.asin(vtx[1])/Math.PI+0.5;// y
	if(u<0){u+=1;}return[u,v];}/** 
	     * Computed the angle between three 3d points defining a Plane.
	     * @param {GlMatrix.vec3} a first Point in angle.
	     * @param {GlMatrix.vec3} b second axis point in angle.
	     * @param {GlMatrix.vec3} c third point defining angle.
	     * @returns {Number} the angle between the points.
	     */},{key:'computeAngle3d',value:function computeAngle3d(a,b,c){var ab=[b[0]-a[0],b[1]-a[1],b[2]-a[2]];var bc=[c[0]-b[0],c[1]-b[1],c[2]-b[2]];var abDist=Math.sqrt(ab[0]*ab[0]+ab[1]*ab[1]+ab[2]*ab[2]);var bcDist=Math.sqrt(bc[0]*bc[0]+bc[1]*bc[1]+bc[2]*bc[2]);var abNorm=[ab[0]/abDist,ab[1]/abDist,ab[2]/abDist];var bcNorm=[bc[0]/bcDist,bc[1]/bcDist,bc[2]/bcDist];return Math.acos(abNorm[0]*bcNorm[0]+abNorm[1]*bcNorm[1]+abNorm[2]*bcNorm[2]);}/**
	     * Find the center between any set of 3d points
	     * @param {[...vec3]} vertices an array of xyz points.
	     * @returns {vec3} the center point.
	     */},{key:'computeCentroid',value:function computeCentroid(vertices){var c=[0,0,0];var len=vertices.length;for(var _i5=0;_i5<len;_i5++){var vertex=vertices[_i5];c[0]+=vertex[0],c[1]+=vertex[1],c[2]+=vertex[2];}c[0]/=len,c[1]/=len,c[2]/=len;return c;}/** 
	     * Compute an area-weighted centroid point for a Prim.
	     * Use this when we want the center of the whole object the polygon is part of.
	     * @param {Array[...GlMatrix.vec3]} vertices a list of 3d vertices.
	     * @param {GlMatrix.vec3} the centroid Point.
	     */},{key:'computeMassCentroid',value:function computeMassCentroid(vertices){var vec3=this.glMatrix.vec3;var c=[0,0,0];var areaTotal=0.0;var p1=vertices[0];var p2=vertices[1];for(var _i6=2;_i6<vertices.length;_i6++){var p3=vertices[_i6];var edge1=vec3.subtract([0,0,0],p3,p1);var edge2=vec3.subtract([0,0,0],p3,p2);var crossProduct=vec3.cross([0,0,0],edge1,edge2);var area=vec3.length(crossProduct)/2;c[0]+=area*(p1[0]+p2[0]+p3[0])/3,c[1]+=area*(p1[1]+p2[1]+p3[1])/3,c[2]+=area*(p1[2]+p2[2]+p3[2])/3;areaTotal+=area;p2=vec3.copy([0,0,0],p3);}return[c[0]/areaTotal,c[1]/areaTotal,c[2]/areaTotal];}/** 
	     * Compute barycentric coordinates of a Point relative 
	     * to a triangle defined by three Points.
	     * @param {vec3} p the point to test.
	     * @param {vec3} p0 first clockwise vertex of triangle.
	     * @param {vec3} p1 second clockwise vertex of triangle.
	     * @param {vec3} p2 third clockwise vertex of triangle.
	     * @returns {GlMatrix.vec2} uv coordinates of Point relative to triangle.
	     */},{key:'computeBarycentric',value:function computeBarycentric(p,p0,p1,p2){var vec3=this.glMatrix.vec3;var v0=void 0,v1=void 0,v2=void 0,d00=void 0,d01=void 0,d02=void 0,d11=void 0,d12=void 0;// Compute vectors.
	v0=vec3.sub(v0,p2,p0);v1=vec3.sub(v1,p1,p0);v2=vec3.sub(v2,p,p0);// Compute dot products.
	d00=vec3.dot(v0,v0);d01=vec3.dot(v0,v1);d02=vec3.dot(v0,v2);d11=vec3.dot(v1,v1);d12=vec3.dot(v1,v2);// Compute barycentric coordinates.
	var invDenom=1/(d00*d11-d01*d01);var u=(d11*d02-d01*d12)*invDenom;var v=(d00*d12-d01*d02)*invDenom;return[u,v];}/**
	     * Compute whether point is in a triangle, wrapped 
	     * clockwise (begin with a, end with c)
	     * @link http://blackpawn.com/texts/pointinpoly/
	     * @param {vec3} p the point to test.
	     * @param {vec3} p0 first clockwise vertex of triangle.
	     * @param {vec3} p1 second clockwise vertex of triangle.
	     * @param {vec3} p2 third clockwise vertex of triangle.
	     * @returns {Boolean} if point in triangle, return true, else false.
	     */},{key:'computePointInTriangle',value:function computePointInTriangle(p,p0,p1,p2){var uv=this.computeBaryCentric(p,p0,p1,p2);// Check if Point is in triangle.
	return u>=0&&v>=0&&u+v<1;}/** 
	     * Given a set of Points, compute a triangle fan around the Centroid for those points.
	     * @param {[...vec3]} vertices an array of UN-FLATTENED xyz points.
	     * @param {[uint16]} indices the sequence to read triangles.
	     * @returns {Object} UN-FLATTENED vertices, indices, texCoords nomals, tangents.
	     */},{key:'computeFan',value:function computeFan(vertices,indices){var vec3=this.glMatrix.vec3;var vv=[];// Get the subset of vertices we should take by following indices.
	for(var _i7=0;_i7<indices.length;_i7++){vv.push(vertices[indices[_i7]]);}// Get the topLeft and bottomRight points (bounding rectangle).
	var center=this.computeCentroid(vv);// Add a central point so we can create a triangle fan.
	vv.push(center);var centerPos=vv.length-1;var vtx=[],tex=[],norms=[],idx=[];// We re-do the indices calculations, since we insert a central point.
	var lenv=vv.length;var env=lenv-1;for(var _i8=1;_i8<lenv;_i8++){var p1=_i8-1;var p2=_i8;if(_i8===lenv-1){p2=0;}var v1=vv[p1];var v2=vv[p2];idx.push(p1,p2,centerPos);norms.push(v1,v2,center);// Assumes a regular polygon.
	tex.push(Math.cos(this.TWO_PI*p2/(lenv-1))/2+.5,Math.sin(this.TWO_PI*p2/(lenv-1))/2+.5);}// end of for loop
	// Push the center point texture coordinate.
	tex.push(0.5,0.5);return{vertices:vv,indices:idx,texCoords:tex,normals:norms,tangents:[],colors:[]};}/** 
	     * Compute normals for a 3d object. 
	     * NOTE: some routines compute their own normals.
	     * Adapted from BabylonJS version:
	     * @link https://github.com/BabylonJS/Babylon.js/blob/3fe3372053ac58505dbf7a2a6f3f52e3b92670c8/src/Mesh/babylon.mesh.vertexData.js
	     * @link http://gamedev.stackexchange.com/questions/8191/any-reliable-polygon-normal-calculation-code
	     * @link https://www.opengl.org/wiki/Calculating_a_Surface_Normal
	     * @param {[...GLMatrix.vec3]} vertices the current 3d position coordinates.
	     * @param {Array} current indices into the vertices.
	     * @param {[...GLMatrix.vec3]} normals the normals array to recalculate.
	     * @param {Boolean} justFace if true, return the face normal for all three vertices in a triangle, 
	     *        otherwise, compute each vertex normal separately.
	     */},{key:'computeNormals',value:function computeNormals(vertices,indices,normals,justFace){var idx=0;var p1p2x=0.0,p1p2y=0.0,p1p2z=0.0;var p3p2x=0.0,p3p2y=0.0,p3p2z=0.0;var faceNormalx=0.0,faceNormaly=0.0,faceNormalz=0.0;var length=0.0;var i1=0,i2=0,i3=0;normals=new Float32Array(vertices.length);// Index triangle = 1 face.
	var nbFaces=indices.length/3;// INEFFICIENT, REFACTOR!!!!!!, DIVIDE, THEN MULTPLY
	for(idx=0;idx<nbFaces;idx++){i1=indices[idx*3];// get the idxes of each vertex of the face
	i2=indices[idx*3+1];i3=indices[idx*3+2];// Get face vertex values.
	p1p2x=vertices[i1*3]-vertices[i2*3];// compute two vectors per face
	p1p2y=vertices[i1*3+1]-vertices[i2*3+1];p1p2z=vertices[i1*3+2]-vertices[i2*3+2];p3p2x=vertices[i3*3]-vertices[i2*3];p3p2y=vertices[i3*3+1]-vertices[i2*3+1];p3p2z=vertices[i3*3+2]-vertices[i2*3+2];// Compute the face normal with cross product.
	faceNormalx=p1p2y*p3p2z-p1p2z*p3p2y;faceNormaly=p1p2z*p3p2x-p1p2x*p3p2z;faceNormalz=p1p2x*p3p2y-p1p2y*p3p2x;// Get normalized length of face normal.
	length=Math.sqrt(faceNormalx*faceNormalx+faceNormaly*faceNormaly+faceNormalz*faceNormalz);length=length===0?1.0:length;faceNormalx/=length;// normalize this normal
	faceNormaly/=length;faceNormalz/=length;// Accumulate all the normals defined for the face.
	normals[i1*3]+=faceNormalx;normals[i1*3+1]+=faceNormaly;normals[i1*3+2]+=faceNormalz;normals[i2*3]+=faceNormalx;normals[i2*3+1]+=faceNormaly;normals[i2*3+2]+=faceNormalz;normals[i3*3]+=faceNormalx;normals[i3*3+1]+=faceNormaly;normals[i3*3+2]+=faceNormalz;}// Last normalization of each normal
	for(idx=0;idx<normals.length/3;idx++){faceNormalx=normals[idx*3];faceNormaly=-normals[idx*3+1];faceNormalz=normals[idx*3+2];length=Math.sqrt(faceNormalx*faceNormalx+faceNormaly*faceNormaly+faceNormalz*faceNormalz);length=length===0?1.0:length;faceNormalx/=length;faceNormaly/=length;faceNormalz/=length;// NOTE: added negative (-) to x, z to match our lighting model.
	normals[idx*3]=-faceNormalx;normals[idx*3+1]=faceNormaly;normals[idx*3+2]=-faceNormalz;}return normals;}/** 
	     * Compute tangents. NOTE: some routines compute their own tangents.
	     * CodePen - http://codepen.io/ktmpower/pen/ZbGRpW
	     * adapted from the C++ code from this link: http://www.terathon.com/code/tangent.html
	     * TODO: CONVERT TO GLMATRIX
	     * "The code below generates a four-component tangent T in which the handedness of the local coordinate system
	     * is stored as ±1 in the w-coordinate. The bitangent vector B is then given by B = (N × T) · Tw."
	     */},{key:'computeTangents',value:function computeTangents(vertices,indices,normals,texCoords,tangents){var vec3=this.glMatrix.vec3;var tan1=new Float32Array(normals.length);var tan2=new Float32Array(normals.length);// the indices array specifies the triangles forming the object mesh (3 indices per triangle)
	var numIndices=indices.length;var numVertices=vertices.length;//const numNormals = normals.length;
	tangents=new Float32Array(numVertices*4/3);// TODO: ADDED 4 to this!!
	// for each triangle (step through indices 3 by 3)
	for(var _i9=0;_i9<numIndices;_i9+=3){var i1=indices[_i9],i2=indices[_i9+1],i3=indices[_i9+2];var _j=i1*3;var v1x=vertices[_j],v1y=vertices[_j+1],v1z=vertices[_j+2];_j=i2*3;var v2x=vertices[_j],v2y=vertices[_j+1],v2z=vertices[_j+2];_j=i3*3;var v3x=vertices[_j],v3y=vertices[_j+1],v3z=vertices[_j+2];var x1=v2x-v1x,x2=v3x-v1x;var y1=v2y-v1y,y2=v3y-v1y;var z1=v2z-v1z,z2=v3z-v1z;_j=i1*2;var w1x=texCoords[_j],w1y=texCoords[_j+1];_j=i2*2;var w2x=texCoords[_j],w2y=texCoords[_j+1];_j=i3*2;var w3x=texCoords[_j],w3y=texCoords[_j+1];var s1=w2x-w1x,s2=w3x-w1x;var t1=w2y-w1y,t2=w3y-w1y;var r=1.0/(s1*t2-s2*t1);var sx=(t2*x1-t1*x2)*r,sy=(t2*y1-t1*y2)*r,sz=(t2*z1-t1*z2)*r;var tx=(s1*x2-s2*x1)*r,ty=(s1*y2-s2*y1)*r,tz=(s1*z2-s2*z1)*r;_j=i1*3;tan1[_j]+=sx;tan1[_j+1]+=sy;tan1[_j+2]+=sz;tan2[_j]+=tx;tan2[_j+1]+=ty;tan2[_j+2]+=tz;_j=i2*3;tan1[_j]+=sx;tan1[_j+1]+=sy;tan1[_j+2]+=sz;tan2[_j]+=tx;tan2[_j+1]+=ty;tan2[_j+2]+=tz;_j=i3*3;tan1[_j]+=sx;tan1[_j+1]+=sy;tan1[_j+2]+=sz;tan2[_j]+=tx;tan2[_j+1]+=ty;tan2[_j+2]+=tz;}// Loop through vertices.
	for(var _i10=0,i4=0;i4<numVertices;_i10+=3,i4+=4){// not very efficient here (used the vec3 type and dot/cross operations from MV.js)
	var n=[normals[_i10],normals[_i10+1],normals[_i10+2]];var _t=[tan1[_i10],tan1[_i10+1],tan1[_i10+2]];var _t2=[tan2[_i10],tan2[_i10+1],tan2[_i10+2]];//console.log('n:' + n + ' t1:' + t1 + ' t2:' + t2)
	// Gram-Schmidt orthogonalize
	////////////////const tmp  = subtract(t1, scale(dot(n, t1), n));
	var tmp=vec3.sub([0,0,0],_t,vec3.scale([0,0,0],_t,vec3.dot(n,_t)));//console.log("TMP:" + tmp) //NOT COMPUTING THIS RIGHT, all NAN
	var len2=tmp[0]*tmp[0]+tmp[1]*tmp[1]+tmp[2]*tmp[2];// normalize the vector only if non-zero length
	var txyz=len2>0?vec3.scale([0,0,0],tmp,1.0/Math.sqrt(len2)):tmp;////console.log("TXYZ:" + txyz );
	// Calculate handedness
	//////////////const tw = (dot(cross(n, t1), t2) < 0.0) ? -1.0 : 1.0;
	var tw=vec3.dot(vec3.cross([0,0,0],n,_t),_t2)<0.0?-1.0:1.0;tangents[i4]=txyz[0];tangents[i4+1]=txyz[1];tangents[i4+2]=txyz[2];tangents[i4+3]=tw;}return tangents;}/** 
	     * Scale vertices directly, without changing position.
	     */},{key:'computeScale',value:function computeScale(vertices,scale){var oldPos=this.getCenter(vertices);for(var _i11=0;_i11<vertices.length;_i11++){vertices[_i11]*=scale;}this.moveTo(oldPos);}/** 
	     * Move vertices directly in geometry, i.e. for something 
	     * that always orbits a central point.
	     * NOTE: normally, you will want to use a matrix transform to position objects.
	     * @param {GLMatrix.vec3} pos - the new position.
	     */},{key:'computeMove',value:function computeMove(vertices,pos){var center=this.computeCentroid(vertices);var delta=[center[0]-pos[0],center[1]-pos[1],center[2]-pos[2]];for(var _i12=0;_i12<vertices.length;_i12+=3){vertices[_i12]=delta[0];vertices[_i12+1]=delta[1];vertices[_i12+2]=delta[2];}}/* 
	     * ---------------------------------------
	     * GEOMETRY CREATORS
	     * ---------------------------------------
	     *//** 
	     * WebGL point cloud (particle system).
	     * Rendered as GL_POINT.
	     * @link https://github.com/potree/potree/releases
	     * @link https://www.khronos.org/registry/webgl/sdk/demos/google/particles/index.html
	     * @link https://github.com/gouzhen1/WebGL-Particle-System/
	     * @link https://github.com/gouzhen1/WebGL-Particle-System/blob/master/index.html#L3
	     * @link http://nullprogram.com/blog/2014/06/29/
	     * https://codepen.io/kenjiSpecial/pen/yyeaKm
	     * rendered as an array of GL_POINT.
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * prim.dimensions    = (vec4) [ x, y, z, radius || 0, pointSize (pixels) | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryPointCloud',value:function geometryPointCloud(prim){var geo=prim.geometry;// Shortcuts to Prim data arrays
	var vertices=[],indices=[],texCoords=[],normals=[],tangents=[];// Expect points in Map3d object, or generate random.
	var w=prim.dimensions[0],h=prim.dimensions[1],d=prim.dimensions[2],radius=prim.dimensions[3],pointSize=prim.dimensions[4]||1,numPoints=prim.divisions[0]||1;if(!prim.spaceMap){console.log('adding spaceMap for:'+prim.name);prim.sphereMap=new _map3d2.default(this.util);prim.sphereMap.initRandom(w,h,d,numPoints);// roughness 0.2 of 0-1, flatten = 1 of 0-1;
	//prim.spaceMap[ prim.spaceMap.type.CLOUD ]( prim.divisions[ 0 ], prim.divisions[ 1 ], prim.divisions[ 2 ], 0.6, 1 );
	}// Vertices.
	// Indices.
	// Normals.
	this.computeNormals(vertices,indices,normals);// Texture coordinates.
	// Tangents (not used).
	this.computeTangents(vertices,indices,normals,texCoords,tangents);// Colors already present, or computed in this.createGLBuffers.
	return this.addBufferData(bufferObj,vertices,indices,texCoords,normals,tangents,colors);}/** 
	     * type LINE
	     * rendered as GL_LINE.
	     * prim.dimensions    = (vec4) [ x, y, z, thickness | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryLine',value:function geometryLine(prim){var geo=prim.geometry;// Shortcuts to Prim data arrays
	var vertices=[],indices=[],texCoords=[],normals=[],tangents=[];// Expect points in Map3d object, or generate random.
	var w=prim.dimensions[0],h=prim.dimensions[1],d=prim.dimensions[2],radius=prim.dimensions[3],pointSize=prim.dimensions[4]||1,numPoints=prim.divisions[0]||1;// Vertices.
	// Indices.
	// Normals.
	// Tangents.
	// Colors.
	// Return the buffer, or add array data to the existing Prim data.
	// Return data to build WebGL buffers.
	return this.addBufferData(prim.geometry,vertices,indices,normals,texCoords,tangents);}/** 
	     * Objects created with uv methods (i.e. they have polar points).
	     * rendered as GL_TRIANGLES.
	     * startSlice cuts off the cylinder, and wraps the texture across the top. 
	     * endSlize truncates the bottom of the cylinder, and wraps the texture across the bottom.
	     * for an open cylinder with no caps, set startSlice and endSlize to zero.
	     * prim.dimensions    = (vec4) [ x, y, z, startSlice | 0, endSlice | 0 ]
	     *
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometrySphere',value:function geometrySphere(prim){var list=this.typeList;var vec3=this.glMatrix.vec3;var geo=prim.geometry;// Shortcuts to Prim data arrays.
	var vertices=[],indices=[],normals=[],texCoords=[],tangents=[];var longitudeBands=prim.divisions[0];// x axis (really xz)
	var latitudeBands=prim.divisions[1];// y axis
	// Radius is measured along the x axis.
	var l=prim.dimensions[0],w=prim.dimensions[1],h=prim.dimensions[2],startSlice=prim.dimensions[3]||0,endSlice=prim.dimensions[4]||1.0;// Everything except SPHERE, CYLINDER, SPINDLE, and CONE is a half-object.
	var latStart=0,longStart=0,latDist=void 0;if(prim.type===list.SPHERE||prim.type===list.CYLINDER||prim.type===list.SPINDLE||prim.type===list.CONE||prim.type===list.TEARDROP){latDist=latitudeBands;}else if(prim.type===list.CAP){latDist=1;// one flat object, central points + one ring.
	}else{latDist=latitudeBands/2;// half-domes and half-cones
	}var latNum=void 0,longNum=void 0;// Start our uv build loop.
	for(latNum=latStart;latNum<=latDist;latNum++){var theta=latNum*Math.PI/latitudeBands;var sinTheta=Math.sin(theta);var cosTheta=Math.cos(theta);for(longNum=longStart;longNum<=longitudeBands;longNum++){var phi=longNum*this.TWO_PI/longitudeBands;var sinPhi=Math.sin(phi);var cosPhi=Math.cos(phi);var x=void 0,y=void 0,z=void 0,_u=void 0,_v2=void 0,r=void 0;// Compute vertices.
	var lat=latNum/latDist;r=lat/2;// use for no-spherical shapes.
	var long=longNum/longitudeBands;_u=1-long;_v2=1-lat;x=cosPhi*sinTheta/2;z=sinPhi*sinTheta/2;switch(prim.type){case list.CAP:x=cosPhi/4;z=sinPhi/4;y=0;break;case list.CYLINDER:if(startSlice>0&&lat<=startSlice){y=1-startSlice;}else if(endSlice!==1.0&&lat>=endSlice){y=1-endSlice;}else{y=1-lat;x=cosPhi/2;z=sinPhi/2;}y-=0.5;break;case list.SPHERE:y=cosTheta/2;break;case list.TOPDOME:case list.DOME:y=cosTheta/2;break;case list.SKYDOME:y=cosTheta/2;_u=long;//v = 1 - lat;
	break;case list.BOTTOMDOME:y=(1-cosTheta)/2-0.5;_u=long;_v2=lat;break;case list.SPINDLE:if(lat<=0.4){x=cosPhi*lat;z=sinPhi*lat;}else{x=cosPhi*(1-lat+1/latDist);z=sinPhi*(1-lat+1/latDist);}y=1-lat-0.5;break;case list.TEARDROP:if(lat<0.5){y=cosTheta/4;}else{x=2*cosPhi*(0.5-r);z=2*sinPhi*(0.5-r);y=cosTheta/2;}break;case list.CONE:if(lat<=startSlice){y=1-startSlice;x=cosPhi*r;z=sinPhi*r;}else if(lat>endSlice){// NOTE: not >= endSlice
	y=1-endSlice;x=cosPhi*sinTheta/2;z=sinPhi*sinTheta/2;}else{y=1-lat;x=cosPhi*r;z=sinPhi*r;}y-=0.5;break;case list.TOPCONE:x=cosPhi*r;z=sinPhi*r;y=0.5-r;break;case list.BOTTOMCONE:x=cosPhi*(0.5-r);z=sinPhi*(0.5-r);y=0.0-r;break;}// Texture coords.
	texCoords.push(_u,_v2);// Push normals.
	var n=vec3.normalize([0,0,0],[x,y,z]);normals.push(n[0],n[1],n[2]);// Push vertices.
	vertices.push(x*l,y*w,z*h);// These were wrapped bottom->top, so reverse y on normals.
	if(prim.type===list.BOTTOMDOME||prim.type===list.BOTTOMCONE||prim.type===list.SKYDOME){y=-y;// the y value (have to flip indices backwards for SKYDOME for it to work).
	}// Sphere indices.
	if(latNum!==latDist&&longNum!==longitudeBands){var first=latNum*(longitudeBands+1)+longNum;var second=first+longitudeBands+1;// Texture only visible outside.
	indices.push(first+1,second+1,second);indices.push(first,first+1,second);}}}// Wind the SKYDOME indices backwards so texture displays inside.
	if(prim.type===list.SKYDOME){geo.indices.data=indices.reverse();}// Tangents.
	this.computeTangents(vertices,indices,normals,texCoords,tangents);// Color array is pre-created, or gets a default when WebGL buffers are created.
	// Return the buffer.
	return this.addBufferData(prim.geometry,vertices,indices,normals,texCoords,tangents);}/** 
	     * type CAP
	     * rendered as GL_TRIANGLES.
	     * Just a flattened half-sphere creating a circular 'lid'.
	     * prim.dimensions    = (vec4) [ x, y, z, startRadius | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryCap',value:function geometryCap(prim){return this.geometrySphere(prim);}/** 
	     * type DOME
	     * rendered as GL_TRIANGLES.
	     * Half-sphere, visible from outside.
	     * prim.dimensions    = (vec4) [ x, y, z, startRadius | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryDome',value:function geometryDome(prim){return this.geometrySphere(prim);}/** 
	     * type TOPDOME.
	     * rendered as WebGL TRIANGLES.
	     * Half-sphere (equivalent to type DOME).
	     * prim.dimensions    = (vec4) [ x, y, z, startRadius | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryTopDome',value:function geometryTopDome(prim){return this.geometrySphere(prim);}/** 
	     * type SKYDOME
	     * rendered as GL_TRIANGLES.
	     * Half-sphere, order of drawing is reversed, so texture displays inside by default.
	     * prim.dimensions    = (vec4) [ x, y, z, startRadius | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometrySkyDome',value:function geometrySkyDome(prim){prim.visibleFrom=this.INSIDE;return this.geometrySphere(prim);}/** 
	     * type BOTTOMDOME
	     * rendered as GL_TRIANGLES.
	     * bowl shaped, formed from lower half of sphere.
	     * prim.dimensions    = (vec4) [ x, y, z ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryBottomDome',value:function geometryBottomDome(prim){return this.geometrySphere(prim);}/** 
	     * type CYLINDER
	     * rendered as GL_TRIANGLES.
	     * Cylinder, either open or closed, visible from outside.
	     * startSlice cuts off the cylinder, and wraps the texture across the top. 
	     * endSlize truncates the bottom of the cylinder, and wraps the texture across the bottom.
	     * for an open cylinder with no caps, set startSlice and endSlize to zero.
	     * prim.dimensions    = (vec4) [ x, y, z, startSlice | 0, endSlice | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryCylinder',value:function geometryCylinder(prim){return this.geometrySphere(prim);}/** 
	     * type CONE.
	     * rendered as GL_TRIANGLES (equivalent to TOPCONE).
	     * Cone can have segments sliced off its beginning or end.
	     * startSlice cuts off the cone, and wraps the texture across the top. 
	     * endSlize truncates the bottom of the cone, and wraps the texture across the bottom.
	     * for a cone with no caps, set startSlice and endSlize to zero.
	     * prim.dimensions    = (vec4) [ x, y, z, startSlice | 0, endSlice | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryCone',value:function geometryCone(prim){return this.geometrySphere(prim);}/** 
	     * type TOPCONE.
	     * rendered as GL_TRIANGLES.(equivalent to CONE).
	     * startSlice cuts off the cone, and wraps the texture across the top. 
	     * endSlize truncates the bottom of the cone, and wraps the texture across the bottom.
	     * for a cone with no caps, set startSlice and endSlize to zero.
	     * prim.dimensions    = (vec4) [ x, y, z, startSlice | 0, endSlice | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     *
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryTopCone',value:function geometryTopCone(prim){return this.geometrySphere(prim);}/** 
	     * type BOTTOMCONE
	     * rendered as GL_TRIANGLES.
	     * Cone structure, pointing downwards.
	     * startSlice cuts off the cone, and wraps the texture across the top. 
	     * endSlize truncates the bottom of the cone, and wraps the texture across the bottom.
	     * for a cone with no caps, set startSlice and endSlize to zero.
	     * prim.dimensions    = (vec4) [ x, y, z, startSlice | 0, endSlice | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     *
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryBottomCone',value:function geometryBottomCone(prim){return this.geometrySphere(prim);}/**
	     * TYPE SPINDLE.
	     * rendered as GL_TRIANGLES.
	     * Spindle (two cones stuck together).
	     * prim.dimensions    = (vec4) [ x, y, z ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometrySpindle',value:function geometrySpindle(prim){return this.geometrySphere(prim);}},{key:'geometryTeardrop',value:function geometryTeardrop(prim){return this.geometrySphere(prim);}/** 
	     * type CAPSULE
	     * rendered as WebGL TRIANGLES.
	     * a cylinder with two spheres on each end, similar to capped cylinder, 
	     * equivalent to a closed cube.
	     * @link https://github.com/vorg/primitive-capsule
	     * position x axis is the radius, y axis is the height z not used
	     * dimensions x is number of steps along the y axis, dimensions y is the number of radial 
	     * divisions around the capsule.
	     * prim.dimensions    = (vec4) [ x, y, z ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryCapsule',value:function geometryCapsule(prim){var TWO_PI=this.TWO_PI;var list=this.typeList;var vec3=this.glMatrix.vec3;var util=this.util;var geo=prim.geometry;// Shortcuts to Prim data arrays.
	var vertices=[],indices=[],normals=[],texCoords=[],tangents=[];// Radius is measured along the x axis, height along y axis.
	var radius=prim.dimensions[0]||0.5,height=prim.dimensions[1]||1.0,segmentHeight=prim.divisions[0]||12,numSegments=prim.divisions[1]||12;// Compute a capsule ring.
	function calculateRing(segments,r,y,dy){var segIncr=1.0/(segments-1);for(var s=0;s<segments;s++){var x=Math.cos(TWO_PI*s*segIncr)*r;var z=Math.sin(TWO_PI*s*segIncr)*r;vertices.push(radius*x,radius*y+height*dy,radius*z);normals.push(x,y,z);var _u2=1-s*segIncr;var _v3=0.5+(radius*y+height*dy)/(2.0*radius+height);texCoords.push(_u2,_v3);}}var ringsBody=segmentHeight+1;var ringsTotal=segmentHeight+ringsBody;var bodyIncr=1.0/(ringsBody-1);var ringIncr=1.0/(segmentHeight-1);for(var r=0;r<segmentHeight/2;r++){calculateRing(numSegments,Math.sin(Math.PI*r*ringIncr),Math.sin(Math.PI*(r*ringIncr-0.5)),-0.5);}for(var _r=0;_r<ringsBody;_r++){calculateRing(numSegments,1.0,0.0,_r*bodyIncr-0.5);}for(var _r2=segmentHeight/2;_r2<segmentHeight;_r2++){calculateRing(numSegments,Math.sin(Math.PI*_r2*ringIncr),Math.sin(Math.PI*(_r2*ringIncr-0.5)),+0.5);}for(var _r3=0;_r3<ringsTotal-1;_r3++){for(var s=0;s<numSegments-1;s++){indices.push(_r3*numSegments+(s+1),_r3*numSegments+(s+0),(_r3+1)*numSegments+(s+1));indices.push((_r3+1)*numSegments+(s+0),(_r3+1)*numSegments+(s+1),_r3*numSegments+s);}}// Tangents.
	this.computeTangents(vertices,indices,normals,texCoords,tangents);// Color array is pre-created, or gets a default when WebGL buffers are created.
	// Return the buffer.
	return this.addBufferData(prim.geometry,vertices,indices,normals,texCoords,tangents);}/** 
	     * Create a PLANE, CUBE, or spherical object from cube mesh.
	     * --------------------------------------------------------------------
	     * type CUBE.
	     * rendered as WebGL TRIANGLES.
	     * Derived partly from pex.
	     * @link http://vorg.github.io/pex/docs/
	     * adjust curveRadius to round the edges of the Cube.
	     * used by several other Prim routines (CUBESPHERE, PLANE, OUTERPLANE, 
	     * INNERPLANE, CURVEDPLANE, CURVEDOUTERPLANE, CURVEDINNERPLANE)
	     * prim.dimensions    = (vec4) [ x, y, z, Prim.side, curveRadius ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryCube',value:function geometryCube(prim){var vec3=this.glMatrix.vec3;var flatten=this.util.flatten;var list=this.typeList;var side=this.directions;var geo=prim.geometry;// Shortcuts to Prim data arrays
	var vertices=[],indices=[],normals=[],texCoords=[],tangents=[];var sx=prim.dimensions[0],// x width
	sy=prim.dimensions[1],// y height
	sz=prim.dimensions[2],// z depth
	nx=prim.divisions[0],// should be x , j
	ny=prim.divisions[1],// should be y, i 
	nz=prim.divisions[2];// should be z
	//var numVertices = ( nx + 1 ) * ( ny + 1 ) * 2 + ( nx + 1 ) * ( nz + 1 ) * 2 + ( nz + 1 ) * ( ny + 1 ) * 2;
	var positions=[];var norms=[];var sides=[];var vertexIndex=0;switch(prim.type){case list.CUBE:case list.CUBESPHERE:computeSquare(0,1,2,sx,sy,nx,ny,sz/2,1,-1,side.FRONT);//front
	computeSquare(0,1,2,sx,sy,nx,ny,-sz/2,-1,-1,side.BACK);//back
	computeSquare(2,1,0,sz,sy,nz,ny,-sx/2,1,-1,side.LEFT);//left
	computeSquare(2,1,0,sz,sy,nz,ny,sx/2,-1,-1,side.RIGHT);//right
	computeSquare(0,2,1,sx,sz,nx,nz,sy/2,1,1,side.TOP);//top
	computeSquare(0,2,1,sx,sz,nx,nz,-sy/2,1,-1,side.BOTTOM);//bottom
	break;case list.PLANE:case list.CURVEDOUTERPLANE:case list.CURVEDINNERPLANE:case list.TERRAIN:switch(prim.dimensions[3]){// which side, based on cube sides
	case side.FRONT:computeSquare(0,1,2,sx,sy,nx,ny,sz/2,1,-1,side.FRONT);break;case side.BACK:computeSquare(0,1,2,sx,sy,nx,ny,-sz/2,-1,-1,side.BACK);break;case side.LEFT:computeSquare(2,1,0,sx,sy,nz,ny,-sx/2,1,-1,side.LEFT);break;case side.RIGHT:computeSquare(2,1,0,sx,sy,nz,ny,sx/2,-1,-1,side.RIGHT);break;case side.TOP:computeSquare(0,2,1,sx,sy,nx,nz,sy/2,1,1,side.TOP);// ROTATE xy axis
	break;case side.BOTTOM:computeSquare(0,2,1,sx,-sy,nx,nz,-sy/2,1,-1,side.BOTTOM);// ROTATE xy axis
	break;default:break;}break;default:break;}// Make an individual Plane.
	function computeSquare(u,v,w,su,sv,nu,nv,pw,flipu,flipv,currSide){// Create a square, positioning in correct position.
	var vertShift=vertexIndex;if(prim.name==='testPlane')console.log('i:'+i+' j:'+j);for(var _j2=0;_j2<=nv;_j2++){for(var _i13=0;_i13<=nu;_i13++){var vert=positions[vertexIndex]=[0,0,0];vert[u]=(-su/2+_i13*su/nu)*flipu;vert[v]=(-sv/2+_j2*sv/nv)*flipv;vert[w]=pw;// heightMap is always the middle, up-facing vector.
	if(prim.heightMap){// our 'y' for the TOP x/z MAY NEED TO CHANGE FOR EACH SIDE
	vert[w]=prim.heightMap.getPixel(_i13,_j2);}// Normals.
	norms[vertexIndex]=[0,0,0];// Texture coords.
	texCoords.push(_i13/nu,1.0-_j2/nv);++vertexIndex;}}// Compute indices and sides.
	var side=[];for(var _j3=0;_j3<nv;_j3++){for(var _i14=0;_i14<nu;_i14++){var n=vertShift+_j3*(nu+1)+_i14;// Indices for entire prim.
	indices.push(n,n+nu+1,n+nu+2);indices.push(n,n+nu+2,n+1);// Individual sides.
	side.push(n,n+nu+1,n+nu+2);side.push(n,n+nu+2,n+1);}}// Save the indices for this side.
	sides[currSide]=side;}// end of computeSquare.
	// Round the edges of the CUBE or SPHERECUBE to a sphere.
	if((prim.type===list.CUBE||prim.type===list.CUBESPHERE)&&prim.divisions[3]!==0){var tmp=[0,0,0];// Radius controlled by 4th parameter in divisions
	var radius=prim.divisions[3];var rx=sx/2.0;var ry=sy/2.0;var rz=sz/2.0;for(var _i15=0;_i15<positions.length;_i15++){var pos=positions[_i15];var normal=normals[_i15];var inner=[pos[0],pos[1],pos[2]];if(pos[0]<-rx+radius){inner[0]=-rx+radius;}else if(pos[0]>rx-radius){inner[0]=rx-radius;}if(pos[1]<-ry+radius){inner[1]=-ry+radius;}else if(pos[1]>ry-radius){inner[1]=ry-radius;}if(pos[2]<-rz+radius){inner[2]=-rz+radius;}else if(pos[2]>rz-radius){inner[2]=rz-radius;}// Re-compute position of moved vertex via normals.
	normal=[pos[0],pos[1],pos[2]];vec3.sub(normal,normal,inner);vec3.normalize(normal,normal);//normals[ i ] = normal;
	pos=[inner[0],inner[1],inner[2]];tmp=[normal[0],normal[1],normal[2]];vec3.scale(tmp,tmp,radius);vec3.add(pos,pos,tmp);positions[_i15]=pos;}}else if((prim.type===list.CURVEDOUTERPLANE||prim.type===list.CURVEDINNERPLANE)&&prim.dimensions[4]&&prim.dimensions[4]!==0){var dSide=1;switch(prim.dimensions[3]){case side.FRONT:if(prim.type===list.CURVEDINNERPLANE||prim.type==list.INNERPLANE)dSide=-1;break;case side.BACK:if(prim.type===list.CURVEDOUTERPLANE||prim.type===list.OUTERPLANE)dSide=-1;break;case side.LEFT:if(prim.type===list.CURVEDOUTERPLANE||prim.type===list.OUTERPLANE)dSide=-1;break;case side.RIGHT:if(prim.type===list.CURVEDINNERPLANE||prim.type===list.INNERPLANE)dSide=-1;break;case side.TOP:if(prim.type===list.CURVEDOUTERPLANE||prim.type===list.OUTERPLANE)dSide=-1;break;case side.BOTTOM:if(prim.type===list.CURVEDINNERPLANE||prim.type===list.INNERPLANE)dSide=-1;break;}for(var _i16=0;_i16<positions.length;_i16++){switch(prim.dimensions[3]){case side.FRONT:positions[_i16][2]=dSide*Math.cos(positions[_i16][0])*prim.dimensions[4];break;case side.BACK:positions[_i16][2]=dSide*Math.cos(positions[_i16][0])*prim.dimensions[4];break;case side.LEFT:positions[_i16][0]=dSide*Math.cos(positions[_i16][2])*prim.dimensions[4];break;case side.RIGHT:positions[_i16][0]=dSide*Math.cos(positions[_i16][2])*prim.dimensions[4];break;case side.TOP:positions[_i16][1]=dSide*Math.cos(positions[_i16][0])*prim.dimensions[4];break;case side.BOTTOM:positions[_i16][1]=-Math.cos(positions[_i16][0])*prim.dimensions[4];// SEEN FROM INSIDE< CORRECT
	break;}}}// Flatten arrays, since we created using 2 dimensions.
	vertices=flatten(positions,false);normals=flatten(norms,false);// Re-compute normals, which may have changed.
	normals=this.computeNormals(vertices,indices,normals);console.log(" IN CUBE NORMALS NOW ARE>...."+normals.length);///////////////////////////
	///////////////////////////
	///////////////////////////
	///////////////////////////
	/*
	        if ( prim.name === 'colored cube' ) {

	            console.log("DISPLAYING COLORED CUBE")
	            // Sending in texture coords and normals speeds subdivision calculation.

	            let divided = this.morph.computeSubdivide( vertices, indices, texCoords, true );

	            vertices = divided.vertices;
	            indices = divided.indices;
	            texCoords = divided.texCoords;
	            //normals = this.computeNormals( vertices, indices, normals );

	            // TODO: TEST COORDS

	        }
	*///////////////////////////
	//////////////////////////
	//////////////////////////
	/////////////////////////
	// Return the buffer.
	return this.addBufferData(prim.geometry,vertices,indices,normals,texCoords,tangents);}/** 
	     * type PLANE, OUTERPLANE
	     * rendered as WebGL TRIANGLES.
	     * visible from the 'outside' as defined by the outward vector from Prim.side.
	     * prim.dimensions    = (vec4) [ x, y, z, Prim.side ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryOuterPlane',value:function geometryOuterPlane(prim){return this.geometryCube(prim);}/** 
	     * type INNERPLANE
	     * rendered as WebGL TRIANGLES.
	     * visible from the 'inside', as defined by the outward vectore from Prim.side.
	     * prim.dimensions    = (vec4) [ x, y, z, Prim.side ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryInnerPlane',value:function geometryInnerPlane(prim){return this.geometryCube(prim);}/** 
	     * type CURVEDPLANE, CUREVEDOUTERPLANE
	     * rendered as WebGL TRIANGLES.
	     * visible from the 'outside' as defined by the outward vector from Prim.side.
	     * curve radius sets the amount of curve by assigning a radius for a circle.
	     * prim.dimensions    = (vec4) [ x, y, z, Prim.side, curveRadius | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryCurvedOuterPlane',value:function geometryCurvedOuterPlane(prim){return this.geometryCube(prim);}/** 
	     * type CURVEDINNERPLANE
	     * rendered as GL_TRIANGLES.
	     * visible from the 'inside', as defined by the outward vectore from Prim.side.
	     * curve radius sets the amount of curve by assigning a radius for a circle.
	     * prim.dimensions    = (vec4) [ x, y, z, Prim.side, curveRadius | 0 ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryCurvedInnerPlane',value:function geometryCurvedInnerPlane(prim){return this.geometryCube(prim);}},{key:'geometryTerrain',/** 
	     * type TERRAIN.
	     * rendered as GL_TRIANGLES.
	     * Generate terrain, using a heightMap, from a PLANE object. The 
	     * heightMap values are interpolated for each vertex in the PLANE.
	     * prim.dimensions    = (vec4) [ x, y, z, Prim.side ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */value:function geometryTerrain(prim){if(!prim.heightMap){console.log('adding heightmap for:'+prim.name);prim.heightMap=new _map2d2.default(this.util);// roughness 0.2 of 0-1, flatten = 1 of 0-1;
	prim.heightMap[prim.heightMap.type.DIAMOND](prim.divisions[0],prim.divisions[2],0.6,1);// TODO: SCALE DOWN FOR WATERLINE.
	//prim.heightMap.scale( 165, 165 );
	//prim.heightMap.scale( 25, 25 );
	}// NOTE: this can make the heightmap in any orientation.
	return this.geometryOuterPlane(prim);}},{key:'geometryHexTerrain',/** 
	     * Create terrain with hexagon grid with each grid element independently addressible.
	     * @link http://catlikecoding.com/unity/tutorials/hex-map-1/
	     */value:function geometryHexTerrain(prim){}/** 
	     * Create terrain with octagon grid, with each grid element independently addressible.
	     */},{key:'geometryOctTerrain',value:function geometryOctTerrain(prim){}/** 
	     * type CUBESPHERE.
	     * rendered as WebGL TRIANGLES.
	     * http://catlikecoding.com/unity/tutorials/rounded-cube/
	     * http://mathproofs.blogspot.com.au/2005/07/mapping-cube-to-sphere.html
	     * 
	     * just sets the curveRadius to 1/2 of the prim size.
	     * prim.dimensions    = (vec4) [ x, y, z, Prim.side, curveRadius ]
	     * prim.divisions     = (vec3) [ x, y, z ]
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryCubeSphere',value:function geometryCubeSphere(prim){// force the rounding radii to a circle
	prim.divisions[3]=prim.dimensions[0]/2;// NOTE: if there is a heightmap, return, then 'pincusion' out the points.
	return this.geometryCube(prim);}/** 
	     * Icosphere, adapted from Unity 3d tutorial.
	     * @link https://www.binpress.com/tutorial/creating-an-octahedron-sphere/162
	     * @link https://bitbucket.org/transporter/ogre-procedural/src/ca6eb3363a53c2b53c055db5ce68c1d35daab0d5/library/src/ProceduralIcoSphereGenerator.cpp?at=default&fileviewer=file-view-default
	     * http://donhavey.com/blog/tutorials/tutorial-3-the-icosahedron-sphere/
	     * http://blog.andreaskahler.com/2009/06/creating-icosphere-mesh-in-code.html
	     * https://github.com/glo-js/primitive-icosphere
	     * https://github.com/hughsk/icosphere
	     * http://mft-dev.dk/uv-mapping-sphere/
	     * octahedron sphere generation
	     * https://www.binpress.com/tutorial/creating-an-octahedron-sphere/162
	     * https://experilous.com/1/blog/post/procedural-planet-generation
	     * https://experilous.com/1/planet-generator/2014-09-28/planet-generator.js
	     * https://fossies.org/dox/eigen-3.2.10/icosphere_8cpp_source.html
	     * 
	     * divisions max: ~60
	     * @param {Object} prim the primitive needing geometry.
	     * @param {Boolean} noSphere if false, make an icosohedron.
	     */},{key:'geometryIcoSphere',value:function geometryIcoSphere(prim){var TWO_PI=this.TWO_PI;// connect scope to internal functions.
	var vec3=this.glMatrix.vec3;var flatten=this.util.flatten;var list=this.typeList;var side=this.directions;// Size and divisions.
	var subdivisions=void 0;subdivisions=prim.divisions[0];if(prim.type===list.ICOSOHEDRON){subdivisions=2;}else{subdivisions=prim.divisions[0];}var radius=prim.dimensions[0]*0.5;var resolution=subdivisions;// Default vectors.
	var getStdVecs=this.getStdVecs.bind(this);var directions=[side.LEFT,side.BACK,side.RIGHT,side.FORWARD];// Allocate memory, since we may have to access out-of-range vertices, indices.
	var geo=prim.geometry;// TODO: halve index length if making a dome.
	var vertices=new Array((resolution+1)*(resolution+1)*4-(resolution*2-1)*3),indices=new Array((1<<subdivisions*2+3)*3),texCoords=new Array(vertices.length),normals=new Array(vertices.length),tangents=new Array(vertices.length);// Initialize lots of default variables.
	var v=0,vBottom=0,t=0,i=void 0,d=void 0,progress=void 0,from=void 0,to=void 0;for(i=0;i<4;i++){//vertices[ v++ ] = getStdVecs('down');
	vertices[v++]=getStdVecs(side.DOWN);}for(i=1;i<=resolution;i++){progress=i/resolution;to=vec3.lerp([0,0,0],getStdVecs(side.DOWN),getStdVecs(side.FORWARD),progress);vertices[v++]=vec3.copy([0,0,0],to);for(d=0;d<4;d++){from=vec3.copy([0,0,0],to);to=vec3.lerp([0,0,0],getStdVecs(side.DOWN),getStdVecs(directions[d]),progress);t=createLowerStrip(i,v,vBottom,t,indices);v=createVertexLine(from,to,i,v,vertices);vBottom+=i>1?i-1:1;}vBottom=v-1-i*4;}for(i=resolution-1;i>=1;i--){progress=i/resolution;to=vec3.lerp([0,0,0],getStdVecs(side.UP),getStdVecs(side.FORWARD),progress);vertices[v++]=vec3.copy([0,0,0],to);for(d=0;d<4;d++){from=vec3.copy([0,0,0],to);to=vec3.lerp([0,0,0],getStdVecs(side.UP),getStdVecs(directions[d]),progress);t=createUpperStrip(i,v,vBottom,t,indices);v=createVertexLine(from,to,i,v,vertices);vBottom+=i+1;}vBottom=v-1-i*4;}for(i=0;i<4;i++){indices[t++]=vBottom;indices[t++]=v;indices[t++]=++vBottom;vertices[v++]=getStdVecs(side.UP);}// Create our Normals, and set icosphere to unit size.
	for(i=0;i<vertices.length;i++){// Toggle icosphere with icosohedron.
	if(prim.type!==list.OCTAHEDRON){vertices[i]=vec3.normalize([0,0,0],vertices[i]);}normals[i]=vec3.copy([0,0,0],vertices[i]);}// Texture coords.
	createUV(vertices,texCoords);// Tangents.
	createTangents(vertices,tangents);if(radius!=1){for(i=0;i<vertices.length;i++){vertices[i][0]*=radius;vertices[i][1]*=prim.dimensions[1]/2;//radius;
	vertices[i][2]*=prim.dimensions[2]/2;//radius;
	}}// Flatten the data arrays.
	vertices=flatten(vertices,false);texCoords=flatten(texCoords,false);normals=flatten(normals,false);tangents=flatten(tangents,false);// Helper functions.
	// Create UV texCoords.
	function createUV(vertices,uv){var previousX=1;for(i=0;i<vertices.length;i++){v=vertices[i];if(v[0]==previousX){// was v.x
	uv[i-1][0]=1;// was v.x
	}previousX=v[0];// was v.x
	var textureCoordinates=[0,0];textureCoordinates[0]=Math.atan2(v[0],v[2])/-TWO_PI;// was v.x, v.z
	if(textureCoordinates[0]<0){// was textureCoordinates.x
	textureCoordinates[0]+=1;// was textureCoordinates
	}textureCoordinates[1]=Math.asin(v[1])/Math.PI+0.5;// was v.y, textureCoordinates.y
	uv[i]=textureCoordinates;}uv[vertices.length-4][0]=0.125;uv[0][0]=0.125;// was v.x
	uv[vertices.length-3][0]=0.375;uv[1][0]=0.375;// was v.x
	uv[vertices.length-2][0]=0.625;uv[2][0]=0.625;// was v.x
	uv[vertices.length-1][0]=0.875;uv[3][0]=0.875;// was v.x
	// Our engine wraps opposite, so reverse first coordinate (can't do it until we do all coordinates).
	for(i=0;i<texCoords.length;i++){texCoords[i][0]=1.0-texCoords[i][0];}}function createTangents(vertices,tangents){for(i=0;i<vertices.Length;i++){v=vertices[i];v[1]=0;v=vec3.normalize([0,0,0],v);tangent=[0,0,0,0];tangent[0]=-v[2];tangent[1]=0;tangent[2]=v[0];tangent[3]=-1;tangents[i]=tangent;}tangents[vertices.length-4]=[-1,0,1];tangents[0]=[-1,0,-1];tangents[vertices.length-3]=[1,0,-1];tangents[1]=[1,0,-1];tangents[vertices.length-2]=[1,0,1];tangents[2]=[1,0,1];tangents[vertices.length-1]=[-1,0,1];tangents[3]=[-1,0,1];for(i=0;i<4;i++){tangents[vertices.length-1-i][3]=tangents[i][3]=-1;}}function createVertexLine(from,to,steps,v,vertices){for(var _i17=1;_i17<=steps;_i17++){//console.log("Vec3 " + v + " IS A:" + vec3.lerp( [ 0, 0, 0 ], from, to, i / steps ))
	vertices[v++]=vec3.lerp([0,0,0],from,to,_i17/steps);}return v;}function createLowerStrip(steps,vTop,vBottom,t,triangles){for(var _i18=1;_i18<steps;_i18++){triangles[t++]=vBottom;triangles[t++]=vTop-1;triangles[t++]=vTop;triangles[t++]=vBottom++;triangles[t++]=vTop++;triangles[t++]=vBottom;}triangles[t++]=vBottom;triangles[t++]=vTop-1;triangles[t++]=vTop;return t;}function createUpperStrip(steps,vTop,vBottom,t,triangles){triangles[t++]=vBottom;triangles[t++]=vTop-1;triangles[t++]=++vBottom;for(var _i19=1;_i19<=steps;_i19++){triangles[t++]=vTop-1;triangles[t++]=vTop;triangles[t++]=vBottom;triangles[t++]=vBottom;triangles[t++]=vTop++;triangles[t++]=++vBottom;}return t;}// Color array is pre-created, or gets a default when WebGL buffers are created.
	// Return the buffer.
	return this.addBufferData(prim.geometry,vertices,indices,normals,texCoords,tangents);//return this.createGLBuffers( prim.geometry );
	}/** 
	     * type ICOSOHEDRON.
	     * create a icosohedron.
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryIcosohedron',value:function geometryIcosohedron(prim){return this.geometryIcoSphere(prim,false);}/** 
	     * type PRISM.
	     * create a closed prism type shape.
	     */},{key:'geometryPrism',value:function geometryPrism(prim){}// TODO code needs to be written.
	/** 
	     * type PYRAMID.
	     * create a closed pyramid shape, half of an icosohedron.
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryPyramid',value:function geometryPyramid(prim){}// TODO: return upper half of icosohedron, and close. (possibly by setting 
	// bottom half to a comm y value)
	/** 
	     * type ICODOME.
	     * create a half-sphere from an icosphere.
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryIcoDome',value:function geometryIcoDome(prim){}/** 
	     * type TOPICODOME.
	     * create a half-sphere from an icosphere.
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryTopIcoDome',value:function geometryTopIcoDome(prim){}/** 
	     * type SKYICODOME.
	     * create a half-sphere with texture only visible from the inside.
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometrySkyIcoDome',value:function geometrySkyIcoDome(prim){prim.visibleFrom=this.INSIDE;}/** 
	     * type BOTTOMICODOME.
	     * create a bowl shape from the lower half of an icosphere.
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryBottomIcoDome',value:function geometryBottomIcoDome(prim){}/** 
	     * Create an octahedron
	     * Note: the icosphere algorith returns an octahedron if we don't "inflate" 
	     * the object's vertices by normalizing.
	     * 
	     * Additional links:
	     * @link https://github.com/nickdesaulniers/prims/blob/master/octahedron.js
	     * @link http://paulbourke.net/geometry/platonic/
	     * @link https://www.binpress.com/tutorial/creating-an-octahedron-sphere/162
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryOctahedron',value:function geometryOctahedron(prim){return this.geometryIcoSphere(prim);}/** 
	     * Dodecahedron
	     * @link https://github.com/prideout/par/blob/master/par_shapes.h
	     * @link https://github.com/nickdesaulniers/prims/blob/master/dodecahedron.js
	     * @link http://vorg.github.io/pex/docs/pex-gen/Dodecahedron.html
	     */},{key:'geometryDodecahedron',value:function geometryDodecahedron(prim){var vec3=this.glMatrix.vec3;var flatten=this.util.flatten;var geo=prim.geometry;// Shortcuts to Prim data arrays.
	var vertices=[],indices=[],normals=[],texCoords=[],tangents=[];var w=prim.dimensions[0],h=prim.dimensions[1],d=prim.dimensions[2];var r=prim.divisions[0]||0.5;var phi=(1+Math.sqrt(5))/2;var a=0.5;var b=0.5*1/phi;var c=0.5*(2-phi);var vtx=[[c,0,a],// 0
	[-c,0,a],// 1
	[-b,b,b],// 2
	[0,a,c],// 3
	[b,b,b],// 4  + 1 = 5
	[b,-b,b],// 5  + 1 = 6
	[0,-a,c],// 6  + 1 = 7
	[-b,-b,b],// 7  + 1 = 8
	[c,0,-a],// 8  + 2 = 10
	[-c,0,-a],// 9  + 2 = 12
	[-b,-b,-b],// 10 + 2 = 13
	[0,-a,-c],// 11 + 2 = 14
	[b,-b,-b],// 12 + 3 = 16
	[b,b,-b],// 13 + 3 = 17
	[0,a,-c],// 14 + 3 = 18
	[-b,b,-b],// 15 + 3 = 19
	[a,c,0],// 16 + 4 = 21
	[-a,c,0],// 17 + 4 = 22
	[-a,-c,0],// 18 + 4 = 23
	[a,-c,0]// 19 + 4 = 24
	];//vertices = vertices.map(function(v) { return v.normalize().scale(r); })
	var faces=[[4,3,2,1,0],[7,6,5,0,1],[12,11,10,9,8],[15,14,13,8,9],[14,3,4,16,13],[3,14,15,17,2],[11,6,7,18,10],[6,11,12,19,5],[4,0,5,19,16],[12,8,13,16,19],[15,9,10,18,17],[7,1,2,17,18]];if(prim.applyTexToFace){for(var _i20=0;_i20<faces.length;_i20++){var len=vertices.length;// The fan is a flat polygon, constructed with face points, shared vertices.
	var fan=this.computeFan(vtx,faces[_i20]);vertices=vertices.concat(fan.vertices);// Update the indices to reflect concatenation.
	for(var _i21=0;_i21<fan.indices.length;_i21++){fan.indices[_i21]+=len;}indices=indices.concat(fan.indices);texCoords=texCoords.concat(fan.texCoords);normals=normals.concat(fan.normals);}}else{var computeSphereCoords=this.computeSphereCoords;for(var _i22=0;_i22<faces.length;_i22++){var vv=faces[_i22];// indices to vertices
	var vvv=[];// saved vertices
	var lenv=vv.length;for(var _j4=0;_j4<vv.length;_j4++){vvv.push(vtx[vv[_j4]]);}var center=this.computeCentroid(vvv);for(var _i23=1;_i23<=lenv;_i23++){var p1=_i23-1;var p2=_i23;if(_i23===lenv){p1=p2-1;p2=0;}var v1=vvv[p1];var v2=vvv[p2];vertices.push(vec3.copy([0,0,0],v1),vec3.copy([0,0,0],v2),vec3.copy([0,0,0],center));var cLen=vertices.length-1;indices.push(cLen-2,cLen-1,cLen);normals.push(vec3.copy([0,0,0],v1),vec3.copy([0,0,0],v2),vec3.copy([0,0,0],center));texCoords.push(computeSphereCoords(v1),computeSphereCoords(v2),computeSphereCoords(center));}// end of 'for' loop.
	}// end of 'faces' loop.
	}// end of wrap whole object with one texture.
	for(var _i24=0;_i24<vertices.length;_i24++){var _vv=vertices[_i24];_vv[0]*=w;_vv[1]*=h;_vv[2]*=d;}// Flatten.
	vertices=flatten(vertices);texCoords=flatten(texCoords);normals=flatten(normals);// Color array is pre-created, or gets a default when WebGL buffers are created.
	// Return the buffer.
	return this.addBufferData(prim.geometry,vertices,indices,normals,texCoords,tangents);}/** 
	     * Torus object
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
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryTorus',value:function geometryTorus(prim){var vec3=this.glMatrix.vec3;var geo=prim.geometry;// Shortcuts to Prim data arrays
	var vertices=[],indices=[],normals=[],texCoords=[],tangents=[];var radius=prim.dimensions[0]/2;// x coordinate, width of torus in x direction
	var ringRadius=prim.dimensions[2]/2;// ringradius
	var rings=prim.divisions[0];var sides=prim.divisions[1];// typical: radius = 0.5, ringRadius = 0.25, sides = 36, rings = 24;
	var vertsPerRow=sides+1;var vertsPerColumn=rings+1;var ringStride=this.TWO_PI/rings;var torusStride=this.TWO_PI/sides;var theta=0,phi=0,x=void 0,y=void 0,z=void 0;for(var vertColumn=0;vertColumn<vertsPerColumn;vertColumn++){theta=ringStride*vertColumn;for(var horizRow=0;horizRow<vertsPerRow;horizRow++){phi=torusStride*horizRow;// Position.
	x=Math.cos(theta)*(radius+ringRadius*Math.cos(phi));y=Math.sin(theta)*(radius+ringRadius*Math.cos(phi));z=ringRadius*Math.sin(phi);vertices.push(x,y,z);// NOTE: x, z, y gives a horizontal torus
	var norm=vec3.normalize([0,0,0],[x,y,z]);normals.push(norm[0],norm[1],norm[2]);var _u3=horizRow/vertsPerRow;var _v4=vertColumn/vertsPerColumn;texCoords.push(_u3,_v4);}}// let numIndices = sides * rings * 6;
	for(var _vertColumn=0;_vertColumn<rings;_vertColumn++){for(var _horizRow=0;_horizRow<sides;_horizRow++){var lt=_horizRow+_vertColumn*vertsPerRow;var rt=_horizRow+1+_vertColumn*vertsPerRow;var lb=_horizRow+(_vertColumn+1)*vertsPerRow;var rb=_horizRow+1+(_vertColumn+1)*vertsPerRow;indices.push(lb,rb,rt,lb,rt,lt);// NOTE: wrap backwards to see inside of torus (tunnel?).
	}}///////////////////////////
	///////////////////////////
	///////////////////////////
	///////////////////////////
	if(prim.name==='torus2'){console.log("DISPLAYING COLORED CUBE");// Sending in texture coords and normals speeds subdivision calculation.
	var divided=this.morph.computeSubdivide(vertices,indices,texCoords,true);vertices=divided.vertices;indices=divided.indices;texCoords=divided.texCoords;//normals = this.computeNormals( vertices, indices, normals );
	// TODO: TEST COORDS
	}//////////////////////////
	//////////////////////////
	//////////////////////////
	/////////////////////////
	// Color array is pre-created, or gets a default when WebGL buffers are created.
	// Return the buffer.
	return this.addBufferData(prim.geometry,vertices,indices,normals,texCoords,tangents);}/** 
	     * a Torus that doesn't close
	     */},{key:'geometrySpring',value:function geometrySpring(prim){}/** 
	     * Generic 3d shape (e.g. Collada model).
	     * @link https://dannywoodz.wordpress.com/2014/12/16/webgl-from-scratch-loading-a-mesh/
	     * @link https://github.com/jagenjo/litegl.js/blob/master/src/mesh.js
	     * 
	     * @param {Prim} the Prim needing geometry. 
	     * @returns {Prim.geometry} geometry data, including vertices, indices, normals, texture coords and tangents. 
	     * Creating WebGL buffers is turned on or off conditionally in the method.
	     */},{key:'geometryMesh',value:function geometryMesh(prim){var geo=prim.geometry;// Shortcuts to Prim data arrays
	var vertices=[],indices=[],normals=[],texCoords=[],tangents=[];// Vertices.
	// Indices.
	// Normals.
	this.computeNormals(vertices,indices,normals);// Tangents.
	this.computeTangents(vertices,indices,normals,texCoords,tangents);// Color array is pre-created, or gets a default when WebGL buffers are created.
	// Return the buffer.
	return this.createGLBuffers(prim.geometry);}/*
	     * ---------------------------------------
	     * PRIMS
	     * ---------------------------------------
	     *//** 
	     * Create an standard 3d object.
	     * @param {String} name assigned name of object (not necessarily unique).
	     * @param {Number} scale size relative to unit vector (1,1,1).
	     * @param {GLMatrix.vec3} position location of center of object.
	     * @param {GLMatrix.vec3} acceleration movement vector (acceleration) of object.
	     * @param {GLMatrix.vec3} rotation rotation vector (spin) around center of object.
	     * @param {String} textureImage the path to an image used to create a texture.
	     * @param {Array|GLMatrix.vec4} color the default color(s) of the object.
	     * @param {Boolean} applyTexToFace if true, apply texture to each face, else apply texture to 
	     * the entire object.
	     */},{key:'createPrim',value:function createPrim(type){var name=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'unknown';var dimensions=arguments.length>2&&arguments[2]!==undefined?arguments[2]:this.vec7(1,1,1,0,0,0,0);var divisions=arguments.length>3&&arguments[3]!==undefined?arguments[3]:this.vec6(1,1,1,0,0,0);var position=arguments.length>4&&arguments[4]!==undefined?arguments[4]:this.glMatrix.vec3.create();var acceleration=arguments.length>5&&arguments[5]!==undefined?arguments[5]:this.glMatrix.vec3.create();var rotation=arguments.length>6&&arguments[6]!==undefined?arguments[6]:this.glMatrix.vec3.create();var angular=arguments.length>7&&arguments[7]!==undefined?arguments[7]:this.glMatrix.vec3.create();var textureImages=arguments[8];var _this=this;var color=arguments[9];var applyTexToFace=arguments.length>10&&arguments[10]!==undefined?arguments[10]:false;var vec3=this.glMatrix.vec3;var mat4=this.glMatrix.mat4;if(!this.checkType(type)){console.error('unsupported Prim type:'+type);return null;}var prim={};prim.id=this.setId();prim.name=name;prim.type=type;prim.dimensions=dimensions||this.vec7(1,1,1,0,0,0,0);prim.divisions=divisions||this.vec6(1,1,1,0,0,0);prim.position=position||vec3.create();prim.acceleration=acceleration||vec3.create();// The absolute .rotation object includes rotation on x, y, z axis
	prim.rotation=rotation||vec3.create();// The acceleration object indicates velocity on angular motion in x, y, z
	prim.angular=angular||vec3.create();// The orbit defines a center that the object orbits around, and orbital velocity.
	prim.orbitRadius=0.0;prim.orbitAngular=0.0;// Lighting and materials.
	prim.material={};prim.light={};// Visible from outside (counterclockwise) or inside (clockwise).
	prim.visibleFrom=this.OUTSIDE;prim.applyTexToFace=applyTexToFace;// Geometry factory function.
	prim.geometry=this.createGeoObj();prim.geometry.type=type;prim.geometry=this.createGeoObj();prim.geometry=this[type](prim,color);prim.geometry=this.createGLBuffers(prim.geometry);// Compute the bounding box.
	prim.boundingBox=this.computeBoundingBox(prim.geometry.vertices.data);// Internal functions.
	/** 
	         * Set the model-view matrix
	         */prim.setMV=function(mvMatrix){var p=prim;mat4.identity(mvMatrix);var z=-5;// Translate.
	vec3.add(p.position,p.position,p.acceleration);mat4.translate(mvMatrix,mvMatrix,[p.position[0],p.position[1],z+p.position[2]]);// If orbiting, set orbit.
	// Rotate.
	// TODO: rotate first for rotation.
	// TODO: rotate second for orbiting.
	// TODO: rotate (internal), translate, rotate (orbit)
	vec3.add(p.rotation,p.rotation,p.angular);mat4.rotate(mvMatrix,mvMatrix,p.rotation[0],[1,0,0]);mat4.rotate(mvMatrix,mvMatrix,p.rotation[1],[0,1,0]);mat4.rotate(mvMatrix,mvMatrix,p.rotation[2],[0,0,1]);return mvMatrix;};/** 
	         * Set a material for a prim.
	         * @link http://webglfundamentals.org/webgl/lessons/webgl-less-code-more-fun.html
	         * didn't use chroma (but could)
	         * @link https://github.com/gka/chroma.js/blob/gh-pages/src/index.md
	         */prim.setMaterial=function(){var colorMult=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var diffuse=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[0,0,0];var specular=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[1,1,1,1];var shininess=arguments.length>3&&arguments[3]!==undefined?arguments[3]:250;var specularFactor=arguments.length>4&&arguments[4]!==undefined?arguments[4]:1;var p=prim;p.material.colorMult=colorMult;p.diffuse=diffuse;p.specular=specular;p.shininess=shininess;p.specularFactor=specularFactor;};/** 
	         * Set the Prim as a glowing object. Global lights 
	         * are handled by the World.
	         */prim.setLight=function(){var direction=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[1,1,1];var color=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[255,255,255];var prim=arguments.length>2&&arguments[2]!==undefined?arguments[2]:_this;var p=prim;p.light.direction=direction;p.light.color=color;};// Shared with factory functions. Normally, we used matrix transforms to accomplish this.
	prim.scaleVertices=function(scale){_this.scale(scale,prim.geometry.vertices);};prim.moveVertices=function(pos){_this.computeMove(scale,prim.geometry.vertices);};prim.morphVertices=function(newGeometry,easing){_this.morph(newGeometry,easing,prim.geometry);};// Waypoints for scripted motion or timelines.
	prim.waypoints=[];// Store multiple textures for one Prim.
	prim.textures=[];// Store multiple sounds for one Prim.
	prim.audio=[];// Store multiple videos for one Prim.
	prim.video=[];// Multiple textures per Prim. Rendering defines how textures for each Prim type are used.
	for(var _i25=0;_i25<textureImages.length;_i25++){this.loadTexture.load(textureImages[_i25],prim);}prim.scale=1.0;// Define Prim material (only one material type at a time per Prim ).
	prim.setMaterial();//prim.setLight();
	// Parent Node.
	prim.parentNode=null;// Child Prim array.
	prim.children=[];prim.renderId=-1;// NOT ASSIGNED. TODO: Assign a renderer to each Prim.
	// Push into our list of all Prims.
	this.objs.push(prim);// TODO: Prim readout to console.
	this.primReadout(prim);// TODO: DEBUG!!!!!!!!!!!!!!!!!!!!!!
	return prim;}}]);return Prim;}();// End of class.
	// We put this here because of JSDoc(!).
	exports.default=Prim;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

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

	                _this.type = {

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

	                        ///////////////////////////////////console.log("SETPIXEL: x:" + x + " z:" + z + " val:" + val + ' size:' + this.squareSize )

	                        this.map[x + this.width * z] = val; // NOTE: was squareSize!!!!!!!
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
	                        } else {

	                                console.error('error creating Map2d using ' + this.type.PLANE);
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
	                        } else {

	                                console.error('error creating Map using ' + this.type.RANDOM);
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
	                        } else {

	                                console.error('error creating Map using ' + this.type.DIAMOND);
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

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

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

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

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

	        //this.util = util;

	        var _this = _possibleConstructorReturn(this, (Map3d.__proto__ || Object.getPrototypeOf(Map3d)).call(this, util));

	        _this.type = {

	            CLOUD: 'initPlane',

	            SPHERE: 'initRandom'
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
	        value: function checkParams(w, h, d, roughness, flatten) {

	            return false;
	        }

	        /** 
	         * Get a 3D pixel. This allows interpolation of values (colors or other 
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
	         * Generate a Map using completely random numbers clamped. 
	         * to a range.
	         */

	    }, {
	        key: 'initRandom',
	        value: function initRandom(w, h, d, numPoints) {

	            if (this.checkParams(w, d, roughness, 0)) {

	                this.type = this.CLOUD;

	                this.map = new Float32Array(numPoints);

	                this.mapColors = new Float32Array(numPoints);

	                this.width = w;

	                this.height = h;

	                this.depth = d;

	                var util = this.util;

	                for (var i = 0; i < this.map.length; i++) {

	                    this.map.push(util.getRand() * w, util.getRand() * h, util.getRand() * d);

	                    this.mapColors.push(util.getRand(0, 255), util.getRand(0, 255), util.getRand(0, 255), 1.0);
	                }
	            } else {

	                console.error('error creating Map3d using ' + this.type.RANDOM);
	            }
	        }

	        /** 
	         * Set points on the surface of a sphere.
	         */

	    }, {
	        key: 'initSphere',
	        value: function initSphere(w, h, d, numPoints) {}

	        /** 
	         * Initialize a Map3d from data. The first parameter is always 3d coordinates,
	         * after that an arbitrary number of arrays may be assigned at comparable positions
	         * in the map object.
	         */

	    }, {
	        key: 'initFromData',
	        value: function initFromData(positions) {

	            // TODO: use stellar or other data.

	        }
	    }]);

	    return Map3d;
	}(_mapd2.default);

	exports.default = Map3d;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * complex transformations of meshes, e.g. subdivision with smoothing, or 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * morphing.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _coords = __webpack_require__(25);

	var _coords2 = _interopRequireDefault(_coords);

	var _vertex = __webpack_require__(26);

	var _vertex2 = _interopRequireDefault(_vertex);

	var _edge = __webpack_require__(27);

	var _edge2 = _interopRequireDefault(_edge);

	var _tri = __webpack_require__(28);

	var _tri2 = _interopRequireDefault(_tri);

	var _quad = __webpack_require__(29);

	var _quad2 = _interopRequireDefault(_quad);

	var _mesh = __webpack_require__(30);

	var _mesh2 = _interopRequireDefault(_mesh);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Morph = function () {
	        function Morph(init, util, glMatrix) {
	                _classCallCheck(this, Morph);

	                console.log('in morph class');

	                this.util = util;

	                this.glMatrix = glMatrix;

	                if (this.init === true) {

	                        // Do something.

	                }
	        }

	        /** 
	         * G.
	         */


	        _createClass(Morph, [{
	                key: 'computeMeshEdges',
	                value: function computeMeshEdges(vertexArr) {

	                        // A list of Edges with Vertex objects that don't have enough neighboring Edges.

	                        console.log('--------------- COMPUTE MESH EDGES -----------------');

	                        var MAX_EDGES = 6; // a Max of 6 in most cases

	                        var MAX_LOOPS = MAX_EDGES;

	                        for (var i = 0; i < vertexArr.length; i++) {

	                                var vtx = vertexArr[i];

	                                var edgeNum = vtx.fEdges.length;

	                                var loopNum = 0;

	                                // Set up an array that stores found close Vertex - so we don't keep grabbing the same one

	                                var ignore = [];

	                                while (edgeNum <= MAX_EDGES && loopNum < MAX_LOOPS) {

	                                        if (loopNum >= MAX_LOOPS) {

	                                                console.error('computeMeshEdges: too many loops trying to find close neighbors for:' + vtx.idx + ' at position:' + i);

	                                                break;
	                                        }

	                                        if (edgeNum < MAX_EDGES) {

	                                                // Find the closest Vertex, ignoring ones we already have in our Edge list.

	                                                var closest = vtx.getNeighborVertex(vertexArr, ignore);

	                                                console.log('computeMeshEdges: for vtx:' + vtx.idx + ' the closest vertex is:' + closest.idx);

	                                                // Set the Vertex we found so we ignore it on the next loop

	                                                ignore.push(closest);

	                                                // Apply any non-duplicate Edges to our Vertex

	                                                vtx.setEdges(closest.fEdges, 0); // TODO: ignore edges that come too close to an Edge vertex of this vtx

	                                                vtx.setEdges(closest.oEdges, 1); // TODO: ignore Edges that come too close to an Edge vertex of this vtx.
	                                        } else {

	                                                break;
	                                        }

	                                        if (vtx.oEdges.length < MAX_EDGES) {}

	                                        edgeNum = vtx.fEdges.length;

	                                        loopNum++;

	                                        console.log('computeMeshEdges: for vtx:' + vtx.idx + ' fEdge num:' + edgeNum);
	                                }
	                        } // end of loop through entire Vertex array


	                        console.log('-------------- COMPLETE-----------------');
	                }

	                /** 
	                 * Find Vertex objects with undefined nearest neighbors. If we have a mesh with 
	                 * Edges that wraps into an object, some of these are probably very near each 
	                 * other. Need to run after geometryToVertex.
	                 * Assume:
	                 * Each Vertex should have 6 nearest neighbors
	                 * Each Vertex should have a previous and next Vertex.
	                 * @param {Array[Vertex]} vertexArr the array of Vertices
	                 * @returns {Object} a list of Vertex objects, sorted by the number of neighbors they are missing.
	                 */

	        }, {
	                key: 'getMeshEdges',
	                value: function getMeshEdges(vertexArr) {

	                        var edgeList = {

	                                fEdges: [[], [], [], [], [], [], []],

	                                oEdges: [[], [], [], [], [], [], []]

	                        };

	                        // Check for prev and next

	                        for (var i = 0; i < vertexArr.length; i++) {

	                                var v = vertexArr[i];

	                                // fEdges (forward edges)

	                                //console.log('fEdges length:'+ v.fEdges.length)

	                                //console.log( typeof edgeList.fEdges[ v.fEdges.length - 1 ] )

	                                //console.log( typeof edgeList.fEdges[ v.fEdges.length - 1 ].push )

	                                var pos = parseInt(v.fEdges.length);

	                                edgeList.fEdges[pos].push(v);

	                                // oEdges (reverse edges)

	                                pos = parseInt(v.oEdges.length);

	                                edgeList.oEdges[v.oEdges.length - 1].push(v);
	                        }

	                        return edgeList;
	                }

	                /** 
	                 * Recalculate indices on a mesh
	                 */

	        }, {
	                key: 'reIndexMesh',
	                value: function reIndexMesh(mesh) {}

	                /** 
	                 * Validate a mesh structure
	                 */

	        }, {
	                key: 'validateMesh',
	                value: function validateMesh(mesh) {

	                        var vertexArr = mesh.vertexArr;

	                        // confirm that each vertex has 6 edges, and not redundant.

	                        for (var i = 0; i < vertexArr.length; i++) {

	                                var vtx = vertexArr[i];

	                                // number test

	                                if (vtx.fEdges.length !== 6) {

	                                        console.error('validateMesh: vtx:' + vtx.idx + ', fEdges ' + vtx.idx + ' has ' + vtx.fEdges.length + ' edges');
	                                }

	                                if (vtx.oEdges.length !== 6) {

	                                        console.error('validateMesh: vtx:' + vtx.idx + ', oEdges ' + vtx.idx + ' has ' + vtx.oEdges.length + ' edges');
	                                }

	                                // identical test, forward edges ( our Vertex is 1st going counter-clockwise )

	                                for (var j = 0; j < vtx.fEdges.length; j++) {

	                                        var f1 = vtx.fEdges[j];

	                                        for (var k = 0; k < vtx.fEdges.length; k++) {

	                                                var f2 = vtx.fEdges[k];

	                                                if (j !== k && f1 === f2) {
	                                                        // avoid self-compare

	                                                        console.error('validateMesh: duplicate Edge entry for vtx:' + vtx.idx + ', ' + f1.idx + ' at:' + j + ' compared to ' + f2.idx + ' at ' + k);
	                                                }
	                                        }
	                                }
	                        }

	                        var indexArr = mesh.indexArr;

	                        var triArr = mesh.triArr;

	                        var quadArr = mesh.quadArr;
	                }

	                /** 
	                 * Convert our native flatted geometric data (see Prim) to a Vertex object 
	                 * data representation suitable for subdivision and morphing.
	                 */

	        }, {
	                key: 'geometryToVertex',
	                value: function geometryToVertex(vertices, indices, texCoords) {

	                        var i = 0;

	                        console.log("ORIGINAL VERTICES LENGTH:" + vertices.length + " reduced:" + vertices.length / 3);

	                        console.log("ORIGINAL INDICES LENGTH:" + indices.length);

	                        var numVertices = vertices.length / 3;

	                        var vertexArr = new Array(numVertices);

	                        var indexArr = indices.slice(0);

	                        var numIndices = indexArr.length;

	                        var vi = 0,
	                            ti = 0;

	                        // Convert flattend coordinates to Vertex objects.

	                        for (i = 0; i < numVertices; i++) {

	                                vertexArr[i] = new _vertex2.default(vertices[vi++], vertices[vi++], vertices[vi++], texCoords[ti++], texCoords[ti++], vertexArr, i);
	                        }

	                        // Compute Edges, Triangles, Quads from the index array
	                        /*  
	                         * create Edges, referring to vertices.
	                         *
	                            Mk   = refined mesh
	                            Mk-1 = coarse mesh
	                            one simple solution is to store the edges vertices in Mk in a hash table. To look up the index for a given 
	                            "edge" vertex in Mk-1, we query the hash table with the indices of the endpoints of the edge
	                            in Mk-1, containing the "edge" vertex. If the table entry is uninitialized, the vertex is assigned a new 
	                            index and that index is stored in the hash table. Otherwise, the hash table returns the previously stored 
	                            index for the edge vertex. A global counter can be used to assigned new indices and keep track of the 
	                            total number of vertices.
	                        */

	                        // Edge hash

	                        // Diagram: https://fgiesen.wordpress.com/2012/02/21/half-edge-based-mesh-representations-theory/

	                        var edgeArr = [];

	                        window.edgeArr = edgeArr;

	                        var k1 = void 0,
	                            k2 = void 0,
	                            k3 = void 0,
	                            key = void 0,
	                            revKey = void 0,
	                            pKey = void 0,
	                            nKey = void 0,
	                            spacer = '-';

	                        for (var _i = 0; _i < numIndices - 1; _i++) {

	                                k1 = _i;

	                                k2 = _i + 1;

	                                key = k1 + spacer + k2;

	                                revKey = k2 + spacer + k1;

	                                var e = new _edge2.default(indexArr[k1], indexArr[k2], vertexArr);

	                                // Define Edges in both directions (10->11 and 11->10) but point to same Edge object.

	                                edgeArr[key] = e; // clockwise

	                                edgeArr[revKey] = e; // counter-clockwise

	                                // Define next in last Edge, prev in this Edge

	                                if (_i > 0) {

	                                        k1 = _i - 1;

	                                        k2 = _i;

	                                        pKey = k1 + spacer + k2;

	                                        edgeArr[pKey].nextEdge = edgeArr[key]; // last Vertex of this Edge shared with first Vertex of next Edge

	                                        edgeArr[key].prevEdge = edgeArr[pKey]; // first Vertex of this Edge shared with last Vertex of previous Edge
	                                }
	                        }

	                        // Define Tris

	                        var triArr = [];

	                        window.triArr = triArr;

	                        for (var _i2 = 0; _i2 < numIndices - 2; _i2 += 2) {

	                                k1 = _i2;

	                                k2 = _i2 + 1;

	                                k3 = _i2 + 2;

	                                key = k1 + spacer + k2 + spacer + k3;

	                                /////////////////////console.log("tri key:" + key)

	                                var t = new _tri2.default(indexArr[_i2], indexArr[_i2 + 1], indexArr[_i2 + 2], vertexArr);

	                                triArr[key] = t;

	                                // set edges, clockwise read

	                                t.setEdge(edgeArr[k1 + spacer + k2], 0);

	                                t.setEdge(edgeArr[k2 + spacer + k3], 0);

	                                t.setEdge(edgeArr[k3 + spacer + k1], 0);

	                                // counter-clockwise read

	                                t.setEdge(edgeArr[k2 + spacer + k1], 1);

	                                t.setEdge(edgeArr[k1 + spacer + k2], 1);

	                                t.setEdge(edgeArr[k1 + spacer + k3], 1);
	                        }

	                        // Define prev and next Tris

	                        console.log("beginning prev and next Tris...");

	                        for (var _i3 = 0; _i3 < numIndices - 2; _i3 += 2) {

	                                if (_i3 > 0) {

	                                        k1 = _i3;

	                                        k2 = _i3 + 1;

	                                        k3 = _i3 + 2;

	                                        key = k1 + spacer + k2 + spacer + k3;

	                                        k1 = _i3 - 2;

	                                        k2 = _i3 - 1;

	                                        k3 = _i3;

	                                        pKey = k1 + spacer + k2 + spacer + k3;

	                                        triArr[pKey].next = triArr[key];

	                                        triArr[key].prev = triArr[pKey];
	                                }
	                        }

	                        // Define quads

	                        var quadArr = [];

	                        // Find Vertex objects missing neighbors.

	                        var edgeMeshArr = this.getMeshEdges(vertexArr);

	                        //edgeMeshArr = this.computeMeshEdges( edgeMeshArr, vertexArr );
	                        edgeMeshArr = this.computeMeshEdges(vertexArr);

	                        window.edgeMeshArr = edgeMeshArr;

	                        // Give each Vertex a list of Edge, Face, and Quad indices (hash table)

	                        // Return a Mesh object (not all properties present yet).

	                        return new _mesh2.default(vertexArr, indexArr, edgeArr, triArr, quadArr, edgeMeshArr);
	                }

	                /** 
	                 * Convert an array of Vertex objects back to our native 
	                 * flattened data representation.
	                 */

	        }, {
	                key: 'vertexToGeometry',
	                value: function vertexToGeometry(vertexArr, indexArr) {

	                        var vertices = new Array(vertexArr.length * 3);

	                        var indices = new Array(indexArr.length * 3);

	                        var texCoords = new Array(vertexArr.length * 2);

	                        for (var i = 0; i < vertexArr.length; i++) {

	                                var vi = i * 3;

	                                var ti = i * 2;

	                                var c = vertexArr[i].coords;

	                                var t = vertexArr[i].texCoords;

	                                // Recover and flatten coordinate values

	                                vertices[vi] = c.x;

	                                vertices[vi + 1] = c.y;

	                                vertices[vi + 2] = c.z;

	                                // Recover and flatten texture coordinate values

	                                texCoords[ti] = t.u;

	                                texCoords[ti + 1] = t.v;
	                        }

	                        // flatten index array, taking Vertex Position, multiply by 3, add extra coordinates

	                        var idx = 0;

	                        for (var _i4 = 0; _i4 < indexArr.length; _i4++) {

	                                var iStart = _i4 * 3;

	                                indices[idx++] = indexArr[iStart++];

	                                indices[idx++] = indexArr[iStart++];

	                                indices[idx++] = indexArr[iStart];
	                        }

	                        // We aren't exporting a true Geometry, just some of its arrays

	                        return {

	                                vertices: vertices,

	                                indices: indexArr,

	                                texCoords: texCoords

	                        };
	                }

	                /** 
	                 * Subdivide a mesh, optionally adding data structures for 
	                 * smoothing after the subdivision. 
	                 * @link https://graphics.stanford.edu/~mdfisher/Code/Engine/BaseMeshIndexing.cpp.html
	                 * 
	                 * a) the mesh is converted to a 
	                 * a) the mesh is converted to a set of quads, with appropriate indices. 
	                 * b) the set of quads had ned points added
	                 * c) indices are re-computed.
	                 * @param{Array[Vertex]} a Vertex Array
	                 */

	        }, {
	                key: 'subdivideMesh',
	                value: function subdivideMesh(mesh) {

	                        // Find all the triangles


	                        return mesh;
	                }

	                /** 
	                 * Given a mesh, compute a power of two subdivision using the loop algorithm.
	                 */

	        }, {
	                key: 'smoothLoop',
	                value: function smoothLoop(mesh) {

	                        var submesh = {};

	                        return mesh;
	                }

	                /** 
	                 * Compute a loop subdivision of a mesh
	                 */

	        }, {
	                key: 'computeSubdivide',
	                value: function computeSubdivide(vertices, indices, texCoords, smooth) {

	                        var mesh = this.geometryToVertex(vertices, indices, texCoords);

	                        window.mesh = mesh;

	                        window.vtx = mesh.vertexArr;
	                        window.idx = mesh.indexArr;

	                        console.log("+++++++++++++++ VALIDATING +++++++++++++++++++++");
	                        this.validateMesh(mesh);
	                        console.log(" ++++++++++++++++ COMPLETE ++++++++++++++++++++++");

	                        mesh = this.subdivideMesh(mesh);

	                        if (smooth) {

	                                mesh = this.smoothLoop(mesh);
	                        }

	                        var divided = this.vertexToGeometry(mesh.vertexArr, mesh.indexArr);

	                        window.vertices = vertices;
	                        window.indices = indices;
	                        window.vertices2 = divided.vertices;
	                        window.indices2 = divided.indices;
	                        window.texCoords = texCoords;
	                        window.texCoords2 = divided.texCoords;

	                        // Test vertices

	                        for (var i = 0; i < vertices.length; i++) {
	                                if (vertices[i] !== vertices2[i]) {
	                                        console.error("invalid vertices subdivide");
	                                }
	                        }

	                        // test texture coords

	                        for (var _i5 = 0; _i5 < texCoords.length; _i5++) {
	                                if (texCoords[_i5] !== texCoords2[_i5]) {
	                                        console.error("invalid texcoord subdivide");
	                                }
	                        }

	                        return divided;
	                }

	                /** 
	                 * Compute a simplification of a loop mesh.
	                 */

	        }, {
	                key: 'computeUndivide',
	                value: function computeUndivide(vertices, indices, texCoords, smooth) {

	                        console.error('computeUndivide not implemented');
	                }

	                /** 
	                 * Convert from one Prim geometry to another, alters geometry.
	                 */

	        }, {
	                key: 'computeMorph',
	                value: function computeMorph(geometry1, geometry2) {

	                        console.error('computeMorph not implemented');
	                }
	        }]);

	        return Morph;
	}();

	exports.default = Morph;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** 
	 * Create a class for manipulating 3d data, including texture 
	 * coordinates and normals. We don't use glMatrix since the 
	 * calculations here are faster if done locally.
	 */
	var Coords = function () {

	        /**
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
	         * @returns {Boolen} all all 3 coordinates are defined, return true, else false
	         */


	        _createClass(Coords, [{
	                key: "isValid",
	                value: function isValid() {

	                        return Number.isFinite(parseFloat(this.x)) && Number.isFinte(parseFloat(this.y)) && Number.isFinite(parseFloat(this.z));
	                }

	                /** 
	                 * Overwrite coordinate values.
	                 * @param {Number} x the x or 0 coordinate
	                 * @param {Number} y the y or 1 coordinate
	                 * @param {Number} z the z or 2 coordinate
	                 */

	        }, {
	                key: "set",
	                value: function set(x, y, z) {

	                        if (x !== undefined) this.x = x;

	                        if (y !== undefined) this.y = y;

	                        if (z !== undefined) this.z = z;
	                }

	                /**
	                 * Return a new copy of this Coords
	                 * @returns {Coords} a copy of the current coordinates.
	                 */

	        }, {
	                key: "clone",
	                value: function clone() {

	                        return new Coords(this.x, this.y, this.z);
	                }

	                /** 
	                 * Determine if two Coords are the same object (not same values)
	                 */

	        }, {
	                key: "isEqual",
	                value: function isEqual(other) {

	                        if (other === this) {

	                                return true;
	                        }

	                        return false;
	                }

	                /** 
	                 * Add a Coordinate position to this coordinate (vector addition)
	                 * @param {Coord} other the coordinate position to add.
	                 * @returns {Coord} this Coord, added.
	                 */

	        }, {
	                key: "add",
	                value: function add(other) {

	                        this.x += other.x;

	                        this.y += other.y;

	                        this.z += other.z;

	                        return this;
	                }

	                /** 
	                 * Subtract a Coordinate position from this coordinate (vector addition)
	                 * @param {Coord} other the coordinate position to subtract.
	                 * @returns {Coord} this Coord, subtracted.
	                 */

	        }, {
	                key: "subtract",
	                value: function subtract(other) {

	                        this.x -= other.x;

	                        this.y -= other.y;

	                        this.z -= other.z;

	                        return this;
	                }

	                /** 
	                 * Multiply the value of this Coordinate by a number
	                 * @param {Number} scalar the number to multiply by.
	                 * @returns {Coords} this Coords, scaled.
	                 */

	        }, {
	                key: "multiplyScalar",
	                value: function multiplyScalar(scalar) {

	                        this.x *= scalar;

	                        this.y *= scalar;

	                        this.z *= scalar;

	                        return this;
	                }

	                /** 
	                 * Divice the value of this Coordinate by a number
	                 * @param {Number} scalar the number to divide by.
	                 * @returns {Coords} this Coords, scaled.
	                 */

	        }, {
	                key: "divideScalar",
	                value: function divideScalar(scalar) {

	                        this.x /= scalar;

	                        this.y /= scalar;

	                        this.z /= scalar;

	                        return this;
	                }
	        }, {
	                key: "distance",
	                value: function distance(other) {

	                        var dx = this.x - other.x;

	                        var dy = this.y - other.y;

	                        var dz = this.z - other.z;

	                        return Math.sqrt(dx * dx + dy * dy + dz * dz);
	                }

	                /** 
	                 * Return the length of this Coord.
	                 * @returns {Number} the length of this Coord.
	                 */

	        }, {
	                key: "magnitude",
	                value: function magnitude() {

	                        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	                }

	                /** 
	                 * Convert this Coords to its normalized form.
	                 * @returns {Coords} this Coords, normalized.
	                 */

	        }, {
	                key: "normalize",
	                value: function normalize() {

	                        return this.divideScalar(this.magnitude());
	                }

	                /** 
	                 * Return a new Coords with averaged value of this and another Coords.
	                 * @param {Coords} other the Coords to average with.
	                 * @returns {Coords} a new Coords which is the average for this and the other Coords
	                 */

	        }, {
	                key: "average",
	                value: function average(other) {

	                        return this.clone().this.add(other).this.divideScalar(0.5);
	                }

	                /** 
	                 * Return a new Coords which is the cross product of this and another Coords.
	                 * @param {Coords} other the other Coords to average with.
	                 * @returns {Coords} a new Coords which is the dot product for this and the other Coords.
	                 */

	        }, {
	                key: "crossProduct",
	                value: function crossProduct(other) {

	                        return new Coords(this.y * other.z - other.y * this.z, other.x * this.z - this.x * other.z, this.x * other.y - other.x * this.y);
	                }

	                /** 
	                 * Return the cross product of this Coord and another Coords.
	                 * @param {Coords} other the Coords to compute the dot product with.
	                 * @returns {Number} the dot product.
	                 */

	        }, {
	                key: "dotProduct",
	                value: function dotProduct(other) {

	                        return this.x * other.x + this.y * other.y + this.z * other.z;
	                }
	        }]);

	        return Coords;
	}();

	exports.default = Coords;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Create a Vertex class suitable for complex manipulatio of mesh objects, 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * e.g. subdivision or morphing
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _coords = __webpack_require__(25);

	var _coords2 = _interopRequireDefault(_coords);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vertex = function () {

	        /** 
	         * @constructor
	         * @param {Number} x the x, or 0 coordinate
	         * @param {Number} y the y, or 1 coordinate
	         * @param {Number} z the z, or 2 coordinate
	         * @param {Number} u the u, or 0 texture coordinate
	         * @param {Number} v the v, or 1 texture coordinate
	         * @param {Array[Vertex]} vertexArr the parent Vertex array
	         * @param {Number} i1 the name/index of this Vertex
	         */
	        function Vertex() {
	                var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	                var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	                var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	                var u = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	                var v = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
	                var vertexArr = arguments[5];
	                var i1 = arguments[6];

	                _classCallCheck(this, Vertex);

	                //console.log("x:" + x + " y:" + y + " z:" + z)

	                this.MAX_EDGES = 6;

	                this.coords = new _coords2.default(x, y, z);

	                this.texCoords = { u: u, v: v };

	                // Save the parent array with all vertices.

	                this.vertexArr = vertexArr;

	                // Hash
	                // forward with our drawing (counter-clockwise), we are the first Vertex in the Edge.

	                this.fEdges = [];

	                // backwards, we are the second Vertex in the Edge.

	                this.oEdges = [];

	                this.prevEdge = null;

	                this.nextEdge = null;

	                this.tris = [];

	                this.quads = [];

	                this.idx = i1;
	        }

	        _createClass(Vertex, [{
	                key: 'valid',
	                value: function valid() {

	                        if (this.coords.isValid()) {

	                                return true;
	                        }

	                        return false;
	                }

	                /** 
	                 * check if this Vertex is in a supplied array.
	                 * @param {Array[Vertex]} vertexArr an array of Vertex objects.
	                 * @returns {Boolean} if we are in the supplied array, return true, else false.
	                 */

	        }, {
	                key: 'inList',
	                value: function inList(vertexArr) {

	                        if (vertexArr.indexOf(this) === -1) {

	                                return false;
	                        }

	                        return true;
	                }

	                /**
	                 * Check if an Edge is already in our Edge list.
	                 * @param {Edge} edge the Edge to test.
	                 * @param {Number} direction if 0, use this.fEdges, else use this.oEdges
	                 * @retruns {Boolean} if edge is in the array return true, else false.
	                 */

	        }, {
	                key: 'inEdgeList',
	                value: function inEdgeList(edge) {
	                        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


	                        switch (direction) {

	                                case 0:

	                                        if (this.fEdges.indexOf(edge) !== -1) {

	                                                return true;
	                                        }

	                                        break;

	                                case 1:

	                                        if (this.oEdges.indexOf(edge)) {

	                                                return true;
	                                        }

	                                        break;

	                                default:

	                                        break;

	                        }

	                        return false;
	                }

	                /** 
	                 * Given a supplied Vertex, determined if we are attached to it 
	                 * by our Edge array.
	                 * @param {Vertex} vtx the Vertex to test
	                 * @param {Number}
	                 * @returns 
	                 */

	        }, {
	                key: 'isAttachedByEdge',
	                value: function isAttachedByEdge(vtx) {
	                        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


	                        switch (direction) {

	                                case 0:

	                                        for (var i = 0; i < this.fEdges.length; i++) {

	                                                if (vtx === this.fEdges[i].v2) {

	                                                        //console.log( 'isAttachedByEdge:' + this.idx + ' already attached to:' + this.fEdges[ i ].v2.idx );

	                                                        return true;
	                                                }
	                                        }

	                                        break;

	                                case 1:

	                                        for (var _i = 0; _i < this.oEdges.length; _i++) {

	                                                if (vtx === this.oEdges[_i].v1) {

	                                                        return true;
	                                                }
	                                        }

	                                        break;

	                                default:

	                                        break;

	                        }

	                        //console.log( 'isAttachedByEdge:' + this.idx + ' NOT attached to new Edge:' + vtx.idx );

	                        return false;
	                }

	                /** 
	                 * Given an array of Vertex objects, return the closest Vertex 
	                 * which is NOT already in our attached Edge array.
	                 * @param {Array[Vertex]} vertexArray the list of Vertex objects to scan
	                 * @param {Array[Vertex]} ignoreArr the array with neighbors we ignore, e.g. because 
	                 * we have already found them in the past.
	                 * @param {Number} direction if 0, search vtx.fEdges, else search vtx.oEdges
	                 */

	        }, {
	                key: 'getNeighborVertex',
	                value: function getNeighborVertex(vertexArr, ignoreArr) {
	                        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


	                        var dist = 100000; // huge distance to start

	                        var closest = null;

	                        for (var i = 0; i < vertexArr.length; i++) {

	                                // Check our Edges and make sure we aren't already attached to the text Vertex via an Edge in our list.

	                                var vtx = vertexArr[i];

	                                if (this === vtx || this.isAttachedByEdge(vtx, direction)) {

	                                        continue;
	                                } else if (ignoreArr.indexOf(vtx) === -1 && this !== vtx) {

	                                        var d = this.coords.distance(vtx.coords);

	                                        if (d < dist) {

	                                                closest = vtx;

	                                                dist = d;
	                                        }
	                                }
	                        }

	                        return closest;
	                }

	                /** 
	                 * Set the position coordinates of the Vertex.
	                 * @param {Number} x the x, or 0 coordinate
	                 * @param {Number} y the y, or 1 coordinate
	                 * @param {Number} z the z, or 2 coordinate
	                 */

	        }, {
	                key: 'setCoords',
	                value: function setCoords() {
	                        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	                        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	                        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


	                        this.coords.set(x, y, z);

	                        return this;
	                }

	                /**
	                 * Set the texture coordinates of the Vertex.
	                 * @param {Number} u the u, or 0 texture coordinate
	                 * @param {Number} v the v, or 1 texture coordinate
	                 */

	        }, {
	                key: 'setTexCoords',
	                value: function setTexCoords() {
	                        var u = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	                        var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


	                        this.u = u;

	                        this.v = v;

	                        return this;
	                }

	                /** 
	                 * Set Edges this Vertex is associated, with, 
	                 * returning any duplicates
	                 */

	        }, {
	                key: 'setEdges',
	                value: function setEdges(edgeArr) {
	                        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


	                        var duplicates = [];

	                        for (var i = 0; i < edgeArr.length; i++) {

	                                var duplicate = this.setEdge(edgeArr[i], direction);

	                                if (duplicate) {

	                                        duplicates.push(duplicate);
	                                }
	                        }

	                        return duplicates;
	                }

	                /** 
	                 * Set the Edges this Vertex is associated with.
	                 * @param {Edge} edge a 'parent' Edge containing this Vertex
	                 * @param {Number} the Edges array to use (assuming we always 
	                 * move counterclockwise).
	                 *  - direction = 0; push to fEdges
	                 *  - direction = 1; push to oEdges
	                 */

	        }, {
	                key: 'setEdge',
	                value: function setEdge(edge) {
	                        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


	                        switch (direction) {

	                                case 0:

	                                        if (edge.inList(this.fEdges)) {

	                                                return edge;
	                                        } else {

	                                                this.fEdges.push(edge);

	                                                return false;
	                                        }

	                                        break;

	                                case 1:

	                                        if (edge.inList(this.oEdges)) {

	                                                return edge; // NOT rejected, NOT a duplicate
	                                        } else {

	                                                this.oEdges.push(edge);

	                                                return false;
	                                        }

	                                        break;

	                                default:

	                                        console.error('Vertex.setEdge: unrecognized Edge Array ' + direction);

	                                        return false;

	                                        break;

	                        }
	                }

	                /** 
	                 * Set the Tris this Vertex is associated with.
	                 * @param {Tri} tri a 'parent' Triangle containing this Vertex
	                 * @param {Number} direction the position in the Triangle (assuming we always 
	                 * move counterclockwise).
	                 */

	        }, {
	                key: 'setTri',
	                value: function setTri(tri) {

	                        if (!tri.inList(this.tris)) {

	                                this.tris.push(tri);
	                        }
	                }

	                /** 
	                 * Return a new Vertex which have averaged position and 
	                 * averaged texture coordinate
	                 * @param {Vertex} other the Vertex to average with
	                 */

	        }, {
	                key: 'average',
	                value: function average(other) {

	                        var v = this.clone();

	                        v.coords = v.coords.average(other.coords);

	                        v.texCoords = {

	                                u: this.texCoords.u + other.texCoords.u / 2,

	                                v: this.texCoords.v + other.texCoords.v / 2

	                        };

	                        return v;
	                }

	                /**
	                 * Return a new copy of this Vertex
	                 * @returns {Vertex} a copy of the current vertex
	                 */

	        }, {
	                key: 'clone',
	                value: function clone() {

	                        return new Vertex(this.x, this.y, this.z, this.u, this.v, this.vertexArr);
	                }
	        }]);

	        return Vertex;
	}();

	exports.default = Vertex;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Edge of a face in a mesh.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _vertex = __webpack_require__(26);

	var _vertex2 = _interopRequireDefault(_vertex);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Edge = function () {

	        /** 
	         * @constructor
	         * @param {Number} i1 the first Vertex (counter-clockwise) in the Edge.
	         * @param {Number} i2 the second Vertex (counter-clockwise) in the Edge.
	         * @param {Array[Vertex]} vertexArr the parent Vertex array.
	         */
	        function Edge(i1, i2, vertexArr) {
	                _classCallCheck(this, Edge);

	                this.i1 = i1;

	                this.i2 = i2;

	                this.v1 = vertexArr[i1]; // first Vertex encountered, moving clockwise

	                this.v2 = vertexArr[i2]; // second Vertex encountered, moving clockwise

	                if (!this.valid()) {

	                        console.error('Edge error: i1=' + i1 + ' i2:' + i2 + ' v1:' + v1 + ' v2:' + v2);
	                }

	                // Let the vertices know they START this edge (forward, clockwise)

	                this.v1.setEdge(this, 0);

	                // NOTE: setting the second point = 12 connections (degenerate)
	                // NOTE: max of 6 connections, sometimes less.
	                // NOTE: backward, counter-clockwise

	                this.v2.setEdge(this, 1);

	                // Save a reference to the overall Vertex array

	                this.vertexArr = vertexArr;

	                // Previous and next Edges

	                this.prev = null;

	                this.next = null;

	                this.idx = i1 + '-' + i2;
	        }

	        _createClass(Edge, [{
	                key: 'valid',
	                value: function valid() {

	                        if (this.v1 && this.v2) {

	                                return true;
	                        }

	                        return false;
	                }

	                /** 
	                 * check if this Edge is in a supplied array.
	                 * @param {Array[Edge]} edgeArr an array of Vertex objects.
	                 * @returns {Boolean} if we are in the supplied array, return true, else false.
	                 */

	        }, {
	                key: 'inList',
	                value: function inList(edgeArr) {

	                        if (edgeArr.indexOf(this) === -1) {

	                                return false;
	                        }

	                        return true;
	                }

	                /** 
	                 * Determine if a Vertex is part of this Edge.
	                 */

	        }, {
	                key: 'hasVertex',
	                value: function hasVertex(otherVertex) {

	                        if (this.v1 === otherVertex.v1 || this.v2 === otherVertex.v2) {

	                                return true;
	                        }

	                        return false;
	                }

	                /** 
	                 * Determine if two Edges share the same Coords (object reference, not value).
	                 * @param {Edge} other another Edge object
	                 * @param {Boolen} sameWind if set to true, objects have to have the same Coords 
	                 * in the same order. Otherwise, a--b is equivalent to b--a, which is common in 
	                 * indices referencing a set of Vertex objects.
	                 * @returns {Boolean} if shared Coords, return True, else false
	                 */

	        }, {
	                key: 'isEqual',
	                value: function isEqual(other) {
	                        var sameWind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


	                        // Equal, and in same order 
	                        if (this.v1 === other.v1 && this.v2 === other.v2) {

	                                return true;
	                        } else if (sameWind === false) {

	                                if (this.hasVertex(other.v1) && this.hasVertex(other.v2)) {

	                                        return true;
	                                }
	                        }

	                        return false;
	                }

	                /**
	                 * Compute midpoint of the two Vertex objects
	                 * @returns{Vertex} this midpoint for position AND texture coordiantes.
	                 */

	        }, {
	                key: 'midPoint',
	                value: function midPoint() {

	                        // compute average texture coordinate

	                        return this.v1.clone().average(this.v2);
	                }

	                /** 
	                 * Clone the Edge, optionally reversing the vertex order
	                 * @param {Boolean} flip if true, reverse Vertex order.
	                 */

	        }, {
	                key: 'clone',
	                value: function clone(flip) {

	                        if (flip) {

	                                return new Edge(this.vertexArr[this.i2], this.vertexArr[this.i1], this.vertexArr);
	                        } else {

	                                return new Edge(this.vertexArr[this.i1], this.vertexArr[this.i2], this.vertexArr);
	                        }
	                }
	        }]);

	        return Edge;
	}();

	exports.default = Edge;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * A face (typically a triangle) in a Vertex mesh.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _vertex = __webpack_require__(26);

	var _vertex2 = _interopRequireDefault(_vertex);

	var _edge = __webpack_require__(27);

	var _edge2 = _interopRequireDefault(_edge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tri = function () {

	        /** 
	         * @constructor
	         * @param {Number} i1 the first index for a Vertex (counter-clockwise) in the Vertex array.
	         * @param {Number} i2 the second index for a Vertex (counter-clockwise) in the Vertex array.
	         * @param {Number} i3 the third index for a Vertex (counter-clockwise) in the Vertex array.
	         * @param {Array[Vertex]} vertexArr the parent Vertex array.
	         */
	        function Tri(i1, i2, i3, vertexArr) {
	                _classCallCheck(this, Tri);

	                // Reading order i1, i2, i3, counter-clockwise

	                this.i1 = i1;

	                this.i2 = i2;

	                this.i3 = i3;

	                // Store Vertex

	                this.v1 = vertexArr[i1];

	                this.v2 = vertexArr[i2];

	                this.v3 = vertexArr[i3];

	                // Let the Vertex objects know they are part of this Tri.

	                this.v1.setTri(this);

	                this.v2.setTri(this);

	                this.v3.setTri(this);

	                // Store Edges

	                this.fEdges = [];

	                this.oEdges = [];

	                // NOTE: Edges are implicity defined as v1-v2, v2-v3, v3-v1

	                this.idx = i1 + '-' + i2 + '-' + i3;

	                // Store previous and next triangle

	                this.prev = null;

	                this.next = null;
	        }

	        _createClass(Tri, [{
	                key: 'valid',
	                value: function valid() {

	                        if (this.v1 && this.v2 && this.v3) {

	                                return true;
	                        }

	                        return false;
	                }

	                /** 
	                 * check if this Tri is in a supplied array.
	                 * @param {Array[Tri]} triArr an array of Tri objects.
	                 * @returns {Boolean} if we are in the supplied array, return true, else false.
	                 */

	        }, {
	                key: 'inList',
	                value: function inList(triArr) {

	                        if (triArr.indexOf(this) === -1) {

	                                return false;
	                        }

	                        return true;
	                }

	                /** 
	                 * Check if this tri contains a specific Vertex
	                 */

	        }, {
	                key: 'hasVertex',
	                value: function hasVertex(otherVertex) {

	                        if (this.v1 === otherVertex || this.v2 === otherVertex || this.v3 === otherVertex) {

	                                return true;
	                        }

	                        return false;
	                }

	                /**
	                 * Check if this tri contains a specific Edge
	                 */

	        }, {
	                key: 'hasEdge',
	                value: function hasEdge(otherEdge) {
	                        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


	                        switch (direction) {

	                                case 0:

	                                        if (this.fEdges.indexOf(otherEdge) === -1) {

	                                                return false;
	                                        }

	                                        break;

	                                case 1:

	                                        if (this.oEdges.indexOf(otherEdge) === -1) {

	                                                return false;
	                                        }

	                                        break;

	                                default:

	                                        break;

	                        }

	                        return true;
	                }

	                /** 
	                 * Set the Edges this Tri is associated with.
	                 * @param {Edge} edge a 'parent' Edge containing this Vertex
	                 * @param {Number} direction the position in the Edge (assuming we always 
	                 * move counterclockwise).
	                 */

	        }, {
	                key: 'setEdge',
	                value: function setEdge(edge) {
	                        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


	                        switch (direction) {

	                                case 0:

	                                        if (this.fEdges.indexOf(edge) === -1) {

	                                                this.fEdges.push(edge); // counter-clockwise

	                                                return true;
	                                        }

	                                        break;

	                                case 1:

	                                        if (this.oEdges.indexOf(edge) === -1) {

	                                                this.oEdges.push(edge); // clockwise

	                                                return true;
	                                        }

	                                        break;

	                                default:

	                                        console.error('error when setting Edge in Vertex, ' + direction);

	                                        break;

	                        }

	                        return false;
	                }

	                /** 
	                 * Determine if two Tris have the same vertices.
	                 */

	        }, {
	                key: 'isEqual',
	                value: function isEqual(other) {
	                        var sameWind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


	                        if (this.v1 === other.v1 && this.v2 === other.v2 && this.v3 === other.v3) {

	                                return true;
	                        } else if (sameWind === false) {}
	                }

	                /** 
	                 * Returns a new Vertex, the averaged point (centroid) for a triangle = Face
	                 * @returns {Vertex} the averaged, or centroid point of the 3 points in this Face.
	                 */

	        }, {
	                key: 'midPoint',
	                value: function midPoint() {

	                        return this.v1.clone().average(this.v2).average(this.v3);
	                }

	                /** 
	                 * Reverses the order of this Face between clockwise or counter-clockwise (default) 
	                 * winding.
	                 * @returns {Boolean} the winding, true = counter-clockwise, false = clockwise.
	                 */

	        }, {
	                key: 'flip',
	                value: function flip() {

	                        var p = this.v3;

	                        this.v3 = this.v1;

	                        this.v1 = p;

	                        if (this.ccw === true) this.ccw = false;else this.ccw = true;

	                        return this.ccw;
	                }
	        }]);

	        return Tri;
	}();

	exports.default = Tri;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * A face (typically a triangle) in a Vertex mesh
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _vertex = __webpack_require__(26);

	var _vertex2 = _interopRequireDefault(_vertex);

	var _tri = __webpack_require__(28);

	var _tri2 = _interopRequireDefault(_tri);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Quad = function () {

	        /** 
	         * @constructor
	         * @param {Number} i1 the first index for a Vertex (counter-clockwise) in the Vertex array.
	         * @param {Number} i2 the second index for a Vertex (counter-clockwise) in the Vertex array.
	         * @param {Number} i3 the third index for a Vertex (counter-clockwise) in the Vertex array.
	         * @param {Number} i4 the fourth index for a Vertex (counter-clockwise) in the Vertex array.
	         * @param {Array[Vertex]} vertexArr the parent Vertex array.
	         */
	        function Quad(i1, i2, i3, i4, vertexArr) {
	                _classCallCheck(this, Quad);

	                // Reading order: i1-i2,-i3, i1-i3-i4, counter-clockwise.

	                this.i1 = i1;

	                this.i2 = i2;

	                this.i3 = i3;

	                this.i4 = i4;

	                this.v1 = vertexArr[i1];

	                this.v2 = vertexArr[i2];

	                this.v3 = vertexArr[i3];

	                this.v4 = vertexArr[i4];

	                // NOTE: THIS IS WRONG. LOOK UP TRIS IN TRI ARRAY

	                this.t1 = new _tri2.default(i1, i2, i3, vertexArr);

	                this.t2 = new _tri2.default(i1, i2, i4, vertexArr);
	        }

	        _createClass(Quad, [{
	                key: 'hasVertex',
	                value: function hasVertex(otherVertex) {}
	        }, {
	                key: 'hasEdge',
	                value: function hasEdge(otherEdge) {
	                        var sameWind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	                }
	        }, {
	                key: 'hasTri',
	                value: function hasTri(otherTri) {
	                        var sameWind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	                }

	                /** 
	                 * Determine if two quads have the same vertices.
	                 */

	        }, {
	                key: 'isEqual',
	                value: function isEqual(other, sameWind) {}

	                /** 
	                 * Returns a new Vertex, the averaged point (centroid) for a triangle = Face
	                 * @returns {Vertex} the averaged, or centroid point of the 3 points in this Face.
	                 */

	        }, {
	                key: 'midPoint',
	                value: function midPoint() {

	                        return this.v1.clone().average(this.v2).average(this.v3).average(this.v4);
	                }

	                /** 
	                 * Reverses the order of this Face between clockwise or counter-clockwise (default) 
	                 * winding.
	                 * @returns {Boolean} the winding, true = counter-clockwise, false = clockwise.
	                 */

	        }, {
	                key: 'flip',
	                value: function flip() {

	                        var p = this.v1;

	                        this.v3 = this.v1;

	                        this.v1 = p;

	                        if (this.ccw === true) this.ccw = false;else this.ccw = true;

	                        return this.ccw;
	                }
	        }]);

	        return Quad;
	}();

	exports.default = Quad;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _vertex = __webpack_require__(26);

	var _vertex2 = _interopRequireDefault(_vertex);

	var _edge = __webpack_require__(27);

	var _edge2 = _interopRequireDefault(_edge);

	var _tri = __webpack_require__(28);

	var _tri2 = _interopRequireDefault(_tri);

	var _quad = __webpack_require__(29);

	var _quad2 = _interopRequireDefault(_quad);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /** 
	                                                                                                                                                           * A mesh object containing un-flattened references to vertices, indices, and 
	                                                                                                                                                           * texture coordinates, suitable for subdivision and other complex manipulations.
	                                                                                                                                                           */


	var Mesh = function Mesh() {
	        var vertexArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	        var indexArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	        var edgeArr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	        var triArr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
	        var quadArr = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

	        _classCallCheck(this, Mesh);

	        // reading order: i1, i2, i3, i1, i3, i4

	        this.vertexArr = vertexArr;

	        this.indexArr = indexArr;

	        this.triArr = triArr;

	        this.quadArr = quadArr;
	};

	exports.default = Mesh;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** 
	 * Loads objects and renderers and runs the rendering loop.
	 */
	var World = function () {

	        /** 
	         * The World class creates the scene, and should be uniquely 
	         * written for each instance using the WebVR-Mini library.
	         * Required functions:
	         * getVS() - the vertex shader.
	         * getFS() - get the fragment shader.
	         * rer() - update on rer of <canvas>.
	         * render() - rendering loop.
	         * init() - create the world for this first time.
	         * constructor() - initialize, passing in WebVR-Mini object.
	         * 
	         * TODO: add some standard world objects (e.g. 360 video player by default)
	         * @link https://github.com/flimshaw/Valiant360/blob/master/src/valiant.jquery.js
	         */

	        /** 
	         * constructor for World.
	         * @param {WebGL} webgl the webgl module.
	         * @param {Prim} prim the object/mesh primitives module.
	         * @param {Renderer} renderer the GLSL rendering module.
	         */
	        function World(webgl, prim, renderer) {
	                _classCallCheck(this, World);

	                console.log('in World class');

	                this.webgl = webgl;

	                this.util = webgl.util;

	                this.prim = prim;

	                this.renderer = renderer;

	                this.canvas = webgl.getCanvas();

	                this.glMatrix = webgl.glMatrix;

	                this.pMatrix = this.glMatrix.mat4.create();

	                this.mvMatrix = this.glMatrix.mat4.create();

	                this.last = performance.now();

	                this.counter = 0;

	                // Bind the render loop (best current method)

	                this.render = this.render.bind(this);
	        }

	        /**
	         * Handle resize event for the World dimensions.
	         * @param {Number} width world width (x-axis) in units.
	         * @param {Number} height world height (y-axis) in units.
	         * @param {Number} depth world depth (z-axis) in units.
	         */


	        _createClass(World, [{
	                key: 'resize',
	                value: function resize(width, height, depth) {}

	                /** 
	                 * Create the world. Load shader/renderer objects, and 
	                 * create objects to render in the world.
	                 */

	        }, {
	                key: 'init',
	                value: function init() {

	                        var vec3 = this.glMatrix.vec3;

	                        var vec4 = this.glMatrix.vec4;

	                        var vec5 = this.prim.vec5;

	                        var util = this.util;

	                        // TEXTURED SHADER.

	                        this.textureObjList = [];

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CUBE, 'first cube', // name
	                        vec5(1, 1, 1), // dimensions
	                        vec5(10, 10, 10, 0), // divisions, pass curving of edges as 4th parameter
	                        vec3.fromValues(1, 0, 2), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(1), util.degToRad(1), util.degToRad(1)), // angular velocity in x, y, x
	                        ['img/crate.png', 'img/webvr-logo1.png'], // texture image
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0)));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CUBE, 'toji cube', vec5(1, 1, 1, 0), // dimensions
	                        vec5(1, 1, 1, 0), // divisions, pass curving of edges as 4th parameter
	                        vec3.fromValues(5, 1, -3), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(40), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0), util.degToRad(1), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/webvr-logo2.png'], vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        // PRIMARY (BIG) SKYDOME

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.SKYDOME, 'SkyDome', vec5(18, 18, 18, 0), // dimensions
	                        vec5(10, 10, 10), // divisions MAKE SMALLER
	                        vec3.fromValues(0, 0, 0), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0.1), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/panorama_01.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.TORUS, 'torus2', vec5(1, 1, 0.5, 0), // dimensions (first is width along x, second  width along y, diameter of torus tube)
	                        vec5(9, 9, 9, 1), // divisions (first is number of rings, second is number of sides)
	                        vec3.fromValues(-1.8, 3, -3.5), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(20), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0), util.degToRad(1), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/uv-test.png'], // texture present, NOT USED
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.vs1 = this.renderer.shaderTexture.init(this.textureObjList);

	                        // COLORED SHADER.

	                        this.colorObjList = [];

	                        //this.colorObjList.push( this.prim.createPrim(
	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CUBE, 'colored cube', vec5(1, 1, 1, 0), // dimensions
	                        vec5(3, 3, 3), // divisions
	                        vec3.fromValues(0.2, 0.5, 3), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(20), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0), util.degToRad(1), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/webvr-logo3.png'], // texture present, NOT USED
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.vs2 = this.renderer.shaderColor.init(this.colorObjList);

	                        // LIT TEXTURE SHADER.

	                        this.dirlightTextureObjList = [];

	                        this.dirlightTextureObjList.push(this.prim.createPrim(this.prim.typeList.CUBE, 'lit cube', vec5(1, 1, 1, 0), // dimensions
	                        vec5(1, 1, 1), // divisions
	                        vec3.fromValues(-3, -2, -3), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(20), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0), util.degToRad(1), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/webvr-logo4.png'], // texture present, NOT USED
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.dirlightTextureObjList.push(this.prim.createPrim(this.prim.typeList.TERRAIN, 'terrain', vec5(2, 2, 44, this.prim.directions.TOP, 0.1), // NOTE: ORIENTATION DESIRED vec5[3], waterline = vec5[4]
	                        vec5(100, 100, 100), // divisions
	                        vec3.fromValues(1.5, -1.5, 2), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(1), util.degToRad(0), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/mozvr-logo1.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0), // color
	                        null //heightMap                       // heightmap
	                        ));

	                        ///////////////////////////
	                        // PLANE

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CURVEDINNERPLANE, 'CurvedPlane', vec5(2, 1, 1, this.prim.directions.FRONT, 1), // pass orientation ONE UNIT CURVE
	                        vec5(10, 10, 10), // divisions
	                        vec3.fromValues(-1, 0.0, 2.0), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.0), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/webvr-logo1.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CURVEDINNERPLANE, 'CurvedPlane', vec5(2, 1, 1, this.prim.directions.BACK, 1), // pass orientation ONE UNIT CURVE
	                        vec5(10, 10, 10), // divisions
	                        vec3.fromValues(-1, 0.0, 2.0), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.0), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/webvr-logo2.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CURVEDINNERPLANE, 'CurvedPlane', vec5(2, 1, 1, this.prim.directions.LEFT, 1), // pass orientation ONE UNIT CURVE
	                        vec5(10, 10, 10), // divisions
	                        vec3.fromValues(-1, 0.0, 2.0), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.0), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/webvr-logo3.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CURVEDINNERPLANE, 'CurvedPlane', vec5(2, 1, 1, this.prim.directions.RIGHT, 1), // pass orientation ONE UNIT CURVE
	                        vec5(10, 10, 10), // divisions
	                        vec3.fromValues(-1, 0.0, 2.0), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.0), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/webvr-logo4.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        //////////////////////////////////////////////////////////////////////

	                        // DIMENSIONS INDICATE ANY X or Y CURVATURE.
	                        // DIVISIONS FOR CUBED AND CURVED PLANE INDICATE SIDE TO DRAW

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CURVEDOUTERPLANE, 'CurvedPlane', vec5(2, 1, 1, this.prim.directions.RIGHT, 1), // dimensions NOTE: pass radius for curvature (also creates orbit) 
	                        vec3.fromValues(10, 10, 10), // divisions
	                        vec3.fromValues(-1.2, 0.0, 2.0), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.2), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/mozvr-logo2.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.dirlightTextureObjList.push(this.prim.createPrim(this.prim.typeList.SPHERE, 'texsphere', vec5(1.5, 1.5, 1.5, 0), // dimensions
	                        vec5(30, 30, 30), // divisions
	                        vec3.fromValues(-5, -1.3, -2), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/mozvr-logo1.png'], // texture present, NOT USED
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.dirlightTextureObjList.push(this.prim.createPrim(this.prim.typeList.CUBESPHERE, 'cubesphere', vec5(3, 3, 3), // dimensions
	                        vec5(10, 10, 10, 0), // divisions 4th parameter is degree of rounding.
	                        vec3.fromValues(3, -0.7, -1), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(10), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/mozvr-logo1.png'], // texture present, NOT USED
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.dirlightTextureObjList.push(this.prim.createPrim(this.prim.typeList.ICOSOHEDRON, 'icophere', vec5(3, 3, 3, 0), // dimensions
	                        vec5(8, 8, 8), // divisions
	                        vec3.fromValues(0.5, 3.5, -2), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/mozvr-logo2.png'], // texture present, NOT USED
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.dirlightTextureObjList.push(this.prim.createPrim(this.prim.typeList.BOTTOMDOME, 'TestDome', vec5(1, 1, 1, 0), // dimensions
	                        vec5(10, 10, 10), // divisions MAKE SMALLER
	                        vec3.fromValues(-4, 0.5, -0.5), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.2), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/mozvr-logo2.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.ICOSPHERE, 'icoUnity', vec5(3, 3, 3, 0), // dimensions
	                        vec5(16, 16, 16), // 1 for icosohedron, 16 for good sphere
	                        vec3.fromValues(4.5, 3.5, -2), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/uv-test.png'], // texture present, NOT USED
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.dirlightTextureObjList.push(this.prim.createPrim(this.prim.typeList.TORUS, // TORUS DEFAULT
	                        'TORUS1', vec5(1, 1, 0.5, 0), // dimensions INCLUDING start radius or torus radius(last value)
	                        vec5(15, 15, 15), // divisions MUST BE CONTROLLED TO < 5
	                        //vec3.fromValues(-3.5, -3.5, -1 ),        // position (absolute)
	                        vec3.fromValues(-0.0, 0, 2.0), vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.2), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/mozvr-logo1.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CAP, // CAP DEFAULT, AT WORLD CENTER (also a UV polygon)
	                        'CAP', vec5(3, 3, 3, 0), // dimensions INCLUDING start radius or torus radius(last value)
	                        vec5(15, 15, 15), // divisions MUST BE CONTROLLED TO < 5
	                        //vec3.fromValues(-3.5, -3.5, -1 ),    // position (absolute)
	                        vec3.fromValues(-0.0, 0, 2.0), vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.2), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/mozvr-logo1.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CONE, 'TestCone', vec5(1, 1, 1, 0.0, 0.0), // dimensions (4th dimension is truncation of cone, none = 0, flat circle = 1.0)
	                        vec5(10, 10, 10), // divisions MAKE SMALLER
	                        vec3.fromValues(-0, -1.5, 2.0), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.2), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/uv-test.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CYLINDER, 'TestCylinder', vec5(1, 1, 1, 0.3, 0.7), // dimensions (4th dimension doesn't exist for cylinder)
	                        vec5(40, 40, 40), // divisions MAKE SMALLER
	                        vec3.fromValues(-1.5, -1.5, 2.0), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.2), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/uv-test.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.CAPSULE, 'TestCapsule', vec5(0.5, 1, 1), // dimensions (4th dimension doesn't exist for cylinder)
	                        vec5(40, 40, 0), // divisions MAKE SMALLER
	                        vec3.fromValues(-2.0, -1.5, 2.0), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.2), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/uv-test.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.TEARDROP, 'TestCapsule', vec5(1, 2, 1), // dimensions (4th dimension doesn't exist for cylinder)
	                        vec5(40, 40, 0), // divisions MAKE SMALLER
	                        vec3.fromValues(-2.0, 1.5, 2.0), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.2), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/uv-test.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0) // color
	                        ));

	                        this.textureObjList.push(this.prim.createPrim(this.prim.typeList.DODECAHEDRON, 'Dodecahedron', vec5(1, 1, 1), // dimensions (4th dimension doesn't exist for cylinder)
	                        vec5(40, 40, 0), // divisions MAKE SMALLER
	                        vec3.fromValues(-1.0, 0.5, 3.0), // position (absolute)
	                        vec3.fromValues(0, 0, 0), // acceleration in x, y, z
	                        vec3.fromValues(util.degToRad(0), util.degToRad(0), util.degToRad(0)), // rotation (absolute)
	                        vec3.fromValues(util.degToRad(0.2), util.degToRad(0.5), util.degToRad(0)), // angular velocity in x, y, x
	                        ['img/crate.png'], // texture present
	                        vec4.fromValues(0.5, 1.0, 0.2, 1.0), // color,
	                        true // if true, apply texture to each face
	                        ));

	                        this.vs3 = this.renderer.shaderDirlightTexture.init(this.dirlightTextureObjList);

	                        // Finished object creation, start rendering...

	                        this.render();
	                }

	                /**
	                 * Create objects specific to this world.
	                 */

	        }, {
	                key: 'create',
	                value: function create() {}

	                /** 
	                 * Update world.related properties, e.g. a HUD or framrate readout.
	                 */

	        }, {
	                key: 'update',
	                value: function update() {

	                        // fps calculation.

	                        var now = performance.now();

	                        var delta = now - this.last;

	                        this.last = now;

	                        this.counter++;

	                        if (this.counter > 300) {

	                                this.counter = 0;

	                                /////////console.log( 'delta:' + parseInt( 1000 / delta ) + ' fps' );
	                        }
	                }

	                /** 
	                 * render the world. Update Prims locally, then call shader/renderer 
	                 * objects to do rendering. this.render was bound (ES5 method) in 
	                 * the constructor.
	                 */

	        }, {
	                key: 'render',
	                value: function render() {

	                        this.update();

	                        this.webgl.clear();

	                        // TODO: Don't render until we update in the correct order.

	                        this.vs3.render();

	                        this.vs2.render();

	                        this.vs1.render();

	                        requestAnimationFrame(this.render);
	                }
	        }]);

	        return World;
	}();

	exports.default = World;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 33 */
/***/ function(module, exports) {

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


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 42 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);
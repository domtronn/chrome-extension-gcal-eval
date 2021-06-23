/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/background.ts":
/*!*******************************!*\
  !*** ./src/app/background.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const switch_1 = __webpack_require__(/*! ./utils/switch */ "./src/app/utils/switch.js");
const api_1 = __webpack_require__(/*! ./utils/api */ "./src/app/utils/api.js");
api_1.default.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const data = {
        summary: {}
    };
    switch_1.default({
        getSummary: () => sendResponse(data.summary),
        setSummary: () => (data.summary = message.summary),
        default: () => console.error('Did not understand message:', message)
    })(message.type);
});


/***/ }),

/***/ "./src/app/utils/api.js":
/*!******************************!*\
  !*** ./src/app/utils/api.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* global chrome browser */
const apis = ["runtime", "storage", "tabs"];

function Extension() {
  const Api = {};
  apis.forEach(api => {
    Api[api] = null;

    try {
      if (chrome[api]) {
        Api[api] = chrome[api];
      }
    } catch (e) {}

    try {
      if (window[api]) {
        Api[api] = window[api];
      }
    } catch (e) {}

    try {
      if (browser[api]) {
        Api[api] = browser[api];
      }
    } catch (e) {}

    try {
      Api.api = browser.extension[api];
    } catch (e) {}
  });

  try {
    if (browser && browser.runtime) {
      this.runtime = browser.runtime;
    }
  } catch (e) {}

  try {
    if (browser && browser.browserAction) {
      this.browserAction = browser.browserAction;
    }
  } catch (e) {}

  return Api;
}

/* harmony default export */ __webpack_exports__["default"] = (Extension());

/***/ }),

/***/ "./src/app/utils/switch.js":
/*!*********************************!*\
  !*** ./src/app/utils/switch.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @typedef {Function} CaseFunction
 * @param {...*} [args] - List of args provided to anonymous function
 */

/**
 * @typedef {Function} SwitchFunction
 * @param {string} [c='default'] - case string to match
 * @param {...*} [args] - args to pass to matched SwitchFunction
 * @returns {*} - Result of matching case in SwitchMap either CaseFunction called with args, or value
 */

/**
 * @typedef {Object<string, CaseFunction|*>} SwitchMap
 */

/**
 * sw.js
 *
 * This function takes a SwitchMap and returns a SwitchFunction which
 * can be called with a case property and extra args to match with
 * function
 *
 * @example
 *  sw({
 *    foo: i => i + 2,   // 5
 *    bar: 'baz',        // bar
 *    default: null,     // null
 *  })('foo', 3)
 *
 * @param {SwitchMap} cases - A map of string cases to value or CaseFunction call
 * @returns {SwitchFunction}
 */
/* harmony default export */ __webpack_exports__["default"] = (cases => (c, ...args) => {
  const f = {}.hasOwnProperty.call(cases, c) ? cases[c] : cases.default;
  return f instanceof Function ? f(...args) : f;
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvc3dpdGNoLmpzIl0sIm5hbWVzIjpbImFwaXMiLCJFeHRlbnNpb24iLCJBcGkiLCJmb3JFYWNoIiwiYXBpIiwiY2hyb21lIiwiZSIsIndpbmRvdyIsImJyb3dzZXIiLCJleHRlbnNpb24iLCJydW50aW1lIiwiYnJvd3NlckFjdGlvbiIsImNhc2VzIiwiYyIsImFyZ3MiLCJmIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZGVmYXVsdCIsIkZ1bmN0aW9uIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsd0ZBQStCO0FBQy9CLCtFQUE2QjtBQUU3QixhQUFHLENB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SkQsRSIsImZpbGUiOiJiYWNrZ3JvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwL2JhY2tncm91bmQudHNcIik7XG4iLCJpbXBvcnQgc3cgZnJvbSAnLi91dGlscy9zd2l0Y2gnXG5pbXBvcnQgYXBpIGZyb20gJy4vdXRpbHMvYXBpJ1xuXG5hcGkucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgc3VtbWFyeToge31cbiAgfVxuXG4gIHN3KHtcbiAgICBnZXRTdW1tYXJ5OiAoKSA9PiBzZW5kUmVzcG9uc2UoZGF0YS5zdW1tYXJ5KSxcbiAgICBzZXRTdW1tYXJ5OiAoKSA9PiAoZGF0YS5zdW1tYXJ5ID0gbWVzc2FnZS5zdW1tYXJ5KSxcbiAgICBkZWZhdWx0OiAoKSA9PiBjb25zb2xlLmVycm9yKCdEaWQgbm90IHVuZGVyc3RhbmQgbWVzc2FnZTonLCBtZXNzYWdlKVxuICB9KShtZXNzYWdlLnR5cGUpXG59KVxuIiwiLyogZ2xvYmFsIGNocm9tZSBicm93c2VyICovXG5cbmNvbnN0IGFwaXMgPSBbXCJydW50aW1lXCIsIFwic3RvcmFnZVwiLCBcInRhYnNcIl1cblxuZnVuY3Rpb24gRXh0ZW5zaW9uKCkge1xuICBjb25zdCBBcGkgPSB7fVxuXG4gIGFwaXMuZm9yRWFjaCgoYXBpKSA9PiB7XG4gICAgQXBpW2FwaV0gPSBudWxsXG5cbiAgICB0cnkge1xuICAgICAgaWYgKGNocm9tZVthcGldKSB7XG4gICAgICAgIEFwaVthcGldID0gY2hyb21lW2FwaV1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh3aW5kb3dbYXBpXSkge1xuICAgICAgICBBcGlbYXBpXSA9IHdpbmRvd1thcGldXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIHRyeSB7XG4gICAgICBpZiAoYnJvd3NlclthcGldKSB7XG4gICAgICAgIEFwaVthcGldID0gYnJvd3NlclthcGldXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgQXBpLmFwaSA9IGJyb3dzZXIuZXh0ZW5zaW9uW2FwaV1cbiAgICB9IGNhdGNoIChlKSB7fVxuICB9KVxuXG4gIHRyeSB7XG4gICAgaWYgKGJyb3dzZXIgJiYgYnJvd3Nlci5ydW50aW1lKSB7XG4gICAgICB0aGlzLnJ1bnRpbWUgPSBicm93c2VyLnJ1bnRpbWVcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdHJ5IHtcbiAgICBpZiAoYnJvd3NlciAmJiBicm93c2VyLmJyb3dzZXJBY3Rpb24pIHtcbiAgICAgIHRoaXMuYnJvd3NlckFjdGlvbiA9IGJyb3dzZXIuYnJvd3NlckFjdGlvblxuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cblxuICByZXR1cm4gQXBpXG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4dGVuc2lvbigpXG4iLCIvKipcbiAqIEB0eXBlZGVmIHtGdW5jdGlvbn0gQ2FzZUZ1bmN0aW9uXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSAtIExpc3Qgb2YgYXJncyBwcm92aWRlZCB0byBhbm9ueW1vdXMgZnVuY3Rpb25cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtGdW5jdGlvbn0gU3dpdGNoRnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBbYz0nZGVmYXVsdCddIC0gY2FzZSBzdHJpbmcgdG8gbWF0Y2hcbiAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdIC0gYXJncyB0byBwYXNzIHRvIG1hdGNoZWQgU3dpdGNoRnVuY3Rpb25cbiAqIEByZXR1cm5zIHsqfSAtIFJlc3VsdCBvZiBtYXRjaGluZyBjYXNlIGluIFN3aXRjaE1hcCBlaXRoZXIgQ2FzZUZ1bmN0aW9uIGNhbGxlZCB3aXRoIGFyZ3MsIG9yIHZhbHVlXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0PHN0cmluZywgQ2FzZUZ1bmN0aW9ufCo+fSBTd2l0Y2hNYXBcbiAqL1xuXG4vKipcbiAqIHN3LmpzXG4gKlxuICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhIFN3aXRjaE1hcCBhbmQgcmV0dXJucyBhIFN3aXRjaEZ1bmN0aW9uIHdoaWNoXG4gKiBjYW4gYmUgY2FsbGVkIHdpdGggYSBjYXNlIHByb3BlcnR5IGFuZCBleHRyYSBhcmdzIHRvIG1hdGNoIHdpdGhcbiAqIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqICBzdyh7XG4gKiAgICBmb286IGkgPT4gaSArIDIsICAgLy8gNVxuICogICAgYmFyOiAnYmF6JywgICAgICAgIC8vIGJhclxuICogICAgZGVmYXVsdDogbnVsbCwgICAgIC8vIG51bGxcbiAqICB9KSgnZm9vJywgMylcbiAqXG4gKiBAcGFyYW0ge1N3aXRjaE1hcH0gY2FzZXMgLSBBIG1hcCBvZiBzdHJpbmcgY2FzZXMgdG8gdmFsdWUgb3IgQ2FzZUZ1bmN0aW9uIGNhbGxcbiAqIEByZXR1cm5zIHtTd2l0Y2hGdW5jdGlvbn1cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjYXNlcyA9PiAoYywgLi4uYXJncykgPT4ge1xuICBjb25zdCBmID0ge30uaGFzT3duUHJvcGVydHkuY2FsbChjYXNlcywgYykgPyBjYXNlc1tjXSA6IGNhc2VzLmRlZmF1bHRcblxuICByZXR1cm4gZiBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gZiguLi5hcmdzKSA6IGZcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
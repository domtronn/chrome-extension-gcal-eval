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
    console.log(Api, api);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvc3dpdGNoLmpzIl0sIm5hbWVzIjpbImFwaXMiLCJFeHRlbnNpb24iLCJBcGkiLCJmb3JFYWNoIiwiYXBpIiwiY29uc29sZSIsImxvZyIsImNocm9tZSIsImUiLCJ3aW5kb3ciLCJicm93c2VyIiwiZXh0ZW5zaW9uIiwicnVudGltZSIsImJyb3dzZXJBY3Rpb24iLCJjYXNlcyIsImMiLCJhcmdzIiwiZiIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlZmF1bHQiLCJGdW5jdGlvbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLHdGQUErQjtBQUMvQiwrRUFB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WUksUUFBYixHQUF3QkosQ0FBQyxDQUFDLEdBQUdELElBQUosQ0FBekIsR0FBcUNDLENBQTVDO0FBQ0QsQ0FKRCxFIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hcHAvYmFja2dyb3VuZC50c1wiKTtcbiIsImltcG9ydCBzdyBmcm9tICcuL3V0aWxzL3N3aXRjaCdcbmltcG9ydCBhcGkgZnJvbSAnLi91dGlscy9hcGknXG5cbmFwaS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgY29uc3QgZGF0YSA9IHtcbiAgICBzdW1tYXJ5OiB7fVxuICB9XG5cbiAgc3coe1xuICAgIGdldFN1bW1hcnk6ICgpID0+IHNlbmRSZXNwb25zZShkYXRhLnN1bW1hcnkpLFxuICAgIHNldFN1bW1hcnk6ICgpID0+IChkYXRhLnN1bW1hcnkgPSBtZXNzYWdlLnN1bW1hcnkpLFxuICAgIGRlZmF1bHQ6ICgpID0+IGNvbnNvbGUuZXJyb3IoJ0RpZCBub3QgdW5kZXJzdGFuZCBtZXNzYWdlOicsIG1lc3NhZ2UpXG4gIH0pKG1lc3NhZ2UudHlwZSlcbn0pXG4iLCIvKiBnbG9iYWwgY2hyb21lIGJyb3dzZXIgKi9cblxuY29uc3QgYXBpcyA9IFtcInJ1bnRpbWVcIiwgXCJzdG9yYWdlXCIsIFwidGFic1wiXVxuXG5mdW5jdGlvbiBFeHRlbnNpb24oKSB7XG4gIGNvbnN0IEFwaSA9IHt9XG5cbiAgYXBpcy5mb3JFYWNoKChhcGkpID0+IHtcbiAgICBjb25zb2xlLmxvZyhBcGksIGFwaSlcbiAgICBBcGlbYXBpXSA9IG51bGxcblxuICAgIHRyeSB7XG4gICAgICBpZiAoY2hyb21lW2FwaV0pIHtcbiAgICAgICAgQXBpW2FwaV0gPSBjaHJvbWVbYXBpXVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHdpbmRvd1thcGldKSB7XG4gICAgICAgIEFwaVthcGldID0gd2luZG93W2FwaV1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChicm93c2VyW2FwaV0pIHtcbiAgICAgICAgQXBpW2FwaV0gPSBicm93c2VyW2FwaV1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICBBcGkuYXBpID0gYnJvd3Nlci5leHRlbnNpb25bYXBpXVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH0pXG5cbiAgdHJ5IHtcbiAgICBpZiAoYnJvd3NlciAmJiBicm93c2VyLnJ1bnRpbWUpIHtcbiAgICAgIHRoaXMucnVudGltZSA9IGJyb3dzZXIucnVudGltZVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cblxuICB0cnkge1xuICAgIGlmIChicm93c2VyICYmIGJyb3dzZXIuYnJvd3NlckFjdGlvbikge1xuICAgICAgdGhpcy5icm93c2VyQWN0aW9uID0gYnJvd3Nlci5icm93c2VyQWN0aW9uXG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuXG4gIHJldHVybiBBcGlcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5zaW9uKClcbiIsIi8qKlxuICogQHR5cGVkZWYge0Z1bmN0aW9ufSBDYXNlRnVuY3Rpb25cbiAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdIC0gTGlzdCBvZiBhcmdzIHByb3ZpZGVkIHRvIGFub255bW91cyBmdW5jdGlvblxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge0Z1bmN0aW9ufSBTd2l0Y2hGdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IFtjPSdkZWZhdWx0J10gLSBjYXNlIHN0cmluZyB0byBtYXRjaFxuICogQHBhcmFtIHsuLi4qfSBbYXJnc10gLSBhcmdzIHRvIHBhc3MgdG8gbWF0Y2hlZCBTd2l0Y2hGdW5jdGlvblxuICogQHJldHVybnMgeyp9IC0gUmVzdWx0IG9mIG1hdGNoaW5nIGNhc2UgaW4gU3dpdGNoTWFwIGVpdGhlciBDYXNlRnVuY3Rpb24gY2FsbGVkIHdpdGggYXJncywgb3IgdmFsdWVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3Q8c3RyaW5nLCBDYXNlRnVuY3Rpb258Kj59IFN3aXRjaE1hcFxuICovXG5cbi8qKlxuICogc3cuanNcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGEgU3dpdGNoTWFwIGFuZCByZXR1cm5zIGEgU3dpdGNoRnVuY3Rpb24gd2hpY2hcbiAqIGNhbiBiZSBjYWxsZWQgd2l0aCBhIGNhc2UgcHJvcGVydHkgYW5kIGV4dHJhIGFyZ3MgdG8gbWF0Y2ggd2l0aFxuICogZnVuY3Rpb25cbiAqXG4gKiBAZXhhbXBsZVxuICogIHN3KHtcbiAqICAgIGZvbzogaSA9PiBpICsgMiwgICAvLyA1XG4gKiAgICBiYXI6ICdiYXonLCAgICAgICAgLy8gYmFyXG4gKiAgICBkZWZhdWx0OiBudWxsLCAgICAgLy8gbnVsbFxuICogIH0pKCdmb28nLCAzKVxuICpcbiAqIEBwYXJhbSB7U3dpdGNoTWFwfSBjYXNlcyAtIEEgbWFwIG9mIHN0cmluZyBjYXNlcyB0byB2YWx1ZSBvciBDYXNlRnVuY3Rpb24gY2FsbFxuICogQHJldHVybnMge1N3aXRjaEZ1bmN0aW9ufVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNhc2VzID0+IChjLCAuLi5hcmdzKSA9PiB7XG4gIGNvbnN0IGYgPSB7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNhc2VzLCBjKSA/IGNhc2VzW2NdIDogY2FzZXMuZGVmYXVsdFxuXG4gIHJldHVybiBmIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBmKC4uLmFyZ3MpIDogZlxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
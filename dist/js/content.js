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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/content.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/content.ts":
/*!****************************!*\
  !*** ./src/app/content.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const switch_1 = __webpack_require__(/*! ./utils/switch */ "./src/app/utils/switch.js");
const summary_1 = __webpack_require__(/*! ./core/summary */ "./src/app/core/summary.js");
const modifications_1 = __webpack_require__(/*! ./core/modifications */ "./src/app/core/modifications.js");
const chrome_storage_1 = __webpack_require__(/*! ../ui/chrome-storage */ "./src/ui/chrome-storage.js");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch_1.default({
        getSummary: () => {
            console.log('received getSummary request');
            const summary = {
                weekly: summary_1.weekly('9am', '5pm'),
                daily: summary_1.daily('9am', '5pm')
            };
            chrome_storage_1.set({ summary });
            sendResponse(summary);
        },
        unhighlight: () => {
            console.log('received to unhighlight request');
            modifications_1.unhighlight();
        },
        highlightCategory: ({ color, day }) => {
            console.log('received highlight request for', color, day);
            modifications_1.highlight(color, day);
        }
    })(message.type, message);
});


/***/ }),

/***/ "./src/app/core/analysis.js":
/*!**********************************!*\
  !*** ./src/app/core/analysis.js ***!
  \**********************************/
/*! exports provided: getMeetingsForDays, getMeetings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMeetingsForDays", function() { return getMeetingsForDays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMeetings", function() { return getMeetings; });
/* harmony import */ var _utils_col__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/col */ "./src/app/utils/col.js");
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/date */ "./src/app/utils/date.js");
/* harmony import */ var _utils_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/selectors */ "./src/app/utils/selectors.js");



const getMeetingsForDays = ({
  dayStart,
  dayEnd
}) => Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__["selectDays"])().map(column => {
  const [total, day, date] = column.innerText.split(", ");
  return {
    total,
    day,
    date,
    events: getMeetings(column, {
      dayStart,
      dayEnd
    })
  };
});
const getMeetings = (el = document, {
  dayStart,
  dayEnd
}) => Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__["selectMeetings"])(el).map(node => {
  var [time, name,, status] = node.innerText.split(", ");
  var [start, end] = time.split(" to ");
  return {
    id: Object(_utils_col__WEBPACK_IMPORTED_MODULE_0__["rgbToHex"])(node.style["background-color"].substring()),
    name,
    status,
    time: {
      start: Math.max(Object(_utils_date__WEBPACK_IMPORTED_MODULE_1__["twelveHourToDate"])(dayStart), Object(_utils_date__WEBPACK_IMPORTED_MODULE_1__["twelveHourToDate"])(start)),
      end: Math.min(Object(_utils_date__WEBPACK_IMPORTED_MODULE_1__["twelveHourToDate"])(dayEnd), Object(_utils_date__WEBPACK_IMPORTED_MODULE_1__["twelveHourToDate"])(end))
    }
  };
}).filter(({
  status
}) => status !== "Declined");

/***/ }),

/***/ "./src/app/core/modifications.js":
/*!***************************************!*\
  !*** ./src/app/core/modifications.js ***!
  \***************************************/
/*! exports provided: highlight, unhighlight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlight", function() { return highlight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unhighlight", function() { return unhighlight; });
/* harmony import */ var _utils_col__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/col */ "./src/app/utils/col.js");
/* harmony import */ var _utils_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/selectors */ "./src/app/utils/selectors.js");


const highlight = (color, day) => {
  Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_1__["selectDays"])().forEach(column => {
    Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_1__["selectMeetings"])(column).forEach(node => {
      if ((!day || column.innerText.includes(day)) && Object(_utils_col__WEBPACK_IMPORTED_MODULE_0__["rgbToHex"])(node.style["background-color"]) === color) {
        node.style.opacity = 1;
      } else {
        node.style.opacity = 0.2;
      }
    });
  });
};
const unhighlight = () => Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_1__["selectMeetings"])().forEach(node => node.style.opacity = 1);

/***/ }),

/***/ "./src/app/core/summary.js":
/*!*********************************!*\
  !*** ./src/app/core/summary.js ***!
  \*********************************/
/*! exports provided: daily, weekly */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daily", function() { return daily; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weekly", function() { return weekly; });
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/date */ "./src/app/utils/date.js");
/* harmony import */ var _utils_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/selectors */ "./src/app/utils/selectors.js");
/* harmony import */ var _analysis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analysis */ "./src/app/core/analysis.js");




var summary = (totalTime, res, config = {}) => {
  const sum = res.reduce((acc, it) => ({ ...acc,
    [it.id]: (acc[it.id] || 0) + Math.max(0, it.time.end - it.time.start)
  }), {});
  const result = Object.entries(sum).filter(([key]) => key !== "null").filter(([, val]) => val > 0).map(([key, val]) => [config[key] || key, key, Math.floor(val / totalTime * 100)]);
  const remaining = 100 - result.reduce((acc, [,, value]) => acc + value, 0);
  return [["free", "#ffffff", remaining], ...result];
};
/**
 * I/O summaries
 */


const daily = (dayStart, dayEnd, config) => {
  const totalTime = Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["twelveHourToDate"])(dayEnd) - Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["twelveHourToDate"])(dayStart);
  return Object(_analysis__WEBPACK_IMPORTED_MODULE_2__["getMeetingsForDays"])({
    dayStart,
    dayEnd
  }).map(({
    events,
    ...rest
  }) => ({ ...rest,
    summary: summary(totalTime, events, config)
  }));
};
const weekly = (dayStart, dayEnd, config) => {
  const totalTime = (Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["twelveHourToDate"])(dayEnd) - Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["twelveHourToDate"])(dayStart)) * Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_1__["getDays"])();
  const res = Object(_analysis__WEBPACK_IMPORTED_MODULE_2__["getMeetings"])(document, {
    dayStart,
    dayEnd
  });
  return summary(totalTime, res, config);
};

/***/ }),

/***/ "./src/app/utils/col.js":
/*!******************************!*\
  !*** ./src/app/utils/col.js ***!
  \******************************/
/*! exports provided: rgbToHex, adjustCol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbToHex", function() { return rgbToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjustCol", function() { return adjustCol; });
const rgbToHex = rgbString => {
  if (!rgbString) return null;
  var [r, g, b] = rgbString.slice(4, -1).split(/, ?/).map(i => +i);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
const adjustCol = (col, amt) => {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);
  var r = (num >> 16) + amt;
  if (r > 255) r = 255;else if (r < 0) r = 0;
  var b = (num >> 8 & 0x00ff) + amt;
  if (b > 255) b = 255;else if (b < 0) b = 0;
  var g = (num & 0x0000ff) + amt;
  if (g > 255) g = 255;else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
};

/***/ }),

/***/ "./src/app/utils/date.js":
/*!*******************************!*\
  !*** ./src/app/utils/date.js ***!
  \*******************************/
/*! exports provided: twelveHourToDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "twelveHourToDate", function() { return twelveHourToDate; });
const twelveHourToDate = s => {
  console.log('s', s);
  var [time, ampm] = [s.slice(0, -2), s.slice(-2)];
  var [hr, min = 0] = time.split(':');
  var date = new Date();
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(+min);
  +hr === 12 ? date.setHours(ampm === 'am' ? +hr + 12 : +hr) : date.setHours(ampm === 'am' ? +hr : +hr + 12);
  return date;
};

/***/ }),

/***/ "./src/app/utils/selectors.js":
/*!************************************!*\
  !*** ./src/app/utils/selectors.js ***!
  \************************************/
/*! exports provided: getDays, selectDays, selectMeetings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDays", function() { return getDays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDays", function() { return selectDays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectMeetings", function() { return selectMeetings; });
const days = (el = document) => [...el.querySelectorAll('div[role="gridcell"')];

const getDays = (el = document) => days(el).length / 2;
const selectDays = (el = document) => {
  const d = days(el);
  return d.slice(d.length / 2);
};
const selectMeetings = (el = document) => [...el.querySelectorAll('div[data-opens-details="true"]')].filter(i => /([0-9]{1,2}:[0-9]{2}|[0-9]{1,2})[ap]m to /.test(i.innerText));

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

/***/ }),

/***/ "./src/ui/chrome-storage.js":
/*!**********************************!*\
  !*** ./src/ui/chrome-storage.js ***!
  \**********************************/
/*! exports provided: clear, set, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clear", function() { return clear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* global chrome */
const clear = (key, cb = () => {}) => chrome.storage.sync.set({
  [key]: undefined
}, cb);
const set = (o, cb = () => {}) => chrome.storage.sync.set(o, cb);
const get = (key, cb = () => {}) => chrome.storage.sync.get([key], cb);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29yZS9hbmFseXNpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvbW9kaWZpY2F0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvc3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2NvbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC91dGlscy9zZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC91dGlscy9zd2l0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2Nocm9tZS1zdG9yYWdlLmpzIl0sIm5hbWVzIjpbImdldE1lZXRpbmdzRm9yRGF5cyIsImRheVN0YXJ0IiwiZGF5RW5kIiwic2VsZWN0RGF5cyIsIm1hcCIsImNvbHVtbiIsInRvdGFsIiwiZGF5IiwiZGF0ZSIsImlubmVyVGV4dCIsInNwbGl0IiwiZXZlbnRzIiwiZ2V0TWVldGluZ3MiLCJlbCIsImRvY3VtZW50Iiwic2VsZWN0TWVldGluZ3MiLCJub2RlIiwidGltZSIsIm5hbWUiLCJzdGF0dXMiLCJzdGFydCIsImVuZCIsImlkIiwicmdiVG9IZXgiLCJzdHlsZSIsInN1YnN0cmluZyIsIk1hdGgiLCJtYXgiLCJ0d2VsdmVIb3VyVG9EYXRlIiwibWluIiwiZmlsdGVyIiwiaGlnaGxpZ2h0IiwiY29sb3IiLCJmb3JFYWNoIiwiaW5jbHVkZXMiLCJvcGFjaXR5IiwidW5oaWdobGlnaHQiLCJzdW1tYXJ5IiwidG90YWxUaW1lIiwicmVzIiwiY29uZmlnIiwic3VtIiwicmVkdWNlIiwiYWNjIiwiaXQiLCJyZXN1bHQiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwidmFsIiwiZmxvb3IiLCJyZW1haW5pbmciLCJ2YWx1ZSIsImRhaWx5IiwicmVzdCIsIndlZWtseSIsImdldERheXMiLCJyZ2JTdHJpbmciLCJyIiwiZyIsImIiLCJzbGljZSIsImkiLCJ0b1N0cmluZyIsImFkanVzdENvbCIsImNvbCIsImFtdCIsInVzZVBvdW5kIiwibnVtIiwicGFyc2VJbnQiLCJzIiwiY29uc29sZSIsImxvZyIsImFtcG0iLCJociIsIkRhdGUiLCJzZXRNaWxsaXNlY29uZHMiLCJzZXRTZWNvbmRzIiwic2V0TWludXRlcyIsInNldEhvdXJzIiwiZGF5cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJkIiwidGVzdCIsImNhc2VzIiwiYyIsImFyZ3MiLCJmIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZGVmYXVsdCIsIkZ1bmN0aW9uIiwiY2xlYXIiLCJjYiIsImNocm9tZSIsInN0b3JhZ2UiLCJzeW5jIiwic2V0IiwidW5kZWZpbmVkIiwibyIsImdldCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7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QUFNLENBQUNDLE9BQVAsQ0FBZUMsSUFBZixDQUFvQkMsR0FBcEIsQ0FBd0I7QUFBRSxHQUFDbEQsR0FBRCxHQUFPbUQ7QUFBVCxDQUF4QixFQUE4Q0wsRUFBOUMsQ0FBdEM7QUFDQSxNQUFNSSxHQUFHLEdBQUcsQ0FBQ0UsQ0FBRCxFQUFJTixFQUFFLEdBQUcsTUFBTSxDQUFFLENBQWpCLEtBQXNCQyxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsSUFBZixDQUFvQkMsR0FBcEIsQ0FBd0JFLENBQXhCLEVBQTJCTixFQUEzQixDQUFsQztBQUNBLE1BQU1PLEdBQUcsR0FBRyxDQUFDckQsR0FBRCxFQUFNOEMsRUFBRSxHQUFHLE1BQU0sQ0FBRSxDQUFuQixLQUF3QkMsTUFBTSxDQUFDQyxPQUFQLENBQWVDLElBQWYsQ0FBb0JJLEdBQXBCLENBQXdCLENBQUNyRCxHQUFELENBQXhCLEVBQStCOEMsRUFBL0IsQ0FBcEMsQyIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwL2NvbnRlbnQudHNcIik7XG4iLCJpbXBvcnQgc3cgZnJvbSAnLi91dGlscy9zd2l0Y2gnXG5pbXBvcnQgeyB3ZWVrbHksIGRhaWx5IH0gZnJvbSAnLi9jb3JlL3N1bW1hcnknXG5pbXBvcnQgeyBoaWdobGlnaHQsIHVuaGlnaGxpZ2h0IH0gZnJvbSAnLi9jb3JlL21vZGlmaWNhdGlvbnMnXG5cbmltcG9ydCB7IHNldCB9IGZyb20gJy4uL3VpL2Nocm9tZS1zdG9yYWdlJ1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIHN3KHtcbiAgICBnZXRTdW1tYXJ5OiAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZ2V0U3VtbWFyeSByZXF1ZXN0JylcbiAgICAgIGNvbnN0IHN1bW1hcnkgPSB7XG4gICAgICAgIHdlZWtseTogd2Vla2x5KCc5YW0nLCAnNXBtJyksXG4gICAgICAgIGRhaWx5OiBkYWlseSgnOWFtJywgJzVwbScpXG4gICAgICB9XG5cbiAgICAgIHNldCh7IHN1bW1hcnkgfSlcbiAgICAgIHNlbmRSZXNwb25zZShzdW1tYXJ5KVxuICAgIH0sXG5cbiAgICB1bmhpZ2hsaWdodDogKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIHRvIHVuaGlnaGxpZ2h0IHJlcXVlc3QnKVxuICAgICAgdW5oaWdobGlnaHQoKVxuICAgIH0sXG5cbiAgICBoaWdobGlnaHRDYXRlZ29yeTogKHsgY29sb3IsIGRheSB9KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgaGlnaGxpZ2h0IHJlcXVlc3QgZm9yJywgY29sb3IsIGRheSlcbiAgICAgIGhpZ2hsaWdodChjb2xvciwgZGF5KVxuICAgIH1cbiAgfSkobWVzc2FnZS50eXBlLCBtZXNzYWdlKVxufSlcbiIsImltcG9ydCB7IHJnYlRvSGV4IH0gZnJvbSBcIi4uL3V0aWxzL2NvbFwiXG5pbXBvcnQgeyB0d2VsdmVIb3VyVG9EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGVcIlxuXG5pbXBvcnQgeyBzZWxlY3REYXlzLCBzZWxlY3RNZWV0aW5ncyB9IGZyb20gXCIuLi91dGlscy9zZWxlY3RvcnNcIlxuXG5leHBvcnQgY29uc3QgZ2V0TWVldGluZ3NGb3JEYXlzID0gKHsgZGF5U3RhcnQsIGRheUVuZCB9KSA9PlxuICBzZWxlY3REYXlzKCkubWFwKChjb2x1bW4pID0+IHtcbiAgICBjb25zdCBbdG90YWwsIGRheSwgZGF0ZV0gPSBjb2x1bW4uaW5uZXJUZXh0LnNwbGl0KFwiLCBcIilcbiAgICByZXR1cm4ge1xuICAgICAgdG90YWwsXG4gICAgICBkYXksXG4gICAgICBkYXRlLFxuICAgICAgZXZlbnRzOiBnZXRNZWV0aW5ncyhjb2x1bW4sIHsgZGF5U3RhcnQsIGRheUVuZCB9KSxcbiAgICB9XG4gIH0pXG5cbmV4cG9ydCBjb25zdCBnZXRNZWV0aW5ncyA9IChlbCA9IGRvY3VtZW50LCB7IGRheVN0YXJ0LCBkYXlFbmQgfSkgPT5cbiAgc2VsZWN0TWVldGluZ3MoZWwpXG4gICAgLm1hcCgobm9kZSkgPT4ge1xuICAgICAgdmFyIFt0aW1lLCBuYW1lLCAsIHN0YXR1c10gPSBub2RlLmlubmVyVGV4dC5zcGxpdChcIiwgXCIpXG4gICAgICB2YXIgW3N0YXJ0LCBlbmRdID0gdGltZS5zcGxpdChcIiB0byBcIilcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHJnYlRvSGV4KG5vZGUuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLnN1YnN0cmluZygpKSxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgc3RhcnQ6IE1hdGgubWF4KHR3ZWx2ZUhvdXJUb0RhdGUoZGF5U3RhcnQpLCB0d2VsdmVIb3VyVG9EYXRlKHN0YXJ0KSksXG4gICAgICAgICAgZW5kOiBNYXRoLm1pbih0d2VsdmVIb3VyVG9EYXRlKGRheUVuZCksIHR3ZWx2ZUhvdXJUb0RhdGUoZW5kKSksXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfSlcbiAgICAuZmlsdGVyKCh7IHN0YXR1cyB9KSA9PiBzdGF0dXMgIT09IFwiRGVjbGluZWRcIilcbiIsImltcG9ydCB7IHJnYlRvSGV4IH0gZnJvbSBcIi4uL3V0aWxzL2NvbFwiXG5pbXBvcnQgeyBzZWxlY3REYXlzLCBzZWxlY3RNZWV0aW5ncyB9IGZyb20gXCIuLi91dGlscy9zZWxlY3RvcnNcIlxuXG5leHBvcnQgY29uc3QgaGlnaGxpZ2h0ID0gKGNvbG9yLCBkYXkpID0+IHtcbiAgc2VsZWN0RGF5cygpLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgIHNlbGVjdE1lZXRpbmdzKGNvbHVtbikuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAoIWRheSB8fCBjb2x1bW4uaW5uZXJUZXh0LmluY2x1ZGVzKGRheSkpICYmXG4gICAgICAgIHJnYlRvSGV4KG5vZGUuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdKSA9PT0gY29sb3JcbiAgICAgICkge1xuICAgICAgICBub2RlLnN0eWxlLm9wYWNpdHkgPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnN0eWxlLm9wYWNpdHkgPSAwLjJcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgdW5oaWdobGlnaHQgPSAoKSA9PlxuICBzZWxlY3RNZWV0aW5ncygpLmZvckVhY2goKG5vZGUpID0+IChub2RlLnN0eWxlLm9wYWNpdHkgPSAxKSlcbiIsImltcG9ydCB7IHR3ZWx2ZUhvdXJUb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZVwiXG5pbXBvcnQgeyBnZXREYXlzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5pbXBvcnQgeyBnZXRNZWV0aW5ncywgZ2V0TWVldGluZ3NGb3JEYXlzIH0gZnJvbSBcIi4vYW5hbHlzaXNcIlxuXG52YXIgc3VtbWFyeSA9ICh0b3RhbFRpbWUsIHJlcywgY29uZmlnID0ge30pID0+IHtcbiAgY29uc3Qgc3VtID0gcmVzLnJlZHVjZShcbiAgICAoYWNjLCBpdCkgPT4gKHtcbiAgICAgIC4uLmFjYyxcbiAgICAgIFtpdC5pZF06IChhY2NbaXQuaWRdIHx8IDApICsgTWF0aC5tYXgoMCwgaXQudGltZS5lbmQgLSBpdC50aW1lLnN0YXJ0KSxcbiAgICB9KSxcbiAgICB7fVxuICApXG5cbiAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmVudHJpZXMoc3VtKVxuICAgIC5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09IFwibnVsbFwiKVxuICAgIC5maWx0ZXIoKFssdmFsXSkgPT4gdmFsID4gMClcbiAgICAubWFwKChba2V5LCB2YWxdKSA9PiBbXG4gICAgICBjb25maWdba2V5XSB8fCBrZXksXG4gICAgICBrZXksXG4gICAgICBNYXRoLmZsb29yKCh2YWwgLyB0b3RhbFRpbWUpICogMTAwKSxcbiAgICBdKVxuXG4gIGNvbnN0IHJlbWFpbmluZyA9IDEwMCAtIHJlc3VsdC5yZWR1Y2UoKGFjYywgWywgLCB2YWx1ZV0pID0+IGFjYyArIHZhbHVlLCAwKVxuXG4gIHJldHVybiBbW1wiZnJlZVwiLCBcIiNmZmZmZmZcIiwgcmVtYWluaW5nXSwgLi4ucmVzdWx0XVxufVxuXG4vKipcbiAqIEkvTyBzdW1tYXJpZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGRhaWx5ID0gKGRheVN0YXJ0LCBkYXlFbmQsIGNvbmZpZykgPT4ge1xuICBjb25zdCB0b3RhbFRpbWUgPSB0d2VsdmVIb3VyVG9EYXRlKGRheUVuZCkgLSB0d2VsdmVIb3VyVG9EYXRlKGRheVN0YXJ0KVxuXG4gIHJldHVybiBnZXRNZWV0aW5nc0ZvckRheXMoeyBkYXlTdGFydCwgZGF5RW5kIH0pLm1hcChcbiAgICAoeyBldmVudHMsIC4uLnJlc3QgfSkgPT4gKHtcbiAgICAgIC4uLnJlc3QsXG4gICAgICBzdW1tYXJ5OiBzdW1tYXJ5KHRvdGFsVGltZSwgZXZlbnRzLCBjb25maWcpLFxuICAgIH0pXG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IHdlZWtseSA9IChkYXlTdGFydCwgZGF5RW5kLCBjb25maWcpID0+IHtcbiAgY29uc3QgdG90YWxUaW1lID1cbiAgICAodHdlbHZlSG91clRvRGF0ZShkYXlFbmQpIC0gdHdlbHZlSG91clRvRGF0ZShkYXlTdGFydCkpICogZ2V0RGF5cygpXG4gIGNvbnN0IHJlcyA9IGdldE1lZXRpbmdzKGRvY3VtZW50LCB7IGRheVN0YXJ0LCBkYXlFbmQgfSlcblxuICByZXR1cm4gc3VtbWFyeSh0b3RhbFRpbWUsIHJlcywgY29uZmlnKVxufVxuIiwiZXhwb3J0IGNvbnN0IHJnYlRvSGV4ID0gKHJnYlN0cmluZykgPT4ge1xuICBpZiAoIXJnYlN0cmluZykgcmV0dXJuIG51bGxcblxuICB2YXIgW3IsIGcsIGJdID0gcmdiU3RyaW5nXG4gICAgLnNsaWNlKDQsIC0xKVxuICAgIC5zcGxpdCgvLCA/LylcbiAgICAubWFwKChpKSA9PiAraSlcbiAgcmV0dXJuIFwiI1wiICsgKCgxIDw8IDI0KSArIChyIDw8IDE2KSArIChnIDw8IDgpICsgYikudG9TdHJpbmcoMTYpLnNsaWNlKDEpXG59XG5cbmV4cG9ydCBjb25zdCBhZGp1c3RDb2wgPSAoY29sLCBhbXQpID0+IHtcbiAgdmFyIHVzZVBvdW5kID0gZmFsc2VcblxuICBpZiAoY29sWzBdID09IFwiI1wiKSB7XG4gICAgY29sID0gY29sLnNsaWNlKDEpXG4gICAgdXNlUG91bmQgPSB0cnVlXG4gIH1cblxuICB2YXIgbnVtID0gcGFyc2VJbnQoY29sLCAxNilcblxuICB2YXIgciA9IChudW0gPj4gMTYpICsgYW10XG5cbiAgaWYgKHIgPiAyNTUpIHIgPSAyNTVcbiAgZWxzZSBpZiAociA8IDApIHIgPSAwXG5cbiAgdmFyIGIgPSAoKG51bSA+PiA4KSAmIDB4MDBmZikgKyBhbXRcblxuICBpZiAoYiA+IDI1NSkgYiA9IDI1NVxuICBlbHNlIGlmIChiIDwgMCkgYiA9IDBcblxuICB2YXIgZyA9IChudW0gJiAweDAwMDBmZikgKyBhbXRcblxuICBpZiAoZyA+IDI1NSkgZyA9IDI1NVxuICBlbHNlIGlmIChnIDwgMCkgZyA9IDBcblxuICByZXR1cm4gKHVzZVBvdW5kID8gXCIjXCIgOiBcIlwiKSArIChnIHwgKGIgPDwgOCkgfCAociA8PCAxNikpLnRvU3RyaW5nKDE2KVxufVxuIiwiZXhwb3J0IGNvbnN0IHR3ZWx2ZUhvdXJUb0RhdGUgPSAocykgPT4ge1xuICBjb25zb2xlLmxvZygncycsIHMpXG4gIHZhciBbdGltZSwgYW1wbV0gPSBbcy5zbGljZSgwLCAtMiksIHMuc2xpY2UoLTIpXVxuICB2YXIgW2hyLCBtaW4gPSAwXSA9IHRpbWUuc3BsaXQoJzonKVxuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcblxuICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKVxuICBkYXRlLnNldFNlY29uZHMoMClcbiAgZGF0ZS5zZXRNaW51dGVzKCttaW4pXG4gIDsoK2hyID09PSAxMilcbiAgICA/IGRhdGUuc2V0SG91cnMoYW1wbSA9PT0gJ2FtJyA/ICtociArIDEyIDogK2hyKVxuICAgIDogZGF0ZS5zZXRIb3VycyhhbXBtID09PSAnYW0nID8gK2hyIDogK2hyICsgMTIpXG5cbiAgcmV0dXJuIGRhdGVcbn1cbiIsImNvbnN0IGRheXMgPSAoZWwgPSBkb2N1bWVudCkgPT4gWy4uLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwiZ3JpZGNlbGxcIicpXVxuXG5leHBvcnQgY29uc3QgZ2V0RGF5cyA9IChlbCA9IGRvY3VtZW50KSA9PiBkYXlzKGVsKS5sZW5ndGggLyAyXG5leHBvcnQgY29uc3Qgc2VsZWN0RGF5cyA9IChlbCA9IGRvY3VtZW50KSA9PiB7XG4gIGNvbnN0IGQgPSBkYXlzKGVsKVxuICByZXR1cm4gZC5zbGljZShkLmxlbmd0aCAvIDIpXG59XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RNZWV0aW5ncyA9IChlbCA9IGRvY3VtZW50KSA9PlxuICBbLi4uZWwucXVlcnlTZWxlY3RvckFsbCgnZGl2W2RhdGEtb3BlbnMtZGV0YWlscz1cInRydWVcIl0nKV0uZmlsdGVyKChpKSA9PlxuICAgIC8oWzAtOV17MSwyfTpbMC05XXsyfXxbMC05XXsxLDJ9KVthcF1tIHRvIC8udGVzdChpLmlubmVyVGV4dClcbiAgKVxuIiwiLyoqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259IENhc2VGdW5jdGlvblxuICogQHBhcmFtIHsuLi4qfSBbYXJnc10gLSBMaXN0IG9mIGFyZ3MgcHJvdmlkZWQgdG8gYW5vbnltb3VzIGZ1bmN0aW9uXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259IFN3aXRjaEZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gW2M9J2RlZmF1bHQnXSAtIGNhc2Ugc3RyaW5nIHRvIG1hdGNoXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSAtIGFyZ3MgdG8gcGFzcyB0byBtYXRjaGVkIFN3aXRjaEZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7Kn0gLSBSZXN1bHQgb2YgbWF0Y2hpbmcgY2FzZSBpbiBTd2l0Y2hNYXAgZWl0aGVyIENhc2VGdW5jdGlvbiBjYWxsZWQgd2l0aCBhcmdzLCBvciB2YWx1ZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdDxzdHJpbmcsIENhc2VGdW5jdGlvbnwqPn0gU3dpdGNoTWFwXG4gKi9cblxuLyoqXG4gKiBzdy5qc1xuICpcbiAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYSBTd2l0Y2hNYXAgYW5kIHJldHVybnMgYSBTd2l0Y2hGdW5jdGlvbiB3aGljaFxuICogY2FuIGJlIGNhbGxlZCB3aXRoIGEgY2FzZSBwcm9wZXJ0eSBhbmQgZXh0cmEgYXJncyB0byBtYXRjaCB3aXRoXG4gKiBmdW5jdGlvblxuICpcbiAqIEBleGFtcGxlXG4gKiAgc3coe1xuICogICAgZm9vOiBpID0+IGkgKyAyLCAgIC8vIDVcbiAqICAgIGJhcjogJ2JheicsICAgICAgICAvLyBiYXJcbiAqICAgIGRlZmF1bHQ6IG51bGwsICAgICAvLyBudWxsXG4gKiAgfSkoJ2ZvbycsIDMpXG4gKlxuICogQHBhcmFtIHtTd2l0Y2hNYXB9IGNhc2VzIC0gQSBtYXAgb2Ygc3RyaW5nIGNhc2VzIHRvIHZhbHVlIG9yIENhc2VGdW5jdGlvbiBjYWxsXG4gKiBAcmV0dXJucyB7U3dpdGNoRnVuY3Rpb259XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2FzZXMgPT4gKGMsIC4uLmFyZ3MpID0+IHtcbiAgY29uc3QgZiA9IHt9Lmhhc093blByb3BlcnR5LmNhbGwoY2FzZXMsIGMpID8gY2FzZXNbY10gOiBjYXNlcy5kZWZhdWx0XG5cbiAgcmV0dXJuIGYgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IGYoLi4uYXJncykgOiBmXG59XG4iLCIvKiBnbG9iYWwgY2hyb21lICovXG5leHBvcnQgY29uc3QgY2xlYXIgPSAoa2V5LCBjYiA9ICgpID0+IHt9KSA9PiBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IFtrZXldOiB1bmRlZmluZWQgfSwgY2IpXG5leHBvcnQgY29uc3Qgc2V0ID0gKG8sIGNiID0gKCkgPT4ge30pID0+IGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KG8sIGNiKVxuZXhwb3J0IGNvbnN0IGdldCA9IChrZXksIGNiID0gKCkgPT4ge30pID0+IGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFtrZXldLCBjYilcbiJdLCJzb3VyY2VSb290IjoiIn0=
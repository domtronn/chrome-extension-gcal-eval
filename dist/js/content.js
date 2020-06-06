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
const chrome_storage_1 = __webpack_require__(/*! ./utils/chrome-storage */ "./src/app/utils/chrome-storage.js");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch_1.default({
        getSummary: ({ config = {} }) => {
            const summary = {
                weekly: summary_1.weekly(config.startTime || '9am', config.endTime || '5:30pm', config),
                daily: summary_1.daily(config.startTime || '9am', config.endTime || '5:30pm', config)
            };
            sendResponse(summary);
            chrome_storage_1.set({ summary });
        },
        unhighlight: modifications_1.unhighlight,
        highlightCategory: ({ color, day }) => modifications_1.highlight(color, day)
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
  const result = Object.entries(sum).filter(([key]) => key !== "null").filter(([, val]) => val > 0).map(([key, val]) => [config[key] || key, key, Math.floor(val / totalTime * 100), {
    h: new Date(val).getHours() - 1,
    m: new Date(val).getMinutes()
  }]);
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

/***/ "./src/app/utils/chrome-storage.js":
/*!*****************************************!*\
  !*** ./src/app/utils/chrome-storage.js ***!
  \*****************************************/
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
  var [time, ampm] = [s.slice(0, -2), s.slice(-2)];
  var [hr, min = 0] = time.split(":");
  var date = new Date();
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(+min);
  +hr === 12 ? date.setHours(ampm === "am" ? +hr + 12 : +hr) : date.setHours(ampm === "am" ? +hr : +hr + 12);
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29yZS9hbmFseXNpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvbW9kaWZpY2F0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvc3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2Nocm9tZS1zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvY29sLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3N3aXRjaC5qcyJdLCJuYW1lcyI6WyJnZXRNZWV0aW5nc0ZvckRheXMiLCJkYXlTdGFydCIsImRheUVuZCIsInNlbGVjdERheXMiLCJtYXAiLCJjb2x1bW4iLCJ0b3RhbCIsImRheSIsImRhdGUiLCJpbm5lclRleHQiLCJzcGxpdCIsImV2ZW50cyIsImdldE1lZXRpbmdzIiwiZWwiLCJkb2N1bWVudCIsInNlbGVjdE1lZXRpbmdzIiwibm9kZSIsInRpbWUiLCJuYW1lIiwic3RhdHVzIiwic3RhcnQiLCJlbmQiLCJpZCIsInJnYlRvSGV4Iiwic3R5bGUiLCJzdWJzdHJpbmciLCJNYXRoIiwibWF4IiwidHdlbHZlSG91clRvRGF0ZSIsIm1pbiIsImZpbHRlciIsImhpZ2hsaWdodCIsImNvbG9yIiwiZm9yRWFjaCIsImluY2x1ZGVzIiwib3BhY2l0eSIsInVuaGlnaGxpZ2h0Iiwic3VtbWFyeSIsInRvdGFsVGltZSIsInJlcyIsImNvbmZpZyIsInN1bSIsInJlZHVjZSIsImFjYyIsIml0IiwicmVzdWx0IiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsInZhbCIsImZsb29yIiwiaCIsIkRhdGUiLCJnZXRIb3VycyIsIm0iLCJnZXRNaW51dGVzIiwicmVtYWluaW5nIiwidmFsdWUiLCJkYWlseSIsInJlc3QiLCJ3ZWVrbHkiLCJnZXREYXlzIiwiY2xlYXIiLCJjYiIsImNocm9tZSIsInN0b3JhZ2UiLCJzeW5jIiwic2V0IiwidW5kZWZpbmVkIiwibyIsImdldCIsInJnYlN0cmluZyIsInIiLCJnIiwiYiIsInNsaWNlIiwiaSIsInRvU3RyaW5nIiwiYWRqdXN0Q29sIiwiY29sIiwiYW10IiwidXNlUG91bmQiLCJudW0iLCJwYXJzZUludCIsInMiLCJhbXBtIiwiaHIiLCJzZXRNaWxsaXNlY29uZHMiLCJzZXRTZWNvbmRzIiwic2V0TWludXRlcyIsInNldEhvdXJzIiwiZGF5cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJkIiwidGVzdCIsImNhc2VzIiwiYyIsImFyZ3MiLCJmIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZGVmYXVsdCIsIkZ1bmN0aW9uIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RB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Q0FBQyxHQUFHRCxFQUFFLENBQUMrRSxnQkFBSCxDQUFvQixnQ0FBcEIsQ0FBSixFQUEyRDlELE1BQTNELENBQW1FOEMsQ0FBRCxJQUNoRSw0Q0FBNENtQixJQUE1QyxDQUFpRG5CLENBQUMsQ0FBQ25FLFNBQW5ELENBREYsQ0FESyxDOzs7Ozs7Ozs7Ozs7QUNSUDtBQUFBOzs7OztBQUtBOzs7Ozs7O0FBT0E7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQmV1RixvRUFBSyxJQUFJLENBQUNDLENBQUQsRUFBSSxHQUFHQyxJQUFQLEtBQWdCO0FBQ3RDLFFBQU1DLENBQUMsR0FBRyxHQUFHQyxjQUFILENBQWtCQyxJQUFsQixDQUF1QkwsS0FBdkIsRUFBOEJDLENBQTlCLElBQW1DRCxLQUFLLENBQUNDLENBQUQsQ0FBeEMsR0FBOENELEtBQUssQ0FBQ00sT0FBOUQ7QUFFQSxTQUFPSCxDQUFDLFlBQVlJLFFBQWIsR0FBd0JKLENBQUMsQ0FBQyxHQUFHRCxJQUFKLENBQXpCLEdBQXFDQyxDQUE1QztBQUNELENBSkQsRSIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwL2NvbnRlbnQudHNcIik7XG4iLCJpbXBvcnQgc3cgZnJvbSAnLi91dGlscy9zd2l0Y2gnXG5pbXBvcnQgeyB3ZWVrbHksIGRhaWx5IH0gZnJvbSAnLi9jb3JlL3N1bW1hcnknXG5pbXBvcnQgeyBoaWdobGlnaHQsIHVuaGlnaGxpZ2h0IH0gZnJvbSAnLi9jb3JlL21vZGlmaWNhdGlvbnMnXG5cbmltcG9ydCB7IHNldCwgZ2V0IH0gZnJvbSAnLi91dGlscy9jaHJvbWUtc3RvcmFnZSdcblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICBzdyh7XG4gICAgZ2V0U3VtbWFyeTogKHsgY29uZmlnID0ge30gfSkgPT4ge1xuICAgICAgY29uc3Qgc3VtbWFyeSA9IHtcbiAgICAgICAgd2Vla2x5OiB3ZWVrbHkoY29uZmlnLnN0YXJ0VGltZSB8fCAnOWFtJywgY29uZmlnLmVuZFRpbWUgfHwgJzU6MzBwbScsIGNvbmZpZyksXG4gICAgICAgIGRhaWx5OiBkYWlseShjb25maWcuc3RhcnRUaW1lIHx8ICc5YW0nLCBjb25maWcuZW5kVGltZSB8fCAnNTozMHBtJywgY29uZmlnKVxuICAgICAgfVxuXG4gICAgICBzZW5kUmVzcG9uc2Uoc3VtbWFyeSlcblxuICAgICAgc2V0KHsgc3VtbWFyeSB9KVxuXG4gICAgfSxcblxuICAgIHVuaGlnaGxpZ2h0OiB1bmhpZ2hsaWdodCxcbiAgICBoaWdobGlnaHRDYXRlZ29yeTogKHsgY29sb3IsIGRheSB9KSA9PiBoaWdobGlnaHQoY29sb3IsIGRheSlcblxuICB9KShtZXNzYWdlLnR5cGUsIG1lc3NhZ2UpXG59KVxuIiwiaW1wb3J0IHsgcmdiVG9IZXggfSBmcm9tIFwiLi4vdXRpbHMvY29sXCJcbmltcG9ydCB7IHR3ZWx2ZUhvdXJUb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZVwiXG5cbmltcG9ydCB7IHNlbGVjdERheXMsIHNlbGVjdE1lZXRpbmdzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5cbmV4cG9ydCBjb25zdCBnZXRNZWV0aW5nc0ZvckRheXMgPSAoeyBkYXlTdGFydCwgZGF5RW5kIH0pID0+XG4gIHNlbGVjdERheXMoKS5tYXAoKGNvbHVtbikgPT4ge1xuICAgIGNvbnN0IFt0b3RhbCwgZGF5LCBkYXRlXSA9IGNvbHVtbi5pbm5lclRleHQuc3BsaXQoXCIsIFwiKVxuICAgIHJldHVybiB7XG4gICAgICB0b3RhbCxcbiAgICAgIGRheSxcbiAgICAgIGRhdGUsXG4gICAgICBldmVudHM6IGdldE1lZXRpbmdzKGNvbHVtbiwgeyBkYXlTdGFydCwgZGF5RW5kIH0pLFxuICAgIH1cbiAgfSlcblxuZXhwb3J0IGNvbnN0IGdldE1lZXRpbmdzID0gKGVsID0gZG9jdW1lbnQsIHsgZGF5U3RhcnQsIGRheUVuZCB9KSA9PlxuICBzZWxlY3RNZWV0aW5ncyhlbClcbiAgICAubWFwKChub2RlKSA9PiB7XG4gICAgICB2YXIgW3RpbWUsIG5hbWUsICwgc3RhdHVzXSA9IG5vZGUuaW5uZXJUZXh0LnNwbGl0KFwiLCBcIilcbiAgICAgIHZhciBbc3RhcnQsIGVuZF0gPSB0aW1lLnNwbGl0KFwiIHRvIFwiKVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogcmdiVG9IZXgobm9kZS5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0uc3Vic3RyaW5nKCkpLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHRpbWU6IHtcbiAgICAgICAgICBzdGFydDogTWF0aC5tYXgodHdlbHZlSG91clRvRGF0ZShkYXlTdGFydCksIHR3ZWx2ZUhvdXJUb0RhdGUoc3RhcnQpKSxcbiAgICAgICAgICBlbmQ6IE1hdGgubWluKHR3ZWx2ZUhvdXJUb0RhdGUoZGF5RW5kKSwgdHdlbHZlSG91clRvRGF0ZShlbmQpKSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9KVxuICAgIC5maWx0ZXIoKHsgc3RhdHVzIH0pID0+IHN0YXR1cyAhPT0gXCJEZWNsaW5lZFwiKVxuIiwiaW1wb3J0IHsgcmdiVG9IZXggfSBmcm9tIFwiLi4vdXRpbHMvY29sXCJcbmltcG9ydCB7IHNlbGVjdERheXMsIHNlbGVjdE1lZXRpbmdzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHQgPSAoY29sb3IsIGRheSkgPT4ge1xuICBzZWxlY3REYXlzKCkuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgc2VsZWN0TWVldGluZ3MoY29sdW1uKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgICghZGF5IHx8IGNvbHVtbi5pbm5lclRleHQuaW5jbHVkZXMoZGF5KSkgJiZcbiAgICAgICAgcmdiVG9IZXgobm9kZS5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0pID09PSBjb2xvclxuICAgICAgKSB7XG4gICAgICAgIG5vZGUuc3R5bGUub3BhY2l0eSA9IDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuc3R5bGUub3BhY2l0eSA9IDAuMlxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCB1bmhpZ2hsaWdodCA9ICgpID0+XG4gIHNlbGVjdE1lZXRpbmdzKCkuZm9yRWFjaCgobm9kZSkgPT4gKG5vZGUuc3R5bGUub3BhY2l0eSA9IDEpKVxuIiwiaW1wb3J0IHsgdHdlbHZlSG91clRvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9kYXRlXCJcbmltcG9ydCB7IGdldERheXMgfSBmcm9tIFwiLi4vdXRpbHMvc2VsZWN0b3JzXCJcbmltcG9ydCB7IGdldE1lZXRpbmdzLCBnZXRNZWV0aW5nc0ZvckRheXMgfSBmcm9tIFwiLi9hbmFseXNpc1wiXG5cbnZhciBzdW1tYXJ5ID0gKHRvdGFsVGltZSwgcmVzLCBjb25maWcgPSB7fSkgPT4ge1xuICBjb25zdCBzdW0gPSByZXMucmVkdWNlKFxuICAgIChhY2MsIGl0KSA9PiAoe1xuICAgICAgLi4uYWNjLFxuICAgICAgW2l0LmlkXTogKGFjY1tpdC5pZF0gfHwgMCkgKyBNYXRoLm1heCgwLCBpdC50aW1lLmVuZCAtIGl0LnRpbWUuc3RhcnQpLFxuICAgIH0pLFxuICAgIHt9XG4gIClcblxuICBjb25zdCByZXN1bHQgPSBPYmplY3QuZW50cmllcyhzdW0pXG4gICAgLmZpbHRlcigoW2tleV0pID0+IGtleSAhPT0gXCJudWxsXCIpXG4gICAgLmZpbHRlcigoWywgdmFsXSkgPT4gdmFsID4gMClcbiAgICAubWFwKChba2V5LCB2YWxdKSA9PiBbXG4gICAgICBjb25maWdba2V5XSB8fCBrZXksXG4gICAgICBrZXksXG4gICAgICBNYXRoLmZsb29yKCh2YWwgLyB0b3RhbFRpbWUpICogMTAwKSxcbiAgICAgIHsgaDogbmV3IERhdGUodmFsKS5nZXRIb3VycygpIC0gMSwgbTogbmV3IERhdGUodmFsKS5nZXRNaW51dGVzKCkgfSxcbiAgICBdKVxuXG4gIGNvbnN0IHJlbWFpbmluZyA9IDEwMCAtIHJlc3VsdC5yZWR1Y2UoKGFjYywgWywgLCB2YWx1ZV0pID0+IGFjYyArIHZhbHVlLCAwKVxuXG4gIHJldHVybiBbW1wiZnJlZVwiLCBcIiNmZmZmZmZcIiwgcmVtYWluaW5nXSwgLi4ucmVzdWx0XVxufVxuXG4vKipcbiAqIEkvTyBzdW1tYXJpZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGRhaWx5ID0gKGRheVN0YXJ0LCBkYXlFbmQsIGNvbmZpZykgPT4ge1xuICBjb25zdCB0b3RhbFRpbWUgPSB0d2VsdmVIb3VyVG9EYXRlKGRheUVuZCkgLSB0d2VsdmVIb3VyVG9EYXRlKGRheVN0YXJ0KVxuXG4gIHJldHVybiBnZXRNZWV0aW5nc0ZvckRheXMoeyBkYXlTdGFydCwgZGF5RW5kIH0pLm1hcChcbiAgICAoeyBldmVudHMsIC4uLnJlc3QgfSkgPT4gKHtcbiAgICAgIC4uLnJlc3QsXG4gICAgICBzdW1tYXJ5OiBzdW1tYXJ5KHRvdGFsVGltZSwgZXZlbnRzLCBjb25maWcpLFxuICAgIH0pXG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IHdlZWtseSA9IChkYXlTdGFydCwgZGF5RW5kLCBjb25maWcpID0+IHtcbiAgY29uc3QgdG90YWxUaW1lID1cbiAgICAodHdlbHZlSG91clRvRGF0ZShkYXlFbmQpIC0gdHdlbHZlSG91clRvRGF0ZShkYXlTdGFydCkpICogZ2V0RGF5cygpXG4gIGNvbnN0IHJlcyA9IGdldE1lZXRpbmdzKGRvY3VtZW50LCB7IGRheVN0YXJ0LCBkYXlFbmQgfSlcblxuICByZXR1cm4gc3VtbWFyeSh0b3RhbFRpbWUsIHJlcywgY29uZmlnKVxufVxuIiwiLyogZ2xvYmFsIGNocm9tZSAqL1xuZXhwb3J0IGNvbnN0IGNsZWFyID0gKGtleSwgY2IgPSAoKSA9PiB7fSkgPT4gY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBba2V5XTogdW5kZWZpbmVkIH0sIGNiKVxuZXhwb3J0IGNvbnN0IHNldCA9IChvLCBjYiA9ICgpID0+IHt9KSA9PiBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldChvLCBjYilcbmV4cG9ydCBjb25zdCBnZXQgPSAoa2V5LCBjYiA9ICgpID0+IHt9KSA9PiBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChba2V5XSwgY2IpXG4iLCJleHBvcnQgY29uc3QgcmdiVG9IZXggPSAocmdiU3RyaW5nKSA9PiB7XG4gIGlmICghcmdiU3RyaW5nKSByZXR1cm4gbnVsbFxuXG4gIHZhciBbciwgZywgYl0gPSByZ2JTdHJpbmdcbiAgICAuc2xpY2UoNCwgLTEpXG4gICAgLnNwbGl0KC8sID8vKVxuICAgIC5tYXAoKGkpID0+ICtpKVxuICByZXR1cm4gXCIjXCIgKyAoKDEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikuc2xpY2UoMSlcbn1cblxuZXhwb3J0IGNvbnN0IGFkanVzdENvbCA9IChjb2wsIGFtdCkgPT4ge1xuICB2YXIgdXNlUG91bmQgPSBmYWxzZVxuXG4gIGlmIChjb2xbMF0gPT0gXCIjXCIpIHtcbiAgICBjb2wgPSBjb2wuc2xpY2UoMSlcbiAgICB1c2VQb3VuZCA9IHRydWVcbiAgfVxuXG4gIHZhciBudW0gPSBwYXJzZUludChjb2wsIDE2KVxuXG4gIHZhciByID0gKG51bSA+PiAxNikgKyBhbXRcblxuICBpZiAociA+IDI1NSkgciA9IDI1NVxuICBlbHNlIGlmIChyIDwgMCkgciA9IDBcblxuICB2YXIgYiA9ICgobnVtID4+IDgpICYgMHgwMGZmKSArIGFtdFxuXG4gIGlmIChiID4gMjU1KSBiID0gMjU1XG4gIGVsc2UgaWYgKGIgPCAwKSBiID0gMFxuXG4gIHZhciBnID0gKG51bSAmIDB4MDAwMGZmKSArIGFtdFxuXG4gIGlmIChnID4gMjU1KSBnID0gMjU1XG4gIGVsc2UgaWYgKGcgPCAwKSBnID0gMFxuXG4gIHJldHVybiAodXNlUG91bmQgPyBcIiNcIiA6IFwiXCIpICsgKGcgfCAoYiA8PCA4KSB8IChyIDw8IDE2KSkudG9TdHJpbmcoMTYpXG59XG4iLCJleHBvcnQgY29uc3QgdHdlbHZlSG91clRvRGF0ZSA9IChzKSA9PiB7XG4gIHZhciBbdGltZSwgYW1wbV0gPSBbcy5zbGljZSgwLCAtMiksIHMuc2xpY2UoLTIpXVxuICB2YXIgW2hyLCBtaW4gPSAwXSA9IHRpbWUuc3BsaXQoXCI6XCIpXG4gIHZhciBkYXRlID0gbmV3IERhdGUoKVxuXG4gIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApXG4gIGRhdGUuc2V0U2Vjb25kcygwKVxuICBkYXRlLnNldE1pbnV0ZXMoK21pbilcbiAgOytociA9PT0gMTJcbiAgICA/IGRhdGUuc2V0SG91cnMoYW1wbSA9PT0gXCJhbVwiID8gK2hyICsgMTIgOiAraHIpXG4gICAgOiBkYXRlLnNldEhvdXJzKGFtcG0gPT09IFwiYW1cIiA/ICtociA6ICtociArIDEyKVxuXG4gIHJldHVybiBkYXRlXG59XG4iLCJjb25zdCBkYXlzID0gKGVsID0gZG9jdW1lbnQpID0+IFsuLi5lbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cImdyaWRjZWxsXCInKV1cblxuZXhwb3J0IGNvbnN0IGdldERheXMgPSAoZWwgPSBkb2N1bWVudCkgPT4gZGF5cyhlbCkubGVuZ3RoIC8gMlxuZXhwb3J0IGNvbnN0IHNlbGVjdERheXMgPSAoZWwgPSBkb2N1bWVudCkgPT4ge1xuICBjb25zdCBkID0gZGF5cyhlbClcbiAgcmV0dXJuIGQuc2xpY2UoZC5sZW5ndGggLyAyKVxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0TWVldGluZ3MgPSAoZWwgPSBkb2N1bWVudCkgPT5cbiAgWy4uLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdltkYXRhLW9wZW5zLWRldGFpbHM9XCJ0cnVlXCJdJyldLmZpbHRlcigoaSkgPT5cbiAgICAvKFswLTldezEsMn06WzAtOV17Mn18WzAtOV17MSwyfSlbYXBdbSB0byAvLnRlc3QoaS5pbm5lclRleHQpXG4gIClcbiIsIi8qKlxuICogQHR5cGVkZWYge0Z1bmN0aW9ufSBDYXNlRnVuY3Rpb25cbiAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdIC0gTGlzdCBvZiBhcmdzIHByb3ZpZGVkIHRvIGFub255bW91cyBmdW5jdGlvblxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge0Z1bmN0aW9ufSBTd2l0Y2hGdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IFtjPSdkZWZhdWx0J10gLSBjYXNlIHN0cmluZyB0byBtYXRjaFxuICogQHBhcmFtIHsuLi4qfSBbYXJnc10gLSBhcmdzIHRvIHBhc3MgdG8gbWF0Y2hlZCBTd2l0Y2hGdW5jdGlvblxuICogQHJldHVybnMgeyp9IC0gUmVzdWx0IG9mIG1hdGNoaW5nIGNhc2UgaW4gU3dpdGNoTWFwIGVpdGhlciBDYXNlRnVuY3Rpb24gY2FsbGVkIHdpdGggYXJncywgb3IgdmFsdWVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3Q8c3RyaW5nLCBDYXNlRnVuY3Rpb258Kj59IFN3aXRjaE1hcFxuICovXG5cbi8qKlxuICogc3cuanNcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGEgU3dpdGNoTWFwIGFuZCByZXR1cm5zIGEgU3dpdGNoRnVuY3Rpb24gd2hpY2hcbiAqIGNhbiBiZSBjYWxsZWQgd2l0aCBhIGNhc2UgcHJvcGVydHkgYW5kIGV4dHJhIGFyZ3MgdG8gbWF0Y2ggd2l0aFxuICogZnVuY3Rpb25cbiAqXG4gKiBAZXhhbXBsZVxuICogIHN3KHtcbiAqICAgIGZvbzogaSA9PiBpICsgMiwgICAvLyA1XG4gKiAgICBiYXI6ICdiYXonLCAgICAgICAgLy8gYmFyXG4gKiAgICBkZWZhdWx0OiBudWxsLCAgICAgLy8gbnVsbFxuICogIH0pKCdmb28nLCAzKVxuICpcbiAqIEBwYXJhbSB7U3dpdGNoTWFwfSBjYXNlcyAtIEEgbWFwIG9mIHN0cmluZyBjYXNlcyB0byB2YWx1ZSBvciBDYXNlRnVuY3Rpb24gY2FsbFxuICogQHJldHVybnMge1N3aXRjaEZ1bmN0aW9ufVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNhc2VzID0+IChjLCAuLi5hcmdzKSA9PiB7XG4gIGNvbnN0IGYgPSB7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNhc2VzLCBjKSA/IGNhc2VzW2NdIDogY2FzZXMuZGVmYXVsdFxuXG4gIHJldHVybiBmIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBmKC4uLmFyZ3MpIDogZlxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
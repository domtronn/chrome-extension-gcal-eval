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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/content.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/content.js":
/*!****************************!*\
  !*** ./src/app/content.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_switch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/switch */ "./src/app/utils/switch.js");
/* harmony import */ var _core_summary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/summary */ "./src/app/core/summary.js");
/* harmony import */ var _core_modifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/modifications */ "./src/app/core/modifications.js");
/* harmony import */ var _utils_chrome_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/chrome-storage */ "./src/app/utils/chrome-storage.js");




chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  Object(_utils_switch__WEBPACK_IMPORTED_MODULE_0__["default"])({
    getSummary: ({
      config
    }) => {
      const summary = {
        weekly: Object(_core_summary__WEBPACK_IMPORTED_MODULE_1__["weekly"])(config.startTime || "9am", config.endTime || "5:30pm", config),
        daily: Object(_core_summary__WEBPACK_IMPORTED_MODULE_1__["daily"])(config.startTime || "9am", config.endTime || "5:30pm", config)
      };
      sendResponse(summary);
      Object(_utils_chrome_storage__WEBPACK_IMPORTED_MODULE_3__["set"])({
        summary
      });
    },
    unhighlight: () => Object(_core_modifications__WEBPACK_IMPORTED_MODULE_2__["unhighlight"])(),
    highlightCategory: ({
      color,
      day
    }) => Object(_core_modifications__WEBPACK_IMPORTED_MODULE_2__["highlight"])(color, day)
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
      if ((day === "Weekly" || column.innerText.includes(day)) && Object(_utils_col__WEBPACK_IMPORTED_MODULE_0__["rgbToHex"])(node.style["background-color"]) === color) {
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
  const result = Object.entries(sum).filter(([key]) => key !== "null").filter(([key, val]) => {
    console.log(key, val);
    return val > 0;
  }).map(([key, val]) => [config[key] || key, key, Math.ceil(val / totalTime * 100), {
    h: new Date(val).getHours() - 1,
    m: new Date(val).getMinutes()
  }]);
  const remaining = 100 - result.reduce((acc, [,, value]) => acc + value, 0);
  return [[config["#fff"] || config["#ffffff"] || "Free time", "#ffffff", remaining, {
    h: new Date(remaining / 100 * totalTime).getHours() - 1,
    m: new Date(remaining / 100 * totalTime).getMinutes()
  }], ...result];
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
  const totalEvents = Object(_analysis__WEBPACK_IMPORTED_MODULE_2__["getMeetingsForDays"])({
    dayStart,
    dayEnd
  }).reduce((acc, {
    total
  }) => acc + parseInt(total), 0);
  const totalTime = (Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["twelveHourToDate"])(dayEnd) - Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["twelveHourToDate"])(dayStart)) * Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_1__["getDays"])();
  const res = Object(_analysis__WEBPACK_IMPORTED_MODULE_2__["getMeetings"])(document, {
    dayStart,
    dayEnd
  });
  return {
    day: "Weekly",
    total: `${totalEvents} events`,
    summary: summary(totalTime, res, config)
  };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29yZS9hbmFseXNpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvbW9kaWZpY2F0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvc3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2Nocm9tZS1zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvY29sLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3N3aXRjaC5qcyJdLCJuYW1lcyI6WyJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJtZXNzYWdlIiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwic3ciLCJnZXRTdW1tYXJ5IiwiY29uZmlnIiwic3VtbWFyeSIsIndlZWtseSIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkYWlseSIsInNldCIsInVuaGlnaGxpZ2h0IiwiaGlnaGxpZ2h0Q2F0ZWdvcnkiLCJjb2xvciIsImRheSIsImhpZ2hsaWdodCIsInR5cGUiLCJnZXRNZWV0aW5nc0ZvckRheXMiLCJkYXlTdGFydCIsImRheUVuZCIsInNlbGVjdERheXMiLCJtYXAiLCJjb2x1bW4iLCJ0b3RhbCIsImRhdGUiLCJpbm5lclRleHQiLCJzcGxpdCIsImV2ZW50cyIsImdldE1lZXRpbmdzIiwiZWwiLCJkb2N1bWVudCIsInNlbGVjdE1lZXRpbmdzIiwibm9kZSIsInRpbWUiLCJuYW1lIiwic3RhdHVzIiwic3RhcnQiLCJlbmQiLCJpZCIsInJnYlRvSGV4Iiwic3R5bGUiLCJzdWJzdHJpbmciLCJNYXRoIiwibWF4IiwidHdlbHZlSG91clRvRGF0ZSIsIm1pbiIsImZpbHRlciIsImZvckVhY2giLCJpbmNsdWRlcyIsIm9wYWNpdHkiLCJ0b3RhbFRpbWUiLCJyZXMiLCJzdW0iLCJyZWR1Y2UiLCJhY2MiLCJpdCIsInJlc3VsdCIsIk9iamVjdCIsImVudHJpZXMiLCJrZXkiLCJ2YWwiLCJjb25zb2xlIiwibG9nIiwiY2VpbCIsImgiLCJEYXRlIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsInJlbWFpbmluZyIsInZhbHVlIiwicmVzdCIsInRvdGFsRXZlbnRzIiwicGFyc2VJbnQiLCJnZXREYXlzIiwiY2xlYXIiLCJjYiIsInN0b3JhZ2UiLCJzeW5jIiwidW5kZWZpbmVkIiwibyIsImdldCIsInJnYlN0cmluZyIsInIiLCJnIiwiYiIsInNsaWNlIiwiaSIsInRvU3RyaW5nIiwiYWRqdXN0Q29sIiwiY29sIiwiYW10IiwidXNlUG91bmQiLCJudW0iLCJzIiwiYW1wbSIsImhyIiwic2V0TWlsbGlzZWNvbmRzIiwic2V0U2Vjb25kcyIsInNldE1pbnV0ZXMiLCJzZXRIb3VycyIsImRheXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiZCIsInRlc3QiLCJjYXNlcyIsImMiLCJhcmdzIiwiZiIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlZmF1bHQiLCJGdW5jdGlvbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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QyxDQUFDOUQsU0FBbkQsQ0FERixDQURLLEM7Ozs7Ozs7Ozs7OztBQ1JQO0FBQUE7Ozs7O0FBS0E7Ozs7Ozs7QUFPQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWtCZWlGLG9FQUFLLElBQUksQ0FBQ0MsQ0FBRCxFQUFJLEdBQUdDLElBQVAsS0FBZ0I7QUFDdEMsUUFBTUMsQ0FBQyxHQUFHLEdBQUdDLGNBQUgsQ0FBa0JDLElBQWxCLENBQXVCTCxLQUF2QixFQUE4QkMsQ0FBOUIsSUFBbUNELEtBQUssQ0FBQ0MsQ0FBRCxDQUF4QyxHQUE4Q0QsS0FBSyxDQUFDTSxPQUE5RDtBQUVBLFNBQU9ILENBQUMsWUFBWUksUUFBYixHQUF3QkosQ0FBQyxDQUFDLEdBQUdELElBQUosQ0FBekIsR0FBcUNDLENBQTVDO0FBQ0QsQ0FKRCxFIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hcHAvY29udGVudC5qc1wiKTtcbiIsImltcG9ydCBzdyBmcm9tIFwiLi91dGlscy9zd2l0Y2hcIlxuaW1wb3J0IHsgd2Vla2x5LCBkYWlseSB9IGZyb20gXCIuL2NvcmUvc3VtbWFyeVwiXG5pbXBvcnQgeyBoaWdobGlnaHQsIHVuaGlnaGxpZ2h0IH0gZnJvbSBcIi4vY29yZS9tb2RpZmljYXRpb25zXCJcblxuaW1wb3J0IHsgc2V0LCBnZXQgfSBmcm9tIFwiLi91dGlscy9jaHJvbWUtc3RvcmFnZVwiXG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgc3coe1xuICAgIGdldFN1bW1hcnk6ICh7IGNvbmZpZyB9KSA9PiB7XG4gICAgICBjb25zdCBzdW1tYXJ5ID0ge1xuICAgICAgICB3ZWVrbHk6IHdlZWtseShcbiAgICAgICAgICBjb25maWcuc3RhcnRUaW1lIHx8IFwiOWFtXCIsXG4gICAgICAgICAgY29uZmlnLmVuZFRpbWUgfHwgXCI1OjMwcG1cIixcbiAgICAgICAgICBjb25maWdcbiAgICAgICAgKSxcbiAgICAgICAgZGFpbHk6IGRhaWx5KFxuICAgICAgICAgIGNvbmZpZy5zdGFydFRpbWUgfHwgXCI5YW1cIixcbiAgICAgICAgICBjb25maWcuZW5kVGltZSB8fCBcIjU6MzBwbVwiLFxuICAgICAgICAgIGNvbmZpZ1xuICAgICAgICApLFxuICAgICAgfVxuXG4gICAgICBzZW5kUmVzcG9uc2Uoc3VtbWFyeSlcblxuICAgICAgc2V0KHsgc3VtbWFyeSB9KVxuICAgIH0sXG5cbiAgICB1bmhpZ2hsaWdodDogKCkgPT4gdW5oaWdobGlnaHQoKSxcbiAgICBoaWdobGlnaHRDYXRlZ29yeTogKHsgY29sb3IsIGRheSB9KSA9PiBoaWdobGlnaHQoY29sb3IsIGRheSksXG4gIH0pKG1lc3NhZ2UudHlwZSwgbWVzc2FnZSlcbn0pXG4iLCJpbXBvcnQgeyByZ2JUb0hleCB9IGZyb20gXCIuLi91dGlscy9jb2xcIlxuaW1wb3J0IHsgdHdlbHZlSG91clRvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9kYXRlXCJcblxuaW1wb3J0IHsgc2VsZWN0RGF5cywgc2VsZWN0TWVldGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvc2VsZWN0b3JzXCJcblxuZXhwb3J0IGNvbnN0IGdldE1lZXRpbmdzRm9yRGF5cyA9ICh7IGRheVN0YXJ0LCBkYXlFbmQgfSkgPT5cbiAgc2VsZWN0RGF5cygpLm1hcCgoY29sdW1uKSA9PiB7XG4gICAgY29uc3QgW3RvdGFsLCBkYXksIGRhdGVdID0gY29sdW1uLmlubmVyVGV4dC5zcGxpdChcIiwgXCIpXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvdGFsLFxuICAgICAgZGF5LFxuICAgICAgZGF0ZSxcbiAgICAgIGV2ZW50czogZ2V0TWVldGluZ3MoY29sdW1uLCB7IGRheVN0YXJ0LCBkYXlFbmQgfSksXG4gICAgfVxuICB9KVxuXG5leHBvcnQgY29uc3QgZ2V0TWVldGluZ3MgPSAoZWwgPSBkb2N1bWVudCwgeyBkYXlTdGFydCwgZGF5RW5kIH0pID0+XG4gIHNlbGVjdE1lZXRpbmdzKGVsKVxuICAgIC5tYXAoKG5vZGUpID0+IHtcbiAgICAgIHZhciBbdGltZSwgbmFtZSwgLCBzdGF0dXNdID0gbm9kZS5pbm5lclRleHQuc3BsaXQoXCIsIFwiKVxuICAgICAgdmFyIFtzdGFydCwgZW5kXSA9IHRpbWUuc3BsaXQoXCIgdG8gXCIpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiByZ2JUb0hleChub2RlLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXS5zdWJzdHJpbmcoKSksXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdGltZToge1xuICAgICAgICAgIHN0YXJ0OiBNYXRoLm1heCh0d2VsdmVIb3VyVG9EYXRlKGRheVN0YXJ0KSwgdHdlbHZlSG91clRvRGF0ZShzdGFydCkpLFxuICAgICAgICAgIGVuZDogTWF0aC5taW4odHdlbHZlSG91clRvRGF0ZShkYXlFbmQpLCB0d2VsdmVIb3VyVG9EYXRlKGVuZCkpLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH0pXG4gICAgLmZpbHRlcigoeyBzdGF0dXMgfSkgPT4gc3RhdHVzICE9PSBcIkRlY2xpbmVkXCIpXG4iLCJpbXBvcnQgeyByZ2JUb0hleCB9IGZyb20gXCIuLi91dGlscy9jb2xcIlxuaW1wb3J0IHsgc2VsZWN0RGF5cywgc2VsZWN0TWVldGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvc2VsZWN0b3JzXCJcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodCA9IChjb2xvciwgZGF5KSA9PiB7XG4gIHNlbGVjdERheXMoKS5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICBzZWxlY3RNZWV0aW5ncyhjb2x1bW4pLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgKGRheSA9PT0gXCJXZWVrbHlcIiB8fCBjb2x1bW4uaW5uZXJUZXh0LmluY2x1ZGVzKGRheSkpICYmXG4gICAgICAgIHJnYlRvSGV4KG5vZGUuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdKSA9PT0gY29sb3JcbiAgICAgICkge1xuICAgICAgICBub2RlLnN0eWxlLm9wYWNpdHkgPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnN0eWxlLm9wYWNpdHkgPSAwLjJcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgdW5oaWdobGlnaHQgPSAoKSA9PlxuICBzZWxlY3RNZWV0aW5ncygpLmZvckVhY2goKG5vZGUpID0+IChub2RlLnN0eWxlLm9wYWNpdHkgPSAxKSlcbiIsImltcG9ydCB7IHR3ZWx2ZUhvdXJUb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZVwiXG5pbXBvcnQgeyBnZXREYXlzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5pbXBvcnQgeyBnZXRNZWV0aW5ncywgZ2V0TWVldGluZ3NGb3JEYXlzIH0gZnJvbSBcIi4vYW5hbHlzaXNcIlxuXG52YXIgc3VtbWFyeSA9ICh0b3RhbFRpbWUsIHJlcywgY29uZmlnID0ge30pID0+IHtcbiAgY29uc3Qgc3VtID0gcmVzLnJlZHVjZShcbiAgICAoYWNjLCBpdCkgPT4gKHtcbiAgICAgIC4uLmFjYyxcbiAgICAgIFtpdC5pZF06IChhY2NbaXQuaWRdIHx8IDApICsgTWF0aC5tYXgoMCwgaXQudGltZS5lbmQgLSBpdC50aW1lLnN0YXJ0KSxcbiAgICB9KSxcbiAgICB7fVxuICApXG5cbiAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmVudHJpZXMoc3VtKVxuICAgIC5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09IFwibnVsbFwiKVxuICAgIC5maWx0ZXIoKFtrZXksIHZhbF0pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGtleSwgdmFsKVxuICAgICAgcmV0dXJuIHZhbCA+IDBcbiAgICB9KVxuICAgIC5tYXAoKFtrZXksIHZhbF0pID0+IFtcbiAgICAgIGNvbmZpZ1trZXldIHx8IGtleSxcbiAgICAgIGtleSxcbiAgICAgIE1hdGguY2VpbCgodmFsIC8gdG90YWxUaW1lKSAqIDEwMCksXG4gICAgICB7IGg6IG5ldyBEYXRlKHZhbCkuZ2V0SG91cnMoKSAtIDEsIG06IG5ldyBEYXRlKHZhbCkuZ2V0TWludXRlcygpIH0sXG4gICAgXSlcblxuICBjb25zdCByZW1haW5pbmcgPSAxMDAgLSByZXN1bHQucmVkdWNlKChhY2MsIFssICwgdmFsdWVdKSA9PiBhY2MgKyB2YWx1ZSwgMClcblxuICByZXR1cm4gW1xuICAgIFtcbiAgICAgIGNvbmZpZ1tcIiNmZmZcIl0gfHwgY29uZmlnW1wiI2ZmZmZmZlwiXSB8fCBcIkZyZWUgdGltZVwiLFxuICAgICAgXCIjZmZmZmZmXCIsXG4gICAgICByZW1haW5pbmcsXG4gICAgICB7XG4gICAgICAgIGg6IG5ldyBEYXRlKChyZW1haW5pbmcgLyAxMDApICogdG90YWxUaW1lKS5nZXRIb3VycygpIC0gMSxcbiAgICAgICAgbTogbmV3IERhdGUoKHJlbWFpbmluZyAvIDEwMCkgKiB0b3RhbFRpbWUpLmdldE1pbnV0ZXMoKSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICAuLi5yZXN1bHQsXG4gIF1cbn1cblxuLyoqXG4gKiBJL08gc3VtbWFyaWVzXG4gKi9cbmV4cG9ydCBjb25zdCBkYWlseSA9IChkYXlTdGFydCwgZGF5RW5kLCBjb25maWcpID0+IHtcbiAgY29uc3QgdG90YWxUaW1lID0gdHdlbHZlSG91clRvRGF0ZShkYXlFbmQpIC0gdHdlbHZlSG91clRvRGF0ZShkYXlTdGFydClcblxuICByZXR1cm4gZ2V0TWVldGluZ3NGb3JEYXlzKHsgZGF5U3RhcnQsIGRheUVuZCB9KS5tYXAoXG4gICAgKHsgZXZlbnRzLCAuLi5yZXN0IH0pID0+ICh7XG4gICAgICAuLi5yZXN0LFxuICAgICAgc3VtbWFyeTogc3VtbWFyeSh0b3RhbFRpbWUsIGV2ZW50cywgY29uZmlnKSxcbiAgICB9KVxuICApXG59XG5cbmV4cG9ydCBjb25zdCB3ZWVrbHkgPSAoZGF5U3RhcnQsIGRheUVuZCwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHRvdGFsRXZlbnRzID0gZ2V0TWVldGluZ3NGb3JEYXlzKHsgZGF5U3RhcnQsIGRheUVuZCB9KS5yZWR1Y2UoXG4gICAgKGFjYywgeyB0b3RhbCB9KSA9PiBhY2MgKyBwYXJzZUludCh0b3RhbCksXG4gICAgMFxuICApXG5cbiAgY29uc3QgdG90YWxUaW1lID1cbiAgICAodHdlbHZlSG91clRvRGF0ZShkYXlFbmQpIC0gdHdlbHZlSG91clRvRGF0ZShkYXlTdGFydCkpICogZ2V0RGF5cygpXG5cbiAgY29uc3QgcmVzID0gZ2V0TWVldGluZ3MoZG9jdW1lbnQsIHsgZGF5U3RhcnQsIGRheUVuZCB9KVxuXG4gIHJldHVybiB7XG4gICAgZGF5OiBcIldlZWtseVwiLFxuICAgIHRvdGFsOiBgJHt0b3RhbEV2ZW50c30gZXZlbnRzYCxcbiAgICBzdW1tYXJ5OiBzdW1tYXJ5KHRvdGFsVGltZSwgcmVzLCBjb25maWcpLFxuICB9XG59XG4iLCIvKiBnbG9iYWwgY2hyb21lICovXG5leHBvcnQgY29uc3QgY2xlYXIgPSAoa2V5LCBjYiA9ICgpID0+IHt9KSA9PiBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IFtrZXldOiB1bmRlZmluZWQgfSwgY2IpXG5leHBvcnQgY29uc3Qgc2V0ID0gKG8sIGNiID0gKCkgPT4ge30pID0+IGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KG8sIGNiKVxuZXhwb3J0IGNvbnN0IGdldCA9IChrZXksIGNiID0gKCkgPT4ge30pID0+IGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFtrZXldLCBjYilcbiIsImV4cG9ydCBjb25zdCByZ2JUb0hleCA9IChyZ2JTdHJpbmcpID0+IHtcbiAgaWYgKCFyZ2JTdHJpbmcpIHJldHVybiBudWxsXG5cbiAgdmFyIFtyLCBnLCBiXSA9IHJnYlN0cmluZ1xuICAgIC5zbGljZSg0LCAtMSlcbiAgICAuc3BsaXQoLywgPy8pXG4gICAgLm1hcCgoaSkgPT4gK2kpXG4gIHJldHVybiBcIiNcIiArICgoMSA8PCAyNCkgKyAociA8PCAxNikgKyAoZyA8PCA4KSArIGIpLnRvU3RyaW5nKDE2KS5zbGljZSgxKVxufVxuXG5leHBvcnQgY29uc3QgYWRqdXN0Q29sID0gKGNvbCwgYW10KSA9PiB7XG4gIHZhciB1c2VQb3VuZCA9IGZhbHNlXG5cbiAgaWYgKGNvbFswXSA9PSBcIiNcIikge1xuICAgIGNvbCA9IGNvbC5zbGljZSgxKVxuICAgIHVzZVBvdW5kID0gdHJ1ZVxuICB9XG5cbiAgdmFyIG51bSA9IHBhcnNlSW50KGNvbCwgMTYpXG5cbiAgdmFyIHIgPSAobnVtID4+IDE2KSArIGFtdFxuXG4gIGlmIChyID4gMjU1KSByID0gMjU1XG4gIGVsc2UgaWYgKHIgPCAwKSByID0gMFxuXG4gIHZhciBiID0gKChudW0gPj4gOCkgJiAweDAwZmYpICsgYW10XG5cbiAgaWYgKGIgPiAyNTUpIGIgPSAyNTVcbiAgZWxzZSBpZiAoYiA8IDApIGIgPSAwXG5cbiAgdmFyIGcgPSAobnVtICYgMHgwMDAwZmYpICsgYW10XG5cbiAgaWYgKGcgPiAyNTUpIGcgPSAyNTVcbiAgZWxzZSBpZiAoZyA8IDApIGcgPSAwXG5cbiAgcmV0dXJuICh1c2VQb3VuZCA/IFwiI1wiIDogXCJcIikgKyAoZyB8IChiIDw8IDgpIHwgKHIgPDwgMTYpKS50b1N0cmluZygxNilcbn1cbiIsImV4cG9ydCBjb25zdCB0d2VsdmVIb3VyVG9EYXRlID0gKHMpID0+IHtcbiAgdmFyIFt0aW1lLCBhbXBtXSA9IFtzLnNsaWNlKDAsIC0yKSwgcy5zbGljZSgtMildXG4gIHZhciBbaHIsIG1pbiA9IDBdID0gdGltZS5zcGxpdChcIjpcIilcbiAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpXG5cbiAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMClcbiAgZGF0ZS5zZXRTZWNvbmRzKDApXG4gIGRhdGUuc2V0TWludXRlcygrbWluKVxuICA7K2hyID09PSAxMlxuICAgID8gZGF0ZS5zZXRIb3VycyhhbXBtID09PSBcImFtXCIgPyAraHIgKyAxMiA6ICtocilcbiAgICA6IGRhdGUuc2V0SG91cnMoYW1wbSA9PT0gXCJhbVwiID8gK2hyIDogK2hyICsgMTIpXG5cbiAgcmV0dXJuIGRhdGVcbn1cbiIsImNvbnN0IGRheXMgPSAoZWwgPSBkb2N1bWVudCkgPT4gWy4uLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwiZ3JpZGNlbGxcIicpXVxuXG5leHBvcnQgY29uc3QgZ2V0RGF5cyA9IChlbCA9IGRvY3VtZW50KSA9PiBkYXlzKGVsKS5sZW5ndGggLyAyXG5leHBvcnQgY29uc3Qgc2VsZWN0RGF5cyA9IChlbCA9IGRvY3VtZW50KSA9PiB7XG4gIGNvbnN0IGQgPSBkYXlzKGVsKVxuICByZXR1cm4gZC5zbGljZShkLmxlbmd0aCAvIDIpXG59XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RNZWV0aW5ncyA9IChlbCA9IGRvY3VtZW50KSA9PlxuICBbLi4uZWwucXVlcnlTZWxlY3RvckFsbCgnZGl2W2RhdGEtb3BlbnMtZGV0YWlscz1cInRydWVcIl0nKV0uZmlsdGVyKChpKSA9PlxuICAgIC8oWzAtOV17MSwyfTpbMC05XXsyfXxbMC05XXsxLDJ9KVthcF1tIHRvIC8udGVzdChpLmlubmVyVGV4dClcbiAgKVxuIiwiLyoqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259IENhc2VGdW5jdGlvblxuICogQHBhcmFtIHsuLi4qfSBbYXJnc10gLSBMaXN0IG9mIGFyZ3MgcHJvdmlkZWQgdG8gYW5vbnltb3VzIGZ1bmN0aW9uXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259IFN3aXRjaEZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gW2M9J2RlZmF1bHQnXSAtIGNhc2Ugc3RyaW5nIHRvIG1hdGNoXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSAtIGFyZ3MgdG8gcGFzcyB0byBtYXRjaGVkIFN3aXRjaEZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7Kn0gLSBSZXN1bHQgb2YgbWF0Y2hpbmcgY2FzZSBpbiBTd2l0Y2hNYXAgZWl0aGVyIENhc2VGdW5jdGlvbiBjYWxsZWQgd2l0aCBhcmdzLCBvciB2YWx1ZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdDxzdHJpbmcsIENhc2VGdW5jdGlvbnwqPn0gU3dpdGNoTWFwXG4gKi9cblxuLyoqXG4gKiBzdy5qc1xuICpcbiAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYSBTd2l0Y2hNYXAgYW5kIHJldHVybnMgYSBTd2l0Y2hGdW5jdGlvbiB3aGljaFxuICogY2FuIGJlIGNhbGxlZCB3aXRoIGEgY2FzZSBwcm9wZXJ0eSBhbmQgZXh0cmEgYXJncyB0byBtYXRjaCB3aXRoXG4gKiBmdW5jdGlvblxuICpcbiAqIEBleGFtcGxlXG4gKiAgc3coe1xuICogICAgZm9vOiBpID0+IGkgKyAyLCAgIC8vIDVcbiAqICAgIGJhcjogJ2JheicsICAgICAgICAvLyBiYXJcbiAqICAgIGRlZmF1bHQ6IG51bGwsICAgICAvLyBudWxsXG4gKiAgfSkoJ2ZvbycsIDMpXG4gKlxuICogQHBhcmFtIHtTd2l0Y2hNYXB9IGNhc2VzIC0gQSBtYXAgb2Ygc3RyaW5nIGNhc2VzIHRvIHZhbHVlIG9yIENhc2VGdW5jdGlvbiBjYWxsXG4gKiBAcmV0dXJucyB7U3dpdGNoRnVuY3Rpb259XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2FzZXMgPT4gKGMsIC4uLmFyZ3MpID0+IHtcbiAgY29uc3QgZiA9IHt9Lmhhc093blByb3BlcnR5LmNhbGwoY2FzZXMsIGMpID8gY2FzZXNbY10gOiBjYXNlcy5kZWZhdWx0XG5cbiAgcmV0dXJuIGYgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IGYoLi4uYXJncykgOiBmXG59XG4iXSwic291cmNlUm9vdCI6IiJ9
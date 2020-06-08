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
      config = {}
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
  var [time, name, calendar, status] = node.innerText.split(", ");
  var [start, end] = time.split(" to ");
  return {
    id: Object(_utils_col__WEBPACK_IMPORTED_MODULE_0__["rgbToHex"])(node.style["background-color"].substring()),
    calendar,
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
    Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_1__["selectAllMeetings"])(column).forEach(node => {
      if ((day === "Weekly" || column.innerText.includes(day)) && Object(_utils_col__WEBPACK_IMPORTED_MODULE_0__["rgbToHex"])(node.style["background-color"]) === color) {
        node.style.opacity = 1;
      } else {
        node.style.opacity = 0.2;
      }
    });
  });
};
const unhighlight = () => Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_1__["selectAllMeetings"])().forEach(node => node.style.opacity = 1);

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
  }) => acc + (parseInt(total) || 0), 0);
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

  var num = parseInt(col, 16) || 0;
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
/*! exports provided: getDays, selectDays, selectMeetings, selectAllMeetings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDays", function() { return getDays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDays", function() { return selectDays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectMeetings", function() { return selectMeetings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAllMeetings", function() { return selectAllMeetings; });
const days = (el = document) => [...el.querySelectorAll('div[role="gridcell"')];

const getDays = (el = document) => days(el).length / 2;
const selectDays = (el = document) => {
  const d = days(el);
  return d.slice(d.length / 2);
};
const selectMeetings = (el = document) => selectAllMeetings(el).filter(i => {
  const [,, cal] = i.innerText.split(", ");
  return !cal.startsWith("Calendar: ");
});
const selectAllMeetings = (el = document) => [...el.querySelectorAll('div[data-opens-details="true"]')].filter(i => /([0-9]{1,2}:[0-9]{2}|[0-9]{1,2})[ap]m to /.test(i.innerText));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29yZS9hbmFseXNpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvbW9kaWZpY2F0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvc3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2Nocm9tZS1zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvY29sLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3N3aXRjaC5qcyJdLCJuYW1lcyI6WyJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJtZXNzYWdlIiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwic3ciLCJnZXRTdW1tYXJ5IiwiY29uZmlnIiwic3VtbWFyeSIsIndlZWtseSIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkYWlseSIsInNldCIsInVuaGlnaGxpZ2h0IiwiaGlnaGxpZ2h0Q2F0ZWdvcnkiLCJjb2xvciIsImRheSIsImhpZ2hsaWdodCIsInR5cGUiLCJnZXRNZWV0aW5nc0ZvckRheXMiLCJkYXlTdGFydCIsImRheUVuZCIsInNlbGVjdERheXMiLCJtYXAiLCJjb2x1bW4iLCJ0b3RhbCIsImRhdGUiLCJpbm5lclRleHQiLCJzcGxpdCIsImV2ZW50cyIsImdldE1lZXRpbmdzIiwiZWwiLCJkb2N1bWVudCIsInNlbGVjdE1lZXRpbmdzIiwibm9kZSIsInRpbWUiLCJuYW1lIiwiY2FsZW5kYXIiLCJzdGF0dXMiLCJzdGFydCIsImVuZCIsImlkIiwicmdiVG9IZXgiLCJzdHlsZSIsInN1YnN0cmluZyIsIk1hdGgiLCJtYXgiLCJ0d2VsdmVIb3VyVG9EYXRlIiwibWluIiwiZmlsdGVyIiwiZm9yRWFjaCIsInNlbGVjdEFsbE1lZXRpbmdzIiwiaW5jbHVkZXMiLCJvcGFjaXR5IiwidG90YWxUaW1lIiwicmVzIiwic3VtIiwicmVkdWNlIiwiYWNjIiwiaXQiLCJyZXN1bHQiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwidmFsIiwiY29uc29sZSIsImxvZyIsImNlaWwiLCJoIiwiRGF0ZSIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJyZW1haW5pbmciLCJ2YWx1ZSIsInJlc3QiLCJ0b3RhbEV2ZW50cyIsInBhcnNlSW50IiwiZ2V0RGF5cyIsImNsZWFyIiwiY2IiLCJzdG9yYWdlIiwic3luYyIsInVuZGVmaW5lZCIsIm8iLCJnZXQiLCJyZ2JTdHJpbmciLCJyIiwiZyIsImIiLCJzbGljZSIsImkiLCJ0b1N0cmluZyIsImFkanVzdENvbCIsImNvbCIsImFtdCIsInVzZVBvdW5kIiwibnVtIiwicyIsImFtcG0iLCJociIsInNldE1pbGxpc2Vjb25kcyIsInNldFNlY29uZHMiLCJzZXRNaW51dGVzIiwic2V0SG91cnMiLCJkYXlzIiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsImQiLCJjYWwiLCJzdGFydHNXaXRoIiwidGVzdCIsImNhc2VzIiwiYyIsImFyZ3MiLCJmIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZGVmYXVsdCIsIkZ1bmN0aW9uIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxj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QUUsR0FBR0MsUUFBTixLQUM1Qm1CLGlCQUFpQixDQUFDcEIsRUFBRCxDQUFqQixDQUFzQmtCLE1BQXRCLENBQThCMEMsQ0FBRCxJQUFPO0FBQ2xDLFFBQU0sSUFBS2tCLEdBQUwsSUFBWWxCLENBQUMsQ0FBQ2hFLFNBQUYsQ0FBWUMsS0FBWixDQUFrQixJQUFsQixDQUFsQjtBQUNBLFNBQU8sQ0FBQ2lGLEdBQUcsQ0FBQ0MsVUFBSixDQUFlLFlBQWYsQ0FBUjtBQUNELENBSEQsQ0FESztBQU1BLE1BQU0zRCxpQkFBaUIsR0FBRyxDQUFDcEIsRUFBRSxHQUFHQyxRQUFOLEtBQy9CLENBQUMsR0FBR0QsRUFBRSxDQUFDMkUsZ0JBQUgsQ0FBb0IsZ0NBQXBCLENBQUosRUFBMkR6RCxNQUEzRCxDQUFtRTBDLENBQUQsSUFDaEUsNENBQTRDb0IsSUFBNUMsQ0FBaURwQixDQUFDLENBQUNoRSxTQUFuRCxDQURGLENBREssQzs7Ozs7Ozs7Ozs7O0FDZFA7QUFBQTs7Ozs7QUFLQTs7Ozs7OztBQU9BOzs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JlcUYsb0VBQUssSUFBSSxDQUFDQyxDQUFELEVBQUksR0FBR0MsSUFBUCxLQUFnQjtBQUN0QyxRQUFNQyxDQUFDLEdBQUcsR0FBR0MsY0FBSCxDQUFrQkMsSUFBbEIsQ0FBdUJMLEtBQXZCLEVBQThCQyxDQUE5QixJQUFtQ0QsS0FBSyxDQUFDQyxDQUFELENBQXhDLEdBQThDRCxLQUFLLENBQUNNLE9BQTlEO0FBRUEsU0FBT0gsQ0FBQyxZQUFZSSxRQUFiLEdBQXdCSixDQUFDLENBQUMsR0FBR0QsSUFBSixDQUF6QixHQUFxQ0MsQ0FBNUM7QUFDRCxDQUpELEUiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC9jb250ZW50LmpzXCIpO1xuIiwiaW1wb3J0IHN3IGZyb20gXCIuL3V0aWxzL3N3aXRjaFwiXG5pbXBvcnQgeyB3ZWVrbHksIGRhaWx5IH0gZnJvbSBcIi4vY29yZS9zdW1tYXJ5XCJcbmltcG9ydCB7IGhpZ2hsaWdodCwgdW5oaWdobGlnaHQgfSBmcm9tIFwiLi9jb3JlL21vZGlmaWNhdGlvbnNcIlxuXG5pbXBvcnQgeyBzZXQsIGdldCB9IGZyb20gXCIuL3V0aWxzL2Nocm9tZS1zdG9yYWdlXCJcblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICBzdyh7XG4gICAgZ2V0U3VtbWFyeTogKHsgY29uZmlnID0ge30gfSkgPT4ge1xuICAgICAgY29uc3Qgc3VtbWFyeSA9IHtcbiAgICAgICAgd2Vla2x5OiB3ZWVrbHkoXG4gICAgICAgICAgY29uZmlnLnN0YXJ0VGltZSB8fCBcIjlhbVwiLFxuICAgICAgICAgIGNvbmZpZy5lbmRUaW1lIHx8IFwiNTozMHBtXCIsXG4gICAgICAgICAgY29uZmlnXG4gICAgICAgICksXG4gICAgICAgIGRhaWx5OiBkYWlseShcbiAgICAgICAgICBjb25maWcuc3RhcnRUaW1lIHx8IFwiOWFtXCIsXG4gICAgICAgICAgY29uZmlnLmVuZFRpbWUgfHwgXCI1OjMwcG1cIixcbiAgICAgICAgICBjb25maWdcbiAgICAgICAgKSxcbiAgICAgIH1cblxuICAgICAgc2VuZFJlc3BvbnNlKHN1bW1hcnkpXG5cbiAgICAgIHNldCh7IHN1bW1hcnkgfSlcbiAgICB9LFxuXG4gICAgdW5oaWdobGlnaHQ6ICgpID0+IHVuaGlnaGxpZ2h0KCksXG4gICAgaGlnaGxpZ2h0Q2F0ZWdvcnk6ICh7IGNvbG9yLCBkYXkgfSkgPT4gaGlnaGxpZ2h0KGNvbG9yLCBkYXkpLFxuICB9KShtZXNzYWdlLnR5cGUsIG1lc3NhZ2UpXG59KVxuIiwiaW1wb3J0IHsgcmdiVG9IZXggfSBmcm9tIFwiLi4vdXRpbHMvY29sXCJcbmltcG9ydCB7IHR3ZWx2ZUhvdXJUb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZVwiXG5cbmltcG9ydCB7IHNlbGVjdERheXMsIHNlbGVjdE1lZXRpbmdzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5cbmV4cG9ydCBjb25zdCBnZXRNZWV0aW5nc0ZvckRheXMgPSAoeyBkYXlTdGFydCwgZGF5RW5kIH0pID0+XG4gIHNlbGVjdERheXMoKS5tYXAoKGNvbHVtbikgPT4ge1xuICAgIGNvbnN0IFt0b3RhbCwgZGF5LCBkYXRlXSA9IGNvbHVtbi5pbm5lclRleHQuc3BsaXQoXCIsIFwiKVxuICAgIHJldHVybiB7XG4gICAgICB0b3RhbCxcbiAgICAgIGRheSxcbiAgICAgIGRhdGUsXG4gICAgICBldmVudHM6IGdldE1lZXRpbmdzKGNvbHVtbiwgeyBkYXlTdGFydCwgZGF5RW5kIH0pLFxuICAgIH1cbiAgfSlcblxuZXhwb3J0IGNvbnN0IGdldE1lZXRpbmdzID0gKGVsID0gZG9jdW1lbnQsIHsgZGF5U3RhcnQsIGRheUVuZCB9KSA9PlxuICBzZWxlY3RNZWV0aW5ncyhlbClcbiAgICAubWFwKChub2RlKSA9PiB7XG4gICAgICB2YXIgW3RpbWUsIG5hbWUsIGNhbGVuZGFyLCBzdGF0dXNdID0gbm9kZS5pbm5lclRleHQuc3BsaXQoXCIsIFwiKVxuICAgICAgdmFyIFtzdGFydCwgZW5kXSA9IHRpbWUuc3BsaXQoXCIgdG8gXCIpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiByZ2JUb0hleChub2RlLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXS5zdWJzdHJpbmcoKSksXG4gICAgICAgIGNhbGVuZGFyLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHRpbWU6IHtcbiAgICAgICAgICBzdGFydDogTWF0aC5tYXgodHdlbHZlSG91clRvRGF0ZShkYXlTdGFydCksIHR3ZWx2ZUhvdXJUb0RhdGUoc3RhcnQpKSxcbiAgICAgICAgICBlbmQ6IE1hdGgubWluKHR3ZWx2ZUhvdXJUb0RhdGUoZGF5RW5kKSwgdHdlbHZlSG91clRvRGF0ZShlbmQpKSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9KVxuICAgIC5maWx0ZXIoKHsgc3RhdHVzIH0pID0+IHN0YXR1cyAhPT0gXCJEZWNsaW5lZFwiKVxuIiwiaW1wb3J0IHsgcmdiVG9IZXggfSBmcm9tIFwiLi4vdXRpbHMvY29sXCJcbmltcG9ydCB7IHNlbGVjdERheXMsIHNlbGVjdEFsbE1lZXRpbmdzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHQgPSAoY29sb3IsIGRheSkgPT4ge1xuICBzZWxlY3REYXlzKCkuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgc2VsZWN0QWxsTWVldGluZ3MoY29sdW1uKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIChkYXkgPT09IFwiV2Vla2x5XCIgfHwgY29sdW1uLmlubmVyVGV4dC5pbmNsdWRlcyhkYXkpKSAmJlxuICAgICAgICByZ2JUb0hleChub2RlLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSkgPT09IGNvbG9yXG4gICAgICApIHtcbiAgICAgICAgbm9kZS5zdHlsZS5vcGFjaXR5ID0gMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5zdHlsZS5vcGFjaXR5ID0gMC4yXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHVuaGlnaGxpZ2h0ID0gKCkgPT5cbiAgc2VsZWN0QWxsTWVldGluZ3MoKS5mb3JFYWNoKChub2RlKSA9PiAobm9kZS5zdHlsZS5vcGFjaXR5ID0gMSkpXG4iLCJpbXBvcnQgeyB0d2VsdmVIb3VyVG9EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGVcIlxuaW1wb3J0IHsgZ2V0RGF5cyB9IGZyb20gXCIuLi91dGlscy9zZWxlY3RvcnNcIlxuaW1wb3J0IHsgZ2V0TWVldGluZ3MsIGdldE1lZXRpbmdzRm9yRGF5cyB9IGZyb20gXCIuL2FuYWx5c2lzXCJcblxudmFyIHN1bW1hcnkgPSAodG90YWxUaW1lLCByZXMsIGNvbmZpZyA9IHt9KSA9PiB7XG4gIGNvbnN0IHN1bSA9IHJlcy5yZWR1Y2UoXG4gICAgKGFjYywgaXQpID0+ICh7XG4gICAgICAuLi5hY2MsXG4gICAgICBbaXQuaWRdOiAoYWNjW2l0LmlkXSB8fCAwKSArIE1hdGgubWF4KDAsIGl0LnRpbWUuZW5kIC0gaXQudGltZS5zdGFydCksXG4gICAgfSksXG4gICAge31cbiAgKVxuXG4gIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5lbnRyaWVzKHN1bSlcbiAgICAuZmlsdGVyKChba2V5XSkgPT4ga2V5ICE9PSBcIm51bGxcIilcbiAgICAuZmlsdGVyKChba2V5LCB2YWxdKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhrZXksIHZhbClcbiAgICAgIHJldHVybiB2YWwgPiAwXG4gICAgfSlcbiAgICAubWFwKChba2V5LCB2YWxdKSA9PiBbXG4gICAgICBjb25maWdba2V5XSB8fCBrZXksXG4gICAgICBrZXksXG4gICAgICBNYXRoLmNlaWwoKHZhbCAvIHRvdGFsVGltZSkgKiAxMDApLFxuICAgICAgeyBoOiBuZXcgRGF0ZSh2YWwpLmdldEhvdXJzKCkgLSAxLCBtOiBuZXcgRGF0ZSh2YWwpLmdldE1pbnV0ZXMoKSB9LFxuICAgIF0pXG5cbiAgY29uc3QgcmVtYWluaW5nID0gMTAwIC0gcmVzdWx0LnJlZHVjZSgoYWNjLCBbLCAsIHZhbHVlXSkgPT4gYWNjICsgdmFsdWUsIDApXG5cbiAgcmV0dXJuIFtcbiAgICBbXG4gICAgICBjb25maWdbXCIjZmZmXCJdIHx8IGNvbmZpZ1tcIiNmZmZmZmZcIl0gfHwgXCJGcmVlIHRpbWVcIixcbiAgICAgIFwiI2ZmZmZmZlwiLFxuICAgICAgcmVtYWluaW5nLFxuICAgICAge1xuICAgICAgICBoOiBuZXcgRGF0ZSgocmVtYWluaW5nIC8gMTAwKSAqIHRvdGFsVGltZSkuZ2V0SG91cnMoKSAtIDEsXG4gICAgICAgIG06IG5ldyBEYXRlKChyZW1haW5pbmcgLyAxMDApICogdG90YWxUaW1lKS5nZXRNaW51dGVzKCksXG4gICAgICB9LFxuICAgIF0sXG4gICAgLi4ucmVzdWx0LFxuICBdXG59XG5cbi8qKlxuICogSS9PIHN1bW1hcmllc1xuICovXG5leHBvcnQgY29uc3QgZGFpbHkgPSAoZGF5U3RhcnQsIGRheUVuZCwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHRvdGFsVGltZSA9IHR3ZWx2ZUhvdXJUb0RhdGUoZGF5RW5kKSAtIHR3ZWx2ZUhvdXJUb0RhdGUoZGF5U3RhcnQpXG5cbiAgcmV0dXJuIGdldE1lZXRpbmdzRm9yRGF5cyh7IGRheVN0YXJ0LCBkYXlFbmQgfSkubWFwKFxuICAgICh7IGV2ZW50cywgLi4ucmVzdCB9KSA9PiAoe1xuICAgICAgLi4ucmVzdCxcbiAgICAgIHN1bW1hcnk6IHN1bW1hcnkodG90YWxUaW1lLCBldmVudHMsIGNvbmZpZyksXG4gICAgfSlcbiAgKVxufVxuXG5leHBvcnQgY29uc3Qgd2Vla2x5ID0gKGRheVN0YXJ0LCBkYXlFbmQsIGNvbmZpZykgPT4ge1xuICBjb25zdCB0b3RhbEV2ZW50cyA9IGdldE1lZXRpbmdzRm9yRGF5cyh7IGRheVN0YXJ0LCBkYXlFbmQgfSkucmVkdWNlKFxuICAgIChhY2MsIHsgdG90YWwgfSkgPT4gYWNjICsgKHBhcnNlSW50KHRvdGFsKSB8fCAwKSxcbiAgICAwXG4gIClcblxuICBjb25zdCB0b3RhbFRpbWUgPVxuICAgICh0d2VsdmVIb3VyVG9EYXRlKGRheUVuZCkgLSB0d2VsdmVIb3VyVG9EYXRlKGRheVN0YXJ0KSkgKiBnZXREYXlzKClcblxuICBjb25zdCByZXMgPSBnZXRNZWV0aW5ncyhkb2N1bWVudCwgeyBkYXlTdGFydCwgZGF5RW5kIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBkYXk6IFwiV2Vla2x5XCIsXG4gICAgdG90YWw6IGAke3RvdGFsRXZlbnRzfSBldmVudHNgLFxuICAgIHN1bW1hcnk6IHN1bW1hcnkodG90YWxUaW1lLCByZXMsIGNvbmZpZyksXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBjaHJvbWUgKi9cbmV4cG9ydCBjb25zdCBjbGVhciA9IChrZXksIGNiID0gKCkgPT4ge30pID0+IGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgW2tleV06IHVuZGVmaW5lZCB9LCBjYilcbmV4cG9ydCBjb25zdCBzZXQgPSAobywgY2IgPSAoKSA9PiB7fSkgPT4gY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQobywgY2IpXG5leHBvcnQgY29uc3QgZ2V0ID0gKGtleSwgY2IgPSAoKSA9PiB7fSkgPT4gY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW2tleV0sIGNiKVxuIiwiZXhwb3J0IGNvbnN0IHJnYlRvSGV4ID0gKHJnYlN0cmluZykgPT4ge1xuICBpZiAoIXJnYlN0cmluZykgcmV0dXJuIG51bGxcblxuICB2YXIgW3IsIGcsIGJdID0gcmdiU3RyaW5nXG4gICAgLnNsaWNlKDQsIC0xKVxuICAgIC5zcGxpdCgvLCA/LylcbiAgICAubWFwKChpKSA9PiAraSlcbiAgcmV0dXJuIFwiI1wiICsgKCgxIDw8IDI0KSArIChyIDw8IDE2KSArIChnIDw8IDgpICsgYikudG9TdHJpbmcoMTYpLnNsaWNlKDEpXG59XG5cbmV4cG9ydCBjb25zdCBhZGp1c3RDb2wgPSAoY29sLCBhbXQpID0+IHtcbiAgdmFyIHVzZVBvdW5kID0gZmFsc2VcblxuICBpZiAoY29sWzBdID09IFwiI1wiKSB7XG4gICAgY29sID0gY29sLnNsaWNlKDEpXG4gICAgdXNlUG91bmQgPSB0cnVlXG4gIH1cblxuICB2YXIgbnVtID0gcGFyc2VJbnQoY29sLCAxNikgfHwgMFxuXG4gIHZhciByID0gKG51bSA+PiAxNikgKyBhbXRcblxuICBpZiAociA+IDI1NSkgciA9IDI1NVxuICBlbHNlIGlmIChyIDwgMCkgciA9IDBcblxuICB2YXIgYiA9ICgobnVtID4+IDgpICYgMHgwMGZmKSArIGFtdFxuXG4gIGlmIChiID4gMjU1KSBiID0gMjU1XG4gIGVsc2UgaWYgKGIgPCAwKSBiID0gMFxuXG4gIHZhciBnID0gKG51bSAmIDB4MDAwMGZmKSArIGFtdFxuXG4gIGlmIChnID4gMjU1KSBnID0gMjU1XG4gIGVsc2UgaWYgKGcgPCAwKSBnID0gMFxuXG4gIHJldHVybiAodXNlUG91bmQgPyBcIiNcIiA6IFwiXCIpICsgKGcgfCAoYiA8PCA4KSB8IChyIDw8IDE2KSkudG9TdHJpbmcoMTYpXG59XG4iLCJleHBvcnQgY29uc3QgdHdlbHZlSG91clRvRGF0ZSA9IChzKSA9PiB7XG4gIHZhciBbdGltZSwgYW1wbV0gPSBbcy5zbGljZSgwLCAtMiksIHMuc2xpY2UoLTIpXVxuICB2YXIgW2hyLCBtaW4gPSAwXSA9IHRpbWUuc3BsaXQoXCI6XCIpXG4gIHZhciBkYXRlID0gbmV3IERhdGUoKVxuXG4gIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApXG4gIGRhdGUuc2V0U2Vjb25kcygwKVxuICBkYXRlLnNldE1pbnV0ZXMoK21pbilcbiAgOytociA9PT0gMTJcbiAgICA/IGRhdGUuc2V0SG91cnMoYW1wbSA9PT0gXCJhbVwiID8gK2hyICsgMTIgOiAraHIpXG4gICAgOiBkYXRlLnNldEhvdXJzKGFtcG0gPT09IFwiYW1cIiA/ICtociA6ICtociArIDEyKVxuXG4gIHJldHVybiBkYXRlXG59XG4iLCJjb25zdCBkYXlzID0gKGVsID0gZG9jdW1lbnQpID0+IFsuLi5lbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cImdyaWRjZWxsXCInKV1cblxuZXhwb3J0IGNvbnN0IGdldERheXMgPSAoZWwgPSBkb2N1bWVudCkgPT4gZGF5cyhlbCkubGVuZ3RoIC8gMlxuZXhwb3J0IGNvbnN0IHNlbGVjdERheXMgPSAoZWwgPSBkb2N1bWVudCkgPT4ge1xuICBjb25zdCBkID0gZGF5cyhlbClcbiAgcmV0dXJuIGQuc2xpY2UoZC5sZW5ndGggLyAyKVxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0TWVldGluZ3MgPSAoZWwgPSBkb2N1bWVudCkgPT5cbiAgc2VsZWN0QWxsTWVldGluZ3MoZWwpLmZpbHRlcigoaSkgPT4ge1xuICAgIGNvbnN0IFssICwgY2FsXSA9IGkuaW5uZXJUZXh0LnNwbGl0KFwiLCBcIilcbiAgICByZXR1cm4gIWNhbC5zdGFydHNXaXRoKFwiQ2FsZW5kYXI6IFwiKVxuICB9KVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0QWxsTWVldGluZ3MgPSAoZWwgPSBkb2N1bWVudCkgPT5cbiAgWy4uLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdltkYXRhLW9wZW5zLWRldGFpbHM9XCJ0cnVlXCJdJyldLmZpbHRlcigoaSkgPT5cbiAgICAvKFswLTldezEsMn06WzAtOV17Mn18WzAtOV17MSwyfSlbYXBdbSB0byAvLnRlc3QoaS5pbm5lclRleHQpXG4gIClcbiIsIi8qKlxuICogQHR5cGVkZWYge0Z1bmN0aW9ufSBDYXNlRnVuY3Rpb25cbiAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdIC0gTGlzdCBvZiBhcmdzIHByb3ZpZGVkIHRvIGFub255bW91cyBmdW5jdGlvblxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge0Z1bmN0aW9ufSBTd2l0Y2hGdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IFtjPSdkZWZhdWx0J10gLSBjYXNlIHN0cmluZyB0byBtYXRjaFxuICogQHBhcmFtIHsuLi4qfSBbYXJnc10gLSBhcmdzIHRvIHBhc3MgdG8gbWF0Y2hlZCBTd2l0Y2hGdW5jdGlvblxuICogQHJldHVybnMgeyp9IC0gUmVzdWx0IG9mIG1hdGNoaW5nIGNhc2UgaW4gU3dpdGNoTWFwIGVpdGhlciBDYXNlRnVuY3Rpb24gY2FsbGVkIHdpdGggYXJncywgb3IgdmFsdWVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3Q8c3RyaW5nLCBDYXNlRnVuY3Rpb258Kj59IFN3aXRjaE1hcFxuICovXG5cbi8qKlxuICogc3cuanNcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGEgU3dpdGNoTWFwIGFuZCByZXR1cm5zIGEgU3dpdGNoRnVuY3Rpb24gd2hpY2hcbiAqIGNhbiBiZSBjYWxsZWQgd2l0aCBhIGNhc2UgcHJvcGVydHkgYW5kIGV4dHJhIGFyZ3MgdG8gbWF0Y2ggd2l0aFxuICogZnVuY3Rpb25cbiAqXG4gKiBAZXhhbXBsZVxuICogIHN3KHtcbiAqICAgIGZvbzogaSA9PiBpICsgMiwgICAvLyA1XG4gKiAgICBiYXI6ICdiYXonLCAgICAgICAgLy8gYmFyXG4gKiAgICBkZWZhdWx0OiBudWxsLCAgICAgLy8gbnVsbFxuICogIH0pKCdmb28nLCAzKVxuICpcbiAqIEBwYXJhbSB7U3dpdGNoTWFwfSBjYXNlcyAtIEEgbWFwIG9mIHN0cmluZyBjYXNlcyB0byB2YWx1ZSBvciBDYXNlRnVuY3Rpb24gY2FsbFxuICogQHJldHVybnMge1N3aXRjaEZ1bmN0aW9ufVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNhc2VzID0+IChjLCAuLi5hcmdzKSA9PiB7XG4gIGNvbnN0IGYgPSB7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNhc2VzLCBjKSA/IGNhc2VzW2NdIDogY2FzZXMuZGVmYXVsdFxuXG4gIHJldHVybiBmIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBmKC4uLmFyZ3MpIDogZlxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
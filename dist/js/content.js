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
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/api */ "./src/app/utils/api.js");
/* harmony import */ var _core_summary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/summary */ "./src/app/core/summary.js");
/* harmony import */ var _core_modifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/modifications */ "./src/app/core/modifications.js");
/* harmony import */ var _utils_chrome_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/chrome-storage */ "./src/app/utils/chrome-storage.js");





_utils_api__WEBPACK_IMPORTED_MODULE_1__["default"].runtime.onMessage.addListener((message, sender, sendResponse) => {
  Object(_utils_switch__WEBPACK_IMPORTED_MODULE_0__["default"])({
    getSummary: ({
      config = {}
    }) => {
      const summary = {
        weekly: Object(_core_summary__WEBPACK_IMPORTED_MODULE_2__["weekly"])(config.startTime || "9am", config.endTime || "5:30pm", config),
        daily: Object(_core_summary__WEBPACK_IMPORTED_MODULE_2__["daily"])(config.startTime || "9am", config.endTime || "5:30pm", config)
      };
      sendResponse(summary);
      Object(_utils_chrome_storage__WEBPACK_IMPORTED_MODULE_4__["set"])({
        summary
      });
    },
    clickEl: ({
      selector
    }) => {
      const el = document.querySelector(selector);
      if (el) el.click();
    },
    unhighlight: () => Object(_core_modifications__WEBPACK_IMPORTED_MODULE_3__["unhighlight"])(),
    highlightCategory: ({
      color,
      day
    }) => Object(_core_modifications__WEBPACK_IMPORTED_MODULE_3__["highlight"])(color, day)
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
      if ((day === "All days" || column.innerText.includes(day)) && Object(_utils_col__WEBPACK_IMPORTED_MODULE_0__["rgbToHex"])(node.style["background-color"]) === color) {
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
  const result = Object.entries(sum).filter(([key]) => key !== "null").filter(([key, val]) => val > 0).map(([key, val]) => [config[key] || key, key, Math.ceil(val / totalTime * 100), {
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
    day: "All days",
    total: `${totalEvents} events`,
    summary: summary(totalTime, res, config)
  };
};

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
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/app/utils/api.js");

const clear = (key, cb = () => {}) => _api__WEBPACK_IMPORTED_MODULE_0__["default"].storage.sync.set({
  [key]: undefined
}, cb);
const set = (o, cb = () => {}) => _api__WEBPACK_IMPORTED_MODULE_0__["default"].storage.sync.set(o, cb);
const get = (key, cb = () => {}) => _api__WEBPACK_IMPORTED_MODULE_0__["default"].storage.sync.get([key], cb);

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
  const [time, ampm] = /[ap]m$/.test(s) ? [s.slice(0, -2), s.slice(-2)] : [s];
  const [hr, min = 0] = time.split(":");
  const date = new Date();
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(+min);
  !ampm ? date.setHours(+hr) : +hr === 12 ? date.setHours(ampm === "am" ? +hr + 12 : +hr) : date.setHours(ampm === "am" ? +hr : +hr + 12);
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
  const [time,, cal] = i.innerText.split(", ");
  return !cal.startsWith("Calendar: ");
});
const selectAllMeetings = (el = document) => [...el.querySelectorAll('div[data-opens-details="true"]')].filter(i => /^([0-9]{1,2}:[0-9]{2}|[0-9]{1,2})([ap]m|) to /.test(i.innerText));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29yZS9hbmFseXNpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvbW9kaWZpY2F0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvc3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2Nocm9tZS1zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvY29sLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3N3aXRjaC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJtZXNzYWdlIiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwic3ciLCJnZXRTdW1tYXJ5IiwiY29uZmlnIiwic3VtbWFyeSIsIndlZWtseSIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkYWlseSIsInNldCIsImNsaWNrRWwiLCJzZWxlY3RvciIsImVsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xpY2siLCJ1bmhpZ2hsaWdodCIsImhpZ2hsaWdodENhdGVnb3J5IiwiY29sb3IiLCJkYXkiLCJoaWdobGlnaHQiLCJ0eXBlIiwiZ2V0TWVldGluZ3NGb3JEYXlzIiwiZGF5U3RhcnQiLCJkYXlFbmQiLCJzZWxlY3REYXlzIiwibWFwIiwiY29sdW1uIiwidG90YWwiLCJkYXRlIiwiaW5uZXJUZXh0Iiwic3BsaXQiLCJldmVudHMiLCJnZXRNZWV0aW5ncyIsInNlbGVjdE1lZXRpbmdzIiwibm9kZSIsInRpbWUiLCJuYW1lIiwiY2FsZW5kYXIiLCJzdGF0dXMiLCJzdGFydCIsImVuZCIsImlkIiwicmdiVG9IZXgiLCJzdHlsZSIsInN1YnN0cmluZyIsIk1hdGgiLCJtYXgiLCJ0d2VsdmVIb3VyVG9EYXRlIiwibWluIiwiZmlsdGVyIiwiZm9yRWFjaCIsInNlbGVjdEFsbE1lZXRpbmdzIiwiaW5jbHVkZXMiLCJvcGFjaXR5IiwidG90YWxUaW1lIiwicmVzIiwic3VtIiwicmVkdWNlIiwiYWNjIiwiaXQiLCJyZXN1bHQiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwidmFsIiwiY2VpbCIsImgiLCJEYXRlIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsInJlbWFpbmluZyIsInZhbHVlIiwicmVzdCIsInRvdGFsRXZlbnRzIiwicGFyc2VJbnQiLCJnZXREYXlzIiwiYXBpcyIsIkV4dGVuc2lvbiIsIkFwaSIsImNvbnNvbGUiLCJsb2ciLCJjaHJvbWUiLCJlIiwid2luZG93IiwiYnJvd3NlciIsImV4dGVuc2lvbiIsImJyb3dzZXJBY3Rpb24iLCJjbGVhciIsImNiIiwic3RvcmFnZSIsInN5bmMiLCJ1bmRlZmluZWQiLCJvIiwiZ2V0IiwicmdiU3RyaW5nIiwiciIsImciLCJiIiwic2xpY2UiLCJpIiwidG9TdHJpbmciLCJhZGp1c3RDb2wiLCJjb2wiLCJhbXQiLCJ1c2VQb3VuZCIsIm51bSIsInMiLCJhbXBtIiwidGVzdCIsImhyIiwic2V0TWlsbGlzZWNvbmRzIiwic2V0U2Vjb25kcyIsInNldE1pbnV0ZXMiLCJzZXRIb3VycyIsImRheXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiZCIsImNhbCIsInN0YXJ0c1dpdGgiLCJjYXNlcyIsImMiLCJhcmdzIiwiZiIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlZmF1bHQiLCJGdW5jdGlvbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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Q3hDLEVBQUUsR0FBR0MsUUFBTixLQUMvQixDQUFDLEdBQUdELEVBQUUsQ0FBQ3lHLGdCQUFILENBQW9CLGdDQUFwQixDQUFKLEVBQTJEbkUsTUFBM0QsQ0FBbUVtRCxDQUFELElBQ2hFLGdEQUFnRFMsSUFBaEQsQ0FBcURULENBQUMsQ0FBQ3ZFLFNBQXZELENBREYsQ0FESyxDOzs7Ozs7Ozs7Ozs7QUNkUDtBQUFBOzs7OztBQUtBOzs7Ozs7O0FBT0E7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQmU0RixvRUFBSyxJQUFJLENBQUNDLENBQUQsRUFBSSxHQUFHQyxJQUFQLEtBQWdCO0FBQ3RDLFFBQU1DLENBQUMsR0FBRyxHQUFHQyxjQUFILENBQWtCQyxJQUFsQixDQUF1QkwsS0FBdkIsRUFBOEJDLENBQTlCLElBQW1DRCxLQUFLLENBQUNDLENBQUQsQ0FBeEMsR0FBOENELEtBQUssQ0FBQ00sT0FBOUQ7QUFFQSxTQUFPSCxDQUFDLFlBQVlJLFFBQWIsR0FBd0JKLENBQUMsQ0FBQyxHQUFHRCxJQUFKLENBQXpCLEdBQXFDQyxDQUE1QztBQUNELENBSkQsRSIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwL2NvbnRlbnQuanNcIik7XG4iLCJpbXBvcnQgc3cgZnJvbSBcIi4vdXRpbHMvc3dpdGNoXCJcbmltcG9ydCBhcGkgZnJvbSBcIi4vdXRpbHMvYXBpXCJcbmltcG9ydCB7IHdlZWtseSwgZGFpbHkgfSBmcm9tIFwiLi9jb3JlL3N1bW1hcnlcIlxuaW1wb3J0IHsgaGlnaGxpZ2h0LCB1bmhpZ2hsaWdodCB9IGZyb20gXCIuL2NvcmUvbW9kaWZpY2F0aW9uc1wiXG5cbmltcG9ydCB7IHNldCwgZ2V0IH0gZnJvbSBcIi4vdXRpbHMvY2hyb21lLXN0b3JhZ2VcIlxuXG5hcGkucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIHN3KHtcbiAgICBnZXRTdW1tYXJ5OiAoeyBjb25maWcgPSB7fSB9KSA9PiB7XG4gICAgICBjb25zdCBzdW1tYXJ5ID0ge1xuICAgICAgICB3ZWVrbHk6IHdlZWtseShcbiAgICAgICAgICBjb25maWcuc3RhcnRUaW1lIHx8IFwiOWFtXCIsXG4gICAgICAgICAgY29uZmlnLmVuZFRpbWUgfHwgXCI1OjMwcG1cIixcbiAgICAgICAgICBjb25maWdcbiAgICAgICAgKSxcbiAgICAgICAgZGFpbHk6IGRhaWx5KFxuICAgICAgICAgIGNvbmZpZy5zdGFydFRpbWUgfHwgXCI5YW1cIixcbiAgICAgICAgICBjb25maWcuZW5kVGltZSB8fCBcIjU6MzBwbVwiLFxuICAgICAgICAgIGNvbmZpZ1xuICAgICAgICApLFxuICAgICAgfVxuXG4gICAgICBzZW5kUmVzcG9uc2Uoc3VtbWFyeSlcblxuICAgICAgc2V0KHsgc3VtbWFyeSB9KVxuICAgIH0sXG5cbiAgICBjbGlja0VsOiAoeyBzZWxlY3RvciB9KSA9PiB7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgICBpZiAoZWwpIGVsLmNsaWNrKClcbiAgICB9LFxuXG4gICAgdW5oaWdobGlnaHQ6ICgpID0+IHVuaGlnaGxpZ2h0KCksXG4gICAgaGlnaGxpZ2h0Q2F0ZWdvcnk6ICh7IGNvbG9yLCBkYXkgfSkgPT4gaGlnaGxpZ2h0KGNvbG9yLCBkYXkpLFxuICB9KShtZXNzYWdlLnR5cGUsIG1lc3NhZ2UpXG59KVxuIiwiaW1wb3J0IHsgcmdiVG9IZXggfSBmcm9tIFwiLi4vdXRpbHMvY29sXCJcbmltcG9ydCB7IHR3ZWx2ZUhvdXJUb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZVwiXG5cbmltcG9ydCB7IHNlbGVjdERheXMsIHNlbGVjdE1lZXRpbmdzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5cbmV4cG9ydCBjb25zdCBnZXRNZWV0aW5nc0ZvckRheXMgPSAoeyBkYXlTdGFydCwgZGF5RW5kIH0pID0+XG4gIHNlbGVjdERheXMoKS5tYXAoKGNvbHVtbikgPT4ge1xuICAgIGNvbnN0IFt0b3RhbCwgZGF5LCBkYXRlXSA9IGNvbHVtbi5pbm5lclRleHQuc3BsaXQoXCIsIFwiKVxuICAgIHJldHVybiB7XG4gICAgICB0b3RhbCxcbiAgICAgIGRheSxcbiAgICAgIGRhdGUsXG4gICAgICBldmVudHM6IGdldE1lZXRpbmdzKGNvbHVtbiwgeyBkYXlTdGFydCwgZGF5RW5kIH0pLFxuICAgIH1cbiAgfSlcblxuZXhwb3J0IGNvbnN0IGdldE1lZXRpbmdzID0gKGVsID0gZG9jdW1lbnQsIHsgZGF5U3RhcnQsIGRheUVuZCB9KSA9PlxuICBzZWxlY3RNZWV0aW5ncyhlbClcbiAgICAubWFwKChub2RlKSA9PiB7XG4gICAgICB2YXIgW3RpbWUsIG5hbWUsIGNhbGVuZGFyLCBzdGF0dXNdID0gbm9kZS5pbm5lclRleHQuc3BsaXQoXCIsIFwiKVxuICAgICAgdmFyIFtzdGFydCwgZW5kXSA9IHRpbWUuc3BsaXQoXCIgdG8gXCIpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiByZ2JUb0hleChub2RlLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXS5zdWJzdHJpbmcoKSksXG4gICAgICAgIGNhbGVuZGFyLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHRpbWU6IHtcbiAgICAgICAgICBzdGFydDogTWF0aC5tYXgodHdlbHZlSG91clRvRGF0ZShkYXlTdGFydCksIHR3ZWx2ZUhvdXJUb0RhdGUoc3RhcnQpKSxcbiAgICAgICAgICBlbmQ6IE1hdGgubWluKHR3ZWx2ZUhvdXJUb0RhdGUoZGF5RW5kKSwgdHdlbHZlSG91clRvRGF0ZShlbmQpKSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9KVxuICAgIC5maWx0ZXIoKHsgc3RhdHVzIH0pID0+IHN0YXR1cyAhPT0gXCJEZWNsaW5lZFwiKVxuIiwiaW1wb3J0IHsgcmdiVG9IZXggfSBmcm9tIFwiLi4vdXRpbHMvY29sXCJcbmltcG9ydCB7IHNlbGVjdERheXMsIHNlbGVjdEFsbE1lZXRpbmdzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHQgPSAoY29sb3IsIGRheSkgPT4ge1xuICBzZWxlY3REYXlzKCkuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgc2VsZWN0QWxsTWVldGluZ3MoY29sdW1uKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIChkYXkgPT09IFwiQWxsIGRheXNcIiB8fCBjb2x1bW4uaW5uZXJUZXh0LmluY2x1ZGVzKGRheSkpICYmXG4gICAgICAgIHJnYlRvSGV4KG5vZGUuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdKSA9PT0gY29sb3JcbiAgICAgICkge1xuICAgICAgICBub2RlLnN0eWxlLm9wYWNpdHkgPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnN0eWxlLm9wYWNpdHkgPSAwLjJcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgdW5oaWdobGlnaHQgPSAoKSA9PlxuICBzZWxlY3RBbGxNZWV0aW5ncygpLmZvckVhY2goKG5vZGUpID0+IChub2RlLnN0eWxlLm9wYWNpdHkgPSAxKSlcbiIsImltcG9ydCB7IHR3ZWx2ZUhvdXJUb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZVwiXG5pbXBvcnQgeyBnZXREYXlzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5pbXBvcnQgeyBnZXRNZWV0aW5ncywgZ2V0TWVldGluZ3NGb3JEYXlzIH0gZnJvbSBcIi4vYW5hbHlzaXNcIlxuXG52YXIgc3VtbWFyeSA9ICh0b3RhbFRpbWUsIHJlcywgY29uZmlnID0ge30pID0+IHtcbiAgY29uc3Qgc3VtID0gcmVzLnJlZHVjZShcbiAgICAoYWNjLCBpdCkgPT4gKHtcbiAgICAgIC4uLmFjYyxcbiAgICAgIFtpdC5pZF06IChhY2NbaXQuaWRdIHx8IDApICsgTWF0aC5tYXgoMCwgaXQudGltZS5lbmQgLSBpdC50aW1lLnN0YXJ0KSxcbiAgICB9KSxcbiAgICB7fVxuICApXG5cbiAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmVudHJpZXMoc3VtKVxuICAgIC5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09IFwibnVsbFwiKVxuICAgIC5maWx0ZXIoKFtrZXksIHZhbF0pID0+IHZhbCA+IDApXG4gICAgLm1hcCgoW2tleSwgdmFsXSkgPT4gW1xuICAgICAgY29uZmlnW2tleV0gfHwga2V5LFxuICAgICAga2V5LFxuICAgICAgTWF0aC5jZWlsKCh2YWwgLyB0b3RhbFRpbWUpICogMTAwKSxcbiAgICAgIHsgaDogbmV3IERhdGUodmFsKS5nZXRIb3VycygpIC0gMSwgbTogbmV3IERhdGUodmFsKS5nZXRNaW51dGVzKCkgfSxcbiAgICBdKVxuXG4gIGNvbnN0IHJlbWFpbmluZyA9IDEwMCAtIHJlc3VsdC5yZWR1Y2UoKGFjYywgWywgLCB2YWx1ZV0pID0+IGFjYyArIHZhbHVlLCAwKVxuXG4gIHJldHVybiBbXG4gICAgW1xuICAgICAgY29uZmlnW1wiI2ZmZlwiXSB8fCBjb25maWdbXCIjZmZmZmZmXCJdIHx8IFwiRnJlZSB0aW1lXCIsXG4gICAgICBcIiNmZmZmZmZcIixcbiAgICAgIHJlbWFpbmluZyxcbiAgICAgIHtcbiAgICAgICAgaDogbmV3IERhdGUoKHJlbWFpbmluZyAvIDEwMCkgKiB0b3RhbFRpbWUpLmdldEhvdXJzKCkgLSAxLFxuICAgICAgICBtOiBuZXcgRGF0ZSgocmVtYWluaW5nIC8gMTAwKSAqIHRvdGFsVGltZSkuZ2V0TWludXRlcygpLFxuICAgICAgfSxcbiAgICBdLFxuICAgIC4uLnJlc3VsdCxcbiAgXVxufVxuXG4vKipcbiAqIEkvTyBzdW1tYXJpZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGRhaWx5ID0gKGRheVN0YXJ0LCBkYXlFbmQsIGNvbmZpZykgPT4ge1xuICBjb25zdCB0b3RhbFRpbWUgPSB0d2VsdmVIb3VyVG9EYXRlKGRheUVuZCkgLSB0d2VsdmVIb3VyVG9EYXRlKGRheVN0YXJ0KVxuXG4gIHJldHVybiBnZXRNZWV0aW5nc0ZvckRheXMoeyBkYXlTdGFydCwgZGF5RW5kIH0pLm1hcChcbiAgICAoeyBldmVudHMsIC4uLnJlc3QgfSkgPT4gKHtcbiAgICAgIC4uLnJlc3QsXG4gICAgICBzdW1tYXJ5OiBzdW1tYXJ5KHRvdGFsVGltZSwgZXZlbnRzLCBjb25maWcpLFxuICAgIH0pXG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IHdlZWtseSA9IChkYXlTdGFydCwgZGF5RW5kLCBjb25maWcpID0+IHtcbiAgY29uc3QgdG90YWxFdmVudHMgPSBnZXRNZWV0aW5nc0ZvckRheXMoeyBkYXlTdGFydCwgZGF5RW5kIH0pLnJlZHVjZShcbiAgICAoYWNjLCB7IHRvdGFsIH0pID0+IGFjYyArIChwYXJzZUludCh0b3RhbCkgfHwgMCksXG4gICAgMFxuICApXG5cbiAgY29uc3QgdG90YWxUaW1lID1cbiAgICAodHdlbHZlSG91clRvRGF0ZShkYXlFbmQpIC0gdHdlbHZlSG91clRvRGF0ZShkYXlTdGFydCkpICogZ2V0RGF5cygpXG5cbiAgY29uc3QgcmVzID0gZ2V0TWVldGluZ3MoZG9jdW1lbnQsIHsgZGF5U3RhcnQsIGRheUVuZCB9KVxuXG4gIHJldHVybiB7XG4gICAgZGF5OiBcIkFsbCBkYXlzXCIsXG4gICAgdG90YWw6IGAke3RvdGFsRXZlbnRzfSBldmVudHNgLFxuICAgIHN1bW1hcnk6IHN1bW1hcnkodG90YWxUaW1lLCByZXMsIGNvbmZpZyksXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBjaHJvbWUgYnJvd3NlciAqL1xuXG5jb25zdCBhcGlzID0gW1wicnVudGltZVwiLCBcInN0b3JhZ2VcIiwgXCJ0YWJzXCJdXG5cbmZ1bmN0aW9uIEV4dGVuc2lvbigpIHtcbiAgY29uc3QgQXBpID0ge31cblxuICBhcGlzLmZvckVhY2goKGFwaSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKEFwaSwgYXBpKVxuICAgIEFwaVthcGldID0gbnVsbFxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChjaHJvbWVbYXBpXSkge1xuICAgICAgICBBcGlbYXBpXSA9IGNocm9tZVthcGldXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIHRyeSB7XG4gICAgICBpZiAod2luZG93W2FwaV0pIHtcbiAgICAgICAgQXBpW2FwaV0gPSB3aW5kb3dbYXBpXVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKGJyb3dzZXJbYXBpXSkge1xuICAgICAgICBBcGlbYXBpXSA9IGJyb3dzZXJbYXBpXVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIEFwaS5hcGkgPSBicm93c2VyLmV4dGVuc2lvblthcGldXG4gICAgfSBjYXRjaCAoZSkge31cbiAgfSlcblxuICB0cnkge1xuICAgIGlmIChicm93c2VyICYmIGJyb3dzZXIucnVudGltZSkge1xuICAgICAgdGhpcy5ydW50aW1lID0gYnJvd3Nlci5ydW50aW1lXG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuXG4gIHRyeSB7XG4gICAgaWYgKGJyb3dzZXIgJiYgYnJvd3Nlci5icm93c2VyQWN0aW9uKSB7XG4gICAgICB0aGlzLmJyb3dzZXJBY3Rpb24gPSBicm93c2VyLmJyb3dzZXJBY3Rpb25cbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgcmV0dXJuIEFwaVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeHRlbnNpb24oKVxuIiwiaW1wb3J0IGFwaSBmcm9tIFwiLi9hcGlcIlxuXG5leHBvcnQgY29uc3QgY2xlYXIgPSAoa2V5LCBjYiA9ICgpID0+IHt9KSA9PlxuICBhcGkuc3RvcmFnZS5zeW5jLnNldCh7IFtrZXldOiB1bmRlZmluZWQgfSwgY2IpXG5leHBvcnQgY29uc3Qgc2V0ID0gKG8sIGNiID0gKCkgPT4ge30pID0+IGFwaS5zdG9yYWdlLnN5bmMuc2V0KG8sIGNiKVxuZXhwb3J0IGNvbnN0IGdldCA9IChrZXksIGNiID0gKCkgPT4ge30pID0+IGFwaS5zdG9yYWdlLnN5bmMuZ2V0KFtrZXldLCBjYilcbiIsImV4cG9ydCBjb25zdCByZ2JUb0hleCA9IChyZ2JTdHJpbmcpID0+IHtcbiAgaWYgKCFyZ2JTdHJpbmcpIHJldHVybiBudWxsXG5cbiAgdmFyIFtyLCBnLCBiXSA9IHJnYlN0cmluZ1xuICAgIC5zbGljZSg0LCAtMSlcbiAgICAuc3BsaXQoLywgPy8pXG4gICAgLm1hcCgoaSkgPT4gK2kpXG4gIHJldHVybiBcIiNcIiArICgoMSA8PCAyNCkgKyAociA8PCAxNikgKyAoZyA8PCA4KSArIGIpLnRvU3RyaW5nKDE2KS5zbGljZSgxKVxufVxuXG5leHBvcnQgY29uc3QgYWRqdXN0Q29sID0gKGNvbCwgYW10KSA9PiB7XG4gIHZhciB1c2VQb3VuZCA9IGZhbHNlXG5cbiAgaWYgKGNvbFswXSA9PSBcIiNcIikge1xuICAgIGNvbCA9IGNvbC5zbGljZSgxKVxuICAgIHVzZVBvdW5kID0gdHJ1ZVxuICB9XG5cbiAgdmFyIG51bSA9IHBhcnNlSW50KGNvbCwgMTYpIHx8IDBcblxuICB2YXIgciA9IChudW0gPj4gMTYpICsgYW10XG5cbiAgaWYgKHIgPiAyNTUpIHIgPSAyNTVcbiAgZWxzZSBpZiAociA8IDApIHIgPSAwXG5cbiAgdmFyIGIgPSAoKG51bSA+PiA4KSAmIDB4MDBmZikgKyBhbXRcblxuICBpZiAoYiA+IDI1NSkgYiA9IDI1NVxuICBlbHNlIGlmIChiIDwgMCkgYiA9IDBcblxuICB2YXIgZyA9IChudW0gJiAweDAwMDBmZikgKyBhbXRcblxuICBpZiAoZyA+IDI1NSkgZyA9IDI1NVxuICBlbHNlIGlmIChnIDwgMCkgZyA9IDBcblxuICByZXR1cm4gKHVzZVBvdW5kID8gXCIjXCIgOiBcIlwiKSArIChnIHwgKGIgPDwgOCkgfCAociA8PCAxNikpLnRvU3RyaW5nKDE2KVxufVxuIiwiZXhwb3J0IGNvbnN0IHR3ZWx2ZUhvdXJUb0RhdGUgPSAocykgPT4ge1xuICBjb25zdCBbdGltZSwgYW1wbV0gPSAvW2FwXW0kLy50ZXN0KHMpID8gW3Muc2xpY2UoMCwgLTIpLCBzLnNsaWNlKC0yKV0gOiBbc11cbiAgY29uc3QgW2hyLCBtaW4gPSAwXSA9IHRpbWUuc3BsaXQoXCI6XCIpXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG5cbiAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMClcbiAgZGF0ZS5zZXRTZWNvbmRzKDApXG4gIGRhdGUuc2V0TWludXRlcygrbWluKVxuXG4gICFhbXBtXG4gICAgPyBkYXRlLnNldEhvdXJzKCtocilcbiAgICA6ICtociA9PT0gMTJcbiAgICA/IGRhdGUuc2V0SG91cnMoYW1wbSA9PT0gXCJhbVwiID8gK2hyICsgMTIgOiAraHIpXG4gICAgOiBkYXRlLnNldEhvdXJzKGFtcG0gPT09IFwiYW1cIiA/ICtociA6ICtociArIDEyKVxuXG4gIHJldHVybiBkYXRlXG59XG4iLCJjb25zdCBkYXlzID0gKGVsID0gZG9jdW1lbnQpID0+IFsuLi5lbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cImdyaWRjZWxsXCInKV1cblxuZXhwb3J0IGNvbnN0IGdldERheXMgPSAoZWwgPSBkb2N1bWVudCkgPT4gZGF5cyhlbCkubGVuZ3RoIC8gMlxuZXhwb3J0IGNvbnN0IHNlbGVjdERheXMgPSAoZWwgPSBkb2N1bWVudCkgPT4ge1xuICBjb25zdCBkID0gZGF5cyhlbClcbiAgcmV0dXJuIGQuc2xpY2UoZC5sZW5ndGggLyAyKVxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0TWVldGluZ3MgPSAoZWwgPSBkb2N1bWVudCkgPT5cbiAgc2VsZWN0QWxsTWVldGluZ3MoZWwpLmZpbHRlcigoaSkgPT4ge1xuICAgIGNvbnN0IFt0aW1lLCAsIGNhbF0gPSBpLmlubmVyVGV4dC5zcGxpdChcIiwgXCIpXG4gICAgcmV0dXJuICFjYWwuc3RhcnRzV2l0aChcIkNhbGVuZGFyOiBcIilcbiAgfSlcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbE1lZXRpbmdzID0gKGVsID0gZG9jdW1lbnQpID0+XG4gIFsuLi5lbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbZGF0YS1vcGVucy1kZXRhaWxzPVwidHJ1ZVwiXScpXS5maWx0ZXIoKGkpID0+XG4gICAgL14oWzAtOV17MSwyfTpbMC05XXsyfXxbMC05XXsxLDJ9KShbYXBdbXwpIHRvIC8udGVzdChpLmlubmVyVGV4dClcbiAgKVxuIiwiLyoqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259IENhc2VGdW5jdGlvblxuICogQHBhcmFtIHsuLi4qfSBbYXJnc10gLSBMaXN0IG9mIGFyZ3MgcHJvdmlkZWQgdG8gYW5vbnltb3VzIGZ1bmN0aW9uXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259IFN3aXRjaEZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gW2M9J2RlZmF1bHQnXSAtIGNhc2Ugc3RyaW5nIHRvIG1hdGNoXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSAtIGFyZ3MgdG8gcGFzcyB0byBtYXRjaGVkIFN3aXRjaEZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7Kn0gLSBSZXN1bHQgb2YgbWF0Y2hpbmcgY2FzZSBpbiBTd2l0Y2hNYXAgZWl0aGVyIENhc2VGdW5jdGlvbiBjYWxsZWQgd2l0aCBhcmdzLCBvciB2YWx1ZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdDxzdHJpbmcsIENhc2VGdW5jdGlvbnwqPn0gU3dpdGNoTWFwXG4gKi9cblxuLyoqXG4gKiBzdy5qc1xuICpcbiAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYSBTd2l0Y2hNYXAgYW5kIHJldHVybnMgYSBTd2l0Y2hGdW5jdGlvbiB3aGljaFxuICogY2FuIGJlIGNhbGxlZCB3aXRoIGEgY2FzZSBwcm9wZXJ0eSBhbmQgZXh0cmEgYXJncyB0byBtYXRjaCB3aXRoXG4gKiBmdW5jdGlvblxuICpcbiAqIEBleGFtcGxlXG4gKiAgc3coe1xuICogICAgZm9vOiBpID0+IGkgKyAyLCAgIC8vIDVcbiAqICAgIGJhcjogJ2JheicsICAgICAgICAvLyBiYXJcbiAqICAgIGRlZmF1bHQ6IG51bGwsICAgICAvLyBudWxsXG4gKiAgfSkoJ2ZvbycsIDMpXG4gKlxuICogQHBhcmFtIHtTd2l0Y2hNYXB9IGNhc2VzIC0gQSBtYXAgb2Ygc3RyaW5nIGNhc2VzIHRvIHZhbHVlIG9yIENhc2VGdW5jdGlvbiBjYWxsXG4gKiBAcmV0dXJucyB7U3dpdGNoRnVuY3Rpb259XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2FzZXMgPT4gKGMsIC4uLmFyZ3MpID0+IHtcbiAgY29uc3QgZiA9IHt9Lmhhc093blByb3BlcnR5LmNhbGwoY2FzZXMsIGMpID8gY2FzZXNbY10gOiBjYXNlcy5kZWZhdWx0XG5cbiAgcmV0dXJuIGYgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IGYoLi4uYXJncykgOiBmXG59XG4iXSwic291cmNlUm9vdCI6IiJ9
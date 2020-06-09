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
    day: "Weekly",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29yZS9hbmFseXNpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvbW9kaWZpY2F0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvc3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2Nocm9tZS1zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvY29sLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3N3aXRjaC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJtZXNzYWdlIiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwic3ciLCJnZXRTdW1tYXJ5IiwiY29uZmlnIiwic3VtbWFyeSIsIndlZWtseSIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkYWlseSIsInNldCIsInVuaGlnaGxpZ2h0IiwiaGlnaGxpZ2h0Q2F0ZWdvcnkiLCJjb2xvciIsImRheSIsImhpZ2hsaWdodCIsInR5cGUiLCJnZXRNZWV0aW5nc0ZvckRheXMiLCJkYXlTdGFydCIsImRheUVuZCIsInNlbGVjdERheXMiLCJtYXAiLCJjb2x1bW4iLCJ0b3RhbCIsImRhdGUiLCJpbm5lclRleHQiLCJzcGxpdCIsImV2ZW50cyIsImdldE1lZXRpbmdzIiwiZWwiLCJkb2N1bWVudCIsInNlbGVjdE1lZXRpbmdzIiwibm9kZSIsInRpbWUiLCJuYW1lIiwiY2FsZW5kYXIiLCJzdGF0dXMiLCJzdGFydCIsImVuZCIsImlkIiwicmdiVG9IZXgiLCJzdHlsZSIsInN1YnN0cmluZyIsIk1hdGgiLCJtYXgiLCJ0d2VsdmVIb3VyVG9EYXRlIiwibWluIiwiZmlsdGVyIiwiZm9yRWFjaCIsInNlbGVjdEFsbE1lZXRpbmdzIiwiaW5jbHVkZXMiLCJvcGFjaXR5IiwidG90YWxUaW1lIiwicmVzIiwic3VtIiwicmVkdWNlIiwiYWNjIiwiaXQiLCJyZXN1bHQiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwidmFsIiwiY2VpbCIsImgiLCJEYXRlIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsInJlbWFpbmluZyIsInZhbHVlIiwicmVzdCIsInRvdGFsRXZlbnRzIiwicGFyc2VJbnQiLCJnZXREYXlzIiwiYXBpcyIsIkV4dGVuc2lvbiIsIkFwaSIsImNvbnNvbGUiLCJsb2ciLCJjaHJvbWUiLCJlIiwid2luZG93IiwiYnJvd3NlciIsImV4dGVuc2lvbiIsImJyb3dzZXJBY3Rpb24iLCJjbGVhciIsImNiIiwic3RvcmFnZSIsInN5bmMiLCJ1bmRlZmluZWQiLCJvIiwiZ2V0IiwicmdiU3RyaW5nIiwiciIsImciLCJiIiwic2xpY2UiLCJpIiwidG9TdHJpbmciLCJhZGp1c3RDb2wiLCJjb2wiLCJhbXQiLCJ1c2VQb3VuZCIsIm51bSIsInMiLCJhbXBtIiwidGVzdCIsImhyIiwic2V0TWlsbGlzZWNvbmRzIiwic2V0U2Vjb25kcyIsInNldE1pbnV0ZXMiLCJzZXRIb3VycyIsImRheXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiZCIsImNhbCIsInN0YXJ0c1dpdGgiLCJjYXNlcyIsImMiLCJhcmdzIiwiZiIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlZmF1bHQiLCJGdW5jdGlvbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFH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SUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JlOEYsb0VBQUssSUFBSSxDQUFDQyxDQUFELEVBQUksR0FBR0MsSUFBUCxLQUFnQjtBQUN0QyxRQUFNQyxDQUFDLEdBQUcsR0FBR0MsY0FBSCxDQUFrQkMsSUFBbEIsQ0FBdUJMLEtBQXZCLEVBQThCQyxDQUE5QixJQUFtQ0QsS0FBSyxDQUFDQyxDQUFELENBQXhDLEdBQThDRCxLQUFLLENBQUNNLE9BQTlEO0FBRUEsU0FBT0gsQ0FBQyxZQUFZSSxRQUFiLEdBQXdCSixDQUFDLENBQUMsR0FBR0QsSUFBSixDQUF6QixHQUFxQ0MsQ0FBNUM7QUFDRCxDQUpELEUiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC9jb250ZW50LmpzXCIpO1xuIiwiaW1wb3J0IHN3IGZyb20gXCIuL3V0aWxzL3N3aXRjaFwiXG5pbXBvcnQgYXBpIGZyb20gXCIuL3V0aWxzL2FwaVwiXG5pbXBvcnQgeyB3ZWVrbHksIGRhaWx5IH0gZnJvbSBcIi4vY29yZS9zdW1tYXJ5XCJcbmltcG9ydCB7IGhpZ2hsaWdodCwgdW5oaWdobGlnaHQgfSBmcm9tIFwiLi9jb3JlL21vZGlmaWNhdGlvbnNcIlxuXG5pbXBvcnQgeyBzZXQsIGdldCB9IGZyb20gXCIuL3V0aWxzL2Nocm9tZS1zdG9yYWdlXCJcblxuYXBpLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICBzdyh7XG4gICAgZ2V0U3VtbWFyeTogKHsgY29uZmlnID0ge30gfSkgPT4ge1xuICAgICAgY29uc3Qgc3VtbWFyeSA9IHtcbiAgICAgICAgd2Vla2x5OiB3ZWVrbHkoXG4gICAgICAgICAgY29uZmlnLnN0YXJ0VGltZSB8fCBcIjlhbVwiLFxuICAgICAgICAgIGNvbmZpZy5lbmRUaW1lIHx8IFwiNTozMHBtXCIsXG4gICAgICAgICAgY29uZmlnXG4gICAgICAgICksXG4gICAgICAgIGRhaWx5OiBkYWlseShcbiAgICAgICAgICBjb25maWcuc3RhcnRUaW1lIHx8IFwiOWFtXCIsXG4gICAgICAgICAgY29uZmlnLmVuZFRpbWUgfHwgXCI1OjMwcG1cIixcbiAgICAgICAgICBjb25maWdcbiAgICAgICAgKSxcbiAgICAgIH1cblxuICAgICAgc2VuZFJlc3BvbnNlKHN1bW1hcnkpXG5cbiAgICAgIHNldCh7IHN1bW1hcnkgfSlcbiAgICB9LFxuXG4gICAgdW5oaWdobGlnaHQ6ICgpID0+IHVuaGlnaGxpZ2h0KCksXG4gICAgaGlnaGxpZ2h0Q2F0ZWdvcnk6ICh7IGNvbG9yLCBkYXkgfSkgPT4gaGlnaGxpZ2h0KGNvbG9yLCBkYXkpLFxuICB9KShtZXNzYWdlLnR5cGUsIG1lc3NhZ2UpXG59KVxuIiwiaW1wb3J0IHsgcmdiVG9IZXggfSBmcm9tIFwiLi4vdXRpbHMvY29sXCJcbmltcG9ydCB7IHR3ZWx2ZUhvdXJUb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZVwiXG5cbmltcG9ydCB7IHNlbGVjdERheXMsIHNlbGVjdE1lZXRpbmdzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5cbmV4cG9ydCBjb25zdCBnZXRNZWV0aW5nc0ZvckRheXMgPSAoeyBkYXlTdGFydCwgZGF5RW5kIH0pID0+XG4gIHNlbGVjdERheXMoKS5tYXAoKGNvbHVtbikgPT4ge1xuICAgIGNvbnN0IFt0b3RhbCwgZGF5LCBkYXRlXSA9IGNvbHVtbi5pbm5lclRleHQuc3BsaXQoXCIsIFwiKVxuICAgIHJldHVybiB7XG4gICAgICB0b3RhbCxcbiAgICAgIGRheSxcbiAgICAgIGRhdGUsXG4gICAgICBldmVudHM6IGdldE1lZXRpbmdzKGNvbHVtbiwgeyBkYXlTdGFydCwgZGF5RW5kIH0pLFxuICAgIH1cbiAgfSlcblxuZXhwb3J0IGNvbnN0IGdldE1lZXRpbmdzID0gKGVsID0gZG9jdW1lbnQsIHsgZGF5U3RhcnQsIGRheUVuZCB9KSA9PlxuICBzZWxlY3RNZWV0aW5ncyhlbClcbiAgICAubWFwKChub2RlKSA9PiB7XG4gICAgICB2YXIgW3RpbWUsIG5hbWUsIGNhbGVuZGFyLCBzdGF0dXNdID0gbm9kZS5pbm5lclRleHQuc3BsaXQoXCIsIFwiKVxuICAgICAgdmFyIFtzdGFydCwgZW5kXSA9IHRpbWUuc3BsaXQoXCIgdG8gXCIpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiByZ2JUb0hleChub2RlLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXS5zdWJzdHJpbmcoKSksXG4gICAgICAgIGNhbGVuZGFyLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHRpbWU6IHtcbiAgICAgICAgICBzdGFydDogTWF0aC5tYXgodHdlbHZlSG91clRvRGF0ZShkYXlTdGFydCksIHR3ZWx2ZUhvdXJUb0RhdGUoc3RhcnQpKSxcbiAgICAgICAgICBlbmQ6IE1hdGgubWluKHR3ZWx2ZUhvdXJUb0RhdGUoZGF5RW5kKSwgdHdlbHZlSG91clRvRGF0ZShlbmQpKSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9KVxuICAgIC5maWx0ZXIoKHsgc3RhdHVzIH0pID0+IHN0YXR1cyAhPT0gXCJEZWNsaW5lZFwiKVxuIiwiaW1wb3J0IHsgcmdiVG9IZXggfSBmcm9tIFwiLi4vdXRpbHMvY29sXCJcbmltcG9ydCB7IHNlbGVjdERheXMsIHNlbGVjdEFsbE1lZXRpbmdzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHQgPSAoY29sb3IsIGRheSkgPT4ge1xuICBzZWxlY3REYXlzKCkuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgc2VsZWN0QWxsTWVldGluZ3MoY29sdW1uKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIChkYXkgPT09IFwiV2Vla2x5XCIgfHwgY29sdW1uLmlubmVyVGV4dC5pbmNsdWRlcyhkYXkpKSAmJlxuICAgICAgICByZ2JUb0hleChub2RlLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSkgPT09IGNvbG9yXG4gICAgICApIHtcbiAgICAgICAgbm9kZS5zdHlsZS5vcGFjaXR5ID0gMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5zdHlsZS5vcGFjaXR5ID0gMC4yXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHVuaGlnaGxpZ2h0ID0gKCkgPT5cbiAgc2VsZWN0QWxsTWVldGluZ3MoKS5mb3JFYWNoKChub2RlKSA9PiAobm9kZS5zdHlsZS5vcGFjaXR5ID0gMSkpXG4iLCJpbXBvcnQgeyB0d2VsdmVIb3VyVG9EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2RhdGVcIlxuaW1wb3J0IHsgZ2V0RGF5cyB9IGZyb20gXCIuLi91dGlscy9zZWxlY3RvcnNcIlxuaW1wb3J0IHsgZ2V0TWVldGluZ3MsIGdldE1lZXRpbmdzRm9yRGF5cyB9IGZyb20gXCIuL2FuYWx5c2lzXCJcblxudmFyIHN1bW1hcnkgPSAodG90YWxUaW1lLCByZXMsIGNvbmZpZyA9IHt9KSA9PiB7XG4gIGNvbnN0IHN1bSA9IHJlcy5yZWR1Y2UoXG4gICAgKGFjYywgaXQpID0+ICh7XG4gICAgICAuLi5hY2MsXG4gICAgICBbaXQuaWRdOiAoYWNjW2l0LmlkXSB8fCAwKSArIE1hdGgubWF4KDAsIGl0LnRpbWUuZW5kIC0gaXQudGltZS5zdGFydCksXG4gICAgfSksXG4gICAge31cbiAgKVxuXG4gIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5lbnRyaWVzKHN1bSlcbiAgICAuZmlsdGVyKChba2V5XSkgPT4ga2V5ICE9PSBcIm51bGxcIilcbiAgICAuZmlsdGVyKChba2V5LCB2YWxdKSA9PiB2YWwgPiAwKVxuICAgIC5tYXAoKFtrZXksIHZhbF0pID0+IFtcbiAgICAgIGNvbmZpZ1trZXldIHx8IGtleSxcbiAgICAgIGtleSxcbiAgICAgIE1hdGguY2VpbCgodmFsIC8gdG90YWxUaW1lKSAqIDEwMCksXG4gICAgICB7IGg6IG5ldyBEYXRlKHZhbCkuZ2V0SG91cnMoKSAtIDEsIG06IG5ldyBEYXRlKHZhbCkuZ2V0TWludXRlcygpIH0sXG4gICAgXSlcblxuICBjb25zdCByZW1haW5pbmcgPSAxMDAgLSByZXN1bHQucmVkdWNlKChhY2MsIFssICwgdmFsdWVdKSA9PiBhY2MgKyB2YWx1ZSwgMClcblxuICByZXR1cm4gW1xuICAgIFtcbiAgICAgIGNvbmZpZ1tcIiNmZmZcIl0gfHwgY29uZmlnW1wiI2ZmZmZmZlwiXSB8fCBcIkZyZWUgdGltZVwiLFxuICAgICAgXCIjZmZmZmZmXCIsXG4gICAgICByZW1haW5pbmcsXG4gICAgICB7XG4gICAgICAgIGg6IG5ldyBEYXRlKChyZW1haW5pbmcgLyAxMDApICogdG90YWxUaW1lKS5nZXRIb3VycygpIC0gMSxcbiAgICAgICAgbTogbmV3IERhdGUoKHJlbWFpbmluZyAvIDEwMCkgKiB0b3RhbFRpbWUpLmdldE1pbnV0ZXMoKSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICAuLi5yZXN1bHQsXG4gIF1cbn1cblxuLyoqXG4gKiBJL08gc3VtbWFyaWVzXG4gKi9cbmV4cG9ydCBjb25zdCBkYWlseSA9IChkYXlTdGFydCwgZGF5RW5kLCBjb25maWcpID0+IHtcbiAgY29uc3QgdG90YWxUaW1lID0gdHdlbHZlSG91clRvRGF0ZShkYXlFbmQpIC0gdHdlbHZlSG91clRvRGF0ZShkYXlTdGFydClcblxuICByZXR1cm4gZ2V0TWVldGluZ3NGb3JEYXlzKHsgZGF5U3RhcnQsIGRheUVuZCB9KS5tYXAoXG4gICAgKHsgZXZlbnRzLCAuLi5yZXN0IH0pID0+ICh7XG4gICAgICAuLi5yZXN0LFxuICAgICAgc3VtbWFyeTogc3VtbWFyeSh0b3RhbFRpbWUsIGV2ZW50cywgY29uZmlnKSxcbiAgICB9KVxuICApXG59XG5cbmV4cG9ydCBjb25zdCB3ZWVrbHkgPSAoZGF5U3RhcnQsIGRheUVuZCwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHRvdGFsRXZlbnRzID0gZ2V0TWVldGluZ3NGb3JEYXlzKHsgZGF5U3RhcnQsIGRheUVuZCB9KS5yZWR1Y2UoXG4gICAgKGFjYywgeyB0b3RhbCB9KSA9PiBhY2MgKyAocGFyc2VJbnQodG90YWwpIHx8IDApLFxuICAgIDBcbiAgKVxuXG4gIGNvbnN0IHRvdGFsVGltZSA9XG4gICAgKHR3ZWx2ZUhvdXJUb0RhdGUoZGF5RW5kKSAtIHR3ZWx2ZUhvdXJUb0RhdGUoZGF5U3RhcnQpKSAqIGdldERheXMoKVxuXG4gIGNvbnN0IHJlcyA9IGdldE1lZXRpbmdzKGRvY3VtZW50LCB7IGRheVN0YXJ0LCBkYXlFbmQgfSlcblxuICByZXR1cm4ge1xuICAgIGRheTogXCJXZWVrbHlcIixcbiAgICB0b3RhbDogYCR7dG90YWxFdmVudHN9IGV2ZW50c2AsXG4gICAgc3VtbWFyeTogc3VtbWFyeSh0b3RhbFRpbWUsIHJlcywgY29uZmlnKSxcbiAgfVxufVxuIiwiLyogZ2xvYmFsIGNocm9tZSBicm93c2VyICovXG5cbmNvbnN0IGFwaXMgPSBbXCJydW50aW1lXCIsIFwic3RvcmFnZVwiLCBcInRhYnNcIl1cblxuZnVuY3Rpb24gRXh0ZW5zaW9uKCkge1xuICBjb25zdCBBcGkgPSB7fVxuXG4gIGFwaXMuZm9yRWFjaCgoYXBpKSA9PiB7XG4gICAgY29uc29sZS5sb2coQXBpLCBhcGkpXG4gICAgQXBpW2FwaV0gPSBudWxsXG5cbiAgICB0cnkge1xuICAgICAgaWYgKGNocm9tZVthcGldKSB7XG4gICAgICAgIEFwaVthcGldID0gY2hyb21lW2FwaV1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh3aW5kb3dbYXBpXSkge1xuICAgICAgICBBcGlbYXBpXSA9IHdpbmRvd1thcGldXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIHRyeSB7XG4gICAgICBpZiAoYnJvd3NlclthcGldKSB7XG4gICAgICAgIEFwaVthcGldID0gYnJvd3NlclthcGldXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgQXBpLmFwaSA9IGJyb3dzZXIuZXh0ZW5zaW9uW2FwaV1cbiAgICB9IGNhdGNoIChlKSB7fVxuICB9KVxuXG4gIHRyeSB7XG4gICAgaWYgKGJyb3dzZXIgJiYgYnJvd3Nlci5ydW50aW1lKSB7XG4gICAgICB0aGlzLnJ1bnRpbWUgPSBicm93c2VyLnJ1bnRpbWVcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdHJ5IHtcbiAgICBpZiAoYnJvd3NlciAmJiBicm93c2VyLmJyb3dzZXJBY3Rpb24pIHtcbiAgICAgIHRoaXMuYnJvd3NlckFjdGlvbiA9IGJyb3dzZXIuYnJvd3NlckFjdGlvblxuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cblxuICByZXR1cm4gQXBpXG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4dGVuc2lvbigpXG4iLCJpbXBvcnQgYXBpIGZyb20gXCIuL2FwaVwiXG5cbmV4cG9ydCBjb25zdCBjbGVhciA9IChrZXksIGNiID0gKCkgPT4ge30pID0+XG4gIGFwaS5zdG9yYWdlLnN5bmMuc2V0KHsgW2tleV06IHVuZGVmaW5lZCB9LCBjYilcbmV4cG9ydCBjb25zdCBzZXQgPSAobywgY2IgPSAoKSA9PiB7fSkgPT4gYXBpLnN0b3JhZ2Uuc3luYy5zZXQobywgY2IpXG5leHBvcnQgY29uc3QgZ2V0ID0gKGtleSwgY2IgPSAoKSA9PiB7fSkgPT4gYXBpLnN0b3JhZ2Uuc3luYy5nZXQoW2tleV0sIGNiKVxuIiwiZXhwb3J0IGNvbnN0IHJnYlRvSGV4ID0gKHJnYlN0cmluZykgPT4ge1xuICBpZiAoIXJnYlN0cmluZykgcmV0dXJuIG51bGxcblxuICB2YXIgW3IsIGcsIGJdID0gcmdiU3RyaW5nXG4gICAgLnNsaWNlKDQsIC0xKVxuICAgIC5zcGxpdCgvLCA/LylcbiAgICAubWFwKChpKSA9PiAraSlcbiAgcmV0dXJuIFwiI1wiICsgKCgxIDw8IDI0KSArIChyIDw8IDE2KSArIChnIDw8IDgpICsgYikudG9TdHJpbmcoMTYpLnNsaWNlKDEpXG59XG5cbmV4cG9ydCBjb25zdCBhZGp1c3RDb2wgPSAoY29sLCBhbXQpID0+IHtcbiAgdmFyIHVzZVBvdW5kID0gZmFsc2VcblxuICBpZiAoY29sWzBdID09IFwiI1wiKSB7XG4gICAgY29sID0gY29sLnNsaWNlKDEpXG4gICAgdXNlUG91bmQgPSB0cnVlXG4gIH1cblxuICB2YXIgbnVtID0gcGFyc2VJbnQoY29sLCAxNikgfHwgMFxuXG4gIHZhciByID0gKG51bSA+PiAxNikgKyBhbXRcblxuICBpZiAociA+IDI1NSkgciA9IDI1NVxuICBlbHNlIGlmIChyIDwgMCkgciA9IDBcblxuICB2YXIgYiA9ICgobnVtID4+IDgpICYgMHgwMGZmKSArIGFtdFxuXG4gIGlmIChiID4gMjU1KSBiID0gMjU1XG4gIGVsc2UgaWYgKGIgPCAwKSBiID0gMFxuXG4gIHZhciBnID0gKG51bSAmIDB4MDAwMGZmKSArIGFtdFxuXG4gIGlmIChnID4gMjU1KSBnID0gMjU1XG4gIGVsc2UgaWYgKGcgPCAwKSBnID0gMFxuXG4gIHJldHVybiAodXNlUG91bmQgPyBcIiNcIiA6IFwiXCIpICsgKGcgfCAoYiA8PCA4KSB8IChyIDw8IDE2KSkudG9TdHJpbmcoMTYpXG59XG4iLCJleHBvcnQgY29uc3QgdHdlbHZlSG91clRvRGF0ZSA9IChzKSA9PiB7XG4gIGNvbnN0IFt0aW1lLCBhbXBtXSA9IC9bYXBdbSQvLnRlc3QocykgPyBbcy5zbGljZSgwLCAtMiksIHMuc2xpY2UoLTIpXSA6IFtzXVxuICBjb25zdCBbaHIsIG1pbiA9IDBdID0gdGltZS5zcGxpdChcIjpcIilcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcblxuICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKVxuICBkYXRlLnNldFNlY29uZHMoMClcbiAgZGF0ZS5zZXRNaW51dGVzKCttaW4pXG5cbiAgIWFtcG1cbiAgICA/IGRhdGUuc2V0SG91cnMoK2hyKVxuICAgIDogK2hyID09PSAxMlxuICAgID8gZGF0ZS5zZXRIb3VycyhhbXBtID09PSBcImFtXCIgPyAraHIgKyAxMiA6ICtocilcbiAgICA6IGRhdGUuc2V0SG91cnMoYW1wbSA9PT0gXCJhbVwiID8gK2hyIDogK2hyICsgMTIpXG5cbiAgcmV0dXJuIGRhdGVcbn1cbiIsImNvbnN0IGRheXMgPSAoZWwgPSBkb2N1bWVudCkgPT4gWy4uLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwiZ3JpZGNlbGxcIicpXVxuXG5leHBvcnQgY29uc3QgZ2V0RGF5cyA9IChlbCA9IGRvY3VtZW50KSA9PiBkYXlzKGVsKS5sZW5ndGggLyAyXG5leHBvcnQgY29uc3Qgc2VsZWN0RGF5cyA9IChlbCA9IGRvY3VtZW50KSA9PiB7XG4gIGNvbnN0IGQgPSBkYXlzKGVsKVxuICByZXR1cm4gZC5zbGljZShkLmxlbmd0aCAvIDIpXG59XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RNZWV0aW5ncyA9IChlbCA9IGRvY3VtZW50KSA9PlxuICBzZWxlY3RBbGxNZWV0aW5ncyhlbCkuZmlsdGVyKChpKSA9PiB7XG4gICAgY29uc3QgW3RpbWUsICwgY2FsXSA9IGkuaW5uZXJUZXh0LnNwbGl0KFwiLCBcIilcbiAgICByZXR1cm4gIWNhbC5zdGFydHNXaXRoKFwiQ2FsZW5kYXI6IFwiKVxuICB9KVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0QWxsTWVldGluZ3MgPSAoZWwgPSBkb2N1bWVudCkgPT5cbiAgWy4uLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdltkYXRhLW9wZW5zLWRldGFpbHM9XCJ0cnVlXCJdJyldLmZpbHRlcigoaSkgPT5cbiAgICAvXihbMC05XXsxLDJ9OlswLTldezJ9fFswLTldezEsMn0pKFthcF1tfCkgdG8gLy50ZXN0KGkuaW5uZXJUZXh0KVxuICApXG4iLCIvKipcbiAqIEB0eXBlZGVmIHtGdW5jdGlvbn0gQ2FzZUZ1bmN0aW9uXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSAtIExpc3Qgb2YgYXJncyBwcm92aWRlZCB0byBhbm9ueW1vdXMgZnVuY3Rpb25cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtGdW5jdGlvbn0gU3dpdGNoRnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBbYz0nZGVmYXVsdCddIC0gY2FzZSBzdHJpbmcgdG8gbWF0Y2hcbiAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdIC0gYXJncyB0byBwYXNzIHRvIG1hdGNoZWQgU3dpdGNoRnVuY3Rpb25cbiAqIEByZXR1cm5zIHsqfSAtIFJlc3VsdCBvZiBtYXRjaGluZyBjYXNlIGluIFN3aXRjaE1hcCBlaXRoZXIgQ2FzZUZ1bmN0aW9uIGNhbGxlZCB3aXRoIGFyZ3MsIG9yIHZhbHVlXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0PHN0cmluZywgQ2FzZUZ1bmN0aW9ufCo+fSBTd2l0Y2hNYXBcbiAqL1xuXG4vKipcbiAqIHN3LmpzXG4gKlxuICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhIFN3aXRjaE1hcCBhbmQgcmV0dXJucyBhIFN3aXRjaEZ1bmN0aW9uIHdoaWNoXG4gKiBjYW4gYmUgY2FsbGVkIHdpdGggYSBjYXNlIHByb3BlcnR5IGFuZCBleHRyYSBhcmdzIHRvIG1hdGNoIHdpdGhcbiAqIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqICBzdyh7XG4gKiAgICBmb286IGkgPT4gaSArIDIsICAgLy8gNVxuICogICAgYmFyOiAnYmF6JywgICAgICAgIC8vIGJhclxuICogICAgZGVmYXVsdDogbnVsbCwgICAgIC8vIG51bGxcbiAqICB9KSgnZm9vJywgMylcbiAqXG4gKiBAcGFyYW0ge1N3aXRjaE1hcH0gY2FzZXMgLSBBIG1hcCBvZiBzdHJpbmcgY2FzZXMgdG8gdmFsdWUgb3IgQ2FzZUZ1bmN0aW9uIGNhbGxcbiAqIEByZXR1cm5zIHtTd2l0Y2hGdW5jdGlvbn1cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjYXNlcyA9PiAoYywgLi4uYXJncykgPT4ge1xuICBjb25zdCBmID0ge30uaGFzT3duUHJvcGVydHkuY2FsbChjYXNlcywgYykgPyBjYXNlc1tjXSA6IGNhc2VzLmRlZmF1bHRcblxuICByZXR1cm4gZiBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gZiguLi5hcmdzKSA6IGZcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
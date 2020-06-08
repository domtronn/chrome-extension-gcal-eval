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
  const [,, cal] = i.innerText.split(", ");
  return !cal.startsWith("Calendar: ");
});
const selectAllMeetings = (el = document) => [...el.querySelectorAll('div[data-opens-details="true"]')].filter(i => /([0-9]{1,2}:[0-9]{2}|[0-9]{1,2})([ap]m|) to /.test(i.innerText));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29yZS9hbmFseXNpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvbW9kaWZpY2F0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvc3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2Nocm9tZS1zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvY29sLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3N3aXRjaC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJtZXNzYWdlIiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwic3ciLCJnZXRTdW1tYXJ5IiwiY29uZmlnIiwic3VtbWFyeSIsIndlZWtseSIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkYWlseSIsInNldCIsInVuaGlnaGxpZ2h0IiwiaGlnaGxpZ2h0Q2F0ZWdvcnkiLCJjb2xvciIsImRheSIsImhpZ2hsaWdodCIsInR5cGUiLCJnZXRNZWV0aW5nc0ZvckRheXMiLCJkYXlTdGFydCIsImRheUVuZCIsInNlbGVjdERheXMiLCJtYXAiLCJjb2x1bW4iLCJ0b3RhbCIsImRhdGUiLCJpbm5lclRleHQiLCJzcGxpdCIsImV2ZW50cyIsImdldE1lZXRpbmdzIiwiZWwiLCJkb2N1bWVudCIsInNlbGVjdE1lZXRpbmdzIiwibm9kZSIsInRpbWUiLCJuYW1lIiwiY2FsZW5kYXIiLCJzdGF0dXMiLCJzdGFydCIsImVuZCIsImlkIiwicmdiVG9IZXgiLCJzdHlsZSIsInN1YnN0cmluZyIsIk1hdGgiLCJtYXgiLCJ0d2VsdmVIb3VyVG9EYXRlIiwibWluIiwiZmlsdGVyIiwiZm9yRWFjaCIsInNlbGVjdEFsbE1lZXRpbmdzIiwiaW5jbHVkZXMiLCJvcGFjaXR5IiwidG90YWxUaW1lIiwicmVzIiwic3VtIiwicmVkdWNlIiwiYWNjIiwiaXQiLCJyZXN1bHQiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwidmFsIiwiY2VpbCIsImgiLCJEYXRlIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsInJlbWFpbmluZyIsInZhbHVlIiwicmVzdCIsInRvdGFsRXZlbnRzIiwicGFyc2VJbnQiLCJnZXREYXlzIiwiYXBpcyIsIkV4dGVuc2lvbiIsIkFwaSIsImNvbnNvbGUiLCJsb2ciLCJjaHJvbWUiLCJlIiwid2luZG93IiwiYnJvd3NlciIsImV4dGVuc2lvbiIsImJyb3dzZXJBY3Rpb24iLCJjbGVhciIsImNiIiwic3RvcmFnZSIsInN5bmMiLCJ1bmRlZmluZWQiLCJvIiwiZ2V0IiwicmdiU3RyaW5nIiwiciIsImciLCJiIiwic2xpY2UiLCJpIiwidG9TdHJpbmciLCJhZGp1c3RDb2wiLCJjb2wiLCJhbXQiLCJ1c2VQb3VuZCIsIm51bSIsInMiLCJhbXBtIiwidGVzdCIsImhyIiwic2V0TWlsbGlzZWNvbmRzIiwic2V0U2Vjb25kcyIsInNldE1pbnV0ZXMiLCJzZXRIb3VycyIsImRheXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiZCIsImNhbCIsInN0YXJ0c1dpdGgiLCJjYXNlcyIsImMiLCJhcmdzIiwiZiIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlZmF1bHQiLCJGdW5jdGlvbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFH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Ozs7Ozs7QUFrQmU4RixvRUFBSyxJQUFJLENBQUNDLENBQUQsRUFBSSxHQUFHQyxJQUFQLEtBQWdCO0FBQ3RDLFFBQU1DLENBQUMsR0FBRyxHQUFHQyxjQUFILENBQWtCQyxJQUFsQixDQUF1QkwsS0FBdkIsRUFBOEJDLENBQTlCLElBQW1DRCxLQUFLLENBQUNDLENBQUQsQ0FBeEMsR0FBOENELEtBQUssQ0FBQ00sT0FBOUQ7QUFFQSxTQUFPSCxDQUFDLFlBQVlJLFFBQWIsR0FBd0JKLENBQUMsQ0FBQyxHQUFHRCxJQUFKLENBQXpCLEdBQXFDQyxDQUE1QztBQUNELENBSkQsRSIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwL2NvbnRlbnQuanNcIik7XG4iLCJpbXBvcnQgc3cgZnJvbSBcIi4vdXRpbHMvc3dpdGNoXCJcbmltcG9ydCBhcGkgZnJvbSBcIi4vdXRpbHMvYXBpXCJcbmltcG9ydCB7IHdlZWtseSwgZGFpbHkgfSBmcm9tIFwiLi9jb3JlL3N1bW1hcnlcIlxuaW1wb3J0IHsgaGlnaGxpZ2h0LCB1bmhpZ2hsaWdodCB9IGZyb20gXCIuL2NvcmUvbW9kaWZpY2F0aW9uc1wiXG5cbmltcG9ydCB7IHNldCwgZ2V0IH0gZnJvbSBcIi4vdXRpbHMvY2hyb21lLXN0b3JhZ2VcIlxuXG5hcGkucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIHN3KHtcbiAgICBnZXRTdW1tYXJ5OiAoeyBjb25maWcgPSB7fSB9KSA9PiB7XG4gICAgICBjb25zdCBzdW1tYXJ5ID0ge1xuICAgICAgICB3ZWVrbHk6IHdlZWtseShcbiAgICAgICAgICBjb25maWcuc3RhcnRUaW1lIHx8IFwiOWFtXCIsXG4gICAgICAgICAgY29uZmlnLmVuZFRpbWUgfHwgXCI1OjMwcG1cIixcbiAgICAgICAgICBjb25maWdcbiAgICAgICAgKSxcbiAgICAgICAgZGFpbHk6IGRhaWx5KFxuICAgICAgICAgIGNvbmZpZy5zdGFydFRpbWUgfHwgXCI5YW1cIixcbiAgICAgICAgICBjb25maWcuZW5kVGltZSB8fCBcIjU6MzBwbVwiLFxuICAgICAgICAgIGNvbmZpZ1xuICAgICAgICApLFxuICAgICAgfVxuXG4gICAgICBzZW5kUmVzcG9uc2Uoc3VtbWFyeSlcblxuICAgICAgc2V0KHsgc3VtbWFyeSB9KVxuICAgIH0sXG5cbiAgICB1bmhpZ2hsaWdodDogKCkgPT4gdW5oaWdobGlnaHQoKSxcbiAgICBoaWdobGlnaHRDYXRlZ29yeTogKHsgY29sb3IsIGRheSB9KSA9PiBoaWdobGlnaHQoY29sb3IsIGRheSksXG4gIH0pKG1lc3NhZ2UudHlwZSwgbWVzc2FnZSlcbn0pXG4iLCJpbXBvcnQgeyByZ2JUb0hleCB9IGZyb20gXCIuLi91dGlscy9jb2xcIlxuaW1wb3J0IHsgdHdlbHZlSG91clRvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9kYXRlXCJcblxuaW1wb3J0IHsgc2VsZWN0RGF5cywgc2VsZWN0TWVldGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvc2VsZWN0b3JzXCJcblxuZXhwb3J0IGNvbnN0IGdldE1lZXRpbmdzRm9yRGF5cyA9ICh7IGRheVN0YXJ0LCBkYXlFbmQgfSkgPT5cbiAgc2VsZWN0RGF5cygpLm1hcCgoY29sdW1uKSA9PiB7XG4gICAgY29uc3QgW3RvdGFsLCBkYXksIGRhdGVdID0gY29sdW1uLmlubmVyVGV4dC5zcGxpdChcIiwgXCIpXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvdGFsLFxuICAgICAgZGF5LFxuICAgICAgZGF0ZSxcbiAgICAgIGV2ZW50czogZ2V0TWVldGluZ3MoY29sdW1uLCB7IGRheVN0YXJ0LCBkYXlFbmQgfSksXG4gICAgfVxuICB9KVxuXG5leHBvcnQgY29uc3QgZ2V0TWVldGluZ3MgPSAoZWwgPSBkb2N1bWVudCwgeyBkYXlTdGFydCwgZGF5RW5kIH0pID0+XG4gIHNlbGVjdE1lZXRpbmdzKGVsKVxuICAgIC5tYXAoKG5vZGUpID0+IHtcbiAgICAgIHZhciBbdGltZSwgbmFtZSwgY2FsZW5kYXIsIHN0YXR1c10gPSBub2RlLmlubmVyVGV4dC5zcGxpdChcIiwgXCIpXG4gICAgICB2YXIgW3N0YXJ0LCBlbmRdID0gdGltZS5zcGxpdChcIiB0byBcIilcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHJnYlRvSGV4KG5vZGUuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLnN1YnN0cmluZygpKSxcbiAgICAgICAgY2FsZW5kYXIsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdGltZToge1xuICAgICAgICAgIHN0YXJ0OiBNYXRoLm1heCh0d2VsdmVIb3VyVG9EYXRlKGRheVN0YXJ0KSwgdHdlbHZlSG91clRvRGF0ZShzdGFydCkpLFxuICAgICAgICAgIGVuZDogTWF0aC5taW4odHdlbHZlSG91clRvRGF0ZShkYXlFbmQpLCB0d2VsdmVIb3VyVG9EYXRlKGVuZCkpLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH0pXG4gICAgLmZpbHRlcigoeyBzdGF0dXMgfSkgPT4gc3RhdHVzICE9PSBcIkRlY2xpbmVkXCIpXG4iLCJpbXBvcnQgeyByZ2JUb0hleCB9IGZyb20gXCIuLi91dGlscy9jb2xcIlxuaW1wb3J0IHsgc2VsZWN0RGF5cywgc2VsZWN0QWxsTWVldGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvc2VsZWN0b3JzXCJcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodCA9IChjb2xvciwgZGF5KSA9PiB7XG4gIHNlbGVjdERheXMoKS5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICBzZWxlY3RBbGxNZWV0aW5ncyhjb2x1bW4pLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgKGRheSA9PT0gXCJXZWVrbHlcIiB8fCBjb2x1bW4uaW5uZXJUZXh0LmluY2x1ZGVzKGRheSkpICYmXG4gICAgICAgIHJnYlRvSGV4KG5vZGUuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdKSA9PT0gY29sb3JcbiAgICAgICkge1xuICAgICAgICBub2RlLnN0eWxlLm9wYWNpdHkgPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnN0eWxlLm9wYWNpdHkgPSAwLjJcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgdW5oaWdobGlnaHQgPSAoKSA9PlxuICBzZWxlY3RBbGxNZWV0aW5ncygpLmZvckVhY2goKG5vZGUpID0+IChub2RlLnN0eWxlLm9wYWNpdHkgPSAxKSlcbiIsImltcG9ydCB7IHR3ZWx2ZUhvdXJUb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZGF0ZVwiXG5pbXBvcnQgeyBnZXREYXlzIH0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5pbXBvcnQgeyBnZXRNZWV0aW5ncywgZ2V0TWVldGluZ3NGb3JEYXlzIH0gZnJvbSBcIi4vYW5hbHlzaXNcIlxuXG52YXIgc3VtbWFyeSA9ICh0b3RhbFRpbWUsIHJlcywgY29uZmlnID0ge30pID0+IHtcbiAgY29uc3Qgc3VtID0gcmVzLnJlZHVjZShcbiAgICAoYWNjLCBpdCkgPT4gKHtcbiAgICAgIC4uLmFjYyxcbiAgICAgIFtpdC5pZF06IChhY2NbaXQuaWRdIHx8IDApICsgTWF0aC5tYXgoMCwgaXQudGltZS5lbmQgLSBpdC50aW1lLnN0YXJ0KSxcbiAgICB9KSxcbiAgICB7fVxuICApXG5cbiAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmVudHJpZXMoc3VtKVxuICAgIC5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09IFwibnVsbFwiKVxuICAgIC5maWx0ZXIoKFtrZXksIHZhbF0pID0+IHZhbCA+IDApXG4gICAgLm1hcCgoW2tleSwgdmFsXSkgPT4gW1xuICAgICAgY29uZmlnW2tleV0gfHwga2V5LFxuICAgICAga2V5LFxuICAgICAgTWF0aC5jZWlsKCh2YWwgLyB0b3RhbFRpbWUpICogMTAwKSxcbiAgICAgIHsgaDogbmV3IERhdGUodmFsKS5nZXRIb3VycygpIC0gMSwgbTogbmV3IERhdGUodmFsKS5nZXRNaW51dGVzKCkgfSxcbiAgICBdKVxuXG4gIGNvbnN0IHJlbWFpbmluZyA9IDEwMCAtIHJlc3VsdC5yZWR1Y2UoKGFjYywgWywgLCB2YWx1ZV0pID0+IGFjYyArIHZhbHVlLCAwKVxuXG4gIHJldHVybiBbXG4gICAgW1xuICAgICAgY29uZmlnW1wiI2ZmZlwiXSB8fCBjb25maWdbXCIjZmZmZmZmXCJdIHx8IFwiRnJlZSB0aW1lXCIsXG4gICAgICBcIiNmZmZmZmZcIixcbiAgICAgIHJlbWFpbmluZyxcbiAgICAgIHtcbiAgICAgICAgaDogbmV3IERhdGUoKHJlbWFpbmluZyAvIDEwMCkgKiB0b3RhbFRpbWUpLmdldEhvdXJzKCkgLSAxLFxuICAgICAgICBtOiBuZXcgRGF0ZSgocmVtYWluaW5nIC8gMTAwKSAqIHRvdGFsVGltZSkuZ2V0TWludXRlcygpLFxuICAgICAgfSxcbiAgICBdLFxuICAgIC4uLnJlc3VsdCxcbiAgXVxufVxuXG4vKipcbiAqIEkvTyBzdW1tYXJpZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGRhaWx5ID0gKGRheVN0YXJ0LCBkYXlFbmQsIGNvbmZpZykgPT4ge1xuICBjb25zdCB0b3RhbFRpbWUgPSB0d2VsdmVIb3VyVG9EYXRlKGRheUVuZCkgLSB0d2VsdmVIb3VyVG9EYXRlKGRheVN0YXJ0KVxuXG4gIHJldHVybiBnZXRNZWV0aW5nc0ZvckRheXMoeyBkYXlTdGFydCwgZGF5RW5kIH0pLm1hcChcbiAgICAoeyBldmVudHMsIC4uLnJlc3QgfSkgPT4gKHtcbiAgICAgIC4uLnJlc3QsXG4gICAgICBzdW1tYXJ5OiBzdW1tYXJ5KHRvdGFsVGltZSwgZXZlbnRzLCBjb25maWcpLFxuICAgIH0pXG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IHdlZWtseSA9IChkYXlTdGFydCwgZGF5RW5kLCBjb25maWcpID0+IHtcbiAgY29uc3QgdG90YWxFdmVudHMgPSBnZXRNZWV0aW5nc0ZvckRheXMoeyBkYXlTdGFydCwgZGF5RW5kIH0pLnJlZHVjZShcbiAgICAoYWNjLCB7IHRvdGFsIH0pID0+IGFjYyArIChwYXJzZUludCh0b3RhbCkgfHwgMCksXG4gICAgMFxuICApXG5cbiAgY29uc3QgdG90YWxUaW1lID1cbiAgICAodHdlbHZlSG91clRvRGF0ZShkYXlFbmQpIC0gdHdlbHZlSG91clRvRGF0ZShkYXlTdGFydCkpICogZ2V0RGF5cygpXG5cbiAgY29uc3QgcmVzID0gZ2V0TWVldGluZ3MoZG9jdW1lbnQsIHsgZGF5U3RhcnQsIGRheUVuZCB9KVxuXG4gIHJldHVybiB7XG4gICAgZGF5OiBcIldlZWtseVwiLFxuICAgIHRvdGFsOiBgJHt0b3RhbEV2ZW50c30gZXZlbnRzYCxcbiAgICBzdW1tYXJ5OiBzdW1tYXJ5KHRvdGFsVGltZSwgcmVzLCBjb25maWcpLFxuICB9XG59XG4iLCIvKiBnbG9iYWwgY2hyb21lIGJyb3dzZXIgKi9cblxuY29uc3QgYXBpcyA9IFtcInJ1bnRpbWVcIiwgXCJzdG9yYWdlXCIsIFwidGFic1wiXVxuXG5mdW5jdGlvbiBFeHRlbnNpb24oKSB7XG4gIGNvbnN0IEFwaSA9IHt9XG5cbiAgYXBpcy5mb3JFYWNoKChhcGkpID0+IHtcbiAgICBjb25zb2xlLmxvZyhBcGksIGFwaSlcbiAgICBBcGlbYXBpXSA9IG51bGxcblxuICAgIHRyeSB7XG4gICAgICBpZiAoY2hyb21lW2FwaV0pIHtcbiAgICAgICAgQXBpW2FwaV0gPSBjaHJvbWVbYXBpXVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHdpbmRvd1thcGldKSB7XG4gICAgICAgIEFwaVthcGldID0gd2luZG93W2FwaV1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChicm93c2VyW2FwaV0pIHtcbiAgICAgICAgQXBpW2FwaV0gPSBicm93c2VyW2FwaV1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICBBcGkuYXBpID0gYnJvd3Nlci5leHRlbnNpb25bYXBpXVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH0pXG5cbiAgdHJ5IHtcbiAgICBpZiAoYnJvd3NlciAmJiBicm93c2VyLnJ1bnRpbWUpIHtcbiAgICAgIHRoaXMucnVudGltZSA9IGJyb3dzZXIucnVudGltZVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cblxuICB0cnkge1xuICAgIGlmIChicm93c2VyICYmIGJyb3dzZXIuYnJvd3NlckFjdGlvbikge1xuICAgICAgdGhpcy5icm93c2VyQWN0aW9uID0gYnJvd3Nlci5icm93c2VyQWN0aW9uXG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuXG4gIHJldHVybiBBcGlcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5zaW9uKClcbiIsImltcG9ydCBhcGkgZnJvbSBcIi4vYXBpXCJcblxuZXhwb3J0IGNvbnN0IGNsZWFyID0gKGtleSwgY2IgPSAoKSA9PiB7fSkgPT5cbiAgYXBpLnN0b3JhZ2Uuc3luYy5zZXQoeyBba2V5XTogdW5kZWZpbmVkIH0sIGNiKVxuZXhwb3J0IGNvbnN0IHNldCA9IChvLCBjYiA9ICgpID0+IHt9KSA9PiBhcGkuc3RvcmFnZS5zeW5jLnNldChvLCBjYilcbmV4cG9ydCBjb25zdCBnZXQgPSAoa2V5LCBjYiA9ICgpID0+IHt9KSA9PiBhcGkuc3RvcmFnZS5zeW5jLmdldChba2V5XSwgY2IpXG4iLCJleHBvcnQgY29uc3QgcmdiVG9IZXggPSAocmdiU3RyaW5nKSA9PiB7XG4gIGlmICghcmdiU3RyaW5nKSByZXR1cm4gbnVsbFxuXG4gIHZhciBbciwgZywgYl0gPSByZ2JTdHJpbmdcbiAgICAuc2xpY2UoNCwgLTEpXG4gICAgLnNwbGl0KC8sID8vKVxuICAgIC5tYXAoKGkpID0+ICtpKVxuICByZXR1cm4gXCIjXCIgKyAoKDEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikuc2xpY2UoMSlcbn1cblxuZXhwb3J0IGNvbnN0IGFkanVzdENvbCA9IChjb2wsIGFtdCkgPT4ge1xuICB2YXIgdXNlUG91bmQgPSBmYWxzZVxuXG4gIGlmIChjb2xbMF0gPT0gXCIjXCIpIHtcbiAgICBjb2wgPSBjb2wuc2xpY2UoMSlcbiAgICB1c2VQb3VuZCA9IHRydWVcbiAgfVxuXG4gIHZhciBudW0gPSBwYXJzZUludChjb2wsIDE2KSB8fCAwXG5cbiAgdmFyIHIgPSAobnVtID4+IDE2KSArIGFtdFxuXG4gIGlmIChyID4gMjU1KSByID0gMjU1XG4gIGVsc2UgaWYgKHIgPCAwKSByID0gMFxuXG4gIHZhciBiID0gKChudW0gPj4gOCkgJiAweDAwZmYpICsgYW10XG5cbiAgaWYgKGIgPiAyNTUpIGIgPSAyNTVcbiAgZWxzZSBpZiAoYiA8IDApIGIgPSAwXG5cbiAgdmFyIGcgPSAobnVtICYgMHgwMDAwZmYpICsgYW10XG5cbiAgaWYgKGcgPiAyNTUpIGcgPSAyNTVcbiAgZWxzZSBpZiAoZyA8IDApIGcgPSAwXG5cbiAgcmV0dXJuICh1c2VQb3VuZCA/IFwiI1wiIDogXCJcIikgKyAoZyB8IChiIDw8IDgpIHwgKHIgPDwgMTYpKS50b1N0cmluZygxNilcbn1cbiIsImV4cG9ydCBjb25zdCB0d2VsdmVIb3VyVG9EYXRlID0gKHMpID0+IHtcbiAgY29uc3QgW3RpbWUsIGFtcG1dID0gL1thcF1tJC8udGVzdChzKSA/IFtzLnNsaWNlKDAsIC0yKSwgcy5zbGljZSgtMildIDogW3NdXG4gIGNvbnN0IFtociwgbWluID0gMF0gPSB0aW1lLnNwbGl0KFwiOlwiKVxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuXG4gIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApXG4gIGRhdGUuc2V0U2Vjb25kcygwKVxuICBkYXRlLnNldE1pbnV0ZXMoK21pbilcblxuICAhYW1wbVxuICAgID8gZGF0ZS5zZXRIb3VycygraHIpXG4gICAgOiAraHIgPT09IDEyXG4gICAgPyBkYXRlLnNldEhvdXJzKGFtcG0gPT09IFwiYW1cIiA/ICtociArIDEyIDogK2hyKVxuICAgIDogZGF0ZS5zZXRIb3VycyhhbXBtID09PSBcImFtXCIgPyAraHIgOiAraHIgKyAxMilcblxuICByZXR1cm4gZGF0ZVxufVxuIiwiY29uc3QgZGF5cyA9IChlbCA9IGRvY3VtZW50KSA9PiBbLi4uZWwucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJncmlkY2VsbFwiJyldXG5cbmV4cG9ydCBjb25zdCBnZXREYXlzID0gKGVsID0gZG9jdW1lbnQpID0+IGRheXMoZWwpLmxlbmd0aCAvIDJcbmV4cG9ydCBjb25zdCBzZWxlY3REYXlzID0gKGVsID0gZG9jdW1lbnQpID0+IHtcbiAgY29uc3QgZCA9IGRheXMoZWwpXG4gIHJldHVybiBkLnNsaWNlKGQubGVuZ3RoIC8gMilcbn1cblxuZXhwb3J0IGNvbnN0IHNlbGVjdE1lZXRpbmdzID0gKGVsID0gZG9jdW1lbnQpID0+XG4gIHNlbGVjdEFsbE1lZXRpbmdzKGVsKS5maWx0ZXIoKGkpID0+IHtcbiAgICBjb25zdCBbLCAsIGNhbF0gPSBpLmlubmVyVGV4dC5zcGxpdChcIiwgXCIpXG4gICAgcmV0dXJuICFjYWwuc3RhcnRzV2l0aChcIkNhbGVuZGFyOiBcIilcbiAgfSlcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbE1lZXRpbmdzID0gKGVsID0gZG9jdW1lbnQpID0+XG4gIFsuLi5lbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbZGF0YS1vcGVucy1kZXRhaWxzPVwidHJ1ZVwiXScpXS5maWx0ZXIoKGkpID0+XG4gICAgLyhbMC05XXsxLDJ9OlswLTldezJ9fFswLTldezEsMn0pKFthcF1tfCkgdG8gLy50ZXN0KGkuaW5uZXJUZXh0KVxuICApXG4iLCIvKipcbiAqIEB0eXBlZGVmIHtGdW5jdGlvbn0gQ2FzZUZ1bmN0aW9uXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSAtIExpc3Qgb2YgYXJncyBwcm92aWRlZCB0byBhbm9ueW1vdXMgZnVuY3Rpb25cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtGdW5jdGlvbn0gU3dpdGNoRnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBbYz0nZGVmYXVsdCddIC0gY2FzZSBzdHJpbmcgdG8gbWF0Y2hcbiAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdIC0gYXJncyB0byBwYXNzIHRvIG1hdGNoZWQgU3dpdGNoRnVuY3Rpb25cbiAqIEByZXR1cm5zIHsqfSAtIFJlc3VsdCBvZiBtYXRjaGluZyBjYXNlIGluIFN3aXRjaE1hcCBlaXRoZXIgQ2FzZUZ1bmN0aW9uIGNhbGxlZCB3aXRoIGFyZ3MsIG9yIHZhbHVlXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0PHN0cmluZywgQ2FzZUZ1bmN0aW9ufCo+fSBTd2l0Y2hNYXBcbiAqL1xuXG4vKipcbiAqIHN3LmpzXG4gKlxuICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhIFN3aXRjaE1hcCBhbmQgcmV0dXJucyBhIFN3aXRjaEZ1bmN0aW9uIHdoaWNoXG4gKiBjYW4gYmUgY2FsbGVkIHdpdGggYSBjYXNlIHByb3BlcnR5IGFuZCBleHRyYSBhcmdzIHRvIG1hdGNoIHdpdGhcbiAqIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqICBzdyh7XG4gKiAgICBmb286IGkgPT4gaSArIDIsICAgLy8gNVxuICogICAgYmFyOiAnYmF6JywgICAgICAgIC8vIGJhclxuICogICAgZGVmYXVsdDogbnVsbCwgICAgIC8vIG51bGxcbiAqICB9KSgnZm9vJywgMylcbiAqXG4gKiBAcGFyYW0ge1N3aXRjaE1hcH0gY2FzZXMgLSBBIG1hcCBvZiBzdHJpbmcgY2FzZXMgdG8gdmFsdWUgb3IgQ2FzZUZ1bmN0aW9uIGNhbGxcbiAqIEByZXR1cm5zIHtTd2l0Y2hGdW5jdGlvbn1cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjYXNlcyA9PiAoYywgLi4uYXJncykgPT4ge1xuICBjb25zdCBmID0ge30uaGFzT3duUHJvcGVydHkuY2FsbChjYXNlcywgYykgPyBjYXNlc1tjXSA6IGNhc2VzLmRlZmF1bHRcblxuICByZXR1cm4gZiBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gZiguLi5hcmdzKSA6IGZcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
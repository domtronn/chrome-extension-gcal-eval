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






const getSummary = ({
  config = {},
  sendResponse
}) => {
  const summary = {
    weekly: Object(_core_summary__WEBPACK_IMPORTED_MODULE_2__["weekly"])(config.startTime || "9am", config.endTime || "5:30pm", config),
    daily: Object(_core_summary__WEBPACK_IMPORTED_MODULE_2__["daily"])(config.startTime || "9am", config.endTime || "5:30pm", config)
  };
  sendResponse && sendResponse(summary); // TODO: Implement appending daily summary to columns
  // appendSummary(summary)

  Object(_utils_chrome_storage__WEBPACK_IMPORTED_MODULE_4__["set"])({
    summary
  });
};
/** Get & append summary onload */


Object(_utils_chrome_storage__WEBPACK_IMPORTED_MODULE_4__["get"])("config", ({
  config
} = {}) => getSummary({
  config
}));
_utils_api__WEBPACK_IMPORTED_MODULE_1__["default"].runtime.onMessage.addListener((message, sender, sendResponse) => {
  Object(_utils_switch__WEBPACK_IMPORTED_MODULE_0__["default"])({
    getSummary: ({
      config = {}
    }) => getSummary({
      config,
      sendResponse
    }),
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
  const events = getMeetings(column, {
    dayStart,
    dayEnd
  });
  return {
    total: parseInt(total),
    accepted: events.length,
    day,
    date,
    events
  };
});

const isDate = d => {
  const date = new Date(d);
  return date instanceof Date && !isNaN(date);
};

const getMeetings = (el = document, {
  dayStart,
  dayEnd
}) => Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__["selectMeetings"])(el).map(node => {
  var [time, name, calendar, status, _, ...days] = node.innerText.replace(/\n/g, ", ").split(", ");
  var day = new Date(days.find(isDate));
  var [start, end] = time.split(" to ");
  return {
    id: Object(_utils_col__WEBPACK_IMPORTED_MODULE_0__["rgbToHex"])(node.style["background-color"].substring()),
    calendar,
    name,
    status,
    time: {
      start: Math.max(Object(_utils_date__WEBPACK_IMPORTED_MODULE_1__["twelveHourToDate"])(dayStart, day), Object(_utils_date__WEBPACK_IMPORTED_MODULE_1__["twelveHourToDate"])(start, day)),
      end: Math.min(Object(_utils_date__WEBPACK_IMPORTED_MODULE_1__["twelveHourToDate"])(dayEnd, day), Object(_utils_date__WEBPACK_IMPORTED_MODULE_1__["twelveHourToDate"])(end, day))
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
/*! exports provided: highlight, unhighlight, appendSummary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlight", function() { return highlight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unhighlight", function() { return unhighlight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendSummary", function() { return appendSummary; });
/* harmony import */ var _utils_switch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/switch */ "./src/app/utils/switch.js");
/* harmony import */ var _utils_col__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/col */ "./src/app/utils/col.js");
/* harmony import */ var _utils_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/selectors */ "./src/app/utils/selectors.js");



const highlight = (color, day) => {
  Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__["selectDays"])().forEach(column => {
    Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__["selectAllMeetings"])(column).forEach(node => {
      if ((day === "All days" || column.innerText.includes(day)) && Object(_utils_col__WEBPACK_IMPORTED_MODULE_1__["rgbToHex"])(node.style["background-color"]) === color) {
        node.style.opacity = 1;
      } else {
        node.style.opacity = 0.2;
      }
    });
  });
};
const unhighlight = () => Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__["selectAllMeetings"])().forEach(node => node.style.opacity = 1);
const appendSummary = summary => {
  Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_2__["selectHeaders"])().forEach((node, i) => {
    const childNode = node.querySelector(".gcaleval");
    if (childNode) node.removeChild(childNode);
    const {
      time: {
        cH,
        cM
      }
    } = summary.daily[i].summary[0];
    const div = document.createElement("div");
    const hrText = Object(_utils_switch__WEBPACK_IMPORTED_MODULE_0__["default"])({
      0: "",
      1: "1hr",
      default: `${cH}hrs`
    })(cH);
    const minsText = Object(_utils_switch__WEBPACK_IMPORTED_MODULE_0__["default"])({
      0: "",
      1: "1min",
      default: `${cM}mins`
    })(cM);
    const timeText = [hrText, minsText].filter(i => i).join(" ");
    div.innerText = `Free time ${timeText}`;
    div.classList.add("gcaleval");
    node.appendChild(div);
  });
};

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




const summary = (totalTime, res, config = {}) => {
  console.log(res);
  const filteredRes = res.filter(({
    id,
    time
  }) => id !== null && time.end - time.start > 0);
  const sum = filteredRes.reduce((acc, it) => ({ ...acc,
    [it.id]: (acc[it.id] || 0) + Math.max(0, it.time.end - it.time.start)
  }), {});
  const result = Object.entries(sum).map(([key, val]) => {
    const h = Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["calcHours"])(val);
    const m = Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["calcMins"])(val);
    const [cH, cM] = Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["closestFiveMins"])(h, m);
    return {
      name: config[key] || key,
      color: key,
      usage: Math.ceil(val / totalTime * 100),
      time: {
        h,
        cH,
        m,
        cM
      }
    };
  });

  const toSeconds = i => i / 1000;

  const fromSeconds = i => i * 1000;

  const secondsUsed = filteredRes.reduce((acc, {
    time
  }) => {
    const timeDiff = Math.max(toSeconds(time.end - time.start), 0);
    const minsArr = Array(timeDiff).fill().map((_, i) => toSeconds(time.start) + i);
    return new Set([...acc, ...minsArr]);
  }, []).size;
  const remaining = (1 - fromSeconds(secondsUsed) / totalTime) * 100;
  const h = Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["calcHours"])(totalTime * (remaining / 100));
  const m = Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["calcMins"])(totalTime * (remaining / 100));
  const [cH, cM] = Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["closestFiveMins"])(h, m);
  return [{
    name: config["#fff"] || config["#ffffff"] || "Free time",
    color: "#ffffff",
    usage: remaining,
    time: {
      h,
      m,
      cH,
      cM
    }
  }, ...result];
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
  const [totalEvents, acceptedEvents] = Object(_analysis__WEBPACK_IMPORTED_MODULE_2__["getMeetingsForDays"])({
    dayStart,
    dayEnd
  }).reduce(([t, a], {
    total,
    accepted
  }) => [t + (parseInt(total) || 0), a + (parseInt(accepted) || 0)], [0, 0]);
  const totalTime = (Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["twelveHourToDate"])(dayEnd) - Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["twelveHourToDate"])(dayStart)) * Object(_utils_selectors__WEBPACK_IMPORTED_MODULE_1__["getDays"])();
  const res = Object(_analysis__WEBPACK_IMPORTED_MODULE_2__["getMeetings"])(document, {
    dayStart,
    dayEnd
  });
  return {
    day: "All days",
    total: totalEvents,
    accepted: acceptedEvents,
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
/*! exports provided: closestFiveMins, calcHours, calcMins, twelveHourToDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closestFiveMins", function() { return closestFiveMins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcHours", function() { return calcHours; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcMins", function() { return calcMins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "twelveHourToDate", function() { return twelveHourToDate; });
const closestFiveMins = (hrs, mins) => {
  const cfm = Math.ceil(mins / 5) * 5;
  return cfm === 60 ? [hrs + 1, 0] : [hrs, cfm];
};
const calcHours = (ms = 0) => Math.floor(ms / 1000 / 60 / 60);
const calcMins = ms => Math.round((ms / 1000 / 60 / 60 - calcHours(ms)) * 60);
const twelveHourToDate = (s, day = 0) => {
  const [time, ampm] = /[ap]m$/.test(s) ? [s.slice(0, -2), s.slice(-2)] : [s];
  const [hr, min = 0] = time.split(":");
  const date = new Date(day);
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
/*! exports provided: getDays, selectDays, selectMeetings, selectAllMeetings, selectHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDays", function() { return getDays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDays", function() { return selectDays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectMeetings", function() { return selectMeetings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAllMeetings", function() { return selectAllMeetings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectHeaders", function() { return selectHeaders; });
const days = (el = document) => [...el.querySelectorAll('div[role="gridcell"')];
/**
 * Divide by two since there `days` selector returns 2n the number of
 * days
 */


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
const selectHeaders = (el = document) => [...el.querySelectorAll('div[role="columnheader"')];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29yZS9hbmFseXNpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvbW9kaWZpY2F0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvcmUvc3VtbWFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2Nocm9tZS1zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvY29sLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdXRpbHMvZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3N3aXRjaC5qcyJdLCJuYW1lcyI6WyJnZXRTdW1tYXJ5IiwiY29uZmlnIiwic2VuZFJlc3BvbnNlIiwic3VtbWFyeSIsIndlZWtseSIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkYWlseSIsInNldCIsImdldCIsImFwaSIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsIm1lc3NhZ2UiLCJzZW5kZXIiLCJzdyIsImNsaWNrRWwiLCJzZWxlY3RvciIsImVsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xpY2siLCJ1bmhpZ2hsaWdodCIsImhpZ2hsaWdodENhdGVnb3J5IiwiY29sb3IiLCJkYXkiLCJoaWdobGlnaHQiLCJ0eXBlIiwiZ2V0TWVldGluZ3NGb3JEYXlzIiwiZGF5U3RhcnQiLCJkYXlFbmQiLCJzZWxlY3REYXlzIiwibWFwIiwiY29sdW1uIiwidG90YWwiLCJkYXRlIiwiaW5uZXJUZXh0Iiwic3BsaXQiLCJldmVudHMiLCJnZXRNZWV0aW5ncyIsInBhcnNlSW50IiwiYWNjZXB0ZWQiLCJsZW5ndGgiLCJpc0RhdGUiLCJkIiwiRGF0ZSIsImlzTmFOIiwic2VsZWN0TWVldGluZ3MiLCJub2RlIiwidGltZSIsIm5hbWUiLCJjYWxlbmRhciIsInN0YXR1cyIsIl8iLCJkYXlzIiwicmVwbGFjZSIsImZpbmQiLCJzdGFydCIsImVuZCIsImlkIiwicmdiVG9IZXgiLCJzdHlsZSIsInN1YnN0cmluZyIsIk1hdGgiLCJtYXgiLCJ0d2VsdmVIb3VyVG9EYXRlIiwibWluIiwiZmlsdGVyIiwiZm9yRWFjaCIsInNlbGVjdEFsbE1lZXRpbmdzIiwiaW5jbHVkZXMiLCJvcGFjaXR5IiwiYXBwZW5kU3VtbWFyeSIsInNlbGVjdEhlYWRlcnMiLCJpIiwiY2hpbGROb2RlIiwicmVtb3ZlQ2hpbGQiLCJjSCIsImNNIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsImhyVGV4dCIsImRlZmF1bHQiLCJtaW5zVGV4dCIsInRpbWVUZXh0Iiwiam9pbiIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwidG90YWxUaW1lIiwicmVzIiwiY29uc29sZSIsImxvZyIsImZpbHRlcmVkUmVzIiwic3VtIiwicmVkdWNlIiwiYWNjIiwiaXQiLCJyZXN1bHQiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwidmFsIiwiaCIsImNhbGNIb3VycyIsIm0iLCJjYWxjTWlucyIsImNsb3Nlc3RGaXZlTWlucyIsInVzYWdlIiwiY2VpbCIsInRvU2Vjb25kcyIsImZyb21TZWNvbmRzIiwic2Vjb25kc1VzZWQiLCJ0aW1lRGlmZiIsIm1pbnNBcnIiLCJBcnJheSIsImZpbGwiLCJTZXQiLCJzaXplIiwicmVtYWluaW5nIiwicmVzdCIsInRvdGFsRXZlbnRzIiwiYWNjZXB0ZWRFdmVudHMiLCJ0IiwiYSIsImdldERheXMiLCJhcGlzIiwiRXh0ZW5zaW9uIiwiQXBpIiwiY2hyb21lIiwiZSIsIndpbmRvdyIsImJyb3dzZXIiLCJleHRlbnNpb24iLCJicm93c2VyQWN0aW9uIiwiY2xlYXIiLCJjYiIsInN0b3JhZ2UiLCJzeW5jIiwidW5kZWZpbmVkIiwibyIsInJnYlN0cmluZyIsInIiLCJnIiwiYiIsInNsaWNlIiwidG9TdHJpbmciLCJhZGp1c3RDb2wiLCJjb2wiLCJhbXQiLCJ1c2VQb3VuZCIsIm51bSIsImhycyIsIm1pbnMiLCJjZm0iLCJtcyIsImZsb29yIiwicm91bmQiLCJzIiwiYW1wbSIsInRlc3QiLCJociIsInNldE1pbGxpc2Vjb25kcyIsInNldFNlY29uZHMiLCJzZXRNaW51dGVzIiwic2V0SG91cnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2FsIiwic3RhcnRzV2l0aCIsImNhc2VzIiwiYyIsImFyZ3MiLCJmIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiRnVuY3Rpb24iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsQ0FBQztBQUFF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R0FBR0QsRUFBRSxDQUFDb0osZ0JBQUgsQ0FBb0IsZ0NBQXBCLENBQUosRUFBMkRuRyxNQUEzRCxDQUFtRU8sQ0FBRCxJQUNoRSxnREFBZ0RzRixJQUFoRCxDQUFxRHRGLENBQUMsQ0FBQ3RDLFNBQXZELENBREYsQ0FESztBQUtBLE1BQU1xQyxhQUFhLEdBQUcsQ0FBQ3ZELEVBQUUsR0FBR0MsUUFBTixLQUFtQixDQUM5QyxHQUFHRCxFQUFFLENBQUNvSixnQkFBSCxDQUFvQix5QkFBcEIsQ0FEMkMsQ0FBekMsQzs7Ozs7Ozs7Ozs7O0FDdkJQO0FBQUE7Ozs7O0FBS0E7Ozs7Ozs7QUFPQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWtCZUcsb0VBQUssSUFBSSxDQUFDQyxDQUFELEVBQUksR0FBR0MsSUFBUCxLQUFnQjtBQUN0QyxRQUFNQyxDQUFDLEdBQUcsR0FBR0MsY0FBSCxDQUFrQkMsSUFBbEIsQ0FBdUJMLEtBQXZCLEVBQThCQyxDQUE5QixJQUFtQ0QsS0FBSyxDQUFDQyxDQUFELENBQXhDLEdBQThDRCxLQUFLLENBQUN2RixPQUE5RDtBQUVBLFNBQU8wRixDQUFDLFlBQVlHLFFBQWIsR0FBd0JILENBQUMsQ0FBQyxHQUFHRCxJQUFKLENBQXpCLEdBQXFDQyxDQUE1QztBQUNELENBSkQsRSIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwL2NvbnRlbnQuanNcIik7XG4iLCJpbXBvcnQgc3cgZnJvbSBcIi4vdXRpbHMvc3dpdGNoXCJcbmltcG9ydCBhcGkgZnJvbSBcIi4vdXRpbHMvYXBpXCJcbmltcG9ydCB7IHdlZWtseSwgZGFpbHkgfSBmcm9tIFwiLi9jb3JlL3N1bW1hcnlcIlxuaW1wb3J0IHsgaGlnaGxpZ2h0LCB1bmhpZ2hsaWdodCwgYXBwZW5kU3VtbWFyeSB9IGZyb20gXCIuL2NvcmUvbW9kaWZpY2F0aW9uc1wiXG5cbmltcG9ydCB7IHNldCwgZ2V0IH0gZnJvbSBcIi4vdXRpbHMvY2hyb21lLXN0b3JhZ2VcIlxuXG5jb25zdCBnZXRTdW1tYXJ5ID0gKHsgY29uZmlnID0ge30sIHNlbmRSZXNwb25zZSB9KSA9PiB7XG4gIGNvbnN0IHN1bW1hcnkgPSB7XG4gICAgd2Vla2x5OiB3ZWVrbHkoXG4gICAgICBjb25maWcuc3RhcnRUaW1lIHx8IFwiOWFtXCIsXG4gICAgICBjb25maWcuZW5kVGltZSB8fCBcIjU6MzBwbVwiLFxuICAgICAgY29uZmlnXG4gICAgKSxcbiAgICBkYWlseTogZGFpbHkoY29uZmlnLnN0YXJ0VGltZSB8fCBcIjlhbVwiLCBjb25maWcuZW5kVGltZSB8fCBcIjU6MzBwbVwiLCBjb25maWcpLFxuICB9XG5cbiAgc2VuZFJlc3BvbnNlICYmIHNlbmRSZXNwb25zZShzdW1tYXJ5KVxuICAvLyBUT0RPOiBJbXBsZW1lbnQgYXBwZW5kaW5nIGRhaWx5IHN1bW1hcnkgdG8gY29sdW1uc1xuICAvLyBhcHBlbmRTdW1tYXJ5KHN1bW1hcnkpXG5cbiAgc2V0KHsgc3VtbWFyeSB9KVxufVxuXG4vKiogR2V0ICYgYXBwZW5kIHN1bW1hcnkgb25sb2FkICovXG5nZXQoXCJjb25maWdcIiwgKHsgY29uZmlnIH0gPSB7fSkgPT4gZ2V0U3VtbWFyeSh7IGNvbmZpZyB9KSlcblxuYXBpLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICBzdyh7XG4gICAgZ2V0U3VtbWFyeTogKHsgY29uZmlnID0ge30gfSkgPT4gZ2V0U3VtbWFyeSh7IGNvbmZpZywgc2VuZFJlc3BvbnNlIH0pLFxuICAgIGNsaWNrRWw6ICh7IHNlbGVjdG9yIH0pID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgIGlmIChlbCkgZWwuY2xpY2soKVxuICAgIH0sXG5cbiAgICB1bmhpZ2hsaWdodDogKCkgPT4gdW5oaWdobGlnaHQoKSxcbiAgICBoaWdobGlnaHRDYXRlZ29yeTogKHsgY29sb3IsIGRheSB9KSA9PiBoaWdobGlnaHQoY29sb3IsIGRheSksXG4gIH0pKG1lc3NhZ2UudHlwZSwgbWVzc2FnZSlcbn0pXG4iLCJpbXBvcnQgeyByZ2JUb0hleCB9IGZyb20gXCIuLi91dGlscy9jb2xcIlxuaW1wb3J0IHsgdHdlbHZlSG91clRvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9kYXRlXCJcblxuaW1wb3J0IHsgc2VsZWN0RGF5cywgc2VsZWN0TWVldGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvc2VsZWN0b3JzXCJcblxuZXhwb3J0IGNvbnN0IGdldE1lZXRpbmdzRm9yRGF5cyA9ICh7IGRheVN0YXJ0LCBkYXlFbmQgfSkgPT5cbiAgc2VsZWN0RGF5cygpLm1hcCgoY29sdW1uKSA9PiB7XG4gICAgY29uc3QgW3RvdGFsLCBkYXksIGRhdGVdID0gY29sdW1uLmlubmVyVGV4dC5zcGxpdChcIiwgXCIpXG4gICAgY29uc3QgZXZlbnRzID0gZ2V0TWVldGluZ3MoY29sdW1uLCB7IGRheVN0YXJ0LCBkYXlFbmQgfSlcbiAgICByZXR1cm4ge1xuICAgICAgdG90YWw6IHBhcnNlSW50KHRvdGFsKSxcbiAgICAgIGFjY2VwdGVkOiBldmVudHMubGVuZ3RoLFxuICAgICAgZGF5LFxuICAgICAgZGF0ZSxcbiAgICAgIGV2ZW50cyxcbiAgICB9XG4gIH0pXG5cbmNvbnN0IGlzRGF0ZSA9IChkKSA9PiB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkKVxuICByZXR1cm4gZGF0ZSBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKGRhdGUpXG59XG5cbmV4cG9ydCBjb25zdCBnZXRNZWV0aW5ncyA9IChlbCA9IGRvY3VtZW50LCB7IGRheVN0YXJ0LCBkYXlFbmQgfSkgPT5cbiAgc2VsZWN0TWVldGluZ3MoZWwpXG4gICAgLm1hcCgobm9kZSkgPT4ge1xuICAgICAgdmFyIFt0aW1lLCBuYW1lLCBjYWxlbmRhciwgc3RhdHVzLCBfLCAuLi5kYXlzXSA9IG5vZGUuaW5uZXJUZXh0XG4gICAgICAgIC5yZXBsYWNlKC9cXG4vZywgXCIsIFwiKVxuICAgICAgICAuc3BsaXQoXCIsIFwiKVxuXG4gICAgICB2YXIgZGF5ID0gbmV3IERhdGUoZGF5cy5maW5kKGlzRGF0ZSkpXG4gICAgICB2YXIgW3N0YXJ0LCBlbmRdID0gdGltZS5zcGxpdChcIiB0byBcIilcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHJnYlRvSGV4KG5vZGUuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLnN1YnN0cmluZygpKSxcbiAgICAgICAgY2FsZW5kYXIsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdGltZToge1xuICAgICAgICAgIHN0YXJ0OiBNYXRoLm1heChcbiAgICAgICAgICAgIHR3ZWx2ZUhvdXJUb0RhdGUoZGF5U3RhcnQsIGRheSksXG4gICAgICAgICAgICB0d2VsdmVIb3VyVG9EYXRlKHN0YXJ0LCBkYXkpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBlbmQ6IE1hdGgubWluKFxuICAgICAgICAgICAgdHdlbHZlSG91clRvRGF0ZShkYXlFbmQsIGRheSksXG4gICAgICAgICAgICB0d2VsdmVIb3VyVG9EYXRlKGVuZCwgZGF5KVxuICAgICAgICAgICksXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfSlcbiAgICAuZmlsdGVyKCh7IHN0YXR1cyB9KSA9PiBzdGF0dXMgIT09IFwiRGVjbGluZWRcIilcbiIsImltcG9ydCBzdyBmcm9tIFwiLi4vdXRpbHMvc3dpdGNoXCJcbmltcG9ydCB7IHJnYlRvSGV4IH0gZnJvbSBcIi4uL3V0aWxzL2NvbFwiXG5pbXBvcnQge1xuICBzZWxlY3REYXlzLFxuICBzZWxlY3RBbGxNZWV0aW5ncyxcbiAgc2VsZWN0SGVhZGVycyxcbn0gZnJvbSBcIi4uL3V0aWxzL3NlbGVjdG9yc1wiXG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHQgPSAoY29sb3IsIGRheSkgPT4ge1xuICBzZWxlY3REYXlzKCkuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgc2VsZWN0QWxsTWVldGluZ3MoY29sdW1uKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIChkYXkgPT09IFwiQWxsIGRheXNcIiB8fCBjb2x1bW4uaW5uZXJUZXh0LmluY2x1ZGVzKGRheSkpICYmXG4gICAgICAgIHJnYlRvSGV4KG5vZGUuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdKSA9PT0gY29sb3JcbiAgICAgICkge1xuICAgICAgICBub2RlLnN0eWxlLm9wYWNpdHkgPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnN0eWxlLm9wYWNpdHkgPSAwLjJcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgdW5oaWdobGlnaHQgPSAoKSA9PlxuICBzZWxlY3RBbGxNZWV0aW5ncygpLmZvckVhY2goKG5vZGUpID0+IChub2RlLnN0eWxlLm9wYWNpdHkgPSAxKSlcblxuZXhwb3J0IGNvbnN0IGFwcGVuZFN1bW1hcnkgPSAoc3VtbWFyeSkgPT4ge1xuICBzZWxlY3RIZWFkZXJzKCkuZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xuICAgIGNvbnN0IGNoaWxkTm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcihcIi5nY2FsZXZhbFwiKVxuICAgIGlmIChjaGlsZE5vZGUpIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGROb2RlKVxuXG4gICAgY29uc3Qge1xuICAgICAgdGltZTogeyBjSCwgY00gfSxcbiAgICB9ID0gc3VtbWFyeS5kYWlseVtpXS5zdW1tYXJ5WzBdXG5cbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cbiAgICBjb25zdCBoclRleHQgPSBzdyh7XG4gICAgICAwOiBcIlwiLFxuICAgICAgMTogXCIxaHJcIixcbiAgICAgIGRlZmF1bHQ6IGAke2NIfWhyc2AsXG4gICAgfSkoY0gpXG5cbiAgICBjb25zdCBtaW5zVGV4dCA9IHN3KHtcbiAgICAgIDA6IFwiXCIsXG4gICAgICAxOiBcIjFtaW5cIixcbiAgICAgIGRlZmF1bHQ6IGAke2NNfW1pbnNgLFxuICAgIH0pKGNNKVxuXG4gICAgY29uc3QgdGltZVRleHQgPSBbaHJUZXh0LCBtaW5zVGV4dF0uZmlsdGVyKChpKSA9PiBpKS5qb2luKFwiIFwiKVxuXG4gICAgZGl2LmlubmVyVGV4dCA9IGBGcmVlIHRpbWUgJHt0aW1lVGV4dH1gXG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJnY2FsZXZhbFwiKVxuXG4gICAgbm9kZS5hcHBlbmRDaGlsZChkaXYpXG4gIH0pXG59XG4iLCJpbXBvcnQge1xuICB0d2VsdmVIb3VyVG9EYXRlLFxuICBjYWxjSG91cnMsXG4gIGNhbGNNaW5zLFxuICBjbG9zZXN0Rml2ZU1pbnMsXG59IGZyb20gXCIuLi91dGlscy9kYXRlXCJcbmltcG9ydCB7IGdldERheXMgfSBmcm9tIFwiLi4vdXRpbHMvc2VsZWN0b3JzXCJcbmltcG9ydCB7IGdldE1lZXRpbmdzLCBnZXRNZWV0aW5nc0ZvckRheXMgfSBmcm9tIFwiLi9hbmFseXNpc1wiXG5cbmNvbnN0IHN1bW1hcnkgPSAodG90YWxUaW1lLCByZXMsIGNvbmZpZyA9IHt9KSA9PiB7XG4gIGNvbnNvbGUubG9nKHJlcylcbiAgY29uc3QgZmlsdGVyZWRSZXMgPSByZXMuZmlsdGVyKFxuICAgICh7IGlkLCB0aW1lIH0pID0+IGlkICE9PSBudWxsICYmIHRpbWUuZW5kIC0gdGltZS5zdGFydCA+IDBcbiAgKVxuXG4gIGNvbnN0IHN1bSA9IGZpbHRlcmVkUmVzLnJlZHVjZShcbiAgICAoYWNjLCBpdCkgPT4gKHtcbiAgICAgIC4uLmFjYyxcbiAgICAgIFtpdC5pZF06IChhY2NbaXQuaWRdIHx8IDApICsgTWF0aC5tYXgoMCwgaXQudGltZS5lbmQgLSBpdC50aW1lLnN0YXJ0KSxcbiAgICB9KSxcbiAgICB7fVxuICApXG5cbiAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmVudHJpZXMoc3VtKS5tYXAoKFtrZXksIHZhbF0pID0+IHtcbiAgICBjb25zdCBoID0gY2FsY0hvdXJzKHZhbClcbiAgICBjb25zdCBtID0gY2FsY01pbnModmFsKVxuICAgIGNvbnN0IFtjSCwgY01dID0gY2xvc2VzdEZpdmVNaW5zKGgsIG0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogY29uZmlnW2tleV0gfHwga2V5LFxuICAgICAgY29sb3I6IGtleSxcbiAgICAgIHVzYWdlOiBNYXRoLmNlaWwoKHZhbCAvIHRvdGFsVGltZSkgKiAxMDApLFxuICAgICAgdGltZTogeyBoLCBjSCwgbSwgY00gfSxcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgdG9TZWNvbmRzID0gKGkpID0+IGkgLyAxMDAwXG4gIGNvbnN0IGZyb21TZWNvbmRzID0gKGkpID0+IGkgKiAxMDAwXG5cbiAgY29uc3Qgc2Vjb25kc1VzZWQgPSBmaWx0ZXJlZFJlcy5yZWR1Y2UoKGFjYywgeyB0aW1lIH0pID0+IHtcbiAgICBjb25zdCB0aW1lRGlmZiA9IE1hdGgubWF4KHRvU2Vjb25kcyh0aW1lLmVuZCAtIHRpbWUuc3RhcnQpLCAwKVxuICAgIGNvbnN0IG1pbnNBcnIgPSBBcnJheSh0aW1lRGlmZilcbiAgICAgIC5maWxsKClcbiAgICAgIC5tYXAoKF8sIGkpID0+IHRvU2Vjb25kcyh0aW1lLnN0YXJ0KSArIGkpXG5cbiAgICByZXR1cm4gbmV3IFNldChbLi4uYWNjLCAuLi5taW5zQXJyXSlcbiAgfSwgW10pLnNpemVcblxuICBjb25zdCByZW1haW5pbmcgPSAoMSAtIGZyb21TZWNvbmRzKHNlY29uZHNVc2VkKSAvIHRvdGFsVGltZSkgKiAxMDBcblxuICBjb25zdCBoID0gY2FsY0hvdXJzKHRvdGFsVGltZSAqIChyZW1haW5pbmcgLyAxMDApKVxuICBjb25zdCBtID0gY2FsY01pbnModG90YWxUaW1lICogKHJlbWFpbmluZyAvIDEwMCkpXG4gIGNvbnN0IFtjSCwgY01dID0gY2xvc2VzdEZpdmVNaW5zKGgsIG0pXG5cbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWdbXCIjZmZmXCJdIHx8IGNvbmZpZ1tcIiNmZmZmZmZcIl0gfHwgXCJGcmVlIHRpbWVcIixcbiAgICAgIGNvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgIHVzYWdlOiByZW1haW5pbmcsXG4gICAgICB0aW1lOiB7XG4gICAgICAgIGgsXG4gICAgICAgIG0sXG4gICAgICAgIGNILFxuICAgICAgICBjTSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICAuLi5yZXN1bHQsXG4gIF1cbn1cblxuLyoqXG4gKiBJL08gc3VtbWFyaWVzXG4gKi9cbmV4cG9ydCBjb25zdCBkYWlseSA9IChkYXlTdGFydCwgZGF5RW5kLCBjb25maWcpID0+IHtcbiAgY29uc3QgdG90YWxUaW1lID0gdHdlbHZlSG91clRvRGF0ZShkYXlFbmQpIC0gdHdlbHZlSG91clRvRGF0ZShkYXlTdGFydClcblxuICByZXR1cm4gZ2V0TWVldGluZ3NGb3JEYXlzKHsgZGF5U3RhcnQsIGRheUVuZCB9KS5tYXAoXG4gICAgKHsgZXZlbnRzLCAuLi5yZXN0IH0pID0+ICh7XG4gICAgICAuLi5yZXN0LFxuICAgICAgc3VtbWFyeTogc3VtbWFyeSh0b3RhbFRpbWUsIGV2ZW50cywgY29uZmlnKSxcbiAgICB9KVxuICApXG59XG5cbmV4cG9ydCBjb25zdCB3ZWVrbHkgPSAoZGF5U3RhcnQsIGRheUVuZCwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IFt0b3RhbEV2ZW50cywgYWNjZXB0ZWRFdmVudHNdID0gZ2V0TWVldGluZ3NGb3JEYXlzKHtcbiAgICBkYXlTdGFydCxcbiAgICBkYXlFbmQsXG4gIH0pLnJlZHVjZShcbiAgICAoW3QsIGFdLCB7IHRvdGFsLCBhY2NlcHRlZCB9KSA9PiBbXG4gICAgICB0ICsgKHBhcnNlSW50KHRvdGFsKSB8fCAwKSxcbiAgICAgIGEgKyAocGFyc2VJbnQoYWNjZXB0ZWQpIHx8IDApLFxuICAgIF0sXG4gICAgWzAsIDBdXG4gIClcblxuICBjb25zdCB0b3RhbFRpbWUgPVxuICAgICh0d2VsdmVIb3VyVG9EYXRlKGRheUVuZCkgLSB0d2VsdmVIb3VyVG9EYXRlKGRheVN0YXJ0KSkgKiBnZXREYXlzKClcblxuICBjb25zdCByZXMgPSBnZXRNZWV0aW5ncyhkb2N1bWVudCwgeyBkYXlTdGFydCwgZGF5RW5kIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBkYXk6IFwiQWxsIGRheXNcIixcbiAgICB0b3RhbDogdG90YWxFdmVudHMsXG4gICAgYWNjZXB0ZWQ6IGFjY2VwdGVkRXZlbnRzLFxuICAgIHN1bW1hcnk6IHN1bW1hcnkodG90YWxUaW1lLCByZXMsIGNvbmZpZyksXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBjaHJvbWUgYnJvd3NlciAqL1xuXG5jb25zdCBhcGlzID0gW1wicnVudGltZVwiLCBcInN0b3JhZ2VcIiwgXCJ0YWJzXCJdXG5cbmZ1bmN0aW9uIEV4dGVuc2lvbigpIHtcbiAgY29uc3QgQXBpID0ge31cblxuICBhcGlzLmZvckVhY2goKGFwaSkgPT4ge1xuICAgIEFwaVthcGldID0gbnVsbFxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChjaHJvbWVbYXBpXSkge1xuICAgICAgICBBcGlbYXBpXSA9IGNocm9tZVthcGldXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIHRyeSB7XG4gICAgICBpZiAod2luZG93W2FwaV0pIHtcbiAgICAgICAgQXBpW2FwaV0gPSB3aW5kb3dbYXBpXVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKGJyb3dzZXJbYXBpXSkge1xuICAgICAgICBBcGlbYXBpXSA9IGJyb3dzZXJbYXBpXVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIEFwaS5hcGkgPSBicm93c2VyLmV4dGVuc2lvblthcGldXG4gICAgfSBjYXRjaCAoZSkge31cbiAgfSlcblxuICB0cnkge1xuICAgIGlmIChicm93c2VyICYmIGJyb3dzZXIucnVudGltZSkge1xuICAgICAgdGhpcy5ydW50aW1lID0gYnJvd3Nlci5ydW50aW1lXG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuXG4gIHRyeSB7XG4gICAgaWYgKGJyb3dzZXIgJiYgYnJvd3Nlci5icm93c2VyQWN0aW9uKSB7XG4gICAgICB0aGlzLmJyb3dzZXJBY3Rpb24gPSBicm93c2VyLmJyb3dzZXJBY3Rpb25cbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgcmV0dXJuIEFwaVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeHRlbnNpb24oKVxuIiwiaW1wb3J0IGFwaSBmcm9tIFwiLi9hcGlcIlxuXG5leHBvcnQgY29uc3QgY2xlYXIgPSAoa2V5LCBjYiA9ICgpID0+IHt9KSA9PlxuICBhcGkuc3RvcmFnZS5zeW5jLnNldCh7IFtrZXldOiB1bmRlZmluZWQgfSwgY2IpXG5leHBvcnQgY29uc3Qgc2V0ID0gKG8sIGNiID0gKCkgPT4ge30pID0+IGFwaS5zdG9yYWdlLnN5bmMuc2V0KG8sIGNiKVxuZXhwb3J0IGNvbnN0IGdldCA9IChrZXksIGNiID0gKCkgPT4ge30pID0+IGFwaS5zdG9yYWdlLnN5bmMuZ2V0KFtrZXldLCBjYilcbiIsImV4cG9ydCBjb25zdCByZ2JUb0hleCA9IChyZ2JTdHJpbmcpID0+IHtcbiAgaWYgKCFyZ2JTdHJpbmcpIHJldHVybiBudWxsXG5cbiAgdmFyIFtyLCBnLCBiXSA9IHJnYlN0cmluZ1xuICAgIC5zbGljZSg0LCAtMSlcbiAgICAuc3BsaXQoLywgPy8pXG4gICAgLm1hcCgoaSkgPT4gK2kpXG4gIHJldHVybiBcIiNcIiArICgoMSA8PCAyNCkgKyAociA8PCAxNikgKyAoZyA8PCA4KSArIGIpLnRvU3RyaW5nKDE2KS5zbGljZSgxKVxufVxuXG5leHBvcnQgY29uc3QgYWRqdXN0Q29sID0gKGNvbCwgYW10KSA9PiB7XG4gIHZhciB1c2VQb3VuZCA9IGZhbHNlXG5cbiAgaWYgKGNvbFswXSA9PSBcIiNcIikge1xuICAgIGNvbCA9IGNvbC5zbGljZSgxKVxuICAgIHVzZVBvdW5kID0gdHJ1ZVxuICB9XG5cbiAgdmFyIG51bSA9IHBhcnNlSW50KGNvbCwgMTYpIHx8IDBcblxuICB2YXIgciA9IChudW0gPj4gMTYpICsgYW10XG5cbiAgaWYgKHIgPiAyNTUpIHIgPSAyNTVcbiAgZWxzZSBpZiAociA8IDApIHIgPSAwXG5cbiAgdmFyIGIgPSAoKG51bSA+PiA4KSAmIDB4MDBmZikgKyBhbXRcblxuICBpZiAoYiA+IDI1NSkgYiA9IDI1NVxuICBlbHNlIGlmIChiIDwgMCkgYiA9IDBcblxuICB2YXIgZyA9IChudW0gJiAweDAwMDBmZikgKyBhbXRcblxuICBpZiAoZyA+IDI1NSkgZyA9IDI1NVxuICBlbHNlIGlmIChnIDwgMCkgZyA9IDBcblxuICByZXR1cm4gKHVzZVBvdW5kID8gXCIjXCIgOiBcIlwiKSArIChnIHwgKGIgPDwgOCkgfCAociA8PCAxNikpLnRvU3RyaW5nKDE2KVxufVxuIiwiZXhwb3J0IGNvbnN0IGNsb3Nlc3RGaXZlTWlucyA9IChocnMsIG1pbnMpID0+IHtcbiAgY29uc3QgY2ZtID0gTWF0aC5jZWlsKG1pbnMgLyA1KSAqIDVcbiAgcmV0dXJuIGNmbSA9PT0gNjAgPyBbaHJzICsgMSwgMF0gOiBbaHJzLCBjZm1dXG59XG5cbmV4cG9ydCBjb25zdCBjYWxjSG91cnMgPSAobXMgPSAwKSA9PiBNYXRoLmZsb29yKG1zIC8gMTAwMCAvIDYwIC8gNjApXG5leHBvcnQgY29uc3QgY2FsY01pbnMgPSAobXMpID0+XG4gIE1hdGgucm91bmQoKG1zIC8gMTAwMCAvIDYwIC8gNjAgLSBjYWxjSG91cnMobXMpKSAqIDYwKVxuXG5leHBvcnQgY29uc3QgdHdlbHZlSG91clRvRGF0ZSA9IChzLCBkYXkgPSAwKSA9PiB7XG4gIGNvbnN0IFt0aW1lLCBhbXBtXSA9IC9bYXBdbSQvLnRlc3QocykgPyBbcy5zbGljZSgwLCAtMiksIHMuc2xpY2UoLTIpXSA6IFtzXVxuICBjb25zdCBbaHIsIG1pbiA9IDBdID0gdGltZS5zcGxpdChcIjpcIilcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRheSlcblxuICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKVxuICBkYXRlLnNldFNlY29uZHMoMClcbiAgZGF0ZS5zZXRNaW51dGVzKCttaW4pXG5cbiAgIWFtcG1cbiAgICA/IGRhdGUuc2V0SG91cnMoK2hyKVxuICAgIDogK2hyID09PSAxMlxuICAgID8gZGF0ZS5zZXRIb3VycyhhbXBtID09PSBcImFtXCIgPyAraHIgKyAxMiA6ICtocilcbiAgICA6IGRhdGUuc2V0SG91cnMoYW1wbSA9PT0gXCJhbVwiID8gK2hyIDogK2hyICsgMTIpXG5cbiAgcmV0dXJuIGRhdGVcbn1cbiIsImNvbnN0IGRheXMgPSAoZWwgPSBkb2N1bWVudCkgPT4gWy4uLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwiZ3JpZGNlbGxcIicpXVxuXG4vKipcbiAqIERpdmlkZSBieSB0d28gc2luY2UgdGhlcmUgYGRheXNgIHNlbGVjdG9yIHJldHVybnMgMm4gdGhlIG51bWJlciBvZlxuICogZGF5c1xuICovXG5leHBvcnQgY29uc3QgZ2V0RGF5cyA9IChlbCA9IGRvY3VtZW50KSA9PiBkYXlzKGVsKS5sZW5ndGggLyAyXG5leHBvcnQgY29uc3Qgc2VsZWN0RGF5cyA9IChlbCA9IGRvY3VtZW50KSA9PiB7XG4gIGNvbnN0IGQgPSBkYXlzKGVsKVxuICByZXR1cm4gZC5zbGljZShkLmxlbmd0aCAvIDIpXG59XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RNZWV0aW5ncyA9IChlbCA9IGRvY3VtZW50KSA9PlxuICBzZWxlY3RBbGxNZWV0aW5ncyhlbCkuZmlsdGVyKChpKSA9PiB7XG4gICAgY29uc3QgW3RpbWUsICwgY2FsXSA9IGkuaW5uZXJUZXh0LnNwbGl0KFwiLCBcIilcbiAgICByZXR1cm4gIWNhbC5zdGFydHNXaXRoKFwiQ2FsZW5kYXI6IFwiKVxuICB9KVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0QWxsTWVldGluZ3MgPSAoZWwgPSBkb2N1bWVudCkgPT5cbiAgWy4uLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdltkYXRhLW9wZW5zLWRldGFpbHM9XCJ0cnVlXCJdJyldLmZpbHRlcigoaSkgPT5cbiAgICAvXihbMC05XXsxLDJ9OlswLTldezJ9fFswLTldezEsMn0pKFthcF1tfCkgdG8gLy50ZXN0KGkuaW5uZXJUZXh0KVxuICApXG5cbmV4cG9ydCBjb25zdCBzZWxlY3RIZWFkZXJzID0gKGVsID0gZG9jdW1lbnQpID0+IFtcbiAgLi4uZWwucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJjb2x1bW5oZWFkZXJcIicpLFxuXVxuIiwiLyoqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259IENhc2VGdW5jdGlvblxuICogQHBhcmFtIHsuLi4qfSBbYXJnc10gLSBMaXN0IG9mIGFyZ3MgcHJvdmlkZWQgdG8gYW5vbnltb3VzIGZ1bmN0aW9uXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259IFN3aXRjaEZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gW2M9J2RlZmF1bHQnXSAtIGNhc2Ugc3RyaW5nIHRvIG1hdGNoXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSAtIGFyZ3MgdG8gcGFzcyB0byBtYXRjaGVkIFN3aXRjaEZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7Kn0gLSBSZXN1bHQgb2YgbWF0Y2hpbmcgY2FzZSBpbiBTd2l0Y2hNYXAgZWl0aGVyIENhc2VGdW5jdGlvbiBjYWxsZWQgd2l0aCBhcmdzLCBvciB2YWx1ZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdDxzdHJpbmcsIENhc2VGdW5jdGlvbnwqPn0gU3dpdGNoTWFwXG4gKi9cblxuLyoqXG4gKiBzdy5qc1xuICpcbiAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYSBTd2l0Y2hNYXAgYW5kIHJldHVybnMgYSBTd2l0Y2hGdW5jdGlvbiB3aGljaFxuICogY2FuIGJlIGNhbGxlZCB3aXRoIGEgY2FzZSBwcm9wZXJ0eSBhbmQgZXh0cmEgYXJncyB0byBtYXRjaCB3aXRoXG4gKiBmdW5jdGlvblxuICpcbiAqIEBleGFtcGxlXG4gKiAgc3coe1xuICogICAgZm9vOiBpID0+IGkgKyAyLCAgIC8vIDVcbiAqICAgIGJhcjogJ2JheicsICAgICAgICAvLyBiYXJcbiAqICAgIGRlZmF1bHQ6IG51bGwsICAgICAvLyBudWxsXG4gKiAgfSkoJ2ZvbycsIDMpXG4gKlxuICogQHBhcmFtIHtTd2l0Y2hNYXB9IGNhc2VzIC0gQSBtYXAgb2Ygc3RyaW5nIGNhc2VzIHRvIHZhbHVlIG9yIENhc2VGdW5jdGlvbiBjYWxsXG4gKiBAcmV0dXJucyB7U3dpdGNoRnVuY3Rpb259XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2FzZXMgPT4gKGMsIC4uLmFyZ3MpID0+IHtcbiAgY29uc3QgZiA9IHt9Lmhhc093blByb3BlcnR5LmNhbGwoY2FzZXMsIGMpID8gY2FzZXNbY10gOiBjYXNlcy5kZWZhdWx0XG5cbiAgcmV0dXJuIGYgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IGYoLi4uYXJncykgOiBmXG59XG4iXSwic291cmNlUm9vdCI6IiJ9
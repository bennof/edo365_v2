(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsdox"] = factory();
	else
		root["jsdox"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/file.js":
/*!**************************!*\
  !*** ./src/core/file.js ***!
  \**************************/
/*! exports provided: open, save */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "open", function() { return open; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "save", function() { return save; });
/* Copyright (c) 2018-2020 Benjamin 'Benno' Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module jsdox/file
*/

/**
* read a file
* @param {Function} Fun Callback function (State,Data)
* @param {File} Filen a file object
* @param {String} Type optional datatype
*/
function open(fun, filen, type) {
  var reader = new FileReader();
  reader.cb = fun;

  reader.onload = function (event) {
    this.cb(200, event.target.result);
  };

  reader.onerror = function (event) {
    this.cb(404, event.target.error.code);
  };

  if (type == "DataURL") reader.readAsDataURL(filen);else reader.readAsText(filen);
}
;
/**
* save file as download
* @param Filen Filename
* @param Mime  Mimetype
* @param Data  data string or blob
**/

function save(Filen, Mime, Data) {
  // Mime text/csv;charset=utf-8
  var FileLink = document.createElement('a');
  if (Mime.startsWith('text')) FileLink.setAttribute('href', 'data:' + Mime + ',' + encodeURIComponent(Data));else FileLink.setAttribute('href', 'data:' + Mime + ',' + btoa(Data));
  FileLink.setAttribute('download', Filen);

  if (document.createEvent) {
    var Event = document.createEvent('MouseEvents');
    Event.initEvent('click', true, true);
    FileLink.dispatchEvent(Event);
  } else {
    FileLink.click();
  }
}

/***/ }),

/***/ "./src/core/tools.js":
/*!***************************!*\
  !*** ./src/core/tools.js ***!
  \***************************/
/*! exports provided: map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* Copyright (c) 2018-2020 Benjamin 'Benno' Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/
function map(fun, map) {
  var r = {},
      i,
      keys = Object.keys(map);

  for (i = 0; i < keys.length; i++) {
    r[keys[i]] = fun(keys[i], map[keys[i]]);
  }

  return r;
}

/***/ }),

/***/ "./src/core/url.js":
/*!*************************!*\
  !*** ./src/core/url.js ***!
  \*************************/
/*! exports provided: get_header, get_hash, get_query, encode_base64, decode_base64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_header", function() { return get_header; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_hash", function() { return get_hash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_query", function() { return get_query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode_base64", function() { return encode_base64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode_base64", function() { return decode_base64; });
/* Copyright (c) 2018-2020 Benjamin 'Benno' Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module jsdox/url
*/

/**
 * Scan and return header fields of XHTTP requests
 * @param {*} Res a Xhttp response object
 * @returns a map of header fields
 */
function get_header(res) {
  var i,
      elem,
      key,
      value,
      r = {},
      hl = Xhttp.getAllResponseHeaders().trim().split(/[\r\n]+/);

  for (i = 0; i < hl.length; i++) {
    elem = hl[i].split(': ');
    key = elem.shift();
    value = elem.join(': ');
    r[key] = value;
  }

  return r;
}
/**
 * easier access to url encoded hash fields
 * @param {*} URL a url like window.location
 * @returns a map of hash values in url 
 */

function get_hash(url) {
  var i,
      r1,
      res = {},
      hash = url.hash.substr(1).split("&");

  for (i = 0; i < hash.length; i++) {
    r1 = hash[i].split("=");
    res[r1[0]] = decodeURIComponent(r1[1]) || r1[0];
  }

  return res;
}
/**
 * easier access to url encoded query fields
 * @param {*} URL a url like window.location
 * @returns a map of query values in url 
 */

function get_query(url) {
  var i,
      r1,
      res = {},
      query = url.search.substr(1).split("&");

  for (i = 0; i < query.length; i++) {
    r1 = query[i].split("=");
    res[r1[0]] = r1[1] || r1[0];
  }

  return res;
}
function encode_base64(input) {
  var json = JSON.stringify(input);
  var base64 = btoa(json).replace(/=+$/gm, '');
  return base64.replace(/\+/g, '-').replace(/\//g, '_');
}
function decode_base64(input) {
  var base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  var json = atob(base64);
  return JSON.parse(json);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: url, file, o365, Table, TableView, version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony import */ var _core_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/url */ "./src/core/url.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "url", function() { return _core_url__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _core_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/file */ "./src/core/file.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "file", function() { return _core_file__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _o365_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./o365/index */ "./src/o365/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "o365", function() { return _o365_index__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _table_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./table/table */ "./src/table/table.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return _table_table__WEBPACK_IMPORTED_MODULE_3__["Table"]; });

/* harmony import */ var _table_table_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./table/table_view */ "./src/table/table_view.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableView", function() { return _table_table_view__WEBPACK_IMPORTED_MODULE_4__["TableView"]; });

/* Copyright (c) 2018-2020 Benjamin 'Benno' Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/






function version() {
  return "JSDoX (wagtail): v0.0.1";
}

/***/ }),

/***/ "./src/o365/conn.js":
/*!**************************!*\
  !*** ./src/o365/conn.js ***!
  \**************************/
/*! exports provided: Connection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return Connection; });
/* harmony import */ var _core_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/url */ "./src/core/url.js");
/* harmony import */ var _core_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/tools */ "./src/core/tools.js");
/* harmony import */ var _core_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/file */ "./src/core/file.js");
/* Copyright (c) 2018-2020 Benjamin 'Benno' Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/


 // used constants

const CONN_CFG = "_conn_cfg";
const CONN_STATE = "_conn_state";
const REFRESH_REQ = "_refresh_request";
const LOCATION = "_location";
/**
 * Office 365 Connection Class
 */

class Connection {
  /**
   * constructor for a connection
   * @param {*} name name of the connection 
   * @param {*} cfg a config object (should be undefined)
   */
  constructor(name, setup, cfg) {
    // set name of the connection
    this.name = name;
    var hash = Object(_core_url__WEBPACK_IMPORTED_MODULE_0__["get_hash"])(window.location); //store all values passed as hash (not seen by server)
    // try to get a config

    if (cfg) {
      // config is passed directly (unsecure)
      this.config = cfg;
      this.save_config(); // safe data for session
    } else if (hash[this.name + CONN_CFG]) {
      // decode config from hash
      this.config = Object(_core_url__WEBPACK_IMPORTED_MODULE_0__["decode_base64"])(hash[this.name + CONN_CFG]);
      this.save_config(); // safe data for session
    } else if ((cfg = sessionStorage.getItem(this.name + CONN_CFG)) != null) {
      // get data from session
      this.config = JSON.parse(cfg);
    } else if ((cfg = localStorage.getItem(this.name + CONN_CFG)) != null) {
      // get data from store
      this.config = JSON.parse(cfg);
      this.save_config(); // safe data for session
    } else {
      // use empty setting
      this.config = {
        tenant: "",
        login: {
          link: "",
          params: {
            client_id: "",
            response_type: "",
            redirect_uri: "",
            scope: "",
            nonce: "",
            state: ""
          }
        },
        logout: {
          link: "",
          params: {}
        }
      };
      this.save_config(); // safe data for session
    } // checking for login information


    var state = localStorage.getItem(this.name + CONN_STATE) || []; // state info from url hash overrides saved state

    this.access_token = hash.access_token || state.access_token || null;
    this.refresh_token = hash.refresh_token || state.refresh_token || null;
    this.id = state.id || null;

    if (hash.id_token) {
      this.id = Object(_core_url__WEBPACK_IMPORTED_MODULE_0__["decode_base64"])(hash.id_token.split('.')[1]); // JWT data element
    }

    if (hash.state) {
      // a refresh is send
      state = Object(_core_url__WEBPACK_IMPORTED_MODULE_0__["decode_base64"])(hash.state);

      if (state.refresh && state.refresh == true) {
        var url = new URL(window.location);
        url.hash = '';

        if (hash.error) {
          window.parent.postMessage({
            state: hash.error,
            desc: hash.error_description
          }, url);
        } else {
          window.parent.postMessage({
            state: 'ok',
            access_token: params.access_token
          }, url);
        }

        return;
      }
    } else {
      state = {};
    } // error 


    if (hash.error) {
      alert(hash.error + '\n' + hash.error_description);
      return;
    } // setup message handler for refresh


    window.addEventListener('message', function (event) {
      if (event.data.state) {
        if (event.data.state === 'ok') {
          this.access_token = event.data.access_token;
          this.save_state();
        } else {
          alert(event.data.state + '\n' + event.data.error_description);
        }

        document.body.removeChild(document.getElementById(this.name + "_refresh"));
      }
    }.bind(this), false);
    this.save_state(); // save state

    this.requests = []; // store request, for serialisation

    this.req = false; // check for state arguments

    if (state.location && window.location.pathname != state.location) {
      window.location.pathname = state.location;
    }

    if (setup) {
      if (setup.logged_in && this.access_token) {
        setup.logged_in(this);
      }
    }
  }
  /**
   * open a connection / login
   */


  open() {
    if (!this.config.login.link) {
      alert("Incomplet connection config - please load or create a configuration");
      return;
    } // build link


    var link = this.config.login.link;

    for (var param in this.config.login.params) {
      link += encodeURIComponent(param) + "=" + encodeURIComponent(this.config.login.params[param]) + "&";
    }

    link += encodeURIComponent("state") + "=" + Object(_core_url__WEBPACK_IMPORTED_MODULE_0__["encode_base64"])({
      location: window.location.pathname
    }) + "&";
    window.location.href = link;
  }
  /**
   * close connection / logout
   */


  close() {
    sessionStorage.removeItem(this.name + CONN_STATE); // delete session storage
    // unset all values

    this.access_token = null;
    this.refresh_token = null;
    this.id = null; // build link

    var link = this.config.logout.link;

    for (var param in this.config.logout.params) {
      link += encodeURIComponent(param) + "=" + encodeURIComponent(this.config.logout.params[param]) + "&";
    }

    window.location.href = link;
  }
  /**
   * refresh connection
   */


  refresh() {
    // build link
    var link = this.config.login.link;

    for (var param in this.config.login.param) {
      link += encodeURIComponent(param) + "=" + encodeURIComponent(this.config.login.param[param]) + "&";
    }

    link += encodeURIComponent('prompt') + "=" //avoid login prompt
    + encodeURIComponent('none') + "&";
    if (this.id.email) link += encodeURIComponent('login_hint') + "=" + encodeURIComponent(this.id.email) + "&";
    link += encodeURIComponent(state) + "=" + Object(_core_url__WEBPACK_IMPORTED_MODULE_0__["encode_base64"])({
      refresh: true,
      location: window.location.pathname
    }) + "&";
    if (document.getElementById(this.name + "_refesh")) return; // avoid multiple refreshs
    // create hidden iframe

    var iframe = document.createElement('iframe');
    iframe.id = this.name + "_refesh";
    iframe.style.display = "none";
    iframe.src = link;
    document.body.appendChild(iframe);
  }
  /**
   * perform a request async
   * @param {*} fun 
   * @param {*} method 
   * @param {*} url 
   * @param {*} body
   * @param {*} param 
   */


  request(fun, method, url, body, param) {
    this.requests.push({
      fun: fun,
      method: method,
      url: url,
      body: body,
      param: param
    });
    this.process_requests();
  }

  json_request(fun, method, url, body, param) {
    this.requests.push({
      fun: json_req_handle.bind({
        conn: this,
        fun: fun
      }),
      method: method,
      url: url,
      body: body,
      param: param
    });
    this.process_requests();
  }
  /**
   * perform requests
   */


  process_requests() {
    //check for open requests
    if (this.req) return;
    var r = this.requests.shift();

    if (r) {
      this.req = true;
      var req = new XMLHttpRequest();
      req.open(r.method, r.url, true);
      req.setRequestHeader("Authorization", "Bearer " + this.access_token);
      Object(_core_tools__WEBPACK_IMPORTED_MODULE_1__["map"])(req.setRequestHeader.bind(req), r.param);
      req.conn = this;
      req.fun = r.fun;
      req.body = r.body;

      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          //missing handle refresh error
          var header = Object(_core_url__WEBPACK_IMPORTED_MODULE_0__["get_header"])(req);
          req.fun(req.status, req.response, header);
          req.conn.req = false;
          req.conn.process_requests();
        }
      };

      if (r.body) req.send(r.body);else req.send();
      return req;
    }
  }
  /**
   * save config 
   * @param {*} target to save to (default is sessionStorage)
   */


  save_config(target = sessionStorage) {
    target.setItem(this.name + CONN_CFG, JSON.stringify(this.config));
  }
  /**
   * save state
   * @param {*} target to save to (default is sessionStorage)
   */


  save_state(target = sessionStorage) {
    target.setItem(this.name + CONN_STATE, JSON.stringify({
      access_token: this.access_token,
      refresh_token: this.refresh_token,
      id: this.id
    }));
  }
  /**
   * convert config to a url hash element
   */


  config_to_url() {
    return this.name + CONN_CFG + "=" + base64UrlEncode(this.config);
  }

  load_json_file(title) {
    if (document.getElementById(this.name + '_open_dialog')) return;
    var box = document.createElement('div');
    box.id = this.name + '_open_dialog';
    box.classList.add('prompt');
    var header = document.createElement('h1');
    header.innerHTML = title;
    box.appendChild(header);
    var input = document.createElement('input');
    input.type = 'file';
    box.appendChild(input);
    var conn = this;

    input.onchange = function () {
      Object(_core_file__WEBPACK_IMPORTED_MODULE_2__["open"])(function (state, cfg) {
        if (state == 200) {
          this.config = JSON.parse(cfg);
          this.save_config();
        } else {
          alert('ERRROR: ' + state + '\n' + cfg);
        }
      }.bind(conn), this.files[0]);
      document.body.removeChild(box);
    };

    document.body.appendChild(box);
  }

}

function json_req_handle(state, body, header) {
  if (state === 200) {
    var json = JSON.parse(body);
    this.data = this.data ? this.data.concat(json.value) : json.value;

    if (json["@odata.nextLink"]) {
      // if there is more data
      this.conn.request(json_req_handle.bind(this), 'GET', json["@odata.nextLink"], null, null);
    } else {
      //transfer complete
      this.fun(state, this.data, header);
    }
  } else {
    this.fun(state, this.data ? this.data : [], header);
  }
}

/***/ }),

/***/ "./src/o365/index.js":
/*!***************************!*\
  !*** ./src/o365/index.js ***!
  \***************************/
/*! exports provided: Connection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _conn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conn */ "./src/o365/conn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return _conn__WEBPACK_IMPORTED_MODULE_0__["Connection"]; });

/* Copyright (c) 2018-2020 Benjamin 'Benno' Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/



/***/ }),

/***/ "./src/table/table.js":
/*!****************************!*\
  !*** ./src/table/table.js ***!
  \****************************/
/*! exports provided: array_map, array2d_col, cmp, Table */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array_map", function() { return array_map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array2d_col", function() { return array2d_col; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cmp", function() { return cmp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/** 
* @module jsmat/data
*/
function array_map(Fun, Arr) {
  var i,
      R = new Array(Arr.length);

  for (i = 0; i < Arr.length; i++) R[i] = Fun(Arr[i], i);

  return R;
}
;
function array2d_col(arr, idx) {
  var len = arr.length;
  var r = new Array(len);

  for (var i = 0; i < len; i++) r[i] = arr[i][idx];

  return r;
}
const cmp = {
  number: function (A, B) {
    return A - B;
  },
  string: function (A, B) {
    return A.localeCompare(B);
  },
  any: function (A, B) {
    return A.toString().localeCompare(B.toString());
  }
};
class Table {
  constructor(Name, Header) {
    this.name = Name;
    this.header = Header || [];
    this.data = [];
    this.sorted = -1; // sorted column
  }

  clear() {
    this.data = [];
    this.sorted = -1;
  }

  length() {
    return this.data.length;
  }

  add_colum(Name, Data) {
    this.header.push(Name);
    var Pos = this.header.length - 1;

    for (var i = 0; i < this.data.length; i++) {
      if (Data && Data[i]) {
        this.data[i][Pos] = Data[i];
      } else {
        this.data[i][Pos] = undefined;
      }
    }
  }

  get_colum(name) {
    var i,
        r = new Array(this.data.length),
        col = typeof name == "string" ? this.header.indexOf(name) : name;

    for (i = 0; i < this.data.length; i++) {
      r[i] = this.data[i][col];
    }

    return r;
  }

  map(Fun, target, inputs, start, end) {
    if (end == undefined || end > this.data.length || end < 0) end = this.data.length;
    if (start == undefined) start = 0;
    var data = this.data,
        b;

    if (target) {
      if (typeof target == "string") target = this.header.indexOf(target);

      if (inputs) {
        inputs = array_map(function (d) {
          return typeof d == "string" ? this.header.indexOf(d) : d;
        }, inputs);

        for (var i = start; i < end; i++) {
          b = array_map(function (ii) {
            return this[ii];
          }.bind(data[i]), inputs);
          data[i][target] = Fun.apply(null, b.concat([data[i], i]));
        }
      } else {
        for (i = offset; i < length; i++) {
          data[i][target] = Fun(data[i], i);
        }
      }
    } else {
      for (var i = start; i < end; i++) {
        data[i] = Fun(data[i], i);
      }
    }
  } // deprecated


  map1(Fun, offset, length) {
    if (length == undefined || length > this.data.length || length < 0) length = this.data.length;
    if (offset == undefined) offset = 0;
    var Data = this.data,
        i;

    for (i = offset; i < length; i++) {
      Data[i] = Fun(Data[i], i);
    }
  } // deprecated


  map2(Fun, Target, offset, length) {
    if (length == undefined || length > this.data.length) length = this.data.length;
    if (offset == undefined) offset = 0;
    var i,
        Data = this.data,
        col = typeof Target == "string" ? this.header.indexOf(Target) : Target;

    for (i = offset; i < length; i++) {
      Data[i][col] = Fun(Data[i], i);
    }
  } // deprecated


  map3(Fun, Target, Inputs, offset, length) {
    if (length == undefined || length > this.data.length) length = this.data.length;
    if (offset == undefined) offset = 0;
    var Data = this.data,
        i,
        B,
        In = array_map(function (D) {
      return typeof D == "string" ? this.header.indexOf(D) : D;
    }, Inputs),
        col = typeof D == "string" ? this.header.indexOf(Target) : Target;

    for (i = offset; i < length; i++) {
      B = array_map(function (I) {
        return this[I];
      }.bind(Data[i]), In);
      Data[i][col] = Fun.apply(null, [Data[i]].concat(B));
    }
  }

  fold(Fun, acc, inputs, start, end) {
    if (end == undefined || end > this.data.length || end < 0) end = this.data.length;
    if (start == undefined) start = 0;
    var data = this.data,
        b;

    if (inputs) {
      inputs = array_map(function (D) {
        return typeof d == "string" ? this.header.indexOf(d) : d;
      }, inputs);

      for (i = 0; i < Data.length; i++) {
        b = array_map(function (ii) {
          return this[ii];
        }.bind(Data[i]), inputs);
        b = [acc].concat(b);
        acc = Fun.apply(null, b.concat([data[i], i]));
      }
    } else {
      for (var i = 0; i < Keys.length; i++) {
        acc = Fun(acc, Data[i], i);
      }
    }

    return acc;
  } // deprecated


  fold1(Fun, Acc) {
    var Data = this.data,
        i;

    for (i = 0; i < Keys.length; i++) {
      Acc = Fun(Data[i], Acc);
    }

    return Acc;
  } // deprecated


  fold3(Fun, Acc, Inputs) {
    var Data = this.data,
        i,
        B,
        In = array_map(function (D) {
      return typeof D == "string" ? this.header.indexOf(D) : D;
    }, Inputs);

    for (i = 0; i < Data.length; i++) {
      B = array_map(function (I) {
        return this[I];
      }.bind(Data[i]), In);
      B.push(Acc);
      Acc = Fun.apply(null, B);
    }

    return Acc;
  }
  /**
   * Filter table and create a new table with filtered data
   * @param {*} Cmp 
   * @param {*} input 
   * @param {*} query 
   */


  filter(Cmp, input, query) {
    if (typeof input == "string") input = this.header.indexOf(input);
    var out = new Table(this.name + " filter", this.header.slice(0));
    var data = this.data,
        i;

    if (input) {
      for (i = 0; i < Data.length; i++) {
        if (0 == Cmp(Data[i][input], query)) Out.data.push(Data[i]);
      }
    } else {
      for (i = 0; i < Data.length; i++) {
        if (0 == Cmp(Data[i], query)) Out.data.push(Data[i]);
      }
    }

    return Out;
  }
  /**
   * seclect colums and rows with a filter 
   * @param {*} Fun 
   * @param {*} input 
   * @param {*} query 
   */


  select(Fun, input, query) {
    var Data = this.data,
        i,
        B,
        R,
        In = array_map(function (D) {
      return typeof D == "string" ? header.indexOf(D) : D;
    }, Select);
    var Out = init(this.name + " filter", array_map(function (I) {
      return this.header[I];
    }, In));

    for (i = 0; i < Data.length; i++) {
      B = array_map(function (I) {
        return this[I];
      }.bind(Data[i]), In);
      B.push(Query);
      R = Fun.apply(null, B);
      if (R) Out.data.push(R);
    }

    return Out;
  }
  /**
   * Reduce table 
   * @param {*} Fun 
   * @param {*} input 
   */


  reduce(Fun, input) {
    var Cidx = typeof Colum === "string" ? this.header.indexOf(Colum) : Colum;
    if (!this.sorted || this.sorted != Cidx) this.sort(Fun, Cidx);
    var Data = this.data,
        i;
    var Last = Data[0][Cidx],
        Out = new Table(this.name + " reduce " + Colum, this.header.slice(0));
    Out.data.push(Data[0]);

    for (i = 1; i < Data.length; i++) {
      if (0 != Fun(Data[i][Cidx], Last)) Out.data.push(Data[i]);
      Last = Data[i][Cidx];
    }

    return Out;
  } //// SORT AND SEARCH WITH HELPERS


  sort(Fun, Colum) {
    var Cidx = typeof Colum === "string" ? this.header.indexOf(Colum) : Colum;

    var Cmp = function (A, B) {
      return this.cmp(A[this.idx], B[this.idx]);
    };

    this.data = this.data.sort(Cmp.bind({
      idx: Cidx,
      cmp: Fun
    }));
    this.sorted = Cidx;
    return Cidx;
  }

  search_and_get(Fun, Value, Colum, Key) {
    var Idx = this.search(Fun, Value, Colum);

    if (Idx >= 0) {
      var Cidx = typeof Key === "string" ? this.header.indexOf(Key) : Key;
      return this.data[Idx][Cidx];
    }
  }

  search(Fun, Value, Colum) {
    var Cidx;
    if (typeof Colum === "string") Cidx = this.header.indexOf(Colum);else Cidx = Colum;

    if (this.sorted && this.sorted == Cidx) {
      //binary binsearch
      return this.binsearch(Fun, Value, Cidx);
    } else {
      var i,
          Data = this.data;

      for (i = 0; i < Data.length; i++) {
        if (0 == Fun(Data[i][Cidx], Value)) {
          return i;
        }
      }
    }

    return -1;
  }

  binary_search(Fun, Value, Colum) {
    var Cidx = typeof Colum === "string" ? this.header.indexOf(Colum) : Colum;
    if (!this.sorted || this.sorted != Cidx) sort(Fun, Cidx, this);
    return this.binsearch(Fun, Value, Cidx);
  }

  binsearch(Fun, Value, Cidx) {
    var Left = 0,
        Right = this.data.length - 1,
        Mid,
        R,
        Data = this.data;

    while (Left <= Right) {
      // Interval
      Mid = Left + (Right - Left) / 2; // half interval
      //console.log(Value,Data[Mid]);

      R = Fun(Value, Data[Mid][Cidx]);
      if (R == 0) // success
        return Mid;else if (R < 0) // lower interval
        Right = Mid - 1;else // higher interval
        Left = Mid + 1;
    }

    return -1;
  }

  get_row_obj(Row) {
    var Obj = {};

    for (var i = 0; i < this.header.length; i++) {
      Obj[this.header[i]] = this.data[Row][i];
    }

    return Obj;
  }

  add_row_obj(Obj, Idx = -1) {
    var Keys = Object.keys(Obj);

    if (Idx < 0) {
      Idx = this.data.length;
      this.data.push(new Array(this.header.length));
    }

    for (var i = 0; i < Keys.length; i++) {
      var Pos = this.header.indexOf(Keys[i]);

      if (Pos == -1) {
        console.log("TR_Table: Missing key: " + Keys[i]);
      } else {
        this.data[Idx][Pos] = Obj[Keys[i]];
      }
    }
  }

  add_obj_array(Obj) {
    var i, j, L, Keys, Idx;

    for (i = 0; i < Obj.length; i++) {
      L = new Array(this.header.length);
      Keys = Object.keys(Obj[i]);

      for (j = 0; j < Keys.length; j++) {
        Idx = this.header.indexOf(Keys[j]);

        if (Idx >= 0) {
          L[Idx] = Obj[i][Keys[j]];
        }
      }

      this.data.push(L);
    }
  }

  read_json(text) {
    var l,
        i,
        j,
        json = JSON.parse(text);

    for (i = 0; i < json.length; i++) {
      l = new Array(this.header.length);

      for (j = 0; j < this.header.length; j++) {
        l[j] = json[i][this.header[j]];
      }

      this.data.push(l);
    }
  }

  read_csv(Text, FS, No_Header) {
    var Last_Char = "",
        Field = "",
        Obj = [""],
        Col = 0,
        Row = 0,
        No_Quote = !0,
        C,
        j,
        First_Row = No_Header ? 0 : !0;
    this.data = [];
    this.header = [];
    this.sorted = -1;
    this.data.push(Obj);

    for (j = 0; j < Text.length; j++) {
      C = Text[j]; //get current char

      if ("\"" === C) {
        // if quote
        if (No_Quote && C === Last_Char) Field += C; // if previous was a quote add quote to field string

        No_Quote = !No_Quote; // switch boolean
      } else if (FS === C && No_Quote) {
        // if not quoted FS
        if (First_Row) {
          this.header[Col++] = Field;
        } else {
          Obj[Col++] = Field;
        }

        C = Field = "";
      } else if ("\n" === C && No_Quote) {
        // if not quoted line end
        if ("\r" === Last_Char) Field = Field.slice(0, -1); //remove carriage return

        if (First_Row) {
          First_Row = !First_Row;
          this.header[Col] = Field;
          C = Field = "";
        } else {
          Obj[Col] = Field;
          this.data[++Row] = Obj = [];
        }

        C = Field = "";
        Col = 0;
      } else {
        Field += C;
      }

      Last_Char = C;
    }

    if (Col != 0) {
      Obj[Col] = Field;
    }

    if (Obj.length != this.header.length) this.data.pop();
  }

  write_csv(FS) {
    var text = "",
        row;

    if (this.header) {
      for (var i = 0; i < this.header.length; i++) {
        if (i > 0) text += FS;
        text += escape_csv(this.header[i], FS);
      }

      text += "\r\n";
    }

    for (var i = 0; i < this.data.length; i++) {
      row = this.data[i];

      for (var j = 0; j < row.length; j++) {
        if (j > 0) text += FS;
        text += escape_csv(str(row[j]), FS);
      }

      text += "\r\n";
    }

    return text;
  }

  open_csv(fun, file) {
    var reader = new FileReader();

    reader.onload = function (event) {
      this.read_csv(event.target.result, ';');
      fun();
    };

    reader.onerror = function (event) {
      alert(event.target.error);
    };

    reader.readAsText(file);
  }

  save_csv() {
    var file_link = document.createElement('a');
    file_link.setAttribute('href', 'data: text/csv,' + encodeURIComponent(this.write_csv(';')));

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      file_link.dispatchEvent(event);
    } else {
      file_link.click();
    }
  }

}
; // HELPER FUNCTIONS

function escape_csv(Value, FS) {
  var R = "",
      C,
      Esc = false;
  if (!Value) return "";

  for (var j = 0; j < Value.length; j++) {
    C = Value[j];

    if (C == "\"") {
      R += C;
      R += C;
      Esc = true;
    } else if (C == "\n" || C == "\r" || C == FS) {
      R += C;
      Esc = true;
    } else {
      R += C;
    }
  }

  if (Esc) {
    return "\"" + R + "\"";
  } else {
    return R;
  }
}

function str(o) {
  switch (o) {
    case null:
      return "null";

    case undefined:
      return "undefined";

    default:
      return o.toString();
  }
}

/***/ }),

/***/ "./src/table/table_view.js":
/*!*********************************!*\
  !*** ./src/table/table_view.js ***!
  \*********************************/
/*! exports provided: TableView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableView", function() { return TableView; });
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table */ "./src/table/table.js");

class TableView {
  constructor(table, target) {
    this.table = table;
    if (typeof target == 'string') target = document.querySelector(target);
    this.target = target;
  }

  draw() {
    var caption = this.target.querySelector('caption').innerHTML;
    var tab = this.target;
    tab.innerHTML = "";
    var cell,
        chk,
        row = document.createElement('tr');
    cell = document.createElement('td');
    chk = document.createElement('input');
    chk.type = "checkbox";
    chk.name = this.target.id + "_chk_all";
    chk.id = chk.name;
    cell.appendChild(chk);
    row.appendChild(cell);

    for (var i = 0; i < this.table.header.length; i++) {
      cell = document.createElement('th');
      cell.innerText = this.table.header[i];
      row.appendChild(cell);
    }

    tab.appendChild(row);

    for (var i = 0; i < this.table.length(); i++) {
      row = document.createElement('tr');
      cell = document.createElement('td');
      chk = document.createElement('input');
      chk.type = "checkbox";
      chk.name = this.target.id + "_chk_" + i + "_" + j;
      chk.id = chk.name;
      cell.appendChild(chk);
      row.appendChild(cell);

      for (var j = 0; j < this.table.header.length; j++) {
        cell = document.createElement('td');
        cell.innerText = this.table.data[i][j];
        row.appendChild(cell);
      }

      tab.appendChild(row);
      tab.onclick(this.on_click);
    }
  }

  update() {}

  on_click(e) {
    console.log(e);
  }

}

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
});
//# sourceMappingURL=jsdox.js.map
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMatchingValues = exports.getUniqueValues = void 0;

/**
 * Get unique values from an array based on the criteria provided
 * @param   {Array}   arr   Array of objects to filter from
 * @param   {String}  key   A string corresponding to a key from the objects
 * @returns {Array}         An array of values based on the provided key without duplicates          
 */
var getUniqueValues = function getUniqueValues(arr, key) {
  return arr.reduce(function (acc, curr) {
    acc.push(curr[key]);
    return acc;
  }, []).filter(function (el, i, arr) {
    return arr.indexOf(el) === i;
  });
};
/**
 * Get elements based on a criteria
 * @param    {Array}   arr   Array of objects to filter from
 * @param    {String}  key   A key from the objects
 * @param    {String}  value A string to match a key from the objects
 * @returns  {Array}         A copy of the array filtered by the matched key and value
 */


exports.getUniqueValues = getUniqueValues;

var getMatchingValues = function getMatchingValues(arr, key, value) {
  return arr.filter(function (el) {
    return el[key] === value;
  });
};

exports.getMatchingValues = getMatchingValues;
},{}],"js/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Select = /*#__PURE__*/function () {
  function Select(target, data) {
    _classCallCheck(this, Select);

    this.target = document.getElementById(target);
    this.data = data;
    this.render();
  }

  _createClass(Select, [{
    key: "createOptions",
    value: function createOptions() {
      var allCountries = (0, _utils.getUniqueValues)(this.data, 'country');
      var fragment = document.createDocumentFragment();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = allCountries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var country = _step.value;
          var opt = document.createElement('option');
          opt.value = country;
          opt.textContent = country.toUpperCase();
          fragment.appendChild(opt);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.target.appendChild(fragment);
    }
  }, {
    key: "render",
    value: function render() {
      this.createOptions();
    }
  }]);

  return Select;
}();

exports.default = Select;
},{"./utils.js":"js/utils.js"}],"js/tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tile = /*#__PURE__*/function () {
  function Tile(destination, data, output) {
    _classCallCheck(this, Tile);

    this.destination = destination;
    this.data = data;
    this.output = output;
    this.render();
  }

  _createClass(Tile, [{
    key: "getRatings",
    value: function getRatings(num) {
      var starHTMLCode = '<span>&#9733;</span>';
      var result = '';

      for (var i = 0; i < num; ++i) {
        result += starHTMLCode;
      }

      return result;
    }
  }, {
    key: "buildString",
    value: function buildString(item) {
      return "\n      <div class='tile'>\n        <img class='tileImage' src='./assets/images/".concat(item.image, "' alt='").concat(item.place, "'/>\n        <div class='tileInfos'>\n          <p class='tileCountry'>").concat(item.country, "</p>\n          <p class='tileCity'>").concat(item.place, "</p>\n          <div class='tileExtraInfos'>\n            <p class='tileLabel'>").concat(item.label, "</p>\n            <div class='tileRatings'>").concat(this.getRatings(parseInt(item.rating)), "</div>\n          </div>\n          <div class='tileTags'>\n            <span class='premium tagSkin'>").concat(item.tags[0].label, "</span>\n            <span class='option tagSkin'>").concat(item.tags[1].label, "</span>\n          </div>\n          <a class='moreLink' href='#' title=\"").concat(item.redirect_label, "\"></a>\n        </div>    \n      </div>  \n    ").replace(/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, "$1$3");
    }
  }, {
    key: "display",
    value: function display() {
      this.output.innerHTML = '';
      var items = !this.destination ? this.data : (0, _utils.getMatchingValues)(this.data, 'country', this.destination);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          this.output.innerHTML += this.buildString(item);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.display();
    }
  }]);

  return Tile;
}();

exports.default = Tile;
},{"./utils.js":"js/utils.js"}],"data/destinations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destinations = void 0;
var destinations = [{
  // 1
  "country": "Emirates Arabes Unis",
  "place": "Dubaï",
  "label": "Hyatt Regency Creek",
  "rating": "5*",
  "upto": "Dès 67€",
  "redirect_label": "VERS LES EMIRATS ARABES UNIS — DUBAÏ",
  "tags": [{
    "classname": "premium",
    "label": "Premium"
  }, {
    "classname": "option",
    "label": "Surclassement offert"
  }],
  "link": "",
  "image": "CLOS_DU_LITTORAL.jpg"
}, {
  // 2
  "country": "Maurice",
  "place": "Grand Rivière",
  "label": "Laguna Beach Hotel & Spa",
  "rating": "4*",
  "upto": "Jusqu'à -64%",
  "redirect_label": "VERS MAURICE — GRAND RIVIÈRE",
  "tags": [{
    "classname": "premium",
    "label": "Tout inclus"
  }, {
    "classname": "option",
    "label": "Spa"
  }],
  "link": "",
  "image": "ENTRE_CULTURE_ET_PLAGES.jpg"
}, {
  // 3
  "country": "Emirates Arabes Unis",
  "place": "Dubaï",
  "label": "Fairmont Dubaï",
  "rating": "5*",
  "upto": "Dès 99€",
  "redirect_label": "VERS LES EMIRATS ARABES UNIS — DUBAÏ",
  "tags": [{
    "classname": "premium",
    "label": "Premium"
  }, {
    "classname": "option",
    "label": "Rooftop"
  }],
  "link": "",
  "image": "ECHAPEE_SRI_LANKAISE.jpg"
}, {
  // 4
  "country": "Indonésie",
  "place": "Bali & Gili",
  "label": "Combiné Sthala - Marc - Patra",
  "rating": "0*",
  "upto": "Dès 469€",
  "redirect_label": "VERS L'INDONÉSIE — BALI & GILI",
  "tags": [{
    "classname": "premium",
    "label": "Combiné"
  }, {
    "classname": "option",
    "label": "Petit déjeuner inclus"
  }],
  "link": "",
  "image": "FAIRMONT_DUBAI.jpg"
}, {
  // 5
  "country": "Maldives",
  "place": "Atoll de Noonu",
  "label": "Noku Maldives",
  "rating": "5*",
  "upto": "Jusqu'à -36%",
  "redirect_label": "VERS MALDIVES — ATOLL DE NOONU",
  "tags": [{
    "classname": "premium",
    "label": "Premium"
  }, {
    "classname": "option",
    "label": "Massage offert"
  }],
  "link": "",
  "image": "HYATT_REGENCY_CREEK.jpg"
}, {
  // 6
  "country": "Thaïlande",
  "place": "Koh Samui",
  "label": "Impiana Resort Samui",
  "rating": "4*",
  "upto": "Jusqu'à -70%",
  "redirect_label": "VERS LA THAÏLANDE — KOH SAMUI",
  "tags": [{
    "classname": "premium",
    "label": "Massage offert"
  }, {
    "classname": "option",
    "label": "Surclassement offert"
  }],
  "link": "",
  "image": "IMPIANA_RESORT_SAMUI.jpg"
}, {
  // 7
  "country": "Maurice",
  "place": "Grand Baie",
  "label": "Clos du Littoral",
  "rating": "4*",
  "upto": "Dès 538€",
  "redirect_label": "VERS MAURICE — GRAND BAIE",
  "tags": [{
    "classname": "premium",
    "label": "Premium"
  }, {
    "classname": "option",
    "label": "Villas avec Piscine Privée"
  }],
  "link": "",
  "image": "LAGUNA_BEACH.jpg"
}, {
  // 8
  "country": "Sri Lanka",
  "place": "Sri Lanka",
  "label": "Echappée SriLankaise",
  "rating": "3*",
  "upto": "Dès 699€",
  "redirect_label": "VERS LE SRI LANKA",
  "tags": [{
    "classname": "premium",
    "label": "Circuit"
  }, {
    "classname": "option",
    "label": "Privatif"
  }],
  "link": "",
  "image": "NOKU_MALDIVES.jpg"
}, {
  // 9
  "country": "Japon",
  "place": "Tokyo",
  "label": "Grand Arc Hanzomon",
  "rating": "3*",
  "upto": "Dès 114€",
  "redirect_label": "VERS LE JAPON — GRAND ARC HANZOMON",
  "tags": [{
    "classname": "premium",
    "label": "City Break"
  }, {
    "classname": "option",
    "label": "Insolite"
  }],
  "link": "",
  "image": "rsz_japon.jpg"
}, {
  // 10
  "country": "Vietnam",
  "place": "De Hanoï à Hoi An",
  "label": "Entre Culture et Plages",
  "rating": "4*",
  "upto": "Dès 779€",
  "redirect_label": "VERS LE VIETNAM — DE HANOÏ À HOI AN",
  "tags": [{
    "classname": "premium",
    "label": "Circuit"
  }, {
    "classname": "option",
    "label": "Privatif"
  }],
  "link": "",
  "image": "STHALA_MARC_PATRA.jpg"
}, {
  // 11
  "country": "Vietnam",
  "place": "De Hanoï à Hoi An",
  "label": "Entre Culture et Plages",
  "rating": "4*",
  "upto": "Dès 779€",
  "redirect_label": "VERS LE VIETNAM — DE HANOÏ À HOI AN",
  "tags": [{
    "classname": "premium",
    "label": "Circuit"
  }, {
    "classname": "option",
    "label": "Privatif"
  }],
  "link": "",
  "image": "FAIRMONT_DUBAI.jpg"
}, {
  // 12
  "country": "Vietnam",
  "place": "De Hanoï à Hoi An",
  "label": "Entre Culture et Plages",
  "rating": "4*",
  "upto": "Dès 779€",
  "redirect_label": "VERS LE VIETNAM — DE HANOÏ À HOI AN",
  "tags": [{
    "classname": "premium",
    "label": "Circuit"
  }, {
    "classname": "option",
    "label": "Privatif"
  }],
  "link": "",
  "image": "LAGUNA_BEACH.jpg"
}];
exports.destinations = destinations;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _select = _interopRequireDefault(require("./js/select.js"));

var _tile = _interopRequireDefault(require("./js/tile.js"));

var _destinations = require("./data/destinations.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropdown = document.getElementById('select');
var output = document.getElementById('content');
new _select.default('select', _destinations.destinations);
new _tile.default('', _destinations.destinations, output);
dropdown.addEventListener('change', function (e) {
  new _tile.default(e.target.value, _destinations.destinations, output);
});
},{"./js/select.js":"js/select.js","./js/tile.js":"js/tile.js","./data/destinations.js":"data/destinations.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63462" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/destinations.e31bb0bc.js.map
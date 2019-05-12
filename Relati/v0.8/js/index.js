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
/******/ 	return __webpack_require__(__webpack_require__.s = "./bootstrap.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bootstrap.ts":
/*!**********************!*\
  !*** ./bootstrap.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./scss/main/page.scss */ "./scss/main/page.scss");
__webpack_require__(/*! ./scss/view/message-box.scss */ "./scss/view/message-box.scss");
__webpack_require__(/*! ./scss/page/main-page.scss */ "./scss/page/main-page.scss");
__webpack_require__(/*! ./scss/page/game-page.scss */ "./scss/page/game-page.scss");
__webpack_require__(/*! ./scss/view/relati-effect.scss */ "./scss/view/relati-effect.scss");
__webpack_require__(/*! ./scss/page/help-page.scss */ "./scss/page/help-page.scss");
var Page_1 = __webpack_require__(/*! ./ts/main/Page */ "./ts/main/Page.ts");
__webpack_require__(/*! ./ts/page/MainPage */ "./ts/page/MainPage.ts");
__webpack_require__(/*! ./ts/page/GamePage */ "./ts/page/GamePage.ts");
__webpack_require__(/*! ./ts/page/HelpPage */ "./ts/page/HelpPage.ts");
Page_1.Page.switchTo("main");
var RelatiBoard_1 = __webpack_require__(/*! ./ts/core/RelatiBoard */ "./ts/core/RelatiBoard.ts");
var RelatiGame_1 = __webpack_require__(/*! ./ts/core/RelatiGame */ "./ts/core/RelatiGame.ts");
var RelatiRoutes_1 = __webpack_require__(/*! ./ts/core/RelatiRoutes */ "./ts/core/RelatiRoutes.ts");
var RelatiBoardView_1 = __webpack_require__(/*! ./ts/view/RelatiBoardView */ "./ts/view/RelatiBoardView.ts");
var RelatiEffectView_1 = __webpack_require__(/*! ./ts/view/RelatiEffectView */ "./ts/view/RelatiEffectView.ts");
var board = new RelatiBoard_1.RelatiBoard(9, 9);
var game = new RelatiGame_1.RelatiGame(board, RelatiRoutes_1.BY_COMMON_RELATI);
var boardView = new RelatiBoardView_1.RelatiBoardView(board, document.getElementById("game-board"));
boardView.resize();
window.addEventListener("resize", boardView.resize.bind(boardView));
boardView.body.addEventListener("click", function (event) {
    var x = Math.floor(event.offsetX / 5), y = Math.floor(event.offsetY / 5);
    var playerSymbol = game.nowPlayerSymbol;
    game.selectGrid(x, y);
    var background = boardView.background;
    var nowPlayerSymbol = game.nowPlayerSymbol;
    var gameResult = game.result;
    if (gameResult !== "none") {
        if (confirm(gameResult)) {
            game.restart();
        }
    }
    boardView.update();
    boardView.removeBackground();
    var placeableGrids = game.getPlaceableGrids(nowPlayerSymbol);
    RelatiEffectView_1.createHintEffect(placeableGrids, nowPlayerSymbol, background);
    RelatiEffectView_1.createRelatiEffect(playerSymbol, background, game);
});
window.game = game;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/main/page.scss":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js!./scss/main/page.scss ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ../../svg/back.svg */ "./svg/back.svg"));

// Module
exports.push([module.i, ".page-container {\n  color: #888;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  position: relative; }\n\n.page-container > .page {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: -100%;\n  transition: left 0.5s; }\n\n.page-container > .page.active {\n  left: 0%; }\n\n.page-container > .page.active ~ .page {\n  left: 100%; }\n\n.page-container .controls {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 60px; }\n\n.page-container .btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 50px;\n  height: 50px;\n  border-radius: 5px;\n  background-color: #888;\n  background-image: url(" + ___CSS_LOADER_URL___0___ + ");\n  background-repeat: no-repeat;\n  background-position: center;\n  transition: transform 0.5s; }\n\n.page-container .btn:active {\n  transform: scale(0.8); }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/page/game-page.scss":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js!./scss/page/game-page.scss ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "#game-page #game-board {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/page/help-page.scss":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js!./scss/page/help-page.scss ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/page/main-page.scss":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js!./scss/page/main-page.scss ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ../../svg/play.svg */ "./svg/play.svg"));
var ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(/*! ../../svg/help.svg */ "./svg/help.svg"));

// Module
exports.push([module.i, "#main-page {\n  justify-content: center; }\n\n#main-page #main-title {\n  font-size: 90px;\n  font-family: sans-serif; }\n\n#main-page #main-controls {\n  width: 150px;\n  justify-content: space-between; }\n\n#main-page #main-controls .to-game-page {\n  background-color: crimson;\n  background-image: url(" + ___CSS_LOADER_URL___0___ + "); }\n\n#main-page #main-controls .to-help-page {\n  background-color: royalblue;\n  background-image: url(" + ___CSS_LOADER_URL___1___ + "); }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/view/message-box.scss":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js!./scss/view/message-box.scss ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "#message-box {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  font-size: 30px;\n  color: #888;\n  background-color: #f2f2f2;\n  width: 300px;\n  height: 200px;\n  position: fixed;\n  top: calc(50vh - 100px);\n  left: calc(50vw - 150px);\n  border-width: 2px;\n  border-color: #888;\n  border-style: solid;\n  border-radius: 5px;\n  box-sizing: border-box;\n  animation: message-box-show 0.5s; }\n\n#message-box.none {\n  display: none; }\n\n@keyframes message-box-show {\n  from {\n    transform: scale(0); } }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/view/relati-effect.scss":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js!./scss/view/relati-effect.scss ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "svg .relati-effect-line {\n  stroke-dashoffset: 0;\n  stroke-dasharray: 15;\n  opacity: 0.3;\n  animation: relati-effect-line 0.25s linear; }\n\n@keyframes relati-effect-line {\n  from {\n    stroke-dashoffset: 15; } }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/url-escape.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/url-escape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url, needQuotes) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  return url;
};

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./scss/main/page.scss":
/*!*****************************!*\
  !*** ./scss/main/page.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/resolve-url-loader!../../node_modules/sass-loader/lib/loader.js!./page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/main/page.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./scss/page/game-page.scss":
/*!**********************************!*\
  !*** ./scss/page/game-page.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/resolve-url-loader!../../node_modules/sass-loader/lib/loader.js!./game-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/page/game-page.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./scss/page/help-page.scss":
/*!**********************************!*\
  !*** ./scss/page/help-page.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/resolve-url-loader!../../node_modules/sass-loader/lib/loader.js!./help-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/page/help-page.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./scss/page/main-page.scss":
/*!**********************************!*\
  !*** ./scss/page/main-page.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/resolve-url-loader!../../node_modules/sass-loader/lib/loader.js!./main-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/page/main-page.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./scss/view/message-box.scss":
/*!************************************!*\
  !*** ./scss/view/message-box.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/resolve-url-loader!../../node_modules/sass-loader/lib/loader.js!./message-box.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/view/message-box.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./scss/view/relati-effect.scss":
/*!**************************************!*\
  !*** ./scss/view/relati-effect.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/resolve-url-loader!../../node_modules/sass-loader/lib/loader.js!./relati-effect.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js!./scss/view/relati-effect.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./svg/back.svg":
/*!**********************!*\
  !*** ./svg/back.svg ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+CiAgICA8cGF0aCBkPSJNIDIwIDEyIFYgNCBIIDQgViAzNiBIIDIwIFYgMjgiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlPSIjZjJmMmYyIj48L3BhdGg+CiAgICA8cGF0aCBkPSJNIDEyIDIwIEggMzYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlPSIjZjJmMmYyIj48L3BhdGg+CiAgICA8cGF0aCBkPSJNIDI4IDEyIEwgMzYgMjAgTCAyOCAyOCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2U9IiNmMmYyZjIiPjwvcGF0aD4KPC9zdmc+"

/***/ }),

/***/ "./svg/help.svg":
/*!**********************!*\
  !*** ./svg/help.svg ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNIDEzLjYgMTYuNCBBIDYuNCA2LjQgMCAxIDEgMjAgMjIuOCBWIDI2IiBzdHJva2U9IiNmMmYyZjIiIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSI+PC9wYXRoPgogICAgPGNpcmNsZSBjeD0iMjAiIGN5PSIzMCIgcj0iMi40IiBmaWxsPSIjZjJmMmYyIj48L2NpcmNsZT4KPC9zdmc+"

/***/ }),

/***/ "./svg/play.svg":
/*!**********************!*\
  !*** ./svg/play.svg ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNIDggOCBMIDMyIDIwIEwgOCAzMiBaIiBmaWxsPSIjZjJmMmYyIj48L3BhdGg+Cjwvc3ZnPg=="

/***/ }),

/***/ "./ts/core/GridBoard.ts":
/*!******************************!*\
  !*** ./ts/core/GridBoard.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 棋盤格方向
 * C: (x = 0, y = 0)
 * F: (x = x, y - 1)
 * B: (x = x, y + 1)
 * R: (x + 1, y = y)
 * L: (x - 1, y = y)
 */
var GRID_DRCT;
(function (GRID_DRCT) {
    GRID_DRCT[GRID_DRCT["DRCT_C"] = 0] = "DRCT_C";
    GRID_DRCT[GRID_DRCT["DRCT_F"] = 4096] = "DRCT_F";
    GRID_DRCT[GRID_DRCT["DRCT_B"] = 256] = "DRCT_B";
    GRID_DRCT[GRID_DRCT["DRCT_R"] = 16] = "DRCT_R";
    GRID_DRCT[GRID_DRCT["DRCT_L"] = 1] = "DRCT_L";
    GRID_DRCT[GRID_DRCT["DRCT_FR"] = 4112] = "DRCT_FR";
    GRID_DRCT[GRID_DRCT["DRCT_FL"] = 4097] = "DRCT_FL";
    GRID_DRCT[GRID_DRCT["DRCT_BR"] = 272] = "DRCT_BR";
    GRID_DRCT[GRID_DRCT["DRCT_BL"] = 257] = "DRCT_BL";
    GRID_DRCT[GRID_DRCT["DRCT_2F"] = 8192] = "DRCT_2F";
    GRID_DRCT[GRID_DRCT["DRCT_2B"] = 512] = "DRCT_2B";
    GRID_DRCT[GRID_DRCT["DRCT_2R"] = 32] = "DRCT_2R";
    GRID_DRCT[GRID_DRCT["DRCT_2L"] = 2] = "DRCT_2L";
    GRID_DRCT[GRID_DRCT["DRCT_2FR"] = 8224] = "DRCT_2FR";
    GRID_DRCT[GRID_DRCT["DRCT_2FL"] = 8194] = "DRCT_2FL";
    GRID_DRCT[GRID_DRCT["DRCT_2BR"] = 544] = "DRCT_2BR";
    GRID_DRCT[GRID_DRCT["DRCT_2BL"] = 514] = "DRCT_2BL";
    GRID_DRCT[GRID_DRCT["DRCT_FFR"] = 8208] = "DRCT_FFR";
    GRID_DRCT[GRID_DRCT["DRCT_FFL"] = 8193] = "DRCT_FFL";
    GRID_DRCT[GRID_DRCT["DRCT_BBR"] = 528] = "DRCT_BBR";
    GRID_DRCT[GRID_DRCT["DRCT_BBL"] = 513] = "DRCT_BBL";
    GRID_DRCT[GRID_DRCT["DRCT_FRR"] = 4128] = "DRCT_FRR";
    GRID_DRCT[GRID_DRCT["DRCT_FLL"] = 4098] = "DRCT_FLL";
    GRID_DRCT[GRID_DRCT["DRCT_BRR"] = 288] = "DRCT_BRR";
    GRID_DRCT[GRID_DRCT["DRCT_BLL"] = 258] = "DRCT_BLL";
})(GRID_DRCT = exports.GRID_DRCT || (exports.GRID_DRCT = {}));
/** 棋盤格 */
var Grid = /** @class */ (function () {
    function Grid(
    /** 所屬棋盤 */
    board, 
    /** X座標 */
    x, 
    /** Y座標 */
    y) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.i = x * board.height + y;
    }
    /**
     * 取得相對位置的棋盤格
     * @param drct 方向，使用 GRID_DRCT 可簡單取得
     */
    Grid.prototype.getGrid = function (drct) {
        var f = (0xF000 & drct) >> 12;
        var b = (0x0F00 & drct) >> 8;
        var r = (0x00F0 & drct) >> 4;
        var l = (0x000F & drct);
        var x = this.x + r - l;
        var y = this.y + b - f;
        return this.board.getGrid(x, y);
    };
    return Grid;
}());
exports.Grid = Grid;
/** 棋盤 */
var GridBoard = /** @class */ (function () {
    function GridBoard(
    /** 棋盤寬度 */
    width, 
    /** 棋盤高度 */
    height) {
        this.width = width;
        this.height = height;
        var grids = [];
        this.grids = grids;
        this.length = width * height;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var grid = new Grid(this, x, y);
                grids[grid.i] = grid;
            }
        }
    }
    /**
     * 取得絕對位置的棋盤格
     * @param x X座標
     * @param y Y座標
     */
    GridBoard.prototype.getGrid = function (x, y) {
        if (x < 0 || x >= this.width ||
            y < 0 || y >= this.height)
            return null;
        var i = x * this.height + y;
        return this.grids[i];
    };
    return GridBoard;
}());
exports.GridBoard = GridBoard;


/***/ }),

/***/ "./ts/core/RelatiAction.ts":
/*!*********************************!*\
  !*** ./ts/core/RelatiAction.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RelatiBoard_1 = __webpack_require__(/*! ./RelatiBoard */ "./ts/core/RelatiBoard.ts");
var RelatiRoutes_1 = __webpack_require__(/*! ./RelatiRoutes */ "./ts/core/RelatiRoutes.ts");
/**
 * 恢復棋盤格Relati的中繼機能
 * @param grid 棋盤格
 * @param routeType 路徑類型
 */
function restore(grid, routeType) {
    if (grid.is(RelatiBoard_1.RELATI_REPEATER))
        return;
    grid.gain(RelatiBoard_1.RELATI_REPEATER);
    var routes = RelatiRoutes_1.getRelatiRoutesBy(grid, grid.symbol | RelatiBoard_1.RELATI_RECEIVER, routeType);
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var targetGrid = routes_1[_i];
        restore(targetGrid, routeType);
    }
}
/**
 * 恢復Relati中繼機能
 * @param board 棋盤
 * @param routeType 路徑類型
 */
function restoreRepeaterBy(board, routeType) {
    for (var _i = 0, _a = board.grids; _i < _a.length; _i++) {
        var grid = _a[_i];
        if (grid.is(RelatiBoard_1.RELATI_LAUNCHER))
            restore(grid, routeType);
    }
}
exports.restoreRepeaterBy = restoreRepeaterBy;
/**
 * 破壞Relati中繼機能
 * @param board 棋盤
 */
function destoryRepeaterBy(board) {
    for (var _i = 0, _a = board.grids; _i < _a.length; _i++) {
        var grid = _a[_i];
        grid.lost(RelatiBoard_1.RELATI_REPEATER);
    }
}
exports.destoryRepeaterBy = destoryRepeaterBy;


/***/ }),

/***/ "./ts/core/RelatiBoard.ts":
/*!********************************!*\
  !*** ./ts/core/RelatiBoard.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GridBoard_1 = __webpack_require__(/*! ./GridBoard */ "./ts/core/GridBoard.ts");
/** 無符號 */
exports.RELATI_SYMBOL_N = 0;
/** 符號為圓圈 */
exports.RELATI_SYMBOL_O = 1;
/** 符號為交叉 */
exports.RELATI_SYMBOL_X = 2;
/** 狀態為接收器 */
exports.RELATI_RECEIVER = 8;
/** 狀態為中繼器 */
exports.RELATI_REPEATER = 16;
/** 狀態為發射器 */
exports.RELATI_LAUNCHER = 32;
var RelatiGrid = /** @class */ (function (_super) {
    __extends(RelatiGrid, _super);
    function RelatiGrid(board, x, y) {
        var _this = _super.call(this, board, x, y) || this;
        /** 棋盤內部 */
        _this.body = 0;
        return _this;
    }
    /**
     * 判斷是否符號狀態
     * @param status 狀態
     */
    RelatiGrid.prototype.is = function (status) {
        return (this.body & status) === status;
    };
    /**
     * 獲得指定狀態
     * @param status 狀態
     */
    RelatiGrid.prototype.gain = function (status) {
        return this.body |= status;
    };
    /**
     * 失去指定狀態
     * @param status 狀態
     */
    RelatiGrid.prototype.lost = function (status) {
        return this.body &= ~status;
    };
    Object.defineProperty(RelatiGrid.prototype, "symbol", {
        /**
         * 取得符號
         */
        get: function () {
            return this.body & 7;
        },
        /**
         * 設置符號
         * @param symbol 符號
         */
        set: function (symbol) {
            this.lost(7);
            this.gain(symbol);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RelatiGrid.prototype, "isSpace", {
        /**
         * 是否為空白
         */
        get: function () {
            return this.body === exports.RELATI_SYMBOL_N;
        },
        enumerable: true,
        configurable: true
    });
    return RelatiGrid;
}(GridBoard_1.Grid));
exports.RelatiGrid = RelatiGrid;
var RelatiBoard = /** @class */ (function (_super) {
    __extends(RelatiBoard, _super);
    function RelatiBoard(width, height) {
        var _this = _super.call(this, width, height) || this;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var grid = new RelatiGrid(_this, x, y);
                _this.grids[grid.i] = grid;
            }
        }
        return _this;
    }
    return RelatiBoard;
}(GridBoard_1.GridBoard));
exports.RelatiBoard = RelatiBoard;


/***/ }),

/***/ "./ts/core/RelatiGame.ts":
/*!*******************************!*\
  !*** ./ts/core/RelatiGame.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RelatiBoard_1 = __webpack_require__(/*! ./RelatiBoard */ "./ts/core/RelatiBoard.ts");
var RelatiRoutes_1 = __webpack_require__(/*! ./RelatiRoutes */ "./ts/core/RelatiRoutes.ts");
var RelatiAction_1 = __webpack_require__(/*! ./RelatiAction */ "./ts/core/RelatiAction.ts");
/** 任何狀態 */
var RELATI_ANYSTAT = ~0;
/** 遊戲主體 */
var RelatiGame = /** @class */ (function () {
    function RelatiGame(
    /** 棋盤 */
    board, 
    /** Relati類型 */
    routeType) {
        this.board = board;
        this.routeType = routeType;
        /** 回合 */
        this.turn = 0;
        this.restart();
    }
    /** 重新開始 */
    RelatiGame.prototype.restart = function () {
        this.turn = 0;
        for (var _i = 0, _a = this.board.grids; _i < _a.length; _i++) {
            var grid = _a[_i];
            grid.lost(RELATI_ANYSTAT);
        }
    };
    /**
     * 選取棋盤格放置
     * @param x 棋盤X座標
     * @param y 棋盤Y座標
     */
    RelatiGame.prototype.selectGrid = function (x, y) {
        var grid = this.board.getGrid(x, y);
        if (!grid.isSpace)
            return;
        var symbol = this.nowPlayerSymbol;
        var _a = this, routeType = _a.routeType, board = _a.board;
        if (this.turn < 2) {
            grid.symbol = symbol;
            grid.gain(RelatiBoard_1.RELATI_LAUNCHER);
        }
        else if (RelatiRoutes_1.hasRelatiRoutesBy(grid, symbol | RelatiBoard_1.RELATI_REPEATER, routeType)) {
            grid.symbol = symbol;
            grid.gain(RelatiBoard_1.RELATI_RECEIVER);
        }
        else
            return;
        this.turn++;
        RelatiAction_1.destoryRepeaterBy(board);
        RelatiAction_1.restoreRepeaterBy(board, routeType);
    };
    /**
     * 取得可放置玩家符號的棋盤格
     * @param symbol 符號
     */
    RelatiGame.prototype.getPlaceableGrids = function (symbol) {
        var grids = [];
        for (var _i = 0, _a = this.board.grids; _i < _a.length; _i++) {
            var grid = _a[_i];
            if (grid.isSpace && RelatiRoutes_1.hasRelatiRoutesBy(grid, symbol | RelatiBoard_1.RELATI_REPEATER, this.routeType))
                grids.push(grid);
        }
        return grids;
    };
    Object.defineProperty(RelatiGame.prototype, "nowPlayerSymbol", {
        /** 目前玩家符號 */
        get: function () {
            return this.turn % 2 + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RelatiGame.prototype, "result", {
        /** 遊戲結果 */
        get: function () {
            if (this.turn < 2)
                return "none";
            var placeableGrid = [
                this.getPlaceableGrids(RelatiBoard_1.RELATI_SYMBOL_O),
                this.getPlaceableGrids(RelatiBoard_1.RELATI_SYMBOL_X)
            ];
            var nowPlayerSymbol = this.nowPlayerSymbol;
            if (placeableGrid[0].length &&
                placeableGrid[1].length)
                return "none";
            if (nowPlayerSymbol == RelatiBoard_1.RELATI_SYMBOL_X) {
                if (placeableGrid[1].length)
                    return "none";
                else if (placeableGrid[0].length)
                    return "OWin";
            }
            else if (nowPlayerSymbol == RelatiBoard_1.RELATI_SYMBOL_O) {
                if (placeableGrid[0].length)
                    return "none";
                else if (placeableGrid[1].length)
                    return "XWin";
            }
            return "draw";
        },
        enumerable: true,
        configurable: true
    });
    return RelatiGame;
}());
exports.RelatiGame = RelatiGame;


/***/ }),

/***/ "./ts/core/RelatiRoutes.ts":
/*!*********************************!*\
  !*** ./ts/core/RelatiRoutes.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GridBoard_1 = __webpack_require__(/*! ./GridBoard */ "./ts/core/GridBoard.ts");
var DRCT_F = GridBoard_1.GRID_DRCT.DRCT_F, DRCT_B = GridBoard_1.GRID_DRCT.DRCT_B, DRCT_R = GridBoard_1.GRID_DRCT.DRCT_R, DRCT_L = GridBoard_1.GRID_DRCT.DRCT_L, DRCT_FR = GridBoard_1.GRID_DRCT.DRCT_FR, DRCT_FL = GridBoard_1.GRID_DRCT.DRCT_FL, DRCT_BR = GridBoard_1.GRID_DRCT.DRCT_BR, DRCT_BL = GridBoard_1.GRID_DRCT.DRCT_BL, DRCT_2F = GridBoard_1.GRID_DRCT.DRCT_2F, DRCT_2B = GridBoard_1.GRID_DRCT.DRCT_2B, DRCT_2R = GridBoard_1.GRID_DRCT.DRCT_2R, DRCT_2L = GridBoard_1.GRID_DRCT.DRCT_2L, DRCT_2FR = GridBoard_1.GRID_DRCT.DRCT_2FR, DRCT_2FL = GridBoard_1.GRID_DRCT.DRCT_2FL, DRCT_2BR = GridBoard_1.GRID_DRCT.DRCT_2BR, DRCT_2BL = GridBoard_1.GRID_DRCT.DRCT_2BL, DRCT_FFR = GridBoard_1.GRID_DRCT.DRCT_FFR, DRCT_FFL = GridBoard_1.GRID_DRCT.DRCT_FFL, DRCT_BBR = GridBoard_1.GRID_DRCT.DRCT_BBR, DRCT_BBL = GridBoard_1.GRID_DRCT.DRCT_BBL, DRCT_FRR = GridBoard_1.GRID_DRCT.DRCT_FRR, DRCT_FLL = GridBoard_1.GRID_DRCT.DRCT_FLL, DRCT_BRR = GridBoard_1.GRID_DRCT.DRCT_BRR, DRCT_BLL = GridBoard_1.GRID_DRCT.DRCT_BLL;
/** 一般Relati路徑 */
var NORMAL_ROUTES = [
    DRCT_F, DRCT_B, DRCT_R, DRCT_L,
    DRCT_FR, DRCT_FL, DRCT_BR, DRCT_BL
];
/** 遠程Relati路徑 */
var REMOTE_NORMAL_ROUTES = [
    [DRCT_2F, DRCT_F],
    [DRCT_2B, DRCT_B],
    [DRCT_2R, DRCT_R],
    [DRCT_2L, DRCT_L],
    [DRCT_2FR, DRCT_FR],
    [DRCT_2FL, DRCT_FL],
    [DRCT_2BR, DRCT_BR],
    [DRCT_2BL, DRCT_BL]
];
/** 遠程穩定Relati路徑 */
var REMOTE_STABLE_ROUTES = [
    [DRCT_FFR, DRCT_2F, DRCT_F],
    [DRCT_FFR, DRCT_FR, DRCT_F],
    [DRCT_FFR, DRCT_FR, DRCT_R],
    [DRCT_FFL, DRCT_2F, DRCT_F],
    [DRCT_FFL, DRCT_FL, DRCT_F],
    [DRCT_FFL, DRCT_FL, DRCT_L],
    [DRCT_BBR, DRCT_2B, DRCT_B],
    [DRCT_BBR, DRCT_BR, DRCT_B],
    [DRCT_BBR, DRCT_BR, DRCT_R],
    [DRCT_BBL, DRCT_2B, DRCT_B],
    [DRCT_BBL, DRCT_BL, DRCT_B],
    [DRCT_BBL, DRCT_BL, DRCT_L],
    [DRCT_FRR, DRCT_FR, DRCT_F],
    [DRCT_FRR, DRCT_2R, DRCT_R],
    [DRCT_FRR, DRCT_FR, DRCT_R],
    [DRCT_FLL, DRCT_FL, DRCT_F],
    [DRCT_FLL, DRCT_2L, DRCT_L],
    [DRCT_FLL, DRCT_FL, DRCT_L],
    [DRCT_BRR, DRCT_BR, DRCT_B],
    [DRCT_BRR, DRCT_2R, DRCT_R],
    [DRCT_BRR, DRCT_BR, DRCT_R],
    [DRCT_BLL, DRCT_BL, DRCT_B],
    [DRCT_BLL, DRCT_2L, DRCT_L],
    [DRCT_BLL, DRCT_BL, DRCT_L]
];
/** 使用一般Relati路徑類型 */
exports.BY_NORMAL_RELATI = 0;
/** 使用通用Relati路徑類型 */
exports.BY_COMMON_RELATI = 1;
/**
 * 取得Relati路徑
 * @param grid 棋盤格
 * @param status 狀態
 * @param routeType 路徑類型
 */
function getRelatiRoutesBy(grid, status, routeType) {
    var routes = [];
    switch (routeType) {
        case exports.BY_COMMON_RELATI:
            for (var i = 0; i < 24; i++) {
                var targetGrid = grid.getGrid(REMOTE_STABLE_ROUTES[i][0]);
                var middleGrid1 = grid.getGrid(REMOTE_STABLE_ROUTES[i][1]);
                var middleGrid2 = grid.getGrid(REMOTE_STABLE_ROUTES[i][2]);
                if (targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid1.isSpace &&
                    middleGrid2.isSpace)
                    routes.push(targetGrid);
            }
            for (var i = 0; i < 8; i++) {
                var targetGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][0]);
                var middleGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][1]);
                if (targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid.isSpace)
                    routes.push(targetGrid);
            }
        case exports.BY_NORMAL_RELATI:
            for (var i = 0; i < 8; i++) {
                var targetGrid = grid.getGrid(NORMAL_ROUTES[i]);
                if (targetGrid &&
                    targetGrid.is(status))
                    routes.push(targetGrid);
            }
    }
    return routes;
}
exports.getRelatiRoutesBy = getRelatiRoutesBy;
/**
 * 是否有Relati路徑
 * @param grid 棋盤格
 * @param status 狀態
 * @param routeType 路徑類型
 */
function hasRelatiRoutesBy(grid, status, routeType) {
    switch (routeType) {
        case exports.BY_COMMON_RELATI:
            for (var i = 0; i < 24; i++) {
                var targetGrid = grid.getGrid(REMOTE_STABLE_ROUTES[i][0]);
                var middleGrid1 = grid.getGrid(REMOTE_STABLE_ROUTES[i][1]);
                var middleGrid2 = grid.getGrid(REMOTE_STABLE_ROUTES[i][2]);
                if (targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid1.isSpace &&
                    middleGrid2.isSpace)
                    return true;
            }
            for (var i = 0; i < 8; i++) {
                var targetGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][0]);
                var middleGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][1]);
                if (targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid.isSpace)
                    return true;
            }
        case exports.BY_NORMAL_RELATI:
            for (var i = 0; i < 8; i++) {
                var targetGrid = grid.getGrid(NORMAL_ROUTES[i]);
                if (targetGrid &&
                    targetGrid.is(status))
                    return true;
            }
    }
    return false;
}
exports.hasRelatiRoutesBy = hasRelatiRoutesBy;
/**
 * 追溯Relati路徑
 * @param grid 棋盤格
 * @param status 狀態
 * @param routeType 路徑類型
 */
function getRelatiTracesBy(grid, status, routeType) {
    var routes = [];
    switch (routeType) {
        case exports.BY_COMMON_RELATI:
            for (var i = 0; i < 24; i++) {
                var targetGrid = grid.getGrid(REMOTE_STABLE_ROUTES[i][0]);
                var middleGrid1 = grid.getGrid(REMOTE_STABLE_ROUTES[i][1]);
                var middleGrid2 = grid.getGrid(REMOTE_STABLE_ROUTES[i][2]);
                if (targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid1.isSpace &&
                    middleGrid2.isSpace)
                    routes.push([middleGrid2, middleGrid1, targetGrid]);
            }
            for (var i = 0; i < 8; i++) {
                var targetGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][0]);
                var middleGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][1]);
                if (targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid.isSpace)
                    routes.push([middleGrid, targetGrid]);
            }
        case exports.BY_NORMAL_RELATI:
            for (var i = 0; i < 8; i++) {
                var targetGrid = grid.getGrid(NORMAL_ROUTES[i]);
                if (targetGrid &&
                    targetGrid.is(status))
                    routes.push([targetGrid]);
            }
    }
    return routes;
}
exports.getRelatiTracesBy = getRelatiTracesBy;


/***/ }),

/***/ "./ts/core/SVGProcess.ts":
/*!*******************************!*\
  !*** ./ts/core/SVGProcess.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SVGNS = "http://www.w3.org/2000/svg";
/**
 * 建立SVG元素
 * @param tagName SVG標籤名稱
 * @param attribute SVG屬性
 */
function createSVG(tagName, attribute) {
    var element = document.createElementNS(SVGNS, tagName);
    if (attribute)
        updateSVG(element, attribute);
    return element;
}
exports.createSVG = createSVG;
/**
 * 變更SVG屬性
 * @param element SVG元素
 * @param attribute SVG屬性
 */
function updateSVG(element, attribute) {
    for (var name_1 in attribute) {
        element.setAttribute(name_1, attribute[name_1]);
    }
}
exports.updateSVG = updateSVG;


/***/ }),

/***/ "./ts/main/Page.ts":
/*!*************************!*\
  !*** ./ts/main/Page.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Page;
(function (Page) {
    function switchTo(pageName) {
        location.hash = pageName;
    }
    Page.switchTo = switchTo;
    function switchToPage() {
        var activePage;
        activePage = document.getElementsByClassName("page active")[0];
        if (activePage)
            activePage.classList.remove("active");
        activePage = document.querySelector(location.hash + "-page");
        if (activePage)
            activePage.classList.add("active");
    }
    window.addEventListener("hashchange", switchToPage);
    switchToPage();
})(Page = exports.Page || (exports.Page = {}));


/***/ }),

/***/ "./ts/page/GamePage.ts":
/*!*****************************!*\
  !*** ./ts/page/GamePage.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./ts/page/HelpPage.ts":
/*!*****************************!*\
  !*** ./ts/page/HelpPage.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./ts/page/MainPage.ts":
/*!*****************************!*\
  !*** ./ts/page/MainPage.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Page_1 = __webpack_require__(/*! ../main/Page */ "./ts/main/Page.ts");
var toGamePageButton = document.getElementById("main-to-game");
var toHelpPageButton = document.getElementById("main-to-help");
toGamePageButton.addEventListener("click", function (event) { return Page_1.Page.switchTo("game"); });
toHelpPageButton.addEventListener("click", function (event) { return Page_1.Page.switchTo("help"); });


/***/ }),

/***/ "./ts/view/RelatiBoardView.ts":
/*!************************************!*\
  !*** ./ts/view/RelatiBoardView.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SVGProcess_1 = __webpack_require__(/*! ../core/SVGProcess */ "./ts/core/SVGProcess.ts");
var RelatiBoard_1 = __webpack_require__(/*! ../core/RelatiBoard */ "./ts/core/RelatiBoard.ts");
var RelatiBoardView = /** @class */ (function () {
    function RelatiBoardView(board, container) {
        this.board = board;
        this.container = container;
        this.gridViews = [];
        this.body = SVGProcess_1.createSVG("svg");
        this.background = SVGProcess_1.createSVG("g");
        SVGProcess_1.updateSVG(this.body, {
            "width": "" + board.width * 5,
            "height": "" + board.height * 5
        });
        var linesContainer = SVGProcess_1.createSVG("g");
        var lineAttr = {
            "d": "",
            "stroke": "#888",
            "stroke-width": "0.4"
        };
        for (var x = 1; x < board.width; x++) {
            lineAttr["d"] = "M " + x * 5 + " 0 V " + board.height * 5;
            var line = SVGProcess_1.createSVG("path", lineAttr);
            linesContainer.appendChild(line);
        }
        for (var y = 1; y < board.height; y++) {
            lineAttr["d"] = "M 0 " + y * 5 + " H " + board.width * 5;
            var line = SVGProcess_1.createSVG("path", lineAttr);
            linesContainer.appendChild(line);
        }
        container.appendChild(this.body);
        this.body.appendChild(this.background);
        this.body.appendChild(linesContainer);
        for (var _i = 0, _a = board.grids; _i < _a.length; _i++) {
            var grid = _a[_i];
            var gridView = new RelatiGridView(this, grid);
            this.gridViews.push(gridView);
            this.body.appendChild(gridView.body);
        }
        this.resize();
        window.addEventListener("resize", this.resize.bind(this));
    }
    RelatiBoardView.prototype.resize = function () {
        var _a = this, container = _a.container, _b = _a.board, width = _b.width, height = _b.height;
        this.body.style.transform = "scale(" + Math.min(container.clientWidth / (width * 5), container.clientHeight / (height * 5)) * 0.95 + ")";
    };
    RelatiBoardView.prototype.update = function () {
        for (var i = 0; i < this.gridViews.length; i++) {
            var gridView = this.gridViews[i];
            gridView.update();
        }
    };
    RelatiBoardView.prototype.removeBackground = function () {
        var background = this.background;
        var childCount = background.childNodes.length;
        while (childCount-- > 0)
            background.removeChild(background.childNodes[0]);
    };
    return RelatiBoardView;
}());
exports.RelatiBoardView = RelatiBoardView;
var RelatiGridView = /** @class */ (function () {
    function RelatiGridView(boardView, grid) {
        this.boardView = boardView;
        this.grid = grid;
        this.gridBody = 0;
        this.body = SVGProcess_1.createSVG("g");
        this.gridBody = grid.body;
    }
    RelatiGridView.prototype.update = function () {
        var grid = this.grid;
        if (this.gridBody === grid.body)
            return;
        var symbolAttr = {
            "d": "",
            "fill": "none",
            "stroke": "",
            "stroke-width": "0.6"
        };
        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;
        switch (grid.body & 7) {
            case RelatiBoard_1.RELATI_SYMBOL_N: {
                var childCount = this.body.childNodes.length;
                while (childCount-- > 0)
                    this.body.removeChild(this.body.childNodes[0]);
                break;
            }
            case RelatiBoard_1.RELATI_SYMBOL_O: {
                symbolAttr["d"] = ("M " + (srtX + 1.5) + " " + (srtY + 1.5) + " " +
                    "m 0 -1.5 " +
                    "a 1.5 1.5 0 0 1, 0 3 " +
                    "a 1.5 1.5 0 0 1, 0 -3");
                symbolAttr["stroke"] = "crimson";
                break;
            }
            case RelatiBoard_1.RELATI_SYMBOL_X: {
                symbolAttr["d"] = ("M " + srtX + " " + srtY + " L " + endX + " " + endY + " " +
                    ("M " + endX + " " + srtY + " L " + srtX + " " + endY));
                symbolAttr["stroke"] = "royalblue";
                break;
            }
        }
        if (!this.gridBody) {
            if (!grid.isSpace) {
                if (grid.is(RelatiBoard_1.RELATI_LAUNCHER)) {
                    symbolAttr["stroke-width"] = "1.2";
                    this.body.appendChild(SVGProcess_1.createSVG("path", symbolAttr));
                    symbolAttr["stroke-width"] = "0.6";
                    symbolAttr["stroke"] = "#f2f2f2";
                    this.body.appendChild(SVGProcess_1.createSVG("path", symbolAttr));
                }
                else if (grid.is(RelatiBoard_1.RELATI_REPEATER)) {
                    this.body.appendChild(SVGProcess_1.createSVG("path", symbolAttr));
                }
                else {
                    symbolAttr["stroke"] = "#666";
                    this.body.appendChild(SVGProcess_1.createSVG("path", symbolAttr));
                }
            }
        }
        else if (!grid.is(RelatiBoard_1.RELATI_LAUNCHER)) {
            var color = symbolAttr["stroke"];
            if (!grid.is(RelatiBoard_1.RELATI_REPEATER))
                color = "#666";
            var childCount = this.body.childNodes.length;
            while (childCount-- > 0)
                SVGProcess_1.updateSVG(this.body.childNodes[childCount], { "stroke": color });
        }
        this.gridBody = grid.body;
    };
    return RelatiGridView;
}());
exports.RelatiGridView = RelatiGridView;


/***/ }),

/***/ "./ts/view/RelatiEffectView.ts":
/*!*************************************!*\
  !*** ./ts/view/RelatiEffectView.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SVGProcess_1 = __webpack_require__(/*! ../core/SVGProcess */ "./ts/core/SVGProcess.ts");
var RelatiBoard_1 = __webpack_require__(/*! ../core/RelatiBoard */ "./ts/core/RelatiBoard.ts");
var RelatiRoutes_1 = __webpack_require__(/*! ../core/RelatiRoutes */ "./ts/core/RelatiRoutes.ts");
var RELATI_EFFECTED = 128;
var SYMBOL_COLOR = ["#666", "crimson", "royalblue"];
var dotAttr = {
    "cx": "",
    "cy": "",
    "r": "0.5",
    "fill": ""
};
function createDot(x, y, color) {
    dotAttr["cx"] = "" + (x * 5 + 2.5);
    dotAttr["cy"] = "" + (y * 5 + 2.5);
    dotAttr["fill"] = color;
    return SVGProcess_1.createSVG("circle", dotAttr);
}
function createHintEffect(grids, symbol, view) {
    var color = SYMBOL_COLOR[symbol];
    for (var _i = 0, grids_1 = grids; _i < grids_1.length; _i++) {
        var _a = grids_1[_i], x = _a.x, y = _a.y;
        view.appendChild(createDot(x, y, color));
    }
}
exports.createHintEffect = createHintEffect;
var lineAttr = {
    "d": "",
    "stroke-width": "0.5",
    "stroke": "",
    "fill": "none",
    "class": "relati-effect-line"
};
function createLine(source, traces, color, view) {
    lineAttr["d"] = "M " + (source.x * 5 + 2.5) + " " + (source.y * 5 + 2.5);
    lineAttr["stroke"] = color;
    for (var _i = 0, traces_1 = traces; _i < traces_1.length; _i++) {
        var grid = traces_1[_i];
        lineAttr["d"] += " L " + (grid.x * 5 + 2.5) + " " + (grid.y * 5 + 2.5);
    }
    var path = SVGProcess_1.createSVG("path", lineAttr);
    view.appendChild(path);
}
function createRelatiLine(grid, color, view, routeType, turn, game) {
    if (grid.is(RELATI_EFFECTED) || game.turn > turn)
        return;
    grid.gain(RELATI_EFFECTED);
    setTimeout(function () {
        if (game.turn > turn)
            return;
        var traces = RelatiRoutes_1.getRelatiTracesBy(grid, grid.symbol | RelatiBoard_1.RELATI_RECEIVER, routeType);
        for (var _i = 0, traces_2 = traces; _i < traces_2.length; _i++) {
            var grids = traces_2[_i];
            var targetGrid = grids[grids.length - 1];
            if (!targetGrid.is(RELATI_EFFECTED)) {
                createLine(grid, grids, color, view);
                createRelatiLine(targetGrid, color, view, routeType, turn, game);
            }
        }
    }, 250);
}
function createRelatiEffect(symbol, view, game) {
    var grids = game.board.grids, routeType = game.routeType, turn = game.turn;
    var color = SYMBOL_COLOR[symbol];
    for (var _i = 0, grids_2 = grids; _i < grids_2.length; _i++) {
        var grid = grids_2[_i];
        grid.lost(RELATI_EFFECTED);
    }
    for (var _a = 0, grids_3 = grids; _a < grids_3.length; _a++) {
        var grid = grids_3[_a];
        if (grid.is(RelatiBoard_1.RELATI_LAUNCHER) && grid.symbol == symbol) {
            createRelatiLine(grid, color, view, routeType, turn, game);
        }
    }
}
exports.createRelatiEffect = createRelatiEffect;


/***/ })

/******/ });
//# sourceMappingURL=index.js.map
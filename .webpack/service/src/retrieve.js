(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "../../../src/retrieve.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../src/retrieve.js":
/*!************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/src/retrieve.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "../../source-map-support/register.js");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var file_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! file-type */ "../../file-type/index.js");
/* harmony import */ var file_type__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(file_type__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sharp */ "../../sharp/lib/index.js");
/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sharp__WEBPACK_IMPORTED_MODULE_2__);




exports.handler = async (event, context) => {
  // const sharp = require('sharp')
  // const fileType = require('file-type')
  const s3Client = __webpack_require__(/*! ./s3client */ "../../../src/s3client.js"); // import s3Client from './s3client'


  const {
    jsonResponse,
    imageResponse
  } = __webpack_require__(/*! ./utils */ "../../../src/utils.js");

  const {
    bucketName
  } = process.env;

  if (!event.queryStringParameters || !event.queryStringParameters.objectKey) {
    return jsonResponse(400, {
      message: 'The objectKey query param is required'
    });
  } else {
    const {
      objectKey
    } = event.queryStringParameters;

    try {
      const {
        Body: body
      } = await s3Client.getFile(objectKey); // console.log('S3RESP', body)
      // console.log('WAIT')

      if (event.queryStringParameters.format) {
        return jsonResponse(200, {
          message: 'format supplied'
        });
      } else {
        // return body
        return imageResponse(200, new Buffer(body).toString('base64'), 'png');
      }
    } catch (e) {
      console.log('error from retrieve', e);
      return jsonResponse(400, {
        message: 'an error'
      });
    }
  }
};

/***/ }),

/***/ "../../../src/s3client.js":
/*!************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/src/s3client.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "../../source-map-support/register.js");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);


const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");

const {
  bucketName
} = process.env;
const s3 = new AWS.S3({});

const {
  jsonResponse,
  imgResponse
} = __webpack_require__(/*! ./utils */ "../../../src/utils.js");
/**
 * @param {data} image data
 * @param {key} filename
 * @param {mime} mimetype
 */


const uploadFile = async (data, key, mime) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: data,
    ContentType: mime
  };

  try {
    const s3Response = await s3.putObject(params).promise();
    return s3Response;
  } catch (e) {
    console.log('e', e);
    return jsonResponse(400, {
      message: e
    });
  }
};

const getFile = async key => {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  const s3Response = await s3.getObject(params).promise();
  console.log('s3error from client', s3Response);
  return s3Response; // try {
  //   const s3Response = await s3.getObject(params).promise()
  //   // console.log('s3r', s3Response)
  //   return s3Response
  // } catch (e) {
  //   console.error('s3err', e.code)
  //   return (jsonResponse(400, { message: e }))
  // }
};

module.exports = {
  uploadFile,
  getFile
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "../../webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "../../../src/utils.js":
/*!*********************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/src/utils.js ***!
  \*********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "../../source-map-support/register.js");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);


const jsonResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
};

const imageResponse = (statusCode, body, type) => {
  return {
    statusCode,
    headers: {
      'Content-Type': `image/${type}`
    },
    isBase64Encoded: true,
    body
  };
};

module.exports = {
  jsonResponse,
  imageResponse
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "../../webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "../../color-convert/conversions.js":
/*!**************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/color-convert/conversions.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(/*! color-name */ "../../color-name/index.js");

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ "../../color-convert/index.js":
/*!********************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/color-convert/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(/*! ./conversions */ "../../color-convert/conversions.js");
var route = __webpack_require__(/*! ./route */ "../../color-convert/route.js");

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ "../../color-convert/route.js":
/*!********************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/color-convert/route.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(/*! ./conversions */ "../../color-convert/conversions.js");

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ "../../color-name/index.js":
/*!*****************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/color-name/index.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ "../../color-string/index.js":
/*!*******************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/color-string/index.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var colorNames = __webpack_require__(/*! color-name */ "../../color-name/index.js");
var swizzle = __webpack_require__(/*! simple-swizzle */ "../../simple-swizzle/index.js");

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}


/***/ }),

/***/ "../../color/index.js":
/*!************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/color/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colorString = __webpack_require__(/*! color-string */ "../../color-string/index.js");
var convert = __webpack_require__(/*! color-convert */ "../../color-convert/index.js");

var _slice = [].slice;

var skippedModels = [
	// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// gray conflicts with some method names, and has its own method defined.
	'gray',

	// shouldn't really be in color-convert either...
	'hex'
];

var hashedModelKeys = {};
Object.keys(convert).forEach(function (model) {
	hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in convert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (obj == null) { // eslint-disable-line no-eq-null,eqeqeq
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = convert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = convert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [
			(obj >> 16) & 0xFF,
			(obj >> 8) & 0xFF,
			obj & 0xFF
		];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = convert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = convert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function () {
		return this.string();
	},

	toJSON: function () {
		return this[this.model]();
	},

	string: function (places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function (places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function () {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function () {
		var result = {};
		var channels = convert[this.model].channels;
		var labels = convert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function () {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function () {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function (places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function (val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return convert[this.model].keyword(this.color);
	},

	hex: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function () {
		var rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	isDark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	isLight: function () {
		return !this.isDark();
	},

	negate: function () {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function (ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function (ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function (ratio) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	},

	opaquer: function (ratio) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	},

	rotate: function (degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function (mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		if (!mixinColor || !mixinColor.rgb) {
			throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
		}
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue(),
				color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(convert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = convert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

module.exports = Color;


/***/ }),

/***/ "../../detect-libc/lib/detect-libc.js":
/*!****************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/detect-libc/lib/detect-libc.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var platform = __webpack_require__(/*! os */ "os").platform();
var spawnSync = __webpack_require__(/*! child_process */ "child_process").spawnSync;
var readdirSync = __webpack_require__(/*! fs */ "fs").readdirSync;

var GLIBC = 'glibc';
var MUSL = 'musl';

var spawnOptions = {
  encoding: 'utf8',
  env: process.env
};

if (!spawnSync) {
  spawnSync = function () {
    return { status: 126, stdout: '', stderr: '' };
  };
}

function contains (needle) {
  return function (haystack) {
    return haystack.indexOf(needle) !== -1;
  };
}

function versionFromMuslLdd (out) {
  return out.split(/[\r\n]+/)[1].trim().split(/\s/)[1];
}

function safeReaddirSync (path) {
  try {
    return readdirSync(path);
  } catch (e) {}
  return [];
}

var family = '';
var version = '';
var method = '';

if (platform === 'linux') {
  // Try getconf
  var glibc = spawnSync('getconf', ['GNU_LIBC_VERSION'], spawnOptions);
  if (glibc.status === 0) {
    family = GLIBC;
    version = glibc.stdout.trim().split(' ')[1];
    method = 'getconf';
  } else {
    // Try ldd
    var ldd = spawnSync('ldd', ['--version'], spawnOptions);
    if (ldd.status === 0 && ldd.stdout.indexOf(MUSL) !== -1) {
      family = MUSL;
      version = versionFromMuslLdd(ldd.stdout);
      method = 'ldd';
    } else if (ldd.status === 1 && ldd.stderr.indexOf(MUSL) !== -1) {
      family = MUSL;
      version = versionFromMuslLdd(ldd.stderr);
      method = 'ldd';
    } else {
      // Try filesystem (family only)
      var lib = safeReaddirSync('/lib');
      if (lib.some(contains('-linux-gnu'))) {
        family = GLIBC;
        method = 'filesystem';
      } else if (lib.some(contains('libc.musl-'))) {
        family = MUSL;
        method = 'filesystem';
      } else if (lib.some(contains('ld-musl-'))) {
        family = MUSL;
        method = 'filesystem';
      } else {
        var usrSbin = safeReaddirSync('/usr/sbin');
        if (usrSbin.some(contains('glibc'))) {
          family = GLIBC;
          method = 'filesystem';
        }
      }
    }
  }
}

var isNonGlibcLinux = (family !== '' && family !== GLIBC);

module.exports = {
  GLIBC: GLIBC,
  MUSL: MUSL,
  family: family,
  version: version,
  method: method,
  isNonGlibcLinux: isNonGlibcLinux
};


/***/ }),

/***/ "../../file-type/index.js":
/*!****************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/file-type/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const {
	multiByteIndexOf,
	stringToBytes,
	readUInt64LE,
	tarHeaderChecksumMatches,
	uint8ArrayUtf8ByteString
} = __webpack_require__(/*! ./util */ "../../file-type/util.js");
const supported = __webpack_require__(/*! ./supported */ "../../file-type/supported.js");

const xpiZipFilename = stringToBytes('META-INF/mozilla.rsa');
const oxmlContentTypes = stringToBytes('[Content_Types].xml');
const oxmlRels = stringToBytes('_rels/.rels');

const fileType = input => {
	if (!(input instanceof Uint8Array || input instanceof ArrayBuffer || Buffer.isBuffer(input))) {
		throw new TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`Buffer\` or \`ArrayBuffer\`, got \`${typeof input}\``);
	}

	const buffer = input instanceof Uint8Array ? input : new Uint8Array(input);

	if (!(buffer && buffer.length > 1)) {
		return;
	}

	const check = (header, options) => {
		options = {
			offset: 0,
			...options
		};

		for (let i = 0; i < header.length; i++) {
			// If a bitmask is set
			if (options.mask) {
				// If header doesn't equal `buf` with bits masked off
				if (header[i] !== (options.mask[i] & buffer[i + options.offset])) {
					return false;
				}
			} else if (header[i] !== buffer[i + options.offset]) {
				return false;
			}
		}

		return true;
	};

	const checkString = (header, options) => check(stringToBytes(header), options);

	if (check([0xFF, 0xD8, 0xFF])) {
		return {
			ext: 'jpg',
			mime: 'image/jpeg'
		};
	}

	if (check([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])) {
		// APNG format (https://wiki.mozilla.org/APNG_Specification)
		// 1. Find the first IDAT (image data) chunk (49 44 41 54)
		// 2. Check if there is an "acTL" chunk before the IDAT one (61 63 54 4C)

		// Offset calculated as follows:
		// - 8 bytes: PNG signature
		// - 4 (length) + 4 (chunk type) + 13 (chunk data) + 4 (CRC): IHDR chunk
		const startIndex = 33;
		const firstImageDataChunkIndex = buffer.findIndex((el, i) => i >= startIndex && buffer[i] === 0x49 && buffer[i + 1] === 0x44 && buffer[i + 2] === 0x41 && buffer[i + 3] === 0x54);
		const sliced = buffer.subarray(startIndex, firstImageDataChunkIndex);

		if (sliced.findIndex((el, i) => sliced[i] === 0x61 && sliced[i + 1] === 0x63 && sliced[i + 2] === 0x54 && sliced[i + 3] === 0x4C) >= 0) {
			return {
				ext: 'apng',
				mime: 'image/apng'
			};
		}

		return {
			ext: 'png',
			mime: 'image/png'
		};
	}

	if (check([0x47, 0x49, 0x46])) {
		return {
			ext: 'gif',
			mime: 'image/gif'
		};
	}

	if (check([0x57, 0x45, 0x42, 0x50], {offset: 8})) {
		return {
			ext: 'webp',
			mime: 'image/webp'
		};
	}

	if (check([0x46, 0x4C, 0x49, 0x46])) {
		return {
			ext: 'flif',
			mime: 'image/flif'
		};
	}

	// `cr2`, `orf`, and `arw` need to be before `tif` check
	if (
		(check([0x49, 0x49, 0x2A, 0x0]) || check([0x4D, 0x4D, 0x0, 0x2A])) &&
		check([0x43, 0x52], {offset: 8})
	) {
		return {
			ext: 'cr2',
			mime: 'image/x-canon-cr2'
		};
	}

	if (check([0x49, 0x49, 0x52, 0x4F, 0x08, 0x00, 0x00, 0x00, 0x18])) {
		return {
			ext: 'orf',
			mime: 'image/x-olympus-orf'
		};
	}

	if (
		check([0x49, 0x49, 0x2A, 0x00]) &&
		(check([0x10, 0xFB, 0x86, 0x01], {offset: 4}) || check([0x08, 0x00, 0x00, 0x00], {offset: 4})) &&
		// This pattern differentiates ARW from other TIFF-ish file types:
		check([0x00, 0xFE, 0x00, 0x04, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x03, 0x01], {offset: 9})
	) {
		return {
			ext: 'arw',
			mime: 'image/x-sony-arw'
		};
	}

	if (
		check([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00]) &&
		(check([0x2D, 0x00, 0xFE, 0x00], {offset: 8}) ||
		check([0x27, 0x00, 0xFE, 0x00], {offset: 8}))
	) {
		return {
			ext: 'dng',
			mime: 'image/x-adobe-dng'
		};
	}

	if (
		check([0x49, 0x49, 0x2A, 0x00]) &&
		check([0x1C, 0x00, 0xFE, 0x00], {offset: 8})
	) {
		return {
			ext: 'nef',
			mime: 'image/x-nikon-nef'
		};
	}

	if (check([0x49, 0x49, 0x55, 0x00, 0x18, 0x00, 0x00, 0x00, 0x88, 0xE7, 0x74, 0xD8])) {
		return {
			ext: 'rw2',
			mime: 'image/x-panasonic-rw2'
		};
	}

	// `raf` is here just to keep all the raw image detectors together.
	if (checkString('FUJIFILMCCD-RAW')) {
		return {
			ext: 'raf',
			mime: 'image/x-fujifilm-raf'
		};
	}

	if (
		check([0x49, 0x49, 0x2A, 0x0]) ||
		check([0x4D, 0x4D, 0x0, 0x2A])
	) {
		return {
			ext: 'tif',
			mime: 'image/tiff'
		};
	}

	if (check([0x42, 0x4D])) {
		return {
			ext: 'bmp',
			mime: 'image/bmp'
		};
	}

	if (check([0x49, 0x49, 0xBC])) {
		return {
			ext: 'jxr',
			mime: 'image/vnd.ms-photo'
		};
	}

	if (check([0x38, 0x42, 0x50, 0x53])) {
		return {
			ext: 'psd',
			mime: 'image/vnd.adobe.photoshop'
		};
	}

	// Zip-based file formats
	// Need to be before the `zip` check
	const zipHeader = [0x50, 0x4B, 0x3, 0x4];
	if (check(zipHeader)) {
		if (
			check([0x6D, 0x69, 0x6D, 0x65, 0x74, 0x79, 0x70, 0x65, 0x61, 0x70, 0x70, 0x6C, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6F, 0x6E, 0x2F, 0x65, 0x70, 0x75, 0x62, 0x2B, 0x7A, 0x69, 0x70], {offset: 30})
		) {
			return {
				ext: 'epub',
				mime: 'application/epub+zip'
			};
		}

		// Assumes signed `.xpi` from addons.mozilla.org
		if (check(xpiZipFilename, {offset: 30})) {
			return {
				ext: 'xpi',
				mime: 'application/x-xpinstall'
			};
		}

		if (checkString('mimetypeapplication/vnd.oasis.opendocument.text', {offset: 30})) {
			return {
				ext: 'odt',
				mime: 'application/vnd.oasis.opendocument.text'
			};
		}

		if (checkString('mimetypeapplication/vnd.oasis.opendocument.spreadsheet', {offset: 30})) {
			return {
				ext: 'ods',
				mime: 'application/vnd.oasis.opendocument.spreadsheet'
			};
		}

		if (checkString('mimetypeapplication/vnd.oasis.opendocument.presentation', {offset: 30})) {
			return {
				ext: 'odp',
				mime: 'application/vnd.oasis.opendocument.presentation'
			};
		}

		// The docx, xlsx and pptx file types extend the Office Open XML file format:
		// https://en.wikipedia.org/wiki/Office_Open_XML_file_formats
		// We look for:
		// - one entry named '[Content_Types].xml' or '_rels/.rels',
		// - one entry indicating specific type of file.
		// MS Office, OpenOffice and LibreOffice may put the parts in different order, so the check should not rely on it.
		let zipHeaderIndex = 0; // The first zip header was already found at index 0
		let oxmlFound = false;
		let type;

		do {
			const offset = zipHeaderIndex + 30;

			if (!oxmlFound) {
				oxmlFound = (check(oxmlContentTypes, {offset}) || check(oxmlRels, {offset}));
			}

			if (!type) {
				if (checkString('word/', {offset})) {
					type = {
						ext: 'docx',
						mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
					};
				} else if (checkString('ppt/', {offset})) {
					type = {
						ext: 'pptx',
						mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
					};
				} else if (checkString('xl/', {offset})) {
					type = {
						ext: 'xlsx',
						mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					};
				}
			}

			if (oxmlFound && type) {
				return type;
			}

			zipHeaderIndex = multiByteIndexOf(buffer, zipHeader, offset);
		} while (zipHeaderIndex >= 0);

		// No more zip parts available in the buffer, but maybe we are almost certain about the type?
		if (type) {
			return type;
		}
	}

	if (
		check([0x50, 0x4B]) &&
		(buffer[2] === 0x3 || buffer[2] === 0x5 || buffer[2] === 0x7) &&
		(buffer[3] === 0x4 || buffer[3] === 0x6 || buffer[3] === 0x8)
	) {
		return {
			ext: 'zip',
			mime: 'application/zip'
		};
	}

	if (
		check([0x30, 0x30, 0x30, 0x30, 0x30, 0x30], {offset: 148, mask: [0xF8, 0xF8, 0xF8, 0xF8, 0xF8, 0xF8]}) && // Valid tar checksum
		tarHeaderChecksumMatches(buffer)
	) {
		return {
			ext: 'tar',
			mime: 'application/x-tar'
		};
	}

	if (
		check([0x52, 0x61, 0x72, 0x21, 0x1A, 0x7]) &&
		(buffer[6] === 0x0 || buffer[6] === 0x1)
	) {
		return {
			ext: 'rar',
			mime: 'application/x-rar-compressed'
		};
	}

	if (check([0x1F, 0x8B, 0x8])) {
		return {
			ext: 'gz',
			mime: 'application/gzip'
		};
	}

	if (check([0x42, 0x5A, 0x68])) {
		return {
			ext: 'bz2',
			mime: 'application/x-bzip2'
		};
	}

	if (check([0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C])) {
		return {
			ext: '7z',
			mime: 'application/x-7z-compressed'
		};
	}

	if (check([0x78, 0x01])) {
		return {
			ext: 'dmg',
			mime: 'application/x-apple-diskimage'
		};
	}

	// `mov` format variants
	if (
		check([0x66, 0x72, 0x65, 0x65], {offset: 4}) || // `free`
		check([0x6D, 0x64, 0x61, 0x74], {offset: 4}) || // `mdat` MJPEG
		check([0x6D, 0x6F, 0x6F, 0x76], {offset: 4}) || // `moov`
		check([0x77, 0x69, 0x64, 0x65], {offset: 4}) // `wide`
	) {
		return {
			ext: 'mov',
			mime: 'video/quicktime'
		};
	}

	// File Type Box (https://en.wikipedia.org/wiki/ISO_base_media_file_format)
	// It's not required to be first, but it's recommended to be. Almost all ISO base media files start with `ftyp` box.
	// `ftyp` box must contain a brand major identifier, which must consist of ISO 8859-1 printable characters.
	// Here we check for 8859-1 printable characters (for simplicity, it's a mask which also catches one non-printable character).
	if (
		checkString('ftyp', {offset: 4}) &&
		(buffer[8] & 0x60) !== 0x00 // Brand major, first character ASCII?
	) {
		// They all can have MIME `video/mp4` except `application/mp4` special-case which is hard to detect.
		// For some cases, we're specific, everything else falls to `video/mp4` with `mp4` extension.
		const brandMajor = uint8ArrayUtf8ByteString(buffer, 8, 12).replace('\0', ' ').trim();
		switch (brandMajor) {
			case 'mif1':
				return {ext: 'heic', mime: 'image/heif'};
			case 'msf1':
				return {ext: 'heic', mime: 'image/heif-sequence'};
			case 'heic': case 'heix':
				return {ext: 'heic', mime: 'image/heic'};
			case 'hevc': case 'hevx':
				return {ext: 'heic', mime: 'image/heic-sequence'};
			case 'qt':
				return {ext: 'mov', mime: 'video/quicktime'};
			case 'M4V': case 'M4VH': case 'M4VP':
				return {ext: 'm4v', mime: 'video/x-m4v'};
			case 'M4P':
				return {ext: 'm4p', mime: 'video/mp4'};
			case 'M4B':
				return {ext: 'm4b', mime: 'audio/mp4'};
			case 'M4A':
				return {ext: 'm4a', mime: 'audio/x-m4a'};
			case 'F4V':
				return {ext: 'f4v', mime: 'video/mp4'};
			case 'F4P':
				return {ext: 'f4p', mime: 'video/mp4'};
			case 'F4A':
				return {ext: 'f4a', mime: 'audio/mp4'};
			case 'F4B':
				return {ext: 'f4b', mime: 'audio/mp4'};
			default:
				if (brandMajor.startsWith('3g')) {
					if (brandMajor.startsWith('3g2')) {
						return {ext: '3g2', mime: 'video/3gpp2'};
					}

					return {ext: '3gp', mime: 'video/3gpp'};
				}

				return {ext: 'mp4', mime: 'video/mp4'};
		}
	}

	if (check([0x4D, 0x54, 0x68, 0x64])) {
		return {
			ext: 'mid',
			mime: 'audio/midi'
		};
	}

	// https://github.com/threatstack/libmagic/blob/master/magic/Magdir/matroska
	if (check([0x1A, 0x45, 0xDF, 0xA3])) {
		const sliced = buffer.subarray(4, 4 + 4096);
		const idPos = sliced.findIndex((el, i, arr) => arr[i] === 0x42 && arr[i + 1] === 0x82);

		if (idPos !== -1) {
			const docTypePos = idPos + 3;
			const findDocType = type => [...type].every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));

			if (findDocType('matroska')) {
				return {
					ext: 'mkv',
					mime: 'video/x-matroska'
				};
			}

			if (findDocType('webm')) {
				return {
					ext: 'webm',
					mime: 'video/webm'
				};
			}
		}
	}

	// RIFF file format which might be AVI, WAV, QCP, etc
	if (check([0x52, 0x49, 0x46, 0x46])) {
		if (check([0x41, 0x56, 0x49], {offset: 8})) {
			return {
				ext: 'avi',
				mime: 'video/vnd.avi'
			};
		}

		if (check([0x57, 0x41, 0x56, 0x45], {offset: 8})) {
			return {
				ext: 'wav',
				mime: 'audio/vnd.wave'
			};
		}

		// QLCM, QCP file
		if (check([0x51, 0x4C, 0x43, 0x4D], {offset: 8})) {
			return {
				ext: 'qcp',
				mime: 'audio/qcelp'
			};
		}
	}

	// ASF_Header_Object first 80 bytes
	if (check([0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11, 0xA6, 0xD9])) {
		// Search for header should be in first 1KB of file.

		let offset = 30;
		do {
			const objectSize = readUInt64LE(buffer, offset + 16);
			if (check([0x91, 0x07, 0xDC, 0xB7, 0xB7, 0xA9, 0xCF, 0x11, 0x8E, 0xE6, 0x00, 0xC0, 0x0C, 0x20, 0x53, 0x65], {offset})) {
				// Sync on Stream-Properties-Object (B7DC0791-A9B7-11CF-8EE6-00C00C205365)
				if (check([0x40, 0x9E, 0x69, 0xF8, 0x4D, 0x5B, 0xCF, 0x11, 0xA8, 0xFD, 0x00, 0x80, 0x5F, 0x5C, 0x44, 0x2B], {offset: offset + 24})) {
					// Found audio:
					return {
						ext: 'wma',
						mime: 'audio/x-ms-wma'
					};
				}

				if (check([0xC0, 0xEF, 0x19, 0xBC, 0x4D, 0x5B, 0xCF, 0x11, 0xA8, 0xFD, 0x00, 0x80, 0x5F, 0x5C, 0x44, 0x2B], {offset: offset + 24})) {
					// Found video:
					return {
						ext: 'wmv',
						mime: 'video/x-ms-asf'
					};
				}

				break;
			}

			offset += objectSize;
		} while (offset + 24 <= buffer.length);

		// Default to ASF generic extension
		return {
			ext: 'asf',
			mime: 'application/vnd.ms-asf'
		};
	}

	if (
		check([0x0, 0x0, 0x1, 0xBA]) ||
		check([0x0, 0x0, 0x1, 0xB3])
	) {
		return {
			ext: 'mpg',
			mime: 'video/mpeg'
		};
	}

	// Check for MPEG header at different starting offsets
	for (let start = 0; start < 2 && start < (buffer.length - 16); start++) {
		if (
			check([0x49, 0x44, 0x33], {offset: start}) || // ID3 header
			check([0xFF, 0xE2], {offset: start, mask: [0xFF, 0xE6]}) // MPEG 1 or 2 Layer 3 header
		) {
			return {
				ext: 'mp3',
				mime: 'audio/mpeg'
			};
		}

		if (
			check([0xFF, 0xE4], {offset: start, mask: [0xFF, 0xE6]}) // MPEG 1 or 2 Layer 2 header
		) {
			return {
				ext: 'mp2',
				mime: 'audio/mpeg'
			};
		}

		if (
			check([0xFF, 0xF8], {offset: start, mask: [0xFF, 0xFC]}) // MPEG 2 layer 0 using ADTS
		) {
			return {
				ext: 'mp2',
				mime: 'audio/mpeg'
			};
		}

		if (
			check([0xFF, 0xF0], {offset: start, mask: [0xFF, 0xFC]}) // MPEG 4 layer 0 using ADTS
		) {
			return {
				ext: 'mp4',
				mime: 'audio/mpeg'
			};
		}
	}

	// Needs to be before `ogg` check
	if (check([0x4F, 0x70, 0x75, 0x73, 0x48, 0x65, 0x61, 0x64], {offset: 28})) {
		return {
			ext: 'opus',
			mime: 'audio/opus'
		};
	}

	// If 'OggS' in first  bytes, then OGG container
	if (check([0x4F, 0x67, 0x67, 0x53])) {
		// This is a OGG container

		// If ' theora' in header.
		if (check([0x80, 0x74, 0x68, 0x65, 0x6F, 0x72, 0x61], {offset: 28})) {
			return {
				ext: 'ogv',
				mime: 'video/ogg'
			};
		}

		// If '\x01video' in header.
		if (check([0x01, 0x76, 0x69, 0x64, 0x65, 0x6F, 0x00], {offset: 28})) {
			return {
				ext: 'ogm',
				mime: 'video/ogg'
			};
		}

		// If ' FLAC' in header  https://xiph.org/flac/faq.html
		if (check([0x7F, 0x46, 0x4C, 0x41, 0x43], {offset: 28})) {
			return {
				ext: 'oga',
				mime: 'audio/ogg'
			};
		}

		// 'Speex  ' in header https://en.wikipedia.org/wiki/Speex
		if (check([0x53, 0x70, 0x65, 0x65, 0x78, 0x20, 0x20], {offset: 28})) {
			return {
				ext: 'spx',
				mime: 'audio/ogg'
			};
		}

		// If '\x01vorbis' in header
		if (check([0x01, 0x76, 0x6F, 0x72, 0x62, 0x69, 0x73], {offset: 28})) {
			return {
				ext: 'ogg',
				mime: 'audio/ogg'
			};
		}

		// Default OGG container https://www.iana.org/assignments/media-types/application/ogg
		return {
			ext: 'ogx',
			mime: 'application/ogg'
		};
	}

	if (check([0x66, 0x4C, 0x61, 0x43])) {
		return {
			ext: 'flac',
			mime: 'audio/x-flac'
		};
	}

	if (check([0x4D, 0x41, 0x43, 0x20])) { // 'MAC '
		return {
			ext: 'ape',
			mime: 'audio/ape'
		};
	}

	if (check([0x77, 0x76, 0x70, 0x6B])) { // 'wvpk'
		return {
			ext: 'wv',
			mime: 'audio/wavpack'
		};
	}

	if (check([0x23, 0x21, 0x41, 0x4D, 0x52, 0x0A])) {
		return {
			ext: 'amr',
			mime: 'audio/amr'
		};
	}

	if (check([0x25, 0x50, 0x44, 0x46])) {
		return {
			ext: 'pdf',
			mime: 'application/pdf'
		};
	}

	if (check([0x4D, 0x5A])) {
		return {
			ext: 'exe',
			mime: 'application/x-msdownload'
		};
	}

	if (
		(buffer[0] === 0x43 || buffer[0] === 0x46) &&
		check([0x57, 0x53], {offset: 1})
	) {
		return {
			ext: 'swf',
			mime: 'application/x-shockwave-flash'
		};
	}

	if (check([0x7B, 0x5C, 0x72, 0x74, 0x66])) {
		return {
			ext: 'rtf',
			mime: 'application/rtf'
		};
	}

	if (check([0x00, 0x61, 0x73, 0x6D])) {
		return {
			ext: 'wasm',
			mime: 'application/wasm'
		};
	}

	if (
		check([0x77, 0x4F, 0x46, 0x46]) &&
		(
			check([0x00, 0x01, 0x00, 0x00], {offset: 4}) ||
			check([0x4F, 0x54, 0x54, 0x4F], {offset: 4})
		)
	) {
		return {
			ext: 'woff',
			mime: 'font/woff'
		};
	}

	if (
		check([0x77, 0x4F, 0x46, 0x32]) &&
		(
			check([0x00, 0x01, 0x00, 0x00], {offset: 4}) ||
			check([0x4F, 0x54, 0x54, 0x4F], {offset: 4})
		)
	) {
		return {
			ext: 'woff2',
			mime: 'font/woff2'
		};
	}

	if (
		check([0x4C, 0x50], {offset: 34}) &&
		(
			check([0x00, 0x00, 0x01], {offset: 8}) ||
			check([0x01, 0x00, 0x02], {offset: 8}) ||
			check([0x02, 0x00, 0x02], {offset: 8})
		)
	) {
		return {
			ext: 'eot',
			mime: 'application/vnd.ms-fontobject'
		};
	}

	if (check([0x00, 0x01, 0x00, 0x00, 0x00])) {
		return {
			ext: 'ttf',
			mime: 'font/ttf'
		};
	}

	if (check([0x4F, 0x54, 0x54, 0x4F, 0x00])) {
		return {
			ext: 'otf',
			mime: 'font/otf'
		};
	}

	if (check([0x00, 0x00, 0x01, 0x00])) {
		return {
			ext: 'ico',
			mime: 'image/x-icon'
		};
	}

	if (check([0x00, 0x00, 0x02, 0x00])) {
		return {
			ext: 'cur',
			mime: 'image/x-icon'
		};
	}

	if (check([0x46, 0x4C, 0x56, 0x01])) {
		return {
			ext: 'flv',
			mime: 'video/x-flv'
		};
	}

	if (check([0x25, 0x21])) {
		return {
			ext: 'ps',
			mime: 'application/postscript'
		};
	}

	if (check([0xFD, 0x37, 0x7A, 0x58, 0x5A, 0x00])) {
		return {
			ext: 'xz',
			mime: 'application/x-xz'
		};
	}

	if (check([0x53, 0x51, 0x4C, 0x69])) {
		return {
			ext: 'sqlite',
			mime: 'application/x-sqlite3'
		};
	}

	if (check([0x4E, 0x45, 0x53, 0x1A])) {
		return {
			ext: 'nes',
			mime: 'application/x-nintendo-nes-rom'
		};
	}

	if (check([0x43, 0x72, 0x32, 0x34])) {
		return {
			ext: 'crx',
			mime: 'application/x-google-chrome-extension'
		};
	}

	if (
		check([0x4D, 0x53, 0x43, 0x46]) ||
		check([0x49, 0x53, 0x63, 0x28])
	) {
		return {
			ext: 'cab',
			mime: 'application/vnd.ms-cab-compressed'
		};
	}

	// Needs to be before `ar` check
	if (check([0x21, 0x3C, 0x61, 0x72, 0x63, 0x68, 0x3E, 0x0A, 0x64, 0x65, 0x62, 0x69, 0x61, 0x6E, 0x2D, 0x62, 0x69, 0x6E, 0x61, 0x72, 0x79])) {
		return {
			ext: 'deb',
			mime: 'application/x-deb'
		};
	}

	if (check([0x21, 0x3C, 0x61, 0x72, 0x63, 0x68, 0x3E])) {
		return {
			ext: 'ar',
			mime: 'application/x-unix-archive'
		};
	}

	if (check([0xED, 0xAB, 0xEE, 0xDB])) {
		return {
			ext: 'rpm',
			mime: 'application/x-rpm'
		};
	}

	if (
		check([0x1F, 0xA0]) ||
		check([0x1F, 0x9D])
	) {
		return {
			ext: 'Z',
			mime: 'application/x-compress'
		};
	}

	if (check([0x4C, 0x5A, 0x49, 0x50])) {
		return {
			ext: 'lz',
			mime: 'application/x-lzip'
		};
	}

	if (check([0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3E])) {
		return {
			ext: 'msi',
			mime: 'application/x-msi'
		};
	}

	if (check([0x06, 0x0E, 0x2B, 0x34, 0x02, 0x05, 0x01, 0x01, 0x0D, 0x01, 0x02, 0x01, 0x01, 0x02])) {
		return {
			ext: 'mxf',
			mime: 'application/mxf'
		};
	}

	if (check([0x47], {offset: 4}) && (check([0x47], {offset: 192}) || check([0x47], {offset: 196}))) {
		return {
			ext: 'mts',
			mime: 'video/mp2t'
		};
	}

	if (check([0x42, 0x4C, 0x45, 0x4E, 0x44, 0x45, 0x52])) {
		return {
			ext: 'blend',
			mime: 'application/x-blender'
		};
	}

	if (check([0x42, 0x50, 0x47, 0xFB])) {
		return {
			ext: 'bpg',
			mime: 'image/bpg'
		};
	}

	if (check([0x00, 0x00, 0x00, 0x0C, 0x6A, 0x50, 0x20, 0x20, 0x0D, 0x0A, 0x87, 0x0A])) {
		// JPEG-2000 family

		if (check([0x6A, 0x70, 0x32, 0x20], {offset: 20})) {
			return {
				ext: 'jp2',
				mime: 'image/jp2'
			};
		}

		if (check([0x6A, 0x70, 0x78, 0x20], {offset: 20})) {
			return {
				ext: 'jpx',
				mime: 'image/jpx'
			};
		}

		if (check([0x6A, 0x70, 0x6D, 0x20], {offset: 20})) {
			return {
				ext: 'jpm',
				mime: 'image/jpm'
			};
		}

		if (check([0x6D, 0x6A, 0x70, 0x32], {offset: 20})) {
			return {
				ext: 'mj2',
				mime: 'image/mj2'
			};
		}
	}

	if (check([0x46, 0x4F, 0x52, 0x4D])) {
		return {
			ext: 'aif',
			mime: 'audio/aiff'
		};
	}

	if (checkString('<?xml ')) {
		return {
			ext: 'xml',
			mime: 'application/xml'
		};
	}

	if (check([0x42, 0x4F, 0x4F, 0x4B, 0x4D, 0x4F, 0x42, 0x49], {offset: 60})) {
		return {
			ext: 'mobi',
			mime: 'application/x-mobipocket-ebook'
		};
	}

	if (check([0xAB, 0x4B, 0x54, 0x58, 0x20, 0x31, 0x31, 0xBB, 0x0D, 0x0A, 0x1A, 0x0A])) {
		return {
			ext: 'ktx',
			mime: 'image/ktx'
		};
	}

	if (check([0x44, 0x49, 0x43, 0x4D], {offset: 128})) {
		return {
			ext: 'dcm',
			mime: 'application/dicom'
		};
	}

	// Musepack, SV7
	if (check([0x4D, 0x50, 0x2B])) {
		return {
			ext: 'mpc',
			mime: 'audio/x-musepack'
		};
	}

	// Musepack, SV8
	if (check([0x4D, 0x50, 0x43, 0x4B])) {
		return {
			ext: 'mpc',
			mime: 'audio/x-musepack'
		};
	}

	if (check([0x42, 0x45, 0x47, 0x49, 0x4E, 0x3A])) {
		return {
			ext: 'ics',
			mime: 'text/calendar'
		};
	}

	if (check([0x67, 0x6C, 0x54, 0x46, 0x02, 0x00, 0x00, 0x00])) {
		return {
			ext: 'glb',
			mime: 'model/gltf-binary'
		};
	}

	if (check([0xD4, 0xC3, 0xB2, 0xA1]) || check([0xA1, 0xB2, 0xC3, 0xD4])) {
		return {
			ext: 'pcap',
			mime: 'application/vnd.tcpdump.pcap'
		};
	}

	// Sony DSD Stream File (DSF)
	if (check([0x44, 0x53, 0x44, 0x20])) {
		return {
			ext: 'dsf',
			mime: 'audio/x-dsf' // Non-standard
		};
	}

	if (check([0x4C, 0x00, 0x00, 0x00, 0x01, 0x14, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x46])) {
		return {
			ext: 'lnk',
			mime: 'application/x.ms.shortcut' // Invented by us
		};
	}

	if (check([0x62, 0x6F, 0x6F, 0x6B, 0x00, 0x00, 0x00, 0x00, 0x6D, 0x61, 0x72, 0x6B, 0x00, 0x00, 0x00, 0x00])) {
		return {
			ext: 'alias',
			mime: 'application/x.apple.alias' // Invented by us
		};
	}

	if (checkString('Creative Voice File')) {
		return {
			ext: 'voc',
			mime: 'audio/x-voc'
		};
	}

	if (check([0x0B, 0x77])) {
		return {
			ext: 'ac3',
			mime: 'audio/vnd.dolby.dd-raw'
		};
	}

	if ((check([0x7E, 0x10, 0x04]) || check([0x7E, 0x18, 0x04])) && check([0x30, 0x4D, 0x49, 0x45], {offset: 4})) {
		return {
			ext: 'mie',
			mime: 'application/x-mie'
		};
	}

	if (check([0x41, 0x52, 0x52, 0x4F, 0x57, 0x31, 0x00, 0x00])) {
		return {
			ext: 'arrow',
			mime: 'application/x-apache-arrow'
		};
	}

	if (check([0x27, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], {offset: 2})) {
		return {
			ext: 'shp',
			mime: 'application/x-esri-shape'
		};
	}
};

module.exports = fileType;

Object.defineProperty(fileType, 'minimumBytes', {value: 4100});

fileType.stream = readableStream => new Promise((resolve, reject) => {
	// Using `eval` to work around issues when bundling with Webpack
	const stream = eval('require')('stream'); // eslint-disable-line no-eval

	readableStream.on('error', reject);
	readableStream.once('readable', () => {
		const pass = new stream.PassThrough();
		const chunk = readableStream.read(module.exports.minimumBytes) || readableStream.read();
		try {
			pass.fileType = fileType(chunk);
		} catch (error) {
			reject(error);
		}

		readableStream.unshift(chunk);

		if (stream.pipeline) {
			resolve(stream.pipeline(readableStream, pass, () => {}));
		} else {
			resolve(readableStream.pipe(pass));
		}
	});
});

Object.defineProperty(fileType, 'extensions', {
	get() {
		return new Set(supported.extensions);
	}
});

Object.defineProperty(fileType, 'mimeTypes', {
	get() {
		return new Set(supported.mimeTypes);
	}
});


/***/ }),

/***/ "../../file-type/supported.js":
/*!********************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/file-type/supported.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	extensions: [
		'jpg',
		'png',
		'apng',
		'gif',
		'webp',
		'flif',
		'cr2',
		'orf',
		'arw',
		'dng',
		'nef',
		'rw2',
		'raf',
		'tif',
		'bmp',
		'jxr',
		'psd',
		'zip',
		'tar',
		'rar',
		'gz',
		'bz2',
		'7z',
		'dmg',
		'mp4',
		'mid',
		'mkv',
		'webm',
		'mov',
		'avi',
		'mpg',
		'mp2',
		'mp3',
		'm4a',
		'oga',
		'ogg',
		'ogv',
		'opus',
		'flac',
		'wav',
		'spx',
		'amr',
		'pdf',
		'epub',
		'exe',
		'swf',
		'rtf',
		'wasm',
		'woff',
		'woff2',
		'eot',
		'ttf',
		'otf',
		'ico',
		'flv',
		'ps',
		'xz',
		'sqlite',
		'nes',
		'crx',
		'xpi',
		'cab',
		'deb',
		'ar',
		'rpm',
		'Z',
		'lz',
		'msi',
		'mxf',
		'mts',
		'blend',
		'bpg',
		'docx',
		'pptx',
		'xlsx',
		'3gp',
		'3g2',
		'jp2',
		'jpm',
		'jpx',
		'mj2',
		'aif',
		'qcp',
		'odt',
		'ods',
		'odp',
		'xml',
		'mobi',
		'heic',
		'cur',
		'ktx',
		'ape',
		'wv',
		'wmv',
		'wma',
		'dcm',
		'ics',
		'glb',
		'pcap',
		'dsf',
		'lnk',
		'alias',
		'voc',
		'ac3',
		'm4v',
		'm4p',
		'm4b',
		'f4v',
		'f4p',
		'f4b',
		'f4a',
		'mie',
		'asf',
		'ogm',
		'ogx',
		'mpc',
		'arrow',
		'shp'
	],
	mimeTypes: [
		'image/jpeg',
		'image/png',
		'image/gif',
		'image/webp',
		'image/flif',
		'image/x-canon-cr2',
		'image/tiff',
		'image/bmp',
		'image/vnd.ms-photo',
		'image/vnd.adobe.photoshop',
		'application/epub+zip',
		'application/x-xpinstall',
		'application/vnd.oasis.opendocument.text',
		'application/vnd.oasis.opendocument.spreadsheet',
		'application/vnd.oasis.opendocument.presentation',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/zip',
		'application/x-tar',
		'application/x-rar-compressed',
		'application/gzip',
		'application/x-bzip2',
		'application/x-7z-compressed',
		'application/x-apple-diskimage',
		'application/x-apache-arrow',
		'video/mp4',
		'audio/midi',
		'video/x-matroska',
		'video/webm',
		'video/quicktime',
		'video/vnd.avi',
		'audio/vnd.wave',
		'audio/qcelp',
		'audio/x-ms-wma',
		'video/x-ms-asf',
		'application/vnd.ms-asf',
		'video/mpeg',
		'video/3gpp',
		'audio/mpeg',
		'audio/mp4', // RFC 4337
		'audio/opus',
		'video/ogg',
		'audio/ogg',
		'application/ogg',
		'audio/x-flac',
		'audio/ape',
		'audio/wavpack',
		'audio/amr',
		'application/pdf',
		'application/x-msdownload',
		'application/x-shockwave-flash',
		'application/rtf',
		'application/wasm',
		'font/woff',
		'font/woff2',
		'application/vnd.ms-fontobject',
		'font/ttf',
		'font/otf',
		'image/x-icon',
		'video/x-flv',
		'application/postscript',
		'application/x-xz',
		'application/x-sqlite3',
		'application/x-nintendo-nes-rom',
		'application/x-google-chrome-extension',
		'application/vnd.ms-cab-compressed',
		'application/x-deb',
		'application/x-unix-archive',
		'application/x-rpm',
		'application/x-compress',
		'application/x-lzip',
		'application/x-msi',
		'application/x-mie',
		'application/mxf',
		'video/mp2t',
		'application/x-blender',
		'image/bpg',
		'image/jp2',
		'image/jpx',
		'image/jpm',
		'image/mj2',
		'audio/aiff',
		'application/xml',
		'application/x-mobipocket-ebook',
		'image/heif',
		'image/heif-sequence',
		'image/heic',
		'image/heic-sequence',
		'image/ktx',
		'application/dicom',
		'audio/x-musepack',
		'text/calendar',
		'model/gltf-binary',
		'application/vnd.tcpdump.pcap',
		'audio/x-dsf', // Non-standard
		'application/x.ms.shortcut', // Invented by us
		'application/x.apple.alias', // Invented by us
		'audio/x-voc',
		'audio/vnd.dolby.dd-raw',
		'audio/x-m4a',
		'image/apng',
		'image/x-olympus-orf',
		'image/x-sony-arw',
		'image/x-adobe-dng',
		'image/x-nikon-nef',
		'image/x-panasonic-rw2',
		'image/x-fujifilm-raf',
		'video/x-m4v',
		'video/3gpp2',
		'application/x-esri-shape'
	]
};


/***/ }),

/***/ "../../file-type/util.js":
/*!***************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/file-type/util.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.stringToBytes = string => [...string].map(character => character.charCodeAt(0));

const uint8ArrayUtf8ByteString = (array, start, end) => {
	return String.fromCharCode(...array.slice(start, end));
};

exports.readUInt64LE = (buffer, offset = 0) => {
	let n = buffer[offset];
	let mul = 1;
	let i = 0;

	while (++i < 8) {
		mul *= 0x100;
		n += buffer[offset + i] * mul;
	}

	return n;
};

exports.tarHeaderChecksumMatches = buffer => { // Does not check if checksum field characters are valid
	if (buffer.length < 512) { // `tar` header size, cannot compute checksum without it
		return false;
	}

	const MASK_8TH_BIT = 0x80;

	let sum = 256; // Intitalize sum, with 256 as sum of 8 spaces in checksum field
	let signedBitSum = 0; // Initialize signed bit sum

	for (let i = 0; i < 148; i++) {
		const byte = buffer[i];
		sum += byte;
		signedBitSum += byte & MASK_8TH_BIT; // Add signed bit to signed bit sum
	}

	// Skip checksum field

	for (let i = 156; i < 512; i++) {
		const byte = buffer[i];
		sum += byte;
		signedBitSum += byte & MASK_8TH_BIT; // Add signed bit to signed bit sum
	}

	const readSum = parseInt(uint8ArrayUtf8ByteString(buffer, 148, 154), 8); // Read sum in header

	// Some implementations compute checksum incorrectly using signed bytes
	return (
		// Checksum in header equals the sum we calculated
		readSum === sum ||

		// Checksum in header equals sum we calculated plus signed-to-unsigned delta
		readSum === (sum - (signedBitSum << 1))
	);
};

exports.multiByteIndexOf = (buffer, bytesToSearch, startAt = 0) => {
	// `Buffer#indexOf()` can search for multiple bytes
	if (Buffer && Buffer.isBuffer(buffer)) {
		return buffer.indexOf(Buffer.from(bytesToSearch), startAt);
	}

	const nextBytesMatch = (buffer, bytes, startIndex) => {
		for (let i = 1; i < bytes.length; i++) {
			if (bytes[i] !== buffer[startIndex + i]) {
				return false;
			}
		}

		return true;
	};

	// `Uint8Array#indexOf()` can search for only a single byte
	let index = buffer.indexOf(bytesToSearch[0], startAt);
	while (index >= 0) {
		if (nextBytesMatch(buffer, bytesToSearch, index)) {
			return index;
		}

		index = buffer.indexOf(bytesToSearch[0], index + 1);
	}

	return -1;
};

exports.uint8ArrayUtf8ByteString = uint8ArrayUtf8ByteString;


/***/ }),

/***/ "../../is-arrayish/index.js":
/*!******************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/is-arrayish/index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};


/***/ }),

/***/ "../../semver/semver.js":
/*!**************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/semver/semver.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var t = exports.tokens = {}
var R = 0

function tok (n) {
  t[n] = R++
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

tok('NUMERICIDENTIFIER')
src[t.NUMERICIDENTIFIER] = '0|[1-9]\\d*'
tok('NUMERICIDENTIFIERLOOSE')
src[t.NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

tok('NONNUMERICIDENTIFIER')
src[t.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

tok('MAINVERSION')
src[t.MAINVERSION] = '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')'

tok('MAINVERSIONLOOSE')
src[t.MAINVERSIONLOOSE] = '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

tok('PRERELEASEIDENTIFIER')
src[t.PRERELEASEIDENTIFIER] = '(?:' + src[t.NUMERICIDENTIFIER] +
                            '|' + src[t.NONNUMERICIDENTIFIER] + ')'

tok('PRERELEASEIDENTIFIERLOOSE')
src[t.PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[t.NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[t.NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

tok('PRERELEASE')
src[t.PRERELEASE] = '(?:-(' + src[t.PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[t.PRERELEASEIDENTIFIER] + ')*))'

tok('PRERELEASELOOSE')
src[t.PRERELEASELOOSE] = '(?:-?(' + src[t.PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[t.PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

tok('BUILDIDENTIFIER')
src[t.BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

tok('BUILD')
src[t.BUILD] = '(?:\\+(' + src[t.BUILDIDENTIFIER] +
             '(?:\\.' + src[t.BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

tok('FULL')
tok('FULLPLAIN')
src[t.FULLPLAIN] = 'v?' + src[t.MAINVERSION] +
                  src[t.PRERELEASE] + '?' +
                  src[t.BUILD] + '?'

src[t.FULL] = '^' + src[t.FULLPLAIN] + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
tok('LOOSEPLAIN')
src[t.LOOSEPLAIN] = '[v=\\s]*' + src[t.MAINVERSIONLOOSE] +
                  src[t.PRERELEASELOOSE] + '?' +
                  src[t.BUILD] + '?'

tok('LOOSE')
src[t.LOOSE] = '^' + src[t.LOOSEPLAIN] + '$'

tok('GTLT')
src[t.GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
tok('XRANGEIDENTIFIERLOOSE')
src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
tok('XRANGEIDENTIFIER')
src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + '|x|X|\\*'

tok('XRANGEPLAIN')
src[t.XRANGEPLAIN] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[t.PRERELEASE] + ')?' +
                   src[t.BUILD] + '?' +
                   ')?)?'

tok('XRANGEPLAINLOOSE')
src[t.XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[t.PRERELEASELOOSE] + ')?' +
                        src[t.BUILD] + '?' +
                        ')?)?'

tok('XRANGE')
src[t.XRANGE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAIN] + '$'
tok('XRANGELOOSE')
src[t.XRANGELOOSE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
tok('COERCE')
src[t.COERCE] = '(^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'
tok('COERCERTL')
re[t.COERCERTL] = new RegExp(src[t.COERCE], 'g')

// Tilde ranges.
// Meaning is "reasonably at or greater than"
tok('LONETILDE')
src[t.LONETILDE] = '(?:~>?)'

tok('TILDETRIM')
src[t.TILDETRIM] = '(\\s*)' + src[t.LONETILDE] + '\\s+'
re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

tok('TILDE')
src[t.TILDE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAIN] + '$'
tok('TILDELOOSE')
src[t.TILDELOOSE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
tok('LONECARET')
src[t.LONECARET] = '(?:\\^)'

tok('CARETTRIM')
src[t.CARETTRIM] = '(\\s*)' + src[t.LONECARET] + '\\s+'
re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], 'g')
var caretTrimReplace = '$1^'

tok('CARET')
src[t.CARET] = '^' + src[t.LONECARET] + src[t.XRANGEPLAIN] + '$'
tok('CARETLOOSE')
src[t.CARETLOOSE] = '^' + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
tok('COMPARATORLOOSE')
src[t.COMPARATORLOOSE] = '^' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + ')$|^$'
tok('COMPARATOR')
src[t.COMPARATOR] = '^' + src[t.GTLT] + '\\s*(' + src[t.FULLPLAIN] + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
tok('COMPARATORTRIM')
src[t.COMPARATORTRIM] = '(\\s*)' + src[t.GTLT] +
                      '\\s*(' + src[t.LOOSEPLAIN] + '|' + src[t.XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
tok('HYPHENRANGE')
src[t.HYPHENRANGE] = '^\\s*(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s*$'

tok('HYPHENRANGELOOSE')
src[t.HYPHENRANGELOOSE] = '^\\s*(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
tok('STAR')
src[t.STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[t.LOOSE] : re[t.FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

SemVer.prototype.compareBuild = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  var i = 0
  do {
    var a = this.build[i]
    var b = other.build[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.compareBuild = compareBuild
function compareBuild (a, b, loose) {
  var versionA = new SemVer(a, loose)
  var versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(b, a, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1] !== undefined ? m[1] : ''
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY || version === ANY) {
    return true
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    if (this.value === '') {
      return true
    }
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    if (comp.value === '') {
      return true
    }
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[t.COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[t.TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[t.CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return (
      isSatisfiable(thisComparators, options) &&
      range.set.some(function (rangeComparators) {
        return (
          isSatisfiable(rangeComparators, options) &&
          thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options)
            })
          })
        )
      })
    )
  })
}

// take a set of comparators and determine whether there
// exists a version which can satisfy it
function isSatisfiable (comparators, options) {
  var result = true
  var remainingComparators = comparators.slice()
  var testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every(function (otherComparator) {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p + pr
    } else if (xm) {
      ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0' + pr +
        ' <' + M + '.' + (+m + 1) + '.0' + pr
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version, options) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  var match = null
  if (!options.rtl) {
    match = version.match(re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    var next
    while ((next = re[t.COERCERTL].exec(version)) &&
      (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
          next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    re[t.COERCERTL].lastIndex = -1
  }

  if (match === null) {
    return null
  }

  return parse(match[2] +
    '.' + (match[3] || '0') +
    '.' + (match[4] || '0'), options)
}


/***/ }),

/***/ "../../sharp/build/Release/sharp.node":
/*!****************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/build/Release/sharp.node ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected character '�' (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n(Source code omitted for this binary file)");

/***/ }),

/***/ "../../sharp/lib sync recursive":
/*!************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib sync ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../sharp/lib sync recursive";

/***/ }),

/***/ "../../sharp/lib/channel.js":
/*!******************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/channel.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const is = __webpack_require__(/*! ./is */ "../../sharp/lib/is.js");

/**
 * Boolean operations for bandbool.
 * @private
 */
const bool = {
  and: 'and',
  or: 'or',
  eor: 'eor'
};

/**
 * Remove alpha channel, if any. This is a no-op if the image does not have an alpha channel.
 *
 * @example
 * sharp('rgba.png')
 *   .removeAlpha()
 *   .toFile('rgb.png', function(err, info) {
 *     // rgb.png is a 3 channel image without an alpha channel
 *   });
 *
 * @returns {Sharp}
 */
function removeAlpha () {
  this.options.removeAlpha = true;
  return this;
}

/**
 * Ensure alpha channel, if missing. The added alpha channel will be fully opaque. This is a no-op if the image already has an alpha channel.
 *
 * @example
 * sharp('rgb.jpg')
 *   .ensureAlpha()
 *   .toFile('rgba.png', function(err, info) {
 *     // rgba.png is a 4 channel image with a fully opaque alpha channel
 *   });
 *
 * @returns {Sharp}
 */
function ensureAlpha () {
  this.options.ensureAlpha = true;
  return this;
}

/**
 * Extract a single channel from a multi-channel image.
 *
 * @example
 * sharp(input)
 *   .extractChannel('green')
 *   .toFile('input_green.jpg', function(err, info) {
 *     // info.channels === 1
 *     // input_green.jpg contains the green channel of the input image
 *    });
 *
 * @param {Number|String} channel - zero-indexed band number to extract, or `red`, `green` or `blue` as alternative to `0`, `1` or `2` respectively.
 * @returns {Sharp}
 * @throws {Error} Invalid channel
 */
function extractChannel (channel) {
  if (channel === 'red') {
    channel = 0;
  } else if (channel === 'green') {
    channel = 1;
  } else if (channel === 'blue') {
    channel = 2;
  }
  if (is.integer(channel) && is.inRange(channel, 0, 4)) {
    this.options.extractChannel = channel;
  } else {
    throw is.invalidParameterError('channel', 'integer or one of: red, green, blue', channel);
  }
  return this;
}

/**
 * Join one or more channels to the image.
 * The meaning of the added channels depends on the output colourspace, set with `toColourspace()`.
 * By default the output image will be web-friendly sRGB, with additional channels interpreted as alpha channels.
 * Channel ordering follows vips convention:
 * - sRGB: 0: Red, 1: Green, 2: Blue, 3: Alpha.
 * - CMYK: 0: Magenta, 1: Cyan, 2: Yellow, 3: Black, 4: Alpha.
 *
 * Buffers may be any of the image formats supported by sharp: JPEG, PNG, WebP, GIF, SVG, TIFF or raw pixel image data.
 * For raw pixel input, the `options` object should contain a `raw` attribute, which follows the format of the attribute of the same name in the `sharp()` constructor.
 *
 * @param {Array<String|Buffer>|String|Buffer} images - one or more images (file paths, Buffers).
 * @param {Object} options - image options, see `sharp()` constructor.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function joinChannel (images, options) {
  if (Array.isArray(images)) {
    images.forEach(function (image) {
      this.options.joinChannelIn.push(this._createInputDescriptor(image, options));
    }, this);
  } else {
    this.options.joinChannelIn.push(this._createInputDescriptor(images, options));
  }
  return this;
}

/**
 * Perform a bitwise boolean operation on all input image channels (bands) to produce a single channel output image.
 *
 * @example
 * sharp('3-channel-rgb-input.png')
 *   .bandbool(sharp.bool.and)
 *   .toFile('1-channel-output.png', function (err, info) {
 *     // The output will be a single channel image where each pixel `P = R & G & B`.
 *     // If `I(1,1) = [247, 170, 14] = [0b11110111, 0b10101010, 0b00001111]`
 *     // then `O(1,1) = 0b11110111 & 0b10101010 & 0b00001111 = 0b00000010 = 2`.
 *   });
 *
 * @param {String} boolOp - one of `and`, `or` or `eor` to perform that bitwise operation, like the C logic operators `&`, `|` and `^` respectively.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function bandbool (boolOp) {
  if (is.string(boolOp) && is.inArray(boolOp, ['and', 'or', 'eor'])) {
    this.options.bandBoolOp = boolOp;
  } else {
    throw is.invalidParameterError('boolOp', 'one of: and, or, eor', boolOp);
  }
  return this;
}

/**
 * Decorate the Sharp prototype with channel-related functions.
 * @private
 */
module.exports = function (Sharp) {
  Object.assign(Sharp.prototype, {
    // Public instance functions
    removeAlpha,
    ensureAlpha,
    extractChannel,
    joinChannel,
    bandbool
  });
  // Class attributes
  Sharp.bool = bool;
};


/***/ }),

/***/ "../../sharp/lib/colour.js":
/*!*****************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/colour.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(/*! color */ "../../color/index.js");
const is = __webpack_require__(/*! ./is */ "../../sharp/lib/is.js");

/**
 * Colourspaces.
 * @private
 */
const colourspace = {
  multiband: 'multiband',
  'b-w': 'b-w',
  bw: 'b-w',
  cmyk: 'cmyk',
  srgb: 'srgb'
};

/**
 * Tint the image using the provided chroma while preserving the image luminance.
 * An alpha channel may be present and will be unchanged by the operation.
 *
 * @param {String|Object} rgb - parsed by the [color](https://www.npmjs.org/package/color) module to extract chroma values.
 * @returns {Sharp}
 * @throws {Error} Invalid parameter
 */
function tint (rgb) {
  const colour = color(rgb);
  this.options.tintA = colour.a();
  this.options.tintB = colour.b();
  return this;
}

/**
 * Convert to 8-bit greyscale; 256 shades of grey.
 * This is a linear operation. If the input image is in a non-linear colour space such as sRGB, use `gamma()` with `greyscale()` for the best results.
 * By default the output image will be web-friendly sRGB and contain three (identical) color channels.
 * This may be overridden by other sharp operations such as `toColourspace('b-w')`,
 * which will produce an output image containing one color channel.
 * An alpha channel may be present, and will be unchanged by the operation.
 * @param {Boolean} [greyscale=true]
 * @returns {Sharp}
 */
function greyscale (greyscale) {
  this.options.greyscale = is.bool(greyscale) ? greyscale : true;
  return this;
}

/**
 * Alternative spelling of `greyscale`.
 * @param {Boolean} [grayscale=true]
 * @returns {Sharp}
 */
function grayscale (grayscale) {
  return this.greyscale(grayscale);
}

/**
 * Set the output colourspace.
 * By default output image will be web-friendly sRGB, with additional channels interpreted as alpha channels.
 * @param {String} [colourspace] - output colourspace e.g. `srgb`, `rgb`, `cmyk`, `lab`, `b-w` [...](https://github.com/libvips/libvips/blob/master/libvips/iofuncs/enumtypes.c#L568)
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function toColourspace (colourspace) {
  if (!is.string(colourspace)) {
    throw is.invalidParameterError('colourspace', 'string', colourspace);
  }
  this.options.colourspace = colourspace;
  return this;
}

/**
 * Alternative spelling of `toColourspace`.
 * @param {String} [colorspace] - output colorspace.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function toColorspace (colorspace) {
  return this.toColourspace(colorspace);
}

/**
 * Update a colour attribute of the this.options Object.
 * @private
 * @param {String} key
 * @param {String|Object} value
 * @throws {Error} Invalid value
 */
function _setBackgroundColourOption (key, value) {
  if (is.defined(value)) {
    if (is.object(value) || is.string(value)) {
      const colour = color(value);
      this.options[key] = [
        colour.red(),
        colour.green(),
        colour.blue(),
        Math.round(colour.alpha() * 255)
      ];
    } else {
      throw is.invalidParameterError('background', 'object or string', value);
    }
  }
}

/**
 * Decorate the Sharp prototype with colour-related functions.
 * @private
 */
module.exports = function (Sharp) {
  Object.assign(Sharp.prototype, {
    // Public
    tint,
    greyscale,
    grayscale,
    toColourspace,
    toColorspace,
    // Private
    _setBackgroundColourOption
  });
  // Class attributes
  Sharp.colourspace = colourspace;
  Sharp.colorspace = colourspace;
};


/***/ }),

/***/ "../../sharp/lib/composite.js":
/*!********************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/composite.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const is = __webpack_require__(/*! ./is */ "../../sharp/lib/is.js");

/**
 * Blend modes.
 * @member
 * @private
 */
const blend = {
  clear: 'clear',
  source: 'source',
  over: 'over',
  in: 'in',
  out: 'out',
  atop: 'atop',
  dest: 'dest',
  'dest-over': 'dest-over',
  'dest-in': 'dest-in',
  'dest-out': 'dest-out',
  'dest-atop': 'dest-atop',
  xor: 'xor',
  add: 'add',
  saturate: 'saturate',
  multiply: 'multiply',
  screen: 'screen',
  overlay: 'overlay',
  darken: 'darken',
  lighten: 'lighten',
  'colour-dodge': 'colour-dodge',
  'color-dodge': 'colour-dodge',
  'colour-burn': 'colour-burn',
  'color-burn': 'colour-burn',
  'hard-light': 'hard-light',
  'soft-light': 'soft-light',
  difference: 'difference',
  exclusion: 'exclusion'
};

/**
 * Composite image(s) over the processed (resized, extracted etc.) image.
 *
 * The images to composite must be the same size or smaller than the processed image.
 * If both `top` and `left` options are provided, they take precedence over `gravity`.
 *
 * The `blend` option can be one of `clear`, `source`, `over`, `in`, `out`, `atop`,
 * `dest`, `dest-over`, `dest-in`, `dest-out`, `dest-atop`,
 * `xor`, `add`, `saturate`, `multiply`, `screen`, `overlay`, `darken`, `lighten`,
 * `colour-dodge`, `color-dodge`, `colour-burn`,`color-burn`,
 * `hard-light`, `soft-light`, `difference`, `exclusion`.
 *
 * More information about blend modes can be found at
 * https://libvips.github.io/libvips/API/current/libvips-conversion.html#VipsBlendMode
 * and https://www.cairographics.org/operators/
 *
 * @example
 * sharp('input.png')
 *   .rotate(180)
 *   .resize(300)
 *   .flatten( { background: '#ff6600' } )
 *   .composite([{ input: 'overlay.png', gravity: 'southeast' }])
 *   .sharpen()
 *   .withMetadata()
 *   .webp( { quality: 90 } )
 *   .toBuffer()
 *   .then(function(outputBuffer) {
 *     // outputBuffer contains upside down, 300px wide, alpha channel flattened
 *     // onto orange background, composited with overlay.png with SE gravity,
 *     // sharpened, with metadata, 90% quality WebP image data. Phew!
 *   });
 *
 * @param {Object[]} images - Ordered list of images to composite
 * @param {Buffer|String} [images[].input] - Buffer containing image data, String containing the path to an image file, or Create object (see bellow)
 * @param {Object} [images[].input.create] - describes a blank overlay to be created.
 * @param {Number} [images[].input.create.width]
 * @param {Number} [images[].input.create.height]
 * @param {Number} [images[].input.create.channels] - 3-4
 * @param {String|Object} [images[].input.create.background] - parsed by the [color](https://www.npmjs.org/package/color) module to extract values for red, green, blue and alpha.
 * @param {String} [images[].blend='over'] - how to blend this image with the image below.
 * @param {String} [images[].gravity='centre'] - gravity at which to place the overlay.
 * @param {Number} [images[].top] - the pixel offset from the top edge.
 * @param {Number} [images[].left] - the pixel offset from the left edge.
 * @param {Boolean} [images[].tile=false] - set to true to repeat the overlay image across the entire image with the given `gravity`.
 * @param {Boolean} [images[].premultiplied=false] - set to true to avoid premultipling the image below. Equivalent to the `--premultiplied` vips option.
 * @param {Number} [images[].density=72] - number representing the DPI for vector overlay image.
 * @param {Object} [images[].raw] - describes overlay when using raw pixel data.
 * @param {Number} [images[].raw.width]
 * @param {Number} [images[].raw.height]
 * @param {Number} [images[].raw.channels]
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function composite (images) {
  if (!Array.isArray(images)) {
    throw is.invalidParameterError('images to composite', 'array', images);
  }
  this.options.composite = images.map(image => {
    if (!is.object(image)) {
      throw is.invalidParameterError('image to composite', 'object', image);
    }
    const { raw, density } = image;
    const inputOptions = (raw || density) ? { raw, density } : undefined;
    const composite = {
      input: this._createInputDescriptor(image.input, inputOptions, { allowStream: false }),
      blend: 'over',
      tile: false,
      left: -1,
      top: -1,
      gravity: 0,
      premultiplied: false
    };
    if (is.defined(image.blend)) {
      if (is.string(blend[image.blend])) {
        composite.blend = blend[image.blend];
      } else {
        throw is.invalidParameterError('blend', 'valid blend name', image.blend);
      }
    }
    if (is.defined(image.tile)) {
      if (is.bool(image.tile)) {
        composite.tile = image.tile;
      } else {
        throw is.invalidParameterError('tile', 'boolean', image.tile);
      }
    }
    if (is.defined(image.left)) {
      if (is.integer(image.left) && image.left >= 0) {
        composite.left = image.left;
      } else {
        throw is.invalidParameterError('left', 'positive integer', image.left);
      }
    }
    if (is.defined(image.top)) {
      if (is.integer(image.top) && image.top >= 0) {
        composite.top = image.top;
      } else {
        throw is.invalidParameterError('top', 'positive integer', image.top);
      }
    }
    if (composite.left !== composite.top && Math.min(composite.left, composite.top) === -1) {
      throw new Error('Expected both left and top to be set');
    }
    if (is.defined(image.gravity)) {
      if (is.integer(image.gravity) && is.inRange(image.gravity, 0, 8)) {
        composite.gravity = image.gravity;
      } else if (is.string(image.gravity) && is.integer(this.constructor.gravity[image.gravity])) {
        composite.gravity = this.constructor.gravity[image.gravity];
      } else {
        throw is.invalidParameterError('gravity', 'valid gravity', image.gravity);
      }
    }
    if (is.defined(image.premultiplied)) {
      if (is.bool(image.premultiplied)) {
        composite.premultiplied = image.premultiplied;
      } else {
        throw is.invalidParameterError('premultiplied', 'boolean', image.premultiplied);
      }
    }

    return composite;
  });
  return this;
}

/**
 * Decorate the Sharp prototype with composite-related functions.
 * @private
 */
module.exports = function (Sharp) {
  Sharp.prototype.composite = composite;
  Sharp.blend = blend;
};


/***/ }),

/***/ "../../sharp/lib/constructor.js":
/*!**********************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/constructor.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const util = __webpack_require__(/*! util */ "util");
const stream = __webpack_require__(/*! stream */ "stream");
const events = __webpack_require__(/*! events */ "events");
const is = __webpack_require__(/*! ./is */ "../../sharp/lib/is.js");

__webpack_require__(/*! ./libvips */ "../../sharp/lib/libvips.js").hasVendoredLibvips();

let sharp;
/* istanbul ignore next */
try {
  sharp = __webpack_require__(/*! ../build/Release/sharp.node */ "../../sharp/build/Release/sharp.node");
} catch (err) {
  // Bail early if bindings aren't available
  const help = ['', 'Something went wrong installing the "sharp" module', '', err.message, ''];
  if (/NODE_MODULE_VERSION/.test(err.message)) {
    help.push('- Ensure the version of Node.js used at install time matches that used at runtime');
  } else if (/invalid ELF header/.test(err.message)) {
    help.push(`- Ensure "${process.platform}" is used at install time as well as runtime`);
  } else {
    help.push('- Remove the "node_modules/sharp" directory, run "npm install" and look for errors');
  }
  help.push(
    '- Consult the installation documentation at https://sharp.pixelplumbing.com/en/stable/install/',
    '- Search for this error at https://github.com/lovell/sharp/issues', ''
  );
  console.error(help.join('\n'));
  process.exit(1);
}

// Use NODE_DEBUG=sharp to enable libvips warnings
const debuglog = util.debuglog('sharp');

/**
 * @class Sharp
 *
 * Constructor factory to create an instance of `sharp`, to which further methods are chained.
 *
 * JPEG, PNG, WebP or TIFF format image data can be streamed out from this object.
 * When using Stream based output, derived attributes are available from the `info` event.
 *
 * Implements the [stream.Duplex](http://nodejs.org/api/stream.html#stream_class_stream_duplex) class.
 *
 * @example
 * sharp('input.jpg')
 *   .resize(300, 200)
 *   .toFile('output.jpg', function(err) {
 *     // output.jpg is a 300 pixels wide and 200 pixels high image
 *     // containing a scaled and cropped version of input.jpg
 *   });
 *
 * @example
 * // Read image data from readableStream,
 * // resize to 300 pixels wide,
 * // emit an 'info' event with calculated dimensions
 * // and finally write image data to writableStream
 * var transformer = sharp()
 *   .resize(300)
 *   .on('info', function(info) {
 *     console.log('Image height is ' + info.height);
 *   });
 * readableStream.pipe(transformer).pipe(writableStream);
 *
 * @example
 * // Create a blank 300x200 PNG image of semi-transluent red pixels
 * sharp({
 *   create: {
 *     width: 300,
 *     height: 200,
 *     channels: 4,
 *     background: { r: 255, g: 0, b: 0, alpha: 0.5 }
 *   }
 * })
 * .png()
 * .toBuffer()
 * .then( ... );
 *
 * @param {(Buffer|String)} [input] - if present, can be
 *  a Buffer containing JPEG, PNG, WebP, GIF, SVG, TIFF or raw pixel image data, or
 *  a String containing the filesystem path to an JPEG, PNG, WebP, GIF, SVG or TIFF image file.
 *  JPEG, PNG, WebP, GIF, SVG, TIFF or raw pixel image data can be streamed into the object when not present.
 * @param {Object} [options] - if present, is an Object with optional attributes.
 * @param {Boolean} [options.failOnError=true] - by default halt processing and raise an error when loading invalid images.
 *  Set this flag to `false` if you'd rather apply a "best effort" to decode images, even if the data is corrupt or invalid.
 * @param {Number} [options.density=72] - number representing the DPI for vector images.
 * @param {Number} [options.pages=1] - number of pages to extract for multi-page input (GIF, TIFF, PDF), use -1 for all pages.
 * @param {Number} [options.page=0] - page number to start extracting from for multi-page input (GIF, TIFF, PDF), zero based.
 * @param {Object} [options.raw] - describes raw pixel input image data. See `raw()` for pixel ordering.
 * @param {Number} [options.raw.width]
 * @param {Number} [options.raw.height]
 * @param {Number} [options.raw.channels] - 1-4
 * @param {Object} [options.create] - describes a new image to be created.
 * @param {Number} [options.create.width]
 * @param {Number} [options.create.height]
 * @param {Number} [options.create.channels] - 3-4
 * @param {String|Object} [options.create.background] - parsed by the [color](https://www.npmjs.org/package/color) module to extract values for red, green, blue and alpha.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
const Sharp = function (input, options) {
  if (arguments.length === 1 && !is.defined(input)) {
    throw new Error('Invalid input');
  }
  if (!(this instanceof Sharp)) {
    return new Sharp(input, options);
  }
  stream.Duplex.call(this);
  this.options = {
    // input options
    sequentialRead: false,
    limitInputPixels: Math.pow(0x3FFF, 2),
    // resize options
    topOffsetPre: -1,
    leftOffsetPre: -1,
    widthPre: -1,
    heightPre: -1,
    topOffsetPost: -1,
    leftOffsetPost: -1,
    widthPost: -1,
    heightPost: -1,
    width: -1,
    height: -1,
    canvas: 'crop',
    position: 0,
    resizeBackground: [0, 0, 0, 255],
    useExifOrientation: false,
    angle: 0,
    rotationAngle: 0,
    rotationBackground: [0, 0, 0, 255],
    rotateBeforePreExtract: false,
    flip: false,
    flop: false,
    extendTop: 0,
    extendBottom: 0,
    extendLeft: 0,
    extendRight: 0,
    extendBackground: [0, 0, 0, 255],
    withoutEnlargement: false,
    kernel: 'lanczos3',
    fastShrinkOnLoad: true,
    // operations
    tintA: 128,
    tintB: 128,
    flatten: false,
    flattenBackground: [0, 0, 0],
    negate: false,
    medianSize: 0,
    blurSigma: 0,
    sharpenSigma: 0,
    sharpenFlat: 1,
    sharpenJagged: 2,
    threshold: 0,
    thresholdGrayscale: true,
    trimThreshold: 0,
    gamma: 0,
    gammaOut: 0,
    greyscale: false,
    normalise: 0,
    brightness: 1,
    saturation: 1,
    hue: 0,
    booleanBufferIn: null,
    booleanFileIn: '',
    joinChannelIn: [],
    extractChannel: -1,
    removeAlpha: false,
    ensureAlpha: false,
    colourspace: 'srgb',
    composite: [],
    // output
    fileOut: '',
    formatOut: 'input',
    streamOut: false,
    withMetadata: false,
    withMetadataOrientation: -1,
    resolveWithObject: false,
    // output format
    jpegQuality: 80,
    jpegProgressive: false,
    jpegChromaSubsampling: '4:2:0',
    jpegTrellisQuantisation: false,
    jpegOvershootDeringing: false,
    jpegOptimiseScans: false,
    jpegOptimiseCoding: true,
    jpegQuantisationTable: 0,
    pngProgressive: false,
    pngCompressionLevel: 9,
    pngAdaptiveFiltering: false,
    pngPalette: false,
    pngQuality: 100,
    pngColours: 256,
    pngDither: 1,
    webpQuality: 80,
    webpAlphaQuality: 100,
    webpLossless: false,
    webpNearLossless: false,
    webpSmartSubsample: false,
    webpReductionEffort: 4,
    tiffQuality: 80,
    tiffCompression: 'jpeg',
    tiffPredictor: 'horizontal',
    tiffPyramid: false,
    tiffSquash: false,
    tiffTile: false,
    tiffTileHeight: 256,
    tiffTileWidth: 256,
    tiffXres: 1.0,
    tiffYres: 1.0,
    heifQuality: 80,
    heifLossless: false,
    heifCompression: 'hevc',
    tileSize: 256,
    tileOverlap: 0,
    tileSkipBlanks: -1,
    tileBackground: [255, 255, 255, 255],
    linearA: 1,
    linearB: 0,
    // Function to notify of libvips warnings
    debuglog: debuglog,
    // Function to notify of queue length changes
    queueListener: function (queueLength) {
      queue.emit('change', queueLength);
    }
  };
  this.options.input = this._createInputDescriptor(input, options, { allowStream: true });
  return this;
};
util.inherits(Sharp, stream.Duplex);

/**
 * An EventEmitter that emits a `change` event when a task is either:
 * - queued, waiting for _libuv_ to provide a worker thread
 * - complete
 * @member
 * @example
 * sharp.queue.on('change', function(queueLength) {
 *   console.log('Queue contains ' + queueLength + ' task(s)');
 * });
 */
const queue = new events.EventEmitter();
Sharp.queue = queue;

/**
 * An Object containing nested boolean values representing the available input and output formats/methods.
 * @example
 * console.log(sharp.format);
 * @returns {Object}
 */
Sharp.format = sharp.format();

/**
 * An Object containing the version numbers of libvips and its dependencies.
 * @member
 * @example
 * console.log(sharp.versions);
 */
Sharp.versions = {
  vips: sharp.libvipsVersion()
};
try {
  Sharp.versions = __webpack_require__(/*! ../vendor/versions.json */ "../../sharp/vendor/versions.json");
} catch (err) {}

/**
 * Export constructor.
 * @private
 */
module.exports = Sharp;


/***/ }),

/***/ "../../sharp/lib/index.js":
/*!****************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Sharp = __webpack_require__(/*! ./constructor */ "../../sharp/lib/constructor.js");
__webpack_require__(/*! ./input */ "../../sharp/lib/input.js")(Sharp);
__webpack_require__(/*! ./resize */ "../../sharp/lib/resize.js")(Sharp);
__webpack_require__(/*! ./composite */ "../../sharp/lib/composite.js")(Sharp);
__webpack_require__(/*! ./operation */ "../../sharp/lib/operation.js")(Sharp);
__webpack_require__(/*! ./colour */ "../../sharp/lib/colour.js")(Sharp);
__webpack_require__(/*! ./channel */ "../../sharp/lib/channel.js")(Sharp);
__webpack_require__(/*! ./output */ "../../sharp/lib/output.js")(Sharp);
__webpack_require__(/*! ./utility */ "../../sharp/lib/utility.js")(Sharp);

module.exports = Sharp;


/***/ }),

/***/ "../../sharp/lib/input.js":
/*!****************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/input.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(/*! color */ "../../color/index.js");
const is = __webpack_require__(/*! ./is */ "../../sharp/lib/is.js");
const sharp = __webpack_require__(/*! ../build/Release/sharp.node */ "../../sharp/build/Release/sharp.node");

/**
 * Create Object containing input and input-related options.
 * @private
 */
function _createInputDescriptor (input, inputOptions, containerOptions) {
  const inputDescriptor = { failOnError: true };
  if (is.string(input)) {
    // filesystem
    inputDescriptor.file = input;
  } else if (is.buffer(input)) {
    // Buffer
    inputDescriptor.buffer = input;
  } else if (is.plainObject(input) && !is.defined(inputOptions)) {
    // Plain Object descriptor, e.g. create
    inputOptions = input;
    if (is.plainObject(inputOptions.raw) || is.bool(inputOptions.failOnError)) {
      // Raw Stream
      inputDescriptor.buffer = [];
    }
  } else if (!is.defined(input) && is.object(containerOptions) && containerOptions.allowStream) {
    // Stream
    inputDescriptor.buffer = [];
  } else {
    throw new Error('Unsupported input ' + typeof input);
  }
  if (is.object(inputOptions)) {
    // Fail on error
    if (is.defined(inputOptions.failOnError)) {
      if (is.bool(inputOptions.failOnError)) {
        inputDescriptor.failOnError = inputOptions.failOnError;
      } else {
        throw is.invalidParameterError('failOnError', 'boolean', inputOptions.failOnError);
      }
    }
    // Density
    if (is.defined(inputOptions.density)) {
      if (is.inRange(inputOptions.density, 1, 2400)) {
        inputDescriptor.density = inputOptions.density;
      } else {
        throw is.invalidParameterError('density', 'number between 1 and 2400', inputOptions.density);
      }
    }
    // Raw pixel input
    if (is.defined(inputOptions.raw)) {
      if (
        is.object(inputOptions.raw) &&
        is.integer(inputOptions.raw.width) && inputOptions.raw.width > 0 &&
        is.integer(inputOptions.raw.height) && inputOptions.raw.height > 0 &&
        is.integer(inputOptions.raw.channels) && is.inRange(inputOptions.raw.channels, 1, 4)
      ) {
        inputDescriptor.rawWidth = inputOptions.raw.width;
        inputDescriptor.rawHeight = inputOptions.raw.height;
        inputDescriptor.rawChannels = inputOptions.raw.channels;
      } else {
        throw new Error('Expected width, height and channels for raw pixel input');
      }
    }
    // Multi-page input (GIF, TIFF, PDF)
    if (is.defined(inputOptions.pages)) {
      if (is.integer(inputOptions.pages) && is.inRange(inputOptions.pages, -1, 100000)) {
        inputDescriptor.pages = inputOptions.pages;
      } else {
        throw is.invalidParameterError('pages', 'integer between -1 and 100000', inputOptions.pages);
      }
    }
    if (is.defined(inputOptions.page)) {
      if (is.integer(inputOptions.page) && is.inRange(inputOptions.page, 0, 100000)) {
        inputDescriptor.page = inputOptions.page;
      } else {
        throw is.invalidParameterError('page', 'integer between 0 and 100000', inputOptions.page);
      }
    }
    // Create new image
    if (is.defined(inputOptions.create)) {
      if (
        is.object(inputOptions.create) &&
        is.integer(inputOptions.create.width) && inputOptions.create.width > 0 &&
        is.integer(inputOptions.create.height) && inputOptions.create.height > 0 &&
        is.integer(inputOptions.create.channels) && is.inRange(inputOptions.create.channels, 3, 4) &&
        is.defined(inputOptions.create.background)
      ) {
        inputDescriptor.createWidth = inputOptions.create.width;
        inputDescriptor.createHeight = inputOptions.create.height;
        inputDescriptor.createChannels = inputOptions.create.channels;
        const background = color(inputOptions.create.background);
        inputDescriptor.createBackground = [
          background.red(),
          background.green(),
          background.blue(),
          Math.round(background.alpha() * 255)
        ];
        delete inputDescriptor.buffer;
      } else {
        throw new Error('Expected width, height, channels and background to create a new input image');
      }
    }
  } else if (is.defined(inputOptions)) {
    throw new Error('Invalid input options ' + inputOptions);
  }
  return inputDescriptor;
}

/**
 * Handle incoming Buffer chunk on Writable Stream.
 * @private
 * @param {Buffer} chunk
 * @param {String} encoding - unused
 * @param {Function} callback
 */
function _write (chunk, encoding, callback) {
  /* istanbul ignore else */
  if (Array.isArray(this.options.input.buffer)) {
    /* istanbul ignore else */
    if (is.buffer(chunk)) {
      if (this.options.input.buffer.length === 0) {
        this.on('finish', () => {
          this.streamInFinished = true;
        });
      }
      this.options.input.buffer.push(chunk);
      callback();
    } else {
      callback(new Error('Non-Buffer data on Writable Stream'));
    }
  } else {
    callback(new Error('Unexpected data on Writable Stream'));
  }
}

/**
 * Flattens the array of chunks accumulated in input.buffer.
 * @private
 */
function _flattenBufferIn () {
  if (this._isStreamInput()) {
    this.options.input.buffer = Buffer.concat(this.options.input.buffer);
  }
}

/**
 * Are we expecting Stream-based input?
 * @private
 * @returns {Boolean}
 */
function _isStreamInput () {
  return Array.isArray(this.options.input.buffer);
}

/**
 * Take a "snapshot" of the Sharp instance, returning a new instance.
 * Cloned instances inherit the input of their parent instance.
 * This allows multiple output Streams and therefore multiple processing pipelines to share a single input Stream.
 *
 * @example
 * const pipeline = sharp().rotate();
 * pipeline.clone().resize(800, 600).pipe(firstWritableStream);
 * pipeline.clone().extract({ left: 20, top: 20, width: 100, height: 100 }).pipe(secondWritableStream);
 * readableStream.pipe(pipeline);
 * // firstWritableStream receives auto-rotated, resized readableStream
 * // secondWritableStream receives auto-rotated, extracted region of readableStream
 *
 * @returns {Sharp}
 */
function clone () {
  // Clone existing options
  const clone = this.constructor.call();
  clone.options = Object.assign({}, this.options);
  // Pass 'finish' event to clone for Stream-based input
  if (this._isStreamInput()) {
    this.on('finish', () => {
      // Clone inherits input data
      this._flattenBufferIn();
      clone.options.bufferIn = this.options.bufferIn;
      clone.emit('finish');
    });
  }
  return clone;
}

/**
 * Fast access to (uncached) image metadata without decoding any compressed image data.
 * A `Promise` is returned when `callback` is not provided.
 *
 * - `format`: Name of decoder used to decompress image data e.g. `jpeg`, `png`, `webp`, `gif`, `svg`
 * - `size`: Total size of image in bytes, for Stream and Buffer input only
 * - `width`: Number of pixels wide (EXIF orientation is not taken into consideration)
 * - `height`: Number of pixels high (EXIF orientation is not taken into consideration)
 * - `space`: Name of colour space interpretation e.g. `srgb`, `rgb`, `cmyk`, `lab`, `b-w` [...](https://github.com/libvips/libvips/blob/master/libvips/iofuncs/enumtypes.c#L636)
 * - `channels`: Number of bands e.g. `3` for sRGB, `4` for CMYK
 * - `depth`: Name of pixel depth format e.g. `uchar`, `char`, `ushort`, `float` [...](https://github.com/libvips/libvips/blob/master/libvips/iofuncs/enumtypes.c#L672)
 * - `density`: Number of pixels per inch (DPI), if present
 * - `chromaSubsampling`: String containing JPEG chroma subsampling, `4:2:0` or `4:4:4` for RGB, `4:2:0:4` or `4:4:4:4` for CMYK
 * - `isProgressive`: Boolean indicating whether the image is interlaced using a progressive scan
 * - `pages`: Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP
 * - `pageHeight`: Number of pixels high each page in this PDF image will be.
 * - `pagePrimary`: Number of the primary page in a HEIF image
 * - `hasProfile`: Boolean indicating the presence of an embedded ICC profile
 * - `hasAlpha`: Boolean indicating the presence of an alpha transparency channel
 * - `orientation`: Number value of the EXIF Orientation header, if present
 * - `exif`: Buffer containing raw EXIF data, if present
 * - `icc`: Buffer containing raw [ICC](https://www.npmjs.com/package/icc) profile data, if present
 * - `iptc`: Buffer containing raw IPTC data, if present
 * - `xmp`: Buffer containing raw XMP data, if present
 * - `tifftagPhotoshop`: Buffer containing raw TIFFTAG_PHOTOSHOP data, if present
 *
 * @example
 * const image = sharp(inputJpg);
 * image
 *   .metadata()
 *   .then(function(metadata) {
 *     return image
 *       .resize(Math.round(metadata.width / 2))
 *       .webp()
 *       .toBuffer();
 *   })
 *   .then(function(data) {
 *     // data contains a WebP image half the width and height of the original JPEG
 *   });
 *
 * @param {Function} [callback] - called with the arguments `(err, metadata)`
 * @returns {Promise<Object>|Sharp}
 */
function metadata (callback) {
  if (is.fn(callback)) {
    if (this._isStreamInput()) {
      this.on('finish', () => {
        this._flattenBufferIn();
        sharp.metadata(this.options, callback);
      });
    } else {
      sharp.metadata(this.options, callback);
    }
    return this;
  } else {
    if (this._isStreamInput()) {
      return new Promise((resolve, reject) => {
        this.on('finish', () => {
          this._flattenBufferIn();
          sharp.metadata(this.options, (err, metadata) => {
            if (err) {
              reject(err);
            } else {
              resolve(metadata);
            }
          });
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        sharp.metadata(this.options, (err, metadata) => {
          if (err) {
            reject(err);
          } else {
            resolve(metadata);
          }
        });
      });
    }
  }
}

/**
 * Access to pixel-derived image statistics for every channel in the image.
 * A `Promise` is returned when `callback` is not provided.
 *
 * - `channels`: Array of channel statistics for each channel in the image. Each channel statistic contains
 *     - `min` (minimum value in the channel)
 *     - `max` (maximum value in the channel)
 *     - `sum` (sum of all values in a channel)
 *     - `squaresSum` (sum of squared values in a channel)
 *     - `mean` (mean of the values in a channel)
 *     - `stdev` (standard deviation for the values in a channel)
 *     - `minX` (x-coordinate of one of the pixel where the minimum lies)
 *     - `minY` (y-coordinate of one of the pixel where the minimum lies)
 *     - `maxX` (x-coordinate of one of the pixel where the maximum lies)
 *     - `maxY` (y-coordinate of one of the pixel where the maximum lies)
 * - `isOpaque`: Value to identify if the image is opaque or transparent, based on the presence and use of alpha channel
 * - `entropy`: Histogram-based estimation of greyscale entropy, discarding alpha channel if any (experimental)
 *
 * @example
 * const image = sharp(inputJpg);
 * image
 *   .stats()
 *   .then(function(stats) {
 *      // stats contains the channel-wise statistics array and the isOpaque value
 *   });
 *
 * @param {Function} [callback] - called with the arguments `(err, stats)`
 * @returns {Promise<Object>}
 */
function stats (callback) {
  if (is.fn(callback)) {
    if (this._isStreamInput()) {
      this.on('finish', () => {
        this._flattenBufferIn();
        sharp.stats(this.options, callback);
      });
    } else {
      sharp.stats(this.options, callback);
    }
    return this;
  } else {
    if (this._isStreamInput()) {
      return new Promise((resolve, reject) => {
        this.on('finish', function () {
          this._flattenBufferIn();
          sharp.stats(this.options, (err, stats) => {
            if (err) {
              reject(err);
            } else {
              resolve(stats);
            }
          });
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        sharp.stats(this.options, (err, stats) => {
          if (err) {
            reject(err);
          } else {
            resolve(stats);
          }
        });
      });
    }
  }
}

/**
 * Do not process input images where the number of pixels (width x height) exceeds this limit.
 * Assumes image dimensions contained in the input metadata can be trusted.
 * The default limit is 268402689 (0x3FFF x 0x3FFF) pixels.
 * @param {(Number|Boolean)} limit - an integral Number of pixels, zero or false to remove limit, true to use default limit.
 * @returns {Sharp}
 * @throws {Error} Invalid limit
*/
function limitInputPixels (limit) {
  // if we pass in false we represent the integer as 0 to disable
  if (limit === false) {
    limit = 0;
  } else if (limit === true) {
    limit = Math.pow(0x3FFF, 2);
  }
  if (is.integer(limit) && limit >= 0) {
    this.options.limitInputPixels = limit;
  } else {
    throw is.invalidParameterError('limitInputPixels', 'integer', limit);
  }
  return this;
}

/**
 * An advanced setting that switches the libvips access method to `VIPS_ACCESS_SEQUENTIAL`.
 * This will reduce memory usage and can improve performance on some systems.
 *
 * The default behaviour *before* function call is `false`, meaning the libvips access method is not sequential.
 *
 * @param {Boolean} [sequentialRead=true]
 * @returns {Sharp}
 */
function sequentialRead (sequentialRead) {
  this.options.sequentialRead = is.bool(sequentialRead) ? sequentialRead : true;
  return this;
}

/**
 * Decorate the Sharp prototype with input-related functions.
 * @private
 */
module.exports = function (Sharp) {
  Object.assign(Sharp.prototype, {
    // Private
    _createInputDescriptor,
    _write,
    _flattenBufferIn,
    _isStreamInput,
    // Public
    clone,
    metadata,
    stats,
    limitInputPixels,
    sequentialRead
  });
};


/***/ }),

/***/ "../../sharp/lib/is.js":
/*!*************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/is.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Is this value defined and not null?
 * @private
 */
const defined = function (val) {
  return typeof val !== 'undefined' && val !== null;
};

/**
 * Is this value an object?
 * @private
 */
const object = function (val) {
  return typeof val === 'object';
};

/**
 * Is this value a plain object?
 * @private
 */
const plainObject = function (val) {
  return object(val) && Object.prototype.toString.call(val) === '[object Object]';
};

/**
 * Is this value a function?
 * @private
 */
const fn = function (val) {
  return typeof val === 'function';
};

/**
 * Is this value a boolean?
 * @private
 */
const bool = function (val) {
  return typeof val === 'boolean';
};

/**
 * Is this value a Buffer object?
 * @private
 */
const buffer = function (val) {
  return object(val) && val instanceof Buffer;
};

/**
 * Is this value a non-empty string?
 * @private
 */
const string = function (val) {
  return typeof val === 'string' && val.length > 0;
};

/**
 * Is this value a real number?
 * @private
 */
const number = function (val) {
  return typeof val === 'number' && !Number.isNaN(val);
};

/**
 * Is this value an integer?
 * @private
 */
const integer = function (val) {
  return number(val) && val % 1 === 0;
};

/**
 * Is this value within an inclusive given range?
 * @private
 */
const inRange = function (val, min, max) {
  return val >= min && val <= max;
};

/**
 * Is this value within the elements of an array?
 * @private
 */
const inArray = function (val, list) {
  return list.indexOf(val) !== -1;
};

/**
 * Create an Error with a message relating to an invalid parameter.
 *
 * @param {String} name - parameter name.
 * @param {String} expected - description of the type/value/range expected.
 * @param {*} actual - the value received.
 * @returns {Error} Containing the formatted message.
 * @private
 */
const invalidParameterError = function (name, expected, actual) {
  return new Error(
    `Expected ${expected} for ${name} but received ${actual} of type ${typeof actual}`
  );
};

module.exports = {
  defined: defined,
  object: object,
  plainObject: plainObject,
  fn: fn,
  bool: bool,
  buffer: buffer,
  string: string,
  number: number,
  integer: integer,
  inRange: inRange,
  inArray: inArray,
  invalidParameterError: invalidParameterError
};


/***/ }),

/***/ "../../sharp/lib/libvips.js":
/*!******************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/libvips.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

const fs = __webpack_require__(/*! fs */ "fs");
const os = __webpack_require__(/*! os */ "os");
const path = __webpack_require__(/*! path */ "path");
const spawnSync = __webpack_require__(/*! child_process */ "child_process").spawnSync;
const semver = __webpack_require__(/*! semver */ "../../semver/semver.js");
const platform = __webpack_require__(/*! ./platform */ "../../sharp/lib/platform.js");

const env = process.env;
const minimumLibvipsVersion = env.npm_package_config_libvips || /* istanbul ignore next */
  __webpack_require__(/*! ../package.json */ "../../sharp/package.json").config.libvips;

const spawnSyncOptions = {
  encoding: 'utf8',
  shell: true
};

const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    /* istanbul ignore if */
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
};

const cachePath = function () {
  const npmCachePath = env.npm_config_cache || /* istanbul ignore next */
    (env.APPDATA ? path.join(env.APPDATA, 'npm-cache') : path.join(os.homedir(), '.npm'));
  mkdirSync(npmCachePath);
  const libvipsCachePath = path.join(npmCachePath, '_libvips');
  mkdirSync(libvipsCachePath);
  return libvipsCachePath;
};

const globalLibvipsVersion = function () {
  if (process.platform !== 'win32') {
    const globalLibvipsVersion = spawnSync(`PKG_CONFIG_PATH="${pkgConfigPath()}" pkg-config --modversion vips-cpp`, spawnSyncOptions).stdout || '';
    return globalLibvipsVersion.trim();
  } else {
    return '';
  }
};

const hasVendoredLibvips = function () {
  const currentPlatformId = platform();
  const vendorPath = path.join(__dirname, '..', 'vendor');
  let vendorVersionId;
  let vendorPlatformId;
  try {
    vendorVersionId = __webpack_require__("../../sharp/lib sync recursive")(path.join(vendorPath, 'versions.json')).vips;
    vendorPlatformId = __webpack_require__("../../sharp/lib sync recursive")(path.join(vendorPath, 'platform.json'));
  } catch (err) {}
  /* istanbul ignore if */
  if (vendorVersionId && vendorVersionId !== minimumLibvipsVersion) {
    throw new Error(`Found vendored libvips v${vendorVersionId} but require v${minimumLibvipsVersion}. Please remove the 'node_modules/sharp/vendor' directory and run 'npm install'.`);
  }
  /* istanbul ignore else */
  if (vendorPlatformId) {
    /* istanbul ignore else */
    if (currentPlatformId === vendorPlatformId) {
      return true;
    } else {
      throw new Error(`'${vendorPlatformId}' binaries cannot be used on the '${currentPlatformId}' platform. Please remove the 'node_modules/sharp/vendor' directory and run 'npm install'.`);
    }
  } else {
    return false;
  }
};

const pkgConfigPath = function () {
  if (process.platform !== 'win32') {
    const brewPkgConfigPath = spawnSync('which brew >/dev/null 2>&1 && eval $(brew --env) && echo $PKG_CONFIG_LIBDIR', spawnSyncOptions).stdout || '';
    return [brewPkgConfigPath.trim(), env.PKG_CONFIG_PATH, '/usr/local/lib/pkgconfig', '/usr/lib/pkgconfig']
      .filter(function (p) { return !!p; })
      .join(':');
  } else {
    return '';
  }
};

const useGlobalLibvips = function () {
  if (Boolean(env.SHARP_IGNORE_GLOBAL_LIBVIPS) === true) {
    return false;
  }

  const globalVipsVersion = globalLibvipsVersion();
  return !!globalVipsVersion && /* istanbul ignore next */
    semver.gte(globalVipsVersion, minimumLibvipsVersion);
};

module.exports = {
  minimumLibvipsVersion: minimumLibvipsVersion,
  cachePath: cachePath,
  globalLibvipsVersion: globalLibvipsVersion,
  hasVendoredLibvips: hasVendoredLibvips,
  pkgConfigPath: pkgConfigPath,
  useGlobalLibvips: useGlobalLibvips,
  mkdirSync: mkdirSync
};

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "../../sharp/lib/operation.js":
/*!********************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/operation.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(/*! color */ "../../color/index.js");
const is = __webpack_require__(/*! ./is */ "../../sharp/lib/is.js");

/**
 * Rotate the output image by either an explicit angle
 * or auto-orient based on the EXIF `Orientation` tag.
 *
 * If an angle is provided, it is converted to a valid positive degree rotation.
 * For example, `-450` will produce a 270deg rotation.
 *
 * When rotating by an angle other than a multiple of 90,
 * the background colour can be provided with the `background` option.
 *
 * If no angle is provided, it is determined from the EXIF data.
 * Mirroring is supported and may infer the use of a flip operation.
 *
 * The use of `rotate` implies the removal of the EXIF `Orientation` tag, if any.
 *
 * Method order is important when both rotating and extracting regions,
 * for example `rotate(x).extract(y)` will produce a different result to `extract(y).rotate(x)`.
 *
 * @example
 * const pipeline = sharp()
 *   .rotate()
 *   .resize(null, 200)
 *   .toBuffer(function (err, outputBuffer, info) {
 *     // outputBuffer contains 200px high JPEG image data,
 *     // auto-rotated using EXIF Orientation tag
 *     // info.width and info.height contain the dimensions of the resized image
 *   });
 * readableStream.pipe(pipeline);
 *
 * @param {Number} [angle=auto] angle of rotation.
 * @param {Object} [options] - if present, is an Object with optional attributes.
 * @param {String|Object} [options.background="#000000"] parsed by the [color](https://www.npmjs.org/package/color) module to extract values for red, green, blue and alpha.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function rotate (angle, options) {
  if (!is.defined(angle)) {
    this.options.useExifOrientation = true;
  } else if (is.integer(angle) && !(angle % 90)) {
    this.options.angle = angle;
  } else if (is.number(angle)) {
    this.options.rotationAngle = angle;
    if (is.object(options) && options.background) {
      const backgroundColour = color(options.background);
      this.options.rotationBackground = [
        backgroundColour.red(),
        backgroundColour.green(),
        backgroundColour.blue(),
        Math.round(backgroundColour.alpha() * 255)
      ];
    }
  } else {
    throw is.invalidParameterError('angle', 'numeric', angle);
  }
  return this;
}

/**
 * Flip the image about the vertical Y axis. This always occurs after rotation, if any.
 * The use of `flip` implies the removal of the EXIF `Orientation` tag, if any.
 * @param {Boolean} [flip=true]
 * @returns {Sharp}
 */
function flip (flip) {
  this.options.flip = is.bool(flip) ? flip : true;
  return this;
}

/**
 * Flop the image about the horizontal X axis. This always occurs after rotation, if any.
 * The use of `flop` implies the removal of the EXIF `Orientation` tag, if any.
 * @param {Boolean} [flop=true]
 * @returns {Sharp}
 */
function flop (flop) {
  this.options.flop = is.bool(flop) ? flop : true;
  return this;
}

/**
 * Sharpen the image.
 * When used without parameters, performs a fast, mild sharpen of the output image.
 * When a `sigma` is provided, performs a slower, more accurate sharpen of the L channel in the LAB colour space.
 * Separate control over the level of sharpening in "flat" and "jagged" areas is available.
 *
 * @param {Number} [sigma] - the sigma of the Gaussian mask, where `sigma = 1 + radius / 2`.
 * @param {Number} [flat=1.0] - the level of sharpening to apply to "flat" areas.
 * @param {Number} [jagged=2.0] - the level of sharpening to apply to "jagged" areas.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function sharpen (sigma, flat, jagged) {
  if (!is.defined(sigma)) {
    // No arguments: default to mild sharpen
    this.options.sharpenSigma = -1;
  } else if (is.bool(sigma)) {
    // Boolean argument: apply mild sharpen?
    this.options.sharpenSigma = sigma ? -1 : 0;
  } else if (is.number(sigma) && is.inRange(sigma, 0.01, 10000)) {
    // Numeric argument: specific sigma
    this.options.sharpenSigma = sigma;
    // Control over flat areas
    if (is.defined(flat)) {
      if (is.number(flat) && is.inRange(flat, 0, 10000)) {
        this.options.sharpenFlat = flat;
      } else {
        throw is.invalidParameterError('flat', 'number between 0 and 10000', flat);
      }
    }
    // Control over jagged areas
    if (is.defined(jagged)) {
      if (is.number(jagged) && is.inRange(jagged, 0, 10000)) {
        this.options.sharpenJagged = jagged;
      } else {
        throw is.invalidParameterError('jagged', 'number between 0 and 10000', jagged);
      }
    }
  } else {
    throw is.invalidParameterError('sigma', 'number between 0.01 and 10000', sigma);
  }
  return this;
}

/**
 * Apply median filter.
 * When used without parameters the default window is 3x3.
 * @param {Number} [size=3] square mask size: size x size
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function median (size) {
  if (!is.defined(size)) {
    // No arguments: default to 3x3
    this.options.medianSize = 3;
  } else if (is.integer(size) && is.inRange(size, 1, 1000)) {
    // Numeric argument: specific sigma
    this.options.medianSize = size;
  } else {
    throw is.invalidParameterError('size', 'integer between 1 and 1000', size);
  }
  return this;
}

/**
 * Blur the image.
 * When used without parameters, performs a fast, mild blur of the output image.
 * When a `sigma` is provided, performs a slower, more accurate Gaussian blur.
 * @param {Number} [sigma] a value between 0.3 and 1000 representing the sigma of the Gaussian mask, where `sigma = 1 + radius / 2`.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function blur (sigma) {
  if (!is.defined(sigma)) {
    // No arguments: default to mild blur
    this.options.blurSigma = -1;
  } else if (is.bool(sigma)) {
    // Boolean argument: apply mild blur?
    this.options.blurSigma = sigma ? -1 : 0;
  } else if (is.number(sigma) && is.inRange(sigma, 0.3, 1000)) {
    // Numeric argument: specific sigma
    this.options.blurSigma = sigma;
  } else {
    throw is.invalidParameterError('sigma', 'number between 0.3 and 1000', sigma);
  }
  return this;
}

/**
 * Merge alpha transparency channel, if any, with a background.
 * @param {Object} [options]
 * @param {String|Object} [options.background={r: 0, g: 0, b: 0}] - background colour, parsed by the [color](https://www.npmjs.org/package/color) module, defaults to black.
 * @returns {Sharp}
 */
function flatten (options) {
  this.options.flatten = is.bool(options) ? options : true;
  if (is.object(options)) {
    this._setBackgroundColourOption('flattenBackground', options.background);
  }
  return this;
}

/**
 * Apply a gamma correction by reducing the encoding (darken) pre-resize at a factor of `1/gamma`
 * then increasing the encoding (brighten) post-resize at a factor of `gamma`.
 * This can improve the perceived brightness of a resized image in non-linear colour spaces.
 * JPEG and WebP input images will not take advantage of the shrink-on-load performance optimisation
 * when applying a gamma correction.
 *
 * Supply a second argument to use a different output gamma value, otherwise the first value is used in both cases.
 *
 * @param {Number} [gamma=2.2] value between 1.0 and 3.0.
 * @param {Number} [gammaOut] value between 1.0 and 3.0. (optional, defaults to same as `gamma`)
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function gamma (gamma, gammaOut) {
  if (!is.defined(gamma)) {
    // Default gamma correction of 2.2 (sRGB)
    this.options.gamma = 2.2;
  } else if (is.number(gamma) && is.inRange(gamma, 1, 3)) {
    this.options.gamma = gamma;
  } else {
    throw is.invalidParameterError('gamma', 'number between 1.0 and 3.0', gamma);
  }
  if (!is.defined(gammaOut)) {
    // Default gamma correction for output is same as input
    this.options.gammaOut = this.options.gamma;
  } else if (is.number(gammaOut) && is.inRange(gammaOut, 1, 3)) {
    this.options.gammaOut = gammaOut;
  } else {
    throw is.invalidParameterError('gammaOut', 'number between 1.0 and 3.0', gammaOut);
  }
  return this;
}

/**
 * Produce the "negative" of the image.
 * @param {Boolean} [negate=true]
 * @returns {Sharp}
 */
function negate (negate) {
  this.options.negate = is.bool(negate) ? negate : true;
  return this;
}

/**
 * Enhance output image contrast by stretching its luminance to cover the full dynamic range.
 * @param {Boolean} [normalise=true]
 * @returns {Sharp}
 */
function normalise (normalise) {
  this.options.normalise = is.bool(normalise) ? normalise : true;
  return this;
}

/**
 * Alternative spelling of normalise.
 * @param {Boolean} [normalize=true]
 * @returns {Sharp}
 */
function normalize (normalize) {
  return this.normalise(normalize);
}

/**
 * Convolve the image with the specified kernel.
 *
 * @example
 * sharp(input)
 *   .convolve({
 *     width: 3,
 *     height: 3,
 *     kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1]
 *   })
 *   .raw()
 *   .toBuffer(function(err, data, info) {
 *     // data contains the raw pixel data representing the convolution
 *     // of the input image with the horizontal Sobel operator
 *   });
 *
 * @param {Object} kernel
 * @param {Number} kernel.width - width of the kernel in pixels.
 * @param {Number} kernel.height - width of the kernel in pixels.
 * @param {Array<Number>} kernel.kernel - Array of length `width*height` containing the kernel values.
 * @param {Number} [kernel.scale=sum] - the scale of the kernel in pixels.
 * @param {Number} [kernel.offset=0] - the offset of the kernel in pixels.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function convolve (kernel) {
  if (!is.object(kernel) || !Array.isArray(kernel.kernel) ||
      !is.integer(kernel.width) || !is.integer(kernel.height) ||
      !is.inRange(kernel.width, 3, 1001) || !is.inRange(kernel.height, 3, 1001) ||
      kernel.height * kernel.width !== kernel.kernel.length
  ) {
    // must pass in a kernel
    throw new Error('Invalid convolution kernel');
  }
  // Default scale is sum of kernel values
  if (!is.integer(kernel.scale)) {
    kernel.scale = kernel.kernel.reduce(function (a, b) {
      return a + b;
    }, 0);
  }
  // Clip scale to a minimum value of 1
  if (kernel.scale < 1) {
    kernel.scale = 1;
  }
  if (!is.integer(kernel.offset)) {
    kernel.offset = 0;
  }
  this.options.convKernel = kernel;
  return this;
}

/**
 * Any pixel value greather than or equal to the threshold value will be set to 255, otherwise it will be set to 0.
 * @param {Number} [threshold=128] - a value in the range 0-255 representing the level at which the threshold will be applied.
 * @param {Object} [options]
 * @param {Boolean} [options.greyscale=true] - convert to single channel greyscale.
 * @param {Boolean} [options.grayscale=true] - alternative spelling for greyscale.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function threshold (threshold, options) {
  if (!is.defined(threshold)) {
    this.options.threshold = 128;
  } else if (is.bool(threshold)) {
    this.options.threshold = threshold ? 128 : 0;
  } else if (is.integer(threshold) && is.inRange(threshold, 0, 255)) {
    this.options.threshold = threshold;
  } else {
    throw is.invalidParameterError('threshold', 'integer between 0 and 255', threshold);
  }
  if (!is.object(options) || options.greyscale === true || options.grayscale === true) {
    this.options.thresholdGrayscale = true;
  } else {
    this.options.thresholdGrayscale = false;
  }
  return this;
}

/**
 * Perform a bitwise boolean operation with operand image.
 *
 * This operation creates an output image where each pixel is the result of
 * the selected bitwise boolean `operation` between the corresponding pixels of the input images.
 *
 * @param {Buffer|String} operand - Buffer containing image data or String containing the path to an image file.
 * @param {String} operator - one of `and`, `or` or `eor` to perform that bitwise operation, like the C logic operators `&`, `|` and `^` respectively.
 * @param {Object} [options]
 * @param {Object} [options.raw] - describes operand when using raw pixel data.
 * @param {Number} [options.raw.width]
 * @param {Number} [options.raw.height]
 * @param {Number} [options.raw.channels]
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function boolean (operand, operator, options) {
  this.options.boolean = this._createInputDescriptor(operand, options);
  if (is.string(operator) && is.inArray(operator, ['and', 'or', 'eor'])) {
    this.options.booleanOp = operator;
  } else {
    throw is.invalidParameterError('operator', 'one of: and, or, eor', operator);
  }
  return this;
}

/**
 * Apply the linear formula a * input + b to the image (levels adjustment)
 * @param {Number} [a=1.0] multiplier
 * @param {Number} [b=0.0] offset
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function linear (a, b) {
  if (!is.defined(a)) {
    this.options.linearA = 1.0;
  } else if (is.number(a)) {
    this.options.linearA = a;
  } else {
    throw is.invalidParameterError('a', 'numeric', a);
  }
  if (!is.defined(b)) {
    this.options.linearB = 0.0;
  } else if (is.number(b)) {
    this.options.linearB = b;
  } else {
    throw is.invalidParameterError('b', 'numeric', b);
  }
  return this;
}

/**
 * Recomb the image with the specified matrix.
 *
 * @example
 * sharp(input)
 *   .recomb([
 *    [0.3588, 0.7044, 0.1368],
 *    [0.2990, 0.5870, 0.1140],
 *    [0.2392, 0.4696, 0.0912],
 *   ])
 *   .raw()
 *   .toBuffer(function(err, data, info) {
 *     // data contains the raw pixel data after applying the recomb
 *     // With this example input, a sepia filter has been applied
 *   });
 *
 * @param {Array<Array<Number>>} 3x3 Recombination matrix
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function recomb (inputMatrix) {
  if (!Array.isArray(inputMatrix) || inputMatrix.length !== 3 ||
      inputMatrix[0].length !== 3 ||
      inputMatrix[1].length !== 3 ||
      inputMatrix[2].length !== 3
  ) {
    // must pass in a kernel
    throw new Error('Invalid recombination matrix');
  }
  this.options.recombMatrix = [
    inputMatrix[0][0], inputMatrix[0][1], inputMatrix[0][2],
    inputMatrix[1][0], inputMatrix[1][1], inputMatrix[1][2],
    inputMatrix[2][0], inputMatrix[2][1], inputMatrix[2][2]
  ].map(Number);
  return this;
}

/**
 * Transforms the image using brightness, saturation and hue rotation.
 *
 * @example
 * sharp(input)
 *   .modulate({
 *     brightness: 2 // increase lightness by a factor of 2
 *   });
 *
 * sharp(input)
 *   .modulate({
 *     hue: 180 // hue-rotate by 180 degrees
 *   });
 *
 * // decreate brightness and saturation while also hue-rotating by 90 degrees
 * sharp(input)
 *   .modulate({
 *     brightness: 0.5,
 *     saturation: 0.5,
 *     hue: 90
 *   });
 *
 * @param {Object} [options]
 * @param {Number} [options.brightness] Brightness multiplier
 * @param {Number} [options.saturation] Saturation multiplier
 * @param {Number} [options.hue] Degrees for hue rotation
 * @returns {Sharp}
 */
function modulate (options) {
  if (!is.plainObject(options)) {
    throw is.invalidParameterError('options', 'plain object', options);
  }
  if ('brightness' in options) {
    if (is.number(options.brightness) && options.brightness >= 0) {
      this.options.brightness = options.brightness;
    } else {
      throw is.invalidParameterError('brightness', 'number above zero', options.brightness);
    }
  }
  if ('saturation' in options) {
    if (is.number(options.saturation) && options.saturation >= 0) {
      this.options.saturation = options.saturation;
    } else {
      throw is.invalidParameterError('saturation', 'number above zero', options.saturation);
    }
  }
  if ('hue' in options) {
    if (is.integer(options.hue)) {
      this.options.hue = options.hue % 360;
    } else {
      throw is.invalidParameterError('hue', 'number', options.hue);
    }
  }
  return this;
}

/**
 * Decorate the Sharp prototype with operation-related functions.
 * @private
 */
module.exports = function (Sharp) {
  Object.assign(Sharp.prototype, {
    rotate,
    flip,
    flop,
    sharpen,
    median,
    blur,
    flatten,
    gamma,
    negate,
    normalise,
    normalize,
    convolve,
    threshold,
    boolean,
    linear,
    recomb,
    modulate
  });
};


/***/ }),

/***/ "../../sharp/lib/output.js":
/*!*****************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/output.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const is = __webpack_require__(/*! ./is */ "../../sharp/lib/is.js");
const sharp = __webpack_require__(/*! ../build/Release/sharp.node */ "../../sharp/build/Release/sharp.node");

/**
 * Write output image data to a file.
 *
 * If an explicit output format is not selected, it will be inferred from the extension,
 * with JPEG, PNG, WebP, TIFF, DZI, and libvips' V format supported.
 * Note that raw pixel data is only supported for buffer output.
 *
 * By default all metadata will be removed, which includes EXIF-based orientation.
 * See {@link withMetadata} for control over this.
 *
 * A `Promise` is returned when `callback` is not provided.
 *
 * @example
 * sharp(input)
 *   .toFile('output.png', (err, info) => { ... });
 *
 * @example
 * sharp(input)
 *   .toFile('output.png')
 *   .then(info => { ... })
 *   .catch(err => { ... });
 *
 * @param {String} fileOut - the path to write the image data to.
 * @param {Function} [callback] - called on completion with two arguments `(err, info)`.
 * `info` contains the output image `format`, `size` (bytes), `width`, `height`,
 * `channels` and `premultiplied` (indicating if premultiplication was used).
 * When using a crop strategy also contains `cropOffsetLeft` and `cropOffsetTop`.
 * @returns {Promise<Object>} - when no callback is provided
 * @throws {Error} Invalid parameters
 */
function toFile (fileOut, callback) {
  if (!fileOut || fileOut.length === 0) {
    const errOutputInvalid = new Error('Missing output file path');
    if (is.fn(callback)) {
      callback(errOutputInvalid);
    } else {
      return Promise.reject(errOutputInvalid);
    }
  } else {
    if (this.options.input.file === fileOut) {
      const errOutputIsInput = new Error('Cannot use same file for input and output');
      if (is.fn(callback)) {
        callback(errOutputIsInput);
      } else {
        return Promise.reject(errOutputIsInput);
      }
    } else {
      this.options.fileOut = fileOut;
      return this._pipeline(callback);
    }
  }
  return this;
}

/**
 * Write output to a Buffer.
 * JPEG, PNG, WebP, TIFF and RAW output are supported.
 *
 * If no explicit format is set, the output format will match the input image, except GIF and SVG input which become PNG output.
 *
 * By default all metadata will be removed, which includes EXIF-based orientation.
 * See {@link withMetadata} for control over this.
 *
 * `callback`, if present, gets three arguments `(err, data, info)` where:
 * - `err` is an error, if any.
 * - `data` is the output image data.
 * - `info` contains the output image `format`, `size` (bytes), `width`, `height`,
 * `channels` and `premultiplied` (indicating if premultiplication was used).
 * When using a crop strategy also contains `cropOffsetLeft` and `cropOffsetTop`.
 *
 * A `Promise` is returned when `callback` is not provided.
 *
 * @example
 * sharp(input)
 *   .toBuffer((err, data, info) => { ... });
 *
 * @example
 * sharp(input)
 *   .toBuffer()
 *   .then(data => { ... })
 *   .catch(err => { ... });
 *
 * @example
 * sharp(input)
 *   .toBuffer({ resolveWithObject: true })
 *   .then(({ data, info }) => { ... })
 *   .catch(err => { ... });
 *
 * @param {Object} [options]
 * @param {Boolean} [options.resolveWithObject] Resolve the Promise with an Object containing `data` and `info` properties instead of resolving only with `data`.
 * @param {Function} [callback]
 * @returns {Promise<Buffer>} - when no callback is provided
 */
function toBuffer (options, callback) {
  if (is.object(options)) {
    this._setBooleanOption('resolveWithObject', options.resolveWithObject);
  } else if (this.options.resolveWithObject) {
    this.options.resolveWithObject = false;
  }
  return this._pipeline(is.fn(options) ? options : callback);
}

/**
 * Include all metadata (EXIF, XMP, IPTC) from the input image in the output image.
 * The default behaviour, when `withMetadata` is not used, is to strip all metadata and convert to the device-independent sRGB colour space.
 * This will also convert to and add a web-friendly sRGB ICC profile.
 *
 * @example
 * sharp('input.jpg')
 *   .withMetadata()
 *   .toFile('output-with-metadata.jpg')
 *   .then(info => { ... });
 *
 * @param {Object} [options]
 * @param {Number} [options.orientation] value between 1 and 8, used to update the EXIF `Orientation` tag.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function withMetadata (options) {
  this.options.withMetadata = is.bool(options) ? options : true;
  if (is.object(options)) {
    if (is.defined(options.orientation)) {
      if (is.integer(options.orientation) && is.inRange(options.orientation, 1, 8)) {
        this.options.withMetadataOrientation = options.orientation;
      } else {
        throw is.invalidParameterError('orientation', 'integer between 1 and 8', options.orientation);
      }
    }
  }
  return this;
}

/**
 * Use these JPEG options for output image.
 *
 * @example
 * // Convert any input to very high quality JPEG output
 * const data = await sharp(input)
 *   .jpeg({
 *     quality: 100,
 *     chromaSubsampling: '4:4:4'
 *   })
 *   .toBuffer();
 *
 * @param {Object} [options] - output options
 * @param {Number} [options.quality=80] - quality, integer 1-100
 * @param {Boolean} [options.progressive=false] - use progressive (interlace) scan
 * @param {String} [options.chromaSubsampling='4:2:0'] - set to '4:4:4' to prevent chroma subsampling when quality <= 90
 * @param {Boolean} [options.trellisQuantisation=false] - apply trellis quantisation, requires libvips compiled with support for mozjpeg
 * @param {Boolean} [options.overshootDeringing=false] - apply overshoot deringing, requires libvips compiled with support for mozjpeg
 * @param {Boolean} [options.optimiseScans=false] - optimise progressive scans, forces progressive, requires libvips compiled with support for mozjpeg
 * @param {Boolean} [options.optimizeScans=false] - alternative spelling of optimiseScans
 * @param {Boolean} [options.optimiseCoding=true] - optimise Huffman coding tables
 * @param {Boolean} [options.optimizeCoding=true] - alternative spelling of optimiseCoding
 * @param {Number} [options.quantisationTable=0] - quantization table to use, integer 0-8, requires libvips compiled with support for mozjpeg
 * @param {Number} [options.quantizationTable=0] - alternative spelling of quantisationTable
 * @param {Boolean} [options.force=true] - force JPEG output, otherwise attempt to use input format
 * @returns {Sharp}
 * @throws {Error} Invalid options
 */
function jpeg (options) {
  if (is.object(options)) {
    if (is.defined(options.quality)) {
      if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
        this.options.jpegQuality = options.quality;
      } else {
        throw is.invalidParameterError('quality', 'integer between 1 and 100', options.quality);
      }
    }
    if (is.defined(options.progressive)) {
      this._setBooleanOption('jpegProgressive', options.progressive);
    }
    if (is.defined(options.chromaSubsampling)) {
      if (is.string(options.chromaSubsampling) && is.inArray(options.chromaSubsampling, ['4:2:0', '4:4:4'])) {
        this.options.jpegChromaSubsampling = options.chromaSubsampling;
      } else {
        throw is.invalidParameterError('chromaSubsampling', 'one of: 4:2:0, 4:4:4', options.chromaSubsampling);
      }
    }
    const trellisQuantisation = is.bool(options.trellisQuantization) ? options.trellisQuantization : options.trellisQuantisation;
    if (is.defined(trellisQuantisation)) {
      this._setBooleanOption('jpegTrellisQuantisation', trellisQuantisation);
    }
    if (is.defined(options.overshootDeringing)) {
      this._setBooleanOption('jpegOvershootDeringing', options.overshootDeringing);
    }
    const optimiseScans = is.bool(options.optimizeScans) ? options.optimizeScans : options.optimiseScans;
    if (is.defined(optimiseScans)) {
      this._setBooleanOption('jpegOptimiseScans', optimiseScans);
      if (optimiseScans) {
        this.options.jpegProgressive = true;
      }
    }
    const optimiseCoding = is.bool(options.optimizeCoding) ? options.optimizeCoding : options.optimiseCoding;
    if (is.defined(optimiseCoding)) {
      this._setBooleanOption('jpegOptimiseCoding', optimiseCoding);
    }
    const quantisationTable = is.number(options.quantizationTable) ? options.quantizationTable : options.quantisationTable;
    if (is.defined(quantisationTable)) {
      if (is.integer(quantisationTable) && is.inRange(quantisationTable, 0, 8)) {
        this.options.jpegQuantisationTable = quantisationTable;
      } else {
        throw is.invalidParameterError('quantisationTable', 'integer between 0 and 8', quantisationTable);
      }
    }
  }
  return this._updateFormatOut('jpeg', options);
}

/**
 * Use these PNG options for output image.
 *
 * PNG output is always full colour at 8 or 16 bits per pixel.
 * Indexed PNG input at 1, 2 or 4 bits per pixel is converted to 8 bits per pixel.
 *
 * @example
 * // Convert any input to PNG output
 * const data = await sharp(input)
 *   .png()
 *   .toBuffer();
 *
 * @param {Object} [options]
 * @param {Boolean} [options.progressive=false] - use progressive (interlace) scan
 * @param {Number} [options.compressionLevel=9] - zlib compression level, 0-9
 * @param {Boolean} [options.adaptiveFiltering=false] - use adaptive row filtering
 * @param {Boolean} [options.palette=false] - quantise to a palette-based image with alpha transparency support, requires libvips compiled with support for libimagequant
 * @param {Number} [options.quality=100] - use the lowest number of colours needed to achieve given quality, requires libvips compiled with support for libimagequant
 * @param {Number} [options.colours=256] - maximum number of palette entries, requires libvips compiled with support for libimagequant
 * @param {Number} [options.colors=256] - alternative spelling of `options.colours`, requires libvips compiled with support for libimagequant
 * @param {Number} [options.dither=1.0] - level of Floyd-Steinberg error diffusion, requires libvips compiled with support for libimagequant
 * @param {Boolean} [options.force=true] - force PNG output, otherwise attempt to use input format
 * @returns {Sharp}
 * @throws {Error} Invalid options
 */
function png (options) {
  if (is.object(options)) {
    if (is.defined(options.progressive)) {
      this._setBooleanOption('pngProgressive', options.progressive);
    }
    if (is.defined(options.compressionLevel)) {
      if (is.integer(options.compressionLevel) && is.inRange(options.compressionLevel, 0, 9)) {
        this.options.pngCompressionLevel = options.compressionLevel;
      } else {
        throw is.invalidParameterError('compressionLevel', 'integer between 0 and 9', options.compressionLevel);
      }
    }
    if (is.defined(options.adaptiveFiltering)) {
      this._setBooleanOption('pngAdaptiveFiltering', options.adaptiveFiltering);
    }
    if (is.defined(options.palette)) {
      this._setBooleanOption('pngPalette', options.palette);
      if (this.options.pngPalette) {
        if (is.defined(options.quality)) {
          if (is.integer(options.quality) && is.inRange(options.quality, 0, 100)) {
            this.options.pngQuality = options.quality;
          } else {
            throw is.invalidParameterError('quality', 'integer between 0 and 100', options.quality);
          }
        }
        const colours = options.colours || options.colors;
        if (is.defined(colours)) {
          if (is.integer(colours) && is.inRange(colours, 2, 256)) {
            this.options.pngColours = colours;
          } else {
            throw is.invalidParameterError('colours', 'integer between 2 and 256', colours);
          }
        }
        if (is.defined(options.dither)) {
          if (is.number(options.dither) && is.inRange(options.dither, 0, 1)) {
            this.options.pngDither = options.dither;
          } else {
            throw is.invalidParameterError('dither', 'number between 0.0 and 1.0', options.dither);
          }
        }
      }
    }
  }
  return this._updateFormatOut('png', options);
}

/**
 * Use these WebP options for output image.
 *
 * @example
 * // Convert any input to lossless WebP output
 * const data = await sharp(input)
 *   .webp({ lossless: true })
 *   .toBuffer();
 *
 * @param {Object} [options] - output options
 * @param {Number} [options.quality=80] - quality, integer 1-100
 * @param {Number} [options.alphaQuality=100] - quality of alpha layer, integer 0-100
 * @param {Boolean} [options.lossless=false] - use lossless compression mode
 * @param {Boolean} [options.nearLossless=false] - use near_lossless compression mode
 * @param {Boolean} [options.smartSubsample=false] - use high quality chroma subsampling
 * @param {Number} [options.reductionEffort=4] - level of CPU effort to reduce file size, integer 0-6
 * @param {Boolean} [options.force=true] - force WebP output, otherwise attempt to use input format
 * @returns {Sharp}
 * @throws {Error} Invalid options
 */
function webp (options) {
  if (is.object(options) && is.defined(options.quality)) {
    if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
      this.options.webpQuality = options.quality;
    } else {
      throw is.invalidParameterError('quality', 'integer between 1 and 100', options.quality);
    }
  }
  if (is.object(options) && is.defined(options.alphaQuality)) {
    if (is.integer(options.alphaQuality) && is.inRange(options.alphaQuality, 0, 100)) {
      this.options.webpAlphaQuality = options.alphaQuality;
    } else {
      throw is.invalidParameterError('alphaQuality', 'integer between 0 and 100', options.alphaQuality);
    }
  }
  if (is.object(options) && is.defined(options.lossless)) {
    this._setBooleanOption('webpLossless', options.lossless);
  }
  if (is.object(options) && is.defined(options.nearLossless)) {
    this._setBooleanOption('webpNearLossless', options.nearLossless);
  }
  if (is.object(options) && is.defined(options.smartSubsample)) {
    this._setBooleanOption('webpSmartSubsample', options.smartSubsample);
  }
  if (is.object(options) && is.defined(options.reductionEffort)) {
    if (is.integer(options.reductionEffort) && is.inRange(options.reductionEffort, 0, 6)) {
      this.options.webpReductionEffort = options.reductionEffort;
    } else {
      throw is.invalidParameterError('reductionEffort', 'integer between 0 and 6', options.reductionEffort);
    }
  }
  return this._updateFormatOut('webp', options);
}

/**
 * Use these TIFF options for output image.
 *
 * @example
 * // Convert SVG input to LZW-compressed, 1 bit per pixel TIFF output
 * sharp('input.svg')
 *   .tiff({
 *     compression: 'lzw',
 *     squash: true
 *   })
 *   .toFile('1-bpp-output.tiff')
 *   .then(info => { ... });
 *
 * @param {Object} [options] - output options
 * @param {Number} [options.quality=80] - quality, integer 1-100
 * @param {Boolean} [options.force=true] - force TIFF output, otherwise attempt to use input format
 * @param {Boolean} [options.compression='jpeg'] - compression options: lzw, deflate, jpeg, ccittfax4
 * @param {Boolean} [options.predictor='horizontal'] - compression predictor options: none, horizontal, float
 * @param {Boolean} [options.pyramid=false] - write an image pyramid
 * @param {Boolean} [options.tile=false] - write a tiled tiff
 * @param {Boolean} [options.tileWidth=256] - horizontal tile size
 * @param {Boolean} [options.tileHeight=256] - vertical tile size
 * @param {Number} [options.xres=1.0] - horizontal resolution in pixels/mm
 * @param {Number} [options.yres=1.0] - vertical resolution in pixels/mm
 * @param {Boolean} [options.squash=false] - squash 8-bit images down to 1 bit
 * @returns {Sharp}
 * @throws {Error} Invalid options
 */
function tiff (options) {
  if (is.object(options)) {
    if (is.defined(options.quality)) {
      if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
        this.options.tiffQuality = options.quality;
      } else {
        throw is.invalidParameterError('quality', 'integer between 1 and 100', options.quality);
      }
    }
    if (is.defined(options.squash)) {
      this._setBooleanOption('tiffSquash', options.squash);
    }
    // tiling
    if (is.defined(options.tile)) {
      this._setBooleanOption('tiffTile', options.tile);
    }
    if (is.defined(options.tileWidth)) {
      if (is.integer(options.tileWidth) && options.tileWidth > 0) {
        this.options.tiffTileWidth = options.tileWidth;
      } else {
        throw is.invalidParameterError('tileWidth', 'integer greater than zero', options.tileWidth);
      }
    }
    if (is.defined(options.tileHeight)) {
      if (is.integer(options.tileHeight) && options.tileHeight > 0) {
        this.options.tiffTileHeight = options.tileHeight;
      } else {
        throw is.invalidParameterError('tileHeight', 'integer greater than zero', options.tileHeight);
      }
    }
    // pyramid
    if (is.defined(options.pyramid)) {
      this._setBooleanOption('tiffPyramid', options.pyramid);
    }
    // resolution
    if (is.defined(options.xres)) {
      if (is.number(options.xres) && options.xres > 0) {
        this.options.tiffXres = options.xres;
      } else {
        throw is.invalidParameterError('xres', 'number greater than zero', options.xres);
      }
    }
    if (is.defined(options.yres)) {
      if (is.number(options.yres) && options.yres > 0) {
        this.options.tiffYres = options.yres;
      } else {
        throw is.invalidParameterError('yres', 'number greater than zero', options.yres);
      }
    }
    // compression
    if (is.defined(options.compression)) {
      if (is.string(options.compression) && is.inArray(options.compression, ['lzw', 'deflate', 'jpeg', 'ccittfax4', 'none'])) {
        this.options.tiffCompression = options.compression;
      } else {
        throw is.invalidParameterError('compression', 'one of: lzw, deflate, jpeg, ccittfax4, none', options.compression);
      }
    }
    // predictor
    if (is.defined(options.predictor)) {
      if (is.string(options.predictor) && is.inArray(options.predictor, ['none', 'horizontal', 'float'])) {
        this.options.tiffPredictor = options.predictor;
      } else {
        throw is.invalidParameterError('predictor', 'one of: none, horizontal, float', options.predictor);
      }
    }
  }
  return this._updateFormatOut('tiff', options);
}

/**
 * Use these HEIF options for output image.
 *
 * Support for HEIF (HEIC/AVIF) is experimental.
 * Do not use this in production systems.
 *
 * Requires a custom, globally-installed libvips compiled with support for libheif.
 *
 * Most versions of libheif support only the patent-encumbered HEVC compression format.
 *
 * @param {Object} [options] - output options
 * @param {Number} [options.quality=80] - quality, integer 1-100
 * @param {Boolean} [options.compression='hevc'] - compression format: hevc, avc, jpeg, av1
 * @param {Boolean} [options.lossless=false] - use lossless compression
 * @returns {Sharp}
 * @throws {Error} Invalid options
 */
function heif (options) {
  if (!this.constructor.format.heif.output.buffer) {
    throw new Error('The heif operation requires libvips to have been installed with support for libheif');
  }
  if (is.object(options)) {
    if (is.defined(options.quality)) {
      if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
        this.options.heifQuality = options.quality;
      } else {
        throw is.invalidParameterError('quality', 'integer between 1 and 100', options.quality);
      }
    }
    if (is.defined(options.lossless)) {
      if (is.bool(options.lossless)) {
        this.options.heifLossless = options.lossless;
      } else {
        throw is.invalidParameterError('lossless', 'boolean', options.lossless);
      }
    }
    if (is.defined(options.compression)) {
      if (is.string(options.compression) && is.inArray(options.compression, ['hevc', 'avc', 'jpeg', 'av1'])) {
        this.options.heifCompression = options.compression;
      } else {
        throw is.invalidParameterError('compression', 'one of: hevc, avc, jpeg, av1', options.compression);
      }
    }
  }
  return this._updateFormatOut('heif', options);
}

/**
 * Force output to be raw, uncompressed uint8 pixel data.
 *
 * @example
 * // Extract raw RGB pixel data from JPEG input
 * const { data, info } = await sharp('input.jpg')
 *   .raw()
 *   .toBuffer({ resolveWithObject: true });
 *
 * @returns {Sharp}
 */
function raw () {
  return this._updateFormatOut('raw');
}

const formats = new Map([
  ['heic', 'heif'],
  ['heif', 'heif'],
  ['jpeg', 'jpeg'],
  ['jpg', 'jpeg'],
  ['png', 'png'],
  ['raw', 'raw'],
  ['tiff', 'tiff'],
  ['webp', 'webp']
]);

/**
 * Force output to a given format.
 *
 * @example
 * // Convert any input to PNG output
 * const data = await sharp(input)
 *   .toFormat('png')
 *   .toBuffer();
 *
 * @param {(String|Object)} format - as a String or an Object with an 'id' attribute
 * @param {Object} options - output options
 * @returns {Sharp}
 * @throws {Error} unsupported format or options
 */
function toFormat (format, options) {
  const actualFormat = formats.get(is.object(format) && is.string(format.id) ? format.id : format);
  if (!actualFormat) {
    throw is.invalidParameterError('format', `one of: ${[...formats.keys()].join(', ')}`, format);
  }
  return this[actualFormat](options);
}

/**
 * Use tile-based deep zoom (image pyramid) output.
 * Set the format and options for tile images via the `toFormat`, `jpeg`, `png` or `webp` functions.
 * Use a `.zip` or `.szi` file extension with `toFile` to write to a compressed archive file format.
 *
 * Warning: multiple sharp instances concurrently producing tile output can expose a possible race condition in some versions of libgsf.
 *
 * @example
 *  sharp('input.tiff')
 *   .png()
 *   .tile({
 *     size: 512
 *   })
 *   .toFile('output.dz', function(err, info) {
 *     // output.dzi is the Deep Zoom XML definition
 *     // output_files contains 512x512 tiles grouped by zoom level
 *   });
 *
 * @param {Object} [options]
 * @param {Number} [options.size=256] tile size in pixels, a value between 1 and 8192.
 * @param {Number} [options.overlap=0] tile overlap in pixels, a value between 0 and 8192.
 * @param {Number} [options.angle=0] tile angle of rotation, must be a multiple of 90.
 * @param {String|Object} [options.background={r: 255, g: 255, b: 255, alpha: 1}] - background colour, parsed by the [color](https://www.npmjs.org/package/color) module, defaults to white without transparency.
 * @param {String} [options.depth] how deep to make the pyramid, possible values are `onepixel`, `onetile` or `one`, default based on layout.
 * @param {Number} [options.skipBlanks=-1] threshold to skip tile generation, a value 0 - 255 for 8-bit images or 0 - 65535 for 16-bit images
 * @param {String} [options.container='fs'] tile container, with value `fs` (filesystem) or `zip` (compressed file).
 * @param {String} [options.layout='dz'] filesystem layout, possible values are `dz`, `zoomify` or `google`.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function tile (options) {
  if (is.object(options)) {
    // Size of square tiles, in pixels
    if (is.defined(options.size)) {
      if (is.integer(options.size) && is.inRange(options.size, 1, 8192)) {
        this.options.tileSize = options.size;
      } else {
        throw is.invalidParameterError('size', 'integer between 1 and 8192', options.size);
      }
    }
    // Overlap of tiles, in pixels
    if (is.defined(options.overlap)) {
      if (is.integer(options.overlap) && is.inRange(options.overlap, 0, 8192)) {
        if (options.overlap > this.options.tileSize) {
          throw is.invalidParameterError('overlap', `<= size (${this.options.tileSize})`, options.overlap);
        }
        this.options.tileOverlap = options.overlap;
      } else {
        throw is.invalidParameterError('overlap', 'integer between 0 and 8192', options.overlap);
      }
    }
    // Container
    if (is.defined(options.container)) {
      if (is.string(options.container) && is.inArray(options.container, ['fs', 'zip'])) {
        this.options.tileContainer = options.container;
      } else {
        throw is.invalidParameterError('container', 'one of: fs, zip', options.container);
      }
    }
    // Layout
    if (is.defined(options.layout)) {
      if (is.string(options.layout) && is.inArray(options.layout, ['dz', 'google', 'zoomify'])) {
        this.options.tileLayout = options.layout;
      } else {
        throw is.invalidParameterError('layout', 'one of: dz, google, zoomify', options.layout);
      }
    }
    // Angle of rotation,
    if (is.defined(options.angle)) {
      if (is.integer(options.angle) && !(options.angle % 90)) {
        this.options.tileAngle = options.angle;
      } else {
        throw is.invalidParameterError('angle', 'positive/negative multiple of 90', options.angle);
      }
    }
    // Background colour
    this._setBackgroundColourOption('tileBackground', options.background);
    // Depth of tiles
    if (is.defined(options.depth)) {
      if (is.string(options.depth) && is.inArray(options.depth, ['onepixel', 'onetile', 'one'])) {
        this.options.tileDepth = options.depth;
      } else {
        throw is.invalidParameterError('depth', 'one of: onepixel, onetile, one', options.depth);
      }
    }
    // Threshold to skip blank tiles
    if (is.defined(options.skipBlanks)) {
      if (is.integer(options.skipBlanks) && is.inRange(options.skipBlanks, -1, 65535)) {
        this.options.tileSkipBlanks = options.skipBlanks;
      } else {
        throw is.invalidParameterError('skipBlanks', 'integer between -1 and 255/65535', options.skipBlanks);
      }
    } else if (is.defined(options.layout) && options.layout === 'google') {
      this.options.tileSkipBlanks = 5;
    }
  }
  // Format
  if (is.inArray(this.options.formatOut, ['jpeg', 'png', 'webp'])) {
    this.options.tileFormat = this.options.formatOut;
  } else if (this.options.formatOut !== 'input') {
    throw is.invalidParameterError('format', 'one of: jpeg, png, webp', this.options.formatOut);
  }
  return this._updateFormatOut('dz');
}

/**
 * Update the output format unless options.force is false,
 * in which case revert to input format.
 * @private
 * @param {String} formatOut
 * @param {Object} [options]
 * @param {Boolean} [options.force=true] - force output format, otherwise attempt to use input format
 * @returns {Sharp}
 */
function _updateFormatOut (formatOut, options) {
  if (!(is.object(options) && options.force === false)) {
    this.options.formatOut = formatOut;
  }
  return this;
}

/**
 * Update a Boolean attribute of the this.options Object.
 * @private
 * @param {String} key
 * @param {Boolean} val
 * @throws {Error} Invalid key
 */
function _setBooleanOption (key, val) {
  if (is.bool(val)) {
    this.options[key] = val;
  } else {
    throw is.invalidParameterError(key, 'boolean', val);
  }
}

/**
 * Called by a WriteableStream to notify us it is ready for data.
 * @private
 */
function _read () {
  /* istanbul ignore else */
  if (!this.options.streamOut) {
    this.options.streamOut = true;
    this._pipeline();
  }
}

/**
 * Invoke the C++ image processing pipeline
 * Supports callback, stream and promise variants
 * @private
 */
function _pipeline (callback) {
  if (typeof callback === 'function') {
    // output=file/buffer
    if (this._isStreamInput()) {
      // output=file/buffer, input=stream
      this.on('finish', () => {
        this._flattenBufferIn();
        sharp.pipeline(this.options, callback);
      });
    } else {
      // output=file/buffer, input=file/buffer
      sharp.pipeline(this.options, callback);
    }
    return this;
  } else if (this.options.streamOut) {
    // output=stream
    if (this._isStreamInput()) {
      // output=stream, input=stream
      this.once('finish', () => {
        this._flattenBufferIn();
        sharp.pipeline(this.options, (err, data, info) => {
          if (err) {
            this.emit('error', err);
          } else {
            this.emit('info', info);
            this.push(data);
          }
          this.push(null);
        });
      });
      if (this.streamInFinished) {
        this.emit('finish');
      }
    } else {
      // output=stream, input=file/buffer
      sharp.pipeline(this.options, (err, data, info) => {
        if (err) {
          this.emit('error', err);
        } else {
          this.emit('info', info);
          this.push(data);
        }
        this.push(null);
      });
    }
    return this;
  } else {
    // output=promise
    if (this._isStreamInput()) {
      // output=promise, input=stream
      return new Promise((resolve, reject) => {
        this.once('finish', () => {
          this._flattenBufferIn();
          sharp.pipeline(this.options, (err, data, info) => {
            if (err) {
              reject(err);
            } else {
              if (this.options.resolveWithObject) {
                resolve({ data, info });
              } else {
                resolve(data);
              }
            }
          });
        });
      });
    } else {
      // output=promise, input=file/buffer
      return new Promise((resolve, reject) => {
        sharp.pipeline(this.options, (err, data, info) => {
          if (err) {
            reject(err);
          } else {
            if (this.options.resolveWithObject) {
              resolve({ data: data, info: info });
            } else {
              resolve(data);
            }
          }
        });
      });
    }
  }
}

/**
 * Decorate the Sharp prototype with output-related functions.
 * @private
 */
module.exports = function (Sharp) {
  Object.assign(Sharp.prototype, {
    // Public
    toFile,
    toBuffer,
    withMetadata,
    jpeg,
    png,
    webp,
    tiff,
    heif,
    raw,
    toFormat,
    tile,
    // Private
    _updateFormatOut,
    _setBooleanOption,
    _read,
    _pipeline
  });
};


/***/ }),

/***/ "../../sharp/lib/platform.js":
/*!*******************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/platform.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const detectLibc = __webpack_require__(/*! detect-libc */ "../../detect-libc/lib/detect-libc.js");

const env = process.env;

module.exports = function () {
  const arch = env.npm_config_arch || process.arch;
  const platform = env.npm_config_platform || process.platform;
  /* istanbul ignore next */
  const libc = (platform === 'linux' && detectLibc.isNonGlibcLinux) ? detectLibc.family : '';

  const platformId = [`${platform}${libc}`];

  if (arch === 'arm') {
    platformId.push(`armv${env.npm_config_arm_version || process.config.variables.arm_version || '6'}`);
  } else if (arch === 'arm64') {
    platformId.push(`arm64v${env.npm_config_arm_version || '8'}`);
  } else {
    platformId.push(arch);
  }

  return platformId.join('-');
};


/***/ }),

/***/ "../../sharp/lib/resize.js":
/*!*****************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/resize.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const is = __webpack_require__(/*! ./is */ "../../sharp/lib/is.js");

/**
 * Weighting to apply when using contain/cover fit.
 * @member
 * @private
 */
const gravity = {
  center: 0,
  centre: 0,
  north: 1,
  east: 2,
  south: 3,
  west: 4,
  northeast: 5,
  southeast: 6,
  southwest: 7,
  northwest: 8
};

/**
 * Position to apply when using contain/cover fit.
 * @member
 * @private
 */
const position = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
  'right top': 5,
  'right bottom': 6,
  'left bottom': 7,
  'left top': 8
};

/**
 * Strategies for automagic cover behaviour.
 * @member
 * @private
 */
const strategy = {
  entropy: 16,
  attention: 17
};

/**
 * Reduction kernels.
 * @member
 * @private
 */
const kernel = {
  nearest: 'nearest',
  cubic: 'cubic',
  mitchell: 'mitchell',
  lanczos2: 'lanczos2',
  lanczos3: 'lanczos3'
};

/**
 * Methods by which an image can be resized to fit the provided dimensions.
 * @member
 * @private
 */
const fit = {
  contain: 'contain',
  cover: 'cover',
  fill: 'fill',
  inside: 'inside',
  outside: 'outside'
};

/**
 * Map external fit property to internal canvas property.
 * @member
 * @private
 */
const mapFitToCanvas = {
  contain: 'embed',
  cover: 'crop',
  fill: 'ignore_aspect',
  inside: 'max',
  outside: 'min'
};

/**
 * Resize image to `width`, `height` or `width x height`.
 *
 * When both a `width` and `height` are provided, the possible methods by which the image should **fit** these are:
 * - `cover`: Crop to cover both provided dimensions (the default).
 * - `contain`: Embed within both provided dimensions.
 * - `fill`: Ignore the aspect ratio of the input and stretch to both provided dimensions.
 * - `inside`: Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.
 * - `outside`: Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.
 * Some of these values are based on the [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) CSS property.
 *
 * When using a `fit` of `cover` or `contain`, the default **position** is `centre`. Other options are:
 * - `sharp.position`: `top`, `right top`, `right`, `right bottom`, `bottom`, `left bottom`, `left`, `left top`.
 * - `sharp.gravity`: `north`, `northeast`, `east`, `southeast`, `south`, `southwest`, `west`, `northwest`, `center` or `centre`.
 * - `sharp.strategy`: `cover` only, dynamically crop using either the `entropy` or `attention` strategy.
 * Some of these values are based on the [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) CSS property.
 *
 * The experimental strategy-based approach resizes so one dimension is at its target length
 * then repeatedly ranks edge regions, discarding the edge with the lowest score based on the selected strategy.
 * - `entropy`: focus on the region with the highest [Shannon entropy](https://en.wikipedia.org/wiki/Entropy_%28information_theory%29).
 * - `attention`: focus on the region with the highest luminance frequency, colour saturation and presence of skin tones.
 *
 * Possible interpolation kernels are:
 * - `nearest`: Use [nearest neighbour interpolation](http://en.wikipedia.org/wiki/Nearest-neighbor_interpolation).
 * - `cubic`: Use a [Catmull-Rom spline](https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline).
 * - `mitchell`: Use a [Mitchell-Netravali spline](https://www.cs.utexas.edu/~fussell/courses/cs384g-fall2013/lectures/mitchell/Mitchell.pdf).
 * - `lanczos2`: Use a [Lanczos kernel](https://en.wikipedia.org/wiki/Lanczos_resampling#Lanczos_kernel) with `a=2`.
 * - `lanczos3`: Use a Lanczos kernel with `a=3` (the default).
 *
 * @example
 * sharp(input)
 *   .resize({ width: 100 })
 *   .toBuffer()
 *   .then(data => {
 *     // 100 pixels wide, auto-scaled height
 *   });
 *
 * @example
 * sharp(input)
 *   .resize({ height: 100 })
 *   .toBuffer()
 *   .then(data => {
 *     // 100 pixels high, auto-scaled width
 *   });
 *
 * @example
 * sharp(input)
 *   .resize(200, 300, {
 *     kernel: sharp.kernel.nearest,
 *     fit: 'contain',
 *     position: 'right top',
 *     background: { r: 255, g: 255, b: 255, alpha: 0.5 }
 *   })
 *   .toFile('output.png')
 *   .then(() => {
 *     // output.png is a 200 pixels wide and 300 pixels high image
 *     // containing a nearest-neighbour scaled version
 *     // contained within the north-east corner of a semi-transparent white canvas
 *   });
 *
 * @example
 * const transformer = sharp()
 *   .resize({
 *     width: 200,
 *     height: 200,
 *     fit: sharp.fit.cover,
 *     position: sharp.strategy.entropy
 *   });
 * // Read image data from readableStream
 * // Write 200px square auto-cropped image data to writableStream
 * readableStream
 *   .pipe(transformer)
 *   .pipe(writableStream);
 *
 * @example
 * sharp(input)
 *   .resize(200, 200, {
 *     fit: sharp.fit.inside,
 *     withoutEnlargement: true
 *   })
 *   .toFormat('jpeg')
 *   .toBuffer()
 *   .then(function(outputBuffer) {
 *     // outputBuffer contains JPEG image data
 *     // no wider and no higher than 200 pixels
 *     // and no larger than the input image
 *   });
 *
 * @param {Number} [width] - pixels wide the resultant image should be. Use `null` or `undefined` to auto-scale the width to match the height.
 * @param {Number} [height] - pixels high the resultant image should be. Use `null` or `undefined` to auto-scale the height to match the width.
 * @param {Object} [options]
 * @param {String} [options.width] - alternative means of specifying `width`. If both are present this take priority.
 * @param {String} [options.height] - alternative means of specifying `height`. If both are present this take priority.
 * @param {String} [options.fit='cover'] - how the image should be resized to fit both provided dimensions, one of `cover`, `contain`, `fill`, `inside` or `outside`.
 * @param {String} [options.position='centre'] - position, gravity or strategy to use when `fit` is `cover` or `contain`.
 * @param {String|Object} [options.background={r: 0, g: 0, b: 0, alpha: 1}] - background colour when using a `fit` of `contain`, parsed by the [color](https://www.npmjs.org/package/color) module, defaults to black without transparency.
 * @param {String} [options.kernel='lanczos3'] - the kernel to use for image reduction.
 * @param {Boolean} [options.withoutEnlargement=false] - do not enlarge if the width *or* height are already less than the specified dimensions, equivalent to GraphicsMagick's `>` geometry option.
 * @param {Boolean} [options.fastShrinkOnLoad=true] - take greater advantage of the JPEG and WebP shrink-on-load feature, which can lead to a slight moiré pattern on some images.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function resize (width, height, options) {
  if (is.defined(width)) {
    if (is.object(width) && !is.defined(options)) {
      options = width;
    } else if (is.integer(width) && width > 0) {
      this.options.width = width;
    } else {
      throw is.invalidParameterError('width', 'positive integer', width);
    }
  } else {
    this.options.width = -1;
  }
  if (is.defined(height)) {
    if (is.integer(height) && height > 0) {
      this.options.height = height;
    } else {
      throw is.invalidParameterError('height', 'positive integer', height);
    }
  } else {
    this.options.height = -1;
  }
  if (is.object(options)) {
    // Width
    if (is.defined(options.width)) {
      if (is.integer(options.width) && options.width > 0) {
        this.options.width = options.width;
      } else {
        throw is.invalidParameterError('width', 'positive integer', options.width);
      }
    }
    // Height
    if (is.defined(options.height)) {
      if (is.integer(options.height) && options.height > 0) {
        this.options.height = options.height;
      } else {
        throw is.invalidParameterError('height', 'positive integer', options.height);
      }
    }
    // Fit
    if (is.defined(options.fit)) {
      const canvas = mapFitToCanvas[options.fit];
      if (is.string(canvas)) {
        this.options.canvas = canvas;
      } else {
        throw is.invalidParameterError('fit', 'valid fit', options.fit);
      }
    }
    // Position
    if (is.defined(options.position)) {
      const pos = is.integer(options.position)
        ? options.position
        : strategy[options.position] || position[options.position] || gravity[options.position];
      if (is.integer(pos) && (is.inRange(pos, 0, 8) || is.inRange(pos, 16, 17))) {
        this.options.position = pos;
      } else {
        throw is.invalidParameterError('position', 'valid position/gravity/strategy', options.position);
      }
    }
    // Background
    this._setBackgroundColourOption('resizeBackground', options.background);
    // Kernel
    if (is.defined(options.kernel)) {
      if (is.string(kernel[options.kernel])) {
        this.options.kernel = kernel[options.kernel];
      } else {
        throw is.invalidParameterError('kernel', 'valid kernel name', options.kernel);
      }
    }
    // Without enlargement
    if (is.defined(options.withoutEnlargement)) {
      this._setBooleanOption('withoutEnlargement', options.withoutEnlargement);
    }
    // Shrink on load
    if (is.defined(options.fastShrinkOnLoad)) {
      this._setBooleanOption('fastShrinkOnLoad', options.fastShrinkOnLoad);
    }
  }
  return this;
}

/**
 * Extends/pads the edges of the image with the provided background colour.
 * This operation will always occur after resizing and extraction, if any.
 *
 * @example
 * // Resize to 140 pixels wide, then add 10 transparent pixels
 * // to the top, left and right edges and 20 to the bottom edge
 * sharp(input)
 *   .resize(140)
 *   .extend({
 *     top: 10,
 *     bottom: 20,
 *     left: 10,
 *     right: 10,
 *     background: { r: 0, g: 0, b: 0, alpha: 0 }
 *   })
 *   ...
 *
 * @param {(Number|Object)} extend - single pixel count to add to all edges or an Object with per-edge counts
 * @param {Number} [extend.top]
 * @param {Number} [extend.left]
 * @param {Number} [extend.bottom]
 * @param {Number} [extend.right]
 * @param {String|Object} [extend.background={r: 0, g: 0, b: 0, alpha: 1}] - background colour, parsed by the [color](https://www.npmjs.org/package/color) module, defaults to black without transparency.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
*/
function extend (extend) {
  if (is.integer(extend) && extend > 0) {
    this.options.extendTop = extend;
    this.options.extendBottom = extend;
    this.options.extendLeft = extend;
    this.options.extendRight = extend;
  } else if (
    is.object(extend) &&
    is.integer(extend.top) && extend.top >= 0 &&
    is.integer(extend.bottom) && extend.bottom >= 0 &&
    is.integer(extend.left) && extend.left >= 0 &&
    is.integer(extend.right) && extend.right >= 0
  ) {
    this.options.extendTop = extend.top;
    this.options.extendBottom = extend.bottom;
    this.options.extendLeft = extend.left;
    this.options.extendRight = extend.right;
    this._setBackgroundColourOption('extendBackground', extend.background);
  } else {
    throw is.invalidParameterError('extend', 'integer or object', extend);
  }
  return this;
}

/**
 * Extract a region of the image.
 *
 * - Use `extract` before `resize` for pre-resize extraction.
 * - Use `extract` after `resize` for post-resize extraction.
 * - Use `extract` before and after for both.
 *
 * @example
 * sharp(input)
 *   .extract({ left: left, top: top, width: width, height: height })
 *   .toFile(output, function(err) {
 *     // Extract a region of the input image, saving in the same format.
 *   });
 * @example
 * sharp(input)
 *   .extract({ left: leftOffsetPre, top: topOffsetPre, width: widthPre, height: heightPre })
 *   .resize(width, height)
 *   .extract({ left: leftOffsetPost, top: topOffsetPost, width: widthPost, height: heightPost })
 *   .toFile(output, function(err) {
 *     // Extract a region, resize, then extract from the resized image
 *   });
 *
 * @param {Object} options - describes the region to extract using integral pixel values
 * @param {Number} options.left - zero-indexed offset from left edge
 * @param {Number} options.top - zero-indexed offset from top edge
 * @param {Number} options.width - width of region to extract
 * @param {Number} options.height - height of region to extract
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function extract (options) {
  const suffix = this.options.width === -1 && this.options.height === -1 ? 'Pre' : 'Post';
  ['left', 'top', 'width', 'height'].forEach(function (name) {
    const value = options[name];
    if (is.integer(value) && value >= 0) {
      this.options[name + (name === 'left' || name === 'top' ? 'Offset' : '') + suffix] = value;
    } else {
      throw is.invalidParameterError(name, 'integer', value);
    }
  }, this);
  // Ensure existing rotation occurs before pre-resize extraction
  if (suffix === 'Pre' && ((this.options.angle % 360) !== 0 || this.options.useExifOrientation === true || this.options.rotationAngle !== 0)) {
    this.options.rotateBeforePreExtract = true;
  }
  return this;
}

/**
 * Trim "boring" pixels from all edges that contain values similar to the top-left pixel.
 * Images consisting entirely of a single colour will calculate "boring" using the alpha channel, if any.
 *
 * The `info` response Object will contain `trimOffsetLeft` and `trimOffsetTop` properties.
 *
 * @param {Number} [threshold=10] the allowed difference from the top-left pixel, a number greater than zero.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function trim (threshold) {
  if (!is.defined(threshold)) {
    this.options.trimThreshold = 10;
  } else if (is.number(threshold) && threshold > 0) {
    this.options.trimThreshold = threshold;
  } else {
    throw is.invalidParameterError('threshold', 'number greater than zero', threshold);
  }
  return this;
}

/**
 * Decorate the Sharp prototype with resize-related functions.
 * @private
 */
module.exports = function (Sharp) {
  Object.assign(Sharp.prototype, {
    resize,
    extend,
    extract,
    trim
  });
  // Class attributes
  Sharp.gravity = gravity;
  Sharp.strategy = strategy;
  Sharp.kernel = kernel;
  Sharp.fit = fit;
  Sharp.position = position;
};


/***/ }),

/***/ "../../sharp/lib/utility.js":
/*!******************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/lib/utility.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const is = __webpack_require__(/*! ./is */ "../../sharp/lib/is.js");
const sharp = __webpack_require__(/*! ../build/Release/sharp.node */ "../../sharp/build/Release/sharp.node");

/**
 * Gets or, when options are provided, sets the limits of _libvips'_ operation cache.
 * Existing entries in the cache will be trimmed after any change in limits.
 * This method always returns cache statistics,
 * useful for determining how much working memory is required for a particular task.
 *
 * @example
 * const stats = sharp.cache();
 * @example
 * sharp.cache( { items: 200 } );
 * sharp.cache( { files: 0 } );
 * sharp.cache(false);
 *
 * @param {Object|Boolean} [options=true] - Object with the following attributes, or Boolean where true uses default cache settings and false removes all caching
 * @param {Number} [options.memory=50] - is the maximum memory in MB to use for this cache
 * @param {Number} [options.files=20] - is the maximum number of files to hold open
 * @param {Number} [options.items=100] - is the maximum number of operations to cache
 * @returns {Object}
 */
function cache (options) {
  if (is.bool(options)) {
    if (options) {
      // Default cache settings of 50MB, 20 files, 100 items
      return sharp.cache(50, 20, 100);
    } else {
      return sharp.cache(0, 0, 0);
    }
  } else if (is.object(options)) {
    return sharp.cache(options.memory, options.files, options.items);
  } else {
    return sharp.cache();
  }
}
cache(true);

/**
 * Gets or, when a concurrency is provided, sets
 * the number of threads _libvips'_ should create to process each image.
 * The default value is the number of CPU cores.
 * A value of `0` will reset to this default.
 *
 * The maximum number of images that can be processed in parallel
 * is limited by libuv's `UV_THREADPOOL_SIZE` environment variable.
 *
 * This method always returns the current concurrency.
 *
 * @example
 * const threads = sharp.concurrency(); // 4
 * sharp.concurrency(2); // 2
 * sharp.concurrency(0); // 4
 *
 * @param {Number} [concurrency]
 * @returns {Number} concurrency
 */
function concurrency (concurrency) {
  return sharp.concurrency(is.integer(concurrency) ? concurrency : null);
}

/**
 * Provides access to internal task counters.
 * - queue is the number of tasks this module has queued waiting for _libuv_ to provide a worker thread from its pool.
 * - process is the number of resize tasks currently being processed.
 *
 * @example
 * const counters = sharp.counters(); // { queue: 2, process: 4 }
 *
 * @returns {Object}
 */
function counters () {
  return sharp.counters();
}

/**
 * Get and set use of SIMD vector unit instructions.
 * Requires libvips to have been compiled with liborc support.
 *
 * Improves the performance of `resize`, `blur` and `sharpen` operations
 * by taking advantage of the SIMD vector unit of the CPU, e.g. Intel SSE and ARM NEON.
 *
 * @example
 * const simd = sharp.simd();
 * // simd is `true` if the runtime use of liborc is currently enabled
 * @example
 * const simd = sharp.simd(false);
 * // prevent libvips from using liborc at runtime
 *
 * @param {Boolean} [simd=true]
 * @returns {Boolean}
 */
function simd (simd) {
  return sharp.simd(is.bool(simd) ? simd : null);
}
simd(true);

/**
 * Decorate the Sharp class with utility-related functions.
 * @private
 */
module.exports = function (Sharp) {
  [
    cache,
    concurrency,
    counters,
    simd
  ].forEach(function (f) {
    Sharp[f.name] = f;
  });
};


/***/ }),

/***/ "../../sharp/package.json":
/*!****************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/package.json ***!
  \****************************************************************************************/
/*! exports provided: _args, _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _spec, _where, author, bugs, cc, config, contributors, dependencies, description, devDependencies, engines, files, funding, homepage, keywords, license, main, name, repository, scripts, semistandard, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_args\":[[\"sharp@0.23.4\",\"/Users/trevorobrien/Documents/code/sls-progimage\"]],\"_from\":\"sharp@0.23.4\",\"_id\":\"sharp@0.23.4\",\"_inBundle\":false,\"_integrity\":\"sha512-fJMagt6cT0UDy9XCsgyLi0eiwWWhQRxbwGmqQT6sY8Av4s0SVsT/deg8fobBQCTDU5iXRgz0rAeXoE2LBZ8g+Q==\",\"_location\":\"/sharp\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"version\",\"registry\":true,\"raw\":\"sharp@0.23.4\",\"name\":\"sharp\",\"escapedName\":\"sharp\",\"rawSpec\":\"0.23.4\",\"saveSpec\":null,\"fetchSpec\":\"0.23.4\"},\"_requiredBy\":[\"/\"],\"_resolved\":\"https://registry.npmjs.org/sharp/-/sharp-0.23.4.tgz\",\"_spec\":\"0.23.4\",\"_where\":\"/Users/trevorobrien/Documents/code/sls-progimage\",\"author\":{\"name\":\"Lovell Fuller\",\"email\":\"npm@lovell.info\"},\"bugs\":{\"url\":\"https://github.com/lovell/sharp/issues\"},\"cc\":{\"linelength\":\"120\",\"filter\":[\"build/include\"]},\"config\":{\"libvips\":\"8.8.1\"},\"contributors\":[{\"name\":\"Pierre Inglebert\",\"email\":\"pierre.inglebert@gmail.com\"},{\"name\":\"Jonathan Ong\",\"email\":\"jonathanrichardong@gmail.com\"},{\"name\":\"Chanon Sajjamanochai\",\"email\":\"chanon.s@gmail.com\"},{\"name\":\"Juliano Julio\",\"email\":\"julianojulio@gmail.com\"},{\"name\":\"Daniel Gasienica\",\"email\":\"daniel@gasienica.ch\"},{\"name\":\"Julian Walker\",\"email\":\"julian@fiftythree.com\"},{\"name\":\"Amit Pitaru\",\"email\":\"pitaru.amit@gmail.com\"},{\"name\":\"Brandon Aaron\",\"email\":\"hello.brandon@aaron.sh\"},{\"name\":\"Andreas Lind\",\"email\":\"andreas@one.com\"},{\"name\":\"Maurus Cuelenaere\",\"email\":\"mcuelenaere@gmail.com\"},{\"name\":\"Linus Unnebäck\",\"email\":\"linus@folkdatorn.se\"},{\"name\":\"Victor Mateevitsi\",\"email\":\"mvictoras@gmail.com\"},{\"name\":\"Alaric Holloway\",\"email\":\"alaric.holloway@gmail.com\"},{\"name\":\"Bernhard K. Weisshuhn\",\"email\":\"bkw@codingforce.com\"},{\"name\":\"Chris Riley\",\"email\":\"criley@primedia.com\"},{\"name\":\"David Carley\",\"email\":\"dacarley@gmail.com\"},{\"name\":\"John Tobin\",\"email\":\"john@limelightmobileinc.com\"},{\"name\":\"Kenton Gray\",\"email\":\"kentongray@gmail.com\"},{\"name\":\"Felix Bünemann\",\"email\":\"Felix.Buenemann@gmail.com\"},{\"name\":\"Samy Al Zahrani\",\"email\":\"samyalzahrany@gmail.com\"},{\"name\":\"Chintan Thakkar\",\"email\":\"lemnisk8@gmail.com\"},{\"name\":\"F. Orlando Galashan\",\"email\":\"frulo@gmx.de\"},{\"name\":\"Kleis Auke Wolthuizen\",\"email\":\"info@kleisauke.nl\"},{\"name\":\"Matt Hirsch\",\"email\":\"mhirsch@media.mit.edu\"},{\"name\":\"Matthias Thoemmes\",\"email\":\"thoemmes@gmail.com\"},{\"name\":\"Patrick Paskaris\",\"email\":\"patrick@paskaris.gr\"},{\"name\":\"Jérémy Lal\",\"email\":\"kapouer@melix.org\"},{\"name\":\"Rahul Nanwani\",\"email\":\"r.nanwani@gmail.com\"},{\"name\":\"Alice Monday\",\"email\":\"alice0meta@gmail.com\"},{\"name\":\"Kristo Jorgenson\",\"email\":\"kristo.jorgenson@gmail.com\"},{\"name\":\"YvesBos\",\"email\":\"yves_bos@outlook.com\"},{\"name\":\"Guy Maliar\",\"email\":\"guy@tailorbrands.com\"},{\"name\":\"Nicolas Coden\",\"email\":\"nicolas@ncoden.fr\"},{\"name\":\"Matt Parrish\",\"email\":\"matt.r.parrish@gmail.com\"},{\"name\":\"Marcel Bretschneider\",\"email\":\"marcel.bretschneider@gmail.com\"},{\"name\":\"Matthew McEachen\",\"email\":\"matthew+github@mceachen.org\"},{\"name\":\"Jarda Kotěšovec\",\"email\":\"jarda.kotesovec@gmail.com\"},{\"name\":\"Kenric D'Souza\",\"email\":\"kenric.dsouza@gmail.com\"},{\"name\":\"Oleh Aleinyk\",\"email\":\"oleg.aleynik@gmail.com\"},{\"name\":\"Marcel Bretschneider\",\"email\":\"marcel.bretschneider@gmail.com\"},{\"name\":\"Andrea Bianco\",\"email\":\"andrea.bianco@unibas.ch\"},{\"name\":\"Rik Heywood\",\"email\":\"rik@rik.org\"},{\"name\":\"Thomas Parisot\",\"email\":\"hi@oncletom.io\"},{\"name\":\"Nathan Graves\",\"email\":\"nathanrgraves+github@gmail.com\"},{\"name\":\"Tom Lokhorst\",\"email\":\"tom@lokhorst.eu\"},{\"name\":\"Espen Hovlandsdal\",\"email\":\"espen@hovlandsdal.com\"},{\"name\":\"Sylvain Dumont\",\"email\":\"sylvain.dumont35@gmail.com\"},{\"name\":\"Alun Davies\",\"email\":\"alun.owain.davies@googlemail.com\"},{\"name\":\"Aidan Hoolachan\",\"email\":\"ajhoolachan21@gmail.com\"},{\"name\":\"Axel Eirola\",\"email\":\"axel.eirola@iki.fi\"},{\"name\":\"Freezy\",\"email\":\"freezy@xbmc.org\"},{\"name\":\"Daiz\",\"email\":\"taneli.vatanen@gmail.com\"},{\"name\":\"Julian Aubourg\",\"email\":\"j@ubourg.net\"},{\"name\":\"Keith Belovay\",\"email\":\"keith@picthrive.com\"},{\"name\":\"Michael B. Klein\",\"email\":\"mbklein@gmail.com\"},{\"name\":\"Jordan Prudhomme\",\"email\":\"jordan@raboland.fr\"},{\"name\":\"Ilya Ovdin\",\"email\":\"iovdin@gmail.com\"},{\"name\":\"Andargor\",\"email\":\"andargor@yahoo.com\"},{\"name\":\"Paul Neave\",\"email\":\"paul.neave@gmail.com\"},{\"name\":\"Brendan Kennedy\",\"email\":\"brenwken@gmail.com\"}],\"dependencies\":{\"color\":\"^3.1.2\",\"detect-libc\":\"^1.0.3\",\"nan\":\"^2.14.0\",\"npmlog\":\"^4.1.2\",\"prebuild-install\":\"^5.3.3\",\"semver\":\"^6.3.0\",\"simple-get\":\"^3.1.0\",\"tar\":\"^5.0.5\",\"tunnel-agent\":\"^0.6.0\"},\"description\":\"High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP and TIFF images\",\"devDependencies\":{\"async\":\"^3.1.0\",\"cc\":\"^2.0.1\",\"decompress-zip\":\"^0.3.2\",\"documentation\":\"^12.1.4\",\"exif-reader\":\"^1.0.3\",\"icc\":\"^1.0.0\",\"license-checker\":\"^25.0.1\",\"mocha\":\"^6.2.2\",\"mock-fs\":\"^4.10.4\",\"nyc\":\"^14.1.1\",\"prebuild\":\"^9.1.1\",\"prebuild-ci\":\"^3.1.0\",\"rimraf\":\"^3.0.0\",\"semistandard\":\"^14.2.0\"},\"engines\":{\"node\":\">=8.5.0\"},\"files\":[\"binding.gyp\",\"docs/**\",\"!docs/css/**\",\"install/**\",\"lib/**\",\"src/**\"],\"funding\":{\"url\":\"https://opencollective.com/libvips\"},\"homepage\":\"https://github.com/lovell/sharp\",\"keywords\":[\"jpeg\",\"png\",\"webp\",\"tiff\",\"gif\",\"svg\",\"dzi\",\"image\",\"resize\",\"thumbnail\",\"crop\",\"embed\",\"libvips\",\"vips\"],\"license\":\"Apache-2.0\",\"main\":\"lib/index.js\",\"name\":\"sharp\",\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/lovell/sharp.git\"},\"scripts\":{\"clean\":\"rm -rf node_modules/ build/ vendor/ .nyc_output/ coverage/ test/fixtures/output.*\",\"docs\":\"for m in constructor input resize composite operation colour channel output utility; do documentation build --shallow --format=md --markdown-toc=false lib/$m.js >docs/api-$m.md; done\",\"install\":\"(node install/libvips && node install/dll-copy && prebuild-install) || (node-gyp rebuild && node install/dll-copy)\",\"test\":\"semistandard && cpplint && npm run test-unit && npm run test-licensing && prebuild-ci\",\"test-coverage\":\"./test/coverage/report.sh\",\"test-leak\":\"./test/leak/leak.sh\",\"test-licensing\":\"license-checker --production --summary --onlyAllow=\\\"Apache-2.0;BSD;ISC;MIT\\\"\",\"test-unit\":\"nyc --reporter=lcov --branches=99 mocha --slow=5000 --timeout=60000 ./test/unit/*.js\"},\"semistandard\":{\"env\":[\"mocha\"]},\"version\":\"0.23.4\"}");

/***/ }),

/***/ "../../sharp/vendor/versions.json":
/*!************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/sharp/vendor/versions.json ***!
  \************************************************************************************************/
/*! exports provided: cairo, croco, exif, fontconfig, freetype, fribidi, gdkpixbuf, gif, glib, gsf, harfbuzz, jpeg, lcms, orc, pango, pixman, png, svg, tiff, vips, webp, xml, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"cairo\":\"1.16.0\",\"croco\":\"0.6.13\",\"exif\":\"0.6.21\",\"fontconfig\":\"2.13.1\",\"freetype\":\"23.1.17\",\"fribidi\":\"1.0.5\",\"gdkpixbuf\":\"2.38.1\",\"gif\":\"5.1.4\",\"glib\":\"2.60.6\",\"gsf\":\"1.14.46\",\"harfbuzz\":\"2.5.3\",\"jpeg\":\"2.0.2\",\"lcms\":\"2.9\",\"orc\":\"0.4.28\",\"pango\":\"1.42.4\",\"pixman\":\"0.38.4\",\"png\":\"1.6.37\",\"svg\":\"2.44.14\",\"tiff\":\"4.0.10\",\"vips\":\"8.8.1\",\"webp\":\"1.0.3\",\"xml\":\"2.9.4\"}");

/***/ }),

/***/ "../../simple-swizzle/index.js":
/*!*********************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/simple-swizzle/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayish = __webpack_require__(/*! is-arrayish */ "../../is-arrayish/index.js");

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};


/***/ }),

/***/ "../../source-map-support/register.js":
/*!****************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map-support/register.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./ */ "../../source-map-support/source-map-support.js").install();


/***/ }),

/***/ "../../source-map-support/source-map-support.js":
/*!**************************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map-support/source-map-support.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var SourceMapConsumer = __webpack_require__(/*! source-map */ "../../source-map/source-map.js").SourceMapConsumer;
var path = __webpack_require__(/*! path */ "path");

var fs;
try {
  fs = __webpack_require__(/*! fs */ "fs");
  if (!fs.existsSync || !fs.readFileSync) {
    // fs doesn't have all methods we need
    fs = null;
  }
} catch (err) {
  /* nop */
}

// Only install once if called multiple times
var errorFormatterInstalled = false;
var uncaughtShimInstalled = false;

// If true, the caches are reset before a stack trace formatting operation
var emptyCacheBetweenOperations = false;

// Supports {browser, node, auto}
var environment = "auto";

// Maps a file path to a string containing the file contents
var fileContentsCache = {};

// Maps a file path to a source map for that file
var sourceMapCache = {};

// Regex for detecting source maps
var reSourceMap = /^data:application\/json[^,]+base64,/;

// Priority list of retrieve handlers
var retrieveFileHandlers = [];
var retrieveMapHandlers = [];

function isInBrowser() {
  if (environment === "browser")
    return true;
  if (environment === "node")
    return false;
  return ((typeof window !== 'undefined') && (typeof XMLHttpRequest === 'function') && !(window.require && window.module && window.process && window.process.type === "renderer"));
}

function hasGlobalProcessEventEmitter() {
  return ((typeof process === 'object') && (process !== null) && (typeof process.on === 'function'));
}

function handlerExec(list) {
  return function(arg) {
    for (var i = 0; i < list.length; i++) {
      var ret = list[i](arg);
      if (ret) {
        return ret;
      }
    }
    return null;
  };
}

var retrieveFile = handlerExec(retrieveFileHandlers);

retrieveFileHandlers.push(function(path) {
  // Trim the path to make sure there is no extra whitespace.
  path = path.trim();
  if (path in fileContentsCache) {
    return fileContentsCache[path];
  }

  var contents = null;
  if (!fs) {
    // Use SJAX if we are in the browser
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, false);
    xhr.send(null);
    var contents = null
    if (xhr.readyState === 4 && xhr.status === 200) {
      contents = xhr.responseText
    }
  } else if (fs.existsSync(path)) {
    // Otherwise, use the filesystem
    try {
      contents = fs.readFileSync(path, 'utf8');
    } catch (er) {
      contents = '';
    }
  }

  return fileContentsCache[path] = contents;
});

// Support URLs relative to a directory, but be careful about a protocol prefix
// in case we are in the browser (i.e. directories may start with "http://")
function supportRelativeURL(file, url) {
  if (!file) return url;
  var dir = path.dirname(file);
  var match = /^\w+:\/\/[^\/]*/.exec(dir);
  var protocol = match ? match[0] : '';
  return protocol + path.resolve(dir.slice(protocol.length), url);
}

function retrieveSourceMapURL(source) {
  var fileData;

  if (isInBrowser()) {
     try {
       var xhr = new XMLHttpRequest();
       xhr.open('GET', source, false);
       xhr.send(null);
       fileData = xhr.readyState === 4 ? xhr.responseText : null;

       // Support providing a sourceMappingURL via the SourceMap header
       var sourceMapHeader = xhr.getResponseHeader("SourceMap") ||
                             xhr.getResponseHeader("X-SourceMap");
       if (sourceMapHeader) {
         return sourceMapHeader;
       }
     } catch (e) {
     }
  }

  // Get the URL of the source map
  fileData = retrieveFile(source);
  var re = /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^\*]+?)[ \t]*(?:\*\/)[ \t]*$)/mg;
  // Keep executing the search to find the *last* sourceMappingURL to avoid
  // picking up sourceMappingURLs from comments, strings, etc.
  var lastMatch, match;
  while (match = re.exec(fileData)) lastMatch = match;
  if (!lastMatch) return null;
  return lastMatch[1];
};

// Can be overridden by the retrieveSourceMap option to install. Takes a
// generated source filename; returns a {map, optional url} object, or null if
// there is no source map.  The map field may be either a string or the parsed
// JSON object (ie, it must be a valid argument to the SourceMapConsumer
// constructor).
var retrieveSourceMap = handlerExec(retrieveMapHandlers);
retrieveMapHandlers.push(function(source) {
  var sourceMappingURL = retrieveSourceMapURL(source);
  if (!sourceMappingURL) return null;

  // Read the contents of the source map
  var sourceMapData;
  if (reSourceMap.test(sourceMappingURL)) {
    // Support source map URL as a data url
    var rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(',') + 1);
    sourceMapData = new Buffer(rawData, "base64").toString();
    sourceMappingURL = source;
  } else {
    // Support source map URLs relative to the source URL
    sourceMappingURL = supportRelativeURL(source, sourceMappingURL);
    sourceMapData = retrieveFile(sourceMappingURL);
  }

  if (!sourceMapData) {
    return null;
  }

  return {
    url: sourceMappingURL,
    map: sourceMapData
  };
});

function mapSourcePosition(position) {
  var sourceMap = sourceMapCache[position.source];
  if (!sourceMap) {
    // Call the (overrideable) retrieveSourceMap function to get the source map.
    var urlAndMap = retrieveSourceMap(position.source);
    if (urlAndMap) {
      sourceMap = sourceMapCache[position.source] = {
        url: urlAndMap.url,
        map: new SourceMapConsumer(urlAndMap.map)
      };

      // Load all sources stored inline with the source map into the file cache
      // to pretend like they are already loaded. They may not exist on disk.
      if (sourceMap.map.sourcesContent) {
        sourceMap.map.sources.forEach(function(source, i) {
          var contents = sourceMap.map.sourcesContent[i];
          if (contents) {
            var url = supportRelativeURL(sourceMap.url, source);
            fileContentsCache[url] = contents;
          }
        });
      }
    } else {
      sourceMap = sourceMapCache[position.source] = {
        url: null,
        map: null
      };
    }
  }

  // Resolve the source URL relative to the URL of the source map
  if (sourceMap && sourceMap.map) {
    var originalPosition = sourceMap.map.originalPositionFor(position);

    // Only return the original position if a matching line was found. If no
    // matching line is found then we return position instead, which will cause
    // the stack trace to print the path and line for the compiled file. It is
    // better to give a precise location in the compiled file than a vague
    // location in the original file.
    if (originalPosition.source !== null) {
      originalPosition.source = supportRelativeURL(
        sourceMap.url, originalPosition.source);
      return originalPosition;
    }
  }

  return position;
}

// Parses code generated by FormatEvalOrigin(), a function inside V8:
// https://code.google.com/p/v8/source/browse/trunk/src/messages.js
function mapEvalOrigin(origin) {
  // Most eval() calls are in this format
  var match = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(origin);
  if (match) {
    var position = mapSourcePosition({
      source: match[2],
      line: +match[3],
      column: match[4] - 1
    });
    return 'eval at ' + match[1] + ' (' + position.source + ':' +
      position.line + ':' + (position.column + 1) + ')';
  }

  // Parse nested eval() calls using recursion
  match = /^eval at ([^(]+) \((.+)\)$/.exec(origin);
  if (match) {
    return 'eval at ' + match[1] + ' (' + mapEvalOrigin(match[2]) + ')';
  }

  // Make sure we still return useful information if we didn't find anything
  return origin;
}

// This is copied almost verbatim from the V8 source code at
// https://code.google.com/p/v8/source/browse/trunk/src/messages.js. The
// implementation of wrapCallSite() used to just forward to the actual source
// code of CallSite.prototype.toString but unfortunately a new release of V8
// did something to the prototype chain and broke the shim. The only fix I
// could find was copy/paste.
function CallSiteToString() {
  var fileName;
  var fileLocation = "";
  if (this.isNative()) {
    fileLocation = "native";
  } else {
    fileName = this.getScriptNameOrSourceURL();
    if (!fileName && this.isEval()) {
      fileLocation = this.getEvalOrigin();
      fileLocation += ", ";  // Expecting source position to follow.
    }

    if (fileName) {
      fileLocation += fileName;
    } else {
      // Source code does not originate from a file and is not native, but we
      // can still get the source position inside the source string, e.g. in
      // an eval string.
      fileLocation += "<anonymous>";
    }
    var lineNumber = this.getLineNumber();
    if (lineNumber != null) {
      fileLocation += ":" + lineNumber;
      var columnNumber = this.getColumnNumber();
      if (columnNumber) {
        fileLocation += ":" + columnNumber;
      }
    }
  }

  var line = "";
  var functionName = this.getFunctionName();
  var addSuffix = true;
  var isConstructor = this.isConstructor();
  var isMethodCall = !(this.isToplevel() || isConstructor);
  if (isMethodCall) {
    var typeName = this.getTypeName();
    // Fixes shim to be backward compatable with Node v0 to v4
    if (typeName === "[object Object]") {
      typeName = "null";
    }
    var methodName = this.getMethodName();
    if (functionName) {
      if (typeName && functionName.indexOf(typeName) != 0) {
        line += typeName + ".";
      }
      line += functionName;
      if (methodName && functionName.indexOf("." + methodName) != functionName.length - methodName.length - 1) {
        line += " [as " + methodName + "]";
      }
    } else {
      line += typeName + "." + (methodName || "<anonymous>");
    }
  } else if (isConstructor) {
    line += "new " + (functionName || "<anonymous>");
  } else if (functionName) {
    line += functionName;
  } else {
    line += fileLocation;
    addSuffix = false;
  }
  if (addSuffix) {
    line += " (" + fileLocation + ")";
  }
  return line;
}

function cloneCallSite(frame) {
  var object = {};
  Object.getOwnPropertyNames(Object.getPrototypeOf(frame)).forEach(function(name) {
    object[name] = /^(?:is|get)/.test(name) ? function() { return frame[name].call(frame); } : frame[name];
  });
  object.toString = CallSiteToString;
  return object;
}

function wrapCallSite(frame) {
  if(frame.isNative()) {
    return frame;
  }

  // Most call sites will return the source file from getFileName(), but code
  // passed to eval() ending in "//# sourceURL=..." will return the source file
  // from getScriptNameOrSourceURL() instead
  var source = frame.getFileName() || frame.getScriptNameOrSourceURL();
  if (source) {
    var line = frame.getLineNumber();
    var column = frame.getColumnNumber() - 1;

    // Fix position in Node where some (internal) code is prepended.
    // See https://github.com/evanw/node-source-map-support/issues/36
    var headerLength = 62;
    if (line === 1 && column > headerLength && !isInBrowser() && !frame.isEval()) {
      column -= headerLength;
    }

    var position = mapSourcePosition({
      source: source,
      line: line,
      column: column
    });
    frame = cloneCallSite(frame);
    frame.getFileName = function() { return position.source; };
    frame.getLineNumber = function() { return position.line; };
    frame.getColumnNumber = function() { return position.column + 1; };
    frame.getScriptNameOrSourceURL = function() { return position.source; };
    return frame;
  }

  // Code called using eval() needs special handling
  var origin = frame.isEval() && frame.getEvalOrigin();
  if (origin) {
    origin = mapEvalOrigin(origin);
    frame = cloneCallSite(frame);
    frame.getEvalOrigin = function() { return origin; };
    return frame;
  }

  // If we get here then we were unable to change the source position
  return frame;
}

// This function is part of the V8 stack trace API, for more info see:
// http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
function prepareStackTrace(error, stack) {
  if (emptyCacheBetweenOperations) {
    fileContentsCache = {};
    sourceMapCache = {};
  }

  return error + stack.map(function(frame) {
    return '\n    at ' + wrapCallSite(frame);
  }).join('');
}

// Generate position and snippet of original source with pointer
function getErrorSource(error) {
  var match = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(error.stack);
  if (match) {
    var source = match[1];
    var line = +match[2];
    var column = +match[3];

    // Support the inline sourceContents inside the source map
    var contents = fileContentsCache[source];

    // Support files on disk
    if (!contents && fs && fs.existsSync(source)) {
      try {
        contents = fs.readFileSync(source, 'utf8');
      } catch (er) {
        contents = '';
      }
    }

    // Format the line from the original source code like node does
    if (contents) {
      var code = contents.split(/(?:\r\n|\r|\n)/)[line - 1];
      if (code) {
        return source + ':' + line + '\n' + code + '\n' +
          new Array(column).join(' ') + '^';
      }
    }
  }
  return null;
}

function printErrorAndExit (error) {
  var source = getErrorSource(error);

  if (source) {
    console.error();
    console.error(source);
  }

  console.error(error.stack);
  process.exit(1);
}

function shimEmitUncaughtException () {
  var origEmit = process.emit;

  process.emit = function (type) {
    if (type === 'uncaughtException') {
      var hasStack = (arguments[1] && arguments[1].stack);
      var hasListeners = (this.listeners(type).length > 0);

      if (hasStack && !hasListeners) {
        return printErrorAndExit(arguments[1]);
      }
    }

    return origEmit.apply(this, arguments);
  };
}

exports.wrapCallSite = wrapCallSite;
exports.getErrorSource = getErrorSource;
exports.mapSourcePosition = mapSourcePosition;
exports.retrieveSourceMap = retrieveSourceMap;

exports.install = function(options) {
  options = options || {};

  if (options.environment) {
    environment = options.environment;
    if (["node", "browser", "auto"].indexOf(environment) === -1) {
      throw new Error("environment " + environment + " was unknown. Available options are {auto, browser, node}")
    }
  }

  // Allow sources to be found by methods other than reading the files
  // directly from disk.
  if (options.retrieveFile) {
    if (options.overrideRetrieveFile) {
      retrieveFileHandlers.length = 0;
    }

    retrieveFileHandlers.unshift(options.retrieveFile);
  }

  // Allow source maps to be found by methods other than reading the files
  // directly from disk.
  if (options.retrieveSourceMap) {
    if (options.overrideRetrieveSourceMap) {
      retrieveMapHandlers.length = 0;
    }

    retrieveMapHandlers.unshift(options.retrieveSourceMap);
  }

  // Support runtime transpilers that include inline source maps
  if (options.hookRequire && !isInBrowser()) {
    var Module;
    try {
      Module = __webpack_require__(/*! module */ "module");
    } catch (err) {
      // NOP: Loading in catch block to convert webpack error to warning.
    }
    var $compile = Module.prototype._compile;

    if (!$compile.__sourceMapSupport) {
      Module.prototype._compile = function(content, filename) {
        fileContentsCache[filename] = content;
        sourceMapCache[filename] = undefined;
        return $compile.call(this, content, filename);
      };

      Module.prototype._compile.__sourceMapSupport = true;
    }
  }

  // Configure options
  if (!emptyCacheBetweenOperations) {
    emptyCacheBetweenOperations = 'emptyCacheBetweenOperations' in options ?
      options.emptyCacheBetweenOperations : false;
  }

  // Install the error reformatter
  if (!errorFormatterInstalled) {
    errorFormatterInstalled = true;
    Error.prepareStackTrace = prepareStackTrace;
  }

  if (!uncaughtShimInstalled) {
    var installHandler = 'handleUncaughtExceptions' in options ?
      options.handleUncaughtExceptions : true;

    // Provide the option to not install the uncaught exception handler. This is
    // to support other uncaught exception handlers (in test frameworks, for
    // example). If this handler is not installed and there are no other uncaught
    // exception handlers, uncaught exceptions will be caught by node's built-in
    // exception handler and the process will still be terminated. However, the
    // generated JavaScript code will be shown above the stack trace instead of
    // the original source code.
    if (installHandler && hasGlobalProcessEventEmitter()) {
      uncaughtShimInstalled = true;
      shimEmitUncaughtException();
    }
  }
};


/***/ }),

/***/ "../../source-map/lib/array-set.js":
/*!*************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map/lib/array-set.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "../../source-map/lib/util.js");
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;


/***/ }),

/***/ "../../source-map/lib/base64-vlq.js":
/*!**************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map/lib/base64-vlq.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(/*! ./base64 */ "../../source-map/lib/base64.js");

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),

/***/ "../../source-map/lib/base64.js":
/*!**********************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map/lib/base64.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),

/***/ "../../source-map/lib/binary-search.js":
/*!*****************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map/lib/binary-search.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};


/***/ }),

/***/ "../../source-map/lib/mapping-list.js":
/*!****************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map/lib/mapping-list.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "../../source-map/lib/util.js");

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;


/***/ }),

/***/ "../../source-map/lib/quick-sort.js":
/*!**************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map/lib/quick-sort.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
exports.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};


/***/ }),

/***/ "../../source-map/lib/source-map-consumer.js":
/*!***********************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map/lib/source-map-consumer.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "../../source-map/lib/util.js");
var binarySearch = __webpack_require__(/*! ./binary-search */ "../../source-map/lib/binary-search.js");
var ArraySet = __webpack_require__(/*! ./array-set */ "../../source-map/lib/array-set.js").ArraySet;
var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "../../source-map/lib/base64-vlq.js");
var quickSort = __webpack_require__(/*! ./quick-sort */ "../../source-map/lib/quick-sort.js").quickSort;

function SourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap)
    : new BasicSourceMapConsumer(sourceMap);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
}

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      if (source != null && sourceRoot != null) {
        source = util.join(sourceRoot, source);
      }
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: Optional. the column number in the original source.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    if (this.sourceRoot != null) {
      needle.source = util.relative(this.sourceRoot, needle.source);
    }
    if (!this._sources.has(needle.source)) {
      return [];
    }
    needle.source = this._sources.indexOf(needle.source);

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

exports.SourceMapConsumer = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The only parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._sources.toArray().map(function (s) {
      return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
    }, this);
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          if (this.sourceRoot != null) {
            source = util.join(this.sourceRoot, source);
          }
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    if (this.sourceRoot != null) {
      aSource = util.relative(this.sourceRoot, aSource);
    }

    if (this._sources.has(aSource)) {
      return this.sourcesContent[this._sources.indexOf(aSource)];
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + aSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + aSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    if (this.sourceRoot != null) {
      source = util.relative(this.sourceRoot, source);
    }
    if (!this._sources.has(source)) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }
    source = this._sources.indexOf(source);

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The only parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'))
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        if (section.consumer.sourceRoot !== null) {
          source = util.join(section.consumer.sourceRoot, source);
        }
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = section.consumer._names.at(mapping.name);
        this._names.add(name);
        name = this._names.indexOf(name);

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };

exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ }),

/***/ "../../source-map/lib/source-map-generator.js":
/*!************************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map/lib/source-map-generator.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "../../source-map/lib/base64-vlq.js");
var util = __webpack_require__(/*! ./util */ "../../source-map/lib/util.js");
var ArraySet = __webpack_require__(/*! ./array-set */ "../../source-map/lib/array-set.js").ArraySet;
var MappingList = __webpack_require__(/*! ./mapping-list */ "../../source-map/lib/mapping-list.js").MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source)
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),

/***/ "../../source-map/lib/source-node.js":
/*!***************************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map/lib/source-node.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(/*! ./source-map-generator */ "../../source-map/lib/source-map-generator.js").SourceMapGenerator;
var util = __webpack_require__(/*! ./util */ "../../source-map/lib/util.js");

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex];
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex];
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

exports.SourceNode = SourceNode;


/***/ }),

/***/ "../../source-map/lib/util.js":
/*!********************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map/lib/util.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = mappingA.source - mappingB.source;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = mappingA.source - mappingB.source;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;


/***/ }),

/***/ "../../source-map/source-map.js":
/*!**********************************************************************************************!*\
  !*** /Users/trevorobrien/Documents/code/sls-progimage/node_modules/source-map/source-map.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(/*! ./lib/source-map-generator */ "../../source-map/lib/source-map-generator.js").SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(/*! ./lib/source-map-consumer */ "../../source-map/lib/source-map-consumer.js").SourceMapConsumer;
exports.SourceNode = __webpack_require__(/*! ./lib/source-node */ "../../source-map/lib/source-node.js").SourceNode;


/***/ }),

/***/ "../../webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "module":
/*!*************************!*\
  !*** external "module" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("module");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ })));
//# sourceMappingURL=retrieve.js.map
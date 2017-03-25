/**
 * Return a random alphanumerical string of length len
 */
const _uid_keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function uid(len) {
  var r = '';
  for (var i = 0; i < len; i++)
    r += _uid_keys.charAt(Math.random() * _uid_keys.length);
  return r;
}

/**
 * path module
 * nodejs/code-modules/path.js
 */
var path;
try {
  path = require('path')
} catch (e) {

  path = {};

  path.dirname = function dirname(path) {
    if (path.length === 0)
      return '.';
    var code = path.charCodeAt(0);
    var hasRoot = (code === 47/*/*/);
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47/*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      }
      else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) {
      return hasRoot ? '/' : '.';
    }
    if (hasRoot && end === 1) {
      return '//';
    }
    return path.slice(0, end);
  }

  path.join = function join() {
    if (arguments.length === 0) {
      return '.';
    }

    var joined;

    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      if (arg.length > 0) {
        if (joined === undefined) {
          joined = arg;
        }
        else {
          joined += '/' + arg;
        }
      }
    }
    
    if (joined === undefined) {
      return '.';
    }
    
    return joined;
  }
}

/**
 * Return an array with the numbers from 0 to n-1, in a random order
 */
function getRandomArray (n) {
  var res, next;

  if (n === 0) { return []; }
  if (n === 1) { return [0]; }

  res = getRandomArray(n - 1);
  next = Math.floor(Math.random() * n);
  res.splice(next, 0, n - 1);   // Add n-1 at a random position in the array

  return res;
}

/*
 * Default compareKeys function will work for numbers, strings and dates
 */
function defaultCompareKeysFunction (a, b) {
  if (a < b) { return -1; }
  if (a > b) { return 1; }
  if (a === b) { return 0; }

  var err = new Error("Couldn't compare elements");
  err.a = a;
  err.b = b;
  throw err;
}

/**
 * Check whether two values are equal (used in non-unique deletion)
 */
function defaultCheckValueEquality (a, b) {
  return a === b;
}

// Interface
module.exports.uid = uid;
module.exports.path = path;
module.exports.getRandomArray = getRandomArray;
module.exports.defaultCompareKeysFunction = defaultCompareKeysFunction;
module.exports.defaultCheckValueEquality = defaultCheckValueEquality;


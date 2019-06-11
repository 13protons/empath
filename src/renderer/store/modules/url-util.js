/** **
The following has been adapted from the Lulumi Project:
https://github.com/LulumiProject/lulumi-browser
https://github.com/LulumiProject/lulumi-browser/blob/2f5510008ad1f04423eb73017bf5627adffd5c36/src/renderer/lib/url-util.ts
*** */

// characters, then : with optional //
const _ = require('lodash');
const rscheme = /^(?:[a-z\u00a1-\uffff0-9-+]+)(?::(\/\/)?)(?!\d)/i;
const defaultScheme = 'http://';
const fileScheme = 'file://';
const os = require('os');
const tldjs = require('tldjs');

const urlParser = (function getParserForEnv() {
  try {
    if (window) {
      return function (text) {
        return new window.URL(text);
      };
    }
    throw new Error();
  } catch (e) {
    return require('url').parse;
  }
}());

/**
 * A simple class for parsing and dealing with URLs.
 * @class urlUtil
 */
const urlUtil = {
  /**
   * Extracts the scheme from a value.
   * @param {String} input The input value.
   * @returns {String} The found scheme.
   */
  getScheme(input) {
    // This function returns one of following:
    // - scheme + ':' (ex. http:)
    // - scheme + '://' (ex. http://)
    // - null
    const scheme = (rscheme.exec(input) || [])[0];
    return scheme === 'localhost://' ? null : scheme;
  },
  /**
   * Checks if an input has a scheme (e.g., http:// or ftp://).
   * @param {String} input The input value.
   * @returns {Boolean} Whether or not the input has a scheme.
   */
  hasScheme(input) {
    return !!urlUtil.getScheme(input);
  },
  /**
   * Prepends file scheme for file paths, otherwise the default scheme
   * @param {String} input path, with opetional schema
   * @returns {String} path with a scheme
   */
  prependScheme(input) {
    if (input === undefined || input === null) {
      return input;
    }
    let newInput = input;
    // expand relative path
    if (newInput.startsWith('~/')) {
      newInput = newInput.replace(/^~/, os.homedir());
    }
    // detect absolute file paths
    if (newInput.startsWith('/')) {
      newInput = fileScheme + newInput;
    }
    // If there's no scheme, prepend the default scheme
    if (!urlUtil.hasScheme(newInput)) {
      newInput = defaultScheme + newInput;
    }
    return newInput;
  },
  canParseURL(input) {
    try {
      const url = urlParser(input);
      return !!url;
    } catch (e) {
      return false;
    }
  },
  isImageAddress(url) {
    return url.match(/\.(jpeg|jpg|gif|png|bmp)$/);
  },
  isHttpAddress(url) {
    return url.match(/^https?:\/\/(.*)/);
  },
  /**
   * Checks if a string is not a URL.
   * @param {String} input The input value.
   * @returns {Boolean} Returns true if this is not a valid URL.
   */
  isNotURL(input) {
    if (input === undefined || input === null) {
      return true;
    }
    if (typeof input !== 'string') {
      return true;
    }
    // for cases where we have scheme and we dont want spaces in domain names
    const caseDomain = /^[\w]{2,5}:\/\/[^\s/]+\//;
    // for cases, quoted strings
    const case1Reg = /^".*"$/;
    // for cases:
    // - starts with "?" or "."
    // - contains "? "
    // - ends with "." (and was not preceded by a domain or /)
    const case2Reg = /(^\?)|(\?.+\s)|(^\.)|(^[^.+..+]*[^/]*\.$)/;
    // for cases, pure string
    const case3Reg = /[?./\s:]/;
    // for cases, data:uri, view-source:uri and about
    const case4Reg = /^(data|view-source|mailto|about|lulumi|lulumi-extension|magnet):.*/;
    let str = input.trim();
    const scheme = urlUtil.getScheme(str);
    if (str.toLowerCase() === 'localhost') {
      return false;
    }
    if (case1Reg.test(str)) {
      return true;
    }
    if (
      case2Reg.test(str) ||
      !case3Reg.test(str) ||
      (scheme === undefined && /\s/g.test(str))
    ) {
      return true;
    }
    if (case4Reg.test(str)) {
      return false;
    }
    if (scheme && scheme !== 'file://') {
      return !caseDomain.test(`${str}/`);
    }
    str = urlUtil.prependScheme(str);
    return false;
  },
  /**
   * Converts an input string into a URL.
   * @param {String} input The input value.
   * @returns {String} The formatted URL.
   */
  getUrlFromInput(input) {
    if (input === undefined || input === null) {
      return '';
    }
    let newInput = input;
    newInput = newInput.trim();
    newInput = urlUtil.prependScheme(newInput);
    if (urlUtil.isNotURL(newInput)) {
      return newInput;
    }
    try {
      return new window.URL(newInput).href;
    } catch (e) {
      return newInput;
    }
  },
  /**
   * Checks if a given input is a valid URL.
   * @param {String} input The input URL.
   * @returns {Boolean} Whether or not this is a valid URL.
   */
  isURL(input) {
    return !urlUtil.isNotURL(input);
  },
  /**
   * Checks if a URL is a view-source URL.
   * @param {String} input The input URL.
   * @returns {Boolean} Whether or not this is a view-source URL.
   */
  isViewSourceUrl(url) {
    return url.toLowerCase().startsWith('view-source:');
  },
  /**
   * Checks if a url is a data url.
   * @param {String} input The input url.
   * @returns {Boolean} Whether or not this is a data url.
   */
  isDataUrl(url) {
    return url.toLowerCase().startsWith('data:');
  },
  /**
   * Checks if a url is an image data url.
   * @param {String} input The input url.
   * @returns {Boolean} Whether or not this is an image data url.
   */
  isImageDataUrl(url) {
    return url.toLowerCase().startsWith('data:image/');
  },
  /**
   * Converts a view-source url into a standard url.
   * @param {String} input The view-source url.
   * @returns {String} A normal url.
   */
  getUrlFromViewSourceUrl(input) {
    if (!urlUtil.isViewSourceUrl(input)) {
      return input;
    }
    return urlUtil.getUrlFromInput(input.substring('view-source:'.length));
  },
  /**
   * Converts a URL into a view-source URL.
   * @param {String} input The input URL.
   * @returns {String} The view-source URL.
   */
  getViewSourceUrlFromUrl(input) {
    if (urlUtil.isImageAddress(input) || !urlUtil.isHttpAddress(input)) {
      return null;
    }
    if (urlUtil.isViewSourceUrl(input)) {
      return input;
    }
    // Normalizes the actual URL before the view-source: scheme like prefix.
    return `view-source:${urlUtil.getUrlFromViewSourceUrl(input)}`;
  },
  /**
   * Extracts the hostname or returns null.
   * @param {String} input The input URL.
   * @returns {String} The host name.
   */
  getHostname(input, excludePort) {
    if (excludePort === void 0) {
      excludePort = false;
    }
    try {
      if (excludePort) {
        return new window.URL(input).hostname;
      }
      return new window.URL(input).host;
    } catch (e) {
      return null;
    }
  },
  /**
   * Gets PDF url from a potential PDFJS URL
   * @param {string} url
   * @return {string}
   */
  getUrlIfPDF(url) {
    const PDF_VIEWER_WITH_PDFJS = '/pdfjs/web/viewer.html';
    const PDF_VIEWER_FOR_CHROME = 'chrome://pdf-viewer/index.html?src=';
    if (url) {
      if (url.includes(PDF_VIEWER_WITH_PDFJS)) {
        return url.replace(
          /^file:.+\/pdfjs\/web\/viewer.html\?file=(\w+:\/\/.+)/,
          '$1'
        );
      }
      if (url.includes(PDF_VIEWER_FOR_CHROME)) {
        return url.replace(/^chrome:\/\/pdf-viewer\/index\.html\?src=/, '');
      }
      return url;
    }
    return '';
  },
  /**
   * Shows the original url from a error page
   * @param {string} url
   * @return {string}
   */
  getUrlIfError(url) {
    const errorPage = '/pages/error/index.html';
    if (url) {
      if (url.includes(errorPage)) {
        return decodeURIComponent(url).replace(
          /^file:.+\/pages\/error\/index.html\?.*url=(\w+:\/\/.+)/,
          '$1'
        );
      }
      return url;
    }
    return '';
  },
  /**
   * Gets about url from a lulumi scheme
   * @param {string} url
   * @return {object}
   */
  getUrlIfAbout(url) {
    if (url.startsWith(`${constants_1.default.lulumiPagesCustomProtocol}://`)) {
      const guestUrl = require('url').parse(url);
      if (guestUrl.hash) {
        const guestHash = guestUrl.hash.substr(2);
        const item =
          `${guestUrl.host}:${guestHash === '' ? 'about' : guestHash}`;
        return {
          title: item,
          url: item
        };
      }
    }
    return {
      url,
      title: ''
    };
  },
  /**
   * Gets the default favicon URL for a URL.
   * @param {string} url The URL to find a favicon for
   * @return {string} url The base favicon URL
   */
  getDefaultFaviconUrl(url) {
    if (urlUtil.isURL(url)) {
      const loc = new window.URL(url);
      return `${loc.protocol}//${loc.host}/favicon.ico`;
    }
    return '';
  },
  /**
   * Gets the filename of the image from a URL.
   * @param {string} url The URL to find a filename of the image
   * @return {Promise}
   */
  getFilenameFromUrl(url) {
    return new Promise(((resolve, reject) => {
      const img = new window.Image();
      img.onerror = function () {
        resolve('');
        reject();
      };
      img.onload = function () {
        const urllib = require('url');
        const path = require('path');
        const parsed = urllib.parse(url);
        resolve(path.basename(parsed.pathname));
      };
      img.src = url;
    }));
  }
};

export default urlUtil;

function toSearchQuery(input) {
  return _.snakeCase(input).replace('_', '+');
}

export function createValidUrlFromFragment(fragment) {
  if (typeof fragment !== 'string') { throw new TypeError('can only create urls from strings'); }
  const metrics = tldjs.parse(fragment);
  console.log('analyze fragment', fragment, metrics);


  const base = {
    isSearch: false,
    query: '',
    input: fragment,
    normalized: ''
  };

  if (metrics.isIp) {
    console.log('is an ip address: ', fragment)
    return Object.assign(base, {
      normalized: urlUtil.getUrlFromInput(fragment)
    });
  }

  if (metrics.tldExists) {
    console.log('may be valid: ', fragment)
    console.log('has a tld, ship it: ', fragment)
    return Object.assign(base, {
      normalized: urlUtil.getUrlFromInput(fragment)
    });
  }
  
  if (urlUtil.canParseURL(fragment) && urlUtil.isURL(fragment)) {
    console.log('good all by myself');
    return Object.assign(base, { normalized: fragment });
  }

  console.log('nvm, gotta search: ', fragment)
  return Object.assign(base, {
    isSearch: true,
    query: toSearchQuery(fragment)
  });
}


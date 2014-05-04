/* global jasmine, jasmineRequire */

'use strict';

(function(jasmine, jasmineRequire, beforeEach) {

  var sinon = (typeof require === 'function' && typeof module === 'object') ? require('sinon') : window.sinon,
    spyMatchers = 'called calledOnce calledTwice calledThrice calledBefore calledAfter calledOn alwaysCalledOn calledWith alwaysCalledWith calledWithExactly alwaysCalledWithExactly calledWithMatch alwaysCalledWithMatch'.split(' '),
    matcherCount = spyMatchers.length,
    spyMatcherHash = {},
    unusualMatchers = {
      "returned": "toHaveReturned",
      "alwaysReturned": "toHaveAlwaysReturned",
      "threw": "toHaveThrown",
      "alwaysThrew": "toHaveAlwaysThrown"
    },

    createCustomMatcher = function(arg, util, customEqualityTesters) {
      return sinon.match(function (val) {
        return util.equals(val, arg, customEqualityTesters);
      });
    },

    getMatcherFunction = function(sinonName, jasmineName) {
      var original = jasmineRequire[jasmineName];
      return function (util, customEqualityTesters) {
        return {
          compare: function() {
            var compare, sinonProperty;
            var args = [].slice.call(arguments, 0);
            var arg;
            var pass;
            var actual = args[0];

            if (jasmine.isSpy(actual) && original) {
              compare = original(jasmine)(util, customEqualityTesters).compare;
              return compare.apply(null, args);
            }

            sinonProperty = actual[sinonName];

            for (var i = 0, len = args.length; i < len; i++) {
              arg = args[i];
              if (arg && (typeof arg.jasmineMatches === 'function' || arg instanceof jasmine.ObjectContaining)) {
                args[i] = createCustomMatcher(arg, util, customEqualityTesters);
              }
            }

            if (typeof sinonProperty === 'function') {
              pass = sinonProperty.apply(actual, args.slice(1));
            } else {
              pass = sinonProperty;
            }

            return {
              pass: pass,
              message: ""
            };
          }
        };
      };
    };

  for (var i = 0; i < matcherCount; i++) {
    var sinonName = spyMatchers[i],
      jasmineName = "toHaveBeen" + sinonName.charAt(0).toUpperCase() + sinonName.slice(1);

    spyMatcherHash[jasmineName] = getMatcherFunction(sinonName, jasmineName);
  }

  for (var j in unusualMatchers) {
    spyMatcherHash[unusualMatchers[j]] = getMatcherFunction(j, unusualMatchers[j]);
  }

  beforeEach(function() {
    jasmine.addMatchers(spyMatcherHash);
  });

})(jasmine, jasmineRequire, beforeEach);

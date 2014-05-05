/* global jasmine, jasmineRequire */

(function(jasmine, jasmineRequire, beforeEach) {
  'use strict';

  var sinon;

  if (typeof require === 'function' && typeof module === 'object') {
    sinon = require('sinon');
  } else {
    sinon = window.sinon;
  }

  var spyMatcherHash = {};

  var messageFns = {
    expectedSpyCallCount: function(txt) {
      return function(pass, spy, otherArgs) {
        return messageFns.expectedSpy(pass, spy, txt) + '. ' +
          messageFns.callCount(spy);
      };
    },
    expectedOtherArguments: function(txt) {
      return function(pass, spy, otherArgs) {
        return messageFns.expectedSpy(pass, spy, txt) + ' ' +
          messageFns.otherArgs(otherArgs);
      };
    },
    expectedSpy: function(pass, spy, txt) {
      return 'Expected spy ' + jasmine.pp(spy) + ' ' +
        (pass ? 'not ' : '') + txt;
    },
    callCount: function(spy) {
      return 'Spy ' + jasmine.pp(spy) + ' was called ' + spy.callCount + ' times.';
    },
    otherArgs: function(otherArgs) {
      if (!otherArgs || !otherArgs.length) {
        return '';
      } else if (otherArgs.length > 1) {
        return jasmine.pp(otherArgs);
      } else {
        return jasmine.pp(otherArgs[0]);
      }
    }
  };

  var matchers = [
    {
      sinonName: 'called',
      jasmineName: 'toHaveBeenCalled',
      message: messageFns.expectedSpyCallCount('to have been called')
    },
    {
      sinonName: 'calledOnce',
      jasmineName: 'toHaveBeenCalledOnce',
      message: messageFns.expectedSpyCallCount('to have been called once')
    },
    {
      sinonName: 'calledTwice',
      jasmineName: 'toHaveBeenCalledTwice',
      message: messageFns.expectedSpyCallCount('to have been called twice')
    },
    {
      sinonName: 'calledThrice',
      jasmineName: 'toHaveBeenCalledThrice',
      message: messageFns.expectedSpyCallCount('to have been called thrice')
    },
    {
      sinonName: 'calledBefore',
      jasmineName: 'toHaveBeenCalledBefore',
      message: messageFns.expectedOtherArguments('to have been called before')
    },
    {
      sinonName: 'calledAfter',
      jasmineName: 'toHaveBeenCalledAfter',
      message: messageFns.expectedOtherArguments('to have been called after')
    },
    {
      sinonName: 'calledOn',
      jasmineName: 'toHaveBeenCalledOn',
      message: messageFns.expectedOtherArguments('to have been called on')
    },
    {
      sinonName: 'alwaysCalledOn',
      jasmineName: 'toHaveBeenAlwaysCalledOn',
      message: messageFns.expectedOtherArguments('to have been always called on')
    },
    {
      sinonName: 'calledWith',
      jasmineName: 'toHaveBeenCalledWith',
      message: messageFns.expectedOtherArguments('to have been called with')
    },
    {
      sinonName: 'alwaysCalledWith',
      jasmineName: 'toHaveBeenAlwaysCalledWith',
      message: messageFns.expectedOtherArguments('to have been always called with')
    },
    {
      sinonName: 'calledWithExactly',
      jasmineName: 'toHaveBeenCalledWithExactly',
      message: messageFns.expectedOtherArguments('to have been called with exactly')
    },
    {
      sinonName: 'alwaysCalledWithExactly',
      jasmineName: 'toHaveBeenAlwaysCalledWithExactly',
      message: messageFns.expectedOtherArguments('to have been always called with exactly')
    },
    {
      sinonName: 'calledWithMatch',
      jasmineName: 'toHaveBeenCalledWithMatch',
      message: messageFns.expectedOtherArguments('to have been called with match')
    },
    {
      sinonName: 'alwaysCalledWithMatch',
      jasmineName: 'toHaveBeenAlwaysCalledWithMatch',
      message: messageFns.expectedOtherArguments('to have been always called with match')
    },
    {
      sinonName: 'threw',
      jasmineName: 'toHaveThrown',
      message: messageFns.expectedOtherArguments('to have thrown an error')
    },
    {
      sinonName: 'alwaysThrew',
      jasmineName: 'toHaveAlwaysThrown',
      message: messageFns.expectedOtherArguments('to have always thrown an error')
    },
    {
      sinonName: 'returned',
      jasmineName: 'toHaveReturned',
      message: messageFns.expectedOtherArguments('to have returned')
    },
    {
      sinonName: 'alwaysReturned',
      jasmineName: 'toHaveAlwaysReturned',
      message: messageFns.expectedOtherArguments('to have always returned')
    }
  ];

  function createCustomMatcher(arg, util, customEqualityTesters) {
    return sinon.match(function (val) {
      return util.equals(val, arg, customEqualityTesters);
    });
  }

  function createMatcher(matcher) {
    var original = jasmineRequire[matcher.jasmineName];

    return function (util, customEqualityTesters) {
      return {
        compare: function() {
          var compare, sinonProperty, arg, pass;
          var args = [].slice.call(arguments, 0);
          var actual = args[0];

          if (jasmine.isSpy(actual) && original) {
            compare = original(jasmine)(util, customEqualityTesters).compare;
            return compare.apply(null, args);
          }

          for (var i = 0, len = args.length; i < len; i++) {
            arg = args[i];
            if (arg && (typeof arg.jasmineMatches === 'function' || arg instanceof jasmine.ObjectContaining)) {
              args[i] = createCustomMatcher(arg, util, customEqualityTesters);
            }
          }

          sinonProperty = actual[matcher.sinonName];

          if (typeof sinonProperty === 'function') {
            pass = sinonProperty.apply(actual, args.slice(1));
          } else {
            pass = sinonProperty;
          }

          return {
            pass: pass,
            message: matcher.message(pass, actual, args.slice(1))
          };
        }
      };
    };
  }

  for (var i = 0, len = matchers.length; i < len; i++) {
    var matcher = matchers[i];
    spyMatcherHash[matcher.jasmineName] = createMatcher(matcher);
  }

  beforeEach(function() {
    jasmine.addMatchers(spyMatcherHash);
  });

})(jasmine, jasmineRequire, beforeEach);

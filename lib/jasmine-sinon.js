/* global jasmine, jasmineRequire */

(function(jasmine, jasmineRequire, beforeEach) {
  'use strict';

  var sinon;

  if (typeof require === 'function' && typeof module === 'object') {
    sinon = require('sinon');
  } else {
    sinon = window.sinon;
  }

  var messageFns = {
    callCount: function(matcher, spy) {
      return '' + spy + ' was called ' + spy.callCount + ' times.';
    },
    otherSpy: function(matcher, spy, otherArgs) {
      var other = otherArgs[0];
      return (typeof other.toString === 'function') ? other.toString() : other;
    }
  };

  var matchers = [
    {
      sinonName: 'called',
      jasmineName: 'toHaveBeenCalled',
      txt: 'to have been called',
      passMessage: messageFns.callCount
    },
    {
      sinonName: 'calledOnce',
      jasmineName: 'toHaveBeenCalledOnce',
      txt: 'to have been called once',
      additionalMessage: messageFns.callCount
    },
    {
      sinonName: 'calledTwice',
      jasmineName: 'toHaveBeenCalledTwice',
      txt: 'to have been called twice',
      additionalMessage: messageFns.callCount
    },
    {
      sinonName: 'calledThrice',
      jasmineName: 'toHaveBeenCalledThrice',
      txt: 'to have been called thrice',
      additionalMessage: messageFns.callCount
    },
    {
      sinonName: 'calledBefore',
      jasmineName: 'toHaveBeenCalledBefore',
      txt: 'to have been called before',
      additionalMessage: messageFns.otherSpy
    },
    {
      sinonName: 'calledAfter',
      jasmineName: 'toHaveBeenCalledAfter',
      txt: 'to have been called after',
      additionalMessage: messageFns.otherSpy
    },
    {
      sinonName: 'calledOn',
      jasmineName: 'toHaveBeenCalledOn',
      txt: 'to have been called on',
      additionalMessage: messageFns.otherSpy
    },
    {
      sinonName: 'alwaysCalledOn',
      jasmineName: 'toHaveBeenAlwaysCalledOn',
      txt: 'to have been always called on',
      additionalMessage: messageFns.otherSpy
    }
  ];

  // var spyMatchers = 'called calledOnce calledTwice calledThrice calledBefore calledAfter calledOn alwaysCalledOn calledWith alwaysCalledWith calledWithExactly alwaysCalledWithExactly calledWithMatch alwaysCalledWithMatch'.split(' ');
  var matcherCount = matchers.length;
  var spyMatcherHash = {};
  // var unusualMatchers = {
  //   "returned": "toHaveReturned",
  //   "alwaysReturned": "toHaveAlwaysReturned",
  //   "threw": "toHaveThrown",
  //   "alwaysThrew": "toHaveAlwaysThrown"
  // };

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
            message: generateMessage(pass, matcher, actual, args.slice(1))
          };
        }
      };
    };
  }

  function generateMessage(passed, matcher, actual, otherArgs) {
    var message = "Expected " + actual + " " +
      (passed ? "not " : "") +
      matcher.txt + ' ';
    if (passed && matcher.passMessage) {
      message += matcher.passMessage(matcher, actual, otherArgs);
    }
    if (!passed && matcher.notPassMessage) {
      message += matcher.notPassMessage(matcher, actual, otherArgs);
    }
    if (matcher.additionalMessage) {
      message += matcher.additionalMessage(matcher, actual, otherArgs);
    }
    return message;
  }

  for (var i = 0; i < matcherCount; i++) {
    var matcher = matchers[i];
    spyMatcherHash[matcher.jasmineName] = createMatcher(matcher);
  }

  // for (var j in unusualMatchers) {
  //   spyMatcherHash[unusualMatchers[j]] = createMatcher(j, unusualMatchers[j]);
  // }

  beforeEach(function() {
    jasmine.addMatchers(spyMatcherHash);
  });

})(jasmine, jasmineRequire, beforeEach);

'use strict';

(function(global, jasmine) {

  var spyMatchers = 'called calledOnce calledTwice calledThrice calledBefore calledAfter calledOn alwaysCalledOn calledWith alwaysCalledWith calledWithExactly alwaysCalledWithExactly calledWithMatch alwaysCalledWithMatch'.split(' '),
    i = spyMatchers.length,
    spyMatcherHash = {},
    unusualMatchers = {
      'returned': 'toHaveReturned',
      'alwaysReturned': 'toHaveAlwaysReturned',
      'threw': 'toHaveThrown',
      'alwaysThrew': 'toHaveAlwaysThrown'
    },

    getMatcherFunction = function(sinonName, matcherName) {
      var original = jasmine.Matchers.prototype[matcherName];
      return function () {
        if (jasmine.isSpy(this.actual) && original) {
          return original.apply(this, arguments);
        }
        var sinonProperty = this.actual[sinonName];
        return (typeof sinonProperty === 'function') ? sinonProperty.apply(this.actual, arguments) : sinonProperty;
      };
    };

  while(i-=1) {
    var sinonName = spyMatchers[i],
      matcherName = 'toHaveBeen' + sinonName.charAt(0).toUpperCase() + sinonName.slice(1);

    spyMatcherHash[matcherName] = getMatcherFunction(sinonName, matcherName);
  }

  for (var j in unusualMatchers) {
    spyMatcherHash[unusualMatchers[j]] = getMatcherFunction(j, unusualMatchers[j]);
  }

  global.sinonJasmine = {
    getMatchers: function() {
      return spyMatcherHash;
    }
  };

})(window, window.jasmine);

beforeEach(function() {
  this.addMatchers(window.sinonJasmine.getMatchers());
});

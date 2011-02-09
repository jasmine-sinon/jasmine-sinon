(function(global) {
  
  var spyMatchers = ['called', 'calledOnce', 'calledTwice'],
    i = spyMatchers.length,
    spyMatcherHash = {},
    
  getMatcherFunction = function(sinonName) {
    return function() {
      return this.actual[sinonName];
    };
  };
    
  while(i--) {
    var sinonName = spyMatchers[i],
      matcherName = "toHaveBeen" + sinonName.charAt(0).toUpperCase() + sinonName.slice(1);
      
    spyMatcherHash[matcherName] = getMatcherFunction(sinonName);
  };
  
  global.SinonJasmine = {
    getMatchers: function() {
      return spyMatcherHash;
    }
  };
  
})(window);

beforeEach(function() {
  
  this.addMatchers(SinonJasmine.getMatchers());
  
});
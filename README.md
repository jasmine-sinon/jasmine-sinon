# Jasmine matchers for Sinon.JS

[![Build Status](https://travis-ci.org/froots/jasmine-sinon.png?branch=master)](https://travis-ci.org/froots/jasmine-sinon)

_jasmine-sinon_ provides a set of custom matchers for using the [Sinon.JS](http://sinonjs.org/) spying, stubbing and mocking library with [Jasmine BDD](https://jasmine.github.io/).

Instead of:

    expect(mySinonSpy.calledWith('foo')).toBeTruthy();

you can say:

    expect(mySinonSpy).toHaveBeenCalledWith('foo');

This is not only nicerer to look at in your purdy specs, but you get more descriptive failure output in your Jasmine spec runner.

Instead of:

    Expected false to be truthy.

you get:

    Expected spy "mySpy" to have been called with "foo".

## Jasmine 1.x / 2.x compatibility

If you are using Jasmine 1.x, use the latest 0.3.x release. For Jasmine 2, use 0.4 or above.

## Installation

### Direct include

Just include <code>lib/jasmine-sinon.js</code> in your Jasmine test runner file.
Don't forget to include [sinon.js](https://github.com/cjohansen/Sinon.JS).

### With [jasmine-gem](https://github.com/jasmine/jasmine-gem)

Add it to <code>jasmine.yml</code>. Don't forget to include [sinon.js](https://github.com/cjohansen/Sinon.JS).

### Node.js / NPM

`npm install jasmine-sinon --save-dev`

Then, in your jasmine spec:

```javascript
var sinon = require('sinon');
require('jasmine-sinon');
```

### Using Bower

`bower install jasmine-sinon --save-dev`

Then, include `components/jasmine-sinon/index.js` in your test runner.

## Sinon.JS matchers

In general, you should be able to translate a Sinon spy/stub/mock API method to a _jasmine-sinon_ matcher by prepending _toHaveBeen_ to the front of the method name. For example, the Sinon.JS spy method <code>called</code> becomes <code>toHaveBeenCalled</code>. There are one or two exceptions to this rule, so the full list of matchers is given below.

| Sinon.JS property / method | jasmine-sinon matcher |
|----------------------------|-----------------------|
| `called` | `toHaveBeenCalled()` |
| `calledOnce` | `toHaveBeenCalledOnce()` |
| `calledTwice` | `toHaveBeenCalledTwice()` |
| `calledThrice` | `toHaveBeenCalledThrice()` |
| `calledBefore()` | `toHaveBeenCalledBefore()` |
| `calledAfter()` | `toHaveBeenCalledAfter()` |
| `calledOn()` | `toHaveBeenCalledOn()` |
| `alwaysCalledOn()` | `toHaveBeenAlwaysCalledOn()` |
| `calledWith()` | `toHaveBeenCalledWith()` |
| `alwaysCalledWith()` | `toHaveBeenAlwaysCalledWith()` |
| `calledWithExactly()` | `toHaveBeenCalledWithExactly()` |
| `alwaysCalledWithExactly()` | `toHaveBeenAlwaysCalledWithExactly()` |
| `calledWithMatch()` | `toHaveBeenCalledWithMatch()` |
| `alwaysCalledWithMatch()` | `toHaveBeenAlwaysCalledWithMatch()` |
| `calledWithNew` | `toHaveBeenCalledWithNew()` `>=v0.4` |
| `neverCalledWith` | `toHaveBeenNeverCalledWith()` `>=v0.4` |
| `neverCalledWithMatch()` | `toHaveBeenNeverCalledWithMatch()` `>=v0.4` |
| `threw()` | `toHaveThrown()` |
| `alwaysThrew()` | `toHaveAlwaysThrown()` |
| `returned()` | `toHaveReturned()` |
| `alwaysReturned()` | `toHaveAlwaysReturned()` |

These matchers will work on spies, individual spy calls, stubs and mocks.

You can use Jasmine spies alongside your Sinon spies. _jasmine-sinon_ will detect which you're using and use the appropriate matcher.

You can also use Jasmine's fuzzy matchers `any()` and `objectContaining()` in expectations, e.g.

```javascript
expect(spy).toHaveBeenCalledWith(jasmine.any(Date));
expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({name: 'froots'}))
```

## Contributors

Thanks to:

* @aelesbao for Exception matchers
* @theinterned for, er, match matchers
* @milichev for graceful spy matchers
* @reinseth for Jasmine fuzzy matcher support
* @stoodder for initial Jasmine 2.0 support work

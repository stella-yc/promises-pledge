'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

class $Promise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('no executor or function was passed to $Promise');
    }
    this.executor = executor;
    this._state = 'pending';
    executor.call(this, this.resolve.bind(this), this.reject.bind(this));
  }

  _internalResolve(value) {
    if (this._state === 'pending') {
      this._state = 'fulfilled';
      this._value = value;
    }
  }

  _internalReject(error) {
    if (this._state === 'pending') {
      this._state = 'rejected';
      this._value = error;
    }
  }

  resolve(value) {
    this._internalResolve(value);
  }

  reject(value) {
    this._internalReject(value);
  }
}




/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

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
    this._handlerGroups = [];
    executor.call(this, this.resolve.bind(this), this.reject.bind(this));
  }

  _internalResolve(value) {
    if (this._state === 'pending') {
      this._state = 'fulfilled';
      this._value = value;
      if (this._handlerGroups.length > 0) {
        this._callHandlers();
      }
    }
  }

  _internalReject(error) {
    if (this._state === 'pending') {
      this._state = 'rejected';
      this._value = error;
      if (this._handlerGroups.length > 0) {
        this._callHandlers();
      }
    }
  }

  resolve(value) {
    this._internalResolve(value);
  }

  reject(value) {
    this._internalReject(value);
  }

  _callHandlers() {
    if (this._state === 'fulfilled') {
      for (var i = 0; i < this._handlerGroups.length; i++) {
        this._handlerGroups[i].successCb(this._value);
      }
      this._handlerGroups = [];
    } else {
      for (var i = 0; i < this._handlerGroups.length; i++) {
        this._handlerGroups[i].errorCb(this._value);
      }
      this._handlerGroups = [];
    }

  }

  then(success, error) {
    const handler = {};
    handler.successCb = typeof success === 'function' ? success : null;
    handler.errorCb = typeof error === 'function' ? error : null;
    this._handlerGroups.push(handler);
    if (this._state === 'fulfilled') {
      this._callHandlers();
    }
    if (this._state === 'rejected' && error) {
      this._callHandlers();
    }
  }

  catch(error) {
    this.then(null, error);
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

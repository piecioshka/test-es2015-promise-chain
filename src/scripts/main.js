"use strict";

console.assert(typeof Promise === "function", "Promise is not a function");

var toArray =
  Array.from ||
  function (object) {
    return Array.prototype.slice.call(object);
  };

function delay(label, time) {
  return new Promise(function (resolve, reject) {
    // console.info('START', label);
    window.setTimeout(function () {
      // console.info('END', label);
      resolve(label);
    }, time);
  });
}

var listOfPromise = [];

// Promise.chain
listOfPromise.push(function () {
  return new Promise(function (resolve, reject) {
    var foo = [];
    foo.push(delay.bind(this, "[Promise.chain] foo - will be first", 2000));
    foo.push(delay.bind(this, "[Promise.chain] bar - will be second", 1000));

    Promise.chain(foo).then(
      function success() {
        var args = toArray(arguments);
        args.unshift("[Promise.chain]");

        console.log.apply(console, args);
        resolve();
      },
      function failed() {
        var args = toArray(arguments);
        args.unshift("[Promise.chain]");

        console.error.apply(console, args);
        reject();
      }
    );
  });
});

// Promise.all
listOfPromise.push(function () {
  return new Promise(function (resolve, reject) {
    var foo = [];
    foo.push(delay("[Promise.all] foo - will be second", 2000));
    foo.push(delay("[Promise.all] bar - will be first", 1000));

    Promise.all(foo).then(
      function success() {
        var args = toArray(arguments);
        args.unshift("[Promise.all]");

        console.log.apply(console, args);
        resolve();
      },
      function failed() {
        var args = toArray(arguments);
        args.unshift("[Promise.all]");

        console.error.apply(console, args);
        reject();
      }
    );
  });
});

// Promise.race
listOfPromise.push(function () {
  return new Promise(function (resolve, reject) {
    var foo = [];
    foo.push(delay("[Promise.race] foo - will be second", 2000));
    foo.push(delay("[Promise.race] bar - will be first", 1000));

    Promise.race(foo).then(
      function success() {
        var args = toArray(arguments);
        args.unshift("[Promise.race]");

        console.log.apply(console, args);
        resolve();
      },
      function failed() {
        var args = toArray(arguments);
        args.unshift("[Promise.race]");

        console.error.apply(console, args);
        reject();
      }
    );
  });
});

Promise.chain(listOfPromise).then(function () {
  console.warn("...finish");
});

# test-es2015-promise-chain

More: http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise-constructor

## For what?

I would like to tests 3 static methods. Two methods are from specification
 
 - `Promise.all`
 - `Promise.race`

and third is my

 - `Promise.chain`

## My Promise extension

In specification we don't have method which run list of functions (which they return `Promise` object) synchronously.
So I decide to create method `Promise.chain`. I know that exists yet lib for that - https://www.npmjs.com/package/promise-chain
but I will try to resolve this problem myself.

## How to use it?

```javascript
let list = [];

list.push(function () {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve('first one');
        }, 1300);
    });
});


list.push(function () {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve('second one');
        }, 300);
    });
});

// Functions are execute synchronously.
Promise.chain(list).then(function (response) {
    console.log(response[0]); // 'first one'
    console.log(response[1]); // 'second one'
});
```

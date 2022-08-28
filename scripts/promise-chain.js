(function (root) {
    'use strict';

    var Promise = root.Promise;

    if (typeof Promise !== 'function') {
        throw new TypeError('Promise is not a function');
    }

    Promise.chain = function (iterable) {
        var results = [];
        var toArray = Array.from || function (object) {
                return Array.prototype.slice.call(object);
            };

        return new Promise(function (resolve, reject) {
            var index = 0;

            function step() {
                if (index >= iterable.length) {
                    resolve(results);
                    return;
                }

                iterable[index]().then(function () {
                    results.push(toArray(arguments));
                    index++;
                    step();
                }, reject);
            }

            step();
        });
    };

}(this));

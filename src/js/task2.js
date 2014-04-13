/*global self, console */
(function () {
    'use strict';

    self.addEventListener('message', function (e) {
        self.postMessage({'ok': true, 'echo': e.data});
    }, false);

}());





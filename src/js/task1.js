/*global self, console */
(function () {
    'use strict';

    // importing scripts
    self.importScripts('helper.js');


    self.addEventListener('message', function (e) {
        var m = e.data;

        self.db[m](
            function () {
                self.postMessage('opened');
            },
            function () {
                console.log(arguments);
                self.postMessage('error');
            }
        );


    }, false);

}());





/*global self, console */
(function () {
    'use strict';

    // importing scripts
    self.importScripts('helper.js');

    // db - open
    self.open = function () {
        self.db.open(self.onsuccess, self.onerror);
    };


    self.onsuccess = function () {
        self.postMessage({"ok": true});
    };

    self.onerror = function () {
        console.log('WORKER 1 # ', arguments);
        self.postMessage({"ok": false});
    };

    self.addEventListener('message', function (e) {
        var request = e.data;

        self[request.method].apply(null, request.params);

    }, false);

}());





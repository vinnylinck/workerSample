/*global self, console */
(function () {
    'use strict';

    // importing scripts
    self.importScripts('helper.js');

    // db - open
    self.open = function () {
        self.db.open(self.onsuccess, self.onerror);
    };
    
    //
    self.save = function (obj) {
        self.db.put(obj, self.onsuccess, self.onerror);
    }


    self.onsuccess = function () {
        self.postMessage({"ok": true});
    };

    self.onerror = function () {
        console.log('WORKER 1 # ', arguments);
        self.postMessage({"ok": false});
    };

    self.addEventListener('message', function (e) {
        var request = JSON.parse(e.data);

        console.log('- Worker executing method: ' + request.method);
        self[request.method].apply(null, request.params);

    }, false);

}());





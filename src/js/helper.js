/*global self, indexedDB, console */
(function () {
    'use strict';

    //
    self.db = {};


    //
    self.db.put = function (record, cbsuccess, cberror) {
        var transaction = self.db.instance.transaction(['stuffstore'], 'readwrite'),
            store = transaction.objectStore('stuffstore'),
            request;


        console.log('- Adding object ' + record);

        request = store.add(record);
        request.onfailure = cberror;
        request.onsuccess = cbsuccess;

    };

    //
    self.db.open = function (cbsuccess, cberror) {

        var req = indexedDB.open('junk', 4);

        req.onsuccess = function (e) {

            // getting db instance
            self.db.instance = e.target.result;
            cbsuccess();
        };

        req.onfailure = cberror;


        req.onupgradeneeded = function (e) {
            console.log('- Upgrading database...');

            // getting db instance
            self.db.instance = e.target.result;

            // checking store
            if (!self.db.instance.objectStoreNames.contains('stuffstore')) {
                console.log('- Creating store...');
                self.db.instance.createObjectStore('stuffstore', {"keyPath": "id", "autoIncrement": true});
            }
        };

    };


}());

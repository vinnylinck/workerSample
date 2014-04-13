/*global self, indexedDB, console */
(function () {
    'use strict';
    
    //
    self.db = {};
    
    //
    self.db.open = function (cbsuccess, cberror) {
        
        var req = indexedDB.open('junk');
        
        req.onsuccess = function (e) {

            // getting db instance
            self.db.instance = e.target.result;
            cbsuccess();
        };
        
        req.onfailure = cberror;
        
        req.onupgradeneeded = function (e) {
            self.postMessage({ok: false, message: 'Need to upgrade.'});
        };
    };
    
    
}());

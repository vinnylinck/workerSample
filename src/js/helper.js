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
            
            // checking store
            if (!self.db.instance.objectStoreNames.contains('stuffstore')) {
                console.log('- Creating store...');
                self.db.instance.createObjectStore('stuffstore', {"keyPath": "id", "autoIncrement": true});
            }
            
            cbsuccess();
        };
        
        req.onfailure = cberror;
        
        req.onupgradeneeded = function (e) {
            console.log('- Upgrading database...');
            
            if (self.db.instance.objectStoreNames.contains('stuffstore')) {
                console.log('- Updating store...');
            }
        };
    };
    
    
}());

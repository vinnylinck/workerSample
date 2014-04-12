/*global self, indexedDB */
(function () {
    'use strict';
    
    //
    self.db = {};
    
    //
    self.db.open = function (cbsuccess, cberror) {
        
        var req = indexedDB.open('junk');
        
        req.onsuccess = function (e) {
            self.db.instance = e.target.result;
            cbsuccess();
        };
        
        req.onfailure = cberror;
    };
    
    
}());

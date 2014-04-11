/*global window, Worker */
(function Launch() {
    'use strict';
    
    function App() {
        var worker1;
        
        // start dedicated webworker
        this.startWorker1 = function () {
           
            worker1 = new Worker('js/task1.js');
            worker1.postMessage();
            
        };
        
    }
    
    
    window.app = new App();
}());
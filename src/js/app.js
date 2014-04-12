/*global window, Worker, console */
(function Launch() {
    'use strict';

    function App() {
        var worker1;

        // start dedicated webworker
        this.startWorker1 = function () {

            worker1 = new Worker('js/task1.js');
            
            worker1.addEventListener('message', function (e) {
                console.log('Worker said: ', e.data);
            }, false);

            worker1.postMessage('open');

        };

    }


    window.app = new App();
}());
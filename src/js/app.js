/*global window, Worker, console */
(function Launch() {
    'use strict';

    function App() {
        var worker1;

        // start dedicated webworker
        this.startWorker1 = function () {

            var mOpen, sOpen;

            worker1 = new Worker('js/task1.js');

            worker1.addEventListener('message', function (e) {
                console.log('- Worker said: ', e.data, '\n');
            }, false);

            // using worker for IndexedDB access
            console.log('- Opening connection...');
            mOpen = {"method": "open"};
            sOpen = JSON.stringify(mOpen);
            
            console.log('- Sending ', sOpen);
            worker1.postMessage(sOpen);
        };

        // Saving data
        this.addData = function () {

            var mSave;


            console.log('- CRUD(ing)...');
            mSave = {
                "method": 'save',
                "params": [
                    {
                        "name": 'My Stuff -  ' + new Date().toISOString(),
                        "extId": new Date().gettime()
                    }
                ]
            };
            worker1.postMessage(JSON.stringify(mSave));
        };

    }


    window.app = new App();
}());
/*global window, Worker, console, URL, Blob, self */
(function Launch() {
    'use strict';

    function T3() {
        self.addEventListener('message', function (e) {
            self.postMessage({'ok': true, 'echo': e.data});
        }, false);
    }


    function App() {
        var worker1, worker2, worker3;


        // start blob webworker 3
        this.startWorker3 = function () {
            var blob_worker = new Blob(['(', T3.toString(), ')()'], {type: 'application/javascript'}),
                url_worker = URL.createObjectURL(blob_worker);

            worker3 = new Worker(url_worker);

            worker2.addEventListener('message', function (e) {
                console.log('- Worker 3  said: ', e.data, '\n');
            }, false);

            worker2.postMessage('ping');

            URL.revokeObjectURL(url_worker);
        };

        // start dedicated webworker 2
        this.startWorker2 = function () {
            worker2 = new Worker('js/task2.js');

            worker2.addEventListener('message', function (e) {
                console.log('- Worker 2  said: ', e.data, '\n');
            }, false);

            worker2.postMessage('ping');

        };

        // start dedicated webworker 1
        this.startWorker1 = function () {

            var mOpen, sOpen;

            worker1 = new Worker('js/task1.js');

            worker1.addEventListener('message', function (e) {
                console.log('- Worker 1  said: ', e.data, '\n');
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
                        "extId": new Date().getTime()
                    }
                ]
            };
            worker1.postMessage(JSON.stringify(mSave));
        };


        // dropping database
        this.deleteDB = function () {
            var mdrop;

            console.log('- Dropping db...');
            mdrop = {
                'method': 'dropDB',
                'params': []
            };
            //worker1.postMessage(JSON.stringfy(mdrop));
            worker1.terminate();
            worker2.terminate();
            worker3.terminate();
        };
    }


    window.app = new App();
}());
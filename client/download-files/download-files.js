"use strict";

function downloadFile(fileName, duration, sync) {
    duration = duration || 1000;

    console.assert(fileName && typeof fileName === 'string', 'Provide a valid file name');

    return Q.promise(function(resolve, reject) {
        var request = new XMLHttpRequest();

        request.open('GET', `/${fileName}.txt?waitUntil=${duration}`, !sync);

        request.addEventListener('load', function() {
            resolve()
        }, false);
        request.addEventListener('error', function() {
            reject()
        }, false);

        request.send();
    })
}

function downloadFileSync(fileName, duration) {
    downloadFile(fileName, duration, true)
}
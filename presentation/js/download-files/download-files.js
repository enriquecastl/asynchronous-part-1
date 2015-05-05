"use strict";

function downloadFile(fileName, duration, sync) {
    duration = duration || 1000;

    console.assert(fileName && typeof fileName === 'string', 'Provide a valid file name');

    return Q.promise(function(resolve, reject, progress) {
        var request = new XMLHttpRequest()
            , progressInterval;

        request.open('GET', `/${fileName}.txt?waitUntil=${duration}`, !sync);

        request.addEventListener('load', function() {
            clearInterval(progressInterval);
            resolve();
        }, false);
        request.addEventListener('error', function() {
            clearInterval(progressInterval);
            reject();
        }, false);

        progressInterval = setInterval(function() {
            progress((duration / 1000))
        }, 1000);

        request.send();
    })
}

function downloadInvalidFile(fileName, duration) {
    duration = duration || 1000;

    console.assert(fileName && typeof fileName === 'string', 'Provide a valid file name');

    return Q.promise(function(resolve, reject) {
        var request = new XMLHttpRequest();

        request.open('GET', `/invalid/${fileName}.txt?waitUntil=${duration}`);

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
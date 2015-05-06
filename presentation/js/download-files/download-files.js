"use strict";

function downloadMetadata() {
    return downloadFile('metadata')
}

function requestToken() {
    return downloadFile('token')
}

function requestInvalidToken() {
    return downloadInvalidFile('token')
}

function downloadFile(fileName, duration, sync) {
    duration = typeof duration === 'number' ? duration : 1000;

    /*
    Using native Promise implementation would like this:

    return new Promise(function(resolve, reject) {
        //Notice how we lost progress :(
    })
     */
    return Q.promise(function(resolve, reject, progress) {
        var request = new XMLHttpRequest()
            , progressInterval;

        request.open('GET', `/${fileName}.txt?waitUntil=${duration}`, !sync);
        request.setRequestHeader('Cache-Control', 'no-cache');

        request.addEventListener('load', function() {
            clearInterval(progressInterval);
            resolve({ metaURL : `${fileName}-meta.txt` });
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

        request.setRequestHeader('Cache-Control', 'no-cache');
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
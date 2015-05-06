"use strict";

function startDownloadOperationScene1(fileUrl) {
    var downloadPromise = downloadFile(fileUrl, 10000);

    return downloadPromise
    .then(notifyDownloadSucceed)
    .catch(notifyDownloadFailed)
    .progress(notifyProgress);
}

function startDownloadOperationScene2(fileURL) {
    var tokenPromise = requestToken()
        ;

    return tokenPromise
        .then(function(token) {
            return downloadFile(fileURL, token)
        })
        .then(notifyDownloadSucceed)
        .catch(notifyDownloadFailed);
}


function notifyDownloadSucceed(fileContent) {
    console.log('The file was downloaded')
}

function notifyDownloadFailed(fileContent) {
    console.log(`Couldn't download file`)
}

function notifyProgress() {
    console.log("we're making some progress here")
}

var downloadSce1Button = document.querySelector('button.esc-1-start-download')
    , downloadSce2Button = document.querySelector('button.esc-2-start-download')
    ;


downloadSce1Button.addEventListener('click', function() {
    startDownloadOperationScene1('file1')
});


downloadSce2Button.addEventListener('click', function() {
    startDownloadOperationScene2('file1')
});
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

function startDownloadOperationScene3(fileURLs) {
    var tokenPromise = requestToken(),
        token
        ;

    tokenPromise
    .then(function(t) {
        token = t;
        return Q.all(fileURLs.map(function(file) {
            return downloadFile(file, token)
        }))
    })
    .then(function(files) {
        return Q.all(files.map(function(file) {
            return downloadMetadata(file.metaURL, token)
        }))
    })
    .then(notifyDownloadSucceed)
    .catch(notifyDownloadFailed)
}

function startDownloadOperationScene4(fileURLs) {
    return reduce({
        token : requestToken,
        files : function(accum, token) {
            return Q.all(fileURLs.map(function(file) {
                return downloadFile(file, token)
            }))
        },
        metadata : function(accum, files) {
            return Q.all(files.map(function(file) {
                return downloadMetadata(file.metaURL, accum.token)
            }))
        },
        saveResults : saveDownloadedFilesInfo
    })
    .then(notifyDownloadSucceed)
    .catch(notifyDownloadFailed)
}

var startDownloadOperationScene5 = async(function* (fileURLs) {
    var token,
        files,
        metadata;

    try {
        token = yield requestToken();
        files = yield Q.all(fileURLs.map(function(file) { return downloadFile(file, token) }));
        metadata = yield Q.all(files.map(function(file) { return downloadMetadata(file.metaURL, token) }));
        yield saveDownloadedFilesInfo(token, files, metadata)
    } catch(e) {
        throw new Error('Error completing the download operation. Try again later.')
    }
});

function notifyDownloadSucceed(fileContent) {
    console.log('The file was downloaded')
}

function notifyDownloadFailed(fileContent) {
    console.log(`Couldn't download file`)
}

function notifyProgress() {
    console.log("we're making some progress here")
}

function notifyFileDownloaded(file) {
    console.log(file, ' was downloaded')
}